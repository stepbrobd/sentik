package tickers

import (
	"fmt"
	"log"
	"net/http"
	"strings"
	"time"

	"sentik.xyz/provider"

	"github.com/cdipaolo/sentiment"
	"github.com/gin-gonic/gin"
)

type tweet struct {
	Id      string `json:"id"`
	Ticker  string `json:"ticker"`
	Sent    string `json:"sentiment"`
	Content string `json:"content"`
	Date    string `json:"date"`
}

type response map[string][]tweet

func fetch(ticker string) []tweet {
	p := provider.Get()

	tweets, err := p.Twitter.SearchRecent(ticker, 100)
	if err != nil {
		log.Panicf("Error fetching tweets for ticker: %v", ticker)
		return nil
	}

	texts := make([]string, len(tweets))
	sentiments := make([]string, len(tweets))
	for i, t := range tweets {
		if t != nil {
			text := fmt.Sprint(t.(map[string]interface{})["text"])
			texts[i] = text
			if p.Sentiment.SentimentAnalysis(texts[i], sentiment.English).Score == 1 {
				sentiments[i] = "positive"
			} else {
				sentiments[i] = "negative"
			}
		}
	}

	var res = []tweet{}
	for i, t := range tweets {
		if t != nil {
			res = append(res, tweet{
				Id:      fmt.Sprint(t.(map[string]interface{})["id"]),
				Ticker:  ticker,
				Content: texts[i],
				Sent:    sentiments[i],
				Date:    fmt.Sprint(time.Now().UTC()),
			})
		}
	}
	return res
}

func Run(c *gin.Context) {
	tickers := strings.Split(c.Param("tickers"), ",")
	res := make(response, len(tickers))
	for _, ticker := range tickers {
		res[ticker] = fetch(ticker)
	}
	c.IndentedJSON(http.StatusOK, res)
}
