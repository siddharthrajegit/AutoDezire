/**
 * AutoDezire AI Advisor Service
 * Personalized automobile recommendation advisor powered by OpenRouter API
 * using Google Gemma (google/gemma-4-26b-a4b).
 *
 * Strictly grounded in AutoDezire's user profile and suitability recommendation engine.
 */

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const DEFAULT_MODEL = 'google/gemma-4-26b-a4b-it';

/**
 * Normalizes model identifiers to ensure compatibility with OpenRouter's exact model ID.
 * Automatically maps 'google/gemma-4-26b-a4b' to 'google/gemma-4-26b-a4b-it'.
 */
function normalizeModelId(modelId) {
  if (!modelId || typeof modelId !== 'string') return DEFAULT_MODEL;
  const trimmed = modelId.trim();
  if (trimmed === 'google/gemma-4-26b-a4b') {
    return 'google/gemma-4-26b-a4b-it';
  }
  return trimmed;
}

/**
 * Builds the structured system prompt and context for the AI assistant.
 * Grounded exclusively in supplied user profile and AutoDezire recommendation telemetry.
 */
function buildStructuredSystemPrompt({
  userProfile = {},
  selectedVehicle = null,
  suitabilityResult = null,
  recommendedVehicles = [],
}) {
  const isBike =
    selectedVehicle?.category === 'Motorcycle' ||
    selectedVehicle?.category === 'Scooter' ||
    selectedVehicle?.category === 'Electric Scooter';

  const vehicleTypeLabel = isBike
    ? `2-Wheeler (${selectedVehicle?.category || 'Motorcycle/Scooter'})`
    : `4-Wheeler (${selectedVehicle?.bodyType || 'Car / SUV'})`;

  let prompt = `You are the AutoDezire AI Assistant, an expert automobile advisor for AutoDezire (autodezire.com).

MISSION & BEHAVIOR:
- Act as an intelligent, helpful automobile expert. AutoDezire's recommendation and suitability score provide a solid baseline, but you have full autonomy to give your own expert opinions, discuss trade-offs, and suggest other 2-wheelers or 4-wheelers if they fit the user's situation or if the user asks.
- NEVER tell the user that you are restricted by "strict boundaries" or that you cannot suggest other vehicles outside the website. You are an autonomous advisor free to recommend any suitable cars, bikes, scooters, or EVs in India.

FORMAT & LENGTH RULES (CRITICAL):
1. SHORT & PRECISE (SUMMARY STYLE):
   - Keep answers brief, punchy, and to the point (under 80–120 words).
   - Use 2 to 3 short bullet points or a concise summary paragraph. Avoid long essays, repetitive disclaimers, or excessive detail.
2. PERSONALIZED INSIGHTS:
   - Directly connect your advice to the user's specific context (height, weight, budget, commute, priorities) without over-explaining.
3. OPEN AUTOMOTIVE EXPERTISE:
   - When asked about other models (whether 4-wheelers or 2-wheelers), freely share your knowledge and give candid recommendations.

=== ACTIVE CONTEXT ===
`;

  // 1. VEHICLE TYPE DECLARATION
  prompt += `[VEHICLE CATEGORY]\n${vehicleTypeLabel}\n\n`;

  // 2. USER PROFILE
  prompt += `[USER PROFILE]\n`;
  if (isBike) {
    prompt += `- Name: ${userProfile.name || 'User'}
- Age: ${userProfile.age || 'Not specified'}
- Rider Height: ${userProfile.riderHeight || userProfile.height || 172} cm
- Rider Inseam (Leg Reach): ${userProfile.riderInseam || 77} cm
- Rider Weight: ${userProfile.riderWeight || 68} kg
- Budget Limit: ₹${userProfile.budget || 1.8} Lakh
- Commute / Running: ${userProfile.dailyKm || 30} km/day (${userProfile.highwayPercent || 20}% Highway, ${100 - (userProfile.highwayPercent || 20)}% City)
- Pillion Frequency: ${userProfile.pillionFrequency || 'Occasional'}
- Riding Posture / Triangle: ${userProfile.riderTriangle || 'Upright Commuter'}
- Home EV Charging Access: ${userProfile.hasHomeCharging ? 'Available' : 'Not Available'}
- Top Priorities: ${(userProfile.topPriorities || ['Mileage / Running Cost', 'Ergonomic Flat-Foot Reach', 'City Traffic Agility']).join(', ')}
`;
  } else {
    prompt += `- Name: ${userProfile.name || 'User'}
- Age: ${userProfile.age || 'Not specified'}
- Height: ${userProfile.height || 175} cm
- Weight: ${userProfile.weight ? `${userProfile.weight} kg` : 'Not specified'}
- Budget Limit: ₹${userProfile.budget || 14} Lakh
- Daily Running: ${userProfile.dailyKm || 35} km/day (${userProfile.cityPercent || 60}% City, ${userProfile.highwayPercent || 30}% Highway, ${userProfile.ruralPercent || 10}% Rural)
- Road Conditions: ${userProfile.roadConditions || 'Mixed with Potholes'}
- Terrain: ${userProfile.primaryTerrain || 'Flat Plains'}
- Parking Type: ${userProfile.parkingType || 'Open Driveway'}
- Family & Passengers: ${userProfile.regularPassengers || 2} regular passengers (Children: ${userProfile.hasChildren ? 'Yes' : 'No'}, Elderly: ${userProfile.hasElderly ? 'Yes' : 'No'})
- Fuel Preference: ${userProfile.fuelPreference || 'All'}
- Transmission Preference: ${userProfile.transmissionPreference || 'Any'}
- Home EV Charging Access: ${userProfile.hasHomeCharging ? 'Available' : 'Not Available'}
- Top Priorities: ${(userProfile.topPriorities || ['Safety', 'Ground Clearance', 'Comfort']).join(', ')}
`;
  }
  prompt += '\n';

  // 3. AUTO DEZIRE RECOMMENDATION & EVALUATION
  if (selectedVehicle) {
    prompt += `[AUTO DEZIRE RECOMMENDATION & EVALUATION]\n`;
    prompt += `- Recommended Vehicle: ${selectedVehicle.brand} ${selectedVehicle.model} (${selectedVehicle.category}${selectedVehicle.bodyType ? ` - ${selectedVehicle.bodyType}` : ''})\n`;
    prompt += `- Price / Price Range: ${selectedVehicle.priceDisplay || 'Price on request'}\n`;
    prompt += `- Engine / Powertrain: ${selectedVehicle.engine || 'Standard'} | Power: ${selectedVehicle.power || 'N/A'} | Torque: ${selectedVehicle.torque || 'N/A'}\n`;
    prompt += `- Fuel Efficiency / Mileage: ${selectedVehicle.mileage || 'N/A'}\n`;
    prompt += `- Ground Clearance: ${selectedVehicle.groundClearance ? `${selectedVehicle.groundClearance} mm` : 'N/A'}\n`;
    prompt += `- Safety Rating: ${selectedVehicle.safetyRating ? `${selectedVehicle.safetyRating} Star (${selectedVehicle.safetyAgency || 'NCAP'})` : 'N/A'}\n`;

    if (isBike) {
      if (selectedVehicle.seatHeight) prompt += `- Seat Height: ${selectedVehicle.seatHeight} mm\n`;
      if (selectedVehicle.kerbWeight) prompt += `- Kerb Weight: ${selectedVehicle.kerbWeight} kg\n`;
      if (selectedVehicle.underseatStorageLitres) prompt += `- Underseat Boot Storage: ${selectedVehicle.underseatStorageLitres} L\n`;
    } else {
      if (selectedVehicle.seatingCapacity) prompt += `- Seating Capacity: ${selectedVehicle.seatingCapacity} Seater\n`;
      if (selectedVehicle.bootSpace) prompt += `- Boot Space: ${selectedVehicle.bootSpace} L\n`;
    }

    if (suitabilityResult) {
      prompt += `- AutoDezire Overall Suitability Score: ${suitabilityResult.overallScore || 'N/A'}/100 (${suitabilityResult.overallStatus || 'Evaluated'})\n`;
      prompt += `- Budget Compatibility: ${suitabilityResult.budgetStatus || 'Evaluated'} (${suitabilityResult.budgetMessage || ''})\n`;

      if (suitabilityResult.topStrengths && suitabilityResult.topStrengths.length > 0) {
        prompt += `- Key Strengths for User:\n${suitabilityResult.topStrengths.map(s => `  * ${s}`).join('\n')}\n`;
      }

      if (suitabilityResult.considerations && suitabilityResult.considerations.length > 0) {
        prompt += `- Considerations / Trade-offs flagged by AutoDezire:\n${suitabilityResult.considerations.map(c => `  * ${c}`).join('\n')}\n`;
      }

      if (suitabilityResult.fuelRecommendation) {
        const fr = suitabilityResult.fuelRecommendation;
        prompt += `- Recommended Fuel Powertrain: ${fr.recommendedFuelType || ''} (${fr.reason || ''})\n`;
        if (fr.estimatedMonthlyCost) {
          prompt += `  * Estimated Monthly Running Cost: ₹${fr.estimatedMonthlyCost.toLocaleString('en-IN')}/month\n`;
        }
      }

      if (suitabilityResult.requirementScores && Object.keys(suitabilityResult.requirementScores).length > 0) {
        prompt += `- Requirement Breakdown Scores:\n`;
        for (const [key, val] of Object.entries(suitabilityResult.requirementScores)) {
          prompt += `  * ${key}: ${val}/10\n`;
        }
      }
    }
    prompt += '\n';
  }

  // 4. ALTERNATIVES
  if (recommendedVehicles && recommendedVehicles.length > 0) {
    prompt += `[TOP ALTERNATIVES (Calculated by AutoDezire)]\n`;
    recommendedVehicles.slice(0, 3).forEach((alt, idx) => {
      const v = alt.vehicle || alt;
      const score = alt.overallScore || alt.evaluation?.overallScore || 'N/A';
      prompt += `${idx + 1}. ${v.brand} ${v.model} (Score: ${score}/100, Price: ${v.priceDisplay || 'N/A'})\n`;
    });
    prompt += '\n';
  }

  return prompt;
}

/**
 * Calls OpenRouter API with the Gemma 4 26B model
 */
async function callOpenRouterAPI({
  apiKey,
  model = DEFAULT_MODEL,
  systemPrompt,
  userMessage,
  conversationHistory = [],
}) {
  const messages = [
    { role: 'system', content: systemPrompt }
  ];

  // Include recent conversation turns for multi-turn context (last 6 turns max)
  const recentHistory = conversationHistory.slice(-6);
  for (const h of recentHistory) {
    if (h.sender === 'user' || h.role === 'user') {
      messages.push({ role: 'user', content: h.text || h.content });
    } else if (h.sender === 'ai' || h.role === 'assistant' || h.role === 'model') {
      messages.push({ role: 'assistant', content: h.text || h.content });
    }
  }

  // Add the current user query
  messages.push({ role: 'user', content: userMessage });

  const payload = {
    model: model || DEFAULT_MODEL,
    messages,
    temperature: 0.4,
    max_tokens: 350,
  };

  let response;
  try {
    response = await fetch(OPENROUTER_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': 'https://autodezire.com',
        'X-Title': 'AutoDezire AI Assistant',
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(30000), // 30s timeout
    });
  } catch (networkErr) {
    if (networkErr.name === 'TimeoutError') {
      const err = new Error('OpenRouter request timed out after 30 seconds. Please try again.');
      err.status = 504;
      throw err;
    }
    const err = new Error(`Network error connecting to OpenRouter: ${networkErr.message}`);
    err.status = 502;
    throw err;
  }

  let data;
  try {
    data = await response.json();
  } catch (parseErr) {
    const err = new Error('Failed to parse response from OpenRouter API.');
    err.status = 502;
    throw err;
  }

  if (!response.ok) {
    const errorDetail = data?.error?.message || response.statusText || 'Unknown error';
    const err = new Error(`OpenRouter error: ${errorDetail}`);
    err.status = response.status;
    err.code = data?.error?.code || 'OPENROUTER_ERROR';

    if (response.status === 401 || response.status === 403) {
      err.message = 'Invalid or unauthorized OpenRouter API key. Please check OPENROUTER_API_KEY in your backend .env file.';
    } else if (response.status === 429) {
      err.message = 'OpenRouter rate limit or quota exceeded. Please try again in a moment.';
    } else if (response.status === 402) {
      err.message = 'OpenRouter account has insufficient credits. Please check your OpenRouter balance.';
    }
    throw err;
  }

  const reply = data?.choices?.[0]?.message?.content;
  if (!reply || typeof reply !== 'string' || reply.trim().length === 0) {
    const err = new Error('The AI model returned an empty response. Please try again.');
    err.status = 502;
    throw err;
  }

  return {
    reply: reply.trim(),
    model: data.model || model,
  };
}

/**
 * Main entrance for generating personalized advisor response.
 */
async function generateAdvisorResponse({
  message,
  conversationHistory = [],
  userProfile = {},
  selectedVehicle = null,
  suitabilityResult = null,
  recommendedVehicles = [],
}) {
  if (!message || typeof message !== 'string' || !message.trim()) {
    const err = new Error('A non-empty question or message is required.');
    err.status = 400;
    throw err;
  }

  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey || apiKey.trim() === '' || apiKey === 'your_openrouter_api_key_here') {
    const err = new Error(
      'OpenRouter API key is not configured. Please add your OPENROUTER_API_KEY to the backend .env file.'
    );
    err.status = 500;
    err.code = 'MISSING_API_KEY';
    throw err;
  }

  const rawModel = process.env.OPENROUTER_MODEL || DEFAULT_MODEL;
  const model = normalizeModelId(rawModel);

  const systemPrompt = buildStructuredSystemPrompt({
    userProfile,
    selectedVehicle,
    suitabilityResult,
    recommendedVehicles,
  });

  return await callOpenRouterAPI({
    apiKey: apiKey.trim(),
    model,
    systemPrompt,
    userMessage: message.trim(),
    conversationHistory,
  });
}

module.exports = {
  generateAdvisorResponse,
  buildStructuredSystemPrompt,
  callOpenRouterAPI,
  normalizeModelId,
  OPENROUTER_API_URL,
  DEFAULT_MODEL,
};
