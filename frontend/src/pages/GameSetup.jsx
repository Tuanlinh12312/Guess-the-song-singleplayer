import { useState } from "react";
import axios from "axios";
import RoundInput from "../components/GameSetup/RoundInput";
import SongInput from "../components/GameSetup/SongInput";
import SongList from "../components/GameSetup/SongList";
import StartGameButton from "../components/GameSetup/StartGameButton";
import GuessTime from "../components/GameSetup/GuessTime";

const GameSetup = () => {
  const [rounds, setRounds] = useState(0);
  const [songs, setSongs] = useState([]);
  const [time, setTime] = useState(0);

  const handleSetRounds = (round) => {
    setRounds(round);
  };

  const handleSetTime = (time) => {
    setTime(time);
  };

  const handleAddSong = async (url, cnt) => {
    if (cnt === -1) {
      // Add a single song
      console.log("Fetching single song:", url);
      try {
        const response = await axios.post("http://localhost:8080/GetNameArtist", { url });
        console.log("Fetched song:", response.data.song);
        setSongs((prev) => [...prev, response.data.song]);
      } catch (err) {
        console.error("Error fetching single song:", err);
      }
    } else if (cnt === -2) {
      // Add a playlist
      console.log("Fetching playlist from:", url);
      try {
        const response = await axios.post("http://localhost:8080/GetPlaylist", { url });
        const list = response.data.playlist;
        if (Array.isArray(list)) {
          console.log("Fetched playlist:", list);
          setSongs((prev) => [...prev, ...list]);
        }
      } catch (err) {
        console.error("Error fetching playlist:", err);
      }
    } else {
      // Add a list of suggested songs
      console.log(`Fetching ${cnt} suggested songs from:`, url);
      try {
        const response = await axios.post("http://localhost:8080/GetWatchlist", {
          url,
          cnt,
        });
  
        const list = response.data.watchlist;
        if (Array.isArray(list)) {
          console.log("Fetched watchlist:", list);
          setSongs((prev) => [...prev, ...list]);
        }
      } catch (err) {
        console.error("Error fetching suggested songs:", err);
      }
    }
  };  

  const handleDeleteSong = (index) => {
    setSongs(songs.filter((_, i) => i !== index));
  };

  return (
    // <body class="overflow-hidden">
    <div class="bg-image h-screen bg-cover bg-center bg-fixed">
      <h1 class="text-8xl font-darumadrop font-bold drop-shadow-[8px_8px_0px_black] tracking-wide text-center w-full uppercase text-white">
        Guess the song
      </h1>
      <div class="flex h-[calc(100%-230px)]">
        <SongList songs={songs} onDeleteSong={handleDeleteSong} />
        <div class="flex flex-col justify-start mt-10 items-center rounded-3xl bg-amber-900/10 mr-10 ml-auto pt-10 w-[calc(50%-60px)] h-[calc(100%-35px)]">
          <div class="flex flex-col justify-center items-start rounded-2xl w-[calc(100%-120px)] bg-b1">
            <div class="flex items-start w-full mb-6">
              <div class="flex flex-col px-6 w-full">
                <h2 class="text-center font-bold text-3xl font-EBGaramond text-white drop-shadow-[2px_1px_0px_black] mt-2 mb-2">
                  Number of Rounds
                </h2>
                <RoundInput onSetRounds={handleSetRounds} />
                <h3 class="text-center font-bold text-3xl mt-2 font-EBGaramond text-white drop-shadow-[2px_1px_0px_black] mb-2">
                  Your Song
                </h3>
                <SongInput onAddSong={handleAddSong} />
                <h3 class="text-center font-bold text-3xl mt-2 font-EBGaramond text-white drop-shadow-[2px_1px_0px_black] mb-2">
                  Guess Time
                </h3>
                <GuessTime onSetTime={setTime}></GuessTime>
              </div>
            </div>
          </div>
          <h3 class="text-left mr-auto ml-20 font-bold text-2xl mt-2 font-Roboto text-white drop-shadow-[2px_1px_0px_black] ">
            Now Playing
          </h3>
          <h4 class="text-left mr-auto ml-20 text-l font-Roboto text-white drop-shadow-[2px_1px_0px_black] ">
            Your Favourite Playlist
          </h4>
          <img
            src="/images/icon.png"
            alt="Icon"
            className="object-contain scale-50 -mt-[40px]"
          />
        </div>
      </div>
      <StartGameButton rounds={rounds} songs={songs} time={time} />
    </div>
    // </body>
  );
};

export default GameSetup;
