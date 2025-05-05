package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// GetPlaylist extracts a YouTube Music playlist's track list using its ID.
func GetWatchlist(c *gin.Context) {
	var req struct {
		URL string `json:"url"`
		Cnt int    `json:"cnt"`
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	result, err := ExtractWatchlist(req.URL, req.Cnt)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	}

	c.JSON(http.StatusOK, gin.H{
		"watchlist": result,
	})
}
