import { SongRecord } from '../types';
import { USER_ARCHIVE_META } from '../data/mockData';

/**
 * Generates a SHA-256 style deterministic verification checksum string for archival records.
 */
export function generateTelemetryChecksum(recordCount: number, totalHours: number): string {
  const seed = `${recordCount}:${totalHours}:${USER_ARCHIVE_META.archiveId}`;
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }
  const hex = Math.abs(hash).toString(16).padStart(8, '0').toUpperCase();
  return `0x${hex}ECHO`;
}

/**
 * Triggers a client-side file download using a Blob and temporary anchor element.
 */
export function downloadFile(content: string, filename: string, mimeType: string): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Formats track records into standard CSV format suitable for spreadsheets.
 */
export function exportTracksToCsv(tracks: SongRecord[]): string {
  const headers = [
    'Rank',
    'Track Title',
    'Artist',
    'Album',
    'Year',
    'Plays',
    'Listening Hours',
    'BPM',
    'Dominant Mood',
    'Category',
    'First Logged',
    'Last Played',
  ];

  const escapeCsv = (str: string | number) => {
    const val = String(str ?? '').replace(/"/g, '""');
    return `"${val}"`;
  };

  const rows = tracks.map((t) => [
    t.rank,
    escapeCsv(t.title),
    escapeCsv(t.artist),
    escapeCsv(t.album),
    t.year,
    t.plays,
    t.listeningHours,
    t.bpm,
    escapeCsv(t.dominantMood),
    escapeCsv(t.category),
    escapeCsv(t.firstPlayed),
    escapeCsv(t.lastPlayed),
  ].join(','));

  return [headers.join(','), ...rows].join('\r\n');
}

/**
 * Exports complete JSON telemetry ledger package with metadata and verification hash.
 */
export function exportArchiveToJson(tracks: SongRecord[]): string {
  const totalHours = tracks.reduce((acc, t) => acc + t.listeningHours, 0);
  const payload = {
    archiveSchemaVersion: '3.1.0',
    exportedAt: new Date().toISOString(),
    telemetryChecksum: generateTelemetryChecksum(tracks.length, totalHours),
    metadata: {
      archiveId: USER_ARCHIVE_META.archiveId,
      archivist: USER_ARCHIVE_META.name,
      auditDate: USER_ARCHIVE_META.auditDate,
      totalTracks: tracks.length,
      calculatedHours: Number(totalHours.toFixed(1)),
      platform: 'ECHOES Forensics Engine v3.1',
    },
    trackLedger: tracks,
  };

  return JSON.stringify(payload, null, 2);
}
