package twitter

import (
	"fmt"
	"log"
)

func (c *Client) GetUserIDByUsername(username string) (string, error) {
	obj, err := c.get(c.endpoint + "/2/users/by/username/" + username)
	if err != nil {
		return "", err
	}

	return obj["data"].(map[string]interface{})["id"].(string), nil
}

func (c *Client) GetUserTweetsByID(id string) ([]interface{}, error) {
	obj, err := c.get(c.endpoint + "/2/users/" + id + "/tweets")
	if err != nil {
		return nil, err
	}

	return obj["data"].([]interface{}), nil
}

func (c *Client) SearchRecent(keyword string, count int) ([]interface{}, error) {
	obj, err := c.get(fmt.Sprintf("%v/2/tweets/search/recent?query=%v%v&max_results=%v", c.endpoint, "lang%3Aen%20", keyword, count))
	if err != nil {
		log.Printf("Error Fetching Twitter: %v", err)
		return nil, err
	}

	return obj["data"].([]interface{}), nil
}
