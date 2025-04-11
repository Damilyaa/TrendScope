package models

import (
	"net/http"
	"time"
)

type Trend struct {
	ID            int          `json:"id"`
	Name          string       `json:"name"`
	Tag           string       `json:"tag"`
	Description   string       `json:"description"`
	Category      string       `json:"category"`
	Growth        string       `json:"growth"`
	ChartData     []float64    `json:"chartData"`
	Articles      []Article    `json:"articles"`
	SocialPosts   []SocialPost `json:"socialPosts"`
	KeyPlayers    []string     `json:"keyPlayers,omitempty"`
	UseCases      []string     `json:"useCases,omitempty"`
	Pros          []string     `json:"pros,omitempty"`
	Cons          []string     `json:"cons,omitempty"`
	FutureOutlook string       `json:"futureOutlook,omitempty"`
}

type Article struct {
	Title string `json:"title"`
	Link  string `json:"link"`
}

type SocialPost struct {
	Platform string `json:"platform"`
	Content  string `json:"content"`
	Link     string `json:"link"`
}

type CachedTrends struct {
	Trends    []Trend   `json:"trends"`
	Timestamp time.Time `json:"timestamp"`
}

type TrendAnalyzer interface {
	AnalyzeTrends() ([]Trend, error)
}

type GeminiAPI struct {
	APIEndpoint string
	APIKey      string
	Client      *http.Client
}

type Response struct {
	Trends    []Trend     `json:"trends"`
	Details   interface{} `json:"details"`
	Timestamp string      `json:"timestamp"`
}
