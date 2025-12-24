
import React from 'react';
import { InteractiveElementProps } from '../../types';
import { INTERACTIVE_TEXT } from '../../constants';

export const Phase2Repetition: React.FC<InteractiveElementProps> = ({ scrollProgress, language }) => {
  const interactive = INTERACTIVE_TEXT[language];

  // Generate a grid of SPAMs
  const spams = Array.from({ length: 40 }).map((_, i) => ({
    id: i,
    rotation: Math.random() * 20 - 10,
    size: Math.random() * 2 + 1,
    x: Math.random() * 100,
    y: Math.random() * 100,
  }));

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* TV Scanline Overlay for this specific phase */}
      <div className="absolute inset-0 bg-green-900 opacity-10 pointer-events-none z-0"></div>
      
      {spams.map((spam) => {
        // Calculate dynamic movement based on scroll
        const yOffset = (scrollProgress * 100) * (spam.id % 2 === 0 ? 1 : -1);
        const opacity = Math.min(1, Math.max(0, scrollProgress * 2.5 - (spam.id / 50)));

        return (
          <div
            key={spam.id}
            className="absolute font-digital font-bold text-green-500 hover:text-green-300 hover:scale-125 hover:z-50 transition-all duration-100 cursor-crosshair select-none mix-blend-screen"
            style={{
              left: `${spam.x}%`,
              top: `${spam.y}%`,
              transform: `rotate(${spam.rotation}deg) translateY(${yOffset}px)`,
              fontSize: `${spam.size}rem`,
              opacity: opacity,
              textShadow: '2px 2px 0px rgba(0,0,0,0.5)'
            }}
          >
            {interactive.floatingWord}
          </div>
        );
      })}
      
      {/* Center anchor text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <h1 
          className="text-9xl font-black text-transparent stroke-white stroke-2 opacity-20"
          style={{ WebkitTextStroke: '2px rgba(100, 255, 100, 0.3)' }}
        >
          {interactive.floatingWord}
        </h1>
      </div>
    </div>
  );
};
