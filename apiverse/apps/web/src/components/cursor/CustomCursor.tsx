'use client';

import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [targetPos, setTargetPos] = useState({ x: -100, y: -100 });
  const [cursorType, setCursorType] = useState<'default' | 'pointer' | 'planet' | 'ultron' | 'text'>('default');

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setTargetPos({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement | null;
      if (!target) return;

      if (target.closest('[data-cursor="ultron"]')) {
        setCursorType('ultron');
      } else if (target.closest('[data-cursor="planet"]')) {
        setCursorType('planet');
      } else if (target.closest('button, a, input, select')) {
        setCursorType('pointer');
      } else {
        setCursorType('default');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Spring smoothing animation loop
  useEffect(() => {
    let animId: number;
    const animate = () => {
      setPos((prev) => ({
        x: prev.x + (targetPos.x - prev.x) * 0.25,
        y: prev.y + (targetPos.y - prev.y) * 0.25
      }));
      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [targetPos]);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden hidden md:block">
      {/* Magnetic Outer Ring */}
      <div
        className={`fixed top-0 left-0 rounded-full border transition-transform duration-100 ease-out flex items-center justify-center ${
          cursorType === 'ultron'
            ? 'w-12 h-12 border-pink-500 shadow-[0_0_15px_rgba(236,72,153,0.6)] bg-pink-950/20'
            : cursorType === 'planet'
            ? 'w-10 h-10 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.6)] bg-cyan-950/20'
            : cursorType === 'pointer'
            ? 'w-8 h-8 border-white/60 scale-125'
            : 'w-6 h-6 border-white/30'
        }`}
        style={{
          transform: `translate3d(${pos.x - (cursorType === 'ultron' ? 24 : cursorType === 'planet' ? 20 : cursorType === 'pointer' ? 16 : 12)}px, ${
            pos.y - (cursorType === 'ultron' ? 24 : cursorType === 'planet' ? 20 : cursorType === 'pointer' ? 16 : 12)
          }px, 0)`
        }}
      >
        {cursorType === 'ultron' && (
          <span className="text-[8px] font-mono text-pink-300 font-bold tracking-tighter">ASK</span>
        )}
        {cursorType === 'planet' && (
          <span className="text-[8px] font-mono text-cyan-300 font-bold tracking-tighter">ORBIT</span>
        )}
      </div>

      {/* Center Stardust Dot */}
      <div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-cyan-300 shadow-[0_0_8px_#06b6d4]"
        style={{
          transform: `translate3d(${targetPos.x - 3}px, ${targetPos.y - 3}px, 0)`
        }}
      />
    </div>
  );
};
