package controller

import (
	"net/http"

	"App/database"

	"fmt"
	"regexp"

	"github.com/gin-gonic/gin"
	"github.com/raitonoberu/ytmusic"
)

func extractVideoID(url string) (string, error) {
	re := regexp.MustCompile(`(?:v=|\/)([0-9A-Za-z_-]{11})`)
	matches := re.FindStringSubmatch(url)

	if len(matches) > 1 {
		return matches[1], nil
	}
	return "", fmt.Errorf("invalid URL")
}

func fixTitle(title *string, artists *[]string) {
	feat := regexp.MustCompile(`\((?:feat\.|ft\.)\s+([^()]+)\)`)
	matches := feat.FindAllStringSubmatch(*title, -1)

	for _, match := range matches {
		if len(match) > 1 {
			*artists = append(*artists, match[1])
		}
	}

	brackets := regexp.MustCompile(`\((.*?)\)|\[(.*?)\]`)
	*title = brackets.ReplaceAllString(*title, "")
}

func GetNameArtist(c *gin.Context) {
	var song database.Song
	if err := c.ShouldBindJSON(&song); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	}
	fmt.Println(song.URL)


	videoID, err := extractVideoID(song.URL)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	result, err := ytmusic.GetWatchPlaylist(videoID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if len(result) == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Couldn't parse song"})
		return
	}

	song.Title = result[0].Title
	song.Artists = make([]string, 0)
	for _, artist := range result[0].Artists {
		song.Artists = append(song.Artists, artist.Name)
	}
	fixTitle(&song.Title, &song.Artists)

	c.JSON(http.StatusOK, gin.H{
		"song": song,
	})
}
