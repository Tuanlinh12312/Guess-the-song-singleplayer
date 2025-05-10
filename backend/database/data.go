package database

type Song struct {
	Title      string   `json:"title"`
	Artists    []string `json:"artists"`
	URL        string   `json:"url"`
	Thumbnail  string   `json:"thumbnail"`
	Start      int      `json:"start"`
	End        int      `json:"end"`
	CntTitle   int      `json:"ctitle"`
	CntArtists int      `json:"cartists"`
}

var CrrGuessedArtists []bool
var SongList []Song
var CrrSong int
var Round int
var Time int
