import React, { useState } from 'react';
import { GRAPH_NODES, GRAPH_EDGES } from '../data/mockData';
import { GraphNode, GraphEdge } from '../types';

interface ConnectionExplorerViewProps {
  onOpenReceipt: (title?: string) => void;
  onPlaySong: (title: string, artist: string) => void;
}

export const ConnectionExplorerView: React.FC<ConnectionExplorerViewProps> = ({
  onOpenReceipt,
  onPlaySong
}) => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>('node-bon-iver');
  const [selectedEdgeId, setSelectedEdgeId] = useState<string | null>('e1');
  const [filterType, setFilterType] = useState<string>('all');
  const [viewStyle, setViewStyle] = useState<'constellation' | 'ring' | 'chord'>('constellation');

  const selectedNode = GRAPH_NODES.find((n) => n.id === selectedNodeId) || GRAPH_NODES[0];
  const selectedEdge = GRAPH_EDGES.find((e) => e.id === selectedEdgeId) || GRAPH_EDGES[0];

  const filteredNodes = GRAPH_NODES.filter((n) => {
    if (filterType === 'all') return true;
    if (filterType === 'artist') return n.type === 'artist';
    if (filterType === 'song') return n.type === 'song';
    if (filterType === 'era') return n.type === 'era';
    if (filterType === 'habit') return n.type === 'habit';
    return true;
  });

  const nodeMap = new Map(GRAPH_NODES.map((n) => [n.id, n]));

  return (
    <div id="connection-explorer-view" className="p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      {/* 1. Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#33343e]/50 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#d0bcff]">hub</span>
            <h2 className="font-syne font-black text-2xl text-[#e2e1ee] uppercase tracking-wide">
              NEURAL TAPESTRY OF TIME
            </h2>
          </div>
          <p className="font-mono text-xs text-[#958ea0] mt-0.5">
            Constellation of Subconscious Sonic Influences, Bridges & Repetition Vectors
          </p>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-1 bg-[#191b24] p-1 rounded-xl border border-[#33343e]">
          <button
            onClick={() => setViewStyle('constellation')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
              viewStyle === 'constellation'
                ? 'bg-[#3c0091] text-[#d0bcff] font-bold'
                : 'text-[#958ea0] hover:text-[#e2e1ee]'
            }`}
          >
            Constellation
          </button>
          <button
            onClick={() => setViewStyle('ring')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
              viewStyle === 'ring'
                ? 'bg-[#3c0091] text-[#d0bcff] font-bold'
                : 'text-[#958ea0] hover:text-[#e2e1ee]'
            }`}
          >
            Era Rings
          </button>
          <button
            onClick={() => setViewStyle('chord')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
              viewStyle === 'chord'
                ? 'bg-[#3c0091] text-[#d0bcff] font-bold'
                : 'text-[#958ea0] hover:text-[#e2e1ee]'
            }`}
          >
            Chord Flow
          </button>
        </div>
      </div>

      {/* 2. Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <span className="font-mono text-[10px] text-[#958ea0] uppercase tracking-wider shrink-0 mr-1">
          Node Filter:
        </span>
        {[
          { id: 'all', label: 'All Nodes (16)' },
          { id: 'artist', label: 'Artists (6)' },
          { id: 'song', label: 'Signature Tracks (6)' },
          { id: 'era', label: 'Era Anchors (2)' },
          { id: 'habit', label: 'Circadian Habits (1)' },
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setFilterType(f.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap transition-colors ${
              filterType === f.id
                ? 'bg-[#d0bcff] text-[#3c0091] font-bold shadow-sm'
                : 'bg-[#191b24] text-[#958ea0] border border-[#33343e] hover:text-[#e2e1ee]'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* 3. Interactive SVG Graph & Inspector Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left 8 Cols: Full Constellation SVG Canvas */}
        <div className="lg:col-span-8 bg-[#191b24] rounded-2xl border border-[#33343e]/60 p-4 sm:p-6 relative overflow-hidden shadow-2xl min-h-[520px] flex flex-col justify-between">
          <div className="flex items-center justify-between text-[11px] font-mono text-[#958ea0] mb-2 z-10">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#d0bcff] animate-ping"></span>
              LIVE NEURAL FORCE GRAPH
            </span>
            <span>CLICK ANY NODE OR VECTOR</span>
          </div>

          {/* SVG Canvas */}
          <div className="relative w-full h-[460px] select-none">
            <svg
              className="w-full h-full"
              viewBox="100 40 750 480"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#d0bcff" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#d0bcff" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Edge Vectors */}
              {GRAPH_EDGES.map((edge) => {
                const source = nodeMap.get(edge.source);
                const target = nodeMap.get(edge.target);
                if (!source || !target) return null;

                const isEdgeSelected = selectedEdgeId === edge.id;
                const isNodeConnected =
                  selectedNodeId === edge.source || selectedNodeId === edge.target;

                return (
                  <g key={edge.id} className="cursor-pointer" onClick={() => setSelectedEdgeId(edge.id)}>
                    <line
                      x1={source.x}
                      y1={source.y}
                      x2={target.x}
                      y2={target.y}
                      stroke={
                        isEdgeSelected
                          ? '#ffb95f'
                          : isNodeConnected
                          ? '#d0bcff'
                          : '#33343e'
                      }
                      strokeWidth={isEdgeSelected ? 3 : isNodeConnected ? 2 : 1}
                      strokeDasharray={isEdgeSelected ? 'none' : '4 4'}
                      className="transition-all duration-300 hover:stroke-[#ffb95f]"
                    />
                  </g>
                );
              })}

              {/* Graph Nodes */}
              {filteredNodes.map((node) => {
                const isSelected = selectedNodeId === node.id;
                return (
                  <g
                    key={node.id}
                    className="cursor-pointer group"
                    transform={`translate(${node.x}, ${node.y})`}
                    onClick={() => {
                      setSelectedNodeId(node.id);
                      // find related edge if available
                      const relEdge = GRAPH_EDGES.find(
                        (e) => e.source === node.id || e.target === node.id
                      );
                      if (relEdge) setSelectedEdgeId(relEdge.id);
                    }}
                  >
                    {/* Glowing halo for selected */}
                    {isSelected && (
                      <circle r={node.size + 14} fill="url(#nodeGlow)" className="animate-pulse" />
                    )}

                    {/* Main Node Circle */}
                    <circle
                      r={node.size}
                      fill={node.color}
                      stroke={isSelected ? '#ffffff' : '#11131b'}
                      strokeWidth={isSelected ? 3 : 2}
                      className="transition-all duration-200 group-hover:scale-110"
                    />

                    {/* Node Label */}
                    <text
                      y={node.size + 14}
                      fill={isSelected ? '#ffffff' : '#e2e1ee'}
                      fontSize="11"
                      fontWeight={isSelected ? 'bold' : 'normal'}
                      fontFamily="Syne"
                      textAnchor="middle"
                      className="select-none pointer-events-none drop-shadow"
                    >
                      {node.label}
                    </text>

                    <text
                      y={node.size + 25}
                      fill="#958ea0"
                      fontSize="9"
                      fontFamily="JetBrains Mono"
                      textAnchor="middle"
                      className="select-none pointer-events-none"
                    >
                      {node.plays} plays
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="flex items-center justify-between border-t border-[#33343e]/40 pt-3 text-[10px] font-mono text-[#958ea0]">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ffb95f]"></span> Folk Chamber
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#d0bcff]"></span> Nocturnal Sadcore
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#cebdff]"></span> Electronic UKG
              </span>
            </div>
            <span>AFFINITY MATRIX: 94.2%</span>
          </div>
        </div>

        {/* Right 4 Cols: Inspector Panel */}
        <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-20">
          {/* Node Dossier Card */}
          <div className="bg-[#191b24] rounded-2xl border border-[#33343e]/60 p-6 space-y-5 shadow-xl">
            <div className="border-b border-[#33343e] pb-3">
              <span className="font-mono text-[9px] uppercase px-2 py-0.5 rounded bg-[#3c0091] text-[#d0bcff] font-bold">
                NODE TELEMETRY INSPECTOR
              </span>
              <h3 className="font-syne font-bold text-xl text-[#e2e1ee] mt-1.5">
                {selectedNode.label}
              </h3>
              <p className="font-mono text-xs text-[#958ea0]">
                {selectedNode.subtitle} • {selectedNode.plays} Plays
              </p>
            </div>

            {/* Selected Vector / Relationship */}
            {selectedEdge && (
              <div className="p-4 rounded-xl bg-[#11131b] border border-[#494454] space-y-2 font-mono text-xs">
                <div className="flex justify-between items-center text-[10px] text-[#ffb95f]">
                  <span className="font-bold">SHARED AFFINITY VECTOR</span>
                  <span>{selectedEdge.affinity}% MATCH</span>
                </div>
                <div className="text-sm font-semibold text-[#e2e1ee]">
                  {selectedEdge.relationship}
                </div>
                <div className="w-full bg-[#282a32] h-1.5 rounded-full overflow-hidden mt-1">
                  <div
                    className="bg-gradient-to-r from-[#d0bcff] to-[#ffb95f] h-full"
                    style={{ width: `${selectedEdge.affinity}%` }}
                  ></div>
                </div>
              </div>
            )}

            {/* Thermal Receipt Evidence Strip */}
            <div className="p-4 rounded-xl bg-[#11131b] border border-[#33343e] font-mono text-xs space-y-2">
              <div className="flex justify-between text-[10px] text-[#958ea0] border-b border-[#33343e] pb-1">
                <span>ARCHIVAL RECEIPT EVIDENCE</span>
                <span className="text-[#ffb95f]">AUDITED</span>
              </div>
              <div className="space-y-1 text-[11px] text-[#cbc3d7]">
                <div className="flex justify-between">
                  <span>CONNECTION DEGREE:</span>
                  <span className="font-bold text-[#e2e1ee]">{selectedNode.connectionCount} Bridges</span>
                </div>
                <div className="flex justify-between">
                  <span>LATE NIGHT CORRELATION:</span>
                  <span className="font-bold text-[#d0bcff]">02:14 AM Peak</span>
                </div>
                <div className="flex justify-between">
                  <span>AUDIO RESISTANCE:</span>
                  <span className="font-bold text-emerald-400">0.02 Ω Low Friction</span>
                </div>
              </div>

              <div className="pt-2 text-center">
                <div className="font-mono text-xs tracking-widest text-[#958ea0]">
                  |||| | ||||| || |||||| |
                </div>
                <span className="text-[8px] text-[#958ea0] uppercase">
                  #TAPESTRY-NODE-{selectedNode.id.toUpperCase()}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2 pt-1">
              <button
                onClick={() => onPlaySong(selectedNode.label, 'Archive Recording')}
                className="w-full py-2.5 rounded-xl bg-[#3c0091] hover:bg-[#4f319c] text-[#d0bcff] font-syne font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-md"
              >
                <span className="material-symbols-outlined text-sm">play_arrow</span>
                REPLAY LINKED AUDIO
              </button>

              <button
                onClick={() => onOpenReceipt(selectedNode.label)}
                className="w-full py-2.5 rounded-xl bg-[#282a32] hover:bg-[#33343e] text-[#e2e1ee] font-syne font-bold text-xs uppercase tracking-wider border border-[#494454] transition-colors flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-sm">receipt_long</span>
                GENERATE NODE RECEIPT
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
