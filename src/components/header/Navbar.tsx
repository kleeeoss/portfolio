'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Terminal, Command, Menu, X, ArrowUpRight, Mail } from 'lucide-react';
import { GithubIcon as Github, LinkedinIcon as Linkedin } from '../common/Icons';
import { StatusBeacon } from '../hero/StatusBeacon';
import { SoundToggle } from './SoundToggle';
import { PERSONAL_INFO } from '@/lib/constants';
import { soundManager } from '@/lib/audio';

interface NavbarProps {
  onOpenCommandPalette: () => void;
  onToggleTerminal: () => void;
}

export function Navbar({ onOpenCommandPalette, onToggleTerminal }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Flagships', href: '#flagships' },
    { label: 'Simulations', href: '#simulations' },
    { label: 'Invariants', href: '#invariants' },
    { label: 'Bento Grid', href: '#bento' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 border-b ${
        scrolled
          ? 'bg-[#08080a]/90 backdrop-blur-md border-[#1f2127] shadow-lg shadow-black/40'
          : 'bg-[#08080a]/60 backdrop-blur-sm border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Brand Identity + Status Beacon */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          <Link
            href="/"
            onClick={() => soundManager.playClick(650, 0.01)}
            className="flex items-center gap-2 group"
            aria-label="Garv Vaidya Home"
          >
            <div className="w-8 h-8 rounded-md bg-[#101114] border border-[#1f2127] group-hover:border-[#38bdf8] flex items-center justify-center font-mono font-bold text-sm text-[#f3f4f6] group-hover:text-[#38bdf8] transition-colors">
              GV
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-sm tracking-tight text-[#f3f4f6] group-hover:text-[#38bdf8] transition-colors">
                Garv Vaidya
              </span>
              <span className="text-[10px] text-[#6b7280] font-mono leading-none">
                Systems & AI Infra
              </span>
            </div>
          </Link>

          <div className="hidden sm:block">
            <StatusBeacon />
          </div>
        </div>

        {/* Center: Desktop Navigation Links */}
        <nav
          aria-label="Main Navigation"
          className="hidden md:flex items-center gap-1 text-sm font-medium text-[#9ca3af]"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => soundManager.playClick(700, 0.01)}
              className="px-3 py-1.5 rounded-md hover:text-[#f3f4f6] hover:bg-[#101114] border border-transparent hover:border-[#1f2127] transition-all"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right: Power Tools & Toggles */}
        <div className="flex items-center gap-2">
          {/* Command Palette Trigger */}
          <button
            onClick={() => {
              soundManager.playClick(800, 0.015);
              onOpenCommandPalette();
            }}
            className="touch-target flex items-center gap-2 px-2.5 py-1.5 rounded-md border border-[#1f2127] bg-[#101114] hover:bg-[#16181d] hover:border-[#2e323b] text-[#9ca3af] hover:text-[#f3f4f6] transition-all text-xs font-mono"
            aria-label="Open Command Palette (Ctrl+K or ⌘K)"
          >
            <Command className="w-3.5 h-3.5 text-[#38bdf8]" />
            <span className="hidden lg:inline text-[11px]">Command</span>
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] rounded bg-[#1a1c23] border border-[#2e323b] text-[#6b7280]">
              ⌘K
            </kbd>
          </button>

          {/* Terminal Drawer Trigger */}
          <button
            onClick={() => {
              soundManager.playClick(720, 0.02);
              onToggleTerminal();
            }}
            className="touch-target flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-[#1f2127] bg-[#101114] hover:bg-[#16181d] hover:border-[#38bdf8]/50 text-[#9ca3af] hover:text-[#38bdf8] transition-all text-xs font-mono"
            aria-label="Toggle Interactive CLI Terminal (~)"
            title="Open CLI Terminal (~)"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span className="hidden sm:inline text-[11px]">&gt;_ CLI</span>
            <kbd className="hidden md:inline-block px-1 py-0.5 text-[10px] rounded bg-[#1a1c23] border border-[#2e323b] text-[#6b7280]">
              ~
            </kbd>
          </button>

          {/* Web Audio Sound Toggle */}
          <SoundToggle />

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="touch-target md:hidden flex items-center justify-center p-2 rounded-md border border-[#1f2127] bg-[#101114] text-[#9ca3af] hover:text-[#f3f4f6]"
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#1f2127] bg-[#08080a] px-4 pt-4 pb-6 space-y-3">
          <div className="pb-2">
            <StatusBeacon />
          </div>
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => {
                  soundManager.playClick(600, 0.01);
                  setMobileMenuOpen(false);
                }}
                className="touch-target flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium text-[#9ca3af] hover:text-[#f3f4f6] hover:bg-[#101114] border border-transparent hover:border-[#1f2127]"
              >
                <span>{link.label}</span>
                <ArrowUpRight className="w-4 h-4 text-[#6b7280]" />
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-[#1f2127] flex items-center justify-around text-xs font-mono text-[#9ca3af]">
            <a
              href={PERSONAL_INFO.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="touch-target flex items-center gap-1.5 p-2 hover:text-[#f3f4f6]"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>
            <a
              href={PERSONAL_INFO.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="touch-target flex items-center gap-1.5 p-2 hover:text-[#f3f4f6]"
            >
              <Linkedin className="w-4 h-4" />
              <span>LinkedIn</span>
            </a>
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="touch-target flex items-center gap-1.5 p-2 hover:text-[#f3f4f6]"
            >
              <Mail className="w-4 h-4" />
              <span>Email</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
