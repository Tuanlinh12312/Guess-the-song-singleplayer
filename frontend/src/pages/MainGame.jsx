import { useState, useEffect } from "react";
import axios from "axios";
import SongPlayer from "../components/MainGame/SongPlayer";
import RoundCount from "../components/MainGame/RoundCount";
import RoundTimer from "../components/MainGame/RoundTimer";
import GuessBar from "../components/MainGame/GuessBar";
import GuessChecklist from "../components/MainGame/Checklist";
import EndRound from "../components/MainGame/EndRound";
import EndGame from "../components/MainGame/EndGame";
import Loading from "../components/MainGame/Loading";
import Score from "../components/MainGame/Score";

const MainGame = () => {
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);
  const [song, setSong] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [guess, setGuess] = useState("");
  const [feedback, setFeedback] = useState("");
  const [timeCap, setTimeCap] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [guessHistory, setGuessHistory] = useState([]);
  const [titleGuessed, setTitle] = useState(0);
  const [artistsGuessed, setArtists] = useState(0);
  const [roundEnded, setRoundEnded] = useState(false);

  // Statistics
  const [totalTitles, setTotalTitles] = useState(0);
  const [totalTitleGuessed, setTotalTitleGuessed] = useState(0);
  const [totalArtists, setTotalArtists] = useState(0);
  const [totalArtistsGuessed, setTotalArtistsGuessed] = useState(0);

  const [perfectRounds, setPerfectRounds] = useState(0);
  const [roundScores, setRoundScores] = useState([]);
  const [currentScore, setCurrentScore] = useState(0);

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
        setTimeLeft(response.data.time);
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

      if (isCorrect) {
        const T_used = timeCap - timeLeft;
        const progress = Math.min(T_used / timeCap, 1);
        const timeFactor = 0.5 + 0.5 * Math.cos(progress * Math.PI);
        const adjustedPoints = Math.round(
          response.data.point * 100 * timeFactor
        );

        setScore((prev) => prev + adjustedPoints);
        setCurrentScore((prev) => prev + adjustedPoints);

        if (correctArtist) {
          setArtists((cnt) => cnt + 1); // per-round count
          setTotalArtistsGuessed((cnt) => cnt + 1); // total count
        }

        if (correctTitle) {
          setTitle((cnt) => cnt + 1); // round-local flag
          setTotalTitleGuessed((cnt) => cnt + 1); // cumulative stat
        }
      }

      setFeedback(message);
      setGuess("");
      setGuessHistory((prev) => [
        ...prev,
        {
          guess,
          feedback: isCorrect ? message : null,
        },
      ]);
    } catch (error) {
      console.error("Error validating guess:", error);
    }
  };

  const goToNextRound = async () => {
    try {
      await axios.post("http://localhost:8080/NextRound");
      if (titleGuessed && artistsGuessed === song?.artists.length) {
        setPerfectRounds((cnt) => cnt + 1);
      }
      setTotalTitles((prev) => prev + 1);
      setTotalArtists((prev) => prev + (song.artists?.length || 0));
      setTitle(0);
      setArtists(0);
      setRoundEnded(false);
      setIsPlaying(false);
      setRoundScores((prev) => [...prev, { round, score: currentScore, song }]);
      setCurrentScore(0);
      await fetchGameStatus();
    } catch (err) {
      console.error("Error advancing to next round:", err);
    }
  };

  useEffect(() => {
    fetchGameStatus();
  }, []);

  useEffect(() => {
    if (
      (titleGuessed && artistsGuessed === song?.artists.length) ||
      timeCap === 0
    ) {
      setRoundEnded(true);
      setIsPlaying(false);
    }
  }, [titleGuessed, artistsGuessed, song, timeCap]);

  useEffect(() => {
    document.body.style.overflow = roundEnded ? "hidden" : "auto";
  }, [roundEnded]);

  return (
    <div className="relative flex flex-col min-h-screen max-h-screen bg-image bg-cover bg-center bg-fixed overflow-hidden">
      <div className="flex items-center ml-10 mt-3">
        <img
          src="images/logo.png"
          alt="Guess the Song Logo"
          className="w-20 h-auto mr-3 mt-3"
        />
        <h1 className="text-5xl font-darumadrop font-bold drop-shadow-[4px_4px_0px_black] tracking-wide w-full uppercase text-white">
          Guess the Song
        </h1>
      </div>

      {song && (
        <SongPlayer
          song={song}
          onPlay={() => setIsPlaying(true)}
          roundEnded={roundEnded}
        />
      )}

      {gameOver ? (
        <EndGame
          score={score}
          artistsGuessed={totalArtistsGuessed}
          titlesGuessed={totalTitleGuessed}
          perfectRounds={perfectRounds}
          roundScores={roundScores}
          totalArtists={totalArtists}
          totalTitles={totalTitles}
        />
      ) : !isPlaying && !roundEnded ? (
        <Loading />
      ) : (
        <>
          <div className={`${roundEnded ? "blur-sm pointer-events-none" : ""}`}>
            <div className="relative">
              <RoundCount round={round} />
              <div className="absolute -top-2 right-7 will-change-transform">
                <RoundTimer
                  key={round}
                  timeCap={timeCap}
                  isPlaying={isPlaying}
                  onTimeOut={() => setRoundEnded(true)}
                  timeLeft={timeLeft}
                  setTimeLeft={setTimeLeft}
                />
              </div>
            </div>

            <div
              className="flex flex-row"
              style={{ height: "calc(100vh - 180px)" }}>
              <div className="flex flex-col ml-10 mt-3 w-1/6 mr-3">
                <Score score={score} />
                <GuessChecklist
                  guessedTitle={titleGuessed}
                  guessedArtists={artistsGuessed}
                  totalArtists={song?.artists.length || 0}
                />
                <div className="flex flex-1 items-end justify-center mt-4">
                  <img
                    src="/images/maingame.gif"
                    alt="deer"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="flex flex-col w-5/6 ml-3 mr-10 bg-amber-900/10 mt-3 rounded-lg">
                <GuessBar
                  guess={guess}
                  feedback={feedback}
                  setGuess={setGuess}
                  onSubmit={handleGuess}
                  guessHistory={guessHistory}
                  disabled={roundEnded}
                />
              </div>
            </div>
          </div>

          {roundEnded && (
            <div className="absolute inset-0 z-50 flex items-center justify-center backdrop-blur-lg bg-black/40">
              <EndRound song={song} onNextRound={goToNextRound} />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MainGame;
