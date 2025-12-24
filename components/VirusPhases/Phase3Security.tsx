import React, { useState, useRef, useEffect } from 'react';
import { InteractiveElementProps } from '../../types';
import { Shield, Lock, Bug, AlertTriangle, Skull, FileCode, Zap } from 'lucide-react';

interface Node3D {
    id: number;
    type: 'virus' | 'bug' | 'alert' | 'defense';
    x: number;
    y: number;
    z: number;
    rotSpeed: number;
}

interface NodeItemProps {
    node: Node3D;
    isActive: boolean;
    onHover: (id: number | null) => void;
    sceneRotation: { x: number; y: number };
}

const NodeItem: React.FC<NodeItemProps> = ({ node, isActive, onHover, sceneRotation }) => {
    
    // Icon Selection
    let Icon = Skull;
    let colorClass = 'text-red-500 border-red-500 bg-red-900/20';
    let label = 'VIRUS';

    if (node.type === 'bug') {
        Icon = Bug;
        colorClass = 'text-yellow-400 border-yellow-500 bg-yellow-900/20';
        label = 'EXPLOIT';
    } else if (node.type === 'alert') {
        Icon = AlertTriangle;
        colorClass = 'text-orange-500 border-orange-500 bg-orange-900/20';
        label = 'WARNING';
    } else if (node.type === 'defense') {
        Icon = Shield;
        colorClass = 'text-blue-400 border-blue-500 bg-blue-900/20';
        label = 'DEFENSE';
    }

    // Counter-rotate text so it faces screen
    const counterRot = `rotateY(${-sceneRotation.y}deg) rotateX(${-sceneRotation.x}deg)`;

    return (
        <div 
            className={`absolute flex items-center justify-center transition-transform duration-300 cursor-pointer group ${isActive ? 'z-50 scale-125' : 'scale-100'}`}
            style={{ 
                transform: `translate3d(${node.x}px, ${node.y}px, ${node.z}px)`,
                transformStyle: 'preserve-3d'
            }}
            onMouseEnter={() => onHover(node.id)}
            onMouseLeave={() => onHover(null)}
        >
            {/* The Node Graphic */}
            <div className={`w-8 h-8 md:w-10 md:h-10 border flex items-center justify-center shadow-lg backdrop-blur-sm ${colorClass} ${isActive ? 'ring-2 ring-white' : ''}`}>
                <Icon size={18} strokeWidth={2} />
            </div>

            {/* Connecting Line to Center (Visual clutter, maybe subtle) */}
            <div 
                className={`absolute top-1/2 left-1/2 w-[1px] bg-white/5 origin-top-left -z-10 pointer-events-none`}
                style={{
                    height: `${Math.sqrt(node.x**2 + node.y**2 + node.z**2)}px`,
                    transform: `rotateZ(${Math.atan2(node.y, node.x) - Math.PI/2}rad) rotateX(${Math.acos(node.z / Math.sqrt(node.x**2 + node.y**2 + node.z**2))}rad)`,
                    opacity: 0.1
                }}
            ></div>

            {/* Label (Only visible on hover or active) */}
            <div 
                className={`absolute left-full ml-2 bg-black border border-white/30 px-2 py-1 pointer-events-none whitespace-nowrap transition-opacity duration-200 ${isActive ? 'opacity-100' : 'opacity-0'}`}
                style={{ transform: counterRot }}
            >
                <div className={`font-mono text-xs font-bold ${colorClass.split(' ')[0]}`}>{label}_{node.id}</div>
                <div className="text-[8px] text-gray-400 font-digital">0x{node.id.toString(16).toUpperCase().padStart(4, '0')}</div>
            </div>
        </div>
    );
};

export const Phase3Security: React.FC<InteractiveElementProps> = ({ isActive }) => {
  const [nodes, setNodes] = useState<Node3D[]>([]);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);
  const lastMouse = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize a dense cloud of nodes
  useEffect(() => {
    const COUNT = 60;
    const RADIUS = 350; // Spread them out
    const newNodes: Node3D[] = [];

    for (let i = 0; i < COUNT; i++) {
        // Random spherical distribution
        const theta = Math.random() * 2 * Math.PI;
        const phi = Math.acos(2 * Math.random() - 1);
        const r = Math.cbrt(Math.random()) * RADIUS; // Cube root for uniform distribution in sphere

        const x = r * Math.sin(phi) * Math.cos(theta);
        const y = r * Math.sin(phi) * Math.sin(theta);
        const z = r * Math.cos(phi);

        // Determine type based on probability
        const rand = Math.random();
        let type: Node3D['type'] = 'virus';
        if (rand > 0.7) type = 'bug';
        else if (rand > 0.4) type = 'alert';
        else if (rand > 0.1) type = 'virus';
        else type = 'defense'; // Rare defense nodes

        newNodes.push({
            id: i,
            type,
            x, y, z,
            rotSpeed: (Math.random() - 0.5) * 2
        });
    }
    setNodes(newNodes);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    lastMouse.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - lastMouse.current.x;
    const dy = e.clientY - lastMouse.current.y;
    setRotation(prev => ({ x: prev.x + dy * 0.3, y: prev.y - dx * 0.3 })); 
    lastMouse.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => setIsDragging(false);

  // Auto-rotate
  useEffect(() => {
      if(!isDragging && isActive) {
          const interval = setInterval(() => {
             setRotation(prev => ({ ...prev, y: prev.y + 0.15 }));
          }, 16);
          return () => clearInterval(interval);
      }
  }, [isDragging, isActive]);

  return (
    <div 
        ref={containerRef}
        className={`relative w-full h-full flex items-center justify-center cursor-move transition-opacity duration-1000 overflow-hidden ${isActive ? 'opacity-100' : 'opacity-0'}`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{ perspective: '1200px' }}
    >
        {/* Background Grid */}
        <div className="absolute inset-0 pointer-events-none opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900 via-black to-black"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,100,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,100,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px] opacity-20 pointer-events-none"></div>

        {/* Overlay Stats */}
        <div className="absolute top-4 left-4 font-mono text-xs text-blue-400 z-50 bg-black/50 p-2 border border-blue-900">
            <div>OBJECTS: {nodes.length}</div>
            <div>THREAT_LEVEL: CRITICAL</div>
            <div className="animate-pulse text-red-500 mt-1">>> SECTOR_COMPROMISED</div>
        </div>

        {/* 3D Scene */}
        <div 
            className="relative w-full h-full flex items-center justify-center preserve-3d"
            style={{ 
                transformStyle: 'preserve-3d',
                transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)` 
            }}
        >
            {nodes.map(node => (
                <NodeItem 
                    key={node.id} 
                    node={node} 
                    isActive={hoveredNode === node.id}
                    onHover={setHoveredNode}
                    sceneRotation={rotation}
                />
            ))}
            
            {/* Central Core */}
            <div className="absolute w-20 h-20 bg-blue-900/20 rounded-full border border-blue-500/30 flex items-center justify-center animate-pulse shadow-[0_0_50px_rgba(0,100,255,0.2)]" style={{ transform: 'translateZ(0)' }}>
                 <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            </div>
        </div>
    </div>
  );
};