const express = require('express');
const router = express.Router();
const { getAllVehicles } = require('../services/store');
const { evaluateVehicleSuitability } = require('../services/suitabilityEngine');

// POST /api/recommendations - Process user profile questionnaire and return weighted recommendations
router.post('/', async (req, res) => {
  try {
    const { profile } = req.body;

    if (!profile) {
      return res.status(400).json({ success: false, message: 'User profile is required.' });
    }

    const allVehicles = await getAllVehicles();
    let eligibleVehicles = [...allVehicles];

    // Filter by preferred category if specified (Car, Motorcycle, Scooter)
    if (profile.categoryPreference && profile.categoryPreference !== 'All') {
      eligibleVehicles = eligibleVehicles.filter(
        v => v.category.toLowerCase() === profile.categoryPreference.toLowerCase()
      );
    }

    // Evaluate each vehicle with the user's specific profile
    const evaluatedResults = eligibleVehicles.map(vehicle => {
      const evaluation = evaluateVehicleSuitability(vehicle, profile);
      return {
        vehicle,
        evaluation,
        overallScore: evaluation.overallScore,
        budgetStatus: evaluation.budgetStatus,
      };
    });

    // Rank primarily by overall weighted suitability score
    evaluatedResults.sort((a, b) => b.overallScore - a.overallScore);

    // Group recommendations by category for convenient tab display
    const cars = evaluatedResults.filter(r => r.vehicle.category === 'Car');
    const motorcycles = evaluatedResults.filter(r => r.vehicle.category === 'Motorcycle');
    const scooters = evaluatedResults.filter(r => r.vehicle.category === 'Scooter');

    res.json({
      success: true,
      totalCount: evaluatedResults.length,
      topMatches: evaluatedResults.slice(0, 8),
      categorized: {
        cars: cars.slice(0, 6),
        motorcycles: motorcycles.slice(0, 6),
        scooters: scooters.slice(0, 6)
      },
      userPriorities: profile.topPriorities || ['Safety', 'Ground Clearance', 'Comfort'],
      evaluatedAt: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
