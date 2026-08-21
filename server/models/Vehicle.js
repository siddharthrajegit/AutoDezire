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
    engineCC: { type: Number, default: 1200 }, // Displacement in cc (0 for pure EV)
    power: { type: String, required: true }, // e.g. "118.27 bhp"
    torque: { type: String, required: true }, // e.g. "170 Nm"
    mileage: { type: String, required: true }, // e.g. "17.0 kmpl" or "150 km/charge"
    mileageValue: { type: Number, default: 15 }, // numerical for calculations
    driveType: { type: String, default: 'FWD' }, // 'FWD' | 'RWD' | 'AWD' | '4WD' | 'Chain' | 'Belt'
    
    // Dimensions, Space & Ergonomics
    groundClearance: { type: Number, required: true }, // in mm (e.g. 208)
    seatingCapacity: { type: Number, default: 5 },
    bootSpace: { type: Number, default: 350 }, // in Litres (or underseat storage)
    seatHeight: { type: Number, default: 0 }, // in mm (for bikes/scooters)
    kerbWeight: { type: Number, default: 1200 }, // in kg
    length: { type: Number, default: 3995 }, // in mm
    width: { type: Number, default: 1804 },
    height: { type: Number, default: 1620 },
    wheelbase: { type: Number, default: 2498 },
    turningRadius: { type: Number, default: 5.2 }, // in meters
    cabinHeadroom: { type: Number, default: 980 }, // in mm
    driverSeatHeightRange: {
      min: { type: Number, default: 550 },
      max: { type: Number, default: 620 },
    },
    roofHeight: { type: Number, default: 1620 }, // in mm
    steeringType: { type: String, default: 'EPS' }, // 'EPS' | 'Hydraulic' | 'Manual'
    easeOfDriving: { type: String, default: 'Easy' }, // 'Very Easy' | 'Easy' | 'Moderate' | 'Demanding'
    parkingDifficulty: { type: String, default: 'Easy' }, // 'Very Easy' | 'Easy' | 'Moderate' | 'Difficult'
    
    // Driver / Rider Height Ergonomics
    idealHeightMin: { type: Number, default: 155 }, // in cm
    idealHeightMax: { type: Number, default: 190 }, // in cm
    
    // 2-Wheeler Specific Ergonomics
    bikeType: { type: String, default: '' }, // 'Cruiser' | 'Streetfighter' | 'Commuter' | 'Scooter'
    riderTriangle: { type: String, default: 'Upright' }, // 'Upright' | 'Sporty Forward' | 'Aggressive'
    seatToFootpegHeight: { type: Number, default: 420 }, // in mm
    handlebarReach: { type: Number, default: 620 }, // in mm
    beginnerFriendly: { type: Boolean, default: true },
    
    // EV specific & Charging Infrastructure
    batteryCapacity: { type: String, default: '' }, // e.g. "3.7 kWh" or "40.5 kWh"
    chargingRequired: { type: Boolean, default: false },
    homeChargingTime: { type: String, default: '' }, // e.g. "8 hrs (15A socket)"
    fastChargingSupport: { type: Boolean, default: false },
    evRangeReal: { type: Number, default: 0 }, // in km
    
    // Safety & Quality
    safetyRating: { type: Number, default: 4 }, // Global NCAP / Bharat NCAP stars (1-5)
    safetyAgency: { type: String, default: 'Global NCAP Rating' },
    
    // Media & Presentation
    image: { type: String, required: true },
    secondaryImages: [{ type: String }],
    description: { type: String, default: '' },
    
    // Base Suitability Characteristics (baseline 1-10 scores across 12 dimensions)
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
      ergonomicFit: { type: Number, default: 8 },
      handleability: { type: Number, default: 8 },
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
