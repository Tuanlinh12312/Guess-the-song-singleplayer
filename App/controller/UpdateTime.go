package controller

import (
	"App/database"
	"net/http"

	"github.com/gin-gonic/gin"
)

func UpdateTime(c *gin.Context) {
	var req struct {
		Time int `json:"time"`
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	database.Time = req.Time;
	c.JSON(http.StatusOK, gin.H{
		"message": "Set round!",
		"time":   req.Time,
	})
}
