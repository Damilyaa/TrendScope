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
		trends, err := analyzer.AnalyzeTrends()
		if err != nil {
			log.Printf("Ошибка при получении трендов из Gemini API: %v. Используются данные из кэша.", err)
			// Пробуем загрузить данные из файла как fallback
			cachedTrends, err := storage.LoadTrendsFromFile()
			if err != nil {
				log.Printf("Ошибка при загрузке данных из файла: %v", err)
				http.Error(w, "Не удалось получить тренды", http.StatusInternalServerError)
				return
			}
			trends = cachedTrends
		} else {
			// Если данные успешно получены, сохраняем их в файл
			if err := storage.SaveTrendsToFile(trends); err != nil {
				log.Printf("Ошибка при сохранении трендов в файл: %v", err)
			} else {
				log.Println("Тренды сохранены в файл")
			}
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(trends)
	}
}
