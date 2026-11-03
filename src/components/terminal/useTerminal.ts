'use client';

import { useState, useCallback } from 'react';
import { TerminalEntry } from '@/lib/types';
import { PERSONAL_INFO } from '@/lib/constants';
import { computeBlasGemv, queryToVector } from '@/lib/mockVectors';
import { soundManager } from '@/lib/audio';

const INITIAL_ENTRIES: TerminalEntry[] = [
  {
    id: 'init-1',
    type: 'system',
    content: 'Garv Vaidya Systems Terminal [Version 2.4.0-release]\nRunning Linux 6.6.137-systems-amd64 x86_64\nType "help" to list available commands.',
    timestamp: new Date().toLocaleTimeString(),
  },
];

export function useTerminal(onClose?: () => void) {
  const [entries, setEntries] = useState<TerminalEntry[]>(INITIAL_ENTRIES);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);

  const executeCommand = useCallback(
    (input: string) => {
      const trimmed = input.trim();
      if (!trimmed) return;

      soundManager.playClick(800, 0.015);
      const timestamp = new Date().toLocaleTimeString();
      const commandId = `${Date.now()}-cmd`;

      setEntries((prev) => [
        ...prev,
        { id: commandId, type: 'command', content: trimmed, timestamp },
      ]);

      setHistory((prev) => [...prev, trimmed]);
      setHistoryIndex(-1);

      const parts = trimmed.split(/\s+/);
      const cmd = parts[0].toLowerCase();
      const args = parts.slice(1);

      let outputContent = '';
      let entryType: TerminalEntry['type'] = 'output';

      switch (cmd) {
        case 'help':
          outputContent = `AVAILABLE COMMANDS:
  help                    - Display this command matrix
  whoami                  - Display engineer identity & mission
  cat resume              - View summary & download master resume PDF
  lucid --bench           - Run Lucid-CI pure-Go AST taint & gVisor benchmark
  ares --query <text>     - Run BLAS Level-2 GEMV vector retrieval simulation
  leviathan --dag         - Execute Kahn's algorithm O(V+E) task sort
  syncnote --pool         - Inspect AWS RDS PostgreSQL bounded socket pool
  skills                  - List core competencies across systems & cloud
  certifications          - Display verified credentials
  contact                 - Output direct contact coordinates
  clear                   - Clear screen buffer
  exit                    - Close developer terminal drawer`;
          break;

        case 'clear':
          setEntries([]);
          return;

        case 'whoami':
          outputContent = `Garv Vaidya (@kleeeoss)
Title:    ${PERSONAL_INFO.title}
Location: ${PERSONAL_INFO.location}
Status:   Systems Nominal | 0 Host Escapes | 0.0% ASR
Summary:  ${PERSONAL_INFO.summary}`;
          break;

        case 'cat':
          if (args[0] === 'resume' || args[0] === 'resume.pdf' || args[0] === 'resume.tex') {
            outputContent = `=== GARV VAIDYA — RESUME SUMMARY ===
Education: B.Tech CSE (Hitkarini College, Jabalpur) | CGPA: 7.17 / 10 | 2023-2027
Email:     ${PERSONAL_INFO.email} | Phone: ${PERSONAL_INFO.phone}

Flagship Systems:
1. Lucid-CI:  Pure-Go Tree-sitter AST taint analyzer + Google gVisor runsc (0.0% ASR)
2. Ares:      Disaggregated K8s vector engine, BLAS Level-2 GEMV s = Mq, p95=596.81ms
3. Leviathan: Asynchronous DAG task scheduler with Kahn's algorithm O(V+E) + AWS SQS
4. SyncNote:  AWS EC2 + RDS PostgreSQL 16 bounded connection pool (<50ms latency)

[PDF Download]: Triggering browser download for /resume.pdf...`;
            // Trigger download link
            if (typeof window !== 'undefined') {
              const link = document.createElement('a');
              link.href = '/resume.pdf';
              link.download = 'garv_vaidya_resume.pdf';
              link.click();
            }
          } else {
            outputContent = `cat: ${args[0] || 'missing operand'}: No such file or directory. Try 'cat resume'.`;
            entryType = 'error';
          }
          break;

        case 'lucid':
          if (args.includes('--bench') || args.includes('-b') || args.length === 0) {
            outputContent = `[LUCID-CI BENCHMARK HARNESS v1.4]
Target:       AWS EC2 t3.medium | Linux 6.6.137 | gVisor (runsc)
AST Engine:   Pure-Go Tree-sitter AST Graph Traversal
Results:
  ├── AST Taint Walk Latency:  18.42 ms  [VERIFIED < 21ms]
  ├── Nonce Defense (128-bit): 0.0% ASR  (0/20 breached prompt injections)
  ├── Guest Kernel Isolation:  0 Host Escapes (KVM syscall interception)
  ├── Cgroup Constraints:      512MB RAM, 100 PIDs, --net none
  └── Status:                  SYSTEM HARNESS NOMINAL`;
          } else {
            outputContent = `lucid: unrecognized argument '${args.join(' ')}'. Try 'lucid --bench'.`;
          }
          break;

        case 'ares':
          if (args[0] === '--query' || args[0] === '-q') {
            const queryText = args.slice(1).join(' ') || 'container sandbox isolation';
            const qVec = queryToVector(queryText);
            const ranked = computeBlasGemv(qVec);
            const top = ranked.slice(0, 3);
            outputContent = `[ARES BLAS GEMV RETRIEVAL ENGINE]
Query: "${queryText}"
Algorithm: Hardware BLAS Level-2 GEMV (s = Mq) | Unit L2 Invariant Enforced
Matches:
${top.map((t, idx) => `  [#${idx + 1}] cos θ = ${t.score.toFixed(4)} | ${t.doc.title} (${t.doc.category})`).join('\n')}
CoreDNS TTL: 5.0s non-blocking cached in run_in_executor`;
          } else {
            outputContent = `Usage: ares --query <search text>\nExample: ares --query "container sandbox"`;
          }
          break;

        case 'leviathan':
          outputContent = `[LEVIATHAN ASYNC DAG SCHEDULER]
Topology: Kahn's Algorithm O(V+E) with collections.deque
Active Nodes:
  [A] Ingest Schema           -> in-degree: 0  (DISPATCHED)
  [B] Tree-sitter AST         -> in-degree: 0  (COMPLETED)
  [C] Vertex AI Contract      -> in-degree: 0  (COMPLETED)
  [D] FinOps & Invariants     -> in-degree: 0  (COMPLETED)
  [E] SQS ACK & Publish       -> in-degree: 0  (COMPLETED)
Cycle Check: Deterministic 0 Cycles detected. Zero Poison Cascade verified.`;
          break;

        case 'syncnote':
          outputContent = `[SYNCNOTE RDS POSTGRESQL POOL INSPECTOR]
Target:       AWS RDS PostgreSQL 16 (Multi-AZ VPC Security Group)
Pooling:      Process-level psycopg2 bounded pool (1-10 sockets)
Persistence:  < 50ms query response (TLS/TCP handshakes bypassed)
Security:     Compound SQL IDOR Boundary (WHERE id = %s AND user_id = %s)
Auth:         Scrypt N=32768, stateless JWT bearer authentication`;
          break;

        case 'skills':
          outputContent = `TECHNICAL COMPETENCIES:
- Languages:        Python (3.12+), Go, C++, SQL, Bash/POSIX Shell
- Systems & Cloud:  AWS (EC2, SQS, RDS, S3), Kubernetes (HPA, Headless), Docker, Terraform
- Security & AST:   Google gVisor (runsc), Tree-sitter AST, 128-bit XML Nonces, Scrypt N=32768
- Concurrency:      AsyncIO, Kahn's Algorithm O(V+E), AWS SQS, Idempotency Locks
- AI & Vector:      BLAS GEMV, PyTorch, Sentence-Transformers, HyDE, Vertex AI ADC`;
          break;

        case 'certifications':
          outputContent = `CERTIFICATIONS & CREDENTIALS:
1. Google DeepMind: Train A Small Language Model (Jun 2026)
2. Google Cloud:    Deploy Multi-Agent Architectures (Jun 2026)
3. AWS:             AWS Artificial Intelligence Practitioner (May 2026)`;
          break;

        case 'contact':
          outputContent = `CONTACT COORDINATES:
Email:    ${PERSONAL_INFO.email}
Phone:    ${PERSONAL_INFO.phone}
LinkedIn: ${PERSONAL_INFO.linkedinUrl}
GitHub:   ${PERSONAL_INFO.githubUrl}
Location: ${PERSONAL_INFO.location}`;
          break;

        case 'exit':
        case 'quit':
          if (onClose) onClose();
          outputContent = 'Terminal session minimized.';
          break;

        default:
          outputContent = `zsh: command not found: ${cmd}. Type "help" for a list of commands.`;
          entryType = 'error';
          soundManager.playAlert();
          break;
      }

      setEntries((prev) => [
        ...prev,
        { id: `${commandId}-out`, type: entryType, content: outputContent, timestamp },
      ]);
    },
    [onClose]
  );

  return {
    entries,
    executeCommand,
    history,
    historyIndex,
    setHistoryIndex,
    clearTerminal: () => setEntries([]),
  };
}
