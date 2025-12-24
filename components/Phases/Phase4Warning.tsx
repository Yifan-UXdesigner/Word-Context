import React, { useState, useEffect } from 'react';
import { InteractiveElementProps } from '../../types';
import { X, AlertTriangle } from 'lucide-react';

interface Popup {
  id: number;
  x: number;
  y: number;
  title: string;
  content: string;
}

const TITLES = ["CONGRATULATIONS!", "VIRUS DETECTED", "HOT DEALS", "FREE MONEY", "CLICK HERE"];
const CONTENTS = ["You have won 1,000,000!", "System 32 Error", "Buy now, save later!", "Claim your prize...", "Local singles in area"];

export const Phase4Warning: React.FC<InteractiveElementProps> = ({ scrollProgress }) => {
  const [popups, setPopups] = useState<Popup[]>([]);
  
  // Initial spawn based on scroll
  useEffect(() => {
    if (scrollProgress > 0.1 && popups.length === 0) {
      setPopups([
        { id: 1, x: 50, y: 50, title: "CRITICAL ERROR", content: "Too much SPAM." },
        { id: 2, x: 30, y: 30, title: "WINNER", content: "Click to claim." }
      ]);
    }
    
    // As scroll deepens, add more indiscriminately
    if (scrollProgress > 0.5 && popups.length < 5) {
        const newId = Date.now() + Math.random();
        setPopups(prev => [...prev, {
            id: newId,
            x: Math.random() * 60 + 20,
            y: Math.random() * 60 + 20,
            title: TITLES[Math.floor(Math.random() * TITLES.length)],
            content: CONTENTS[Math.floor(Math.random() * CONTENTS.length)]
        }]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollProgress]);

  const closePopup = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    // 2000s behavior: closing one opens two
    const newId1 = Date.now();
    const newId2 = Date.now() + 1;
    
    setPopups(prev => {
        const filtered = prev.filter(p => p.id !== id);
        if (filtered.length > 15) return filtered; // Cap it
        return [
            ...filtered,
            {
                id: newId1,
                x: Math.random() * 70 + 10,
                y: Math.random() * 70 + 10,
                title: TITLES[Math.floor(Math.random() * TITLES.length)],
                content: CONTENTS[Math.floor(Math.random() * CONTENTS.length)]
            },
            {
                id: newId2,
                x: Math.random() * 70 + 10,
                y: Math.random() * 70 + 10,
                title: TITLES[Math.floor(Math.random() * TITLES.length)],
                content: CONTENTS[Math.floor(Math.random() * CONTENTS.length)]
            }
        ];
    });
  };

  return (
    <div className="relative w-full h-full bg-blue-600 overflow-hidden border-4 border-neutral-300 shadow-2xl">
      {/* XP Style Taskbar placeholder at bottom */}
      <div className="absolute bottom-0 w-full h-8 bg-blue-800 border-t-2 border-blue-400 z-0"></div>

      {popups.map((p) => (
        <div
          key={p.id}
          className="absolute w-64 bg-neutral-200 border-2 border-blue-700 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] flex flex-col z-10 hover:z-50 hover:scale-105 transition-transform duration-75"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            transform: 'translate(-50%, -50%)'
          }}
        >
          {/* Title Bar */}
          <div className="bg-gradient-to-r from-blue-700 to-blue-500 p-1 flex justify-between items-center cursor-move">
            <span className="text-white font-bold text-xs font-sans tracking-wide ml-1">{p.title}</span>
            <button 
                onClick={(e) => closePopup(p.id, e)}
                className="bg-red-500 hover:bg-red-600 text-white w-5 h-5 flex items-center justify-center border border-white rounded-sm shadow-sm"
            >
                <X size={12} strokeWidth={4} />
            </button>
          </div>
          {/* Content */}
          <div className="p-4 flex flex-col items-center justify-center bg-white h-24">
             <AlertTriangle className="text-yellow-500 mb-2 w-6 h-6" />
             <p className="text-black font-sans text-xs text-center">{p.content}</p>
             <button className="mt-2 px-3 py-1 bg-neutral-200 border border-black shadow-sm text-black text-xs hover:bg-neutral-300 active:translate-y-px">
                 OK
             </button>
          </div>
        </div>
      ))}
    </div>
  );
};