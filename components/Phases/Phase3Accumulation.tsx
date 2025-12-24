import React from 'react';
import { InteractiveElementProps } from '../../types';
import { Mail, AlertTriangle, FileText, MousePointer2 } from 'lucide-react';

export const Phase3Accumulation: React.FC<InteractiveElementProps> = ({ scrollProgress }) => {
  const items = Array.from({ length: 25 }).map((_, i) => ({
    id: i,
    type: i % 3, // 0: mail, 1: alert, 2: file
    left: `${(i * 33) % 90}%`,
    top: `${(i * 15) % 80}%`,
    delay: i * 0.05
  }));

  return (
    <div className="relative w-full h-full bg-win-teal p-4 border-2 border-white shadow-inner overflow-hidden">
      {/* Windows 95 Background Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')]"></div>

      {items.map((item) => {
        // Only show items based on scroll progress
        const isVisible = scrollProgress > item.delay;
        
        return (
          <div
            key={item.id}
            className={`absolute flex flex-col items-center p-2 w-20 transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ 
              left: item.left, 
              top: item.top,
              zIndex: item.id 
            }}
          >
            <div className="hover:bg-blue-800 hover:text-white p-1 rounded border border-transparent hover:border-dotted hover:border-white cursor-pointer group">
                <div className="w-12 h-12 flex items-center justify-center mb-1">
                    {item.type === 0 && <Mail size={40} className="text-yellow-400 drop-shadow-md group-hover:text-yellow-200" />}
                    {item.type === 1 && <AlertTriangle size={40} className="text-red-500 drop-shadow-md group-hover:text-red-300" />}
                    {item.type === 2 && <FileText size={40} className="text-white drop-shadow-md" />}
                </div>
                <span className="text-xs font-mono text-black bg-white px-1 shadow-sm group-hover:bg-transparent group-hover:text-white">
                  {item.type === 0 ? 'RE: Offer' : item.type === 1 ? 'WINNER!' : 'details.txt'}
                </span>
            </div>
          </div>
        );
      })}

      {/* Retro Mouse Cursor overlay just for decoration */}
      <MousePointer2 
        className="absolute text-black fill-white drop-shadow-lg transition-all duration-1000 ease-in-out"
        style={{
            left: `${scrollProgress * 80}%`,
            top: `${scrollProgress * 60}%`,
            transform: `rotate(-15deg)`
        }} 
      />
    </div>
  );
};