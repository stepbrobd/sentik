package main

import (
    "net/http"
	"log"
	"os/exec"
	"hackmit/mr"
    "github.com/gin-gonic/gin"
)

const (
	//Number of Mappers
	M			int = 5
	//Number of Reduce Tasks
	R			int = 1
	//Map input files
	files		string[]
)
type ticker struct {
	Ticker		string
	Name		string
	Date		string //UTC Format
}

func getTickers(c *gin.Context) {
	//Spawn map workers
	for i=0; i<M; i++ {
		go func(){
			cmd := exec.Command("go", "run", "../mr/worker.go", "./ticker.so")
			cmd.Run()
		}()
	}
	m := mr.MakeCoordinator(files, R)
	for !m.Done() { }

	c.IndentedJSON(http.StatusOK, )
}

func main() {
	if len(os.Args) < 2 {
		fmt.Fprintf(os.Stderr, "No input files, expects %v", M)
		os.Exit(1)
	}
	files := os.Args[1:]
	router := gin.Default()
    router.GET("/tickers", getTickers)

    router.Run("localhost:8080")
}



