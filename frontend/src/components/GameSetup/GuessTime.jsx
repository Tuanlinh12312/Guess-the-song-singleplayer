import { useState } from "react";

const GuessTimeLimit = ({ onSetTime }) => {
  const [selectedTime, setSelectedTime] = useState(0); // Default to 30 sec

  const handleSelectTime = (time) => {
    setSelectedTime(time);
    onSetTime(time);
  };

  return (
    <div>
      <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
        {[30, 60, 90].map((time) => (
          <button
            key={time}
            onClick={() => handleSelectTime(time)}
            style={{
              padding: "10px 20px",
              border: "1px solid #ccc",
              backgroundColor: selectedTime === time ? "#e5d2c1" : "white",
              cursor: "pointer",
              borderRadius: "5px",
            }}
          >
            {time} sec
          </button>
        ))}
      </div>
    </div>
  );
};

export default GuessTimeLimit;
