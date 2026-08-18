const mongoose = require('mongoose');

const savedVehicleSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    vehicleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
    notes: { type: String, default: '' },
    suitabilityScoreAtSave: { type: Number },
  },
  { timestamps: true }
);

savedVehicleSchema.index({ userId: 1, vehicleId: 1 }, { unique: true });

module.exports = mongoose.model('SavedVehicle', savedVehicleSchema);
