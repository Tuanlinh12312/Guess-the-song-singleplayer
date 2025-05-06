const EndRound = ({ song, onNextRound }) => {
  if (!song) return null;

  return (
    <div className="flex flex-col items-center h-full w-full justify-center backdrop-blur-lg">
      <div className="bg-cover bg-fixed bg-b1 bg-no-repeat w-1/2 h-[calc(50%-40px)] flex flex-col items-center rounded-3xl">
        <h1 className="text-5xl font-coiny font-bold tracking-wide text-center w-full drop-shadow-[3px_3px_0px_white] text-orange-950 mt-6">
          Round Ended
        </h1>

        <div className="bg-white bg-opacity-50 p-4 rounded-2xl shadow-lg flex items-center gap-4 mt-7 justify-between w-4/5 mx-4">
          <img
            src={song.thumbnail}
            alt="Song Thumbnail"
            className="w-16 h-16 rounded-lg object-cover"
          />

          <div className="flex-1 flex flex-col ml-2">
            <div className="text-lg font-bold text-gray-900 uppercase -mb-1">
              {song.title}
            </div>
            <div className="text-sm text-gray-700">
              {song.artists.join(", ")}
            </div>
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

        <div className="flex flex-col justify-start items-center h-full w-full">
            <button
              className="flex justify-center items-center mt-3 relative w-52 h-32"
              onClick={onNextRound}>
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
