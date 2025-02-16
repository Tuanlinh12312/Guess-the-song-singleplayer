package controller

import (
	"App/database"
	"fmt"
	"math/rand"
	"net/http"

	"github.com/gin-gonic/gin"
)

func StartGame(c *gin.Context) {
	// initialize crrSong
	database.CrrSong = -1

	fmt.Println(database.Round)

	// shuffle song list
	for i := len(database.SongList) - 1; i > 0; i-- {
		j := rand.Intn(i + 1)
		database.SongList[i], database.SongList[j] = database.SongList[j], database.SongList[i]
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Game started!",
	})
}
