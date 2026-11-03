'use client';

import React from 'react';

export function StatusBeacon() {
  return (
    <div
      className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#10b981]/30 bg-[#10b981]/10 text-xs font-mono text-[#10b981] select-none shadow-[0_0_12px_rgba(16,185,129,0.15)]"
      title="All systems, sandboxes & DAG schedulers running nominally"
    >
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10b981] opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10b981]"></span>
      </span>
      <span className="tracking-wide uppercase font-semibold text-[11px]">Systems Nominal</span>
      <span className="text-[#10b981]/60 text-[10px] hidden xs:inline">| 0 Escapes</span>
    </div>
  );
}
