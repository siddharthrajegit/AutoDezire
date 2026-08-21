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
  Star,
  Film,
  Play,
  PersonStanding,
  Gauge
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { evaluateSuitability } from '../../services/clientSuitabilityEngine';
import { evaluateBikeSuitability } from '../../services/bikeSuitabilityEngine';

export default function HomeView() {
  const {
    setActiveTab,
    vehicles,
    bikes,
    userProfile,
    bikeProfile,
    evaluateVehicle,
    selectedVehicleType,
    setSelectedVehicleType,
    setEntryVehicleType,
    setShowScrollScrubbing
  } = useApp();

  const [selectedCategory, setSelectedCategory] = useState('All');

  const launchScrollytelling = (type) => {
    setSelectedVehicleType(type);
    setEntryVehicleType(type);
    setShowScrollScrubbing(true);
  };

  const isTwoWheeler = selectedVehicleType === '2-wheeler';
  const activeList = isTwoWheeler ? bikes : vehicles.filter(v => v.category === 'Car');

  const filteredList = activeList
    .filter(v => selectedCategory === 'All' || v.category === selectedCategory || v.bodyType === selectedCategory)
    .slice(0, 6);

  return (
    <div className="space-y-10 pb-16 max-w-[1400px] mx-auto animate-fadeIn">
      {/* 1. TOP CATEGORY SELECTION GATEWAY */}
      <div className="space-y-4">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-400 text-xs font-bold tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5 fill-current" />
            <span>Choose Your Category to Begin</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-gray-900 dark:text-white leading-tight">
            Select Your Automobile Mode
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            Choose between <strong>4-Wheelers</strong> and <strong>2-Wheelers</strong> to launch the 60FPS scroll video experience and enter your personalized suitability profile.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* OPTION 1: 4 WHEELERS */}
          <div
            onClick={() => launchScrollytelling('4-wheeler')}
            className={`group relative rounded-3xl p-8 border cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl flex flex-col justify-between overflow-hidden ${
              selectedVehicleType === '4-wheeler'
                ? 'bg-gradient-to-br from-gray-900 via-gray-900 to-black border-orange-500/60 ring-2 ring-orange-500/20 shadow-xl'
                : 'bg-white dark:bg-[#111827] border-gray-200 dark:border-gray-800 hover:border-orange-500/60'
            }`}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-orange-500/20 text-orange-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Car className="w-7 h-7" />
                </div>
                <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-orange-500 text-white shadow-sm">
                  4-Wheeler Mode
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-black text-gray-900 dark:text-white">
                  Cars, SUVs & Sedans
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 leading-relaxed">
                  Tailored for cabin headroom (tall 6ft+ comfort), 5/7 family seating, luggage boot space, NCAP safety, and highway stability.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-2 text-[11px] font-semibold text-gray-400">
                <span className="px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                  Headroom & Ingress
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                  Family Luggage & Seating
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                  EV & Hybrid
                </span>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
              <span className="text-xs font-bold text-orange-500 group-hover:underline flex items-center space-x-1">
                <Film className="w-3.5 h-3.5" />
                <span>Play 60FPS Scroll Video & Begin Profile</span>
              </span>
              <div className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center group-hover:translate-x-1 transition-transform">
                <Play className="w-4 h-4 fill-current ml-0.5" />
              </div>
            </div>
          </div>

          {/* OPTION 2: 2 WHEELERS */}
          <div
            onClick={() => launchScrollytelling('2-wheeler')}
            className={`group relative rounded-3xl p-8 border cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl flex flex-col justify-between overflow-hidden ${
              selectedVehicleType === '2-wheeler'
                ? 'bg-gradient-to-br from-gray-900 via-gray-900 to-black border-purple-500/60 ring-2 ring-purple-500/20 shadow-xl'
                : 'bg-white dark:bg-[#111827] border-gray-200 dark:border-gray-800 hover:border-purple-500/60'
            }`}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Bike className="w-7 h-7" />
                </div>
                <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-purple-600 text-white shadow-sm">
                  2-Wheeler Mode
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-black text-gray-900 dark:text-white">
                  Motorcycles & Scooters
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 leading-relaxed">
                  Tailored for <strong>Rider Height & Inseam (Flat-Footing)</strong>, <strong>Rider Body Weight</strong> balance, pillion comfort, and underseat storage.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-2 text-[11px] font-semibold text-gray-400">
                <span className="px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                  Flat-Foot Ground Reach
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                  Rider Weight & Balance
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                  Underseat Helmet Storage
                </span>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
              <span className="text-xs font-bold text-purple-400 group-hover:underline flex items-center space-x-1">
                <Film className="w-3.5 h-3.5" />
                <span>Play 60FPS Scroll Video & Begin Profile</span>
              </span>
              <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center group-hover:translate-x-1 transition-transform">
                <Play className="w-4 h-4 fill-current ml-0.5" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. THREE CORE PILLARS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-800/90 rounded-2xl p-6 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-500 flex items-center justify-center mb-4">
            <Compass className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">
            1. Physical Ergonomics
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
            {isTwoWheeler
              ? 'Evaluates rider inseam leg reach against saddle seat height to ensure safe flat-footing at traffic signals.'
              : 'Evaluates driver height against cabin headroom & rooflines to ensure tall 6ft+ comfort without crouching.'}
          </p>
        </div>

        <div className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-800/90 rounded-2xl p-6 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center mb-4">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">
            2. Weight & Power Safety
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
            {isTwoWheeler
              ? 'Matches rider body weight against bike kerb weight so lightweight riders avoid struggling with 195kg metal cruisers in parking.'
              : 'Protects novice drivers from oversized 197bhp engines or demanding 4WD off-road systems in city traffic.'}
          </p>
        </div>

        <div className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-800/90 rounded-2xl p-6 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center mb-4">
            <Bot className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">
            3. Transparent Suitability
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
            Clear 0–100 match rating with 10 dedicated scorecards and automated EV charging eligibility checks.
          </p>
        </div>
      </div>

      {/* 3. SHOWCASE CATALOG */}
      <div className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-purple-600 text-white">
                {isTwoWheeler ? '2-Wheeler Showcase' : '4-Wheeler Showcase'}
              </span>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Featured {isTwoWheeler ? 'Motorcycles & Scooters' : 'Cars & SUVs'}
              </h2>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Live suitability calculated for {isTwoWheeler ? bikeProfile.name : userProfile.name}'s profile (₹{isTwoWheeler ? bikeProfile.budget : userProfile.budget}L budget)
            </p>
          </div>

          {/* Category Filter Switch */}
          <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800/80 p-1 rounded-xl">
            <button
              onClick={() => setSelectedCategory('All')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedCategory === 'All'
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              All {isTwoWheeler ? '2-Wheelers' : 'Cars'}
            </button>
            {isTwoWheeler ? (
              <>
                <button
                  onClick={() => setSelectedCategory('Motorcycle')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    selectedCategory === 'Motorcycle'
                      ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  Motorcycles
                </button>
                <button
                  onClick={() => setSelectedCategory('Scooter')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    selectedCategory === 'Scooter'
                      ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  Scooters
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setSelectedCategory('SUV')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    selectedCategory === 'SUV'
                      ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  SUVs
                </button>
                <button
                  onClick={() => setSelectedCategory('Hatchback')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    selectedCategory === 'Hatchback'
                      ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  Hatchbacks
                </button>
              </>
            )}
          </div>
        </div>

        {/* Vehicles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredList.map(vehicle => {
            const evalResult = isTwoWheeler
              ? evaluateBikeSuitability(vehicle, bikeProfile)
              : evaluateSuitability(vehicle, userProfile);

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

                  <div className="w-full h-36 my-3 rounded-xl overflow-hidden flex items-center justify-center p-2 bg-gray-50 dark:bg-gray-800/40">
                    <img
                      src={vehicle.image}
                      alt={vehicle.model}
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="flex items-baseline justify-between pt-1">
                    <span className="text-base font-bold text-emerald-500 dark:text-emerald-400">
                      {vehicle.priceDisplay}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {vehicle.mileage}
                    </span>
                  </div>

                  <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-800/80">
                    <p className="text-[11px] text-gray-600 dark:text-gray-300 line-clamp-2">
                      <span className="text-emerald-500 font-bold">Key Match:</span> {evalResult.topStrengths[0] || 'Well matched for your profile'}
                    </p>
                  </div>
                </div>

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
