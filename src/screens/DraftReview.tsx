import React, { useState } from 'react';
import { ChevronDown, Clock, Send } from 'lucide-react';

interface DraftReviewProps {
  onNext: () => void;
}

const DRAFTS = [
  {
    id: 'd1',
    title: 'The "Problem Framer" Approach',
    angle: 'Problem Framer',
    meta: 'Focuses on the pain point of generic content in 2026.',
    excerpt: 'Is your personal brand lost in the noise? Here is why most professionals fail at standing out...',
  },
  {
    id: 'd2',
    title: 'The Value-Driven Guide',
    angle: 'Direct Value',
    meta: 'Actionable steps to immediately upgrade a personal brand.',
    excerpt: '3 underrated strategies to build a brand that actually converts followers into clients...',
  },
  {
    id: 'd3',
    title: 'The Contrarian Take',
    angle: 'Contrarian',
    meta: 'Challenges the status quo of posting everyday.',
    excerpt: 'Stop posting every day. Here is why high-volume content is killing your reach...',
  }
];

const DraftReview: React.FC<DraftReviewProps> = ({ onNext }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [actionType, setActionType] = useState('publish_now');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleApprove = async () => {
    if (!selectedId) return;
    
    setLoading(true);
    setError('');

    try {
      const response = await fetch('https://cohort2pod2.app.n8n.cloud/webhook/draft-select', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': '9217ecf1e7bbe35df15abfc3b26920d12c7f3a5cbc44ef05ec79cf15432f06fd'
        },
        body: JSON.stringify({ draftId: selectedId, actionType })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      onNext();
    } catch (err) {
      setError('Failed to approve draft. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="screen draft-screen">
      <div className="screen-header">
        <h2>Review Generated Drafts</h2>
        <p>Select the best angle for your content strategy.</p>
      </div>

      <div className="draft-grid">
        {DRAFTS.map((draft) => (
          <div 
            key={draft.id} 
            className={`card draft-card ${selectedId === draft.id ? 'selected' : ''}`}
            onClick={() => setSelectedId(draft.id)}
          >
            <div className="draft-card-header">
              <span className="angle-badge">{draft.angle}</span>
              <div className="radio-circle">
                {selectedId === draft.id && <div className="radio-inner" />}
              </div>
            </div>
            <h3>{draft.title}</h3>
            <p className="meta-desc">{draft.meta}</p>
            <div className="excerpt">
              <p>"{draft.excerpt}"</p>
            </div>
          </div>
        ))}
      </div>
      
      {error && <div className="error-message">{error}</div>}

      <div className="action-bar">
        <div className="select-wrapper">
          <select 
            value={actionType} 
            onChange={(e) => setActionType(e.target.value)}
            className="dropdown-select"
          >
            <option value="publish_now">Publish Now</option>
            <option value="save_schedule">Save for Scheduling</option>
          </select>
          <ChevronDown className="select-icon" size={16} />
        </div>
        
        <button 
          className="btn btn-primary"
          onClick={handleApprove}
          disabled={!selectedId || loading}
        >
          {loading ? (
             <><div className="spinner"></div> Processing...</>
          ) : (
             <>
               {actionType === 'publish_now' ? <Send size={18} /> : <Clock size={18} />}
               Approve Selected Draft
             </>
          )}
        </button>
      </div>
    </div>
  );
};

export default DraftReview;
