import React, { useState } from 'react';
import {
  MessageSquare,
  User,
  ChevronDown,
  Download,
  Share2,
  Sun,
  Moon,
  Sparkles,
  CheckCircle2,
  LogOut,
  SlidersHorizontal
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Header() {
  const {
    activeTab,
    setActiveTab,
    theme,
    toggleTheme,
    currentUser,
    userProfile,
    selectedVehicle,
    setIsAuthModalOpen,
    setIsAiModalOpen,
  } = useApp();

  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  // Generate breadcrumb items
  const getBreadcrumbs = () => {
    switch (activeTab) {
      case 'home':
        return [{ label: 'Home' }];
      case 'profile':
        return [{ label: 'Home', tab: 'home' }, { label: 'User Profile & Questionnaire' }];
      case 'recommendations':
        return [{ label: 'Home', tab: 'home' }, { label: 'Recommendations' }];
      case 'search':
        return [{ label: 'Home', tab: 'home' }, { label: 'Search Vehicle' }];
      case 'evaluation':
        return [
          { label: 'Home', tab: 'home' },
          { label: 'Search Vehicle', tab: 'search' },
          { label: 'Evaluation Result' }
        ];
      case 'compare':
        return [{ label: 'Home', tab: 'home' }, { label: 'Compare Automobiles' }];
      case 'ai-advisor':
        return [{ label: 'Home', tab: 'home' }, { label: 'AI Advisor' }];
      case 'saved':
        return [{ label: 'Home', tab: 'home' }, { label: 'Saved Vehicles' }];
      case 'settings':
        return [{ label: 'Home', tab: 'home' }, { label: 'Settings' }];
      case 'admin':
        return [{ label: 'Home', tab: 'home' }, { label: 'Admin Management' }];
      default:
        return [{ label: 'Home' }];
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleDownloadReport = () => {
    window.print();
  };

  return (
    <header className="h-20 px-8 flex items-center justify-between border-b border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-[#0b0f19]/80 backdrop-blur-md sticky top-0 z-10 transition-colors duration-200">
      {/* Left: Breadcrumbs */}
      <nav className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
        {getBreadcrumbs().map((b, idx, arr) => (
          <React.Fragment key={idx}>
            {b.tab ? (
              <button
                onClick={() => setActiveTab(b.tab)}
                className="hover:text-orange-500 transition-colors"
              >
                {b.label}
              </button>
            ) : (
              <span className={`font-semibold ${idx === arr.length - 1 ? 'text-gray-900 dark:text-white' : ''}`}>
                {b.label}
              </span>
            )}
            {idx < arr.length - 1 && <span className="text-gray-400 dark:text-gray-600">&gt;</span>}
          </React.Fragment>
        ))}
      </nav>

      {/* Right: Actions */}
      <div className="flex items-center space-x-3.5">
        {/* Chat with AI Advisor Button */}
        <button
          onClick={() => setActiveTab('ai-advisor')}
          className="relative group p-[1px] rounded-full overflow-hidden transition-all duration-300 transform hover:scale-[1.02] shadow-sm hover:shadow-orange-500/20"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-full animate-gradient-x"></div>
          <div className="relative flex items-center space-x-2 px-4 py-2 bg-white dark:bg-[#111827] rounded-full text-xs font-semibold text-gray-800 dark:text-gray-100 group-hover:bg-opacity-90 transition-all">
            <MessageSquare className="w-3.5 h-3.5 text-pink-500" />
            <span>Chat with AI Advisor</span>
          </div>
        </button>

        {/* Download Report Button */}
        {activeTab === 'evaluation' && (
          <button
            onClick={handleDownloadReport}
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white bg-gray-100 dark:bg-gray-800/80 hover:bg-gray-200 dark:hover:bg-gray-700/80 transition-all"
            title="Print or Save Evaluation Report"
          >
            <Download className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" />
            <span>Download Report</span>
          </button>
        )}

        {/* Share Button */}
        {activeTab === 'evaluation' && (
          <button
            onClick={handleShare}
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white bg-gray-100 dark:bg-gray-800/80 hover:bg-gray-200 dark:hover:bg-gray-700/80 transition-all"
            title="Share Link"
          >
            {isCopied ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span className="text-emerald-500 font-semibold">Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" />
                <span>Share</span>
              </>
            )}
          </button>
        )}

        {/* Theme Toggle (Light / Dark mode) */}
        <button
          onClick={toggleTheme}
          className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800/80 text-gray-600 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 transition-all"
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
        >
          {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        {/* User Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            className="flex items-center space-x-2.5 pl-2 pr-3 py-1.5 rounded-xl bg-gray-100 dark:bg-gray-800/80 hover:bg-gray-200 dark:hover:bg-gray-700/80 transition-all text-left"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-orange-500 to-amber-400 flex items-center justify-center text-white font-bold text-xs shadow-sm">
              {currentUser?.name ? currentUser.name[0].toUpperCase() : 'A'}
            </div>
            <div className="hidden sm:block">
              <p className="text-xs font-bold text-gray-900 dark:text-white leading-tight">
                Hi, {currentUser?.name || userProfile?.name || 'Aryan'}
              </p>
              <p className="text-[10px] text-gray-500 dark:text-gray-400 capitalize">
                {currentUser?.role || 'User'}
              </p>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
          </button>

          {isProfileMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-xl bg-white dark:bg-gray-800 shadow-xl border border-gray-200 dark:border-gray-700 py-1.5 z-50 animate-fadeIn">
              <button
                onClick={() => {
                  setActiveTab('profile');
                  setIsProfileMenuOpen(false);
                }}
                className="w-full px-4 py-2 text-xs text-left text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700/60 flex items-center space-x-2"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-orange-500" />
                <span>Edit Questionnaire</span>
              </button>
              <button
                onClick={() => {
                  setActiveTab('settings');
                  setIsProfileMenuOpen(false);
                }}
                className="w-full px-4 py-2 text-xs text-left text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700/60 flex items-center space-x-2"
              >
                <User className="w-3.5 h-3.5 text-blue-500" />
                <span>Account & Preferences</span>
              </button>
              <div className="h-px bg-gray-200 dark:bg-gray-700 my-1" />
              <button
                onClick={() => {
                  setIsAuthModalOpen(true);
                  setIsProfileMenuOpen(false);
                }}
                className="w-full px-4 py-2 text-xs text-left text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 flex items-center space-x-2 font-medium"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Switch / Login</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
