import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const clothingTypes = [
  { icon: '👔', label: 'Shirt' },
  { icon: '👖', label: 'Jeans' },
  { icon: '🧥', label: 'Jacket' },
  { icon: '👕', label: 'T-Shirt' },
  { icon: '👗', label: 'Dress' },
  { icon: '👚', label: 'Skirt' },
  { icon: '🩳', label: 'Shorts' },
  { icon: '👙', label: 'Other' },
];

const washingPrefs = [
  'Normal Wash',
  'Dry Wash',
  'Iron Only',
  'All Services',
];

export default function AddClothes() {
  const [clothingName, setClothingName] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedPrefs, setSelectedPrefs] = useState<string[]>([]);
  const [notes, setNotes] = useState('');
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleTypeSelect = (type: string) => setSelectedType(type);
  const handlePrefToggle = (pref: string) => {
    setSelectedPrefs((prev) =>
      prev.includes(pref) ? prev.filter((p) => p !== pref) : [...prev, pref]
    );
  };
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(e.target.files[0]);
      setPhotoPreview(URL.createObjectURL(e.target.files[0]));
    }
  };
  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setPhoto(e.dataTransfer.files[0]);
      setPhotoPreview(URL.createObjectURL(e.dataTransfer.files[0]));
    }
  };
  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragActive(true);
  };
  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragActive(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-background to-muted px-2 dark:from-black dark:to-gray-900">
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="w-full max-w-lg relative"
      >
        {/* Glassmorphic Card */}
        <div className="backdrop-blur-xl bg-white/70 dark:bg-black/60 border border-border rounded-3xl shadow-2xl p-8 md:p-10 transition-all duration-300">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2 text-center tracking-tight bg-clip-text">Add Clothes to Your Order</h2>
          <p className="text-gray-500 dark:text-gray-300 mb-8 text-center">Premium laundry care for every item. Select your service and let us handle the rest!</p>

          {/* Clothing Name */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">Clothing Name <span className="text-red-500">*</span></label>
            <input
              className="w-full px-4 py-2 border border-input rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition bg-white/80 dark:bg-black/40 text-lg placeholder-gray-400 dark:placeholder-gray-500"
              placeholder="e.g. Blue Shirt"
              value={clothingName}
              onChange={e => setClothingName(e.target.value)}
            />
          </div>

          {/* Type */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">Type <span className="text-red-500">*</span></label>
            <div className="grid grid-cols-4 gap-3">
              {clothingTypes.map((type) => (
                <motion.button
                  key={type.label}
                  type="button"
                  whileTap={{ scale: 0.95 }}
                  className={`flex flex-col items-center p-3 rounded-xl border-2 font-medium text-sm shadow-sm transition-all relative
                    ${selectedType === type.label
                      ? 'bg-primary-100/80 border-primary-600 text-primary-800 dark:bg-primary-900/40 dark:border-primary-400 dark:text-primary-100 ring-2 ring-primary-400 scale-105 z-10'
                      : 'bg-gray-50/80 border-gray-200 text-gray-600 hover:border-primary-300 hover:bg-primary-50/60 dark:bg-gray-800/40 dark:border-gray-700 dark:text-gray-300'}
                  `}
                  onClick={() => handleTypeSelect(type.label)}
                >
                  <span className="text-2xl mb-1 drop-shadow-sm">{type.icon}</span>
                  <span>{type.label}</span>
                  {selectedType === type.label && (
                    <motion.span
                      layoutId="type-ring"
                      className="absolute inset-0 rounded-xl ring-2 ring-primary-400 pointer-events-none"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Washing Preference */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">Washing Preference <span className="text-red-500">*</span></label>
            <div className="flex flex-wrap gap-4">
              {washingPrefs.map((pref) => (
                <label key={pref} className="flex items-center gap-2 cursor-pointer select-none text-base font-medium text-gray-700 dark:text-gray-200">
                  <input
                    type="checkbox"
                    checked={selectedPrefs.includes(pref)}
                    onChange={() => handlePrefToggle(pref)}
                    className="accent-primary-500 rounded focus:ring-2 focus:ring-primary-400"
                  />
                  {pref}
                </label>
              ))}
            </div>
          </div>

          {/* Photo Upload */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">Photo (Before Wash)</label>
            <div className="flex items-center justify-center w-full">
              <label
                className={`flex flex-col items-center justify-center w-full h-36 border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-300 bg-gray-50/70 dark:bg-gray-900/40
                  ${dragActive ? 'border-primary-500 bg-primary-50/60 dark:border-primary-400 dark:bg-primary-900/20' : 'border-gray-300 dark:border-gray-700'}`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                htmlFor="photo-upload"
              >
                <AnimatePresence>
                  {photoPreview ? (
                    <motion.img
                      key="preview"
                      src={photoPreview}
                      alt="Preview"
                      className="h-20 w-20 object-cover rounded-xl mb-2 shadow"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                    />
                  ) : (
                    <motion.span
                      key="placeholder"
                      className="text-gray-400 dark:text-gray-500 flex flex-col items-center"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                    >
                      <svg width="36" height="36" fill="none" viewBox="0 0 24 24" className="mb-1">
                        <path d="M12 16.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" fill="currentColor"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M4.75 4A2.75 2.75 0 002 6.75v10.5A2.75 2.75 0 004.75 20h14.5A2.75 2.75 0 0022 17.25V6.75A2.75 2.75 0 0019.25 4H4.75zM4 6.75A.75.75 0 014.75 6h14.5a.75.75 0 01.75.75v7.19l-2.22-2.22a2.25 2.25 0 00-3.18 0l-2.47 2.47-3.22-3.22a2.25 2.25 0 00-3.18 0L4 14.44V6.75zM4.75 18a.75.75 0 01-.75-.75v-.69l3.22-3.22a.25.25 0 01.35 0l3.22 3.22a2.25 2.25 0 003.18 0l2.47-2.47a.25.25 0 01.35 0l3.22 3.22v.69a.75.75 0 01-.75.75H4.75z" fill="currentColor"/>
                      </svg>
                      <span>Click to upload or drag & drop</span>
                    </motion.span>
                  )}
                </AnimatePresence>
                <input
                  id="photo-upload"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handlePhotoChange}
                />
              </label>
            </div>
          </div>

          {/* Notes */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">Notes</label>
            <textarea
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition bg-white/80 dark:bg-black/40 text-base placeholder-gray-400 dark:placeholder-gray-500"
              placeholder="e.g. Remove coffee stain, delicate material..."
              value={notes}
              onChange={e => setNotes(e.target.value)}
              rows={2}
            />
          </div>

          {/* Submit Button */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            whileHover={{ scale: 1.03, boxShadow: '0 4px 24px 0 rgba(0,0,0,0.10)' }}
            className="w-full py-3 mt-2 bg-gradient-to-r from-primary-600 to-primary-800 text-white font-semibold rounded-xl shadow-lg hover:from-primary-700 hover:to-primary-900 transition text-lg tracking-wide focus:outline-none focus:ring-2 focus:ring-primary-400"
          >
            ✨ Add to Order
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
} 