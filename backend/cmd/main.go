package main

import (
	"log"
	"net/http"
	"time"
	"trendscope/internal/api"
	"trendscope/internal/handlers"
)

func main() {
	apiKey := ""
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

	http.HandleFunc("/api/trends", handlers.GetTrendsHandler(gemini))

	log.Println("Server started on :8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
