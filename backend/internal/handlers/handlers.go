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

		// Загружаем кэшированные данные
		cachedTrends, cachedDetails, isStale, err := storage.LoadAllData()
		if err != nil {
			log.Printf("Ошибка загрузки кэша: %v", err)
			http.Error(w, "Ошибка сервера при загрузке кэша", http.StatusInternalServerError)
			return
		}

		var trends []models.Trend
		if isStale || len(cachedTrends) == 0 {
			log.Println("Кэш устарел или отсутствует, запрашиваем новые данные из Gemini API")
			newTrends, err := analyzer.AnalyzeTrends()
			if err != nil {
				log.Printf("Ошибка при получении трендов из Gemini API: %v", err)
				if len(cachedTrends) > 0 {
					log.Println("Используем устаревший кэш как запасной вариант")
					trends = cachedTrends
				} else {
					http.Error(w, "Не удалось получить тренды", http.StatusInternalServerError)
					return
				}
			} else {
				// Сохраняем новые данные в кэш
				trends = newTrends
				if err := storage.SaveAllData(trends, cachedDetails); err != nil {
					log.Printf("Ошибка сохранения новых данных: %v", err)
				} else {
					log.Printf("Сохранено %d новых трендов", len(trends))
				}
			}
		} else {
			// Используем кэшированные данные
			log.Println("Используем актуальный кэш")
			trends = cachedTrends
		}
		response := models.Response{
			Trends:    trends,
			Details:   cachedDetails,                   // Используем данные из кэша
			Timestamp: time.Now().Format(time.RFC3339), // Или из кэша
		}
		// Формируем ответ
		w.Header().Set("Content-Type", "application/json")
		if err := json.NewEncoder(w).Encode(response); err != nil {
			log.Printf("Ошибка формирования ответа: %v", err)
			http.Error(w, "Ошибка сервера", http.StatusInternalServerError)
		}
	}

}
