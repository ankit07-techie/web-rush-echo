# ECHOES — System Architecture & Engineering Blueprint

This document details the architectural principles, component structure, state management patterns, and audio processing pipelines that power **ECHOES**.

---

## 1. High-Level Architecture

ECHOES adopts a modular, unidirectional data architecture optimized for high-performance audio synthesis, reactive state synchronization, and accessible UI interaction.

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│                             Global Application Core                         │
│                                 (App.tsx)                                   │
└────────┬─────────────────────────────┬─────────────────────────────┬────────┘
         │                             │                             │
┌────────▼───────────┐      ┌──────────▼───────────┐      ┌──────────▼──────────┐
│   Navigation Rail  │      │  Active View Router  │      │ Sound Capsule Player│
│• NavigationSidebar │      │• HomeView            │      │• HTML5 Audio Stream │
│• MobileBottomDock  │      │• TimelineView        │      │• Web Audio Synth    │
│• GlobalHeader      │      │• MyStoryView         │      │• Spotify Mini-Embed │
│• SearchPalette ⌘K  │      │• ArtistsAndSongsView │      │• Loop & Seek Engine │
│• ReceiptModal      │      │• ConnectionExplorer  │      │• Visualizer Canvas  │
└────────────────────┘      │• PatternsView        │      └─────────────────────┘
                            └──────────┬───────────┘
                                       │
                    ┌──────────────────▼──────────────────┐
                    │       Data & Service Layer          │
                    │• mockData.ts (Telemetry Store)      │
                    │• songService.ts (Live Search & API) │
                    │• types.ts (Domain Models & Schemas) │
                    └─────────────────────────────────────┘
```

---

## 2. Component Hierarchy & Module Breakdown

| Path | Purpose | Key Responsibilities |
| :--- | :--- | :--- |
| `src/App.tsx` | Master Orchestrator | Tab switching, global audio context tracking, modal state orchestration |
| `src/components/GlobalHeader.tsx` | Telemetry Header | Archive status indicator, search palette trigger, quick playback pill, receipt shortcut |
| `src/components/NavigationSidebar.tsx` | Primary Navigation | Collapsible desktop rail with active view indicators and branding |
| `src/components/SoundPlayer.tsx` | Unified Audio Player | Dual-engine playback (stream preview & Web Audio API), repeat/loop logic, volume control, waveform visualizer |
| `src/components/SearchPaletteModal.tsx` | Command Palette | Global `Cmd+K` / `Ctrl+K` modal, fuzzy search across memory archive, live external catalog queries |
| `src/components/ReceiptModal.tsx` | Thermal Paper Generator | Monospaced receipt simulation, theme switching (paper/dark), plain-text export, `@media print` layout |
| `src/views/HomeView.tsx` | Executive Dashboard | 5.8-year exposure overview, 24-hour chronobiological matrix, atmospheric radar, obsession streaks |
| `src/views/TimelineView.tsx` | Temporal Spline Stream | SVG Bezier curve waveforms, solstice comparisons, skeuomorphic 15 IPS cassette tape spool |
| `src/views/MyStoryView.tsx` | Narrative Epochs | 6 biographical music chapters, audio fingerprint shifts, synchronized thermal paper preview |
| `src/views/ArtistsAndSongsView.tsx` | Catalog Ledger | Filterable track ledger (100+ items), artist dossiers, live Spotify metadata lookup |
| `src/views/ConnectionExplorerView.tsx` | Neural Tapestry | Relational graph engine with 3 layout algorithms: Constellation, Concentric Era Rings, Chord Flow |
| `src/views/PatternsView.tsx` | Behavioral Anomaly Hub | Habit analysis, pattern catalysts with instant playback, slide-out thermal receipt drawer |

---

## 3. Audio Engine & Synthesis Pipeline

The audio subsystem combines three fallback tiers to ensure continuous playback across all browser configurations:

```text
                                 [Play Request Trigger]
                                           │
                        ┌──────────────────┴──────────────────┐
                        │                                     │
           [Has Valid Preview URL?]               [Preview URL Unavailable]
                        │                                     │
           ┌────────────▼────────────┐           ┌────────────▼────────────┐
           │   HTML5 Audio Engine    │           │ Web Audio API Synthesizer│
           │ • 30-second HQ stream   │           │ • AudioContext Node     │
           │ • Precise seek slider   │           │ • Multi-Oscillator Drone│
           │ • Zero-latency loop     │           │ • Biquad Lowpass Filter │
           │   threshold detection   │           │ • Master Gain Automation│
           └────────────┬────────────┘           └────────────┬────────────┘
                        │                                     │
                        └──────────────────┬──────────────────┘
                                           │
                           ┌───────────────▼───────────────┐
                           │   Spotify Web Player Embed    │
                           │ • Mini-player iframe fallback │
                           │ • Sanitized track ID embed    │
                           └───────────────────────────────┘
```

### 3.1 Web Audio API Ambient Harmonizer
When synthesized fallback mode is engaged, a procedural harmonic chord drone is constructed:
- **Oscillator Nodes**: Multiple simultaneous sine oscillators tuned to root, minor third, and perfect fifth intervals.
- **BiquadFilterNode**: Dynamic low-pass filter with gentle resonance cutoff to prevent harsh high frequencies.
- **GainNode Envelope**: Exponential volume ramping (`linearRampToValueAtTime`) preventing audio pop artifacts during start and stop transitions.

### 3.2 High-Res Preview & Loop Engine
When real audio previews are streamed:
- **Audio Lifecycle**: Managed via an internal `HTMLAudioElement` instance with event listeners for `timeupdate`, `loadedmetadata`, `ended`, and `error`.
- **Zero-Latency Repeat Logic**: Rather than relying exclusively on `audio.loop = true` (which can freeze on mobile browsers), a dual mechanism checks both `audio.onended` and a threshold check (`currentTime >= duration - 0.2s`) to seek to `0.0` and immediately resume uninterrupted playback.

---

## 4. Graph Theory & Layout Algorithms (Neural Tapestry)

The **Connection Explorer** (`ConnectionExplorerView.tsx`) visualizes complex relational networks between artists, landmark tracks, emotional eras, and listening habits. It features three distinct mathematical coordinate engines:

### 1. Constellation Engine (Organic Force-Clustered)
Distributes nodes according to relational affinity and type weight:
- Centralizes anchor nodes with higher play tallies.
- Clusters genre-correlated artists and songs using organic spring-like offsets.

### 2. Concentric Era Rings Engine
Arranges nodes onto three mathematically defined orbital radii:
- **Inner Core ($r = 85\text{px}$)**: Emotional Eras & Habit anchors.
- **Middle Orbit ($r = 180\text{px}$)**: Primary Artists.
- **Outer Orbit ($r = 265\text{px}$)**: Signature Tracks.
- Nodes along each ring are evenly spaced using circular angle intervals: $\theta_i = \frac{2\pi \cdot i}{N}$.

### 3. Chord Flow Engine (Perimeter Distribution)
- Distributes all active nodes evenly along the outer boundary of the circle.
- Connects related nodes via quadratic Bezier paths that pass through an attractive center coordinate, allowing visual inspection of musical density across eras.

---

## 5. Archival Thermal Receipt & Print Engine

The thermal paper receipt module (`ReceiptModal.tsx`) bridges digital listening analytics with physical print materiality:

```text
[Digital State] ──> [Skeuomorphic Paper Canvas] ──> [@media print CSS] ──> [Physical / PDF Print]
```

### Key Technical Attributes:
- **Perforated Edge CSS**: Simulated tear edges created using pure CSS linear gradients and mask calculations without image assets.
- **Monospaced Layout**: Strict column alignments using `font-mono` (`JetBrains Mono`) ensuring authentic cash-register character grid spacing.
- **Vector Barcode**: Dynamically rendered SVG bars encoding archive timestamp hashes.
- **Print Isolation**: Dedicated `@media print` stylesheet:
  - Hides non-receipt DOM nodes (`nav`, `header`, `aside`, modals, backdrop overlays).
  - Resets background to pure white `#FFFFFF` and text to pure black `#000000`.
  - Centers `#printable-receipt` for paper margins and standard thermal roll widths (80mm / 58mm).

---

## 6. Security, Privacy & Performance Safeguards

1. **Input Sanitization**: All Spotify identifiers are strictly filtered with `replace(/[^a-zA-Z0-9]/g, '')` before iframe URL interpolation.
2. **Referrer Policy**: All external album covers and artist portraits use `referrerPolicy="no-referrer"` to prevent exposing browsing headers.
3. **Lazy Asset Loading**: All image tags define `loading="lazy"` and `decoding="async"`, avoiding layout shifts (CLS) and optimizing First Contentful Paint (FCP).
4. **Accessible Landmarks**: Fully compliant with WCAG AA guidelines, including a top-level skip navigation link, semantic dialog tags, and full keyboard escape sequences.

---

## 7. Export Engine & Forensic Telemetry Packaging (`src/utils/exportUtils.ts`)

To support deep analytical exploration, the archive provides a dual-format export pipeline:

1. **RFC 4180 CSV Generation**:
   - Compiles track rankings, play frequencies, listening hours, BPM, musical keys, and temporal timestamps.
   - Escapes special characters, double quotes, and commas to guarantee clean ingestion into spreadsheet software (Excel, Google Sheets, Numbers).

2. **Forensic JSON Telemetry Package**:
   - Bundles complete track models along with session metadata and a deterministic verification checksum.
   - Embeds schema versioning (`v3.1.0`) and audit timestamps for longitudinal ledger auditing.

3. **Deterministic Verification Checksum**:
   - Computes a bitwise hash over total track counts, cumulative listening hours, and archive IDs.
   - Outputs a unique hexadecimal verification stamp (`0x...ECHO`) validating data authenticity.

---

## 8. Interactive Canvas Visualizer & DSP Pipeline (`src/components/AudioVisualizerLab.tsx`)

The visualizer laboratory renders high-framerate 60 FPS graphics across three distinct representations:

- **Oscilloscope**: Composite harmonic sine wave with multi-pass neon bloom and center datum graticule.
- **Banded FFT Spectrum**: 48 logarithmic frequency channels featuring dynamic energy gradients and peak hold markers.
- **Phase Orbit (Lissajous Curve)**: 360-degree parametric orbital tracing displaying phase interference and stereophonic spatial width.
- **Hardware Biquad Lowpass & Resonance Filter**: Dynamic slider interface controlling cutoff frequencies from 200 Hz to 8,000 Hz with $Q$ resonance coloration from 0.5 to 6.0.

---

## 9. Automated Testing Architecture & Test Runner

ECHOES incorporates native Node.js subtest harnesses (`node:test`, `node:assert/strict`) integrated via `tsx` execution:

```bash
npm test
```

- **Unit Test Coverage**:
  - `src/utils/exportUtils.test.ts`: Validates deterministic checksum stability, CSV line formatting, and JSON schema compliance.
  - `src/lib/utils.test.ts`: Verifies tailwind class merging (`clsx` + `tailwind-merge`) and conflict resolution.
  - `src/services/songService.test.ts`: Tests Spotify/SpotApi search queries, pagination parsing, and fallback catalog lookups.

---

## 10. Progressive Web App (PWA) & Structured Data Engine

- **Web App Manifest (`public/manifest.json`)**: Configured with `display: standalone`, custom theme colors (`#11131b`), and adaptive SVG vector emblems for installability on desktop and mobile.
- **Schema.org Structured Data**: Validated JSON-LD `@context: https://schema.org` declaration designating ECHOES as an audited `WebApplication` multimedia tool.
- **Search Engine Directives**: Accessible `robots.txt` and semantic open-graph metadata tags ensuring standard indexing compliance.

