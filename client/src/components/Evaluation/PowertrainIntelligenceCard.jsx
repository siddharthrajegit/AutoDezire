import React, { useState, useEffect } from 'react';
import {
  Fuel,
  Sparkles,
  Zap,
  Gauge,
  Activity,
  SlidersHorizontal,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export default function PowertrainIntelligenceCard({ vehicle, evaluation }) {
  if (!vehicle) return null;

  const availableFuels = vehicle.availableFuelTypes || (vehicle.fuelType ? vehicle.fuelType.split(' / ') : ['Petrol']);
  const fuelVariants = vehicle.fuelVariants || {};
  const recommendedFuel = evaluation?.fuelRecommendation?.recommendedFuelType;
  const recommendedReason = evaluation?.fuelRecommendation?.reason;

  const [activeFuel, setActiveFuel] = useState(recommendedFuel || availableFuels[0] || 'Petrol');

  useEffect(() => {
    if (recommendedFuel && availableFuels.includes(recommendedFuel)) {
      setActiveFuel(recommendedFuel);
    } else if (availableFuels.length > 0 && !availableFuels.includes(activeFuel)) {
      setActiveFuel(availableFuels[0]);
    }
  }, [recommendedFuel, vehicle]);

  const currentVariant = fuelVariants[activeFuel] || null;

  const fuelColorMap = {
    Petrol: {
      activeTab: 'bg-amber-500 text-white shadow-md shadow-amber-500/20',
      badge: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
      icon: '⛽'
    },
    Diesel: {
      activeTab: 'bg-blue-600 text-white shadow-md shadow-blue-600/20',
      badge: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
      icon: '⛽'
    },
    CNG: {
      activeTab: 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20',
      badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
      icon: '🌱'
    },
    Electric: {
      activeTab: 'bg-teal-600 text-white shadow-md shadow-teal-600/20',
      badge: 'bg-teal-500/10 text-teal-400 border-teal-500/30',
      icon: '⚡'
    },
    'Strong Hybrid': {
      activeTab: 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20',
      badge: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30',
      icon: '🔋'
    }
  };

  const isCurrentRecommended = recommendedFuel === activeFuel;

  // Safe helper to extract list of strings from string or array
  const normalizeList = (val) => {
    if (!val) return [];
    if (Array.isArray(val)) return val;
    if (typeof val === 'string') return [val];
    return [];
  };

  const strengthsList = normalizeList(currentVariant?.strengths || currentVariant?.keyFit);
  const limitationsList = normalizeList(currentVariant?.limitations);

  return (
    <div className="bg-[#111827] dark:bg-[#111827] border border-gray-800 rounded-2xl p-6 shadow-sm space-y-5 transition-colors duration-200">
      {/* Header with Switcher Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-gray-800">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <Fuel className="w-5 h-5 text-orange-500" />
            <h3 className="text-lg font-bold text-white tracking-tight">
              Powertrain & Fuel Variant Intelligence
            </h3>
            {availableFuels.length > 1 && (
              <span className="px-2.5 py-0.5 rounded-lg text-[11px] font-semibold bg-gray-800 text-gray-300 border border-gray-700">
                {availableFuels.length} Options
              </span>
            )}
          </div>
          <p className="text-xs text-gray-400">
            Compare engine characteristics, real-world running cost, and personalized suitability for each fuel variant.
          </p>
        </div>

        {/* Powertrain Tabs */}
        {availableFuels.length > 1 && (
          <div className="flex flex-wrap items-center gap-1.5 bg-gray-900/80 p-1.5 rounded-xl border border-gray-800 self-start md:self-auto">
            {availableFuels.map((fuel) => {
              const isSelected = activeFuel === fuel;
              const isRec = recommendedFuel === fuel;
              const fColors = fuelColorMap[fuel] || fuelColorMap.Petrol;

              return (
                <button
                  key={fuel}
                  onClick={() => setActiveFuel(fuel)}
                  className={`relative px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                    isSelected
                      ? fColors.activeTab
                      : 'text-gray-400 hover:text-white hover:bg-gray-800'
                  }`}
                >
                  <span>{fColors.icon} {fuel}</span>
                  {isRec && (
                    <span className="w-2 h-2 rounded-full bg-amber-300 animate-ping ml-1" title="Recommended for your usage" />
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Main Spec Breakdown for Selected Powertrain */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-gray-900/50 p-4 rounded-xl border border-gray-800/80">
          <div>
            <div className="flex items-center space-x-2.5">
              <span className="text-base font-bold text-white">
                {currentVariant?.name || `${vehicle.brand} ${vehicle.model} ${activeFuel} Engine`}
              </span>
              {isCurrentRecommended && (
                <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span>AI Recommended For You</span>
                </span>
              )}
            </div>
            <p className="text-xs text-gray-400 mt-1">
              {currentVariant?.idealFor || (typeof currentVariant?.keyFit === 'string' ? currentVariant.keyFit : `Standard ${activeFuel} powertrain configuration`)}
            </p>
          </div>

          <div className="flex items-center space-x-4 self-start sm:self-auto">
            {currentVariant?.runningCostPerKm && (
              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-gray-400 block">Est. Running Cost</span>
                <span className="text-sm font-extrabold text-emerald-400">
                  ₹{currentVariant.runningCostPerKm} / km
                </span>
              </div>
            )}
            {currentVariant?.priceRange && (
              <div className="text-right pl-4 border-l border-gray-800">
                <span className="text-[10px] uppercase font-bold text-gray-400 block">Variant Price</span>
                <span className="text-sm font-extrabold text-white">
                  {currentVariant.priceRange}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* AI Recommendation Rationale Box */}
        {isCurrentRecommended && recommendedReason && (
          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-start space-x-2.5">
            <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-amber-200/90 leading-relaxed">
              <strong className="text-amber-300 font-bold">Why this fuel variant fits you: </strong>
              {recommendedReason}
            </div>
          </div>
        )}

        {/* 4-Column Technical Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div className="p-3 bg-gray-900/60 rounded-xl border border-gray-800">
            <span className="text-gray-400 text-[10px] uppercase font-bold block flex items-center space-x-1">
              <Zap className="w-3 h-3 text-gray-400" />
              <span>Engine / Motor</span>
            </span>
            <span className="font-semibold text-gray-100 truncate block mt-1">
              {currentVariant?.engine || vehicle.engine}
            </span>
          </div>

          <div className="p-3 bg-gray-900/60 rounded-xl border border-gray-800">
            <span className="text-gray-400 text-[10px] uppercase font-bold block flex items-center space-x-1">
              <Activity className="w-3 h-3 text-gray-400" />
              <span>Power & Torque</span>
            </span>
            <span className="font-semibold text-gray-100 truncate block mt-1">
              {currentVariant?.power || vehicle.power} • {currentVariant?.torque || vehicle.torque}
            </span>
          </div>

          <div className="p-3 bg-gray-900/60 rounded-xl border border-gray-800">
            <span className="text-gray-400 text-[10px] uppercase font-bold block flex items-center space-x-1">
              <Gauge className="w-3 h-3 text-gray-400" />
              <span>Fuel Economy</span>
            </span>
            <span className="font-semibold text-emerald-400 truncate block mt-1">
              {currentVariant?.mileage || vehicle.mileage}
            </span>
          </div>

          <div className="p-3 bg-gray-900/60 rounded-xl border border-gray-800">
            <span className="text-gray-400 text-[10px] uppercase font-bold block flex items-center space-x-1">
              <SlidersHorizontal className="w-3 h-3 text-gray-400" />
              <span>Transmission</span>
            </span>
            <span className="font-semibold text-gray-100 truncate block mt-1">
              {currentVariant?.transmission || vehicle.transmission}
            </span>
          </div>
        </div>

        {/* Inherent Strengths & Limitations */}
        {(strengthsList.length > 0 || limitationsList.length > 0) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1 text-xs">
            {strengthsList.length > 0 && (
              <div className="p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/15">
                <span className="text-[10px] uppercase font-bold text-emerald-400 flex items-center space-x-1 mb-1.5">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  <span>Variant Advantages</span>
                </span>
                <ul className="space-y-1 text-gray-300">
                  {strengthsList.map((str, idx) => (
                    <li key={idx} className="flex items-start space-x-1.5">
                      <span className="text-emerald-400 font-bold">•</span>
                      <span>{str}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {limitationsList.length > 0 && (
              <div className="p-3 rounded-xl bg-amber-500/5 border border-amber-500/15">
                <span className="text-[10px] uppercase font-bold text-amber-400 flex items-center space-x-1 mb-1.5">
                  <AlertCircle className="w-3 h-3 text-amber-400" />
                  <span>Considerations</span>
                </span>
                <ul className="space-y-1 text-gray-300">
                  {limitationsList.map((lim, idx) => (
                    <li key={idx} className="flex items-start space-x-1.5">
                      <span className="text-amber-400 font-bold">•</span>
                      <span>{lim}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
