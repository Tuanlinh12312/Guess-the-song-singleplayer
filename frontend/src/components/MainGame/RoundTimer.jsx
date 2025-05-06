import { useEffect, useState } from "react";

const RoundTimer = ({ timeCap, isPlaying, onTimeOut }) => {
  const [timeLeft, setTimeLeft] = useState(timeCap);

  useEffect(() => {
    if (!isPlaying) return;

    setTimeLeft(timeCap); // Reset the timer
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onTimeOut(); // ⏱️ Inform MainGame
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timeCap, isPlaying]);

  return (
    <div className="w-20 h-20 rounded-full bg-b1 flex items-center justify-center text-orange-950 text-center text-4xl font-coiny pt-2 pl-1">
      {timeLeft}
    </div>
  );
};

export default RoundTimer;
