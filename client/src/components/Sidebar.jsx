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
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Sidebar() {
  const { activeTab, setActiveTab, currentUser, savedVehicles } = useApp();

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

  return (
    <aside className="w-64 flex-shrink-0 flex flex-col justify-between h-screen sticky top-0 px-4 py-6 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0b0f19] z-20 select-none transition-colors duration-200">
      {/* Top Branding */}
      <div>
        <div
          onClick={() => setActiveTab('home')}
          className="cursor-pointer mb-8 px-3"
        >
          <div className="flex items-center space-x-1">
            <span className="text-2xl font-black tracking-tight text-gray-900 dark:text-white">Auto</span>
            <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">Dezire</span>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium tracking-tight">
            Find the automobile that fits you
          </p>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id || (item.id === 'search' && activeTab === 'evaluation');

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${
                  isActive
                    ? 'nav-pill-active text-white font-semibold shadow-glow-orange'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800/60'
                }`}
              >
                <div className="flex items-center space-x-3.5">
                  <Icon className={`w-5 h-5 ${isActive ? 'text-white stroke-[2.2]' : 'stroke-[1.8]'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`px-2 py-0.5 text-xs font-bold rounded-full ${
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
      <div className="pt-4 border-t border-gray-100 dark:border-gray-800/80 space-y-4">
        {/* Admin portal shortcut */}
        <button
          onClick={() => setActiveTab('admin')}
          className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg text-xs font-medium transition-all ${
            activeTab === 'admin'
              ? 'bg-purple-600 text-white font-semibold'
              : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          <ShieldCheck className="w-4 h-4 text-purple-500" />
          <span>Admin Portal</span>
        </button>

        {/* Social Icons (as in reference photo) */}
        <div className="flex items-center justify-between px-3 text-gray-400 dark:text-gray-500">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-gray-900 dark:hover:text-white transition-colors p-1"
            title="Twitter / X"
          >
            <Twitter className="w-4 h-4" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-gray-900 dark:hover:text-white transition-colors p-1"
            title="Instagram"
          >
            <Instagram className="w-4 h-4" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-gray-900 dark:hover:text-white transition-colors p-1"
            title="LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href="https://github.com/siddharthrajegit/AutoDezire"
            target="_blank"
            rel="noreferrer"
            className="hover:text-gray-900 dark:hover:text-white transition-colors p-1"
            title="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>
        </div>
      </div>
    </aside>
  );
}
