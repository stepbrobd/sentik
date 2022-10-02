package main

import (
	"fmt"
	"log"
	"hackmit/twitter"
)

func main() {
	twitter := twitter.MakeClient()

	tweets, err := twitter.GetTrendingByTicker("AAPL")
	if err != nil {
		log.Fatal(err)
	}
	for i, t := range tweets {
		text := t.(map[string]interface{})["text"].(string)
	}
}
