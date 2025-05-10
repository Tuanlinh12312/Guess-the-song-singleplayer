const GuessChecklist = ({ guessedTitle, guessedArtists, totalArtists }) => {
  return (
    <div className="mt-4 p-4 bg-amber-900/10 rounded-lg justify-center">
      <h3 className="text-3xl font-coiny mb-1 text-center text-orange-950">Progress</h3>
      <p className="text-orange-950 font-EBGaramond text-xl">
        🎵 Song Title:{" "}
        <span className={guessedTitle ? "" : ""}>
          {guessedTitle ? (
            <span className="material-symbols-outlined text-green-800 font-bold relative -top-0.5 " style={{ verticalAlign: 'bottom' }}>
              check_box
            </span>
          ) : (
            <span className="material-symbols-outlined text-orange-950 relative -top-0.5" style={{ verticalAlign: 'bottom' }} >
              check_box_outline_blank
            </span>
          )}
        </span>
      </p>
      <p className="text-orange-950 font-EBGaramond text-xl">
        🎤 Artists:{" "}
        <span className="text-orange-950 font-EBGaramond font-semibold">
          {guessedArtists}/{totalArtists}
        </span>
      </p>
    </div>
  );
};

export default GuessChecklist;
