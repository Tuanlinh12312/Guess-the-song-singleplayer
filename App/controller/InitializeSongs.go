package controller

import (
	"App/database"
	"net/http"

	"github.com/gin-gonic/gin"
)

func UploadSongs(c *gin.Context) {
	// get song list
	if err := c.ShouldBindJSON(&database.SongList); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Songs received!",
		"count":   len(database.SongList),
	})
}
