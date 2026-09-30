import React from 'react';

interface SpaceButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ultron' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const SpaceButton: React.FC<SpaceButtonProps> = ({
  variant = 'primary',
  size = 'md',
  icon,
  children,
  className = '',
  ...props
}) => {
  const sizeClasses = {
    sm: 'px-2.5 py-1 text-xs gap-1.5',
    md: 'px-4 py-2 text-sm gap-2',
    lg: 'px-6 py-3 text-base gap-2.5'
  }[size];

  const variantClasses = {
    primary: 'bg-nebula-blue/20 hover:bg-nebula-blue/30 text-cyan-300 border border-cyan-500/30 shadow-[0_0_15px_rgba(59,130,246,0.2)] active:scale-[0.98]',
    secondary: 'bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 active:scale-[0.98]',
    ultron: 'bg-gradient-to-r from-ultron-singularity via-purple-950 to-pink-950 text-pink-200 border border-pink-500/40 shadow-[0_0_20px_rgba(236,72,153,0.3)] hover:border-pink-400/70 active:scale-[0.98]',
    ghost: 'bg-transparent hover:bg-white/5 text-slate-400 hover:text-slate-200 border border-transparent',
    danger: 'bg-red-950/40 hover:bg-red-900/50 text-red-200 border border-red-500/40 shadow-[0_0_15px_rgba(239,68,68,0.25)] active:scale-[0.98]'
  }[variant];

  return (
    <button
      className={`inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 cursor-pointer ${sizeClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};
