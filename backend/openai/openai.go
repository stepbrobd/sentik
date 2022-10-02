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
	//"strconv"

	dotEnv "github.com/joho/godotenv"
)

type OpenAIClient struct {
	client   *http.Client
	endpoint string
	token    string
}

func MakeClient() *OpenAIClient {
	err := dotEnv.Load("../.env.local")
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	return &OpenAIClient{
		client:   &http.Client{},
		endpoint: "https://api.openai.com",
		token:    os.Getenv("OPENAI_KEY"),
	}
}

func (openai *OpenAIClient) sendRequest(req *http.Request) (*http.Response, error) {
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



func (openai *OpenAIClient) SentimentAnalysis(texts []string) []string {
	prefix := "Classify the sentiment for the following tweets (negative/neutral/positive):\n\n'"
	suffix := "'\n\nTweet sentiment rating:"
	
	prompt := []string{}
	for i, text := range texts {
		prompt = append(prompt, fmt.Sprintf("%v. %v", i+1, text))
	}

	
	param := map[string]interface{}{
		"model":             "text-curie-001",
		"prompt":            prefix + strings.Join(prompt, "\n") + suffix,
		"temperature":       0,
		//"max_tokens":        60,
		"top_p":             1.0,
		"frequency_penalty": 0.0,
		"presence_penalty":  0.0,
		"labels": ["positive", "negative", "neutral"],
	}
	fmt.Printf(param["prompt"].(string))
	payload, err := json.Marshal(param)
	if err != nil {
		log.Printf("Marshal Error: %v", err)
		return nil
	}

	req, err := http.NewRequest("POST", openai.endpoint+"/v1/completions", bytes.NewBuffer(payload))
	if err != nil {
		log.Printf("Req Error: %v", err)
		return nil
	}

	res, err := openai.sendRequest(req)
	if err != nil {
		log.Printf("Res Error: %v", err)
		return nil
	}

	defer res.Body.Close()

	content, err := io.ReadAll(res.Body)
	if err != nil {
		log.Printf("Error: %v", err)
		return nil
	}

	object := make(map[string]interface{})
	err = json.Unmarshal(content, &object)
	if err != nil {
		log.Printf("Error: %v", err)
		return nil
	}

	m := object["choices"].([]interface{})[0].(map[string]interface{})["text"].(string)

	log.Printf(m)

	ret := []string{}
	for _, l := range strings.Split(m, "\n") {
		if len(l) > 1 {
			if strings.Contains(l, "egative") {
				ret = append(ret, "negative")
			}else if strings.Contains(l, "eutral") {
				ret = append(ret, "neutral")
			}else if strings.Contains(l, "ositive") {
				ret = append(ret, "positive")
			}
		}
	}

	return ret
}
