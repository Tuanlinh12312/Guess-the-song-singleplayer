import { useState } from "react";
import axios from "axios";

const StartGameButton = ({ rounds, songs, time }) => {
  const [loading, setLoading] = useState(false);

  const handleStartGame = async () => {
    if (rounds <= 0 || rounds > songs.length) {
      alert("Invalid number of rounds");
      return;
    }
    if (songs.length === 0) {
      alert("Please enter a song");
      return;
    }
    if (time === 0) {
      alert("Please choose a time limit")
    }

    setLoading(true);

    try {
        const response = await axios.post("http://localhost:8080/UpdateSong", songs);
        console.log(response.data.message);
    } catch (err) {
        console.log(
            `Error: ${err.response?.data?.error || "Something went wrong"}`
        );
    }
    try {
        const response = await axios.post("http://localhost:8080/UpdateTime", time);
        console.log(response.data.message);
    } catch (err) {
        console.log(
            `Error: ${err.response?.data?.error || "Something went wrong"}`
        );
    }
    try {
      const response = await axios.post("http://localhost:8080/UpdateRound", rounds);
      console.log(response.data.message);
  } catch (err) {
      console.log(
          `Error: ${err.response?.data?.error || "Something went wrong"}`
      );
  }
    try {
        const response = await axios.put("http://localhost:8080/StartGame");
        console.log(response.data.message);
    } catch (err) {
        console.log(
            `Error: ${err.response?.data?.error || "Something went wrong"}`
        );
    }
  };

  return (
    <div class="flex flex-col justify-start items-center mr-10 ml-auto">
    <div class="flex flex-col items-center mt-4"> 
    <button class="flex justify-center items-center mt-3"
    onClick={handleStartGame} disabled={loading}>
    <img 
      src="/images/icon1.png" 
      alt="background" 
      className="absolute w-52 mt-3 object-cover z-0" 
    />
    <span className="relative z-10 font-darumadrop text-3xl text-black mt-1 mr-3 text-center">
        {loading ? "Starting..." : "Start"}
      </span>
    </button>
    </div>
    </div>
  );
}

export default StartGameButton;
