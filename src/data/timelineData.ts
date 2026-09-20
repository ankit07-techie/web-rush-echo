export interface MonthTelemetry {
  month: string;
  season: 'WINTER' | 'SPRING' | 'SUMMER' | 'AUTUMN';
  amplitude: number; // 15 to 95
  bpm: number;
  plays: number;
  hours: number;
  topTrack: string;
  topArtist: string;
  spike?: {
    title: string;
    detail: string;
    bpm?: number;
    color?: string;
  };
}

export interface YearTelemetry {
  year: string;
  eraName: string;
  subEra: string;
  totalPlays: string;
  totalHours: string;
  meanBpm: number;
  dominantMood: string;
  topTrackAnchor: string;
  topArtistAnchor: string;
  months: MonthTelemetry[];
  seasonBreakdown: {
    WINTER: { plays: number; hours: number; bpm: number; mood: string; topTrack: string; topArtist: string };
    SPRING: { plays: number; hours: number; bpm: number; mood: string; topTrack: string; topArtist: string };
    SUMMER: { plays: number; hours: number; bpm: number; mood: string; topTrack: string; topArtist: string };
    AUTUMN: { plays: number; hours: number; bpm: number; mood: string; topTrack: string; topArtist: string };
  };
}

export const TIMELINE_YEAR_DATA: Record<string, YearTelemetry> = {
  'ALL': {
    year: 'ALL',
    eraName: 'Longitudinal Resonance (5.8-Year Arc)',
    subEra: 'From Nocturnal Synthwave to Ambient String Minimalism',
    totalPlays: '14,820',
    totalHours: '1,194',
    meanBpm: 102,
    dominantMood: 'Multi-Phase Emotional Drift',
    topTrackAnchor: 'Holocene & Kyoto & Rumble',
    topArtistAnchor: 'Phoebe Bridgers & Fred again..',
    months: [
      { month: 'JAN', season: 'WINTER', amplitude: 52, bpm: 78, plays: 1040, hours: 82, topTrack: 'On The Nature of Daylight', topArtist: 'Max Richter', spike: { title: 'Ambient Focus Pivot', detail: 'Jan Solstice (66-78 BPM)', color: '#d0bcff' } },
      { month: 'FEB', season: 'WINTER', amplitude: 44, bpm: 84, plays: 920, hours: 74, topTrack: 'Danielle (smile on my face)', topArtist: 'Fred again..' },
      { month: 'MAR', season: 'SPRING', amplitude: 58, bpm: 92, plays: 1120, hours: 89, topTrack: 'Spring 1', topArtist: 'Max Richter' },
      { month: 'APR', season: 'SPRING', amplitude: 65, bpm: 82, plays: 1280, hours: 102, topTrack: 'Holocene', topArtist: 'Bon Iver', spike: { title: 'Timber Recovery', detail: 'Acoustic Solstice (82 BPM)', color: '#ffb95f' } },
      { month: 'MAY', season: 'SPRING', amplitude: 60, bpm: 105, plays: 1190, hours: 96, topTrack: 'Motion Sickness', topArtist: 'Phoebe Bridgers' },
      { month: 'JUN', season: 'SUMMER', amplitude: 78, bpm: 120, plays: 1460, hours: 118, topTrack: 'Kyoto', topArtist: 'Phoebe Bridgers' },
      { month: 'JUL', season: 'SUMMER', amplitude: 85, bpm: 132, plays: 1620, hours: 132, topTrack: 'Glue', topArtist: 'Bicep' },
      { month: 'AUG', season: 'SUMMER', amplitude: 95, bpm: 140, plays: 1890, hours: 154, topTrack: 'Rumble', topArtist: 'Fred again..', spike: { title: 'Kinetic Peak Surge', detail: 'Fred again.. Summer (140 BPM)', color: '#ffb4ab' } },
      { month: 'SEP', season: 'AUTUMN', amplitude: 72, bpm: 112, plays: 1380, hours: 110, topTrack: 'Sunset', topArtist: 'The Midnight' },
      { month: 'OCT', season: 'AUTUMN', amplitude: 90, bpm: 98, plays: 1740, hours: 142, topTrack: 'Blood Bank', topArtist: 'Bon Iver', spike: { title: 'Sadcore Autumn Loop', detail: '32-Day Streak Peak', color: '#ffb95f' } },
      { month: 'NOV', season: 'AUTUMN', amplitude: 68, bpm: 88, plays: 1240, hours: 98, topTrack: 'I Know The End', topArtist: 'Phoebe Bridgers' },
      { month: 'DEC', season: 'WINTER', amplitude: 50, bpm: 80, plays: 940, hours: 77, topTrack: 'Mercy', topArtist: 'Max Richter' },
    ],
    seasonBreakdown: {
      WINTER: { plays: 2900, hours: 233, bpm: 81, mood: 'Contemplative Solitude', topTrack: 'On The Nature of Daylight', topArtist: 'Max Richter' },
      SPRING: { plays: 3590, hours: 287, bpm: 93, mood: 'Awakening & Timber', topTrack: 'Holocene', topArtist: 'Bon Iver' },
      SUMMER: { plays: 4970, hours: 404, bpm: 131, mood: 'High-Velocity Kinetic', topTrack: 'Rumble', topArtist: 'Fred again..' },
      AUTUMN: { plays: 4360, hours: 350, bpm: 99, mood: 'Melancholic Catharsis', topTrack: 'Kyoto', topArtist: 'Phoebe Bridgers' },
    }
  },
  '2019': {
    year: '2019',
    eraName: 'Genesis & Nocturnal Synthwave',
    subEra: 'Early Telemetry Logging & Neon Retrospective Discoveries',
    totalPlays: '1,240',
    totalHours: '96.5',
    meanBpm: 108,
    dominantMood: 'Neon Retrospective',
    topTrackAnchor: 'Sunset',
    topArtistAnchor: 'The Midnight',
    months: [
      { month: 'JAN', season: 'WINTER', amplitude: 18, bpm: 95, plays: 45, hours: 3.5, topTrack: 'Days of Thunder', topArtist: 'The Midnight' },
      { month: 'FEB', season: 'WINTER', amplitude: 22, bpm: 96, plays: 52, hours: 4.1, topTrack: 'Vampires', topArtist: 'The Midnight' },
      { month: 'MAR', season: 'SPRING', amplitude: 25, bpm: 98, plays: 60, hours: 4.8, topTrack: 'Sunset', topArtist: 'The Midnight' },
      { month: 'APR', season: 'SPRING', amplitude: 30, bpm: 102, plays: 72, hours: 5.6, topTrack: 'Jason', topArtist: 'The Midnight' },
      { month: 'MAY', season: 'SPRING', amplitude: 38, bpm: 105, plays: 88, hours: 6.9, topTrack: 'Sunset', topArtist: 'The Midnight' },
      { month: 'JUN', season: 'SUMMER', amplitude: 50, bpm: 110, plays: 115, hours: 9.0, topTrack: 'Los Angeles', topArtist: 'The Midnight' },
      { month: 'JUL', season: 'SUMMER', amplitude: 62, bpm: 112, plays: 140, hours: 10.8, topTrack: 'Endless Summer', topArtist: 'The Midnight' },
      { month: 'AUG', season: 'SUMMER', amplitude: 70, bpm: 114, plays: 165, hours: 12.8, topTrack: 'Days of Thunder', topArtist: 'The Midnight' },
      { month: 'SEP', season: 'AUTUMN', amplitude: 92, bpm: 108, plays: 220, hours: 17.2, topTrack: 'Sunset', topArtist: 'The Midnight', spike: { title: 'Genesis Synthwave Surge', detail: 'First Analog Loop (108 BPM)', color: '#ffb95f' } },
      { month: 'OCT', season: 'AUTUMN', amplitude: 85, bpm: 106, plays: 195, hours: 15.3, topTrack: 'Sunset', topArtist: 'The Midnight' },
      { month: 'NOV', season: 'AUTUMN', amplitude: 55, bpm: 100, plays: 118, hours: 9.2, topTrack: 'Gloria', topArtist: 'The Midnight' },
      { month: 'DEC', season: 'WINTER', amplitude: 35, bpm: 94, plays: 70, hours: 5.5, topTrack: 'Crystalline', topArtist: 'The Midnight' },
    ],
    seasonBreakdown: {
      WINTER: { plays: 167, hours: 13.1, bpm: 95, mood: 'Quiet Genesis', topTrack: 'Days of Thunder', topArtist: 'The Midnight' },
      SPRING: { plays: 220, hours: 17.3, bpm: 102, mood: 'Budding Neon', topTrack: 'Sunset', topArtist: 'The Midnight' },
      SUMMER: { plays: 420, hours: 32.6, bpm: 112, mood: 'Endless Highway', topTrack: 'Days of Thunder', topArtist: 'The Midnight' },
      AUTUMN: { plays: 533, hours: 41.7, bpm: 105, mood: 'Peak Retropop Surge', topTrack: 'Sunset', topArtist: 'The Midnight' },
    }
  },
  '2020': {
    year: '2020',
    eraName: 'Introspective Isolation & Sadcore',
    subEra: 'Punisher Release & Deep Nocturnal Quarantine Loops',
    totalPlays: '2,810',
    totalHours: '218.4',
    meanBpm: 88,
    dominantMood: 'Melancholy Quarantine',
    topTrackAnchor: 'Kyoto & Motion Sickness',
    topArtistAnchor: 'Phoebe Bridgers',
    months: [
      { month: 'JAN', season: 'WINTER', amplitude: 35, bpm: 92, plays: 130, hours: 10.2, topTrack: 'Motion Sickness', topArtist: 'Phoebe Bridgers' },
      { month: 'FEB', season: 'WINTER', amplitude: 40, bpm: 90, plays: 155, hours: 12.1, topTrack: 'Smoke Signals', topArtist: 'Phoebe Bridgers' },
      { month: 'MAR', season: 'SPRING', amplitude: 60, bpm: 85, plays: 230, hours: 18.0, topTrack: 'Garden Song', topArtist: 'Phoebe Bridgers' },
      { month: 'APR', season: 'SPRING', amplitude: 72, bpm: 86, plays: 275, hours: 21.4, topTrack: 'Kyoto (Acoustic)', topArtist: 'Phoebe Bridgers' },
      { month: 'MAY', season: 'SPRING', amplitude: 80, bpm: 88, plays: 310, hours: 24.2, topTrack: 'I See You', topArtist: 'Phoebe Bridgers' },
      { month: 'JUN', season: 'SUMMER', amplitude: 95, bpm: 90, plays: 380, hours: 29.8, topTrack: 'Kyoto', topArtist: 'Phoebe Bridgers', spike: { title: 'Punisher Solstice Drop', detail: 'Album Loop #38 (90 BPM)', color: '#ffb4ab' } },
      { month: 'JUL', season: 'SUMMER', amplitude: 92, bpm: 86, plays: 360, hours: 28.1, topTrack: 'Motion Sickness', topArtist: 'Phoebe Bridgers' },
      { month: 'AUG', season: 'SUMMER', amplitude: 82, bpm: 84, plays: 315, hours: 24.5, topTrack: 'Moon Song', topArtist: 'Phoebe Bridgers' },
      { month: 'SEP', season: 'AUTUMN', amplitude: 75, bpm: 85, plays: 280, hours: 21.8, topTrack: 'Chinese Satellite', topArtist: 'Phoebe Bridgers' },
      { month: 'OCT', season: 'AUTUMN', amplitude: 88, bpm: 88, plays: 340, hours: 26.5, topTrack: 'I Know The End', topArtist: 'Phoebe Bridgers', spike: { title: 'Midnight Scream Loop', detail: 'Oct Twilight (88 BPM)', color: '#ffb95f' } },
      { month: 'NOV', season: 'AUTUMN', amplitude: 65, bpm: 82, plays: 240, hours: 18.7, topTrack: 'Graceland Too', topArtist: 'Phoebe Bridgers' },
      { month: 'DEC', season: 'WINTER', amplitude: 45, bpm: 78, plays: 175, hours: 13.6, topTrack: 'Savior Complex', topArtist: 'Phoebe Bridgers' },
    ],
    seasonBreakdown: {
      WINTER: { plays: 460, hours: 35.9, bpm: 87, mood: 'Winter Stillness', topTrack: 'Motion Sickness', topArtist: 'Phoebe Bridgers' },
      SPRING: { plays: 815, hours: 63.6, bpm: 86, mood: 'Quarantine Introspection', topTrack: 'Kyoto', topArtist: 'Phoebe Bridgers' },
      SUMMER: { plays: 1055, hours: 82.4, bpm: 87, mood: 'Peak Sadcore Euphoria', topTrack: 'Kyoto', topArtist: 'Phoebe Bridgers' },
      AUTUMN: { plays: 860, hours: 67.0, bpm: 85, mood: 'Autumn Catharsis', topTrack: 'I Know The End', topArtist: 'Phoebe Bridgers' },
    }
  },
  '2021': {
    year: '2021',
    eraName: 'Chamber Folk & Deep Architecture',
    subEra: 'Bon Iver Timber Resurgence & Minimalist String Quests',
    totalPlays: '3,420',
    totalHours: '264.8',
    meanBpm: 74,
    dominantMood: 'Sublime Acoustic Reflection',
    topTrackAnchor: 'Holocene & Daylight',
    topArtistAnchor: 'Bon Iver & Max Richter',
    months: [
      { month: 'JAN', season: 'WINTER', amplitude: 88, bpm: 66, plays: 360, hours: 28.5, topTrack: 'On The Nature of Daylight', topArtist: 'Max Richter', spike: { title: 'Max Richter Discovery', detail: 'Deep Focus (66 BPM)', color: '#d0bcff' } },
      { month: 'FEB', season: 'WINTER', amplitude: 78, bpm: 68, plays: 310, hours: 24.2, topTrack: 'Spring 1', topArtist: 'Max Richter' },
      { month: 'MAR', season: 'SPRING', amplitude: 84, bpm: 72, plays: 340, hours: 26.5, topTrack: 'Perth', topArtist: 'Bon Iver' },
      { month: 'APR', season: 'SPRING', amplitude: 95, bpm: 74, plays: 390, hours: 30.5, topTrack: 'Holocene', topArtist: 'Bon Iver', spike: { title: 'Spring Timber Solstice', detail: 'Acoustic Recovery (74 BPM)', color: '#ffb95f' } },
      { month: 'MAY', season: 'SPRING', amplitude: 70, bpm: 76, plays: 280, hours: 21.8, topTrack: 'Towers', topArtist: 'Bon Iver' },
      { month: 'JUN', season: 'SUMMER', amplitude: 55, bpm: 85, plays: 220, hours: 17.0, topTrack: 'Michicant', topArtist: 'Bon Iver' },
      { month: 'JUL', season: 'SUMMER', amplitude: 60, bpm: 98, plays: 240, hours: 18.5, topTrack: 'Calgary', topArtist: 'Bon Iver' },
      { month: 'AUG', season: 'SUMMER', amplitude: 82, bpm: 130, plays: 330, hours: 25.2, topTrack: 'Glue', topArtist: 'Bicep', spike: { title: 'Bicep First Contact', detail: 'Melodic Breakbeat (130 BPM)', color: '#ffb4ab' } },
      { month: 'SEP', season: 'AUTUMN', amplitude: 76, bpm: 105, plays: 295, hours: 22.8, topTrack: 'Apricots', topArtist: 'Bicep' },
      { month: 'OCT', season: 'AUTUMN', amplitude: 85, bpm: 72, plays: 350, hours: 27.2, topTrack: 'Blood Bank', topArtist: 'Bon Iver' },
      { month: 'NOV', season: 'AUTUMN', amplitude: 72, bpm: 68, plays: 285, hours: 22.1, topTrack: 'November', topArtist: 'Max Richter' },
      { month: 'DEC', season: 'WINTER', amplitude: 65, bpm: 66, plays: 250, hours: 19.5, topTrack: 'Mercy', topArtist: 'Max Richter' },
    ],
    seasonBreakdown: {
      WINTER: { plays: 920, hours: 72.2, bpm: 67, mood: 'Neo-Classical Haven', topTrack: 'On The Nature of Daylight', topArtist: 'Max Richter' },
      SPRING: { plays: 1010, hours: 78.8, bpm: 74, mood: 'Acoustic Resurrection', topTrack: 'Holocene', topArtist: 'Bon Iver' },
      SUMMER: { plays: 790, hours: 60.7, bpm: 104, mood: 'Breakbeat Hybrid', topTrack: 'Glue', topArtist: 'Bicep' },
      AUTUMN: { plays: 930, hours: 72.1, bpm: 82, mood: 'Late Autumn Reverie', topTrack: 'Blood Bank', topArtist: 'Bon Iver' },
    }
  },
  '2022': {
    year: '2022',
    eraName: 'Kinetic Breakbeats & Sadcore Streaks',
    subEra: 'All-Time Peak Volume: 32-Day Consecutive Kyoto Loop',
    totalPlays: '3,940',
    totalHours: '310.2',
    meanBpm: 96,
    dominantMood: 'Melancholy Euphoria & Kinetic Momentum',
    topTrackAnchor: 'Kyoto & Glue',
    topArtistAnchor: 'Phoebe Bridgers & Bicep',
    months: [
      { month: 'JAN', season: 'WINTER', amplitude: 60, bpm: 75, plays: 260, hours: 20.5, topTrack: 'Smoke Signals', topArtist: 'Phoebe Bridgers' },
      { month: 'FEB', season: 'WINTER', amplitude: 65, bpm: 118, plays: 280, hours: 22.1, topTrack: 'Danielle (smile on my face)', topArtist: 'Fred again..' },
      { month: 'MAR', season: 'SPRING', amplitude: 72, bpm: 122, plays: 310, hours: 24.4, topTrack: 'Marea (weve lost dancing)', topArtist: 'Fred again..' },
      { month: 'APR', season: 'SPRING', amplitude: 78, bpm: 126, plays: 340, hours: 26.8, topTrack: 'Atlas', topArtist: 'Bicep' },
      { month: 'MAY', season: 'SPRING', amplitude: 85, bpm: 128, plays: 380, hours: 29.9, topTrack: 'Apricots', topArtist: 'Bicep', spike: { title: 'Melodic Rave Drift', detail: 'Breakbeat Peak (128 BPM)', color: '#ffb4ab' } },
      { month: 'JUN', season: 'SUMMER', amplitude: 80, bpm: 130, plays: 350, hours: 27.5, topTrack: 'Glue', topArtist: 'Bicep' },
      { month: 'JUL', season: 'SUMMER', amplitude: 84, bpm: 128, plays: 370, hours: 29.1, topTrack: 'Opal (Four Tet Remix)', topArtist: 'Bicep' },
      { month: 'AUG', season: 'SUMMER', amplitude: 90, bpm: 125, plays: 410, hours: 32.3, topTrack: 'Glue', topArtist: 'Bicep' },
      { month: 'SEP', season: 'AUTUMN', amplitude: 86, bpm: 95, plays: 380, hours: 29.8, topTrack: 'Kyoto', topArtist: 'Phoebe Bridgers' },
      { month: 'OCT', season: 'AUTUMN', amplitude: 98, bpm: 92, plays: 460, hours: 36.2, topTrack: 'Kyoto', topArtist: 'Phoebe Bridgers', spike: { title: 'Peak Kyoto Season', detail: '32-Day Streak (214 plays)', color: '#ffb95f' } },
      { month: 'NOV', season: 'AUTUMN', amplitude: 82, bpm: 88, plays: 360, hours: 28.3, topTrack: 'Motion Sickness', topArtist: 'Phoebe Bridgers' },
      { month: 'DEC', season: 'WINTER', amplitude: 70, bpm: 82, plays: 300, hours: 23.5, topTrack: 'I Know The End', topArtist: 'Phoebe Bridgers', spike: { title: 'Nocturnal Shift +42m', detail: 'Circadian Peak (02:00 AM)', color: '#d0bcff' } },
    ],
    seasonBreakdown: {
      WINTER: { plays: 840, hours: 66.1, bpm: 92, mood: 'Electronic Prelude', topTrack: 'Danielle', topArtist: 'Fred again..' },
      SPRING: { plays: 1030, hours: 81.1, bpm: 125, mood: 'Breakbeat Acceleration', topTrack: 'Apricots', topArtist: 'Bicep' },
      SUMMER: { plays: 1130, hours: 88.9, bpm: 128, mood: 'Sunset Rave Euphoria', topTrack: 'Glue', topArtist: 'Bicep' },
      AUTUMN: { plays: 1200, hours: 94.3, bpm: 92, mood: 'Record Sadcore Streak', topTrack: 'Kyoto', topArtist: 'Phoebe Bridgers' },
    }
  },
  '2023': {
    year: '2023',
    eraName: 'Kinetic Resurgence & UK Garage',
    subEra: 'Fred again.. Highway Surges & High-Velocity Commute Beats',
    totalPlays: '2,420',
    totalHours: '194.5',
    meanBpm: 134,
    dominantMood: 'Kinetic Resurgence',
    topTrackAnchor: 'Rumble & Delilah',
    topArtistAnchor: 'Fred again..',
    months: [
      { month: 'JAN', season: 'WINTER', amplitude: 65, bpm: 130, plays: 180, hours: 14.5, topTrack: 'Rumble', topArtist: 'Fred again..' },
      { month: 'FEB', season: 'WINTER', amplitude: 70, bpm: 132, plays: 195, hours: 15.6, topTrack: 'Delilah (pull me out)', topArtist: 'Fred again..' },
      { month: 'MAR', season: 'SPRING', amplitude: 72, bpm: 134, plays: 205, hours: 16.5, topTrack: 'Kammy (like i do)', topArtist: 'Fred again..' },
      { month: 'APR', season: 'SPRING', amplitude: 76, bpm: 134, plays: 220, hours: 17.6, topTrack: 'Danielle', topArtist: 'Fred again..' },
      { month: 'MAY', season: 'SPRING', amplitude: 82, bpm: 136, plays: 245, hours: 19.6, topTrack: 'Jungle', topArtist: 'Fred again..' },
      { month: 'JUN', season: 'SUMMER', amplitude: 88, bpm: 138, plays: 270, hours: 21.6, topTrack: 'Baby again..', topArtist: 'Fred again..' },
      { month: 'JUL', season: 'SUMMER', amplitude: 92, bpm: 140, plays: 290, hours: 23.2, topTrack: 'Rumble', topArtist: 'Fred again..' },
      { month: 'AUG', season: 'SUMMER', amplitude: 98, bpm: 140, plays: 320, hours: 25.6, topTrack: 'Rumble', topArtist: 'Fred again..', spike: { title: 'Rumble Highway Peak', detail: '140 BPM Surge (284 plays)', color: '#ffb4ab' } },
      { month: 'SEP', season: 'AUTUMN', amplitude: 80, bpm: 132, plays: 230, hours: 18.4, topTrack: 'Delilah', topArtist: 'Fred again..' },
      { month: 'OCT', season: 'AUTUMN', amplitude: 74, bpm: 128, plays: 200, hours: 16.0, topTrack: 'adore u', topArtist: 'Fred again..' },
      { month: 'NOV', season: 'AUTUMN', amplitude: 68, bpm: 124, plays: 175, hours: 14.0, topTrack: 'ten', topArtist: 'Fred again..' },
      { month: 'DEC', season: 'WINTER', amplitude: 60, bpm: 120, plays: 150, hours: 12.0, topTrack: 'Marea', topArtist: 'Fred again..' },
    ],
    seasonBreakdown: {
      WINTER: { plays: 525, hours: 42.1, bpm: 127, mood: 'Bass Driven Recovery', topTrack: 'Rumble', topArtist: 'Fred again..' },
      SPRING: { plays: 670, hours: 53.7, bpm: 135, mood: 'Acceleration Loops', topTrack: 'Danielle', topArtist: 'Fred again..' },
      SUMMER: { plays: 880, hours: 70.4, bpm: 139, mood: 'Peak Kinetic Voltage', topTrack: 'Rumble', topArtist: 'Fred again..' },
      AUTUMN: { plays: 605, hours: 48.4, bpm: 128, mood: 'Dusk Garage Reflections', topTrack: 'Delilah', topArtist: 'Fred again..' },
    }
  },
  '2024': {
    year: '2024',
    eraName: 'Ambient Focus Pivot & Minimalist Strings',
    subEra: 'Deep Work Architectural Sanctuary & Generative Calms',
    totalPlays: '1,120',
    totalHours: '88.2',
    meanBpm: 76,
    dominantMood: 'Deep Architecture & Generative Focus',
    topTrackAnchor: 'On The Nature of Daylight',
    topArtistAnchor: 'Max Richter',
    months: [
      { month: 'JAN', season: 'WINTER', amplitude: 95, bpm: 66, plays: 240, hours: 18.9, topTrack: 'On The Nature of Daylight', topArtist: 'Max Richter', spike: { title: 'Ambient Focus Pivot', detail: 'String Quartet Repeat (66 BPM)', color: '#d0bcff' } },
      { month: 'FEB', season: 'WINTER', amplitude: 88, bpm: 68, plays: 210, hours: 16.5, topTrack: 'Spring 1', topArtist: 'Max Richter' },
      { month: 'MAR', season: 'SPRING', amplitude: 82, bpm: 72, plays: 190, hours: 15.0, topTrack: 'Mercy', topArtist: 'Max Richter' },
      { month: 'APR', season: 'SPRING', amplitude: 75, bpm: 76, plays: 160, hours: 12.6, topTrack: 'November', topArtist: 'Max Richter', spike: { title: 'Generative Residency', detail: 'Orchestral Loop (76 BPM)', color: '#ffb95f' } },
      { month: 'MAY', season: 'SPRING', amplitude: 68, bpm: 82, plays: 130, hours: 10.2, topTrack: 'Holocene', topArtist: 'Bon Iver' },
      { month: 'JUN', season: 'SUMMER', amplitude: 50, bpm: 90, plays: 80, hours: 6.3, topTrack: 'Glue', topArtist: 'Bicep' },
      { month: 'JUL', season: 'SUMMER', amplitude: 45, bpm: 94, plays: 60, hours: 4.7, topTrack: 'Rumble', topArtist: 'Fred again..' },
      { month: 'AUG', season: 'SUMMER', amplitude: 40, bpm: 88, plays: 50, hours: 3.9, topTrack: 'Danielle', topArtist: 'Fred again..' },
      { month: 'SEP', season: 'AUTUMN', amplitude: 35, bpm: 80, plays: 40, hours: 3.1, topTrack: 'Kyoto', topArtist: 'Phoebe Bridgers' },
      { month: 'OCT', season: 'AUTUMN', amplitude: 42, bpm: 74, plays: 55, hours: 4.3, topTrack: 'Blood Bank', topArtist: 'Bon Iver' },
      { month: 'NOV', season: 'AUTUMN', amplitude: 48, bpm: 70, plays: 65, hours: 5.1, topTrack: 'On The Nature of Daylight', topArtist: 'Max Richter' },
      { month: 'DEC', season: 'WINTER', amplitude: 55, bpm: 68, plays: 75, hours: 5.9, topTrack: 'The Blue Notebooks', topArtist: 'Max Richter' },
    ],
    seasonBreakdown: {
      WINTER: { plays: 525, hours: 41.3, bpm: 67, mood: 'Architectural Piano Sanctuary', topTrack: 'On The Nature of Daylight', topArtist: 'Max Richter' },
      SPRING: { plays: 480, hours: 37.8, bpm: 77, mood: 'Gentle Awakening', topTrack: 'Mercy', topArtist: 'Max Richter' },
      SUMMER: { plays: 190, hours: 14.9, bpm: 91, mood: 'Subdued Rhythm', topTrack: 'Glue', topArtist: 'Bicep' },
      AUTUMN: { plays: 160, hours: 12.5, bpm: 75, mood: 'Pensive Return', topTrack: 'Blood Bank', topArtist: 'Bon Iver' },
    }
  }
};
