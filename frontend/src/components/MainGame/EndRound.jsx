import { useMemo } from "react";

const EndRound = ({ song, onNextRound }) => {
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

  if (!song) return null;

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full backdrop-blur-lg">
      <div className="bg-cover bg-fixed bg-b1 bg-no-repeat w-[50%] h-[calc(50%-40px)] flex flex-col items-center rounded-3xl">
        <h1 className="text-5xl font-coiny font-bold tracking-wide text-center w-full drop-shadow-[3px_3px_0px_white] text-orange-950 mt-6">
          Round Ended
        </h1>

        <div className="bg-white bg-opacity-50 p-4 rounded-2xl shadow-lg flex items-center gap-4 mt-7 justify-between w-4/5 mx-4">
          <img
            src={song.thumbnail}
            alt="Song Thumbnail"
            className="w-16 h-16 rounded-lg object-cover"
            onError={(e) => (e.target.src = "/images/pod18397-1.jpg")}
          />

          <div className="flex-1 flex flex-col ml-2">
            <div className="text-lg font-bold text-gray-900 uppercase -mb-1">
              {song.title}
            </div>
            <div className="text-sm text-gray-700">
              {song?.artists?.join(", ")}
            </div>
            <img
              src={icon}
              alt="Icon"
              className="w-full mt-2 rounded-full"
            />
          </div>
        </div>

        <div className="flex flex-col justify-start items-center h-full w-full">
          <button
            className="flex justify-center items-center mt-3 relative w-52 h-32"
            onClick={onNextRound}
          >
            <img
              src="/images/icon1.png"
              alt="background"
              className="absolute w-full h-full object-contain z-0"
            />
            <span className="relative z-10 font-darumadrop text-3xl text-black text-center">
              Next
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EndRound;
