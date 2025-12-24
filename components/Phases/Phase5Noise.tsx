
import React, { useState, useEffect } from 'react';
import { InteractiveElementProps } from '../../types';
import { INTERACTIVE_TEXT } from '../../constants';
import { MessageCircle, ThumbsUp, Bell, Share2, Trash2, CheckCircle } from 'lucide-react';

interface NotificationItem {
    id: number;
    app: string;
    msg: string;
    icon: number;
    isRead: boolean;
}

export const Phase5Noise: React.FC<InteractiveElementProps> = ({ scrollProgress, language }) => {
  const interactive = INTERACTIVE_TEXT[language];
  const notifData = interactive.notifications;
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  // Initialize notifications on mount/language change
  useEffect(() => {
    const initial = Array.from({ length: 15 }).map((_, i) => ({
        id: i,
        ...notifData[i % notifData.length],
        icon: i % 4,
        isRead: false
    }));
    setNotifications(initial);
  }, [language, notifData]);


  const handleDelete = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const handleRead = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: !n.isRead } : n));
  };

  // Calculate parallax speed
  const translateY = scrollProgress * -500; 

  return (
    <div className="relative w-full h-full overflow-hidden flex flex-col items-center pt-20">
      <div className="absolute inset-0 bg-black opacity-80 z-0"></div>
      
      {/* Blurred "Glass" overlay */}
      <div className="absolute inset-0 backdrop-blur-sm z-0"></div>

      <div 
        className="w-full max-w-md space-y-3 px-4 z-10 transition-transform duration-75 ease-linear pb-40"
        style={{ transform: `translateY(${translateY}px)` }}
      >
        {notifications.map((note, idx) => {
            const opacity = Math.max(0.2, 1 - (idx * 0.05) + (scrollProgress * 2));
            
            return (
                <div 
                    key={note.id}
                    className={`
                        backdrop-blur-md border p-4 rounded-2xl flex items-center gap-4 shadow-lg transition-all duration-300 group relative overflow-hidden
                        ${note.isRead 
                            ? 'bg-neutral-900/40 border-neutral-800 opacity-60 grayscale' 
                            : 'bg-neutral-800/80 border-neutral-700 hover:bg-neutral-700'
                        }
                    `}
                    style={{ opacity: note.isRead ? 0.5 : opacity }}
                >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center shadow-inner shrink-0">
                        {note.icon === 0 && <Bell className="text-white w-5 h-5 animate-wiggle" />}
                        {note.icon === 1 && <ThumbsUp className="text-white w-5 h-5" />}
                        {note.icon === 2 && <MessageCircle className="text-white w-5 h-5" />}
                        {note.icon === 3 && <Share2 className="text-white w-5 h-5" />}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-baseline">
                            <h4 className={`font-bold text-sm ${note.isRead ? 'text-neutral-500' : 'text-white'}`}>{note.app}</h4>
                            <span className="text-[10px] text-neutral-400">now</span>
                        </div>
                        <p className={`text-sm truncate ${note.isRead ? 'text-neutral-600' : 'text-neutral-300 group-hover:text-white'}`}>{note.msg}</p>
                    </div>

                    {/* Actions overlaid on hover/active */}
                    <div className="absolute right-0 top-0 bottom-0 flex items-center gap-1 pr-2 translate-x-full group-hover:translate-x-0 transition-transform bg-gradient-to-l from-neutral-900 via-neutral-900/90 to-transparent pl-8">
                        <button 
                            onClick={(e) => handleRead(note.id, e)}
                            className="p-2 rounded-full hover:bg-neutral-700 text-neutral-400 hover:text-green-400 transition-colors"
                            title="Mark as Read"
                        >
                            <CheckCircle size={18} />
                        </button>
                        <button 
                            onClick={(e) => handleDelete(note.id, e)}
                            className="p-2 rounded-full hover:bg-neutral-700 text-neutral-400 hover:text-red-400 transition-colors"
                            title="Delete"
                        >
                            <Trash2 size={18} />
                        </button>
                    </div>
                </div>
            )
        })}
        
        {notifications.length === 0 && (
            <div className="text-center text-neutral-500 font-mono mt-20 animate-pulse">
                All caught up.
            </div>
        )}
      </div>
    </div>
  );
};
