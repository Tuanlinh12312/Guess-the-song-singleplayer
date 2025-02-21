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
    // <body class="overflow-hidden">
    <div class="bg-image h-screen bg-cover bg-center bg-fixed">
    <h1 class="text-8xl font-darumadrop font-bold drop-shadow-[8px_8px_0px_black] tracking-wide text-center w-full uppercase text-white">
    Guess the song</h1>
    <div class="flex flex-col justify-start mt-10 items-center rounded-3xl bg-amber-900/10 mr-10 ml-auto pt-10 w-[calc(50%-40px)] h-2/3">
    <div class="flex flex-col justify-center items-start rounded-2xl w-[calc(100%-120px)] bg-b1 mt-3">
    <div class="flex items-start w-full mb-6">
    <div class="flex flex-col px-6 w-full overflow-y-auto">
      <h2 class="text-center font-bold text-3xl font-EBGaramond text-white drop-shadow-[2px_1px_0px_black] mt-2 mb-2">Number of Rounds</h2>
    
      <RoundInput onSetRounds={handleSetRounds} />
      <p>Rounds: {rounds}</p>

      <h3 class="text-center font-bold text-3xl mt-2 font-EBGaramond text-white drop-shadow-[2px_1px_0px_black] mb-2">Your Song</h3>
      <SongInput onAddSong={handleAddSong} />
      </div>
      </div> 
      </div>
      </div>
      <SongList songs={songs} onDeleteSong={handleDeleteSong} />

      <div class="flex flex-col justify-start items-center mr-10 ml-auto">
      <div class="w-[calc(50%-40px)] flex flex-col items-center justify-start mt-4 ml-auto">
      <StartGameButton rounds={rounds} songs={songs} />
      </div>
      </div>
    </div>
    // </body>
  );
};

export default GameSetup;
