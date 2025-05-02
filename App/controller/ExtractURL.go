package controller

import (
	"App/database"

	"fmt"
	"regexp"

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

func extractSongInfo(t *ytmusic.TrackItem, url string) database.Song {
	var song database.Song
	song.Title = t.Title
	song.Artists = make([]string, 0)

	for _, artist := range t.Artists {
		song.Artists = append(song.Artists, artist.Name)
	}
	fixTitle(&song.Title, &song.Artists)

	song.Thumbnail = t.Thumbnails[0].URL
	song.Start = 0
	song.End = t.Duration
	song.URL = url
	return song
}

func ExtractURL(url string) (database.Song, error) {
	videoID, err := extractVideoID(url)
	if err != nil {
		return database.Song{}, err
	}

	result, err := ytmusic.GetWatchPlaylist(videoID)
	if err != nil {
		return database.Song{}, err
	}

	if len(result) == 0 {
		return database.Song{}, fmt.Errorf("Found no songs")
	}

	return extractSongInfo(result[0], url), nil
}