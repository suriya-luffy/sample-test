import React from 'react';

interface BadgeProps {
  variant?: 'healthy' | 'warning' | 'error' | 'neutral' | 'nebula';
  children: React.ReactNode;
  pulse?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'neutral',
  pulse = false,
  children
}) => {
  const styles = {
    healthy: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    warning: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    error: 'bg-red-500/10 text-red-400 border-red-500/30',
    neutral: 'bg-slate-800/50 text-slate-400 border-slate-700/50',
    nebula: 'bg-purple-500/10 text-purple-300 border-purple-500/30'
  }[variant];

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono border ${styles}`}>
      {pulse && (
        <span className={`w-1.5 h-1.5 rounded-full ${
          variant === 'healthy' ? 'bg-emerald-400 animate-ping' :
          variant === 'error' ? 'bg-red-400 animate-ping' :
          'bg-cyan-400 animate-ping'
        }`} />
      )}
      {children}
    </span>
  );
};
