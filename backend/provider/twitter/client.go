package twitter

import (
	"encoding/json"
	"io"
	"net/http"
)

type Client struct {
	client   *http.Client
	endpoint string
	token    string
}

func Make(cfg map[string]string) (Client, error) {
	return Client{
		client:   &http.Client{},
		endpoint: "https://api.twitter.com",
		token:    cfg["TWITTER_KEY"],
	}, nil
}

func (c *Client) get(url string) (map[string]interface{}, error) {
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		return nil, err
	}

	req.Header.Add("Authorization", "Bearer "+c.token)

	res, err := c.client.Do(req)
	if err != nil {
		return nil, err
	}

	defer res.Body.Close()

	content, err := io.ReadAll(res.Body)
	if err != nil {
		return nil, err
	}

	obj := make(map[string]interface{})
	err = json.Unmarshal(content, &obj)
	if err != nil {
		return nil, err
	}

	return obj, nil
}
