'use client';

import React, { useState } from 'react';
import { GlassPanel, Badge, SpaceButton } from '@apiverse/ui';
import { PlaySquare, Send, Code, Share2, Shield, Clock, Download } from 'lucide-react';
import { formatBytes, formatLatency } from '@apiverse/utils';

export default function PlaygroundPage() {
  const [method, setMethod] = useState<'GET' | 'POST' | 'PUT' | 'DELETE'>('POST');
  const [url, setUrl] = useState('https://httpbin.org/post');
  const [body, setBody] = useState('{\n  "event": "charge.success",\n  "amount": 2500\n}');
  const [response, setResponse] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const runRequest = async () => {
    setIsLoading(true);
    try {
      const resp = await fetch('http://localhost:8000/api/v1/playground/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          method,
          url,
          headers: { 'X-Requested-By': 'APIVerse-Playground' },
          params: {},
          auth_type: 'none',
          body_type: 'json',
          body
        })
      });
      const data = await resp.json();
      setResponse(data);
    } catch (e: any) {
      setResponse({
        status: 500,
        statusText: 'Client Execution Failure',
        data: { error: e.message }
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-white flex items-center gap-2">
            <PlaySquare className="w-6 h-6 text-cyan-400" />
            <span>POSTMAN-CLASS API PLAYGROUND</span>
          </h1>
          <p className="text-xs text-slate-400 font-mono mt-1">
            SSRF-Protected Server-Side Execution Proxy • Real-time Timing Waterfall
          </p>
        </div>

        <div className="flex items-center gap-2">
          <SpaceButton size="sm" variant="secondary" icon={<Share2 className="w-3.5 h-3.5" />}>
            Share with Team
          </SpaceButton>
        </div>
      </div>

      {/* Request Bar */}
      <div className="flex items-center gap-2 bg-space-900 border border-white/10 rounded-xl p-2">
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value as any)}
          className="bg-space-950 border border-white/10 rounded-lg px-3 py-2 text-xs font-mono font-bold text-cyan-300 outline-none"
        >
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
        </select>

        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://api.example.com/v1/..."
          className="flex-1 bg-transparent px-3 py-2 text-xs font-mono text-white outline-none"
        />

        <SpaceButton
          variant="primary"
          size="md"
          icon={<Send className="w-3.5 h-3.5" />}
          onClick={runRequest}
          disabled={isLoading}
        >
          {isLoading ? 'Executing...' : 'Send'}
        </SpaceButton>
      </div>

      {/* Editor & Response Split */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Request Payload */}
        <GlassPanel className="p-4 flex flex-col h-[400px]">
          <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
            <span className="font-mono text-xs text-slate-300">REQUEST BODY (JSON)</span>
            <Badge variant="neutral">raw/json</Badge>
          </div>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="flex-1 w-full bg-space-950 border border-white/5 rounded-lg p-3 text-xs font-mono text-cyan-200 outline-none resize-none"
          />
        </GlassPanel>

        {/* Response & Timing Waterfall */}
        <GlassPanel className="p-4 flex flex-col h-[400px] overflow-hidden">
          <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-slate-300">RESPONSE</span>
              {response && (
                <Badge variant={response.status === 200 ? 'healthy' : 'error'}>
                  {response.status} {response.statusText}
                </Badge>
              )}
            </div>

            {response?.timing && (
              <span className="text-[11px] font-mono text-cyan-400">
                {formatLatency(response.timing.totalDurationMs)}
              </span>
            )}
          </div>

          {/* Timing Waterfall visualizer if available */}
          {response?.timing && (
            <div className="mb-3 p-2 bg-space-950/60 rounded-lg border border-white/5 space-y-1 text-[10px] font-mono">
              <div className="flex justify-between text-slate-400">
                <span>DNS: {response.timing.dnsLookupMs}ms</span>
                <span>TCP: {response.timing.tcpHandshakeMs}ms</span>
                <span>TLS: {response.timing.tlsNegotiationMs}ms</span>
                <span>TTFB: {response.timing.timeToFirstByteMs}ms</span>
              </div>
            </div>
          )}

          <div className="flex-1 overflow-y-auto bg-space-950 p-3 rounded-lg border border-white/5 font-mono text-xs text-emerald-300 whitespace-pre-wrap">
            {response ? JSON.stringify(response.data, null, 2) : '// Click Send to execute request'}
          </div>
        </GlassPanel>
      </div>
    </div>
  );
}
