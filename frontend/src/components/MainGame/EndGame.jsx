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
    if (percent >= 0.7) return "B";
    if (percent >= 0.55) return "C";
    if (percent >= 0.4) return "D";
    return "F";
  })();

  const handlePlayAgain = () => {
    navigate("/"); // Navigate to the homepage ("/")
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center bg-transparent">
      <h2 className="text-8xl font-bold font-darumadrop text-center drop-shadow-[4px_4px_0px_white] -mt-3">
        Game Over
      </h2>

      <div className="flex flex-col w-[calc(33.33%-100px)] h-[190px] items-center mt-4 bg-amber-900/10">
        <p className="text-5xl mt-4 font-extrabold font-coiny">
          <div>RANK</div>
          <span className="ml-12 font-extrabold text-8xl">{grade}</span>
        </p>
        <p className="text-2xl font-EBGaramond -mt-4">
          Final Score: <span className="font-bold">{score}</span>
        </p>
      </div>

      <div className="flex w-full h-60">
        <div className="flex flex-row ml-10 mr-10 mt-8 w-full">
          <div className="flex flex-col bg-amber-900/10 w-[calc(33.33%-120px)] mr-10 items-center">
            <h2 className="text-2xl mt-5 font-bold font-coiny text-center drop-shadow-[2px_2px_0px_white] uppercase">
              You have guessed
            </h2>

            <span className="font-EBGaramond font-semibold text-2xl mt-5">
              🎵 {titlesGuessed} / {totalTitles} titles
            </span>

            <span className="font-EBGaramond font-semibold text-2xl mt-5">
              🎤 {artistsGuessed} / {totalArtists} artists
            </span>
          </div>

          <div className="flex flex-col bg-amber-900/10 items-center w-[calc(33.33%-120px)]">
            <h3 className="text-2xl mt-5 font-bold font-coiny drop-shadow-[2px_2px_0px_white] uppercase">
              Perfect rounds
            </h3>
            <span className="font-coiny text-8xl font-bold mt-5">
              {perfectRounds}
            </span>
          </div>

          {bestRound && bestRound.song && (
            <div className="flex flex-col bg-amber-900/10 items-center ml-10 w-1/2">
              <p className="text-2xl mt-5 font-bold font-coiny drop-shadow-[2px_2px_0px_white] uppercase">
                Best round
              </p>

              <div className="bg-white bg-opacity-50 p-4 rounded-2xl shadow-lg flex items-center gap-4 mt-2 justify-between w-4/5 mx-4">
                <img
                  src={bestRound.song.thumbnail}
                  alt="Song Thumbnail"
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1 flex flex-col ml-2">
                  <span className="text-lg font-bold text-gray-900 uppercase -mb-1">
                    {bestRound.song.title}
                  </span>
                  <span className="text-sm text-gray-700">
                    {bestRound.song.artists?.join(", ")}
                  </span>
                  <img
                    src="/images/songlisticon.png"
                    alt="Icon"
                    className="w-[calc(100%-20px)] mt-2 rounded-full"
                  />
                </div>
                <div className="flex items-end justify-center mt-12">
                  <img
                    src="/images/listsongplay.png"
                    alt="play"
                    className="h-7 w-7"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <button
        className="flex justify-center -mt-14 items-center relative w-60 h-72"
        onClick={handlePlayAgain}>
        <img
          src="/images/icon1.png"
          alt="background"
          className="absolute w-full h-full object-contain z-0"
        />
        <span className="relative z-10 font-darumadrop text-3xl text-black text-center">
          Play<br />Again
        </span>
      </button>
    </div>
  );
};

export default EndGame;
