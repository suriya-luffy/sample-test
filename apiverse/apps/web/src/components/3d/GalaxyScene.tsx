'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ApiKeyPlanet, CometTelemetryEvent, SolarFlareAlert } from '@/lib/types';

interface GalaxySceneProps {
  planets: ApiKeyPlanet[];
  comets: CometTelemetryEvent[];
  alerts: SolarFlareAlert[];
  onSelectPlanet?: (planet: ApiKeyPlanet) => void;
}

export const GalaxyScene: React.FC<GalaxySceneProps> = ({
  planets,
  comets,
  alerts,
  onSelectPlanet
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [hoveredPlanet, setHoveredPlanet] = useState<string | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;

    // Pre-generate background stars
    const stars = Array.from({ length: 150 }, () => ({
      x: Math.random() * 800,
      y: Math.random() * 500,
      size: Math.random() * 1.5 + 0.5,
      alpha: Math.random()
    }));

    const render = () => {
      time += 0.015;
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // 1. Draw Starfield
      for (const s of stars) {
        ctx.fillStyle = `rgba(255, 255, 255, ${0.2 + 0.6 * Math.sin(time + s.alpha * 10)})`;
        ctx.fillRect(s.x, s.y, s.size, s.size);
      }

      const centerX = w / 2;
      const centerY = h / 2;

      // 2. Center Sun / Solar Core
      const coreGrad = ctx.createRadialGradient(centerX, centerY, 10, centerX, centerY, 70);
      coreGrad.addColorStop(0, '#fef08a');
      coreGrad.addColorStop(0.3, '#f59e0b');
      coreGrad.addColorStop(1, 'rgba(5, 6, 15, 0)');
      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 70, 0, Math.PI * 2);
      ctx.fill();

      // 3. Orbit Rings & Planets (API Keys)
      planets.forEach((p, idx) => {
        const orbitRadius = 90 + idx * 65;
        
        // Orbit ring
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.arc(centerX, centerY, orbitRadius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);

        // Planet Coordinates
        const speed = 0.3 / (idx + 1);
        const angle = time * speed + (idx * Math.PI) / 2;
        const px = centerX + Math.cos(angle) * orbitRadius;
        const py = centerY + Math.sin(angle) * orbitRadius;

        // Has solar flare alert?
        const hasAlert = alerts.some((a) => a.planetId === p.id && !a.acknowledged);

        if (hasAlert) {
          // Solar Flare Supernova Pulse
          ctx.strokeStyle = '#ef4444';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(px, py, 22 + Math.sin(time * 8) * 6, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Planet Body
        const planetGrad = ctx.createRadialGradient(px - 3, py - 3, 2, px, py, 14);
        if (p.service === 'Stripe') {
          planetGrad.addColorStop(0, '#6366f1');
          planetGrad.addColorStop(1, '#312e81');
        } else if (p.service === 'OpenAI') {
          planetGrad.addColorStop(0, '#10b981');
          planetGrad.addColorStop(1, '#064e3b');
        } else {
          planetGrad.addColorStop(0, '#f59e0b');
          planetGrad.addColorStop(1, '#78350f');
        }

        ctx.fillStyle = planetGrad;
        ctx.shadowColor = hasAlert ? '#ef4444' : '#06b6d4';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(px, py, 12, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Planet Label
        ctx.fillStyle = '#e2e8f0';
        ctx.font = '10px JetBrains Mono';
        ctx.fillText(p.name, px - 25, py + 24);
      });

      // 4. Live Comets (Request Beams)
      comets.slice(0, 4).forEach((c, idx) => {
        const progress = ((time * 0.8 + idx * 0.25) % 1);
        const startX = 60 + idx * 180;
        const startY = 40 + idx * 90;
        const targetX = centerX;
        const targetY = centerY;

        const curX = startX + (targetX - startX) * progress;
        const curY = startY + (targetY - startY) * progress;

        ctx.fillStyle = '#00f0ff';
        ctx.shadowColor = '#00f0ff';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(curX, curY, 2.5, 0, Math.PI * 2);
        ctx.fill();

        // Trail
        ctx.strokeStyle = 'rgba(0, 240, 255, 0.4)';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(curX - 12, curY - 6);
        ctx.lineTo(curX, curY);
        ctx.stroke();
        ctx.shadowBlur = 0;
      });

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [planets, comets, alerts]);

  return (
    <div className="relative w-full h-[450px] sm:h-[500px] rounded-2xl overflow-hidden glass-panel border border-white/10 flex items-center justify-center">
      <canvas
        ref={canvasRef}
        width={800}
        height={500}
        className="w-full h-full object-cover cursor-crosshair"
      />
      <div className="absolute top-4 left-4 flex items-center gap-3">
        <span className="text-xs font-mono text-cyan-300 bg-space-950/80 px-3 py-1 rounded-full border border-cyan-500/30">
          GALAXY VIEW: LIVE MOVING
        </span>
      </div>
    </div>
  );
};
