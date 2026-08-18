/**
 * AutoDezire Core Suitability Engine
 * Transparent, weighted rule-based suitability scoring tailored to the individual user profile.
 */

// Mapping of priority names to score category keys
const PRIORITY_MAP = {
  'Safety': 'safety',
  'Ground Clearance': 'groundClearance',
  'Comfort': 'comfort',
  'Space & Practicality': 'spacePracticality',
  'Space': 'spacePracticality',
  'Practicality': 'spacePracticality',
  'Mileage / Running Cost': 'mileageRunningCost',
  'Mileage': 'mileageRunningCost',
  'Running Cost': 'mileageRunningCost',
  'Maintenance Cost': 'maintenanceCost',
  'Performance': 'performance',
  'Resale Value': 'resaleValue',
  'Highway Stability': 'highwayStability',
  'City Drive Suitability': 'cityDriveSuitability',
};

const REQUIREMENT_KEYS = [
  { key: 'safety', name: 'Safety', icon: 'Shield', color: 'emerald' },
  { key: 'groundClearance', name: 'Ground Clearance', icon: 'ArrowUpDown', color: 'cyan' },
  { key: 'comfort', name: 'Comfort', icon: 'Armchair', color: 'amber' },
  { key: 'spacePracticality', name: 'Space & Practicality', icon: 'Briefcase', color: 'blue' },
  { key: 'mileageRunningCost', name: 'Mileage / Running Cost', icon: 'Fuel', color: 'yellow' },
  { key: 'maintenanceCost', name: 'Maintenance Cost', icon: 'Wrench', color: 'purple' },
  { key: 'performance', name: 'Performance', icon: 'Rocket', color: 'orange' },
  { key: 'resaleValue', name: 'Resale Value', icon: 'Coins', color: 'pink' },
  { key: 'highwayStability', name: 'Highway Stability', icon: 'Road', color: 'indigo' },
  { key: 'cityDriveSuitability', name: 'City Drive Suitability', icon: 'Building2', color: 'sky' },
];

/**
 * Evaluates a single automobile for a given user profile.
 */
function evaluateVehicleSuitability(vehicle, profile = {}) {
  const base = vehicle.baseScores || {
    safety: 7,
    groundClearance: 7,
    comfort: 7,
    spacePracticality: 7,
    mileageRunningCost: 7,
    maintenanceCost: 7,
    performance: 7,
    resaleValue: 7,
    highwayStability: 7,
    cityDriveSuitability: 7,
  };

  const scores = { ...base };
  const userPriorities = profile.topPriorities || ['Safety', 'Comfort', 'Mileage / Running Cost'];
  const mappedPriorities = userPriorities.map(p => PRIORITY_MAP[p] || p);

  // 1. SAFETY ADJUSTMENT
  if (profile.hasChildren || profile.hasElderly || (profile.highwayPercent || 30) > 50) {
    if (vehicle.safetyRating >= 5) scores.safety = Math.min(10, scores.safety + 1);
    else if (vehicle.safetyRating <= 3) scores.safety = Math.max(2, scores.safety - 2);
  }

  // 2. GROUND CLEARANCE ADJUSTMENT
  const roadCondition = profile.roadConditions || 'Mixed';
  const roughRoad = (profile.roughRoadExperience || 5) > 6 || roadCondition.includes('Bad') || roadCondition.includes('Potholes');
  if (roughRoad || (profile.ruralPercent || 10) > 30) {
    if (vehicle.groundClearance >= 200) scores.groundClearance = Math.min(10, scores.groundClearance + 1);
    else if (vehicle.groundClearance < 170) scores.groundClearance = Math.max(3, scores.groundClearance - 2);
  }

  // 3. COMFORT ADJUSTMENT
  if (profile.hasElderly && (vehicle.bodyType === 'SUV' && vehicle.groundClearance > 220)) {
    // Difficult ingress/egress for tall off-roaders
    scores.comfort = Math.max(3, scores.comfort - 2);
  }
  if ((profile.journeyDurationMinutes || 45) > 60 && vehicle.category === 'Car' && vehicle.bodyType === 'Sedan') {
    scores.comfort = Math.min(10, scores.comfort + 1);
  }

  // 4. SPACE & PRACTICALITY ADJUSTMENT
  const passengers = profile.regularPassengers || 2;
  if (passengers >= 5 && vehicle.seatingCapacity < 5) {
    scores.spacePracticality = Math.max(2, scores.spacePracticality - 3);
  }
  if (profile.luggageRequirement === 'Heavy' && vehicle.bootSpace > 450) {
    scores.spacePracticality = Math.min(10, scores.spacePracticality + 1);
  } else if (profile.luggageRequirement === 'Heavy' && vehicle.bootSpace < 200) {
    scores.spacePracticality = Math.max(2, scores.spacePracticality - 2);
  }

  // 5. MILEAGE / RUNNING COST ADJUSTMENT
  const dailyKm = profile.dailyKm || 30;
  if (dailyKm >= 50) {
    // High running user is heavily sensitive to low mileage
    if (vehicle.fuelType === 'Electric' || (vehicle.mileageValue && vehicle.mileageValue >= 22)) {
      scores.mileageRunningCost = 10;
    } else if (vehicle.mileageValue && vehicle.mileageValue <= 13) {
      scores.mileageRunningCost = Math.max(2, scores.mileageRunningCost - 2);
    }
  }

  // 6. HIGHWAY STABILITY vs CITY DRIVE
  const highwayPct = profile.highwayPercent || 30;
  const cityPct = profile.cityPercent || 60;

  if (highwayPct >= 60) {
    if (vehicle.bodyType === 'Sedan' || (vehicle.wheelbase >= 2600 && vehicle.kerbWeight > 1200)) {
      scores.highwayStability = Math.min(10, scores.highwayStability + 1);
    }
    if (vehicle.category === 'Scooter' || (vehicle.bodyType === 'SUV' && vehicle.groundClearance > 220 && vehicle.power.includes('bhp'))) {
      // Offroader or small scooter on long highway trips
      scores.highwayStability = Math.max(3, scores.highwayStability - 1);
    }
  }

  if (cityPct >= 70) {
    if (vehicle.length <= 4000 || vehicle.category === 'Scooter') {
      scores.cityDriveSuitability = Math.min(10, scores.cityDriveSuitability + 1);
    } else if (vehicle.length > 4600) {
      scores.cityDriveSuitability = Math.max(4, scores.cityDriveSuitability - 2);
    }
  }

  // Ensure all scores stay strictly between 1 and 10
  Object.keys(scores).forEach(k => {
    scores[k] = Math.max(1, Math.min(10, Math.round(scores[k])));
  });

  // Calculate Weighted Overall Suitability Score (0 - 100)
  let totalWeightedScore = 0;
  let totalWeight = 0;
  const PRIORITY_WEIGHT = 2.8; // User's top 3 priorities receive 2.8x weight
  const STANDARD_WEIGHT = 1.0;

  REQUIREMENT_KEYS.forEach(req => {
    const isTopPriority = mappedPriorities.includes(req.key);
    const weight = isTopPriority ? PRIORITY_WEIGHT : STANDARD_WEIGHT;
    const scoreVal = scores[req.key] || 7;
    totalWeightedScore += scoreVal * weight * 10; // score out of 100
    totalWeight += weight;
  });

  let rawOverallScore = Math.round(totalWeightedScore / totalWeight);

  // Critical Requirement Check
  // If ANY of user's Top 3 priorities has a low score (<= 4/10), apply a penalty
  const criticalCompromises = [];
  userPriorities.forEach(priorityName => {
    const key = PRIORITY_MAP[priorityName];
    if (key && scores[key] <= 4) {
      criticalCompromises.push({
        priority: priorityName,
        score: scores[key],
        reason: `${priorityName} is one of your top priorities, but this vehicle scores only ${scores[key]}/10 for your profile.`
      });
    }
  });

  if (criticalCompromises.length > 0) {
    // Dampen score so a weak critical priority cannot result in a misleading 90+ score
    rawOverallScore = Math.min(rawOverallScore, 68);
  }

  // Budget Analysis
  const userBudget = profile.budget || 15; // in Lakhs
  const basePrice = vehicle.priceFrom;
  let budgetStatus = 'Within Budget';
  let budgetMessage = `Fits comfortably within your ₹${userBudget} Lakh budget`;

  if (basePrice > userBudget * 1.15) {
    budgetStatus = 'Beyond Consideration Range';
    budgetMessage = `Exceeds your budget range (Base ₹${basePrice}L vs Budget ₹${userBudget}L)`;
    rawOverallScore = Math.max(25, rawOverallScore - 12);
  } else if (basePrice > userBudget) {
    budgetStatus = 'Slightly Above Budget';
    budgetMessage = `Slightly above ₹${userBudget}L budget (within 10-15% tolerance range)`;
  }

  // Determine Overall Status Label
  let overallStatus = 'Very Suitable';
  if (rawOverallScore >= 85) overallStatus = 'Highly Suitable';
  else if (rawOverallScore >= 70) overallStatus = 'Very Suitable';
  else if (rawOverallScore >= 50) overallStatus = 'Consider Carefully';
  else overallStatus = 'Not Recommended';

  // Generate Personalized Strengths & Considerations
  const { personalizedStrengths, personalizedConsiderations } = generateContextualFeedback(
    vehicle,
    scores,
    profile,
    criticalCompromises,
    budgetStatus
  );

  return {
    vehicleId: vehicle._id || vehicle.id,
    brand: vehicle.brand,
    model: vehicle.model,
    category: vehicle.category,
    bodyType: vehicle.bodyType,
    overallScore: rawOverallScore,
    overallStatus,
    requirementScores: scores,
    requirementList: REQUIREMENT_KEYS.map(req => ({
      key: req.key,
      name: req.name,
      icon: req.icon,
      color: req.color,
      score: scores[req.key] || 7,
      isTopPriority: mappedPriorities.includes(req.key),
      level: getScoreLevel(scores[req.key] || 7)
    })),
    criticalCompromises,
    budgetStatus,
    budgetMessage,
    topStrengths: personalizedStrengths,
    considerations: personalizedConsiderations,
  };
}

function getScoreLevel(score) {
  if (score >= 9) return { label: 'Excellent', color: 'text-emerald-500 bg-emerald-500/10' };
  if (score >= 7) return { label: 'Good', color: 'text-blue-500 bg-blue-500/10' };
  if (score >= 4) return { label: 'Average', color: 'text-amber-500 bg-amber-500/10' };
  return { label: 'Poor', color: 'text-rose-500 bg-rose-500/10' };
}

function generateContextualFeedback(vehicle, scores, profile, criticalCompromises, budgetStatus) {
  const strengths = [...(vehicle.inherentStrengths || [])];
  const considerations = [...(vehicle.inherentConsiderations || [])];

  // Tailored Strengths
  if ((profile.highwayPercent || 30) >= 50 && scores.highwayStability >= 8) {
    strengths.unshift('Very good highway stability matches your frequent highway journeys');
  }
  if ((profile.dailyKm || 30) >= 45 && scores.mileageRunningCost >= 8) {
    strengths.unshift(`High fuel efficiency provides huge savings for your ${profile.dailyKm || 45} km daily commute`);
  }
  if (scores.safety >= 9 && (profile.hasChildren || profile.hasElderly)) {
    strengths.unshift('Class-leading 5-Star occupant safety gives high peace of mind for your family');
  }

  // Tailored Considerations
  if (criticalCompromises.length > 0) {
    criticalCompromises.forEach(c => {
      considerations.unshift(c.reason);
    });
  }

  if (budgetStatus === 'Slightly Above Budget') {
    considerations.unshift(`Base price is slightly above your initial ₹${profile.budget || 12}L budget (within 15% margin)`);
  }

  if ((profile.dailyKm || 30) >= 50 && scores.mileageRunningCost <= 5) {
    considerations.unshift(`Running cost will be higher due to moderate fuel economy on your ${profile.dailyKm} km daily commute`);
  }

  if ((profile.regularPassengers || 2) >= 4 && vehicle.category === 'Car' && (vehicle.bootSpace || 300) < 250) {
    considerations.unshift('Limited luggage space for weekend trips with full passenger occupancy');
  }

  // Return top 4 distinct items for each
  return {
    personalizedStrengths: [...new Set(strengths)].slice(0, 4),
    personalizedConsiderations: [...new Set(considerations)].slice(0, 4)
  };
}

module.exports = {
  evaluateVehicleSuitability,
  REQUIREMENT_KEYS,
  PRIORITY_MAP
};
