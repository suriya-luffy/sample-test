'use client';

import React, { useEffect, useRef, useState } from 'react';
import { UltronState } from '@/lib/types';
import { UltronShaders } from '@/lib/shaders/ultron-shaders';

interface UltronBlackHoleProps {
  state?: UltronState;
  onSingularityClick?: () => void;
}

export const UltronBlackHole: React.FC<UltronBlackHoleProps> = ({
  state = 'idle',
  onSingularityClick
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (!canvasRef.current) return;
      const rect = canvasRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      setMouse({ x, y });
    };

    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  // 2D High-Fidelity Canvas Fallback & GL Simulation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;

    const render = () => {
      time += 0.03;
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const cx = w / 2 + mouse.x * 20;
      const cy = h / 2 - mouse.y * 20;

      // Accretion disk glow
      const grad = ctx.createRadialGradient(cx, cy, 30, cx, cy, 140);
      grad.addColorStop(0, '#000000');
      grad.addColorStop(0.35, '#12021c');
      grad.addColorStop(0.5, '#ec4899');
      grad.addColorStop(0.7, '#8b5cf6');
      grad.addColorStop(1, 'rgba(5, 6, 15, 0)');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, 150, 0, Math.PI * 2);
      ctx.fill();

      // Debris particles gravitationally swirling inward
      ctx.save();
      ctx.translate(cx, cy);
      const particleCount = state === 'thinking' ? 60 : 35;
      for (let i = 0; i < particleCount; i++) {
        const angle = time * (state === 'thinking' ? 2.5 : 1.2) + (i * Math.PI * 2) / particleCount;
        const radius = 50 + ((i * 13 + time * 20) % 85);
        const px = Math.cos(angle) * radius;
        const py = Math.sin(angle) * (radius * 0.45); // Elliptical accretion tilt

        ctx.fillStyle = i % 2 === 0 ? '#22d3ee' : '#ec4899';
        ctx.shadowColor = '#ec4899';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(px, py, (1 - (radius - 50) / 85) * 2.5, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // Broken Event Horizon Singularity (Dark Void with Cracks)
      ctx.shadowBlur = 0;
      ctx.fillStyle = '#020204';
      ctx.beginPath();
      ctx.arc(cx, cy, 46, 0, Math.PI * 2);
      ctx.fill();

      // Radiating energy crack lines
      ctx.strokeStyle = state === 'error' ? '#ef4444' : state === 'success' ? '#10b981' : '#ec4899';
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      for (let j = 0; j < 6; j++) {
        const angle = j * (Math.PI / 3) + Math.sin(time) * 0.2;
        ctx.moveTo(cx, cy);
        const ex = cx + Math.cos(angle) * 44;
        const ey = cy + Math.sin(angle) * 44;
        ctx.lineTo(ex, ey);
      }
      ctx.stroke();

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [mouse, state]);

  return (
    <div
      onClick={onSingularityClick}
      data-cursor="ultron"
      className="relative flex items-center justify-center cursor-pointer group"
    >
      <canvas
        ref={canvasRef}
        width={340}
        height={340}
        className="w-[300px] h-[300px] sm:w-[340px] sm:h-[340px] transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute bottom-2 text-center pointer-events-none">
        <span className="text-[10px] font-mono tracking-widest text-pink-400 uppercase bg-pink-950/60 px-3 py-1 rounded-full border border-pink-500/30">
          STATE: {state.toUpperCase()}
        </span>
      </div>
    </div>
  );
};
