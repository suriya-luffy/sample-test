'use client';

import React, { useState, useEffect } from 'react';
import { GlassPanel, Badge, SpaceButton } from '@apiverse/ui';
import { Compass, Search, ExternalLink, Zap, Layers } from 'lucide-react';

export default function ApiExplorerPage() {
  const [apis, setApis] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  useEffect(() => {
    fetch('http://localhost:8000/api/v1/explorer/apis')
      .then((r) => r.json())
      .then((d) => setApis(d))
      .catch(() => {});
  }, []);

  const filtered = apis.filter((a) => {
    const matchesSearch = a.name.toLowerCase().includes(search.toLowerCase()) || a.description.toLowerCase().includes(search.toLowerCase());
    const matchesCat = selectedCategory === 'ALL' || a.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-display font-bold text-white flex items-center gap-2">
          <Compass className="w-6 h-6 text-cyan-400" />
          <span>API EXPLORER & CONSTELLATIONS</span>
        </h1>
        <p className="text-xs text-slate-400 font-mono mt-1">
          Explore production-grade developer APIs grouped into celestial constellations.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search API constellation (e.g. Stripe, OpenAI, SMS, Postgres)..."
            className="w-full bg-space-900 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-cyan-500/50"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          {['ALL', 'Fintech & Billing', 'AI & Machine Learning', 'Messaging & Voice', 'Developer Tools', 'Databases & Storage'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors shrink-0 ${
                selectedCategory === cat
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                  : 'bg-white/5 text-slate-400 hover:text-white border border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* API Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((api) => (
          <GlassPanel key={api.id} glow="cyan" className="p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl">{api.icon}</span>
                  <div>
                    <h3 className="font-display font-bold text-base text-white">{api.name}</h3>
                    <span className="text-[10px] font-mono text-cyan-400">
                      Constellation: {api.constellation}
                    </span>
                  </div>
                </div>
                <Badge variant={api.pricing === 'FREE' ? 'healthy' : 'neutral'}>
                  {api.pricing}
                </Badge>
              </div>

              <p className="text-xs text-slate-300 line-clamp-3 mt-2 leading-relaxed">
                {api.description}
              </p>
            </div>

            <div className="mt-5 pt-4 border-t border-white/10 space-y-2 text-xs font-mono">
              <div className="flex justify-between text-slate-400">
                <span>Free Tier:</span>
                <span className="text-slate-200 text-right">{api.freeTierLimit}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Uptime / Latency:</span>
                <span className="text-emerald-400">{api.uptime99}% / {api.latencyMs}ms</span>
              </div>
            </div>
          </GlassPanel>
        ))}
      </div>
    </div>
  );
}
