
import React, { useState, useEffect } from 'react';
import { InteractiveElementProps } from '../../types';
import { Mail, AlertTriangle, FileText, Binary } from 'lucide-react';

interface FloatingItem {
    id: number;
    type: number; // 0: mail, 1: alert, 2: file, 3: binary noise
    left: number;
    top: number;
    speedX: number;
    speedY: number;
    text?: string;
}

export const Phase3Accumulation: React.FC<InteractiveElementProps> = ({ scrollProgress, isActive }) => {
  const [items, setItems] = useState<FloatingItem[]>([]);

  // Initial Spawn
  useEffect(() => {
    const initialItems = Array.from({ length: 15 }).map((_, i) => ({
        id: i,
        type: i % 3,
        left: Math.random() * 80 + 10,
        top: Math.random() * 80 + 10,
        speedX: (Math.random() - 0.5) * 0.2,
        speedY: (Math.random() - 0.5) * 0.2,
    }));
    setItems(initialItems);
  }, []);

  // Animation Loop for Floating
  useEffect(() => {
    if (!isActive) return;
    
    const interval = setInterval(() => {
        setItems(prev => prev.map(item => {
            let newLeft = item.left + item.speedX;
            let newTop = item.top + item.speedY;

            // Bounce off walls
            if (newLeft <= 0 || newLeft >= 90) newLeft = item.left - item.speedX;
            if (newTop <= 0 || newTop >= 90) newTop = item.top - item.speedY;

            return { ...item, left: newLeft, top: newTop };
        }));
    }, 50);

    return () => clearInterval(interval);
  }, [isActive]);

  const handleItemClick = (id: number) => {
    setItems(prev => {
        const target = prev.find(i => i.id === id);
        if (!target) return prev;

        // Remove clicked item
        const filtered = prev.filter(i => i.id !== id);

        // Spawn 2 binary noise items
        const noise1 = {
            id: Date.now(),
            type: 3,
            left: target.left,
            top: target.top,
            speedX: (Math.random() - 0.5) * 0.5,
            speedY: (Math.random() - 0.5) * 0.5,
            text: Math.random().toString(2).substring(2, 8)
        };
        const noise2 = {
            id: Date.now() + 1,
            type: 3,
            left: target.left + 5,
            top: target.top + 5,
            speedX: (Math.random() - 0.5) * 0.5,
            speedY: (Math.random() - 0.5) * 0.5,
            text: Math.random().toString(2).substring(2, 8)
        };

        return [...filtered, noise1, noise2];
    });
  };

  return (
    <div className="relative w-full h-full bg-win-teal p-4 border-2 border-white shadow-inner overflow-hidden cursor-progress">
      {/* Windows 95 Background Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')]"></div>

      {items.map((item) => (
          <div
            key={item.id}
            onClick={() => handleItemClick(item.id)}
            className="absolute transition-transform duration-75 hover:scale-110 cursor-pointer"
            style={{ 
              left: `${item.left}%`, 
              top: `${item.top}%`,
            }}
          >
            {item.type === 3 ? (
                <div className="font-digital text-green-400 text-lg font-bold animate-pulse shadow-sm bg-black/50 px-1">
                    {item.text}
                </div>
            ) : (
                <div className="flex flex-col items-center group">
                    <div className="w-12 h-12 flex items-center justify-center mb-1">
                        {item.type === 0 && <Mail size={40} className="text-yellow-400 drop-shadow-md group-hover:text-white" />}
                        {item.type === 1 && <AlertTriangle size={40} className="text-red-500 drop-shadow-md group-hover:text-red-300" />}
                        {item.type === 2 && <FileText size={40} className="text-white drop-shadow-md group-hover:text-blue-200" />}
                    </div>
                    <span className="text-xs font-mono text-black bg-white px-1 shadow-sm group-hover:invert border border-dotted border-transparent group-hover:border-black">
                    {item.type === 0 ? 'RE: Offer' : item.type === 1 ? 'WINNER!' : 'log.txt'}
                    </span>
                </div>
            )}
          </div>
      ))}
      
      {/* Overlay Text */}
      <div className="absolute bottom-4 right-4 font-digital text-green-900 opacity-50 text-xl pointer-events-none">
         NOISE_LEVEL: {items.filter(i => i.type === 3).length * 7}%
      </div>
    </div>
  );
};
