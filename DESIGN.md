# Design System & Craft Specification: Garv Vaidya Portfolio Command Center

> Standard: Non-Vibe-Coded Technical Command Center (`pbakaus/impeccable` design principles)
> Philosophy: Systems Engineering Depth meets Micro-Interaction Tactility

---

## 1. Color Palette & Surface Hierarchy

The visual theme strictly rejects generic purple/neon gradient blobs and cookie-cutter templates. It is engineered from deep obsidian, elevated graphite slates, and semantic state accents.

### Core Canvas & Surfaces
- **Canvas Base:** `#08080a` (Deep Obsidian — true dark baseline)
- **Elevated Surface (Card / Module):** `#101114` (Dense Graphite Slate)
- **Active / Hover Surface:** `#16181d` (Elevated slate with subtle specular lift)
- **Overlay Surface (Modal / Drawer / Dialog):** `#0d0e12` (95% opacity with `backdrop-blur-md`)
- **Card Sub-Surfaces / Code blocks:** `#0c0d10`

### Crisp 1px Borders
- **Subtle Resting Border:** `#1f2127` (Crisp 1px baseline boundary)
- **Hover / Interactive Border:** `#2e323b`
- **Focus Ring:** `#38bdf8` (2px solid with 2px offset)
- **Cursor Spotlight Border:** Dynamic radial gradient centered at mouse coordinates `(mouseX, mouseY)` revealing a luminous `#38bdf8` / `#10b981` highlight under the cursor.

### Semantic Status Accents
- **Emerald (`#10b981`):** Systems Nominal, Verified Invariant, 0.0% ASR, Healthy Pool Socket, Active Process.
- **Sky (`#38bdf8`):** Ares BLAS GEMV retrieval, Vector Dot Products, Coordinator Shard, Primary Actions.
- **Amber (`#f59e0b`):** Leviathan DAG Worker Tasks, Transient SQS Retry, CoreDNS Dynamic TTL Countdown, Warning states.
- **Rose (`#ef4444`):** Lucid-CI AST Taint Source/Sink, IDOR Vulnerability Point, Poison Pill acknowledgment.

---

## 2. Typography

Pairing high-readability modern grotesque with razor-sharp monospaced type:
- **UI / Display Font:** `Geist Sans`, `Inter`, system-ui, sans-serif
- **Code / Metrics / Terminal Font:** `Geist Mono`, `JetBrains Mono`, monospace
- **Scale:**
  - `Display`: 2.5rem – 3.5rem (bold, tracking -0.03em)
  - `H1 / H2`: 1.5rem – 2.0rem (semibold, tracking -0.02em)
  - `H3 / Section`: 1.125rem – 1.25rem (medium, tracking -0.01em)
  - `Body`: 0.9375rem – 1.0rem (regular, leading 1.6, text `#9ca3af`)
  - `Code / Metrics / Badges`: 0.8125rem – 0.875rem (mono, tabular numerals)

---

## 3. Micro-Interaction & Tactile Feedback

1. **Spotlight Cards:**
   - 1px border illuminates dynamically with a smooth radial gradient following cursor position on pointer devices.
   - Graceful fallback to crisp static 1px borders on touch/mobile devices.
2. **Opt-in Web Audio Feedback:**
   - Pure Web Audio oscillator synthesis (0 external assets, 0 KB bundle download).
   - Generates micro-click (~800Hz decaying in 15ms) on tactile button actuation.
   - Disabled by default; toggled via sound switch in header with `localStorage` persistence.
3. **Command Palette (`cmdk`):**
   - Instant response on `⌘K` or `Ctrl+K`.
   - Keyboard navigable, accessible focus trap, backdrop dismissal.
4. **Slide-Out Developer Terminal (`~`):**
   - Full Linux command-line simulation with tab completion and history navigation.
   - Drawer slide-out on desktop; swipeable bottom sheet on mobile screens.

---

## 4. Mobile Responsiveness Standards (iOS & Android)

- **Target Viewport Range:** 100% fluid from 320px up to 4K displays.
- **Touch Target Floor:** Minimum `44px x 44px` interactive area for all buttons, inputs, tabs, and toggles.
- **Horizontal Scroll Prevention:** Explicit `overflow-x-hidden` container protection; code blocks and matrix tables support contained inner scroll with visible affordances.
- **Mobile Bottom Sheets:** Terminal and modals convert to native-feeling bottom sheets with grab handles on screen widths `< 768px`.
