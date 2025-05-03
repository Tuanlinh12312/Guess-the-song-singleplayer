const EndGame = ({ score }) => {
  return (
    <div className="text-center">
      <h2 className="text-3xl text-red-400 mb-4">
        🎉 Game Over! Thanks for playing.
      </h2>
      <p className="text-xl">
        Your final score:{" "}
        <span className="font-bold text-green-400">{score}</span>
      </p>
    </div>
  );
};

export default EndGame;
