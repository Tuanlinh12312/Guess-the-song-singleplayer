import { useState } from "react";
import axios from "axios";
import RoundInput from "../components/RoundInput";
import SongInput from "../components/SongInput";
import SongList from "../components/SongList";
import StartGameButton from "../components/StartGameButton";
import DisplaySong from "../components/DisplaySong"

const GameSetup = () => {
  const [rounds, setRounds] = useState(0);
  const [songs, setSongs] = useState([]);

  const handleSetRounds = (round) => {
    setRounds(round);
  };

  const handleAddSong = async (songUrl) => {
    console.log("requesting:", {url:songUrl})
    try {
      const response = await axios.post("http://localhost:8080/GetNameArtist", {url : songUrl});
      setSongs([...songs,  <DisplaySong title={response.data.song.title} artists={response.data.song.artists} />]);
    } catch (err) {
      console.log(
        `Error: ${err.response?.data?.error || "Unable to fetch songURL"}`
      );
      console.log(songUrl)
    }
  };

  const handleDeleteSong = (index) => {
    setSongs(songs.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h1>Game Setup</h1>
      <RoundInput onSetRounds={handleSetRounds} />
      <p>Rounds: {rounds}</p>

      <SongInput onAddSong={handleAddSong} />
      <SongList songs={songs} onDeleteSong={handleDeleteSong} />

      <StartGameButton rounds={rounds} songs={songs} />
    </div>
  );
};

export default GameSetup;
