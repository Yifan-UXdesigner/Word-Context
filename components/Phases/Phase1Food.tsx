
import React, { useState } from 'react';
import { InteractiveElementProps } from '../../types';
import { UI_TEXT, INTERACTIVE_TEXT } from '../../constants';

interface Phase1FoodProps extends InteractiveElementProps {
  onTransitionNext?: () => void;
}

export const Phase1Food: React.FC<Phase1FoodProps> = ({ isActive, language, onTransitionNext }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ui = UI_TEXT[language];
  const interactive = INTERACTIVE_TEXT[language];

  // Adjust font size for longer localized strings if needed
  const labelFontSize = language === 'EN' ? 'text-7xl' : 'text-5xl';

  const handleClick = () => {
    if (!isOpen) {
        setIsOpen(true);
        // Delay the transition slightly to allow user to see the result
        if (onTransitionNext) {
            setTimeout(() => {
                onTransitionNext();
            }, 1200);
        }
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center h-full transition-opacity duration-1000 ${isActive ? 'opacity-100' : 'opacity-30 blur-sm'}`}>
      
      {/* Container for the 3D-ish Can */}
      <div 
        onClick={handleClick}
        className={`relative w-64 h-80 cursor-pointer group transition-all duration-300 ${isOpen ? 'scale-105' : 'hover:scale-105 hover:rotate-1'}`}
      >
        
        {/* Can Main Body (Cylinder) */}
        <div className="absolute inset-x-0 bottom-0 top-4 rounded-b-2xl bg-gradient-to-r from-blue-900 via-blue-700 to-blue-900 border-x-2 border-b-2 border-blue-950 shadow-2xl overflow-hidden flex flex-col items-center pt-10 z-20">
           
           {/* Metallic Highlight */}
           <div className="absolute left-4 top-0 bottom-0 w-8 bg-white opacity-10 blur-md pointer-events-none"></div>
           
           {/* Label Content */}
           <div className="z-10 flex flex-col items-center transform transition-transform duration-300">
               <h2 className={`${labelFontSize} font-black text-spam-yellow tracking-tighter drop-shadow-lg transform -rotate-3 group-hover:rotate-0 transition-transform duration-500 mt-2`} style={{ textShadow: '4px 4px 0px rgba(0,0,0,0.5)' }}>
                 {interactive.canLabel}
               </h2>
               <p className="mt-4 text-[10px] font-mono text-white text-center px-6 leading-tight opacity-90">
                 HORMEL FOODS CORPORATION<br/>
                 AUSTIN, MINN. U.S.A.
               </p>
               <div className="mt-12 text-spam-yellow text-4xl font-bold opacity-80 border-t border-b border-spam-yellow/50 py-2">
                 NET WT 12 OZ
               </div>
           </div>
        </div>

        {/* Meat Block (Revealed beneath lid) */}
        <div className={`absolute inset-x-3 top-16 bottom-2 bg-pink-400 rounded-xl z-10 transition-all duration-1000 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${isOpen ? 'translate-y-[-40px] opacity-100' : 'translate-y-0 opacity-0'}`}>
            {/* Meat Texture */}
            <div className="w-full h-full opacity-40 bg-[url('https://www.transparenttextures.com/patterns/noise-lines.png')] mix-blend-multiply rounded-xl"></div>
            
            {/* Gelatinous Wobble Animation Container */}
            <div className={`${isOpen ? 'animate-[bounce_2s_infinite]' : ''}`}>
                 <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-pink-800 font-bold opacity-30 rotate-45 text-4xl mix-blend-color-burn">
                    MEAT?
                 </div>
                 {/* Shiny gelatin highlight */}
                 <div className="absolute top-4 right-4 w-4 h-12 bg-white opacity-40 rounded-full blur-sm"></div>
            </div>
        </div>

        {/* Can Lid (Peels back) */}
        <div 
          className={`absolute top-0 left-0 right-0 h-16 bg-gradient-to-r from-neutral-300 via-neutral-100 to-neutral-400 border-2 border-neutral-600 rounded-t-lg z-30 origin-top-left transition-all duration-700 ease-[cubic-bezier(0.68,-0.55,0.27,1.55)] shadow-lg
          ${isOpen ? 'rotate-[110deg] translate-x-8 -translate-y-4 shadow-2xl grayscale' : ''}`}
        >
          {/* Rim Detail */}
          <div className="absolute bottom-0 w-full h-2 bg-neutral-500/30 border-t border-neutral-400"></div>
          
          {/* Key / Pull Tab Area */}
          <div className={`absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full border-2 border-neutral-500 shadow-inner flex items-center justify-center ${isOpen ? 'opacity-0' : 'opacity-100'}`}>
             <div className="w-full h-1 bg-neutral-400 rotate-45"></div>
          </div>
        </div>
      
        {/* Squelch Text Effect */}
        <div className={`absolute -top-12 -right-12 font-comic font-bold text-pink-500 text-2xl transform rotate-12 transition-all duration-500 ${isOpen ? 'opacity-100 scale-125' : 'opacity-0 scale-50'}`}>
            *SQUELCH*
        </div>
      </div>
      
      <p className="mt-12 text-neutral-400 font-mono text-sm animate-pulse tracking-widest">
        {isOpen ? ui.productRevealed : ui.clickToOpen}
      </p>
    </div>
  );
};
