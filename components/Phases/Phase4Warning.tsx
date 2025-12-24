
import React, { useState, useEffect } from 'react';
import { InteractiveElementProps } from '../../types';
import { UI_TEXT, INTERACTIVE_TEXT } from '../../constants';
import { X, AlertTriangle, Info, HelpCircle, AlertOctagon, Trophy } from 'lucide-react';

interface Popup {
  id: number;
  x: number;
  y: number;
  title: string;
  content: string;
  variant: 'blue' | 'red' | 'gray';
  iconType: 'alert' | 'info' | 'error' | 'trophy';
}

export const Phase4Warning: React.FC<InteractiveElementProps> = ({ scrollProgress, language }) => {
  const [popups, setPopups] = useState<Popup[]>([]);
  const ui = UI_TEXT[language];
  const interactive = INTERACTIVE_TEXT[language];
  
  // Initial spawn based on scroll
  useEffect(() => {
    if (scrollProgress > 0.1 && popups.length === 0) {
      setPopups([
        { id: 1, x: 50, y: 50, title: "CRITICAL ERROR", content: ui.criticalError, variant: 'red', iconType: 'error' },
        { id: 2, x: 30, y: 30, title: "WINNER", content: ui.clickToClaim, variant: 'blue', iconType: 'trophy' }
      ]);
    }
    
    // As scroll deepens, add more indiscriminately
    if (scrollProgress > 0.5 && popups.length < 4) {
        spawnPopup(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollProgress]);

  const createRandomPopup = (idOffset: number): Popup => {
    const template = interactive.popups[Math.floor(Math.random() * interactive.popups.length)];
    const variants: ('blue' | 'red' | 'gray')[] = ['blue', 'red', 'gray'];
    const icons: ('alert' | 'info' | 'error' | 'trophy')[] = ['alert', 'info', 'error', 'trophy'];

    return {
        id: Date.now() + Math.random() + idOffset,
        x: Math.random() * 80 + 10,
        y: Math.random() * 60 + 20,
        title: template.title,
        content: template.content,
        variant: variants[Math.floor(Math.random() * variants.length)],
        iconType: icons[Math.floor(Math.random() * icons.length)],
    };
  };

  const spawnPopup = (count: number = 1) => {
    setPopups(prev => {
        if (prev.length > 25) return prev; // Cap limit
        const newPopups = Array.from({length: count}).map((_, i) => createRandomPopup(i));
        return [...prev, ...newPopups];
    });
  };

  const handleAction = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    // HYDRA EFFECT: Removing one adds two more
    setPopups(prev => {
        const remaining = prev.filter(p => p.id !== id);
        if (prev.length > 15) return remaining; // Soft cap on hydra multiplication
        return [...remaining, createRandomPopup(0), createRandomPopup(1)];
    });
  };

  const getHeaderClass = (variant: string) => {
    switch (variant) {
        case 'red': return 'from-red-700 to-red-500';
        case 'gray': return 'from-neutral-500 to-neutral-400';
        default: return 'from-blue-700 to-blue-500';
    }
  };

  const renderIcon = (type: string) => {
    switch(type) {
        case 'error': return <AlertOctagon className="text-red-600 w-8 h-8 mb-2" />;
        case 'info': return <Info className="text-blue-600 w-8 h-8 mb-2" />;
        case 'trophy': return <Trophy className="text-yellow-600 w-8 h-8 mb-2" />;
        default: return <AlertTriangle className="text-yellow-500 w-8 h-8 mb-2" />;
    }
  };

  return (
    <div className="relative w-full h-full bg-blue-600 overflow-hidden border-4 border-neutral-300 shadow-2xl">
      {/* XP Style Taskbar placeholder at bottom */}
      <div className="absolute bottom-0 w-full h-8 bg-blue-800 border-t-2 border-blue-400 z-0"></div>

      {popups.map((p) => (
        <div
          key={p.id}
          className="absolute w-64 bg-neutral-200 border-2 border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] flex flex-col z-10 hover:z-50 hover:scale-105 transition-transform duration-75"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            transform: 'translate(-50%, -50%)',
            outline: '1px solid #999'
          }}
        >
          {/* Title Bar */}
          <div className={`bg-gradient-to-r ${getHeaderClass(p.variant)} p-1 flex justify-between items-center cursor-move`}>
            <span className="text-white font-bold text-xs font-sans tracking-wide ml-1 truncate max-w-[180px] drop-shadow-sm">{p.title}</span>
            <button 
                onClick={(e) => handleAction(p.id, e)}
                className="bg-red-500 hover:bg-red-600 text-white w-5 h-5 flex items-center justify-center border border-white rounded-sm shadow-sm"
            >
                <X size={12} strokeWidth={4} />
            </button>
          </div>
          {/* Content */}
          <div className="p-4 flex flex-col items-center justify-center bg-white h-28 border-t border-white">
             {renderIcon(p.iconType)}
             <p className="text-black font-sans text-xs text-center leading-tight mb-3 px-2">{p.content}</p>
             <button 
                onClick={(e) => handleAction(p.id, e)}
                className="px-4 py-1 bg-neutral-200 border border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] text-black text-xs hover:bg-neutral-300 active:translate-y-px active:shadow-none"
             >
                 {ui.ok}
             </button>
          </div>
        </div>
      ))}
    </div>
  );
};
