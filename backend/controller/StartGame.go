package controller

import (
	"backend/database"
	"math/rand"
	"net/http"

	"github.com/gin-gonic/gin"
)

func StartGame(c *gin.Context) {
	for i := len(database.SongList) - 1; i > 0; i-- {
		j := rand.Intn(i + 1)
		database.SongList[i], database.SongList[j] = database.SongList[j], database.SongList[i]
	}

	for i := range database.SongList {
		song := database.SongList[i]
		song.CntArtists = 0
		song.CntTitle = 0
		
		duration := song.End
		song.End = rand.Intn(database.Time) + duration/2
		song.Start = song.End - database.Time
		
		if song.Start < 0 {
			song.Start, song.End = 0, song.End - song.Start
		}
		
		database.SongList[i] = song
	}

	database.CrrSong = 0
	database.CrrGuessedArtists = make([]bool, len(database.SongList[0].Artists))

	c.JSON(http.StatusOK, gin.H{
		"message": "Game started!",
	})
}
