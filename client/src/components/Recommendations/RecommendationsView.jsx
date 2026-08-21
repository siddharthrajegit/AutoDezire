import React, { useState } from 'react';
import {
  Sparkles,
  Star,
  Shield,
  ArrowRight,
  BarChart2,
  CheckCircle2,
  AlertCircle,
  SlidersHorizontal,
  ChevronRight,
  Heart,
  ChevronDown,
  ChevronUp,
  XCircle,
  PersonStanding,
  Gauge,
  Zap,
  Car,
  Bike
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { evaluateSuitability } from '../../services/clientSuitabilityEngine';
import { evaluateBikeSuitability } from '../../services/bikeSuitabilityEngine';

export default function RecommendationsView() {
  const {
    vehicles,
    bikes,
    userProfile,
    bikeProfile,
    selectedVehicleType,
    setSelectedVehicleType,
    evaluateVehicle,
    compareList,
    toggleCompare,
    savedVehicles,
    toggleSaveVehicle,
    setActiveTab
  } = useApp();

  const [filterCategory, setFilterCategory] = useState('All');
  const [showIneligible, setShowIneligible] = useState(false);

  const isTwoWheeler = selectedVehicleType === '2-wheeler';
  const activeDataset = isTwoWheeler ? bikes : vehicles.filter(v => v.category === 'Car');
  const activeProfile = isTwoWheeler ? bikeProfile : userProfile;

  // Compute live suitability
  const evaluatedVehicles = activeDataset
    .map(v => {
      const evaluation = isTwoWheeler
        ? evaluateBikeSuitability(v, bikeProfile)
        : evaluateSuitability(v, userProfile);

      return {
        vehicle: v,
        evaluation,
        overallScore: evaluation.overallScore,
        isEligible: evaluation.isEligible,
      };
    })
    .sort((a, b) => b.overallScore - a.overallScore);

  const eligibleList = evaluatedVehicles.filter(
    item => item.isEligible && (filterCategory === 'All' || item.vehicle.category === filterCategory || item.vehicle.bodyType === filterCategory)
  );

  const ineligibleList = evaluatedVehicles.filter(
    item => !item.isEligible && (filterCategory === 'All' || item.vehicle.category === filterCategory || item.vehicle.bodyType === filterCategory)
  );

  return (
    <div className="space-y-8 pb-16 max-w-[1400px] mx-auto animate-fadeIn">
      {/* Top Vehicle Type Switcher */}
      <div className="flex items-center justify-center">
        <div className="flex items-center bg-gray-200/80 dark:bg-gray-800/80 p-1.5 rounded-2xl border border-gray-300 dark:border-gray-700 shadow-sm">
          <button
            onClick={() => {
              setSelectedVehicleType('4-wheeler');
              setFilterCategory('All');
            }}
            className={`flex items-center space-x-2 px-5 py-2 rounded-xl text-xs font-bold transition-all ${
              !isTwoWheeler
                ? 'bg-orange-500 text-white shadow-md'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <Car className="w-4 h-4" />
            <span>4-Wheeler Recommendations</span>
          </button>
          <button
            onClick={() => {
              setSelectedVehicleType('2-wheeler');
              setFilterCategory('All');
            }}
            className={`flex items-center space-x-2 px-5 py-2 rounded-xl text-xs font-bold transition-all ${
              isTwoWheeler
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <Bike className="w-4 h-4" />
            <span>2-Wheeler Recommendations</span>
          </button>
        </div>
      </div>

      {/* Top Banner / Summary */}
      <div className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-800 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 fill-current" />
            <span>{isTwoWheeler ? '2-Wheeler (Bike & Scooter)' : '4-Wheeler (Car)'} Recommendations for {activeProfile.name}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white tracking-tight">
            Top Suited {isTwoWheeler ? 'Two-Wheelers' : 'Automobiles'}
          </h1>
          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-gray-500 dark:text-gray-400">
            <span>Height: <strong className="text-orange-500">{isTwoWheeler ? activeProfile.riderHeight : activeProfile.height} cm</strong></span>
            {isTwoWheeler && (
              <>
                <span>•</span>
                <span>Rider Weight: <strong className="text-rose-400">{activeProfile.riderWeight || 68} kg</strong></span>
              </>
            )}
            <span>•</span>
            <span>Experience: <strong className="text-blue-500">{activeProfile.yearsExperience} yrs ({activeProfile.confidenceLevel || 'Confident'})</strong></span>
            <span>•</span>
            <span>Budget: <strong className="text-emerald-500">₹{activeProfile.budget}L</strong></span>
            <span>•</span>
            <span>Charging: <strong className="text-purple-400">{activeProfile.hasHomeCharging ? 'Home Socket Available' : 'No Home Socket'}</strong></span>
          </div>
        </div>

        <button
          onClick={() => setActiveTab('profile')}
          className="flex items-center space-x-2 px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs font-bold text-gray-800 dark:text-gray-200 hover:border-orange-500 transition-all self-start md:self-auto"
        >
          <SlidersHorizontal className="w-3.5 h-3.5 text-orange-500" />
          <span>Adjust {isTwoWheeler ? 'Bike' : 'Car'} Profile</span>
        </button>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800/80 p-1.5 rounded-2xl w-fit">
        {isTwoWheeler
          ? ['All', 'Motorcycle', 'Scooter', 'Electric Scooter'].map(cat => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  filterCategory === cat
                    ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {cat === 'All' ? 'All 2-Wheelers' : cat}
              </button>
            ))
          : ['All', 'SUV', 'Sedan', 'Hatchback'].map(cat => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  filterCategory === cat
                    ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {cat === 'All' ? 'All Cars' : `${cat}s`}
              </button>
            ))}
      </div>

      {/* Recommended Eligible Cards List */}
      <div className="space-y-5">
        {eligibleList.map(({ vehicle, evaluation }, idx) => {
          const isTopMatch = idx === 0 && filterCategory === 'All';
          const isSaved = savedVehicles.includes(vehicle.id || vehicle._id);
          const isCompared = compareList.some(v => (v.id || v._id) === (vehicle.id || vehicle._id));

          return (
            <div
              key={vehicle.id || vehicle._id}
              className={`bg-white dark:bg-[#111827] border rounded-3xl p-6 shadow-sm transition-all hover:shadow-md ${
                isTopMatch
                  ? isTwoWheeler
                    ? 'border-purple-500/50 dark:border-purple-500/40 ring-1 ring-purple-500/20'
                    : 'border-orange-500/50 dark:border-orange-500/40 ring-1 ring-orange-500/20'
                  : 'border-gray-200 dark:border-gray-800'
              }`}
            >
              {isTopMatch && (
                <div className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-white text-[11px] font-black uppercase tracking-wider mb-4 shadow-sm ${
                  isTwoWheeler
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600'
                    : 'bg-gradient-to-r from-orange-500 to-amber-500'
                }`}>
                  <Star className="w-3 h-3 fill-current" />
                  <span>#1 Highest Suitability Match</span>
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                {/* Left: Image & Category */}
                <div className="lg:col-span-3 flex flex-col items-center">
                  <div className="w-full h-40 rounded-2xl overflow-hidden flex items-center justify-center p-2 bg-gray-50 dark:bg-gray-800/40">
                    <img
                      src={vehicle.image}
                      alt={vehicle.model}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <div className="flex items-center justify-between w-full mt-2 px-1">
                    <span className="text-[11px] font-bold text-purple-600 dark:text-purple-400 uppercase">
                      {vehicle.bodyType || vehicle.category}
                    </span>
                    <span className="text-[11px] font-medium text-gray-500">
                      {vehicle.fuelType}
                    </span>
                  </div>
                </div>

                {/* Middle: Specs & Key Strengths */}
                <div className="lg:col-span-6 space-y-3">
                  <div>
                    <h2 className="text-xl font-black text-gray-900 dark:text-white">
                      {vehicle.brand} {vehicle.model}
                    </h2>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {vehicle.engine} • {vehicle.power} • {vehicle.mileage}
                    </p>
                  </div>

                  {/* Highlights and Badges */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-lg font-black text-emerald-500 dark:text-emerald-400">
                      {vehicle.priceDisplay}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      evaluation.budgetStatus === 'Within Budget'
                        ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                        : evaluation.budgetStatus === 'Slightly Above Budget'
                        ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                        : 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                    }`}>
                      {evaluation.budgetStatus}
                    </span>

                    {/* Bike Specific highlight tags */}
                    {isTwoWheeler && evaluation.requirementScores.ergonomicFlatFoot >= 9 && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-teal-500/15 text-teal-400 border border-teal-500/30 flex items-center space-x-1">
                        <PersonStanding className="w-3 h-3" />
                        <span>Easy Flat-Foot ({vehicle.seatHeight}mm)</span>
                      </span>
                    )}

                    {isTwoWheeler && evaluation.requirementScores.riderWeightHandling >= 9 && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/15 text-rose-400 border border-rose-500/30 flex items-center space-x-1">
                        <Gauge className="w-3 h-3" />
                        <span>Optimal Weight Balance ({vehicle.kerbWeight}kg)</span>
                      </span>
                    )}

                    {isTwoWheeler && vehicle.underseatStorageLitres >= 20 && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/15 text-blue-400 border border-blue-500/30">
                        {vehicle.underseatStorageLitres}L Boot Storage
                      </span>
                    )}

                    {/* Car Specific highlight tags */}
                    {!isTwoWheeler && evaluation.requirementScores.ergonomicFit >= 9 && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-teal-500/15 text-teal-400 border border-teal-500/30 flex items-center space-x-1">
                        <PersonStanding className="w-3 h-3" />
                        <span>Ergonomic Match (Height {activeProfile.height}cm)</span>
                      </span>
                    )}
                  </div>

                  {/* Key Match Highlights */}
                  <div className="space-y-1.5 pt-1">
                    {evaluation.topStrengths.slice(0, 2).map((str, sIdx) => (
                      <div key={sIdx} className="flex items-start space-x-2 text-xs text-gray-700 dark:text-gray-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span>{str}</span>
                      </div>
                    ))}

                    {evaluation.considerations.length > 0 && (
                      <div className="flex items-start space-x-2 text-xs text-amber-500 dark:text-amber-400">
                        <AlertCircle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
                        <span>{evaluation.considerations[0]}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right: Score Gauge & Action CTAs */}
                <div className="lg:col-span-3 flex flex-col items-center lg:items-end justify-between space-y-4 border-t lg:border-t-0 lg:border-l border-gray-100 dark:border-gray-800/80 pt-4 lg:pt-0 lg:pl-6">
                  <div className="text-center lg:text-right">
                    <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                      Suitability Match
                    </span>
                    <div className="text-3xl font-black text-gray-900 dark:text-white mt-0.5">
                      {evaluation.overallScore} <span className="text-sm font-semibold text-gray-400">/100</span>
                    </div>
                    <span className="inline-block mt-1 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-md">
                      {evaluation.overallStatus}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center space-x-2 w-full">
                    <button
                      onClick={() => toggleCompare(vehicle)}
                      className={`p-2.5 rounded-xl border transition-all ${
                        isCompared
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-blue-500'
                      }`}
                      title={isCompared ? 'In compare list' : 'Add to compare'}
                    >
                      <BarChart2 className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => toggleSaveVehicle(vehicle.id || vehicle._id)}
                      className={`p-2.5 rounded-xl border transition-all ${
                        isSaved
                          ? 'bg-rose-600 text-white border-rose-600'
                          : 'border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-rose-500'
                      }`}
                      title={isSaved ? 'Saved in Garage' : 'Save vehicle'}
                    >
                      <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                    </button>

                    <button
                      onClick={() => evaluateVehicle(vehicle)}
                      className={`flex-1 flex items-center justify-center space-x-1.5 px-4 py-2.5 rounded-xl text-white text-xs font-bold shadow-sm transition-all ${
                        isTwoWheeler
                          ? 'bg-purple-600 hover:bg-purple-700'
                          : 'bg-orange-500 hover:bg-orange-600'
                      }`}
                    >
                      <span>View Details</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Collapsible: Ineligible / Filtered Out Drawer */}
      {ineligibleList.length > 0 && (
        <div className="bg-gray-50/50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 space-y-4">
          <button
            onClick={() => setShowIneligible(!showIneligible)}
            className="w-full flex items-center justify-between text-left"
          >
            <div className="flex items-center space-x-2">
              <XCircle className="w-5 h-5 text-rose-500" />
              <div>
                <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                  Why Were {ineligibleList.length} {isTwoWheeler ? 'Two-Wheelers' : 'Cars'} Filtered Out?
                </h3>
                <p className="text-[11px] text-gray-500 dark:text-gray-400">
                  Protected by safety gates: EV charging access, novice rider weight limits, or physical height boundaries.
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-1 text-xs font-bold text-gray-500 dark:text-gray-400">
              <span>{showIneligible ? 'Hide' : 'View'} Details</span>
              {showIneligible ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </div>
          </button>

          {showIneligible && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200 dark:border-gray-800">
              {ineligibleList.map(({ vehicle, evaluation }) => (
                <div
                  key={vehicle.id || vehicle._id}
                  className="p-4 rounded-2xl bg-white dark:bg-[#111827] border border-rose-500/20 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-900 dark:text-white">
                      {vehicle.brand} {vehicle.model}
                    </span>
                    <span className="text-[10px] font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded">
                      Ineligible for Profile
                    </span>
                  </div>

                  <p className="text-[11px] text-gray-500 dark:text-gray-400">
                    {vehicle.bodyType || vehicle.category} • {vehicle.engine}
                  </p>

                  <div className="space-y-1 pt-1">
                    {evaluation.filteredOutReasons.map((reason, rIdx) => (
                      <div key={rIdx} className="flex items-start space-x-1.5 text-xs text-rose-500 dark:text-rose-400">
                        <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                        <span>{reason}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
