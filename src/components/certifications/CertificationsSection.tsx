'use client';

import React from 'react';
import { Award, GraduationCap, CheckCircle2, Calendar } from 'lucide-react';
import { CERTIFICATIONS, PERSONAL_INFO } from '@/lib/constants';

export function CertificationsSection() {
  return (
    <section id="certifications" aria-labelledby="certifications-heading" className="py-16 md:py-24 border-t border-[#1f2127]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Award className="w-4 h-4 text-[#38bdf8]" />
              <span className="text-xs uppercase font-mono tracking-wider font-semibold text-[#38bdf8]">
                Credentials & Formal Background
              </span>
            </div>
            <h2 id="certifications-heading" className="text-2xl sm:text-4xl font-bold tracking-tight text-[#f3f4f6]">
              Certifications & Education
            </h2>
          </div>
          <p className="text-sm text-[#9ca3af] max-w-md">
            Verified industry credentials across Small Language Models, Multi-Agent Architecture deployment, and AWS AI practitioner standards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {CERTIFICATIONS.map((cert) => (
            <div
              key={cert.id}
              className="p-5 rounded-xl border border-[#1f2127] bg-[#101114] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#38bdf8]/10 text-[#38bdf8] border border-[#38bdf8]/30">
                    {cert.credentialBadge}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] font-mono text-[#6b7280]">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{cert.date}</span>
                  </div>
                </div>

                <h3 className="text-base font-bold text-[#f3f4f6] mb-1">
                  {cert.title}
                </h3>
                <p className="text-xs text-[#38bdf8] font-mono mb-3">
                  {cert.issuer}
                </p>

                <p className="text-xs text-[#9ca3af] leading-relaxed">
                  {cert.verificationTopic}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-[#1f2127] flex items-center gap-1.5 text-xs font-mono text-[#10b981]">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Verified Credential</span>
              </div>
            </div>
          ))}
        </div>

        {/* Education Card */}
        <div className="p-5 sm:p-6 rounded-xl border border-[#1f2127] bg-[#101114] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-lg bg-[#0c0d10] border border-[#1f2127] text-[#38bdf8] shrink-0">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-mono text-[#6b7280] mb-0.5">
                B.Tech in Computer Science & Engineering (RGPV, Bhopal)
              </div>
              <h3 className="text-base font-bold text-[#f3f4f6]">
                {PERSONAL_INFO.education.institution}
              </h3>
              <div className="flex flex-wrap items-center gap-2 mt-1 text-xs font-mono text-[#9ca3af]">
                <span>{PERSONAL_INFO.education.period}</span>
                <span>•</span>
                <span>{PERSONAL_INFO.education.location}</span>
              </div>
            </div>
          </div>

          <div className="sm:text-right shrink-0">
            <div className="text-[11px] font-mono text-[#6b7280] uppercase">Cumulative CGPA</div>
            <div className="text-xl sm:text-2xl font-bold font-mono text-[#10b981]">
              {PERSONAL_INFO.education.cgpa}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
