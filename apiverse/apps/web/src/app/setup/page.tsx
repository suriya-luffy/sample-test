'use client';

import React, { useState, useEffect } from 'react';
import { GlassPanel, Badge, SpaceButton } from '@apiverse/ui';
import { Rocket, CheckCircle2, ArrowRight } from 'lucide-react';

export default function SetupAssistantPage() {
  const [steps, setSteps] = useState<any[]>([]);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    fetch('http://localhost:8000/api/v1/setup/steps/Stripe')
      .then((r) => r.json())
      .then((d) => setSteps(d.steps || []))
      .catch(() => {});
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-white flex items-center gap-2">
          <Rocket className="w-6 h-6 text-cyan-400" />
          <span>LAUNCH CHECKLIST & SETUP ASSISTANT</span>
        </h1>
        <p className="text-xs text-slate-400 font-mono mt-1">
          Guided astronaut onboarding wizard with live step-by-step API verification.
        </p>
      </div>

      <div className="space-y-4">
        {steps.map((st, idx) => (
          <GlassPanel key={st.id} glow={idx === currentStep ? 'cyan' : 'none'} className="p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs ${
                  idx < currentStep
                    ? 'bg-emerald-500 text-black font-bold'
                    : idx === currentStep
                    ? 'bg-cyan-500 text-black font-bold'
                    : 'bg-space-950 text-slate-500 border border-white/10'
                }`}>
                  {idx < currentStep ? '✓' : idx + 1}
                </div>
                <div>
                  <h3 className="font-display font-bold text-sm text-white">{st.title}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">{st.desc}</p>
                </div>
              </div>

              {idx === currentStep && (
                <SpaceButton
                  size="sm"
                  variant="primary"
                  onClick={() => setCurrentStep(prev => prev + 1)}
                >
                  Verify & Next
                </SpaceButton>
              )}
            </div>
          </GlassPanel>
        ))}
      </div>
    </div>
  );
}
