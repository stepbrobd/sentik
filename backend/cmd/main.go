package main

import (
	"log"
	"time"

	"sentik.xyz/config"
	"sentik.xyz/provider"
	"sentik.xyz/route/v1/tickers"

	sentry "github.com/getsentry/sentry-go"
	sentryGin "github.com/getsentry/sentry-go/gin"
	cors "github.com/gin-contrib/cors"
	gin "github.com/gin-gonic/gin"
)

func main() {
	err := sentry.Init(sentry.ClientOptions{
		Dsn:              "https://6479523177b544298572799391497ce9@o1109490.ingest.sentry.io/4504000551583744",
		TracesSampleRate: 1.0,
	})
	if err != nil {
		log.Fatal(err)
	}
	defer sentry.Flush(time.Second)

	cfg, err := config.Load()
	if err != nil {
		log.Fatal(err)
	}

	err = provider.Init(cfg)
	if err != nil {
		log.Fatal(err)
	}

	router := gin.New()
	router.Use(gin.Logger())
	router.Use(gin.Recovery())
	router.Use(sentryGin.New(sentryGin.Options{}))
	router.Use(cors.New(cors.Config{
		AllowOrigins: []string{"*"},
		ExposeHeaders: []string{
			"Content-Length",
			"Content-Type",
		},
	}))

	v1 := router.Group("/v1")
	{
		v1.GET("/tickers/:tickers", tickers.Run)
	}

	router.Run(":8080")
}
