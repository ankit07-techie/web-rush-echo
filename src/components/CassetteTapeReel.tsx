import React from 'react';
import { MonthTelemetry } from '../data/timelineData';

interface CassetteTapeReelProps {
  activeYear: string;
  totalHours: string | number;
  totalPlays: string | number;
  months: MonthTelemetry[];
  onPlaySong: (title: string, artist: string) => void;
}

/**
 * Skeuomorphic Cassette Tape Spool Deck Component.
 * Simulates high-bias 15 IPS analog magnetic tape tracking for sonic chronology.
 */
export const CassetteTapeReel: React.FC<CassetteTapeReelProps> = ({
  activeYear,
  totalHours,
  totalPlays,
  months,
  onPlaySong,
}) => {
  return (
    <div className="bg-[#191b24] border border-[#33343e] rounded-2xl p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#33343e]/40 pb-4">
        <div>
          <h3 className="font-syne font-bold text-base text-[#e2e1ee] uppercase">
            MAGNETIC TAPE SPOOL REEL ({activeYear})
          </h3>
          <p className="font-mono text-xs text-[#958ea0]">
            Sequential analog magnetic capture • Total runtime: {totalHours} hours
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
            <span className="text-[#ffb95f] text-[11px] block">{totalPlays} Telemetry Packets</span>
          </div>
        </div>

        {/* Center Tape Window Gauge */}
        <div className="w-full md:w-64 bg-[#191b24] border border-[#33343e] rounded-lg p-3 text-center font-mono space-y-1">
          <div className="text-[10px] text-[#958ea0] flex justify-between">
            <span>00:00</span>
            <span className="text-[#d0bcff] font-bold">ANALOG TAPE COUNTER</span>
            <span>{totalHours}h</span>
          </div>
          <div className="w-full bg-[#11131b] h-3 rounded-full overflow-hidden border border-[#33343e]">
            <div className="bg-gradient-to-r from-[#3c0091] via-[#d0bcff] to-[#ffb95f] h-full w-3/4"></div>
          </div>
          <span className="text-[9px] text-[#958ea0] block">BIAS CALIBRATION: OPTIMAL</span>
        </div>

        {/* Right Spool */}
        <div className="flex items-center gap-6">
          <div className="space-y-1 font-mono text-xs text-right">
            <span className="text-[10px] text-[#958ea0] block">TRACK FORMAT:</span>
            <span className="font-bold text-[#e2e1ee] text-sm">4-TRACK STEREO</span>
            <span className="text-[#d0bcff] text-[11px] block">12 Monthly Spools</span>
          </div>

          <div className="relative w-24 h-24 rounded-full border-4 border-[#33343e] bg-[#191b24] flex items-center justify-center shadow-inner">
            <div className="w-12 h-12 rounded-full border-2 border-[#ffb95f]/40 bg-[#11131b] flex items-center justify-center animate-spin">
              <div className="w-2 h-6 bg-[#ffb95f]"></div>
            </div>
            <span className="absolute text-[8px] font-mono text-[#958ea0] bottom-1">TAKEUP</span>
          </div>
        </div>
      </div>

      {/* Itemized Tape Index Table */}
      <div className="space-y-2">
        <span className="text-xs font-mono text-[#958ea0] uppercase tracking-wider block">
          Tape Track Sequence Ledger
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {months.map((m, idx) => (
            <div
              key={idx}
              className="bg-[#11131b] border border-[#33343e] rounded-lg p-2.5 flex items-center justify-between gap-2 hover:border-[#494454] transition-colors"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] text-[#ffb95f] font-bold">
                    TAPE #{idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                  </span>
                  <span className="font-mono text-xs text-[#e2e1ee] font-bold">{m.month}</span>
                </div>
                <div className="font-mono text-[11px] text-[#958ea0] truncate">{m.topTrack}</div>
              </div>

              <button
                onClick={() => onPlaySong(m.topTrack, m.topArtist)}
                aria-label={`Play tape segment ${m.month}`}
                className="w-7 h-7 rounded-md bg-[#282a32] hover:bg-[#3c0091] text-[#d0bcff] flex items-center justify-center shrink-0 transition-colors"
              >
                <span className="material-symbols-outlined text-xs">play_arrow</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
