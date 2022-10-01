package main

import (
	"log"

	"stepbrobd.com/hackmit/twitter"
)

func main() {
	twitter := twitter.MakeClient()

	id, err := twitter.GetUserIDByUsername("StepBroBD")
	if err != nil {
		log.Fatal(err)
	}
	log.Printf("UserID: %s", id)

	// tweets, err := twitter.GetUserTweetsByID(id)
	// if err != nil {
	//  	log.Fatal(err)
	// }
	// log.Printf("Tweets: %v", tweets[0].(map[string]interface{})["text"])
}
