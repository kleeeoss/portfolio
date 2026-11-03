'use client';

import React, { useRef, useState, MouseEvent, ReactNode } from 'react';
import { ExternalLink, CheckCircle2 } from 'lucide-react';
import { GithubIcon as Github } from '../common/Icons';
import { FlagshipProject } from '@/lib/types';
import { soundManager } from '@/lib/audio';

interface ProjectCardProps {
  project: FlagshipProject;
  children: ReactNode;
  simulationTitle: string;
}

export function ProjectCard({ project, children, simulationTitle }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [spotlightPos, setSpotlightPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setSpotlightPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative rounded-xl border border-[#1f2127] bg-[#101114] p-5 sm:p-7 transition-all duration-300 group overflow-hidden"
      style={{
        boxShadow: isHovered
          ? '0 0 40px -10px rgba(56, 189, 248, 0.08), 0 10px 30px -10px rgba(0, 0, 0, 0.6)'
          : '0 4px 20px -2px rgba(0, 0, 0, 0.5)',
      }}
    >
      {/* Dynamic Cursor Spotlight Border Glow (Desktop) */}
      <div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:block"
        style={{
          background: `radial-gradient(450px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(56, 189, 248, 0.15), transparent 40%)`,
        }}
      />

      {/* Card Header: Meta + Links */}
      <div className="relative z-10 flex flex-wrap items-start justify-between gap-4 mb-4">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-medium border border-[#38bdf8]/30 bg-[#38bdf8]/10 text-[#38bdf8]">
              {project.deploymentBadge}
            </span>
            <span className="text-xs font-mono text-[#6b7280]">
              ID: {project.id}
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#f3f4f6]">
            {project.name}
          </h3>
          <p className="text-sm font-medium text-[#9ca3af] mt-1">
            {project.tagline}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundManager.playClick(700, 0.01)}
            className="touch-target inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#1f2127] bg-[#0c0d10] hover:bg-[#16181d] hover:border-[#38bdf8]/50 text-xs font-mono text-[#9ca3af] hover:text-[#f3f4f6] transition-all"
            aria-label={`View ${project.name} on GitHub`}
          >
            <Github className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Source</span>
            <ExternalLink className="w-3 h-3 text-[#6b7280]" />
          </a>
        </div>
      </div>

      {/* Description */}
      <p className="relative z-10 text-sm text-[#9ca3af] leading-relaxed mb-5">
        {project.description}
      </p>

      {/* Tech Stack Badges */}
      <div className="relative z-10 flex flex-wrap gap-1.5 mb-6">
        {project.techStack.map((tech) => (
          <span
            key={tech}
            className="px-2 py-0.5 rounded text-[11px] font-mono bg-[#0c0d10] border border-[#1f2127] text-[#9ca3af]"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Verified Empirical Metrics Bar */}
      <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6 p-3 rounded-lg bg-[#0c0d10] border border-[#1f2127]">
        {project.metrics.map((m, idx) => (
          <div key={idx} className="flex flex-col">
            <span className="text-[10px] uppercase tracking-wider text-[#6b7280] font-mono">
              {m.label}
            </span>
            <div className="flex items-center gap-1 my-0.5">
              <span className="text-base sm:text-lg font-bold font-mono text-[#f3f4f6]">
                {m.value}
              </span>
              {m.verified && (
                <CheckCircle2 className="w-3.5 h-3.5 text-[#10b981] shrink-0" />
              )}
            </div>
            {m.benchmarkContext && (
              <span className="text-[10px] text-[#9ca3af] font-mono truncate" title={m.benchmarkContext}>
                {m.benchmarkContext}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* In-Browser Interactive Systems Simulation Module */}
      <div className="relative z-10 mt-6 pt-6 border-t border-[#1f2127]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#38bdf8] animate-pulse" />
            <h4 className="text-xs uppercase font-mono tracking-wider font-semibold text-[#38bdf8]">
              {simulationTitle}
            </h4>
          </div>
          <span className="text-[11px] font-mono text-[#6b7280]">
            Live In-Browser Simulation
          </span>
        </div>

        {/* Child Simulation Component */}
        <div className="rounded-lg border border-[#1f2127] bg-[#0c0d10] overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}
