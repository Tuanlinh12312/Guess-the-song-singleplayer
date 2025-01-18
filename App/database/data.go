package database

type Song struct {
	Name   string `json:"name"`
	Author string `json:"author"`
	URL    string `json:"url"`
}

var SongList []Song
var CrrSong int
var Round int