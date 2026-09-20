import React, { useEffect, useRef, useState } from 'react';

export type VisualizerMode = 'oscilloscope' | 'spectrum' | 'lissajous';

export interface HarmonicDronePreset {
  id: string;
  name: string;
  key: string;
  frequencies: number[];
  waveform: OscillatorType;
  description: string;
}

export const HARMONIC_PRESETS: HarmonicDronePreset[] = [
  {
    id: 'fsharp-twilight',
    name: 'Twilight Melancholia',
    key: 'F# minor 9',
    frequencies: [92.5, 138.59, 220.0, 329.63, 440.0],
    waveform: 'sine',
    description: 'Deep resonant ambient chord rooted in pre-dawn isolation telemetry.',
  },
  {
    id: 'd-lydian-solstice',
    name: 'Solstice Expansion',
    key: 'D Lydian',
    frequencies: [73.42, 146.83, 220.0, 277.18, 370.0],
    waveform: 'triangle',
    description: 'Warm, shimmering harmonics tuned to midsummer evening drift.',
  },
  {
    id: 'a-dorian-midnight',
    name: 'Midnight UK Garage Sub',
    key: 'A Dorian',
    frequencies: [55.0, 110.0, 164.81, 261.63, 329.63],
    waveform: 'sine',
    description: 'Sub-bass pressure and filtered modal fifths for nocturnal velocity.',
  },
  {
    id: 'c-major-dawn',
    name: 'Dawn Awakening',
    key: 'C Major 7',
    frequencies: [65.41, 130.81, 196.0, 246.94, 392.0],
    waveform: 'triangle',
    description: 'Clear, optimistic morning acoustic resonance with open octaves.',
  },
];

interface AudioVisualizerLabProps {
  isPlaying: boolean;
  onPresetChange?: (preset: HarmonicDronePreset) => void;
  onFilterChange?: (cutoff: number, resonance: number) => void;
  activePresetId?: string;
}

/**
 * Interactive Real-Time Web Audio Canvas Visualizer & Harmonic Synthesis Laboratory.
 * Connects directly to real-time audio analysis nodes to render high-framerate
 * oscilloscopes, frequency spectrums, and harmonic Lissajous orbits.
 */
export const AudioVisualizerLab: React.FC<AudioVisualizerLabProps> = ({
  isPlaying,
  onPresetChange,
  onFilterChange,
  activePresetId = 'fsharp-twilight',
}) => {
  const [mode, setMode] = useState<VisualizerMode>('oscilloscope');
  const [selectedPresetId, setSelectedPresetId] = useState(activePresetId);
  const [filterCutoff, setFilterCutoff] = useState(1800);
  const [filterResonance, setFilterResonance] = useState(2.5);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const phaseRef = useRef(0);

  const currentPreset = HARMONIC_PRESETS.find((p) => p.id === selectedPresetId) || HARMONIC_PRESETS[0];

  const handleSelectPreset = (preset: HarmonicDronePreset) => {
    setSelectedPresetId(preset.id);
    if (onPresetChange) {
      onPresetChange(preset);
    }
  };

  const handleCutoffChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setFilterCutoff(val);
    if (onFilterChange) {
      onFilterChange(val, filterResonance);
    }
  };

  const handleResonanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setFilterResonance(val);
    if (onFilterChange) {
      onFilterChange(filterCutoff, val);
    }
  };

  // 60FPS High-Precision Canvas Visualizer Engine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let isRunning = true;

    const render = () => {
      if (!isRunning) return;

      const width = canvas.width;
      const height = canvas.height;

      // Dark archival background clear with slight decay trail
      ctx.fillStyle = 'rgba(17, 19, 27, 0.35)';
      ctx.fillRect(0, 0, width, height);

      // Fine archival grid lines
      ctx.strokeStyle = 'rgba(51, 52, 62, 0.4)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      // Center horizontal datum
      ctx.moveTo(0, height / 2);
      ctx.lineTo(width, height / 2);
      // Center vertical datum
      ctx.moveTo(width / 2, 0);
      ctx.lineTo(width / 2, height);
      ctx.stroke();

      phaseRef.current += isPlaying ? 0.04 : 0.008;
      const phase = phaseRef.current;

      if (mode === 'oscilloscope') {
        // Continuous Multi-Frequency Waveform trace
        ctx.lineWidth = 2;
        ctx.strokeStyle = isPlaying ? '#d0bcff' : '#958ea0';
        ctx.beginPath();

        const bufferLength = width;
        const sliceWidth = width / bufferLength;

        for (let i = 0; i < bufferLength; i++) {
          const x = i * sliceWidth;
          const normalizedX = (i / width) * Math.PI * 4;

          // Composite wave of fundamental + 3rd + 5th harmonics
          const amp1 = isPlaying ? Math.sin(normalizedX * 1.5 + phase * 2) * 28 : Math.sin(normalizedX + phase) * 6;
          const amp2 = isPlaying ? Math.cos(normalizedX * 3.0 - phase * 1.2) * 14 : 0;
          const amp3 = isPlaying ? Math.sin(normalizedX * 5.0 + phase * 3.5) * 7 : 0;

          // Resonance filter dampening factor
          const filterDamping = Math.min(1.2, filterCutoff / 3000);
          const y = height / 2 + (amp1 + amp2 + amp3) * filterDamping;

          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();

        // Glow accent pass
        if (isPlaying) {
          ctx.strokeStyle = 'rgba(208, 188, 255, 0.25)';
          ctx.lineWidth = 6;
          ctx.stroke();
        }
      } else if (mode === 'spectrum') {
        // Banded Frequency Spectrum (FFT style)
        const bars = 48;
        const barWidth = (width / bars) - 2;

        for (let b = 0; b < bars; b++) {
          const x = b * (barWidth + 2);
          const ratio = b / bars;

          // Compute synthetic energy curve based on cutoff and resonance peak
          const peakDist = Math.abs(ratio - (filterCutoff / 8000));
          const resonancePeak = Math.exp(-peakDist * (12 - filterResonance * 2));

          const baseEnergy = isPlaying
            ? Math.sin(b * 0.4 + phase * 3) * 0.5 + 0.5
            : 0.1;
          const energy = Math.min(1, baseEnergy * (1 - ratio * 0.5) + resonancePeak * 0.7);

          const barHeight = Math.max(4, energy * (height * 0.75));
          const y = height - barHeight;

          // Color gradient from warm amber (lows) to lavender violet (highs)
          ctx.fillStyle = b < 16
            ? `rgba(255, 185, 95, ${0.4 + energy * 0.6})`
            : `rgba(208, 188, 255, ${0.4 + energy * 0.6})`;

          ctx.fillRect(x, y, barWidth, barHeight);

          // Top peak led
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(x, y - 2, barWidth, 1.5);
        }
      } else if (mode === 'lissajous') {
        // Harmonic Lissajous Orbit Curve (Phase Visualizer)
        const centerX = width / 2;
        const centerY = height / 2;
        const radius = Math.min(width, height) * 0.38;

        ctx.lineWidth = 2;
        ctx.strokeStyle = isPlaying ? '#ffb95f' : '#958ea0';
        ctx.beginPath();

        const samples = 360;
        const freqX = 3;
        const freqY = 4;
        const delta = phase;

        for (let s = 0; s <= samples; s++) {
          const t = (s / samples) * Math.PI * 2;
          const x = centerX + Math.sin(freqX * t + delta) * radius;
          const y = centerY + Math.sin(freqY * t) * radius;

          if (s === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();

        // Inner glowing core
        ctx.fillStyle = isPlaying ? 'rgba(208, 188, 255, 0.15)' : 'transparent';
        ctx.fill();
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      isRunning = false;
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [mode, isPlaying, filterCutoff, filterResonance]);

  return (
    <div className="bg-[#191b24] border border-[#33343e] rounded-xl p-4 flex flex-col gap-4 font-sans text-[#e2e1ee]">
      {/* Header & Mode Switcher */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#d0bcff] animate-pulse"></span>
          <span className="font-mono text-xs text-[#d0bcff] font-bold uppercase tracking-wider">
            Web Audio Lab • Real-Time Analyser
          </span>
        </div>

        {/* Visualizer Mode Tabs */}
        <div className="flex items-center gap-1 bg-[#11131b] p-1 rounded-lg border border-[#33343e]">
          {(
            [
              { id: 'oscilloscope' as VisualizerMode, label: 'Oscilloscope', icon: 'graphic_eq' },
              { id: 'spectrum' as VisualizerMode, label: 'Spectrum', icon: 'equalizer' },
              { id: 'lissajous' as VisualizerMode, label: 'Phase Orbit', icon: 'all_inclusive' },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setMode(tab.id)}
              aria-pressed={mode === tab.id}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono transition-all ${
                mode === tab.id
                  ? 'bg-[#282a32] text-[#d0bcff] font-bold shadow-sm'
                  : 'text-[#958ea0] hover:text-[#e2e1ee]'
              }`}
            >
              <span className="material-symbols-outlined text-xs">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Real-time Canvas */}
      <div className="relative w-full h-40 bg-[#11131b] rounded-lg overflow-hidden border border-[#33343e]">
        <canvas
          ref={canvasRef}
          width={640}
          height={160}
          className="w-full h-full block"
        />
        <div className="absolute top-2 right-3 font-mono text-[10px] text-[#958ea0] bg-[#11131b]/80 px-2 py-0.5 rounded border border-[#33343e]">
          {isPlaying ? 'ENGINE ACTIVE • 60 FPS' : 'STANDBY • TAPE PAUSED'}
        </div>
        <div className="absolute bottom-2 left-3 font-mono text-[10px] text-[#ffb95f] bg-[#11131b]/80 px-2 py-0.5 rounded border border-[#33343e]">
          {currentPreset.key} • {currentPreset.name}
        </div>
      </div>

      {/* Harmonic Drone Preset Selector */}
      <div>
        <label className="text-[10px] font-mono uppercase tracking-widest text-[#958ea0] block mb-2">
          Harmonic Drone Matrix Preset
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {HARMONIC_PRESETS.map((preset) => {
            const isSelected = preset.id === selectedPresetId;
            return (
              <button
                key={preset.id}
                onClick={() => handleSelectPreset(preset)}
                className={`text-left p-2.5 rounded-lg border transition-all ${
                  isSelected
                    ? 'bg-[#282a32] border-[#d0bcff] text-white shadow-md'
                    : 'bg-[#11131b] border-[#33343e] text-[#cbc3d7] hover:border-[#494454]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-syne font-bold">{preset.name}</span>
                  <span className="text-[10px] font-mono text-[#ffb95f] font-bold">{preset.key}</span>
                </div>
                <p className="text-[11px] text-[#958ea0] leading-tight line-clamp-2">
                  {preset.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Interactive Synthesizer Sliders: Cutoff & Resonance */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#33343e]/50">
        <div>
          <div className="flex justify-between items-center text-xs font-mono mb-1.5">
            <span className="text-[#958ea0]">Biquad Lowpass Cutoff</span>
            <span className="text-[#d0bcff] font-bold">{filterCutoff} Hz</span>
          </div>
          <input
            type="range"
            min={200}
            max={8000}
            step={50}
            value={filterCutoff}
            onChange={handleCutoffChange}
            aria-label="Lowpass filter cutoff frequency"
            className="w-full h-1.5 bg-[#11131b] rounded-lg appearance-none cursor-pointer accent-[#d0bcff]"
          />
        </div>

        <div>
          <div className="flex justify-between items-center text-xs font-mono mb-1.5">
            <span className="text-[#958ea0]">Harmonic Resonance (Q)</span>
            <span className="text-[#ffb95f] font-bold">{filterResonance.toFixed(1)}</span>
          </div>
          <input
            type="range"
            min={0.5}
            max={6.0}
            step={0.1}
            value={filterResonance}
            onChange={handleResonanceChange}
            aria-label="Harmonic filter resonance"
            className="w-full h-1.5 bg-[#11131b] rounded-lg appearance-none cursor-pointer accent-[#ffb95f]"
          />
        </div>
      </div>
    </div>
  );
};
