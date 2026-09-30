'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Command } from 'cmdk';
import {
  Globe,
  KeyRound,
  PlaySquare,
  BarChart3,
  Atom,
  BookOpen,
  Boxes,
  Users,
  Search,
  Sparkles
} from 'lucide-react';

interface WarpPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const WarpPalette: React.FC<WarpPaletteProps> = ({ open, onOpenChange }) => {
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [open, onOpenChange]);

  const warpTo = (path: string) => {
    onOpenChange(false);
    router.push(path);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-space-950 border border-white/20 rounded-2xl shadow-[0_0_50px_rgba(6,182,212,0.25)] overflow-hidden">
        <Command className="w-full">
          <div className="flex items-center px-4 border-b border-white/10 gap-3">
            <Search className="w-5 h-5 text-cyan-400 shrink-0" />
            <Command.Input
              placeholder="Warp jump to star system, planet, or command..."
              className="w-full py-4 bg-transparent outline-none text-sm text-slate-100 placeholder-slate-500 font-sans"
              autoFocus
            />
          </div>

          <Command.List className="max-h-80 overflow-y-auto p-2 space-y-1">
            <Command.Empty className="p-4 text-xs font-mono text-slate-500 text-center">
              No celestial coordinates found.
            </Command.Empty>

            <Command.Group heading="Universe Locations" className="text-[10px] font-mono text-slate-500 px-2 py-1">
              <Command.Item
                onSelect={() => warpTo('/galaxy')}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs text-slate-300 hover:text-cyan-300 hover:bg-white/10 cursor-pointer"
              >
                <Globe className="w-4 h-4 text-cyan-400" />
                <span>Galaxy Dashboard (Live Moving Universe)</span>
              </Command.Item>
              <Command.Item
                onSelect={() => warpTo('/vault')}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs text-slate-300 hover:text-amber-300 hover:bg-white/10 cursor-pointer"
              >
                <KeyRound className="w-4 h-4 text-amber-400" />
                <span>API Key Vault (Planets & Zero-Trust Secrets)</span>
              </Command.Item>
              <Command.Item
                onSelect={() => warpTo('/playground')}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs text-slate-300 hover:text-blue-300 hover:bg-white/10 cursor-pointer"
              >
                <PlaySquare className="w-4 h-4 text-blue-400" />
                <span>API Playground (Postman-Class Runner & SSRF Proxy)</span>
              </Command.Item>
              <Command.Item
                onSelect={() => warpTo('/ultron')}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs text-slate-300 hover:text-pink-300 hover:bg-white/10 cursor-pointer"
              >
                <Atom className="w-4 h-4 text-pink-400" />
                <span>Ultron Singularity Chamber (Broken Black Hole)</span>
              </Command.Item>
              <Command.Item
                onSelect={() => warpTo('/starter-kits')}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs text-slate-300 hover:text-cyan-300 hover:bg-white/10 cursor-pointer"
              >
                <Boxes className="w-4 h-4 text-cyan-400" />
                <span>Starter Kit Generator (Download Full Codebase Zip)</span>
              </Command.Item>
            </Command.Group>
          </Command.List>
        </Command>
      </div>
    </div>
  );
};
