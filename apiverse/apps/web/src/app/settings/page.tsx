'use client';

import React from 'react';
import { GlassPanel, Badge, SpaceButton } from '@apiverse/ui';
import { Settings, Shield, CreditCard, Webhook, Users } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-white flex items-center gap-2">
          <Settings className="w-6 h-6 text-cyan-400" />
          <span>WORKSPACE SETTINGS & RBAC</span>
        </h1>
        <p className="text-xs text-slate-400 font-mono mt-1">
          Manage Astronaut Roster, Webhook Endpoints, and SaaS Subscription Tier
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GlassPanel className="p-5 space-y-3">
          <div className="flex items-center gap-2 mb-2">
            <CreditCard className="w-5 h-5 text-amber-400" />
            <h3 className="font-display font-bold text-sm text-white">SaaS Subscription: Team Pro</h3>
          </div>
          <p className="text-xs text-slate-400">
            Active plan includes unlimited API Key Vault planets, Ultron Singularity AI assistant, and real-time WebSocket streams.
          </p>
          <Badge variant="healthy">ACTIVE ($149 / mo)</Badge>
        </GlassPanel>

        <GlassPanel className="p-5 space-y-3">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-5 h-5 text-cyan-400" />
            <h3 className="font-display font-bold text-sm text-white">Security & Audit Policy</h3>
          </div>
          <p className="text-xs text-slate-400">
            Enforced AES-256-GCM hardware key derivation and automated SSRF gateway isolation across all playground proxies.
          </p>
          <Badge variant="healthy">STRICT SECURITY ENFORCED</Badge>
        </GlassPanel>
      </div>
    </div>
  );
}
