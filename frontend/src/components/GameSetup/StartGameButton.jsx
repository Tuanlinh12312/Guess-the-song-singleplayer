import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";

const StartGameButton = ({ rounds, songs, time }) => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

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
      alert("Please choose a time limit");
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    try {
      await api.post("/UploadSong", songs);
      await api.patch("/UpdateTime", { time });
      await api.post("/UpdateRound", { round: rounds });
      await api.put("/StartGame");

      navigate("/game");
    } catch (err) {
      console.error("Error starting game:", err);
      setErrorMessage(err.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
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
