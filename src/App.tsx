import { useState } from 'react';
import ContentInput from './screens/ContentInput';
import DraftReview from './screens/DraftReview';
import ReviewPublish from './screens/ReviewPublish';

function App() {
  const [currentScreen, setCurrentScreen] = useState(1);
  const [drafts, setDrafts] = useState<any[]>([]);

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="logo">Fetemi</div>
        <nav className="steps-nav">
          <div className={`step ${currentScreen === 1 ? 'active' : currentScreen > 1 ? 'completed' : ''}`}>
            <span>1</span> Input
          </div>
          <div className={`step-connector ${currentScreen >= 2 ? 'active' : ''}`}></div>
          <div className={`step ${currentScreen === 2 ? 'active' : currentScreen > 2 ? 'completed' : ''}`}>
            <span>2</span> Review Drafts
          </div>
          <div className={`step-connector ${currentScreen >= 3 ? 'active' : ''}`}></div>
          <div className={`step ${currentScreen === 3 ? 'active' : ''}`}>
            <span>3</span> Publish
          </div>
        </nav>
      </header>

      <main className="app-main">
        {currentScreen === 1 && <ContentInput onNext={(data) => { 
          let parsedDrafts: any[] = [];
          if (Array.isArray(data)) {
            parsedDrafts = data;
          } else if (data && typeof data === 'object') {
            if (data.drafts && Array.isArray(data.drafts)) {
              parsedDrafts = data.drafts;
            } else if (data.draft_1_title) {
              const count = data.valid_draft_count || 3;
              for (let i = 1; i <= count; i++) {
                if (data[`draft_${i}_title`]) {
                  parsedDrafts.push({
                    id: `d${i}`,
                    title: data[`draft_${i}_title`],
                    angle: data[`draft_${i}_angle`],
                    excerpt: data[`draft_${i}_body`],
                    body: data[`draft_${i}_body`]
                  });
                }
              }
            } else {
              parsedDrafts = [data];
            }
          }
          setDrafts(parsedDrafts); 
          setCurrentScreen(2); 
        }} />}
        {currentScreen === 2 && <DraftReview drafts={drafts} onNext={() => setCurrentScreen(3)} />}
        {currentScreen === 3 && <ReviewPublish onBack={() => setCurrentScreen(2)} />}
      </main>
    </div>
  );
}

export default App;
