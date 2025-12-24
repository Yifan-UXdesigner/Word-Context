import React, { useState, useEffect, useRef } from 'react';
import { PHASES } from './constants';
import { PhaseId } from './types';
import { Typewriter } from './components/Typewriter';
import { Phase1Food } from './components/Phases/Phase1Food';
import { Phase2Repetition } from './components/Phases/Phase2Repetition';
import { Phase3Accumulation } from './components/Phases/Phase3Accumulation';
import { Phase4Warning } from './components/Phases/Phase4Warning';
import { Phase5Noise } from './components/Phases/Phase5Noise';
import { SummaryPage } from './components/Summary/SummaryPage';

const App: React.FC = () => {
  const [currentPhaseId, setCurrentPhaseId] = useState<PhaseId>(PhaseId.Food);
  const [scrollProgress, setScrollProgress] = useState(0); // 0 to 1 for current phase
  const containerRef = useRef<HTMLDivElement>(null);
  const phaseRefs = useRef<(HTMLElement | null)[]>([]);

  // Handle Scroll to update Phase
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Calculate active phase based on viewport position
      let activePhase = PhaseId.Food;
      let progress = 0;

      phaseRefs.current.forEach((ref, index) => {
        if (!ref) return;
        const rect = ref.getBoundingClientRect();
        
        // If element is overlapping with the center of the screen
        if (rect.top <= windowHeight / 2 && rect.bottom >= windowHeight / 2) {
            activePhase = index;
            
            // Calculate progress within this section (0 = start, 1 = end)
            const totalHeight = rect.height;
            const scrolledWithin = (windowHeight / 2) - rect.top;
            progress = Math.max(0, Math.min(1, scrolledWithin / (totalHeight * 0.8))); // * 0.8 to complete effect before exit
        }
      });

      setCurrentPhaseId(activePhase);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Reset after animation
    setTimeout(() => setCurrentPhaseId(PhaseId.Food), 500);
  };

  const currentPhaseData = PHASES[currentPhaseId] || PHASES[0];

  // Map phase ID to background style
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
      {/* Global Grain & CRT Effects */}
      <div className="noise-bg mix-blend-overlay"></div>
      <div className="crt-lines opacity-20"></div>

      {/* Sticky Header */}
      <header className={`fixed top-0 left-0 w-full z-50 p-6 flex justify-between items-start transition-transform duration-500 ${currentPhaseId === PhaseId.Summary ? '-translate-y-full' : 'translate-y-0'}`}>
        <div>
            <h1 className="text-4xl md:text-6xl font-mono font-black tracking-tighter text-vintage-cream drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                SPAM
            </h1>
            <h2 className="text-xs md:text-sm font-mono uppercase tracking-widest opacity-70 mt-1">
                The Evolution of SPAM
            </h2>
        </div>
        <div className="text-right">
            <div className={`font-digital text-2xl md:text-4xl font-bold transition-colors duration-500 ${currentPhaseData.colorTheme}`}>
                 <Typewriter text={currentPhaseData.year} speed={50} />
            </div>
            <div className="text-xs md:text-sm font-mono mt-1 max-w-[200px] leading-tight opacity-90 hidden md:block">
                 <Typewriter text={currentPhaseData.title} speed={20} startDelay={500} />
            </div>
        </div>
      </header>

      {/* Sticky Scroll Indicator (Left) */}
      <div className={`fixed left-4 top-1/2 transform -translate-y-1/2 h-64 w-1 bg-neutral-800 z-40 rounded hidden md:block transition-opacity duration-300 ${currentPhaseId === PhaseId.Summary ? 'opacity-0' : 'opacity-100'}`}>
        <div 
            className="absolute top-0 left-0 w-full bg-vintage-cream transition-all duration-300 ease-out shadow-[0_0_10px_rgba(255,255,255,0.5)]"
            style={{ 
                height: '20%', 
                top: `${(currentPhaseId / 5) * 80}%` // Simple mapping
            }}
        ></div>
      </div>

      {/* Scrollable Container */}
      <div ref={containerRef} className="relative z-10">
        
        {/* Render Phases 1-5 */}
        {PHASES.slice(0, 5).map((phase, index) => (
          <section 
            key={phase.id}
            ref={(el) => (phaseRefs.current[index] = el)}
            className="relative min-h-[150vh] w-full flex items-center justify-center border-b border-white/5"
          >
            {/* Phase Content Container */}
            <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center p-8 md:p-20 overflow-hidden">
                
                {/* Text Description Block (Absolute Top) */}
                <div className="absolute top-32 left-0 w-full text-center px-4 md:px-0 z-20 pointer-events-none">
                     <p className={`font-mono text-sm md:text-lg max-w-2xl mx-auto bg-black/50 p-2 backdrop-blur-sm rounded ${currentPhaseId === index ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}>
                        {phase.description}
                     </p>
                </div>

                {/* Interactive Stage */}
                <div className="w-full max-w-4xl h-[60vh] relative mt-16">
                    {index === 0 && <Phase1Food isActive={currentPhaseId === 0} scrollProgress={scrollProgress} />}
                    {index === 1 && <Phase2Repetition isActive={currentPhaseId === 1} scrollProgress={scrollProgress} />}
                    {index === 2 && <Phase3Accumulation isActive={currentPhaseId === 2} scrollProgress={scrollProgress} />}
                    {index === 3 && <Phase4Warning isActive={currentPhaseId === 3} scrollProgress={scrollProgress} />}
                    {index === 4 && <Phase5Noise isActive={currentPhaseId === 4} scrollProgress={scrollProgress} />}
                </div>

            </div>
          </section>
        ))}

        {/* Summary Page */}
        <section 
            ref={(el) => (phaseRefs.current[5] = el)}
            className="min-h-screen w-full relative z-30"
        >
            <SummaryPage onRestart={scrollToTop} />
        </section>

      </div>
    </div>
  );
};

export default App;