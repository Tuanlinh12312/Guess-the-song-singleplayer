package main

import (
	"backend/controller"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.New()
	router.Use(gin.Logger())
	router.Use(cors.Default())

	// API routes (keep these above the static routes)
	router.POST("/UploadSong", controller.UploadSong)
	router.POST("/UpdateRound", controller.UpdateRound)
	router.PATCH("/UpdateTime", controller.UpdateTime)
	router.POST("/GetNameArtist", controller.GetNameArtist)
	router.POST("/GetWatchlist", controller.GetWatchlist)
	router.POST("/GetPlaylist", controller.GetPlaylist)
	router.PUT("/StartGame", controller.StartGame)
	router.POST("/Guess", controller.ValidateGuess)
	router.GET("/Status", controller.GetStatus)
	router.POST("/NextRound", controller.NextRound)

	router.Static("/static", "../frontend/build/static")
	router.Static("/images", "../frontend/build/images")
	router.Static("/fonts", "../frontend/build/fonts")
	router.NoRoute(func(c *gin.Context) {
		c.File("../frontend/build/index.html")
	})

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	router.Run(":" + port)
}
