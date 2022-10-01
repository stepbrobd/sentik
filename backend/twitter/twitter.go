package twitter

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"

	dotEnv "github.com/joho/godotenv"
)

type twitterClient struct {
	client   *http.Client
	endpoint string
	token    string
}

func MakeClient() *twitterClient {
	err := dotEnv.Load("../.env.local")
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	return &twitterClient{
		client:   &http.Client{},
		endpoint: "https://api.twitter.com",
		token:    os.Getenv("TWITTER_KEY"),
	}
}

func (twitter *twitterClient) sendRequest(req *http.Request) (*http.Response, error) {
	req.Header.Add("Authorization", "Bearer "+twitter.token)

	res, err := twitter.client.Do(req)
	if err != nil {
		return nil, err
	}
	if res.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("request failed with status code %d", res.StatusCode)
	}

	return res, nil
}

func (twitter *twitterClient) GetUserIDByUsername(username string) (string, error) {
	req, err := http.NewRequest("GET", twitter.endpoint+"/2/users/by/username/"+username, nil)
	if err != nil {
		return "", err
	}

	res, err := twitter.sendRequest(req)
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

	return object["data"].(map[string]interface{})["id"].(string), nil
}

func (twitter *twitterClient) GetUserTweetsByID(id string) ([]interface{}, error) {
	req, err := http.NewRequest("GET", twitter.endpoint+"/2/users/"+id+"/tweets", nil)
	if err != nil {
		return nil, err
	}

	res, err := twitter.sendRequest(req)
	if err != nil {
		return nil, err
	}

	defer res.Body.Close()

	content, err := io.ReadAll(res.Body)
	if err != nil {
		return nil, err
	}

	object := make(map[string]interface{})
	err = json.Unmarshal(content, &object)
	if err != nil {
		return nil, err
	}

	return object["data"].([]interface{}), nil
}

func (twitter *twitterClient) GetTrendingByTicker(keyword string) ([]interface{}, error) {
	req, err := http.NewRequest("GET", twitter.endpoint+"/2/tweets/search/recent?query="+keyword+"&max_results=100", nil)
	if err != nil {
		return nil, err
	}

	res, err := twitter.sendRequest(req)
	if err != nil {
		return nil, err
	}

	defer res.Body.Close()

	content, err := io.ReadAll(res.Body)
	if err != nil {
		return nil, err
	}

	object := make(map[string]interface{})
	err = json.Unmarshal(content, &object)
	if err != nil {
		return nil, err
	}

	return object["data"].([]interface{}), nil
}
