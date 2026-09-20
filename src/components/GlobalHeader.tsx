import React from 'react';
import { ViewTab } from '../types';
import { EchoesLogo } from './EchoesLogo';

interface GlobalHeaderProps {
  currentTab: ViewTab;
  activeFilter: string;
  onChangeFilter: (filter: string) => void;
  onOpenSearch: () => void;
  onOpenReceipt: () => void;
  isPlayingSound: boolean;
  onTogglePlaySound: () => void;
  currentTrackName?: string;
  onOpenMobileMenu?: () => void;
}

export const GlobalHeader: React.FC<GlobalHeaderProps> = ({
  currentTab,
  activeFilter,
  onChangeFilter,
  onOpenSearch,
  onOpenReceipt,
  isPlayingSound,
  onTogglePlaySound,
  currentTrackName,
  onOpenMobileMenu
}) => {
  const getTabTitle = () => {
    switch (currentTab) {
      case 'home':
        return { title: 'DASHBOARD ARCHIVE', subtitle: '5.8 Years of Sonic Telemetry' };
      case 'my-story':
        return { title: 'CHRONICLED CHAPTERS', subtitle: 'Narrative Audio Memoirs & Eras' };
      case 'timeline':
        return { title: 'TEMPORAL SONIC STREAM', subtitle: 'Longitudinal Resonance & Spikes' };
      case 'artists-and-songs':
        return { title: 'CATALOG & THERMAL LEDGER', subtitle: 'Itemized 3,140 Track Records' };
      case 'patterns':
        return { title: 'BEHAVIORAL CHRONOLOGY', subtitle: '6 Mathematical Listening Anomalies' };
      case 'connection-explorer':
        return { title: 'NEURAL TAPESTRY OF TIME', subtitle: 'Constellation of Influences & Bridges' };
    }
  };

  const { title, subtitle } = getTabTitle();

  const filterOptions = [
    { id: 'all-time', label: 'All-Time' },
    { id: '2024', label: '2024 Active' },
    { id: 'late-night', label: 'Late Night (01:00-04:00)' },
    { id: 'autumn', label: 'Autumn Solstice' },
  ];

  return (
    <header
      id="global-header"
      className="sticky top-0 z-20 bg-[#11131b]/90 backdrop-blur-md border-b border-[#33343e]/40 px-6 py-3.5 flex items-center justify-between gap-4 select-none"
    >
      {/* Left: Mobile hamburger & Breadcrumb info */}
      <div className="flex items-center gap-3">
        {onOpenMobileMenu && (
          <button
            onClick={onOpenMobileMenu}
            className="md:hidden p-2 rounded-lg bg-[#191b24] text-[#e2e1ee] border border-[#33343e]"
          >
            <span className="material-symbols-outlined text-lg">menu</span>
          </button>
        )}

        <div className="md:hidden">
          <EchoesLogo variant="badge" size="sm" interactive={false} />
        </div>

        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-syne font-bold text-sm tracking-widest text-[#e2e1ee] uppercase">
              {title}
            </h1>
            <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-[#958ea0]"></span>
            <span className="hidden sm:inline-block font-mono text-[10px] text-[#958ea0] tracking-wider uppercase">
              {subtitle}
            </span>
          </div>
        </div>
      </div>

      {/* Center: Filter Pills (Desktop) */}
      <div className="hidden lg:flex items-center gap-1 bg-[#191b24] p-1 rounded-lg border border-[#33343e]/60">
        {filterOptions.map((opt) => (
          <button
            key={opt.id}
            onClick={() => onChangeFilter(opt.id)}
            className={`px-3 py-1 rounded text-xs font-mono transition-all duration-150 ${
              activeFilter === opt.id
                ? 'bg-[#3c0091] text-[#d0bcff] font-bold shadow-sm'
                : 'text-[#958ea0] hover:text-[#e2e1ee] hover:bg-[#282a32]'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Right: Quick Search, Sound State & Export Receipt Button */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Search Bar Button */}
        <button
          id="btn-open-search"
          onClick={onOpenSearch}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#191b24] hover:bg-[#282a32] text-[#958ea0] hover:text-[#e2e1ee] border border-[#33343e] text-xs font-mono transition-colors"
        >
          <span className="material-symbols-outlined text-sm text-[#d0bcff]">search</span>
          <span className="hidden sm:inline">Search archive...</span>
          <kbd className="hidden sm:inline-block px-1.5 py-0.2 text-[9px] bg-[#11131b] border border-[#494454] rounded text-[#cbc3d7]">
            ⌘K
          </kbd>
        </button>

        {/* Replaying Sound Capsule Indicator */}
        {isPlayingSound && (
          <button
            onClick={onTogglePlaySound}
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-[#3c0091]/60 border border-[#d0bcff]/40 text-[#d0bcff] text-xs font-mono animate-pulse"
            title={`Playing: ${currentTrackName || 'Audio Memory'}`}
          >
            <span className="material-symbols-outlined text-sm">graphic_eq</span>
            <span className="hidden xl:inline text-[11px] truncate max-w-[120px]">
              {currentTrackName || 'PLAYING'}
            </span>
          </button>
        )}

        {/* Master Receipt Button */}
        <button
          id="btn-header-export-receipt"
          onClick={onOpenReceipt}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#d0bcff] hover:bg-white text-[#3c0091] font-syne text-xs font-bold tracking-wider transition-all duration-150 active:scale-95 shadow-sm"
        >
          <span className="material-symbols-outlined text-sm">receipt_long</span>
          <span className="hidden sm:inline">RECEIPT</span>
        </button>
      </div>
    </header>
  );
};
