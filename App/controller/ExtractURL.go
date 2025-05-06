package controller

import (
	"App/database"

	"fmt"
	"regexp"
	"strings"

	"github.com/garnermccloud/youtube"
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
	// Match (feat. A, B), (feat. A & B), or (feat. A and B), case-insensitive
	feat := regexp.MustCompile(`(?i)\((?:feat\.|ft\.)\s+([^)]+)\)`)
	matches := feat.FindAllStringSubmatch(*title, -1)

	for _, match := range matches {
		if len(match) > 1 {
			// Split artists by comma, ampersand, or 'and'
			split := regexp.MustCompile(`\s*(,|&|and)\s*`)
			names := split.Split(match[1], -1)
			for _, name := range names {
				trimmed := strings.TrimSpace(name)
				if trimmed != "" {
					*artists = append(*artists, trimmed)
				}
			}
		}
	}

	// Remove all brackets (e.g. (feat. ...), (Live), [Remix])
	brackets := regexp.MustCompile(`\s*(\([^()]*\)|\[[^\[\]]*\])`)
	*title = brackets.ReplaceAllString(*title, "")
	*title = strings.TrimSpace(*title)
}

func extractSongInfo(t *ytmusic.TrackItem) database.Song {
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
	song.URL = "https://music.youtube.com/watch?v=" + t.VideoID
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
		return database.Song{}, fmt.Errorf("found no songs")
	}

	return extractSongInfo(result[0]), nil
}

func ExtractWatchlist(url string, cnt int) ([]database.Song, error) {
	videoID, err := extractVideoID(url)
	if err != nil {
		return []database.Song{}, err
	}

	result, err := ytmusic.GetWatchPlaylist(videoID)
	if err != nil {
		return []database.Song{}, err
	}

	if len(result) < cnt {
		return []database.Song{}, fmt.Errorf("insufficient songs from Watchlist")
	}

	watchlist := make([]database.Song, 0)
	for i := 0; i < cnt; i++ {
		watchlist = append(watchlist, extractSongInfo(result[i]))
	}
	return watchlist, nil
}

func ExtractPlaylist(playlistURL string) ([]database.Song, error) {
	client := youtube.Client{}

	pl, err := client.GetPlaylist(playlistURL)
	if err != nil {
		return nil, err
	}

	var songs []database.Song
	for _, entry := range pl.Videos {
		var song database.Song
		song.Title = entry.Title
		song.Artists = []string{entry.Author}
		song.Thumbnail = entry.Thumbnails[0].URL
		song.Start = 0
		song.End = int(entry.Duration.Seconds())
		song.URL = "https://www.youtube.com/watch?v=" + entry.ID

		songs = append(songs, song)
	}

	return songs, nil
}
