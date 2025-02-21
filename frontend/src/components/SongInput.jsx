import { useState } from "react";

const SongInput = ({ onAddSong }) => {
  const [songUrl, setSongUrl] = useState("");

  const handleChange = (e) => {
    setSongUrl(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (songUrl.trim() === "") return;
    onAddSong(songUrl);
    setSongUrl(""); // Clear input after adding
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter song URL"
        value={songUrl}
        onChange={handleChange}
        class="border border-gray-300 rounded py-1 w-full"
      />
      <button type="submit">Add Song</button>
    </form>
  );
};

export default SongInput;
