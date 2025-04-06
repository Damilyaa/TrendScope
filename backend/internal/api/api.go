package api

import (
	"bytes"
	"encoding/json"
	"errors"
	"io"
	"log"
	"net/http"
	"strings"

	"trendscope/internal/models"
	"trendscope/internal/storage"
	"trendscope/pkg"
)

type GeminiAPI struct {
	APIEndpoint string
	APIKey      string
	Client      *http.Client
}

func (g *GeminiAPI) AnalyzeTrends() ([]models.Trend, error) {
	prompt := `Generate a JSON array of exactly 6 unique and diverse current trends as of 2025. Each trend should be a JSON object with the following fields:

	- id (number; set to 0 or leave out to allow auto-assignment)
	- name (string; the trend's official name)
	- tag (string; a lowercase, hyphenated version of the name, no spaces)
	- description (string; up to 3 concise sentences)
	- category (string; must be exactly one of the following predefined categories: "technologies", "politics", "education", "fashion", "business", "health", "sport", "entertainment", "social media", "science"; the value must strictly match one of these; and must be capitalized)
	- growth (string; e.g. "Rapid", "Stable", "Declining", etc.)
	- chartData (array of 7 numbers showing monthly growth, must be realistic)
	- articles (array of 3 objects with 'title' and 'link' fields; use real popular article URLs from reputable sources)
	- socialPosts (array of 3 objects with 'platform' (Twitter, Reddit, or LinkedIn), 'content', and 'link' fields)
	- keyPlayers (array of strings; names of companies, individuals, or organizations)
	- useCases (array of strings; practical or emerging use cases)
	- pros (array of strings; benefits or advantages)
	- cons (array of strings; drawbacks or risks)
	- futureOutlook (string; must be at least 5 well-formed sentences describing long-term expectations and potential)

	Additional instructions:
	- Ensure each trend belongs to a unique category.
	- No duplicate tags or trends.
	- Output must be a valid JSON array, with no markdown formatting, code fencing, or extra text — only the raw JSON output.`

	// Формируем тело запроса с параметрами генерации
	requestPayload := map[string]interface{}{
		"contents": []map[string]interface{}{
			{
				"parts": []map[string]string{
					{
						"text": prompt,
					},
				},
			},
		},
		"generationConfig": map[string]interface{}{
			"temperature": 0.9, // Увеличивает случайность
			"topK":        50,  // Увеличивает разнообразие
		},
	}

	data, err := json.Marshal(requestPayload)
	if err != nil {
		log.Printf("Ошибка при маршалинге payload: %v", err)
		return nil, err
	}

	// Создаём запрос
	req, err := http.NewRequest("POST", g.APIEndpoint, bytes.NewReader(data))
	if err != nil {
		log.Printf("Ошибка при создании запроса: %v", err)
		return nil, err
	}
	req.Header.Set("Content-Type", "application/json")
	q := req.URL.Query()
	q.Add("key", g.APIKey) // Оставляем только ключ в query
	req.URL.RawQuery = q.Encode()

	resp, err := g.Client.Do(req)
	if err != nil {
		log.Printf("Ошибка при выполнении запроса к Gemini API: %v", err)
		return nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		body, _ := io.ReadAll(resp.Body)
		log.Printf("Ошибка: %s, тело ответа: %s", resp.Status, string(body))
		return nil, errors.New("Gemini API вернул ошибку: " + resp.Status)
	}

	body, err := pkg.ReadAll(resp.Body)
	if err != nil {
		log.Printf("Ошибка при чтении тела ответа: %v", err)
		return nil, err
	}

	type GeminiResponse struct {
		Candidates []struct {
			Content struct {
				Parts []struct {
					Text string `json:"text"`
				} `json:"parts"`
			} `json:"content"`
		} `json:"candidates"`
	}

	var gemRes GeminiResponse
	if err := json.Unmarshal(body, &gemRes); err != nil {
		log.Printf("Ошибка при разборе ответа: %v", err)
		return nil, err
	}

	if len(gemRes.Candidates) == 0 || len(gemRes.Candidates[0].Content.Parts) == 0 {
		log.Println("Нет кандидатов в ответе")
		return nil, errors.New("no candidates returned")
	}

	generatedText := gemRes.Candidates[0].Content.Parts[0].Text
	generatedText = strings.TrimPrefix(generatedText, "```json\n")
	generatedText = strings.TrimSuffix(generatedText, "\n```")
	generatedText = strings.TrimSpace(generatedText)

	var trends []models.Trend
	if err := json.Unmarshal([]byte(generatedText), &trends); err != nil {
		log.Printf("Ошибка при разборе сгенерированного JSON: %v", err)
		return nil, err
	}

	if err := storage.SaveAllData(trends, nil); err != nil {
		log.Printf("⚠️ Ошибка сохранения трендов: %v", err)
	}

	return trends, nil
}

func (g *GeminiAPI) GetTrends() ([]models.Trend, error) {
	// Загружаем кэшированные данные
	cachedTrends, _, isStale, err := storage.LoadAllData()
	if err != nil {
		return nil, err
	}

	// Если кэш пуст, синхронно получаем новые данные
	if len(cachedTrends) == 0 {
		newTrends, err := g.AnalyzeTrends()
		if err != nil {
			return nil, err
		}
		return newTrends, nil
	}

	// Если данные устарели, запускаем обновление в фоне
	if isStale {
		go func() {
			log.Println("Фоновое обновление трендов...")
			newTrends, err := g.AnalyzeTrends()
			if err != nil {
				log.Printf("Ошибка при обновлении трендов: %v", err)
				return
			}
			// При сохранении новые данные добавляются к кэшу
			if err := storage.SaveAllData(newTrends, nil); err != nil {
				log.Printf("Ошибка сохранения обновлённых трендов: %v", err)
			} else {
				log.Println("Кэш трендов успешно обновлён.")
			}
		}()
	}

	// Отдаем сразу кэшированные данные
	return cachedTrends, nil
}
