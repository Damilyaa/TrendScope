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
	prompt := `Generate a JSON array of 6 unique current trends (could be any of this categorie:technologies, politics, education, fashion, business, health, sport, entertainment, social media trends, science)  as of 2025. Each trend should be an object with the following fields:
    - id (number)
    - name (string)
    - tag (string, lowercase version of name with no spaces)
    - description (string, maximum 3 sentences)
    - category (string)
    - growth (string)
    - chartData (array of 7 numbers for monthly growth)
    - articles (array of 3 objects with title and link fields)
    - socialPosts (array of 3 objects with platform, content and link fields)
    - keyPlayers (array of strings)
    - useCases (array of strings)
    - pros (array of strings)
    - cons (array of strings)
    - futureOutlook (string, at least 5 sentences)
    
    Additional requirements:
    - Ensure trends are diverse and not repeated across responses
    - For socialPosts, use platforms: Twitter, Reddit, or LinkedIn
    - For articles and socialPosts, use real, valid URLs (e.g., https://example.com/article1) instead of placeholders like "#"
	- Artickes should be valid and popular (to be a trend)
    - Generate realistic demo content based on plausible trends
    - Ensure the output is valid JSON`

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
