package controller

import (
	"App/database"
	"net/http"

	"github.com/gin-gonic/gin"
)

func ValidateAuthor(c *gin.Context) {
	var req struct {
		Author string `json:"author"`
	}

	// get name guess
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "correctly guessed song author",
		"correct": req.Author == database.SongList[database.CrrSong].Author,
	})
}
