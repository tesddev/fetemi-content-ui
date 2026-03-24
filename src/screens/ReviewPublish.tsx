import React, { useState } from 'react';
import { Linkedin, Twitter, Mail, ArrowLeft, Send } from 'lucide-react';

interface ReviewPublishProps {
  onBack: () => void;
}

const ReviewPublish: React.FC<ReviewPublishProps> = ({ onBack }) => {
  const [publishing, setPublishing] = useState(false);
  const [published, setPublished] = useState(false);

  const handlePublish = async () => {
    setPublishing(true);
    // Simulate publish request
    await new Promise(resolve => setTimeout(resolve, 2000));
    setPublishing(false);
    setPublished(true);
  };

  if (published) {
    return (
      <div className="screen success-screen">
        <div className="card success-card">
          <div className="success-icon">✓</div>
          <h2>Content Published Successfully!</h2>
          <p>Your posts have been distributed across your platforms.</p>
          <button className="btn btn-primary" onClick={() => window.location.reload()}>Start New</button>
        </div>
      </div>
    );
  }

  return (
    <div className="screen review-screen">
      <div className="screen-header flex-between">
        <div>
          <h2>Final Review</h2>
          <p>Check how your content will look across platforms.</p>
        </div>
        <div className="header-actions">
          <button className="btn btn-secondary" onClick={onBack}>
            <ArrowLeft size={18} /> Go Back
          </button>
          <button 
            className="btn btn-primary" 
            onClick={handlePublish}
            disabled={publishing}
          >
            {publishing ? (
              <><div className="spinner"></div> Publishing...</>
            ) : (
              <><Send size={18} /> Confirm & Publish</>
            )}
          </button>
        </div>
      </div>

      <div className="preview-panels">
        {/* LinkedIn Panel */}
        <div className="card platform-panel">
          <div className="panel-header linkedin-header">
            <Linkedin size={20} /> LinkedIn Post
          </div>
          <div className="panel-content">
            <div className="mock-post">
              <div className="mock-author">
                <div className="mock-avatar"></div>
                <div className="mock-meta">
                  <div className="mock-name">John Doe</div>
                  <div className="mock-time">Just now • 🌐</div>
                </div>
              </div>
              <p>Is your personal brand lost in the noise? Here is why most professionals fail at standing out in 2026.</p>
              <br/>
              <p>The problem isn't lack of content. It's the "sea of sameness". Everyone is utilizing the same AI tools to write the same 10 tips.</p>
              <br/>
              <p>To win, you must become a Problem Framer.</p>
              <p>#PersonalBranding #Marketing #Career</p>
            </div>
          </div>
        </div>

        {/* Twitter Panel */}
        <div className="card platform-panel">
          <div className="panel-header twitter-header">
            <Twitter size={20} /> Twitter Thread
          </div>
          <div className="panel-content">
            <div className="mock-thread">
              <div className="mock-tweet">
                <div className="tweet-number">1/5</div>
                <p>Is your personal brand lost in the noise? Here is why most professionals fail at standing out in 2026. 🧵👇</p>
              </div>
              <div className="mock-tweet">
                <div className="tweet-number">2/5</div>
                <p>The problem isn't lack of content. It's the "sea of sameness". Everyone is utilizing the same AI tools to write the same 10 tips. The market is saturated with mediocrity.</p>
              </div>
              <div className="mock-tweet">
                <div className="tweet-number">3/5</div>
                <p>To win, you must become a Problem Framer. Stop giving generic solutions. Start defining the problem better than your audience can themselves.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Email Panel */}
        <div className="card platform-panel">
          <div className="panel-header email-header">
            <Mail size={20} /> Email Newsletter
          </div>
          <div className="panel-content email-content">
            <div className="email-subject">
              <span className="label">Subject:</span> You're probably doing personal branding wrong (here's why)
            </div>
            <div className="email-body">
              <p>Hey {"{{first_name}}"},</p>
              <p>Is your personal brand lost in the noise?</p>
              <p>I was looking at the content landscape for 2026 yesterday, and I noticed a terrifying trend: The "sea of sameness".</p>
              <p>Everyone is utilizing the same tools to write the same generic tips. To win today, you must become a Problem Framer. Let's break down exactly how you can do that this week.</p>
              <p>Best,</p>
              <p>John</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewPublish;
