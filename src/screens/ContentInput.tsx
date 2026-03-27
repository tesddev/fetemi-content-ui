import React, { useState } from 'react';
import { Sparkles, Link as LinkIcon, FileText } from 'lucide-react';
import { ENDPOINTS, API_HEADERS } from '../config/constants';

interface ContentInputProps {
  onNext: (data: any) => void;
}

const ContentInput: React.FC<ContentInputProps> = ({ onNext }) => {
  const [contentIdea, setContentIdea] = useState('');
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contentIdea.trim() && !url.trim()) {
      setError('Please provide at least a content idea or a source URL.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const response = await fetch(ENDPOINTS.CONTENT_SUBMIT, {
        method: 'POST',
        headers: API_HEADERS,
        body: JSON.stringify({ contentIdea, url })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      onNext(data);
    } catch (err) {
      setError('Failed to generate drafts. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="screen">
      <div className="card input-card">
        <div className="card-header">
          <h2>Create New Content</h2>
          <p>Provide a starting point to generate AI-crafted drafts for your platforms.</p>
        </div>

        <form onSubmit={handleSubmit} className="input-form">
          <div className="form-group">
            <label htmlFor="contentIdea">
              <FileText size={18} /> Content Idea
            </label>
            <textarea
              id="contentIdea"
              value={contentIdea}
              onChange={(e) => setContentIdea(e.target.value)}
              placeholder="e.g., Explain the importance of building a personal brand in 2026..."
              rows={5}
            />
          </div>

          <div className="divider">
            <span>OR / AND</span>
          </div>

          <div className="form-group">
            <label htmlFor="url">
              <LinkIcon size={18} /> Source URL
            </label>
            <input
              type="url"
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com/insightful-article"
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="form-actions">
            <button
              type="submit"
              className="btn btn-primary generate-btn"
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="spinner"></div> Generating Drafts...
                </>
              ) : (
                <>
                  <Sparkles size={20} /> Generate Drafts
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContentInput;
