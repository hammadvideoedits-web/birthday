import { Heart, Sparkles, RefreshCw, Send } from 'lucide-react';
import { fireHeartConfetti, fireCelebrationConfetti } from '../utils/confetti';
import { romanticAudio } from '../utils/audio';

interface FooterSectionProps {
  herName: string;
  hisName: string;
  onReopenEnvelope: () => void;
  onOpenCustomizer: () => void;
}

export function FooterSection({
  herName,
  hisName,
  onReopenEnvelope,
  onOpenCustomizer,
}: FooterSectionProps) {
  const sendKissAndHugs = () => {
    fireHeartConfetti();
    fireCelebrationConfetti();
    romanticAudio.playSparkle();
  };

  return (
    <footer className="mt-20 border-t border-rose-200 dark:border-rose-950 bg-stone-900 text-stone-300 py-12 px-4 relative overflow-hidden">
      {/* Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-32 bg-rose-600/10 blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
        <div className="inline-flex items-center justify-center p-3 rounded-full bg-rose-950/60 border border-rose-500/30">
          <Heart className="w-8 h-8 text-rose-500 fill-rose-500 animate-pulse" />
        </div>

        <h3 className="font-serif-title text-2xl sm:text-3xl text-white font-bold">
          Happy Birthday, <span className="font-love text-3xl sm:text-4xl text-rose-400">{herName}</span>
        </h3>

        <p className="font-love text-xl sm:text-2xl text-rose-300 max-w-lg mx-auto">
          "Tum meri pehli mohabbat aur aakhri manzil ho... Aaj, kal aur aane wale har janam mein, tum hi meri biwi ho."
        </p>

        {/* Send Virtual Hug & Kiss Button */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <button
            id="send-love-burst-btn"
            onClick={sendKissAndHugs}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 hover:from-rose-500 hover:to-pink-500 text-white font-semibold text-sm shadow-lg shadow-rose-900/50 transition-all transform hover:scale-105 active:scale-95"
          >
            <Send className="w-4 h-4" />
            <span>Send 1000 Kisses & Hugs 💋</span>
          </button>

          <button
            onClick={onReopenEnvelope}
            className="flex items-center gap-2 px-5 py-3 rounded-full bg-stone-800 hover:bg-stone-700 text-rose-200 text-xs sm:text-sm font-medium border border-stone-700 transition-colors"
          >
            <RefreshCw className="w-4 h-4 text-rose-400" />
            <span>Re-watch Surprise Envelope 💌</span>
          </button>
        </div>

        <div className="pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 gap-3">
          <p>
            Created with endless devotion by <strong className="text-rose-400">{hisName}</strong> for his queen
          </p>
          <button
            onClick={onOpenCustomizer}
            className="text-stone-400 hover:text-rose-300 underline text-xs transition-colors"
          >
            Personalize Names & Memories ⚙️
          </button>
        </div>
      </div>
    </footer>
  );
}
