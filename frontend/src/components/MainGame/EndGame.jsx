import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { useState, useEffect } from "react";

const EndGame = ({
  score,
  artistsGuessed,
  titlesGuessed,
  perfectRounds,
  roundScores,
  totalArtists,
  totalTitles,
  diff,
}) => {
  const navigate = useNavigate(); 

  const bestRound =
    roundScores.length > 0
      ? roundScores.reduce((best, r) =>
          r.score / r.totalScore > best.score / best.totalScore ? r : best
        )
      : null;

  const grade = (() => {
    const maxScore = totalTitles * 200 + totalArtists * 100;
    const percent = score / maxScore + 0.1 * diff;
    return "S";
    if (percent >= 0.7) return "S";
    if (percent >= 0.65) return "A+";
    if (percent >= 0.6) return "A";
    if (percent >= 0.55) return "A-";
    if (percent >= 0.5) return "B+";
    if (percent >= 0.45) return "B";
    if (percent >= 0.4) return "B-";
    if (percent >= 0.35) return "C+";
    if (percent >= 0.3) return "C";
    if (percent >= 0.25) return "C-";
    if (percent >= 0.2) return "D+";
    if (percent >= 0.15) return "D";
    if (percent >= 0.1) return "D-";
    return "F";
  })();

  const getRankClass = (grade) => {
    switch (grade) {
      case "S":
        return "glowS";
      case "A+":
      case "A":
      case "A-":
        return "glowA";
      case "B":
      case "B+":
      case "B-":
        return "glowB";
      case "C":
      case "C+":
      case "C-":
        return "glowC";
      case "D":
      case "D+":
      case "D-":
        return "glowD";
      case "F":
        return "glowF";
      default:
        return "";
    }
  };

  const handlePlayAgain = () => {
    navigate("/"); // Navigate to the homepage ("/")
  };

  const icon = useMemo(() => {
    const icons = [
      "/images/songlisticon.png",
      "/images/songlisticon1.png",
      "/images/songlisticon2.png",
      "/images/songlisticon3.png",
      "/images/songlisticon4.png",
    ];

    return icons[Math.floor(Math.random() * icons.length)];
  }, []);

  const [showGif, setShowGif] = useState(true);

  useEffect(() => {
    if (grade === "A" || grade === "A+" || grade === "A-" || grade === "S") {
      const timer = setTimeout(() => {
        setShowGif(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [grade]);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center bg-transparent relative">
      <img
        src="/images/music-note.png"
        alt="Musical Notes"
        className="absolute top-16 left-0 -ml-[140px] w-[810px] h-auto z-0"
      />
      <img
        src="/images/music-note.png"
        alt="Musical Notes"
        className="absolute bottom-[420px] right-0 -mr-[140px] w-[810px] h-auto z-0"
      />
      {grade === "F" && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
          {[...Array(30)].map((_, i) => {
            const randomAngle = Math.random() * 180;
            const randomStartLeft = Math.random() * 100;
            return (
              <span
                key={i}
                className="absolute"
                style={{
                  bottom: 0,
                  left: `${randomStartLeft}%`,
                }}>
                <span
                  className="confetti-up block"
                  style={{
                    animationDuration: `${1.5 + Math.random()}s`,
                    animationDelay: `-${Math.random() * 2}s`,
                  }}>
                  <span
                    className="text-8xl"
                    style={{
                      display: "inline-block",
                      transform: `rotate(${randomAngle}deg)`,
                    }}>
                    😭
                  </span>
                </span>
              </span>
            );
          })}
        </div>
      )}

      {["D", "D+", "D-"].includes(grade) && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
          {[...Array(30)].map((_, i) => {
            const randomAngle = Math.random() * 180;
            const randomStartLeft = Math.random() * 100;
            return (
              <span
                key={i}
                className="absolute"
                style={{
                  bottom: 0,
                  left: `${randomStartLeft}%`,
                }}>
                <span
                  className="confetti-up block"
                  style={{
                    animationDuration: `${1.5 + Math.random()}s`,
                    animationDelay: `-${Math.random() * 2}s`,
                  }}>
                  <span
                    className="text-8xl"
                    style={{
                      display: "inline-block",
                      transform: `rotate(${randomAngle}deg)`,
                    }}>
                    😔
                  </span>
                </span>
              </span>
            );
          })}
        </div>
      )}

      {["C", "C+", "C-"].includes(grade) && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
          {[...Array(30)].map((_, i) => {
            const randomAngle = Math.random() * 180;
            const randomStartLeft = Math.random() * 100;
            return (
              <span
                key={i}
                className="absolute"
                style={{
                  bottom: 0,
                  left: `${randomStartLeft}%`,
                }}>
                <span
                  className="confetti-up block"
                  style={{
                    animationDuration: `${1.5 + Math.random()}s`,
                    animationDelay: `-${Math.random() * 2}s`,
                  }}>
                  <span
                    className="text-8xl"
                    style={{
                      display: "inline-block",
                      transform: `rotate(${randomAngle}deg)`,
                    }}>
                    🤨
                  </span>
                </span>
              </span>
            );
          })}
        </div>
      )}

      {["B", "B+", "B-"].includes(grade) && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
          {[...Array(30)].map((_, i) => {
            const randomAngle = Math.random() * 180;
            const randomStartLeft = Math.random() * 100;
            return (
              <span
                key={i}
                className="absolute"
                style={{
                  bottom: 0,
                  left: `${randomStartLeft}%`,
                }}>
                <span
                  className="confetti-up block"
                  style={{
                    animationDuration: `${1.5 + Math.random()}s`,
                    animationDelay: `-${Math.random() * 2}s`,
                  }}>
                  <span
                    className="text-8xl"
                    style={{
                      display: "inline-block",
                      transform: `rotate(${randomAngle}deg)`,
                    }}>
                    😀
                  </span>
                </span>
              </span>
            );
          })}
        </div>
      )}

      {["A", "A+", "A-", "S"].includes(grade) && showGif && (
        <>
          <div className="fixed z-50 top-0 right-0 -mr-32">
            <img
              key={showGif ? Date.now() : ""}
              src={`images/confetti-right.gif?${Date.now()}`}
              onLoad={() => {}}
              alt="Confetti GIF"
              style={{
                width: "1000px",
                height: "auto",
                top: "50%",
              }}
            />
          </div>
          <div className="fixed z-50 top-0 left-0 -ml-32">
            <img
              key={showGif ? Date.now() : ""}
              src={`images/confetti-left.gif?${Date.now()}`}
              onLoad={() => {}}
              alt="Confetti GIF"
              style={{
                width: "1000px",
                height: "auto",
                top: "50%",
              }}
            />
          </div>
        </>
      )}


      <h2 className="text-8xl font-bold font-darumadrop text-center drop-shadow-[4px_4px_0px_white] -mt-3">
        Game Over
      </h2>

      <div className="flex flex-col w-[calc(33.33%-100px)] h-[190px] items-center mt-4 bg-amber-900/10 relative z-10">
        <p className="text-5xl mt-4 font-extrabold font-coiny">
          <div>RANK</div>
          <span
            className={`ml-12 drop-shadow-[1px_1px_0px_black] font-extrabold text-8xl ${getRankClass(
              grade
            )}`}>
            {grade}
          </span>
        </p>
        <p className="text-2xl font-EBGaramond -mt-4">
          Final Score: <span className="font-bold">{score}</span>
        </p>
      </div>

      <div className="flex w-full h-60">
        <div className="flex flex-row ml-10 mr-10 mt-8 w-full">
          <div className="relative h-full bg-image w-[calc(33.33%-120px)] mr-10">
            <div className="flex flex-col bg-amber-900/10 w-full h-full items-center">
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
                    src={icon}
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
          Play
          <br />
          Again
        </span>
      </button>
    </div>
  );
};

export default EndGame;
