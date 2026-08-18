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
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { evaluateSuitability } from '../../services/clientSuitabilityEngine';

export default function SearchVehicleView() {
  const { vehicles, userProfile, evaluateVehicle } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [fuelFilter, setFuelFilter] = useState('All');

  // Filter vehicles
  const results = vehicles.filter(v => {
    const term = searchTerm.toLowerCase().trim();
    const matchesSearch =
      !term ||
      v.brand.toLowerCase().includes(term) ||
      v.model.toLowerCase().includes(term) ||
      `${v.brand} ${v.model}`.toLowerCase().includes(term) ||
      (v.bodyType && v.bodyType.toLowerCase().includes(term));

    const matchesCategory = categoryFilter === 'All' || v.category === categoryFilter;
    const matchesFuel = fuelFilter === 'All' || v.fuelType.includes(fuelFilter);

    return matchesSearch && matchesCategory && matchesFuel;
  });

  return (
    <div className="space-y-8 pb-16 max-w-[1400px] mx-auto animate-fadeIn">
      {/* Search Header */}
      <div className="space-y-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
            Search Any Automobile
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
            Search for a vehicle (e.g. <em>Mahindra Thar, Nexon, Creta</em>) to see: <strong className="text-orange-500 font-bold">“How suitable is this vehicle for ME?”</strong>
          </p>
        </div>

        {/* Large Search Input & Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          <div className="sm:col-span-6 relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by brand or model (e.g. Thar, Nexon, City, MT-15, Activa)..."
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#111827] text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-sm"
            />
          </div>

          <div className="sm:col-span-3">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-4 py-3.5 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#111827] text-sm font-semibold text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-sm"
            >
              <option value="All">All Categories</option>
              <option value="Car">Cars</option>
              <option value="Motorcycle">Motorcycles</option>
              <option value="Scooter">Scooters</option>
            </select>
          </div>

          <div className="sm:col-span-3">
            <select
              value={fuelFilter}
              onChange={(e) => setFuelFilter(e.target.value)}
              className="w-full px-4 py-3.5 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#111827] text-sm font-semibold text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-sm"
            >
              <option value="All">All Powertrains</option>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="Electric">Electric (EV)</option>
              <option value="Hybrid">Hybrid</option>
              <option value="CNG">CNG</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
        <span>Showing <strong>{results.length}</strong> automobiles in database</span>
        <span>Suitability calculated against <strong>{userProfile.name}'s profile</strong></span>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map((vehicle) => {
          const evalResult = evaluateSuitability(vehicle, userProfile);

          return (
            <div
              key={vehicle.id || vehicle._id}
              className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-800 rounded-3xl p-5 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Header Badge & Brand Model */}
                <div className="flex items-start justify-between">
                  <div>
                    <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-bold bg-purple-600/90 text-white uppercase tracking-wider">
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
                  <img
                    src={vehicle.image}
                    alt={vehicle.model}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
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
                    <strong className="text-emerald-500">Fit for you:</strong> {evalResult.topStrengths[0]}
                  </p>
                </div>
              </div>

              {/* Evaluate Button */}
              <button
                onClick={() => evaluateVehicle(vehicle)}
                className="w-full mt-5 flex items-center justify-center space-x-2 py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:opacity-95 text-white text-xs font-bold shadow-md shadow-orange-500/20 transition-all"
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
