'use client';

import React, { useState, useEffect } from 'react';
import { GlassPanel, Badge, SpaceButton } from '@apiverse/ui';
import { BookOpen, Sparkles, PlaySquare } from 'lucide-react';
import Link from 'next/link';

export default function DocsPage() {
  const [docs, setDocs] = useState<any[]>([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/v1/docs/')
      .then((r) => r.json())
      .then((d) => setDocs(d))
      .catch(() => {});
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-white flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-cyan-400" />
          <span>OPENAPI DOCUMENTATION HUB</span>
        </h1>
        <p className="text-xs text-slate-400 font-mono mt-1">
          Interactive OpenAPI 3.0 Specs with Instant 'Try in Playground' and Ultron Explanations
        </p>
      </div>

      <div className="space-y-4">
        {docs.map((doc) => (
          <GlassPanel key={doc.id} className="p-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
              <div>
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest">{doc.api}</span>
                <h3 className="font-display font-bold text-base text-white">{doc.endpoint}</h3>
              </div>

              <Link href="/playground">
                <SpaceButton size="sm" variant="secondary" icon={<PlaySquare className="w-3.5 h-3.5" />}>
                  Try in Playground
                </SpaceButton>
              </Link>
            </div>

            <p className="text-xs text-slate-300 mb-4">{doc.summary}</p>

            <div className="p-3 bg-space-950 rounded-lg border border-pink-500/20 text-xs font-mono text-pink-200">
              <span className="text-pink-400 font-bold block mb-1">ULTRON ENDPOINT SYNTHESIS:</span>
              {doc.aiExplanation}
            </div>
          </GlassPanel>
        ))}
      </div>
    </div>
  );
}
