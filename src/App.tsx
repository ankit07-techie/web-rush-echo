import React, { useState } from 'react';
import { ViewTab } from './types';
import { NavigationSidebar } from './components/NavigationSidebar';
import { GlobalHeader } from './components/GlobalHeader';
import { SoundPlayer, PlayerTrack } from './components/SoundPlayer';
import { ReceiptModal } from './components/ReceiptModal';
import { SearchPaletteModal } from './components/SearchPaletteModal';
import { HomeView } from './views/HomeView';
import { MyStoryView } from './views/MyStoryView';
import { TimelineView } from './views/TimelineView';
import { ArtistsAndSongsView } from './views/ArtistsAndSongsView';
import { PatternsView } from './views/PatternsView';
import { ConnectionExplorerView } from './views/ConnectionExplorerView';
import { songService } from './services/songService';

export default function App() {
  const [currentTab, setCurrentTab] = useState<ViewTab>('home');
  const [activeFilter, setActiveFilter] = useState<string>('all-time');
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);
  const [receiptTrackTitle, setReceiptTrackTitle] = useState<string | undefined>(undefined);
  const [isSearchPaletteOpen, setIsSearchPaletteOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  // Audio Capsule State
  const [currentTrack, setCurrentTrack] = useState<PlayerTrack | null>({
    title: 'Island In the Sun',
    artist: 'Weezer',
    album: 'Weezer (Green Album)',
    duration: '3:20',
    artworkUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80',
    previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/52/a6/03/52a6032e-39c0-fd3e-555d-ce683f3d9d31/mzaf_7707796819108024384.plus.aac.p.m4a',
    spotifyId: '3BQHpFgAp4l80e1XGRIjnv',
  });
  const [isPlayingSound, setIsPlayingSound] = useState(false);
  const [isPlayerVisible, setIsPlayerVisible] = useState(true);

  // Global Keyboard Shortcut: Cmd+K / Ctrl+K for search palette
  React.useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  const handleOpenReceipt = (trackTitle?: string) => {
    setReceiptTrackTitle(trackTitle);
    setIsReceiptModalOpen(true);
  };

  const handlePlaySong = async (title: string, artist: string) => {
    // Immediately set basic track state and make player visible
    setCurrentTrack({
      title,
      artist,
      duration: '3:45',
    });
    setIsPlayerVisible(true);
    setIsPlayingSound(true);

    // Resolve audio preview stream and Spotify metadata asynchronously
    try {
      const details = await songService.getTrackAudioDetails(title, artist);
      setCurrentTrack((prev) => ({
        title,
        artist,
        album: details.album || prev?.album,
        duration: details.durationSeconds
          ? `${Math.floor(details.durationSeconds / 60)}:${(details.durationSeconds % 60).toString().padStart(2, '0')}`
          : prev?.duration,
        durationSeconds: details.durationSeconds,
        artworkUrl: details.artworkUrl || prev?.artworkUrl,
        previewUrl: details.previewUrl || prev?.previewUrl,
        spotifyId: details.spotifyId || prev?.spotifyId,
      }));
    } catch (e) {
      console.warn('Error fetching track audio preview:', e);
    }
  };

  const handleToggleSound = () => {
    if (!isPlayerVisible) {
      setIsPlayerVisible(true);
      setIsPlayingSound(true);
      return;
    }
    setIsPlayingSound((prev) => !prev);
  };

  return (
    <div className="flex min-h-screen bg-[#11131b] text-[#e2e1ee] selection:bg-[#d0bcff] selection:text-[#3c0091]">
      {/* Desktop Navigation Sidebar */}
      <div className="hidden md:block">
        <NavigationSidebar
          currentTab={currentTab}
          onSelectTab={setCurrentTab}
          onOpenReceiptModal={() => handleOpenReceipt()}
        />
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileNavOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm md:hidden flex"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsMobileNavOpen(false);
          }}
        >
          <div className="w-72 bg-[#11131b] h-full shadow-2xl animate-in slide-in-from-left duration-200">
            <NavigationSidebar
              currentTab={currentTab}
              onSelectTab={(tab) => {
                setCurrentTab(tab);
                setIsMobileNavOpen(false);
              }}
              onOpenReceiptModal={() => {
                handleOpenReceipt();
                setIsMobileNavOpen(false);
              }}
            />
          </div>
        </div>
      )}

      {/* Main Content Workspace */}
      <div className="flex-1 flex flex-col min-w-0 pb-20 md:pb-6">
        <GlobalHeader
          currentTab={currentTab}
          activeFilter={activeFilter}
          onChangeFilter={setActiveFilter}
          onOpenSearch={() => setIsSearchPaletteOpen(true)}
          onOpenReceipt={() => handleOpenReceipt()}
          isPlayingSound={isPlayingSound}
          onTogglePlaySound={handleToggleSound}
          currentTrackName={currentTrack?.title}
          onOpenMobileMenu={() => setIsMobileNavOpen(true)}
        />

        <main className="flex-1 overflow-y-auto">
          {currentTab === 'home' && (
            <HomeView
              onNavigateTab={setCurrentTab}
              onOpenReceipt={handleOpenReceipt}
              onPlaySong={handlePlaySong}
            />
          )}

          {currentTab === 'my-story' && (
            <MyStoryView
              onOpenReceipt={handleOpenReceipt}
              onPlaySong={handlePlaySong}
            />
          )}

          {currentTab === 'timeline' && (
            <TimelineView
              onOpenReceipt={handleOpenReceipt}
              onPlaySong={handlePlaySong}
            />
          )}

          {currentTab === 'artists-and-songs' && (
            <ArtistsAndSongsView
              onOpenReceipt={handleOpenReceipt}
              onPlaySong={handlePlaySong}
            />
          )}

          {currentTab === 'patterns' && (
            <PatternsView
              onOpenReceipt={handleOpenReceipt}
              onPlaySong={handlePlaySong}
            />
          )}

          {currentTab === 'connection-explorer' && (
            <ConnectionExplorerView
              onOpenReceipt={handleOpenReceipt}
              onPlaySong={handlePlaySong}
            />
          )}
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-[#11131b]/95 backdrop-blur-lg border-t border-[#33343e] px-2 py-2 flex items-center justify-around">
        {[
          { id: 'home' as ViewTab, label: 'Home', icon: 'home' },
          { id: 'my-story' as ViewTab, label: 'Story', icon: 'auto_stories' },
          { id: 'timeline' as ViewTab, label: 'Timeline', icon: 'timeline' },
          { id: 'artists-and-songs' as ViewTab, label: 'Catalog', icon: 'queue_music' },
          { id: 'patterns' as ViewTab, label: 'Patterns', icon: 'insights' },
          { id: 'connection-explorer' as ViewTab, label: 'Nodes', icon: 'hub' },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setCurrentTab(item.id)}
            className={`flex flex-col items-center gap-1 py-1 px-2 rounded-lg text-[10px] font-syne uppercase tracking-wider transition-colors ${
              currentTab === item.id
                ? 'text-[#d0bcff] font-bold'
                : 'text-[#958ea0] hover:text-[#cbc3d7]'
            }`}
          >
            <span className="material-symbols-outlined text-lg">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      {/* Interactive Sound Capsule Player */}
      {isPlayerVisible && currentTrack && (
        <SoundPlayer
          currentTrack={currentTrack}
          isPlaying={isPlayingSound}
          onTogglePlay={handleToggleSound}
          onClose={() => {
            setIsPlayingSound(false);
            setIsPlayerVisible(false);
          }}
        />
      )}

      {/* Full Thermal Paper Receipt Modal */}
      <ReceiptModal
        isOpen={isReceiptModalOpen}
        onClose={() => setIsReceiptModalOpen(false)}
        selectedTrackTitle={receiptTrackTitle}
      />

      {/* Quick Search Palette Modal (Cmd+K) */}
      <SearchPaletteModal
        isOpen={isSearchPaletteOpen}
        onClose={() => setIsSearchPaletteOpen(false)}
        onSelectSong={handlePlaySong}
        onNavigateTab={setCurrentTab}
      />
    </div>
  );
}
