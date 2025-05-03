import { useEffect, useState } from "react";

const RoundTimer = ({ timeCap, isPlaying }) => {
  const [timeLeft, setTimeLeft] = useState(timeCap);

  useEffect(() => {
    if (!isPlaying) return;

    setTimeLeft(timeCap); // Reset the timer
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timeCap, isPlaying]);

  return (
    <div className="text-lg mb-2">⏱️ Time Left: {timeLeft} seconds</div>
  );
};

export default RoundTimer;
