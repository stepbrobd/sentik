package provider

import (
	"sync"

	"github.com/cdipaolo/sentiment"
	"sentik.xyz/provider/twitter"
)

type Provider struct {
	Sentiment *sentiment.Models
	Twitter   *twitter.Client
}

var once sync.Once
var instance *Provider

func Init(cfg map[string]string) error {
	once.Do(func() {
		twitter, err := twitter.Make(cfg)
		if err != nil {
			return
		}

		sentiment, err := sentiment.Restore()
		if err != nil {
			return
		}

		instance = &Provider{
			Sentiment: &sentiment,
			Twitter:   &twitter,
		}
	})
	return nil
}

func Get() *Provider {
	return instance
}
