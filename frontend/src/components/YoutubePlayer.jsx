import React, { useRef, useState } from 'react';
import YouTube from 'react-youtube';

const YouTubePlayerWithControls = ({ videoUrl }) => {
  const playerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const getYouTubeVideoId = (url) => {
    try {
      const urlObj = new URL(url);
      return urlObj.searchParams.get('v');
    } catch (error) {
      console.error("Invalid YouTube URL:", url);
      return null;
    }
  };

  const videoId = getYouTubeVideoId(videoUrl);

  // YouTube Player Options
  const opts = {
    height: '0', // Hides the video
    width: '0',  // Hides the video
    playerVars: {
      autoplay: 1,
      controls: 0, // Hides default YouTube controls
    },
  };

  const onPlayerReady = (event) => {
    playerRef.current = event.target;
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
    setIsPlaying(!isPlaying);
  };

  const skipForward = (seconds) => {
    const currentTime = playerRef.current.getCurrentTime();
    playerRef.current.seekTo(currentTime + seconds, true);
  };

  const skipBackward = (seconds) => {
    const currentTime = playerRef.current.getCurrentTime();
    playerRef.current.seekTo(currentTime - seconds, true);
  };

  return (
    <div>
      {videoId ? (
        <>
          <YouTube
            videoId={videoId}
            opts={opts}
            onReady={onPlayerReady}
          />
          
          <div className="custom-controls">
            <button onClick={togglePlayPause}>
              {isPlaying ? 'Pause' : 'Play'}
            </button>
            <button onClick={() => skipBackward(10)}>Rewind 10s</button>
            <button onClick={() => skipForward(10)}>Skip 10s</button>
          </div>
        </>
      ) : (
        <p>Invalid YouTube URL</p>
      )}
    </div>
  );
};

export default YouTubePlayerWithControls;
