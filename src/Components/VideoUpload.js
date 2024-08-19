import React, { useState } from 'react';
import './VideoUpload.css'; // Update this CSS file accordingly

const VideoUpload = ({ onVideoUpload }) => {
  const [video, setVideo] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showFileInput, setShowFileInput] = useState(true);

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    setVideo(URL.createObjectURL(file));
    setShowFileInput(false);
    setUploading(true);
    
    // Simulate file upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress === 100) {
        clearInterval(interval);
        setUploading(false);
        onVideoUpload(file);
      }
    }, 200); // Simulated upload time
  };

  const handleUploadAgain = () => {
    setVideo(null);
    setUploadProgress(0);
    setUploading(false);
    setShowFileInput(true);
  };

  return (
    <div className="video-upload">
      {uploading ? (
        <div className="upload-progress">
          <p>Uploading... {uploadProgress}%</p>
        </div>
      ) : (
        <div className="upload-container">
          {showFileInput && (
            <input 
              type="file" 
              accept="video/*" 
              onChange={handleVideoUpload} 
              className="file-input"
            />
          )}
          {video && <video src={video} controls width="100%" />}
          {!uploading && video && (
            <div className="button-container">
              <button className="detect-button" onClick={() => onVideoUpload(video)}>Detect</button>
              <button className="upload-again-button" onClick={handleUploadAgain}>Upload Again</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default VideoUpload;
