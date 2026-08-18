import React from 'react';
import { Info, Star, CheckCircle, AlertTriangle } from 'lucide-react';

export default function SemiCircleGauge({ score = 82, status = 'Very Suitable' }) {
  // Semi-circle gauge math: 180 degrees arc (from PI to 0)
  // Radius 100, Center (120, 120)
  const radius = 90;
  const strokeWidth = 18;
  const circumference = Math.PI * radius; // approx 282.74
  const progressPercent = Math.min(100, Math.max(0, score)) / 100;
  const strokeDashoffset = circumference * (1 - progressPercent);

  // Status color styling
  const getStatusColor = () => {
    if (score >= 85) return 'text-emerald-500';
    if (score >= 70) return 'text-emerald-400';
    if (score >= 50) return 'text-amber-400';
    return 'text-rose-500';
  };

  return (
    <div className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-800/90 rounded-2xl p-6 shadow-sm flex flex-col justify-between h-full relative transition-colors duration-200">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-1.5">
          <h3 className="text-base font-bold text-gray-900 dark:text-white">
            Overall Suitability Score
          </h3>
          <div className="group relative cursor-pointer">
            <Info className="w-4 h-4 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300" />
            <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:flex flex-col w-56 p-2 bg-gray-900 text-white text-[11px] rounded-lg shadow-xl border border-gray-700 z-50 pointer-events-none">
              Calculated dynamically using weighted matching of your personal profile, usage, and top 3 priorities.
            </div>
          </div>
        </div>
      </div>

      {/* SVG Semi-Circular Gauge */}
      <div className="flex flex-col items-center justify-center my-auto pt-2 pb-1 relative">
        <div className="relative w-64 h-36 flex items-end justify-center overflow-hidden">
          <svg viewBox="0 0 240 135" className="w-full h-full">
            <defs>
              {/* Vibrant continuous gradient from Red -> Orange -> Yellow -> Green */}
              <linearGradient id="scoreGaugeGrad" x1="0%" y1="100%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="30%" stopColor="#f97316" />
                <stop offset="65%" stopColor="#eab308" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>
            </defs>

            {/* Background Arc Track */}
            <path
              d="M 30 120 A 90 90 0 0 1 210 120"
              fill="none"
              stroke="#1f2937"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              className="dark:stroke-gray-800 stroke-gray-200"
            />

            {/* Colored Progress Arc */}
            <path
              d="M 30 120 A 90 90 0 0 1 210 120"
              fill="none"
              stroke="url(#scoreGaugeGrad)"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-1000 ease-out"
            />
          </svg>

          {/* Central Score Display */}
          <div className="absolute inset-x-0 bottom-1 flex flex-col items-center justify-center">
            <span className="text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-none">
              {score}
            </span>
            <span className="text-sm font-semibold text-gray-400 dark:text-gray-500 mt-1">
              / 100
            </span>
          </div>
        </div>

        {/* Status Label (Matching Screenshot: Very Suitable with Star) */}
        <div className="mt-4 flex items-center space-x-1.5">
          <span className={`text-xl font-bold ${getStatusColor()}`}>
            {status}
          </span>
          <Star className={`w-5 h-5 ${getStatusColor()} fill-current`} />
        </div>
      </div>
    </div>
  );
}
