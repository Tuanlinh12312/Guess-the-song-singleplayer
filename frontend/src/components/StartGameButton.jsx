import { useState } from "react";
import axios from "axios";

const StartGameButton = ({ rounds, songs }) => {
  const [loading, setLoading] = useState(false);

  const handleStartGame = async () => {
    if (rounds <= 0 || rounds > songs.length) {
      alert("Invalid number of rounds");
      return;
    }
    if (songs.length === 0) {
      alert("List does not contain any song");
      return;
    }

    setLoading(true);

    try {
        const response = await axios.post("http://localhost:8080/songs", songs);
        console.log(response.data.message);
    } catch (err) {
        console.log(
            `Error: ${err.response?.data?.error || "Something went wrong"}`
        );
    }
    try {
        const response = await axios.post("http://localhost:8080/round", rounds);
        console.log(response.data.message);
    } catch (err) {
        console.log(
            `Error: ${err.response?.data?.error || "Something went wrong"}`
        );
    }
    try {
        const response = await axios.put("http://localhost:8080/start");
        console.log(response.data.message);
    } catch (err) {
        console.log(
            `Error: ${err.response?.data?.error || "Something went wrong"}`
        );
    }
  };

  return (
    <button class = "text-center" onClick={handleStartGame} disabled={loading}>
      {loading ? "Starting..." : "Start Game"}
    </button>
  );
};

export default StartGameButton;
