'use client';

import React, { useState } from 'react';
import { SpaceButton } from '@apiverse/ui';
import { Atom, Send, X, Sparkles, ChevronRight, Terminal } from 'lucide-react';
import { ModelProvider } from '@/lib/types';

export const UltronAssistantDrawer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [model, setModel] = useState<ModelProvider>('GEMINI');
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; text: string }>>([
    {
      role: 'assistant',
      text: 'I am Ultron. Singularity core online. How may I assist your architectural synthesis today?'
    }
  ]);
  const [isStreaming, setIsStreaming] = useState(false);

  const sendMessage = async () => {
    if (!input.trim() || isStreaming) return;
    const userPrompt = input;
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', text: userPrompt }]);
    setIsStreaming(true);

    try {
      const response = await fetch('http://localhost:8000/api/v1/ultron/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userPrompt,
          model,
          context_keys: ['Stripe', 'OpenAI'],
          include_playground_history: true
        })
      });

      if (!response.body) return;
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantMsg = '';

      setMessages((prev) => [...prev, { role: 'assistant', text: '' }]);

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const token = line.replace('data: ', '');
            if (token !== '[DONE]') {
              assistantMsg += token;
              setMessages((prev) => {
                const copy = [...prev];
                copy[copy.length - 1] = { role: 'assistant', text: assistantMsg };
                return copy;
              });
            }
          }
        }
      }
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', text: 'Singularity stream interrupted. Re-synchronizing quantum core.' }
      ]);
    } finally {
      setIsStreaming(false);
    }
  };

  return (
    <>
      {/* Floating Singularity Beacon Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        data-cursor="ultron"
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-gradient-to-tr from-pink-600 via-purple-700 to-black p-[2px] shadow-[0_0_30px_rgba(236,72,153,0.5)] hover:scale-105 active:scale-95 transition-transform"
      >
        <div className="w-full h-full bg-space-950 rounded-full flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-pink-500/20 animate-ping rounded-full" />
          <Atom className="w-7 h-7 text-pink-400 animate-spin" style={{ animationDuration: '15s' }} />
        </div>
      </button>

      {/* Ultron Chat Drawer */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 w-96 max-w-[calc(100vw-2rem)] h-[550px] bg-space-950/95 border border-pink-500/40 rounded-2xl shadow-[0_0_50px_rgba(236,72,153,0.25)] backdrop-blur-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="p-3 border-b border-white/10 bg-pink-950/20 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Atom className="w-5 h-5 text-pink-400" />
              <div>
                <div className="font-display font-bold text-xs text-pink-200">ULTRON SINGULARITY</div>
                <div className="text-[10px] font-mono text-slate-400">Broken Event Horizon</div>
              </div>
            </div>

            {/* Model Selector */}
            <select
              value={model}
              onChange={(e) => setModel(e.target.value as ModelProvider)}
              className="bg-black/50 border border-white/10 rounded px-2 py-1 text-[10px] font-mono text-cyan-300 outline-none"
            >
              <option value="GEMINI">Gemini 1.5 Pro</option>
              <option value="ANTHROPIC">Claude 3.5 Sonnet</option>
              <option value="OPENAI">GPT-4o</option>
            </select>

            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-3 overflow-y-auto space-y-3 font-sans text-xs">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-xl border ${
                  m.role === 'user'
                    ? 'ml-8 bg-nebula-blue/20 border-cyan-500/30 text-cyan-100'
                    : 'mr-6 bg-pink-950/20 border-pink-500/30 text-slate-200'
                }`}
              >
                <div className="text-[9px] font-mono mb-1 text-slate-400">
                  {m.role === 'user' ? 'ASTRONAUT' : 'ULTRON'}
                </div>
                <div className="whitespace-pre-wrap leading-relaxed">{m.text}</div>
              </div>
            ))}
          </div>

          {/* Input Bar */}
          <div className="p-3 border-t border-white/10 bg-space-900/50 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Ask Ultron to debug, craft cURL, or write code..."
              className="flex-1 bg-black/60 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-pink-500/60"
            />
            <SpaceButton variant="ultron" size="sm" onClick={sendMessage}>
              <Send className="w-3.5 h-3.5" />
            </SpaceButton>
          </div>
        </div>
      )}
    </>
  );
};
