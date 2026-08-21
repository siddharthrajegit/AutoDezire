import React from 'react';
import {
  BarChart2,
  X,
  Plus,
  Star,
  Shield,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowRight,
  PersonStanding,
  Gauge,
  Zap
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { evaluateSuitability, REQUIREMENT_CONFIG } from '../../services/clientSuitabilityEngine';

export default function CompareView() {
  const { compareList, setCompareList, toggleCompare, vehicles, userProfile, evaluateVehicle, setActiveTab } = useApp();

  const handleAddVehicle = (vehicle) => {
    toggleCompare(vehicle);
  };

  const availableVehicles = vehicles.filter(
    v => !compareList.some(c => (c.id || c._id) === (v.id || v._id))
  );

  return (
    <div className="space-y-8 pb-16 max-w-[1400px] mx-auto animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
            Suitability Comparison
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
            Compare how different automobiles fit YOUR profile ({userProfile.name}, Height: {userProfile.height}cm, {userProfile.yearsExperience} yrs exp, ₹{userProfile.budget}L Budget).
          </p>
        </div>

        {compareList.length > 0 && (
          <button
            onClick={() => setCompareList([])}
            className="text-xs font-semibold text-rose-500 hover:text-rose-600 self-start sm:self-auto"
          >
            Clear All Comparison
          </button>
        )}
      </div>

      {compareList.length === 0 ? (
        <div className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-800 rounded-3xl p-12 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center mx-auto">
            <BarChart2 className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            No Automobiles Selected for Comparison
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 max-w-md mx-auto">
            Select up to 3 vehicles from Search or Recommendations to compare their personalized suitability side-by-side.
          </p>
          <button
            onClick={() => setActiveTab('search')}
            className="px-6 py-3 rounded-2xl bg-orange-500 text-white text-xs font-bold shadow-md"
          >
            Browse & Add Vehicles
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Comparison Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {compareList.map(vehicle => {
              const evalResult = evaluateSuitability(vehicle, userProfile);

              return (
                <div
                  key={vehicle.id || vehicle._id}
                  className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm flex flex-col justify-between relative"
                >
                  {/* Remove Button */}
                  <button
                    onClick={() => toggleCompare(vehicle)}
                    className="absolute top-4 right-4 p-1.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-400 hover:text-rose-500 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <div>
                    {/* Header */}
                    <div className="flex items-center space-x-2">
                      <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-purple-600 text-white uppercase">
                        {vehicle.bodyType || vehicle.category}
                      </span>
                      {vehicle.chargingRequired && (
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-500 text-white flex items-center space-x-1">
                          <Zap className="w-2.5 h-2.5" />
                          <span>EV Plug-in</span>
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-2">
                      {vehicle.brand} {vehicle.model}
                    </h3>
                    <p className="text-xs text-emerald-500 font-bold mt-1">
                      {vehicle.priceDisplay}
                    </p>

                    {/* Image */}
                    <div className="w-full h-36 my-3 rounded-xl overflow-hidden flex items-center justify-center p-2 bg-gray-50 dark:bg-gray-800/40">
                      <img
                        src={vehicle.image}
                        alt={vehicle.model}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>

                    {/* Overall Score Banner */}
                    <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center my-3">
                      <span className="text-[10px] uppercase font-bold text-gray-500 dark:text-gray-400 tracking-wider">
                        Personalized Suitability
                      </span>
                      <div className="text-3xl font-black text-emerald-500 dark:text-emerald-400 mt-0.5">
                        {evalResult.overallScore} <span className="text-xs text-gray-400 font-normal">/100</span>
                      </div>
                      <span className="text-xs font-bold text-emerald-400">
                        {evalResult.overallStatus}
                      </span>
                    </div>

                    {/* Budget Status */}
                    <div className="flex items-center justify-between text-xs py-2 border-b border-gray-100 dark:border-gray-800">
                      <span className="text-gray-500">Budget Compatibility</span>
                      <span className={`font-bold ${
                        evalResult.budgetStatus === 'Within Budget'
                          ? 'text-emerald-500'
                          : evalResult.budgetStatus === 'Slightly Above Budget'
                          ? 'text-amber-500'
                          : 'text-rose-500'
                      }`}>
                        {evalResult.budgetStatus}
                      </span>
                    </div>

                    {/* Key Specs */}
                    <div className="space-y-1.5 py-3 text-xs border-b border-gray-100 dark:border-gray-800 text-gray-600 dark:text-gray-300">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Engine / Drive:</span>
                        <span className="font-semibold">{vehicle.engine} • {vehicle.driveType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Headroom / Seat:</span>
                        <span className="font-semibold">
                          {vehicle.cabinHeadroom ? `${vehicle.cabinHeadroom} mm headroom` : `${vehicle.seatHeight || 780} mm seat`}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Turning / Parking:</span>
                        <span className="font-semibold">{vehicle.turningRadius || 5.0}m • {vehicle.parkingDifficulty}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Mileage / Range:</span>
                        <span className="font-semibold">{vehicle.mileage}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Safety Rating:</span>
                        <span className="font-semibold">{vehicle.safetyRating} Star ({vehicle.safetyAgency})</span>
                      </div>
                    </div>

                    {/* Requirement Scores list */}
                    <div className="space-y-2 py-3">
                      <h4 className="text-xs font-bold text-gray-900 dark:text-white">
                        Scores for Your Top Priorities:
                      </h4>
                      {userProfile.topPriorities?.map(p => {
                        const match = evalResult.requirementList.find(r => r.name === p || r.key.toLowerCase().includes(p.toLowerCase().slice(0, 4)));
                        const score = match ? match.score : 7;
                        return (
                          <div key={p} className="flex items-center justify-between text-xs">
                            <span className="text-gray-500 dark:text-gray-400 font-medium">{p}</span>
                            <span className="font-bold text-gray-900 dark:text-white px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800">
                              {score}/10
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <button
                    onClick={() => evaluateVehicle(vehicle)}
                    className="w-full mt-4 py-2.5 rounded-xl bg-orange-500 text-white text-xs font-bold hover:bg-orange-600 transition-all"
                  >
                    View Full Evaluation
                  </button>
                </div>
              );
            })}

            {/* Empty Slot to Add Vehicle */}
            {compareList.length < 3 && (
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-800 rounded-3xl p-6 flex flex-col items-center justify-center text-center space-y-4 min-h-[400px]">
                <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-400 flex items-center justify-center">
                  <Plus className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white">
                    Add Another Vehicle
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Select a vehicle to compare side-by-side
                  </p>
                </div>

                <div className="w-full max-w-xs space-y-2">
                  <select
                    onChange={(e) => {
                      const found = vehicles.find(v => (v.id || v._id) === e.target.value);
                      if (found) handleAddVehicle(found);
                    }}
                    defaultValue=""
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-xs font-semibold text-gray-800 dark:text-white focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="" disabled>Choose Automobile...</option>
                    {availableVehicles.map(v => (
                      <option key={v.id || v._id} value={v.id || v._id}>
                        {v.brand} {v.model} ({v.priceDisplay})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
