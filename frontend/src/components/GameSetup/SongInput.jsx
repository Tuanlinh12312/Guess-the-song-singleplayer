import { useState } from "react";

const SongInput = ({ onAddSong }) => {
  const [url, setUrl] = useState("");
  const [mode, setMode] = useState("single");
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
      className="flex flex-row gap-2 w-[900px] max-w-full"
    >
      <input
        name="url"
        type="text"
        placeholder="Enter Song Name or YouTube Music URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="border border-gray-300 rounded px-3 py-1 font-EBGaramond w-[67%]"
      />

      <select
        value={mode}
        onChange={(e) => setMode(e.target.value)}
        className="border border-gray-300 rounded px-2 py-1 font-EBGaramond w-[35%]"
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
          className="border border-gray-300 rounded px-2 py-1 font-EBGaramond text-center w-[60px]"
          placeholder="Count"
        />
      )}

      <button type="submit" className="hidden" />
    </form>
  );
};

export default SongInput;
