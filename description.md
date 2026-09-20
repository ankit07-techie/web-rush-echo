# ECHOES — Personal Sonic Archive & Listening Telemetry

**ECHOES** is an archival listening intelligence dashboard and interactive audio laboratory. Instead of presenting ephemeral, cartoonish year-end metrics, the platform treats **5.8 years of music history** as an audited forensic sonic timeline. It translates raw playback logs into tactile thermal paper receipts, dynamic harmonic waveforms, chronobiological rhythm matrices, behavioral anomaly audits, and relational neural maps.

---

## ✦ Table of Contents
1. [Project Vision & Philosophy](#1-project-vision--philosophy)
2. [Architecture & Technology Stack](#2-architecture--technology-stack)
3. [Complete Feature Breakdown (From Scratch)](#3-complete-feature-breakdown-from-scratch)
   - [3.1 Global Header & Navigation](#31-global-header--navigation)
   - [3.2 Executive Telemetry Dashboard](#32-executive-telemetry-dashboard)
   - [3.3 Temporal Sonic Stream (Dynamic Chronicle Waveform)](#33-temporal-sonic-stream-dynamic-chronicle-waveform)
   - [3.4 Forensic Sonic Narrative (My Story)](#34-forensic-sonic-narrative-my-story)
   - [3.5 Catalog & Thermal Ledger (Artists & Songs)](#35-catalog--thermal-ledger-artists--songs)
   - [3.6 Neural Tapestry (Connection Explorer)](#36-neural-tapestry-connection-explorer)
   - [3.7 Behavioral Patterns (Habit & Anomaly Audits)](#37-behavioral-patterns-habit--anomaly-audits)
   - [3.8 Interactive Sound Capsule Player (Audio Engine)](#38-interactive-sound-capsule-player-audio-engine)
   - [3.9 Archival Thermal Receipt Modal & Print Engine](#39-archival-thermal-receipt-modal--print-engine)
   - [3.10 Quick Search Command Palette (`Cmd+K`)](#310-quick-search-command-palette-cmdk)
4. [Data Model & Telemetry Schemas](#4-data-model--telemetry-schemas)
5. [Design Identity & Typography](#5-design-identity--typography)
6. [Keyboard Shortcuts & Accessibility](#6-keyboard-shortcuts--accessibility)
7. [Installation & Development Setup](#7-installation--development-setup)

---

## 1. Project Vision & Philosophy

Modern streaming analytics often reduce intimate human listening journeys to superficial marketing slides. **ECHOES** reframes this data as an **archival laboratory** and **forensic ledger**:
- **Tactile Materiality**: Renders music data as vintage, perforated thermal paper cash-register receipts with monospaced timestamps, barcodes, and acoustic itemizations.
- **Chronobiological Auditing**: Correlates what you listen to with the hour of the day—revealing circadian shifts, pre-dawn loops, and twilight melancholia.
- **Forensic Sonic Precision**: Combines real audio preview streams with a real-time Web Audio API synthesizer for harmonic fallback.
- **Mathematical Splines**: Computes monthly listening waveforms dynamically via cubic Bezier curves rather than static illustrations.

---

## 2. Architecture & Technology Stack

| Layer | Technologies | Purpose |
| :--- | :--- | :--- |
| **Framework** | React 18+ & TypeScript | Strictly typed modular component architecture |
| **Bundler & Tooling** | Vite & PostCSS | Rapid development server and optimized production packaging |
| **Styling** | Tailwind CSS & `@media print` | Dark twilight palette with dedicated paper-receipt print stylesheets |
| **Typography** | Syne, Inter, JetBrains Mono | Display headings, interface readability, and monospaced telemetry |
| **Icons** | Google Material Symbols Outlined & Lucide | Technical, consistent vector glyphs across all controls |
| **Audio Synthesis** | Web Audio API (`AudioContext`) | Real-time multi-oscillator ambient chord drone engine |
| **Media Playback** | HTML5 Audio (`new Audio()`) | High-resolution 30-second audio stream playback with seamless loop engine |
| **Streaming Integration** | Spotify Web API & Embeds | Asynchronous metadata resolution and interactive embedded widget |

---

## 3. Complete Feature Breakdown (From Scratch)

### 3.1 Global Header & Navigation
- **Archive Status Pill**: Live indicator badge showing `ARCHIVE VERIFIED • 5.8 YRS` with cryptographic checksum proof.
- **Interactive Audio Playback Pill**: Displays the currently active track and artist with an animated multi-bar equalizer and instant play/pause toggle.
- **Global Search Button (`⌘K`)**: Quick launcher for the command palette with keyboard shortcut badge.
- **Print Receipt Trigger**: Immediate action button opening the archival receipt modal from anywhere in the application.
- **Responsive Navigation**:
  - **Desktop Navigation Rail**: Collapsible left sidebar featuring clean icons and active indicators for all 6 core views.
  - **Mobile Bottom Navigation Dock**: Compact 44px+ touch-friendly bar granting one-tap access across phone viewports.

---

### 3.2 Executive Telemetry Dashboard
The default landing view synthesizing 5.8 years of longitudinal data:
- **Longitudinal Audit Banner**:
  - **Total Exposure**: `1,194.2 Hours` across `14,820 Streams`.
  - **Circadian Shift**: `+42 min/year` nocturnal drift calculation.
  - **Emotional Dispersion**: `3.4 / 5.0` multi-genre spread index.
- **Chronobiological Rhythm Matrix (24-Hour Day-Part Breakdown)**:
  - **Dawn (05:00–09:00)**: Ambient, Acoustic Folk, Neoclassical.
  - **Midday (09:00–17:00)**: Deep Focus Instrumental, Minimal Techno, Math Rock.
  - **Twilight (17:00–21:00)**: Dream Pop, Shoegaze, Slowcore.
  - **Nocturnal (21:00–05:00)**: Post-Midnight Sadcore, UK Garage, Ambient Drone.
- **Atmospheric & Mood Radar**: Multi-axis radar diagram evaluating valence (positivity), acousticness, energy, danceability, and dynamic headroom.
- **Obsession Loop Audits**: Highlights consecutive single-track repeat streaks (such as 32 consecutive days of *Kyoto* by Phoebe Bridgers).
- **Recent Sonic Stream Tape**: Quick-access preview cards of recently logged playback sessions with instant preview triggers.

---

### 3.3 Temporal Sonic Stream (Dynamic Chronicle Waveform)
An interactive chronological inspection interface:
- **Multi-Era Year Scrubber**: Toggle between all-time overview or isolate specific years (`2019`, `2020`, `2021`, `2022`, `2023`, `2024`).
- **Seasonal Solstice Lenses**: Filter by Winter Solstice, Spring Equinox, Summer Solstice, or Autumn Equinox with unique acoustic tempo and mood stats.
- **Three Specialized View Modes**:
  1. **Chronicle Waveform**: Dynamic SVG cubic Bezier curve calculating monthly listening volume, average BPM tempo, and obsession spikes.
  2. **Season Matrix**: Comparative 4-card matrix breaking down acoustic density, top track anchors, and listening duration per solstice.
  3. **Magnetic Tape Reel**: Analog cassette spool visualization featuring calibrated 15 IPS tape speed, dual rotating spools (Side A & Side B), analog tape counter gauge, and lead track readouts.
- **Milestone Ledger**: Itemized list of listening turning points with one-click pinpointing on the waveform graph.

---

### 3.4 Forensic Sonic Narrative (My Story)
A deep-dive editorial chapter dossier translating raw data into an autobiographical music memoir:
- **Six Curated Epochs**:
  1. *The Bedroom Isolation Tapes (2020)*: Low-fidelity acoustic indie and melancholic loops.
  2. *Post-Lockdown Synth Euphoria (2021)*: Driving 128 BPM arpeggiators and dynamic beats.
  3. *The Neoclassical Winter Retreat (2022)*: Felt piano hammers and Max Richter tape loops.
  4. *Midnight UK Garage Shift (2023)*: Sub-bass resonance, Fred again.. vocal chops, and club catharsis.
  5. *Acoustic Realignment (2024)*: Raw fingerpicked guitars and unvarnished vocal tracking.
  6. *The Present Twilight Horizon*: Current algorithmic listening equilibrium.
- **Audio Fingerprint Radar**: Acoustic vector maps illustrating shifting emotional coordinates across chapters.
- **Sticky Archival Receipt Tape**: Side-by-side thermal receipt updating live to reflect the selected chapter's listening receipts.

---

### 3.5 Catalog & Thermal Ledger (Artists & Songs)
A database and forensic catalog for all logged music:
- **Dual Tab Architecture**: Switch between **Audited Tracks (100+ items)** and **Artist Dossiers**.
- **Multi-Parametric Filter Bar**: Filter by genre (Indie, Ambient, Electronic, Folk), era, acoustic mood tags, or live text search.
- **Live Spotify Search & Metadata Resolution**:
  - Live query input searching the Spotify API directory for track metadata, 30-second audio stream previews, high-resolution album artwork, and Spotify track IDs.
- **Itemized Track Dossier**:
  - Instant play button triggering audio stream previews.
  - Acoustic DNA metric cards: Tempo (BPM), Musical Key, Energy, Valence, Danceability, and Acousticness.
  - "Print Track Receipt" button to generate a single-item thermal receipt slip.

---

### 3.6 Neural Tapestry (Connection Explorer)
A relational network visualization engine illuminating hidden music connections:
- **Multi-Node Graph**: Maps interactive nodes representing **Artists**, **Signature Tracks**, **Emotional Eras**, and **Listening Habits**.
- **Node & Edge Inspector**:
  - Click any node to open its affinity dossier, stream count, and connected peers.
  - Click any edge line to review the shared affinity reasoning (e.g., *"Shared nostalgic vocal layering"*).
- **Three Dynamic Graph Layout Engines**:
  1. **Constellation**: Organic force-directed layout clustering related nodes together.
  2. **Era Rings**: Three concentric orbital guide rings (Inner Era/Habit Core `r=85`, Middle Artist Ring `r=180`, Outer Signature Tracks `r=265`).
  3. **Chord Flow**: Perimeter circular distribution connected through quadratic Bezier curved chords passing through the center.
- **Filter Chips**: Instant filtering by node category (All, Artists, Songs, Eras, Habits).

---

### 3.7 Behavioral Patterns (Habit & Anomaly Audits)
Audits the psychological and behavioral anomalies revealed by listening telemetry:
- **Six Core Anomaly Patterns**:
  1. *Pre-Dawn Sadcore Loop*: 02:00–05:00 consecutive loops during high-stress weeks.
  2. *Sunday Dusk Melancholia*: Consistent Sunday evening valence drops (18:00–21:00).
  3. *Hyper-Focus Velocity*: High-BPM electronic listening bursts during deep work sessions.
  4. *Solstice Timber Pivot*: Abrupt shift from electronic to organic acoustic folk every November.
  5. *The Great Return Loop*: Cyclical re-listening to comforting teenage comfort tracks.
  6. *Binaural Recovery*: Sleep-aid neoclassical drone sessions.
- **Pattern Catalysts**: Direct one-click trigger buttons to play the specific catalyst song associated with each anomaly (e.g., *Kyoto*, *Holocene*, *Midnight City*, *Glue*, *Rumble*, *On The Nature of Daylight*).
- **Slide-Over Audit Drawer**: Inspects detailed anomaly logs, repetition percentages, time windows, and thermal paper evidence.

---

### 3.8 Interactive Sound Capsule Player (Audio Engine)
A bottom-docked, glassmorphic floating audio control center:
- **Dual Playback Modes**:
  - **HQ Audio Preview**: Real 30-second audio stream playback via HTML5 Audio with cross-origin handling.
  - **Spotify Web Embed**: Embedded mini Spotify player widget for full track streaming.
  - **Ambient Drone Harmonizer**: Real-time Web Audio API multi-oscillator synthesizer generating procedural harmonic background tones.
- **Rock-Solid Loop / Repeat Engine**:
  - **Zero-Latency Replay**: Automatically catches track completion, rewinding to `0:00` and seamlessly replaying without pausing or stalling.
  - **Dual Loop Controls**: Direct loop toggle button in the primary collapsed capsule bar as well as the expanded control deck.
  - **Active Indicator**: Glowing amber pulse badge (`LOOP ON`) confirming continuous repetition mode.
- **Waveform Visualizer**: Dynamic 18-bar frequency equalizer simulating acoustic amplitude during active playback.
- **Scrubber & Timeline**: Interactive range slider supporting real-time seeking, current playback time, and duration display.
- **Volume & Mute**: Slider with instant mute toggle and memory recall.
- **Expand / Collapse**: Full drawer toggle revealing mode switches, embed options, and audio stream diagnostics.
- **Dismiss & Restore**: Dismissable close button with instant reactivation whenever a track is triggered from any view or header button.

---

### 3.9 Archival Thermal Receipt Modal & Print Engine
Translates abstract listening data into a physical-format thermal paper printout:
- **Skeuomorphic Paper Styling**:
  - Perforated jagged tear edges top and bottom.
  - Monospaced JetBrains Mono typography with authentic grocery/retail receipt spacing.
  - Barcode vector graphics, itemized serial numbers, and cryptographic checksum seals.
- **Three Receipt Variants**:
  - **Lifetime Overview**: Total hours, streams, top 5 songs, circadian index, and emotional score.
  - **Single Track Slip**: Itemized forensic audit of a single track's repeat streaks, acoustic parameters, and timestamps.
  - **Seasonal Ledger**: Seasonal solstice listening recap.
- **Actions**:
  - **Download Slip**: Exports receipt image asset.
  - **Print Receipt (`@media print`)**: Dedicated print stylesheet isolating `#printable-receipt` on pure white background, stripping web navigation, sidebars, and overlays for real thermal or paper printers.

---

### 3.10 Quick Search Command Palette (`Cmd+K`)
- **Global Hotkey**: Press `Cmd + K` (Mac) or `Ctrl + K` (Windows/Linux) from anywhere in the app.
- **Instant Search**: Type to search simultaneously across tracks, artists, genres, eras, behavioral patterns, and quick actions.
- **Keyboard Navigation**: Arrow key navigation, ESC to dismiss, Enter to select and trigger playback or view navigation.

---

## 4. Data Model & Telemetry Schemas

The application is structured around TypeScript definitions in `/src/types.ts`:

```typescript
// Core Track Record
export interface SongItem {
  id: string;
  title: string;
  artist: string;
  album?: string;
  plays: number;
  duration: string;
  bpm: number;
  key: string;
  valence: number;      // 0.0 - 1.0 (Musical positivity)
  energy: number;       // 0.0 - 1.0 (Acoustic intensity)
  acousticness: number; // 0.0 - 1.0 (Organic vs electronic)
  danceability: number; // 0.0 - 1.0 (Rhythmic stability)
  era: string;
  genre: string;
  artworkUrl?: string;
  previewUrl?: string;
  spotifyId?: string;
}

// Relational Neural Graph
export interface GraphNode {
  id: string;
  name: string;
  type: 'artist' | 'song' | 'era' | 'habit';
  x: number;
  y: number;
  val: number;
  color: string;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  relationship: string;
  weight: number;
}

// Behavioral Anomaly Pattern
export interface ListeningPattern {
  id: string;
  title: string;
  category: string;
  anomalyScore: number;
  timeWindow: string;
  description: string;
  catalystTrack: string;
  catalystArtist: string;
}
```

---

## 5. Design Identity & Typography

### Color Palette (Technical Twilight)
- **Deep Space Background**: `#11131b`
- **Card & Deck Surface**: `#191b24`
- **Elevated Border & Dividers**: `#33343e` / `#494454`
- **Sonic Violet Accent**: `#d0bcff` (Active states, primary buttons, waveform crests)
- **Amber Warning / Telemetry Accent**: `#ffb95f` (Obsession alerts, active loop indicators, thermal stamps)
- **Soft Muted Text**: `#cbc3d7` / `#958ea0`
- **Pure Paper White (Receipt Printouts)**: `#ffffff` & `#1c1b1f`

### Typographic Hierarchy
- **Display Headings**: `Syne` (Bold, geometric, modern editorial weight)
- **Body & Controls**: `Inter` (Clear, accessible, high-legibility interface text)
- **Telemetry & Receipts**: `JetBrains Mono` (Fixed-width character grid for dates, timestamps, barcodes, and metrics)

---

## 6. Keyboard Shortcuts & Accessibility

| Key Combo | Action | Scope |
| :--- | :--- | :--- |
| `⌘ + K` or `Ctrl + K` | Open Quick Search Command Palette | Global |
| `Escape` | Close Modal / Drawer / Search Palette | Active Modal |
| `Space` / Click | Play / Pause active track in Sound Player | Global Player |
| `Enter` | Trigger highlighted search result item | Search Palette |

- **Touch & Accessibility Standards**: Touch targets exceed 44px on mobile devices; high color contrast ratios pass WCAG AA standards.

---

## 7. Installation & Development Setup

### Prerequisites
- Node.js (version 18.0 or higher)
- npm (version 9.0 or higher)

### Setup & Run
```bash
# 1. Clone or extract project directory
cd echoes-sonic-archive

# 2. Install dependencies
npm install

# 3. Start local development server (binds to port 3000)
npm run dev

# 4. Run TypeScript linter
npm run lint

# 5. Compile production build
npm run build
```

---

*ECHOES — Documenting the subtle architecture of human memory through sound.*
