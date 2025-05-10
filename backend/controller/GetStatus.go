package controller

import (
	"backend/database"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetStatus(c *gin.Context) {
	gameOver := database.CrrSong == database.Round
	song := database.Song{}
	if !gameOver {
		song = database.SongList[database.CrrSong]
	}

	c.JSON(http.StatusOK, gin.H{
		"gameover": gameOver,
		"song":     song,
		"round":    database.CrrSong + 1,
		"time":     database.Time,
	})
}
