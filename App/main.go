package main

import (
	"App/controller"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.New()
	router.Use(gin.Logger())
	router.Use(cors.Default())
	router.POST("/songs", controller.UploadSongs)
	router.POST("/round", controller.SetRound)
	router.POST("/GuessName", controller.SetGuessName)
	router.POST("/GuessAuthor", controller.SetGuessAuthor)
	router.Run("localhost:8080")
}
