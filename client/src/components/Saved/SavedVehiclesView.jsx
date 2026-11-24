import React, { useMemo, useEffect } from 'react';
import {
  Heart,
  Trash2,
  BarChart2,
  ChevronRight,
  Star,
  Car,
  Bike
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { evaluateSuitability } from '../../services/clientSuitabilityEngine';
import { evaluateBikeSuitability } from '../../services/bikeSuitabilityEngine';
import { isTwoWheelerVehicle } from '../../utils/profileUtils';
import VehicleImage from '../Common/VehicleImage';

export default function SavedVehiclesView() {
  const {
    savedVehicles,
    setSavedVehicles,
    toggleSaveVehicle,
    clearSavedVehicles,
    vehicles,
    bikes,
    userProfile,
    bikeProfile,
    evaluateVehicle,
    toggleCompare,
    compareList,
    setActiveTab,
    currentUser,
    setIsAuthModalOpen,
    canShowCarScore,
    canShowBikeScore
  } = useApp();

  const allVehicles = useMemo(() => [...(vehicles || []), ...(bikes || [])], [vehicles, bikes]);
  const savedList = useMemo(() => allVehicles.filter(v => savedVehicles.includes(v.id || v._id)), [allVehicles, savedVehicles]);

  // Clean up any stale or orphan IDs that do not exist in the vehicle/bike catalog
  useEffect(() => {
    if (savedVehicles && savedVehicles.length > 0 && allVehicles.length > 0) {
      const validIds = savedVehicles.filter(id => allVehicles.some(v => (v.id || v._id) === id));
      if (validIds.length !== savedVehicles.length) {
        setSavedVehicles(validIds);
        localStorage.setItem('autodezire_saved', JSON.stringify(validIds));
      }
    }
  }, [savedVehicles, allVehicles, setSavedVehicles]);

  return (
    <div className="space-y-8 pb-16 max-w-[1400px] mx-auto animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
            Saved Vehicles
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
            Your shortlisted automobiles with real-time suitability tracking.
          </p>
        </div>

        <div className="flex items-center space-x-2 self-start sm:self-auto">
          <span className="px-3.5 py-1.5 rounded-full bg-rose-500/10 text-rose-500 text-xs font-bold">
            {savedList.length} Saved in Garage
          </span>
          {savedList.length > 0 && (
            <button
              onClick={clearSavedVehicles}
              className="px-3 py-1.5 rounded-full border border-gray-200 dark:border-gray-700 hover:border-rose-500 text-gray-500 hover:text-rose-500 text-xs font-semibold transition-all"
              title="Remove all saved vehicles"
            >
              Clear All
            </button>
          )}
        </div>
      </div>

      {savedList.length === 0 ? (
        <div className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-800 rounded-3xl p-12 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center mx-auto">
            <Heart className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            No Automobiles Saved Yet
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 max-w-md mx-auto">
            Browse recommendations or search vehicles and tap the heart icon to save them to your garage.
          </p>
          <button
            onClick={() => setActiveTab('search')}
            className="px-6 py-3 rounded-2xl bg-orange-500 text-white text-xs font-bold shadow-md hover:bg-orange-600 transition-colors"
          >
            Explore Automobiles
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedList.map(vehicle => {
            const isTwoWheeler = isTwoWheelerVehicle(vehicle);
            const canShowScore = isTwoWheeler ? canShowBikeScore : canShowCarScore;
            const evalResult = canShowScore
              ? (isTwoWheeler
                  ? evaluateBikeSuitability(vehicle, bikeProfile)
                  : evaluateSuitability(vehicle, userProfile))
              : null;
            const isCompared = compareList.some(v => (v.id || v._id) === (vehicle.id || vehicle._id));

            return (
              <div
                key={vehicle.id || vehicle._id}
                className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold text-white uppercase ${
                        isTwoWheeler ? 'bg-purple-600' : 'bg-orange-500'
                      }`}>
                        {vehicle.bodyType || vehicle.category}
                      </span>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-1.5">
                        {vehicle.brand} {vehicle.model}
                      </h3>
                    </div>

                    <button
                      onClick={() => toggleSaveVehicle(vehicle.id || vehicle._id)}
                      className="p-2 rounded-xl text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                      title="Remove from saved"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="w-full h-36 my-3 rounded-xl overflow-hidden flex items-center justify-center p-2 bg-gray-50 dark:bg-gray-800/40">
                    <VehicleImage
                      src={vehicle.image}
                      alt={vehicle.model}
                      category={vehicle.category}
                      className="w-full h-full"
                      imgClassName="max-h-full max-w-full object-contain"
                    />
                  </div>

                  <div className="flex items-baseline justify-between pt-1 gap-2">
                    <span className="text-base font-bold text-emerald-500 dark:text-emerald-400">
                      {vehicle.priceDisplay}
                    </span>
                    {canShowScore && evalResult ? (
                      <div className="flex items-center space-x-1 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                        <Star className="w-3 h-3 fill-current" />
                        <span>{evalResult.overallScore}/100</span>
                      </div>
                    ) : (
                      <button
                        onClick={() => (!currentUser ? setIsAuthModalOpen(true) : setActiveTab('profile'))}
                        className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors text-right"
                      >
                        {!currentUser ? 'Log in to see score' : 'Complete form for score'}
                      </button>
                    )}
                  </div>

                  <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-2">
                    {vehicle.engine} • {vehicle.mileage}
                  </p>
                </div>

                <div className="flex items-center space-x-2 mt-5">
                  <button
                    onClick={() => toggleCompare(vehicle)}
                    className={`p-2.5 rounded-xl border text-xs font-semibold transition-all ${
                      isCompared
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-blue-500'
                    }`}
                    title={isCompared ? 'In Compare' : 'Add to Compare'}
                  >
                    <BarChart2 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => evaluateVehicle(vehicle)}
                    className="flex-1 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold flex items-center justify-center space-x-1.5 transition-all"
                  >
                    <span>{canShowScore ? 'View Evaluation' : 'View Details'}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
