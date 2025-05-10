package controller

import (
	"backend/database"
	"net/http"

	"github.com/gin-gonic/gin"
)

func UploadSong(c *gin.Context) {
	if err := c.ShouldBindJSON(&database.SongList); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Songs received!",
		"count":   len(database.SongList),
	})
}
