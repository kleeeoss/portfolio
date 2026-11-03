'use client';

import React from 'react';
import { CheckCircle2, ShieldCheck } from 'lucide-react';
import { EMPIRICAL_INVARIANTS } from '@/lib/constants';

export function BenchmarkMatrix() {
  return (
    <section id="invariants" aria-labelledby="invariants-heading" className="py-16 md:py-24 border-t border-[#1f2127]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck className="w-4 h-4 text-[#10b981]" />
              <span className="text-xs uppercase font-mono tracking-wider font-semibold text-[#10b981]">
                Hardened Engineering Invariants
              </span>
            </div>
            <h2 id="invariants-heading" className="text-2xl sm:text-4xl font-bold tracking-tight text-[#f3f4f6]">
              Verified Empirical Benchmarks
            </h2>
          </div>
          <p className="text-sm text-[#9ca3af] max-w-md">
            Strict empirical measurements from production AWS EC2, Kubernetes clusters, and container sandboxes. No unverified claims.
          </p>
        </div>

        {/* Responsive Table Container */}
        <div className="rounded-xl border border-[#1f2127] bg-[#101114] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <caption className="sr-only">
                Verified Empirical Benchmarks and Systems Invariants Table
              </caption>
              <thead>
                <tr className="border-b border-[#1f2127] bg-[#0c0d10] text-[11px] font-mono uppercase tracking-wider text-[#6b7280]">
                  <th scope="col" className="py-3.5 px-4 sm:px-6">System / Platform</th>
                  <th scope="col" className="py-3.5 px-4">Evaluated Invariant</th>
                  <th scope="col" className="py-3.5 px-4">Benchmark Metric</th>
                  <th scope="col" className="py-3.5 px-4 sm:px-6">Verification Mechanism</th>
                  <th scope="col" className="py-3.5 px-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1f2127] text-xs font-mono">
                {EMPIRICAL_INVARIANTS.map((inv) => (
                  <tr
                    key={inv.id}
                    className="hover:bg-[#16181d] transition-colors"
                  >
                    <th scope="row" className="py-3.5 px-4 sm:px-6 font-semibold text-[#f3f4f6] whitespace-nowrap">
                      {inv.system}
                    </th>
                    <td className="py-3.5 px-4 text-[#9ca3af]">
                      {inv.evaluatedInvariant}
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="font-bold text-[#38bdf8] bg-[#38bdf8]/10 px-2 py-0.5 rounded border border-[#38bdf8]/30">
                        {inv.benchmarkMetric}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 text-[#9ca3af] leading-relaxed max-w-sm sm:max-w-md">
                      {inv.verificationMechanism}
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#10b981]">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{inv.status}</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
