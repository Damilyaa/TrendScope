package handlers

import (
	"encoding/json"
	"log"
	"net/http"
	"time"

	"trendscope/internal/models"
	"trendscope/internal/storage"
)

func GetTrendsHandler(analyzer models.TrendAnalyzer) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		log.Println("Обработка запроса /api/trends")

		cachedTrends, cachedDetails, isStale, err := storage.LoadAllData()
		if err != nil {
			log.Printf("Ошибка загрузки кэша: %v", err)
			http.Error(w, "Ошибка сервера при загрузке кэша", http.StatusInternalServerError)
			return
		}

		response := models.Response{
			Trends:    cachedTrends,
			Details:   cachedDetails,
			Timestamp: time.Now().Format(time.RFC3339),
		}
		w.Header().Set("Content-Type", "application/json")
		if err := json.NewEncoder(w).Encode(response); err != nil {
			log.Printf("Ошибка формирования ответа: %v", err)
			http.Error(w, "Ошибка сервера", http.StatusInternalServerError)
			return
		}

		if isStale || len(cachedTrends) == 0 {
			go func() {
				log.Println("Фоновое обновление кэша трендов из Gemini API")
				newTrends, err := analyzer.AnalyzeTrends()
				if err != nil {
					log.Printf("⚠️ Фоновое обновление не удалось: %v", err)
					return
				}
				if err := storage.SaveAllData(newTrends, cachedDetails); err != nil {
					log.Printf("⚠️ Ошибка сохранения обновленных трендов: %v", err)
				} else {
					log.Println("✅ Кэш трендов успешно обновлён в фоне")
				}
			}()
		}
	}
}
