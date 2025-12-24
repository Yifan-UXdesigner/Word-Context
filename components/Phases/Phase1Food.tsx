import React, { useState } from 'react';
import { InteractiveElementProps } from '../../types';

export const Phase1Food: React.FC<InteractiveElementProps> = ({ isActive }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`flex flex-col items-center justify-center h-full transition-opacity duration-1000 ${isActive ? 'opacity-100' : 'opacity-30 blur-sm'}`}>
      <div 
        onClick={() => setIsOpen(true)}
        className={`relative w-64 h-80 cursor-pointer group transition-transform duration-300 ${isOpen ? 'scale-105' : 'hover:scale-105 hover:rotate-1'}`}
      >
        {/* Can Body */}
        <div className="absolute inset-0 bg-spam-blue rounded-xl border-4 border-neutral-800 shadow-2xl overflow-hidden flex flex-col items-center pt-8 z-10">
           {/* Label Texture */}
           <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent pointer-events-none"></div>
           
           <h2 className="text-6xl font-black text-spam-yellow tracking-tighter drop-shadow-md transform -rotate-2 group-hover:rotate-0 transition-transform">SPAM</h2>
           <p className="mt-4 text-xs font-mono text-white text-center px-4">
             HORMEL FOODS CORPORATION<br/>
             AUSTIN, MINN. U.S.A.
           </p>
           <div className="mt-8 text-spam-yellow text-4xl font-bold opacity-80">NET WT<br/>12 OZ</div>
        </div>

        {/* Lid (Opens on click) */}
        <div 
          className={`absolute top-0 left-0 w-full h-12 bg-neutral-300 border-4 border-neutral-800 rounded-t-xl z-20 origin-top-left transition-all duration-700 ease-[cubic-bezier(0.68,-0.55,0.27,1.55)] ${isOpen ? 'rotate-[120deg] -translate-y-4 translate-x-4 shadow-xl' : ''}`}
        >
          <div className="w-full h-full bg-gradient-to-b from-neutral-200 to-neutral-400 opacity-50"></div>
          {/* Key */}
          <div className={`absolute -right-2 top-2 w-4 h-8 bg-neutral-400 border-2 border-neutral-800 rounded-sm ${isOpen ? 'opacity-0' : 'opacity-100'}`}></div>
        </div>

        {/* Meat (Revealed) */}
        <div className={`absolute inset-x-4 top-12 bottom-4 bg-pink-400 rounded-lg border-2 border-pink-600 z-0 transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
            <div className="w-full h-full opacity-30 bg-[url('https://www.transparenttextures.com/patterns/noise-lines.png')]"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-pink-700 font-bold opacity-50 rotate-45 text-2xl">MEAT?</div>
        </div>
      </div>
      
      <p className="mt-8 text-neutral-400 font-mono text-sm animate-pulse">
        {isOpen ? "PRODUCT REVEALED" : "[ CLICK TO OPEN ]"}
      </p>
    </div>
  );
};