const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    
    // User Profile Data
    profile: {
      height: { type: Number, default: 172 }, // in cm
      age: { type: Number, default: 28 },
      categoryPreference: { type: String, default: 'All' }, // All, Car, Motorcycle, Scooter
      
      // Experience
      yearsExperience: { type: Number, default: 5 },
      totalKm: { type: Number, default: 35000 },
      previousVehicles: { type: String, default: 'Hatchback' },
      cityExperience: { type: Number, default: 8 }, // 1-10
      highwayExperience: { type: Number, default: 7 },
      ruralExperience: { type: Number, default: 5 },
      hillsExperience: { type: Number, default: 5 },
      roughRoadExperience: { type: Number, default: 6 },
      
      // Usage
      dailyKm: { type: Number, default: 35 },
      monthlyKm: { type: Number, default: 1100 },
      cityPercent: { type: Number, default: 60 },
      highwayPercent: { type: Number, default: 30 },
      ruralPercent: { type: Number, default: 10 },
      journeyDurationMinutes: { type: Number, default: 45 },
      longDistanceFrequency: { type: String, default: 'Monthly' }, // Weekly, Monthly, Occasionally, Rarely
      roadConditions: { type: String, default: 'Mixed with Potholes' }, // Smooth, Mixed, Bad
      
      // Passenger / Practicality
      regularPassengers: { type: Number, default: 2 },
      maxPassengers: { type: Number, default: 5 },
      hasChildren: { type: Boolean, default: false },
      hasElderly: { type: Boolean, default: false },
      luggageRequirement: { type: String, default: 'Medium' }, // Light, Medium, Heavy
      pillionFrequency: { type: String, default: 'Occasional' }, // Never, Occasional, Daily
      storageRequirement: { type: String, default: 'Medium' },
      
      // Financial
      budget: { type: Number, default: 14 }, // in Lakhs
      expectedOwnershipYears: { type: Number, default: 5 },
      runningCostImportance: { type: String, default: 'High' }, // High, Medium, Low
      
      // Top 3 Priorities
      topPriorities: {
        type: [String],
        default: ['Safety', 'Ground Clearance', 'Comfort'],
        validate: [arr => arr.length <= 3, '{PATH} exceeds limit of 3 priorities']
      }
    }
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
