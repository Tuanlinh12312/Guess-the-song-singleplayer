package controller

import (
	"App/database"
	"net/http"

	"regexp"
	"strings"

	"github.com/gin-gonic/gin"
	"fmt"
	"golang.org/x/text/unicode/norm"
	"unicode"
)

// removeDiacritics removes Vietnamese tone marks and other accents
func removeDiacritics(s string) string {
	t := norm.NFD.String(s)
	var b strings.Builder
	for _, r := range t {
		if unicode.Is(unicode.Mn, r) {
			continue // skip non-spacing marks
		}
		b.WriteRune(r)
	}
	return b.String()
}

func match(a, b string) bool {
	a = removeDiacritics(a)
	b = removeDiacritics(b)
	re := regexp.MustCompile(`[^a-zA-Z0-9]`)
	a = strings.ToLower(re.ReplaceAllString(a, ""))
	b = strings.ToLower(re.ReplaceAllString(b, ""))
	fmt.Printf("Cleaned A: '%s'\n", a)
	fmt.Printf("Cleaned B: '%s'\n", b)
	return a == b
}

func ValidateGuess(c *gin.Context) {
	var req struct {
		Guess string `json:"guess"`
	}

	
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	
	s := req.Guess
	song := &database.SongList[database.CrrSong]
	message := "Incorrect guess. Try again!"
	point := 0
	
	if match(s, song.Title) {
		if song.CntTitle == 0 {
			song.CntTitle = 1
			message = "Correct song title!"
			point = 2
		} else {
			message = "You've already guessed the song title correctly."
		}
	}

	for i, Artist := range song.Artists {
		if match(s, Artist) {
			if !database.CrrGuessedArtists[i] {
				database.CrrGuessedArtists[i] = true 
				song.CntArtists++
				message = "Correct Artist"
				point = 1
			} else {
				message = "You've already guessed this artist correctly."
			}
		}
	}

	if song.CntTitle == 1 && song.CntArtists == len(song.Artists) {
		message = "You've guessed everything."
	}

	c.JSON(http.StatusOK, gin.H{
		"message": message,
		"point": point,
	})
}
