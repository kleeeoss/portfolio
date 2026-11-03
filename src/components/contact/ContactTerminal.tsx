'use client';

import React, { useState, FormEvent } from 'react';
import { Mail, Send, CheckCircle2, Copy, Phone, MapPin, ExternalLink } from 'lucide-react';
import { GithubIcon as Github, LinkedinIcon as Linkedin } from '../common/Icons';
import { PERSONAL_INFO } from '@/lib/constants';
import { soundManager } from '@/lib/audio';
import { useToast } from '../common/Toast';

export function ContactTerminal() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PERSONAL_INFO.email);
      setCopied(true);
      soundManager.playSuccess();
      toast('Email Copied to Clipboard', PERSONAL_INFO.email, 'success');
      setTimeout(() => setCopied(false), 3000);
    } catch {
      toast('Email Address', PERSONAL_INFO.email, 'default');
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || !message) {
      soundManager.playAlert();
      toast('Required Fields Missing', 'Please provide an email and message.', 'amber');
      return;
    }

    setIsSubmitting(true);
    soundManager.playClick(800, 0.02);

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

    if (accessKey) {
      try {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            access_key: accessKey,
            name: name || 'Recruiter / Engineering Leader',
            email: email,
            subject: subject || 'Portfolio Inquiry / Systems Opportunity',
            message: message,
            to_email: PERSONAL_INFO.email,
          }),
        });

        const data = await response.json();
        if (response.ok && data?.success) {
          setSubmitted(true);
          soundManager.playSuccess();
          toast('Message Transmitted', `Your message was delivered to ${PERSONAL_INFO.email}`, 'success');
          setIsSubmitting(false);
          return;
        }
      } catch {
        // Fall back to client-side mailto dispatch
      }
    }

    // Direct mailto protocol with draft backup to clipboard
    const mailtoUrl = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(
      subject || 'Systems Engineering Opportunity'
    )}&body=${encodeURIComponent(
      `From: ${name || 'Engineering Recruiter'} (${email})\n\nMessage:\n${message}`
    )}`;

    try {
      await navigator.clipboard.writeText(
        `To: ${PERSONAL_INFO.email}\nSubject: ${subject || 'Systems Engineering Opportunity'}\n\n${message}`
      );
    } catch {}

    window.location.href = mailtoUrl;
    setSubmitted(true);
    soundManager.playSuccess();
    toast('Mail Client Dispatched', `Opening mail client to ${PERSONAL_INFO.email}. Draft also copied to clipboard.`, 'success');
    setIsSubmitting(false);
  };

  return (
    <section id="contact" aria-labelledby="contact-heading" className="py-16 md:py-24 border-t border-[#1f2127]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#38bdf8]/30 bg-[#38bdf8]/10 text-xs font-mono text-[#38bdf8] mb-3">
              <Mail className="w-3.5 h-3.5" />
              <span>Direct In-Site Transmission</span>
            </div>
            <h2 id="contact-heading" className="text-3xl sm:text-4xl font-bold tracking-tight text-[#f3f4f6] mb-3">
              Contact Garv Vaidya
            </h2>
            <p className="text-sm text-[#9ca3af] max-w-xl mx-auto leading-relaxed">
              Open to Software Engineering, Systems, and AI Infrastructure roles. Send a direct transmission below or copy contact coordinates in 1-click.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Quick Contact & Coordinates Column */}
            <div className="space-y-3">
              {/* 1-Click Email Card */}
              <div className="p-4 rounded-xl border border-[#1f2127] bg-[#101114]">
                <div className="text-xs font-mono text-[#6b7280] mb-1">Direct Email (1-Click Copy)</div>
                <div className="text-sm font-mono text-[#f3f4f6] font-semibold break-all mb-3">
                  {PERSONAL_INFO.email}
                </div>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="touch-target w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-[#1f2127] bg-[#0c0d10] hover:bg-[#16181d] hover:border-[#38bdf8]/50 text-xs font-mono text-[#38bdf8] transition-all"
                >
                  {copied ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#10b981]" />
                      <span className="text-[#10b981]">Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Email Address</span>
                    </>
                  )}
                </button>
              </div>

              {/* Coordinates List */}
              <div className="p-4 rounded-xl border border-[#1f2127] bg-[#101114] space-y-3 text-xs font-mono">
                <div className="flex items-center gap-2.5 text-[#9ca3af]">
                  <Phone className="w-4 h-4 text-[#38bdf8] shrink-0" />
                  <a href={`tel:${PERSONAL_INFO.phone}`} className="hover:text-[#f3f4f6]">
                    {PERSONAL_INFO.phone}
                  </a>
                </div>

                <div className="flex items-center gap-2.5 text-[#9ca3af]">
                  <MapPin className="w-4 h-4 text-[#10b981] shrink-0" />
                  <span>{PERSONAL_INFO.location}</span>
                </div>

                <div className="flex items-center gap-2.5 text-[#9ca3af] pt-2 border-t border-[#1f2127]">
                  <Linkedin className="w-4 h-4 text-[#38bdf8] shrink-0" />
                  <a
                    href={PERSONAL_INFO.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#f3f4f6] flex items-center gap-1"
                  >
                    <span>LinkedIn Profile</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="flex items-center gap-2.5 text-[#9ca3af]">
                  <Github className="w-4 h-4 text-[#f3f4f6] shrink-0" />
                  <a
                    href={PERSONAL_INFO.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#f3f4f6] flex items-center gap-1"
                  >
                    <span>GitHub (@kleeeoss)</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* Direct Transmission Form */}
            <div className="md:col-span-2 p-5 sm:p-7 rounded-xl border border-[#1f2127] bg-[#101114]">
              {submitted ? (
                <div className="py-12 text-center space-y-3">
                  <div className="inline-flex p-3 rounded-full bg-[#10b981]/10 text-[#10b981] border border-[#10b981]/30">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-[#f3f4f6]">
                    Transmission Received
                  </h3>
                  <p className="text-xs sm:text-sm text-[#9ca3af] max-w-sm mx-auto leading-relaxed">
                    Thank you for reaching out. Your message has been routed directly to Garv Vaidya. Expect a response shortly.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setMessage('');
                    }}
                    className="touch-target inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[#1f2127] text-xs font-mono text-[#9ca3af] hover:text-[#f3f4f6]"
                  >
                    Send Another Transmission
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-name" className="block text-xs font-mono text-[#9ca3af] mb-1.5">
                        Your Name / Organization
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Alex (Engineering Recruiter)"
                        className="touch-target w-full px-3 py-2.5 rounded-lg border border-[#1f2127] bg-[#0c0d10] text-xs sm:text-sm text-[#f3f4f6] placeholder-[#6b7280] focus:border-[#38bdf8] focus:outline-none transition-all font-mono"
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-email" className="block text-xs font-mono text-[#9ca3af] mb-1.5">
                        Your Work Email <span className="text-[#38bdf8]">*</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="recruiter@company.com"
                        className="touch-target w-full px-3 py-2.5 rounded-lg border border-[#1f2127] bg-[#0c0d10] text-xs sm:text-sm text-[#f3f4f6] placeholder-[#6b7280] focus:border-[#38bdf8] focus:outline-none transition-all font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-subject" className="block text-xs font-mono text-[#9ca3af] mb-1.5">
                      Subject
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="Systems Engineering Opportunity / Discussion"
                      className="touch-target w-full px-3 py-2.5 rounded-lg border border-[#1f2127] bg-[#0c0d10] text-xs sm:text-sm text-[#f3f4f6] placeholder-[#6b7280] focus:border-[#38bdf8] focus:outline-none transition-all font-mono"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-mono text-[#9ca3af] mb-1.5">
                      Message <span className="text-[#38bdf8]">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Details regarding your team, infrastructure challenges, or role requirements..."
                      className="w-full px-3 py-2.5 rounded-lg border border-[#1f2127] bg-[#0c0d10] text-xs sm:text-sm text-[#f3f4f6] placeholder-[#6b7280] focus:border-[#38bdf8] focus:outline-none transition-all font-mono leading-relaxed"
                    />
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                    <span className="text-[11px] font-mono text-[#6b7280]">
                      Dispatches direct to garvvaidya24@outlook.com
                    </span>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="touch-target inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#38bdf8] text-[#08080a] font-mono font-medium text-xs hover:bg-[#38bdf8]/90 transition-all disabled:opacity-50 active:scale-95 shadow-md shadow-[#38bdf8]/10"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{isSubmitting ? 'Transmitting...' : 'Send Transmission'}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
