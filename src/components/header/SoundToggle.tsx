'use client';

import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { soundManager } from '@/lib/audio';
import { useToast } from '../common/Toast';

export function SoundToggle() {
  const [isMuted, setIsMuted] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    setIsMuted(soundManager.getMuted());
  }, []);

  const handleToggle = () => {
    const nextMuted = soundManager.toggleMute();
    setIsMuted(nextMuted);
    if (!nextMuted) {
      soundManager.playSuccess();
      toast('Tactile Audio Enabled', 'Web Audio synthesized clicks are now active.', 'success');
    } else {
      toast('Audio Muted', 'Audio feedback silenced.', 'default');
    }
  };

  return (
    <button
      onClick={handleToggle}
      className="touch-target inline-flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-md border border-[#1f2127] bg-[#101114] text-[#9ca3af] hover:text-[#f3f4f6] hover:border-[#2e323b] hover:bg-[#16181d] text-xs font-mono transition-all"
      aria-label={isMuted ? 'Enable tactile sound effects' : 'Disable sound effects'}
      title={isMuted ? 'Enable sound' : 'Mute sound'}
    >
      {isMuted ? (
        <>
          <VolumeX className="w-3.5 h-3.5 text-[#6b7280]" />
          <span className="hidden sm:inline text-[11px]">SFX: OFF</span>
        </>
      ) : (
        <>
          <Volume2 className="w-3.5 h-3.5 text-[#10b981]" />
          <span className="hidden sm:inline text-[11px] text-[#10b981]">SFX: ON</span>
        </>
      )}
    </button>
  );
}
