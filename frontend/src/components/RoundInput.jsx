import { useState } from "react";

const RoundInput = ({ onSetRounds }) => {
  const [rounds, setRounds] = useState("");

  const handleChange = (e) => {
    setRounds(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSetRounds(Number(rounds)); 
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        placeholder="Number of rounds"
        value={rounds}
        onChange={handleChange}
      />
      <button type="submit">Set Rounds</button>
    </form>
  );
};

export default RoundInput;
