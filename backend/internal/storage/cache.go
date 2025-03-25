package storage

import (
	"encoding/json"
	"os"
	"sync"
	"time"
	"trendscope/internal/models"
)

var mu sync.Mutex

const (
	cacheFile = "../parsedata/trends.json"
)

func SaveTrendsToFile(trends []models.Trend) error {
	mu.Lock()
	defer mu.Unlock()

	cached := models.CachedTrends{
		Trends:    trends,
		Timestamp: time.Now(),
	}
	data, err := json.MarshalIndent(cached, "", "  ")
	if err != nil {
		return err
	}
	return os.WriteFile(cacheFile, data, 0644)
}

func LoadTrendsFromFile() ([]models.Trend, error) {
	mu.Lock()
	defer mu.Unlock()

	data, err := os.ReadFile(cacheFile)
	if err != nil {
		return nil, err
	}
	var cached models.CachedTrends
	if err := json.Unmarshal(data, &cached); err != nil {
		return nil, err
	}
	return cached.Trends, nil
}
