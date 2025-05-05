import YouTube from "react-youtube";
import { useEffect, useRef } from "react";

const SongPlayer = ({ song, onPlay, roundEnded }) => {
  const playerRef = useRef(null);

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
    // Pause when round ends
    if (roundEnded && playerRef.current) {
      playerRef.current.pauseVideo();
    }
  }, [roundEnded]);

  useEffect(() => {
    const interval = setInterval(() => {
      const player = playerRef.current;
      if (player && typeof player.getCurrentTime === "function") {
        const time = player.getCurrentTime();
        if (time >= song.end) {
          player.pauseVideo();
        }
      }
    }, 500);
    return () => clearInterval(interval);
  }, [song]);

  const handleStateChange = (event) => {
    if (event.data === 1 && typeof onPlay === "function") {
      onPlay(); // Start game when video plays
    }
  };

  return (
    <div className="invisible">
      <YouTube
        videoId={videoId}
        opts={opts}
        onReady={(event) => {
          playerRef.current = event.target;
          event.target.setVolume(100);
        }}
        onStateChange={handleStateChange}
      />
    </div>
  );
};

export default SongPlayer;
