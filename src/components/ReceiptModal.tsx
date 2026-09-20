import React, { useState, useEffect } from 'react';
import { USER_ARCHIVE_META, TOP_TRACKS } from '../data/mockData';
import { downloadFile, exportTracksToCsv, exportArchiveToJson } from '../utils/exportUtils';
import { SongRecord } from '../types';

export type ReceiptVariant = 'lifetime' | 'single' | 'seasonal';

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
  const [variant, setVariant] = useState<ReceiptVariant>(selectedTrackTitle ? 'single' : 'lifetime');
  const [inspectedTrackId, setInspectedTrackId] = useState<string>(() => {
    if (selectedTrackTitle) {
      const match = TOP_TRACKS.find(
        (t) => t.title.toLowerCase() === selectedTrackTitle.toLowerCase()
      );
      if (match) return match.id;
    }
    return TOP_TRACKS[0].id;
  });
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (selectedTrackTitle) {
      const match = TOP_TRACKS.find(
        (t) => t.title.toLowerCase() === selectedTrackTitle.toLowerCase()
      );
      if (match) {
        setInspectedTrackId(match.id);
        setVariant('single');
      }
    }
  }, [selectedTrackTitle]);

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

  const currentTrack: SongRecord =
    TOP_TRACKS.find((t) => t.id === inspectedTrackId) || TOP_TRACKS[0];

  const handleCopyText = () => {
    let text = '';
    if (variant === 'single') {
      text = `
========================================
       ECHOES FORENSIC TRACK SLIP
        AUDITED RECORD TELEMETRY
========================================
TRACK: ${currentTrack.title.toUpperCase()}
ARTIST: ${currentTrack.artist.toUpperCase()}
ALBUM: ${currentTrack.album.toUpperCase()} (${currentTrack.year})
RANK: #${currentTrack.rank} IN ALL-TIME ARCHIVE
----------------------------------------
AUDITED PLAYS:             ${currentTrack.plays}
TOTAL REEL TIME:           ${currentTrack.listeningHours} HRS
REPEAT INTENSITY:          ${currentTrack.repeatRatio}
CIRCADIAN PEAK:            ${currentTrack.peakHour}
ACOUSTIC TEMPO:            ${currentTrack.bpm} BPM
EMOTIONAL MOOD:            ${currentTrack.dominantMood.toUpperCase()}
CATEGORY:                  ${currentTrack.category.toUpperCase()}
----------------------------------------
RECENT AUDIT LOGS:
${currentTrack.receiptLog.map((log) => `• ${log.timestamp} | ${log.device} | ${log.context}`).join('\n')}
========================================
BARCODE: ||||| | |||| ||| |||||| ||||
TAPE ID: ${USER_ARCHIVE_META.archiveId}-${currentTrack.id}
THANK YOU FOR LISTENING DEEPLY.
      `;
    } else if (variant === 'seasonal') {
      text = `
========================================
       ECHOES ARCHIVE • SOLSTICE
      4-SEASON CHRONOBIOLOGICAL AUDIT
========================================
ARCHIVE SPAN: ${USER_ARCHIVE_META.archiveSpanYears} YEARS
STATION: TERMINAL 04
ARCHIVIST: ${USER_ARCHIVE_META.name.toUpperCase()}
----------------------------------------
SOLSTICE / EQUINOX       HOURS   BPM  TOP ANCHOR
----------------------------------------
❄️ WINTER SOLSTICE      248.5h   78   ON THE NATURE OF DAYLIGHT
🌱 SPRING EQUINOX       215.2h  108   MOTION SICKNESS
☀️ SUMMER SOLSTICE      342.1h  126   RUMBLE
🍂 AUTUMN EQUINOX       388.4h   84   HOLOCENE
----------------------------------------
AUTUMN DOMINANCE:        32.5% OF LIFETIME
CIRCADIAN DRIFT:         +42 MIN/YEAR NOCTURNAL
TOTAL AUDITED SEASONS:   23 SOLSTICES AUDITED
========================================
BARCODE: ||||| | |||| ||| |||||| ||||
VERIFIED: #SOLSTICE-CYCLE-${USER_ARCHIVE_META.archiveId}
      `;
    } else {
      text = `
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
    }
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExportCsv = () => {
    const csvContent = exportTracksToCsv(TOP_TRACKS);
    downloadFile(csvContent, `echoes_telemetry_${USER_ARCHIVE_META.archiveId}.csv`, 'text/csv;charset=utf-8;');
  };

  const handleExportJson = () => {
    const jsonContent = exportArchiveToJson(TOP_TRACKS);
    downloadFile(jsonContent, `echoes_archive_${USER_ARCHIVE_META.archiveId}.json`, 'application/json;charset=utf-8;');
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
      <div className="relative max-w-xl w-full my-8">
        {/* Controls Bar Above Receipt */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 mb-3 px-2">
          {/* Variant Selector */}
          <div className="flex items-center gap-1 bg-[#191b24] p-1 rounded-xl border border-[#33343e] overflow-x-auto">
            <button
              onClick={() => setVariant('lifetime')}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-colors whitespace-nowrap ${
                variant === 'lifetime'
                  ? 'bg-[#3c0091] text-[#d0bcff] font-bold shadow-sm'
                  : 'text-[#958ea0] hover:text-[#e2e1ee]'
              }`}
            >
              Lifetime
            </button>
            <button
              onClick={() => setVariant('single')}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-colors whitespace-nowrap ${
                variant === 'single'
                  ? 'bg-[#3c0091] text-[#d0bcff] font-bold shadow-sm'
                  : 'text-[#958ea0] hover:text-[#e2e1ee]'
              }`}
            >
              Track Slip
            </button>
            <button
              onClick={() => setVariant('seasonal')}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-colors whitespace-nowrap ${
                variant === 'seasonal'
                  ? 'bg-[#3c0091] text-[#d0bcff] font-bold shadow-sm'
                  : 'text-[#958ea0] hover:text-[#e2e1ee]'
              }`}
            >
              Seasonal
            </button>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-1.5 flex-wrap">
            {/* Theme Toggle */}
            <div className="flex items-center gap-1 bg-[#1d1f28] p-1 rounded-lg border border-[#33343e]">
              <button
                onClick={() => setThemeMode('paper')}
                aria-pressed={isPaper}
                className={`px-2 py-1 rounded text-xs font-mono transition-colors ${
                  isPaper
                    ? 'bg-amber-100 text-stone-900 font-bold shadow-sm'
                    : 'text-[#cbc3d7] hover:text-white'
                }`}
                title="Paper Receipt"
              >
                Paper
              </button>
              <button
                onClick={() => setThemeMode('dark')}
                aria-pressed={!isPaper}
                className={`px-2 py-1 rounded text-xs font-mono transition-colors ${
                  !isPaper
                    ? 'bg-[#3c0091] text-[#d0bcff] font-bold shadow-sm'
                    : 'text-[#cbc3d7] hover:text-white'
                }`}
                title="Dark Terminal"
              >
                Dark
              </button>
            </div>

            <button
              onClick={handleExportCsv}
              aria-label="Export listening telemetry ledger as CSV file"
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#282a32] hover:bg-[#33343e] text-[#ffb95f] hover:text-white text-xs font-mono border border-[#494454] transition-colors"
              title="Download CSV spreadsheet"
            >
              <span className="material-symbols-outlined text-sm">table_view</span>
              <span className="hidden sm:inline">CSV</span>
            </button>
            <button
              onClick={handleExportJson}
              aria-label="Export complete listening telemetry ledger as JSON package"
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#282a32] hover:bg-[#33343e] text-[#d0bcff] hover:text-white text-xs font-mono border border-[#494454] transition-colors"
              title="Download complete forensic JSON archive"
            >
              <span className="material-symbols-outlined text-sm">data_object</span>
              <span className="hidden sm:inline">JSON</span>
            </button>
            <button
              onClick={handleCopyText}
              aria-label="Copy receipt plain text summary to clipboard"
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#282a32] hover:bg-[#33343e] text-[#cbc3d7] hover:text-[#e2e1ee] text-xs font-mono border border-[#494454] transition-colors"
            >
              <span className="material-symbols-outlined text-sm">
                {copied ? 'check' : 'content_copy'}
              </span>
              <span className="hidden sm:inline">{copied ? 'COPIED' : 'COPY'}</span>
            </button>
            <button
              onClick={handlePrint}
              aria-label="Print thermal receipt"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#3c0091] hover:bg-[#4f319c] text-[#d0bcff] text-xs font-mono border border-[#d0bcff]/40 transition-colors"
            >
              <span className="material-symbols-outlined text-sm">print</span>
              <span>PRINT</span>
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
                {variant === 'single'
                  ? 'TRACK FORENSIC SLIP'
                  : variant === 'seasonal'
                  ? 'SOLSTICE & EQUINOX LEDGER'
                  : 'ECHOES ARCHIVE'}
              </h2>
              <p className="text-[10px] font-bold opacity-80 uppercase tracking-[0.25em]">
                {variant === 'single'
                  ? 'ITEMIZED AUDIT SLIP'
                  : variant === 'seasonal'
                  ? 'CIRCADIAN 4-SEASON RECAP'
                  : 'YOUR LIFE, IN RECEIPTS'}
              </p>
              <p className="text-[11px] opacity-75 uppercase tracking-wider">
                Audited Telemetry • Tape {USER_ARCHIVE_META.archiveId}
              </p>
              <p className="text-[10px] opacity-60">
                STATION #04 / CURATOR: {USER_ARCHIVE_META.name.toUpperCase()}
              </p>
            </div>

            {/* VARIANT 1: LIFETIME OVERVIEW */}
            {variant === 'lifetime' && (
              <>
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
                  <div className="flex justify-between text-[#ca8100] dark:text-[#ffb95f] font-bold">
                    <span>ARCHIVE CHECKSUM:</span>
                    <span>0x7f4a...ECHO</span>
                  </div>
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
              </>
            )}

            {/* VARIANT 2: SINGLE TRACK SLIP */}
            {variant === 'single' && (
              <>
                {/* Track Selector */}
                <div className="py-3 border-b border-dashed border-current/25">
                  <label className="block text-[10px] opacity-70 mb-1 font-bold">
                    SELECT AUDITED TRACK RECORD:
                  </label>
                  <select
                    value={currentTrack.id}
                    onChange={(e) => setInspectedTrackId(e.target.value)}
                    className="w-full bg-current/5 border border-current/20 rounded p-1.5 text-xs font-mono focus:outline-none"
                  >
                    {TOP_TRACKS.map((t) => (
                      <option key={t.id} value={t.id} className="bg-[#191b24] text-[#e2e1ee]">
                        #{t.rank} {t.title} — {t.artist} ({t.plays} plays)
                      </option>
                    ))}
                  </select>
                </div>

                {/* Detailed Single Track Metadata */}
                <div className="py-4 border-b border-dashed border-current/25 space-y-2 text-[11px]">
                  <div className="flex justify-between">
                    <span className="opacity-70">RECORD TITLE:</span>
                    <span className="font-bold text-sm">{currentTrack.title.toUpperCase()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-70">PRIMARY CREATOR:</span>
                    <span className="font-bold">{currentTrack.artist.toUpperCase()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-70">ALBUM / RELEASE:</span>
                    <span>{currentTrack.album} ({currentTrack.year})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-70">ARCHIVE RANK:</span>
                    <span className="font-bold text-[#ca8100] dark:text-[#ffb95f]">
                      #{currentTrack.rank} OF 3,140 TRACKS
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-70">FIRST PLAYED:</span>
                    <span>{currentTrack.firstPlayed}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-70">MOST RECENT PLAY:</span>
                    <span>{currentTrack.lastPlayed}</span>
                  </div>
                </div>

                {/* Acoustic & Behavioral Telemetry */}
                <div className="py-4 border-b border-dashed border-current/25 space-y-1.5 text-[11px]">
                  <div className="flex justify-between font-bold text-[10px] opacity-80 uppercase tracking-wider pb-1">
                    <span>ACOUSTIC PARAMETER</span>
                    <span>AUDITED VALUE</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-70">TOTAL AUDITED PLAYS:</span>
                    <span className="font-bold">{currentTrack.plays} PLAYS</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-70">CUMULATIVE EXPOSURE:</span>
                    <span className="font-bold">{currentTrack.listeningHours} HOURS</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-70">REPEAT INTENSITY RATIO:</span>
                    <span className="font-bold text-[#ca8100] dark:text-[#ffb95f]">
                      {currentTrack.repeatRatio}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-70">CIRCADIAN PEAK WINDOW:</span>
                    <span className="font-bold">{currentTrack.peakHour}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-70">TEMPO VELOCITY:</span>
                    <span>{currentTrack.bpm} BPM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-70">DOMINANT EMOTIONAL MOOD:</span>
                    <span className="font-bold">{currentTrack.dominantMood}</span>
                  </div>
                </div>

                {/* Recent Playback Audit Logs */}
                <div className="py-3 border-b border-dashed border-current/25 space-y-1.5">
                  <span className="block text-[10px] font-bold opacity-80 uppercase">
                    TIMESTAMPED TELEMETRY LOGS (RECENT 3):
                  </span>
                  {currentTrack.receiptLog.slice(0, 3).map((log, idx) => (
                    <div key={idx} className="text-[10px] space-y-0.5 bg-current/5 p-1.5 rounded">
                      <div className="flex justify-between font-bold">
                        <span>{log.timestamp}</span>
                        <span>{log.duration}</span>
                      </div>
                      <div className="flex justify-between opacity-70">
                        <span>{log.device}</span>
                        <span className="truncate ml-2 italic">{log.context}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* VARIANT 3: SEASONAL SOLSTICE LEDGER */}
            {variant === 'seasonal' && (
              <>
                <div className="py-4 border-b border-dashed border-current/25 space-y-1.5 text-[11px]">
                  <div className="flex justify-between">
                    <span className="opacity-70">AUDIT METHOD:</span>
                    <span className="font-bold">EQUINOX & SOLSTICE ALIGNMENT</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-70">SOLSTICES MONITORED:</span>
                    <span className="font-bold">23 CYCLES (5.8 YEARS)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-70">DOMINANT SOLSTICE:</span>
                    <span className="font-bold text-[#ca8100] dark:text-[#ffb95f]">
                      AUTUMN EQUINOX (32.5%)
                    </span>
                  </div>
                </div>

                {/* 4 Seasons Breakdown */}
                <div className="py-3 space-y-3">
                  <div className="p-2 bg-current/5 rounded space-y-1 text-[11px]">
                    <div className="flex justify-between font-bold">
                      <span>❄️ WINTER SOLSTICE (DEC-FEB)</span>
                      <span>248.5h • 3,120p</span>
                    </div>
                    <div className="flex justify-between text-[10px] opacity-75">
                      <span>Anchor: On The Nature of Daylight</span>
                      <span>78 BPM • Neoclassical</span>
                    </div>
                  </div>

                  <div className="p-2 bg-current/5 rounded space-y-1 text-[11px]">
                    <div className="flex justify-between font-bold">
                      <span>🌱 SPRING EQUINOX (MAR-MAY)</span>
                      <span>215.2h • 2,840p</span>
                    </div>
                    <div className="flex justify-between text-[10px] opacity-75">
                      <span>Anchor: Motion Sickness</span>
                      <span>108 BPM • Indie Folk</span>
                    </div>
                  </div>

                  <div className="p-2 bg-current/5 rounded space-y-1 text-[11px]">
                    <div className="flex justify-between font-bold">
                      <span>☀️ SUMMER SOLSTICE (JUN-AUG)</span>
                      <span>342.1h • 4,680p</span>
                    </div>
                    <div className="flex justify-between text-[10px] opacity-75">
                      <span>Anchor: Rumble</span>
                      <span>126 BPM • UK Garage / Club</span>
                    </div>
                  </div>

                  <div className="p-2 bg-current/5 rounded space-y-1 text-[11px]">
                    <div className="flex justify-between font-bold text-[#ca8100] dark:text-[#ffb95f]">
                      <span>🍂 AUTUMN EQUINOX (SEP-NOV) ★ PEAK</span>
                      <span>388.4h • 4,180p</span>
                    </div>
                    <div className="flex justify-between text-[10px] opacity-75">
                      <span>Anchor: Holocene</span>
                      <span>84 BPM • Ambient Sadcore</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-dashed border-current/25 space-y-1.5 text-[11px]">
                  <div className="flex justify-between">
                    <span className="opacity-70">CIRCADIAN NOCTURNAL DRIFT:</span>
                    <span className="font-bold">+42 MIN/YEAR</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-70">CROSS-SEASON RETENTION:</span>
                    <span className="font-bold">88.2%</span>
                  </div>
                </div>
              </>
            )}

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
                {variant === 'single'
                  ? `#TRACK-${currentTrack.id.toUpperCase()}-VERIFIED`
                  : variant === 'seasonal'
                  ? `#SOLSTICE-CYCLE-${USER_ARCHIVE_META.archiveId}`
                  : '#8912-A-ECHOES-VERIFIED'}
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
