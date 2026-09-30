'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { realtimeGateway } from '@/lib/realtime-client';
import { SpaceButton } from '@apiverse/ui';
import { Orbit, Radio, Zap, Shield, Search } from 'lucide-react';

export const Header: React.FC<{ onOpenWarp: () => void }> = ({ onOpenWarp }) => {
  const [realtimeStatus, setRealtimeStatus] = useState<'LIVE' | 'RECONNECTING' | 'OFFLINE'>('LIVE');

  useEffect(() => {
    realtimeGateway.connect();
    realtimeGateway.onStatusChange = (st) => setRealtimeStatus(st);
  }, []);

  return (
    <header className="h-14 border-b border-white/10 bg-space-950/80 backdrop-blur-xl sticky top-0 z-40 flex items-center justify-between px-4 sm:px-6">
      {/* Brand & Workspace Orbit */}
      <div className="flex items-center gap-4">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 via-cyan-500 to-amber-400 p-[1px] shadow-[0_0_15px_rgba(6,182,212,0.3)]">
            <div className="w-full h-full bg-space-950 rounded-[7px] flex items-center justify-center">
              <Orbit className="w-4 h-4 text-cyan-400 group-hover:rotate-180 transition-transform duration-700" />
            </div>
          </div>
          <span className="font-display font-bold text-lg tracking-wider bg-gradient-to-r from-white via-slate-200 to-cyan-300 bg-clip-text text-transparent">
            APIVERSE
          </span>
        </Link>

        {/* Orbit System Selector */}
        <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-slate-300">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span>Solar System: Alpha-7</span>
        </div>
      </div>

      {/* Center Warp Palette Button */}
      <button
        onClick={onOpenWarp}
        className="hidden md:flex items-center gap-3 px-4 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-slate-400 hover:text-slate-200 transition-colors w-64 justify-between"
      >
        <span className="flex items-center gap-2">
          <Search className="w-3.5 h-3.5 text-cyan-400" />
          <span>Warp to anywhere...</span>
        </span>
        <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-[10px] font-mono text-slate-300">Cmd+K</kbd>
      </button>

      {/* Right Tools: Real-time Status Badge & Astronauts */}
      <div className="flex items-center gap-3">
        {/* Real-time Heartbeat Indicator */}
        <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-space-900 border border-white/10 text-xs font-mono">
          <span
            className={`w-2 h-2 rounded-full ${
              realtimeStatus === 'LIVE'
                ? 'bg-emerald-400 shadow-[0_0_8px_#34d399]'
                : realtimeStatus === 'RECONNECTING'
                ? 'bg-amber-400 animate-pulse'
                : 'bg-red-500'
            }`}
          />
          <span className="text-[11px] text-slate-300">{realtimeStatus}</span>
        </div>

        {/* Active Astronaut Avatars */}
        <div className="flex items-center -space-x-2">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&h=60&fit=crop"
            alt="Shepard"
            className="w-7 h-7 rounded-full border border-cyan-400 object-cover"
            title="Shepard (Owner)"
          />
          <img
            src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=60&h=60&fit=crop"
            alt="Liara"
            className="w-7 h-7 rounded-full border border-purple-400 object-cover"
            title="Liara (Admin)"
          />
        </div>
      </div>
    </header>
  );
};
