const express = require('express');
const router = express.Router();
const { memorySavedVehicles, getVehicleById } = require('../services/store');

// GET /api/saved - Get saved vehicles
router.get('/', async (req, res) => {
  try {
    const vehiclesWithDetails = await Promise.all(
      memorySavedVehicles.map(async item => {
        const vehicle = await getVehicleById(item.vehicleId);
        return {
          ...item,
          vehicle,
        };
      })
    );

    res.json({
      success: true,
      data: vehiclesWithDetails.filter(i => i.vehicle != null),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/saved - Save a vehicle
router.post('/', async (req, res) => {
  try {
    const { vehicleId, suitabilityScore } = req.body;
    if (!vehicleId) {
      return res.status(400).json({ success: false, message: 'Vehicle ID is required' });
    }

    const existingIndex = memorySavedVehicles.findIndex(s => s.vehicleId === vehicleId);
    if (existingIndex !== -1) {
      return res.json({
        success: true,
        message: 'Vehicle already in saved list',
        data: memorySavedVehicles[existingIndex],
      });
    }

    const newItem = {
      _id: `saved_${Date.now()}`,
      vehicleId,
      suitabilityScore: suitabilityScore || 80,
      savedAt: new Date().toISOString(),
    };

    memorySavedVehicles.unshift(newItem);

    res.status(201).json({ success: true, data: newItem });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/saved/:vehicleId - Unsave vehicle
router.delete('/:vehicleId', async (req, res) => {
  try {
    const index = memorySavedVehicles.findIndex(
      s => s.vehicleId === req.params.vehicleId || s._id === req.params.vehicleId
    );
    if (index !== -1) {
      const removed = memorySavedVehicles.splice(index, 1);
      return res.json({ success: true, message: 'Vehicle removed from saved list', data: removed[0] });
    }
    res.status(404).json({ success: false, message: 'Saved entry not found' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
