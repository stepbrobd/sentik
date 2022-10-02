package main

import (
	"fmt"
	"log"
	"strings"
	"net/http"
	"time"

	"github.com/cdipaolo/sentiment"
	"hackmit/twitter"
	"github.com/gin-gonic/gin"
)

type Tickers map[string][]Tweet

type Tweet struct {
	Id      string `json:id`
	Ticker  string `json:ticker`
	Sent    string `json:sentiment`
	Content string `json:content`
	Date    string `json:date` //UTC Format
}

type API struct {
	twitter		*twitter.TwitterClient
	model		*sentiment.Models
}

func (api *API) fetchTweet(ticker string) []Tweet {
	tweets, err := api.twitter.SearchRecent(ticker, 100)
	if err != nil {
		log.Printf("Error fetching tweets for ticker: %v", ticker)
		return nil
	}

	texts := make([]string, len(tweets))
	sentiments := make([]string, len(tweets))
	for i, t := range tweets {
		if t != nil {
			text := fmt.Sprint(t.(map[string]interface{})["text"])
			texts[i] = text
			if api.model.SentimentAnalysis(texts[i], sentiment.English).Score == 1 {
				sentiments[i] = "positive"
			} else {
				sentiments[i] = "negative"
			}
		}
	}

	var res = []Tweet{}
	for i, t := range tweets {
		if t != nil {
			res = append(res, Tweet{
				Id:      fmt.Sprint(t.(map[string]interface{})["id"]),
				Ticker:  ticker,
				Content: texts[i],
				Sent:	 sentiments[i],
				Date:    fmt.Sprint(time.Now().UTC()),
			})
		}
	}
	return res
}

func (api *API) getTickers(c *gin.Context) {
	tickers := strings.Split(c.Param("tickers"), ",")
	res := make(Tickers)
	for _, ticker := range tickers {
		log.Printf("Fetching data for %v...", ticker)
		res[ticker] = api.fetchTweet(ticker)
	}
	c.IndentedJSON(http.StatusOK, res)
}

func main() {
	router := gin.Default()
	model, err := sentiment.Restore()
	if err != nil {
		log.Print("Unable to restore Sentiment Analysis model")
	}
	api := API{
		twitter: twitter.MakeClient(),
		model: &model,
	}
	router.GET("/tickers/:tickers", api.getTickers)

	router.Run("localhost:8080")
}
