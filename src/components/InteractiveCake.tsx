import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Flame, Wind, Sparkles, Heart, RefreshCw } from 'lucide-react';
import { fireCelebrationConfetti } from '../utils/confetti';
import { romanticAudio } from '../utils/audio';

interface InteractiveCakeProps {
  herName: string;
  wifeNickname: string;
}

export function InteractiveCake({ herName, wifeNickname }: InteractiveCakeProps) {
  const [candlesLit, setCandlesLit] = useState<boolean[]>([true, true, true, true, true]);
  const [cakeCut, setCakeCut] = useState(false);
  const [wished, setWished] = useState(false);

  const allCandlesOut = candlesLit.every((lit) => !lit);

  const blowOutCandle = (index: number) => {
    if (!candlesLit[index]) return;
    const next = [...candlesLit];
    next[index] = false;
    setCandlesLit(next);
    romanticAudio.playSparkle();

    if (next.every((lit) => !lit)) {
      handleAllBlown();
    }
  };

  const blowAllCandles = () => {
    setCandlesLit([false, false, false, false, false]);
    handleAllBlown();
  };

  const handleAllBlown = () => {
    setWished(true);
    fireCelebrationConfetti();
    romanticAudio.playBirthdayMelody();
  };

  const cutTheCake = () => {
    setCakeCut(true);
    fireCelebrationConfetti();
    romanticAudio.playSparkle();
  };

  const relightCandles = () => {
    setCandlesLit([true, true, true, true, true]);
    setCakeCut(false);
    setWished(false);
  };

  return (
    <section id="interactive-cake-section" className="py-16 px-4 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-pink-100 dark:bg-pink-950/70 border border-pink-300 dark:border-pink-500/30 text-pink-700 dark:text-pink-300 text-xs font-semibold uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Virtual Birthday Celebration</span>
        </div>
        <h2 className="font-serif-title text-3xl sm:text-4xl text-stone-900 dark:text-white font-bold">
          Make a Wish & Cut Your Cake
        </h2>
        <p className="text-sm text-stone-600 dark:text-stone-300 mt-2 max-w-lg mx-auto">
          Close your eyes, make the deepest wish in your heart, blow out the candles, and let me celebrate you, {wifeNickname}!
        </p>
      </div>

      <div className="relative max-w-md mx-auto bg-gradient-to-b from-stone-50 to-rose-50/50 dark:from-stone-900 dark:to-rose-950/30 rounded-3xl p-6 sm:p-8 border border-rose-200 dark:border-rose-500/20 shadow-xl overflow-hidden">
        {/* Floating sparkles */}
        <div className="absolute top-4 right-4 text-amber-400 animate-pulse">✨</div>
        <div className="absolute top-12 left-6 text-rose-400 animate-bounce">💖</div>

        {/* The Cake Construction Canvas */}
        <div className="relative flex flex-col items-center justify-center pt-8 pb-4">
          {/* Candles row */}
          <div className="flex items-end justify-center gap-5 sm:gap-6 mb-2 relative z-20">
            {candlesLit.map((isLit, idx) => (
              <div
                key={idx}
                onClick={() => blowOutCandle(idx)}
                className="cursor-pointer group flex flex-col items-center transition-transform hover:scale-110"
                title={isLit ? 'Click to blow out this candle!' : 'Blown out with a sweet wish'}
              >
                {/* Flame / Smoke */}
                <div className="h-8 flex items-center justify-center">
                  {isLit ? (
                    <motion.div
                      animate={{
                        scale: [1, 1.15, 0.95, 1],
                        rotate: [-2, 2, -1, 0],
                      }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                      className="text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.9)] animate-flame"
                    >
                      <Flame className="w-6 h-6 fill-amber-400" />
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 1, y: 0 }}
                      animate={{ opacity: 0, y: -16 }}
                      transition={{ duration: 1.5 }}
                      className="text-stone-400 text-xs font-mono select-none"
                    >
                      💨
                    </motion.div>
                  )}
                </div>

                {/* Candle Stick */}
                <div
                  className={`w-3 sm:w-3.5 h-12 rounded-t-sm shadow-sm border border-stone-300 dark:border-stone-600 ${
                    idx % 2 === 0
                      ? 'bg-gradient-to-b from-rose-300 via-pink-400 to-rose-400'
                      : 'bg-gradient-to-b from-amber-200 via-yellow-300 to-amber-400'
                  }`}
                />
              </div>
            ))}
          </div>

          {/* Top Tier (Frosting & Strawberries) */}
          <div className="relative w-44 sm:w-52 h-16 rounded-t-2xl bg-gradient-to-r from-rose-200 via-pink-100 to-rose-200 dark:from-rose-800 dark:via-pink-700 dark:to-rose-800 border-2 border-rose-300 dark:border-rose-500/50 shadow-md flex items-center justify-center overflow-hidden z-10">
            {/* Strawberry toppings */}
            <div className="flex gap-4">
              <span className="text-sm">🍓</span>
              <span className="text-sm">🍫</span>
              <span className="text-sm">🍓</span>
            </div>
            {/* Dripping frosting scallops */}
            <div className="absolute -bottom-1 inset-x-0 flex justify-between px-1">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="w-4 h-3 bg-white dark:bg-rose-200 rounded-b-full shadow-xs" />
              ))}
            </div>
          </div>

          {/* Bottom Tier (Main Sponge) */}
          <div className="relative w-64 sm:w-72 h-24 rounded-2xl bg-gradient-to-r from-rose-300 via-rose-200 to-pink-300 dark:from-rose-900 dark:via-pink-800 dark:to-rose-900 border-2 border-rose-400 dark:border-rose-500 shadow-xl flex items-center justify-center text-center p-2 z-0">
            <div className="bg-white/70 dark:bg-stone-900/70 backdrop-blur-xs px-4 py-1.5 rounded-full border border-rose-300 dark:border-rose-600 shadow-xs">
              <span className="font-love text-xl sm:text-2xl text-rose-700 dark:text-rose-300 font-bold">
                Happy Birthday {herName}
              </span>
            </div>

            {/* Cut slice animation indicator */}
            {cakeCut && (
              <motion.div
                initial={{ x: 0, opacity: 0 }}
                animate={{ x: 60, y: 15, opacity: 1, rotate: 8 }}
                className="absolute right-0 top-2 bg-pink-100 dark:bg-rose-700 p-2 rounded-lg shadow-lg border border-pink-300 text-xs font-semibold text-rose-800 dark:text-white"
              >
                🍰 For My Wife!
              </motion.div>
            )}
          </div>

          {/* Golden Cake Stand */}
          <div className="w-72 sm:w-80 h-4 bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 rounded-full shadow-lg border border-amber-400 mt-1" />
          <div className="w-24 h-4 bg-amber-400/80 rounded-b-md shadow-md mx-auto" />
        </div>

        {/* Action Controls */}
        <div className="mt-6 flex flex-col items-center gap-3">
          {!allCandlesOut ? (
            <button
              id="blow-all-candles-btn"
              onClick={blowAllCandles}
              className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-medium text-sm shadow-md shadow-rose-600/30 transition-transform hover:scale-105 active:scale-95"
            >
              <Wind className="w-4 h-4" />
              <span>Blow Out All Candles 💨</span>
            </button>
          ) : !cakeCut ? (
            <motion.button
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              id="cut-cake-btn"
              onClick={cutTheCake}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-amber-600 via-rose-600 to-pink-600 hover:from-amber-500 hover:to-rose-500 text-white font-semibold text-base shadow-lg shadow-rose-600/40 transition-transform hover:scale-105 active:scale-95 animate-pulse"
            >
              <span>🎂 Cut The First Slice, Meri Jaan! 🔪</span>
            </motion.button>
          ) : (
            <div className="text-center">
              <div className="p-4 rounded-2xl bg-rose-100 dark:bg-rose-950/60 border border-rose-300 dark:border-rose-500/30 text-rose-900 dark:text-rose-200 text-sm mb-3">
                <p className="font-love text-2xl text-rose-600 dark:text-rose-400 font-bold mb-1">
                  Mubarak Ho Meri Zindagi!
                </p>
                <p className="text-xs sm:text-sm">
                  Pehla meetha nivala meri sabse pyaari biwi ke naam. May all your prayers, dreams, and wishes come true this year!
                </p>
              </div>

              <button
                onClick={relightCandles}
                className="inline-flex items-center gap-1.5 text-xs text-stone-500 dark:text-stone-400 hover:text-rose-500 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Light Candles Again</span>
              </button>
            </div>
          )}

          {wished && !cakeCut && (
            <p className="text-xs text-rose-600 dark:text-rose-400 font-medium animate-bounce">
              All candles are out! Your wish has been sent to the heavens ✨ Now cut your cake!
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
