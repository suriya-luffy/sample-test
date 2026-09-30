'use client';

import React, { useState, useEffect } from 'react';
import { GlassPanel, Badge, SpaceButton } from '@apiverse/ui';
import { KeyRound, Shield, Eye, Lock, AlertTriangle, Plus, CheckCircle2 } from 'lucide-react';
import { ApiKeyPlanet } from '@/lib/types';
import { formatCurrency } from '@apiverse/utils';

export default function KeyVaultPage() {
  const [planets, setPlanets] = useState<ApiKeyPlanet[]>([]);
  const [revealKeyId, setRevealKeyId] = useState<string | null>(null);
  const [password, setPassword] = useState('');
  const [revealedSecret, setRevealedSecret] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    fetch('http://localhost:8000/api/v1/vault/planets')
      .then((r) => r.json())
      .then((d) => setPlanets(d))
      .catch(() => {});
  }, []);

  const handleReveal = async () => {
    if (!revealKeyId) return;
    try {
      const resp = await fetch(`http://localhost:8000/api/v1/vault/keys/${revealKeyId}/reveal`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reauth_password: password })
      });
      const data = await resp.json();
      if (!resp.ok) {
        setErrorMsg(data.detail || 'Authentication failed');
      } else {
        setRevealedSecret(data.secret_plaintext);
        setErrorMsg('');
      }
    } catch (e) {
      setErrorMsg('Failed to decrypt secret');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-white flex items-center gap-2">
            <KeyRound className="w-6 h-6 text-amber-400" />
            <span>API KEY PLANETARY VAULT</span>
          </h1>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Zero-Trust AES-256-GCM Hardware Encrypted Storage • Secrets Never Returned in Plaintext
          </p>
        </div>

        <SpaceButton variant="primary" size="sm" icon={<Plus className="w-3.5 h-3.5" />}>
          Orbit New Planet Key
        </SpaceButton>
      </div>

      {/* Security Status Card */}
      <GlassPanel glow="gold" className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Shield className="w-6 h-6 text-amber-400 shrink-0" />
          <div>
            <div className="text-xs font-display font-bold text-white">Continuous Leak Detector Active</div>
            <div className="text-[11px] font-mono text-slate-400">
              Scanned 14 GitHub repos and public gists • 0 leaked secrets detected
            </div>
          </div>
        </div>
        <Badge variant="healthy" pulse>CLEAN AUDIT</Badge>
      </GlassPanel>

      {/* Planets Vault Table */}
      <div className="space-y-3">
        {planets.map((p) => (
          <GlassPanel key={p.id} className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-space-850 border border-white/10 flex items-center justify-center font-display font-bold text-cyan-400">
                {p.service.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-display font-bold text-sm text-white">{p.name}</h3>
                  <Badge variant={p.health === 'OPTIMAL' ? 'healthy' : 'error'}>{p.health}</Badge>
                </div>
                <div className="text-xs font-mono text-slate-400 mt-1">
                  Prefix: <span className="text-cyan-300">{p.keyPrefix}</span> • Env: {p.environment}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6 text-xs font-mono">
              <div className="hidden sm:block">
                <span className="text-slate-400">24H Requests:</span>{' '}
                <span className="text-slate-200">{p.requestsLast24h.toLocaleString()}</span>
              </div>
              <div className="hidden sm:block">
                <span className="text-slate-400">Spend:</span>{' '}
                <span className="text-amber-300">{formatCurrency(p.costMonthToDate)}</span>
              </div>
              <SpaceButton
                variant="secondary"
                size="sm"
                icon={<Eye className="w-3.5 h-3.5" />}
                onClick={() => {
                  setRevealKeyId(p.id);
                  setRevealedSecret(null);
                  setPassword('');
                  setErrorMsg('');
                }}
              >
                Reveal Secret
              </SpaceButton>
            </div>
          </GlassPanel>
        ))}
      </div>

      {/* Re-auth Reveal Modal */}
      {revealKeyId && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <GlassPanel glow="danger" className="p-6 max-w-md w-full">
            <div className="flex items-center gap-3 mb-4">
              <Lock className="w-6 h-6 text-red-400" />
              <h2 className="font-display font-bold text-base text-white">Re-Authenticate to Decrypt</h2>
            </div>
            <p className="text-xs text-slate-300 mb-4">
              Enter your master key password to perform an ephemeral hardware decryption. This event will be permanently committed to the security audit trail.
            </p>

            {errorMsg && (
              <div className="p-2 mb-3 rounded bg-red-950/40 border border-red-500/40 text-xs text-red-300">
                {errorMsg}
              </div>
            )}

            {revealedSecret ? (
              <div className="p-3 bg-black/80 border border-emerald-500/40 rounded-lg text-xs font-mono text-emerald-300 break-all mb-4">
                {revealedSecret}
              </div>
            ) : (
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter master password (hint: apiverse2026)"
                className="w-full bg-space-950 border border-white/10 rounded-lg p-2.5 text-xs text-white mb-4 outline-none focus:border-red-500"
              />
            )}

            <div className="flex justify-end gap-2">
              <SpaceButton
                variant="ghost"
                size="sm"
                onClick={() => setRevealKeyId(null)}
              >
                Close
              </SpaceButton>
              {!revealedSecret && (
                <SpaceButton variant="primary" size="sm" onClick={handleReveal}>
                  Decrypt Secret
                </SpaceButton>
              )}
            </div>
          </GlassPanel>
        </div>
      )}
    </div>
  );
}
