import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UploadCloud, Image as ImageIcon, CheckCircle, AlertTriangle, X } from 'lucide-react';
import { motion } from 'framer-motion';
import './UploadPage.css';

const UploadPage = () => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const processFile = (file) => {
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const startAnalysis = () => {
    if (!selectedFile) return;
    setIsAnalyzing(true);

    // Simulate analysis progress
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 15) + 5;
      if (currentProgress >= 100) {
        clearInterval(interval);
        setProgress(100);
        setTimeout(() => {
          // Navigate to a simulated analysis dummy ID
          navigate('/analysis/demo-id-123');
        }, 500);
      } else {
        setProgress(currentProgress);
      }
    }, 400);
  };

  return (
    <div className="container p-4 max-w-3xl">
      <div className="upload-header">
        <h2>Verify Assignment</h2>
        <p className="text-muted">Upload an image (JPG, PNG, WebP) of the student's submission to begin analysis.</p>
      </div>

      <div className="privacy-notice">
        <AlertTriangle size={20} className="notice-icon" />
        <div className="notice-content">
          <h4>Privacy Notice</h4>
          <p>Please ensure you <strong>do not upload images</strong> that contain student names, faces, or personal identifiable information.</p>
        </div>
      </div>

      {!selectedFile ? (
        <div
          className={`drop-zone card ${dragActive ? 'drag-active' : ''}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            id="file-upload"
            className="file-input"
            accept="image/jpeg, image/png, image/webp"
            onChange={handleChange}
          />
          <label htmlFor="file-upload" className="drop-zone-content">
            <UploadCloud size={48} className="upload-icon" />
            <h3 className="upload-title">Drag & drop an image here</h3>
            <p className="upload-subtitle">or click to browse from your computer</p>
            <span className="upload-formats">Supported formats: JPG, PNG, WebP (Max 10MB)</span>
            <div className="btn btn-primary mt-4">Browse Files</div>
          </label>
        </div>
      ) : (
        <motion.div
          className="file-preview-card card"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="preview-header">
            <div className="file-info">
              <div className="file-icon-wrapper">
                <ImageIcon size={24} />
              </div>
              <div className="file-details">
                <span className="file-name">{selectedFile.name}</span>
                <span className="file-size">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</span>
              </div>
            </div>
            {!isAnalyzing && (
              <button className="btn-icon" onClick={() => setSelectedFile(null)}>
                <X size={20} />
              </button>
            )}
          </div>

          <div className="preview-image-container">
            <img src={URL.createObjectURL(selectedFile)} alt="Preview" className="preview-image" />
          </div>

          {isAnalyzing ? (
            <div className="analysis-progress">
              <div className="progress-header">
                <span className="progress-title">Analyzing image...</span>
                <span className="progress-percentage">{progress}%</span>
              </div>
              <div className="progress-bar-container">
                <motion.div
                  className="progress-bar"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                ></motion.div>
              </div>
              <p className="progress-desc">Checking visual signals, metadata, and provenance...</p>
            </div>
          ) : (
            <div className="preview-actions">
              <button
                className="btn btn-outline"
                onClick={() => setSelectedFile(null)}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary"
                onClick={startAnalysis}
              >
                Start Analysis
              </button>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default UploadPage;
