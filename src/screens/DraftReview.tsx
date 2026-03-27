import React, { useState } from 'react';
import { ChevronDown, Clock, Send } from 'lucide-react';
import { ENDPOINTS, API_HEADERS } from '../config/constants';

interface DraftReviewProps {
  drafts: any[];
  runId: string | null;
  onNext: (data: any) => void;
}

const DraftReview: React.FC<DraftReviewProps> = ({ drafts, runId, onNext }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [actionType, setActionType] = useState('publish_now');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleApprove = async () => {
    if (!selectedId) return;
    
    setLoading(true);
    setError('');

    try {
      const response = await fetch(ENDPOINTS.DRAFT_SELECT, {
        method: 'POST',
        headers: API_HEADERS,
        body: JSON.stringify({ draftId: selectedId, actionType, run_id: runId })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      onNext(data);
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
