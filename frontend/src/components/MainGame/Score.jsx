const ScoreDisplay = ({ score }) => {
  return (
    <div className="bg-score bg-contain bg-no-repeat bg-center flex flex-col h-44 rounded-lg font-bold text-[#E7A249] ">
      <div className="text-8xl font-coiny text-center mt-12">{score}</div>
    </div>
  );
};

export default ScoreDisplay;
