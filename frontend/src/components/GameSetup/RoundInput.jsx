import { useState } from "react";

const RoundInput = ({ onSetRounds }) => {
  const [rounds, setRounds] = useState("");

  const handleChange = (e) => {
    const newRounds = e.target.value;
    setRounds(newRounds);
    onSetRounds(Number(newRounds));
  };

  return (
    <input
      type="number"
      placeholder="Number of rounds"
      value={rounds}
      onChange={handleChange}
      class="border border-gray-300 rounded pl-3 py-1 w-full font-EBGaramond"
    />
  );
};

export default RoundInput;