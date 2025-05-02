package controller

import (
	"App/database"
	
	"net/http"
	"github.com/gin-gonic/gin"
)

func GetNameArtist(c *gin.Context) {
	var song database.Song
	if err := c.ShouldBindJSON(&song); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	}

	result, err := ExtractURL(song.URL)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	}

	c.JSON(http.StatusOK, gin.H{
		"song": result,
	})
}
