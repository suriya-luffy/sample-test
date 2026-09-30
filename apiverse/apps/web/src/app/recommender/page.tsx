'use client';

import React, { useState } from 'react';
import { GlassPanel, Badge, SpaceButton } from '@apiverse/ui';
import { Sparkles, Layers, ArrowRight } from 'lucide-react';

export default function RecommenderPage() {
  const [idea, setIdea] = useState('An autonomous developer platform for deploying multi-tenant APIs');
  const [recommendation, setRecommendation] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const getRecommendation = async () => {
    setLoading(true);
    try {
      const resp = await fetch('http://localhost:8000/api/v1/recommender/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idea })
      });
      const data = await resp.json();
      setRecommendation(data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-white flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-pink-400" />
          <span>AI PROJECT RECOMMENDER</span>
        </h1>
        <p className="text-xs text-slate-400 font-mono mt-1">
          Describe your product idea and let Ultron assemble the optimal API stack and cost estimate.
        </p>
      </div>

      <GlassPanel className="p-5 space-y-4">
        <textarea
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          placeholder="Describe what you want to build..."
          className="w-full bg-space-950 border border-white/10 rounded-xl p-3 text-xs text-white outline-none focus:border-cyan-500 h-24"
        />
        <SpaceButton
          variant="primary"
          size="md"
          icon={<Sparkles className="w-4 h-4" />}
          onClick={getRecommendation}
          disabled={loading}
        >
          {loading ? 'Synthesizing Architecture...' : 'Generate Recommended Stack'}
        </SpaceButton>
      </GlassPanel>

      {recommendation && (
        <div className="space-y-4">
          <h2 className="text-base font-display font-bold text-white">Recommended Architecture Stack</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recommendation.recommendedStack.map((item: any, idx: number) => (
              <GlassPanel key={idx} glow="cyan" className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-bold text-sm text-cyan-200">{item.service}</h3>
                  <Badge variant="healthy">{item.role}</Badge>
                </div>
                <p className="text-xs text-slate-300">{item.why}</p>
                <div className="text-[11px] font-mono text-slate-400">
                  Free tier: <span className="text-emerald-400">{item.freeTier}</span>
                </div>
              </GlassPanel>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
