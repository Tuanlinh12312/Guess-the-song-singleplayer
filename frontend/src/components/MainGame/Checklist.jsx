const GuessChecklist = ({ guessedTitle, guessedArtists, totalArtists }) => {
  return (
    <div className="mt-4 p-4 bg-amber-900/10 rounded-lg w-full max-w-[480px] mx-auto">
      <h3 className="text-3xl font-coiny mb-1 text-center text-orange-950">
        Progress
      </h3>

      <p className="text-orange-950 font-EBGaramond text-xl flex items-center">
        🎵 Song Title:&nbsp;
        {guessedTitle ? (
          <span
            className="material-symbols-outlined text-green-800 font-bold text-2xl"
            style={{ verticalAlign: "middle" }}
          >
            check_box
          </span>
        ) : (
          <span
            className="material-symbols-outlined text-orange-950 text-2xl"
            style={{ verticalAlign: "middle" }}
          >
            check_box_outline_blank
          </span>
        )}
      </p>

      <p className="text-orange-950 font-EBGaramond text-xl mt-1">
        🎤 Artists:&nbsp;
        <span className="font-semibold">
          {guessedArtists}/{totalArtists}
        </span>
      </p>
    </div>
  );
};

export default GuessChecklist;
