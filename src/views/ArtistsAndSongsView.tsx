import React, { useState, useEffect } from 'react';
import { TOP_TRACKS, TOP_ARTISTS } from '../data/mockData';
import { SongRecord } from '../types';
import DancingLetters from '@/components/ui/dancing-letters';
import { songService, SpotApiTrackItem } from '../services/songService';

interface ArtistsAndSongsViewProps {
  onOpenReceipt: (title?: string) => void;
  onPlaySong: (title: string, artist: string) => void;
}

export const ArtistsAndSongsView: React.FC<ArtistsAndSongsViewProps> = ({
  onOpenReceipt,
  onPlaySong,
}) => {
  const [activeCatalogMode, setActiveCatalogMode] = useState<'audited' | 'spotapi'>('audited');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'plays' | 'hours' | 'recent'>('plays');
  const [selectedTrack, setSelectedTrack] = useState<SongRecord>(TOP_TRACKS[0]); // Kyoto by default
  const [copiedJson, setCopiedJson] = useState(false);

  // SpotAPI Live Query state
  const [spotQuery, setSpotQuery] = useState('weezer');
  const [spotLimit, setSpotLimit] = useState(20);
  const [spotResults, setSpotResults] = useState<SpotApiTrackItem[]>([]);
  const [isLoadingSpot, setIsLoadingSpot] = useState(false);
  const [showCodeSnippet, setShowCodeSnippet] = useState(false);

  // Auto-load Weezer on mount if SpotAPI is accessed
  useEffect(() => {
    handleExecuteSpotQuery('weezer', 20);
  }, []);

  const handleExecuteSpotQuery = async (queryToRun: string, limit: number) => {
    const q = queryToRun.trim() || 'weezer';
    setIsLoadingSpot(true);
    try {
      const resp = await songService.query_songs(q, limit);
      setSpotResults(resp.data.searchV2.tracksV2.items);
    } catch (e) {
      console.warn('SpotAPI query failed:', e);
    } finally {
      setIsLoadingSpot(false);
    }
  };

  const handlePaginateBatch = async () => {
    setIsLoadingSpot(true);
    try {
      const q = spotQuery.trim() || 'weezer';
      const offset = spotResults.length;
      const resp = await songService.query_songs(q, 20, offset);
      setSpotResults((prev) => [...prev, ...resp.data.searchV2.tracksV2.items]);
    } catch (e) {
      console.warn('SpotAPI pagination failed:', e);
    } finally {
      setIsLoadingSpot(false);
    }
  };

  const categories = ['All', 'Top 100', 'Late Night', 'Autumn', 'Ambient', 'Forgotten Gems'];

  const filteredTracks = TOP_TRACKS.filter((t) => {
    const matchesSearch =
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.album.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCat =
      activeCategory === 'All' ||
      t.category.toLowerCase().includes(activeCategory.toLowerCase());

    return matchesSearch && matchesCat;
  }).sort((a, b) => {
    if (sortBy === 'plays') return b.plays - a.plays;
    if (sortBy === 'hours') return b.listeningHours - a.listeningHours;
    return a.rank - b.rank;
  });

  const matchingArtist = TOP_ARTISTS.find(
    (a) => a.name.toLowerCase() === selectedTrack.artist.toLowerCase()
  ) || TOP_ARTISTS[0];

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(selectedTrack, null, 2));
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2000);
  };

  const QUICK_ARTISTS = ['Weezer', 'Radiohead', 'Bon Iver', 'Phoebe Bridgers', 'M83', 'Daft Punk'];

  return (
    <div id="artists-and-songs-view" className="p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      {/* 1. Header & Catalog Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#33343e]/50 pb-6">
        <div className="min-w-0 max-w-full">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="material-symbols-outlined text-[#d0bcff] text-2xl sm:text-3xl shrink-0">queue_music</span>
            <h2 className="font-syne font-black text-xl sm:text-2xl lg:text-3xl text-[#e2e1ee] uppercase tracking-wide flex items-center gap-2 flex-wrap">
              <span>CATALOG &</span>
              <DancingLetters
                text="THERMAL LEDGER"
                className="inline-flex"
                letterClassName="font-syne font-black text-xl sm:text-2xl lg:text-3xl text-[#d0bcff] hover:text-[#ffb95f] transition-colors"
              />
            </h2>
          </div>
          <p className="font-mono text-xs text-[#958ea0] mt-1 truncate max-w-full sm:whitespace-normal">
            Itemized Audit of 3,140 Master Tracks, SpotAPI Live Query & Real Audio Streaming
          </p>
        </div>

        {/* Catalog Mode Toggles */}
        <div className="flex items-center gap-2 bg-[#191b24] p-1.5 rounded-xl border border-[#33343e]">
          <button
            onClick={() => setActiveCatalogMode('audited')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors flex items-center gap-1.5 ${
              activeCatalogMode === 'audited'
                ? 'bg-[#3c0091] text-[#d0bcff] font-bold border border-[#d0bcff]/40 shadow-sm'
                : 'text-[#958ea0] hover:text-[#e2e1ee]'
            }`}
          >
            <span className="material-symbols-outlined text-sm">inventory_2</span>
            AUDITED LEDGER
          </button>

          <button
            onClick={() => setActiveCatalogMode('spotapi')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors flex items-center gap-1.5 ${
              activeCatalogMode === 'spotapi'
                ? 'bg-emerald-950 text-emerald-400 font-bold border border-emerald-500/50 shadow-sm'
                : 'text-[#958ea0] hover:text-[#e2e1ee]'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            SPOTAPI LIVE QUERY ({spotResults.length})
          </button>
        </div>
      </div>

      {/* VIEW MODE 1: SPOTAPI LIVE SONG QUERY & PLAYBACK */}
      {activeCatalogMode === 'spotapi' && (
        <div className="space-y-6">
          {/* Query Control Bar */}
          <div className="bg-[#191b24] border border-[#33343e] rounded-2xl p-5 space-y-4 shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-[#33343e] pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400 font-mono font-bold text-sm">spotapi.Song() Query Engine</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-700/50">
                    REAL AUDIO READY
                  </span>
                </div>
                <p className="font-mono text-xs text-[#958ea0] mt-0.5">
                  Execute <code className="text-[#d0bcff]">song.query_songs(query, limit)</code> or <code className="text-[#d0bcff]">song.paginate_songs(query)</code> to discover and play songs
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowCodeSnippet((prev) => !prev)}
                  className={`px-3 py-1.5 rounded-lg font-mono text-xs border transition-colors flex items-center gap-1.5 ${
                    showCodeSnippet
                      ? 'bg-[#3c0091] text-[#d0bcff] border-[#d0bcff]'
                      : 'bg-[#11131b] text-[#958ea0] border-[#33343e] hover:text-[#e2e1ee]'
                  }`}
                >
                  <span className="material-symbols-outlined text-sm">code</span>
                  {showCodeSnippet ? 'HIDE PYTHON CODE' : 'VIEW SPOTAPI CODE'}
                </button>
              </div>
            </div>

            {/* Python Code Snippet Panel */}
            {showCodeSnippet && (
              <div className="bg-[#11131b] rounded-xl p-4 border border-[#3c0091]/50 font-mono text-xs space-y-2 animate-in fade-in duration-200">
                <div className="flex items-center justify-between text-[#958ea0] text-[11px] pb-1 border-b border-[#33343e]">
                  <span>spotapi_example.py</span>
                  <span className="text-[#ffb95f]">ONLY 6 LINES OF CODE</span>
                </div>
                <pre className="text-emerald-300/90 overflow-x-auto text-[11px] leading-relaxed">
{`from spotapi import Song

song = Song()
# Query a specific amount of songs
songs = song.query_songs("${spotQuery || 'weezer'}", limit=${spotLimit})
data = songs["data"]["searchV2"]["tracksV2"]["items"]
for idx, item in enumerate(data):
    print(idx, item['item']['data']['name'])

# Alternatively paginate batches until exhausted:
# for batch in song.paginate_songs("${spotQuery || 'weezer'}"):`}
                </pre>
              </div>
            )}

            {/* Live Search Form */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
              <div className="md:col-span-7 flex items-center gap-2 bg-[#11131b] px-3 py-2 rounded-xl border border-[#33343e]">
                <span className="material-symbols-outlined text-[#d0bcff]">search</span>
                <input
                  type="text"
                  value={spotQuery}
                  onChange={(e) => setSpotQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleExecuteSpotQuery(spotQuery, spotLimit);
                  }}
                  placeholder="Enter artist or song (e.g., 'weezer', 'radiohead')..."
                  className="bg-transparent border-none outline-none text-sm w-full font-sans text-[#e2e1ee] placeholder:text-[#958ea0]"
                />
                {spotQuery && (
                  <button
                    onClick={() => {
                      setSpotQuery('');
                      handleExecuteSpotQuery('weezer', spotLimit);
                    }}
                    className="text-xs font-mono text-[#958ea0] hover:text-white"
                  >
                    CLEAR
                  </button>
                )}
              </div>

              <div className="md:col-span-3 flex items-center gap-2">
                <span className="text-xs font-mono text-[#958ea0] shrink-0">Limit:</span>
                <select
                  value={spotLimit}
                  onChange={(e) => {
                    const l = parseInt(e.target.value, 10);
                    setSpotLimit(l);
                    handleExecuteSpotQuery(spotQuery, l);
                  }}
                  className="w-full bg-[#11131b] border border-[#33343e] rounded-xl px-3 py-2 text-xs font-mono text-[#e2e1ee] outline-none"
                >
                  <option value={10}>10 songs</option>
                  <option value={20}>20 songs (Default)</option>
                  <option value={50}>50 songs</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <button
                  onClick={() => handleExecuteSpotQuery(spotQuery, spotLimit)}
                  disabled={isLoadingSpot}
                  className="w-full py-2 px-3 rounded-xl bg-[#3c0091] hover:bg-[#d0bcff] text-[#d0bcff] hover:text-[#3c0091] font-syne font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 shadow-md disabled:opacity-50"
                >
                  <span className="material-symbols-outlined text-base">
                    {isLoadingSpot ? 'sync' : 'search'}
                  </span>
                  {isLoadingSpot ? 'QUERYING...' : 'RUN QUERY'}
                </button>
              </div>
            </div>

            {/* Quick Artist Tags */}
            <div className="flex items-center gap-2 overflow-x-auto text-xs font-mono text-[#958ea0] pt-1">
              <span className="text-[#958ea0]/70">QUICK QUERY:</span>
              {QUICK_ARTISTS.map((artist) => (
                <button
                  key={artist}
                  onClick={() => {
                    setSpotQuery(artist);
                    handleExecuteSpotQuery(artist, spotLimit);
                  }}
                  className={`px-3 py-1 rounded-lg border transition-colors ${
                    spotQuery.toLowerCase() === artist.toLowerCase()
                      ? 'bg-[#3c0091] text-[#d0bcff] border-[#d0bcff]'
                      : 'bg-[#11131b] border-[#33343e] hover:bg-[#282a32] hover:text-[#e2e1ee]'
                  }`}
                >
                  {artist}
                </button>
              ))}
            </div>
          </div>

          {/* Results Grid */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-[#958ea0] px-2">
              <span className="flex items-center gap-2">
                <span className="text-emerald-400 font-bold">
                  RETURNED {spotResults.length} ITEMS FROM searchV2.tracksV2
                </span>
              </span>
              <span>CLICK ANY TRACK TO STREAM AUDIO</span>
            </div>

            {spotResults.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {spotResults.map((item, idx) => {
                  const track = item.item.data;
                  const artist = track.artists.items[0]?.profile.name || 'Unknown Artist';
                  const albumName = track.albumOfTrack.name;
                  const cover = track.albumOfTrack.coverArt.sources[0]?.url;
                  const durationSec = Math.round(track.duration.totalMilliseconds / 1000);
                  const mins = Math.floor(durationSec / 60);
                  const secs = durationSec % 60;
                  const durationStr = `${mins}:${secs < 10 ? '0' : ''}${secs}`;

                  return (
                    <div
                      key={`${track.id}-${idx}`}
                      className="p-3.5 rounded-xl bg-[#191b24] border border-[#33343e] hover:border-[#494454] transition-all flex items-center justify-between gap-3 group"
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-[#11131b] border border-[#33343e]">
                          {cover ? (
                            <img
                              src={cover}
                              alt={track.name}
                              loading="lazy"
                              decoding="async"
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center font-mono text-xs text-[#958ea0]">
                              {idx + 1}
                            </div>
                          )}
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                            <span className="material-symbols-outlined text-white text-base">play_arrow</span>
                          </div>
                        </div>

                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className="font-syne font-bold text-sm text-[#e2e1ee] group-hover:text-[#d0bcff] truncate">
                              {track.name}
                            </h4>
                          </div>
                          <p className="text-xs text-[#958ea0] truncate">
                            {artist} • <span className="opacity-75">{albumName}</span>
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="font-mono text-[10px] text-[#ffb95f]">
                              {durationStr}
                            </span>
                            {track.previewUrl && (
                              <span className="font-mono text-[9px] text-emerald-400 bg-emerald-950/60 px-1.5 py-0.2 rounded border border-emerald-800/40">
                                HQ STREAM
                              </span>
                            )}
                            <span className="font-mono text-[9px] text-[#958ea0]">
                              ID: {track.id}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => onPlaySong(track.name, artist)}
                          className="px-3 py-1.5 rounded-lg bg-[#3c0091] hover:bg-[#d0bcff] text-[#d0bcff] hover:text-[#3c0091] font-syne font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-1 shadow-sm"
                          title={`Play ${track.name}`}
                        >
                          <span className="material-symbols-outlined text-sm">play_arrow</span>
                          PLAY
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              !isLoadingSpot && (
                <div className="py-12 text-center text-[#958ea0] font-mono bg-[#191b24] rounded-2xl border border-[#33343e]">
                  No tracks found. Query an artist like "Weezer", "Radiohead", or "Daft Punk".
                </div>
              )
            )}

            {/* Pagination Button matching paginate_songs */}
            {spotResults.length > 0 && (
              <div className="pt-4 text-center">
                <button
                  onClick={handlePaginateBatch}
                  disabled={isLoadingSpot}
                  className="px-6 py-2.5 rounded-xl bg-[#191b24] hover:bg-[#282a32] text-[#d0bcff] font-mono text-xs uppercase tracking-wider transition-colors border border-[#494454] disabled:opacity-50 inline-flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-sm">
                    {isLoadingSpot ? 'hourglass_empty' : 'more_time'}
                  </span>
                  {isLoadingSpot ? 'Paginating batch...' : 'Paginate Next Batch of 20 Songs (paginate_songs)'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* VIEW MODE 2: AUDITED LEDGER (Original Catalog with Sorting & Dossier) */}
      {activeCatalogMode === 'audited' && (
        <div className="space-y-8">
          {/* Search & Filter Bar */}
          <div className="space-y-3">
            <div className="flex items-center gap-3 bg-[#191b24] p-3 rounded-xl border border-[#33343e]">
              <span className="material-symbols-outlined text-[#d0bcff]">search</span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter catalog by song title, artist name, or album..."
                className="bg-transparent border-none outline-none text-sm w-full placeholder:text-[#958ea0] font-sans text-[#e2e1ee]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-xs font-mono text-[#958ea0] hover:text-white"
                >
                  CLEAR
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap transition-colors ${
                    activeCategory === cat
                      ? 'bg-[#3c0091] text-[#d0bcff] font-bold border border-[#d0bcff]/40 shadow-sm'
                      : 'bg-[#191b24] text-[#958ea0] border border-[#33343e] hover:text-[#e2e1ee]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Split Layout: Catalog List vs Deep-Dive Dossier & Receipt */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 7 Cols: Ranked Entries List */}
            <div className="lg:col-span-7 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-[#958ea0] px-2">
                <span>SHOWING {filteredTracks.length} ENTRIES</span>
                <span>CLICK TO INSPECT DOSSIER</span>
              </div>

              <div className="space-y-2">
                {filteredTracks.map((track) => {
                  const isSelected = selectedTrack.id === track.id;
                  return (
                    <div
                      key={track.id}
                      onClick={() => setSelectedTrack(track)}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                        isSelected
                          ? 'bg-[#282a32] border-[#d0bcff]/70 shadow-lg'
                          : 'bg-[#191b24] border-[#33343e]/50 hover:bg-[#1d1f28] hover:border-[#494454]'
                      }`}
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <div className="relative shrink-0">
                          <img
                            src={track.albumCover}
                            alt={track.title}
                            loading="lazy"
                            decoding="async"
                            referrerPolicy="no-referrer"
                            className="w-12 h-12 rounded-lg object-cover border border-[#494454]"
                          />
                          <span className="absolute -top-1 -left-1 w-5 h-5 rounded-full bg-[#11131b] text-[#d0bcff] font-mono text-[10px] font-bold flex items-center justify-center border border-[#33343e]">
                            {track.rank}
                          </span>
                        </div>

                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className={`font-syne font-bold text-sm truncate ${isSelected ? 'text-[#d0bcff]' : 'text-[#e2e1ee]'}`}>
                              {track.title}
                            </h4>
                            <span className="font-mono text-[9px] px-1.5 py-0.2 rounded bg-[#11131b] text-[#ffb95f]">
                              {track.bpm} BPM
                            </span>
                          </div>
                          <p className="text-xs text-[#958ea0] truncate">
                            {track.artist} • <span className="opacity-75">{track.album}</span>
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <div className="text-right font-mono pr-2">
                          <div className="text-sm font-bold text-[#e2e1ee]">
                            {track.plays} <span className="text-[10px] font-normal text-[#958ea0]">plays</span>
                          </div>
                          <div className="text-[10px] text-[#ffb95f]">
                            {track.listeningHours} hrs
                          </div>
                        </div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onPlaySong(track.title, track.artist);
                          }}
                          className="w-8 h-8 rounded-full bg-[#3c0091] hover:bg-[#d0bcff] text-[#d0bcff] hover:text-[#3c0091] flex items-center justify-center transition-colors"
                          title="Play Track"
                        >
                          <span className="material-symbols-outlined text-base">play_arrow</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right 5 Cols: Deep-Dive Dossier & Thermal Receipt Tape */}
            <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-20">
              {/* Dossier Card */}
              <div className="bg-[#191b24] rounded-2xl border border-[#33343e]/60 p-6 space-y-5 shadow-xl">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <img
                      src={selectedTrack.albumCover}
                      alt={selectedTrack.title}
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 rounded-xl object-cover border border-[#d0bcff]/40 shadow-md"
                    />
                    <div>
                      <span className="font-mono text-[9px] uppercase px-1.5 py-0.5 rounded bg-[#3c0091] text-[#d0bcff] font-bold">
                        RANK #{selectedTrack.rank} ARCHIVED
                      </span>
                      <h3 className="font-syne font-bold text-lg text-[#e2e1ee] mt-1">
                        {selectedTrack.title}
                      </h3>
                      <p className="font-mono text-xs text-[#958ea0]">
                        {selectedTrack.artist}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => onPlaySong(selectedTrack.title, selectedTrack.artist)}
                    className="w-10 h-10 rounded-full bg-[#3c0091] hover:bg-[#4f319c] text-[#d0bcff] flex items-center justify-center transition-transform active:scale-95 shadow-md shrink-0"
                    title="Play Audio"
                  >
                    <span className="material-symbols-outlined text-xl">play_arrow</span>
                  </button>
                </div>

                {/* Vital Telemetry Grid */}
                <div className="grid grid-cols-3 gap-2 font-mono text-center">
                  <div className="p-2.5 rounded-lg bg-[#11131b] border border-[#33343e]">
                    <span className="text-[9px] text-[#958ea0] block">AUDITED PLAYS</span>
                    <span className="font-bold text-sm text-[#e2e1ee]">{selectedTrack.plays}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#11131b] border border-[#33343e]">
                    <span className="text-[9px] text-[#958ea0] block">HOURS SPENT</span>
                    <span className="font-bold text-sm text-[#ffb95f]">{selectedTrack.listeningHours}h</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#11131b] border border-[#33343e]">
                    <span className="text-[9px] text-[#958ea0] block">REPEAT RATIO</span>
                    <span className="font-bold text-sm text-emerald-400">{selectedTrack.repeatRatio}</span>
                  </div>
                </div>

                {/* Sonic Vector Metrics */}
                <div className="space-y-2 text-xs font-mono">
                  <div className="flex justify-between text-[#cbc3d7]">
                    <span>DOMINANT MOOD:</span>
                    <span className="text-[#d0bcff] uppercase">{selectedTrack.dominantMood}</span>
                  </div>
                  <div className="flex justify-between text-[#cbc3d7] pt-1">
                    <span>PEAK LISTENING:</span>
                    <span className="text-[#ffb95f]">{selectedTrack.peakHour}</span>
                  </div>
                  <div className="flex justify-between text-[#cbc3d7] pt-1">
                    <span>TEMPO:</span>
                    <span className="text-[#e2e1ee]">{selectedTrack.bpm} BPM</span>
                  </div>
                </div>

                {/* Device Airplay Log (Thermal Receipt Box) */}
                <div className="p-4 rounded-xl bg-[#11131b] border border-[#494454] font-mono text-xs space-y-2">
                  <div className="flex items-center justify-between border-b border-[#33343e] pb-1.5 text-[10px]">
                    <span className="text-[#ffb95f] font-bold">ITEMIZED AUDIT LOG</span>
                    <span className="text-[#958ea0]">HARDWARE DAC</span>
                  </div>

                  <div className="space-y-1.5 text-[11px]">
                    {selectedTrack.receiptLog.map((log, idx) => (
                      <div key={idx} className="space-y-0.5 border-b border-[#33343e]/30 pb-1">
                        <div className="flex justify-between text-[#e2e1ee]">
                          <span>{log.timestamp}</span>
                          <span className="text-[#d0bcff]">{log.duration}</span>
                        </div>
                        <div className="flex justify-between text-[10px] text-[#958ea0]">
                          <span>{log.device}</span>
                          <span className="italic">{log.context}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Barcode & Actions */}
                  <div className="pt-2 text-center">
                    <div className="font-mono text-xs tracking-widest text-[#958ea0]">
                      |||| | ||| |||||| | |||||
                    </div>
                    <div className="text-[9px] text-[#958ea0] mt-0.5">
                      #RECORD-{selectedTrack.rank}-AUTHENTICATED
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={() => onOpenReceipt(selectedTrack.title)}
                      className="flex-1 py-2 rounded-lg bg-[#3c0091] hover:bg-[#4f319c] text-[#d0bcff] font-syne text-[11px] font-bold uppercase tracking-wider transition-colors"
                    >
                      FULL RECEIPT
                    </button>
                    <button
                      onClick={handleCopyJson}
                      className="px-3 py-2 rounded-lg bg-[#282a32] hover:bg-[#33343e] text-[#cbc3d7] font-mono text-[11px] border border-[#494454] transition-colors"
                      title="Copy telemetry record JSON"
                    >
                      {copiedJson ? 'COPIED' : 'COPY JSON'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
