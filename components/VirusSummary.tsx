
import React from 'react';
import { InteractiveElementProps } from '../types';
import { getVirusPhases, UI_TEXT } from '../constants';
import { RotateCcw } from 'lucide-react';

interface VirusSummaryProps extends InteractiveElementProps {
    onRestart: () => void;
}

export const VirusSummary: React.FC<VirusSummaryProps> = ({ language, onRestart }) => {
  const phases = getVirusPhases(language);
  const summaryData = phases[3]; // Summary phase data
  const ui = UI_TEXT[language];

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-8 bg-neutral-900 text-vintage-cream relative z-20 font-mono">
      
      {/* Main Card with Double Border Effect */}
      <div className="max-w-4xl w-full border-4 border-double border-vintage-cream p-8 md:p-12 bg-neutral-900 shadow-[0_0_50px_rgba(255,0,0,0.15)] relative">
        
        {/* Retro Header */}
        <h1 className="text-4xl md:text-6xl font-mono font-bold mb-4 text-center tracking-tighter text-red-500 drop-shadow-[2px_2px_0px_rgba(100,0,0,0.5)]">
           VIRUS
        </h1>
        
        <p className="text-center font-mono text-lg md:text-xl mb-12 opacity-80 border-b border-dashed border-red-900/50 pb-8 text-neutral-300">
           {summaryData.description}
        </p>

        {/* Timeline List */}
        <div className="space-y-8 relative">
           {/* Vertical Center Line */}
           <div className="absolute left-4 top-4 bottom-4 w-1 bg-neutral-800 md:left-1/2 md:-ml-0.5"></div>

           {phases.slice(0, 3).map((phase, index) => (
              <div key={phase.id} className={`flex items-center gap-6 relative ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  
                  {/* Timeline Dot */}
                  <div className={`absolute left-4 w-4 h-4 rounded-full md:left-1/2 md:-ml-2 z-10 border-2 border-neutral-900 ${index === 0 ? 'bg-red-600' : index === 1 ? 'bg-tech-green' : 'bg-cyber-blue'}`}></div>
                  
                  {/* Content Card */}
                  <div className="ml-12 md:ml-0 md:w-1/2 p-4 border border-neutral-700 bg-neutral-800/50 hover:bg-neutral-800 transition-colors group">
                      <span className={`font-digital text-xl font-bold block mb-1 ${phase.colorTheme} group-hover:scale-105 transition-transform origin-left`}>
                        {phase.year}
                      </span>
                      <h3 className="font-mono text-lg font-bold uppercase mb-2 text-neutral-200">
                        {phase.title.split(': ')[1] || phase.title}
                      </h3>
                      <p className="font-mono text-xs opacity-60 leading-relaxed text-vintage-cream">
                        {phase.description}
                      </p>
                  </div>
                  
                  {/* Spacer for alternating layout */}
                  <div className="hidden md:block md:w-1/2"></div>
              </div>
           ))}
        </div>

        {/* Footer Action */}
        <div className="mt-16 flex justify-center">
            <button 
                onClick={onRestart}
                className="group flex items-center gap-3 px-8 py-3 bg-red-900/10 border border-red-500 text-red-500 font-mono font-bold uppercase tracking-widest hover:bg-red-600 hover:text-black hover:shadow-[0_0_20px_rgba(255,0,0,0.6)] transition-all duration-300"
            >
                <RotateCcw className="group-hover:-rotate-180 transition-transform duration-500" />
                {ui.returnHome}
            </button>
        </div>

      </div>
    </div>
  );
};
