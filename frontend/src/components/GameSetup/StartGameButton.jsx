import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";

const StartGameButton = ({ round, songs, time }) => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleStartGame = async () => {
    if (round <= 0 || round > songs.length) {
      alert("Please enter a valid number of rounds");
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
    setErrorMessage(null);

    try {
      // Single API call to initialize game
      await api.post("/StartGame", {
        songs,
        time,
        round,
      });

      navigate("/game");
    } catch (err) {
      console.error("Error starting game:", err);
      setErrorMessage(err.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-start items-center w-full">
      <div className="flex flex-col items-center mt-7 w-full">
        {errorMessage && (
          <div className="text-red-500 mb-4">
            <strong>Error:</strong> {errorMessage}
          </div>
        )}
        <button
          className="relative flex justify-center items-center mt-3 w-full max-w-[300px]"
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
