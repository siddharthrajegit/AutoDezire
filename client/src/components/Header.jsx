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
  SlidersHorizontal,
  Menu,
  X
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
    setIsAuthModalOpen,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
  } = useApp();

  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  // Generate breadcrumb items
  const getBreadcrumbs = () => {
    switch (activeTab) {
      case 'home':
        return [{ label: 'Home' }];
      case 'profile':
        return [{ label: 'Home', tab: 'home' }, { label: 'User Profile' }];
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
        return [{ label: 'Home', tab: 'home' }, { label: 'Compare' }];
      case 'ai-advisor':
        return [{ label: 'Home', tab: 'home' }, { label: 'AI Advisor' }];
      case 'saved':
        return [{ label: 'Home', tab: 'home' }, { label: 'Saved Vehicles' }];
      case 'settings':
        return [{ label: 'Home', tab: 'home' }, { label: 'Settings' }];
      case 'admin':
        return [{ label: 'Home', tab: 'home' }, { label: 'Admin Portal' }];
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
    <header className="h-14 px-4 sm:px-6 lg:px-8 flex items-center justify-between border-b border-gray-200/70 dark:border-gray-800/70 bg-white/70 dark:bg-[#0b0f19]/70 backdrop-blur-xl sticky top-0 z-30 transition-all duration-200">
      {/* Left: Mobile Menu Toggle & Breadcrumbs */}
      <div className="flex items-center space-x-3">
        {/* Mobile Hamburger Toggle Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-1.5 rounded-lg bg-gray-100 dark:bg-gray-800/90 text-gray-600 dark:text-gray-300 hover:text-orange-500 transition-colors"
          aria-label="Toggle navigation menu"
        >
          {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>

        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-1.5 text-xs text-gray-500 dark:text-gray-400 truncate">
          {getBreadcrumbs().map((b, idx, arr) => (
            <React.Fragment key={idx}>
              {b.tab ? (
                <button
                  onClick={() => setActiveTab(b.tab)}
                  className="hover:text-orange-500 transition-colors truncate hidden sm:inline"
                >
                  {b.label}
                </button>
              ) : (
                <span className={`font-semibold truncate ${idx === arr.length - 1 ? 'text-gray-900 dark:text-white' : 'hidden sm:inline'}`}>
                  {b.label}
                </span>
              )}
              {idx < arr.length - 1 && <span className="text-gray-400 dark:text-gray-600 hidden sm:inline">&gt;</span>}
            </React.Fragment>
          ))}
        </nav>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center space-x-2 sm:space-x-3">
        {/* Chat with AI Advisor Button */}
        <button
          onClick={() => setActiveTab('ai-advisor')}
          className="relative group p-[1px] rounded-full overflow-hidden transition-all duration-300 transform hover:scale-[1.02] shadow-sm hover:shadow-orange-500/20"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-full animate-gradient-x"></div>
          <div className="relative flex items-center space-x-1.5 px-3 py-1.5 bg-white dark:bg-[#111827] rounded-full text-[11px] font-semibold text-gray-800 dark:text-gray-100 group-hover:bg-opacity-90 transition-all">
            <MessageSquare className="w-3.5 h-3.5 text-pink-500 flex-shrink-0" />
            <span className="hidden sm:inline">Chat with AI Advisor</span>
            <span className="sm:hidden">AI Advisor</span>
          </div>
        </button>

        {/* Download Report Button */}
        {activeTab === 'evaluation' && (
          <button
            onClick={handleDownloadReport}
            className="hidden md:flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-[11px] font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white bg-gray-100/90 dark:bg-gray-800/80 hover:bg-gray-200 dark:hover:bg-gray-700/80 transition-all"
            title="Download Evaluation Report"
          >
            <Download className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" />
            <span>Download Report</span>
          </button>
        )}

        {/* Share Button */}
        {activeTab === 'evaluation' && (
          <button
            onClick={handleShare}
            className="flex items-center space-x-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-[11px] font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white bg-gray-100/90 dark:bg-gray-800/80 hover:bg-gray-200 dark:hover:bg-gray-700/80 transition-all"
            title="Share Link"
          >
            {isCopied ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span className="text-emerald-500 font-semibold hidden sm:inline">Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" />
                <span className="hidden sm:inline">Share</span>
              </>
            )}
          </button>
        )}

        {/* Theme Toggle (Light / Dark mode) */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl bg-gray-100/90 dark:bg-gray-800/80 text-gray-600 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 transition-all"
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
        >
          {theme === 'dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
        </button>

        {/* User Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            className="flex items-center space-x-2 pl-1.5 pr-2.5 py-1 rounded-xl bg-gray-100/90 dark:bg-gray-800/80 hover:bg-gray-200 dark:hover:bg-gray-700/80 transition-all text-left"
          >
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-orange-500 to-amber-400 flex items-center justify-center text-white font-bold text-xs shadow-sm">
              {currentUser?.name ? currentUser.name[0].toUpperCase() : 'A'}
            </div>
            <div className="hidden sm:block">
              <p className="text-xs font-bold text-gray-900 dark:text-white leading-tight">
                Hi, {currentUser?.name || userProfile?.name || 'Aryan'}
              </p>
              <p className="text-[9px] text-gray-500 dark:text-gray-400 capitalize">
                {currentUser?.role || 'User'}
              </p>
            </div>
            <ChevronDown className="w-3 h-3 text-gray-400" />
          </button>

          {isProfileMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-xl bg-white dark:bg-[#111827] shadow-xl border border-gray-200 dark:border-gray-800 py-1.5 z-50 animate-fadeIn">
              <button
                onClick={() => {
                  setActiveTab('profile');
                  setIsProfileMenuOpen(false);
                }}
                className="w-full px-4 py-2 text-xs text-left text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800/60 flex items-center space-x-2"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-orange-500" />
                <span>Edit Questionnaire</span>
              </button>
              <button
                onClick={() => {
                  setActiveTab('settings');
                  setIsProfileMenuOpen(false);
                }}
                className="w-full px-4 py-2 text-xs text-left text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800/60 flex items-center space-x-2"
              >
                <User className="w-3.5 h-3.5 text-blue-500" />
                <span>Account & Preferences</span>
              </button>
              <div className="h-px bg-gray-200 dark:bg-gray-800 my-1" />
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
