'use client';

import React, { useState } from 'react';
import { UltronBlackHole } from '@/components/3d/UltronBlackHole';
import { GlassPanel, Badge, SpaceButton } from '@apiverse/ui';
import { Atom, Send, Sparkles, Terminal, Code2, ShieldAlert } from 'lucide-react';
import { ModelProvider, UltronState } from '@/lib/types';

export default function UltronPage() {
  const [model, setModel] = useState<ModelProvider>('GEMINI');
  const [ultronState, setUltronState] = useState<UltronState>('idle');
  const [prompt, setPrompt] = useState('');
  const [output, setOutput] = useState(
    'Ultron singularity core online. Cracked event horizon stable at 60fps. Ready for cross-model code synthesis and autonomous debugging.'
  );

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setUltronState('thinking');
    setOutput('Ultron singularity is contracting... synthesizing response across neural models...');

    try {
      const resp = await fetch('http://localhost:8000/api/v1/ultron/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: prompt,
          model,
          context_keys: ['Stripe', 'OpenAI'],
          include_playground_history: true
        })
      });

      setUltronState('streaming');
      if (!resp.body) return;
      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = '';

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const token = line.replace('data: ', '');
            if (token !== '[DONE]') {
              accumulated += token;
              setOutput(accumulated);
            }
          }
        }
      }
      setUltronState('success');
    } catch (e) {
      setUltronState('error');
      setOutput('Singularity anomaly detected. Failed to contact AI engine.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-white flex items-center gap-2">
            <Atom className="w-6 h-6 text-pink-400" />
            <span>ULTRON SINGULARITY CHAMBER</span>
          </h1>
          <p className="text-xs text-slate-400 font-mono mt-1">
            The Destroyed Black Hole AI Developer Assistant • Cursor Reactive Gravitational Lensing
          </p>
        </div>

        <Badge variant="nebula" pulse>NEURAL MATRIX ONLINE</Badge>
      </div>

      {/* 3D Black Hole Centerpiece */}
      <div className="flex justify-center my-4">
        <UltronBlackHole state={ultronState} />
      </div>

      {/* Intelligence Console */}
      <GlassPanel glow="purple" className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-pink-400" />
            <span className="font-mono text-xs text-pink-200">ULTRON REASONING CONSOLE</span>
          </div>

          {/* Model Switcher */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-slate-400">Model Engine:</span>
            <select
              value={model}
              onChange={(e) => setModel(e.target.value as any)}
              className="bg-space-950 border border-white/10 rounded px-2.5 py-1 text-xs font-mono text-cyan-300 outline-none"
            >
              <option value="GEMINI">Google Gemini 1.5 Pro</option>
              <option value="ANTHROPIC">Anthropic Claude 3.5 Sonnet</option>
              <option value="OPENAI">OpenAI GPT-4o</option>
            </select>
          </div>
        </div>

        <div className="p-4 bg-space-950/80 rounded-xl border border-white/5 font-mono text-xs text-slate-200 leading-relaxed whitespace-pre-wrap min-h-[140px]">
          {output}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
            placeholder="Command Ultron: e.g. 'Synthesize a Stripe webhook signature validator with replay protection'..."
            className="flex-1 bg-space-950 border border-white/10 rounded-lg px-4 py-2.5 text-xs text-white placeholder-slate-500 outline-none focus:border-pink-500/60"
          />
          <SpaceButton variant="ultron" size="md" icon={<Send className="w-4 h-4" />} onClick={handleGenerate}>
            Transmit
          </SpaceButton>
        </div>
      </GlassPanel>
    </div>
  );
}
