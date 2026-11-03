import {
  FlagshipProject,
  SecondaryProject,
  EmpiricalInvariant,
  Certification,
} from './types';

export const PERSONAL_INFO = {
  name: 'Garv Vaidya',
  handle: '@kleeeoss',
  title: 'Systems, Cloud Infrastructure & Applied AI Engineer',
  location: 'Jabalpur, India',
  email: 'garvvaidya24@outlook.com',
  phone: '+91 7067769237',
  githubUrl: 'https://github.com/kleeeoss',
  linkedinUrl: 'https://www.linkedin.com/in/garvaidya/',
  twitterUrl: 'https://x.com/Garv_Vaidya',
  resumePdfUrl: '/resume.pdf',
  summary:
    'Systems-focused software engineer architecting hardened container isolation sandboxes, distributed workflow engines, and disaggregated high-throughput vector search infrastructure. Focused on deterministic cloud runtimes, low-overhead persistence, and contract-first LLM orchestration.',
  education: {
    institution: 'Hitkarini College of Engineering and Technology',
    location: 'Jabalpur, MP, India',
    degree: 'B.Tech in Computer Science & Engineering (RGPV, Bhopal)',
    period: '2023 — 2027',
    cgpa: '7.17 / 10',
  },
};

export const FLAGSHIP_PROJECTS: FlagshipProject[] = [
  {
    id: 'lucid-ci',
    name: 'Lucid-CI',
    tagline: 'AI-Native DevSecOps Platform & Dynamic Sandbox',
    description:
      'Enterprise-grade DevSecOps continuous integration platform and dynamic execution engine that detects hallucinated dependencies, insecure code patterns, and executes untrusted code inside hardened user-space kernel sandboxes.',
    deploymentBadge: 'Deployed on AWS EC2',
    githubUrl: 'https://github.com/kleeeoss/project-lucid',
    techStack: [
      'Go',
      'Python',
      'FastAPI',
      'Google gVisor (runsc)',
      'Docker',
      'Terraform',
      'AWS (EC2, SQS)',
      'Vertex AI',
    ],
    keyInvariants: [
      '0.0% ASR Dynamic Nonce Defense',
      'Zero Host Escapes via gVisor',
      'Syscall Interception & ptrace/KVM',
      '512MB RAM / 100 PIDs / --net none',
    ],
    metrics: [
      {
        label: 'Prompt Injection ASR',
        value: '0.0%',
        verified: true,
        benchmarkContext: '0/20 breached across adversarial vectors',
      },
      {
        label: 'Untrusted Code Isolation',
        value: '0 Escapes',
        verified: true,
        benchmarkContext: 'gVisor runsc guest kernel sandbox',
      },
      {
        label: 'AST Taint Walk Latency',
        value: '< 21 ms',
        verified: true,
        benchmarkContext: 'Pure-Go Tree-sitter AST traversal',
      },
      {
        label: 'Cryptographic Nonce',
        value: '128-bit',
        verified: true,
        benchmarkContext: 'Dynamic XML boundary fencing',
      },
    ],
    highlights: [
      'Ephemeral Dynamic Isolation Sandbox on AWS EC2 enforcing syscall interception, strict cgroup resource constraints (512MB RAM, 100 PIDs), and zero-network isolation (--net none).',
      'Cryptographic XML Nonce Fencing via Vertex AI (gemini-3.5-flash-lite) neutralizing prompt injection across 20 adversarial attack vectors with a verified 0.0% Attack Success Rate (ASR).',
      'AST Taint Engine & IaC Automation pairing a Go Tree-sitter AST taint analyzer with Pydantic V2 patch validation, automated model failover, and modular Terraform provisioning.',
    ],
  },
  {
    id: 'ares',
    name: 'Ares',
    tagline: 'Disaggregated Cloud-Native Vector Search Engine',
    description:
      'A disaggregated, horizontally scalable vector database and AI memory backend engineered for low-latency dense retrieval across Kubernetes compute shards.',
    deploymentBadge: 'Deployed on Kubernetes',
    githubUrl: 'https://github.com/kleeeoss/project-ares',
    techStack: [
      'Python 3.12',
      'FastAPI',
      'PyTorch',
      'Sentence-Transformers',
      'Docker',
      'Kubernetes',
      'CoreDNS',
      'BLAS Level-2 GEMV',
    ],
    keyInvariants: [
      'Hardware BLAS Level-2 GEMV s = Mq',
      'Unit L2 Norm Invariant Enforcement',
      'p95 = 596.81ms Query Latency',
      'Non-blocking 5.0s CoreDNS TTL Cache',
    ],
    metrics: [
      {
        label: 'p95 Query Latency',
        value: '596.81 ms',
        verified: true,
        benchmarkContext: 'Under concurrent load (50 reqs, 5 clients)',
      },
      {
        label: 'Retrieval Algorithm',
        value: 'BLAS GEMV',
        verified: true,
        benchmarkContext: 's = Mq on 384-d normalized embeddings',
      },
      {
        label: 'DNS Cache TTL',
        value: '5.0s TTL',
        verified: true,
        benchmarkContext: 'Non-blocking in run_in_executor',
      },
      {
        label: 'Autoscaling Trigger',
        value: '50% CPU HPA',
        verified: true,
        benchmarkContext: 'Stateless worker compute shards',
      },
    ],
    highlights: [
      'Disaggregated Coordinator-Shard Topology decoupling an asynchronous FastAPI coordinator from stateless worker shards via Kubernetes headless services and dynamic CoreDNS caching.',
      'Hardware-Accelerated BLAS GEMV Retrieval vectorizing cosine similarity over 384-dimensional dense embeddings (all-MiniLM-L6-v2), collapsing search queries to matrix-vector products.',
      'Coordinator-Isolated HyDE & Atomic Snapshots integrating Vertex AI query expansion and atomic .npz index snapshotting (POSIX atomic renames) to node-local emptyDir mounts.',
    ],
  },
  {
    id: 'leviathan',
    name: 'Leviathan',
    tagline: 'Distributed DAG Workflow Orchestrator',
    description:
      'An asynchronous distributed task orchestrator providing directed acyclic graph (DAG) dependency resolution, resilient queueing, and contract-governed LLM steps.',
    deploymentBadge: 'Distributed DAG Engine',
    githubUrl: 'https://github.com/kleeeoss/project-leviathan',
    techStack: [
      'Python 3.12',
      'AsyncIO',
      'AWS SQS',
      'LocalStack',
      'Terraform',
      'Docker',
      'Pydantic (V2)',
      'Vertex AI',
    ],
    keyInvariants: [
      "O(V+E) Kahn's Algorithm",
      'Strict SQS Retry vs Poison Purge',
      'Contract-First Pydantic V2 Retries',
      'Cumulative FinOps Token Accounting',
    ],
    metrics: [
      {
        label: 'Topological Sort Complexity',
        value: 'O(V + E)',
        verified: true,
        benchmarkContext: "Kahn's algorithm with collections.deque",
      },
      {
        label: 'Queue Delivery Semantics',
        value: '0 Cascade',
        verified: true,
        benchmarkContext: 'Transient retry vs poison deletion',
      },
      {
        label: 'Structured Output Retries',
        value: 'Contract-First',
        verified: true,
        benchmarkContext: 'Pydantic V2 schema attribute validation',
      },
      {
        label: 'Backoff Strategy',
        value: 'Exp + Jitter',
        verified: true,
        benchmarkContext: 'Additive uniform jitter preventing spikes',
      },
    ],
    highlights: [
      "Topological DAG Scheduling Engine implementing Kahn's algorithm (O(V+E) with collections.deque) for dependency resolution and pre-flight cycle detection in Python 3.12 and AsyncIO.",
      'Strict SQS Message Queue Semantics decoupling scheduling from worker execution over LocalStack AWS SQS, retaining transient errors for retry while terminal errors are safely acknowledged and deleted.',
      'Contract-First LLM Ingestion & FinOps Metering enforcing Pydantic V2 structured outputs via Vertex AI with automated validation retries and real-time token telemetry.',
    ],
  },
  {
    id: 'syncnote',
    name: 'SyncNote',
    tagline: 'Multi-Tenant Cloud Note Service',
    description:
      'A secure, containerized multi-tenant persistence backend engineered for low-latency synchronization and strict tenant boundary isolation.',
    deploymentBadge: 'Deployed on AWS EC2 + RDS',
    githubUrl: 'https://github.com/kleeeoss/syncnote-api',
    techStack: [
      'Python',
      'Flask',
      'PostgreSQL 16',
      'psycopg2',
      'Docker',
      'AWS (EC2, RDS)',
      'Gunicorn',
      'Scrypt Hashing',
    ],
    keyInvariants: [
      'Bounded Connection Pool (1-10 Sockets)',
      'Sub-50ms Query Latency',
      'Compound SQL IDOR Protection',
      'Scrypt Key Derivation N=32768',
    ],
    metrics: [
      {
        label: 'DB Persistence Latency',
        value: '< 50 ms',
        verified: true,
        benchmarkContext: 'Bounded connection pool eliminates TLS handshakes',
      },
      {
        label: 'Tenant Isolation',
        value: 'Protected',
        verified: true,
        benchmarkContext: 'WHERE id = %s AND user_id = %s compound SQL',
      },
      {
        label: 'Key Derivation',
        value: 'N = 32768',
        verified: true,
        benchmarkContext: 'Scrypt CPU/memory-hard password hashing',
      },
      {
        label: 'Container Security',
        value: 'Zero Secret',
        verified: true,
        benchmarkContext: 'Verified rootfs layer inspection',
      },
    ],
    highlights: [
      'AWS Cloud Architecture deployed on AWS EC2 served by Gunicorn and connected to a managed AWS RDS PostgreSQL 16 instance over VPC security groups with dual-mode 12-factor DSN.',
      'Bounded Connection Pooling utilizing process-level pooling via psycopg2 (1–10 sockets), eliminating per-request TCP handshakes and TLS renegotiation to achieve sub-50ms responses.',
      'Tenant Isolation & Zero-Secret Rootfs enforcing Scrypt password hashing (N=32768), stateless JWT tokens, compound SQL IDOR prevention, and verified container rootfs isolation.',
    ],
  },
];

export const SECONDARY_PROJECTS: SecondaryProject[] = [
  {
    id: 'mock-vulnerable-repo',
    name: 'mock-vulnerable-repo',
    domain: 'DevSecOps & AST Benchmark Testbed',
    description:
      'Synthetic polyglot testbed repository (SQL injection, command execution, deserialization flaws, hallucinated package imports) engineered as regression test fixtures for Lucid-CI.',
    githubUrl: 'https://github.com/kleeeoss/mock-vulnerable-repo',
    techStack: ['Python', 'Go', 'JavaScript', 'AST Fixtures', 'OWASP Top 10'],
    architectureNotes:
      'Validates Lucid-CI Go Tree-sitter AST taint engine and gVisor isolation sandbox against 20+ realistic exploit permutations.',
  },
  {
    id: 'oblivion',
    name: 'oblivion',
    domain: 'Systems Hardening & Storage Sanitization',
    description:
      'Enterprise IT asset sanitization platform providing cryptographically verifiable wipe proofs and multi-pass cryptographic pseudorandom pattern overwrites.',
    githubUrl: 'https://github.com/kleeeoss/oblivion',
    techStack: ['Python', 'C++', 'POSIX Storage', 'Cryptography', 'NIST SP 800-88'],
    architectureNotes:
      'DoD 5220.22-M and NIST SP 800-88 compliant storage wiping routines generating signed SHA-256 public verification certificates.',
  },
  {
    id: 'veritas',
    name: 'veritas',
    domain: 'Applied Cryptography & Forensics',
    description:
      'Digital media integrity verification platform providing SHA-256 cryptographic fingerprinting, tamper detection, artifact auditing, and explainable forensic scoring.',
    githubUrl: 'https://github.com/kleeeoss/veritas',
    techStack: ['Python', 'FastAPI', 'OpenCV', 'PyTorch', 'Cryptography'],
    architectureNotes:
      'Multi-stage forensic pipeline inspecting file metadata anomalies, compression quantization fingerprints, and cryptographic hash verification.',
  },
  {
    id: 'beacon',
    name: 'beacon',
    domain: 'Predictive Analytics & Intervention Systems',
    description:
      'Student wellness monitoring backend featuring automated sentiment analysis pipelines, stress-factor indicators, and explainable intervention tracking.',
    githubUrl: 'https://github.com/kleeeoss/beacon',
    techStack: ['Python', 'FastAPI', 'PostgreSQL', 'Transformers', 'Docker'],
    architectureNotes:
      'Asynchronous ingestion pipeline scoring student sentiment trends with strict anonymization boundaries and role-based intervention alerts.',
  },
  {
    id: 'aura-productivity-suite',
    name: 'aura-productivity-suite',
    domain: 'Desktop Runtimes & Audio Synthesis',
    description:
      'Cross-platform desktop application built with React 19, Tauri v2, and Electron. Implements drift-immune background timers decoupled from main-thread throttling.',
    githubUrl: 'https://github.com/kleeeoss/aura-productivity-suite',
    techStack: ['React 19', 'Tauri v2', 'Rust', 'Web Audio API', 'TypeScript'],
    architectureNotes:
      'Web Workers timer decoupling to ensure sub-millisecond precision during background tab suspension, paired with native Web Audio pink noise generators.',
  },
  {
    id: 'algorithm-visualizer',
    name: 'algorithm-visualizer',
    domain: 'DSA & State Transition Engine',
    description:
      'Interactive visualization engine demonstrating step-by-step state transitions for sorting algorithms (QuickSort, MergeSort, HeapSort) and fundamental graph structures.',
    githubUrl: 'https://github.com/kleeeoss/algorithm-visualizer',
    techStack: ['TypeScript', 'Canvas API', 'React', 'DSA Runtimes'],
    architectureNotes:
      'Deterministic frame-stepping state machine allowing bidirectional replay and runtime comparison of O(N log N) vs O(N^2) complexity curves.',
  },
  {
    id: 'Hybrid-Finance-Tracker',
    name: 'Hybrid-Finance-Tracker',
    domain: 'Ledger & Personal Finance Engine',
    description:
      'CLI and REST API personal finance ledger built with Python, Flask, and SQLite, implementing double-entry transaction categorization and balance auditing.',
    githubUrl: 'https://github.com/kleeeoss/Hybrid-Finance-Tracker',
    techStack: ['Python', 'Flask', 'SQLite', 'Click CLI', 'Pytest'],
    architectureNotes:
      'Strict ACID transaction boundaries preventing ledger drift with parameterized audit trails and balance reconciliation.',
  },
];

export const EMPIRICAL_INVARIANTS: EmpiricalInvariant[] = [
  {
    id: 'inv-1',
    system: 'Lucid-CI',
    evaluatedInvariant: 'Prompt Injection Defense',
    benchmarkMetric: '0.0% ASR (0/20 breached)',
    verificationMechanism: '128-bit dynamic cryptographic XML nonce boundaries via Vertex AI ADC',
    status: 'VERIFIED',
  },
  {
    id: 'inv-2',
    system: 'Lucid-CI',
    evaluatedInvariant: 'Untrusted Code Isolation',
    benchmarkMetric: '0 Host Escapes',
    verificationMechanism: 'Google gVisor (runsc) user-space kernel, 512MB RAM / 100 PIDs, --net none',
    status: 'VERIFIED',
  },
  {
    id: 'inv-3',
    system: 'Ares',
    evaluatedInvariant: 'Dense Vector Retrieval Latency',
    benchmarkMetric: 'p95 = 596.81 ms',
    verificationMechanism: 'Hardware BLAS Level-2 GEMV (s = Mq) on 384-d normalized embeddings',
    status: 'VERIFIED',
  },
  {
    id: 'inv-4',
    system: 'Ares',
    evaluatedInvariant: 'Shard Discovery & DNS',
    benchmarkMetric: '5.0s TTL Cache',
    verificationMechanism: 'Non-blocking asynchronous CoreDNS resolver via run_in_executor',
    status: 'VERIFIED',
  },
  {
    id: 'inv-5',
    system: 'Leviathan',
    evaluatedInvariant: 'Task Graph Scheduling',
    benchmarkMetric: 'O(V + E) Complexity',
    verificationMechanism: "Kahn's algorithm with collections.deque and pre-flight cycle detection",
    status: 'VERIFIED',
  },
  {
    id: 'inv-6',
    system: 'Leviathan',
    evaluatedInvariant: 'Queue Delivery Semantics',
    benchmarkMetric: 'Zero Poison Cascade',
    verificationMechanism: 'Strict SQS delivery: transient retention for retry vs terminal ACK/delete',
    status: 'VERIFIED',
  },
  {
    id: 'inv-7',
    system: 'SyncNote',
    evaluatedInvariant: 'DB Persistence Overhead',
    benchmarkMetric: '< 50 ms Latency',
    verificationMechanism: 'Process-level bounded connection pooling (1-10 sockets) to AWS RDS PostgreSQL',
    status: 'VERIFIED',
  },
  {
    id: 'inv-8',
    system: 'SyncNote',
    evaluatedInvariant: 'Tenant Boundary & Auth',
    benchmarkMetric: 'IDOR Protected',
    verificationMechanism: 'Scrypt (N=32768), stateless JWT tokens, compound SQL WHERE id=%s AND user_id=%s',
    status: 'VERIFIED',
  },
];

export const CERTIFICATIONS: Certification[] = [
  {
    id: 'cert-1',
    title: 'Train A Small Language Model',
    issuer: 'Google DeepMind',
    date: 'Jun 2026',
    credentialBadge: 'DeepMind Certified',
    verificationTopic: 'SLM training pipelines, fine-tuning parameter dynamics, tokenizer optimization',
  },
  {
    id: 'cert-2',
    title: 'Deploy Multi-Agent Architectures',
    issuer: 'Google Cloud',
    date: 'Jun 2026',
    credentialBadge: 'Google Cloud Certified',
    verificationTopic: 'Distributed agent orchestration, tool routing, deterministic state management',
  },
  {
    id: 'cert-3',
    title: 'AWS Artificial Intelligence Practitioner',
    issuer: 'Amazon Web Services',
    date: 'May 2026',
    credentialBadge: 'AWS Certified',
    verificationTopic: 'Cloud AI services, foundation model evaluation, AWS infrastructure scaling',
  },
];
