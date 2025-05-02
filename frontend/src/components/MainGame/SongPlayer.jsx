import YouTube from "react-youtube";
import { useEffect, useRef } from "react";

const SongPlayer = ({ song }) => {
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
    height: "200", // can be visually hidden with CSS later
    width: "300",
    playerVars: {
      autoplay: 1,
      controls: 0,
      start: song.start,
      end: song.end,
    },
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const player = playerRef.current;
      if (player && typeof player.getCurrentTime === "function") {
        const time = player.getCurrentTime();
        if (time >= song.End) {
          player.pauseVideo();
        }
      }
    }, 500);
    return () => clearInterval(interval);
  }, [song]);

  return (
    <div className="invisible"> {/* hide the player visually */}
    <h1>
      {opts.playerVars.start}
      {videoId}
    </h1>
      <YouTube
        videoId={videoId}
        opts={opts}
        onReady={(event) => {
          playerRef.current = event.target;
          event.target.setVolume(100);
          // event.target.mute(); // Mute to allow autoplay
        }}
      />
    </div>
  );
};

export default SongPlayer;
