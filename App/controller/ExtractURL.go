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

func uniqueArtists(input []string) []string {
	seen := map[string]bool{}
	var result []string
	for _, artist := range input {
		key := strings.ToLower(strings.TrimSpace(artist))
		if key != "" && !seen[key] {
			seen[key] = true
			result = append(result, artist)
		}
	}
	return result
}

func fixTitle(title *string, artists *[]string) {
	// Step 1: Extract (feat/ft) patterns inside brackets
	feat := regexp.MustCompile(`(?i)\((?:feat\.?|ft\.?)\s+([^)]+)\)`)
	matches := feat.FindAllStringSubmatch(*title, -1)

	for _, match := range matches {
		if len(match) > 1 {
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

	// Step 2: Remove all bracketed metadata
	brackets := regexp.MustCompile(`\s*(\([^()]*\)|\[[^\[\]]*\])`)
	cleanTitle := brackets.ReplaceAllString(*title, "")
	cleanTitle = strings.TrimSpace(cleanTitle)

	// Step 3: Extract feat/ft not in brackets
	outsideFeat := regexp.MustCompile(`(?i)(?:feat\.?|ft\.?)\s+(.+)$`)
	if match := outsideFeat.FindStringSubmatch(cleanTitle); len(match) > 1 {
		split := regexp.MustCompile(`\s*(,|&|and)\s*`)
		names := split.Split(match[1], -1)
		for _, name := range names {
			trimmed := strings.TrimSpace(name)
			if trimmed != "" {
				*artists = append(*artists, trimmed)
			}
		}
		cleanTitle = outsideFeat.ReplaceAllString(cleanTitle, "")
		cleanTitle = strings.TrimSpace(cleanTitle)
	}

	// Step 4: Remove common suffixes like remix, version, ver., etc.
	suffixes := regexp.MustCompile(`(?i)\b(remix|live|edit|explicit|clean|original mix|ver\.?|version|piano cover|acoustic|official mv)\b`)
	cleanTitle = suffixes.ReplaceAllString(cleanTitle, "")
	cleanTitle = strings.TrimSpace(cleanTitle)

	// Step 4.5: Replace " x " or " X " (used as separator) with delimiter
	cleanTitle = regexp.MustCompile(`(?i)\s+x\s+`).ReplaceAllString(cleanTitle, " | ")

	// Step 5: Split by non-letter, non-whitespace (preserving accents and words)
	splitRegex := regexp.MustCompile(`[^\p{L}\p{N}\p{Zs}]+`)
	parts := splitRegex.Split(cleanTitle, -1)

	if len(parts) <= 1 {
		*title = cleanTitle
		*artists = uniqueArtists(*artists)
		return
	}

	// Find longest part => assume it's the title
	longestIdx := 0
	maxLen := len(parts[0])
	for i, part := range parts {
		if len(part) > maxLen {
			longestIdx = i
			maxLen = len(part)
		}
	}

	finalTitle := strings.TrimSpace(parts[longestIdx])
	var newArtists []string
	for i, part := range parts {
		if i != longestIdx {
			p := strings.TrimSpace(part)
			if p != "" {
				newArtists = append(newArtists, p)
			}
		}
	}

	*title = finalTitle
	*artists = uniqueArtists(append(*artists, newArtists...))
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
