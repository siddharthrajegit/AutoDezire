const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../middleware/authMiddleware');
const { generateAdvisorResponse } = require('../services/aiAdvisorService');
const { getVehicleById, getBikeById, getAllVehicles, memoryUsers } = require('../services/store');
const { evaluateVehicleSuitability } = require('../services/suitabilityEngine');
const User = require('../models/User');
const { getIsConnected } = require('../config/db');

/**
 * POST /api/ai/chat
 * Personalized context-aware automobile advisor powered by OpenRouter Google Gemma 4 26B
 */
router.post('/chat', async (req, res) => {
  try {
    const rawMessage = req.body.message || req.body.question;

    if (!rawMessage || typeof rawMessage !== 'string' || !rawMessage.trim()) {
      return res.status(400).json({
        success: false,
        error: 'INVALID_INPUT',
        message: 'A valid question or message text is required.',
      });
    }

    const clientExplicitlyOmittedProfile =
      Object.prototype.hasOwnProperty.call(req.body, 'userProfile') && req.body.userProfile === null;

    let userProfile = null; // Never trust client-supplied profile directly when auth token has one
    let selectedVehicle = req.body.selectedVehicle || req.body.vehicle || null;
    let suitabilityResult = req.body.suitabilityResult || req.body.evaluation || null;
    let recommendedVehicles = req.body.recommendedVehicles || req.body.alternatives || [];
    const conversationHistory = Array.isArray(req.body.conversationHistory)
      ? req.body.conversationHistory
      : [];

    // 1. Resolve User Profile: if auth token present, always load from server unless client explicitly indicates form not filled
    if (!clientExplicitlyOmittedProfile && req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, JWT_SECRET);
        if (decoded?.id) {
          if (getIsConnected()) {
            const dbUser = await User.findById(decoded.id).select('-password');
            if (dbUser?.profile) userProfile = dbUser.profile;
          } else {
            const memUser = memoryUsers.find(u => u._id === decoded.id || u.id === decoded.id);
            if (memUser?.profile) userProfile = memUser.profile;
          }
        }
      } catch (authErr) {
        // Token expired or invalid; continue without token profile
      }
    }

    // If no authenticated profile found, accept client profile object only when actually provided
    if (!userProfile && !clientExplicitlyOmittedProfile && req.body.userProfile && typeof req.body.userProfile === 'object') {
      userProfile = req.body.userProfile;
    }

    // 2. Resolve Selected Vehicle: if string ID is passed, load full vehicle from store
    if (typeof selectedVehicle === 'string') {
      const v = (await getVehicleById(selectedVehicle)) || (await getBikeById(selectedVehicle));
      if (v) selectedVehicle = v;
    } else if (req.body.vehicleId) {
      const v = (await getVehicleById(req.body.vehicleId)) || (await getBikeById(req.body.vehicleId));
      if (v) selectedVehicle = v;
    }

    // If still missing, pick first available car from store as context
    if (!selectedVehicle) {
      const allVehs = await getAllVehicles();
      if (allVehs && allVehs.length > 0) {
        selectedVehicle = allVehs[0];
      }
    }

    // 3. Resolve Suitability Result ONLY when a real user profile exists
    if (!suitabilityResult && selectedVehicle && userProfile) {
      suitabilityResult = evaluateVehicleSuitability(selectedVehicle, userProfile);
    }

    // 4. Resolve Alternatives from store if missing
    if (!recommendedVehicles || recommendedVehicles.length === 0) {
      const allVehs = await getAllVehicles();
      if (allVehs && allVehs.length > 0) {
        const curId = selectedVehicle?._id || selectedVehicle?.id;
        recommendedVehicles = allVehs
          .filter(v => (v._id || v.id) !== curId)
          .slice(0, 3)
          .map(v => ({
            vehicle: v,
            priceDisplay: v.priceDisplay,
          }));
      }
    }

    // 5. Call OpenRouter AI Advisor Service
    const result = await generateAdvisorResponse({
      message: rawMessage.trim(),
      conversationHistory,
      userProfile,
      selectedVehicle,
      suitabilityResult,
      recommendedVehicles,
    });

    return res.json({
      success: true,
      data: {
        reply: result.reply,
        model: result.model,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('[AI Advisor Route Error]:', error.message);
    const status = error.status || 500;
    return res.status(status).json({
      success: false,
      error: error.code || 'AI_ADVISOR_ERROR',
      message: error.message || 'An unexpected error occurred while communicating with the AI service.',
    });
  }
});

module.exports = router;
