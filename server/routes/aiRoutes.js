const express = require('express');
const router = express.Router();
const { generateAdvisorResponse } = require('../services/aiAdvisorService');

// POST /api/ai/chat - Personalized context-aware advisor
router.post('/chat', async (req, res) => {
  try {
    const {
      message,
      conversationHistory,
      userProfile,
      selectedVehicle,
      suitabilityResult,
      recommendedVehicles,
    } = req.body;

    if (!message) {
      return res.status(400).json({ success: false, message: 'Message text is required.' });
    }

    const answer = await generateAdvisorResponse({
      message,
      conversationHistory: conversationHistory || [],
      userProfile: userProfile || {},
      selectedVehicle: selectedVehicle || null,
      suitabilityResult: suitabilityResult || null,
      recommendedVehicles: recommendedVehicles || [],
    });

    res.json({
      success: true,
      data: {
        reply: answer,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
