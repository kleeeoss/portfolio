'use client';

import React from 'react';
import {
  FileText,
  Terminal,
  Command,
  ArrowRight,
  Mail,
  MapPin,
  ShieldCheck,
  Cpu,
  Layers,
  Database,
} from 'lucide-react';
import { GithubIcon as Github, LinkedinIcon as Linkedin } from '../common/Icons';
import { PERSONAL_INFO } from '@/lib/constants';
import { soundManager } from '@/lib/audio';
import { useToast } from '../common/Toast';

interface HeroSectionProps {
  onOpenCommandPalette: () => void;
  onToggleTerminal: () => void;
}

export function HeroSection({ onOpenCommandPalette, onToggleTerminal }: HeroSectionProps) {
  const { toast } = useToast();

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PERSONAL_INFO.email);
      toast('Email Copied to Clipboard', PERSONAL_INFO.email, 'success');
    } catch {
      toast('Email', PERSONAL_INFO.email, 'default');
    }
  };

  return (
    <section aria-labelledby="hero-heading" className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
      {/* Subtle background coordinate grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      {/* Subtle radial spotlight gradient behind hero */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#38bdf8]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          {/* Status pill & location identifier */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md border border-[#1f2127] bg-[#101114] text-xs font-mono text-[#9ca3af]">
              <MapPin className="w-3.5 h-3.5 text-[#38bdf8]" />
              <span>{PERSONAL_INFO.location}</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md border border-[#1f2127] bg-[#101114] text-xs font-mono text-[#9ca3af]">
              <span className="w-2 h-2 rounded-full bg-[#10b981]" />
              <span>Available for Systems & AI Infra Roles</span>
            </span>
          </div>

          {/* Primary Identity Headline */}
          <h1
            id="hero-heading"
            className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#f3f4f6] mb-5 leading-[1.12]"
          >
            Engineering Hardened Sandboxes, Vector Engines & Distributed DAGs.
          </h1>

          {/* Candidate Narrative */}
          <p className="text-base sm:text-lg text-[#9ca3af] leading-relaxed mb-8 max-w-3xl">
            Hi, I&apos;m <span className="text-[#f3f4f6] font-semibold">Garv Vaidya</span> (<span className="font-mono text-[#38bdf8]">@kleeeoss</span>).
            I architect deterministic systems infrastructure: pure-Go Tree-sitter AST taint analyzers,
            Google gVisor <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-[#101114] border border-[#1f2127] text-[#38bdf8]">runsc</code> isolation
            sandboxes with 0 host escapes, disaggregated Kubernetes vector retrieval with BLAS Level-2 GEMV (<span className="font-mono text-xs text-[#38bdf8]">s = Mq</span>),
            and asynchronous Kahn DAG orchestrators.
          </p>

          {/* Key Metric Invariants Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 mb-10">
            <div className="p-3 rounded-lg border border-[#1f2127] bg-[#101114]/80 backdrop-blur-sm">
              <div className="flex items-center gap-1.5 text-xs text-[#6b7280] font-mono mb-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#10b981]" />
                <span>Prompt Injection</span>
              </div>
              <div className="text-xl sm:text-2xl font-bold font-mono text-[#10b981]">0.0% ASR</div>
              <div className="text-[11px] text-[#9ca3af] font-mono">128-bit dynamic XML nonce</div>
            </div>

            <div className="p-3 rounded-lg border border-[#1f2127] bg-[#101114]/80 backdrop-blur-sm">
              <div className="flex items-center gap-1.5 text-xs text-[#6b7280] font-mono mb-1">
                <Cpu className="w-3.5 h-3.5 text-[#38bdf8]" />
                <span>Dense Vector Search</span>
              </div>
              <div className="text-xl sm:text-2xl font-bold font-mono text-[#38bdf8]">596.8 ms</div>
              <div className="text-[11px] text-[#9ca3af] font-mono">p95 BLAS GEMV retrieval</div>
            </div>

            <div className="p-3 rounded-lg border border-[#1f2127] bg-[#101114]/80 backdrop-blur-sm">
              <div className="flex items-center gap-1.5 text-xs text-[#6b7280] font-mono mb-1">
                <Layers className="w-3.5 h-3.5 text-[#f59e0b]" />
                <span>Task DAG Scheduling</span>
              </div>
              <div className="text-xl sm:text-2xl font-bold font-mono text-[#f59e0b]">O(V + E)</div>
              <div className="text-[11px] text-[#9ca3af] font-mono">Kahn&apos;s algorithm engine</div>
            </div>

            <div className="p-3 rounded-lg border border-[#1f2127] bg-[#101114]/80 backdrop-blur-sm">
              <div className="flex items-center gap-1.5 text-xs text-[#6b7280] font-mono mb-1">
                <Database className="w-3.5 h-3.5 text-[#10b981]" />
                <span>Persistence Latency</span>
              </div>
              <div className="text-xl sm:text-2xl font-bold font-mono text-[#10b981]">&lt; 50 ms</div>
              <div className="text-[11px] text-[#9ca3af] font-mono">1-10 bounded socket pool</div>
            </div>
          </div>

          {/* Action CTAs (Fluid & 44px+ touch targets) */}
          <div className="flex flex-wrap items-center gap-3 mb-10">
            <a
              href={PERSONAL_INFO.resumePdfUrl}
              download="garv_vaidya_resume.pdf"
              onClick={() => {
                soundManager.playSuccess();
                toast('Downloading Resume PDF', 'Garv Vaidya Resume', 'success');
              }}
              className="touch-target inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#f3f4f6] text-[#08080a] font-medium text-sm hover:bg-white transition-all shadow-md active:scale-95"
            >
              <FileText className="w-4 h-4" />
              <span>Download Resume</span>
            </a>

            <button
              onClick={() => {
                soundManager.playClick(720, 0.02);
                onToggleTerminal();
              }}
              className="touch-target inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-[#1f2127] bg-[#101114] hover:bg-[#16181d] hover:border-[#38bdf8]/50 text-[#f3f4f6] font-mono text-sm transition-all"
            >
              <Terminal className="w-4 h-4 text-[#38bdf8]" />
              <span>Open Terminal</span>
              <kbd className="px-1.5 py-0.5 rounded bg-[#1a1c23] border border-[#2e323b] text-[#6b7280] text-xs">
                ~
              </kbd>
            </button>

            <button
              onClick={() => {
                soundManager.playClick(800, 0.015);
                onOpenCommandPalette();
              }}
              className="touch-target inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-[#1f2127] bg-[#101114] hover:bg-[#16181d] hover:border-[#2e323b] text-[#9ca3af] hover:text-[#f3f4f6] font-mono text-sm transition-all"
            >
              <Command className="w-4 h-4" />
              <span>Command Menu</span>
              <kbd className="px-1.5 py-0.5 rounded bg-[#1a1c23] border border-[#2e323b] text-[#6b7280] text-xs">
                ⌘K
              </kbd>
            </button>

            <a
              href="#contact"
              onClick={() => soundManager.playClick(650, 0.01)}
              className="touch-target inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-medium text-[#9ca3af] hover:text-[#f3f4f6] hover:bg-[#101114] transition-all"
            >
              <span>Contact Direct</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Social Profiles & Direct Email Copy Bar */}
          <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-[#1f2127]/80 text-xs font-mono text-[#9ca3af]">
            <a
              href={PERSONAL_INFO.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundManager.playClick(700, 0.01)}
              className="touch-target inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md hover:text-[#f3f4f6] hover:bg-[#101114] border border-transparent hover:border-[#1f2127] transition-all"
            >
              <Github className="w-4 h-4" />
              <span>github.com/kleeeoss</span>
            </a>

            <a
              href={PERSONAL_INFO.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundManager.playClick(700, 0.01)}
              className="touch-target inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md hover:text-[#f3f4f6] hover:bg-[#101114] border border-transparent hover:border-[#1f2127] transition-all"
            >
              <Linkedin className="w-4 h-4" />
              <span>linkedin.com/in/garvaidya</span>
            </a>

            <button
              onClick={handleCopyEmail}
              className="touch-target inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md hover:text-[#f3f4f6] hover:bg-[#101114] border border-transparent hover:border-[#1f2127] transition-all"
              title="Click to copy email to clipboard"
            >
              <Mail className="w-4 h-4 text-[#38bdf8]" />
              <span>{PERSONAL_INFO.email}</span>
              <span className="text-[10px] text-[#6b7280]">(Copy)</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
