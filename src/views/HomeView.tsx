import React, { useState } from 'react';
import { USER_ARCHIVE_META, MUSICAL_ERAS, TOP_ARTISTS, TOP_TRACKS } from '../data/mockData';
import { ViewTab } from '../types';
import { EchoesLogo } from '../components/EchoesLogo';
import DancingLetters from '@/components/ui/dancing-letters';
import DraggableWidgetGrid, { WidgetItem, WidgetSize } from '@/components/ui/draggable-widget-grid';

const INITIAL_TELEMETRY_WIDGETS: WidgetItem[] = [
  { id: 'widget-plays', size: 'sm', label: 'Total Plays' },
  { id: 'widget-hours', size: 'sm', label: 'Listening Hours' },
  { id: 'widget-tracks', size: 'sm', label: 'Unique Tracks' },
  { id: 'widget-creators', size: 'sm', label: 'Creators Logged' },
  { id: 'widget-needle', size: 'wide', label: 'Sonic Spectrum Needle' },
  { id: 'widget-chronotype', size: 'wide', label: 'Biometric Chronotype' },
  { id: 'widget-rotation', size: 'wide', label: 'Heavy Rotation Anchor' },
  { id: 'widget-span', size: 'sm', label: 'Archive Span' },
];

interface HomeViewProps {
  onNavigateTab: (tab: ViewTab) => void;
  onOpenReceipt: (trackTitle?: string) => void;
  onPlaySong: (title: string, artist: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigateTab,
  onOpenReceipt,
  onPlaySong
}) => {
  const [activeEraIdx, setActiveEraIdx] = useState(1); // Melancholic Indie Folk by default
  const [widgets, setWidgets] = useState<WidgetItem[]>(INITIAL_TELEMETRY_WIDGETS);

  const currentEra = MUSICAL_ERAS[activeEraIdx];

  const handleNextEra = () => {
    setActiveEraIdx((prev) => (prev + 1) % MUSICAL_ERAS.length);
  };

  const handlePrevEra = () => {
    setActiveEraIdx((prev) => (prev - 1 + MUSICAL_ERAS.length) % MUSICAL_ERAS.length);
  };

  const renderTelemetryWidget = (item: WidgetItem, _size: WidgetSize) => {
    switch (item.id) {
      case 'widget-plays':
        return (
          <div className="flex h-full w-full flex-col justify-between p-4 sm:p-5 bg-[#191b24] hover:bg-[#1d202b] transition-colors select-none">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] text-[#958ea0] uppercase tracking-wider">
                TOTAL PLAYS
              </span>
              <span className="material-symbols-outlined text-[#d0bcff] text-base opacity-70">
                equalizer
              </span>
            </div>
            <div>
              <div className="font-syne font-black text-2xl sm:text-3xl text-[#e2e1ee]">
                {USER_ARCHIVE_META.totalPlays.toLocaleString()}
              </div>
              <span className="font-mono text-[10px] text-[#d0bcff] mt-1 block">
                +4.2% Audit Confidence
              </span>
            </div>
          </div>
        );

      case 'widget-hours':
        return (
          <div className="flex h-full w-full flex-col justify-between p-4 sm:p-5 bg-[#191b24] hover:bg-[#1d202b] transition-colors select-none">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] text-[#958ea0] uppercase tracking-wider">
                LISTENING TIME
              </span>
              <span className="material-symbols-outlined text-[#ffb95f] text-base opacity-70">
                schedule
              </span>
            </div>
            <div>
              <div className="font-syne font-black text-2xl sm:text-3xl text-[#ffb95f]">
                {USER_ARCHIVE_META.listeningHours}{' '}
                <span className="text-sm font-sans font-normal text-[#cbc3d7]">hrs</span>
              </div>
              <span className="font-mono text-[10px] text-[#cbc3d7]/70 mt-1 block">
                35.1 Days Pure Audio
              </span>
            </div>
          </div>
        );

      case 'widget-tracks':
        return (
          <div className="flex h-full w-full flex-col justify-between p-4 sm:p-5 bg-[#191b24] hover:bg-[#1d202b] transition-colors select-none">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] text-[#958ea0] uppercase tracking-wider">
                UNIQUE TRACKS
              </span>
              <span className="material-symbols-outlined text-[#cebdff] text-base opacity-70">
                queue_music
              </span>
            </div>
            <div>
              <div className="font-syne font-black text-2xl sm:text-3xl text-[#cebdff]">
                {USER_ARCHIVE_META.uniqueTracks.toLocaleString()}
              </div>
              <span className="font-mono text-[10px] text-[#cbc3d7]/70 mt-1 block">
                Archived in ledger
              </span>
            </div>
          </div>
        );

      case 'widget-creators':
        return (
          <div className="flex h-full w-full flex-col justify-between p-4 sm:p-5 bg-[#191b24] hover:bg-[#1d202b] transition-colors select-none">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] text-[#958ea0] uppercase tracking-wider">
                CREATORS LOGGED
              </span>
              <span className="material-symbols-outlined text-[#e2e1ee] text-base opacity-70">
                public
              </span>
            </div>
            <div>
              <div className="font-syne font-black text-2xl sm:text-3xl text-[#e2e1ee]">
                {USER_ARCHIVE_META.uniqueArtists}
              </div>
              <span className="font-mono text-[10px] text-[#d0bcff] mt-1 block">
                From 48 countries
              </span>
            </div>
          </div>
        );

      case 'widget-needle':
        return (
          <div className="flex h-full w-full flex-col justify-between p-4 sm:p-5 bg-[#191b24] hover:bg-[#1d202b] transition-colors select-none">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[#ffb95f]">
                <span className="material-symbols-outlined text-sm">tune</span>
                <span className="font-mono text-[10px] uppercase font-bold tracking-wider">
                  SONIC SPECTRUM & NEEDLE
                </span>
              </div>
              <span className="font-mono text-[9px] text-[#958ea0] uppercase px-1.5 py-0.5 rounded bg-[#11131b] border border-[#33343e]">
                LIVE FREQ
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-[11px] font-mono text-[#cbc3d7]">
                <span>AUDIT INTEGRITY: <strong className="text-emerald-400">99.4%</strong></span>
                <span>LATE-NIGHT: <strong className="text-[#d0bcff]">02:14 AM</strong></span>
              </div>
              <div className="pt-1 border-t border-dashed border-[#33343e]/70">
                <div className="flex justify-between text-[9px] font-mono text-[#958ea0] mb-1">
                  <span>20 Hz</span>
                  <span className="text-[#d0bcff]">432Hz HARMONIC BIAS</span>
                  <span>20 kHz</span>
                </div>
                <div className="h-2 bg-[#11131b] rounded-full overflow-hidden relative border border-[#33343e]">
                  <div className="absolute left-[65%] top-0 bottom-0 w-1 bg-[#ffb95f] shadow-[0_0_8px_#ffb95f]"></div>
                  <div className="w-[65%] h-full bg-gradient-to-r from-[#3c0091] via-[#d0bcff] to-[#ffb95f] opacity-80"></div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'widget-chronotype':
        return (
          <div className="flex h-full w-full flex-col justify-between p-4 sm:p-5 bg-[#191b24] hover:bg-[#1d202b] transition-colors select-none">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] text-[#958ea0] uppercase tracking-wider">
                BIOMETRIC CHRONOTYPE
              </span>
              <span className="font-mono text-[9px] text-[#ffb95f] bg-[#ca8100]/20 border border-[#ca8100]/40 px-2 py-0.5 rounded">
                MIDNIGHT OWL
              </span>
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <span className="font-syne font-black text-2xl sm:text-3xl text-[#e2e1ee]">
                  68.4%
                </span>
                <span className="font-mono text-xs text-[#d0bcff]">Nocturnal Bias</span>
              </div>
              <p className="font-mono text-[10px] text-[#cbc3d7]/70 mt-1">
                Peak immersion window: 01:30 AM – 03:45 AM
              </p>
            </div>
          </div>
        );

      case 'widget-rotation':
        return (
          <div className="flex h-full w-full flex-col justify-between p-4 sm:p-5 bg-[#191b24] hover:bg-[#1d202b] transition-colors select-none">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] text-[#958ea0] uppercase tracking-wider">
                HEAVY ROTATION ANCHOR
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onPlaySong('Midnight City', 'M83');
                }}
                className="flex items-center gap-1 text-[10px] font-syne font-bold text-[#3c0091] bg-[#d0bcff] hover:bg-white px-2.5 py-1 rounded-md transition-colors"
              >
                <span className="material-symbols-outlined text-xs">play_arrow</span>
                LISTEN
              </button>
            </div>
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="font-syne font-bold text-base text-[#e2e1ee] truncate">
                  Midnight City
                </div>
                <div className="font-mono text-xs text-[#cbc3d7] truncate">
                  M83 • 482 logged spins
                </div>
              </div>
              <div className="flex items-center gap-1 text-[#d0bcff]">
                <span className="w-1 h-3 bg-[#d0bcff] animate-pulse rounded-full"></span>
                <span className="w-1 h-5 bg-[#d0bcff] animate-pulse rounded-full delay-75"></span>
                <span className="w-1 h-2 bg-[#d0bcff] animate-pulse rounded-full delay-150"></span>
              </div>
            </div>
          </div>
        );

      case 'widget-span':
      default:
        return (
          <div className="flex h-full w-full flex-col justify-between p-4 sm:p-5 bg-[#191b24] hover:bg-[#1d202b] transition-colors select-none">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] text-[#958ea0] uppercase tracking-wider">
                ARCHIVE SPAN
              </span>
              <span className="material-symbols-outlined text-[#ffb4ab] text-base opacity-70">
                history
              </span>
            </div>
            <div>
              <div className="font-syne font-black text-2xl sm:text-3xl text-[#ffb4ab]">
                {USER_ARCHIVE_META.archiveSpanYears}{' '}
                <span className="text-sm font-sans font-normal text-[#cbc3d7]">yrs</span>
              </div>
              <span className="font-mono text-[10px] text-[#cbc3d7]/70 mt-1 block">
                Since March 2019
              </span>
            </div>
          </div>
        );
    }
  };

  return (
    <div id="home-view" className="p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      {/* 1. Atmospheric Hero Section */}
      <section className="relative rounded-2xl overflow-hidden border border-[#33343e]/60 bg-[#191b24] shadow-2xl">
        {/* Background Atmosphere image with gradient blend */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=80"
            alt="Audio Telemetry Atmosphere"
            className="w-full h-full object-cover opacity-20 filter saturate-150 contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#11131b] via-[#11131b]/90 to-[#11131b]/50"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#11131b] via-transparent to-transparent"></div>
        </div>

        <div className="relative z-10 p-8 sm:p-10 lg:p-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="max-w-2xl space-y-4">
            <div className="flex items-center gap-3">
              <EchoesLogo variant="badge" size="sm" interactive={true} />
              <span className="font-mono text-[11px] uppercase tracking-widest text-[#d0bcff] bg-[#3c0091]/70 px-2.5 py-1 rounded-md border border-[#d0bcff]/40">
                AUDITED AUDIO TELEMETRY
              </span>
              <span className="font-mono text-[11px] text-[#ffb95f]">
                {USER_ARCHIVE_META.archiveId}
              </span>
            </div>

            <h1 className="font-syne font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#e2e1ee] tracking-tight leading-[1.2] flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span>YOUR LIFE, IN</span>
              <DancingLetters
                text="RECEIPTS"
                className="inline-flex"
                letterClassName="text-3xl sm:text-4xl lg:text-5xl font-syne font-extrabold text-[#d0bcff] hover:text-[#ffb95f] transition-colors underline decoration-[#3c0091] decoration-wavy underline-offset-8"
              />
              <span>.</span>
            </h1>

            <p className="text-[#cbc3d7] text-sm sm:text-base leading-relaxed font-sans max-w-xl">
              An exhaustive chronological ledger of every sonic obsession, midnight loop, and seasonal harmonic shift logged across 5.8 continuous years.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                id="btn-hero-print-tape"
                onClick={() => onOpenReceipt()}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#d0bcff] hover:bg-white text-[#3c0091] font-syne font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-[0_0_20px_rgba(208,188,255,0.25)] active:scale-95"
              >
                <span className="material-symbols-outlined text-base">receipt_long</span>
                PRINT AUDITED TAPE
              </button>

              <button
                id="btn-hero-explore-story"
                onClick={() => onNavigateTab('my-story')}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1d1f28] hover:bg-[#282a32] text-[#e2e1ee] border border-[#494454] font-syne font-bold text-xs uppercase tracking-wider transition-colors"
              >
                <span className="material-symbols-outlined text-base">auto_stories</span>
                EXPLORE STORY CHAPTERS
              </button>
            </div>
          </div>

          {/* Hero Receipt Tape Badge Preview */}
          <div className="w-full lg:w-72 shrink-0 bg-[#1d1f28]/95 backdrop-blur-md rounded-xl p-4 border border-[#494454] shadow-2xl relative font-mono text-xs">
            <div className="flex items-center justify-between border-b border-[#33343e] pb-2 mb-3">
              <div className="flex items-center gap-1.5 text-[#ffb95f]">
                <span className="material-symbols-outlined text-sm">confirmation_number</span>
                <span className="text-[10px] uppercase font-bold">RECEIPT TAPE #001</span>
              </div>
              <span className="text-[9px] text-[#958ea0]">LIVE FREQ</span>
            </div>

            <div className="space-y-1.5 text-[11px] text-[#cbc3d7]">
              <div className="flex justify-between">
                <span>AUDIT INTEGRITY:</span>
                <span className="text-[#e2e1ee] font-bold">99.4%</span>
              </div>
              <div className="flex justify-between">
                <span>LATE-NIGHT INDEX:</span>
                <span className="text-[#d0bcff] font-bold">02:14 AM</span>
              </div>
              <div className="flex justify-between">
                <span>TOTAL SPINS:</span>
                <span className="text-[#ffb95f] font-bold">14,820</span>
              </div>
            </div>

            {/* Live Frequency Needle Simulation */}
            <div className="mt-3 pt-3 border-t border-dashed border-[#33343e]">
              <div className="flex justify-between text-[9px] text-[#958ea0] mb-1">
                <span>20 Hz</span>
                <span className="text-[#d0bcff]">SONIC EQUILIBRIUM</span>
                <span>20 kHz</span>
              </div>
              <div className="h-2 bg-[#11131b] rounded-full overflow-hidden relative border border-[#33343e]">
                <div className="absolute left-[65%] top-0 bottom-0 w-1 bg-[#ffb95f] shadow-[0_0_8px_#ffb95f]"></div>
                <div className="w-[65%] h-full bg-gradient-to-r from-[#3c0091] via-[#d0bcff] to-[#ffb95f] opacity-70"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Modular Telemetry Matrix (Draggable Widget Grid) */}
      <section className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#d0bcff] text-xl">dashboard_customize</span>
            <div>
              <h2 className="font-syne font-bold text-sm sm:text-base text-[#e2e1ee] tracking-wide uppercase">
                AUDITED TELEMETRY MATRIX
              </h2>
              <p className="font-mono text-[11px] text-[#958ea0]">
                Drag to rearrange widgets • Alt + Arrows for keyboard move • Tap & hold on touch
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setWidgets(INITIAL_TELEMETRY_WIDGETS)}
              className="flex items-center gap-1 text-[10px] font-mono text-[#cbc3d7] hover:text-white bg-[#191b24] hover:bg-[#282a32] border border-[#33343e] px-2.5 py-1 rounded-md transition-colors"
              title="Reset layout to default order"
            >
              <span className="material-symbols-outlined text-xs">restart_alt</span>
              RESET LAYOUT
            </button>
            <span className="font-mono text-[10px] text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-2 py-0.5 rounded">
              MODULAR GRID
            </span>
          </div>
        </div>

        <div className="w-full">
          <DraggableWidgetGrid
            items={widgets}
            onChange={setWidgets}
            renderItem={renderTelemetryWidget}
            cellSize={200}
            gap={14}
            radius={16}
            maxColumns={4}
          />
        </div>
      </section>

      {/* 3. Musical Eras Carousel */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#d0bcff] text-xl">album</span>
              <h2 className="font-syne font-bold text-lg text-[#e2e1ee] tracking-wide uppercase">
                MUSICAL ERAS
              </h2>
            </div>
            <p className="font-mono text-xs text-[#958ea0]">
              Chronological epochs defining your aesthetic identity
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevEra}
              className="w-9 h-9 rounded-lg bg-[#191b24] hover:bg-[#282a32] text-[#cbc3d7] hover:text-white border border-[#33343e] flex items-center justify-center transition-colors"
              title="Previous Era"
            >
              <span className="material-symbols-outlined text-base">chevron_left</span>
            </button>
            <span className="font-mono text-xs text-[#cbc3d7] px-2">
              0{activeEraIdx + 1} / 0{MUSICAL_ERAS.length}
            </span>
            <button
              onClick={handleNextEra}
              className="w-9 h-9 rounded-lg bg-[#191b24] hover:bg-[#282a32] text-[#cbc3d7] hover:text-white border border-[#33343e] flex items-center justify-center transition-colors"
              title="Next Era"
            >
              <span className="material-symbols-outlined text-base">chevron_right</span>
            </button>
          </div>
        </div>

        {/* Featured Era Card */}
        <div
          className={`rounded-2xl border border-[#494454] p-6 sm:p-8 bg-gradient-to-br ${currentEra.bgGradient} relative overflow-hidden transition-all duration-300 shadow-xl`}
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
            <div className="space-y-2 max-w-xl">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs px-2.5 py-0.5 rounded bg-[#11131b]/80 border border-current text-[#ffb95f] uppercase tracking-wider">
                  ERA {currentEra.timeframe}
                </span>
                <span className="font-mono text-xs text-[#cbc3d7]/70">
                  {currentEra.primaryGenre}
                </span>
              </div>

              <h3 className="font-syne font-bold text-2xl sm:text-3xl text-[#e2e1ee]">
                {currentEra.title}
              </h3>

              <p className="text-sm text-[#cbc3d7] leading-relaxed">
                {currentEra.description}
              </p>

              {currentEra.signatureLyrics && (
                <div className="pt-2 italic text-xs text-[#cebdff]/90 border-l-2 border-[#d0bcff]/50 pl-3 font-mono">
                  {currentEra.signatureLyrics}
                </div>
              )}

              <div className="flex flex-wrap gap-2 pt-2">
                {currentEra.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#11131b]/60 border border-[#33343e] text-[#cbc3d7]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-[#11131b]/90 border border-[#494454] p-5 rounded-xl font-mono text-xs w-full md:w-64 shrink-0 space-y-2.5">
              <div className="text-[10px] text-[#958ea0] uppercase tracking-wider border-b border-[#33343e] pb-1.5 flex justify-between">
                <span>ERA RECEIPT</span>
                <span className="text-[#ffb95f]">AUDITED</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#958ea0]">HOURS LOGGED:</span>
                <span className="font-bold text-[#e2e1ee]">{currentEra.totalHours} HRS</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#958ea0]">TOTAL TRACKS:</span>
                <span className="font-bold text-[#e2e1ee]">{currentEra.trackCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#958ea0]">FLAGSHIP:</span>
                <span className="font-bold text-[#d0bcff] truncate max-w-[120px]" title={currentEra.topTrack}>
                  {currentEra.topTrack}
                </span>
              </div>
              <button
                onClick={() => onNavigateTab('my-story')}
                className="w-full mt-2 py-1.5 rounded bg-[#3c0091] hover:bg-[#4f319c] text-[#d0bcff] font-syne text-[11px] font-bold tracking-wider transition-colors flex items-center justify-center gap-1"
              >
                <span>OPEN CHAPTER</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Split Grid: All-Time Top Artists & Listening Biometrics */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Top Artists */}
        <div className="lg:col-span-2 bg-[#191b24] rounded-2xl border border-[#33343e]/60 p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-[#33343e]/40 pb-3">
            <div>
              <h3 className="font-syne font-bold text-base text-[#e2e1ee] uppercase">
                ALL-TIME TOP ARCHIVAL ARTISTS
              </h3>
              <p className="font-mono text-xs text-[#958ea0]">
                Ranked by audited playback frequency & volume share
              </p>
            </div>
            <button
              onClick={() => onNavigateTab('artists-and-songs')}
              className="text-xs font-mono text-[#d0bcff] hover:underline flex items-center gap-1"
            >
              VIEW ALL 612 <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>

          <div className="space-y-2.5">
            {TOP_ARTISTS.slice(0, 4).map((artist) => (
              <div
                key={artist.id}
                className="flex items-center justify-between p-3 rounded-xl bg-[#1d1f28] hover:bg-[#282a32] border border-[#33343e]/40 hover:border-[#494454] transition-colors group cursor-pointer"
                onClick={() => onNavigateTab('artists-and-songs')}
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="relative shrink-0">
                    <img
                      src={artist.avatarUrl}
                      alt={artist.name}
                      className="w-12 h-12 rounded-lg object-cover border border-[#494454]"
                    />
                    <span className="absolute -top-1.5 -left-1.5 w-5 h-5 rounded-full bg-[#3c0091] text-[#d0bcff] font-mono text-[10px] font-bold flex items-center justify-center border border-[#d0bcff]/40">
                      {artist.rank}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-syne font-semibold text-sm text-[#e2e1ee] group-hover:text-[#d0bcff] truncate">
                        {artist.name}
                      </h4>
                      <span className="font-mono text-[10px] px-1.5 py-0.2 rounded bg-[#11131b] text-[#958ea0]">
                        {artist.sharePercentage}% SHARE
                      </span>
                    </div>
                    <p className="text-xs text-[#cbc3d7]/80 truncate mt-0.5">
                      {artist.genre} • Top: {artist.topTracks[0]}
                    </p>
                  </div>
                </div>

                <div className="text-right font-mono shrink-0 pl-3">
                  <div className="text-sm font-bold text-[#e2e1ee]">
                    {artist.totalPlays} <span className="text-[10px] font-normal text-[#958ea0]">plays</span>
                  </div>
                  <div className="text-[11px] text-[#ffb95f]">
                    {artist.hoursListened} hrs
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 1 Col: Listening Biometrics & Chronotype */}
        <div className="bg-[#191b24] rounded-2xl border border-[#33343e]/60 p-6 space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-[#33343e]/40 pb-3 mb-4">
              <div>
                <h3 className="font-syne font-bold text-base text-[#e2e1ee] uppercase">
                  BIOMETRIC CHRONOTYPE
                </h3>
                <p className="font-mono text-xs text-[#958ea0]">
                  Circadian sonic preference
                </p>
              </div>
              <span className="material-symbols-outlined text-[#ffb95f]">bedtime</span>
            </div>

            <div className="p-4 rounded-xl bg-[#11131b] border border-[#33343e]/60 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[#958ea0]">PEAK RESONANCE:</span>
                <span className="font-bold text-[#ffb95f] text-sm">02:14 AM</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#958ea0]">REPEAT FACTOR:</span>
                <span className="font-bold text-[#d0bcff]">4.2x Standard</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#958ea0]">SOLITARY QUOTIENT:</span>
                <span className="font-bold text-[#cebdff]">94.8%</span>
              </div>

              {/* Hourly density visualizer bar */}
              <div className="pt-2">
                <span className="text-[10px] text-[#958ea0] block mb-1">
                  24-HOUR LISTENING DENSITY
                </span>
                <div className="flex items-end gap-1 h-10 w-full pt-1">
                  {[12, 18, 35, 65, 95, 45, 10, 5, 12, 20, 30, 25, 35, 40, 48, 55, 60, 75, 80, 85, 90, 100, 80, 40].map((val, i) => (
                    <div
                      key={i}
                      className={`flex-1 rounded-t-sm ${
                        i >= 20 || i <= 4
                          ? 'bg-[#d0bcff]'
                          : 'bg-[#33343e]'
                      }`}
                      style={{ height: `${val}%` }}
                      title={`${i}:00 - ${val}% density`}
                    ></div>
                  ))}
                </div>
                <div className="flex justify-between text-[9px] text-[#958ea0] mt-1 font-mono">
                  <span>00:00</span>
                  <span className="text-[#d0bcff] font-bold">02:00 AM PEAK</span>
                  <span>23:00</span>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => onNavigateTab('patterns')}
            className="w-full py-2.5 rounded-xl bg-[#282a32] hover:bg-[#33343e] text-[#d0bcff] font-syne text-xs font-bold tracking-wider uppercase border border-[#494454] transition-colors flex items-center justify-center gap-1.5"
          >
            <span className="material-symbols-outlined text-sm">insights</span>
            INSPECT 6 BEHAVIORAL PATTERNS
          </button>
        </div>
      </section>

      {/* 5. Pinnacle Archival Record Banner */}
      <section className="bg-gradient-to-r from-[#191b24] via-[#1d1f28] to-[#191b24] rounded-2xl border border-[#494454] p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xl">
        <div className="flex items-center gap-4">
          <img
            src={TOP_TRACKS[1].albumCover}
            alt="Holocene"
            className="w-16 h-16 rounded-xl object-cover border border-[#d0bcff]/40 shadow-lg shrink-0"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#ffb95f] px-2 py-0.5 rounded bg-[#ffb95f]/10 border border-[#ffb95f]/30">
                PINNACLE RECORD
              </span>
              <span className="font-mono text-[10px] text-[#958ea0]">
                318 LIFETIME PLAYS
              </span>
            </div>
            <h3 className="font-syne font-bold text-xl text-[#e2e1ee] mt-0.5">
              Holocene — Bon Iver
            </h3>
            <p className="text-xs text-[#cbc3d7] font-sans">
              Logged in 84 distinct late-night repeat cycles. Peak play timestamp recorded at 02:34 AM.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
          <button
            onClick={() => onPlaySong('Holocene', 'Bon Iver')}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#3c0091] hover:bg-[#4f319c] text-[#d0bcff] border border-[#d0bcff]/30 font-syne font-bold text-xs uppercase tracking-wider transition-all"
          >
            <span className="material-symbols-outlined text-base">play_arrow</span>
            REPLAY MEMORY
          </button>
          <button
            onClick={() => onOpenReceipt('Holocene')}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#282a32] hover:bg-[#33343e] text-[#e2e1ee] border border-[#494454] font-syne font-bold text-xs uppercase tracking-wider transition-all"
          >
            <span className="material-symbols-outlined text-base">receipt_long</span>
            VIEW RECEIPT
          </button>
        </div>
      </section>
    </div>
  );
};
