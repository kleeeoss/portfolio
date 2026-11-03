/**
 * Pre-computed normalized dense vectors for the Ares BLAS Level-2 GEMV Vector Search Simulator.
 * Demonstrates: s = M * q
 * When unit L2 norm invariant ||v|| = 1.0 is enforced at ingest,
 * Cosine similarity simplifies from (A·B)/(||A||*||B||) to pure matrix dot products.
 */

export interface VectorDocument {
  id: string;
  title: string;
  category: string;
  snippet: string;
  vector: number[]; // 8-dimensional unit normalized feature vector
}

// 8 features:
// 0: Container Sandbox / gVisor
// 1: AST Taint & Security
// 2: Vector Search / BLAS Math
// 3: DAG Orchestration / Kahn
// 4: Distributed SQS & Queues
// 5: Database Connection Pooling & SQL
// 6: Multi-Tenant IDOR & Auth
// 7: LLM Orchestration & Prompt Defense

function normalize(v: number[]): number[] {
  const norm = Math.sqrt(v.reduce((sum, val) => sum + val * val, 0));
  if (norm === 0) return v;
  return v.map((val) => Number((val / norm).toFixed(4)));
}

export const DOCUMENT_CORPUS: VectorDocument[] = [
  {
    id: 'doc-lucid-gvisor',
    title: 'Google gVisor runsc Guest Kernel Syscall Interception',
    category: 'Runtime Security',
    snippet: 'Ephemeral container isolation enforcing ptrace/KVM syscall interception, 512MB RAM, 100 PIDs, and --net none.',
    vector: normalize([0.95, 0.4, 0.05, 0.1, 0.05, 0.05, 0.2, 0.3]),
  },
  {
    id: 'doc-lucid-taint',
    title: 'Tree-sitter AST Taint Flow Analysis & 128-bit Nonce Defense',
    category: 'DevSecOps & AST',
    snippet: 'Automated vulnerability detection tracing tainted input nodes to os.Exec sinks with 0.0% prompt injection ASR.',
    vector: normalize([0.3, 0.95, 0.05, 0.1, 0.05, 0.05, 0.3, 0.85]),
  },
  {
    id: 'doc-ares-blas',
    title: 'Hardware-Accelerated BLAS Level-2 GEMV Matrix Dot Products',
    category: 'Vector Retrieval',
    snippet: 'Collapsing 384-dimensional dense cosine similarity to matrix-vector products s = Mq with sub-millisecond retrieval.',
    vector: normalize([0.05, 0.05, 0.98, 0.1, 0.15, 0.1, 0.05, 0.2]),
  },
  {
    id: 'doc-ares-k8s',
    title: 'Disaggregated Kubernetes Headless Services & 5s DNS TTL',
    category: 'Cloud Infrastructure',
    snippet: 'FastAPI coordinator routing to stateless compute shards with non-blocking CoreDNS TTL caching in run_in_executor.',
    vector: normalize([0.2, 0.05, 0.85, 0.3, 0.4, 0.1, 0.05, 0.1]),
  },
  {
    id: 'doc-leviathan-kahn',
    title: "Kahn's Algorithm O(V+E) Asynchronous DAG Scheduler",
    category: 'Distributed Systems',
    snippet: 'Topological sort dependency engine using collections.deque with pre-flight cycle detection and contract retries.',
    vector: normalize([0.05, 0.1, 0.2, 0.95, 0.7, 0.1, 0.05, 0.3]),
  },
  {
    id: 'doc-leviathan-sqs',
    title: 'Strict AWS SQS Delivery Semantics: Transient Retry vs Poison Drop',
    category: 'Distributed Messaging',
    snippet: 'Decoupled orchestration retaining transient errors for retry while terminal payload failures are purged.',
    vector: normalize([0.1, 0.05, 0.1, 0.8, 0.95, 0.1, 0.05, 0.15]),
  },
  {
    id: 'doc-syncnote-pool',
    title: 'AWS RDS PostgreSQL Bounded Connection Pool (<50ms Latency)',
    category: 'Database Systems',
    snippet: 'Process-level 1-10 socket pooling via psycopg2, eliminating per-request TCP/TLS renegotiation overhead.',
    vector: normalize([0.1, 0.05, 0.1, 0.15, 0.2, 0.95, 0.3, 0.05]),
  },
  {
    id: 'doc-syncnote-idor',
    title: 'Scrypt N=32768 & Compound SQL IDOR Prevention Boundaries',
    category: 'Application Security',
    snippet: 'Stateless JWT auth with compound queries (WHERE id = %s AND user_id = %s) thwarting cross-tenant data leaks.',
    vector: normalize([0.15, 0.3, 0.05, 0.05, 0.05, 0.6, 0.95, 0.2]),
  },
];

// Keyword projection mappings for quick real-time query vectorization
const TERM_WEIGHTS: Record<string, number[]> = {
  container: [0.9, 0.2, 0, 0, 0, 0, 0.1, 0.1],
  gvisor: [1.0, 0.3, 0, 0, 0, 0, 0.2, 0.1],
  sandbox: [0.95, 0.4, 0, 0, 0, 0, 0.1, 0.2],
  kernel: [0.9, 0.1, 0, 0, 0, 0, 0, 0],
  syscall: [0.95, 0.3, 0, 0, 0, 0, 0, 0],
  ast: [0.2, 0.95, 0, 0.2, 0, 0, 0.1, 0.6],
  taint: [0.1, 1.0, 0, 0, 0, 0, 0.2, 0.5],
  injection: [0.2, 0.9, 0, 0, 0, 0, 0.3, 0.9],
  nonce: [0.1, 0.8, 0, 0, 0, 0, 0.3, 0.95],
  security: [0.5, 0.7, 0, 0, 0, 0.2, 0.8, 0.4],
  vector: [0, 0, 1.0, 0.1, 0.1, 0, 0, 0.2],
  blas: [0, 0, 1.0, 0, 0, 0, 0, 0],
  gemv: [0, 0, 1.0, 0, 0, 0, 0, 0],
  cosine: [0, 0, 0.95, 0, 0, 0, 0, 0.1],
  embedding: [0, 0, 0.9, 0, 0, 0, 0, 0.3],
  kubernetes: [0.2, 0, 0.7, 0.2, 0.3, 0.1, 0, 0],
  dns: [0.1, 0, 0.8, 0.1, 0.2, 0.1, 0, 0],
  shard: [0, 0, 0.85, 0.3, 0.2, 0.1, 0, 0],
  dag: [0, 0.1, 0.1, 1.0, 0.5, 0, 0, 0.2],
  kahn: [0, 0, 0.1, 1.0, 0.4, 0, 0, 0.1],
  topological: [0, 0, 0, 1.0, 0.3, 0, 0, 0],
  orchestrator: [0.1, 0, 0.1, 0.9, 0.7, 0, 0, 0.3],
  queue: [0, 0, 0, 0.6, 1.0, 0.2, 0, 0],
  sqs: [0, 0, 0, 0.5, 1.0, 0.1, 0, 0],
  poison: [0, 0, 0, 0.4, 0.9, 0, 0, 0],
  retry: [0, 0, 0, 0.6, 0.85, 0.1, 0, 0],
  database: [0, 0, 0, 0.1, 0.1, 1.0, 0.3, 0],
  postgres: [0, 0, 0, 0, 0.1, 1.0, 0.2, 0],
  pool: [0, 0, 0, 0.1, 0.2, 1.0, 0.1, 0],
  socket: [0.1, 0, 0, 0, 0.1, 0.9, 0.1, 0],
  connection: [0, 0, 0, 0.1, 0.2, 0.9, 0.1, 0],
  idor: [0, 0.4, 0, 0, 0, 0.5, 1.0, 0.1],
  tenant: [0, 0.2, 0, 0, 0, 0.5, 0.95, 0],
  scrypt: [0, 0.1, 0, 0, 0, 0.2, 1.0, 0],
  jwt: [0, 0.1, 0, 0, 0, 0.2, 0.95, 0],
  auth: [0, 0.2, 0, 0, 0, 0.3, 0.95, 0],
  llm: [0, 0.4, 0.3, 0.2, 0.1, 0, 0.1, 1.0],
  prompt: [0, 0.7, 0.1, 0, 0, 0, 0.2, 1.0],
};

/**
 * Project user query into normalized 8-dimensional space
 */
export function queryToVector(query: string): number[] {
  const words = query.toLowerCase().replace(/[^a-z0-9 ]/g, '').split(/\s+/).filter(Boolean);
  const q = [0, 0, 0, 0, 0, 0, 0, 0];

  if (words.length === 0) {
    // Default balanced query vector
    return normalize([0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3]);
  }

  for (const word of words) {
    let matched = false;
    for (const [key, weights] of Object.entries(TERM_WEIGHTS)) {
      if (word.includes(key) || key.includes(word)) {
        matched = true;
        for (let i = 0; i < 8; i++) {
          q[i] += weights[i];
        }
      }
    }
    if (!matched) {
      // Hash unknown tokens deterministically to synthetic dimensions
      const hash = word.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
      q[hash % 8] += 0.25;
    }
  }

  return normalize(q);
}

/**
 * BLAS Level-2 GEMV Dot Product:
 * Computes s = M * q for each row in matrix M.
 * Since q and all rows in M are unit normalized, s_i = dot(M_i, q).
 */
export function computeBlasGemv(
  queryVector: number[],
  corpus: VectorDocument[] = DOCUMENT_CORPUS
): { doc: VectorDocument; score: number; dotBreakdown: number[] }[] {
  const results = corpus.map((doc) => {
    let dot = 0;
    const dotBreakdown: number[] = [];
    for (let i = 0; i < 8; i++) {
      const term = queryVector[i] * doc.vector[i];
      dot += term;
      dotBreakdown.push(Number(term.toFixed(3)));
    }
    // Clamp score between 0 and 1 for display
    const score = Math.max(0, Math.min(1, dot));
    return {
      doc,
      score: Number(score.toFixed(4)),
      dotBreakdown,
    };
  });

  return results.sort((a, b) => b.score - a.score);
}
