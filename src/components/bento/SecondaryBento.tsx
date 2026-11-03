'use client';

import React, { useState } from 'react';
import { ExternalLink, ArrowUpRight, Shield, Layers, Radio, Sparkles, X } from 'lucide-react';
import { GithubIcon as Github } from '../common/Icons';
import { SECONDARY_PROJECTS } from '@/lib/constants';
import { SecondaryProject } from '@/lib/types';
import { soundManager } from '@/lib/audio';

export function SecondaryBento() {
  const [selectedProject, setSelectedProject] = useState<SecondaryProject | null>(null);

  const getDomainIcon = (domain: string) => {
    if (domain.includes('DevSecOps') || domain.includes('Hardening') || domain.includes('Cryptography')) {
      return <Shield className="w-4 h-4 text-[#ef4444]" />;
    }
    if (domain.includes('Analytics') || domain.includes('Intervention')) {
      return <Radio className="w-4 h-4 text-[#38bdf8]" />;
    }
    if (domain.includes('Desktop') || domain.includes('Synthesis')) {
      return <Sparkles className="w-4 h-4 text-[#10b981]" />;
    }
    return <Layers className="w-4 h-4 text-[#f59e0b]" />;
  };

  return (
    <section id="bento" aria-labelledby="bento-heading" className="py-16 md:py-24 border-t border-[#1f2127]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#10b981]" />
              <span className="text-xs uppercase font-mono tracking-wider font-semibold text-[#10b981]">
                Systems & Specialized Harnesses
              </span>
            </div>
            <h2 id="bento-heading" className="text-2xl sm:text-4xl font-bold tracking-tight text-[#f3f4f6]">
              Secondary Engineering Bento Grid
            </h2>
          </div>
          <p className="text-sm text-[#9ca3af] max-w-md">
            Specialized regression testbeds, cryptographic asset sanitization, forensic explainability scoring, and desktop background runtimes.
          </p>
        </div>

        {/* High Density Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SECONDARY_PROJECTS.map((proj) => (
            <div
              key={proj.id}
              onClick={() => {
                soundManager.playClick(700, 0.01);
                setSelectedProject(proj);
              }}
              className="group relative p-5 rounded-xl border border-[#1f2127] bg-[#101114] hover:bg-[#16181d] hover:border-[#2e323b] transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    {getDomainIcon(proj.domain)}
                    <span className="text-[11px] font-mono text-[#6b7280]">
                      {proj.domain}
                    </span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[#6b7280] group-hover:text-[#38bdf8] transition-colors" />
                </div>

                <h3 className="text-lg font-bold font-mono text-[#f3f4f6] group-hover:text-[#38bdf8] transition-colors mb-2">
                  {proj.name}
                </h3>

                <p className="text-xs text-[#9ca3af] leading-relaxed mb-4">
                  {proj.description}
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[#1f2127]">
                  {proj.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#0c0d10] border border-[#1f2127] text-[#9ca3af]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Inspection Modal / Dialog */}
      {selectedProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-project-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setSelectedProject(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-xl border border-[#1f2127] bg-[#101114] p-4 sm:p-6 shadow-2xl space-y-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-xs font-mono text-[#38bdf8]">
                  {selectedProject.domain}
                </span>
                <h3 id="modal-project-title" className="text-xl font-bold font-mono text-[#f3f4f6]">
                  {selectedProject.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                aria-label="Close dialog"
                className="touch-target p-1.5 rounded-lg border border-[#1f2127] hover:bg-[#1f2127] text-[#9ca3af] hover:text-[#f3f4f6]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-sm text-[#9ca3af] leading-relaxed">
              {selectedProject.description}
            </p>

            <div className="p-3 rounded-lg bg-[#08080a] border border-[#1f2127]">
              <div className="text-[11px] font-mono uppercase text-[#6b7280] mb-1">
                Architecture & Invariant Details
              </div>
              <p className="text-xs text-[#f3f4f6] font-mono leading-relaxed">
                {selectedProject.architectureNotes}
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {selectedProject.techStack.map((t) => (
                <span
                  key={t}
                  className="px-2 py-0.5 rounded text-xs font-mono bg-[#0c0d10] border border-[#1f2127] text-[#9ca3af]"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#1f2127]">
              <button
                onClick={() => setSelectedProject(null)}
                className="touch-target px-4 py-2 rounded-lg border border-[#1f2127] text-xs font-mono text-[#9ca3af] hover:text-[#f3f4f6]"
              >
                Close
              </button>
              <a
                href={selectedProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundManager.playClick(700, 0.01)}
                className="touch-target inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#38bdf8] text-[#08080a] font-mono font-medium text-xs hover:bg-[#38bdf8]/90 transition-all"
              >
                <Github className="w-3.5 h-3.5" />
                <span>View on GitHub</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
