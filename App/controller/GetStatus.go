package controller

import (
	"App/database"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetStatus(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"gameover": database.CrrSong == database.Round,
		"song":   database.SongList[database.CrrSong],
		"round": database.CrrSong+1,
		"time": database.Time,
	})
}
