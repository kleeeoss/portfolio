'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Search, Zap, CheckCircle2, Clock } from 'lucide-react';
import { computeBlasGemv, queryToVector } from '@/lib/mockVectors';
import { soundManager } from '@/lib/audio';

export function AresSimulation() {
  const [query, setQuery] = useState('container sandbox isolation');
  const [calcTimeMs, setCalcTimeMs] = useState(0.42);
  const [dnsTtl, setDnsTtl] = useState(5.0);

  // Dynamic CoreDNS TTL countdown simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setDnsTtl((prev) => {
        if (prev <= 0.2) return 5.0;
        return Number((prev - 0.2).toFixed(1));
      });
    }, 200);
    return () => clearInterval(timer);
  }, []);

  // Compute live BLAS GEMV dot products
  const { results, queryVec } = useMemo(() => {
    const t0 = typeof performance !== 'undefined' ? performance.now() : Date.now();
    const qVec = queryToVector(query);
    const ranked = computeBlasGemv(qVec);
    const t1 = typeof performance !== 'undefined' ? performance.now() : Date.now();
    setCalcTimeMs(Number(Math.max(0.12, t1 - t0).toFixed(2)));
    return { results: ranked, queryVec: qVec };
  }, [query]);

  const presetQueries = [
    'container sandbox isolation',
    'vector dot product blas',
    'dag dependency scheduling',
    'database connection pooling',
  ];

  const handlePreset = (text: string) => {
    soundManager.playClick(750, 0.015);
    setQuery(text);
  };

  return (
    <div className="p-4 sm:p-5 text-sm font-sans">
      {/* Search Input Bar */}
      <div className="relative mb-3">
        <label htmlFor="ares-query-input" className="sr-only">
          Ares Vector Search Query
        </label>
        <div className="relative flex items-center">
          <Search className="w-4 h-4 text-[#38bdf8] absolute left-3 pointer-events-none" />
          <input
            id="ares-query-input"
            type="text"
            value={query}
            onChange={(e) => {
              soundManager.playClick(600, 0.005);
              setQuery(e.target.value);
            }}
            placeholder="Type query to test live BLAS GEMV cosine retrieval..."
            className="w-full pl-9 pr-24 py-2.5 rounded-lg border border-[#1f2127] bg-[#08080a] text-xs sm:text-sm text-[#f3f4f6] placeholder-[#6b7280] focus:border-[#38bdf8] focus:outline-none transition-all font-mono"
          />
          <div className="absolute right-2.5 flex items-center gap-1.5 text-[11px] font-mono text-[#38bdf8] bg-[#38bdf8]/10 px-2 py-0.5 rounded border border-[#38bdf8]/30">
            <Zap className="w-3 h-3" />
            <span>{calcTimeMs} ms</span>
          </div>
        </div>
      </div>

      {/* Preset Queries Pills */}
      <div className="flex flex-wrap items-center gap-1.5 mb-4">
        <span className="text-[11px] font-mono text-[#6b7280]">Presets:</span>
        {presetQueries.map((preset) => (
          <button
            key={preset}
            onClick={() => handlePreset(preset)}
            className={`touch-target px-2 py-1 rounded text-[11px] font-mono transition-colors ${
              query === preset
                ? 'bg-[#38bdf8]/20 text-[#38bdf8] border border-[#38bdf8]/40'
                : 'bg-[#101114] text-[#9ca3af] hover:text-[#f3f4f6] border border-[#1f2127]'
            }`}
          >
            {preset}
          </button>
        ))}
      </div>

      {/* Query Projection Vector Preview */}
      <div className="p-2.5 rounded-lg bg-[#08080a] border border-[#1f2127] mb-4">
        <div className="flex flex-wrap items-center justify-between text-[11px] font-mono text-[#6b7280] mb-1.5">
          <span>Query Normalized Dense Vector (||q|| = 1.0)</span>
          <span className="text-[#38bdf8]">8-d projection</span>
        </div>
        <div className="flex items-center gap-1 overflow-x-auto pb-1">
          {queryVec.map((val, idx) => (
            <div
              key={idx}
              className="flex-1 min-w-[38px] text-center p-1 rounded bg-[#101114] border border-[#1f2127]"
            >
              <div className="text-[9px] text-[#6b7280] font-mono">d{idx}</div>
              <div className="text-[11px] font-mono font-semibold text-[#f3f4f6]">
                {val.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ranked Document Matches (Top 3) */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center justify-between text-xs font-mono text-[#9ca3af]">
          <span>Ranked Retrieval Results (Hardware BLAS GEMV s = Mq)</span>
          <span className="text-[#10b981] flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Unit L2 Invariant
          </span>
        </div>

        {results.slice(0, 3).map((res, idx) => (
          <div
            key={res.doc.id}
            className="p-3 rounded-lg bg-[#08080a] border border-[#1f2127] hover:border-[#38bdf8]/40 transition-colors"
          >
            <div className="flex items-start justify-between gap-2 mb-1.5">
              <div>
                <span className="text-[10px] font-mono text-[#6b7280] mr-2">
                  #{idx + 1}
                </span>
                <span className="text-xs font-semibold text-[#f3f4f6]">
                  {res.doc.title}
                </span>
                <span className="ml-2 text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#101114] border border-[#1f2127] text-[#38bdf8]">
                  {res.doc.category}
                </span>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <span className="text-xs font-bold font-mono text-[#38bdf8]">
                  cos θ = {res.score.toFixed(4)}
                </span>
              </div>
            </div>

            <p className="text-xs text-[#9ca3af] mb-2 leading-relaxed">
              {res.doc.snippet}
            </p>

            {/* Score Bar */}
            <div className="w-full bg-[#101114] rounded-full h-1.5 overflow-hidden border border-[#1f2127]">
              <div
                className="h-full bg-gradient-to-r from-[#38bdf8] to-[#10b981] rounded-full transition-all duration-300"
                style={{ width: `${Math.round(res.score * 100)}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Infrastructure Telemetry Footer */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-lg bg-[#101114] border border-[#1f2127] text-xs font-mono">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-[#f59e0b]" />
          <div>
            <span className="text-[#6b7280]">CoreDNS Dynamic TTL:</span>{' '}
            <span className="text-[#f59e0b] font-bold">{dnsTtl}s</span> (in run_in_executor)
          </div>
        </div>
        <div className="text-[#9ca3af]">
          Stateless Shards: <span className="text-[#10b981]">5 Pods Healthy (HPA 50% CPU)</span>
        </div>
      </div>
    </div>
  );
}
