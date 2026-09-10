import { useState, type FormEvent } from 'react';
import { Settings, X, RotateCcw, Check, Sparkles, Heart } from 'lucide-react';
import { LoveConfig } from '../types';
import { initialLoveConfig } from '../data/defaultConfig';
import { romanticAudio } from '../utils/audio';

interface CustomizerModalProps {
  config: LoveConfig;
  onSave: (newConfig: LoveConfig) => void;
  isOpen: boolean;
  onClose: () => void;
}

export function CustomizerModal({ config, onSave, isOpen, onClose }: CustomizerModalProps) {
  const [formData, setFormData] = useState<LoveConfig>(config);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setSavedSuccess(true);
    romanticAudio.playSparkle();
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 800);
  };

  const handleReset = () => {
    setFormData(initialLoveConfig);
    onSave(initialLoveConfig);
    romanticAudio.playSparkle();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-lg bg-stone-900 border border-rose-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl text-stone-100 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-stone-800 mb-5">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-rose-400" />
            <h3 className="font-serif-title text-xl font-bold text-rose-200">
              Personalize Birthday Surprise
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 flex items-center justify-center text-sm font-bold"
          >
            ✕
          </button>
        </div>

        <p className="text-xs text-stone-400 mb-4">
          Put her real name, your nickname for her, your name, and anniversary date so the surprise is 100% personalized!
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
          <div>
            <label className="block font-medium text-stone-300 mb-1">
              Her Name (Girlfriend / Future Wife)
            </label>
            <input
              type="text"
              value={formData.herName}
              onChange={(e) => setFormData({ ...formData, herName: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-stone-800 border border-stone-700 text-stone-100 focus:outline-hidden focus:border-rose-500"
              required
            />
          </div>

          <div>
            <label className="block font-medium text-stone-300 mb-1">
              Sweet Nickname / Title ("Meri Biwi", "Begum Sahiba", "Janam")
            </label>
            <input
              type="text"
              value={formData.wifeNickname}
              onChange={(e) => setFormData({ ...formData, wifeNickname: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-stone-800 border border-stone-700 text-stone-100 focus:outline-hidden focus:border-rose-500"
              required
            />
          </div>

          <div>
            <label className="block font-medium text-stone-300 mb-1">
              Your Name / Title (Sender)
            </label>
            <input
              type="text"
              value={formData.hisName}
              onChange={(e) => setFormData({ ...formData, hisName: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-stone-800 border border-stone-700 text-stone-100 focus:outline-hidden focus:border-rose-500"
              required
            />
          </div>

          <div>
            <label className="block font-medium text-stone-300 mb-1">
              Relationship / Meeting Date (for Love Clock)
            </label>
            <input
              type="date"
              value={formData.meetingDate}
              onChange={(e) => setFormData({ ...formData, meetingDate: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-stone-800 border border-stone-700 text-stone-100 focus:outline-hidden focus:border-rose-500"
            />
          </div>

          <div>
            <label className="block font-medium text-stone-300 mb-1">
              Heartfelt Love Letter (Dil Ki Baat)
            </label>
            <textarea
              rows={5}
              value={formData.customLetter}
              onChange={(e) => setFormData({ ...formData, customLetter: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-stone-800 border border-stone-700 text-stone-100 text-xs focus:outline-hidden focus:border-rose-500 leading-relaxed font-mono"
            />
          </div>

          <div className="pt-3 border-t border-stone-800 flex items-center justify-between">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs text-stone-400 hover:text-stone-200 hover:bg-stone-800 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-stone-800 text-stone-300 hover:bg-stone-700 text-xs font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold shadow-md"
              >
                {savedSuccess ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-300" />
                    <span>Saved!</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Apply Changes</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
