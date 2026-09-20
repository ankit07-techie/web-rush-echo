import React, { useState, useEffect } from 'react';
import { TOP_TRACKS, TOP_ARTISTS, MUSICAL_ERAS, CHAPTERS, BEHAVIORAL_PATTERNS } from '../data/mockData';
import { ViewTab } from '../types';
import { songService, SpotApiTrackItem } from '../services/songService';

interface SearchPaletteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSong: (title: string, artist: string) => void;
  onNavigateTab: (tab: ViewTab) => void;
}

export const SearchPaletteModal: React.FC<SearchPaletteModalProps> = ({
  isOpen,
  onClose,
  onSelectSong,
  onNavigateTab,
}) => {
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'spotapi'>('spotapi');
  const [liveTracks, setLiveTracks] = useState<SpotApiTrackItem[]>([]);
  const [isLoadingLive, setIsLoadingLive] = useState(false);
  const [hasSearchedLive, setHasSearchedLive] = useState(false);

  // Default initial query with "weezer" as referenced in user instructions
  useEffect(() => {
    if (isOpen && !hasSearchedLive) {
      handleSpotApiQuery(query || 'weezer');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
      }
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleSpotApiQuery = async (searchStr: string) => {
    const target = searchStr.trim() || 'weezer';
    setIsLoadingLive(true);
    try {
      // Direct execution of: songs = song.query_songs(target, limit=20)
      const resp = await songService.query_songs(target, 20);
      const items = resp.data.searchV2.tracksV2.items;
      setLiveTracks(items);
      setHasSearchedLive(true);
    } catch (e) {
      console.warn('Error querying SpotAPI songs:', e);
    } finally {
      setIsLoadingLive(false);
    }
  };

  const handlePaginateMore = async () => {
    setIsLoadingLive(true);
    try {
      const target = query.trim() || 'weezer';
      const offset = liveTracks.length;
      const resp = await songService.query_songs(target, 20, offset);
      const nextBatch = resp.data.searchV2.tracksV2.items;
      setLiveTracks((prev) => [...prev, ...nextBatch]);
    } catch (e) {
      console.warn('Error paginating songs:', e);
    } finally {
      setIsLoadingLive(false);
    }
  };

  if (!isOpen) return null;

  const cleanQuery = query.toLowerCase().trim();

  const filteredTracks = TOP_TRACKS.filter(
    (t) =>
      t.title.toLowerCase().includes(cleanQuery) ||
      t.artist.toLowerCase().includes(cleanQuery) ||
      t.album.toLowerCase().includes(cleanQuery)
  );

  const filteredArtists = TOP_ARTISTS.filter(
    (a) => a.name.toLowerCase().includes(cleanQuery) || a.genre.toLowerCase().includes(cleanQuery)
  );

  const filteredEras = MUSICAL_ERAS.filter(
    (e) =>
      e.title.toLowerCase().includes(cleanQuery) ||
      e.primaryGenre.toLowerCase().includes(cleanQuery)
  );

  const filteredPatterns = BEHAVIORAL_PATTERNS.filter(
    (p) =>
      p.title.toLowerCase().includes(cleanQuery) ||
      p.summary.toLowerCase().includes(cleanQuery)
  );

  const PRESET_SEARCHES = ['Weezer', 'Radiohead', 'Bon Iver', 'Phoebe Bridgers', 'M83', 'Daft Punk'];

  return (
    <div
      id="search-palette-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Archive Search Command Palette"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-start justify-center pt-16 sm:pt-20 p-4 animate-in fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative max-w-2xl w-full bg-[#191b24] border border-[#494454] rounded-2xl shadow-2xl overflow-hidden text-[#e2e1ee] flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-[#33343e] gap-3 bg-[#1d1f28]">
          <span className="material-symbols-outlined text-[#d0bcff]">search</span>
          <input
            id="search-palette-input"
            autoFocus
            type="text"
            value={query}
            aria-label="Search audio archive, artists, or live catalog"
            placeholder={
              activeTab === 'spotapi'
                ? 'Query SpotAPI live catalog (e.g. Weezer, Radiohead)...'
                : 'Search memory archive, artists, or eras...'
            }
            onChange={(e) => {
              const val = e.target.value;
              setQuery(val);
              if (activeTab === 'spotapi' && val.trim().length >= 2) {
                handleSpotApiQuery(val);
              }
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSpotApiQuery(query);
              }
            }}
            className="bg-transparent border-none outline-none text-sm w-full placeholder:text-[#958ea0] font-sans"
          />
          {query && (
            <button
              onClick={() => {
                setQuery('');
                handleSpotApiQuery('weezer');
              }}
              className="text-xs font-mono text-[#958ea0] hover:text-white"
            >
              CLEAR
            </button>
          )}
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-[#282a32] text-[#958ea0] rounded border border-[#33343e]">
            ESC
          </kbd>
        </div>

        {/* Mode Switcher & Quick Tags Bar */}
        <div className="px-4 py-2 border-b border-[#33343e] bg-[#14161f] flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setActiveTab('spotapi')}
              className={`px-2.5 py-1 rounded-md font-mono text-[11px] transition-colors flex items-center gap-1.5 ${
                activeTab === 'spotapi'
                  ? 'bg-[#3c0091] text-[#d0bcff] font-bold border border-[#d0bcff]/40'
                  : 'text-[#958ea0] hover:text-[#e2e1ee]'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              SPOTAPI SONG QUERY ({liveTracks.length})
            </button>
            <button
              onClick={() => setActiveTab('all')}
              className={`px-2.5 py-1 rounded-md font-mono text-[11px] transition-colors ${
                activeTab === 'all'
                  ? 'bg-[#282a32] text-[#e2e1ee] font-bold border border-[#494454]'
                  : 'text-[#958ea0] hover:text-[#e2e1ee]'
              }`}
            >
              ARCHIVE LEDGER
            </button>
          </div>

          {/* Quick presets */}
          <div className="hidden sm:flex items-center gap-1 overflow-x-auto text-[10px] font-mono text-[#958ea0]">
            <span className="text-[#958ea0]/70">QUICK:</span>
            {PRESET_SEARCHES.map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  setQuery(tag);
                  handleSpotApiQuery(tag);
                }}
                className="px-2 py-0.5 rounded bg-[#1d1f28] hover:bg-[#282a32] hover:text-[#d0bcff] transition-colors border border-[#33343e]"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Results Container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 font-sans text-xs">
          {/* TAB 1: SPOTAPI LIVE SONG QUERY */}
          {activeTab === 'spotapi' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[11px] font-mono text-[#958ea0] border-b border-[#33343e]/50 pb-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400 font-bold">query_songs("{query || 'weezer'}", limit=20)</span>
                  <span>• searchV2.tracksV2.items</span>
                </div>
                {isLoadingLive && <span className="text-[#d0bcff] animate-pulse">Streaming songs...</span>}
              </div>

              {liveTracks.length > 0 ? (
                <div className="space-y-1.5">
                  {liveTracks.map((item, idx) => {
                    const track = item.item.data;
                    const artistName = track.artists.items[0]?.profile.name || 'Unknown Artist';
                    const cover = track.albumOfTrack.coverArt.sources[0]?.url;
                    const durationSec = Math.round(track.duration.totalMilliseconds / 1000);
                    const mins = Math.floor(durationSec / 60);
                    const secs = durationSec % 60;
                    const durationStr = `${mins}:${secs < 10 ? '0' : ''}${secs}`;

                    return (
                      <div
                        key={`${track.id}-${idx}`}
                        onClick={() => {
                          onSelectSong(track.name, artistName);
                          onClose();
                        }}
                        className="flex items-center justify-between p-2 sm:p-2.5 rounded-xl hover:bg-[#282a32] cursor-pointer transition-all duration-150 border border-transparent hover:border-[#494454] group"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          {/* Artwork & Index */}
                          <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-[#11131b] border border-[#33343e]">
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

                          <div className="truncate">
                            <div className="font-semibold text-sm text-[#e2e1ee] group-hover:text-[#d0bcff] truncate flex items-center gap-1.5">
                              <span>{track.name}</span>
                              {track.previewUrl && (
                                <span className="text-[9px] font-mono text-emerald-400 bg-emerald-950/60 px-1 py-0.2 rounded border border-emerald-800/40">
                                  HQ AUDIO
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-[#958ea0] truncate">
                              {artistName} • {track.albumOfTrack.name}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          <span className="font-mono text-[11px] text-[#958ea0]">{durationStr}</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectSong(track.name, artistName);
                              onClose();
                            }}
                            className="px-2.5 py-1 rounded-lg bg-[#3c0091] hover:bg-[#d0bcff] text-[#d0bcff] hover:text-[#3c0091] font-syne font-bold text-[10px] uppercase tracking-wider transition-colors flex items-center gap-1"
                          >
                            <span className="material-symbols-outlined text-xs">play_arrow</span>
                            PLAY
                          </button>
                        </div>
                      </div>
                    );
                  })}

                  {/* Pagination trigger matching paginate_songs */}
                  <div className="pt-2 text-center">
                    <button
                      onClick={handlePaginateMore}
                      disabled={isLoadingLive}
                      className="px-4 py-2 rounded-xl bg-[#282a32] hover:bg-[#33343e] text-[#d0bcff] font-mono text-xs uppercase tracking-wider transition-colors border border-[#494454] disabled:opacity-50"
                    >
                      {isLoadingLive ? 'Paginating batch...' : 'Paginate +20 More Songs (paginate_songs)'}
                    </button>
                  </div>
                </div>
              ) : (
                !isLoadingLive && (
                  <div className="py-8 text-center text-[#958ea0] font-mono">
                    No songs found for "{query || 'weezer'}". Try another artist or song query.
                  </div>
                )
              )}
            </div>
          )}

          {/* TAB 2: ARCHIVE LEDGER */}
          {activeTab === 'all' && (
            <div className="space-y-4">
              {/* Songs */}
              {filteredTracks.length > 0 && (
                <div>
                  <div className="px-2 py-1 font-mono text-[10px] uppercase text-[#958ea0] tracking-wider">
                    Audited Tracks ({filteredTracks.length})
                  </div>
                  <div className="space-y-1 mt-1">
                    {filteredTracks.map((t) => (
                      <div
                        key={t.id}
                        onClick={() => {
                          onSelectSong(t.title, t.artist);
                          onNavigateTab('artists-and-songs');
                          onClose();
                        }}
                        className="flex items-center justify-between p-2 rounded-lg hover:bg-[#282a32] cursor-pointer transition-colors group"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-8 h-8 rounded bg-[#3c0091]/60 text-[#d0bcff] flex items-center justify-center font-bold text-xs shrink-0">
                            {t.rank}
                          </div>
                          <div className="truncate">
                            <div className="font-semibold text-[#e2e1ee] group-hover:text-[#d0bcff] truncate">
                              {t.title}
                            </div>
                            <div className="text-[11px] text-[#958ea0] truncate">
                              {t.artist} • {t.album}
                            </div>
                          </div>
                        </div>
                        <div className="text-right shrink-0 font-mono text-[11px] text-[#cbc3d7]">
                          {t.plays} plays
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Artists */}
              {filteredArtists.length > 0 && (
                <div>
                  <div className="px-2 py-1 font-mono text-[10px] uppercase text-[#958ea0] tracking-wider">
                    Artists ({filteredArtists.length})
                  </div>
                  <div className="space-y-1 mt-1">
                    {filteredArtists.map((a) => (
                      <div
                        key={a.id}
                        onClick={() => {
                          onNavigateTab('artists-and-songs');
                          onClose();
                        }}
                        className="flex items-center justify-between p-2 rounded-lg hover:bg-[#282a32] cursor-pointer transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={a.avatarUrl}
                            alt={a.name}
                            className="w-8 h-8 rounded-full object-cover border border-[#494454]"
                          />
                          <div>
                            <div className="font-semibold text-[#e2e1ee] group-hover:text-[#d0bcff]">
                              {a.name}
                            </div>
                            <div className="text-[11px] text-[#958ea0]">{a.genre}</div>
                          </div>
                        </div>
                        <div className="font-mono text-[11px] text-[#cbc3d7]">
                          {a.totalPlays} plays ({a.sharePercentage}%)
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Eras */}
              {filteredEras.length > 0 && (
                <div>
                  <div className="px-2 py-1 font-mono text-[10px] uppercase text-[#958ea0] tracking-wider">
                    Musical Eras ({filteredEras.length})
                  </div>
                  <div className="space-y-1 mt-1">
                    {filteredEras.map((era) => (
                      <div
                        key={era.id}
                        onClick={() => {
                          onNavigateTab('home');
                          onClose();
                        }}
                        className="flex items-center justify-between p-2 rounded-lg hover:bg-[#282a32] cursor-pointer transition-colors group"
                      >
                        <div>
                          <div className="font-semibold text-[#e2e1ee] group-hover:text-[#d0bcff]">
                            {era.title}
                          </div>
                          <div className="text-[11px] text-[#958ea0]">{era.timeframe} • {era.primaryGenre}</div>
                        </div>
                        <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#11131b] border border-[#33343e] text-[#ffb95f]">
                          {era.totalHours} hrs
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Patterns */}
              {filteredPatterns.length > 0 && (
                <div>
                  <div className="px-2 py-1 font-mono text-[10px] uppercase text-[#958ea0] tracking-wider">
                    Listening Patterns ({filteredPatterns.length})
                  </div>
                  <div className="space-y-1 mt-1">
                    {filteredPatterns.map((p) => (
                      <div
                        key={p.id}
                        onClick={() => {
                          onNavigateTab('patterns');
                          onClose();
                        }}
                        className="p-2 rounded-lg hover:bg-[#282a32] cursor-pointer transition-colors group"
                      >
                        <div className="flex items-center justify-between">
                          <div className="font-semibold text-[#e2e1ee] group-hover:text-[#d0bcff]">
                            {p.number}. {p.title}
                          </div>
                          <span className="font-mono text-[9px] text-[#ffb95f] uppercase px-1.5 py-0.5 rounded bg-[#ca8100]/20 border border-[#ca8100]/30">
                            {p.badge}
                          </span>
                        </div>
                        <div className="text-[11px] text-[#cbc3d7]/80 mt-1 line-clamp-1">
                          {p.summary}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 bg-[#11131b] border-t border-[#33343e] flex items-center justify-between text-[10px] font-mono text-[#958ea0]">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>SPOTAPI / SEARCHV2 STREAM READY</span>
          </span>
          <span className="flex items-center gap-2">
            <span>Press ESC to exit</span>
          </span>
        </div>
      </div>
    </div>
  );
};
