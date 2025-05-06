import YouTube from "react-youtube";
import { useEffect, useRef } from "react";

const SongPlayer = ({ song, onPlay, roundEnded }) => {
  const playerRef = useRef(null);
  const isReadyRef = useRef(false); // Tracks when the player is ready

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

  useEffect(() => {
    if (
      roundEnded &&
      playerRef.current &&
      typeof playerRef.current.pauseVideo === "function"
    ) {
      playerRef.current.pauseVideo();
    }
  }, [roundEnded]);

  useEffect(() => {
    const interval = setInterval(() => {
      const player = playerRef.current;
      if (
        isReadyRef.current &&
        player &&
        typeof player.getCurrentTime === "function" &&
        typeof player.pauseVideo === "function"
      ) {
        const time = player.getCurrentTime();
        if (time >= song.end) {
          player.pauseVideo();
        }
      }
    }, 500);

    return () => clearInterval(interval);
  }, [song]);

  const handleStateChange = (event) => {
    // event.data === 1 means video started playing
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
