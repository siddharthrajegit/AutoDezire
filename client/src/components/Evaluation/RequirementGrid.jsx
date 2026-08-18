import React from 'react';
import {
  Shield,
  ArrowUpDown,
  Armchair,
  Briefcase,
  Fuel,
  Wrench,
  Rocket,
  Coins,
  Milestone,
  Building2,
  Info,
  Sparkles
} from 'lucide-react';

const ICON_MAP = {
  Shield: Shield,
  ArrowUpDown: ArrowUpDown,
  Armchair: Armchair,
  Briefcase: Briefcase,
  Fuel: Fuel,
  Wrench: Wrench,
  Rocket: Rocket,
  Coins: Coins,
  Road: Milestone,
  Building2: Building2,
};

// Background colors and icon colors for the circular icons matching screenshot
const COLOR_CONFIG = {
  emerald: {
    iconBg: 'bg-emerald-500/20 text-emerald-400 dark:text-emerald-400',
    barBg: 'bg-emerald-500',
    border: 'border-emerald-500/30'
  },
  cyan: {
    iconBg: 'bg-cyan-500/20 text-cyan-400 dark:text-cyan-400',
    barBg: 'bg-cyan-500',
    border: 'border-cyan-500/30'
  },
  amber: {
    iconBg: 'bg-amber-500/20 text-amber-400 dark:text-amber-400',
    barBg: 'bg-amber-500',
    border: 'border-amber-500/30'
  },
  blue: {
    iconBg: 'bg-blue-500/20 text-blue-400 dark:text-blue-400',
    barBg: 'bg-blue-500',
    border: 'border-blue-500/30'
  },
  yellow: {
    iconBg: 'bg-yellow-500/20 text-yellow-400 dark:text-yellow-400',
    barBg: 'bg-yellow-500',
    border: 'border-yellow-500/30'
  },
  purple: {
    iconBg: 'bg-purple-500/20 text-purple-400 dark:text-purple-400',
    barBg: 'bg-purple-500',
    border: 'border-purple-500/30'
  },
  orange: {
    iconBg: 'bg-orange-500/20 text-orange-400 dark:text-orange-400',
    barBg: 'bg-orange-500',
    border: 'border-orange-500/30'
  },
  pink: {
    iconBg: 'bg-pink-500/20 text-pink-400 dark:text-pink-400',
    barBg: 'bg-pink-500',
    border: 'border-pink-500/30'
  },
  indigo: {
    iconBg: 'bg-indigo-500/20 text-indigo-400 dark:text-indigo-400',
    barBg: 'bg-indigo-500',
    border: 'border-indigo-500/30'
  },
  sky: {
    iconBg: 'bg-sky-500/20 text-sky-400 dark:text-sky-400',
    barBg: 'bg-sky-500',
    border: 'border-sky-500/30'
  },
};

export default function RequirementGrid({ requirementList = [] }) {
  return (
    <div className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-800/90 rounded-2xl p-6 shadow-sm transition-colors duration-200">
      {/* Header with Tooltip */}
      <div className="flex items-center space-x-1.5 mb-5">
        <h3 className="text-base font-bold text-gray-900 dark:text-white">
          Requirement-wise Scores
        </h3>
        <div className="group relative cursor-pointer">
          <Info className="w-4 h-4 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300" />
          <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:flex flex-col w-64 p-2 bg-gray-900 text-white text-[11px] rounded-lg shadow-xl border border-gray-700 z-50 pointer-events-none">
            Each score represents how well this automobile satisfies YOUR personal requirements on a 1-10 scale.
          </div>
        </div>
      </div>

      {/* Exactly 5x2 Grid on Laptop / Desktop screens */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5">
        {requirementList.map((req) => {
          const Icon = ICON_MAP[req.icon] || Shield;
          const colorStyles = COLOR_CONFIG[req.color] || COLOR_CONFIG.emerald;
          const scorePercent = (req.score / 10) * 100;

          // Bar color based on score
          const getBarColor = (s) => {
            if (s >= 9) return 'bg-emerald-500';
            if (s >= 7) return 'bg-blue-500';
            if (s >= 4) return 'bg-amber-500';
            return 'bg-rose-500';
          };

          return (
            <div
              key={req.key}
              className={`relative rounded-xl p-3.5 flex flex-col justify-between border transition-all duration-200 hover:border-gray-400 dark:hover:border-gray-600 ${
                req.isTopPriority
                  ? 'bg-gray-50/80 dark:bg-gray-800/80 border-orange-500/40 shadow-sm'
                  : 'bg-gray-50/50 dark:bg-gray-800/40 border-gray-200 dark:border-gray-800'
              }`}
            >
              {/* Priority badge if top 3 */}
              {req.isTopPriority && (
                <div className="absolute top-2 right-2 flex items-center space-x-0.5 text-[9px] font-bold text-orange-500 uppercase tracking-tighter" title="Your High Priority">
                  <Sparkles className="w-2.5 h-2.5 fill-current" />
                </div>
              )}

              {/* Icon and Name */}
              <div className="flex items-center space-x-2.5 mb-3">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${colorStyles.iconBg}`}>
                  <Icon className="w-5 h-5 stroke-[2.2]" />
                </div>
                <span className="text-xs font-bold text-gray-800 dark:text-gray-200 leading-tight">
                  {req.name}
                </span>
              </div>

              {/* Progress Bar and Score */}
              <div className="space-y-1.5 mt-auto">
                <div className="flex items-center justify-between">
                  {/* Progress track */}
                  <div className="w-full bg-gray-200 dark:bg-gray-700/60 rounded-full h-1.5 overflow-hidden mr-3">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${getBarColor(req.score)}`}
                      style={{ width: `${scorePercent}%` }}
                    />
                  </div>
                  {/* Score */}
                  <span className="text-xs font-bold text-gray-900 dark:text-white whitespace-nowrap">
                    {req.score}<span className="text-[10px] text-gray-400 dark:text-gray-500 font-normal">/10</span>
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend Footer matching reference screenshot */}
      <div className="flex flex-wrap items-center gap-3 sm:space-x-6 mt-5 text-[11px] font-semibold text-gray-500 dark:text-gray-400 pt-2 border-t border-gray-100 dark:border-gray-800/60">
        <div className="flex items-center space-x-1.5">
          <span className="text-rose-500 font-bold">0-3</span>
          <span>Poor</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="text-amber-500 font-bold">4-6</span>
          <span>Average</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="text-blue-500 font-bold">7-8</span>
          <span>Good</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="text-emerald-500 font-bold">9-10</span>
          <span>Excellent</span>
        </div>
      </div>
    </div>
  );
}
