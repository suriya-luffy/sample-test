'use client';

import React, { useState, useEffect } from 'react';
import { GlassPanel, Badge, SpaceButton } from '@apiverse/ui';
import { GraduationCap, Award, Flame, CheckCircle2 } from 'lucide-react';

export default function LearningPage() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch('http://localhost:8000/api/v1/learning/missions')
      .then((r) => r.json())
      .then((d) => setData(d))
      .catch(() => {});
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-white flex items-center gap-2">
          <GraduationCap className="w-6 h-6 text-cyan-400" />
          <span>LEARNING HUB & CELESTIAL MISSIONS</span>
        </h1>
        <p className="text-xs text-slate-400 font-mono mt-1">
          Master APIs across planetary systems • Live sandboxes, quizzes, XP, and certificates.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <GlassPanel className="p-4 text-center">
          <div className="text-[10px] font-mono text-slate-400 uppercase">Astronaut Rank</div>
          <div className="text-base font-display font-bold text-cyan-300 mt-1">{data?.rank || 'Orbital Architect'}</div>
        </GlassPanel>
        <GlassPanel className="p-4 text-center">
          <div className="text-[10px] font-mono text-slate-400 uppercase">Total XP</div>
          <div className="text-base font-display font-bold text-amber-300 mt-1">{data?.totalXp || 1250} XP</div>
        </GlassPanel>
        <GlassPanel className="p-4 text-center">
          <div className="text-[10px] font-mono text-slate-400 uppercase">Streak</div>
          <div className="text-base font-display font-bold text-emerald-400 mt-1">{data?.currentStreakDays || 7} Days</div>
        </GlassPanel>
      </div>

      <div className="space-y-4">
        {data?.missions?.map((m: any) => (
          <GlassPanel key={m.id} glow={m.status === 'COMPLETED' ? 'cyan' : 'none'} className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display font-bold text-sm text-white">{m.title}</h3>
                <span className="text-xs font-mono text-slate-400">Target Planet: {m.planet} • {m.lessonsCount} Interactive Lessons</span>
              </div>
              <Badge variant={m.status === 'COMPLETED' ? 'healthy' : m.status === 'IN_PROGRESS' ? 'warning' : 'neutral'}>
                {m.status}
              </Badge>
            </div>
          </GlassPanel>
        ))}
      </div>
    </div>
  );
}
