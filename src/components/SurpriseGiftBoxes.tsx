import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Gift, Sparkles, Heart, Crown, Check, Lock, ScrollText, Ticket } from 'lucide-react';
import { LoveConfig, LoveCoupon } from '../types';
import { fireCelebrationConfetti, fireHeartConfetti } from '../utils/confetti';
import { romanticAudio } from '../utils/audio';

interface SurpriseGiftBoxesProps {
  config: LoveConfig;
  isDedicatedPage?: boolean;
  onBackToHome?: () => void;
  onNavigateTo?: (page: string) => void;
}

export function SurpriseGiftBoxes({
  config,
  isDedicatedPage,
  onBackToHome,
  onNavigateTo,
}: SurpriseGiftBoxesProps) {
  const [openedBoxes, setOpenedBoxes] = useState<number[]>([1]); // default first one opened or available
  const [activeModal, setActiveModal] = useState<number | null>(null);
  const [coupons, setCoupons] = useState<LoveCoupon[]>(config.coupons);

  const handleOpenBox = (boxId: number) => {
    if (!openedBoxes.includes(boxId)) {
      setOpenedBoxes([...openedBoxes, boxId]);
    }
    setActiveModal(boxId);
    romanticAudio.playSparkle();
    fireHeartConfetti();
  };

  const handleRedeemCoupon = (couponId: string) => {
    setCoupons((prev) =>
      prev.map((c) => (c.id === couponId ? { ...c, redeemed: !c.redeemed } : c))
    );
    fireCelebrationConfetti();
    romanticAudio.playSparkle();
  };

  return (
    <section
      id="surprise-gifts-section"
      className={`px-4 max-w-5xl mx-auto ${
        isDedicatedPage ? 'py-10 sm:py-14 min-h-[85vh] flex flex-col justify-center' : 'py-16'
      }`}
    >
      {/* If this is a dedicated separate page, show header and back button */}
      {isDedicatedPage && (
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8 pb-4 border-b border-rose-500/20">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-stone-900 hover:bg-stone-800 text-rose-300 hover:text-white border border-rose-500/30 text-xs sm:text-sm font-medium shadow-md transition-all hover:scale-105"
          >
            <span>← Wapis Homepage Par Jayein</span>
          </button>
          <div className="flex items-center gap-2 text-xs text-rose-300 font-love text-base">
            <span>🎁 Dedicated Surprise Gift Room</span>
            <span>•</span>
            <span className="text-white font-bold">{config.herName}</span>
          </div>
        </div>
      )}

      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 dark:bg-amber-950/70 border border-amber-300 dark:border-amber-500/30 text-amber-800 dark:text-amber-200 text-xs font-semibold uppercase tracking-wider mb-2 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Special Birthday Packages • For Zaria</span>
        </div>
        <h2 className="font-serif-title text-3xl sm:text-5xl text-stone-900 dark:text-white font-bold">
          3 Mystery Surprise Gifts For You
        </h2>
        <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 mt-2 max-w-xl mx-auto">
          Chahe hum dono long distance mein hon, yeh 3 khaas tohfe mere dil ki gehraiyon se sirf tumhare liye hain. Tap each box to unwrap!
        </p>
      </div>

      {/* 3 Gift Boxes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {/* Gift Box 1: The Forever Ring */}
        <div
          id="gift-box-1"
          onClick={() => handleOpenBox(1)}
          className="group cursor-pointer relative bg-gradient-to-b from-stone-900 via-rose-950/60 to-stone-950 rounded-3xl p-7 border-2 border-rose-500/40 hover:border-rose-400 shadow-xl hover:shadow-rose-600/30 transition-all duration-300 transform hover:-translate-y-2 flex flex-col items-center text-center overflow-hidden"
        >
          <div className="absolute top-3 right-3">
            <span className="px-2.5 py-1 rounded-full bg-rose-500/30 text-rose-200 border border-rose-400/40 text-[10px] font-semibold uppercase tracking-wider">
              Surprise 01
            </span>
          </div>

          <div className="my-6 relative">
            <motion.div
              whileHover={{ rotate: [-3, 3, -3], scale: 1.1 }}
              className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-amber-500 via-rose-600 to-pink-500 p-1 flex items-center justify-center shadow-lg"
            >
              <div className="w-full h-full bg-stone-950 rounded-xl flex items-center justify-center text-3xl">
                💍
              </div>
            </motion.div>
            <div className="absolute -bottom-2 -right-2 bg-amber-400 text-stone-950 p-1.5 rounded-full shadow-md">
              <Crown className="w-4 h-4" />
            </div>
          </div>

          <h3 className="font-serif-title text-xl font-bold text-white group-hover:text-rose-300 transition-colors">
            The Forever Promise Ring
          </h3>
          <p className="text-xs text-rose-200/70 mt-1 font-love text-base">
            "Meri Biwi Banane Ka Waada"
          </p>
          <p className="text-xs text-stone-400 mt-2 line-clamp-2">
            A sacred promise of eternal loyalty, holding hands through every storm, and our destiny together.
          </p>

          <button className="mt-5 w-full py-2.5 rounded-full bg-gradient-to-r from-rose-600 to-pink-600 group-hover:from-rose-500 group-hover:to-pink-500 text-white text-xs font-semibold shadow-md transition-colors flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Open Forever Token</span>
          </button>
        </div>

        {/* Gift Box 2: The Heartfelt Love Letter */}
        <div
          id="gift-box-2"
          onClick={() => handleOpenBox(2)}
          className="group cursor-pointer relative bg-gradient-to-b from-stone-900 via-rose-950/60 to-stone-950 rounded-3xl p-7 border-2 border-rose-500/40 hover:border-rose-400 shadow-xl hover:shadow-rose-600/30 transition-all duration-300 transform hover:-translate-y-2 flex flex-col items-center text-center overflow-hidden"
        >
          <div className="absolute top-3 right-3">
            <span className="px-2.5 py-1 rounded-full bg-rose-500/30 text-rose-200 border border-rose-400/40 text-[10px] font-semibold uppercase tracking-wider">
              Surprise 02
            </span>
          </div>

          <div className="my-6 relative">
            <motion.div
              whileHover={{ rotate: [3, -3, 3], scale: 1.1 }}
              className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-pink-500 via-rose-600 to-red-500 p-1 flex items-center justify-center shadow-lg"
            >
              <div className="w-full h-full bg-stone-950 rounded-xl flex items-center justify-center text-3xl">
                💌
              </div>
            </motion.div>
            <div className="absolute -bottom-2 -right-2 bg-rose-500 text-white p-1.5 rounded-full shadow-md">
              <Heart className="w-4 h-4 fill-white" />
            </div>
          </div>

          <h3 className="font-serif-title text-xl font-bold text-white group-hover:text-rose-300 transition-colors">
            Dil Ki Baat - Love Letter
          </h3>
          <p className="text-xs text-rose-200/70 mt-1 font-love text-base">
            "Sirf Tumhare Liye Likha Gaya"
          </p>
          <p className="text-xs text-stone-400 mt-2 line-clamp-2">
            A deeply emotional handwritten letter from my heart, telling you how much you truly mean to me.
          </p>

          <button className="mt-5 w-full py-2.5 rounded-full bg-gradient-to-r from-pink-600 to-rose-600 group-hover:from-pink-500 group-hover:to-rose-500 text-white text-xs font-semibold shadow-md transition-colors flex items-center justify-center gap-1.5">
            <ScrollText className="w-3.5 h-3.5" />
            <span>Read Secret Letter</span>
          </button>
        </div>

        {/* Gift Box 3: Romantic Coupons */}
        <div
          id="gift-box-3"
          onClick={() => handleOpenBox(3)}
          className="group cursor-pointer relative bg-gradient-to-b from-stone-900 via-rose-950/60 to-stone-950 rounded-3xl p-7 border-2 border-rose-500/40 hover:border-rose-400 shadow-xl hover:shadow-rose-600/30 transition-all duration-300 transform hover:-translate-y-2 flex flex-col items-center text-center overflow-hidden"
        >
          <div className="absolute top-3 right-3">
            <span className="px-2.5 py-1 rounded-full bg-rose-500/30 text-rose-200 border border-rose-400/40 text-[10px] font-semibold uppercase tracking-wider">
              Surprise 03
            </span>
          </div>

          <div className="my-6 relative">
            <motion.div
              whileHover={{ rotate: [-3, 3, -3], scale: 1.1 }}
              className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-amber-400 via-yellow-500 to-rose-500 p-1 flex items-center justify-center shadow-lg"
            >
              <div className="w-full h-full bg-stone-950 rounded-xl flex items-center justify-center text-3xl">
                🎟️
              </div>
            </motion.div>
            <div className="absolute -bottom-2 -right-2 bg-amber-400 text-stone-950 p-1.5 rounded-full shadow-md">
              <Ticket className="w-4 h-4" />
            </div>
          </div>

          <h3 className="font-serif-title text-xl font-bold text-white group-hover:text-rose-300 transition-colors">
            Biwi Sahiba Love Coupons
          </h3>
          <p className="text-xs text-rose-200/70 mt-1 font-love text-base">
            "6 Lifetime Special Passes"
          </p>
          <p className="text-xs text-stone-400 mt-2 line-clamp-2">
            Free passes for unlimited hugs, ice-cream dates, queen treatment, and winning every argument forever!
          </p>

          <button className="mt-5 w-full py-2.5 rounded-full bg-gradient-to-r from-amber-600 to-rose-600 group-hover:from-amber-500 group-hover:to-rose-500 text-white text-xs font-semibold shadow-md transition-colors flex items-center justify-center gap-1.5">
            <Ticket className="w-3.5 h-3.5" />
            <span>Claim Your Coupons</span>
          </button>
        </div>
      </div>

      {/* Bottom navigation on dedicated page */}
      {isDedicatedPage && (
        <div className="mt-12 pt-8 border-t border-rose-500/20 flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={onBackToHome}
            className="px-5 py-2.5 rounded-full bg-stone-900 hover:bg-stone-800 text-rose-300 hover:text-white border border-rose-500/30 text-xs sm:text-sm font-medium shadow-md transition-all flex items-center gap-2"
          >
            <span>← Wapis Homepage Par Jayein</span>
          </button>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <button
              onClick={() => onNavigateTo?.('cake')}
              className="px-4 py-2 rounded-full bg-rose-600 hover:bg-rose-500 text-white text-xs sm:text-sm font-medium shadow-md transition-all flex items-center gap-1.5"
            >
              <span>Cut Cake 🎂 →</span>
            </button>
            <button
              onClick={() => onNavigateTo?.('memories')}
              className="px-4 py-2 rounded-full bg-stone-800 hover:bg-stone-700 text-rose-200 border border-stone-700 text-xs sm:text-sm font-medium shadow-md transition-all flex items-center gap-1.5"
            >
              <span>Long Distance Story ✈️ →</span>
            </button>
          </div>
        </div>
      )}

      {/* Modal Popup for opened gifts */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-2xl bg-stone-900 border border-rose-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl text-stone-100 max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveModal(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 flex items-center justify-center text-sm font-bold transition-colors"
              >
                ✕
              </button>

              {/* Modal 1: The Ring */}
              {activeModal === 1 && (
                <div className="text-center py-4">
                  <div className="w-28 h-28 mx-auto mb-4 rounded-full bg-gradient-to-tr from-amber-400 to-rose-600 p-1 shadow-2xl flex items-center justify-center">
                    <div className="w-full h-full rounded-full bg-stone-950 flex items-center justify-center text-5xl">
                      💍
                    </div>
                  </div>

                  <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold">
                    Sacred Promise of Marriage
                  </span>
                  <h3 className="font-serif-title text-2xl sm:text-3xl font-bold text-rose-200 mt-1">
                    The Forever Token For My Wife
                  </h3>

                  <div className="mt-6 p-6 rounded-2xl bg-rose-950/40 border border-rose-500/30 text-left space-y-4">
                    <p className="font-love text-2xl sm:text-3xl text-rose-300 text-center">
                      "Meri Jaan, You are my wife forever."
                    </p>
                    <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
                      Chahe duniya ki rasmon mein thoda waqt ho, lekin mere dil, meri rooh aur meri duaon mein tum meri biwi ban chuki ho.
                    </p>
                    <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
                      Yeh ring sirf ek tasweer nahi, mera waada hai ke ek din bohot jald main sabke saamne tumhari ungli mein yeh ring pehnaunga aur dhoom dhaam se tumhe apne ghar lekar aaunga.
                    </p>
                    <div className="border-t border-rose-500/20 pt-4 flex items-center justify-between text-xs text-rose-300">
                      <span>Promise Kept Forever</span>
                      <span>Hamesha sirf tumhara, {config.hisName}</span>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-center gap-3">
                    <button
                      onClick={() => {
                        fireCelebrationConfetti();
                        romanticAudio.playSparkle();
                      }}
                      className="px-6 py-2.5 rounded-full bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-medium text-sm shadow-lg flex items-center gap-2"
                    >
                      <Heart className="w-4 h-4 fill-white" />
                      <span>Accept This Ring & Promise ❤️</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Modal 2: Love Letter */}
              {activeModal === 2 && (
                <div className="py-2">
                  <div className="text-center mb-6">
                    <span className="text-xs uppercase tracking-widest text-rose-400 font-semibold">
                      From the Depth of My Heart
                    </span>
                    <h3 className="font-serif-title text-2xl sm:text-3xl font-bold text-rose-200 mt-1">
                      Dil Ki Baat — A Letter to My Wife
                    </h3>
                  </div>

                  {/* Letter Parchment visual */}
                  <div className="p-6 sm:p-8 rounded-2xl bg-amber-50 text-stone-900 border-2 border-amber-200 shadow-inner relative overflow-hidden">
                    <div className="absolute top-2 right-4 text-rose-800/20 text-6xl select-none font-love">
                      ❤️
                    </div>
                    <div className="whitespace-pre-line text-sm sm:text-base leading-relaxed font-sans-body">
                      {config.customLetter}
                    </div>

                    <div className="mt-6 pt-4 border-t border-amber-200 flex items-center justify-between text-stone-700">
                      <span className="font-love text-xl text-rose-700">Forever & Always,</span>
                      <span className="font-serif-title font-bold text-stone-900">{config.hisName}</span>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-center">
                    <button
                      onClick={() => {
                        fireHeartConfetti();
                        romanticAudio.playSparkle();
                      }}
                      className="px-6 py-2.5 rounded-full bg-rose-600 hover:bg-rose-500 text-white font-medium text-sm shadow-md flex items-center gap-2"
                    >
                      <Heart className="w-4 h-4 fill-white" />
                      <span>Send Back a Hug & Kiss 💋</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Modal 3: Coupons */}
              {activeModal === 3 && (
                <div className="py-2">
                  <div className="text-center mb-6">
                    <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold">
                      Exclusive Birthday Privileges
                    </span>
                    <h3 className="font-serif-title text-2xl sm:text-3xl font-bold text-rose-200 mt-1">
                      Biwi Sahiba's Lifetime Love Coupons
                    </h3>
                    <p className="text-xs text-stone-400 mt-1">
                      Click "Redeem Now" to claim any voucher anytime with zero expiry date!
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {coupons.map((coupon) => (
                      <div
                        key={coupon.id}
                        className={`p-4 rounded-2xl border transition-all ${
                          coupon.redeemed
                            ? 'bg-rose-950/60 border-rose-500/50 shadow-inner'
                            : 'bg-stone-800/80 border-stone-700 hover:border-rose-400 shadow-md'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <span className="font-love text-xl text-rose-300 font-bold">
                            {coupon.urduTitle}
                          </span>
                          {coupon.redeemed ? (
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40">
                              <Check className="w-3 h-3" /> Redeemed
                            </span>
                          ) : (
                            <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
                              Active
                            </span>
                          )}
                        </div>

                        <h4 className="font-semibold text-stone-100 text-sm mt-1">
                          {coupon.title}
                        </h4>
                        <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                          {coupon.desc}
                        </p>

                        <button
                          onClick={() => handleRedeemCoupon(coupon.id)}
                          className={`mt-4 w-full py-1.5 px-3 rounded-xl text-xs font-semibold transition-all ${
                            coupon.redeemed
                              ? 'bg-stone-700 hover:bg-stone-600 text-stone-200'
                              : 'bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white shadow-xs'
                          }`}
                        >
                          {coupon.redeemed ? '✓ Claimed (Click to Reset)' : 'Redeem This Voucher ❤️'}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
