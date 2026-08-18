import React from 'react';
import {
  CheckCircle2,
  AlertCircle,
  Shield,
  Star,
  AlertTriangle
} from 'lucide-react';

export default function StrengthsConsiderations({
  strengths = [],
  considerations = [],
  safetyRating = 5,
  safetyAgency = 'Global NCAP Rating',
  criticalCompromises = []
}) {
  return (
    <div className="space-y-4">
      {/* Critical Compromise Warning Alert if any priority has failed */}
      {criticalCompromises && criticalCompromises.length > 0 && (
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 flex items-start space-x-3 text-amber-300">
          <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-bold text-amber-400">
              Important Priority Notice
            </h4>
            <p className="text-xs text-gray-300 mt-0.5">
              This vehicle has high average scores, but has a notable compromise in one of your selected top priorities:{' '}
              <span className="font-semibold text-amber-300">
                {criticalCompromises.map(c => c.priority).join(', ')}
              </span>.
            </p>
          </div>
        </div>
      )}

      {/* Main 2-Column Grid matching Screenshot */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Top Strengths */}
        <div className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-800/90 rounded-2xl p-6 shadow-sm flex flex-col justify-between transition-colors duration-200">
          <div>
            <h3 className="text-base font-bold text-emerald-500 dark:text-emerald-400 mb-4">
              Top Strengths
            </h3>

            <div className="space-y-3.5">
              {strengths.map((item, idx) => (
                <div key={idx} className="flex items-start space-x-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 fill-emerald-500/20" />
                  </div>
                  <p className="text-xs font-medium text-gray-700 dark:text-gray-200 leading-relaxed">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Safety Rating Badge at bottom of strengths */}
          {safetyRating > 0 && (
            <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800/80 flex items-center space-x-4 bg-gray-50/60 dark:bg-gray-800/30 rounded-xl p-3">
              <div className="w-11 h-11 rounded-xl bg-blue-600/90 text-white flex items-center justify-center flex-shrink-0 shadow-md">
                <Shield className="w-6 h-6 fill-blue-400/30" />
              </div>
              <div>
                <h4 className="text-sm font-black text-gray-900 dark:text-white leading-tight">
                  {safetyRating} Star Safety
                </h4>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 font-medium">
                  {safetyAgency || 'Global NCAP Rating'}
                </p>
                <div className="flex items-center space-x-1 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${
                        i < safetyRating
                          ? 'text-amber-400 fill-amber-400'
                          : 'text-gray-300 dark:text-gray-600'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right: Considerations */}
        <div className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-800/90 rounded-2xl p-6 shadow-sm transition-colors duration-200">
          <h3 className="text-base font-bold text-amber-500 dark:text-amber-400 mb-4">
            Considerations
          </h3>

          <div className="space-y-3.5">
            {considerations.map((item, idx) => (
              <div key={idx} className="flex items-start space-x-3">
                <div className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                </div>
                <p className="text-xs font-medium text-gray-700 dark:text-gray-200 leading-relaxed">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
