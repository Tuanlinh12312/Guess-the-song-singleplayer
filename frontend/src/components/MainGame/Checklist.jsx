const GuessChecklist = ({ guessedTitle, guessedArtists, totalArtists }) => {
    return (
      <div className="mt-4 p-4 bg-gray-800 rounded-md">
        <h3 className="text-xl font-semibold mb-2">📝 Progress</h3>
        <p>
          🎵 Song Title:{" "}
          <span className={guessedTitle ? "text-green-400" : "text-red-400"}>
            {guessedTitle ? "Guessed ✅" : "Not yet ❌"}
          </span>
        </p>
        <p>
          🎤 Artists:{" "}
          <span className="text-blue-400">
            {guessedArtists}/{totalArtists} guessed
          </span>
        </p>
      </div>
    );
  };
  
  export default GuessChecklist;
  