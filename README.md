# ECHOES — Personal Sonic Archive & Listening Telemetry

[![Version](https://img.shields.io/badge/version-1.4.0-blue.svg)](package.json)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Tests](https://img.shields.io/badge/tests-7%20passing-brightgreen.svg)](package.json)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue.svg)](tsconfig.json)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v4-38bdf8.svg)](vite.config.ts)
[![PWA Ready](https://img.shields.io/badge/PWA-Ready-orange.svg)](public/manifest.json)
[![Accessibility](https://img.shields.io/badge/Accessibility-WCAG_AA_Pass-success.svg)](#accessibility--wcag-compliance)

**ECHOES** is an archival listening intelligence dashboard, forensic music timeline, and interactive audio laboratory. Instead of presenting ephemeral, cartoonish year-end metrics, the platform treats **5.8 years of music history** as an audited forensic sonic timeline. It translates raw playback telemetry into tactile thermal paper receipts (Lifetime, Track Slip, Seasonal Solstice), dynamic harmonic waveforms, chronobiological rhythm matrices, behavioral anomaly audits, artist dossiers with 12-month seasonality sparklines, and relational neural maps.

---

## ✦ Table of Contents

- [Core Philosophy](#-core-philosophy)
- [System Architecture Overview](#-system-architecture-overview)
- [Interactive Features & Modules](#-interactive-features--modules)
  - [1. Executive Telemetry Dashboard](#1-executive-telemetry-dashboard)
  - [2. Temporal Sonic Stream (Timeline)](#2-temporal-sonic-stream-timeline)
  - [3. Forensic Sonic Narrative (My Story)](#3-forensic-sonic-narrative-my-story)
  - [4. Catalog & Thermal Ledger](#4-catalog--thermal-ledger)
  - [5. Neural Tapestry (Connection Explorer)](#5-neural-tapestry-connection-explorer)
  - [6. Behavioral Patterns (Habit & Anomaly Audits)](#6-behavioral-patterns-habit--anomaly-audits)
  - [7. Interactive Sound Capsule Player](#7-interactive-sound-capsule-player)
  - [8. Archival Thermal Receipt & Print Engine](#8-archival-thermal-receipt--print-engine)
  - [9. Quick Command Palette (`⌘K`)](#9-quick-command-palette-k)
- [Technology Stack](#-technology-stack)
- [Getting Started & Local Development](#-getting-started--local-development)
- [Available Scripts](#-available-scripts)
- [Security & Privacy](#-security--privacy)
- [Accessibility & WCAG Compliance](#-accessibility--wcag-compliance)
- [Performance & Optimization](#-performance--optimization)
- [Changelog & Release Notes](#-changelog--release-notes)

---

## ✦ Core Philosophy

1. **Tactile Materiality**: Data is tangible. Renders playback logs as vintage, perforated thermal register slips with monospaced timestamps, barcodes, and acoustic itemizations.
2. **Chronobiological Auditing**: Maps listening habits against circadian biology (Dawn, Midday, Twilight, Nocturnal).
3. **Forensic Precision**: Combines real-time Web Audio API harmonic drones, HTML5 audio preview streams, and Spotify embeds.
4. **Mathematical Splines**: Computes listening waveforms dynamically via cubic Bezier curves rather than static art.

---

## ✦ System Architecture Overview

```text
                                  +-----------------------+
                                  |     User Interface    |
                                  | (React 19, Tailwind)  |
                                  +-----------+-----------+
                                              |
                +-----------------------------+-----------------------------+
                |                             |                             |
     +----------v----------+      +-----------v-----------+      +----------v----------+
     |   Telemetry Views   |      |  Command & Navigation |      |   Receipt Engine    |
     | • Dashboard         |      | • Global Header       |      | • Thermal Paper     |
     | • Timeline Splines  |      | • Command Palette ⌘K  |      | • @media print CSS  |
     | • Narrative Chapters|      | • Sidebar Rail        |      | • Barcode Generator |
     | • Neural Graph      |      | • Mobile Dock         |      +---------------------+
     | • Anomaly Audits    |      +-----------------------+
     +----------+----------+
                |
     +----------v---------------------------------------------------+
     |                     Dual Audio Engine Layer                  |
     |  +---------------------------+  +--------------------------+ |
     |  | HTML5 Audio Stream Engine |  | Web Audio API Synthesizer| |
     |  | • 30s High-Res Stream     |  | • Multi-oscillator Drone | |
     |  | • Zero-Latency Loop Loop  |  | • Biquad Filter & Gain   | |
     |  +---------------------------+  +--------------------------+ |
     |  +---------------------------------------------------------+ |
     |  | Spotify Web Player Embed Fallback & Catalog Sync        | |
     |  +---------------------------------------------------------+ |
     +--------------------------------------------------------------+
```

---

## ✦ Interactive Features & Modules

### 1. Executive Telemetry Dashboard
- **Lifetime Exposure Index**: Tracks 1,194.2 hours across 14,820 streams with cryptographic verification.
- **Circadian Shift Tracker**: Audits nocturnal listening drift (+42 min/year).
- **Chronobiological 24h Rhythm Matrix**: Dawn (05:00-09:00), Midday (09:00-17:00), Twilight (17:00-21:00), and Nocturnal (21:00-05:00) segmentations.
- **Acoustic Radar**: Multi-axis radar diagram displaying valence, acousticness, energy, danceability, and headroom.
- **Obsession Streaks**: Itemized single-track repeat streaks with repeat day tallies.

### 2. Temporal Sonic Stream (Timeline)
- **Multi-Era Scrubber**: Seamless scrubbing across 2019–2024 and All-Time archives.
- **Three Specialized Visualizers**:
  - *Chronicle Waveform*: Cubic Bezier splines plotting monthly listening volume, BPM, and obsession points.
  - *Season Matrix*: 4-solstice comparative breakdown of acoustic density and dominant anchors.
  - *Tape Reel*: Skeuomorphic analog cassette spool interface with calibrated 15 IPS magnetic reels, dual rotating spools, and tape window counter.

### 3. Forensic Sonic Narrative (My Story)
- **Six Curated Epochs**: From *The 2020 Bedroom Isolation Tapes* to *The Neoclassical Winter Retreat* and *Midnight UK Garage Shift*.
- **Acoustic Fingerprint Shifts**: Dynamic radar updating acoustic coordinates for each chapter.
- **Synchronized Receipt Tape**: Live thermal paper preview corresponding to the active chapter.

### 4. Catalog & Thermal Ledger
- **Dual Tab Architecture**: Seamless switching between Audited Track Ledger (100+ items) and Artist Dossiers.
- **Live Catalog Lookup**: Real-time asynchronous query resolution with cover art, audio preview streams, and audio feature radar metrics.
- **Itemized Track Dossier**: Detailed forensic acoustic breakdown with direct "Print Track Slip" capabilities.

### 5. Neural Tapestry (Connection Explorer)
- **Relational Graph**: Interactive nodes connecting Artists, Tracks, Eras, and Habits.
- **3 Layout Engines**:
  - *Constellation*: Organic force-directed layout clustering affinities.
  - *Era Rings*: Concentric orbital rings organizing nodes by structural depth.
  - *Chord Flow*: Circular perimeter distribution connected via quadratic Bezier paths.

### 6. Behavioral Patterns (Habit & Anomaly Audits)
- **Psychological Listening Audits**: Analyzes listening quirks (e.g., *Pre-Dawn Sadcore Loop*, *Sunday Dusk Melancholia*, *Hyper-Focus Velocity*, *Solstice Timber Pivot*).
- **Pattern Catalysts**: One-click direct playback of tracks linked to behavioral anomalies.
- **Slide-over Audit Drawer**: Deep-dive inspection with itemized logs and thermal tape evidence.

### 7. Interactive Sound Capsule Player
- **Docked Floating Capsule**: Ambient twilight styling with responsive desktop and mobile viewports.
- **Dual Audio Modes**: High-resolution 30-second audio stream playback and Web Audio API multi-oscillator chord drone synthesizer.
- **Zero-Latency Repeat Engine**: Instant rewind-and-replay threshold loop engine with visible amber indicator status.
- **Waveform Frequency Visualizer**: Multi-band real-time audio spectrum animation.
- **Scrubber & Controls**: Precise seek bar, time elapsed/remaining readouts, volume slider with mute memory.

### 8. Archival Thermal Receipt & Print Engine
- **Tactile Material Design**: Authentic receipt paper styling with tear notches, monospaced typography, and barcode graphic.
- **Three Receipt Types**: Lifetime Overview, Single-Track Audit, and Seasonal Solstice Ledger.
- **`@media print` Engine**: Isolates `#printable-receipt` on clean white paper with pure black ink, stripping navigation for physical or PDF printing.

### 9. Quick Command Palette (`⌘K`)
- **Global Hotkey**: Press `Cmd + K` (Mac) or `Ctrl + K` (Windows/Linux) anytime.
- **Omni-Search**: Search tracks, artists, genres, eras, and behavioral patterns with keyboard arrow navigation and Enter selection.

---

## ✦ Technology Stack

| Component | Technology | Version |
| :--- | :--- | :--- |
| **Core Framework** | React | `^19.0.1` |
| **Language** | TypeScript | `^7.0.2` (Strict Mode) |
| **Build Tooling** | Vite | `^8.3.0` |
| **Styling** | Tailwind CSS | `^4.3.3` |
| **Animation** | Motion / CSS Animations | `^12.23.24` |
| **Iconography** | Material Symbols & Lucide React | `^0.546.0` |
| **Audio Synthesis** | Web Audio API (`AudioContext`) | Browser Native |
| **Audio Playback** | HTML5 Audio (`HTMLAudioElement`) | Browser Native |

---

## ✦ Getting Started & Local Development

### Prerequisites
- **Node.js**: `v18.0.0` or later
- **npm**: `v9.0.0` or later

### Installation
```bash
# 1. Clone repository
git clone https://github.com/your-username/echoes-sonic-archive.git
cd echoes-sonic-archive

# 2. Install dependencies
npm install

# 3. Launch development server (binds to 0.0.0.0:3000)
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ✦ Available Scripts

```bash
# Start Vite development server
npm run dev

# Run TypeScript strict type-checking and linter
npm run lint

# Run native Node.js unit test suite (7 tests passing)
npm test

# Build production bundle for deployment
npm run build

# Preview production build locally
npm run preview

# Clean build artifacts
npm run clean
```

### 10. Archival Ledger Export Engine (`src/utils/exportUtils.ts`)
- **Deterministic Verification Checksum**: Computes pseudo SHA-256 verification hash across total record count and listening hours.
- **RFC 4180 CSV Export**: Generates spreadsheet-compatible CSV export with clean escaping.
- **Forensic JSON Telemetry Package**: Complete structured JSON download containing metadata, archive timestamps, and 3,140 itemized tracks.

### 11. Interactive Web Audio Visualizer Lab (`src/components/AudioVisualizerLab.tsx`)
- **60 FPS Hardware-Accelerated Canvas**: Real-time oscilloscope waveform, 48-band FFT spectrum visualizer, and Lissajous curve phase orbit.
- **Hardware Biquad Lowpass Filter & Resonance (Q)**: Dynamic cutoff and acoustic resonance controls.
- **Four Harmonic Ambient Drone Matrices**: Instant chord shifts with rich acoustic overtones.

---

## ✦ Security & Privacy

- **Safe External Media**: All external image elements utilize `referrerPolicy="no-referrer"` to eliminate header data leakage.
- **URL & Embed Sanitization**: Dynamic audio player parameters (e.g. Spotify identifiers) pass through strict alphanumeric regex filtering (`replace(/[^a-zA-Z0-9]/g, '')`) before embedding into iframes.
- **No Client-Side Secret Leaks**: API configurations and keys remain protected server-side or are bounded to public search endpoints.
- **Strict Query Encoding**: All live external queries use `encodeURIComponent()` to prevent URI injection attacks.

---

## ✦ Accessibility & WCAG Compliance

- **Semantic Landmark Structure**: Proper `<header>`, `<nav>`, `<main>`, `<aside>`, and `<footer>` semantics throughout.
- **Skip Navigation**: Accessible `"Skip to main content"` anchor link allowing keyboard users to bypass header rails directly to `#main-content`.
- **Dialog & Drawer Accessibility**: Modals implement `role="dialog"`, `aria-modal="true"`, accessible title labelling, and universal **Escape key listeners**.
- **Interactive State Indication**: Toggle buttons declare `aria-pressed`, active pages use `aria-current="page"`, and sliders feature `aria-valuemin`, `aria-valuemax`, and `aria-valuenow`.
- **Target Sizes & Contrast**: All touch targets meet or exceed the 44px standard; typography achieves WCAG AA contrast against dark backgrounds.

---

## ✦ Performance & Optimization

- **Image Asset Strategy**: Images employ `loading="lazy"` and `decoding="async"` to prevent main-thread layout thrashing.
- **Font Rendering**: Web fonts are loaded with `font-display: swap` and preconnected origins to minimize First Contentful Paint (FCP).
- **Audio Context Management**: The Web Audio API context suspends automatically when idle, minimizing CPU and memory consumption.
- **Optimized Bundle Splitting**: Native Vite bundling produces minimal chunk footprints with tree-shaken dependencies.

---

## ✦ Changelog & Release Notes

For detailed version history, see [CHANGELOG.md](CHANGELOG.md).
For in-depth architectural breakdown, see [ARCHITECTURE.md](ARCHITECTURE.md).

---

*ECHOES — Documenting the subtle architecture of human memory through sound.*
