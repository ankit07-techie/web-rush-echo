import React, { useState } from 'react';
import { CHAPTERS } from '../data/mockData';
import DancingLetters from '@/components/ui/dancing-letters';

interface MyStoryViewProps {
  onOpenReceipt: (title?: string) => void;
  onPlaySong: (title: string, artist: string) => void;
}

export const MyStoryView: React.FC<MyStoryViewProps> = ({
  onOpenReceipt,
  onPlaySong
}) => {
  const [activeChapterIndex, setActiveChapterIndex] = useState(1); // Chapter 02 Autumn Reverie default
  const [showShareModal, setShowShareModal] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);

  const chapter = CHAPTERS[activeChapterIndex];

  const handlePrev = () => {
    setActiveChapterIndex((prev) => (prev > 0 ? prev - 1 : CHAPTERS.length - 1));
  };

  const handleNext = () => {
    setActiveChapterIndex((prev) => (prev < CHAPTERS.length - 1 ? prev + 1 : 0));
  };

  const handleCopyStory = () => {
    navigator.clipboard.writeText(
      `Echoes Music Memoir • Chapter ${chapter.number}: ${chapter.title} (${chapter.timeframe})\nTop Track: ${chapter.topTrack.title} by ${chapter.topTrack.artist} (${chapter.topTrack.plays} plays)\nStreak: ${chapter.streakDays} days | Peak Session: ${chapter.peakSession}`
    );
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  return (
    <div id="my-story-view" className="p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Chapter Reel Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#33343e]/50">
        {CHAPTERS.map((ch, idx) => {
          const isActive = idx === activeChapterIndex;
          return (
            <button
              key={ch.id}
              onClick={() => setActiveChapterIndex(idx)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-syne text-xs uppercase tracking-wider shrink-0 transition-all border ${
                isActive
                  ? 'bg-[#282a32] text-[#d0bcff] border-[#d0bcff]/50 shadow-md font-bold'
                  : 'bg-[#191b24] text-[#958ea0] border-[#33343e]/40 hover:text-[#cbc3d7] hover:bg-[#1d1f28]'
              }`}
            >
              <span
                className={`font-mono text-[10px] px-1.5 py-0.5 rounded ${
                  isActive ? 'bg-[#3c0091] text-[#d0bcff]' : 'bg-[#11131b] text-[#958ea0]'
                }`}
              >
                {ch.number}
              </span>
              <div className="text-left">
                <div className="font-semibold text-[#e2e1ee] truncate max-w-[140px] sm:max-w-none">
                  {ch.title}
                </div>
                <div className="font-mono text-[9px] text-[#958ea0] lowercase">
                  {ch.timeframe}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Chapter Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left 2 Cols: Story Dossier */}
        <div className="lg:col-span-2 space-y-6">
          {/* Chapter Heading Banner */}
          <div className="bg-[#191b24] rounded-2xl border border-[#33343e]/60 p-6 sm:p-8 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-widest text-[#ffb95f] px-2.5 py-1 rounded bg-[#ca8100]/10 border border-[#ca8100]/30">
                CHAPTER {chapter.number} ARCHIVE • {chapter.timeframe}
              </span>
              <span className="font-mono text-[11px] text-[#958ea0]">
                STATUS: {chapter.status.toUpperCase()}
              </span>
            </div>

            <div className="py-1">
              <DancingLetters
                key={chapter.id}
                text={chapter.title.toUpperCase()}
                className="justify-start flex-wrap"
                letterClassName="text-2xl sm:text-3xl lg:text-4xl font-syne font-black text-[#e2e1ee] hover:text-[#d0bcff] transition-colors"
              />
            </div>

            <blockquote className="font-serif italic text-[#cebdff] text-base border-l-2 border-[#d0bcff] pl-4 py-1 leading-relaxed">
              {chapter.quote}
            </blockquote>

            <p className="text-[#cbc3d7] text-sm leading-relaxed font-sans">
              {chapter.summary}
            </p>
          </div>

          {/* Metrics Snapshot 4-grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-[#191b24] p-4 rounded-xl border border-[#33343e]/60">
              <span className="font-mono text-[9px] text-[#958ea0] uppercase tracking-wider block">
                Dominant Genre
              </span>
              <div className="font-syne font-bold text-sm text-[#e2e1ee] mt-1 truncate" title={chapter.dominantGenre}>
                {chapter.dominantGenre}
              </div>
            </div>

            <div className="bg-[#191b24] p-4 rounded-xl border border-[#33343e]/60">
              <span className="font-mono text-[9px] text-[#958ea0] uppercase tracking-wider block">
                Top Chapter Track
              </span>
              <div className="font-syne font-bold text-sm text-[#d0bcff] mt-1 truncate" title={chapter.topTrack.title}>
                {chapter.topTrack.title}
              </div>
              <span className="font-mono text-[10px] text-[#958ea0]">
                {chapter.topTrack.plays} plays
              </span>
            </div>

            <div className="bg-[#191b24] p-4 rounded-xl border border-[#33343e]/60">
              <span className="font-mono text-[9px] text-[#958ea0] uppercase tracking-wider block">
                Consecutive Streak
              </span>
              <div className="font-syne font-bold text-lg text-[#ffb95f] mt-1">
                {chapter.streakDays} <span className="text-xs font-normal text-[#cbc3d7]">days</span>
              </div>
            </div>

            <div className="bg-[#191b24] p-4 rounded-xl border border-[#33343e]/60">
              <span className="font-mono text-[9px] text-[#958ea0] uppercase tracking-wider block">
                Peak Session
              </span>
              <div className="font-mono text-xs text-[#cebdff] mt-1 font-semibold truncate" title={chapter.peakSession}>
                {chapter.peakSession}
              </div>
            </div>
          </div>

          {/* Era Anchors (Albums / Singles) */}
          <div className="bg-[#191b24] rounded-2xl border border-[#33343e]/60 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[#33343e]/40 pb-3">
              <div>
                <h3 className="font-syne font-bold text-base text-[#e2e1ee] uppercase">
                  ERA ANCHORS
                </h3>
                <p className="font-mono text-xs text-[#958ea0]">
                  Foundational albums and records that framed this period
                </p>
              </div>
              <span className="font-mono text-xs text-[#cbc3d7]">
                {chapter.eraAnchors.length} ARCHIVAL RELEASES
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {chapter.eraAnchors.map((anchor) => (
                <div
                  key={anchor.title}
                  className="p-3.5 rounded-xl bg-[#1d1f28] border border-[#33343e]/50 hover:border-[#494454] transition-colors flex items-center justify-between group"
                >
                  <div className="min-w-0">
                    <span className="font-mono text-[9px] uppercase px-1.5 py-0.5 rounded bg-[#11131b] text-[#ffb95f] border border-[#ca8100]/30 mr-2">
                      {anchor.type} • {anchor.year}
                    </span>
                    <h4 className="font-syne font-semibold text-sm text-[#e2e1ee] group-hover:text-[#d0bcff] truncate mt-1">
                      {anchor.title}
                    </h4>
                    <p className="text-xs text-[#958ea0] truncate">
                      {anchor.artist}
                    </p>
                  </div>
                  <div className="text-right font-mono shrink-0 pl-2">
                    <span className="text-sm font-bold text-[#e2e1ee]">{anchor.plays}</span>
                    <span className="text-[10px] text-[#958ea0] block">plays</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 24-Hour Circadian Shift Profile */}
          <div className="bg-[#191b24] rounded-2xl border border-[#33343e]/60 p-6 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-syne font-bold text-base text-[#e2e1ee] uppercase">
                  TIME-OF-DAY SHIFT PROFILE
                </h3>
                <p className="font-mono text-xs text-[#958ea0]">
                  Chronotype distribution during {chapter.title}
                </p>
              </div>
              <span className="font-mono text-xs text-[#ffb95f]">
                PEAK: 02:00 AM
              </span>
            </div>

            <div className="h-28 w-full flex items-end gap-1 pt-4 pb-2 border-b border-[#33343e]/40">
              {chapter.hourlyDistribution.map((v, i) => (
                <div
                  key={i}
                  className={`flex-1 rounded-t-sm transition-all duration-300 relative group cursor-pointer ${
                    i >= 21 || i <= 3 ? 'bg-[#d0bcff]' : 'bg-[#33343e]'
                  }`}
                  style={{ height: `${Math.max(10, v)}%` }}
                >
                  <div className="opacity-0 group-hover:opacity-100 absolute -top-7 left-1/2 -translate-x-1/2 bg-black text-white text-[9px] font-mono px-1.5 py-0.5 rounded pointer-events-none z-10 whitespace-nowrap">
                    {i}:00 ({v}%)
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between font-mono text-[10px] text-[#958ea0]">
              <span>12 AM (00:00)</span>
              <span>06:00 AM</span>
              <span>12:00 PM</span>
              <span>06:00 PM</span>
              <span>11:59 PM</span>
            </div>
          </div>

          {/* Prev/Next Chapter Buttons */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={handlePrev}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#191b24] hover:bg-[#282a32] text-[#cbc3d7] hover:text-[#e2e1ee] border border-[#33343e] font-syne text-xs uppercase tracking-wider transition-colors"
            >
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              PREVIOUS CHAPTER
            </button>
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#3c0091] hover:bg-[#4f319c] text-[#d0bcff] font-syne text-xs uppercase tracking-wider font-bold transition-colors"
            >
              NEXT CHAPTER
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* Right 1 Col: Sticky Archival Proof Receipt Tape */}
        <div className="lg:sticky lg:top-20 space-y-4">
          <div className="bg-[#fcfbf7] text-[#1c1b1f] rounded-t-sm shadow-2xl p-6 font-mono text-xs border-t-4 border-dashed border-stone-400">
            {/* Header */}
            <div className="text-center pb-4 border-b border-dashed border-stone-400 space-y-1">
              <span className="material-symbols-outlined text-2xl">receipt</span>
              <h4 className="font-syne font-black text-base uppercase tracking-wider">
                CHAPTER PROOF TAPE
              </h4>
              <p className="text-[10px] opacity-75">
                CHPT {chapter.number} // {chapter.timeframe}
              </p>
            </div>

            {/* Content */}
            <div className="py-4 space-y-3 border-b border-dashed border-stone-400 text-[11px]">
              {chapter.receiptItems.map((item, idx) => (
                <div key={idx} className="space-y-0.5">
                  <div className="flex justify-between font-bold">
                    <span>{item.item}</span>
                    <span>{item.metric}</span>
                  </div>
                  <div className="text-[10px] opacity-60 italic">
                    {item.subtext}
                  </div>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="pt-3 pb-4 space-y-1.5 text-[11px]">
              <div className="flex justify-between">
                <span>STREAK RECORD:</span>
                <span className="font-bold">{chapter.streakDays} CONSECUTIVE DAYS</span>
              </div>
              <div className="flex justify-between">
                <span>PEAK SESSION:</span>
                <span className="font-bold">{chapter.peakSession}</span>
              </div>
              <div className="flex justify-between font-bold border-t border-stone-300 pt-2 text-xs">
                <span>CHAPTER STATUS:</span>
                <span className="text-[#6d3bd7] uppercase">{chapter.status}</span>
              </div>
            </div>

            {/* Barcode */}
            <div className="py-2 text-center border-t border-dashed border-stone-400">
              <div className="font-mono text-[10px] tracking-widest opacity-60">
                ||| | ||||| || |||||| | |||
              </div>
              <div className="text-[9px] opacity-50 mt-1 uppercase">
                #CHAPTER-{chapter.number}-VERIFIED
              </div>
            </div>

            <div className="pt-3 flex flex-col gap-2">
              <button
                onClick={() => onPlaySong(chapter.topTrack.title, chapter.topTrack.artist)}
                className="w-full py-2 bg-[#1c1b1f] hover:bg-black text-white rounded font-syne font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-sm">play_arrow</span>
                REPLAY TOP TRACK
              </button>

              <button
                onClick={() => setShowShareModal(true)}
                className="w-full py-2 bg-stone-200 hover:bg-stone-300 text-stone-900 rounded font-mono text-[11px] font-semibold transition-colors flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-sm">share</span>
                GENERATE SHAREABLE CARD
              </button>
            </div>
          </div>

          <div className="receipt-sawtooth-paper -mt-4"></div>
        </div>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowShareModal(false);
          }}
        >
          <div className="bg-[#191b24] border border-[#494454] rounded-2xl max-w-md w-full p-6 text-[#e2e1ee] space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#33343e] pb-3">
              <h3 className="font-syne font-bold text-base uppercase">
                SHARE CHAPTER {chapter.number} TAPE
              </h3>
              <button
                onClick={() => setShowShareModal(false)}
                className="text-[#958ea0] hover:text-white"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            <div className="p-4 rounded-xl bg-[#11131b] border border-[#33343e] font-mono text-xs space-y-2">
              <p className="text-[#d0bcff] font-bold">
                ECHOES // CHAPTER {chapter.number}: {chapter.title}
              </p>
              <p className="text-[#cbc3d7]">
                {chapter.quote}
              </p>
              <p className="text-[#ffb95f]">
                Top Track: {chapter.topTrack.title} ({chapter.topTrack.plays} plays)
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleCopyStory}
                className="flex-1 py-2.5 rounded-xl bg-[#3c0091] hover:bg-[#4f319c] text-[#d0bcff] font-syne font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-sm">
                  {copiedShare ? 'check' : 'content_copy'}
                </span>
                {copiedShare ? 'COPIED TO CLIPBOARD' : 'COPY MEMOIR TEXT'}
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
