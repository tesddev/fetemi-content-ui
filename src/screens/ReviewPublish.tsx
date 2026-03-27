import React from 'react';
import { Linkedin, Twitter, Mail, CheckCircle, RefreshCw } from 'lucide-react';

interface ReviewPublishProps {
  content: any;
  onNew: () => void;
}

const ReviewPublish: React.FC<ReviewPublishProps> = ({ content, onNew }) => {
  // If the webhook didn't return anything or mapping failed, fallback gracefully
  const safeContent = content || {};

  // Try to pick up obvious keys for the platforms, or just show everything
  const linkedinContent = safeContent.linkedin_post || safeContent.linkedin || safeContent.linkedin_body;
  const twitterContent = safeContent.twitter_thread || safeContent.twitter || safeContent.tweets;
  const emailContent = safeContent.email_newsletter || safeContent.email || safeContent.email_body || safeContent.newsletter;
  
  const hasSpecifics = linkedinContent || twitterContent || emailContent;

  const renderGenericPanels = () => {
    return Object.entries(safeContent).map(([key, value], idx) => (
      <div className="card platform-panel" key={idx} style={{ flex: '1 1 300px' }}>
        <div className="panel-header" style={{ textTransform: 'capitalize' }}>
          <CheckCircle size={20} className="text-success" /> {key.replace(/_/g, ' ')}
        </div>
        <div className="panel-content">
          <div className="mock-post">
            <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'var(--font-family)', margin: 0 }}>
              {typeof value === 'object' ? JSON.stringify(value, null, 2) : String(value)}
            </pre>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className="screen review-screen">
      <div className="screen-header flex-between" style={{ marginBottom: '2rem' }}>
        <div>
          <h2>Automation Complete</h2>
          <p>Your content has been successfully processed by the automation flow.</p>
        </div>
        <div className="header-actions">
          <button className="btn btn-primary" onClick={onNew}>
            <RefreshCw size={18} /> Start New
          </button>
        </div>
      </div>

      <div className="preview-panels" style={{ flexWrap: 'wrap' }}>
        {Object.keys(safeContent).length === 0 ? (
          <div className="card platform-panel" style={{ padding: '2rem', textAlign: 'center' }}>
            <p>Execution finished, but no content was returned by the webhook.</p>
          </div>
        ) : hasSpecifics ? (
          <>
            {linkedinContent && (
              <div className="card platform-panel" style={{ flex: '1 1 300px' }}>
                <div className="panel-header linkedin-header">
                  <Linkedin size={20} /> LinkedIn
                </div>
                <div className="panel-content">
                  <div className="mock-post" style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>
                    {typeof linkedinContent === 'object' 
                      ? (linkedinContent.post || JSON.stringify(linkedinContent, null, 2))
                      : String(linkedinContent)}
                  </div>
                </div>
              </div>
            )}
            
            {twitterContent && (
              <div className="card platform-panel" style={{ flex: '1 1 300px' }}>
                <div className="panel-header twitter-header">
                  <Twitter size={20} /> Twitter
                </div>
                <div className="panel-content">
                  <div className="mock-post" style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>
                    {typeof twitterContent === 'object' 
                      ? (Array.isArray(twitterContent.tweets) 
                          ? twitterContent.tweets.join('\n\n') 
                          : JSON.stringify(twitterContent, null, 2))
                      : String(twitterContent)}
                  </div>
                </div>
              </div>
            )}
            
            {emailContent && (
              <div className="card platform-panel" style={{ flex: '1 1 300px' }}>
                <div className="panel-header email-header">
                  <Mail size={20} /> Email
                </div>
                <div className="panel-content email-content" style={{ padding: 0 }}>
                  <div className="mock-post" style={{ padding: '1.5rem', border: 'none', boxShadow: 'none' }}>
                    {typeof emailContent === 'object' ? (
                      <>
                        {emailContent.subject_line && (
                          <div className="email-subject">
                            <span className="label">Subject:</span> {emailContent.subject_line}
                          </div>
                        )}
                        <div className="email-body">
                          {emailContent.body_html ? (
                            <div dangerouslySetInnerHTML={{ __html: emailContent.body_html }} style={{ lineHeight: '1.6' }} />
                          ) : (
                            <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'var(--font-family)', margin: 0 }}>
                              {JSON.stringify(emailContent, null, 2)}
                            </pre>
                          )}
                        </div>
                      </>
                    ) : (
                      String(emailContent)
                    )}
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          renderGenericPanels()
        )}
      </div>
    </div>
  );
};

export default ReviewPublish;
