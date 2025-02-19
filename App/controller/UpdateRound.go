package controller

import (
	"App/database"
	"net/http"

	"github.com/gin-gonic/gin"
)

func UpdateRound(c *gin.Context) {
	var req struct {
		Round int `json:"round"`
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	database.Round = req.Round
	c.JSON(http.StatusOK, gin.H{
		"message": "Set round!",
		"count":   req.Round,
	})
}
