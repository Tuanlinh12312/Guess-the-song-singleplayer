import { useState, useEffect } from "react";
import axios from "axios";
import SongPlayer from "../components/MainGame/SongPlayer";
import RoundTimer from "../components/MainGame/RoundTimer";
import GuessBar from "../components/MainGame/GuessBar";

const MainGame = () => {
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);
  const [song, setSong] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [guess, setGuess] = useState("");
  const [feedback, setFeedback] = useState("");
  const [timeCap, setTimeCap] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [guessHistory, setGuessHistory] = useState([]);

  const fetchGameStatus = async () => {
    try {
      const response = await axios.get("http://localhost:8080/Status");
      if (response.data.gameover) {
        setGameOver(true);
        setSong(null);
      } else {
        setSong(response.data.song);
        setRound(response.data.round);
        setTimeCap(response.data.time);
      }
    } catch (error) {
      console.error("Error fetching game status:", error);
    }
  };

  const handleGuess = async () => {
    try {
      const response = await axios.post("http://localhost:8080/Guess", {
        guess: guess,
      });

      const isCorrect = response.data.point > 0;
      const message = response.data.message;

      setScore(score + response.data.point);
      setFeedback(message); // optional – keep or remove based on your UI
      setGuess("");

      // Push to history with feedback only if correct
      setGuessHistory((prev) => [
        ...prev,
        {
          guess,
          feedback: isCorrect ? message : null,
        },
      ]);

      if (response.data.next === true) {
        setIsPlaying(false);
        await fetchGameStatus();
      }
    } catch (error) {
      console.error("Error validating guess:", error);
    }
  };

  // Start game on button click
  useEffect(() => {
    fetchGameStatus();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-4">Guess the Song</h1>

      {gameOver ? (
        <h2 className="text-2xl text-red-400">
          🎉 Game Over! Thanks for playing.
        </h2>
      ) : (
        <>
          <h2 className="text-2xl">Round {round}</h2>
          <h2 className="text-2xl">Score: {score}</h2>
          {song && (
            <RoundTimer key={round} timeCap={timeCap} isPlaying={isPlaying} />
          )}
          {song && <SongPlayer song={song} onPlay={() => setIsPlaying(true)} />}
          <GuessBar
            guess={guess}
            feedback={feedback}
            setGuess={setGuess}
            onSubmit={handleGuess}
            guessHistory={guessHistory}
          />
        </>
      )}
    </div>
  );
};

export default MainGame;
