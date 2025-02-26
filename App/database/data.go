package database

type Song struct {
	Title   string   `json:"title"`
	Artists []string `json:"artists"`
	URL     string   `json:"url"`
	Thumbnail string `json:"thumbnail"`
}

var SongList []Song
var CrrSong int
var Round int
var Time int
