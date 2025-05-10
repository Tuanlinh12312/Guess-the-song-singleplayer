import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Set up base URL for API calls
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

const StartGameButton = ({ rounds, songs, time }) => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleStartGame = async () => {
    // Validation
    if (rounds <= 0 || rounds > songs.length) {
      alert("Invalid number of rounds");
      return;
    }
    if (songs.length === 0) {
      alert("Please enter a song");
      return;
    }
    if (time === 0) {
      alert("Please choose a time limit");
      return;
    }

    setLoading(true);
    setErrorMessage(null); // Reset any previous error message

    try {
      // Upload songs
      const responseSongs = await axios.post(`${API_URL}/UploadSong`, songs);
      console.log(responseSongs.data.message);

      // Update time limit
      const responseTime = await axios.patch(`${API_URL}/UpdateTime`, { time });
      console.log(responseTime.data.message);

      // Update rounds
      const responseRounds = await axios.post(`${API_URL}/UpdateRound`, { round: rounds });
      console.log(responseRounds.data.message);

      // Start the game
      const responseStart = await axios.put(`${API_URL}/StartGame`);
      console.log(responseStart.data.message);

      // Navigate to the game page
      navigate("/game");
    } catch (err) {
      console.log(`Error: ${err.response?.data?.error || "Something went wrong"}`);
      setErrorMessage(err.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false); // Set loading to false once the process is finished
    }
  };

  return (
    <div className="flex flex-col justify-start items-center ml-auto">
      <div className="flex flex-col items-center mt-7">
        {errorMessage && (
          <div className="text-red-500 mb-4">
            <strong>Error:</strong> {errorMessage}
          </div>
        )}
        <button
          className="flex justify-center items-center mt-3"
          onClick={handleStartGame}
          disabled={loading}
        >
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
};

export default StartGameButton;
