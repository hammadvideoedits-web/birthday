import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, Gift } from 'lucide-react';
import { fireCelebrationConfetti } from '../utils/confetti';
import { romanticAudio } from '../utils/audio';

interface EnvelopeIntroProps {
  herName: string;
  wifeNickname: string;
  onOpen: () => void;
}

export function EnvelopeIntro({ herName, wifeNickname, onOpen }: EnvelopeIntroProps) {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpenEnvelope = () => {
    setIsOpening(true);
    romanticAudio.playSparkle();
    romanticAudio.startRomanticBgm();
    fireCelebrationConfetti();
    setTimeout(() => {
      onOpen();
    }, 1200);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gradient-to-br from-stone-950 via-rose-950/90 to-stone-900 overflow-hidden">
        {/* Close / Skip button */}
        <button
          onClick={onOpen}
          className="absolute top-5 right-5 z-50 px-4 py-2 rounded-full bg-stone-900/80 hover:bg-stone-800 text-stone-300 hover:text-white text-xs border border-rose-500/30 backdrop-blur-md shadow-lg transition-all"
        >
          ✕ Explore Website Directly
        </button>

        {/* Subtle romantic floating background particles */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-10 left-1/4 w-72 h-72 rounded-full bg-rose-500 blur-3xl animate-pulse" />
          <div className="absolute bottom-10 right-1/4 w-80 h-80 rounded-full bg-pink-600 blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
        </div>

        {/* Floating petals aesthetic */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              initial={{
                y: -40,
                x: `${(i * 9) % 100}vw`,
                opacity: 0,
                rotate: 0,
              }}
              animate={{
                y: '105vh',
                opacity: [0, 0.7, 0.7, 0],
                rotate: 360,
              }}
              transition={{
                duration: 9 + (i % 5) * 2,
                repeat: Infinity,
                delay: i * 0.8,
                ease: 'linear',
              }}
              className="absolute text-rose-400/40 text-xl select-none"
            >
              🌸
            </motion.div>
          ))}
        </div>

        {/* Envelope Container */}
        <motion.div
          initial={{ scale: 0.92, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 1.1, opacity: 0, y: -30 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative w-full max-w-lg mx-auto"
        >
          {/* Header notice */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-900/60 border border-rose-500/40 text-rose-200 text-xs tracking-wider uppercase mb-3 shadow-lg">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" />
              <span>A Special Surprise Delivery</span>
            </div>
            <h1 className="font-serif-title text-2xl sm:text-3xl md:text-4xl text-rose-100 font-bold tracking-tight">
              Happy Birthday, <span className="font-love text-3xl sm:text-4xl md:text-5xl text-rose-300">{herName}</span>
            </h1>
            <p className="text-rose-200/80 text-sm mt-1.5 font-light">
              Jisay main apni biwi maanta hoon, meri rooh ki saathi...
            </p>
          </div>

          {/* Envelope Card */}
          <div
            id="surprise-envelope-card"
            onClick={handleOpenEnvelope}
            className={`cursor-pointer group relative bg-stone-900/90 rounded-2xl p-6 sm:p-8 border border-rose-500/30 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:border-rose-400/60 hover:shadow-rose-900/40 hover:-translate-y-1 ${
              isOpening ? 'scale-105 opacity-90' : ''
            }`}
          >
            {/* Wax seal ornament in center */}
            <div className="relative py-8 flex flex-col items-center justify-center text-center">
              {/* Envelope flap visual */}
              <div className="w-full h-24 mb-4 rounded-xl bg-gradient-to-b from-rose-900/40 to-stone-900/60 border border-rose-500/20 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(#fb7185_1px,transparent_1px)] [background-size:12px_12px] opacity-15" />
                <span className="font-love text-2xl sm:text-3xl text-rose-200">
                  {wifeNickname} ❤️
                </span>
              </div>

              {/* Wax Seal Badge */}
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-rose-700 via-rose-600 to-amber-500 p-1 shadow-xl flex items-center justify-center ring-4 ring-rose-950/60 transition-transform"
              >
                <div className="w-full h-full rounded-full bg-rose-900 border-2 border-amber-300/60 flex flex-col items-center justify-center text-center p-2">
                  <Heart className="w-6 h-6 text-rose-300 fill-rose-400 animate-pulse" />
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-amber-200 mt-0.5">
                    Sealed
                  </span>
                </div>
              </motion.div>

              <div className="mt-6 space-y-2">
                <p className="text-stone-300 text-sm sm:text-base font-medium">
                  There is a world of love, gifts, and vows waiting inside for you.
                </p>
                <p className="text-rose-300/80 text-xs italic font-serif-title">
                  "Har janam, har safar mein, tum hi meri biwi ho..."
                </p>
              </div>

              {/* Open button */}
              <button
                id="open-envelope-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenEnvelope();
                }}
                disabled={isOpening}
                className="mt-6 inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 hover:from-rose-500 hover:to-pink-500 text-white font-medium text-sm sm:text-base shadow-lg shadow-rose-900/50 hover:shadow-rose-600/40 transition-all transform hover:scale-105 active:scale-95"
              >
                <Gift className="w-4 h-4" />
                <span>{isOpening ? 'Opening Surprise...' : 'Click to Open Your Gift 🎁'}</span>
              </button>
            </div>
          </div>

          <p className="text-center text-stone-400 text-xs mt-4">
            Turn your sound on for the romantic music box melody 🎶
          </p>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
