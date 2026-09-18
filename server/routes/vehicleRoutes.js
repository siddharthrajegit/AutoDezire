const express = require('express');
const router = express.Router();
const { getAllVehicles, getVehicleById, getAllBikes, getBikeById } = require('../services/store');
const { evaluateVehicleSuitability } = require('../services/suitabilityEngine');

// GET /api/vehicles/bikes - List all 2-wheelers with optional brand, category, search
router.get('/bikes', async (req, res) => {
  try {
    const { category, brand, search } = req.query;
    const bikes = await getAllBikes({ category, brand, search });
    res.json({ success: true, count: bikes.length, data: bikes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/vehicles - List all vehicles with optional filter/search
router.get('/', async (req, res) => {
  try {
    const { category, brand, search, type } = req.query;
    const vehicles = await getAllVehicles({ category, brand, search, type });
    res.json({ success: true, count: vehicles.length, data: vehicles });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/vehicles/:id - Get single vehicle details
router.get('/:id', async (req, res) => {
  try {
    const vehicle = await getVehicleById(req.params.id);
    if (!vehicle) {
      return res.status(404).json({ success: false, message: 'Vehicle not found' });
    }
    res.json({ success: true, data: vehicle });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/vehicles/evaluate - Evaluate a specific automobile against a user profile (Flow 2)
router.post('/evaluate', async (req, res) => {
  try {
    const { vehicleId, modelName, profile } = req.body;
    let vehicle = null;

    if (vehicleId) {
      vehicle = await getVehicleById(vehicleId);
    } else if (modelName) {
      const all = await getAllVehicles();
      vehicle = all.find(v =>
        v.model.toLowerCase() === modelName.toLowerCase() ||
        `${v.brand} ${v.model}`.toLowerCase().includes(modelName.toLowerCase())
      );
    }

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: `Automobile '${modelName || vehicleId}' not found in database.`
      });
    }

    // Run user-specific suitability engine
    const evaluation = evaluateVehicleSuitability(vehicle, profile || {});

    res.json({
      success: true,
      data: {
        vehicle,
        evaluation
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
