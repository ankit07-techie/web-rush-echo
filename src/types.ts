export type ViewTab =
  | 'home'
  | 'my-story'
  | 'timeline'
  | 'artists-and-songs'
  | 'patterns'
  | 'connection-explorer';

export interface MusicalEra {
  id: string;
  title: string;
  subtitle: string;
  timeframe: string;
  yearRange: string;
  primaryGenre: string;
  dominantMood: string;
  totalHours: number;
  trackCount: number;
  topTrack: string;
  topArtist: string;
  bgGradient: string;
  accentColor: string;
  description: string;
  signatureLyrics?: string;
  tags: string[];
}

export interface SongRecord {
  id: string;
  rank: number;
  title: string;
  artist: string;
  album: string;
  year: number;
  plays: number;
  listeningHours: number;
  firstPlayed: string;
  lastPlayed: string;
  peakHour: string;
  repeatRatio: string;
  dominantMood: string;
  bpm: number;
  category: 'Top 100' | 'Forgotten Gems' | 'Late Night' | 'Autumn' | 'Ambient';
  albumCover: string;
  receiptLog: {
    timestamp: string;
    device: string;
    duration: string;
    context: string;
  }[];
}

export interface ArtistRecord {
  id: string;
  rank: number;
  name: string;
  genre: string;
  totalPlays: number;
  hoursListened: number;
  sharePercentage: number;
  firstDiscovered: string;
  topTracks: string[];
  bio: string;
  avatarUrl: string;
  seasonality: number[]; // 12 months array 0-100
}

export interface ChapterData {
  id: string;
  number: string;
  title: string;
  timeframe: string;
  status: 'active' | 'archived';
  quote: string;
  summary: string;
  dominantGenre: string;
  topTrack: {
    title: string;
    artist: string;
    plays: number;
  };
  streakDays: number;
  peakSession: string;
  hourlyDistribution: number[]; // 24 hours distribution 0-100
  eraAnchors: {
    title: string;
    artist: string;
    type: 'Album' | 'Single' | 'EP';
    year: string;
    plays: number;
    color: string;
  }[];
  receiptItems: {
    item: string;
    subtext: string;
    metric: string;
  }[];
}

export interface TimelineMilestone {
  id: string;
  dateKey: string;
  dateLabel: string;
  title: string;
  description: string;
  tag: string;
  artist: string;
  track: string;
  plays: number;
  hours: number;
  peakVibe: string;
  receiptNumber: string;
  logs: {
    time: string;
    event: string;
    duration: string;
  }[];
}

export interface GraphNode {
  id: string;
  label: string;
  type: 'artist' | 'song' | 'era' | 'habit';
  x: number;
  y: number;
  size: number;
  color: string;
  subtitle: string;
  plays: number;
  connectionCount: number;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  weight: number;
  relationship: string;
  affinity: number; // percentage
}
