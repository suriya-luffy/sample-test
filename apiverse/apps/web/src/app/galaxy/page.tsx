'use client';

import React, { useState, useEffect } from 'react';
import { GalaxyScene } from '@/components/3d/GalaxyScene';
import { GlassPanel, Badge, SpaceButton } from '@apiverse/ui';
import { Activity, ShieldCheck, Zap, AlertTriangle, ArrowUpRight, RefreshCw } from 'lucide-react';
import { ApiKeyPlanet, CometTelemetryEvent, SolarFlareAlert } from '@/lib/types';
import { formatCurrency, formatLatency } from '@apiverse/utils';

export default function GalaxyDashboardPage() {
  const [planets, setPlanets] = useState<ApiKeyPlanet[]>([]);
  const [comets, setComets] = useState<CometTelemetryEvent[]>([]);
  const [alerts, setAlerts] = useState<SolarFlareAlert[]>([]);
  const [metrics, setMetrics] = useState<any>(null);

  useEffect(() => {
    // Load live telemetry data from API backend
    fetch('http://localhost:8000/api/v1/vault/planets')
      .then((r) => r.json())
      .then((d) => setPlanets(d))
      .catch(() => {});

    fetch('http://localhost:8000/api/v1/analytics/metrics')
      .then((r) => r.json())
      .then((d) => setMetrics(d))
      .catch(() => {});

    fetch('http://localhost:8000/api/v1/analytics/comets')
      .then((r) => r.json())
      .then((d) => setComets(d))
      .catch(() => {});

    fetch('http://localhost:8000/api/v1/alerts/')
      .then((r) => r.json())
      .then((d) => setAlerts(d))
      .catch(() => {});
  }, []);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-white flex items-center gap-2">
            <span>THE GALAXY DASHBOARD</span>
            <Badge variant="healthy" pulse>LIVE UNIVERSE</Badge>
          </h1>
          <p className="text-xs text-slate-400 font-mono">
            Active Solar System: Alpha-7 • 3 API Planets Orbiting • Sub-second Realtime Fan-out
          </p>
        </div>

        <div className="flex items-center gap-3">
          <SpaceButton size="sm" variant="secondary" icon={<RefreshCw className="w-3.5 h-3.5" />}>
            Re-align Constellation
          </SpaceButton>
        </div>
      </div>

      {/* 3D Galaxy Canvas */}
      <GalaxyScene planets={planets} comets={comets} alerts={alerts} />

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <GlassPanel className="p-4">
          <div className="text-[10px] font-mono text-slate-400 uppercase">24H Requests</div>
          <div className="text-xl font-display font-bold text-cyan-300 mt-1">
            {metrics?.totalRequests24h?.toLocaleString() || '1,542,109'}
          </div>
          <div className="text-[10px] font-mono text-emerald-400 mt-0.5 flex items-center">
            <ArrowUpRight className="w-3 h-3" /> +14.2% vs yesterday
          </div>
        </GlassPanel>

        <GlassPanel className="p-4">
          <div className="text-[10px] font-mono text-slate-400 uppercase">Avg Latency (p95)</div>
          <div className="text-xl font-display font-bold text-slate-100 mt-1">
            {metrics?.p95LatencyMs ? formatLatency(metrics.p95LatencyMs) : '142ms'}
          </div>
          <div className="text-[10px] font-mono text-slate-400 mt-0.5">p99: 310ms</div>
        </GlassPanel>

        <GlassPanel className="p-4">
          <div className="text-[10px] font-mono text-slate-400 uppercase">Error Rate</div>
          <div className="text-xl font-display font-bold text-emerald-400 mt-1">
            {metrics?.errorRatePercent ? `${metrics.errorRatePercent}%` : '0.04%'}
          </div>
          <div className="text-[10px] font-mono text-emerald-400 mt-0.5">Optimal health</div>
        </GlassPanel>

        <GlassPanel className="p-4">
          <div className="text-[10px] font-mono text-slate-400 uppercase">Month Burn Rate</div>
          <div className="text-xl font-display font-bold text-amber-300 mt-1">
            {metrics?.monthCostUsd ? formatCurrency(metrics.monthCostUsd) : '$1,321.80'}
          </div>
          <div className="text-[10px] font-mono text-slate-400 mt-0.5">~$44.06 / day</div>
        </GlassPanel>
      </div>

      {/* Orbiting Planet Status Cards */}
      <div>
        <h2 className="text-sm font-display font-bold text-slate-300 mb-3 tracking-wide uppercase">
          Orbiting API Planets
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {planets.map((p) => (
            <GlassPanel key={p.id} glow={p.health === 'RATE_LIMITED' ? 'danger' : 'cyan'} className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-display font-bold text-sm text-white">{p.name}</span>
                <Badge variant={p.health === 'OPTIMAL' ? 'healthy' : 'error'}>
                  {p.health}
                </Badge>
              </div>
              <div className="space-y-1.5 text-xs font-mono text-slate-400">
                <div className="flex justify-between">
                  <span>Environment:</span>
                  <span className="text-slate-200">{p.environment}</span>
                </div>
                <div className="flex justify-between">
                  <span>Rate Limit:</span>
                  <span className="text-slate-200">{p.currentMinuteUsage} / {p.rateLimitPerMinute} req/min</span>
                </div>
                <div className="flex justify-between">
                  <span>Spend (MTD):</span>
                  <span className="text-amber-300">{formatCurrency(p.costMonthToDate)}</span>
                </div>
              </div>
            </GlassPanel>
          ))}
        </div>
      </div>
    </div>
  );
}
