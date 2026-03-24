import { useState } from 'react';
import ContentInput from './screens/ContentInput';
import DraftReview from './screens/DraftReview';
import ReviewPublish from './screens/ReviewPublish';

function App() {
  const [currentScreen, setCurrentScreen] = useState(1);

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
        {currentScreen === 1 && <ContentInput onNext={() => setCurrentScreen(2)} />}
        {currentScreen === 2 && <DraftReview onNext={() => setCurrentScreen(3)} />}
        {currentScreen === 3 && <ReviewPublish onBack={() => setCurrentScreen(2)} />}
      </main>
    </div>
  );
}

export default App;
