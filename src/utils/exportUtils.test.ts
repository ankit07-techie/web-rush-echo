import { test } from 'node:test';
import assert from 'node:assert/strict';
import { generateTelemetryChecksum, exportTracksToCsv, exportArchiveToJson } from './exportUtils';
import { SongRecord } from '../types';

const mockTracks: SongRecord[] = [
  {
    id: 'track-1',
    rank: 1,
    title: 'Kyoto',
    artist: 'Phoebe Bridgers',
    album: 'Punisher',
    year: 2020,
    plays: 342,
    listeningHours: 19.4,
    firstPlayed: 'June 2020',
    lastPlayed: 'Yesterday',
    peakHour: '23:00',
    repeatRatio: '4.2x',
    dominantMood: 'Wistful Melancholy',
    bpm: 118,
    category: 'Top 100',
    albumCover: 'https://example.com/cover.jpg',
    receiptLog: [],
  },
  {
    id: 'track-2',
    rank: 2,
    title: 'Holocene',
    artist: 'Bon Iver',
    album: 'Bon Iver',
    year: 2011,
    plays: 318,
    listeningHours: 28.6,
    firstPlayed: 'Oct 2018',
    lastPlayed: '3 days ago',
    peakHour: '02:00',
    repeatRatio: '5.1x',
    dominantMood: 'Cathartic Ambient',
    bpm: 72,
    category: 'Late Night',
    albumCover: 'https://example.com/cover2.jpg',
    receiptLog: [],
  },
];

test('generateTelemetryChecksum returns deterministic hex string', () => {
  const hash1 = generateTelemetryChecksum(2, 48.0);
  const hash2 = generateTelemetryChecksum(2, 48.0);
  assert.equal(hash1, hash2);
  assert.ok(hash1.startsWith('0x'));
  assert.ok(hash1.endsWith('ECHO'));
});

test('exportTracksToCsv generates valid CSV structure with escaped titles', () => {
  const csv = exportTracksToCsv(mockTracks);
  const lines = csv.split('\r\n');
  assert.equal(lines.length, 3);
  assert.ok(lines[0].includes('Track Title,Artist,Album'));
  assert.ok(lines[1].includes('"Kyoto","Phoebe Bridgers"'));
  assert.ok(lines[2].includes('"Holocene","Bon Iver"'));
});

test('exportArchiveToJson produces parseable JSON with metadata and checksum', () => {
  const jsonStr = exportArchiveToJson(mockTracks);
  const parsed = JSON.parse(jsonStr);
  assert.equal(parsed.archiveSchemaVersion, '3.1.0');
  assert.equal(parsed.trackLedger.length, 2);
  assert.ok(parsed.telemetryChecksum);
  assert.equal(parsed.metadata.totalTracks, 2);
});
