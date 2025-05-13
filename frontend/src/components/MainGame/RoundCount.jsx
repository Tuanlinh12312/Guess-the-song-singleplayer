const RoundCount = ({ round }) => {
  return (
    <div
      className="bg-amber-900/10 h-16 rounded-lg 
                 flex items-center justify-center 
                 uppercase font-coiny font-bold 
                 text-orange-950 text-4xl pt-1 
                 ml-10 mr-10 mt-4"
    >
      Round {round}
    </div>
  );
};

export default RoundCount;
