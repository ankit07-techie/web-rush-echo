import React, { useState, useMemo } from 'react';
import { TIMELINE_MILESTONES, USER_ARCHIVE_META } from '../data/mockData';
import { TIMELINE_YEAR_DATA, MonthTelemetry, YearTelemetry } from '../data/timelineData';

interface TimelineViewProps {
  onOpenReceipt: (title?: string) => void;
  onPlaySong: (title: string, artist: string) => void;
}

export const TimelineView: React.FC<TimelineViewProps> = ({
  onOpenReceipt,
  onPlaySong
}) => {
  const [activeYear, setActiveYear] = useState<string>('ALL');
  const [activeSeason, setActiveSeason] = useState<string>('ALL');
  const [viewMode, setViewMode] = useState<'chronicle' | 'matrix' | 'tape'>('chronicle');
  const [expandedMilestone, setExpandedMilestone] = useState<string | null>('mile-2024-01');
  const [selectedMonthIndex, setSelectedMonthIndex] = useState<number | null>(null);
  const [hoveredMonthIndex, setHoveredMonthIndex] = useState<number | null>(null);

  const years = [
    { label: 'ALL', count: '14.8k' },
    { label: '2019', count: '1.2k' },
    { label: '2020', count: '2.8k' },
    { label: '2021', count: '3.4k' },
    { label: '2022', count: '3.9k' },
    { label: '2023', count: '2.4k' },
    { label: '2024', count: '1.1k' },
  ];

  const seasons = ['ALL', 'SPRING', 'SUMMER', 'AUTUMN', 'WINTER'];

  // Current year telemetry data
  const currentYearData: YearTelemetry = useMemo(() => {
    return TIMELINE_YEAR_DATA[activeYear] || TIMELINE_YEAR_DATA['ALL'];
  }, [activeYear]);

  // Compute points for SVG curve
  const graphPoints = useMemo(() => {
    return currentYearData.months.map((m, idx) => {
      const x = 50 + idx * ((1000 - 100) / 11);
      const y = 175 - (m.amplitude / 100) * 135;
      const isSeasonMatch = activeSeason === 'ALL' || m.season === activeSeason;
      return {
        ...m,
        x,
        y,
        index: idx,
        isSeasonMatch
      };
    });
  }, [currentYearData, activeSeason]);

  // Cubic Bezier SVG path generator
  const curvePath = useMemo(() => {
    if (graphPoints.length === 0) return '';
    let d = `M ${graphPoints[0].x.toFixed(1)},${graphPoints[0].y.toFixed(1)}`;
    for (let i = 0; i < graphPoints.length - 1; i++) {
      const p0 = i > 0 ? graphPoints[i - 1] : graphPoints[i];
      const p1 = graphPoints[i];
      const p2 = graphPoints[i + 1];
      const p3 = i < graphPoints.length - 2 ? graphPoints[i + 2] : p2;
      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;
      d += ` C ${cp1x.toFixed(1)},${cp1y.toFixed(1)} ${cp2x.toFixed(1)},${cp2y.toFixed(1)} ${p2.x.toFixed(1)},${p2.y.toFixed(1)}`;
    }
    return d;
  }, [graphPoints]);

  const areaPath = useMemo(() => {
    if (graphPoints.length === 0) return '';
    const lastPoint = graphPoints[graphPoints.length - 1];
    const firstPoint = graphPoints[0];
    return `${curvePath} L ${lastPoint.x.toFixed(1)},195 L ${firstPoint.x.toFixed(1)},195 Z`;
  }, [curvePath, graphPoints]);

  // Filter milestones based on both year and season
  const filteredMilestones = useMemo(() => {
    return TIMELINE_MILESTONES.filter((m) => {
      const matchesYear = activeYear === 'ALL' || m.dateKey.endsWith(activeYear.slice(2));
      if (!matchesYear) return false;
      if (activeSeason === 'ALL') return true;
      const monthNum = parseInt(m.dateKey.split('.')[0], 10);
      const monthSeason =
        monthNum === 12 || monthNum === 1 || monthNum === 2
          ? 'WINTER'
          : monthNum >= 3 && monthNum <= 5
          ? 'SPRING'
          : monthNum >= 6 && monthNum <= 8
          ? 'SUMMER'
          : 'AUTUMN';
      return monthSeason === activeSeason;
    });
  }, [activeYear, activeSeason]);

  // Active inspected month
  const inspectedMonth = useMemo(() => {
    const idx = selectedMonthIndex !== null ? selectedMonthIndex : hoveredMonthIndex;
    if (idx !== null && graphPoints[idx]) {
      return graphPoints[idx];
    }
    return null;
  }, [selectedMonthIndex, hoveredMonthIndex, graphPoints]);

  // Active seasonal metrics for filter banner
  const activeSeasonMeta = useMemo(() => {
    if (activeSeason === 'ALL') return null;
    const key = activeSeason as keyof typeof currentYearData.seasonBreakdown;
    return currentYearData.seasonBreakdown[key] || null;
  }, [activeSeason, currentYearData]);

  const handleMilestoneClick = (milestoneId: string, dateKey: string) => {
    setExpandedMilestone((prev) => (prev === milestoneId ? null : milestoneId));
    // Find matching month index
    const monthNum = parseInt(dateKey.split('.')[0], 10);
    const targetIdx = monthNum - 1;
    if (targetIdx >= 0 && targetIdx < 12) {
      setSelectedMonthIndex(targetIdx);
    }
  };

  return (
    <div id="timeline-view" className="p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      {/* 1. Header & Controls Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#33343e]/50 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#d0bcff]">timeline</span>
            <h2 className="font-syne font-black text-2xl text-[#e2e1ee] uppercase tracking-wide">
              TEMPORAL SONIC STREAM
            </h2>
          </div>
          <p className="font-mono text-xs text-[#958ea0] mt-0.5">
            5.8 Years of Audited Milestones, Harmonic Solstices & Listening Spikes
          </p>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-1 bg-[#191b24] p-1 rounded-xl border border-[#33343e]">
          <button
            onClick={() => setViewMode('chronicle')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 ${
              viewMode === 'chronicle'
                ? 'bg-[#3c0091] text-[#d0bcff] font-bold shadow-sm'
                : 'text-[#958ea0] hover:text-[#e2e1ee]'
            }`}
          >
            <span className="material-symbols-outlined text-xs">ssid_chart</span>
            Chronicle Waveform
          </button>
          <button
            onClick={() => setViewMode('matrix')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 ${
              viewMode === 'matrix'
                ? 'bg-[#3c0091] text-[#d0bcff] font-bold shadow-sm'
                : 'text-[#958ea0] hover:text-[#e2e1ee]'
            }`}
          >
            <span className="material-symbols-outlined text-xs">grid_view</span>
            Season Matrix
          </button>
          <button
            onClick={() => setViewMode('tape')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 ${
              viewMode === 'tape'
                ? 'bg-[#3c0091] text-[#d0bcff] font-bold shadow-sm'
                : 'text-[#958ea0] hover:text-[#e2e1ee]'
            }`}
          >
            <span className="material-symbols-outlined text-xs">album</span>
            Tape Reel
          </button>
        </div>
      </div>

      {/* 2. Year Scrubber & Season Filter Chips */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <span className="font-mono text-[10px] text-[#958ea0] uppercase tracking-wider shrink-0 mr-1">
            Year Lens:
          </span>
          {years.map((y) => {
            const isSelected = activeYear === y.label;
            return (
              <button
                key={y.label}
                onClick={() => {
                  setActiveYear(y.label);
                  setSelectedMonthIndex(null);
                }}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg font-mono text-xs transition-all shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-[#d0bcff] text-[#3c0091] font-bold shadow-md scale-105'
                    : 'bg-[#191b24] text-[#cbc3d7] border border-[#33343e] hover:bg-[#282a32] hover:border-[#d0bcff]/40'
                }`}
              >
                <span>{y.label}</span>
                <span className={`text-[10px] ${isSelected ? 'text-[#3c0091]/80 font-bold' : 'text-[#958ea0]'}`}>
                  {y.count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2 overflow-x-auto">
          <span className="font-mono text-[10px] text-[#958ea0] uppercase tracking-wider shrink-0 mr-1">
            Season Lens:
          </span>
          {seasons.map((s) => {
            const isSelected = activeSeason === s;
            return (
              <button
                key={s}
                onClick={() => {
                  setActiveSeason(s);
                  setSelectedMonthIndex(null);
                }}
                className={`px-3 py-1 rounded-md text-[11px] font-mono transition-all shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-[#ffb95f] text-[#472a00] font-bold shadow-sm'
                    : 'text-[#958ea0] hover:text-[#e2e1ee] hover:bg-[#191b24] border border-transparent hover:border-[#33343e]'
                }`}
              >
                {s}
              </button>
            );
          })}

          {activeSeason !== 'ALL' && (
            <button
              onClick={() => setActiveSeason('ALL')}
              className="text-[10px] font-mono text-[#ffb95f] underline hover:text-[#ffd188] ml-1 shrink-0"
            >
              Reset Lens
            </button>
          )}
        </div>
      </div>

      {/* Seasonal Meta Banner if Season is active */}
      {activeSeasonMeta && (
        <div className="bg-[#191b24]/90 border border-[#ffb95f]/30 rounded-xl p-3 sm:p-4 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ffb95f] animate-pulse"></span>
            <div>
              <span className="text-[#ffb95f] font-bold text-xs uppercase tracking-wider block">
                {activeSeason} RESONANCE PROFILE ({activeYear})
              </span>
              <span className="text-[#958ea0] text-[11px]">
                Atmospheric State: {activeSeasonMeta.mood}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 sm:gap-6 text-[11px]">
            <div>
              <span className="text-[#958ea0] block text-[10px]">PLAYS</span>
              <span className="text-[#e2e1ee] font-bold">{activeSeasonMeta.plays.toLocaleString()}</span>
            </div>
            <div>
              <span className="text-[#958ea0] block text-[10px]">HOURS</span>
              <span className="text-[#ffb95f] font-bold">{activeSeasonMeta.hours}h</span>
            </div>
            <div>
              <span className="text-[#958ea0] block text-[10px]">TEMPO</span>
              <span className="text-[#d0bcff] font-bold">{activeSeasonMeta.bpm} BPM</span>
            </div>
            <button
              onClick={() => onPlaySong(activeSeasonMeta.topTrack, activeSeasonMeta.topArtist)}
              className="px-2.5 py-1 rounded bg-[#ffb95f]/20 hover:bg-[#ffb95f]/30 text-[#ffb95f] border border-[#ffb95f]/40 font-syne text-[10px] font-bold uppercase transition-colors"
            >
              PLAY {activeSeasonMeta.topTrack}
            </button>
          </div>
        </div>
      )}

      {/* 3. DYNAMIC INTERACTIVE VISUALIZER */}
      {viewMode === 'chronicle' && (
        <div className="bg-[#191b24] rounded-2xl border border-[#33343e]/60 p-6 space-y-4 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#33343e]/40 pb-4">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-syne font-bold text-base text-[#e2e1ee] uppercase">
                  {activeYear === 'ALL' ? '5.8-YEAR' : activeYear} HARMONIC RESONANCE & OBSESSION SPIKES
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#3c0091]/60 text-[#d0bcff] border border-[#d0bcff]/30">
                  {currentYearData.eraName}
                </span>
              </div>
              <p className="font-mono text-xs text-[#958ea0] mt-0.5">
                {currentYearData.subEra} • Click any node or month label below to inspect
              </p>
            </div>

            <div className="flex items-center gap-4 font-mono text-[11px] shrink-0">
              <span className="flex items-center gap-1.5 text-[#d0bcff]">
                <span className="w-3 h-0.5 bg-[#d0bcff]"></span> Mean Tempo ({currentYearData.meanBpm} BPM)
              </span>
              <span className="flex items-center gap-1.5 text-[#ffb95f]">
                <span className="w-2 h-2 rounded-full bg-[#ffb95f]"></span> Obsession Spike
              </span>
            </div>
          </div>

          {/* SVG Interactive Chart with Dynamic Data */}
          <div className="relative h-56 w-full pt-2 select-none">
            <svg
              className="w-full h-full overflow-visible"
              viewBox="0 0 1000 200"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id={`streamGrad-${activeYear}`} x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#d0bcff" stopOpacity="0.45" />
                  <stop offset="60%" stopColor="#d0bcff" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#d0bcff" stopOpacity="0.0" />
                </linearGradient>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Grid lines */}
              <line x1="40" y1="45" x2="960" y2="45" stroke="#33343e" strokeDasharray="4 4" strokeWidth="1" opacity="0.6" />
              <line x1="40" y1="95" x2="960" y2="95" stroke="#33343e" strokeDasharray="4 4" strokeWidth="1" opacity="0.6" />
              <line x1="40" y1="145" x2="960" y2="145" stroke="#33343e" strokeDasharray="4 4" strokeWidth="1" opacity="0.6" />
              <line x1="40" y1="195" x2="960" y2="195" stroke="#33343e" strokeWidth="1" opacity="0.8" />

              {/* Dynamic Area fill */}
              <path
                d={areaPath}
                fill={`url(#streamGrad-${activeYear})`}
                className="transition-all duration-500 ease-out"
              />

              {/* Dynamic Main Harmonic Curve */}
              <path
                d={curvePath}
                fill="none"
                stroke="#d0bcff"
                strokeWidth="3.5"
                filter="url(#glow)"
                className="transition-all duration-500 ease-out"
              />

              {/* Active Inspected Vertical Cursor Line */}
              {inspectedMonth && (
                <line
                  x1={inspectedMonth.x}
                  y1="25"
                  x2={inspectedMonth.x}
                  y2="195"
                  stroke="#ffb95f"
                  strokeWidth="1.5"
                  strokeDasharray="2 2"
                  className="transition-all duration-200"
                />
              )}

              {/* Interactive Points on the Curve */}
              {graphPoints.map((pt) => {
                const isSelected = selectedMonthIndex === pt.index;
                const isHovered = hoveredMonthIndex === pt.index;
                const isFocused = isSelected || isHovered;
                const opacity = pt.isSeasonMatch ? 1 : 0.35;

                return (
                  <g
                    key={`point-${pt.month}-${activeYear}`}
                    className="cursor-pointer transition-transform duration-200"
                    onClick={() => setSelectedMonthIndex(isSelected ? null : pt.index)}
                    onMouseEnter={() => setHoveredMonthIndex(pt.index)}
                    onMouseLeave={() => setHoveredMonthIndex(null)}
                    style={{ opacity }}
                  >
                    {/* Invisible larger click target */}
                    <circle cx={pt.x} cy={pt.y} r="18" fill="transparent" />

                    {/* Outer pulse circle if selected or spike */}
                    {(isFocused || pt.spike) && (
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r={isFocused ? '10' : '7'}
                        fill="none"
                        stroke={pt.spike ? (pt.spike.color || '#ffb95f') : '#d0bcff'}
                        strokeWidth={isFocused ? '2.5' : '1.5'}
                        className={isFocused ? 'animate-ping origin-center' : ''}
                        opacity="0.7"
                      />
                    )}

                    {/* Main node point */}
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r={pt.spike ? (isFocused ? 6.5 : 5.5) : (isFocused ? 5.5 : 4)}
                      fill={pt.spike ? (pt.spike.color || '#ffb95f') : (isFocused ? '#ffffff' : '#d0bcff')}
                      stroke="#11131b"
                      strokeWidth="2"
                    />

                    {/* Spike labels above peak points */}
                    {pt.spike && (
                      <g className="transition-all duration-300">
                        <rect
                          x={pt.x - 70}
                          y={Math.max(10, pt.y - 34)}
                          width="140"
                          height="20"
                          rx="4"
                          fill="#11131b"
                          fillOpacity="0.85"
                          stroke={pt.spike.color || '#ffb95f'}
                          strokeWidth="1"
                        />
                        <text
                          x={pt.x}
                          y={Math.max(24, pt.y - 20)}
                          fill={pt.spike.color || '#ffb95f'}
                          fontSize="9.5"
                          fontWeight="bold"
                          fontFamily="JetBrains Mono, monospace"
                          textAnchor="middle"
                        >
                          {pt.spike.title}
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Interactive X Axis month tags */}
          <div className="grid grid-cols-12 gap-1 pt-2 border-t border-[#33343e]/40 font-mono text-[10px]">
            {graphPoints.map((pt) => {
              const isSelected = selectedMonthIndex === pt.index;
              const isHovered = hoveredMonthIndex === pt.index;
              const isSeason = pt.isSeasonMatch;

              return (
                <button
                  key={pt.month}
                  onClick={() => setSelectedMonthIndex(isSelected ? null : pt.index)}
                  onMouseEnter={() => setHoveredMonthIndex(pt.index)}
                  onMouseLeave={() => setHoveredMonthIndex(null)}
                  className={`text-center py-1.5 rounded transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#d0bcff] text-[#3c0091] font-bold shadow'
                      : isHovered
                      ? 'bg-[#282a32] text-[#e2e1ee]'
                      : isSeason
                      ? 'text-[#cbc3d7] hover:text-[#e2e1ee]'
                      : 'text-[#958ea0]/40'
                  }`}
                >
                  <span className="block font-bold">{pt.month}</span>
                  <span className="text-[9px] block opacity-70">{pt.bpm}B</span>
                </button>
              );
            })}
          </div>

          {/* Real-time Month Telemetry Inspector Card (Appears on click or hover) */}
          {inspectedMonth ? (
            <div className="p-4 rounded-xl bg-[#11131b] border border-[#d0bcff]/40 font-mono text-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4 animate-in fade-in slide-in-from-bottom-2 duration-200">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 rounded bg-[#3c0091] text-[#d0bcff] font-bold text-xs">
                  {inspectedMonth.month} {activeYear === 'ALL' ? 'MEAN' : activeYear}
                </span>
                <div>
                  <span className="text-[#ffb95f] font-bold text-sm block">
                    Top Anchor: {inspectedMonth.topTrack}
                  </span>
                  <span className="text-[#958ea0] text-[11px]">
                    By {inspectedMonth.topArtist} • Season: {inspectedMonth.season}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-5 text-xs">
                <div>
                  <span className="text-[10px] text-[#958ea0] block">PLAY COUNT</span>
                  <span className="text-[#e2e1ee] font-bold">{inspectedMonth.plays.toLocaleString()} Plays</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#958ea0] block">EXPOSURE</span>
                  <span className="text-[#ffb95f] font-bold">{inspectedMonth.hours} Hours</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#958ea0] block">AVERAGE BPM</span>
                  <span className="text-[#d0bcff] font-bold">{inspectedMonth.bpm} BPM</span>
                </div>

                <button
                  onClick={() => onPlaySong(inspectedMonth.topTrack, inspectedMonth.topArtist)}
                  className="px-3 py-1.5 rounded-lg bg-[#3c0091] hover:bg-[#4f319c] text-[#d0bcff] font-syne text-[11px] font-bold uppercase transition-colors flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-sm">play_arrow</span>
                  REPLAY TRACK
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-1 text-[11px] font-mono text-[#958ea0]/70">
              ✦ Tip: Click any month column, spike marker, or year button above to inspect itemized telemetry
            </div>
          )}
        </div>
      )}

      {/* VIEW MODE 2: SEASON MATRIX */}
      {viewMode === 'matrix' && (
        <div className="space-y-6">
          <div className="bg-[#191b24] border border-[#33343e] rounded-2xl p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#33343e]/40 pb-4">
              <div>
                <h3 className="font-syne font-bold text-base text-[#e2e1ee] uppercase">
                  SEASONAL HARMONIC MATRIX ({activeYear})
                </h3>
                <p className="font-mono text-xs text-[#958ea0]">
                  Comparative analysis of energy, tempo acceleration, and acoustic density by solstice
                </p>
              </div>
              <span className="font-mono text-xs text-[#d0bcff] bg-[#3c0091]/40 px-3 py-1 rounded-md border border-[#3c0091]">
                4 SOLSTICE COMPARISON
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {(['WINTER', 'SPRING', 'SUMMER', 'AUTUMN'] as const).map((seasonKey) => {
                const sData = currentYearData.seasonBreakdown[seasonKey];
                const isFiltered = activeSeason === seasonKey;

                return (
                  <div
                    key={seasonKey}
                    onClick={() => setActiveSeason(isFiltered ? 'ALL' : seasonKey)}
                    className={`p-5 rounded-xl border transition-all cursor-pointer space-y-4 ${
                      isFiltered
                        ? 'bg-[#11131b] border-[#ffb95f] ring-2 ring-[#ffb95f]/30'
                        : 'bg-[#11131b]/80 border-[#33343e] hover:border-[#494454] hover:bg-[#191b24]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-xs uppercase tracking-wider text-[#d0bcff]">
                        {seasonKey}
                      </span>
                      <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#282a32] text-[#ffb95f]">
                        {sData.bpm} BPM
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] font-mono text-[#958ea0] block">DOMINANT MOOD</span>
                      <h4 className="font-syne font-bold text-sm text-[#e2e1ee] mt-0.5">
                        {sData.mood}
                      </h4>
                    </div>

                    <div className="space-y-1.5 font-mono text-xs">
                      <div className="flex justify-between text-[11px]">
                        <span className="text-[#958ea0]">Plays:</span>
                        <span className="text-[#e2e1ee] font-bold">{sData.plays.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-[11px]">
                        <span className="text-[#958ea0]">Hours:</span>
                        <span className="text-[#ffb95f] font-bold">{sData.hours} hrs</span>
                      </div>
                      <div className="flex justify-between text-[11px] pt-1 border-t border-[#33343e]/40">
                        <span className="text-[#958ea0]">Top Anchor:</span>
                        <span className="text-[#d0bcff] font-medium truncate max-w-[120px]">{sData.topTrack}</span>
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onPlaySong(sData.topTrack, sData.topArtist);
                      }}
                      className="w-full py-2 rounded-lg bg-[#3c0091] hover:bg-[#4f319c] text-[#d0bcff] font-syne text-[10px] font-bold uppercase transition-colors flex items-center justify-center gap-1.5"
                    >
                      <span className="material-symbols-outlined text-xs">play_arrow</span>
                      PLAY {seasonKey} ANCHOR
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* VIEW MODE 3: TAPE REEL VIEW */}
      {viewMode === 'tape' && (
        <div className="bg-[#191b24] border border-[#33343e] rounded-2xl p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#33343e]/40 pb-4">
            <div>
              <h3 className="font-syne font-bold text-base text-[#e2e1ee] uppercase">
                MAGNETIC TAPE SPOOL REEL ({activeYear})
              </h3>
              <p className="font-mono text-xs text-[#958ea0]">
                Sequential analog magnetic capture • Total runtime: {currentYearData.totalHours} hours
              </p>
            </div>
            <div className="flex items-center gap-2 font-mono text-xs text-[#ffb95f] bg-[#11131b] px-3 py-1.5 rounded-lg border border-[#33343e]">
              <span className="material-symbols-outlined text-sm animate-spin text-[#ffb95f]">motion_photos_on</span>
              <span>TAPE SPEED: 15 IPS HIGH-BIAS</span>
            </div>
          </div>

          {/* Tactile Cassette Spool Deck */}
          <div className="bg-[#11131b] border border-[#33343e] rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Left Spool */}
            <div className="flex items-center gap-6">
              <div className="relative w-24 h-24 rounded-full border-4 border-[#33343e] bg-[#191b24] flex items-center justify-center shadow-inner">
                <div className="w-12 h-12 rounded-full border-2 border-[#d0bcff]/40 bg-[#11131b] flex items-center justify-center animate-spin">
                  <div className="w-2 h-6 bg-[#d0bcff]"></div>
                </div>
                <span className="absolute text-[8px] font-mono text-[#958ea0] bottom-1">SIDE A</span>
              </div>

              <div className="space-y-1 font-mono text-xs">
                <span className="text-[10px] text-[#958ea0] block">ACTIVE REEL IDENTIFIER:</span>
                <span className="font-bold text-[#e2e1ee] text-sm">#ECHOES-TAPE-{activeYear}</span>
                <span className="text-[#ffb95f] text-[11px] block">{currentYearData.totalPlays} Telemetry Packets</span>
              </div>
            </div>

            {/* Center Tape Window Gauge */}
            <div className="w-full md:w-64 bg-[#191b24] border border-[#33343e] rounded-lg p-3 text-center font-mono space-y-1">
              <div className="text-[10px] text-[#958ea0] flex justify-between">
                <span>00:00</span>
                <span className="text-[#d0bcff] font-bold">ANALOG TAPE COUNTER</span>
                <span>{currentYearData.totalHours}h</span>
              </div>
              <div className="w-full bg-[#11131b] h-3 rounded-full overflow-hidden border border-[#33343e]">
                <div className="bg-gradient-to-r from-[#3c0091] via-[#d0bcff] to-[#ffb95f] h-full w-3/4"></div>
              </div>
              <span className="text-[9px] text-[#958ea0] block">BIAS CALIBRATION: OPTIMAL</span>
            </div>

            {/* Right Spool */}
            <div className="flex items-center gap-6">
              <div className="space-y-1 font-mono text-xs text-right">
                <span className="text-[10px] text-[#958ea0] block">LEAD TRACK:</span>
                <span className="font-bold text-[#d0bcff] text-sm">{currentYearData.topTrackAnchor}</span>
                <span className="text-[#cbc3d7] text-[11px] block">{currentYearData.topArtistAnchor}</span>
              </div>

              <div className="relative w-24 h-24 rounded-full border-4 border-[#33343e] bg-[#191b24] flex items-center justify-center shadow-inner">
                <div className="w-12 h-12 rounded-full border-2 border-[#ffb95f]/40 bg-[#11131b] flex items-center justify-center animate-spin">
                  <div className="w-6 h-2 bg-[#ffb95f]"></div>
                </div>
                <span className="absolute text-[8px] font-mono text-[#958ea0] bottom-1">SIDE B</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. Split Layout: Milestone Cards vs Time Travel Ledger */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left 2 Cols: Milestone Cards Stream */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-syne font-bold text-base text-[#e2e1ee] uppercase">
              CHRONICLE MILESTONES ({filteredMilestones.length})
            </h3>
            <span className="font-mono text-xs text-[#958ea0]">
              TAP TO PINPOINT ON GRAPH
            </span>
          </div>

          {filteredMilestones.length === 0 ? (
            <div className="p-8 text-center bg-[#191b24] rounded-2xl border border-[#33343e] font-mono text-xs text-[#958ea0] space-y-3">
              <span className="material-symbols-outlined text-3xl text-[#d0bcff]">search_off</span>
              <p>No milestones matched year: {activeYear} & season: {activeSeason}</p>
              <button
                onClick={() => {
                  setActiveYear('ALL');
                  setActiveSeason('ALL');
                }}
                className="px-4 py-2 rounded-lg bg-[#3c0091] text-[#d0bcff] font-syne font-bold text-xs uppercase"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredMilestones.map((m) => {
                const isExpanded = expandedMilestone === m.id;
                return (
                  <div
                    key={m.id}
                    className={`bg-[#191b24] rounded-2xl border transition-all duration-200 p-6 space-y-4 cursor-pointer ${
                      isExpanded
                        ? 'border-[#d0bcff]/60 shadow-lg ring-1 ring-[#d0bcff]/30'
                        : 'border-[#33343e]/60 hover:border-[#494454]'
                    }`}
                    onClick={() => handleMilestoneClick(m.id, m.dateKey)}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="font-mono font-bold text-sm text-[#ffb95f] px-2.5 py-1 rounded bg-[#ffb95f]/10 border border-[#ffb95f]/30">
                          {m.dateKey}
                        </span>
                        <div>
                          <span className="font-mono text-[10px] text-[#958ea0] block">
                            {m.dateLabel}
                          </span>
                          <h4 className="font-syne font-bold text-lg text-[#e2e1ee]">
                            {m.title}
                          </h4>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#11131b] text-[#d0bcff] border border-[#3c0091]">
                          {m.tag}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleMilestoneClick(m.id, m.dateKey);
                          }}
                          className="w-8 h-8 rounded-lg bg-[#282a32] text-[#cbc3d7] flex items-center justify-center hover:bg-[#33343e]"
                        >
                          <span className="material-symbols-outlined text-sm">
                            {isExpanded ? 'expand_less' : 'expand_more'}
                          </span>
                        </button>
                      </div>
                    </div>

                    <p className="text-sm text-[#cbc3d7] leading-relaxed">
                      {m.description}
                    </p>

                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#33343e]/40 font-mono text-xs">
                      <div className="flex items-center gap-3">
                        <span className="text-[#958ea0]">Track Anchor:</span>
                        <span className="font-semibold text-[#e2e1ee]">{m.track}</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-[#ffb95f] font-bold">{m.plays} Plays</span>
                        <span className="text-[#958ea0]">({m.hours} hrs)</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onPlaySong(m.track, m.artist);
                          }}
                          className="px-2.5 py-1 rounded bg-[#3c0091] hover:bg-[#4f319c] text-[#d0bcff] font-syne text-[10px] font-bold uppercase transition-colors"
                        >
                          REPLAY
                        </button>
                      </div>
                    </div>

                    {/* Expanded Itemized Playback Receipt */}
                    {isExpanded && (
                      <div className="mt-3 p-4 rounded-xl bg-[#11131b] border border-[#33343e] font-mono text-xs space-y-2 animate-in fade-in">
                        <div className="flex justify-between text-[10px] text-[#958ea0] border-b border-[#33343e] pb-1">
                          <span>{m.receiptNumber} TELEMETRY ARCHIVE</span>
                          <span>DEVICE AUDIO LOGS</span>
                        </div>
                        {m.logs.map((log, idx) => (
                          <div key={idx} className="flex justify-between items-center text-[11px]">
                            <span className="text-[#ffb95f]">{log.time}</span>
                            <span className="text-[#cbc3d7] truncate max-w-[280px]">{log.event}</span>
                            <span className="text-[#958ea0]">{log.duration}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right 1 Col: Time Travel Ledger */}
        <div className="lg:sticky lg:top-20 space-y-6">
          <div className="bg-[#191b24] rounded-2xl border border-[#33343e]/60 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[#33343e]/40 pb-3">
              <div>
                <h4 className="font-syne font-bold text-sm text-[#e2e1ee] uppercase">
                  TIME TRAVEL LEDGER
                </h4>
                <p className="font-mono text-[10px] text-[#958ea0]">
                  Longitudinal Habitus Anomalies
                </p>
              </div>
              <span className="material-symbols-outlined text-[#d0bcff]">history_edu</span>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div className="p-3 rounded-lg bg-[#11131b] border border-[#33343e] space-y-1">
                <span className="text-[10px] text-[#958ea0]">CUMULATIVE AUDIT BALANCE:</span>
                <div className="text-xl font-syne font-black text-[#ffb95f]">
                  {activeYear === 'ALL' ? '11,940 HRS' : `${currentYearData.totalHours} HRS`}
                </div>
                <p className="text-[10px] text-[#cbc3d7]/70">
                  Total exposure across all devices for {activeYear === 'ALL' ? 'all audited eras' : activeYear}.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-[#11131b] border border-[#33343e] space-y-1">
                <span className="text-[10px] text-[#958ea0]">DOMINANT ANCHOR:</span>
                <div className="text-sm font-bold text-[#d0bcff] truncate">
                  {currentYearData.topTrackAnchor}
                </div>
                <p className="text-[10px] text-[#cbc3d7]/70">
                  By {currentYearData.topArtistAnchor} • Mean tempo {currentYearData.meanBpm} BPM.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-[#11131b] border border-[#33343e] space-y-1">
                <span className="text-[10px] text-[#958ea0]">CHRONOLOGICAL DRIFT:</span>
                <div className="text-sm font-bold text-[#d0bcff]">
                  +42 Min / Year Nocturnal
                </div>
                <p className="text-[10px] text-[#cbc3d7]/70">
                  Each passing year shifts your active listening window deeper into the night.
                </p>
              </div>

              {/* Barcode */}
              <div className="pt-2 text-center">
                <div className="font-mono text-xs tracking-widest text-[#958ea0]">
                  ||||| ||| |||| | |||||| ||
                </div>
                <span className="text-[9px] text-[#958ea0] uppercase">
                  LEDGER ID #{activeYear}-A-LONGITUDINAL
                </span>
              </div>

              <button
                onClick={() => onOpenReceipt(`ECHOES-${activeYear}-TELEMETRY`)}
                className="w-full py-2.5 rounded-xl bg-[#3c0091] hover:bg-[#4f319c] text-[#d0bcff] font-syne font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">print</span>
                DOWNLOAD {activeYear} ARCHIVE
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
