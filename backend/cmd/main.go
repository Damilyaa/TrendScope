package main

import (
	"log"
	"net/http"
	"time"

	"trendscope/internal/api"
	"trendscope/internal/handlers"
)

// Middleware для добавления CORS-заголовков
func corsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:5173")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusOK)
			return
		}
		next.ServeHTTP(w, r)
	})
}

func main() {
	apiKey := "AIzaSyCvzA-sP2QtCUTbAyzU5Fe9kHcRT3Fdrsw"
	if apiKey == "" {
		log.Fatal("APIKey не задан")
	}

	gemini := &api.GeminiAPI{
		APIEndpoint: "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
		APIKey:      apiKey,
		Client: &http.Client{
			Timeout: 45 * time.Second,
		},
	}

	// Создаём мультиплексор
	mux := http.NewServeMux()

	// Регистрируем обработчик
	mux.HandleFunc("/api/trends", handlers.GetTrendsHandler(gemini))

	// Оборачиваем в middleware CORS
	handler := corsMiddleware(mux)

	log.Println("Server started on :8008")
	log.Fatal(http.ListenAndServe(":8008", handler))
}
