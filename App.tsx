
import React, { useState } from 'react';
import { ViewState, Language } from './types';
import { HomePage } from './components/HomePage';
import { SpamExperience } from './components/SpamExperience';
import { VirusExperience } from './components/VirusExperience';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('HOME');
  const [language, setLanguage] = useState<Language>('JP');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleWordSelection = (word: string) => {
    // Check against SPAM in all languages
    if (['SPAM', '垃圾邮件', '午餐肉', 'スパム'].includes(word)) {
      setIsTransitioning(true);
      setTimeout(() => {
        setView('SPAM');
        setIsTransitioning(false);
      }, 800);
    } 
    // Check against VIRUS in all languages
    else if (['VIRUS', '病毒', 'ウイルス'].includes(word)) {
      setIsTransitioning(true);
      setTimeout(() => {
        setView('VIRUS');
        setIsTransitioning(false);
      }, 800);
    }
  };

  const handleBackToHome = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setView('HOME');
      setIsTransitioning(false);
    }, 500);
  };

  return (
    <div className="relative min-h-screen w-full bg-neutral-900 text-vintage-cream overflow-x-hidden">
      {/* Global Grain & CRT Effects persist across views */}
      <div className="noise-bg mix-blend-overlay"></div>
      <div className="crt-lines opacity-20"></div>

      {/* Main Content Area with Transition Effect */}
      <main className={`transition-all duration-700 ease-in-out ${isTransitioning ? 'opacity-0 scale-150 blur-sm' : 'opacity-100 transform-none blur-0'}`}>
        {view === 'HOME' && (
          <HomePage 
            onSelectWord={handleWordSelection} 
            language={language} 
            setLanguage={setLanguage} 
          />
        )}
        {view === 'SPAM' && (
          <SpamExperience 
            onBackToHome={handleBackToHome} 
            language={language}
          />
        )}
        {view === 'VIRUS' && (
          <VirusExperience 
            onBackToHome={handleBackToHome} 
            language={language}
          />
        )}
      </main>

    </div>
  );
};

export default App;