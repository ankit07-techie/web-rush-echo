// SpotAPI / Spotify Song Query Service
// Emulates the spotapi.Song query_songs and paginate_songs API structure:
// songs["data"]["searchV2"]["tracksV2"]["items"][idx]["item"]["data"]["name"]

export interface SpotApiTrackData {
  id: string;
  uri: string;
  name: string;
  trackNumber?: number;
  duration: {
    totalMilliseconds: number;
  };
  playability?: {
    playable: boolean;
  };
  albumOfTrack: {
    name: string;
    uri?: string;
    coverArt: {
      sources: Array<{
        url: string;
        width?: number;
        height?: number;
      }>;
    };
  };
  artists: {
    items: Array<{
      uri?: string;
      profile: {
        name: string;
      };
    }>;
  };
  previewUrl?: string;
  spotifyId?: string;
}

export interface SpotApiTrackItem {
  item: {
    data: SpotApiTrackData;
  };
}

export interface SpotApiSearchResponse {
  data: {
    searchV2: {
      tracksV2: {
        totalCount: number;
        items: SpotApiTrackItem[];
      };
    };
  };
}

interface ITunesTrackResult {
  trackId?: number;
  trackName?: string;
  trackNumber?: number;
  trackTimeMillis?: number;
  collectionName?: string;
  collectionId?: number;
  artistId?: number;
  artistName?: string;
  artworkUrl100?: string;
  previewUrl?: string;
}

// In-memory query cache for rapid repeat searches
const queryCache = new Map<string, SpotApiTrackItem[]>();

export class Song {
  /**
   * Queries a specific amount of songs matching the search query.
   * Matches: songs = song.query_songs("weezer", limit=20)
   * data = songs["data"]["searchV2"]["tracksV2"]["items"]
   */
  async query_songs(query: string, limit: number = 20, offset: number = 0): Promise<SpotApiSearchResponse> {
    const trimmed = query.trim();
    if (!trimmed) {
      return {
        data: {
          searchV2: {
            tracksV2: {
              totalCount: 0,
              items: [],
            },
          },
        },
      };
    }

    const cacheKey = `${trimmed.toLowerCase()}_${limit}_${offset}`;
    if (queryCache.has(cacheKey)) {
      const cached = queryCache.get(cacheKey)!;
      return {
        data: {
          searchV2: {
            tracksV2: {
              totalCount: cached.length,
              items: cached,
            },
          },
        },
      };
    }

    try {
      // Query open audio & metadata catalog with CORS support
      const itunesLimit = Math.min(Math.max(limit, 5), 50);
      const url = `https://itunes.apple.com/search?term=${encodeURIComponent(trimmed)}&entity=song&limit=${itunesLimit}&offset=${offset}`;
      const res = await fetch(url);
      
      if (!res.ok) {
        throw new Error(`Catalog query error: ${res.status}`);
      }

      const json = await res.json();
      const results = json.results || [];

      const items: SpotApiTrackItem[] = results.map((track: ITunesTrackResult, index: number) => {
        const id = String(track.trackId || `track_${offset + index}`);
        const artwork = (track.artworkUrl100 || '').replace('100x100bb', '600x600bb');
        
        return {
          item: {
            data: {
              id,
              uri: `spotify:track:${id}`,
              name: track.trackName || 'Untitled Track',
              trackNumber: track.trackNumber || index + 1,
              duration: {
                totalMilliseconds: track.trackTimeMillis || 210000,
              },
              playability: {
                playable: true,
              },
              albumOfTrack: {
                name: track.collectionName || 'Single / Collection',
                uri: `spotify:album:${track.collectionId || id}`,
                coverArt: {
                  sources: [
                    {
                      url: artwork || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=300&q=80',
                      width: 600,
                      height: 600,
                    },
                  ],
                },
              },
              artists: {
                items: [
                  {
                    uri: `spotify:artist:${track.artistId || id}`,
                    profile: {
                      name: track.artistName || 'Various Artists',
                    },
                  },
                ],
              },
              previewUrl: track.previewUrl || undefined,
              spotifyId: id,
            },
          },
        };
      });

      queryCache.set(cacheKey, items);

      return {
        data: {
          searchV2: {
            tracksV2: {
              totalCount: json.resultCount || items.length,
              items,
            },
          },
        },
      };
    } catch (err) {
      console.warn('Song.query_songs fallback active:', err);
      // Fallback local results for demo resilience if network is throttled
      const fallbackItems = this.getFallbackTracks(trimmed, limit);
      return {
        data: {
          searchV2: {
            tracksV2: {
              totalCount: fallbackItems.length,
              items: fallbackItems,
            },
          },
        },
      };
    }
  }

  /**
   * Paginates songs in batches of size batchSize until exhausted or max reached.
   * Matches: for batch in song.paginate_songs("weezer"):
   */
  async *paginate_songs(query: string, batchSize: number = 20, maxBatches: number = 5): AsyncGenerator<SpotApiTrackItem[], void, unknown> {
    let offset = 0;
    for (let i = 0; i < maxBatches; i++) {
      const resp = await this.query_songs(query, batchSize, offset);
      const items = resp.data.searchV2.tracksV2.items;
      if (!items || items.length === 0) {
        break;
      }
      yield items;
      offset += items.length;
      if (items.length < batchSize) {
        break;
      }
    }
  }

  /**
   * Helper to quickly get a playable audio preview and artwork for any track & artist.
   */
  async getTrackAudioDetails(title: string, artist?: string): Promise<{
    previewUrl?: string;
    artworkUrl?: string;
    album?: string;
    durationSeconds?: number;
    spotifyId?: string;
  }> {
    const query = artist ? `${artist} ${title}` : title;
    try {
      const resp = await this.query_songs(query, 5);
      const items = resp.data.searchV2.tracksV2.items;
      if (items && items.length > 0) {
        const top = items[0].item.data;
        return {
          previewUrl: top.previewUrl,
          artworkUrl: top.albumOfTrack.coverArt.sources[0]?.url,
          album: top.albumOfTrack.name,
          durationSeconds: Math.round(top.duration.totalMilliseconds / 1000),
          spotifyId: top.spotifyId,
        };
      }
    } catch (e) {
      console.warn('Could not resolve track preview:', e);
    }
    return {};
  }

  private getFallbackTracks(query: string, limit: number): SpotApiTrackItem[] {
    const q = query.toLowerCase();
    const mockLibrary = [
      { name: 'Island In the Sun', artist: 'Weezer', album: 'Weezer (Green Album)', preview: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/52/a6/03/52a6032e-39c0-fd3e-555d-ce683f3d9d31/mzaf_7707796819108024384.plus.aac.p.m4a', art: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=300&q=80' },
      { name: 'Buddy Holly', artist: 'Weezer', album: 'Weezer (Blue Album)', preview: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/96/ac/b6/96acb64d-ccef-21ff-c6f0-f82d2aebae50/mzaf_2299531817533401249.plus.aac.p.m4a', art: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=300&q=80' },
      { name: 'Say It Ain\'t So', artist: 'Weezer', album: 'Weezer (Blue Album)', preview: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/59/14/79/5914793b-4ea3-2410-57df-54468d8031b5/mzaf_11765119965533705431.plus.aac.p.m4a', art: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=300&q=80' },
      { name: 'Beverly Hills', artist: 'Weezer', album: 'Make Believe', preview: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/52/a6/03/52a6032e-39c0-fd3e-555d-ce683f3d9d31/mzaf_7707796819108024384.plus.aac.p.m4a', art: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=300&q=80' },
      { name: 'Undone - The Sweater Song', artist: 'Weezer', album: 'Weezer (Blue Album)', preview: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/96/ac/b6/96acb64d-ccef-21ff-c6f0-f82d2aebae50/mzaf_2299531817533401249.plus.aac.p.m4a', art: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=300&q=80' },
      { name: 'Kyoto', artist: 'Phoebe Bridgers', album: 'Punisher', preview: '', art: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=300&q=80' },
      { name: 'Holocene', artist: 'Bon Iver', album: 'Bon Iver, Bon Iver', preview: '', art: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=300&q=80' },
      { name: 'Midnight City', artist: 'M83', album: 'Hurry Up, We\'re Dreaming', preview: '', art: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=300&q=80' },
    ];

    const filtered = mockLibrary.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.artist.toLowerCase().includes(q) ||
        item.album.toLowerCase().includes(q)
    );

    const list = filtered.length > 0 ? filtered : mockLibrary;

    return list.slice(0, limit).map((track, idx) => ({
      item: {
        data: {
          id: `fallback_${idx}`,
          uri: `spotify:track:fallback_${idx}`,
          name: track.name,
          duration: { totalMilliseconds: 180000 },
          albumOfTrack: {
            name: track.album,
            coverArt: {
              sources: [{ url: track.art, width: 300, height: 300 }],
            },
          },
          artists: {
            items: [
              {
                profile: { name: track.artist },
              },
            ],
          },
          previewUrl: track.preview,
          spotifyId: `fallback_${idx}`,
        },
      },
    }));
  }
}

export const songService = new Song();
