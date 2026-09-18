import React from 'react';
import { Info, Star } from 'lucide-react';

export default function SemiCircleGauge({ score = 89, status = 'Highly Suitable' }) {
  // Semi-circle gauge math: 180 degrees arc
  const radius = 90;
  const strokeWidth = 18;
  const circumference = Math.PI * radius; // approx 282.74
  const progressPercent = Math.min(100, Math.max(0, score)) / 100;
  const strokeDashoffset = circumference * (1 - progressPercent);

  // Status color styling matching the green / emerald theme in the screenshot
  const getStatusColor = () => {
    if (score >= 85) return 'text-emerald-400';
    if (score >= 70) return 'text-emerald-400';
    if (score >= 50) return 'text-amber-400';
    return 'text-rose-400';
  };

  return (
    <div className="bg-[#111827] dark:bg-[#111827] border border-gray-800 rounded-2xl p-6 shadow-sm flex flex-col justify-between h-full relative transition-colors duration-200">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-1.5">
          <h3 className="text-base font-bold text-white">
            Overall Suitability Score
          </h3>
          <div className="group relative cursor-pointer">
            <Info className="w-4 h-4 text-gray-400 hover:text-gray-200 transition-colors" />
            <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:flex flex-col w-56 p-2.5 bg-gray-950 text-white text-[11px] rounded-xl shadow-2xl border border-gray-800 z-50 pointer-events-none">
              Calculated dynamically using weighted matching of your personal profile, driving patterns, and top priorities.
            </div>
          </div>
        </div>
      </div>

      {/* SVG Semi-Circular Gauge */}
      <div className="flex flex-col items-center justify-center my-auto pt-4 pb-2 relative">
        <div className="relative w-64 h-36 flex items-end justify-center overflow-hidden">
          <svg viewBox="0 0 240 135" className="w-full h-full">
            <defs>
              {/* Semicircular gradient from Red -> Orange -> Yellow -> Green -> Emerald */}
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
            <span className="text-6xl font-extrabold tracking-tight text-white leading-none">
              {score}
            </span>
            <span className="text-xs font-semibold text-gray-400 mt-1">
              / 100
            </span>
          </div>
        </div>

        {/* Status Label (Matching Screenshot: Highly Suitable with Star) */}
        <div className="mt-4 flex items-center justify-center space-x-1.5">
          <span className={`text-xl font-bold ${getStatusColor()}`}>
            {status}
          </span>
          <Star className={`w-5 h-5 ${getStatusColor()} fill-current`} />
        </div>
      </div>
    </div>
  );
}
