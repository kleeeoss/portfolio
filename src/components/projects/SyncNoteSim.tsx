'use client';

import React, { useState } from 'react';
import { ShieldCheck, ShieldAlert, Play, CheckCircle2, Lock } from 'lucide-react';
import { soundManager } from '@/lib/audio';
import { useToast } from '../common/Toast';

export function SyncNoteSim() {
  const [activeTab, setActiveTab] = useState<'pool' | 'idor'>('pool');
  const [sockets, setSockets] = useState<Array<'IDLE' | 'BUSY'>>(Array(10).fill('IDLE'));
  const [isSimulatingPool, setIsSimulatingPool] = useState(false);
  const [poolLatency, setPoolLatency] = useState(24);
  const [idorMode, setIdorMode] = useState<'hardened' | 'vulnerable'>('hardened');
  const { toast } = useToast();

  const simulateBurst = async () => {
    if (isSimulatingPool) return;
    setIsSimulatingPool(true);
    soundManager.playClick(750, 0.02);

    // Acquire sockets in batches
    for (let i = 0; i < 8; i++) {
      setSockets((prev) => {
        const next = [...prev];
        next[i] = 'BUSY';
        return next;
      });
      await new Promise((r) => setTimeout(r, 60));
    }

    soundManager.playSuccess();
    setPoolLatency(Math.floor(Math.random() * 20) + 18); // 18-38 ms
    toast('Pool Sockets Allocated', 'Reusing persistent sockets without TCP/TLS handshake.', 'success');

    await new Promise((r) => setTimeout(r, 600));

    // Release sockets back to pool
    for (let i = 0; i < 8; i++) {
      setSockets((prev) => {
        const next = [...prev];
        next[i] = 'IDLE';
        return next;
      });
      await new Promise((r) => setTimeout(r, 40));
    }

    setIsSimulatingPool(false);
  };

  const handleIdorToggle = (mode: 'hardened' | 'vulnerable') => {
    soundManager.playClick(650, 0.015);
    setIdorMode(mode);
    if (mode === 'vulnerable') {
      soundManager.playAlert();
      toast('IDOR Exploit Active', 'Naive WHERE id=%s allows cross-tenant note exfiltration.', 'rose');
    } else {
      soundManager.playSuccess();
      toast('Compound SQL Protected', 'WHERE id=%s AND user_id=%s enforces tenant boundary.', 'success');
    }
  };

  return (
    <div className="p-4 sm:p-5 text-sm font-sans">
      {/* Top Tab Switcher */}
      <div className="flex items-center justify-between gap-3 pb-3 mb-4 border-b border-[#1f2127]">
        <div className="inline-flex rounded-lg border border-[#1f2127] bg-[#101114] p-0.5">
          <button
            onClick={() => {
              soundManager.playClick(650, 0.01);
              setActiveTab('pool');
            }}
            className={`touch-target px-3 py-1.5 rounded text-xs font-mono font-medium transition-colors ${
              activeTab === 'pool'
                ? 'bg-[#38bdf8]/20 text-[#38bdf8] border border-[#38bdf8]/40 shadow-sm'
                : 'text-[#9ca3af] hover:text-[#f3f4f6]'
            }`}
          >
            Bounded Pool (1-10 Sockets)
          </button>
          <button
            onClick={() => {
              soundManager.playClick(650, 0.01);
              setActiveTab('idor');
            }}
            className={`touch-target px-3 py-1.5 rounded text-xs font-mono font-medium transition-colors ${
              activeTab === 'idor'
                ? 'bg-[#10b981]/20 text-[#10b981] border border-[#10b981]/40 shadow-sm'
                : 'text-[#9ca3af] hover:text-[#f3f4f6]'
            }`}
          >
            SQL IDOR Boundary Lab
          </button>
        </div>

        <span className="text-[11px] font-mono text-[#6b7280] hidden sm:inline">
          AWS RDS PostgreSQL 16
        </span>
      </div>

      {activeTab === 'pool' ? (
        <div>
          {/* Socket Grid View */}
          <div className="mb-4">
            <div className="flex items-center justify-between text-xs font-mono text-[#9ca3af] mb-2">
              <span>Active Database Socket Pool (psycopg2)</span>
              <span className="text-[#10b981]">
                Idle: {sockets.filter((s) => s === 'IDLE').length} | Acquired:{' '}
                {sockets.filter((s) => s === 'BUSY').length}
              </span>
            </div>

            <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5 sm:gap-2 mb-4">
              {sockets.map((st, idx) => (
                <div
                  key={idx}
                  className={`p-1 sm:p-2 rounded border text-center transition-all ${
                    st === 'BUSY'
                      ? 'bg-[#38bdf8]/20 border-[#38bdf8] text-[#38bdf8]'
                      : 'bg-[#08080a] border-[#10b981]/40 text-[#10b981]'
                  }`}
                >
                  <div className="text-[8px] sm:text-[9px] font-mono text-[#6b7280]">SOCK #{idx + 1}</div>
                  <div className="text-[9px] sm:text-[10px] font-mono font-bold mt-0.5">
                    {st === 'BUSY' ? 'BUSY' : 'IDLE'}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Button & Latency Comparison */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            <div className="p-3 rounded-lg bg-[#08080a] border border-[#1f2127] flex flex-col justify-between">
              <div className="text-xs text-[#9ca3af] mb-2 leading-relaxed">
                Dispatch concurrent read/write queries to verify sub-50ms persistent socket acquisition.
              </div>
              <button
                onClick={simulateBurst}
                disabled={isSimulatingPool}
                className="touch-target inline-flex items-center justify-center gap-2 px-3 py-2 rounded-md bg-[#38bdf8]/20 hover:bg-[#38bdf8]/30 border border-[#38bdf8]/40 text-[#38bdf8] text-xs font-mono disabled:opacity-50 transition-all"
              >
                <Play className="w-3.5 h-3.5" />
                <span>{isSimulatingPool ? 'Reusing Sockets...' : 'Simulate 8 DB Queries'}</span>
              </button>
            </div>

            <div className="p-3 rounded-lg bg-[#08080a] border border-[#1f2127]">
              <div className="text-[11px] font-mono text-[#6b7280] mb-2">
                Latency Breakdown: Pooled vs Handshake
              </div>
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-[#10b981]">Bounded Pool (SyncNote):</span>
                    <span className="text-[#10b981] font-bold">{poolLatency} ms</span>
                  </div>
                  <div className="w-full bg-[#101114] rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-[#10b981] h-full rounded-full transition-all duration-300"
                      style={{ width: `${(poolLatency / 350) * 100}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-[#6b7280]">Per-Request TCP+TLS Handshake:</span>
                    <span className="text-[#ef4444] font-bold">310 ms</span>
                  </div>
                  <div className="w-full bg-[#101114] rounded-full h-1.5 overflow-hidden">
                    <div className="bg-[#ef4444] h-full rounded-full w-[88%]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* SQL IDOR Boundary Lab */
        <div>
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <div className="text-xs font-mono text-[#9ca3af]">
              Authenticated Caller: <span className="text-[#38bdf8]">usr_garv_01</span> (Tenant A)
            </div>
            <div className="inline-flex rounded border border-[#1f2127] bg-[#101114] p-0.5">
              <button
                onClick={() => handleIdorToggle('hardened')}
                className={`touch-target px-2.5 py-1 rounded text-xs font-mono ${
                  idorMode === 'hardened'
                    ? 'bg-[#10b981]/20 text-[#10b981] border border-[#10b981]/40'
                    : 'text-[#9ca3af]'
                }`}
              >
                Hardened Compound SQL
              </button>
              <button
                onClick={() => handleIdorToggle('vulnerable')}
                className={`touch-target px-2.5 py-1 rounded text-xs font-mono ${
                  idorMode === 'vulnerable'
                    ? 'bg-[#ef4444]/20 text-[#ef4444] border border-[#ef4444]/40'
                    : 'text-[#9ca3af]'
                }`}
              >
                Vulnerable Query
              </button>
            </div>
          </div>

          {/* SQL Query Snippet */}
          <div className="p-3 rounded-lg bg-[#08080a] border border-[#1f2127] mb-3">
            <div className="text-[10px] font-mono uppercase text-[#6b7280] mb-1">
              Executed Parameterized Query:
            </div>
            <pre className="font-mono text-xs text-[#38bdf8] overflow-x-auto">
              <code>
                {idorMode === 'hardened'
                  ? `SELECT id, title, body FROM notes\nWHERE id = %s AND user_id = %s;\n// Parameters: [note_id=42, user_id='usr_garv_01']`
                  : `SELECT id, title, body FROM notes\nWHERE id = %s;\n// Parameters: [note_id=42] (MISSING TENANT CONSTRAINT)`}
              </code>
            </pre>
          </div>

          {/* Execution Result Box */}
          <div
            className={`p-3.5 rounded-lg border ${
              idorMode === 'hardened'
                ? 'bg-[#10b981]/5 border-[#10b981]/40'
                : 'bg-[#ef4444]/10 border-[#ef4444]/50'
            }`}
          >
            <div className="flex items-center gap-2 mb-1.5">
              {idorMode === 'hardened' ? (
                <ShieldCheck className="w-4 h-4 text-[#10b981]" />
              ) : (
                <ShieldAlert className="w-4 h-4 text-[#ef4444]" />
              )}
              <span
                className={`text-xs font-mono font-bold ${
                  idorMode === 'hardened' ? 'text-[#10b981]' : 'text-[#ef4444]'
                }`}
              >
                {idorMode === 'hardened'
                  ? 'TENANT BOUNDARY PRESERVED: 404 NOT FOUND'
                  : 'CRITICAL IDOR DATA LEAK: TENANT B NOTE EXPOSED'}
              </span>
            </div>
            <p className="text-xs text-[#9ca3af] leading-relaxed">
              {idorMode === 'hardened'
                ? 'Note #42 belongs to Tenant B. The compound predicate `AND user_id = %s` ensures the database engine returns 0 rows without application layer overhead.'
                : 'Exploit succeeded. Note #42 was returned to unauthorized Tenant A because the SQL query failed to filter on authenticated session identity.'}
            </p>
          </div>
        </div>
      )}

      {/* Security Footnote */}
      <div className="mt-4 pt-3 border-t border-[#1f2127] flex flex-wrap items-center justify-between text-[11px] font-mono text-[#6b7280]">
        <div className="flex items-center gap-1.5">
          <Lock className="w-3.5 h-3.5 text-[#10b981]" />
          <span>Scrypt Hashing (N=32768, r=8, p=1) + Stateless JWT</span>
        </div>
        <div className="flex items-center gap-1">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#10b981]" />
          <span>Zero Secret Container Rootfs</span>
        </div>
      </div>
    </div>
  );
}
