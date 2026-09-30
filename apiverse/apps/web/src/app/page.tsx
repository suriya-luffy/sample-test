'use client';

import React from 'react';
import Link from 'next/link';
import { SpaceButton, GlassPanel, Badge } from '@apiverse/ui';
import { Orbit, Sparkles, Shield, Zap, Globe, KeyRound, PlaySquare, Atom, ArrowRight } from 'lucide-react';
import { UltronBlackHole } from '@/components/3d/UltronBlackHole';

export default function LandingPage() {
  return (
    <div className="relative min-h-screen py-10 flex flex-col items-center">
      {/* Background Nebula Elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-cyan-600/10 via-purple-600/15 to-pink-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Hero Badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-6">
        <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
        <span>APIVERSE OPERATING SYSTEM 2026</span>
      </div>

      {/* Hero Title */}
      <h1 className="text-4xl sm:text-6xl font-display font-extrabold text-center tracking-tight max-w-4xl bg-gradient-to-b from-white via-slate-100 to-slate-400 bg-clip-text text-transparent leading-[1.15]">
        The Developer Operating System for Working with APIs
      </h1>

      <p className="mt-4 text-base sm:text-lg text-slate-400 text-center max-w-2xl font-sans">
        Experience your APIs as a living universe. Watch keys orbit as planets, monitor requests as comets, and command Ultron—the shattered black hole intelligence at the center.
      </p>

      {/* Action Buttons */}
      <div className="mt-8 flex items-center gap-4 flex-wrap justify-center">
        <Link href="/galaxy">
          <SpaceButton size="lg" variant="primary" icon={<Globe className="w-4 h-4" />}>
            Enter The Galaxy
          </SpaceButton>
        </Link>
        <Link href="/ultron">
          <SpaceButton size="lg" variant="ultron" icon={<Atom className="w-4 h-4" />}>
            Meet Ultron
          </SpaceButton>
        </Link>
      </div>

      {/* Center 3D Preview: Ultron Singularity */}
      <div className="my-12">
        <UltronBlackHole state="idle" />
      </div>

      {/* 3 Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full mt-4">
        <GlassPanel glow="cyan" className="p-6">
          <Globe className="w-8 h-8 text-cyan-400 mb-3" />
          <h3 className="font-display font-bold text-lg text-white mb-2">Live Galaxy View</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Every API key orbits as a planet. Size reflects usage, color reflects health, and requests fly between them as luminescent comets.
          </p>
        </GlassPanel>

        <GlassPanel glow="gold" className="p-6">
          <Shield className="w-8 h-8 text-amber-400 mb-3" />
          <h3 className="font-display font-bold text-lg text-white mb-2">AES-256-GCM Vault</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Hardware-grade secret encryption with zero master key database persistence, leak audits, and automatic rotation alerts.
          </p>
        </GlassPanel>

        <GlassPanel glow="purple" className="p-6">
          <Atom className="w-8 h-8 text-pink-400 mb-3" />
          <h3 className="font-display font-bold text-lg text-white mb-2">Ultron Intelligence</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            A destroyed singularity that monitors your universe, debugs payload failures in real time, and synthesizes multi-model code.
          </p>
        </GlassPanel>
      </div>
    </div>
  );
}
