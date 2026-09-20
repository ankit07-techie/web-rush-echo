import React, { useState, useEffect } from 'react';
import { USER_ARCHIVE_META, TOP_TRACKS } from '../data/mockData';
import { EchoesLogo } from './EchoesLogo';

interface ReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTrackTitle?: string;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({
  isOpen,
  onClose,
  selectedTrackTitle
}) => {
  const [themeMode, setThemeMode] = useState<'paper' | 'dark'>('paper');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopyText = () => {
    const text = `
========================================
             ECHOES ARCHIVE
      YOUR LIFE, IN AUDIO RECEIPTS
========================================
TAPE NO: ${USER_ARCHIVE_META.archiveId}
STATION: TERMINAL 04
ARCHIVIST: ${USER_ARCHIVE_META.name.toUpperCase()}
AUDIT DATE: ${USER_ARCHIVE_META.auditDate}
PEAK TIME: ${USER_ARCHIVE_META.favoriteTime}
----------------------------------------
ITEM                          HRS  PLAYS
----------------------------------------
01. KYOTO (P. BRIDGERS)      19.4    342
02. HOLOCENE (BON IVER)      28.6    318
03. RUMBLE (FRED AGAIN..)    12.1    264
04. SUNSET (THE MIDNIGHT)    18.2    241
05. ON THE NATURE OF DAYLIGHT 23.4   228
06. GLUE (BICEP)             15.2    198
07. MYSTERY OF LOVE (SUFJAN) 12.8    189
----------------------------------------
SUBTOTAL (TRACKS)                  3,140
CREATORS LOGGED                      612
TOTAL REEL TIME                842.0 HRS
INTEGRITY VERIFICATION             99.4%
EMOTIONAL RESONANCE               100.0%
========================================
TOTAL AUDITED PLAYS               14,820
========================================
THANK YOU FOR LISTENING DEEPLY.
BARCODE: ||||| | |||| ||| |||||| ||||
    `;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  const isPaper = themeMode === 'paper';

  return (
    <div
      id="receipt-modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="receipt-modal-title"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative max-w-lg w-full my-8">
        {/* Controls Bar Above Receipt */}
        <div className="flex items-center justify-between mb-3 px-2">
          <div className="flex items-center gap-1.5 bg-[#1d1f28] p-1 rounded-lg border border-[#33343e]">
            <button
              onClick={() => setThemeMode('paper')}
              aria-pressed={isPaper}
              className={`px-3 py-1 rounded text-xs font-mono transition-colors ${
                isPaper
                  ? 'bg-amber-100 text-stone-900 font-bold shadow-sm'
                  : 'text-[#cbc3d7] hover:text-white'
              }`}
            >
              Thermal Paper
            </button>
            <button
              onClick={() => setThemeMode('dark')}
              aria-pressed={!isPaper}
              className={`px-3 py-1 rounded text-xs font-mono transition-colors ${
                !isPaper
                  ? 'bg-[#3c0091] text-[#d0bcff] font-bold shadow-sm'
                  : 'text-[#cbc3d7] hover:text-white'
              }`}
            >
              Dark Terminal
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyText}
              aria-label="Copy receipt plain text summary to clipboard"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#282a32] hover:bg-[#33343e] text-[#cbc3d7] hover:text-[#e2e1ee] text-xs font-mono border border-[#494454] transition-colors"
            >
              <span className="material-symbols-outlined text-sm">
                {copied ? 'check' : 'content_copy'}
              </span>
              {copied ? 'COPIED' : 'COPY TEXT'}
            </button>
            <button
              onClick={handlePrint}
              aria-label="Print thermal receipt"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#3c0091] hover:bg-[#4f319c] text-[#d0bcff] text-xs font-mono border border-[#d0bcff]/40 transition-colors"
            >
              <span className="material-symbols-outlined text-sm">print</span>
              PRINT
            </button>
            <button
              onClick={onClose}
              aria-label="Close receipt modal"
              className="w-8 h-8 rounded-lg bg-[#282a32] text-[#958ea0] hover:text-white flex items-center justify-center transition-colors"
            >
              <span className="material-symbols-outlined text-base">close</span>
            </button>
          </div>
        </div>

        {/* The Receipt Body */}
        <div
          id="printable-receipt"
          className={`relative rounded-t-sm shadow-2xl transition-colors duration-200 overflow-hidden ${
            isPaper
              ? 'bg-[#fcfbf7] text-[#1c1b1f] border-t-4 border-dashed border-stone-400'
              : 'bg-[#191b24] text-[#e2e1ee] border-t-4 border-dashed border-[#494454]'
          }`}
        >
          <div className="p-7 sm:p-8 font-mono text-xs">
            {/* Header */}
            <div className="text-center pb-5 border-b border-dashed border-current/25 space-y-2">
              <div className="flex justify-center mb-1">
                <div className="w-16 h-16 rounded-full overflow-hidden border border-current/20 shadow-md">
                  <img
                    src="/echoes-emblem.svg"
                    alt="Echoes Seal"
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
              <h2 id="receipt-modal-title" className="font-syne font-black text-xl tracking-[0.2em] uppercase">
                ECHOES ARCHIVE
              </h2>
              <p className="text-[10px] font-bold opacity-80 uppercase tracking-[0.25em]">
                YOUR LIFE, IN RECEIPTS
              </p>
              <p className="text-[11px] opacity-75 uppercase tracking-wider">
                Audited Telemetry • Tape {USER_ARCHIVE_META.archiveId}
              </p>
              <p className="text-[10px] opacity-60">
                STATION #04 / CURATOR: {USER_ARCHIVE_META.name.toUpperCase()}
              </p>
            </div>

            {/* Metadata Info */}
            <div className="py-4 border-b border-dashed border-current/25 space-y-1.5 text-[11px]">
              <div className="flex justify-between">
                <span className="opacity-70">AUDIT SESSION:</span>
                <span className="font-bold">{USER_ARCHIVE_META.auditDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-70">CHRONOTYPE PEAK:</span>
                <span className="font-bold">{USER_ARCHIVE_META.favoriteTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-70">LIFETIME ARCHIVE SPAN:</span>
                <span className="font-bold">{USER_ARCHIVE_META.archiveSpanYears} YEARS</span>
              </div>
              {selectedTrackTitle && (
                <div className="flex justify-between text-[#ca8100] dark:text-[#ffb95f] font-bold">
                  <span>INSPECTED RECORD:</span>
                  <span>{selectedTrackTitle.toUpperCase()}</span>
                </div>
              )}
            </div>

            {/* Table Header */}
            <div className="py-3 flex justify-between font-bold border-b border-current/30 text-[11px] tracking-wider uppercase">
              <span>TRACK / ARTIST</span>
              <span>HRS / PLAYS</span>
            </div>

            {/* Itemized Tracks */}
            <div className="py-2 space-y-2.5">
              {TOP_TRACKS.map((track, i) => (
                <div key={track.id} className="flex items-baseline justify-between text-[11px]">
                  <div className="truncate max-w-[220px]">
                    <span className="font-bold mr-1.5">{`0${i + 1}`}.</span>
                    <span className="font-medium">{track.title}</span>
                    <span className="opacity-60 text-[10px] block pl-5 truncate">
                      {track.artist}
                    </span>
                  </div>
                  <div className="dotted-leader opacity-20"></div>
                  <div className="text-right shrink-0">
                    <span className="font-bold">{track.plays}</span>
                    <span className="opacity-60 text-[10px] ml-1.5">({track.listeningHours}h)</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Ledger Totals */}
            <div className="pt-4 border-t-2 border-dashed border-current/30 space-y-1.5 text-[11px]">
              <div className="flex justify-between">
                <span className="opacity-70">TOTAL UNIQUE TRACKS:</span>
                <span>{USER_ARCHIVE_META.uniqueTracks.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-70">DISTINCT CREATORS:</span>
                <span>{USER_ARCHIVE_META.uniqueArtists.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-70">TOTAL AUDITED HOURS:</span>
                <span>{USER_ARCHIVE_META.listeningHours.toLocaleString()} HRS</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-70">EMOTIONAL TAX (100%):</span>
                <span>$0.00 / PRICELESS</span>
              </div>
              <div className="flex justify-between font-bold text-sm pt-2 border-t border-current/25">
                <span>TOTAL PLAYS BILLED:</span>
                <span className="font-syne text-base tracking-wider">
                  {USER_ARCHIVE_META.totalPlays.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Barcode & Signature */}
            <div className="pt-6 text-center space-y-3">
              {/* Authenticated Barcode SVG simulation */}
              <div className="flex justify-center items-center py-2 px-4 bg-current/5 rounded">
                <svg className="w-56 h-12 stroke-current" viewBox="0 0 200 40">
                  <line x1="10" y1="0" x2="10" y2="40" strokeWidth="2" />
                  <line x1="14" y1="0" x2="14" y2="40" strokeWidth="1" />
                  <line x1="18" y1="0" x2="18" y2="40" strokeWidth="3" />
                  <line x1="24" y1="0" x2="24" y2="40" strokeWidth="1" />
                  <line x1="28" y1="0" x2="28" y2="40" strokeWidth="4" />
                  <line x1="36" y1="0" x2="36" y2="40" strokeWidth="2" />
                  <line x1="42" y1="0" x2="42" y2="40" strokeWidth="1" />
                  <line x1="46" y1="0" x2="46" y2="40" strokeWidth="3" />
                  <line x1="52" y1="0" x2="52" y2="40" strokeWidth="2" />
                  <line x1="58" y1="0" x2="58" y2="40" strokeWidth="1" />
                  <line x1="64" y1="0" x2="64" y2="40" strokeWidth="4" />
                  <line x1="72" y1="0" x2="72" y2="40" strokeWidth="2" />
                  <line x1="78" y1="0" x2="78" y2="40" strokeWidth="3" />
                  <line x1="84" y1="0" x2="84" y2="40" strokeWidth="1" />
                  <line x1="90" y1="0" x2="90" y2="40" strokeWidth="2" />
                  <line x1="96" y1="0" x2="96" y2="40" strokeWidth="4" />
                  <line x1="104" y1="0" x2="104" y2="40" strokeWidth="1" />
                  <line x1="110" y1="0" x2="110" y2="40" strokeWidth="3" />
                  <line x1="116" y1="0" x2="116" y2="40" strokeWidth="2" />
                  <line x1="122" y1="0" x2="122" y2="40" strokeWidth="1" />
                  <line x1="128" y1="0" x2="128" y2="40" strokeWidth="4" />
                  <line x1="136" y1="0" x2="136" y2="40" strokeWidth="2" />
                  <line x1="142" y1="0" x2="142" y2="40" strokeWidth="1" />
                  <line x1="148" y1="0" x2="148" y2="40" strokeWidth="3" />
                  <line x1="154" y1="0" x2="154" y2="40" strokeWidth="2" />
                  <line x1="160" y1="0" x2="160" y2="40" strokeWidth="4" />
                  <line x1="168" y1="0" x2="168" y2="40" strokeWidth="1" />
                  <line x1="174" y1="0" x2="174" y2="40" strokeWidth="3" />
                  <line x1="182" y1="0" x2="182" y2="40" strokeWidth="2" />
                  <line x1="190" y1="0" x2="190" y2="40" strokeWidth="3" />
                </svg>
              </div>
              <p className="text-[10px] tracking-widest uppercase">
                #8912-A-ECHOES-VERIFIED
              </p>
              <p className="text-[9px] opacity-60">
                Generated via Echoes Telemetry Engine v4.2 • All moments accounted for.
              </p>
            </div>
          </div>

          {/* Sawtooth jagged bottom edge */}
          <div className={isPaper ? 'receipt-sawtooth-paper' : 'receipt-sawtooth-paper-dark'}></div>
        </div>
      </div>
    </div>
  );
};
