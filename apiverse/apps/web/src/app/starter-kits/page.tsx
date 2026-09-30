'use client';

import React, { useState } from 'react';
import { GlassPanel, Badge, SpaceButton } from '@apiverse/ui';
import { Boxes, Download, Check, FileCode, Folder } from 'lucide-react';

export default function StarterKitsPage() {
  const [projectName, setProjectName] = useState('my-apiverse-app');
  const [stack, setStack] = useState<'nextjs' | 'fastapi' | 'express'>('nextjs');
  const [selectedApis, setSelectedApis] = useState<string[]>(['stripe', 'openai', 'supabase']);

  const toggleApi = (api: string) => {
    if (selectedApis.includes(api)) {
      setSelectedApis(selectedApis.filter((x) => x !== api));
    } else {
      setSelectedApis([...selectedApis, api]);
    }
  };

  const handleDownload = async () => {
    const resp = await fetch('http://localhost:8000/api/v1/starter-kit/download', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: projectName,
        stack,
        selected_apis: selectedApis,
        include_docker: true,
        include_auth: true
      })
    });
    const blob = await resp.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${projectName}_starter.zip`;
    a.click();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-display font-bold text-white flex items-center gap-2">
          <Boxes className="w-6 h-6 text-cyan-400" />
          <span>PRODUCTION STARTER KIT GENERATOR</span>
        </h1>
        <p className="text-xs text-slate-400 font-mono mt-1">
          Generate production-ready scaffolding with live file tree preview and downloadable ZIP archive.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Configuration Form */}
        <GlassPanel className="p-5 lg:col-span-2 space-y-5">
          <div>
            <label className="text-xs font-mono text-slate-400 block mb-1">Project Name</label>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="w-full bg-space-950 border border-white/10 rounded-lg p-2.5 text-xs text-white outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="text-xs font-mono text-slate-400 block mb-2">Target Stack</label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'nextjs', label: 'Next.js 14 App Router' },
                { id: 'fastapi', label: 'FastAPI Python 3.11' },
                { id: 'express', label: 'Express TypeScript' }
              ].map((s) => (
                <button
                  key={s.id}
                  onClick={() => setStack(s.id as any)}
                  className={`p-3 rounded-lg border text-xs font-mono text-left transition-all ${
                    stack === s.id
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200'
                      : 'bg-space-950 border-white/10 text-slate-400 hover:text-white'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-mono text-slate-400 block mb-2">Integrated APIs</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {['stripe', 'openai', 'supabase', 'twilio', 'resend', 'github'].map((api) => {
                const active = selectedApis.includes(api);
                return (
                  <button
                    key={api}
                    onClick={() => toggleApi(api)}
                    className={`p-2.5 rounded-lg border text-xs font-mono flex items-center justify-between transition-all ${
                      active
                        ? 'bg-purple-500/20 border-purple-400 text-purple-200'
                        : 'bg-space-950 border-white/10 text-slate-400 hover:text-white'
                    }`}
                  >
                    <span className="capitalize">{api}</span>
                    {active && <Check className="w-3.5 h-3.5 text-purple-400" />}
                  </button>
                );
              })}
            </div>
          </div>

          <SpaceButton
            variant="primary"
            size="lg"
            icon={<Download className="w-4 h-4" />}
            onClick={handleDownload}
            className="w-full mt-4"
          >
            Download {projectName}.zip
          </SpaceButton>
        </GlassPanel>

        {/* Right: Live File Tree Preview */}
        <GlassPanel glow="cyan" className="p-5 font-mono text-xs">
          <div className="text-xs font-bold text-white mb-3 flex items-center gap-2">
            <Folder className="w-4 h-4 text-cyan-400" />
            <span>Archive File Structure</span>
          </div>

          <div className="space-y-1.5 text-slate-300">
            <div className="flex items-center gap-1.5 text-cyan-300">
              <Folder className="w-3.5 h-3.5" /> {projectName}/
            </div>
            <div className="pl-4 flex items-center gap-1.5 text-slate-400">
              <FileCode className="w-3.5 h-3.5" /> README.md
            </div>
            <div className="pl-4 flex items-center gap-1.5 text-slate-400">
              <FileCode className="w-3.5 h-3.5" /> .env.example
            </div>
            <div className="pl-4 flex items-center gap-1.5 text-slate-400">
              <FileCode className="w-3.5 h-3.5" /> Dockerfile
            </div>
            <div className="pl-4 flex items-center gap-1.5 text-cyan-300">
              <Folder className="w-3.5 h-3.5" /> src/
            </div>
            <div className="pl-8 flex items-center gap-1.5 text-slate-400">
              <FileCode className="w-3.5 h-3.5" /> index.ts
            </div>
            {selectedApis.map((api) => (
              <div key={api} className="pl-8 flex items-center gap-1.5 text-purple-300">
                <FileCode className="w-3.5 h-3.5" /> {api}.client.ts
              </div>
            ))}
          </div>
        </GlassPanel>
      </div>
    </div>
  );
}
