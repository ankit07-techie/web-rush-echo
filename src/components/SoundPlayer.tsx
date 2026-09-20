import React, { useEffect, useRef, useState } from 'react';

export interface PlayerTrack {
  title: string;
  artist: string;
  album?: string;
  duration?: string;
  durationSeconds?: number;
  artworkUrl?: string;
  previewUrl?: string;
  spotifyId?: string;
}

interface SoundPlayerProps {
  currentTrack: PlayerTrack | null;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onClose: () => void;
  onSelectSong?: (title: string, artist: string) => void;
}

export const SoundPlayer: React.FC<SoundPlayerProps> = ({
  currentTrack,
  isPlaying,
  onTogglePlay,
  onClose,
}) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(30);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [playbackMode, setPlaybackMode] = useState<'preview' | 'spotify' | 'synth'>('preview');

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode[]>([]);
  const gainRef = useRef<GainNode | null>(null);
  const onTogglePlayRef = useRef(onTogglePlay);
  const isLoopingRef = useRef(isLooping);
  const lastLoadedUrlRef = useRef<string | null>(null);

  useEffect(() => {
    onTogglePlayRef.current = onTogglePlay;
  }, [onTogglePlay]);

  useEffect(() => {
    isLoopingRef.current = isLooping;
    if (audioRef.current) {
      audioRef.current.loop = isLooping;
    }
  }, [isLooping]);

  // Setup HTML Audio element for real preview playback
  useEffect(() => {
    if (!audioRef.current) {
      const audio = new Audio();
      audio.crossOrigin = 'anonymous';
      audioRef.current = audio;

      audio.ontimeupdate = () => {
        setCurrentTime(audio.currentTime);

        // Safeguard for browsers or cross-origin streams where loop doesn't restart automatically
        if (isLoopingRef.current && audio.duration > 0) {
          if (audio.currentTime >= audio.duration - 0.2) {
            audio.currentTime = 0;
            setCurrentTime(0);
            audio.play().catch(() => {});
          }
        }
      };

      audio.onloadedmetadata = () => {
        if (audio.duration && !isNaN(audio.duration)) {
          setDuration(audio.duration);
        }
      };

      audio.onended = () => {
        if (isLoopingRef.current || audio.loop) {
          audio.currentTime = 0;
          setCurrentTime(0);
          const playPromise = audio.play();
          if (playPromise !== undefined) {
            playPromise.catch((err) => {
              if (err.name !== 'AbortError') {
                console.warn('Audio loop replay notice:', err);
              }
            });
          }
        } else {
          onTogglePlayRef.current();
        }
      };

      audio.onerror = (e) => {
        console.warn('Audio element error, falling back to synth if playing:', e);
      };
    }
  }, []);

  // Handle track source changes
  useEffect(() => {
    if (!audioRef.current) return;
    const audio = audioRef.current;
    const nextUrl = currentTrack?.previewUrl || '';

    if (nextUrl !== lastLoadedUrlRef.current) {
      lastLoadedUrlRef.current = nextUrl;
      setCurrentTime(0);
      if (nextUrl) {
        audio.src = nextUrl;
        audio.load();
      } else {
        audio.pause();
        audio.removeAttribute('src');
      }
    }
  }, [currentTrack?.previewUrl]);

  // Handle play/pause, volume, loop, and playback mode safely
  useEffect(() => {
    if (!audioRef.current) return;
    const audio = audioRef.current;

    audio.volume = isMuted ? 0 : volume;
    audio.loop = isLooping;

    if (isPlaying && playbackMode === 'preview' && currentTrack?.previewUrl) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          if (err.name !== 'AbortError') {
            console.warn('Audio playback notice:', err.message);
          }
        });
      }
    } else {
      if (!audio.paused) {
        audio.pause();
      }
    }
  }, [isPlaying, playbackMode, volume, isMuted, isLooping, currentTrack?.previewUrl]);

  // Web Audio ambient drone synthesizer (when mode === 'synth' or as audio background)
  useEffect(() => {
    const shouldUseSynth = isPlaying && (playbackMode === 'synth' || !currentTrack?.previewUrl);
    
    if (shouldUseSynth && currentTrack) {
      try {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (!audioCtxRef.current && AudioContextClass) {
          audioCtxRef.current = new AudioContextClass();
        }
        const ctx = audioCtxRef.current;
        if (ctx) {
          if (ctx.state === 'suspended') {
            ctx.resume();
          }

          oscRef.current.forEach((osc) => {
            try {
              osc.stop();
              osc.disconnect();
            } catch {
              // ignore
            }
          });
          oscRef.current = [];

          const masterGain = ctx.createGain();
          masterGain.gain.setValueAtTime(isMuted ? 0 : volume * 0.04, ctx.currentTime);
          masterGain.connect(ctx.destination);
          gainRef.current = masterGain;

          // Warm harmonic chord (F# minor ambient chord: F#2, C#3, A3, E4)
          const frequencies = [92.5, 138.59, 220.0, 329.63];
          frequencies.forEach((freq, idx) => {
            const osc = ctx.createOscillator();
            const oscGain = ctx.createGain();
            osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
            osc.frequency.setValueAtTime(freq + (idx * 0.4), ctx.currentTime);
            oscGain.gain.setValueAtTime(0.03 / (idx + 1), ctx.currentTime);
            osc.connect(oscGain);
            oscGain.connect(masterGain);
            osc.start();
            oscRef.current.push(osc);
          });
        }
      } catch (e) {
        console.warn('Web Audio initialized gracefully:', e);
      }
    } else {
      if (gainRef.current && audioCtxRef.current) {
        gainRef.current.gain.setTargetAtTime(0, audioCtxRef.current.currentTime, 0.2);
      }
      setTimeout(() => {
        oscRef.current.forEach((osc) => {
          try {
            osc.stop();
            osc.disconnect();
          } catch {
            // ignore
          }
        });
        oscRef.current = [];
      }, 300);
    }
  }, [isPlaying, playbackMode, currentTrack, volume, isMuted]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };
  }, []);

  if (!currentTrack) return null;

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs < 0) return '0:00';
    const mins = Math.floor(secs / 60);
    const remainder = Math.floor(secs % 60);
    return `${mins}:${remainder < 10 ? '0' : ''}${remainder}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current && !isNaN(newTime)) {
      audioRef.current.currentTime = newTime;
    }
  };

  const toggleLoop = () => {
    setIsLooping((prev) => {
      const next = !prev;
      isLoopingRef.current = next;
      if (audioRef.current) {
        audioRef.current.loop = next;
        // If enabling loop and audio reached the end or is near end while playing, rewind & replay
        if (next && isPlaying) {
          if (audioRef.current.ended || (audioRef.current.duration > 0 && audioRef.current.currentTime >= audioRef.current.duration - 0.3)) {
            audioRef.current.currentTime = 0;
            setCurrentTime(0);
            audioRef.current.play().catch(() => {});
          }
        }
      }
      return next;
    });
  };

  const defaultArtwork = 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=300&q=80';
  const artwork = currentTrack.artworkUrl || defaultArtwork;
  const hasAudioPreview = Boolean(currentTrack.previewUrl);
  const safeSpotifyId = (currentTrack.spotifyId || '').replace(/[^a-zA-Z0-9]/g, '') || '3BQHpFgAp4l80e1XGRIjnv';

  return (
    <aside
      id="sound-capsule-player"
      role="region"
      aria-label="Audio Playback Bar"
      className={`fixed bottom-5 right-4 sm:right-6 z-40 bg-[#1d1f28]/95 backdrop-blur-xl border border-[#494454] rounded-2xl shadow-2xl transition-all duration-300 text-[#e2e1ee] animate-in fade-in slide-in-from-bottom-4 ${
        isExpanded ? 'w-[calc(100vw-2rem)] sm:w-[460px] p-5' : 'w-[calc(100vw-2rem)] sm:w-[420px] p-3.5'
      }`}
    >
      {/* Top Row: Track Summary & Mode Toggles */}
      <div className="flex items-center gap-3">
        {/* Artwork Thumbnail */}
        <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-[#494454] bg-[#11131b]">
          <img
            src={artwork}
            alt={`${currentTrack.title} by ${currentTrack.artist}`}
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          {isPlaying && (
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <span className="w-2 h-2 rounded-full bg-[#d0bcff] animate-ping"></span>
            </div>
          )}
        </div>

        {/* Track Metadata */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-mono text-[9px] uppercase tracking-wider text-[#ffb95f] px-1.5 py-0.2 rounded bg-[#ffb95f]/10 border border-[#ffb95f]/30">
              {hasAudioPreview ? 'AUDITED AUDIO' : 'SYNTH HARMONIC'}
            </span>
            {isLooping && (
              <span className="font-mono text-[9px] uppercase tracking-wider text-[#ffb95f] px-1.5 py-0.2 rounded bg-[#ffb95f]/20 border border-[#ffb95f]/50 flex items-center gap-0.5">
                <span className="material-symbols-outlined text-[10px]">repeat</span>
                LOOP ON
              </span>
            )}
            <span className="font-mono text-[10px] text-[#cbc3d7]/70">
              {formatTime(currentTime)} / {hasAudioPreview ? formatTime(duration) : (currentTrack.duration || '3:45')}
            </span>
          </div>

          <div className="font-syne font-bold text-xs sm:text-sm text-[#e2e1ee] truncate mt-0.5">
            {currentTrack.title}
          </div>
          <div className="font-mono text-[10px] text-[#958ea0] truncate">
            {currentTrack.artist} {currentTrack.album ? `• ${currentTrack.album}` : ''}
          </div>
        </div>

        {/* Primary Controls */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            id="btn-toggle-sound-capsule"
            onClick={onTogglePlay}
            aria-label={isPlaying ? 'Pause audio' : 'Play audio'}
            className="w-9 h-9 rounded-full bg-[#d0bcff] text-[#3c0091] flex items-center justify-center hover:bg-white transition-transform active:scale-95 shadow-md"
            title={isPlaying ? 'Pause' : 'Play Audio'}
          >
            <span className="material-symbols-outlined text-xl">
              {isPlaying ? 'pause' : 'play_arrow'}
            </span>
          </button>

          <button
            id="btn-toggle-sound-loop"
            onClick={toggleLoop}
            aria-label={isLooping ? 'Disable loop repeat' : 'Enable loop repeat'}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
              isLooping
                ? 'bg-[#3c0091] text-[#ffb95f] border border-[#ffb95f]/70 shadow-[0_0_12px_rgba(255,185,95,0.4)]'
                : 'text-[#958ea0] hover:text-[#e2e1ee] hover:bg-[#33343e]/50 border border-transparent'
            }`}
            title={isLooping ? 'Loop Active: Repeating continuously' : 'Enable Loop / Repeat'}
          >
            <span className="material-symbols-outlined text-lg">
              {isLooping ? 'repeat_on' : 'repeat'}
            </span>
          </button>

          <button
            onClick={() => setIsExpanded((prev) => !prev)}
            aria-label={isExpanded ? 'Collapse expanded audio controls' : 'Expand audio controls and Spotify embed'}
            className="w-7 h-7 rounded-full text-[#958ea0] hover:text-[#e2e1ee] hover:bg-[#33343e]/50 flex items-center justify-center transition-colors"
            title={isExpanded ? 'Collapse' : 'Expand Controls & Spotify'}
          >
            <span className="material-symbols-outlined text-base">
              {isExpanded ? 'expand_more' : 'expand_less'}
            </span>
          </button>

          <button
            onClick={onClose}
            aria-label="Close audio player"
            className="w-7 h-7 rounded-full text-[#958ea0] hover:text-[#e2e1ee] hover:bg-[#33343e]/50 flex items-center justify-center transition-colors"
            title="Close Player"
          >
            <span className="material-symbols-outlined text-base">close</span>
          </button>
        </div>
      </div>

      {/* Progress Bar / Scrubber */}
      <div className="mt-2.5">
        <div className="relative flex items-center">
          <input
            type="range"
            min={0}
            max={duration || 30}
            step={0.1}
            value={currentTime}
            onChange={handleSeek}
            disabled={!hasAudioPreview}
            aria-label="Track playback seek position"
            aria-valuemin={0}
            aria-valuemax={duration || 30}
            aria-valuenow={currentTime}
            className="w-full h-1 bg-[#282a32] rounded-lg appearance-none cursor-pointer accent-[#d0bcff] disabled:opacity-50"
          />
        </div>
      </div>

      {/* Audio Wave Visualizer Simulation */}
      <div className="flex items-end gap-0.5 h-2.5 mt-2 w-full">
        {[30, 65, 50, 85, 55, 95, 40, 75, 65, 90, 45, 80, 60, 35, 70, 50, 85, 40].map((h, i) => (
          <div
            key={i}
            className={`flex-1 rounded-t-sm transition-all duration-150 ${
              isPlaying
                ? 'bg-gradient-to-t from-[#3c0091] via-[#d0bcff] to-[#ffb95f]'
                : 'bg-[#33343e]'
            }`}
            style={{
              height: isPlaying ? `${Math.max(20, (h * (0.3 + (i % 4) * 0.2)) % 100)}%` : '20%',
            }}
          ></div>
        ))}
      </div>

      {/* Expanded Deck Controls */}
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-[#33343e] space-y-4 animate-in fade-in duration-200">
          {/* Mode Switcher Tabs */}
          <div className="flex items-center justify-between gap-2 bg-[#11131b] p-1 rounded-xl border border-[#33343e]">
            <button
              onClick={() => setPlaybackMode('preview')}
              className={`flex-1 py-1 px-2 rounded-lg text-xs font-syne font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 ${
                playbackMode === 'preview'
                  ? 'bg-[#282a32] text-[#d0bcff] border border-[#d0bcff]/40'
                  : 'text-[#958ea0] hover:text-[#e2e1ee]'
              }`}
            >
              <span className="material-symbols-outlined text-sm">graphic_eq</span>
              HQ PREVIEW
            </button>

            <button
              onClick={() => setPlaybackMode('spotify')}
              className={`flex-1 py-1 px-2 rounded-lg text-xs font-syne font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 ${
                playbackMode === 'spotify'
                  ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/40'
                  : 'text-[#958ea0] hover:text-[#e2e1ee]'
              }`}
            >
              <span className="material-symbols-outlined text-sm">music_note</span>
              SPOTIFY EMBED
            </button>

            <button
              onClick={() => setPlaybackMode('synth')}
              className={`flex-1 py-1 px-2 rounded-lg text-xs font-syne font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 ${
                playbackMode === 'synth'
                  ? 'bg-[#3c0091]/40 text-[#cebdff] border border-[#cebdff]/40'
                  : 'text-[#958ea0] hover:text-[#e2e1ee]'
              }`}
            >
              <span className="material-symbols-outlined text-sm">waves</span>
              AMBIENT DRONE
            </button>
          </div>

          {/* Spotify Web Embed Player */}
          {playbackMode === 'spotify' && (
            <div className="rounded-xl overflow-hidden bg-black/40 border border-[#33343e] p-1">
              <iframe
                title="Spotify Track Player"
                src={`https://open.spotify.com/embed/track/${safeSpotifyId}?utm_source=generator&theme=0`}
                width="100%"
                height="80"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="rounded-lg"
              ></iframe>
            </div>
          )}

          {/* Secondary Controls: Volume, Mute & Loop */}
          <div className="flex items-center justify-between gap-4 text-xs font-mono text-[#cbc3d7]">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMuted((prev) => !prev)}
                aria-label={isMuted ? 'Unmute audio playback' : 'Mute audio playback'}
                className="hover:text-white"
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                <span className="material-symbols-outlined text-base">
                  {isMuted || volume === 0 ? 'volume_off' : volume < 0.5 ? 'volume_down' : 'volume_up'}
                </span>
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={isMuted ? 0 : volume}
                aria-label="Volume output level"
                aria-valuemin={0}
                aria-valuemax={1}
                aria-valuenow={isMuted ? 0 : volume}
                onChange={(e) => {
                  setVolume(parseFloat(e.target.value));
                  if (isMuted) setIsMuted(false);
                }}
                className="w-20 sm:w-24 h-1 bg-[#282a32] rounded appearance-none accent-[#d0bcff]"
              />
            </div>

            <div className="flex items-center gap-3">
              <button
                id="btn-expanded-loop"
                onClick={toggleLoop}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-mono font-medium transition-all ${
                  isLooping
                    ? 'border-[#ffb95f] text-[#ffb95f] bg-[#ffb95f]/15 shadow-[0_0_10px_rgba(255,185,95,0.25)] font-bold'
                    : 'border-[#33343e] text-[#958ea0] hover:text-[#e2e1ee] hover:border-[#494454]'
                }`}
                title={isLooping ? 'Loop Active (Repeating continuously)' : 'Enable Repeat / Loop'}
              >
                <span className="material-symbols-outlined text-sm">
                  {isLooping ? 'repeat_on' : 'repeat'}
                </span>
                {isLooping ? 'LOOP: ON' : 'LOOP: OFF'}
              </button>

              <span className="text-[10px] text-[#958ea0]">
                {hasAudioPreview ? '30S HIGH-RES STREAM' : 'SYNTH HARMONIZER'}
              </span>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};
