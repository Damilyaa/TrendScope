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
	cacheTTL  = 1 * time.Hour // Время жизни кэша
)

type CachedData struct {
	Trends    []models.Trend `json:"trends"`
	Details   []models.Trend `json:"details"`
	Timestamp time.Time      `json:"timestamp"`
}

// SaveAllData сохраняет тренды и детали в кэш
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

// LoadAllData загружает данные из кэша с проверкой актуальности
func LoadAllData() ([]models.Trend, []models.Trend, bool, error) {
	mu.Lock()
	defer mu.Unlock()

	fileInfo, err := os.Stat(cacheFile)
	if err != nil {
		if os.IsNotExist(err) {
			return nil, nil, true, nil // Кэш отсутствует, нужно обновить
		}
		return nil, nil, false, err
	}

	// Проверяем, устарел ли кэш
	isStale := time.Since(fileInfo.ModTime()) > cacheTTL

	file, err := os.ReadFile(cacheFile)
	if err != nil {
		return nil, nil, false, err
	}

	var data CachedData
	if err := json.Unmarshal(file, &data); err != nil {
		return nil, nil, false, err
	}

	return data.Trends, data.Details, isStale, nil
}

// SaveTrendDetail добавляет или обновляет детали тренда
func SaveTrendDetail(detail models.Trend) error {
	mu.Lock()
	defer mu.Unlock()

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

	return saveData(trends, details)
}

// LoadTrendDetail загружает детали конкретного тренда по ID
func LoadTrendDetail(trendID int) (*models.Trend, error) {
	_, details, _, err := LoadAllData()
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
