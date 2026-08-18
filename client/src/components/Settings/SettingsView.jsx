import React, { useState } from 'react';
import {
  Settings,
  User,
  Moon,
  Sun,
  Key,
  Shield,
  Save,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function SettingsView() {
  const { theme, toggleTheme, userProfile, updateProfile, currentUser, setCurrentUser } = useApp();
  const [profileName, setProfileName] = useState(userProfile.name || 'Aryan');
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    updateProfile({ name: profileName });
    if (currentUser) {
      const updatedUser = { ...currentUser, name: profileName };
      setCurrentUser(updatedUser);
      localStorage.setItem('autodezire_user', JSON.stringify(updatedUser));
    }
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-16 animate-fadeIn">
      <div>
        <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
          Settings & Preferences
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
          Customize your experience, appearance, and personal parameters.
        </p>
      </div>

      <div className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center space-x-2">
          <User className="w-4 h-4 text-orange-500" />
          <span>Profile Information</span>
        </h3>

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
              Display Name
            </label>
            <input
              type="text"
              value={profileName}
              onChange={(e) => setProfileName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              disabled
              value={currentUser?.email || 'aryan@example.com'}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800/50 text-sm text-gray-400 cursor-not-allowed"
            />
          </div>

          <button
            type="submit"
            className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold shadow-md transition-all"
          >
            {isSaved ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            <span>{isSaved ? 'Saved Successfully!' : 'Save Changes'}</span>
          </button>
        </form>

        <div className="h-px bg-gray-100 dark:border-gray-800 my-6" />

        <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center space-x-2">
          <Settings className="w-4 h-4 text-blue-500" />
          <span>Theme & Appearance</span>
        </h3>

        <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700">
          <div>
            <h4 className="text-xs font-bold text-gray-900 dark:text-white">
              Color Theme Mode
            </h4>
            <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">
              Switch between Dark luxury dashboard and Crisp light mode (matches reference screenshots).
            </p>
          </div>

          <button
            onClick={toggleTheme}
            className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-xs font-bold text-gray-800 dark:text-white shadow-sm"
          >
            {theme === 'dark' ? (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                <span>Light Mode</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-indigo-500" />
                <span>Dark Mode</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
