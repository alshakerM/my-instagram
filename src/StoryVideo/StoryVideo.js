import React, { useRef } from "react";
import "./StoryVideo.css";

export function StoryVideo({ videoURL, paused, muted, onProgress }) {
  const videoRef = useRef();
  React.useEffect(() => {
    if (paused) {
      videoRef.current?.pause();
    } else {
      videoRef.current?.play();
    }
  }, [paused]);
  return (
    <video
      className="story-video"
      muted={muted}
      autoPlay
      ref={videoRef}
      src={videoURL}
      onTimeUpdate={(event) =>
        onProgress(event.target.currentTime / event.target.duration)
      }
    />
  );
}
