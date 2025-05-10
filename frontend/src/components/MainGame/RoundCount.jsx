const RoundCount = ({ round }) => {
  return (
    <div className="bg-amber-900/10 mr-10 ml-10 mt-4 h-16 rounded-lg flex items-center justify-center uppercase font-coiny font-bold text-orange-950 pt-1 text-4xl">
      Round {round}
    </div>
  );
};

export default RoundCount;