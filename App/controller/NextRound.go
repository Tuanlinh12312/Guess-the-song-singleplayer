package controller

import (
	"App/database"
	"net/http"

	"github.com/gin-gonic/gin"
)

func NextRound(c *gin.Context) {
	database.CrrSong ++ 
	if database.CrrSong < database.Round {
		database.CrrGuessedArtists = make([]bool, len(database.SongList[database.CrrSong].Artists))
	}
	c.JSON(http.StatusOK, gin.H{
		"ended": database.CrrSong == database.Round,
	})
}