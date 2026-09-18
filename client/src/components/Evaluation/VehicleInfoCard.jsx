import React from 'react';
import {
  Cog,
  Zap,
  Activity,
  Gauge,
  SlidersHorizontal,
  Users,
  Fuel
} from 'lucide-react';
import VehicleImage from '../Common/VehicleImage';

export default function VehicleInfoCard({ vehicle }) {
  if (!vehicle) return null;

  const isTwoWheeler = vehicle.category === 'Motorcycle' || vehicle.category === 'Scooter' || vehicle.category === 'Electric Scooter';

  return (
    <div className="bg-[#111827] dark:bg-[#111827] border border-gray-800 rounded-2xl p-6 shadow-sm flex flex-col justify-between h-full relative transition-colors duration-200">
      {/* Top Header Row */}
      <div className="flex items-start justify-between mb-4">
        {/* Category Badge (Purple pill on left) */}
        <span className="px-3.5 py-1 rounded-xl text-xs font-black bg-purple-600 text-white tracking-wide uppercase shadow-sm">
          {vehicle.bodyType || vehicle.category}
        </span>

        {/* Title and Subtitle on Right */}
        <div className="text-right max-w-[70%]">
          <h2 className="text-2xl font-bold tracking-tight text-white">
            {vehicle.brand} {vehicle.model}
          </h2>
          <p className="text-xs text-gray-400 font-normal mt-1 leading-snug">
            {vehicle.variantSummary || `${vehicle.fuelType} | ${vehicle.transmission}`}
          </p>
        </div>
      </div>

      {/* Main Grid: Left Vehicle Image & Right Price + Specs */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center flex-1">
        {/* Left: Vehicle Image */}
        <div className="md:col-span-5 flex flex-col items-center justify-center">
          <div className="w-full h-40 rounded-xl overflow-hidden flex items-center justify-center p-1 bg-transparent">
            <VehicleImage
              src={vehicle.image}
              alt={`${vehicle.brand} ${vehicle.model}`}
              category={vehicle.category}
              className="w-full h-full"
              imgClassName="max-h-full max-w-full object-contain filter drop-shadow-xl hover:scale-105 transition-transform duration-300"
            />
          </div>
          <p className="text-[11px] text-gray-400 self-start mt-2">
            *Ex-showroom Price
          </p>
        </div>

        {/* Right: Price & Specs Grid */}
        <div className="md:col-span-7 space-y-3">
          {/* Price Header */}
          <div>
            <div className="text-2xl font-bold text-emerald-400 tracking-tight">
              {vehicle.priceDisplay || `₹ ${vehicle.priceFrom} - ${vehicle.priceTo} Lakh*`}
            </div>
            <p className="text-xs text-gray-400 font-normal mt-0.5">
              Ex-showroom Price
            </p>
          </div>

          {/* Specs Grid matching the screenshot */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-xs pt-1">
            {/* Engine */}
            <div className="flex items-center space-x-1.5 min-w-0">
              <Cog className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
              <span className="text-gray-400 flex-shrink-0">Engine:</span>
              <span className="text-white font-medium truncate" title={vehicle.engine}>
                {vehicle.engine}
              </span>
            </div>

            {/* Power */}
            <div className="flex items-center space-x-1.5 min-w-0">
              <Zap className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
              <span className="text-gray-400 flex-shrink-0">Power:</span>
              <span className="text-white font-medium truncate" title={vehicle.power}>
                {vehicle.power}
              </span>
            </div>

            {/* Torque */}
            <div className="flex items-center space-x-1.5 min-w-0">
              <Activity className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
              <span className="text-gray-400 flex-shrink-0">Torque:</span>
              <span className="text-white font-medium truncate" title={vehicle.torque}>
                {vehicle.torque}
              </span>
            </div>

            {/* Mileage */}
            <div className="flex items-center space-x-1.5 min-w-0">
              <Gauge className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
              <span className="text-gray-400 flex-shrink-0">Mileage:</span>
              <span className="text-white font-medium truncate" title={vehicle.mileage}>
                {vehicle.mileage}
              </span>
            </div>

            {/* Transmission */}
            <div className="flex items-center space-x-1.5 min-w-0">
              <SlidersHorizontal className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
              <span className="text-gray-400 flex-shrink-0">Transmission:</span>
              <span className="text-white font-medium truncate" title={vehicle.transmission}>
                {vehicle.transmission}
              </span>
            </div>

            {/* Seating / Seat Height */}
            <div className="flex items-center space-x-1.5 min-w-0">
              <Users className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
              <span className="text-gray-400 flex-shrink-0">
                {isTwoWheeler ? 'Seat Height:' : 'Seating:'}
              </span>
              <span className="text-white font-medium truncate">
                {isTwoWheeler ? `${vehicle.seatHeight || 790} mm` : `${vehicle.seatingCapacity || 5} Seater`}
              </span>
            </div>

            {/* Fuel (spans full width / row) */}
            <div className="flex items-center space-x-1.5 min-w-0 col-span-2">
              <Fuel className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
              <span className="text-gray-400 flex-shrink-0">Fuel:</span>
              <span className="text-white font-medium truncate" title={vehicle.fuelType}>
                {vehicle.fuelType}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
