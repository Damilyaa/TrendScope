package handlers

import (
	"encoding/json"
	"log"
	"net/http"
	"trendscope/internal/models"
	"trendscope/internal/storage"
)

func GetTrendsHandler(analyzer models.TrendAnalyzer) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		log.Println("Обработка запроса /api/trends")

		log.Println("Запрос к Gemini API")
		newTrends, err := analyzer.AnalyzeTrends()
		if err != nil {
			log.Printf("Ошибка при получении трендов из Gemini API: %v. Используем кэш.", err)

			// Пробуем загрузить данные из файла
			cachedTrends, _, err := storage.LoadAllData()
			if err != nil {
				log.Printf("Ошибка загрузки из кэша: %v", err)
				http.Error(w, "Не удалось получить тренды", http.StatusInternalServerError)
				return
			}

			newTrends = cachedTrends
		} else {
			// Сохраняем новые данные
			_, existingDetails, _ := storage.LoadAllData()
			if err := storage.SaveAllData(newTrends, existingDetails); err != nil {
				log.Printf("Ошибка сохранения: %v", err)
			} else {
				log.Printf("Сохранено %d трендов", len(newTrends))
			}
		}

		w.Header().Set("Content-Type", "application/json")
		if err := json.NewEncoder(w).Encode(newTrends); err != nil {
			log.Printf("Ошибка формирования ответа: %v", err)
		}
	}
}
