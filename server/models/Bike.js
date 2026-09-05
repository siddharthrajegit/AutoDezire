const mongoose = require('mongoose');

const bikeSchema = new mongoose.Schema(
  {
    brand: { type: String, required: true, trim: true },
    model: { type: String, required: true, trim: true },
    category: {
      type: String,
      required: true,
      enum: ['Motorcycle', 'Scooter', 'Electric Scooter'],
    },
    bodyType: { type: String, required: true, trim: true }, // Cruiser, Streetfighter, Commuter, Family Scooter, Roadster, Sport
    variantSummary: { type: String, default: 'Standard' },
    
    // Price in Lakhs (INR) (e.g. 0.76 to 2.30 Lakh)
    priceFrom: { type: Number, required: true },
    priceTo: { type: Number, required: true },
    priceDisplay: { type: String, required: true }, // e.g. "₹1.93 - 2.30 Lakh*" or "₹76,000*"
    
    // Fuel & Transmission
    fuelType: { type: String, required: true }, // Petrol / Electric
    transmission: { type: String, required: true }, // 5-Speed Manual / 6-Speed Manual / CVT Automatic / Belt Drive
    
    // Powertrain Specs
    engine: { type: String, required: true }, // e.g. "349cc Air-Oil Cooled J-Series" or "6.4 kW PMSM Motor"
    engineCC: { type: Number, default: 125 }, // 0 for pure EV
    power: { type: String, required: true }, // e.g. "20.2 bhp"
    torque: { type: String, required: true }, // e.g. "27 Nm"
    mileage: { type: String, required: true }, // e.g. "37.0 kmpl" or "150 km/charge"
    mileageValue: { type: Number, default: 45 }, // numerical for calculations
    driveType: { type: String, default: 'Chain' }, // 'Chain' | 'Belt'
    
    // 2-Wheeler Physical & Ergonomic Dimensions
    seatHeight: { type: Number, required: true }, // in mm (e.g. 765, 805, 810)
    seatWidth: { type: String, default: 'Medium' }, // 'Narrow' | 'Medium' | 'Wide Sprung'
    kerbWeight: { type: Number, required: true }, // in kg (e.g. 106, 141, 195)
    groundClearance: { type: Number, required: true }, // in mm (e.g. 165, 175)
    length: { type: Number, default: 2000 },
    width: { type: Number, default: 750 },
    height: { type: Number, default: 1100 },
    wheelbase: { type: Number, default: 1300 },
    
    // Ergonomic Posture & Triangle
    riderTriangle: { type: String, default: 'Upright Commuter' }, // 'Upright Commuter' | 'Relaxed Cruiser' | 'Sporty Forward' | 'Aggressive Track'
    seatToFootpegHeight: { type: Number, default: 410 }, // in mm
    handlebarReach: { type: Number, default: 580 }, // in mm
    
    // Rider Height, Inseam & Weight Suitability Matching
    idealHeightMin: { type: Number, default: 155 }, // in cm
    idealHeightMax: { type: Number, default: 190 }, // in cm
    idealInseamMin: { type: Number, default: 72 }, // in cm (minimum leg reach for flat-footing)
    idealInseamMax: { type: Number, default: 95 }, // in cm
    idealRiderWeightMin: { type: Number, default: 50 }, // in kg
    idealRiderWeightMax: { type: Number, default: 110 }, // in kg
    
    // Practicality & Passenger
    pillionSeatComfort: { type: Number, default: 7 }, // 1-10 rating for pillion cushion & space
    underseatStorageLitres: { type: Number, default: 0 }, // in Litres (e.g. 0 for bikes, 18-34L for scooters)
    brakeSetup: { type: String, default: 'Disc/Drum' }, // 'Dual-Channel ABS' | 'Single-Channel ABS' | 'Combi-Braking System (CBS)' | 'Disc/Drum'
    beginnerFriendly: { type: Boolean, default: true },
    
    // Electric 2-Wheeler specific
    batteryCapacity: { type: String, default: '' },
    chargingRequired: { type: Boolean, default: false },
    homeChargingTime: { type: String, default: '' },
    fastChargingSupport: { type: Boolean, default: false },
    evRangeReal: { type: Number, default: 0 },
    
    // Safety & Certification
    safetyRating: { type: Number, default: 4 },
    safetyAgency: { type: String, default: 'Braking & Chassis Spec' },
    
    // Media & Presentation
    image: { type: String, required: true },
    secondaryImages: [{ type: String }],
    description: { type: String, default: '' },
    
    // Baseline Bike Suitability Scores (1-10)
    baseScores: {
      mileageRunningCost: { type: Number, default: 8 },
      ergonomicFlatFoot: { type: Number, default: 8 },
      riderWeightHandling: { type: Number, default: 8 },
      cityTrafficAgility: { type: Number, default: 8 },
      pillionComfort: { type: Number, default: 7 },
      underseatStorage: { type: Number, default: 5 },
      highwayTouringPoise: { type: Number, default: 7 },
      brakingSafety: { type: Number, default: 8 },
      maintenanceCost: { type: Number, default: 8 },
      performanceAcceleration: { type: Number, default: 7 },
    },
    
    highlightBadges: [{ type: String }],
    inherentStrengths: [{ type: String }],
    inherentConsiderations: [{ type: String }],
    
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Bike', bikeSchema);
