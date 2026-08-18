const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema(
  {
    brand: { type: String, required: true, trim: true },
    model: { type: String, required: true, trim: true },
    category: {
      type: String,
      required: true,
      enum: ['Car', 'Motorcycle', 'Scooter'],
    },
    bodyType: { type: String, required: true, trim: true }, // SUV, Sedan, Hatchback, Cruiser, Commuter, Electric Scooter, etc.
    variantSummary: { type: String, default: 'Base to Top' },
    
    // Price in Lakhs (INR)
    priceFrom: { type: Number, required: true },
    priceTo: { type: Number, required: true },
    priceDisplay: { type: String, required: true }, // e.g. "₹8.69 - 16.78 Lakh*"
    
    // Fuel & Transmission
    fuelType: { type: String, required: true }, // Petrol / Diesel / CNG / Electric / Hybrid
    transmission: { type: String, required: true }, // Manual / Automatic / CVT / DCT / Automatic (EV)
    
    // Powertrain Specs
    engine: { type: String, required: true }, // e.g. "1.2L Turbo Petrol" or "6.0 kW Permanent Magnet Motor"
    power: { type: String, required: true }, // e.g. "118.27 bhp"
    torque: { type: String, required: true }, // e.g. "170 Nm"
    mileage: { type: String, required: true }, // e.g. "17.0 kmpl" or "150 km/charge"
    mileageValue: { type: Number, default: 15 }, // numerical for calculations
    
    // Dimensions & Practicality
    groundClearance: { type: Number, required: true }, // in mm (e.g. 208)
    seatingCapacity: { type: Number, default: 5 },
    bootSpace: { type: Number, default: 350 }, // in Litres (or underseat storage)
    seatHeight: { type: Number, default: 0 }, // in mm (for bikes/scooters)
    kerbWeight: { type: Number, default: 1200 }, // in kg
    length: { type: Number, default: 3995 }, // in mm
    width: { type: Number, default: 1804 },
    height: { type: Number, default: 1620 },
    wheelbase: { type: Number, default: 2498 },
    
    // EV specific
    batteryCapacity: { type: String, default: '' }, // e.g. "3.7 kWh" or "40.5 kWh"
    
    // Safety & Quality
    safetyRating: { type: Number, default: 4 }, // Global NCAP / Bharat NCAP stars (1-5)
    safetyAgency: { type: String, default: 'Global NCAP Rating' },
    
    // Media & Presentation
    image: { type: String, required: true },
    secondaryImages: [{ type: String }],
    description: { type: String, default: '' },
    
    // Base Suitability Characteristics (baseline 1-10 scores before user tailoring)
    baseScores: {
      safety: { type: Number, default: 8 },
      groundClearance: { type: Number, default: 8 },
      comfort: { type: Number, default: 7 },
      spacePracticality: { type: Number, default: 8 },
      mileageRunningCost: { type: Number, default: 7 },
      maintenanceCost: { type: Number, default: 7 },
      performance: { type: Number, default: 7 },
      resaleValue: { type: Number, default: 8 },
      highwayStability: { type: Number, default: 8 },
      cityDriveSuitability: { type: Number, default: 8 },
    },
    
    // Strengths and Characteristics
    highlightBadges: [{ type: String }],
    inherentStrengths: [{ type: String }],
    inherentConsiderations: [{ type: String }],
    
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Vehicle', vehicleSchema);
