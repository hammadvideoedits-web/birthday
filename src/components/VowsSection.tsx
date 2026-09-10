import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Heart, Award, Sparkles, Check } from 'lucide-react';
import { fireCelebrationConfetti } from '../utils/confetti';
import { romanticAudio } from '../utils/audio';

interface VowsSectionProps {
  vows: Array<{ title: string; urdu: string; promise: string }>;
  herName: string;
  hisName: string;
}

export function VowsSection({ vows, herName, hisName }: VowsSectionProps) {
  const [accepted, setAccepted] = useState(false);

  const handleAcceptVows = () => {
    setAccepted(true);
    fireCelebrationConfetti();
    romanticAudio.playSparkle();
  };

  return (
    <section id="vows-section" className="py-16 px-4 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 dark:bg-amber-950/70 border border-amber-300 dark:border-amber-500/30 text-amber-800 dark:text-amber-200 text-xs font-semibold uppercase tracking-wider mb-2">
          <Award className="w-3.5 h-3.5 text-amber-500" />
          <span>Saat Pavitr Waaday • Sacred Promises</span>
        </div>
        <h2 className="font-serif-title text-3xl sm:text-5xl text-stone-900 dark:text-white font-bold">
          My 7 Sacred Vows To My Wife
        </h2>
        <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 mt-2 max-w-xl mx-auto">
          These are not just words, but lifetime commitments sworn to you from the depths of my soul.
        </p>
      </div>

      {/* Vows Stack */}
      <div className="space-y-4">
        {vows.map((vow, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.08 }}
            className="p-5 sm:p-6 rounded-2xl bg-white/80 dark:bg-stone-900/80 backdrop-blur-md border border-rose-200 dark:border-rose-500/20 shadow-sm hover:shadow-md hover:border-rose-400/50 transition-all"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-500 to-amber-500 text-white flex items-center justify-center font-serif-title font-bold text-base shrink-0 shadow-md">
                0{idx + 1}
              </div>

              <div className="flex-1">
                <div className="flex flex-wrap items-baseline gap-2 mb-1">
                  <h3 className="font-serif-title text-base sm:text-lg font-bold text-stone-900 dark:text-rose-100">
                    {vow.title}
                  </h3>
                  <span className="font-love text-lg sm:text-xl text-rose-600 dark:text-rose-400 font-bold">
                    • {vow.urdu}
                  </span>
                </div>

                <p className="text-stone-700 dark:text-stone-300 text-sm sm:text-base leading-relaxed">
                  {vow.promise}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Commitment Action / Certificate */}
      <div className="mt-12 text-center">
        {!accepted ? (
          <button
            id="accept-vows-btn"
            onClick={handleAcceptVows}
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 hover:from-rose-500 hover:to-pink-500 text-white font-semibold text-sm sm:text-base shadow-lg shadow-rose-600/30 transition-transform hover:scale-105 active:scale-95"
          >
            <ShieldCheck className="w-5 h-5 text-amber-300" />
            <span>I Accept Your Vows, Meri Jaan ❤️</span>
          </button>
        ) : (
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-rose-900 via-stone-900 to-rose-950 text-white border-2 border-amber-400/60 shadow-2xl max-w-xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-semibold mb-3">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Covenant of Hearts Sealed Forever</span>
            </div>

            <h3 className="font-love text-3xl sm:text-4xl text-amber-300 font-bold">
              Bond of Eternal Love
            </h3>

            <p className="text-stone-300 text-sm mt-3 leading-relaxed">
              "Witnessed by the stars, written in destiny: <strong>{herName}</strong> and <strong>{hisName}</strong>, destined husband and wife in this world and the hereafter."
            </p>

            <div className="mt-6 pt-4 border-t border-rose-500/30 flex justify-between items-center text-xs text-rose-300">
              <span>Date: Today & Always</span>
              <span>Signed with Pure Love ❤️</span>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
