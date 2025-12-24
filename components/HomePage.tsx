
import React, { useEffect, useRef, useState } from 'react';
import { getHomepageWords, UI_TEXT } from '../constants';
import { Language } from '../types';
import { MousePointer2 } from 'lucide-react';

interface HomePageProps {
  onSelectWord: (word: string) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
}

// Particle Class
class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;

  constructor(width: number, height: number) {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = (Math.random() - 0.5) * 0.5;
    this.size = Math.random() * 2 + 1;
    this.color = Math.random() > 0.9 ? '#FFCC00' : '#333333'; // SPAM yellow or dark gray
  }

  update(width: number, height: number, mouseX: number, mouseY: number) {
    this.x += this.vx;
    this.y += this.vy;

    // Bounce off edges
    if (this.x < 0 || this.x > width) this.vx *= -1;
    if (this.y < 0 || this.y > height) this.vy *= -1;

    // Mouse Interaction (Flee)
    const dx = this.x - mouseX;
    const dy = this.y - mouseY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance < 150) {
      const forceDirectionX = dx / distance;
      const forceDirectionY = dy / distance;
      const force = (150 - distance) / 150;
      this.vx += forceDirectionX * force * 0.5;
      this.vy += forceDirectionY * force * 0.5;
    }

    // Drag (slow down)
    this.vx *= 0.98;
    this.vy *= 0.98;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

export const HomePage: React.FC<HomePageProps> = ({ onSelectWord, language, setLanguage }) => {
  const words = getHomepageWords(language);
  const ui = UI_TEXT[language];
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  
  // Interactive Tilt for Word Cloud
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Initialize Particles
    const particles = Array.from({ length: 100 }, () => new Particle(width, height));

    let animationFrameId: number;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Update and Draw Particles
      particles.forEach(p => {
        p.update(width, height, mousePos.x, mousePos.y);
        p.draw(ctx);
      });

      // Draw Connections
      particles.forEach((a, i) => {
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(100, 100, 100, ${1 - distance / 120})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    };

    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [mousePos]);

  // Handle Global Mouse Move for Tilt and Particles
  const handleMouseMove = (e: React.MouseEvent) => {
    const x = e.clientX;
    const y = e.clientY;
    setMousePos({ x, y });

    // Calculate Tilt (Range -15deg to 15deg)
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const tiltX = ((y - centerY) / centerY) * 10; // Rotate X axis based on Y pos
    const tiltY = ((x - centerX) / centerX) * -10; // Rotate Y axis based on X pos
    setTilt({ x: tiltX, y: tiltY });
  };

  const getWordStyle = (word: string) => {
    // Special highlight for 'SPAM'
    if (['SPAM', 'スパム', '午餐肉'].includes(word)) {
        return 'text-spam-yellow font-black scale-110 drop-shadow-[0_0_10px_rgba(255,204,0,0.8)] hover:drop-shadow-[0_0_20px_rgba(255,204,0,1)] animate-pulse';
    }
    // Special highlight for 'VIRUS'
    if (['VIRUS', 'ウイルス', '病毒'].includes(word)) {
        return 'text-red-600 font-black scale-110 drop-shadow-[0_0_10px_rgba(255,0,0,0.8)] hover:drop-shadow-[0_0_20px_rgba(255,0,0,1)] animate-pulse hover:text-red-500';
    }
    return 'text-neutral-500 hover:text-white hover:scale-125 transition-all duration-200';
  };

  return (
    <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-neutral-900 perspective-1000"
    >
      {/* Background Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none opacity-40" />
      
      {/* Language Switcher - Fixed Top Right */}
      <div className="absolute top-8 right-8 flex gap-4 z-50">
        {(['EN', 'JP', 'CN'] as Language[]).map((lang) => (
          <button
            key={lang}
            onClick={() => setLanguage(lang)}
            className={`font-mono text-sm font-bold transition-all px-2 py-1 border border-transparent hover:border-white/20 rounded ${language === lang ? 'text-spam-yellow bg-white/10' : 'text-neutral-500 hover:text-white'}`}
          >
            {lang}
          </button>
        ))}
      </div>

      {/* Main Content Container with 3D Tilt */}
      <div 
        className="relative z-10 w-full max-w-7xl px-4 flex flex-col items-center justify-center transition-transform duration-100 ease-out"
        style={{ transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
      >
         
         {/* Typographic Hero Section */}
         <div className="mb-20 text-center relative">
             {/* Decorative Elements */}
             <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-[1px] h-12 bg-gradient-to-b from-transparent to-neutral-500"></div>
             
             <h1 className="flex flex-col items-center leading-none">
                 <span className="text-4xl md:text-7xl lg:text-8xl font-black text-vintage-cream tracking-tighter mb-2 mix-blend-exclusion">
                     {ui.title.replace('.', '')}
                 </span>
                 <span className="text-4xl md:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-spam-yellow to-yellow-500 tracking-tighter drop-shadow-lg">
                     {ui.subtitle}
                 </span>
             </h1>

             <p className="mt-8 font-mono text-sm md:text-base text-neutral-400 max-w-2xl mx-auto tracking-wide border-l-2 border-spam-yellow pl-4 text-left">
                {ui.tagline}
             </p>
         </div>

         {/* Interactive Word Cloud */}
         <div className="w-full max-w-5xl">
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-6 md:gap-x-16 md:gap-y-12">
                {words.map((item, idx) => (
                    <button
                        key={`${item.word}-${idx}`}
                        onClick={() => onSelectWord(item.word)}
                        className={`font-mono text-xl md:text-4xl tracking-tight cursor-none ${getWordStyle(item.word)} group relative`}
                    >
                        {item.word}
                        {/* Custom Cursor Hint on Hover */}
                        <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] bg-white text-black px-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                            SELECT
                        </span>
                    </button>
                ))}
            </div>
         </div>

      </div>

      {/* Bottom Hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-neutral-600 font-mono text-xs flex items-center gap-2 animate-bounce">
         <MousePointer2 size={12} />
         <span>INTERACT TO EXPLORE</span>
      </div>

    </div>
  );
};