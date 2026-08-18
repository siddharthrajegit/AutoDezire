import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  Search,
  Bot,
  Car,
  Bike,
  Zap,
  ShieldCheck,
  Award,
  ChevronRight,
  TrendingUp,
  Compass,
  CheckCircle2,
  Star
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { evaluateSuitability } from '../../services/clientSuitabilityEngine';

export default function HomeView() {
  const { setActiveTab, vehicles, userProfile, evaluateVehicle } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredVehicles = vehicles
    .filter(v => selectedCategory === 'All' || v.category === selectedCategory)
    .slice(0, 6);

  return (
    <div className="space-y-10 pb-16 max-w-[1400px] mx-auto animate-fadeIn">
      {/* Hero Section */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-gray-900 via-gray-900 to-black border border-gray-800 p-8 sm:p-12 text-white shadow-2xl">
        {/* Glow backdrop decorative */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-400 text-xs font-bold tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5 fill-current" />
            <span>AI-Powered Suitability Platform</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight">
            Find the automobile <br />
            <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-red-400 bg-clip-text text-transparent">
              that fits you.
            </span>
          </h1>

          <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-2xl font-normal">
            Instead of asking which vehicle you want, AutoDezire understands who you are, how you drive or ride, where you commute, and what matters most to you.
          </p>

          {/* Quick Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => setActiveTab('profile')}
              className="flex items-center space-x-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-sm shadow-lg hover:shadow-orange-500/30 hover:scale-[1.02] transition-all"
            >
              <span>Start Suitability Profile</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setActiveTab('search')}
              className="flex items-center space-x-2.5 px-6 py-3.5 rounded-xl bg-gray-800/90 hover:bg-gray-700/90 text-gray-100 font-semibold text-sm border border-gray-700 transition-all"
            >
              <Search className="w-4 h-4 text-gray-400" />
              <span>Search Specific Automobile</span>
            </button>

            <button
              onClick={() => setActiveTab('ai-advisor')}
              className="flex items-center space-x-2.5 px-5 py-3.5 rounded-xl bg-purple-900/30 hover:bg-purple-800/40 text-purple-300 font-semibold text-sm border border-purple-700/40 transition-all"
            >
              <Bot className="w-4 h-4 text-purple-400" />
              <span>Ask AI Advisor</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3 Core Pillars: Flow Explanation */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-800/90 rounded-2xl p-6 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-500 flex items-center justify-center mb-4">
            <Compass className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">
            1. Tell Us About Yourself
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
            Multi-step questionnaire capturing height, road conditions, daily commuting, family requirements, and your top 3 priorities.
          </p>
        </div>

        <div className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-800/90 rounded-2xl p-6 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center mb-4">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">
            2. Transparent Suitability Scores
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
            Overall 0-100 score + 10 individual requirement cards showing how well a vehicle fits YOUR usage, not just generic specifications.
          </p>
        </div>

        <div className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-800/90 rounded-2xl p-6 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center mb-4">
            <Bot className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">
            3. Context-Aware AI Advisor
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
            Ask why a car was recommended, evaluate compromises for tall drivers, compare models, or explore budget adjustments with full context.
          </p>
        </div>
      </div>

      {/* Featured Suitability Showcase */}
      <div className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Automobile Suitability Showcase
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Live suitability calculated for {userProfile.name}'s profile (₹{userProfile.budget}L budget, {userProfile.dailyKm} km daily)
            </p>
          </div>

          {/* Category Filter Chips */}
          <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800/80 p-1 rounded-xl">
            {['All', 'Car', 'Motorcycle', 'Scooter'].map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {cat === 'All' ? 'All Vehicles' : `${cat}s`}
              </button>
            ))}
          </div>
        </div>

        {/* Vehicles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVehicles.map(vehicle => {
            const evalResult = evaluateSuitability(vehicle, userProfile);
            return (
              <div
                key={vehicle.id || vehicle._id}
                className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-purple-600/90 text-white uppercase tracking-wider">
                        {vehicle.bodyType || vehicle.category}
                      </span>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-1.5">
                        {vehicle.brand} {vehicle.model}
                      </h3>
                    </div>

                    {/* Overall Score Badge */}
                    <div className="text-right">
                      <div className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-black text-sm">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span>{evalResult.overallScore}/100</span>
                      </div>
                      <p className="text-[10px] text-gray-400 mt-0.5 font-medium">
                        {evalResult.overallStatus}
                      </p>
                    </div>
                  </div>

                  {/* Vehicle Image */}
                  <div className="w-full h-36 my-3 rounded-xl overflow-hidden flex items-center justify-center p-2 bg-gray-50 dark:bg-gray-800/40">
                    <img
                      src={vehicle.image}
                      alt={vehicle.model}
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Price and Specs */}
                  <div className="flex items-baseline justify-between pt-1">
                    <span className="text-base font-bold text-emerald-500 dark:text-emerald-400">
                      {vehicle.priceDisplay}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {vehicle.mileage}
                    </span>
                  </div>

                  {/* Top matching highlight */}
                  <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-800/80">
                    <p className="text-[11px] text-gray-600 dark:text-gray-300 line-clamp-2">
                      <span className="text-emerald-500 font-bold">Key Fit:</span> {evalResult.topStrengths[0] || 'Well matched for your profile'}
                    </p>
                  </div>
                </div>

                {/* View Full Evaluation Button */}
                <button
                  onClick={() => evaluateVehicle(vehicle)}
                  className="w-full mt-4 flex items-center justify-center space-x-2 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-orange-500 hover:text-white dark:hover:bg-orange-500 text-gray-800 dark:text-gray-200 text-xs font-bold transition-all"
                >
                  <span>View Suitability Evaluation</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
