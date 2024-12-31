// src/components/VideoPlayer.jsx
import React, { useRef, useEffect } from 'react';

function VideoPlayer({ videoUrl, trimConfig, onDurationChange }) {
  const videoRef = useRef(null);
  const progressBarRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener('loadedmetadata', () => {
        onDurationChange(videoRef.current.duration);
      });
    }
  }, [videoUrl, onDurationChange]);

  const updateProgressBar = () => {
    if (videoRef.current && progressBarRef.current) {
      const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      progressBarRef.current.style.width = `${progress}%`;
    }
  };

  const handleTimeUpdate = () => {
    updateProgressBar();
    if (videoRef.current.currentTime >= trimConfig.end) {
      videoRef.current.pause();
      videoRef.current.currentTime = trimConfig.start;
    }
  };

  const handleProgressBarClick = (e) => {
    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / progressBar.offsetWidth;
    if (videoRef.current) {
      videoRef.current.currentTime = percentage * videoRef.current.duration;
    }
  };

  return (
    <div className="relative">
      <video
        ref={videoRef}
        src={videoUrl}
        className="w-full rounded-lg"
        controls
        onTimeUpdate={handleTimeUpdate}
      />
      <div
        className="absolute bottom-0 left-0 w-full h-1 bg-gray-200 cursor-pointer"
        onClick={handleProgressBarClick}
      >
        <div
          ref={progressBarRef}
          className="h-full bg-blue-500"
        />
      </div>
    </div>
  );
}

export default VideoPlayer;