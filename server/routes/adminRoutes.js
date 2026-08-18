const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../middleware/authMiddleware');
const {
  getAllVehicles,
  getVehicleById,
  createVehicle,
  updateVehicle,
  deleteVehicle,
} = require('../services/store');

// GET /api/admin/metrics - Summary statistics
router.get('/metrics', protect, adminOnly, async (req, res) => {
  try {
    const all = await getAllVehicles();
    const cars = all.filter(v => v.category === 'Car').length;
    const bikes = all.filter(v => v.category === 'Motorcycle').length;
    const scooters = all.filter(v => v.category === 'Scooter').length;
    const active = all.filter(v => v.isActive !== false).length;

    res.json({
      success: true,
      data: {
        totalVehicles: all.length,
        carsCount: cars,
        bikesCount: bikes,
        scootersCount: scooters,
        activeCount: active,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/admin/vehicles - All vehicles with admin view
router.get('/vehicles', protect, adminOnly, async (req, res) => {
  try {
    const { category, search } = req.query;
    const vehicles = await getAllVehicles({ category, search });
    res.json({ success: true, count: vehicles.length, data: vehicles });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/admin/vehicles - Add new vehicle
router.post('/vehicles', protect, adminOnly, async (req, res) => {
  try {
    const {
      brand,
      model,
      category,
      bodyType,
      priceFrom,
      priceTo,
      priceDisplay,
      fuelType,
      transmission,
      engine,
      power,
      torque,
      mileage,
      groundClearance,
      seatingCapacity,
      bootSpace,
      seatHeight,
      batteryCapacity,
      safetyRating,
      safetyAgency,
      image,
      description,
    } = req.body;

    if (!brand || !model || !category || !priceFrom || !priceTo) {
      return res.status(400).json({
        success: false,
        message: 'Please provide Brand, Model, Category, Price From, and Price To.',
      });
    }

    const newVehicle = await createVehicle({
      brand,
      model,
      category,
      bodyType: bodyType || (category === 'Car' ? 'SUV' : 'Cruiser'),
      variantSummary: req.body.variantSummary || 'Standard / Base to Top',
      priceFrom: Number(priceFrom),
      priceTo: Number(priceTo),
      priceDisplay: priceDisplay || `₹ ${priceFrom} - ${priceTo} Lakh*`,
      fuelType: fuelType || 'Petrol',
      transmission: transmission || 'Manual',
      engine: engine || '1.2L Standard',
      power: power || '100 bhp',
      torque: torque || '150 Nm',
      mileage: mileage || '18.0 kmpl',
      mileageValue: parseFloat(mileage) || 18,
      groundClearance: Number(groundClearance) || 180,
      seatingCapacity: Number(seatingCapacity) || (category === 'Car' ? 5 : 2),
      bootSpace: Number(bootSpace) || (category === 'Car' ? 350 : 20),
      seatHeight: Number(seatHeight) || 0,
      batteryCapacity: batteryCapacity || '',
      safetyRating: Number(safetyRating) || 4,
      safetyAgency: safetyAgency || 'Global NCAP Rating',
      image: image || 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=900&q=80',
      description: description || `${brand} ${model} delivers reliable everyday performance.`,
      isActive: true,
    });

    res.status(201).json({ success: true, data: newVehicle });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/admin/vehicles/:id - Update vehicle
router.put('/vehicles/:id', protect, adminOnly, async (req, res) => {
  try {
    const updated = await updateVehicle(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Vehicle not found' });
    }
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/admin/vehicles/:id - Delete vehicle
router.delete('/vehicles/:id', protect, adminOnly, async (req, res) => {
  try {
    const deleted = await deleteVehicle(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Vehicle not found' });
    }
    res.json({ success: true, message: 'Vehicle deleted successfully', data: deleted });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
