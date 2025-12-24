
import React, { useState, useEffect } from 'react';
import { InteractiveElementProps } from '../../types';
import { Monitor, Skull, AlertTriangle } from 'lucide-react';

interface Node {
    id: number;
    infected: boolean;
}

const GRID_SIZE = 10;
const TOTAL_NODES = GRID_SIZE * GRID_SIZE;

export const Phase2Computer: React.FC<InteractiveElementProps> = ({ isActive }) => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [flashWarning, setFlashWarning] = useState(false);

  useEffect(() => {
    // Initialize 100 nodes
    setNodes(Array.from({ length: TOTAL_NODES }).map((_, i) => ({
        id: i,
        infected: false // Start clean, user initiates
    })));
  }, []);

  const infectNode = (index: number) => {
    if (!isActive) return;

    setNodes(prev => {
        const newNodes = [...prev];
        const indexesToInfect = [index];

        // Calculate neighbors (Up, Down, Left, Right)
        const row = Math.floor(index / GRID_SIZE);
        const col = index % GRID_SIZE;

        if (row > 0) indexesToInfect.push(index - GRID_SIZE); // Up
        if (row < GRID_SIZE - 1) indexesToInfect.push(index + GRID_SIZE); // Down
        if (col > 0) indexesToInfect.push(index - 1); // Left
        if (col < GRID_SIZE - 1) indexesToInfect.push(index + 1); // Right

        let changed = false;
        indexesToInfect.forEach(idx => {
            if (newNodes[idx] && !newNodes[idx].infected) {
                newNodes[idx] = { ...newNodes[idx], infected: true };
                changed = true;
            }
        });

        if (changed) {
            triggerWarning();
        }

        return newNodes;
    });
  };

  const triggerWarning = () => {
      setFlashWarning(true);
      setTimeout(() => setFlashWarning(false), 200);
  };

  const infectedCount = nodes.filter(n => n.infected).length;
  const infectionRate = Math.round((infectedCount / TOTAL_NODES) * 100);

  return (
    <div className={`relative w-full h-full flex flex-col items-center justify-center transition-all duration-1000 ${isActive ? 'opacity-100' : 'opacity-0 blur-md'}`}>
        
        {/* Full Screen Warning Flash */}
        <div className={`absolute inset-0 bg-red-500/20 z-50 pointer-events-none transition-opacity duration-100 ${flashWarning ? 'opacity-100' : 'opacity-0'}`}></div>

        <div className="relative z-10 p-4 bg-black/90 border-4 border-double border-green-900/50 shadow-[0_0_20px_rgba(0,50,0,0.5)]">
            
            {/* Header Stats */}
            <div className="flex justify-between items-center mb-4 border-b border-green-900 pb-2 font-mono text-xs md:text-sm">
                <span className="text-green-500">NET_ID: LOCAL_LAN</span>
                <span className={`${infectionRate > 50 ? 'text-red-500 animate-pulse' : 'text-green-500'}`}>
                    INFECTION_RATE: {infectionRate}%
                </span>
            </div>

            {/* 10x10 Grid */}
            <div 
                className="grid gap-1 md:gap-2"
                style={{ 
                    gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))` 
                }}
            >
                {nodes.map((node) => (
                    <div 
                        key={node.id}
                        onClick={() => infectNode(node.id)}
                        className={`
                            w-5 h-5 md:w-8 md:h-8 flex items-center justify-center border transition-colors duration-200 cursor-crosshair
                            ${node.infected 
                                ? 'bg-red-900/40 border-red-500' 
                                : 'bg-black border-green-900 hover:border-green-400'
                            }
                        `}
                    >
                        {node.infected ? (
                            <Skull size={14} className="text-red-500 md:w-5 md:h-5" strokeWidth={2.5} />
                        ) : (
                            <div className="w-1 h-1 md:w-2 md:h-2 bg-green-700 rounded-sm"></div>
                        )}
                    </div>
                ))}
            </div>
            
            {/* Footer Log */}
            <div className="mt-4 h-6 overflow-hidden font-digital text-xs tracking-widest text-green-700 border-t border-green-900 pt-1">
                {infectedCount > 0 
                    ? `>> ALERT: MALICIOUS_PACKETS_DETECTED_ON_NODE_[${nodes.findIndex(n => n.infected)}]...` 
                    : '>> SYSTEM_STATUS: NOMINAL'}
            </div>
        </div>

        {/* Background Network Lines */}
        <div className="absolute inset-0 pointer-events-none -z-10 opacity-10">
            <svg width="100%" height="100%">
                <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-green-500"/>
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
        </div>
    </div>
  );
};
