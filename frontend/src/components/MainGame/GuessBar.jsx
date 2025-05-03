const GuessBar = ({ guess, feedback, setGuess, onSubmit, guessHistory }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center w-full mt-4"
    >
      <input
        type="text"
        className="p-2 rounded-md text-black w-1/2"
        placeholder="Enter your guess..."
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
      />
      <button
        type="submit"
        className="mt-2 p-2 bg-blue-500 hover:bg-blue-700 rounded-md"
      >
        Submit Guess
      </button>

      {/* Chat-style history */}
      <div className="w-1/2 mt-4 bg-gray-800 p-3 rounded-md max-h-48 overflow-y-auto text-left">
        {guessHistory.map((entry, idx) => (
          <div key={idx} className="mb-2">
            <span className="text-blue-300"></span> {entry.guess}
            {entry.feedback && (
              <>
                <br />
                <span className="text-green-400">{entry.feedback}</span>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Latest feedback outside chat */}
      {feedback && <p className="mt-2 text-lg">{feedback}</p>}
    </form>
  );
};

export default GuessBar;
