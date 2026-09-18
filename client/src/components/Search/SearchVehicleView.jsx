import React, { useState } from 'react';
import {
  Search,
  SlidersHorizontal,
  Star,
  ChevronRight,
  Filter,
  Car,
  Bike,
  Zap,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { evaluateSuitability } from '../../services/clientSuitabilityEngine';
import { evaluateBikeSuitability } from '../../services/bikeSuitabilityEngine';
import VehicleImage from '../Common/VehicleImage';

export default function SearchVehicleView() {
  const {
    vehicles,
    bikes,
    userProfile,
    bikeProfile,
    selectedVehicleType,
    setSelectedVehicleType,
    evaluateVehicle
  } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [brandFilter, setBrandFilter] = useState('All');
  const [fuelFilter, setFuelFilter] = useState('All');

  const isTwoWheeler = selectedVehicleType === '2-wheeler';
  
  // Guarantee strict separation: 4-Wheelers only has Cars, 2-Wheelers only has Motorcycles & Scooters
  const carVehicles = vehicles.filter(
    (v) =>
      v.category === 'Car' ||
      (v.category !== 'Motorcycle' &&
        v.category !== 'Scooter' &&
        v.category !== 'Electric Scooter')
  );

  const activeDataset = isTwoWheeler ? bikes : carVehicles;
  const activeProfile = isTwoWheeler ? bikeProfile : userProfile;

  // Extract unique brands dynamically from active dataset
  const availableBrands = Array.from(
    new Set(activeDataset.map((v) => v.brand))
  ).filter(Boolean).sort();

  const handleModeSwitch = (mode) => {
    setSelectedVehicleType(mode);
    setBrandFilter('All');
    setFuelFilter('All');
  };

  // Filter vehicles
  const results = activeDataset.filter((v) => {
    const term = searchTerm.toLowerCase().trim();
    const matchesSearch =
      !term ||
      v.brand?.toLowerCase().includes(term) ||
      v.model?.toLowerCase().includes(term) ||
      `${v.brand} ${v.model}`.toLowerCase().includes(term) ||
      (v.bodyType && v.bodyType.toLowerCase().includes(term)) ||
      (v.fuelType && v.fuelType.toLowerCase().includes(term)) ||
      (v.category && v.category.toLowerCase().includes(term));

    const matchesBrand = brandFilter === 'All' || v.brand === brandFilter;

    let matchesFuel = true;
    if (fuelFilter !== 'All') {
      const fuelLower = fuelFilter.toLowerCase();
      matchesFuel =
        (v.fuelType && v.fuelType.toLowerCase().includes(fuelLower)) ||
        (v.availableFuelTypes &&
          v.availableFuelTypes.some((f) => f.toLowerCase().includes(fuelLower))) ||
        (v.category && v.category.toLowerCase().includes(fuelLower)) ||
        (v.bodyType && v.bodyType.toLowerCase().includes(fuelLower));
    }

    return matchesSearch && matchesBrand && matchesFuel;
  });

  return (
    <div className="space-y-8 pb-16 max-w-[1400px] mx-auto animate-fadeIn">
      {/* Search Header & Mode Selector */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
              Search {isTwoWheeler ? '2-Wheelers (Bikes & Scooters)' : '4-Wheelers (Cars)'}
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
              {isTwoWheeler ? (
                <>
                  Browse across India's top 2-wheeler brands (<em>Royal Enfield, Yamaha, Bajaj, Hero, Honda, TVS, Suzuki, Ather, Ola</em>) to find your perfect fit.
                </>
              ) : (
                <>
                  Browse across India's top 8 car brands (<em>Maruti Suzuki, Mahindra, Tata, Hyundai, Toyota, Honda, Kia, MG</em>) to see: <strong className="text-orange-500 font-bold">“How suitable is this car for ME?”</strong>
                </>
              )}
            </p>
          </div>

          {/* 4-Wheeler vs 2-Wheeler Mode Switcher Tabs */}
          <div className="flex items-center p-1.5 bg-gray-100 dark:bg-gray-800/90 rounded-2xl border border-gray-200 dark:border-gray-700/80 self-start sm:self-auto shadow-sm">
            <button
              onClick={() => handleModeSwitch('4-wheeler')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                !isTwoWheeler
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/20'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <Car className="w-4 h-4" />
              <span>4-Wheelers (Cars)</span>
            </button>

            <button
              onClick={() => handleModeSwitch('2-wheeler')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                isTwoWheeler
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md shadow-purple-600/20'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <Bike className="w-4 h-4" />
              <span>2-Wheelers (Bikes & Scooters)</span>
            </button>
          </div>
        </div>

        {/* Search Input & Brand/Powertrain Dropdowns */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          <div className="sm:col-span-6 relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={
                isTwoWheeler
                  ? 'Search by model (e.g. Classic 350, MT-15, Hunter, Activa, Jupiter, Ather 450X)...'
                  : 'Search by model or feature (e.g. Nexon, Thar, Creta, Fortuner, XUV700, Swift)...'
              }
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#111827] text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-sm"
            />
          </div>

          {/* Brand Filter Dropdown (8 Car Brands for 4W, 9 Bike Brands for 2W) */}
          <div className="sm:col-span-3">
            <select
              value={brandFilter}
              onChange={(e) => setBrandFilter(e.target.value)}
              className="w-full px-4 py-3.5 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#111827] text-sm font-semibold text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-sm cursor-pointer"
            >
              <option value="All">
                {isTwoWheeler
                  ? `All 2-Wheeler Brands (${availableBrands.length} Brands, ${activeDataset.length} Models)`
                  : `All Car Brands (${availableBrands.length} Brands, ${activeDataset.length} Cars)`}
              </option>
              {availableBrands.map((brand) => {
                const count = activeDataset.filter((v) => v.brand === brand).length;
                return (
                  <option key={brand} value={brand}>
                    {brand} ({count} {isTwoWheeler ? 'models' : 'cars'})
                  </option>
                );
              })}
            </select>
          </div>

          {/* Powertrain / Category Filter Dropdown */}
          <div className="sm:col-span-3">
            <select
              value={fuelFilter}
              onChange={(e) => setFuelFilter(e.target.value)}
              className="w-full px-4 py-3.5 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#111827] text-sm font-semibold text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-sm cursor-pointer"
            >
              {isTwoWheeler ? (
                <>
                  <option value="All">All 2-Wheeler Types</option>
                  <option value="Petrol">Petrol (Engine)</option>
                  <option value="Electric">Electric (EV Battery)</option>
                  <option value="Motorcycle">Motorcycles only</option>
                  <option value="Scooter">Scooters only</option>
                </>
              ) : (
                <>
                  <option value="All">All Powertrains</option>
                  <option value="Petrol">Petrol</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Electric">Electric (EV)</option>
                  <option value="CNG">CNG</option>
                  <option value="Hybrid">Strong Hybrid</option>
                </>
              )}
            </select>
          </div>
        </div>

        {/* Quick Brand Switcher Pills (Car Brands in 4W, Bike Brands in 2W) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
          <button
            onClick={() => setBrandFilter('All')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              brandFilter === 'All'
                ? isTwoWheeler
                  ? 'bg-purple-600 text-white shadow-sm shadow-purple-600/20'
                  : 'bg-orange-500 text-white shadow-sm shadow-orange-500/20'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            All Brands ({availableBrands.length})
          </button>
          {availableBrands.map((brand) => (
            <button
              key={brand}
              onClick={() => setBrandFilter(brand)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                brandFilter === brand
                  ? isTwoWheeler
                    ? 'bg-purple-600 text-white shadow-sm shadow-purple-600/20'
                    : 'bg-orange-500 text-white shadow-sm shadow-orange-500/20'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {brand}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count & Match Indicator */}
      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
        <span>
          Showing <strong>{results.length}</strong> {isTwoWheeler ? 'two-wheelers' : 'cars'}{' '}
          {brandFilter !== 'All' && `for ${brandFilter}`}
        </span>
        <span>
          Suitability evaluated against <strong>{activeProfile?.name || 'Your'}'s {isTwoWheeler ? 'Bike Profile' : 'Car Profile'}</strong>
        </span>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map((vehicle) => {
          const evalResult = isTwoWheeler
            ? evaluateBikeSuitability(vehicle, bikeProfile)
            : evaluateSuitability(vehicle, userProfile);

          return (
            <div
              key={vehicle.id || vehicle._id}
              className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-800 rounded-3xl p-5 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Header Badge & Brand Model */}
                <div className="flex items-start justify-between">
                  <div>
                    <span className={`px-2.5 py-0.5 rounded-lg text-[10px] font-bold text-white uppercase tracking-wider ${
                      isTwoWheeler ? 'bg-purple-600' : 'bg-purple-600/90'
                    }`}>
                      {vehicle.bodyType || vehicle.category}
                    </span>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-1.5 leading-snug">
                      {vehicle.brand} {vehicle.model}
                    </h3>
                  </div>

                  {/* Personalized Suitability Badge */}
                  <div className="text-right">
                    <div className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-extrabold text-sm">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>{evalResult.overallScore}/100</span>
                    </div>
                    <p className="text-[10px] text-gray-400 mt-0.5 font-medium">
                      {evalResult.overallStatus}
                    </p>
                  </div>
                </div>

                {/* Vehicle Image */}
                <div className="w-full h-40 my-3 rounded-2xl overflow-hidden flex items-center justify-center p-2 bg-gray-50 dark:bg-gray-800/40">
                  <VehicleImage
                    src={vehicle.image}
                    alt={vehicle.model}
                    category={vehicle.category}
                    className="w-full h-full"
                    imgClassName="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Price and Specs */}
                <div className="space-y-1">
                  <div className="text-base font-black text-emerald-500 dark:text-emerald-400">
                    {vehicle.priceDisplay}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {vehicle.engine} • {vehicle.mileage}
                  </div>
                </div>

                {/* Strengths Snippet */}
                <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-800 text-[11px] text-gray-600 dark:text-gray-300">
                  <p className="line-clamp-2">
                    <strong className="text-emerald-500">Fit for you:</strong>{' '}
                    {evalResult.topStrengths?.[0] || evalResult.inherentStrengths?.[0] || 'Well matched for your profile'}
                  </p>
                </div>
              </div>

              {/* Evaluate Button */}
              <button
                onClick={() => evaluateVehicle(vehicle)}
                className={`w-full mt-5 flex items-center justify-center space-x-2 py-3 rounded-2xl text-white text-xs font-bold shadow-md transition-all ${
                  isTwoWheeler
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-95 shadow-purple-600/20'
                    : 'bg-gradient-to-r from-orange-500 to-amber-500 hover:opacity-95 shadow-orange-500/20'
                }`}
              >
                <span>Evaluate Suitability for ME</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
