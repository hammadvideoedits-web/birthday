import { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music, Sparkles } from 'lucide-react';
import { romanticAudio } from '../utils/audio';

interface AudioPlayerBarProps {
  herName: string;
  currentPage?: string;
  onSelectPage?: (page: string) => void;
  onOpenEnvelope?: () => void;
  onNavigate?: (id: string) => void;
}

export function AudioPlayerBar({
  herName,
  currentPage = 'home',
  onSelectPage,
  onOpenEnvelope,
  onNavigate,
}: AudioPlayerBarProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Check initial state
    setIsPlaying(romanticAudio.isBgmActive());
  }, []);

  const handleToggle = () => {
    const nextState = romanticAudio.toggleRomanticBgm((playing) => {
      setIsPlaying(playing);
    });
    setIsPlaying(nextState);
  };

  const handleSparkle = () => {
    romanticAudio.playSparkle();
  };

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-stone-900/90 border-b border-rose-500/25 text-stone-200 px-3 sm:px-4 py-2.5 shadow-lg transition-all">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-3 text-sm">
        <div
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => onSelectPage ? onSelectPage('home') : onNavigate?.('hero-section')}
        >
          <span className="relative flex h-2.5 w-2.5">
            {isPlaying && (
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
            )}
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
          </span>
          <div className="flex items-center gap-1.5 font-medium text-rose-200 text-xs sm:text-sm">
            <span className="text-white font-bold text-sm tracking-wide group-hover:text-rose-300 transition-colors">
              {herName}
            </span>
            <span className="text-rose-400 font-love text-base sm:text-lg">❤️ Meri Biwi</span>
          </div>
        </div>

        {/* Quick section & page links */}
        <nav className="hidden md:flex items-center gap-1.5 lg:gap-2 text-xs font-medium text-stone-300">
          <button
            onClick={() => onSelectPage ? onSelectPage('home') : onNavigate?.('hero-section')}
            className={`px-3 py-1 rounded-full transition-all ${
              currentPage === 'home'
                ? 'bg-rose-600 text-white font-semibold shadow-xs'
                : 'hover:text-white hover:bg-stone-800 text-stone-300'
            }`}
          >
            🏠 Home
          </button>
          <button
            onClick={() => onSelectPage ? onSelectPage('gifts') : onNavigate?.('surprise-gifts-section')}
            className={`px-3 py-1 rounded-full transition-all flex items-center gap-1 ${
              currentPage === 'gifts'
                ? 'bg-gradient-to-r from-amber-500 to-rose-600 text-white font-semibold shadow-xs'
                : 'text-amber-300 hover:text-white hover:bg-stone-800'
            }`}
          >
            <span>🎁 3 Gifts Page</span>
          </button>
          <button
            onClick={() => onSelectPage ? onSelectPage('cake') : onNavigate?.('interactive-cake-section')}
            className={`px-3 py-1 rounded-full transition-all ${
              currentPage === 'cake'
                ? 'bg-rose-600 text-white font-semibold shadow-xs'
                : 'hover:text-white hover:bg-stone-800 text-stone-300'
            }`}
          >
            🎂 Cake
          </button>
          <button
            onClick={() => onSelectPage ? onSelectPage('memories') : onNavigate?.('memory-gallery-section')}
            className={`px-3 py-1 rounded-full transition-all ${
              currentPage === 'memories'
                ? 'bg-rose-600 text-white font-semibold shadow-xs'
                : 'hover:text-white hover:bg-stone-800 text-stone-300'
            }`}
          >
            ✈️ Long Distance
          </button>
          <button
            onClick={() => onSelectPage ? onSelectPage('reasons') : onNavigate?.('reasons-section')}
            className={`px-3 py-1 rounded-full transition-all ${
              currentPage === 'reasons'
                ? 'bg-rose-600 text-white font-semibold shadow-xs'
                : 'hover:text-white hover:bg-stone-800 text-stone-300'
            }`}
          >
            💖 16 Reasons
          </button>
          <button
            onClick={() => onSelectPage ? onSelectPage('vows') : onNavigate?.('vows-section')}
            className={`px-3 py-1 rounded-full transition-all ${
              currentPage === 'vows'
                ? 'bg-rose-600 text-white font-semibold shadow-xs'
                : 'hover:text-white hover:bg-stone-800 text-stone-300'
            }`}
          >
            💍 7 Vows
          </button>
        </nav>

        <div className="flex items-center gap-2">
          {onOpenEnvelope && (
            <button
              onClick={onOpenEnvelope}
              className="px-2.5 py-1 text-xs rounded-full bg-rose-950/80 hover:bg-rose-900 border border-rose-500/40 text-rose-200 transition-colors flex items-center gap-1 shadow-xs"
            >
              <span>💌 Envelope</span>
            </button>
          )}

          {/* Sparkle sound button */}
          <button
            id="audio-sparkle-btn"
            onClick={handleSparkle}
            title="Play romantic sparkle chime"
            className="hidden sm:flex items-center gap-1 px-2.5 py-1 text-xs rounded-full bg-stone-800 hover:bg-stone-700 border border-stone-700 text-rose-200 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Sparkle</span>
          </button>

          {/* Music player toggle */}
          <button
            id="audio-bgm-toggle-btn"
            onClick={handleToggle}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all shadow-sm ${
              isPlaying
                ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-rose-900/40 ring-2 ring-rose-400/40'
                : 'bg-stone-800 hover:bg-stone-700 text-stone-300 border border-stone-700'
            }`}
          >
            {isPlaying ? (
              <>
                <Volume2 className="w-4 h-4 animate-bounce text-white" />
                <span className="hidden sm:inline">Romantic Song ON</span>
                <span className="sm:hidden">Music ON</span>
                {/* Visualizer bars */}
                <span className="flex items-end gap-0.5 h-3">
                  <span className="w-0.5 h-2 bg-white animate-pulse" style={{ animationDelay: '0.1s' }} />
                  <span className="w-0.5 h-3 bg-white animate-pulse" style={{ animationDelay: '0.3s' }} />
                  <span className="w-0.5 h-1.5 bg-white animate-pulse" style={{ animationDelay: '0.2s' }} />
                </span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-stone-400" />
                <span>Play Music 🎵</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
