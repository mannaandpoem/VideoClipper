// src/components/TrimControls.jsx
import React from 'react';

function TrimControls({ duration, trimConfig, onConfigChange }) {
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  const handleStartChange = (e) => {
    const newStart = parseFloat(e.target.value);
    onConfigChange({
      ...trimConfig,
      start: newStart,
      end: Math.max(newStart, trimConfig.end)
    });
  };

  const handleEndChange = (e) => {
    const newEnd = parseFloat(e.target.value);
    onConfigChange({
      ...trimConfig,
      end: newEnd,
      start: Math.min(newEnd, trimConfig.start)
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <label className="w-24 text-sm font-medium text-gray-700">Start Time:</label>
        <input
          type="range"
          min="0"
          max={duration}
          step="0.1"
          value={trimConfig.start}
          onChange={handleStartChange}
          className="flex-grow h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <span className="w-16 text-sm text-gray-600">{formatTime(trimConfig.start)}</span>
      </div>

      <div className="flex items-center space-x-4">
        <label className="w-24 text-sm font-medium text-gray-700">End Time:</label>
        <input
          type="range"
          min="0"
          max={duration}
          step="0.1"
          value={trimConfig.end}
          onChange={handleEndChange}
          className="flex-grow h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <span className="w-16 text-sm text-gray-600">{formatTime(trimConfig.end)}</span>
      </div>
    </div>
  );
}

export default TrimControls;