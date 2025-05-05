import { useState } from "react";

const SongInput = ({ onAddSong }) => {
  const [url, setUrl] = useState("");
  const [mode, setMode] = useState("single"); // 'single', 'suggested', or 'playlist'
  const [count, setCount] = useState(10);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (url.trim() === "") return;

    const cnt = mode === "single" ? -1 : (mode === "playlist" ? -2 : count);
    onAddSong(url, cnt);
    setUrl("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-2 w-full"
    >
      <input
        name="url"
        type="text"
        placeholder="Enter YouTube Music URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="border border-gray-300 rounded px-3 py-1 flex-1"
      />

      <select
        value={mode}
        onChange={(e) => setMode(e.target.value)}
        className="border border-gray-300 rounded px-2 py-1"
      >
        <option value="single">Add Single</option>
        <option value="suggested">Add Suggestions</option>
        <option value="playlist">Add Playlist</option>
      </select>

      {mode === "suggested" && (
        <input
          name="count"
          type="number"
          min="1"
          value={count}
          onChange={(e) => setCount(parseInt(e.target.value))}
          className="border border-gray-300 rounded px-2 py-1 w-20"
          placeholder="Count"
        />
      )}

      <button type="submit" className="hidden" />
    </form>
  );
};

export default SongInput;
