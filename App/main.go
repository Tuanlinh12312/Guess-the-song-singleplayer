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
	router.POST("/UploadSong", controller.UploadSong)
	router.POST("/UpdateRound", controller.UpdateRound)
	router.PATCH("/UpdateTime", controller.UpdateTime)
	router.POST("/GetNameArtist", controller.GetNameArtist)
	router.PUT("/StartGame", controller.StartGame)
	router.POST("/Guess", controller.ValidateGuess)
	router.GET("/Status", controller.GetStatus)
	router.Run("localhost:8080")
}
