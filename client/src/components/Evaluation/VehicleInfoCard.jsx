import React from 'react';
import {
  Zap,
  Gauge,
  Activity,
  Users,
  Fuel,
  Sliders,
  Sparkles,
  Cog
} from 'lucide-react';

export default function VehicleInfoCard({ vehicle }) {
  if (!vehicle) return null;

  return (
    <div className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-800/90 rounded-2xl p-6 shadow-sm relative transition-colors duration-200">
      {/* Top Header Row */}
      <div className="flex items-start justify-between mb-4">
        {/* Category Badge */}
        <span className="px-3.5 py-1 rounded-lg text-xs font-bold bg-purple-600/90 text-white tracking-wide uppercase shadow-sm">
          {vehicle.bodyType || vehicle.category}
        </span>

        {/* Title and Variant */}
        <div className="text-right">
          <h2 className="text-2xl font-black tracking-tight text-gray-900 dark:text-white">
            {vehicle.brand} {vehicle.model}
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
            {vehicle.variantSummary || `${vehicle.fuelType} | ${vehicle.transmission}`}
          </p>
        </div>
      </div>

      {/* Main Grid: Left Vehicle Image & Right Price + Specs */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Left: Vehicle Image */}
        <div className="md:col-span-5 flex flex-col items-center justify-center">
          <div className="w-full h-44 rounded-xl overflow-hidden flex items-center justify-center p-2 bg-gradient-to-b from-transparent to-gray-50 dark:to-gray-800/30">
            <img
              src={vehicle.image}
              alt={`${vehicle.brand} ${vehicle.model}`}
              className="max-h-full max-w-full object-contain filter drop-shadow-xl hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80';
              }}
            />
          </div>
          <p className="text-[11px] text-gray-400 dark:text-gray-500 self-start mt-1">
            *Ex-showroom Price
          </p>
        </div>

        {/* Right: Price & Specs */}
        <div className="md:col-span-7 space-y-4">
          {/* Price Header */}
          <div>
            <div className="text-2xl font-black text-emerald-500 dark:text-emerald-400 tracking-tight">
              {vehicle.priceDisplay || `₹ ${vehicle.priceFrom} - ${vehicle.priceTo} Lakh*`}
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
              Ex-showroom Price
            </p>
          </div>

          {/* Specs 2-Column Grid */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-xs">
            {/* Engine */}
            <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
              <Cog className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <span className="text-gray-500 dark:text-gray-400">Engine:</span>
              <span className="font-semibold text-gray-900 dark:text-gray-100 truncate">
                {vehicle.engine}
              </span>
            </div>

            {/* Power */}
            <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
              <Zap className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <span className="text-gray-500 dark:text-gray-400">Power:</span>
              <span className="font-semibold text-gray-900 dark:text-gray-100 truncate">
                {vehicle.power}
              </span>
            </div>

            {/* Torque */}
            <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
              <Activity className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <span className="text-gray-500 dark:text-gray-400">Torque:</span>
              <span className="font-semibold text-gray-900 dark:text-gray-100 truncate">
                {vehicle.torque}
              </span>
            </div>

            {/* Mileage */}
            <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
              <Gauge className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <span className="text-gray-500 dark:text-gray-400">Mileage:</span>
              <span className="font-semibold text-gray-900 dark:text-gray-100 truncate">
                {vehicle.mileage}
              </span>
            </div>

            {/* Transmission */}
            <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
              <Sliders className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <span className="text-gray-500 dark:text-gray-400">Transmission:</span>
              <span className="font-semibold text-gray-900 dark:text-gray-100 truncate">
                {vehicle.transmission}
              </span>
            </div>

            {/* Seating */}
            <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
              <Users className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <span className="text-gray-500 dark:text-gray-400">Seating:</span>
              <span className="font-semibold text-gray-900 dark:text-gray-100 truncate">
                {vehicle.seatingCapacity} Seater
              </span>
            </div>

            {/* Fuel */}
            <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 col-span-2">
              <Fuel className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <span className="text-gray-500 dark:text-gray-400">Fuel:</span>
              <span className="font-semibold text-gray-900 dark:text-gray-100">
                {vehicle.fuelType}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
