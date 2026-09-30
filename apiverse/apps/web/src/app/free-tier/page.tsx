'use client';

import React, { useState, useEffect } from 'react';
import { GlassPanel, Badge, SpaceButton } from '@apiverse/ui';
import { HelpCircle, Check, CreditCard, Shield } from 'lucide-react';

export default function FreeTierPage() {
  const [gauges, setGauges] = useState<any[]>([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/v1/free-tier/gauges')
      .then((r) => r.json())
      .then((d) => setGauges(d))
      .catch(() => {});
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-white flex items-center gap-2">
          <HelpCircle className="w-6 h-6 text-cyan-400" />
          <span>FREE TIER FINDER & FUEL GAUGES</span>
        </h1>
        <p className="text-xs text-slate-400 font-mono mt-1">
          Monitor your real consumption against provider free limits with live fuel gauges.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {gauges.map((g, idx) => (
          <GlassPanel key={idx} className="p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-base text-white">{g.service}</h3>
              <Badge variant={g.percentUsed > 80 ? 'error' : 'healthy'}>
                {g.percentUsed}% FUEL USED
              </Badge>
            </div>

            <div className="space-y-1.5 font-mono text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Free Tier Allowance:</span>
                <span className="text-slate-200">{g.freeLimit}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Current Consumption:</span>
                <span className="text-cyan-300">{g.currentUsage} / {g.maxQuota} {g.unit}</span>
              </div>
            </div>

            {/* Fuel Gauge Bar */}
            <div className="w-full bg-space-950 h-2.5 rounded-full overflow-hidden border border-white/10">
              <div
                className={`h-full transition-all duration-500 ${
                  g.percentUsed > 80
                    ? 'bg-red-500 shadow-[0_0_10px_#ef4444]'
                    : 'bg-gradient-to-r from-cyan-500 to-emerald-400'
                }`}
                style={{ width: `${g.percentUsed}%` }}
              />
            </div>
          </GlassPanel>
        ))}
      </div>
    </div>
  );
}
