'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/header/Navbar';
import { HeroSection } from '@/components/hero/HeroSection';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { LucidSimulation } from '@/components/projects/LucidSimulation';
import { AresSimulation } from '@/components/projects/AresSimulation';
import { LeviathanSim } from '@/components/projects/LeviathanSim';
import { SyncNoteSim } from '@/components/projects/SyncNoteSim';
import { BenchmarkMatrix } from '@/components/bento/BenchmarkMatrix';
import { SecondaryBento } from '@/components/bento/SecondaryBento';
import { CertificationsSection } from '@/components/certifications/CertificationsSection';
import { ContactTerminal } from '@/components/contact/ContactTerminal';
import { TerminalDrawer } from '@/components/terminal/TerminalDrawer';
import { CommandPalette } from '@/components/command-menu/CommandPalette';
import { ToastProvider } from '@/components/common/Toast';
import { FLAGSHIP_PROJECTS, PERSONAL_INFO } from '@/lib/constants';
import { Terminal as TerminalIcon, Shield, Mail, ArrowUp } from 'lucide-react';
import { GithubIcon as Github, LinkedinIcon as Linkedin } from '@/components/common/Icons';
import { soundManager } from '@/lib/audio';

export default function Home() {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Global keyboard listener for backtick (`) to toggle terminal
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      // If typing in an input or textarea, don't hijack backtick unless meta/ctrl
      const targetTag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      if (targetTag === 'input' || targetTag === 'textarea') return;

      if (e.key === '`' || e.key === '~') {
        e.preventDefault();
        soundManager.playClick(720, 0.02);
        setIsTerminalOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  // Scroll to top indicator
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const lucidProject = FLAGSHIP_PROJECTS.find((p) => p.id === 'lucid-ci')!;
  const aresProject = FLAGSHIP_PROJECTS.find((p) => p.id === 'ares')!;
  const leviathanProject = FLAGSHIP_PROJECTS.find((p) => p.id === 'leviathan')!;
  const syncnoteProject = FLAGSHIP_PROJECTS.find((p) => p.id === 'syncnote')!;

  return (
    <ToastProvider>
      {/* Skip to Main Content Link (Accessibility) */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-4 py-2 rounded-md bg-[#38bdf8] text-[#08080a] font-mono font-bold text-xs shadow-lg focus:outline-none"
      >
        Skip to main content
      </a>

      {/* Global Navigation Bar */}
      <Navbar
        onOpenCommandPalette={() => setIsCommandOpen(true)}
        onToggleTerminal={() => setIsTerminalOpen((prev) => !prev)}
      />

      <main id="main-content" className="w-full overflow-x-hidden">
        {/* Kinetic Hero Section */}
        <HeroSection
          onOpenCommandPalette={() => setIsCommandOpen(true)}
          onToggleTerminal={() => setIsTerminalOpen(true)}
        />

        {/* Flagship Systems & Simulations Section */}
        <section
          id="flagships"
          aria-labelledby="flagships-heading"
          className="py-16 md:py-24 border-t border-[#1f2127]"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-[#38bdf8]" />
                  <span className="text-xs uppercase font-mono tracking-wider font-semibold text-[#38bdf8]">
                    Flagship Systems Engineering
                  </span>
                </div>
                <h2
                  id="flagships-heading"
                  className="text-2xl sm:text-4xl font-bold tracking-tight text-[#f3f4f6]"
                >
                  Core Architectural Flagships
                </h2>
              </div>
              <p className="text-sm text-[#9ca3af] max-w-md">
                Production-grade platforms built with pure-Go AST parsers, K8s disaggregated vector clusters, Kahn DAG schedulers, and zero-leak persistent connection pools.
              </p>
            </div>

            {/* 4 Flagship Projects Stack */}
            <div id="simulations" className="space-y-10 sm:space-y-12">
              {/* Flagship 1: Lucid-CI */}
              <ProjectCard
                project={lucidProject}
                simulationTitle="AST Taint Flow Stepper & gVisor (runsc) Sandbox"
              >
                <LucidSimulation />
              </ProjectCard>

              {/* Flagship 2: Ares */}
              <ProjectCard
                project={aresProject}
                simulationTitle="Live Client-Side BLAS GEMV Vector Search Engine"
              >
                <AresSimulation />
              </ProjectCard>

              {/* Flagship 3: Leviathan */}
              <ProjectCard
                project={leviathanProject}
                simulationTitle="Live Kahn's Algorithm DAG Scheduler & SQS Semantics"
              >
                <LeviathanSim />
              </ProjectCard>

              {/* Flagship 4: SyncNote */}
              <ProjectCard
                project={syncnoteProject}
                simulationTitle="AWS RDS Connection Pool (10 Sockets) & SQL IDOR Lab"
              >
                <SyncNoteSim />
              </ProjectCard>
            </div>
          </div>
        </section>

        {/* Verified Invariants Matrix Table */}
        <BenchmarkMatrix />

        {/* Secondary Bento Grid */}
        <SecondaryBento />

        {/* Certifications & Education */}
        <CertificationsSection />

        {/* Direct In-Site Contact Terminal */}
        <ContactTerminal />
      </main>

      {/* Footer */}
      <footer className="border-t border-[#1f2127] bg-[#0c0d10] py-12 text-xs font-mono text-[#9ca3af]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded bg-[#101114] border border-[#1f2127] flex items-center justify-center font-bold text-[#38bdf8]">
              GV
            </div>
            <div>
              <span className="text-[#f3f4f6] font-semibold">{PERSONAL_INFO.name}</span>
              <span className="text-[#6b7280] ml-2">© {new Date().getFullYear()}</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={PERSONAL_INFO.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#f3f4f6] flex items-center gap-1"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
            <a
              href={PERSONAL_INFO.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#f3f4f6] flex items-center gap-1"
            >
              <Linkedin className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="hover:text-[#f3f4f6] flex items-center gap-1"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Email</span>
            </a>
            <a
              href={PERSONAL_INFO.resumePdfUrl}
              download="garv_vaidya_resume.pdf"
              className="hover:text-[#38bdf8] flex items-center gap-1"
            >
              <span>Resume PDF</span>
            </a>
          </div>

          <div className="flex items-center gap-2 text-[#6b7280]">
            <Shield className="w-3.5 h-3.5 text-[#10b981]" />
            <span>Built for Determinism, Low Latency & Security</span>
          </div>
        </div>
      </footer>

      {/* Floating Bottom-Right CLI Launcher Pill */}
      <div className="fixed bottom-4 right-4 z-30 flex items-center gap-2">
        {showScrollTop && (
          <button
            onClick={() => {
              soundManager.playClick(600, 0.01);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            aria-label="Scroll back to top"
            className="touch-target p-2.5 rounded-full border border-[#1f2127] bg-[#101114]/90 backdrop-blur-md text-[#9ca3af] hover:text-[#f3f4f6] hover:border-[#38bdf8] transition-all shadow-xl"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        )}

        <button
          onClick={() => {
            soundManager.playClick(720, 0.02);
            setIsTerminalOpen(true);
          }}
          className="touch-target flex items-center gap-2 px-3 py-2 rounded-full border border-[#1f2127] bg-[#101114]/90 backdrop-blur-md hover:border-[#38bdf8] text-[#9ca3af] hover:text-[#38bdf8] transition-all shadow-xl font-mono text-xs"
          aria-label="Open Interactive Systems Terminal (~)"
          title="Open Terminal (~)"
        >
          <TerminalIcon className="w-4 h-4 text-[#38bdf8]" />
          <span className="hidden sm:inline">&gt;_ Terminal</span>
          <kbd className="px-1.5 py-0.5 rounded bg-[#1a1c23] border border-[#2e323b] text-[#6b7280] text-[10px]">
            ~
          </kbd>
        </button>
      </div>

      {/* Developer Terminal Slide-Out Drawer */}
      <TerminalDrawer
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
      />

      {/* Global Command Palette */}
      <CommandPalette
        isOpen={isCommandOpen}
        onClose={() => setIsCommandOpen(false)}
        onOpenTerminal={() => setIsTerminalOpen(true)}
      />
    </ToastProvider>
  );
}
