import YouTube from "react-youtube";
import { useEffect, useRef } from "react";

const SongPlayer = ({ song, onPlay, roundEnded }) => {
  const playerRef = useRef(null);
  const isReadyRef = useRef(false);

  const extractVideoID = (url) => {
    try {
      const urlObj = new URL(url);
      return urlObj.searchParams.get("v");
    } catch {
      return null;
    }
  };

  const videoId = extractVideoID(song.url);

  const opts = {
    height: "0",
    width: "0",
    playerVars: {
      autoplay: 1,
      controls: 0,
      start: song.start,
      end: song.end,
    },
  };

  const handleStateChange = (event) => {
    if (event.data === 1 && typeof onPlay === "function") {
      onPlay();
    }
  };

  const handleReady = (event) => {
    playerRef.current = event.target;
    isReadyRef.current = true;
    try {
      event.target.setVolume(100);
    } catch (err) {
      console.warn("Failed to set volume:", err);
    }
  };

  if (roundEnded || !videoId) return null;

  return (
    <div className="invisible">
      <YouTube
        videoId={videoId}
        opts={opts}
        onReady={handleReady}
        onStateChange={handleStateChange}
      />
    </div>
  );
};

export default SongPlayer;
