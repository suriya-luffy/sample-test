import React from 'react';

interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  glow?: 'cyan' | 'purple' | 'gold' | 'danger' | 'none';
  variant?: 'subtle' | 'standard' | 'heavy';
  children: React.ReactNode;
}

export const GlassPanel: React.FC<GlassPanelProps> = ({
  glow = 'none',
  variant = 'standard',
  className = '',
  children,
  ...props
}) => {
  const glowClasses = {
    none: 'border-white/10 hover:border-white/20',
    cyan: 'border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.15)] hover:border-cyan-400/50',
    purple: 'border-purple-500/30 shadow-[0_0_20px_rgba(139,92,246,0.15)] hover:border-purple-400/50',
    gold: 'border-amber-500/30 shadow-[0_0_20px_rgba(245,158,11,0.15)] hover:border-amber-400/50',
    danger: 'border-red-500/40 shadow-[0_0_20px_rgba(239,68,68,0.2)] hover:border-red-400/60'
  }[glow];

  const bgClasses = {
    subtle: 'bg-space-900/40 backdrop-blur-md',
    standard: 'bg-space-900/70 backdrop-blur-xl',
    heavy: 'bg-space-950/90 backdrop-blur-2xl'
  }[variant];

  return (
    <div
      className={`rounded-xl border transition-all duration-300 relative overflow-hidden ${bgClasses} ${glowClasses} ${className}`}
      {...props}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.04] to-transparent pointer-events-none" />
      <div className="relative z-10">{children}</div>
    </div>
  );
};
