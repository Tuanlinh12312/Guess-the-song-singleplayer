package controller

import (
	"App/database"
	"net/http"

	"github.com/gin-gonic/gin"
)

func ValidateName(c *gin.Context) {
	var req struct {
		Name string `json:"name"`
	}

	// get name guess
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "correctly guessed song name",
		"correct": req.Name == database.SongList[database.CrrSong].Title,
	})
}
