package storage

import (
	"encoding/json"
	"os"
	"sync"
	"time"
	"trendscope/internal/models"
)

var (
	mu        sync.Mutex
	cacheFile = "../parsedata/trends.json"
)

type CachedData struct {
	Trends    []models.Trend `json:"trends"`
	Details   []models.Trend `json:"details"`
	Timestamp time.Time      `json:"timestamp"`
}

func SaveAllData(trends []models.Trend, details []models.Trend) error {
	mu.Lock()
	defer mu.Unlock()

	data := CachedData{
		Trends:    trends,
		Details:   details,
		Timestamp: time.Now(),
	}

	file, err := json.MarshalIndent(data, "", "  ")
	if err != nil {
		return err
	}

	return os.WriteFile(cacheFile, file, 0644)
}

func LoadAllData() ([]models.Trend, []models.Trend, error) {
	mu.Lock()
	defer mu.Unlock()

	file, err := os.ReadFile(cacheFile)
	if err != nil {
		return nil, nil, err
	}

	var data CachedData
	if err := json.Unmarshal(file, &data); err != nil {
		return nil, nil, err
	}

	return data.Trends, data.Details, nil
}

func SaveTrendDetail(detail models.Trend) error {
	mu.Lock()
	defer mu.Unlock()

	// Загружаем текущие данные
	trends, details, err := loadData()
	if err != nil {
		return err
	}

	// Обновляем или добавляем детали
	found := false
	for i, d := range details {
		if d.ID == detail.ID {
			details[i] = detail
			found = true
			break
		}
	}

	if !found {
		details = append(details, detail)
	}

	// Сохраняем обратно
	return saveData(trends, details)
}

func LoadTrendDetail(trendID int) (*models.Trend, error) {
	_, details, err := LoadAllData()
	if err != nil {
		return nil, err
	}

	for _, d := range details {
		if d.ID == trendID {
			return &d, nil
		}
	}
	return nil, os.ErrNotExist
}

// Вспомогательные функции
func loadData() ([]models.Trend, []models.Trend, error) {
	file, err := os.ReadFile(cacheFile)
	if err != nil {
		if os.IsNotExist(err) {
			return []models.Trend{}, []models.Trend{}, nil
		}
		return nil, nil, err
	}

	var data CachedData
	if err := json.Unmarshal(file, &data); err != nil {
		return nil, nil, err
	}

	return data.Trends, data.Details, nil
}

func saveData(trends []models.Trend, details []models.Trend) error {
	data := CachedData{
		Trends:    trends,
		Details:   details,
		Timestamp: time.Now(),
	}

	file, err := json.MarshalIndent(data, "", "  ")
	if err != nil {
		return err
	}

	return os.WriteFile(cacheFile, file, 0644)
}
