import React from 'react';
import './HeroSection.css'; // Create this CSS file for styling

const HeroSection = () => {
  return (
    <div className="hero-section">
      <div className="hero-content">
        <h1>Violence Detection</h1>
        <p>Upload a video to detect violence. The system will analyze and provide results.</p>
      </div>
    </div>
  );
};

export default HeroSection;
