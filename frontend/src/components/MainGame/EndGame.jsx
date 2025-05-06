import { useNavigate } from "react-router-dom";

const EndGame = ({
  score,
  artistsGuessed,
  titlesGuessed,
  perfectRounds,
  roundScores,
  totalArtists,
  totalTitles,
}) => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  const bestRound =
    roundScores.length > 0
      ? roundScores.reduce((best, r) => (r.score > best.score ? r : best))
      : null;

  const grade = (() => {
    const maxScore = totalTitles * 200 + totalArtists * 100;
    const percent = score / maxScore;

    if (percent >= 0.95) return "S";
    if (percent >= 0.85) return "A";
    if (percent >= 0.70) return "B";
    if (percent >= 0.55) return "C";
    if (percent >= 0.40) return "D";
    return "F";
  })();

  const handlePlayAgain = () => {
    navigate("/"); // Navigate to the homepage ("/")
  };

  return (
    <div className="text-center text-white p-10 bg-black/70 rounded-xl shadow-lg mx-auto mt-10 w-4/5 max-w-2xl">
      <h2 className="text-4xl text-yellow-300 font-bold mb-4">🎉 Game Over!</h2>

      <p className="text-2xl mb-2">
        Final Score: <span className="text-green-400 font-bold">{score}</span>
      </p>
      <p className="text-lg mb-2">
        Titles guessed:{" "}
        <span className="text-blue-300 font-semibold">
          {titlesGuessed} / {totalTitles}
        </span>
      </p>
      <p className="text-lg mb-2">
        Artists guessed:{" "}
        <span className="text-pink-300 font-semibold">
          {artistsGuessed} / {totalArtists}
        </span>
      </p>
      <p className="text-lg mb-2">
        Perfect rounds:{" "}
        <span className="text-purple-300 font-semibold">{perfectRounds}</span>
      </p>

      {bestRound && bestRound.song && (
        <div className="mt-4 mb-2">
          <p className="text-lg mb-1 text-orange-300 font-semibold">
            Best round: Round {bestRound.round} ({bestRound.score} pts)
          </p>
          <img
            src={bestRound.song.thumbnail}
            alt="Song Thumbnail"
            className="mx-auto rounded-lg shadow-md w-40 h-40 object-cover"
          />
          <p className="text-lg mt-2">
            <span className="font-semibold">Title:</span>{" "}
            <span className="text-yellow-200">{bestRound.song.title}</span>
          </p>
          <p className="text-lg">
            <span className="font-semibold">Artist(s):</span>{" "}
            <span className="text-yellow-200">
              {bestRound.song.artists?.join(", ")}
            </span>
          </p>
        </div>
      )}

      <p className="text-xl mt-4">
        Grade:{" "}
        <span className="text-red-400 font-extrabold text-3xl">{grade}</span>
      </p>

      <button
        onClick={handlePlayAgain}
        className="mt-6 px-6 py-3 bg-green-600 hover:bg-green-700 text-white text-lg rounded-full shadow-lg transition"
      >
        🔄 Play Again
      </button>
    </div>
  );
};

export default EndGame;
