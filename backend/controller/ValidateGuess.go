package controller

import (
	"backend/database"
	"net/http"

	"regexp"
	"strings"

	"github.com/gin-gonic/gin"
	"fmt"
	"golang.org/x/text/unicode/norm"
	"unicode"
)

// removeDiacritics removes all tone marks
func removeDiacritics(s string) string {
	t := norm.NFD.String(s)
	var b strings.Builder
	for _, r := range t {
		if unicode.Is(unicode.Mn, r) {
			continue // skip non-spacing marks
		}
		if r == 'đ' || r == 'Đ' {
			r = 'd'
		}
		b.WriteRune(r)
	}
	return b.String()
}

func match(a, b string) bool {
	fmt.Printf("Uncleaned A: '%s'\n", strings.ToLower(a))
	fmt.Printf("Uncleaned B: '%s'\n", strings.ToLower(b))
	a = removeDiacritics(a)
	b = removeDiacritics(b)
	re := regexp.MustCompile(`[^a-zA-Z0-9]`)
	a = re.ReplaceAllString(strings.ToLower(a), "")
	b = re.ReplaceAllString(strings.ToLower(b), "")
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
