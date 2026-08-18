import React, { useState, useEffect } from 'react';
import { X, Save, ShieldCheck, Upload, AlertCircle } from 'lucide-react';

export default function AdminVehicleModal({ isOpen, onClose, onSave, vehicle = null }) {
  const isEditing = Boolean(vehicle && (vehicle.id || vehicle._id));

  const [form, setForm] = useState({
    brand: '',
    model: '',
    category: 'Car',
    bodyType: 'SUV',
    variantSummary: 'Base to Top',
    priceFrom: 10.0,
    priceTo: 16.0,
    priceDisplay: '₹ 10.00 - 16.00 Lakh*',
    fuelType: 'Petrol',
    transmission: 'Manual / Automatic',
    engine: '1.5L Standard Engine',
    power: '115 bhp',
    torque: '160 Nm',
    mileage: '18.0 kmpl',
    groundClearance: 190,
    seatingCapacity: 5,
    bootSpace: 380,
    seatHeight: 0,
    kerbWeight: 1250,
    length: 3995,
    width: 1800,
    height: 1620,
    wheelbase: 2500,
    batteryCapacity: '',
    safetyRating: 5,
    safetyAgency: 'Global NCAP Rating',
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80',
    description: '',
    isActive: true,
  });

  useEffect(() => {
    if (vehicle) {
      setForm({ ...vehicle });
    }
  }, [vehicle]);

  if (!isOpen) return null;

  const handleChange = (field, val) => {
    setForm(prev => {
      const next = { ...prev, [field]: val };
      if (field === 'priceFrom' || field === 'priceTo') {
        next.priceDisplay = `₹ ${next.priceFrom} - ${next.priceTo} Lakh*`;
      }
      return next;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn overflow-y-auto">
      <div className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-800 rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 relative">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-800 mb-6">
          <div>
            <h2 className="text-xl font-black text-gray-900 dark:text-white">
              {isEditing ? `Edit ${form.brand} ${form.model}` : 'Add New Automobile to Database'}
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              Category-tailored parameters for suitability scoring.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Identity */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                Brand *
              </label>
              <input
                type="text"
                required
                value={form.brand}
                onChange={(e) => handleChange('brand', e.target.value)}
                placeholder="e.g. Tata, Mahindra, Hyundai"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs font-medium text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                Model *
              </label>
              <input
                type="text"
                required
                value={form.model}
                onChange={(e) => handleChange('model', e.target.value)}
                placeholder="e.g. Nexon, Thar, Creta"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs font-medium text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                Category *
              </label>
              <select
                value={form.category}
                onChange={(e) => handleChange('category', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs font-medium text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500"
              >
                <option value="Car">Car</option>
                <option value="Motorcycle">Motorcycle</option>
                <option value="Scooter">Scooter</option>
              </select>
            </div>
          </div>

          {/* Body Type & Price Range */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                Body Type / Style
              </label>
              <input
                type="text"
                value={form.bodyType}
                onChange={(e) => handleChange('bodyType', e.target.value)}
                placeholder="SUV, Sedan, Cruiser, Scooter"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs font-medium text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                Price From (Lakhs) *
              </label>
              <input
                type="number"
                step="0.01"
                required
                value={form.priceFrom}
                onChange={(e) => handleChange('priceFrom', Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs font-medium text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                Price To (Lakhs) *
              </label>
              <input
                type="number"
                step="0.01"
                required
                value={form.priceTo}
                onChange={(e) => handleChange('priceTo', Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs font-medium text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

          {/* Engine & Transmission */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                Engine / Motor Spec
              </label>
              <input
                type="text"
                value={form.engine}
                onChange={(e) => handleChange('engine', e.target.value)}
                placeholder="e.g. 1.2L Turbo Petrol"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs font-medium text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                Power & Torque
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  value={form.power}
                  onChange={(e) => handleChange('power', e.target.value)}
                  placeholder="118 bhp"
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs font-medium text-gray-900 dark:text-white"
                />
                <input
                  type="text"
                  value={form.torque}
                  onChange={(e) => handleChange('torque', e.target.value)}
                  placeholder="170 Nm"
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs font-medium text-gray-900 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                Mileage / Range Display
              </label>
              <input
                type="text"
                value={form.mileage}
                onChange={(e) => handleChange('mileage', e.target.value)}
                placeholder="17.0 kmpl or 150 km/charge"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs font-medium text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

          {/* Practicality & Dimensions */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                Ground Clearance (mm)
              </label>
              <input
                type="number"
                value={form.groundClearance}
                onChange={(e) => handleChange('groundClearance', Number(e.target.value))}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs font-medium text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                Boot / Storage (Litres)
              </label>
              <input
                type="number"
                value={form.bootSpace}
                onChange={(e) => handleChange('bootSpace', Number(e.target.value))}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs font-medium text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                Seating Capacity
              </label>
              <input
                type="number"
                value={form.seatingCapacity}
                onChange={(e) => handleChange('seatingCapacity', Number(e.target.value))}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs font-medium text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                Safety Rating (Stars 1-5)
              </label>
              <select
                value={form.safetyRating}
                onChange={(e) => handleChange('safetyRating', Number(e.target.value))}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs font-medium text-gray-900 dark:text-white"
              >
                <option value={5}>5 Star (Global / Bharat NCAP)</option>
                <option value={4}>4 Star</option>
                <option value={3}>3 Star</option>
                <option value={2}>2 Star</option>
                <option value={1}>1 Star</option>
              </select>
            </div>
          </div>

          {/* Image URL & Description */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                Image URL (Direct link)
              </label>
              <input
                type="url"
                value={form.image}
                onChange={(e) => handleChange('image', e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs font-medium text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                Vehicle Description
              </label>
              <textarea
                rows={2}
                value={form.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="Brief model summary and core audience positioning..."
                className="w-full px-3.5 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs font-medium text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

          {/* Footer Controls */}
          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-100 dark:border-gray-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold shadow-md transition-all"
            >
              <Save className="w-4 h-4" />
              <span>{isEditing ? 'Update Automobile' : 'Add Automobile'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
