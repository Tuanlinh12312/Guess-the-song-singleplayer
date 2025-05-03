const EndRound = ({ song, onNextRound }) => {
    if (!song) return null;
  
    return (
      <div className="flex flex-col items-center text-center">
        <h2 className="text-2xl text-yellow-400 mb-4">⏳ Round Ended</h2>
  
        <img
          src={song.thumbnail}
          alt="Song Thumbnail"
          className="w-48 h-48 rounded-xl mb-4"
        />
  
        <div className="text-lg font-semibold">
          🎵 {song.title}
        </div>
  
        <div className="text-md text-gray-300 mb-6">
          👤 {song.artists.join(", ")}
        </div>
  
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          onClick={onNextRound}
        >
          Next Round
        </button>
      </div>
    );
  };
  
  export default EndRound;
  