'use client';

import React, { useState } from 'react';
import './globals.css';
import { CustomCursor } from '@/components/cursor/CustomCursor';
import { Header } from '@/components/navigation/Header';
import { Sidebar } from '@/components/navigation/Sidebar';
import { WarpPalette } from '@/components/navigation/WarpPalette';
import { UltronAssistantDrawer } from '@/components/ultron/UltronAssistantDrawer';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [warpOpen, setWarpOpen] = useState(false);

  return (
    <html lang="en" className="dark">
      <body className="bg-space-950 text-slate-100 font-sans min-h-screen flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200">
        <CustomCursor />
        <Header onOpenWarp={() => setWarpOpen(true)} />
        <WarpPalette open={warpOpen} onOpenChange={setWarpOpen} />
        
        <div className="flex-1 flex overflow-hidden">
          <Sidebar />
          <main className="flex-1 overflow-y-auto relative p-4 sm:p-6 lg:p-8">
            {children}
          </main>
        </div>

        <UltronAssistantDrawer />
      </body>
    </html>
  );
}
