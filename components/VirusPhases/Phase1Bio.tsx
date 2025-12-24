
import React, { useState, useEffect, useRef } from 'react';
import { InteractiveElementProps } from '../../types';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
}

export const Phase1Bio: React.FC<InteractiveElementProps> = ({ isActive }) => {
  const [spread, setSpread] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const requestRef = useRef<number>(0);

  const handleClick = () => {
    if (!spread) {
        setSpread(true);
    }
  };

  useEffect(() => {
    if (!spread || !isActive) return;

    // Spawn mechanism
    const spawnInterval = setInterval(() => {
        setParticles(prev => {
            if (prev.length > 400) return prev; // Cap at 400 to prevent lag
            
            const newParticles = Array.from({ length: 5 }).map(() => {
                const angle = Math.random() * Math.PI * 2;
                const speed = Math.random() * 2 + 1;
                return {
                    id: Math.random(),
                    x: 50, // Center %
                    y: 50, // Center %
                    vx: Math.cos(angle) * speed * 0.2, // Velocity factor
                    vy: Math.sin(angle) * speed * 0.2,
                    size: Math.random() * 1.5 + 0.5, // rem size
                    color: Math.random() > 0.7 ? 'bg-red-500' : 'bg-red-900'
                };
            });
            return [...prev, ...newParticles];
        });
    }, 100);

    return () => clearInterval(spawnInterval);
  }, [spread, isActive]);

  useEffect(() => {
    if (!spread || !isActive) return;

    const animate = () => {
        setParticles(prev => prev.map(p => {
            let newX = p.x + p.vx;
            let newY = p.y + p.vy;

            // Bounce off edges logic (simple)
            if (newX < 0 || newX > 100) p.vx *= -1;
            if (newY < 0 || newY > 100) p.vy *= -1;

            return { ...p, x: newX, y: newY };
        }));
        requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [spread, isActive]);

  return (
    <div className={`relative flex flex-col items-center justify-center h-full w-full overflow-hidden transition-opacity duration-1000 ${isActive ? 'opacity-100' : 'opacity-30 blur-sm'}`}>
      
      {/* Background Particles */}
      {particles.map((p) => (
          <div 
            key={p.id}
            className={`absolute rounded-sm ${p.color} pointer-events-none opacity-80`}
            style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: `${p.size}vh`,
                height: `${p.size}vh`,
                transform: 'translate(-50%, -50%)',
                boxShadow: '0 0 4px rgba(255, 0, 0, 0.4)'
            }}
          />
      ))}

      {/* Main Container */}
      <div 
        onClick={handleClick}
        className="relative z-20 w-80 h-80 flex items-center justify-center cursor-pointer group"
      >
        {/* Retro Schematic Virus Node */}
        <div className={`relative z-20 w-32 h-32 bg-black border-4 border-red-600 flex items-center justify-center transition-all duration-300 shadow-[0_0_0_4px_rgba(100,0,0,0.3)] ${spread ? 'scale-90 animate-pulse' : 'group-hover:scale-105'}`}>
             
             {/* Spikes - Blocks */}
             {Array.from({ length: 8 }).map((_, i) => (
                <div 
                    key={i}
                    className="absolute w-3 h-6 bg-red-700 border border-black"
                    style={{ 
                        transform: `rotate(${i * 45}deg) translateY(-28px)`,
                        transformOrigin: 'bottom center',
                        zIndex: -1
                    }}
                ></div>
             ))}
             
             {/* Core */}
             <div className="w-16 h-16 border-2 border-red-800 flex items-center justify-center bg-black">
                <div className={`w-4 h-4 bg-red-500 rounded-none ${spread ? 'animate-ping' : ''}`}></div>
             </div>
        </div>

        {/* Instructions/Feedback */}
        <div className="absolute -bottom-20 w-64 text-center font-mono text-red-500 tracking-widest text-xs bg-black px-2 py-2 border border-red-900 shadow-[4px_4px_0px_rgba(50,0,0,1)]">
            {spread ? (
                <span className="animate-pulse">>> WARNING: PATHOGEN_BREACH DETECTED</span>
            ) : (
                <span className="blink">>> CLICK_TO_INITIATE_VECTOR</span>
            )}
        </div>

      </div>
      
      {/* Overlay Scanlines for extra retro feel when spreading */}
      {spread && <div className="absolute inset-0 bg-red-900/10 pointer-events-none animate-pulse z-10 mix-blend-overlay"></div>}
      
    </div>
  );
};
