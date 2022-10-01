package openai

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"strings"

	dotEnv "github.com/joho/godotenv"
)

type openaiClient struct {
	client   *http.Client
	endpoint string
	token    string
}

func MakeClient() *openaiClient {
	err := dotEnv.Load("../.env.local")
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	return &openaiClient{
		client:   &http.Client{},
		endpoint: "https://api.openai.com",
		token:    os.Getenv("OPENAI_KEY"),
	}
}

func (openai *openaiClient) sendRequest(req *http.Request) (*http.Response, error) {
	req.Header.Add("Content-Type", "application/json")
	req.Header.Add("Authorization", "Bearer "+openai.token)

	res, err := openai.client.Do(req)
	if err != nil {
		return nil, err
	}
	if res.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("request failed with status code %d", res.StatusCode)
	}

	return res, nil
}

func (openai *openaiClient) SentimentAnalysis(text string) (string, error) {
	prefix := "Classify the sentiment for the following tweet (negative/neutral/positive):\n\n'"
	suffix := "'\n\nTweet sentiment rating:"

	param := map[string]interface{}{
		"model":             "text-davinci-002",
		"prompt":            prefix + strings.ReplaceAll(text, "\n", " ") + suffix,
		"temperature":       0,
		"max_tokens":        60,
		"top_p":             1.0,
		"frequency_penalty": 0.0,
		"presence_penalty":  0.0,
	}
	payload, err := json.Marshal(param)
	if err != nil {
		return "", err
	}

	req, err := http.NewRequest("POST", openai.endpoint+"/v1/completions", bytes.NewBuffer(payload))
	if err != nil {
		return "", err
	}

	res, err := openai.sendRequest(req)
	if err != nil {
		return "", err
	}

	defer res.Body.Close()

	content, err := io.ReadAll(res.Body)
	if err != nil {
		return "", err
	}

	object := make(map[string]interface{})
	err = json.Unmarshal(content, &object)
	if err != nil {
		return "", err
	}

	m := object["choices"].([]interface{})[0].(map[string]interface{})["text"].(string)

	if strings.Contains(m, "egative") {
		return "negative", nil
	}

	if strings.Contains(m, "eutral") {
		return "neutral", nil
	}

	if strings.Contains(m, "ositive") {
		return "positive", nil
	}

	return "", nil
}
