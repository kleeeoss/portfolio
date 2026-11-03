'use client';

import React, { useState } from 'react';
import { ShieldCheck, ShieldAlert, Cpu, Network, Play, RotateCcw } from 'lucide-react';
import { soundManager } from '@/lib/audio';
import { useToast } from '../common/Toast';

export function LucidSimulation() {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [sandboxMode, setSandboxMode] = useState<'gvisor' | 'unprotected'>('gvisor');
  const { toast } = useToast();

  const steps = [
    {
      title: '1. Source Ingestion',
      badge: 'HTTP Ingest',
      description: 'Untrusted user input payload ingested into AST parser buffer via `req.Body.Input`.',
      code: 'payload := r.URL.Query().Get("user_script")\n// Raw string token in memory buffer',
      status: 'UNTRUSTED INPUT',
      statusColor: 'text-[#f59e0b]',
    },
    {
      title: '2. AST Taint Walk',
      badge: 'Tree-sitter',
      description: 'Pure-Go Tree-sitter walks AST nodes, tagging identifier references with tainted flags.',
      code: 'node := cursor.CurrentNode()\nif isTaintedSource(node) {\n  context.PropagateTaint(node.Child(0))\n}',
      status: 'TAINT DETECTED (Node #142)',
      statusColor: 'text-[#ef4444]',
    },
    {
      title: '3. Vulnerable Sink',
      badge: 'os.Exec Sink',
      description: 'Tainted node reaches command execution sink `exec.Command("sh", "-c", cmd)`.',
      code: 'cmd := exec.Command("/bin/sh", "-c", payload)\n// CRITICAL: Unchecked execution path reached',
      status: 'EXPLOIT TRIGGER ATTEMPT',
      statusColor: 'text-[#ef4444]',
    },
    {
      title: '4. Nonce & Sandbox Defend',
      badge: '128-bit Nonce',
      description: 'Dynamic 128-bit XML nonce boundary wraps LLM prompt; gVisor intercepts runtime syscalls.',
      code: '<system_boundary nonce="9f81a7d2b404">\n// Execution trapped by gVisor runsc guest kernel\n// Host escapes: 0 | ASR: 0.0%',
      status: 'NEUTRALIZED (0.0% ASR)',
      statusColor: 'text-[#10b981]',
    },
  ];

  const handleNextStep = () => {
    soundManager.playClick( activeStep === 2 ? 880 : 700, 0.015);
    const next = (activeStep + 1) % steps.length;
    setActiveStep(next);
    if (next === 3) {
      soundManager.playSuccess();
      toast('AST Taint Neutralized', '128-bit XML nonce defense & gVisor runsc isolation active.', 'success');
    }
  };

  const handleToggleMode = (mode: 'gvisor' | 'unprotected') => {
    soundManager.playClick(600, 0.02);
    setSandboxMode(mode);
    if (mode === 'unprotected') {
      soundManager.playAlert();
      toast('Warning: Host Mode', 'Unprotected runtime allows direct host syscall execution.', 'amber');
    } else {
      soundManager.playSuccess();
      toast('gVisor runsc Active', 'User-space kernel traps syscalls with 0 host escapes.', 'success');
    }
  };

  return (
    <div className="p-4 sm:p-5 text-sm font-sans">
      {/* Simulation Top Bar Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-[#1f2127]">
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-mono text-[#9ca3af]">Runtime Target:</span>
          <div className="inline-flex rounded-lg border border-[#1f2127] bg-[#101114] p-0.5">
            <button
              onClick={() => handleToggleMode('gvisor')}
              className={`touch-target px-2.5 py-1 rounded text-xs font-mono font-medium transition-colors ${
                sandboxMode === 'gvisor'
                  ? 'bg-[#10b981]/20 text-[#10b981] border border-[#10b981]/40 shadow-sm'
                  : 'text-[#9ca3af] hover:text-[#f3f4f6]'
              }`}
            >
              gVisor (runsc)
            </button>
            <button
              onClick={() => handleToggleMode('unprotected')}
              className={`touch-target px-2.5 py-1 rounded text-xs font-mono font-medium transition-colors ${
                sandboxMode === 'unprotected'
                  ? 'bg-[#ef4444]/20 text-[#ef4444] border border-[#ef4444]/40 shadow-sm'
                  : 'text-[#9ca3af] hover:text-[#f3f4f6]'
              }`}
            >
              Unprotected Host
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleNextStep}
            className="touch-target inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#38bdf8]/10 hover:bg-[#38bdf8]/20 border border-[#38bdf8]/30 text-[#38bdf8] text-xs font-mono transition-all"
          >
            <Play className="w-3.5 h-3.5" />
            <span>Next AST Step</span>
          </button>
          <button
            onClick={() => {
              soundManager.playClick(600, 0.01);
              setActiveStep(0);
            }}
            className="touch-target p-1.5 rounded-md border border-[#1f2127] bg-[#101114] hover:bg-[#16181d] text-[#9ca3af] hover:text-[#f3f4f6]"
            title="Reset simulation"
            aria-label="Reset simulation"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Stepper Progress Indicator */}
      <div className="grid grid-cols-4 gap-1.5 sm:gap-2 mb-4">
        {steps.map((s, idx) => (
          <button
            key={idx}
            onClick={() => {
              soundManager.playClick(650, 0.01);
              setActiveStep(idx);
            }}
            className={`text-left p-2 rounded-md border transition-all ${
              activeStep === idx
                ? 'border-[#38bdf8] bg-[#38bdf8]/10 text-[#f3f4f6]'
                : activeStep > idx
                ? 'border-[#10b981]/40 bg-[#10b981]/5 text-[#9ca3af]'
                : 'border-[#1f2127] bg-[#101114] text-[#6b7280]'
            }`}
          >
            <div className="text-[10px] font-mono leading-none mb-1">
              Step 0{idx + 1}
            </div>
            <div className="text-xs font-medium truncate">{s.badge}</div>
          </button>
        ))}
      </div>

      {/* Active Step Visualizer Box */}
      <div className="p-3.5 sm:p-4 rounded-lg bg-[#08080a] border border-[#1f2127] mb-4">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <span className="font-semibold text-xs sm:text-sm text-[#f3f4f6]">
            {steps[activeStep].title}
          </span>
          <span className={`text-xs font-mono font-bold ${steps[activeStep].statusColor}`}>
            [{steps[activeStep].status}]
          </span>
        </div>
        <p className="text-xs text-[#9ca3af] mb-3">
          {steps[activeStep].description}
        </p>

        {/* Code / AST snippet preview */}
        <div className="relative rounded bg-[#101114] border border-[#1f2127] p-2.5 overflow-x-auto">
          <pre className="font-mono text-xs text-[#38bdf8] leading-relaxed">
            <code>{steps[activeStep].code}</code>
          </pre>
        </div>
      </div>

      {/* Runtime Isolation Telemetry Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 p-3 rounded-lg bg-[#101114] border border-[#1f2127]">
        <div className="flex items-center gap-2">
          {sandboxMode === 'gvisor' ? (
            <ShieldCheck className="w-4 h-4 text-[#10b981] shrink-0" />
          ) : (
            <ShieldAlert className="w-4 h-4 text-[#ef4444] shrink-0" />
          )}
          <div className="min-w-0">
            <div className="text-[10px] font-mono uppercase text-[#6b7280]">Syscall Trap</div>
            <div className="text-xs font-mono font-medium truncate text-[#f3f4f6]">
              {sandboxMode === 'gvisor' ? 'KVM Guest Kernel Intercept' : 'Direct Host Kernel Ring 0'}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Cpu className="w-4 h-4 text-[#38bdf8] shrink-0" />
          <div className="min-w-0">
            <div className="text-[10px] font-mono uppercase text-[#6b7280]">Cgroup Memory & PIDs</div>
            <div className="text-xs font-mono font-medium text-[#f3f4f6]">
              {sandboxMode === 'gvisor' ? '48MB / 512MB (3 / 100 PIDs)' : 'Unbounded Host RAM/PIDs'}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Network className="w-4 h-4 text-[#f59e0b] shrink-0" />
          <div className="min-w-0">
            <div className="text-[10px] font-mono uppercase text-[#6b7280]">Network Isolation</div>
            <div className="text-xs font-mono font-medium text-[#f3f4f6]">
              {sandboxMode === 'gvisor' ? '--net none (0 B egress)' : 'Host Bridge Egress Allowed'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
