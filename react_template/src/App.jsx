// src/App.jsx
import React, { useState } from 'react';
import VideoUploader from './components/VideoUploader';
import VideoPlayer from './components/VideoPlayer';
import TrimControls from './components/TrimControls';
import { processVideo } from './utils/videoProcessing';

function App() {
  const [videoFile, setVideoFile] = useState(null);
  const [videoUrl, setVideoUrl] = useState('');
  const [trimConfig, setTrimConfig] = useState({ start: 0, end: 0 });
  const [processing, setProcessing] = useState(false);
  const [duration, setDuration] = useState(0);

  const handleVideoUpload = (file) => {
    setVideoFile(file);
    setVideoUrl(URL.createObjectURL(file));
    setTrimConfig({ start: 0, end: 0 });
  };

  const handleTrimConfigChange = (newConfig) => {
    setTrimConfig(newConfig);
  };

  const handleProcessVideo = async () => {
    if (!videoFile) return;

    setProcessing(true);
    try {
      const processedVideo = await processVideo(videoFile, trimConfig);
      const url = URL.createObjectURL(processedVideo);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'trimmed-video.mp4';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error processing video:', error);
      alert('Error processing video. Please try again.');
    }
    setProcessing(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">VideoClipper</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6">
          <VideoUploader onVideoUpload={handleVideoUpload} />
          
          {videoUrl && (
            <>
              <div className="mt-6">
                <VideoPlayer 
                  videoUrl={videoUrl} 
                  trimConfig={trimConfig}
                  onDurationChange={setDuration}
                />
              </div>
              
              <div className="mt-6">
                <TrimControls 
                  duration={duration}
                  trimConfig={trimConfig}
                  onConfigChange={handleTrimConfigChange}
                />
              </div>
              
              <div className="mt-6 text-center">
                <button
                  onClick={handleProcessVideo}
                  disabled={processing}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg disabled:opacity-50"
                >
                  {processing ? 'Processing...' : 'Trim Video'}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;