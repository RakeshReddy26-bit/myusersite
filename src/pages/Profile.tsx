import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function Profile() {
  const { user, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    displayName: user?.displayName || '',
    email: user?.email || ''
  });

  const handleSave = () => {
    // TODO: Implement profile update logic
    setIsEditing(false);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Please log in to view your profile</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted dark:from-black dark:to-gray-900 py-8 flex items-center justify-center px-2">
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="w-full max-w-2xl"
      >
        <div className="backdrop-blur-xl bg-white/70 dark:bg-black/60 border border-border rounded-3xl shadow-2xl p-8 md:p-12 transition-all duration-300">
          {/* Header */}
          <div className="flex items-center gap-6 mb-8">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              className="w-24 h-24 bg-gradient-to-br from-primary-500 to-primary-700 dark:from-primary-700 dark:to-primary-900 rounded-full flex items-center justify-center shadow-lg border-4 border-white dark:border-black relative"
            >
              <span className="text-4xl font-bold text-white select-none">
                {user.displayName?.charAt(0) || user.email?.charAt(0) || 'U'}
              </span>
              <span className="absolute bottom-2 right-2 w-4 h-4 bg-green-400 border-2 border-white dark:border-black rounded-full shadow"></span>
            </motion.div>
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-1">{user.displayName || 'User'}</h1>
              <p className="text-gray-500 dark:text-gray-300">{user.email}</p>
              <div className="flex items-center mt-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-100">
                  {user.role || 'User'}
                </span>
              </div>
            </div>
          </div>

          {/* Profile Form */}
          <div className="bg-white/80 dark:bg-black/40 rounded-2xl shadow p-6 mb-8 border border-gray-100 dark:border-gray-800">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Profile Information</h2>
              <motion.button
                whileTap={{ scale: 0.97 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => setIsEditing(!isEditing)}
                className="px-4 py-2 text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 rounded-lg transition"
              >
                {isEditing ? 'Cancel' : 'Edit'}
              </motion.button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Display Name
                </label>
                {isEditing ? (
                  <motion.input
                    initial={{ scale: 0.98 }}
                    animate={{ scale: 1 }}
                    type="text"
                    value={formData.displayName}
                    onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition bg-white/90 dark:bg-black/40 text-lg"
                  />
                ) : (
                  <p className="text-gray-900 dark:text-white text-lg">{user.displayName || 'Not set'}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email
                </label>
                <p className="text-gray-900 dark:text-white text-lg">{user.email}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Role
                </label>
                <p className="text-gray-900 dark:text-white text-lg">{user.role || 'User'}</p>
              </div>

              {isEditing && (
                <div className="flex justify-end space-x-3">
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    whileHover={{ scale: 1.05 }}
                    onClick={handleSave}
                    className="px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 dark:bg-primary-700 dark:hover:bg-primary-800 rounded-lg transition"
                  >
                    Save Changes
                  </motion.button>
                </div>
              )}
            </div>
          </div>

          {/* Account Actions */}
          <div className="bg-white/80 dark:bg-black/40 rounded-2xl shadow p-6 border border-gray-100 dark:border-gray-800">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Account Actions</h2>
            <div className="space-y-4">
              <motion.button
                whileTap={{ scale: 0.97 }}
                whileHover={{ scale: 1.03 }}
                onClick={logout}
                className="w-full px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 dark:bg-red-900/30 dark:hover:bg-red-900/60 rounded-lg border border-red-200 dark:border-red-700 transition"
              >
                Sign Out
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}