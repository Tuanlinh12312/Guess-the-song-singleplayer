import React, { useState } from "react";
import axios from "axios";
// eslint-disable-next-line
import { Navigate, useNavigate } from "react-router-dom";
import '../index.css';

const SongSubmissionForm = () => {
  const navigate = useNavigate();
  const [round, setRound] = useState({ round: 10 });
  const [songs, setSongs] = useState([{ name: "", author: "", url: "" }]);
  const [message, setMessage] = useState("");

  const handleChange = (index, field, value) => {
    const updatedSongs = [...songs];
    updatedSongs[index][field] = value;
    setSongs(updatedSongs);
  };

  const handleRoundChange = (value) => {
    setRound({ round: +value });
  };

  const addSong = () => {
    setSongs([...songs, { name: "", author: "", url: "" }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/songs", songs);
      console.log(response.data.message);
    } catch (err) {
      setMessage(
        `Error: ${err.response?.data?.error || "Something went wrong"}`
      );
    }
    try {
      const response = await axios.post("http://localhost:8080/round", round);
      setMessage(response.data.message);
    } catch (err) {
      setMessage(
        `Error: ${err.response?.data?.error || "Something went wrong"}`
      );
    }
    navigate("/ingame");
  };

  return (

    <body class="overflow-hidden">
    <div class="bg-image h-screen bg-cover bg-center bg-fixed">
      <h1 class="text-8xl font-darumadrop font-bold drop-shadow-[8px_8px_0px_black] tracking-wide text-center w-full pt-1 uppercase text-white">
        Guess the song
      </h1>
      <div class="flex justify-center items-start mt-10 h-full">
      <div class="flex flex-col justify-start items-center rounded-3xl bg-amber-900/10 mr-10 ml-auto pt-10 w-1/2 h-2/3">
      <div class="flex flex-col justify-center items-start rounded-2xl w-[calc(100%-120px)] bg-b1 mt-3">
      <div class="flex items-start w-full">
      <div class="flex items-start w-full mb-6">
      <form onSubmit={handleSubmit} class="flex flex-col px-6 w-full overflow-y-auto">
          <div>
            <h2 class="text-center font-bold text-3xl font-EBGaramond text-white drop-shadow-[2px_1px_0px_black] mt-2 mb-2">Number of Rounds</h2>
            <input
              type="number"
              placeholder="10"
              onChange={(e) => handleRoundChange(e.target.value)}
              class="border border-gray-300 rounded py-1 w-full"
            />
          </div>
          <div>
            <h3 class="text-center font-bold text-3xl mt-2 font-EBGaramond text-white drop-shadow-[2px_1px_0px_black] mb-2">Your Song</h3>
            {songs.map((song, index) => (
              <div key={index} style={{ marginBottom: "1rem" }}>
                <input
                //   type="text"
                //   placeholder="Song Name"
                //   value={song.name}
                //   onChange={(e) => handleChange(index, "name", e.target.value)}
                //   class="border border-gray-300 rounded py-1 w-1/3 "
                // />
                // <input
                //   type="text"
                //   placeholder="Author"
                //   value={song.author}
                //   onChange={(e) =>
                //     handleChange(index, "author", e.target.value)
                //   }
                //   class="border border-gray-300 rounded py-1 w-1/3"
                // />
                // <input
                  type="text"
                  placeholder="URL"
                  value={song.url}
                  onChange={(e) => handleChange(index, "url", e.target.value)}
                  class="border border-gray-300 rounded py-1 w-full"
                />
              </div>
            ))}
          </div>
          <div class="flex flex-row">
          <button class="text-white mr-3"  type="button" onClick={addSong}>
            Add Song
          </button>
          <button class="text-white" type="submit">Start Game</button>
          </div>
        </form>
        </div>
        {message && <p>{message}</p>}
      </div>
      </div>
      <h3 class="text-left mr-auto ml-20 font-bold text-2xl mt-2 font-Roboto text-white drop-shadow-[2px_1px_0px_black] ">Now Playing</h3>
      <h4 class="text-left mr-auto ml-20 text-l font-Roboto text-white drop-shadow-[2px_1px_0px_black] ">Your Favourite Playlist</h4>
      <img
        src="/images/icon.png"
        alt="Icon"
        className="w-64 h-64 object-contain scale-150 -mt-[60px] "
      />
      </div>
      </div>
      </div>
      </body>
  );
};


export default SongSubmissionForm;
