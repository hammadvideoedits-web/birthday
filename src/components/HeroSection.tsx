import { useState, useEffect } from 'react';
import { Heart, Sparkles, Cake, Gift, Image as ImageIcon, ScrollText, Calendar, Clock } from 'lucide-react';
import { LoveConfig } from '../types';

interface HeroSectionProps {
  config: LoveConfig;
  onOpenCake: () => void;
  onOpenGifts: () => void;
  onOpenLetter: () => void;
  onOpenMemories: () => void;
  onOpenVows: () => void;
  onOpenEnvelope?: () => void;
}

export function HeroSection({
  config,
  onOpenCake,
  onOpenGifts,
  onOpenLetter,
  onOpenMemories,
  onOpenVows,
  onOpenEnvelope,
}: HeroSectionProps) {
  const [timeTogether, setTimeTogether] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTime = () => {
      const start = new Date(config.meetingDate).getTime();
      const now = new Date().getTime();
      const diff = Math.max(0, now - start);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeTogether({ days, hours, minutes, seconds });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [config.meetingDate]);

  return (
    <section className="relative overflow-hidden pt-10 pb-16 px-4 sm:px-6">
      {/* Soft romantic ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-96 bg-rose-500/10 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Sweet relationship badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-100 dark:bg-rose-950/70 border border-rose-300 dark:border-rose-500/30 text-rose-800 dark:text-rose-200 text-xs sm:text-sm font-medium mb-6 shadow-sm">
          <Heart className="w-4 h-4 text-rose-500 fill-rose-500 animate-pulse" />
          <span>Special Birthday Tribute • Meri Jaan & My Future Wife</span>
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
        </div>

        {/* Main Emotional Headline */}
        <h1 className="font-serif-title text-3xl sm:text-5xl md:text-6xl text-stone-900 dark:text-white font-bold leading-tight tracking-tight">
          Salgirah Mubarak, <br className="hidden sm:inline" />
          <span className="font-love text-4xl sm:text-6xl md:text-7xl text-rose-600 dark:text-rose-400">
            {config.herName}
          </span>
        </h1>

        <p className="mt-4 text-base sm:text-lg text-stone-600 dark:text-stone-300 max-w-2xl mx-auto leading-relaxed">
          "Log kehte hain shaadi ke baad biwi banti hai... Lekin maine apne dil, apni duaon aur apni har saans mein tumhe pehle din se hi apni biwi maan liya hai."
        </p>

        {/* Special Surprise Envelope Banner */}
        {onOpenEnvelope && (
          <div
            onClick={onOpenEnvelope}
            className="cursor-pointer mt-6 p-4 sm:p-5 max-w-xl mx-auto rounded-2xl bg-gradient-to-r from-rose-900/60 via-pink-900/50 to-rose-900/60 border border-rose-400/50 shadow-lg hover:shadow-rose-600/30 hover:scale-102 transition-all group flex items-center justify-between gap-3 text-left"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-full bg-rose-600 border border-amber-300 flex items-center justify-center text-xl shadow-md group-hover:rotate-12 transition-transform">
                💌
              </div>
              <div>
                <span className="inline-block text-[10px] uppercase font-bold tracking-widest text-amber-300">
                  Special Wax-Sealed Delivery
                </span>
                <h4 className="font-serif-title text-base sm:text-lg font-bold text-white group-hover:text-rose-200 transition-colors">
                  Open Surprise Envelope For {config.herName}
                </h4>
                <p className="text-xs text-rose-200/80 font-love text-sm">
                  Click to unwrap petals & play celebration music 🎵
                </p>
              </div>
            </div>
            <span className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-full bg-white/20 text-white group-hover:bg-rose-500 transition-colors">
              Open 🎁
            </span>
          </div>
        )}

        {/* Poetry Card */}
        <div className="mt-8 max-w-xl mx-auto p-5 rounded-2xl bg-white/70 dark:bg-stone-900/60 backdrop-blur-md border border-rose-200 dark:border-rose-500/20 shadow-md">
          <div className="space-y-1.5 font-love text-lg sm:text-xl text-rose-800 dark:text-rose-300">
            {config.poetryLines.map((line, idx) => (
              <p key={idx}>{line}</p>
            ))}
          </div>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-3 font-sans-body">
            — Hamesha sirf tumhara, <strong className="text-rose-600 dark:text-rose-400">{config.hisName}</strong>
          </p>
        </div>

        {/* Love Clock / Milestone counter */}
        <div className="mt-8 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-rose-500/10 via-pink-500/10 to-rose-500/10 dark:from-rose-950/40 dark:via-stone-900 dark:to-rose-950/40 border border-rose-200 dark:border-rose-500/30 max-w-2xl mx-auto shadow-lg">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-3 text-xs sm:text-sm font-semibold tracking-wide text-rose-700 dark:text-rose-300 mb-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-400/30 text-rose-200 font-sans-body">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>Pehli Mulaqat: <strong>28 Nov 2025, 5:30 PM</strong></span>
            </span>
            <span className="inline-flex items-center gap-1 text-rose-400">
              <Clock className="w-3.5 h-3.5" />
              <span>Loving You Every Single Second</span>
            </span>
          </div>

          <div className="grid grid-cols-4 gap-2 sm:gap-4 text-center">
            <div className="bg-white/80 dark:bg-stone-800/80 p-2.5 sm:p-3 rounded-xl shadow-xs border border-rose-100 dark:border-rose-900/40">
              <span className="block text-xl sm:text-3xl font-bold text-rose-600 dark:text-rose-400 font-serif-title">
                {timeTogether.days}
              </span>
              <span className="text-[10px] sm:text-xs text-stone-500 dark:text-stone-400 font-medium">Days</span>
            </div>
            <div className="bg-white/80 dark:bg-stone-800/80 p-2.5 sm:p-3 rounded-xl shadow-xs border border-rose-100 dark:border-rose-900/40">
              <span className="block text-xl sm:text-3xl font-bold text-rose-600 dark:text-rose-400 font-serif-title">
                {timeTogether.hours}
              </span>
              <span className="text-[10px] sm:text-xs text-stone-500 dark:text-stone-400 font-medium">Hours</span>
            </div>
            <div className="bg-white/80 dark:bg-stone-800/80 p-2.5 sm:p-3 rounded-xl shadow-xs border border-rose-100 dark:border-rose-900/40">
              <span className="block text-xl sm:text-3xl font-bold text-rose-600 dark:text-rose-400 font-serif-title">
                {timeTogether.minutes}
              </span>
              <span className="text-[10px] sm:text-xs text-stone-500 dark:text-stone-400 font-medium">Minutes</span>
            </div>
            <div className="bg-white/80 dark:bg-stone-800/80 p-2.5 sm:p-3 rounded-xl shadow-xs border border-rose-100 dark:border-rose-900/40">
              <span className="block text-xl sm:text-3xl font-bold text-rose-600 dark:text-rose-400 font-serif-title">
                {timeTogether.seconds}
              </span>
              <span className="text-[10px] sm:text-xs text-stone-500 dark:text-stone-400 font-medium">Seconds</span>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-rose-300 mt-3 text-center font-love text-base">
            "28 November 2025 ki shaam 5:30 baje se lekar aaj tak meri har saans aur dua par sirf Zaria ka naam hai..." ❤️
          </p>
        </div>

        {/* Real Story Highlight: 2 Calls & Long Distance Truth */}
        <div className="mt-6 max-w-2xl mx-auto p-4 sm:p-5 rounded-2xl bg-stone-900/90 border border-rose-500/30 text-left shadow-lg">
          <div className="flex items-center gap-2 mb-3 text-xs font-bold uppercase tracking-wider text-rose-300">
            <span>✨</span>
            <span>Humari Haqeeqi Mohabbat Ki Dastaan</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/20">
              <span className="text-xs font-semibold text-rose-400 block mb-1">📞 Sirf 2 Dafa Call Par Baat:</span>
              <p className="text-xs text-stone-300 leading-relaxed">
                Pehli dafa sirf <strong className="text-white">5 minute</strong> baat hui thi... Aur doosri baar jab <strong className="text-white">mama ghar par nahi theen</strong> toh poore <strong className="text-amber-300">54 minute</strong> ki woh anmol call jiska ek ek lafz mere dil mein hamesha ke liye qaid hai!
              </p>
            </div>
            <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/20">
              <span className="text-xs font-semibold text-rose-400 block mb-1">✈️ Long Distance & Purity:</span>
              <p className="text-xs text-stone-300 leading-relaxed">
                Hum dono door hain aur abhi sath mein koi photo nahi hai, lekin mere dil, meri rooh aur meri har dua ke andar tum meri pehli aur aakhri biwi ho.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Interactive Nav Pills */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
          <button
            onClick={onOpenGifts}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500 via-rose-600 to-pink-600 hover:from-amber-400 hover:to-pink-500 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-rose-600/30 transition-all hover:scale-105 border border-amber-300/40"
          >
            <Gift className="w-4 h-4 animate-bounce" />
            <span>🎁 Open 3 Surprise Gifts (Separate Page)</span>
          </button>

          <button
            onClick={onOpenCake}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-rose-600 hover:bg-rose-500 text-white text-xs sm:text-sm font-medium shadow-md shadow-rose-600/30 transition-all hover:scale-105"
          >
            <Cake className="w-4 h-4" />
            <span>🎂 Blow Candles & Cut Cake</span>
          </button>

          <button
            onClick={onOpenLetter}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white dark:bg-stone-800 hover:bg-rose-50 dark:hover:bg-stone-700 text-stone-800 dark:text-rose-200 border border-rose-200 dark:border-rose-500/30 text-xs sm:text-sm font-medium shadow-xs transition-all hover:scale-105"
          >
            <ScrollText className="w-4 h-4 text-rose-500" />
            <span>💌 Love Letter For Zaria</span>
          </button>

          <button
            onClick={onOpenMemories}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white dark:bg-stone-800 hover:bg-rose-50 dark:hover:bg-stone-700 text-stone-800 dark:text-rose-200 border border-rose-200 dark:border-rose-500/30 text-xs sm:text-sm font-medium shadow-xs transition-all hover:scale-105"
          >
            <ImageIcon className="w-4 h-4 text-rose-500" />
            <span>✈️ Long Distance Story</span>
          </button>

          <button
            onClick={onOpenVows}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white dark:bg-stone-800 hover:bg-rose-50 dark:hover:bg-stone-700 text-stone-800 dark:text-rose-200 border border-rose-200 dark:border-rose-500/30 text-xs sm:text-sm font-medium shadow-xs transition-all hover:scale-105"
          >
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
            <span>💍 7 Sacred Vows</span>
          </button>
        </div>
      </div>
    </section>
  );
}
