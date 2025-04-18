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
	cacheTTL  = 1 * time.Hour
)

type CachedData struct {
	Trends    []models.Trend `json:"trends"`
	Details   []models.Trend `json:"details"`
	Timestamp time.Time      `json:"timestamp"`
}

func SaveAllData(newTrends []models.Trend, newDetails []models.Trend) error {
	mu.Lock()
	defer mu.Unlock()

	existingTrends, existingDetails, err := loadData()
	if err != nil {
		return err
	}

	if existingTrends == nil {
		existingTrends = []models.Trend{}
	}
	if existingDetails == nil {
		existingDetails = []models.Trend{}
	}

	maxID := 0
	for _, t := range existingTrends {
		if t.ID > maxID {
			maxID = t.ID
		}
	}
	for _, d := range existingDetails {
		if d.ID > maxID {
			maxID = d.ID
		}
	}

	for i, t := range newTrends {
		if t.ID == 0 {
			maxID++
			newTrends[i].ID = maxID
		}
		existingTrends = append(existingTrends, newTrends[i])
	}

	for i, d := range newDetails {
		if d.ID == 0 {
			maxID++
			newDetails[i].ID = maxID
		}
		existingDetails = append(existingDetails, newDetails[i])
	}

	data := CachedData{
		Trends:    existingTrends,
		Details:   existingDetails,
		Timestamp: time.Now(),
	}

	fileContent, err := json.MarshalIndent(data, "", "  ")
	if err != nil {
		return err
	}

	return os.WriteFile(cacheFile, fileContent, 0o644)
}

func LoadAllData() ([]models.Trend, []models.Trend, bool, error) {
	mu.Lock()
	defer mu.Unlock()

	fileInfo, err := os.Stat(cacheFile)
	if err != nil {
		if os.IsNotExist(err) {
			return nil, nil, true, nil
		}
		return nil, nil, false, err
	}

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

func SaveTrendDetail(detail models.Trend) error {
	mu.Lock()
	defer mu.Unlock()

	trends, details, err := loadData()
	if err != nil {
		return err
	}

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

func loadData() ([]models.Trend, []models.Trend, error) {
	fileContent, err := os.ReadFile(cacheFile)
	if err != nil {
		if os.IsNotExist(err) {
			return []models.Trend{}, []models.Trend{}, nil
		}
		return nil, nil, err
	}

	var data CachedData
	if err := json.Unmarshal(fileContent, &data); err != nil {
		return nil, nil, err
	}

	if data.Trends == nil {
		data.Trends = []models.Trend{}
	}
	if data.Details == nil {
		data.Details = []models.Trend{}
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

	return os.WriteFile(cacheFile, file, 0o644)
}
