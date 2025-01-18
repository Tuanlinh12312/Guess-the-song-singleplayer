import React, { useState } from "react";
import axios from "axios";

const SongSubmissionForm = () => {
  const [round, setRound] = useState({"round": 10})
  const [songs, setSongs] = useState([{"name": "", "author": "", "url": "" }]);
  const [message, setMessage] = useState("");

  const handleChange = (index, field, value) => {
    const updatedSongs = [...songs];
    updatedSongs[index][field] = value;
    setSongs(updatedSongs);
  };

  const handleRoundChange = (value) => {
    setRound({"round": +value});
  }

  const addSong = () => {
    setSongs([...songs, { "name": "", "author": "", "url": "" }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/songs", songs);
      setMessage(response.data.message);
    } catch (err) {
      setMessage(`Error: ${err.response?.data?.error || "Something went wrong"}`);
    }
    try {
      const response = await axios.post("http://localhost:8080/round", round);
      setMessage(response.data.message);
    } catch (err) {
      setMessage(`Error: ${err.response?.data?.error || "Something went wrong"}`);
    }
  };

  return (
    <div>
      <h2>Configure game</h2>
      <form onSubmit={handleSubmit}>
        <h3>Number of Rounds</h3>
        <input
          type="number"
          placeholder="10"
          onChange={(e) => handleRoundChange(e.target.value)}
        />
        <h3>Song List</h3>
        {songs.map((song, index) => (
          <div key={index} style={{ marginBottom: "1rem" }}>
            <input
              type="text"
              placeholder="Song Name"
              value={song.name}
              onChange={(e) => handleChange(index, "name", e.target.value)}
            />
            <input
              type="text"
              placeholder="Author"
              value={song.author}
              onChange={(e) => handleChange(index, "author", e.target.value)}
            />
            <input
              type="text"
              placeholder="URL"
              value={song.url}
              onChange={(e) => handleChange(index, "url", e.target.value)}
            />
          </div>
        ))}
        <button type="button" onClick={addSong}>
          Add Song
        </button>
        <button type="submit">Start Game</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default SongSubmissionForm;