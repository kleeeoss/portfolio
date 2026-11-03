'use client';

import React, { useRef, useEffect, useState, KeyboardEvent } from 'react';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, Trash2 } from 'lucide-react';
import { useTerminal } from './useTerminal';
import { soundManager } from '@/lib/audio';

interface TerminalDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TerminalDrawer({ isOpen, onClose }: TerminalDrawerProps) {
  const [inputVal, setInputVal] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const {
    entries,
    executeCommand,
    history,
    historyIndex,
    setHistoryIndex,
    clearTerminal,
  } = useTerminal(onClose);

  // Auto-focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Auto-scroll to bottom on new output
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [entries]);

  // Handle escape key
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

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(inputVal);
      setInputVal('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length === 0) return;
      const nextIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInputVal(history[nextIndex]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === -1) return;
      if (historyIndex < history.length - 1) {
        const nextIndex = historyIndex + 1;
        setHistoryIndex(nextIndex);
        setInputVal(history[nextIndex]);
      } else {
        setHistoryIndex(-1);
        setInputVal('');
      }
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Developer Terminal Drawer"
      className="fixed inset-0 z-50 flex items-end md:items-stretch md:justify-end bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full bg-[#0a0b0e] border-t md:border-t-0 md:border-l border-[#1f2127] shadow-2xl flex flex-col transition-all duration-300 font-mono ${
          isExpanded
            ? 'h-[85vh] md:w-[750px] md:h-full'
            : 'h-[70vh] md:w-[540px] md:h-full'
        } rounded-t-2xl md:rounded-none overflow-hidden`}
      >
        {/* Mobile Swipe / Drag Handle Indicator */}
        <div className="md:hidden flex justify-center pt-2 pb-1 bg-[#101114]">
          <div className="w-10 h-1 rounded-full bg-[#2e323b]" />
        </div>

        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-[#101114] border-b border-[#1f2127] text-xs">
          <div className="flex items-center gap-2 text-[#9ca3af]">
            <TerminalIcon className="w-4 h-4 text-[#38bdf8]" />
            <span className="font-semibold text-[#f3f4f6]">garv@systems-node:~</span>
            <span className="text-[10px] text-[#10b981] px-1.5 py-0.2 rounded bg-[#10b981]/10 border border-[#10b981]/30 hidden xs:inline">
              ONLINE
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => {
                soundManager.playClick(600, 0.01);
                clearTerminal();
              }}
              title="Clear terminal screen"
              aria-label="Clear screen"
              className="touch-target p-1.5 rounded hover:bg-[#1f2127] text-[#9ca3af] hover:text-[#f3f4f6]"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => {
                soundManager.playClick(700, 0.01);
                setIsExpanded(!isExpanded);
              }}
              title={isExpanded ? 'Minimize width' : 'Expand width'}
              aria-label={isExpanded ? 'Minimize' : 'Expand'}
              className="touch-target hidden md:inline-flex p-1.5 rounded hover:bg-[#1f2127] text-[#9ca3af] hover:text-[#f3f4f6]"
            >
              {isExpanded ? (
                <Minimize2 className="w-3.5 h-3.5" />
              ) : (
                <Maximize2 className="w-3.5 h-3.5" />
              )}
            </button>

            <button
              onClick={() => {
                soundManager.playClick(600, 0.01);
                onClose();
              }}
              aria-label="Close terminal"
              className="touch-target p-1.5 rounded hover:bg-[#1f2127] text-[#9ca3af] hover:text-[#f3f4f6]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Terminal Screen Buffer */}
        <div
          ref={scrollRef}
          className="flex-1 p-4 overflow-y-auto space-y-3 text-xs leading-relaxed font-mono"
        >
          {entries.map((entry) => (
            <div key={entry.id}>
              {entry.type === 'command' ? (
                <div className="flex items-center gap-2 text-[#38bdf8]">
                  <span className="text-[#10b981] font-bold">garv@systems-node:~$</span>
                  <span className="font-semibold">{entry.content}</span>
                </div>
              ) : entry.type === 'error' ? (
                <pre className="text-[#ef4444] whitespace-pre-wrap font-mono mt-1">
                  {entry.content}
                </pre>
              ) : entry.type === 'system' ? (
                <pre className="text-[#6b7280] whitespace-pre-wrap font-mono">
                  {entry.content}
                </pre>
              ) : (
                <pre className="text-[#9ca3af] whitespace-pre-wrap font-mono mt-1 leading-relaxed">
                  {entry.content}
                </pre>
              )}
            </div>
          ))}
        </div>

        {/* Terminal Input Row */}
        <div className="p-3 bg-[#08080a] border-t border-[#1f2127] flex items-center gap-2">
          <span className="text-[#10b981] font-bold text-xs shrink-0">
            garv@systems-node:~$
          </span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type 'help' or command..."
            className="touch-target flex-1 bg-transparent border-none text-[#f3f4f6] text-xs font-mono focus:outline-none placeholder-[#6b7280]"
          />
        </div>
      </div>
    </div>
  );
}
