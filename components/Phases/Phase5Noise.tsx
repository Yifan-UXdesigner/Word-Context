import React from 'react';
import { InteractiveElementProps } from '../../types';
import { MessageCircle, ThumbsUp, Bell, Share2, Instagram } from 'lucide-react';

export const Phase5Noise: React.FC<InteractiveElementProps> = ({ scrollProgress }) => {
  const notifications = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    app: ['Twitter', 'Instagram', 'TikTok', 'Gmail', 'System'][i % 5],
    msg: ['Liked your photo', 'New follower', 'Trending now', 'Security Alert', 'Battery Low'][i % 5],
    icon: i % 4
  }));

  // Calculate parallax speed
  const translateY = scrollProgress * -500; 

  return (
    <div className="relative w-full h-full overflow-hidden flex flex-col items-center pt-20">
      <div className="absolute inset-0 bg-black opacity-80 z-0"></div>
      
      {/* Blurred "Glass" overlay */}
      <div className="absolute inset-0 backdrop-blur-sm z-0"></div>

      <div 
        className="w-full max-w-md space-y-3 px-4 z-10 transition-transform duration-75 ease-linear"
        style={{ transform: `translateY(${translateY}px)` }}
      >
        {/* Infinite stream simulated by repeating lists */}
        {[...notifications, ...notifications, ...notifications].map((note, idx) => {
            const opacity = Math.max(0.2, 1 - (idx * 0.05) + (scrollProgress * 2));
            
            return (
                <div 
                    key={`${note.id}-${idx}`}
                    className="bg-neutral-800/80 backdrop-blur-md border border-neutral-700 p-4 rounded-2xl flex items-center gap-4 shadow-lg hover:bg-neutral-700 transition-colors cursor-pointer group"
                    style={{ opacity }}
                >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center shadow-inner">
                        {note.icon === 0 && <Bell className="text-white w-5 h-5 animate-wiggle" />}
                        {note.icon === 1 && <ThumbsUp className="text-white w-5 h-5" />}
                        {note.icon === 2 && <MessageCircle className="text-white w-5 h-5" />}
                        {note.icon === 3 && <Share2 className="text-white w-5 h-5" />}
                    </div>
                    <div className="flex-1">
                        <div className="flex justify-between items-baseline">
                            <h4 className="font-bold text-sm text-white">{note.app}</h4>
                            <span className="text-[10px] text-neutral-400">now</span>
                        </div>
                        <p className="text-sm text-neutral-300 group-hover:text-white transition-colors">{note.msg}</p>
                    </div>
                </div>
            )
        })}
      </div>
    </div>
  );
};