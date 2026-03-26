import React, { useState } from 'react';
import { ChevronDown, Clock, Send } from 'lucide-react';

interface DraftReviewProps {
  drafts: any[];
  onNext: () => void;
}

const DraftReview: React.FC<DraftReviewProps> = ({ drafts, onNext }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [actionType, setActionType] = useState('publish_now');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleApprove = async () => {
    if (!selectedId) return;
    
    setLoading(true);
    setError('');

    try {
      const response = await fetch('https://cohort2pod2.app.n8n.cloud/webhook-test/draft-select', {
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

  const getExcerpt = (draft: any) => {
    const text = draft.excerpt || draft.content || draft.body || '';
    return text.length > 200 ? text.substring(0, 200) + '...' : text;
  };

  return (
    <div className="screen draft-screen">
      <div className="screen-header">
        <h2>Review Generated Drafts</h2>
        <p>Select the best angle for your content strategy.</p>
      </div>

      <div className="draft-grid">
        {drafts.map((draft, idx) => (
          <div 
            key={draft.id || idx} 
            className={`card draft-card ${selectedId === (draft.id || String(idx)) ? 'selected' : ''}`}
            onClick={() => setSelectedId(draft.id || String(idx))}
          >
            <div className="draft-card-header">
              <span className="angle-badge">{draft.angle || 'Draft'}</span>
              <div className="radio-circle">
                {selectedId === (draft.id || String(idx)) && <div className="radio-inner" />}
              </div>
            </div>
            <h3>{draft.title || draft.headline}</h3>
            <p className="meta-desc">{draft.meta || draft.description}</p>
            <div className="excerpt">
              <p>"{getExcerpt(draft)}"</p>
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
