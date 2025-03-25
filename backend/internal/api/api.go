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
	"trendscope/pkg"
)

type GeminiAPI struct {
	APIEndpoint string
	APIKey      string
	Client      *http.Client
}

func (g *GeminiAPI) AnalyzeTrends() ([]models.Trend, error) {
	requestPayload := map[string]interface{}{
		"contents": []map[string]interface{}{
			{
				"parts": []map[string]string{
					{
						"text": "Generate a JSON array of current technology trends. " +
							"Each trend should be an object with the following fields: " +
							"id (number), name (string), description (string), category (string), " +
							"growth (string), tags (array of strings), chartData (array of numbers). " +
							"Ensure the output is valid JSON.",
					},
				},
			},
		},
	}

	data, err := json.Marshal(requestPayload)
	if err != nil {
		log.Printf("Ошибка при маршалинге payload: %v", err)
		return nil, err
	}

	req, err := http.NewRequest("POST", g.APIEndpoint, bytes.NewReader(data))
	if err != nil {
		log.Printf("Ошибка при создании запроса: %v", err)
		return nil, err
	}

	req.Header.Set("Content-Type", "application/json")
	q := req.URL.Query()
	q.Add("key", g.APIKey)
	req.URL.RawQuery = q.Encode()

	resp, err := g.Client.Do(req)
	if err != nil {
		log.Printf("Ошибка при выполнении запроса к Gemini API: %v", err)
		return nil, err
	}
	defer resp.Body.Close()

	log.Printf("Статус ответа от Gemini API: %s", resp.Status)
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

	log.Printf("Сырой ответ от Gemini API: %s", string(body))

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

	log.Printf("Очищенный текст от Gemini API: %s", generatedText)

	var trends []models.Trend
	if err := json.Unmarshal([]byte(generatedText), &trends); err != nil {
		log.Printf("Ошибка при разборе сгенерированного JSON: %v", err)
		return nil, err
	}

	return trends, nil
}
