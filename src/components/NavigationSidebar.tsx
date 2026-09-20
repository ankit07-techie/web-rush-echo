import React from 'react';
import { ViewTab } from '../types';
import { USER_ARCHIVE_META } from '../data/mockData';
import { EchoesLogo } from './EchoesLogo';

interface NavigationSidebarProps {
  currentTab: ViewTab;
  onSelectTab: (tab: ViewTab) => void;
  onOpenReceiptModal: () => void;
}

export const NavigationSidebar: React.FC<NavigationSidebarProps> = ({
  currentTab,
  onSelectTab,
  onOpenReceiptModal
}) => {
  const navItems: { id: ViewTab; label: string; tag: string; icon: string }[] = [
    { id: 'home', label: 'HOME', tag: '01', icon: 'home' },
    { id: 'my-story', label: 'MY STORY', tag: 'CHPT', icon: 'auto_stories' },
    { id: 'timeline', label: 'TIMELINE', tag: 'REEL', icon: 'timeline' },
    { id: 'artists-and-songs', label: 'ARTISTS & SONGS', tag: 'LEDGER', icon: 'queue_music' },
    { id: 'patterns', label: 'PATTERNS', tag: 'NIGHT', icon: 'insights' },
    { id: 'connection-explorer', label: 'CONNECTION EXPLORER', tag: 'NODE', icon: 'hub' },
  ];

  return (
    <aside
      id="navigation-sidebar"
      className="w-64 shrink-0 bg-[#11131b] border-r border-[#33343e]/40 flex flex-col justify-between h-screen sticky top-0 z-30 select-none"
    >
      {/* Top Section */}
      <div className="flex flex-col">
        {/* Brand Header */}
        <div className="p-5 pb-4 border-b border-[#33343e]/30">
          <div
            className="mb-3 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#d0bcff] rounded-lg"
            onClick={() => onSelectTab('home')}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') onSelectTab('home');
            }}
            role="button"
            tabIndex={0}
            aria-label="Go to Echoes Archive Home"
          >
            <EchoesLogo variant="horizontal" size="md" interactive={true} />
          </div>

          <div className="flex items-center gap-1.5 py-1 px-2 rounded-md bg-[#1d1f28] border border-[#33343e]/50 w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-[#d0bcff] animate-pulse"></span>
            <span className="font-mono text-[10px] tracking-wider text-[#cbc3d7]">
              AUDITED {USER_ARCHIVE_META.archiveId}
            </span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav aria-label="Primary Navigation" className="p-3 space-y-1">
          <div className="px-3 py-1.5 text-[10px] font-mono tracking-widest text-[#958ea0]/70 uppercase">
            Navigation Ledger
          </div>
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-tab-${item.id}`}
                onClick={() => onSelectTab(item.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-left transition-all duration-150 group ${
                  isActive
                    ? 'bg-[#282a32] text-[#d0bcff] font-semibold shadow-inner border border-[#494454]/50'
                    : 'text-[#cbc3d7] hover:bg-[#1d1f28] hover:text-[#e2e1ee]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`material-symbols-outlined text-[19px] transition-colors ${
                      isActive ? 'text-[#d0bcff]' : 'text-[#958ea0] group-hover:text-[#cbc3d7]'
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span className="font-syne text-[12px] tracking-wider uppercase">
                    {item.label}
                  </span>
                </div>
                <span
                  className={`font-mono text-[10px] px-1.5 py-0.5 rounded border transition-colors ${
                    isActive
                      ? 'bg-[#3c0091]/80 text-[#d0bcff] border-[#d0bcff]/40'
                      : 'bg-[#191b24] text-[#958ea0] border-[#33343e]/50 group-hover:border-[#494454]'
                  }`}
                >
                  {item.tag}
                </span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="p-4 space-y-3 border-t border-[#33343e]/30 bg-[#0c0e16]/60">
        {/* Dataset Sync Status Card */}
        <div className="p-3 rounded-lg bg-[#191b24] border border-[#33343e]/50 text-left">
          <div className="flex items-center justify-between mb-1.5">
            <span className="font-mono text-[9px] tracking-wider text-[#958ea0] uppercase">
              Telemetry Status
            </span>
            <span className="font-mono text-[9px] text-[#ffb95f] flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ffb95f]"></span> LIVE
            </span>
          </div>
          <div className="font-mono text-[11px] font-medium text-[#e2e1ee]">
            {USER_ARCHIVE_META.totalPlays.toLocaleString()} RECORDS
          </div>
          <div className="text-[10px] text-[#cbc3d7]/80 mt-0.5 font-mono">
            {USER_ARCHIVE_META.listeningHours} HRS • {USER_ARCHIVE_META.archiveSpanYears} YRS DEPTH
          </div>
          <div className="w-full bg-[#11131b] h-1.5 rounded-full overflow-hidden mt-2 border border-[#33343e]/40">
            <div
              className="bg-gradient-to-r from-[#3c0091] via-[#d0bcff] to-[#ffb95f] h-full rounded-full"
              style={{ width: '99.4%' }}
            ></div>
          </div>
        </div>

        {/* Master Receipt Button */}
        <button
          id="btn-print-master-receipt"
          onClick={onOpenReceiptModal}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg bg-[#3c0091] hover:bg-[#4f319c] text-[#d0bcff] border border-[#d0bcff]/30 font-syne text-[11px] tracking-wider uppercase transition-all duration-200 active:scale-[0.98] shadow-sm"
        >
          <span className="material-symbols-outlined text-sm">print</span>
          PRINT MASTER TAPE
        </button>

        {/* User Card */}
        <div className="flex items-center gap-3 pt-2 border-t border-[#33343e]/30">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
              alt={USER_ARCHIVE_META.name}
              className="w-9 h-9 rounded-full object-cover border border-[#d0bcff]/40 ring-1 ring-[#3c0091]"
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#11131b]"></span>
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-syne text-[12px] font-semibold text-[#e2e1ee] truncate">
              {USER_ARCHIVE_META.name}
            </p>
            <p className="font-mono text-[10px] text-[#958ea0] truncate">
              {USER_ARCHIVE_META.title}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};
