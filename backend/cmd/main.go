package main

import (
	"log"
	"net/http"
	"time"
	"trendscope/internal/api"
	"trendscope/internal/handlers"
)

func main() {
	apiKey := "AIzaSyB1xK6JIa_Lg_0k8lpIjKB6ImfIKidSrIs"
	if apiKey == "" {
		log.Fatal("APIKey не задан")
	}

	gemini := &api.GeminiAPI{
		APIEndpoint: "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
		APIKey:      apiKey,
		Client: &http.Client{
			Timeout: 15 * time.Second,
		},
	}

	http.HandleFunc("/api/trends", handlers.GetTrendsHandler(gemini))
	log.Println("Server started on :8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
