import { useState, useEffect } from 'react';
import { initialLoveConfig } from './data/defaultConfig';
import { LoveConfig, MemoryItem } from './types';
import { AudioPlayerBar } from './components/AudioPlayerBar';
import { EnvelopeIntro } from './components/EnvelopeIntro';
import { HeroSection } from './components/HeroSection';
import { InteractiveCake } from './components/InteractiveCake';
import { SurpriseGiftBoxes } from './components/SurpriseGiftBoxes';
import { MemoryGallery } from './components/MemoryGallery';
import { ReasonsWhyILoveYou } from './components/ReasonsWhyILoveYou';
import { VowsSection } from './components/VowsSection';
import { FooterSection } from './components/FooterSection';
import { CustomizerModal } from './components/CustomizerModal';
import { Settings, ArrowLeft, Gift, Cake, Sparkles, Heart } from 'lucide-react';

const STORAGE_KEY = 'janam_birthday_surprise_zaria_v3';

export type AppPage = 'home' | 'gifts' | 'cake' | 'memories' | 'reasons' | 'vows';

export default function App() {
  const [config, setConfig] = useState<LoveConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...initialLoveConfig, ...JSON.parse(saved) };
      }
    } catch {
      // fallback
    }
    return initialLoveConfig;
  });

  const [envelopeOpened, setEnvelopeOpened] = useState(true);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<AppPage>(() => {
    try {
      const hash = window.location.hash.replace('#', '');
      if (['gifts', 'cake', 'memories', 'reasons', 'vows'].includes(hash)) {
        return hash as AppPage;
      }
    } catch {
      // ignore
    }
    return 'home';
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    } catch {
      // ignore
    }
  }, [config]);

  // Sync hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (['home', 'gifts', 'cake', 'memories', 'reasons', 'vows'].includes(hash)) {
        setCurrentPage((hash as AppPage) || 'home');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page: AppPage) => {
    setCurrentPage(page);
    try {
      window.location.hash = page === 'home' ? '' : page;
    } catch {
      // ignore
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateMemories = (newMemories: MemoryItem[]) => {
    setConfig((prev) => ({
      ...prev,
      memories: newMemories,
    }));
  };

  const handleSaveConfig = (newConfig: LoveConfig) => {
    setConfig(newConfig);
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 selection:bg-rose-500 selection:text-white relative">
      {/* Surprise Envelope Modal (Can be opened and closed anytime) */}
      {!envelopeOpened && (
        <EnvelopeIntro
          herName={config.herName}
          wifeNickname={config.wifeNickname}
          onOpen={() => setEnvelopeOpened(true)}
        />
      )}

      {/* Floating Customize Pill Button */}
      <button
        id="settings-trigger-btn"
        onClick={() => setIsCustomizerOpen(true)}
        title="Personalize names and details"
        className="fixed bottom-6 right-6 z-40 p-3.5 rounded-full bg-stone-900/90 hover:bg-stone-800 text-rose-300 hover:text-white border border-rose-500/30 shadow-2xl backdrop-blur-md transition-all hover:scale-110 active:scale-95 flex items-center gap-2 group"
      >
        <Settings className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />
        <span className="hidden sm:inline text-xs font-semibold pr-1 text-stone-200">
          Personalize
        </span>
      </button>

      {/* Persistent Audio Player and Multi-Page Navigation Bar */}
      <AudioPlayerBar
        herName={config.herName}
        currentPage={currentPage}
        onSelectPage={(p) => navigateTo(p as AppPage)}
        onOpenEnvelope={() => setEnvelopeOpened(false)}
      />

      {/* DEDICATED SEPARATE PAGE: 3 Mystery Surprise Gifts */}
      {currentPage === 'gifts' && (
        <main className="relative z-10 min-h-screen bg-stone-950">
          {/* Top Banner on Separate Gifts Page */}
          <div className="bg-gradient-to-r from-stone-900 via-rose-950/60 to-stone-900 border-b border-rose-500/20 py-3 px-4">
            <div className="max-w-5xl mx-auto flex items-center justify-between">
              <button
                onClick={() => navigateTo('home')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-800 hover:bg-stone-700 text-rose-300 hover:text-white text-xs font-medium border border-rose-500/30 transition-all hover:scale-105"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Wapis Main Page (Home)</span>
              </button>
              <div className="flex items-center gap-2 text-xs text-amber-300">
                <Gift className="w-4 h-4 text-amber-400 animate-pulse" />
                <span className="font-semibold">Dedicated Gifts Page</span>
              </div>
            </div>
          </div>

          <SurpriseGiftBoxes
            config={config}
            isDedicatedPage={true}
            onBackToHome={() => navigateTo('home')}
            onNavigateTo={(p) => navigateTo(p as AppPage)}
          />
        </main>
      )}

      {/* DEDICATED SEPARATE PAGE: Cake Cutting */}
      {currentPage === 'cake' && (
        <main className="relative z-10 min-h-screen bg-stone-950">
          <div className="bg-gradient-to-r from-stone-900 via-rose-950/60 to-stone-900 border-b border-rose-500/20 py-3 px-4">
            <div className="max-w-5xl mx-auto flex items-center justify-between">
              <button
                onClick={() => navigateTo('home')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-800 hover:bg-stone-700 text-rose-300 hover:text-white text-xs font-medium border border-rose-500/30 transition-all hover:scale-105"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Wapis Main Page (Home)</span>
              </button>
              <button
                onClick={() => navigateTo('gifts')}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-600 to-rose-600 text-white text-xs font-semibold shadow-md transition-all hover:scale-105"
              >
                <Gift className="w-3.5 h-3.5" />
                <span>Open 3 Gifts Page 🎁</span>
              </button>
            </div>
          </div>

          <div className="py-12">
            <InteractiveCake
              herName={config.herName}
              wifeNickname={config.wifeNickname}
            />
          </div>
        </main>
      )}

      {/* DEDICATED SEPARATE PAGE: Long Distance Memories */}
      {currentPage === 'memories' && (
        <main className="relative z-10 min-h-screen bg-stone-950">
          <div className="bg-gradient-to-r from-stone-900 via-rose-950/60 to-stone-900 border-b border-rose-500/20 py-3 px-4">
            <div className="max-w-5xl mx-auto flex items-center justify-between">
              <button
                onClick={() => navigateTo('home')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-800 hover:bg-stone-700 text-rose-300 hover:text-white text-xs font-medium border border-rose-500/30 transition-all hover:scale-105"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Wapis Main Page (Home)</span>
              </button>
              <button
                onClick={() => navigateTo('gifts')}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-600 to-rose-600 text-white text-xs font-semibold shadow-md transition-all hover:scale-105"
              >
                <Gift className="w-3.5 h-3.5" />
                <span>Open 3 Gifts Page 🎁</span>
              </button>
            </div>
          </div>

          <div className="py-12">
            <MemoryGallery
              memories={config.memories}
              onUpdateMemories={handleUpdateMemories}
              herName={config.herName}
            />
          </div>
        </main>
      )}

      {/* DEDICATED SEPARATE PAGE: 16 Reasons */}
      {currentPage === 'reasons' && (
        <main className="relative z-10 min-h-screen bg-stone-950">
          <div className="bg-gradient-to-r from-stone-900 via-rose-950/60 to-stone-900 border-b border-rose-500/20 py-3 px-4">
            <div className="max-w-5xl mx-auto flex items-center justify-between">
              <button
                onClick={() => navigateTo('home')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-800 hover:bg-stone-700 text-rose-300 hover:text-white text-xs font-medium border border-rose-500/30 transition-all hover:scale-105"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Wapis Main Page (Home)</span>
              </button>
              <button
                onClick={() => navigateTo('gifts')}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-600 to-rose-600 text-white text-xs font-semibold shadow-md transition-all hover:scale-105"
              >
                <Gift className="w-3.5 h-3.5" />
                <span>Open 3 Gifts Page 🎁</span>
              </button>
            </div>
          </div>

          <div className="py-12">
            <ReasonsWhyILoveYou
              reasons={config.reasons}
              wifeNickname={config.wifeNickname}
            />
          </div>
        </main>
      )}

      {/* DEDICATED SEPARATE PAGE: 7 Sacred Vows */}
      {currentPage === 'vows' && (
        <main className="relative z-10 min-h-screen bg-stone-950">
          <div className="bg-gradient-to-r from-stone-900 via-rose-950/60 to-stone-900 border-b border-rose-500/20 py-3 px-4">
            <div className="max-w-5xl mx-auto flex items-center justify-between">
              <button
                onClick={() => navigateTo('home')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-800 hover:bg-stone-700 text-rose-300 hover:text-white text-xs font-medium border border-rose-500/30 transition-all hover:scale-105"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Wapis Main Page (Home)</span>
              </button>
              <button
                onClick={() => navigateTo('gifts')}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-600 to-rose-600 text-white text-xs font-semibold shadow-md transition-all hover:scale-105"
              >
                <Gift className="w-3.5 h-3.5" />
                <span>Open 3 Gifts Page 🎁</span>
              </button>
            </div>
          </div>

          <div className="py-12">
            <VowsSection
              vows={config.vows}
              herName={config.herName}
              hisName={config.hisName}
            />
          </div>
        </main>
      )}

      {/* HOMEPAGE VIEW */}
      {currentPage === 'home' && (
        <main className="relative z-10">
          <HeroSection
            config={config}
            onOpenCake={() => navigateTo('cake')}
            onOpenGifts={() => navigateTo('gifts')}
            onOpenLetter={() => navigateTo('gifts')}
            onOpenMemories={() => navigateTo('memories')}
            onOpenVows={() => navigateTo('vows')}
            onOpenEnvelope={() => setEnvelopeOpened(false)}
          />

          {/* Room portals / Direct interactive showcase */}
          <div className="border-t border-rose-500/15 bg-gradient-to-b from-stone-950 via-rose-950/20 to-stone-950">
            <div className="max-w-5xl mx-auto px-4 py-8 text-center">
              <span className="text-xs uppercase tracking-wider font-semibold text-rose-400">
                Direct Pages & Rooms
              </span>
              <h3 className="font-serif-title text-2xl sm:text-3xl font-bold text-white mt-1">
                Khaas Rooms For My Wife Zaria
              </h3>
              <p className="text-xs sm:text-sm text-stone-400 mt-1 max-w-lg mx-auto">
                Click on any room below to open its dedicated separate web page:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4 mt-6">
                {/* 1. Gifts Page Portal */}
                <button
                  onClick={() => navigateTo('gifts')}
                  className="p-5 rounded-2xl bg-gradient-to-br from-amber-500/20 via-stone-900 to-rose-950/40 border-2 border-amber-400/50 hover:border-amber-300 shadow-xl text-left group transition-all hover:scale-103 relative overflow-hidden"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-3xl p-2 rounded-xl bg-amber-500/20 border border-amber-400/30 group-hover:rotate-12 transition-transform">
                      🎁
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-amber-500/30 text-amber-200 text-[11px] font-bold">
                      Dedicated Page →
                    </span>
                  </div>
                  <h4 className="font-serif-title text-base sm:text-lg font-bold text-amber-200 group-hover:text-white transition-colors">
                    3 Mystery Surprise Gifts
                  </h4>
                  <p className="text-xs text-stone-300 mt-1.5 leading-relaxed">
                    Ring, Dil Ka Khat & Lifetime Coupons. Tap to unwrap on a separate full web page.
                  </p>
                </button>

                {/* 2. Cake Cutting Room Portal */}
                <button
                  onClick={() => navigateTo('cake')}
                  className="p-5 rounded-2xl bg-gradient-to-br from-rose-950/30 via-stone-900 to-stone-900 border border-rose-500/30 hover:border-rose-400 shadow-xl text-left group transition-all hover:scale-103 relative overflow-hidden"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-3xl p-2 rounded-xl bg-rose-500/20 border border-rose-400/30 group-hover:scale-110 transition-transform">
                      🎂
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-300 text-[11px] font-semibold">
                      Open Page →
                    </span>
                  </div>
                  <h4 className="font-serif-title text-base sm:text-lg font-bold text-white group-hover:text-rose-300 transition-colors">
                    Birthday Cake & Candles
                  </h4>
                  <p className="text-xs text-stone-300 mt-1.5 leading-relaxed">
                    Light candles, blow them out with sparkles, and cut the digital birthday cake together.
                  </p>
                </button>

                {/* 3. Long Distance Story & 54-Min Call Portal */}
                <button
                  onClick={() => navigateTo('memories')}
                  className="p-5 rounded-2xl bg-gradient-to-br from-rose-950/30 via-stone-900 to-stone-900 border border-rose-500/30 hover:border-rose-400 shadow-xl text-left group transition-all hover:scale-103 relative overflow-hidden"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-3xl p-2 rounded-xl bg-rose-500/20 border border-rose-400/30 group-hover:scale-110 transition-transform">
                      ✈️
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-300 text-[11px] font-semibold">
                      Open Page →
                    </span>
                  </div>
                  <h4 className="font-serif-title text-base sm:text-lg font-bold text-white group-hover:text-rose-300 transition-colors">
                    Long Distance & 54 Min Call
                  </h4>
                  <p className="text-xs text-stone-300 mt-1.5 leading-relaxed">
                    28 Nov 2025, pehli 5 min call, aur mama jab ghar nahi theen toh 54 min ki anmol yaadein.
                  </p>
                </button>

                {/* 4. 16 Reasons Why You're My Wife Portal */}
                <button
                  onClick={() => navigateTo('reasons')}
                  className="p-5 rounded-2xl bg-gradient-to-br from-rose-950/30 via-stone-900 to-stone-900 border border-rose-500/30 hover:border-rose-400 shadow-xl text-left group transition-all hover:scale-103 relative overflow-hidden"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-3xl p-2 rounded-xl bg-rose-500/20 border border-rose-400/30 group-hover:scale-110 transition-transform">
                      💖
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-300 text-[11px] font-semibold">
                      Open Page →
                    </span>
                  </div>
                  <h4 className="font-serif-title text-base sm:text-lg font-bold text-white group-hover:text-rose-300 transition-colors">
                    16 Reasons Why You're My Wife
                  </h4>
                  <p className="text-xs text-stone-300 mt-1.5 leading-relaxed">
                    Kyun meri har saans aur taqdeer mein sirf Zaria ka naam likha hai.
                  </p>
                </button>

                {/* 5. 7 Sacred Vows Portal */}
                <button
                  onClick={() => navigateTo('vows')}
                  className="p-5 rounded-2xl bg-gradient-to-br from-rose-950/30 via-stone-900 to-stone-900 border border-rose-500/30 hover:border-rose-400 shadow-xl text-left group transition-all hover:scale-103 relative overflow-hidden"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-3xl p-2 rounded-xl bg-rose-500/20 border border-rose-400/30 group-hover:scale-110 transition-transform">
                      💍
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-300 text-[11px] font-semibold">
                      Open Page →
                    </span>
                  </div>
                  <h4 className="font-serif-title text-base sm:text-lg font-bold text-white group-hover:text-rose-300 transition-colors">
                    7 Sacred Vows to My Wife
                  </h4>
                  <p className="text-xs text-stone-300 mt-1.5 leading-relaxed">
                    Saat janam ke waaday, izzat, sabr aur dhoom dhaam se dulhan banaane ka wada.
                  </p>
                </button>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* Romantic Footer & Virtual Hugs */}
      <FooterSection
        herName={config.herName}
        hisName={config.hisName}
        onReopenEnvelope={() => setEnvelopeOpened(false)}
        onOpenCustomizer={() => setIsCustomizerOpen(true)}
      />

      {/* Customizer Modal */}
      <CustomizerModal
        config={config}
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        onSave={handleSaveConfig}
      />
    </div>
  );
}
