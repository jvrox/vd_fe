import React from 'react';
import './ResultSection.css'; // Create this CSS file for styling

const ResultSection = ({ resultVideo, onRedo }) => {
  return (
    <div className="result-section">
      <h2>Detection Results</h2>
      {resultVideo ? (
        <div>
          <video src={resultVideo} controls width="600" />
          <div className="result-buttons">
            <button onClick={() => window.location.href = resultVideo} download="result.mp4">Download</button>
            <button onClick={onRedo}>Redo</button>
          </div>
        </div>
      ) : (
        <p>No results available.</p>
      )}
    </div>
  );
};

export default ResultSection;
