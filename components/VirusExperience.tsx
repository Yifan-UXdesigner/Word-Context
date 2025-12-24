
import React, { useState, useEffect, useRef } from 'react';
import { getVirusPhases } from '../constants';
import { VirusPhaseId, Language } from '../types';
import { Typewriter } from './Typewriter';
import { Phase1Bio } from './VirusPhases/Phase1Bio';
import { Phase2Computer } from './VirusPhases/Phase2Computer';
import { Phase3Security } from './VirusPhases/Phase3Security';
import { VirusSummary } from './VirusSummary';
import { ChevronDown } from 'lucide-react';

interface VirusExperienceProps {
  onBackToHome: () => void;
  language: Language;
}

export const VirusExperience: React.FC<VirusExperienceProps> = ({ onBackToHome, language }) => {
  const [currentPhaseId, setCurrentPhaseId] = useState<VirusPhaseId>(VirusPhaseId.Bio);
  const [scrollProgress, setScrollProgress] = useState(0); 
  const containerRef = useRef<HTMLDivElement>(null);
  const phaseRefs = useRef<(HTMLElement | null)[]>([]);

  // Reset scroll on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      
      let activePhase = VirusPhaseId.Bio;
      let progress = 0;

      phaseRefs.current.forEach((ref, index) => {
        if (!ref) return;
        const rect = ref.getBoundingClientRect();
        const elementHeight = rect.height;
        
        if (rect.top <= windowHeight / 2 && rect.bottom >= windowHeight / 2) {
             activePhase = index;
             const scrolledWithin = (windowHeight / 2) - rect.top;
             if (elementHeight > 0) {
                 progress = Math.max(0, Math.min(1, scrolledWithin / (elementHeight * 0.7)));
             }
        }
      });

      setCurrentPhaseId(activePhase);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const phases = getVirusPhases(language);
  const currentPhaseData = phases[currentPhaseId] || phases[0];

  const getBgClass = (id: VirusPhaseId) => {
    // Retro/Darker flat backgrounds instead of smooth gradients
    switch(id) {
        case VirusPhaseId.Bio: return 'bg-red-950/20';
        case VirusPhaseId.Computer: return 'bg-green-950/20';
        case VirusPhaseId.Security: return 'bg-blue-950/20';
        case VirusPhaseId.Summary: return 'bg-neutral-900';
        default: return 'bg-neutral-900';
    }
  };

  return (
    <div className={`min-h-screen w-full transition-all duration-1000 ${getBgClass(currentPhaseId)} font-mono text-white`}>
      
      {/* Sticky Header - Matched to SpamExperience */}
      <header 
        className="fixed top-0 left-0 w-full z-[100] px-6 py-4 flex justify-between items-start transition-colors duration-500 bg-neutral-900/90 backdrop-blur-md border-b border-white/10"
      >
        <div className="flex flex-col">
            <h1 className="text-4xl md:text-5xl font-mono font-black tracking-tighter text-white drop-shadow-[2px_2px_0px_rgba(255,0,0,0.5)]">
                VIRUS
            </h1>
            <div className="h-1 w-12 bg-red-600 mt-2"></div>
        </div>
        <div className="text-right flex flex-col items-end">
            <div className={`font-digital text-3xl md:text-5xl font-bold transition-colors duration-500 leading-none mb-1 ${currentPhaseData.colorTheme}`}>
                 <Typewriter key={`year-${currentPhaseId}`} text={currentPhaseData.year} speed={30} />
            </div>
            <div className="text-xs md:text-sm font-mono uppercase tracking-widest text-gray-400 max-w-[200px] md:max-w-[400px]">
                 <Typewriter key={`title-${currentPhaseId}`} text={currentPhaseData.title} speed={20} startDelay={100} />
            </div>
        </div>
      </header>

      {/* Initial Scroll Prompt */}
      <div 
        className={`fixed bottom-8 left-0 w-full flex flex-col items-center justify-center z-50 pointer-events-none transition-opacity duration-700 ${currentPhaseId === VirusPhaseId.Bio && scrollProgress < 0.2 ? 'opacity-100' : 'opacity-0'}`}
      >
        <span className="font-mono text-sm tracking-widest text-gray-400 mb-2 bg-black/50 px-3 py-1 rounded border border-white/10">SCROLL TO EVOLVE</span>
        <ChevronDown className="animate-bounce text-white w-6 h-6" />
      </div>

      <div ref={containerRef} className="relative z-10 pt-20">
        
        {phases.slice(0, 3).map((phase, index) => (
          <section 
            key={phase.id}
            ref={(el) => { phaseRefs.current[index] = el; }}
            className="relative min-h-[140vh] w-full flex items-center justify-center border-b border-white/5"
          >
            <div className="sticky top-20 h-[calc(100vh-80px)] w-full flex flex-col items-center justify-center p-4 overflow-hidden">
                
                {/* Description Overlay - Matched to SpamExperience */}
                <div className="absolute top-8 md:top-12 left-0 w-full text-center px-4 md:px-0 z-20 pointer-events-none">
                    <div className={`transition-all duration-700 font-mono text-sm md:text-lg max-w-2xl mx-auto ${currentPhaseId === index ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
                        <div className="bg-black/90 p-6 backdrop-blur-md rounded border border-white/20 shadow-[4px_4px_0px_rgba(0,0,0,0.5)]">
                            {currentPhaseId === index && (
                                <div className="flex flex-col gap-2">
                                     <div className={`font-digital text-2xl md:text-3xl font-bold tracking-widest ${phase.colorTheme}`}>
                                        <Typewriter text={`[ ${phase.year} ]`} speed={40} startDelay={200} />
                                     </div>
                                     <p className="text-gray-300 leading-relaxed">
                                        <Typewriter text={phase.description} speed={15} startDelay={300} />
                                     </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Stage */}
                <div className="w-full max-w-5xl h-[60vh] relative flex items-center justify-center mt-20">
                    {index === 0 && <Phase1Bio isActive={currentPhaseId === 0} scrollProgress={scrollProgress} language={language} />}
                    {index === 1 && <Phase2Computer isActive={currentPhaseId === 1} scrollProgress={scrollProgress} language={language} />}
                    {index === 2 && <Phase3Security isActive={currentPhaseId === 2} scrollProgress={scrollProgress} language={language} />}
                </div>

            </div>
          </section>
        ))}

        <section 
            ref={(el) => { phaseRefs.current[3] = el; }}
            className="min-h-screen w-full relative z-30"
        >
            <VirusSummary onRestart={onBackToHome} language={language} isActive={true} scrollProgress={0} />
        </section>

      </div>
    </div>
  );
};
