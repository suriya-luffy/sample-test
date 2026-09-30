'use client';

import React, { useState, useEffect } from 'react';
import { GlassPanel, Badge, SpaceButton } from '@apiverse/ui';
import { BellRing, Flame, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { SolarFlareAlert } from '@/lib/types';

export default function SmartAlertsPage() {
  const [alerts, setAlerts] = useState<SolarFlareAlert[]>([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/v1/alerts/')
      .then((r) => r.json())
      .then((d) => setAlerts(d))
      .catch(() => {});
  }, []);

  const acknowledge = async (id: string) => {
    await fetch(`http://localhost:8000/api/v1/alerts/${id}/acknowledge`, { method: 'POST' });
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, acknowledged: true } : a))
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-display font-bold text-white flex items-center gap-2">
          <BellRing className="w-6 h-6 text-red-400" />
          <span>SMART ALERTS & SOLAR FLARES</span>
        </h1>
        <p className="text-xs text-slate-400 font-mono mt-1">
          Real-time planetary alert pulses • Deduplication & AI incident root-cause summaries
        </p>
      </div>

      <div className="space-y-4">
        {alerts.map((a) => (
          <GlassPanel key={a.id} glow={a.severity === 'CRITICAL' ? 'danger' : 'gold'} className="p-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-2.5">
                <Flame className={`w-5 h-5 ${a.severity === 'CRITICAL' ? 'text-red-400' : 'text-amber-400'}`} />
                <h3 className="font-display font-bold text-sm text-white">{a.ruleName}</h3>
              </div>

              <div className="flex items-center gap-2">
                <Badge variant={a.severity === 'CRITICAL' ? 'error' : 'warning'}>
                  {a.severity}
                </Badge>
                {a.acknowledged ? (
                  <Badge variant="healthy">ACKNOWLEDGED</Badge>
                ) : (
                  <SpaceButton size="sm" variant="danger" onClick={() => acknowledge(a.id)}>
                    Acknowledge Flare
                  </SpaceButton>
                )}
              </div>
            </div>

            <p className="text-xs text-slate-300 mb-3">{a.message}</p>

            {a.aiIncidentSummary && (
              <div className="p-3 bg-space-950 rounded-lg border border-white/5 text-xs font-mono text-cyan-300">
                <span className="text-slate-500 font-bold block mb-1">ULTRON INCIDENT SUMMARY:</span>
                {a.aiIncidentSummary}
              </div>
            )}
          </GlassPanel>
        ))}
      </div>
    </div>
  );
}
