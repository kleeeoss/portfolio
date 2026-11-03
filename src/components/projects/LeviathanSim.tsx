'use client';

import React, { useState } from 'react';
import { Play, RotateCcw, CheckCircle2, AlertTriangle, ShieldAlert } from 'lucide-react';
import { soundManager } from '@/lib/audio';
import { useToast } from '../common/Toast';

type TaskStatus = 'IDLE' | 'READY' | 'DISPATCHED' | 'RUNNING' | 'COMPLETED' | 'RETRY' | 'POISON_ACK';

interface DAGNode {
  id: string;
  name: string;
  dependencies: string[];
  inDegree: number;
  initialInDegree: number;
  status: TaskStatus;
}

const INITIAL_NODES: DAGNode[] = [
  { id: 'task-A', name: 'A: Ingest Schema', dependencies: [], inDegree: 0, initialInDegree: 0, status: 'IDLE' },
  { id: 'task-B', name: 'B: Tree-sitter AST', dependencies: ['task-A'], inDegree: 1, initialInDegree: 1, status: 'IDLE' },
  { id: 'task-C', name: 'C: Vertex AI Contract', dependencies: ['task-A'], inDegree: 1, initialInDegree: 1, status: 'IDLE' },
  { id: 'task-D', name: 'D: FinOps & Invariants', dependencies: ['task-B', 'task-C'], inDegree: 2, initialInDegree: 2, status: 'IDLE' },
  { id: 'task-E', name: 'E: SQS ACK & Publish', dependencies: ['task-D'], inDegree: 1, initialInDegree: 1, status: 'IDLE' },
];

export function LeviathanSim() {
  const [nodes, setNodes] = useState<DAGNode[]>(INITIAL_NODES);
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState<string[]>([
    "DAG Graph initialized with 5 nodes. Kahn's in-degree queue ready.",
  ]);
  const [faultMode, setFaultMode] = useState<'none' | 'transient' | 'poison'>('none');
  const { toast } = useToast();

  const resetDAG = () => {
    soundManager.playClick(600, 0.01);
    setNodes(INITIAL_NODES.map((n) => ({ ...n, inDegree: n.initialInDegree, status: 'IDLE' })));
    setIsRunning(false);
    setLogs(["DAG Graph reset. Kahn's collections.deque initialized."]);
  };

  const runKahnScheduler = async () => {
    if (isRunning) return;
    setIsRunning(true);
    soundManager.playClick(750, 0.02);

    const updated = INITIAL_NODES.map((n) => ({ ...n, inDegree: n.initialInDegree, status: 'IDLE' as TaskStatus }));
    setNodes([...updated]);

    const logHistory: string[] = ["Starting Kahn's algorithm O(V + E) scheduler..."];
    setLogs([...logHistory]);

    // Step 1: Find all nodes with in-degree = 0
    const ready = updated.filter((n) => n.inDegree === 0);
    ready.forEach((n) => (n.status = 'READY'));
    setNodes([...updated]);
    logHistory.push(`[deque.append] Discovered in-degree 0 root nodes: ${ready.map((r) => r.id).join(', ')}`);
    setLogs([...logHistory]);

    await new Promise((r) => setTimeout(r, 600));

    // Execute root A
    const nodeA = updated.find((n) => n.id === 'task-A')!;
    nodeA.status = 'RUNNING';
    setNodes([...updated]);
    soundManager.playClick(700, 0.01);
    logHistory.push('[AsyncIO.dispatch] Worker executing Task A (Pydantic schema validation)...');
    setLogs([...logHistory]);

    await new Promise((r) => setTimeout(r, 700));
    nodeA.status = 'COMPLETED';
    // Decrement downstream B and C
    updated.find((n) => n.id === 'task-B')!.inDegree = 0;
    updated.find((n) => n.id === 'task-B')!.status = 'READY';
    updated.find((n) => n.id === 'task-C')!.inDegree = 0;
    updated.find((n) => n.id === 'task-C')!.status = 'READY';
    setNodes([...updated]);
    soundManager.playSuccess();
    logHistory.push("[Kahn Step] Task A completed. Decremented in-degree for tasks B and C to 0.");
    setLogs([...logHistory]);

    await new Promise((r) => setTimeout(r, 700));

    // Execute B and C concurrently
    updated.find((n) => n.id === 'task-B')!.status = 'RUNNING';
    updated.find((n) => n.id === 'task-C')!.status = 'RUNNING';
    setNodes([...updated]);
    soundManager.playClick(800, 0.01);
    logHistory.push('[Concurrent workers] Task B (AST) and Task C (Vertex AI) running in parallel...');
    setLogs([...logHistory]);

    await new Promise((r) => setTimeout(r, 800));

    if (faultMode === 'transient') {
      // Simulate transient error
      updated.find((n) => n.id === 'task-C')!.status = 'RETRY';
      setNodes([...updated]);
      soundManager.playAlert();
      logHistory.push('[Transient Error] Task C encountered 503 rate limit. Retained in AWS SQS for retry with exponential backoff + uniform jitter.');
      setLogs([...logHistory]);
      toast('Transient Retry Triggered', 'Message retained in AWS SQS with jitter backoff.', 'amber');
      setIsRunning(false);
      return;
    } else if (faultMode === 'poison') {
      // Simulate poison pill
      updated.find((n) => n.id === 'task-C')!.status = 'POISON_ACK';
      setNodes([...updated]);
      soundManager.playAlert();
      logHistory.push('[Terminal Payload Error] Task C schema malformed. Poison pill acknowledged & deleted from SQS (Zero Poison Cascade).');
      setLogs([...logHistory]);
      toast('Poison Pill Neutralized', 'Terminal failure ACK/deleted without crashing queue.', 'rose');
      setIsRunning(false);
      return;
    }

    updated.find((n) => n.id === 'task-B')!.status = 'COMPLETED';
    updated.find((n) => n.id === 'task-C')!.status = 'COMPLETED';
    // Node D now has in-degree 0
    const nodeD = updated.find((n) => n.id === 'task-D')!;
    nodeD.inDegree = 0;
    nodeD.status = 'READY';
    setNodes([...updated]);
    soundManager.playSuccess();
    logHistory.push("[Kahn Step] Tasks B & C complete. Decremented Task D in-degree to 0.");
    setLogs([...logHistory]);

    await new Promise((r) => setTimeout(r, 700));

    // Run D
    nodeD.status = 'RUNNING';
    setNodes([...updated]);
    soundManager.playClick(750, 0.01);
    logHistory.push('[Worker] Task D running cumulative FinOps token accounting & invariant check...');
    setLogs([...logHistory]);

    await new Promise((r) => setTimeout(r, 700));
    nodeD.status = 'COMPLETED';
    const nodeE = updated.find((n) => n.id === 'task-E')!;
    nodeE.inDegree = 0;
    nodeE.status = 'READY';
    setNodes([...updated]);
    soundManager.playSuccess();
    logHistory.push("[Kahn Step] Task D complete. Task E ready.");
    setLogs([...logHistory]);

    await new Promise((r) => setTimeout(r, 600));

    // Run E
    nodeE.status = 'RUNNING';
    setNodes([...updated]);
    await new Promise((r) => setTimeout(r, 500));
    nodeE.status = 'COMPLETED';
    setNodes([...updated]);
    soundManager.playSuccess();
    logHistory.push('[SQS Complete] Task E published results and ACK/deleted queue message. DAG complete.');
    setLogs([...logHistory]);

    setIsRunning(false);
    toast('DAG Execution Nominal', "Completed all 5 Kahn's algorithm task stages.", 'success');
  };

  return (
    <div className="p-4 sm:p-5 text-sm font-sans">
      {/* Simulation Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-[#1f2127]">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={runKahnScheduler}
            disabled={isRunning}
            className="touch-target inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#f59e0b]/20 hover:bg-[#f59e0b]/30 border border-[#f59e0b]/40 text-[#f59e0b] text-xs font-mono disabled:opacity-50 transition-all"
          >
            <Play className="w-3.5 h-3.5" />
            <span>{isRunning ? 'Executing DAG...' : "Run Kahn's Scheduler"}</span>
          </button>

          <button
            onClick={resetDAG}
            disabled={isRunning}
            className="touch-target p-1.5 rounded-md border border-[#1f2127] bg-[#101114] hover:bg-[#16181d] text-[#9ca3af] hover:text-[#f3f4f6]"
            title="Reset DAG Graph"
            aria-label="Reset DAG Graph"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Fault Injection Mode Selector */}
        <div className="flex items-center gap-1 text-xs font-mono">
          <span className="text-[#6b7280]">Fault Semantics:</span>
          <select
            value={faultMode}
            onChange={(e) => setFaultMode(e.target.value as 'none' | 'transient' | 'poison')}
            disabled={isRunning}
            className="px-2 py-1 rounded bg-[#08080a] border border-[#1f2127] text-xs font-mono text-[#f3f4f6] focus:border-[#38bdf8] focus:outline-none"
          >
            <option value="none">Nominal (All Pass)</option>
            <option value="transient">Transient SQS Retry (503)</option>
            <option value="poison">Poison Pill ACK & Purge</option>
          </select>
        </div>
      </div>

      {/* DAG Graph Node Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 sm:gap-2.5 mb-4">
        {nodes.map((node) => (
          <div
            key={node.id}
            className={`p-3 rounded-lg border transition-all ${
              node.status === 'COMPLETED'
                ? 'bg-[#10b981]/10 border-[#10b981]/40 text-[#f3f4f6]'
                : node.status === 'RUNNING'
                ? 'bg-[#f59e0b]/15 border-[#f59e0b] text-[#f3f4f6] animate-pulse'
                : node.status === 'READY'
                ? 'bg-[#38bdf8]/10 border-[#38bdf8]/50 text-[#f3f4f6]'
                : node.status === 'RETRY'
                ? 'bg-[#f59e0b]/20 border-[#f59e0b] text-[#f59e0b]'
                : node.status === 'POISON_ACK'
                ? 'bg-[#ef4444]/20 border-[#ef4444] text-[#ef4444]'
                : 'bg-[#08080a] border-[#1f2127] text-[#6b7280]'
            }`}
          >
            <div className="flex items-center justify-between text-[10px] font-mono mb-1">
              <span>{node.id}</span>
              <span className="font-bold">in:{node.inDegree}</span>
            </div>
            <div className="font-semibold text-xs truncate mb-2 text-[#f3f4f6]">
              {node.name}
            </div>
            <div className="flex items-center gap-1 text-[10px] font-mono">
              {node.status === 'COMPLETED' ? (
                <span className="text-[#10b981] flex items-center gap-1 font-bold">
                  <CheckCircle2 className="w-3 h-3" /> DONE
                </span>
              ) : node.status === 'RUNNING' ? (
                <span className="text-[#f59e0b] font-bold">RUNNING</span>
              ) : node.status === 'READY' ? (
                <span className="text-[#38bdf8] font-bold">IN DEQUE</span>
              ) : node.status === 'RETRY' ? (
                <span className="text-[#f59e0b] flex items-center gap-1 font-bold">
                  <AlertTriangle className="w-3 h-3" /> RETRY
                </span>
              ) : node.status === 'POISON_ACK' ? (
                <span className="text-[#ef4444] flex items-center gap-1 font-bold">
                  <ShieldAlert className="w-3 h-3" /> PURGED
                </span>
              ) : (
                <span>WAITING</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Live Kahn Execution Console Log */}
      <div className="rounded-lg bg-[#08080a] border border-[#1f2127] p-3">
        <div className="flex items-center justify-between text-[11px] font-mono text-[#6b7280] mb-2 pb-1 border-b border-[#1f2127]">
          <span>Kahn Scheduler Trace (collections.deque in-degrees)</span>
          <span className="text-[#10b981]">O(V + E) Deterministic</span>
        </div>
        <div className="max-h-28 overflow-y-auto space-y-1 font-mono text-xs text-[#9ca3af]">
          {logs.map((log, idx) => (
            <div key={idx} className="leading-snug">
              <span className="text-[#6b7280] mr-2">&gt;</span>
              <span
                className={
                  log.includes('COMPLETE') || log.includes('Nominal')
                    ? 'text-[#10b981]'
                    : log.includes('Error') || log.includes('Poison')
                    ? 'text-[#ef4444]'
                    : log.includes('RUNNING')
                    ? 'text-[#f59e0b]'
                    : 'text-[#9ca3af]'
                }
              >
                {log}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
