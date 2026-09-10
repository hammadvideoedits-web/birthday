import { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles, CheckCircle2 } from 'lucide-react';
import { romanticAudio } from '../utils/audio';
import { fireHeartConfetti } from '../utils/confetti';

interface ReasonsWhyILoveYouProps {
  reasons: string[];
  wifeNickname: string;
}

export function ReasonsWhyILoveYou({ reasons, wifeNickname }: ReasonsWhyILoveYouProps) {
  const [revealed, setRevealed] = useState<number[]>([0, 1, 2]); // First 3 unlocked by default

  const toggleReason = (idx: number) => {
    if (revealed.includes(idx)) {
      setRevealed(revealed.filter((i) => i !== idx));
    } else {
      setRevealed([...revealed, idx]);
      romanticAudio.playSparkle();
      if (revealed.length + 1 === reasons.length) {
        fireHeartConfetti();
      }
    }
  };

  const unlockAll = () => {
    setRevealed(reasons.map((_, i) => i));
    romanticAudio.playSparkle();
    fireHeartConfetti();
  };

  return (
    <section id="reasons-section" className="py-16 px-4 max-w-5xl mx-auto">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-100 dark:bg-rose-950/70 border border-rose-300 dark:border-rose-500/30 text-rose-800 dark:text-rose-200 text-xs font-semibold uppercase tracking-wider mb-2">
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          <span>Little Things That Mean Everything</span>
        </div>
        <h2 className="font-serif-title text-3xl sm:text-5xl text-stone-900 dark:text-white font-bold">
          Why You Are My Forever Wife
        </h2>
        <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 mt-2 max-w-xl mx-auto">
          Tap each card to unlock the reasons why my heart chose you, and will keep choosing you in every lifetime, {wifeNickname}.
        </p>

        {/* Progress badge */}
        <div className="mt-4 inline-flex items-center gap-3 bg-white dark:bg-stone-900 px-4 py-1.5 rounded-full border border-rose-200 dark:border-rose-500/30 shadow-xs">
          <span className="text-xs text-stone-600 dark:text-stone-300">
            Unlocked: <strong className="text-rose-600 dark:text-rose-400">{revealed.length}</strong> / {reasons.length}
          </span>
          {revealed.length < reasons.length && (
            <button
              onClick={unlockAll}
              className="text-xs font-semibold text-rose-600 hover:text-rose-700 dark:text-rose-400 dark:hover:text-rose-300 underline"
            >
              Reveal All ✨
            </button>
          )}
        </div>
      </div>

      {/* Grid of Reason Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {reasons.map((reason, idx) => {
          const isUnlocked = revealed.includes(idx);

          return (
            <motion.div
              key={idx}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => toggleReason(idx)}
              className={`cursor-pointer min-h-[140px] p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
                isUnlocked
                  ? 'bg-gradient-to-br from-white to-rose-50/70 dark:from-stone-900 dark:to-rose-950/40 border-rose-300 dark:border-rose-500/40 shadow-md'
                  : 'bg-stone-100 dark:bg-stone-900/60 border-stone-200 dark:border-stone-800 hover:border-rose-300 dark:hover:border-rose-500/30 shadow-xs'
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-serif-title font-bold text-rose-500/80">
                  #{idx + 1}
                </span>
                {isUnlocked ? (
                  <Heart className="w-4 h-4 text-rose-500 fill-rose-500 animate-pulse" />
                ) : (
                  <Sparkles className="w-4 h-4 text-stone-400" />
                )}
              </div>

              {isUnlocked ? (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-stone-800 dark:text-rose-100 text-xs sm:text-sm font-medium leading-relaxed"
                >
                  "{reason}"
                </motion.p>
              ) : (
                <div className="py-4 text-center">
                  <span className="text-xs text-stone-500 dark:text-stone-400 font-medium">
                    Tap to reveal reason ❤️
                  </span>
                </div>
              )}

              <div className="mt-2 pt-2 border-t border-rose-100 dark:border-stone-800/80 flex items-center justify-between text-[10px] text-stone-400">
                <span>{isUnlocked ? 'From My Heart' : 'Secret'}</span>
                <span>{isUnlocked ? '❤️' : '🔒'}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
