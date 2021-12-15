import { PlayArrowRounded } from '@mui/icons-material';
import React, { useRef } from 'react';
import styles from './PostVideo.module.css';

export function PostVideo({ videoURL, active, fraction, aspectRatio }) {
  const [videoPause, setVideoPause] = React.useState(true);
  const videoRef = useRef();
  React.useEffect(() => {
    if (videoPause) {
      videoRef.current?.pause();
    } else {
      videoRef.current?.play();
    }
  }, [videoPause]);

  React.useEffect(() => {
    if (!active) {
      setVideoPause(true);
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
      }
    }
  }, [active]);

  return (
    <div
      onClick={() => setVideoPause(!videoPause)}
      width={`${fraction * 100}%`}
      className={styles.videoContainer}
      style={{ aspectRatio, width: `${fraction * 100}%` }}
    >
      <video className={styles.postVideo} ref={videoRef} src={videoURL} />
      {videoPause && (
        <div className={styles.playIconContainer}>
          <PlayArrowRounded
            onClick={() => setVideoPause(false)}
            className={styles.playIcon}
            fontSize="large"
          />
        </div>
      )}
    </div>
  );
}
