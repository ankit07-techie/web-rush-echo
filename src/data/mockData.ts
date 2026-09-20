import { MusicalEra, SongRecord, ArtistRecord, ChapterData, TimelineMilestone, GraphNode, GraphEdge } from '../types';

export const USER_ARCHIVE_META = {
  name: 'Alex Rivera',
  title: 'Musical Archivist',
  archiveId: 'TAPE #8912-A',
  totalPlays: 14820,
  listeningHours: 842,
  uniqueTracks: 3140,
  uniqueArtists: 612,
  archiveSpanYears: 5.8,
  integrityScore: 99.4,
  auditDate: 'OCT 2024 / Q4 AUDIT',
  favoriteTime: '02:14 AM',
  emotionalResonanceIndex: '98.7%',
  topGenreAllTime: 'Atmospheric Indie / Deep Electronic',
};

export const MUSICAL_ERAS: MusicalEra[] = [
  {
    id: 'era-synthwave',
    title: 'The Midnight Synthwave Era',
    subtitle: 'Nostalgic neon escapism during prolonged quietude',
    timeframe: '2020 – 2021',
    yearRange: '2020-2021',
    primaryGenre: 'Synthwave & Retrowave',
    dominantMood: 'Cinematic Longing',
    totalHours: 218,
    trackCount: 420,
    topTrack: 'Sunset — The Midnight',
    topArtist: 'The Midnight',
    bgGradient: 'from-[#4f319c]/40 via-[#1d1f28] to-[#11131b]',
    accentColor: '#cebdff',
    description: 'Marked by driving 80s bass arpeggios, gated reverb drums, and nocturnal highway imagery during global quietude.',
    signatureLyrics: 'Sunset, no regrets, a neon haze over city lights...',
    tags: ['Night Drive', 'Neon Nostalgia', 'Reverb Drums']
  },
  {
    id: 'era-indie-folk',
    title: 'Melancholic Indie Folk',
    subtitle: 'Acoustic minimalism & intimate lyrical introspection',
    timeframe: 'Autumn 2022',
    yearRange: '2021-2022',
    primaryGenre: 'Indie Chamber Folk',
    dominantMood: 'Vulnerable & Raw',
    totalHours: 284,
    trackCount: 680,
    topTrack: 'Holocene — Bon Iver',
    topArtist: 'Bon Iver & Phoebe Bridgers',
    bgGradient: 'from-[#ca8100]/30 via-[#1d1f28] to-[#11131b]',
    accentColor: '#ffb95f',
    description: 'An acoustic sanctuary dominated by falsetto vocals, intricate fingerpicking, and quiet late-night acoustic guitar resonance.',
    signatureLyrics: 'And at once I knew I was not magnificent...',
    tags: ['Fall Leaves', 'Tape Hiss', 'Vocal Layering']
  },
  {
    id: 'era-deep-house',
    title: 'Late-Night Deep House',
    subtitle: 'Rhythmic catharsis, UK garage loops & basement bass',
    timeframe: '2023',
    yearRange: '2023',
    primaryGenre: 'UK Garage & Emotional Electronic',
    dominantMood: 'Euphoric Release',
    totalHours: 196,
    trackCount: 512,
    topTrack: 'Rumble — Fred again..',
    topArtist: 'Fred again.. & Bicep',
    bgGradient: 'from-[#a078ff]/30 via-[#1d1f28] to-[#11131b]',
    accentColor: '#d0bcff',
    description: 'The return of kinetic momentum: vocal chop earworms, 134 BPM two-step grooves, and dawn commute euphoria.',
    signatureLyrics: 'Killers in the jungle, hear the rumble...',
    tags: ['130 BPM', 'Vocal Chops', 'Club Euphoria']
  },
  {
    id: 'era-ambient',
    title: 'Neo-Classical Ambient Focus',
    subtitle: 'Delicate piano hammers, tape loops & sonic stasis',
    timeframe: 'Spring 2024 – Present',
    yearRange: '2024',
    primaryGenre: 'Neo-Classical & Post-Rock Ambient',
    dominantMood: 'Deep Equilibrium',
    totalHours: 144,
    trackCount: 390,
    topTrack: 'On The Nature of Daylight — Max Richter',
    topArtist: 'Max Richter & Nils Frahm',
    bgGradient: 'from-[#3c0091]/40 via-[#1d1f28] to-[#11131b]',
    accentColor: '#d0bcff',
    description: 'Orchestral strings, felted upright piano resonance, and generative soundscapes dedicated to deep cognitive architecture.',
    signatureLyrics: 'Pure instrumental string lament in B minor...',
    tags: ['Felt Piano', 'Cello Swells', 'Zero Distraction']
  }
];

export const TOP_ARTISTS: ArtistRecord[] = [
  {
    id: 'bon-iver',
    rank: 1,
    name: 'Bon Iver',
    genre: 'Indie Folk / Experimental',
    totalPlays: 1480,
    hoursListened: 114.2,
    sharePercentage: 9.9,
    firstDiscovered: 'OCT 14, 2019',
    topTracks: ['Holocene', 'Skinny Love', 'Blood Bank', '22 (OVER S∞∞N)'],
    bio: 'Justin Vernon’s ambient folk project anchors 5 distinct autumn transitions in your life.',
    avatarUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80',
    seasonality: [25, 30, 40, 35, 20, 15, 12, 18, 78, 95, 98, 80]
  },
  {
    id: 'phoebe-bridgers',
    rank: 2,
    name: 'Phoebe Bridgers',
    genre: 'Indie Rock / Sadcore',
    totalPlays: 1240,
    hoursListened: 92.4,
    sharePercentage: 8.4,
    firstDiscovered: 'JUN 19, 2020',
    topTracks: ['Kyoto', 'Motion Sickness', 'Moon Song', 'I Know The End'],
    bio: 'A core narrative companion across 2020–2022, peaking consistently between 1:00 AM and 3:30 AM.',
    avatarUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=400&q=80',
    seasonality: [60, 65, 50, 45, 35, 40, 30, 50, 85, 90, 88, 70]
  },
  {
    id: 'fred-again',
    rank: 3,
    name: 'Fred again..',
    genre: 'Electronic / UK Garage',
    totalPlays: 980,
    hoursListened: 68.1,
    sharePercentage: 6.6,
    firstDiscovered: 'FEB 02, 2022',
    topTracks: ['Rumble', 'Danielle (smile on my face)', 'Delilah (pull me out)', 'Marea'],
    bio: 'The soundtrack of your kinetic resurgence in 2023, dominant during workouts and late-night highway travels.',
    avatarUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=400&q=80',
    seasonality: [40, 45, 55, 70, 85, 95, 90, 88, 65, 50, 40, 45]
  },
  {
    id: 'the-midnight',
    rank: 4,
    name: 'The Midnight',
    genre: 'Synthwave / Retropop',
    totalPlays: 860,
    hoursListened: 61.5,
    sharePercentage: 5.8,
    firstDiscovered: 'SEP 11, 2019',
    topTracks: ['Sunset', 'Days of Thunder', 'Jason', 'Vampires'],
    bio: 'The primary architecture for nocturnal creative flow and neon-soaked midnight drives.',
    avatarUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=400&q=80',
    seasonality: [70, 75, 60, 50, 45, 50, 60, 70, 65, 55, 60, 80]
  },
  {
    id: 'max-richter',
    rank: 5,
    name: 'Max Richter',
    genre: 'Neo-Classical / Minimalist',
    totalPlays: 690,
    hoursListened: 58.2,
    sharePercentage: 4.6,
    firstDiscovered: 'JAN 08, 2021',
    topTracks: ['On The Nature of Daylight', 'Spring 1', 'November', 'Mercy'],
    bio: 'Composed your most focused deep work hours with sweeping string quartets and timeless themes.',
    avatarUrl: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=400&q=80',
    seasonality: [90, 85, 75, 60, 40, 30, 25, 30, 60, 75, 80, 92]
  },
  {
    id: 'bicep',
    rank: 6,
    name: 'Bicep',
    genre: 'Breakbeat / Melodic Techno',
    totalPlays: 720,
    hoursListened: 52.0,
    sharePercentage: 4.9,
    firstDiscovered: 'AUG 18, 2021',
    topTracks: ['Glue', 'Apricots', 'Opal', 'Atlas'],
    bio: 'Resonant breakbeats and ethereal vocal chops that defined long evening coding and design marathons.',
    avatarUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=400&q=80',
    seasonality: [35, 40, 50, 65, 80, 90, 88, 85, 70, 55, 45, 38]
  }
];

export const TOP_TRACKS: SongRecord[] = [
  {
    id: 'track-kyoto',
    rank: 1,
    title: 'Kyoto',
    artist: 'Phoebe Bridgers',
    album: 'Punisher',
    year: 2020,
    plays: 342,
    listeningHours: 19.4,
    firstPlayed: 'JUN 21, 2020',
    lastPlayed: 'YESTERDAY, 02:18 AM',
    peakHour: '01:45 AM',
    repeatRatio: '4.2x Avg',
    dominantMood: 'Bittersweet Euphoria',
    bpm: 114,
    category: 'Top 100',
    albumCover: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=300&q=80',
    receiptLog: [
      { timestamp: 'OCT 24, 2024 02:18 AM', device: 'Studio Over-Ears', duration: '3m 04s', context: 'Late-Night Deep Focus' },
      { timestamp: 'OCT 19, 2024 11:42 PM', device: 'Mobile Terminal', duration: '3m 04s', context: 'Night Transit' },
      { timestamp: 'OCT 12, 2024 01:05 AM', device: 'Studio Over-Ears', duration: '3m 04s', context: 'Repeat Loop Session #84' },
      { timestamp: 'SEP 28, 2024 03:12 AM', device: 'Hi-Fi Desk DAC', duration: '3m 04s', context: 'Solitary Echo' },
      { timestamp: 'AUG 14, 2024 02:00 AM', device: 'Studio Over-Ears', duration: '3m 04s', context: 'Archival Playback' }
    ]
  },
  {
    id: 'track-holocene',
    rank: 2,
    title: 'Holocene',
    artist: 'Bon Iver',
    album: 'Bon Iver',
    year: 2011,
    plays: 318,
    listeningHours: 28.6,
    firstPlayed: 'OCT 14, 2019',
    lastPlayed: '3 DAYS AGO',
    peakHour: '02:30 AM',
    repeatRatio: '5.1x Avg',
    dominantMood: 'Sublime Transience',
    bpm: 74,
    category: 'Autumn',
    albumCover: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=300&q=80',
    receiptLog: [
      { timestamp: 'OCT 21, 2024 02:34 AM', device: 'Hi-Fi Desk DAC', duration: '5m 37s', context: 'Introspective Autumn Session' },
      { timestamp: 'OCT 15, 2024 02:12 AM', device: 'Studio Over-Ears', duration: '5m 37s', context: 'Nocturnal Repeat' },
      { timestamp: 'SEP 30, 2024 11:20 PM', device: 'Mobile Terminal', duration: '5m 37s', context: 'Rain Audio Sync' }
    ]
  },
  {
    id: 'track-rumble',
    rank: 3,
    title: 'Rumble',
    artist: 'Fred again.., Skrillex, Flowdan',
    album: 'Quest For Fire',
    year: 2023,
    plays: 264,
    listeningHours: 12.1,
    firstPlayed: 'JAN 06, 2023',
    lastPlayed: 'OCT 23, 2024 06:15 PM',
    peakHour: '07:15 PM',
    repeatRatio: '3.8x Avg',
    dominantMood: 'Kinetic Momentum',
    bpm: 140,
    category: 'Top 100',
    albumCover: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=300&q=80',
    receiptLog: [
      { timestamp: 'OCT 23, 2024 06:15 PM', device: 'Mobile Terminal', duration: '2m 26s', context: 'Dusk Run' },
      { timestamp: 'OCT 20, 2024 08:30 PM', device: 'Car Console', duration: '2m 26s', context: 'Highway Transit' }
    ]
  },
  {
    id: 'track-sunset',
    rank: 4,
    title: 'Sunset',
    artist: 'The Midnight',
    album: 'Endless Summer',
    year: 2016,
    plays: 241,
    listeningHours: 18.2,
    firstPlayed: 'SEP 11, 2019',
    lastPlayed: 'OCT 18, 2024 01:10 AM',
    peakHour: '01:15 AM',
    repeatRatio: '3.5x Avg',
    dominantMood: 'Nostalgic Pulse',
    bpm: 108,
    category: 'Late Night',
    albumCover: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=300&q=80',
    receiptLog: [
      { timestamp: 'OCT 18, 2024 01:10 AM', device: 'Studio Over-Ears', duration: '5m 26s', context: 'Neon Reverie' },
      { timestamp: 'OCT 04, 2024 02:40 AM', device: 'Hi-Fi Desk DAC', duration: '5m 26s', context: 'Late Night Coding' }
    ]
  },
  {
    id: 'track-daylight',
    rank: 5,
    title: 'On The Nature of Daylight',
    artist: 'Max Richter',
    album: 'The Blue Notebooks',
    year: 2004,
    plays: 228,
    listeningHours: 23.4,
    firstPlayed: 'JAN 08, 2021',
    lastPlayed: 'YESTERDAY, 09:40 AM',
    peakHour: '08:45 AM',
    repeatRatio: '4.6x Avg',
    dominantMood: 'Deep Architecture',
    bpm: 66,
    category: 'Ambient',
    albumCover: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=300&q=80',
    receiptLog: [
      { timestamp: 'OCT 24, 2024 09:40 AM', device: 'Studio Over-Ears', duration: '6m 11s', context: 'Writing Sprint' },
      { timestamp: 'OCT 17, 2024 08:30 AM', device: 'Hi-Fi Desk DAC', duration: '6m 11s', context: 'Morning Clarity' }
    ]
  },
  {
    id: 'track-glue',
    rank: 6,
    title: 'Glue',
    artist: 'Bicep',
    album: 'Bicep',
    year: 2017,
    plays: 198,
    listeningHours: 15.2,
    firstPlayed: 'AUG 18, 2021',
    lastPlayed: '4 DAYS AGO',
    peakHour: '02:05 AM',
    repeatRatio: '3.9x Avg',
    dominantMood: 'Melodic Breakbeat',
    bpm: 130,
    category: 'Forgotten Gems',
    albumCover: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=300&q=80',
    receiptLog: [
      { timestamp: 'OCT 20, 2024 02:05 AM', device: 'Studio Over-Ears', duration: '4m 29s', context: 'Resurrection Play' }
    ]
  },
  {
    id: 'track-mystery',
    rank: 7,
    title: 'Mystery of Love',
    artist: 'Sufjan Stevens',
    album: 'Call Me By Your Name OST',
    year: 2017,
    plays: 189,
    listeningHours: 12.8,
    firstPlayed: 'NOV 12, 2019',
    lastPlayed: '1 WEEK AGO',
    peakHour: '03:10 AM',
    repeatRatio: '3.2x Avg',
    dominantMood: 'Gentle Reverie',
    bpm: 88,
    category: 'Autumn',
    albumCover: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=300&q=80',
    receiptLog: [
      { timestamp: 'OCT 16, 2024 03:10 AM', device: 'Hi-Fi Desk DAC', duration: '4m 08s', context: 'Night Echoes' }
    ]
  }
];

export const CHAPTERS: ChapterData[] = [
  {
    id: 'ch-01',
    number: '01',
    title: 'The Isolation Loops',
    timeframe: 'MAR 2020 – JUN 2021',
    status: 'archived',
    quote: '"The clock stopped moving forward, so we built monuments out of four-bar synthesizer loops."',
    summary: 'An insular chapter dominated by lo-fi textures, early synthwave discovery, and the sudden emergence of Phoebe Bridgers’ Punisher as an existential anchor.',
    dominantGenre: 'Lo-Fi Chill & Retrowave',
    topTrack: {
      title: 'Sunset',
      artist: 'The Midnight',
      plays: 186
    },
    streakDays: 48,
    peakSession: '3.8 Hours (01:15 AM - 05:00 AM)',
    hourlyDistribution: [12, 18, 25, 14, 6, 2, 1, 2, 4, 8, 10, 14, 15, 12, 16, 18, 22, 24, 28, 32, 45, 60, 75, 40],
    eraAnchors: [
      { title: 'Endless Summer', artist: 'The Midnight', type: 'Album', year: '2016', plays: 241, color: '#cebdff' },
      { title: 'Punisher', artist: 'Phoebe Bridgers', type: 'Album', year: '2020', plays: 342, color: '#d0bcff' },
      { title: 'Immunity', artist: 'Clairo', type: 'Album', year: '2019', plays: 168, color: '#ffb95f' }
    ],
    receiptItems: [
      { item: 'Midnight Arpeggios', subtext: 'Analog Synthwave Subscriptions', metric: '64 hrs' },
      { item: 'Existential Acoustic Ballads', subtext: 'Solo Acoustic Isolation', metric: '92 hrs' },
      { item: 'Lo-Fi Beat Loop Residue', subtext: 'Background Tape Warble', metric: '48 hrs' }
    ]
  },
  {
    id: 'ch-02',
    number: '02',
    title: 'Autumn Reverie',
    timeframe: 'SEP 2021 – NOV 2022',
    status: 'active',
    quote: '"An introspective descent framed by fallen leaves, tape flutter, and the quiet resonance of acoustic timber."',
    summary: 'A definitive sonic baseline characterized by high-repetition chamber folk, delicate vocal layering, and persistent 2:00 AM listening spikes. Bon Iver and Phoebe Bridgers accounted for over 41% of all airplay during this window.',
    dominantGenre: 'Indie Chamber Folk',
    topTrack: {
      title: 'Kyoto',
      artist: 'Phoebe Bridgers',
      plays: 214
    },
    streakDays: 94,
    peakSession: '4.6 Hours (11:30 PM - 04:06 AM)',
    hourlyDistribution: [15, 25, 48, 38, 10, 2, 1, 2, 5, 8, 12, 15, 14, 16, 18, 20, 24, 30, 38, 48, 68, 85, 92, 55],
    eraAnchors: [
      { title: 'Punisher', artist: 'Phoebe Bridgers', type: 'Album', year: '2020', plays: 342, color: '#d0bcff' },
      { title: 'For Emma, Forever Ago', artist: 'Bon Iver', type: 'Album', year: '2007', plays: 289, color: '#ffb95f' },
      { title: 'Carrie & Lowell', artist: 'Sufjan Stevens', type: 'Album', year: '2015', plays: 184, color: '#cebdff' },
      { title: 'Bon Iver, Bon Iver', artist: 'Bon Iver', type: 'Album', year: '2011', plays: 318, color: '#a078ff' }
    ],
    receiptItems: [
      { item: 'Itemized Vocal Tears (P. Bridgers)', subtext: 'Tracks 1–11 Sequential', metric: '92.4 hrs' },
      { item: 'Vernon Acoustic Timber', subtext: 'Wisconsin Cabin Tape Hiss', metric: '114.2 hrs' },
      { item: 'Sub-Zero Early AM Playbacks', subtext: '01:00 AM – 03:30 AM', metric: '142.6 hrs' }
    ]
  },
  {
    id: 'ch-03',
    number: '03',
    title: 'The Midnight Resurgence',
    timeframe: 'JAN 2023 – DEC 2023',
    status: 'archived',
    quote: '"We exchanged quiet acoustic strings for kinetic basslines and 134 BPM garage breaks."',
    summary: 'A dramatic aesthetic pivot towards forward velocity. Fred again.. and Bicep provided the soundtrack for late-night highway travels, social reconnection, and physical kinetic rhythm.',
    dominantGenre: 'UK Garage & Melodic Bass',
    topTrack: {
      title: 'Rumble',
      artist: 'Fred again..',
      plays: 264
    },
    streakDays: 62,
    peakSession: '3.9 Hours (10:00 PM - 01:54 AM)',
    hourlyDistribution: [20, 30, 22, 12, 4, 1, 0, 1, 3, 6, 10, 18, 22, 20, 25, 34, 45, 55, 68, 72, 80, 82, 65, 35],
    eraAnchors: [
      { title: 'Quest For Fire', artist: 'Skrillex & Fred again..', type: 'Album', year: '2023', plays: 264, color: '#d0bcff' },
      { title: 'Isles', artist: 'Bicep', type: 'Album', year: '2021', plays: 198, color: '#ffb95f' },
      { title: 'Actual Life 3', artist: 'Fred again..', type: 'Album', year: '2022', plays: 230, color: '#a078ff' }
    ],
    receiptItems: [
      { item: 'Kinetic 134 BPM Breaks', subtext: 'UK Garage Club Energy', metric: '68.1 hrs' },
      { item: 'Highway Overpass Synths', subtext: 'Bicep & Overmono', metric: '52.0 hrs' },
      { item: 'Dawn Transit Catharsis', subtext: 'Commute Bass Sub-Harmonics', metric: '44.8 hrs' }
    ]
  },
  {
    id: 'ch-04',
    number: '04',
    title: 'Ambient Horizons',
    timeframe: 'JAN 2024 – PRESENT',
    status: 'active',
    quote: '"In stillness we find the most complex architecture. Every hammer strike on the felt piano speaks."',
    summary: 'A transition to high-focus neo-classical compositions. Max Richter, Nils Frahm, and Brian Eno form a sustained audio sanctuary for deep thought and cognitive focus.',
    dominantGenre: 'Neo-Classical Minimalist',
    topTrack: {
      title: 'On The Nature of Daylight',
      artist: 'Max Richter',
      plays: 228
    },
    streakDays: 118,
    peakSession: '5.2 Hours (08:30 AM - 01:42 PM)',
    hourlyDistribution: [8, 12, 10, 4, 1, 0, 2, 8, 35, 75, 88, 92, 80, 65, 45, 30, 22, 18, 14, 12, 18, 22, 15, 10],
    eraAnchors: [
      { title: 'The Blue Notebooks', artist: 'Max Richter', type: 'Album', year: '2004', plays: 228, color: '#d0bcff' },
      { title: 'Spaces', artist: 'Nils Frahm', type: 'Album', year: '2013', plays: 142, color: '#cebdff' },
      { title: 'Music for Airports', artist: 'Brian Eno', type: 'Album', year: '1978', plays: 98, color: '#ffb95f' }
    ],
    receiptItems: [
      { item: 'Sustained Felt Cello Swells', subtext: 'Max Richter Strings', metric: '58.2 hrs' },
      { item: 'Zero-Distraction Generative Flow', subtext: 'Deep Architecture Focus', metric: '74.5 hrs' },
      { item: 'Morning Cognitive Equilibrium', subtext: '08:00 AM – 11:30 AM', metric: '48.0 hrs' }
    ]
  }
];

export const TIMELINE_MILESTONES: TimelineMilestone[] = [
  {
    id: 'mile-2024-01',
    dateKey: '01.24',
    dateLabel: 'JANUARY 2024',
    title: 'Ambient Focus Pivot',
    description: 'A structural shift in listening velocity from 130 BPM club textures to generative piano and orchestral minimalism.',
    tag: 'PIVOT ERA',
    artist: 'Max Richter',
    track: 'On The Nature of Daylight',
    plays: 148,
    hours: 23.4,
    peakVibe: 'Deep Work Sanctuary',
    receiptNumber: '#TAPE-2024-014',
    logs: [
      { time: '08:14 AM', event: 'First string quartet repeat initiated', duration: '6m 11s' },
      { time: '11:28 AM', event: 'Consecutive play loop #14 recorded', duration: '6m 11s' },
      { time: '02:45 PM', event: 'Focus session completed (18 tracks)', duration: '1h 52m' }
    ]
  },
  {
    id: 'mile-2023-08',
    dateKey: '08.23',
    dateLabel: 'AUGUST 2023',
    title: 'Electronic Summer Surge',
    description: 'Fred again.. and Bicep dominate daily commute telemetry with intense repeat loops and vocal chop identification.',
    tag: 'VELOCITY SURGE',
    artist: 'Fred again.. & Bicep',
    track: 'Rumble / Glue',
    plays: 284,
    hours: 18.2,
    peakVibe: 'Kinetic Movement',
    receiptNumber: '#TAPE-2023-088',
    logs: [
      { time: '06:12 PM', event: 'Highway transit peak BPM detected (140 BPM)', duration: '3m 15s' },
      { time: '09:40 PM', event: 'Breakbeat residency unlocked', duration: '4m 29s' }
    ]
  },
  {
    id: 'mile-2022-10',
    dateKey: '10.22',
    dateLabel: 'OCTOBER 2022',
    title: 'Peak Phoebe Bridgers Season',
    description: 'Kyoto and Motion Sickness locked into a 32-day consecutive listening streak during late autumn nocturnal hours.',
    tag: 'REPEAT ANOMALY',
    artist: 'Phoebe Bridgers',
    track: 'Kyoto (Punisher)',
    plays: 214,
    hours: 19.4,
    peakVibe: 'Melancholy Euphoria',
    receiptNumber: '#TAPE-2022-102',
    logs: [
      { time: '01:45 AM', event: 'Night cycle activation: 9 plays in succession', duration: '28m' },
      { time: '03:10 AM', event: 'Volume attenuation zero / fully absorbed', duration: '3m 04s' }
    ]
  },
  {
    id: 'mile-2021-04',
    dateKey: '04.21',
    dateLabel: 'APRIL 2021',
    title: 'Spring Acoustic Renaissance',
    description: 'Transitioning out of winter isolation with Bon Iver and Sufjan Stevens acoustic timber libraries.',
    tag: 'TIMBER RECOVERY',
    artist: 'Bon Iver',
    track: 'Holocene & Blood Bank',
    plays: 198,
    hours: 28.6,
    peakVibe: 'Sublime Reflection',
    receiptNumber: '#TAPE-2021-041',
    logs: [
      { time: '02:30 AM', event: 'Cabin falsetto resonance benchmarked', duration: '5m 37s' }
    ]
  },
  {
    id: 'mile-2020-06',
    dateKey: '06.20',
    dateLabel: 'JUNE 2020',
    title: 'Lockdown Sadcore Resonance',
    description: 'Punisher album drop triggers 38 consecutive nocturnal playback sessions across June and July midnight hours.',
    tag: 'NOCTURNAL LOOP',
    artist: 'Phoebe Bridgers',
    track: 'Motion Sickness & Kyoto',
    plays: 246,
    hours: 22.8,
    peakVibe: 'Introspective Isolation',
    receiptNumber: '#TAPE-2020-062',
    logs: [
      { time: '01:15 AM', event: 'First continuous album loop engaged', duration: '40m 18s' },
      { time: '03:40 AM', event: 'Deep nocturnal isolation telemetry marked', duration: '3m 38s' }
    ]
  },
  {
    id: 'mile-2019-09',
    dateKey: '09.19',
    dateLabel: 'SEPTEMBER 2019',
    title: 'Genesis Synthwave Surge',
    description: 'The Midnight retro-pop discovery initiates early archive telemetry, peaking during twilight autumn transit.',
    tag: 'GENESIS ERA',
    artist: 'The Midnight',
    track: 'Sunset & Days of Thunder',
    plays: 182,
    hours: 16.5,
    peakVibe: 'Neon Retrospective',
    receiptNumber: '#TAPE-2019-091',
    logs: [
      { time: '07:22 PM', event: 'First synthetic analog timbre logged', duration: '5m 26s' },
      { time: '11:05 PM', event: 'Sunset playback loop #8 recorded', duration: '5m 26s' }
    ]
  }
];

export const BEHAVIORAL_PATTERNS = [
  {
    id: 'pattern-2am',
    number: '01',
    title: 'The 2:00 AM Paradox',
    badge: 'CHRONOTYPE SIGNATURE',
    summary: 'A staggering 44.8% of your most emotionally intense listening occurs between 01:30 AM and 03:30 AM.',
    stats: [
      { label: 'Volume Shift', value: '+38% vs Day' },
      { label: 'Repeat Ratio', value: '3.4x Loop Factor' },
      { label: 'Dominant Catalyst', value: 'Phoebe Bridgers / Bon Iver' }
    ],
    details: 'Telemetry indicates that when ambient room sound drops below 28dB, your track selection pivots almost exclusively to acoustic reverb, falsetto registers, and sub-80 BPM signatures.',
    receiptData: {
      code: 'PARADOX-0200',
      totalPlaysLogged: '6,640 PLAYS',
      averageDecibels: '62 dB',
      mostFrequentDay: 'Thursday / Sunday Night'
    }
  },
  {
    id: 'pattern-return-loop',
    number: '02',
    title: 'The Obsession Return Loop',
    badge: 'MEMORY TRAJECTORY',
    summary: 'When a new track captures your focus, you play it an average of 14 times in 48 hours before entering a 180-day dormancy period.',
    stats: [
      { label: 'Loop Cycle', value: '48h Hyper-Burst' },
      { label: 'Dormancy Period', value: '180 Days Flat' },
      { label: 'Resurrection Rate', value: '92% Likelihood' }
    ],
    details: 'You do not fall out of love with songs—you exhaust their immediate sensory payload, store them in emotional cold storage, and resurrect them precisely six months later.',
    receiptData: {
      code: 'LOOP-REBIRTH',
      totalPlaysLogged: '4,120 PLAYS',
      averageDecibels: '74 dB',
      mostFrequentDay: 'Any High-Focus Night'
    }
  },
  {
    id: 'pattern-anchors',
    number: '03',
    title: 'Era Defining Monoliths',
    badge: 'ARCHITECTURAL ANCHORS',
    summary: 'Four albums account for 38.6% of your lifetime listening hours, acting as structural load-bearing pillars across time.',
    stats: [
      { label: 'Pillars', value: '4 Albums' },
      { label: 'Time Share', value: '38.6% Lifetime' },
      { label: 'Stability Index', value: '99.8% Core' }
    ],
    details: 'Punisher (2020), Bon Iver (2011), Quest For Fire (2023), and The Blue Notebooks (2004) represent the spine of your entire musical consciousness.',
    receiptData: {
      code: 'MONOLITH-ARCH',
      totalPlaysLogged: '5,720 PLAYS',
      averageDecibels: '68 dB',
      mostFrequentDay: 'Consistent'
    }
  },
  {
    id: 'pattern-resurrection',
    number: '04',
    title: 'The Resurrected Tracks',
    badge: 'GHOST SPINS',
    summary: 'Tracks that went completely dark for 500+ days suddenly returned to heavy rotation with zero external prompt.',
    stats: [
      { label: 'Sleep Window', value: '540 Days Avg' },
      { label: 'Ghost Catalyst', value: 'Glue — Bicep' },
      { label: 'Return Volume', value: '88 Plays / Wk' }
    ],
    details: 'After being silent since late 2021, Bicep’s Glue surged back into top weekly rotation in autumn 2024, demonstrating your sub-conscious seasonal memory triggers.',
    receiptData: {
      code: 'GHOST-SPIN-4',
      totalPlaysLogged: '1,240 PLAYS',
      averageDecibels: '71 dB',
      mostFrequentDay: 'Saturday 02:00 AM'
    }
  },
  {
    id: 'pattern-seasonal',
    number: '05',
    title: 'Seasonal Harmonic Shifts',
    badge: 'SOLSTICE HARMONICS',
    summary: 'Your listening tempo fluctuates with solar equinoxes: Autumn drops to 76 BPM while Summer peaks at 134 BPM.',
    stats: [
      { label: 'Autumn Tempo', value: '74 - 78 BPM' },
      { label: 'Summer Tempo', value: '128 - 140 BPM' },
      { label: 'Correlation', value: '0.94 Alpha' }
    ],
    details: 'You are biologically synchronized to seasonal tempo arcs. October reliably demands fingerpicked guitars, while July demands rolling 808 percussion and sidechain compression.',
    receiptData: {
      code: 'SOLSTICE-BPM',
      totalPlaysLogged: '14,820 PLAYS',
      averageDecibels: '65 dB',
      mostFrequentDay: 'Seasonal'
    }
  },
  {
    id: 'pattern-discipline',
    number: '06',
    title: '100% Album Adherence',
    badge: 'CURATOR INTEGRITY',
    summary: 'Unlike the global streaming average of 12%, you complete full studio albums 89.2% of the time without skipping.',
    stats: [
      { label: 'Full Playthrough', value: '89.2% Rate' },
      { label: 'Skip Penalty', value: '1.2% Tracks' },
      { label: 'Purity Score', value: 'Grade AAA' }
    ],
    details: 'You consume music as deliberate long-form literature. Track 1 through Track 11 are experienced in the sequence the artists authored, preserving narrative cadence.',
    receiptData: {
      code: 'DISCIPLINE-AAA',
      totalPlaysLogged: '13,200 PLAYS',
      averageDecibels: '69 dB',
      mostFrequentDay: 'All Sessions'
    }
  }
];

export const GRAPH_NODES: GraphNode[] = [
  { id: 'node-bon-iver', label: 'Bon Iver', type: 'artist', x: 260, y: 190, size: 34, color: '#ffb95f', subtitle: 'Indie Chamber Folk', plays: 1480, connectionCount: 8 },
  { id: 'node-phoebe', label: 'Phoebe Bridgers', type: 'artist', x: 440, y: 220, size: 32, color: '#d0bcff', subtitle: 'Nocturnal Sadcore', plays: 1240, connectionCount: 9 },
  { id: 'node-fred', label: 'Fred again..', type: 'artist', x: 620, y: 310, size: 28, color: '#cebdff', subtitle: 'Emotional Electronic', plays: 980, connectionCount: 7 },
  { id: 'node-the-midnight', label: 'The Midnight', type: 'artist', x: 220, y: 410, size: 26, color: '#a078ff', subtitle: 'Retrowave / Synth', plays: 860, connectionCount: 5 },
  { id: 'node-max-richter', label: 'Max Richter', type: 'artist', x: 520, y: 130, size: 25, color: '#d0bcff', subtitle: 'Neo-Classical Strings', plays: 690, connectionCount: 6 },
  { id: 'node-bicep', label: 'Bicep', type: 'artist', x: 710, y: 230, size: 24, color: '#ffb95f', subtitle: 'Melodic Breakbeat', plays: 720, connectionCount: 6 },
  { id: 'node-sufjan', label: 'Sufjan Stevens', type: 'artist', x: 340, y: 120, size: 22, color: '#cebdff', subtitle: 'Chamber Folk', plays: 610, connectionCount: 4 },
  { id: 'node-kyoto', label: 'Kyoto', type: 'song', x: 460, y: 310, size: 20, color: '#d0bcff', subtitle: '342 Plays', plays: 342, connectionCount: 4 },
  { id: 'node-holocene', label: 'Holocene', type: 'song', x: 230, y: 290, size: 20, color: '#ffb95f', subtitle: '318 Plays', plays: 318, connectionCount: 4 },
  { id: 'node-rumble', label: 'Rumble', type: 'song', x: 640, y: 400, size: 18, color: '#a078ff', subtitle: '264 Plays', plays: 264, connectionCount: 3 },
  { id: 'node-sunset', label: 'Sunset', type: 'song', x: 160, y: 490, size: 18, color: '#cebdff', subtitle: '241 Plays', plays: 241, connectionCount: 2 },
  { id: 'node-daylight', label: 'On The Nature of Daylight', type: 'song', x: 590, y: 80, size: 18, color: '#d0bcff', subtitle: '228 Plays', plays: 228, connectionCount: 3 },
  { id: 'node-glue', label: 'Glue', type: 'song', x: 780, y: 320, size: 18, color: '#ffb95f', subtitle: '198 Plays', plays: 198, connectionCount: 3 },
  { id: 'node-era-reverie', label: 'Autumn Reverie', type: 'era', x: 350, y: 240, size: 24, color: '#ca8100', subtitle: '2021–2022 Chapter', plays: 4200, connectionCount: 6 },
  { id: 'node-era-ambient', label: 'Ambient Horizons', type: 'era', x: 580, y: 210, size: 22, color: '#4f319c', subtitle: '2024 Chapter', plays: 2800, connectionCount: 5 },
  { id: 'node-habit-2am', label: '02:00 AM Paradox', type: 'habit', x: 380, y: 360, size: 22, color: '#ffb4ab', subtitle: 'Biometric Habit', plays: 6640, connectionCount: 7 }
];

export const GRAPH_EDGES: GraphEdge[] = [
  { id: 'e1', source: 'node-bon-iver', target: 'node-phoebe', weight: 4, relationship: 'Shared Autumn Acoustic DNA & Late-Night Loops', affinity: 94 },
  { id: 'e2', source: 'node-bon-iver', target: 'node-holocene', weight: 5, relationship: 'Flagship Core Composition', affinity: 98 },
  { id: 'e3', source: 'node-bon-iver', target: 'node-sufjan', weight: 3, relationship: 'Chamber Folk Falsetto Resonance', affinity: 86 },
  { id: 'e4', source: 'node-bon-iver', target: 'node-era-reverie', weight: 4, relationship: 'Primary Pillar of Autumn Reverie', affinity: 92 },
  { id: 'e5', source: 'node-phoebe', target: 'node-kyoto', weight: 5, relationship: 'Most Repeated Track in Lifetime Archive', affinity: 99 },
  { id: 'e6', source: 'node-phoebe', target: 'node-era-reverie', weight: 4, relationship: 'Emotional Core of 2021-2022', affinity: 95 },
  { id: 'e7', source: 'node-phoebe', target: 'node-habit-2am', weight: 4, relationship: '68% of spins during 01:30–03:30 AM', affinity: 96 },
  { id: 'e8', source: 'node-bon-iver', target: 'node-habit-2am', weight: 4, relationship: '71% of spins during quiet hours', affinity: 91 },
  { id: 'e9', source: 'node-fred', target: 'node-rumble', weight: 5, relationship: '2023 Kinetic Anchor', affinity: 90 },
  { id: 'e10', source: 'node-fred', target: 'node-bicep', weight: 3, relationship: 'UK Garage to Breakbeat Pipeline', affinity: 84 },
  { id: 'e11', source: 'node-bicep', target: 'node-glue', weight: 4, relationship: 'Ghost Spin Resurrected Record', affinity: 88 },
  { id: 'e12', source: 'node-the-midnight', target: 'node-sunset', weight: 5, relationship: 'Isolation Synthwave Anchor', affinity: 93 },
  { id: 'e13', source: 'node-max-richter', target: 'node-daylight', weight: 5, relationship: '2024 Deep Architecture Standard', affinity: 97 },
  { id: 'e14', source: 'node-max-richter', target: 'node-era-ambient', weight: 4, relationship: 'Anchor for Cognitive Stasis', affinity: 94 },
  { id: 'e15', source: 'node-fred', target: 'node-era-ambient', weight: 2, relationship: 'Tempo Transition Bridge', affinity: 62 },
  { id: 'e16', source: 'node-kyoto', target: 'node-habit-2am', weight: 4, relationship: 'Peak Repeat Trigger at 01:45 AM', affinity: 93 }
];
