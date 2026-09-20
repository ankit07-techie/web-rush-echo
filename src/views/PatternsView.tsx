import React, { useState } from 'react';
import { BEHAVIORAL_PATTERNS } from '../data/mockData';
import DancingLetters from '@/components/ui/dancing-letters';

interface PatternsViewProps {
  onOpenReceipt: (title?: string) => void;
  onPlaySong: (title: string, artist: string) => void;
}

export const PatternsView: React.FC<PatternsViewProps> = ({
  onOpenReceipt,
  onPlaySong
}) => {
  const [selectedPattern, setSelectedPattern] = useState(BEHAVIORAL_PATTERNS[0]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleInspectPattern = (pattern: typeof BEHAVIORAL_PATTERNS[0]) => {
    setSelectedPattern(pattern);
    setDrawerOpen(true);
  };

  return (
    <div id="patterns-view" className="p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      {/* 1. Header & Live Metric Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#33343e]/50 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#ffb95f]">insights</span>
            <h2 className="font-syne font-black text-2xl text-[#e2e1ee] uppercase tracking-wide flex flex-wrap items-center gap-x-2">
              <span>BEHAVIORAL</span>
              <DancingLetters
                text="PATTERNS"
                className="inline-flex"
                letterClassName="text-2xl font-syne font-black text-[#ffb95f] hover:text-[#d0bcff] transition-colors"
              />
            </h2>
          </div>
          <p className="font-mono text-xs text-[#958ea0] mt-0.5">
            Empirical Biometric Signatures, Repetition Trajectories & Circadian Deviations
          </p>
        </div>

        {/* Live Integrity Chip */}
        <div className="flex items-center gap-3 bg-[#191b24] px-4 py-2 rounded-xl border border-[#33343e]">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <div className="font-mono text-xs">
            <span className="text-[#cbc3d7]">6 SIGNATURES AUDITED</span>
            <span className="text-[#958ea0] ml-2">| 99.4% INTEGRITY</span>
          </div>
        </div>
      </div>

      {/* 2. 6 Pattern Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {BEHAVIORAL_PATTERNS.map((pattern) => (
          <div
            key={pattern.id}
            className="bg-[#191b24] rounded-2xl border border-[#33343e]/60 hover:border-[#494454] p-6 flex flex-col justify-between space-y-5 transition-all duration-200 shadow-lg group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-xs text-[#ffb95f] px-2 py-0.5 rounded bg-[#ffb95f]/10 border border-[#ffb95f]/30">
                  PATTERN #{pattern.number}
                </span>
                <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-[#11131b] text-[#d0bcff] uppercase border border-[#33343e]">
                  {pattern.badge}
                </span>
              </div>

              <h3 className="font-syne font-bold text-lg text-[#e2e1ee] group-hover:text-[#d0bcff] transition-colors">
                {pattern.title}
              </h3>

              <p className="text-xs text-[#cbc3d7] leading-relaxed font-sans">
                {pattern.summary}
              </p>

              {/* Empirical Stats Grid */}
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#33343e]/40 font-mono text-center">
                {pattern.stats.map((stat, i) => (
                  <div key={i} className="p-2 rounded bg-[#11131b] border border-[#33343e]">
                    <span className="text-[8px] text-[#958ea0] block uppercase">{stat.label}</span>
                    <span className="text-[11px] font-bold text-[#e2e1ee] mt-0.5 block truncate" title={stat.value}>
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>

              <p className="text-[11px] text-[#958ea0] italic leading-relaxed pt-1">
                "{pattern.details}"
              </p>
            </div>

            {/* Inspect Receipt Tape Action */}
            <button
              onClick={() => handleInspectPattern(pattern)}
              className="w-full py-2.5 rounded-xl bg-[#282a32] hover:bg-[#3c0091] text-[#cbc3d7] hover:text-[#d0bcff] font-syne text-xs font-bold uppercase tracking-wider border border-[#494454] hover:border-[#d0bcff]/40 transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-sm">receipt_long</span>
              REVEAL ARCHIVAL RECEIPT
            </button>
          </div>
        ))}
      </div>

      {/* 3. Slide-Over Thermal Paper Drawer for Inspected Pattern */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-end animate-in fade-in"
          onClick={(e) => {
            if (e.target === e.currentTarget) setDrawerOpen(false);
          }}
        >
          <div className="bg-[#191b24] border-l border-[#494454] w-full max-w-md h-full overflow-y-auto p-6 flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-300">
            <div className="space-y-6">
              {/* Drawer Top */}
              <div className="flex items-center justify-between border-b border-[#33343e] pb-4">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#d0bcff]">insights</span>
                  <h3 className="font-syne font-bold text-base text-[#e2e1ee] uppercase">
                    PATTERN #{selectedPattern.number} RECEIPT
                  </h3>
                </div>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="w-8 h-8 rounded-lg bg-[#282a32] text-[#958ea0] hover:text-white flex items-center justify-center transition-colors"
                >
                  <span className="material-symbols-outlined text-base">close</span>
                </button>
              </div>

              {/* Thermal Tape Paper in Drawer */}
              <div className="bg-[#fcfbf7] text-[#1c1b1f] rounded-t-sm shadow-xl p-6 font-mono text-xs border-t-4 border-dashed border-stone-400">
                <div className="text-center pb-4 border-b border-dashed border-stone-400 space-y-1">
                  <span className="material-symbols-outlined text-2xl">receipt_long</span>
                  <h4 className="font-syne font-black text-sm uppercase tracking-wider">
                    {selectedPattern.title}
                  </h4>
                  <p className="text-[10px] opacity-75 uppercase">
                    ECHOES BIOMETRIC AUDIT // {selectedPattern.receiptData.code}
                  </p>
                </div>

                <div className="py-4 space-y-2 border-b border-dashed border-stone-400 text-[11px]">
                  <div className="flex justify-between">
                    <span className="opacity-70">AUDITED VOLUME:</span>
                    <span className="font-bold">{selectedPattern.receiptData.totalPlaysLogged}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-70">DECIBEL EXPOSURE:</span>
                    <span className="font-bold">{selectedPattern.receiptData.averageDecibels}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-70">MOST FREQUENT DAY:</span>
                    <span className="font-bold">{selectedPattern.receiptData.mostFrequentDay}</span>
                  </div>
                </div>

                <div className="py-4 space-y-2 text-[11px]">
                  <p className="font-semibold text-stone-900">AUDITOR'S LOG NOTES:</p>
                  <p className="opacity-80 italic leading-relaxed">
                    {selectedPattern.details}
                  </p>
                </div>

                <div className="pt-2 text-center border-t border-dashed border-stone-400">
                  <div className="font-mono text-xs tracking-widest opacity-60">
                    |||| || ||||| | |||| ||
                  </div>
                  <div className="text-[9px] opacity-50 mt-1 uppercase">
                    {selectedPattern.receiptData.code}-VERIFIED
                  </div>
                </div>
              </div>
              <div className="receipt-sawtooth-paper -mt-6"></div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-[#33343e] flex gap-3">
              <button
                onClick={() => {
                  onPlaySong('Holocene', 'Bon Iver');
                  setDrawerOpen(false);
                }}
                className="flex-1 py-2.5 rounded-xl bg-[#3c0091] hover:bg-[#4f319c] text-[#d0bcff] font-syne font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-sm">play_arrow</span>
                REPLAY CATALYST
              </button>
              <button
                onClick={() => {
                  window.print();
                }}
                className="px-4 py-2.5 rounded-xl bg-[#282a32] hover:bg-[#33343e] text-white font-mono text-xs border border-[#494454]"
              >
                PRINT
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
