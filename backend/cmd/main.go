package main

import (
	"log"
	"net/http"
	"time"
	"trendscope/internal/api"
	"trendscope/internal/handlers"
)

func corsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "http://89.219.32.91:5173")
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

	mux := http.NewServeMux()

	mux.HandleFunc("/api/trends", handlers.GetTrendsHandler(gemini))

	handler := corsMiddleware(mux)

	log.Println("Server started on :8008")
	log.Fatal(http.ListenAndServe(":8008", handler))
}
