
import React, { useState, useEffect, useRef } from 'react';
import { getPhases, UI_TEXT } from '../constants';
import { PhaseId, Language } from '../types';
import { Typewriter } from './Typewriter';
import { Phase1Food } from './Phases/Phase1Food';
import { Phase2Repetition } from './Phases/Phase2Repetition';
import { Phase3Accumulation } from './Phases/Phase3Accumulation';
import { Phase4Warning } from './Phases/Phase4Warning';
import { Phase5Noise } from './Phases/Phase5Noise';
import { SummaryPage } from './Summary/SummaryPage';
import { ChevronDown } from 'lucide-react';

interface SpamExperienceProps {
  onBackToHome: () => void;
  language: Language;
}

export const SpamExperience: React.FC<SpamExperienceProps> = ({ onBackToHome, language }) => {
  const [currentPhaseId, setCurrentPhaseId] = useState<PhaseId>(PhaseId.Food);
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
      
      let activePhase = PhaseId.Food;
      let progress = 0;

      // Find which phase is currently most visible
      phaseRefs.current.forEach((ref, index) => {
        if (!ref) return;
        const rect = ref.getBoundingClientRect();
        const elementHeight = rect.height;
        
        // If element overlaps the vertical center of the screen
        if (rect.top <= windowHeight / 2 && rect.bottom >= windowHeight / 2) {
             activePhase = index;
             // Calculate internal progress based on how far we've scrolled past the top relative to screen center
             const scrolledWithin = (windowHeight / 2) - rect.top;
             // Normalize based on height (approximating visual journey 0 to 1)
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

  const handleScrollToPhase = (phaseIndex: number) => {
    if (phaseRefs.current[phaseIndex]) {
        phaseRefs.current[phaseIndex]?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const phases = getPhases(language);
  const currentPhaseData = phases[currentPhaseId] || phases[0];
  const ui = UI_TEXT[language];

  const getBgClass = (id: PhaseId) => {
    switch(id) {
        case PhaseId.Food: return 'bg-vintage-cream/10';
        case PhaseId.Repetition: return 'bg-green-900/20';
        case PhaseId.Accumulation: return 'bg-win-teal/30';
        case PhaseId.Warning: return 'bg-alert-red/10';
        case PhaseId.Noise: return 'bg-black';
        case PhaseId.Summary: return 'bg-neutral-900';
        default: return 'bg-neutral-900';
    }
  };

  return (
    <div className={`min-h-screen w-full transition-colors duration-1000 ${getBgClass(currentPhaseId)}`}>
      
      {/* Sticky Header */}
      <header 
        className="fixed top-0 left-0 w-full z-[100] px-6 py-4 flex justify-between items-start transition-transform duration-500 bg-neutral-900/90 backdrop-blur-md border-b border-white/10"
      >
        <div className="flex flex-col">
            <h1 className="text-4xl md:text-5xl font-mono font-black tracking-tighter text-vintage-cream drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                SPAM
            </h1>
            <h2 className="text-xs md:text-sm font-mono uppercase tracking-widest opacity-70 mt-1">
                {language === 'EN' ? 'The Evolution of SPAM' : language === 'JP' ? 'SPAMの進化' : 'SPAM 的演变'}
            </h2>
        </div>
        <div className="text-right flex flex-col items-end">
            <div className={`font-digital text-3xl md:text-5xl font-bold transition-colors duration-500 leading-none mb-1 ${currentPhaseData.colorTheme}`}>
                 {/* Key ensures text re-types or updates cleanly on phase change */}
                 <Typewriter key={`year-${currentPhaseId}-${language}`} text={currentPhaseData.year} speed={30} startDelay={0} />
            </div>
            <div className="text-xs md:text-sm font-mono text-vintage-cream max-w-[200px] md:max-w-[400px] leading-tight opacity-90">
                 <Typewriter key={`title-${currentPhaseId}-${language}`} text={currentPhaseData.title} speed={10} startDelay={100} />
            </div>
        </div>
      </header>

      {/* Bottom Scroll Prompt (Only visible in Phase 1 start) */}
      <div 
        className={`fixed bottom-8 left-0 w-full flex flex-col items-center justify-center z-50 pointer-events-none transition-opacity duration-700 ${currentPhaseId === PhaseId.Food && scrollProgress < 0.2 ? 'opacity-100' : 'opacity-0'}`}
      >
        <span className="font-mono text-sm tracking-widest text-vintage-cream animate-pulse mb-2 bg-black/50 px-3 py-1 rounded">
          {ui.scrollPrompt}
        </span>
        <ChevronDown className="animate-bounce text-vintage-cream w-6 h-6" />
      </div>

      {/* Scrollable Container */}
      <div ref={containerRef} className="relative z-10 pt-20">
        
        {/* Render Phases 1-5 */}
        {phases.slice(0, 5).map((phase, index) => (
          <section 
            key={phase.id}
            ref={(el) => { phaseRefs.current[index] = el; }}
            className="relative min-h-[150vh] w-full flex items-center justify-center border-b border-white/5"
          >
            {/* Phase Content Container */}
            <div className="sticky top-20 h-[calc(100vh-80px)] w-full flex flex-col items-center justify-center p-4 md:p-8 overflow-hidden">
                
                {/* Text Description Block */}
                <div className="absolute top-8 md:top-12 left-0 w-full text-center px-4 md:px-0 z-20 pointer-events-none">
                     <div className={`font-mono text-sm md:text-lg max-w-2xl mx-auto bg-black/80 p-6 backdrop-blur-md rounded border border-white/10 shadow-2xl ${currentPhaseId === index ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'} transition-all duration-700`}>
                        {currentPhaseId === index && (
                          <div className="flex flex-col gap-2">
                             <div className={`font-digital text-2xl md:text-3xl font-bold tracking-widest ${phase.colorTheme}`}>
                                <Typewriter text={`[ ${phase.year} ]`} speed={40} startDelay={200} />
                             </div>
                             <div className="leading-relaxed">
                                <Typewriter text={phase.description} speed={20} startDelay={900} />
                             </div>
                          </div>
                        )}
                     </div>
                </div>

                {/* Interactive Stage */}
                <div className="w-full max-w-5xl h-[60vh] relative mt-16 md:mt-0 flex items-center justify-center">
                    {index === 0 && (
                        <Phase1Food 
                            isActive={currentPhaseId === 0} 
                            scrollProgress={scrollProgress} 
                            language={language}
                            onTransitionNext={() => handleScrollToPhase(1)}
                        />
                    )}
                    {index === 1 && <Phase2Repetition isActive={currentPhaseId === 1} scrollProgress={scrollProgress} language={language} />}
                    {index === 2 && <Phase3Accumulation isActive={currentPhaseId === 2} scrollProgress={scrollProgress} language={language} />}
                    {index === 3 && <Phase4Warning isActive={currentPhaseId === 3} scrollProgress={scrollProgress} language={language} />}
                    {index === 4 && <Phase5Noise isActive={currentPhaseId === 4} scrollProgress={scrollProgress} language={language} />}
                </div>

            </div>
          </section>
        ))}

        {/* Summary Page */}
        <section 
            ref={(el) => { phaseRefs.current[5] = el; }}
            className="min-h-screen w-full relative z-30"
        >
            <SummaryPage onRestart={onBackToHome} language={language} />
        </section>

      </div>
    </div>
  );
};
