import React from 'react';
import {
  LayoutDashboard,
  User,
  Star,
  Search,
  BarChart2,
  Bot,
  Heart,
  Settings,
  Twitter,
  Instagram,
  Linkedin,
  Github,
  ShieldCheck,
  X
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Sidebar() {
  const {
    activeTab,
    setActiveTab,
    savedVehicles,
    isMobileMenuOpen,
    setIsMobileMenuOpen
  } = useApp();

  const navItems = [
    { id: 'home', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'recommendations', label: 'Recommendations', icon: Star },
    { id: 'search', label: 'Search Vehicle', icon: Search },
    { id: 'compare', label: 'Compare', icon: BarChart2 },
    { id: 'ai-advisor', label: 'AI Advisor', icon: Bot },
    { id: 'saved', label: 'Saved Vehicles', icon: Heart, badge: savedVehicles.length > 0 ? savedVehicles.length : null },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isMobileMenuOpen && (
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-64 flex flex-col justify-between px-4 py-5 border-r border-gray-200/80 dark:border-gray-800/80 bg-white/95 dark:bg-[#0b0f19]/95 backdrop-blur-xl z-50 transition-transform duration-300 ease-in-out select-none ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Top Branding & Close Button */}
        <div>
          <div className="flex items-center justify-between px-3 mb-6">
            <div
              onClick={() => handleNavClick('home')}
              className="cursor-pointer"
            >
              <div className="flex items-center space-x-1">
                <span className="text-2xl font-black tracking-tight text-gray-900 dark:text-white">Auto</span>
                <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">Dezire</span>
              </div>
              <p className="text-[11px] text-gray-500 dark:text-gray-400 font-medium tracking-tight mt-0.5">
                Find the automobile that fits you
              </p>
            </div>

            {/* Close button on mobile */}
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="lg:hidden p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id || (item.id === 'search' && activeTab === 'evaluation');

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all duration-200 ${
                    isActive
                      ? 'nav-pill-active text-white font-semibold shadow-glow-orange'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100/80 dark:hover:bg-gray-800/60'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={`w-4 h-4 sm:w-4.5 sm:h-4.5 ${isActive ? 'text-white stroke-[2.2]' : 'stroke-[1.8]'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                      isActive ? 'bg-white/25 text-white' : 'bg-orange-500/10 text-orange-500 dark:text-orange-400'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Area: Admin Link & Social Icons */}
        <div className="pt-3 border-t border-gray-100 dark:border-gray-800/80 space-y-3">
          {/* Admin portal shortcut */}
          <button
            onClick={() => handleNavClick('admin')}
            className={`w-full flex items-center space-x-2.5 px-3.5 py-2 rounded-xl text-xs font-medium transition-all ${
              activeTab === 'admin'
                ? 'bg-purple-600 text-white font-semibold'
                : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-purple-500 flex-shrink-0" />
            <span>Admin Portal</span>
          </button>

          {/* Social Icons */}
          <div className="flex items-center justify-between px-2 text-gray-400 dark:text-gray-500">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-gray-900 dark:hover:text-white transition-colors p-1"
              title="Twitter / X"
            >
              <Twitter className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-gray-900 dark:hover:text-white transition-colors p-1"
              title="Instagram"
            >
              <Instagram className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-gray-900 dark:hover:text-white transition-colors p-1"
              title="LinkedIn"
            >
              <Linkedin className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://github.com/siddharthrajegit/AutoDezire"
              target="_blank"
              rel="noreferrer"
              className="hover:text-gray-900 dark:hover:text-white transition-colors p-1"
              title="GitHub"
            >
              <Github className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </aside>
    </>
  );
}
