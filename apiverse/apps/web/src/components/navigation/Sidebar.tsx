'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Globe,
  KeyRound,
  PlaySquare,
  BarChart3,
  BellRing,
  BookOpen,
  Atom,
  Boxes,
  HelpCircle,
  GraduationCap,
  Users,
  Compass,
  Rocket,
  Settings
} from 'lucide-react';

const NAV_ITEMS = [
  { href: '/galaxy', label: 'Galaxy Dashboard', icon: Globe, highlight: 'cyan' },
  { href: '/explorer', label: 'API Explorer', icon: Compass },
  { href: '/vault', label: 'API Key Vault', icon: KeyRound, highlight: 'gold' },
  { href: '/playground', label: 'Playground', icon: PlaySquare },
  { href: '/analytics', label: 'Galaxy Metrics', icon: BarChart3 },
  { href: '/alerts', label: 'Smart Alerts', icon: BellRing, badge: '1' },
  { href: '/ultron', label: 'Ultron Singularity', icon: Atom, highlight: 'ultron' },
  { href: '/docs', label: 'Docs Hub', icon: BookOpen },
  { href: '/setup', label: 'Setup Assistant', icon: Rocket },
  { href: '/free-tier', label: 'Free Tier Finder', icon: HelpCircle },
  { href: '/recommender', label: 'AI Recommender', icon: SparkleIcon },
  { href: '/starter-kits', label: 'Starter Kits', icon: Boxes },
  { href: '/community', label: 'Community', icon: Users },
  { href: '/learning', label: 'Mission Map', icon: GraduationCap },
  { href: '/settings', label: 'Settings & RBAC', icon: Settings }
];

function SparkleIcon(props: any) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  );
}

export const Sidebar: React.FC = () => {
  const pathname = usePathname();

  return (
    <aside className="w-60 border-r border-white/10 bg-space-950/60 backdrop-blur-xl shrink-0 hidden lg:flex flex-col justify-between p-3 select-none">
      <div className="space-y-1">
        <div className="px-3 py-2 text-[10px] font-mono tracking-widest text-slate-500 uppercase">
          Universe Systems
        </div>
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all group ${
                isActive
                  ? item.highlight === 'ultron'
                    ? 'bg-gradient-to-r from-pink-950/40 to-purple-950/40 text-pink-300 border border-pink-500/30'
                    : 'bg-nebula-blue/20 text-cyan-300 border border-cyan-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon
                  className={`w-4 h-4 transition-colors ${
                    isActive
                      ? item.highlight === 'ultron'
                        ? 'text-pink-400'
                        : 'text-cyan-400'
                      : 'text-slate-500 group-hover:text-slate-300'
                  }`}
                />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono bg-red-500/20 text-red-400 border border-red-500/30">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </div>

      {/* Bottom Solar Flare Status Card */}
      <div className="p-3 rounded-xl bg-space-900/60 border border-white/10 text-xs">
        <div className="flex items-center justify-between mb-1.5">
          <span className="font-mono text-[10px] text-slate-400">PLANETARY SHIELD</span>
          <span className="text-[10px] font-mono text-emerald-400">100% ONLINE</span>
        </div>
        <div className="w-full bg-space-950 h-1.5 rounded-full overflow-hidden">
          <div className="bg-gradient-to-r from-cyan-500 to-emerald-400 h-full w-full" />
        </div>
      </div>
    </aside>
  );
};
