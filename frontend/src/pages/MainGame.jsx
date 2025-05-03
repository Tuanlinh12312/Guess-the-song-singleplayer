import { useState, useEffect } from "react";
import axios from "axios";
import SongPlayer from "../components/MainGame/SongPlayer";
import RoundTimer from "../components/MainGame/RoundTimer";
import GuessBar from "../components/MainGame/GuessBar";
import GuessChecklist from "../components/MainGame/Checklist";
import EndRound from "../components/MainGame/EndRound";
import EndGame from "../components/MainGame/EndGame";
import Loading from "../components/MainGame/Loading";

const MainGame = () => {
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);
  const [song, setSong] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [guess, setGuess] = useState("");
  const [feedback, setFeedback] = useState("");
  const [timeCap, setTimeCap] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [guessHistory, setGuessHistory] = useState([]);
  const [titleGuessed, setTitle] = useState(0);
  const [artistsGuessed, setArtists] = useState(0);
  const [roundEnded, setRoundEnded] = useState(false);

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
      const correctTitle = response.data.point & 2;
      const correctArtist = response.data.point & 1;
      const message = response.data.message;

      setScore((score) => score + response.data.point);
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

      if (correctArtist) {
        setArtists((cnt) => cnt + 1);
      }
      if (correctTitle) {
        setTitle((cnt) => cnt + 1);
      }
    } catch (error) {
      console.error("Error validating guess:", error);
    }
  };

  const goToNextRound = async () => {
    try {
      await axios.post("http://localhost:8080/NextRound");

      // Reset game state
      setTitle(0);
      setArtists(0);
      setRoundEnded(false);
      setIsPlaying(false);

      await fetchGameStatus(); // Get new song + timeCap + round number
    } catch (err) {
      console.error("Error advancing to next round:", err);
    }
  };

  // start game
  useEffect(() => {
    fetchGameStatus();
  }, []);

  // detects when round ends
  useEffect(() => {
    if (
      (titleGuessed && artistsGuessed === song?.artists.length) ||
      timeCap === 0
    ) {
      setRoundEnded(true);
      setIsPlaying(false);
    }
  }, [titleGuessed, artistsGuessed, song, timeCap]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-4">Guess the Song</h1>

      {gameOver ? (
        <EndGame score={score} />
      ) : roundEnded ? (
        <EndRound song={song} onNextRound={goToNextRound} />
      ) : !isPlaying ? (
        <>
          {song && <SongPlayer song={song} onPlay={() => setIsPlaying(true)} />}
          <Loading></Loading>
        </>
      ) : (
        <>
          <GuessChecklist
            guessedTitle={titleGuessed}
            guessedArtists={artistsGuessed}
            totalArtists={song.artists.length}
          />
          <RoundTimer
            key={round}
            timeCap={timeCap}
            isPlaying={isPlaying}
            onTimeOut={() => setRoundEnded(true)}
          />
          <GuessBar
            guess={guess}
            feedback={feedback}
            setGuess={setGuess}
            onSubmit={handleGuess}
            guessHistory={guessHistory}
          />
          <SongPlayer song={song} onPlay={() => setIsPlaying(true)} />
        </>
      )}
    </div>
  );
};

export default MainGame;
