package database

type Song struct {
	Title    string   `json:"title"`
	Artists []string `json:"artists"`
	URL     string   `json:"url"`
}

var SongList []Song
var CrrSong int
var Round int
