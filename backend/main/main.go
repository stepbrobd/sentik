package main

import (
	"fmt"
	"hackmit/twitter"
	"log"
	"strings"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

type Tickers map[string][]Tweet

type Tweet struct {
	Id     string `json:id`
	Ticker string `json:ticker`
	//Sent		string `json:sentiment`
	Content string `json:content`
	Date    string `json:date` //UTC Format
}

func fetchTweet(ticker string) []Tweet {
	tw := twitter.MakeClient()
	tweets, err := tw.GetTrendingByTicker(ticker)
	if err != nil {
		log.Printf("Error fetching tweets for ticker: %v", ticker)
		return nil
	}
	var res = []Tweet{}
	for _, t := range tweets {
		if t != nil {
			res = append(res, Tweet{
				Id:      fmt.Sprint(t.(map[string]interface{})["id"]),
				Ticker:  ticker,
				Content: fmt.Sprint(t.(map[string]interface{})["text"]),
				Date:    fmt.Sprint(time.Now().UTC()),
			})
		}
	}
	return res
}

func getTickers(c *gin.Context) {
	tickers := strings.Split(c.Param("tickers"), ",")
	res := make(Tickers)
	for _, ticker := range tickers {
		log.Printf("Fetching data for %v...", ticker)
		res[ticker] = fetchTweet(ticker)
	}
	c.IndentedJSON(http.StatusOK, res)
}

func main() {
	router := gin.Default()
	router.GET("/tickers/:tickers", getTickers)

	router.Run("localhost:8080")
}
