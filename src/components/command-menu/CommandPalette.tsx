'use client';

import React, { useEffect, useState } from 'react';
import { Command } from 'cmdk';
import {
  FileText,
  Terminal,
  Copy,
  ExternalLink,
  Volume2,
  VolumeX,
  ShieldCheck,
  Cpu,
  Layers,
  Database,
  Grid,
  Mail,
  Award,
} from 'lucide-react';
import { PERSONAL_INFO } from '@/lib/constants';
import { soundManager } from '@/lib/audio';
import { useToast } from '../common/Toast';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenTerminal: () => void;
}

export function CommandPalette({ isOpen, onClose, onOpenTerminal }: CommandPaletteProps) {
  const [search, setSearch] = useState('');
  const { toast } = useToast();

  // Reset search when opened
  useEffect(() => {
    if (isOpen) {
      setSearch('');
    }
  }, [isOpen]);

  // Listen to Escape key to dismiss
  useEffect(() => {
    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const navigateTo = (hash: string) => {
    soundManager.playClick(700, 0.01);
    onClose();
    window.location.hash = hash;
  };

  const handleCopy = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      soundManager.playSuccess();
      toast(`${label} Copied`, text, 'success');
      onClose();
    } catch {
      toast(label, text, 'default');
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Global Command Palette"
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-xl rounded-xl border border-[#1f2127] bg-[#101114] shadow-2xl overflow-hidden font-sans"
      >
        <Command
          value={search}
          onValueChange={setSearch}
          className="w-full flex flex-col bg-[#101114] text-[#f3f4f6]"
        >
          {/* Search Input Bar */}
          <div className="flex items-center px-4 py-3 border-b border-[#1f2127]">
            <input
              autoFocus
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Type a command or jump to system module..."
              className="touch-target w-full bg-transparent border-none text-sm font-mono text-[#f3f4f6] placeholder-[#6b7280] focus:outline-none"
            />
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-[#1a1c23] border border-[#2e323b] text-[#6b7280] text-[10px] font-mono">
              ESC
            </kbd>
          </div>

          {/* Command List Results */}
          <Command.List className="max-h-80 overflow-y-auto p-2 space-y-1 text-xs font-mono">
            <Command.Empty className="p-4 text-center text-[#6b7280] text-xs font-mono">
              No matching system command found.
            </Command.Empty>

            {/* Systems Navigation */}
            <Command.Group heading="Systems & Simulations" className="px-2 py-1 text-[10px] font-mono uppercase text-[#6b7280]">
              <Command.Item
                onSelect={() => navigateTo('flagships')}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer hover:bg-[#16181d] text-[#f3f4f6] transition-colors"
              >
                <ShieldCheck className="w-4 h-4 text-[#10b981]" />
                <span>Lucid-CI: Go AST Taint & gVisor Sandbox</span>
              </Command.Item>

              <Command.Item
                onSelect={() => navigateTo('flagships')}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer hover:bg-[#16181d] text-[#f3f4f6] transition-colors"
              >
                <Cpu className="w-4 h-4 text-[#38bdf8]" />
                <span>Ares: Live BLAS GEMV Vector Search Engine</span>
              </Command.Item>

              <Command.Item
                onSelect={() => navigateTo('flagships')}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer hover:bg-[#16181d] text-[#f3f4f6] transition-colors"
              >
                <Layers className="w-4 h-4 text-[#f59e0b]" />
                <span>Leviathan: Kahn&apos;s DAG Topological Sort</span>
              </Command.Item>

              <Command.Item
                onSelect={() => navigateTo('flagships')}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer hover:bg-[#16181d] text-[#f3f4f6] transition-colors"
              >
                <Database className="w-4 h-4 text-[#10b981]" />
                <span>SyncNote: RDS PostgreSQL Pool & SQL IDOR Lab</span>
              </Command.Item>

              <Command.Item
                onSelect={() => navigateTo('invariants')}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer hover:bg-[#16181d] text-[#f3f4f6] transition-colors"
              >
                <ShieldCheck className="w-4 h-4 text-[#38bdf8]" />
                <span>Verified Empirical Invariants Matrix</span>
              </Command.Item>

              <Command.Item
                onSelect={() => navigateTo('bento')}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer hover:bg-[#16181d] text-[#f3f4f6] transition-colors"
              >
                <Grid className="w-4 h-4 text-[#9ca3af]" />
                <span>Secondary Systems Bento Grid</span>
              </Command.Item>

              <Command.Item
                onSelect={() => navigateTo('certifications')}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer hover:bg-[#16181d] text-[#f3f4f6] transition-colors"
              >
                <Award className="w-4 h-4 text-[#38bdf8]" />
                <span>Certifications & Education</span>
              </Command.Item>

              <Command.Item
                onSelect={() => navigateTo('contact')}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer hover:bg-[#16181d] text-[#f3f4f6] transition-colors"
              >
                <Mail className="w-4 h-4 text-[#38bdf8]" />
                <span>Direct In-Site Contact Terminal</span>
              </Command.Item>
            </Command.Group>

            {/* Quick Actions */}
            <Command.Group heading="Engineering Actions" className="px-2 py-1 text-[10px] font-mono uppercase text-[#6b7280]">
              <Command.Item
                onSelect={() => {
                  soundManager.playSuccess();
                  const link = document.createElement('a');
                  link.href = PERSONAL_INFO.resumePdfUrl;
                  link.download = 'garv_vaidya_resume.pdf';
                  link.click();
                  toast('Downloading Resume', 'garv_vaidya_resume.pdf', 'success');
                  onClose();
                }}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer hover:bg-[#16181d] text-[#f3f4f6] transition-colors"
              >
                <FileText className="w-4 h-4 text-[#10b981]" />
                <span>Download Resume (PDF)</span>
              </Command.Item>

              <Command.Item
                onSelect={() => {
                  onClose();
                  onOpenTerminal();
                }}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer hover:bg-[#16181d] text-[#f3f4f6] transition-colors"
              >
                <Terminal className="w-4 h-4 text-[#38bdf8]" />
                <span>Launch Interactive CLI Terminal (~)</span>
              </Command.Item>

              <Command.Item
                onSelect={() => handleCopy(PERSONAL_INFO.email, 'Email')}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer hover:bg-[#16181d] text-[#f3f4f6] transition-colors"
              >
                <Copy className="w-4 h-4 text-[#9ca3af]" />
                <span>Copy Email Address (garvvaidya24@outlook.com)</span>
              </Command.Item>

              <Command.Item
                onSelect={() => handleCopy(PERSONAL_INFO.phone, 'Phone')}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer hover:bg-[#16181d] text-[#f3f4f6] transition-colors"
              >
                <Copy className="w-4 h-4 text-[#9ca3af]" />
                <span>Copy Phone (+91 7067769237)</span>
              </Command.Item>

              <Command.Item
                onSelect={() => {
                  const muted = soundManager.toggleMute();
                  if (!muted) {
                    soundManager.playSuccess();
                    toast('Sound Active', 'Web Audio clicks enabled', 'success');
                  } else {
                    toast('Sound Muted', 'Audio silenced', 'default');
                  }
                  onClose();
                }}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer hover:bg-[#16181d] text-[#f3f4f6] transition-colors"
              >
                {soundManager.getMuted() ? (
                  <>
                    <Volume2 className="w-4 h-4 text-[#10b981]" />
                    <span>Enable Tactile Sound Effects</span>
                  </>
                ) : (
                  <>
                    <VolumeX className="w-4 h-4 text-[#6b7280]" />
                    <span>Mute Sound Effects</span>
                  </>
                )}
              </Command.Item>
            </Command.Group>

            {/* External Links */}
            <Command.Group heading="External Repositories" className="px-2 py-1 text-[10px] font-mono uppercase text-[#6b7280]">
              <Command.Item
                onSelect={() => {
                  window.open(PERSONAL_INFO.githubUrl, '_blank');
                  onClose();
                }}
                className="flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer hover:bg-[#16181d] text-[#f3f4f6] transition-colors"
              >
                <span>GitHub Profile (@kleeeoss)</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#6b7280]" />
              </Command.Item>

              <Command.Item
                onSelect={() => {
                  window.open(PERSONAL_INFO.linkedinUrl, '_blank');
                  onClose();
                }}
                className="flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer hover:bg-[#16181d] text-[#f3f4f6] transition-colors"
              >
                <span>LinkedIn Profile (/in/garvaidya)</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#6b7280]" />
              </Command.Item>
            </Command.Group>
          </Command.List>

          {/* Footer Guide */}
          <div className="p-2.5 bg-[#08080a] border-t border-[#1f2127] flex items-center justify-between text-[10px] font-mono text-[#6b7280]">
            <span>Navigate: ↑ / ↓</span>
            <span>Select: ENTER</span>
            <span>Dismiss: ESC</span>
          </div>
        </Command>
      </div>
    </div>
  );
}
