import { useState, useEffect } from "react";
import axios from "axios";
import SongPlayer from "../components/MainGame/SongPlayer";
import RoundCount from "../components/MainGame/RoundCount";

const MainGame = () => {
  const [started, setStarted] = useState(false);
  const [round, setRound] = useState(0);
  const [song, setSong] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [guess, setGuess] = useState("");
  const [feedback, setFeedback] = useState("");

  const fetchGameStatus = async () => {
    try {
      const response = await axios.get("http://localhost:8080/Status");
      if (response.data.gameover) {
        setGameOver(true);
        setSong(null);
      } else {
        setSong(response.data.song);
        setRound(response.data.round);
      }
    } catch (error) {
      console.error("Error fetching game status:", error);
    }
  };

  const handleGuess = async () => {
    try {
      console.log("guess: ", guess);
      const response = await axios.post("http://localhost:8080/Guess", {
        guess: guess,
      });
  
      setFeedback(response.data.message);
      setGuess("");
  
      // If the round is complete and a new one should start, fetch new status
      if (response.data.next === true) {
        await fetchGameStatus();
      }
  
    } catch (error) {
      console.error("Error validating guess:", error);
    }
  };

  useEffect(() => {
    if (started) {
      fetchGameStatus();
    }
  }, [started]);  

  return (
    <div className="flex flex-col min-h-screen bg-image h-screen bg-cover bg-center bg-fixed text-white">
      <h1 className="text-4xl font-darumadrop font-bold drop-shadow-[4px_4px_0px_black] ml-5">Guess the Song</h1>
  
      {!started ? (
        <button
          className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg text-white text-xl"
          onClick={() => setStarted(true)}
        >
          ▶️ Start Game
        </button>
      ) : gameOver ? (
        <h2 className="text-2xl text-red-400">🎉 Game Over! Thanks for playing.</h2>
      ) : (
        <>
          <RoundCount round={round} />
  
          {song && <SongPlayer song={song} />}
  
          <input
            type="text"
            className="p-2 rounded-md text-black w-1/2"
            placeholder="Enter your guess..."
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
          />
          <button
            className="mt-2 p-2 bg-blue-500 hover:bg-blue-700 rounded-md"
            onClick={handleGuess}
          >
            Submit Guess
          </button>
  
          {feedback && <p className="mt-2 text-lg">{feedback}</p>}
        </>
      )}
    </div>
  );
  
};

export default MainGame;
