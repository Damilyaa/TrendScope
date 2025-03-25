package models

import "time"

type Trend struct {
	ID          int       `json:"id"`
	Name        string    `json:"name"`
	Description string    `json:"description"`
	Category    string    `json:"category"`
	Growth      string    `json:"growth"`
	Tags        []string  `json:"tags"`
	ChartData   []float64 `json:"chartData"`
}

type CachedTrends struct {
	Trends    []Trend   `json:"trends"`
	Timestamp time.Time `json:"timestamp"`
}

type TrendAnalyzer interface {
	AnalyzeTrends() ([]Trend, error)
}
