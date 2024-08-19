import React, { useState } from 'react';
import HeroSection from './Components/HeroSection';
import VideoUpload from './Components/VideoUpload';
import ResultSection from './Components/ResultSection';
import './App.css';

const App = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [resultVideo, setResultVideo] = useState(null);

  const handleVideoUpload = (file) => {
    setVideoFile(file);
    // Here you would typically send the video to the backend for processing
    // Simulating result
    setTimeout(() => {
      setResultVideo(URL.createObjectURL(file)); // Use the same video as a placeholder for the result
    }, 2000);
  };

  const handleRedo = () => {
    setVideoFile(null);
    setResultVideo(null);
  };

  return (
    <div className="App">
      <HeroSection />
      <VideoUpload onVideoUpload={handleVideoUpload} />
      <ResultSection resultVideo={resultVideo} onRedo={handleRedo} />
    </div>
  );
};

export default App;
