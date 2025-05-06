import { useEffect, useRef } from "react";

const GuessBar = ({
  guess,
  feedback,
  setGuess,
  onSubmit,
  guessHistory,
  disabled,
}) => {
  const chatContainerRef = useRef(null);

  // Always scroll to the bottom on guessHistory update
  useEffect(() => {
    const container = chatContainerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [guessHistory]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!disabled) {
      onSubmit();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="h-full w-full bg-chat bg-no-repeat bg-center overflow-hidden"
    >
      {/* Chat history */}
      <div
        ref={chatContainerRef}
        className="p-3 rounded-md overflow-y-auto overflow-x-hidden h-[calc(100%-70px)]"
        style={{
          scrollbarWidth: "none", // Firefox
          msOverflowStyle: "none", // IE and Edge
        }}
      >
        {guessHistory.map((entry, idx) => (
          <div key={idx} className="mb-2">
            <div className="flex justify-end">
              <div className="inline-block bg-history text-2xl rounded-lg px-3 text-white font-EBGaramond py-2 max-w-[70%] break-words">
                {entry.guess}
              </div>
            </div>
            {entry.feedback && (
              <div className="flex justify-center mt-2">
                <span className="mt-1 ml-4 inline-block font-coiny px-3 py-1 text-orange-950 rounded text-xl">
                  {entry.feedback}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Input area */}
      <div className="flex flex-row mt-3">
        <input
          type="text"
          className={`p-2 rounded-2xl text-black w-[calc(100%-90px)] h-10 font-EBGaramond placeholder-black px-4 py-1 ml-5 bg-type ${
            disabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
          placeholder="Type your guess..."
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          disabled={disabled}
        />
        <button
          type="submit"
          className={`flex ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={disabled}
        >
          <img
            src="/images/send.png"
            alt="send"
            className="object-contain w-10 h-10 ml-3 mb-4 mr-3"
          />
        </button>
      </div>
    </form>
  );
};

export default GuessBar;
