<div align="center">

# Garv Vaidya — Portfolio Command Center

### **Systems, Cloud Infrastructure & Applied AI Engineer**

[![Status](https://img.shields.io/badge/Systems-Nominal-10b981?style=flat-square)](https://github.com/kleeeoss/portfolio)
[![Next.js 15](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind-v4-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)

*An ultra-high craft, non-vibe-coded portfolio command center bridging systems engineering depth with tactile micro-interactions.*

</div>

---

## 🏛 Architecture & Engineering Highlights

This command center showcases verified systems engineering projects with interactive in-browser simulations rather than passive screenshots:

1. **[Lucid-CI](https://github.com/kleeeoss/project-lucid) Simulation:**
   - In-browser AST Taint flow stepper tracing untrusted input from HTTP sources through Go Tree-sitter nodes to execution sinks.
   - Interactive Google gVisor (`runsc`) guest kernel sandbox toggle displaying live syscall interception (`SYS_execve` trapped, `--net none` zero egress, 512MB RAM / 100 PID cgroup limits) with a verified `0.0% ASR` defense.

2. **[Ares](https://github.com/kleeeoss/project-ares) Simulation:**
   - Live client-side cosine similarity calculator executing hardware BLAS Level-2 GEMV matrix-vector products ($\mathbf{s} = M\mathbf{q}$) on synthetic normalized embeddings upon typing.
   - Dynamic non-blocking CoreDNS TTL cache countdown simulation (5.0s TTL in `run_in_executor`).

3. **[Leviathan](https://github.com/kleeeoss/project-leviathan) Simulation:**
   - Live topological sort dependency engine animating Kahn's algorithm ($O(V + E)$ with `collections.deque`).
   - Fault injection toggle: transient error message retention in AWS SQS with exponential backoff & uniform jitter vs. poison pill acknowledgment & deletion without cascading failures.

4. **[SyncNote](https://github.com/kleeeoss/syncnote-api) Simulation:**
   - Process-level bounded connection pool visualizer (1–10 PostgreSQL sockets via `psycopg2`) measuring sub-50ms query latency vs unpooled TCP/TLS handshakes.
   - SQL IDOR boundary simulator contrasting naive `WHERE id = %s` against compound parameterized queries `WHERE id = %s AND user_id = %s`.

5. **Direct In-Site Contact Terminal & 1-Click Copy:**
   - In-site transmission form dispatching directly to `garvvaidya24@outlook.com`.
   - 1-click email copy with instant visual checkmark and tactile Web Audio chime.

6. **Power-User Developer CLI Terminal (`~`):**
   - Slide-out authentic terminal drawer (swipeable bottom sheet on mobile) supporting commands: `help`, `cat resume`, `lucid --bench`, `ares --query <text>`, `leviathan --dag`, `syncnote --pool`, `skills`, `certifications`, `contact`, `clear`.

7. **Global Command Palette (`⌘K` / `Ctrl+K`):**
   - Powered by Paco Coursey's `cmdk` with deep keyboard navigation, focus management, and quick navigation.

8. **Sound Synthesis & Spotlight Physics:**
   - Pure Web Audio oscillator synthesis (0 external audio files) generating subtle 15ms tactile clicks and nominal state blips.
   - Cursor-tracking 1px spotlight card borders.

---

## 🛠 Tech Stack

- **Framework:** Next.js 15 (App Router, Static Export & Edge-ready)
- **Library:** React 19 (Server & Client Components)
- **Styling:** Tailwind CSS v4 + Custom Obsidian Design Tokens (`#08080a`, `#101114`, `#1f2127`)
- **Animations:** Framer Motion
- **Command Palette:** `cmdk`
- **Icons:** Lucide React
- **Audio:** Web Audio API (Zero external assets)
- **Language:** TypeScript 5 (Strict Mode)

---

## 🚀 Local Development

```bash
# Clone the repository
git clone https://github.com/kleeeoss/portfolio.git
cd portfolio

# Install dependencies
npm install

# Start development server
npm run dev

# Run production build & type verification
npm run build
```

---

## 📊 Systems & Invariants Matrix

| System | Evaluated Invariant | Benchmark Metric | Verification Mechanism |
| :--- | :--- | :--- | :--- |
| **Lucid-CI** | Prompt Injection Defense | `0.0% ASR` (0/20 breached) | 128-bit dynamic cryptographic XML nonce boundaries via Vertex AI ADC |
| **Lucid-CI** | Untrusted Code Isolation | `0 Host Escapes` | Google gVisor (`runsc`) user-space kernel, 512MB RAM / 100 PIDs, `--net none` |
| **Ares** | Dense Vector Retrieval | `p95 = 596.81 ms` | Hardware BLAS Level-2 GEMV ($\mathbf{s} = M\mathbf{q}$) on 384-d normalized embeddings |
| **Ares** | Shard Discovery & DNS | `5.0s TTL Cache` | Non-blocking asynchronous CoreDNS resolver via `run_in_executor` |
| **Leviathan** | Task Graph Scheduling | `O(V + E)` Complexity | Kahn's algorithm with `collections.deque` and pre-flight cycle detection |
| **Leviathan** | Queue Delivery Semantics | `Zero Poison Cascade` | Strict SQS delivery: transient retention for retry vs terminal ACK/delete |
| **SyncNote** | DB Persistence Overhead | `< 50 ms Latency` | Process-level bounded connection pooling (1–10 sockets) to AWS RDS PostgreSQL 16 |
| **SyncNote** | Tenant Boundary & Auth | `IDOR Protected` | Scrypt ($N = 32768$), stateless JWT bearer tokens, compound SQL |

---

<div align="center">
  <sub>Engineered by <b>Garv Vaidya</b> • Built for determinism, resilience, and security.</sub>
</div>
