package controller

import (
	"App/database"
	"net/http"

	"github.com/gin-gonic/gin"
)

func NextSong(c *gin.Context) {
	database.CrrSong++

	if database.Round == database.CrrSong {
		c.JSON(http.StatusOK, gin.H{
			"message": "game ended",
			"next":    false,
		})
	} else {
		c.JSON(http.StatusOK, gin.H{
			"message": "proceeded",
			"next":    true,
			"url":     database.SongList[database.CrrSong].URL,
		})
	}
}
