import React, { useState } from "react";
import axios from "axios";
import YouTubePlayer from "./YoutubePlayer";

const MainGame = () => {
  const [GuessName, setGuessName] = useState({ name: "" });
  const [GuessAuthor, setGuessAuthor] = useState({ author: "" });
  const [message, setMessage] = useState("");
  const [Round, setRound] = useState(0);
  const [SongURL, setSongURL] = useState("");
  const [NameGuessed, setNameGuessed] = useState(false);
  const [AuthorGuessed, setAuthorGuessed] = useState(false);

  const handleGuessNameChange = (value) => {
    setGuessName({ name: value });
  };

  const handleGuessAuthorChange = (value) => {
    setGuessAuthor({ author: value });
  };

  const NextRound = async () => {
    console.log("sus");
    try {
      console.log("getting next round");
      const response = await axios.patch("http://localhost:8080/NextSong");
      setMessage(response.data.message);
      if (response.data.next) {
        setRound(Round + 1);
        setSongURL(response.data.url);
      }
    } catch (err) {
      setMessage(
        `Error: ${err.response?.data?.error || "Something went wrong"}`
      );
    }
  };

  const handleKeyDownName = async (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      try {
        const response = await axios.post("http://localhost:8080/GuessName", {
          name: GuessName,
        });
        setMessage(response.data.message);
        if (response.data.correct) {
          setNameGuessed(true);
          if (AuthorGuessed) {
            setNameGuessed(false);
            setAuthorGuessed(false);
            NextRound();
          }
        }
      } catch (err) {
        setMessage(
          `Error: ${err.response?.data?.error || "Something went wrong"}`
        );
      }
    }
  };

  const handleKeyDownAuthor = async (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      try {
        const response = await axios.post("http://localhost:8080/GuessAuthor", {
          author: GuessAuthor,
        });
        setMessage(response.data.message);
        if (response.data.correct) {
          setAuthorGuessed(true);
          if (NameGuessed) {
            setNameGuessed(false);
            setAuthorGuessed(false);
            NextRound();
          }
        }
      } catch (err) {
        setMessage(
          `Error: ${err.response?.data?.error || "Something went wrong"}`
        );
      }
    }
  };

  NextRound();

  return (
    <div>
      <h1>Guess the song</h1>
      <YouTubePlayer videoUrl={SongURL}></YouTubePlayer>
      <h2>Round {Round}</h2>
      <input
        type="text"
        placeholder="Song Name"
        onChange={(e) => handleGuessNameChange(e.target.value)}
        onKeyDown={handleKeyDownName}
      />
      <input
        type="text"
        placeholder="Author"
        onChange={(e) => handleGuessAuthorChange(e.target.value)}
        onKeyDown={handleKeyDownAuthor}
      />
      {message && <p>{message}</p>}
    </div>
  );
};

export default MainGame;
