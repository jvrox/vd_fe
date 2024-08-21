import React, { useState } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests
import './VideoUpload.css'; // Update this CSS file accordingly

const VideoUpload = () => {
  const [video, setVideo] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showFileInput, setShowFileInput] = useState(true);
  const [detectionResult, setDetectionResult] = useState(null);

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
      }
    }, 200); // Simulated upload time
  };

  const handleUploadAgain = () => {
    setVideo(null);
    setUploadProgress(0);
    setUploading(false);
    setShowFileInput(true);
    setDetectionResult(null);
  };

  const handleDetect = async () => {
    if (!video) return;
    const formData = new FormData();
    formData.append('file', video);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percentCompleted);
        }
      });

      setDetectionResult(response.data.output); // Assuming backend returns the path or URL to the output video
    } catch (error) {
      console.error('Error during file upload:', error);
    }
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
              <button className="detect-button" onClick={handleDetect}>Detect</button>
              <button className="upload-again-button" onClick={handleUploadAgain}>Upload Again</button>
            </div>
          )}
        </div>
      )}
      {detectionResult && (
        <div className="detection-result">
          <p>Detection complete. Watch the result below:</p>
          <video src={detectionResult} controls width="100%" />
        </div>
      )}
    </div>
  );
};

export default VideoUpload;
