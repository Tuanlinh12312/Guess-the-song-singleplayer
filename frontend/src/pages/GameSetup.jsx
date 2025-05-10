import { useState } from "react";
import api from "../api"; // 🔄 Use shared axios instance
import RoundInput from "../components/GameSetup/RoundInput";
import SongInput from "../components/GameSetup/SongInput";
import SongList from "../components/GameSetup/SongList";
import StartGameButton from "../components/GameSetup/StartGameButton";
import GuessTime from "../components/GameSetup/GuessTime";

const GameSetup = () => {
  const [rounds, setRounds] = useState(0);
  const [songs, setSongs] = useState([]);
  const [time, setTime] = useState(0);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleAddSong = async (url, cnt) => {
    const isDuplicate = (newSong) =>
      songs.some((existingSong) => existingSong.url === newSong.url);

    const addUniqueSongs = (newSongs) => {
      const uniqueSongs = [];
      let duplicates = 0;

      for (const song of newSongs) {
        if (!isDuplicate(song)) {
          uniqueSongs.push(song);
        } else {
          duplicates++;
        }
      }

      if (duplicates > 0) {
        alert(
          `${duplicates} duplicate song${duplicates > 1 ? "s" : ""} were skipped.`
        );
      }

      if (uniqueSongs.length > 0) {
        setSongs((prev) => [...prev, ...uniqueSongs]);
      }
    };

    try {
      if (cnt === -1) {
        const response = await api.post("/GetNameArtist", { url });
        addUniqueSongs([response.data.song]);
      } else if (cnt === -2) {
        const response = await api.post("/GetPlaylist", { url });
        const list = response.data.playlist;
        if (Array.isArray(list)) {
          addUniqueSongs(list);
        }
      } else {
        const response = await api.post("/GetWatchlist", {
          url,
          cnt,
        });
        const list = response.data.watchlist;
        if (Array.isArray(list)) {
          addUniqueSongs(list);
        }
      }
    } catch (err) {
      console.error("Error fetching songs:", err);
      setErrorMessage(
        err.response?.data?.error || "Something went wrong while fetching songs."
      );
    }
  };

  const handleDeleteSong = (index) => {
    setSongs(songs.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-image h-screen bg-cover bg-center bg-fixed">
      <div className="flex justify-center items-center">
        <img
          src="images/logo.png"
          alt="Guess the Song Logo"
          className="h-28 w-auto mr-4 mt-3"
        />
        <h1 className="text-8xl font-darumadrop font-bold drop-shadow-[8px_8px_0px_black] -mt-2 tracking-wide uppercase text-white">
          Guess the Song
        </h1>
      </div>

      <div className="flex -mt-7 h-[calc(100%-230px)]">
        <SongList songs={songs} onDeleteSong={handleDeleteSong} />
        <div className="flex flex-col justify-start mt-10 items-center rounded-3xl bg-amber-900/10 mr-10 ml-auto pt-10 w-[calc(50%-60px)] h-[calc(100%-35px)]">
          <div className="flex flex-col justify-center items-start rounded-2xl w-[calc(100%-120px)] bg-b1">
            <div className="flex items-start w-full mb-6">
              <div className="flex flex-col px-6 w-full">
                <h2 className="text-center font-bold text-3xl font-EBGaramond text-white drop-shadow-[2px_1px_0px_black] mt-2 mb-2">
                  Number of Rounds
                </h2>
                <RoundInput onSetRounds={setRounds} />
                <h3 className="text-center font-bold text-3xl mt-2 font-EBGaramond text-white drop-shadow-[2px_1px_0px_black] mb-2">
                  Your Song
                </h3>
                <SongInput onAddSong={handleAddSong} />
                <h3 className="text-center font-bold text-3xl mt-2 font-EBGaramond text-white drop-shadow-[2px_1px_0px_black] mb-2">
                  Guess Time
                </h3>
                <GuessTime onSetTime={setTime} />
              </div>
            </div>
          </div>
          {errorMessage && (
            <div className="text-red-500 text-center mb-4">
              <strong>Error:</strong> {errorMessage}
            </div>
          )}
          <h3 className="text-left mr-auto ml-20 font-bold text-2xl mt-2 font-Roboto text-white drop-shadow-[2px_1px_0px_black]">
            Now Playing
          </h3>
          <h4 className="text-left mr-auto ml-20 text-l font-Roboto text-white drop-shadow-[2px_1px_0px_black]">
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
  );
};

export default GameSetup;
