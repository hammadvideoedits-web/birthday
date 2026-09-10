import { useState, useRef, type ChangeEvent, type FormEvent, type MouseEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, Plus, X, Heart, Sparkles, Image as ImageIcon } from 'lucide-react';
import { MemoryItem } from '../types';
import { romanticAudio } from '../utils/audio';

interface MemoryGalleryProps {
  memories: MemoryItem[];
  onUpdateMemories: (newMemories: MemoryItem[]) => void;
  herName: string;
}

export function MemoryGallery({ memories, onUpdateMemories, herName }: MemoryGalleryProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<MemoryItem | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setNewImageUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddMemory = (e: FormEvent) => {
    e.preventDefault();
    if (!newImageUrl) return;

    const newMemory: MemoryItem = {
      id: Date.now().toString(),
      title: newTitle || 'Our Beautiful Moment',
      date: newDate || 'Special Memory',
      description: newDescription || 'A moment frozen in love forever.',
      imageUrl: newImageUrl,
      tag: 'Love Story',
      rotation: Math.floor(Math.random() * 6) - 3,
    };

    onUpdateMemories([newMemory, ...memories]);
    romanticAudio.playSparkle();
    setIsAddModalOpen(false);
    setNewTitle('');
    setNewDate('');
    setNewDescription('');
    setNewImageUrl('');
  };

  const handleDeleteMemory = (id: string, e: MouseEvent) => {
    e.stopPropagation();
    onUpdateMemories(memories.filter((m) => m.id !== id));
    if (selectedPhoto?.id === id) {
      setSelectedPhoto(null);
    }
  };

  return (
    <section id="memory-gallery-section" className="py-16 px-4 max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-100 dark:bg-rose-950/70 border border-rose-300 dark:border-rose-500/30 text-rose-800 dark:text-rose-200 text-xs font-semibold uppercase tracking-wider mb-2">
          <Camera className="w-3.5 h-3.5 text-rose-500" />
          <span>Long Distance Love Story • Two Cities, One Heartbeat</span>
        </div>
        <h2 className="font-serif-title text-3xl sm:text-5xl text-stone-900 dark:text-white font-bold">
          Moments With My Forever Girl
        </h2>
        <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 mt-2 max-w-2xl mx-auto">
          Hum dono long distance mein hain aur humari sath koi photo nahi hai... Humne call bhi sirf 2 dafa ki hai: pehli dafa 5 minute aur ek dafa jab mama ghar nahi theen toh 54 minute ki woh anmol call! Lekin mere dil ka har kona sirf Zaria ke naam se mehka hua hai.
        </p>

        {/* Long distance love note box */}
        <div className="mt-4 max-w-xl mx-auto p-3.5 rounded-xl bg-rose-500/10 border border-rose-400/30 text-rose-300 text-xs sm:text-sm font-love text-base flex items-center justify-center gap-2">
          <span>✈️</span>
          <span>"54 minute ki call ho ya shehron ka faasla, mera dil aur har saans hamesha Zaria ke paas hai."</span>
          <span>❤️</span>
        </div>

        <div className="mt-5 flex justify-center">
          <button
            id="add-memory-photo-btn"
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-rose-600 hover:bg-rose-500 text-white text-xs sm:text-sm font-medium shadow-md shadow-rose-600/30 transition-all hover:scale-105"
          >
            <Plus className="w-4 h-4" />
            <span>Upload Screenshot / Photo 📸</span>
          </button>
        </div>
      </div>

      {/* Polaroid Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {memories.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ scale: 1.04, rotate: 0, zIndex: 10 }}
            style={{ rotate: `${item.rotation || 0}deg` }}
            onClick={() => {
              setSelectedPhoto(item);
              romanticAudio.playSparkle();
            }}
            className="cursor-pointer group relative bg-white dark:bg-stone-800 p-3.5 pb-6 rounded-lg shadow-lg hover:shadow-2xl border border-stone-200 dark:border-stone-700 transition-all duration-300"
          >
            {/* Washi tape visual on top */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-rose-300/40 dark:bg-rose-500/30 backdrop-blur-xs border border-white/50 dark:border-rose-400/20 shadow-xs rotate-[-2deg] z-10" />

            {/* Photo Container */}
            <div className="relative aspect-4/5 w-full overflow-hidden rounded bg-stone-100 dark:bg-stone-900">
              <img
                src={item.imageUrl}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-xs text-[10px] font-medium text-white">
                {item.tag}
              </span>

              {/* Delete button on hover for custom photos */}
              <button
                onClick={(e) => handleDeleteMemory(item.id, e)}
                title="Remove photo"
                className="opacity-0 group-hover:opacity-100 absolute top-2 right-2 w-6 h-6 rounded-full bg-black/70 hover:bg-rose-600 text-white text-xs flex items-center justify-center transition-all"
              >
                ✕
              </button>
            </div>

            {/* Handwritten style caption */}
            <div className="mt-3 text-center">
              <h4 className="font-love text-xl sm:text-2xl text-stone-900 dark:text-rose-200 font-bold leading-none">
                {item.title}
              </h4>
              <p className="text-[11px] text-stone-500 dark:text-stone-400 font-sans-body mt-1">
                {item.date}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-lg bg-stone-900 border border-rose-500/30 rounded-3xl p-6 shadow-2xl text-stone-100 overflow-hidden"
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-stone-800 hover:bg-stone-700 text-white flex items-center justify-center text-sm font-bold"
              >
                ✕
              </button>

              <div className="aspect-4/3 w-full rounded-2xl overflow-hidden bg-black mb-4">
                <img
                  src={selectedPhoto.imageUrl}
                  alt={selectedPhoto.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-2 text-center">
                <span className="text-xs uppercase tracking-wider text-rose-400 font-semibold">
                  {selectedPhoto.date}
                </span>
                <h3 className="font-love text-3xl text-white font-bold">
                  {selectedPhoto.title}
                </h3>
                <p className="text-stone-300 text-sm leading-relaxed max-w-md mx-auto">
                  {selectedPhoto.description}
                </p>
                <div className="pt-3 flex justify-center items-center gap-1.5 text-xs text-rose-300">
                  <Heart className="w-3.5 h-3.5 fill-rose-400" />
                  <span>Cherishing every single moment with you, {herName}</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Add Memory Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-md bg-stone-900 border border-rose-500/40 rounded-3xl p-6 shadow-2xl text-stone-100"
            >
              <div className="flex items-center justify-between pb-3 border-b border-stone-800 mb-4">
                <h3 className="font-serif-title text-xl font-bold text-rose-200">
                  Add Our Real Picture
                </h3>
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="text-stone-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddMemory} className="space-y-4 text-sm">
                <div>
                  <label className="block text-xs font-medium text-stone-300 mb-1">
                    Upload Photo from device or Paste Image URL
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    className="block w-full text-xs text-stone-400 file:mr-3 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-rose-950 file:text-rose-200 hover:file:bg-rose-900 cursor-pointer"
                  />
                  <div className="text-center text-xs text-stone-500 my-1">— OR —</div>
                  <input
                    type="url"
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    placeholder="https://example.com/our-photo.jpg"
                    className="w-full px-3 py-2 rounded-xl bg-stone-800 border border-stone-700 text-stone-100 placeholder-stone-500 focus:outline-hidden focus:border-rose-500 text-xs"
                  />
                </div>

                {newImageUrl && (
                  <div className="w-full h-36 rounded-xl overflow-hidden bg-black border border-rose-500/30">
                    <img
                      src={newImageUrl}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-xs font-medium text-stone-300 mb-1">
                    Memory Title / Caption
                  </label>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Our First Date / That Beautiful Sunset"
                    className="w-full px-3 py-2 rounded-xl bg-stone-800 border border-stone-700 text-stone-100 text-xs focus:outline-hidden focus:border-rose-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-300 mb-1">
                    Special Date / Occasion
                  </label>
                  <input
                    type="text"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    placeholder="e.g. 14 February / The Day We Laughed Until Crying"
                    className="w-full px-3 py-2 rounded-xl bg-stone-800 border border-stone-700 text-stone-100 text-xs focus:outline-hidden focus:border-rose-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-300 mb-1">
                    Love Note for this memory
                  </label>
                  <textarea
                    rows={2}
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    placeholder="Write a sweet sentence about this moment..."
                    className="w-full px-3 py-2 rounded-xl bg-stone-800 border border-stone-700 text-stone-100 text-xs focus:outline-hidden focus:border-rose-500"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-stone-800 text-stone-300 hover:bg-stone-700 text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!newImageUrl}
                    className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 disabled:opacity-50 text-white text-xs font-semibold shadow-md"
                  >
                    Save to Gallery ❤️
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
