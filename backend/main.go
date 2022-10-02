package main

import (
	"fmt"
	"log"
	"hackmit/openai"
	"hackmit/twitter"
)

func main() {
	openai := openai.MakeClient()
	twitter := twitter.MakeClient()

	tweets, err := twitter.GetTrendingByTicker("AAPL")
	if err != nil {
		log.Fatal(err)
	}
	for i, t := range tweets {
		text := t.(map[string]interface{})["text"].(string)
		sentiment, err := openai.SentimentAnalysis(text)
		if err != nil {
			log.Fatal(err)
		}
		fmt.Printf("[%v]\n[%v]\n[%v]\n\n", i, sentiment, text)
	}
}
