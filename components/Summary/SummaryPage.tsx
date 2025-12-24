
import React from 'react';
import { RotateCcw } from 'lucide-react';
import { getPhases, UI_TEXT } from '../../constants';
import { Language } from '../../types';

interface SummaryPageProps {
  onRestart: () => void;
  language: Language;
}

export const SummaryPage: React.FC<SummaryPageProps> = ({ onRestart, language }) => {
  const phases = getPhases(language);
  const ui = UI_TEXT[language];

  // Adjust title based on language for better layout
  const mainTitle = language === 'EN' ? "SPAM: The Evolution" : language === 'JP' ? "SPAM: その進化" : "SPAM: 演变史";

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-8 bg-neutral-900 text-vintage-cream relative z-20">
      
      <div className="max-w-4xl w-full border-4 border-double border-vintage-cream p-8 md:p-12 bg-neutral-900 shadow-[0_0_50px_rgba(255,255,255,0.1)]">
        <h1 className="text-4xl md:text-6xl font-mono font-bold mb-4 text-center tracking-tighter">
          {mainTitle}
        </h1>
        
        <p className="text-center font-mono text-lg md:text-xl mb-12 opacity-80 border-b border-dashed border-vintage-cream pb-8">
          {phases[0].description.split('SPAM')[0]} SPAM...
        </p>

        <div className="space-y-8 relative">
          {/* Vertical Line */}
          <div className="absolute left-4 top-4 bottom-4 w-1 bg-neutral-700 md:left-1/2 md:-ml-0.5"></div>

          {phases.slice(0, 5).map((phase, index) => (
            <div key={phase.id} className={`flex items-center gap-6 relative ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
              
              {/* Dot */}
              <div className="absolute left-4 w-4 h-4 rounded-full bg-vintage-cream md:left-1/2 md:-ml-2 z-10 border-2 border-neutral-900"></div>

              {/* Content Card */}
              <div className="ml-12 md:ml-0 md:w-1/2 p-4 border border-neutral-700 bg-neutral-800/50 hover:bg-neutral-800 transition-colors">
                <span className={`font-digital text-xl font-bold block mb-1 ${phase.colorTheme}`}>
                    {phase.year}
                </span>
                <h3 className="font-mono text-lg font-bold uppercase mb-2">{phase.title.split(':')[1] || phase.title}</h3>
                <p className="font-mono text-xs opacity-60 leading-relaxed">{phase.description}</p>
              </div>
              
              {/* Spacer for alternating layout */}
              <div className="hidden md:block md:w-1/2"></div>
            </div>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
            <button 
                onClick={onRestart}
                className="group flex items-center gap-3 px-8 py-3 bg-vintage-cream text-black font-mono font-bold uppercase tracking-widest hover:bg-white hover:shadow-[0_0_15px_rgba(255,255,255,0.5)] transition-all duration-300"
            >
                <RotateCcw className="group-hover:-rotate-180 transition-transform duration-500" />
                {ui.returnHome}
            </button>
        </div>
      </div>
    </div>
  );
};
