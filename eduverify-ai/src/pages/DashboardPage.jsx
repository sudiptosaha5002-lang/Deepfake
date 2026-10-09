import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ShieldAlert, ShieldCheck, Image as ImageIcon, Info, Camera, 
  FileSignature, Search, Edit3, ArrowLeft, Eye, EyeOff, AlertTriangle
} from 'lucide-react';
import { motion } from 'framer-motion';
import './DashboardPage.css';

// Mock Data
const mockReport = {
  id: 'demo-id-123',
  status: 'concern', // 'genuine', 'concern', 'uncertain'
  statusLabel: 'Possibly AI-generated or Edited',
  confidenceScore: 72,
  summary: 'This image shows signs that may indicate synthetic generation or significant digital editing, but the evidence is not conclusive. Manual review is recommended.',
  signals: {
    visual: {
      score: 78,
      label: 'High probability of synthetic patterns',
      explanation: 'The model detects visual artifacting and noise patterns common in AI-generated images.'
    },
    metadata: {
      status: 'warning',
      label: 'Editing software detected',
      explanation: 'EXIF data indicates the file was saved using Adobe Photoshop 2024.'
    },
    provenance: {
      status: 'missing',
      label: 'No Content Credentials found',
      explanation: 'No C2PA standard cryptographic signature is attached to verify origin.'
    },
    ocr: {
      score: 92,
      label: 'Text is clear and readable',
      extracted: 'Student Name: [Removed]\nCourse: Bio 101\n\nQuestion 1: The mitochondria is the powerhouse of the cell...'
    },
    consistency: [
      'Unusually perfect text alignment with drawn lines',
      'Lighting on handwritten segments does not match page shadows'
    ]
  }
};

const DashboardPage = () => {
  const { id } = useParams();
  const [showHighlights, setShowHighlights] = useState(true);

  // Derive visual colors based on status
  const getStatusColor = (status) => {
    switch(status) {
      case 'genuine': return 'var(--color-genuine)';
      case 'concern': return 'var(--color-concern)';
      default: return 'var(--color-uncertain)';
    }
  };

  const getStatusBadgeClass = (status) => {
    switch(status) {
      case 'genuine': return 'badge-genuine';
      case 'concern': return 'badge-concern';
      default: return 'badge-uncertain';
    }
  };

  const getStatusIcon = (status) => {
    if (status === 'genuine') return <ShieldCheck size={28} />;
    if (status === 'concern') return <ShieldAlert size={28} />;
    return <Info size={28} />;
  };

  return (
    <div className="container p-4 dashboard-container">
      
      <div className="header-actions">
        <Link to="/history" className="btn btn-secondary btn-sm">
          <ArrowLeft size={16} /> Back to History
        </Link>
        <span className="text-muted text-sm">Report ID: {id}</span>
      </div>

      <div className="dashboard-grid">
        {/* LEFT COLUMN */}
        <div className="dashboard-left">
          
          {/* Top Summary Card */}
          <motion.div 
            className="card summary-card"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="summary-header">
              <div className={`badge ${getStatusBadgeClass(mockReport.status)} badge-lg`}>
                {getStatusIcon(mockReport.status)}
                <span>{mockReport.statusLabel}</span>
              </div>
              <div className="confidence-score">
                <div 
                  className="score-circle" 
                  style={{ borderColor: getStatusColor(mockReport.status) }}
                >
                  <span className="score-value">{mockReport.confidenceScore}%</span>
                </div>
                <span className="score-label">AI/Edit Probability</span>
              </div>
            </div>
            <p className="summary-text">{mockReport.summary}</p>
          </motion.div>

          {/* Explanation Signals */}
          <motion.div 
            className="card signals-card"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="section-title">Signal Breakdown</h3>
            
            <div className="signal-list">
              {/* Visual Detector */}
              <div className="signal-item">
                <div className="signal-icon"><ImageIcon size={20} /></div>
                <div className="signal-content">
                  <div className="signal-title-row">
                    <h4>Visual AI Detector</h4>
                    <span className="signal-score">{mockReport.signals.visual.score}%</span>
                  </div>
                  <div className="progress-bar-container sm-progress">
                    <div 
                      className="progress-bar" 
                      style={{ 
                        width: `${mockReport.signals.visual.score}%`,
                        backgroundColor: mockReport.signals.visual.score > 50 ? 'var(--color-concern)' : 'var(--color-genuine)' 
                      }}
                    ></div>
                  </div>
                  <p className="signal-desc">{mockReport.signals.visual.label}. {mockReport.signals.visual.explanation}</p>
                </div>
              </div>

              {/* Metadata */}
              <div className="signal-item">
                <div className="signal-icon"><Camera size={20} /></div>
                <div className="signal-content">
                  <div className="signal-title-row">
                    <h4>File Metadata</h4>
                    <span className={`badge ${mockReport.signals.metadata.status === 'warning' ? 'badge-concern' : 'badge-genuine'}`}>
                      {mockReport.signals.metadata.status === 'warning' ? 'Modified' : 'Original'}
                    </span>
                  </div>
                  <p className="signal-desc">
                    <strong>{mockReport.signals.metadata.label}:</strong> {mockReport.signals.metadata.explanation}
                  </p>
                </div>
              </div>

              {/* Provenance C2PA */}
              <div className="signal-item">
                <div className="signal-icon"><FileSignature size={20} /></div>
                <div className="signal-content">
                  <div className="signal-title-row">
                    <h4>Provenance (C2PA)</h4>
                    <span className="badge badge-uncertain">Missing</span>
                  </div>
                  <p className="signal-desc">
                    <strong>{mockReport.signals.provenance.label}:</strong> {mockReport.signals.provenance.explanation}
                  </p>
                </div>
              </div>

              {/* Consistency */}
              <div className="signal-item last-item">
                <div className="signal-icon"><Edit3 size={20} /></div>
                <div className="signal-content">
                  <h4>Consistency & Physics</h4>
                  <ul className="consistency-list">
                    {mockReport.signals.consistency.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>
          </motion.div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="dashboard-right">
          
          {/* Image Preview */}
          <motion.div 
             className="card image-card"
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.2 }}
          >
            <div className="card-header-flex">
              <h3 className="section-title">Image Analysis</h3>
              <button 
                className="btn btn-outline btn-sm toggle-btn"
                onClick={() => setShowHighlights(!showHighlights)}
              >
                {showHighlights ? <EyeOff size={16} /> : <Eye size={16} />}
                {showHighlights ? 'Hide Highlights' : 'Show Highlights'}
              </button>
            </div>
            
            <div className="image-preview-wrapper">
              {/* Dummy Image Background, simulating an assignment */}
              <div className="dummy-assignment-bg">
                <div className="dummy-text">
                  <p>Biology 101 - Final Assignment</p>
                  <p className="line">........................................</p>
                  <p className="line">........................................</p>
                </div>
              </div>

              {/* AI Highlights Overlay */}
              {showHighlights && (
                <div className="highlight-overlay">
                  <div className="highlight-box box-1"></div>
                  <div className="highlight-box box-2"></div>
                </div>
              )}
            </div>
          </motion.div>

          {/* OCR Panel */}
          <motion.div 
            className="card ocr-card"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="card-header-flex">
              <h3 className="section-title flex items-center gap-2">
                <Search size={18} /> Extracted Text
              </h3>
              <span className="text-sm text-muted">Confidence: {mockReport.signals.ocr.score}%</span>
            </div>
            <div className="ocr-text-box">
              {mockReport.signals.ocr.extracted}
            </div>
          </motion.div>

        </div>
      </div>

      {/* Recommended Actions */}
      <motion.div 
        className="card actions-card"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h3 className="section-title">Recommended Actions</h3>
        <div className="action-cards-container">
          
          <div className="action-card">
            <h4>Request original file</h4>
            <p>Metadata and visual signals are mixed; requesting the original unedited file may provide clarity.</p>
            <button className="btn btn-secondary w-full mt-auto">Draft Email</button>
          </div>

          <div className="action-card">
            <h4>Ask for oral explanation</h4>
            <p>Have a brief conversation with the student about their process to clear up uncertainties.</p>
            <button className="btn btn-secondary w-full mt-auto">Schedule Chat</button>
          </div>

          <div className="action-card">
            <h4>Send for manual review</h4>
            <p>Escalate to the academic integrity committee for a second opinion based on these findings.</p>
            <button className="btn btn-primary w-full mt-auto">Escalate Case</button>
          </div>

        </div>
      </motion.div>

      {/* Ethics Disclaimer */}
      <motion.div 
        className="ethics-disclaimer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <AlertTriangle size={24} className="ethics-icon" />
        <div className="ethics-content">
          <h4>Decision Support Only</h4>
          <p>This report is generated by AI and is intended as decision support for educators. It <strong>does not prove</strong> that a student used AI or committed academic misconduct. Always combine this information with your professional judgment and institutional policies.</p>
        </div>
      </motion.div>

    </div>
  );
};

export default DashboardPage;
