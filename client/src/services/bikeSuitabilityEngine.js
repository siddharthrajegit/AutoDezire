/**
 * AutoDezire Dedicated 2-Wheeler (Bike & Scooter) Suitability Engine
 * Features:
 * - Rider Height & Inseam Flat-Foot Reach Calculations
 * - Rider Weight (kg) vs Bike Kerb Weight & Power-to-Weight Balance
 * - Pillion Passenger Comfort & Footpeg Geometry
 * - Underseat Storage Capacity (Helmet/Groceries)
 * - EV 2-Wheeler Home 5A/15A Socket Gating
 */

export const BIKE_PRIORITY_OPTIONS = [
  'Mileage / Running Cost',
  'Ergonomic Flat-Foot Reach',
  'Rider Weight & Low-Speed Balance',
  'City Traffic Agility',
  'Pillion Passenger Comfort',
  'Underseat Storage & Utility',
  'Highway Touring Poise',
  'Braking Safety (ABS/CBS)',
  'Maintenance & Spare Parts Cost',
  'Performance & Instant Torque',
];

export const BIKE_REQUIREMENT_CONFIG = [
  { key: 'mileageRunningCost', name: 'Mileage / Running Cost', icon: 'Fuel', color: 'yellow' },
  { key: 'ergonomicFlatFoot', name: 'Flat-Foot Reach', icon: 'PersonStanding', color: 'teal' },
  { key: 'riderWeightHandling', name: 'Rider Weight Balance', icon: 'Gauge', color: 'rose' },
  { key: 'cityTrafficAgility', name: 'City Traffic Agility', icon: 'Building2', color: 'sky' },
  { key: 'pillionComfort', name: 'Pillion Comfort', icon: 'Users', color: 'amber' },
  { key: 'underseatStorage', name: 'Underseat Storage', icon: 'Briefcase', color: 'blue' },
  { key: 'highwayTouringPoise', name: 'Highway Touring Poise', icon: 'Road', color: 'indigo' },
  { key: 'brakingSafety', name: 'Braking Safety (ABS)', icon: 'Shield', color: 'emerald' },
  { key: 'maintenanceCost', name: 'Maintenance Cost', icon: 'Wrench', color: 'purple' },
  { key: 'performanceAcceleration', name: 'Performance & Torque', icon: 'Rocket', color: 'orange' },
];

const BIKE_PRIORITY_MAP = {
  'Mileage / Running Cost': 'mileageRunningCost',
  'Mileage': 'mileageRunningCost',
  'Running Cost': 'mileageRunningCost',
  'Ergonomic Flat-Foot Reach': 'ergonomicFlatFoot',
  'Flat-Foot Reach': 'ergonomicFlatFoot',
  'Rider Weight & Low-Speed Balance': 'riderWeightHandling',
  'Rider Weight Balance': 'riderWeightHandling',
  'City Traffic Agility': 'cityTrafficAgility',
  'Pillion Passenger Comfort': 'pillionComfort',
  'Pillion Comfort': 'pillionComfort',
  'Underseat Storage & Utility': 'underseatStorage',
  'Underseat Storage': 'underseatStorage',
  'Highway Touring Poise': 'highwayTouringPoise',
  'Braking Safety (ABS/CBS)': 'brakingSafety',
  'Braking Safety': 'brakingSafety',
  'Maintenance & Spare Parts Cost': 'maintenanceCost',
  'Maintenance Cost': 'maintenanceCost',
  'Performance & Instant Torque': 'performanceAcceleration',
  'Performance': 'performanceAcceleration',
};

export function evaluateBikeSuitability(bike, profile = {}) {
  const base = bike.baseScores || {
    mileageRunningCost: 8,
    ergonomicFlatFoot: 8,
    riderWeightHandling: 8,
    cityTrafficAgility: 8,
    pillionComfort: 7,
    underseatStorage: 5,
    highwayTouringPoise: 7,
    brakingSafety: 8,
    maintenanceCost: 8,
    performanceAcceleration: 7,
  };

  const scores = { ...base };
  const userPriorities = profile.topPriorities || ['Mileage / Running Cost', 'Ergonomic Flat-Foot Reach', 'City Traffic Agility'];
  const mappedPriorities = userPriorities.map(p => BIKE_PRIORITY_MAP[p] || p);

  const riderHeight = profile.riderHeight || profile.height || 172; // in cm
  const riderWeight = profile.riderWeight || 68; // in kg
  const riderInseam = profile.riderInseam || Math.round(riderHeight * 0.45); // approximate inseam (e.g. 77cm for 172cm)

  // ==========================================
  // PHASE 1: HARD GATES (ELIGIBILITY)
  // ==========================================
  const filteredOutReasons = [];
  let isEligible = true;

  // 1.1: EV Charging Gate
  if (bike.chargingRequired === true) {
    const hasSocket = profile.hasHomeCharging === true || profile.nearbyFastCharging === true;
    if (!hasSocket) {
      isEligible = false;
      filteredOutReasons.push('Requires home 5A/15A socket or nearby EV fast charger for daily charging');
    }
  }

  // 1.2: Novice Rider Safety Gate
  const isBeginner = (profile.yearsExperience ?? 5) <= 1 || profile.confidenceLevel === 'Nervous';
  if (isBeginner) {
    if (bike.engineCC > 350 || bike.kerbWeight > 190 || bike.beginnerFriendly === false) {
      isEligible = false;
      filteredOutReasons.push(`Heavy weight (${bike.kerbWeight}kg) and large engine displacement are demanding for a novice rider`);
    }
  }

  // 1.3: Extreme Flat-Foot Safety Boundary
  if (riderHeight < 155 && bike.seatHeight >= 810) {
    isEligible = false;
    filteredOutReasons.push(`Tall seat height (${bike.seatHeight}mm) creates high risk of tipping over at standstill for rider height ${riderHeight}cm`);
  }

  // ==========================================
  // PHASE 2: SOFT SCORING
  // ==========================================

  // 2.1: ERGONOMIC FLAT-FOOT REACH CALCULATION
  if (bike.seatHeight <= 770) {
    // Low seat (Activa, Jupiter): anyone can flat foot
    scores.ergonomicFlatFoot = 10;
  } else if (bike.seatHeight <= 790) {
    // Moderate seat (Hunter 350, Splendor)
    if (riderHeight >= 160) scores.ergonomicFlatFoot = 9;
    else scores.ergonomicFlatFoot = 7;
  } else if (bike.seatHeight >= 805) {
    // Tall seat (Classic 350, MT-15, Ola S1 Pro)
    if (riderHeight >= 178) {
      scores.ergonomicFlatFoot = 10; // Perfect tall rider posture
    } else if (riderHeight >= 168) {
      scores.ergonomicFlatFoot = 7; // Manageable
    } else {
      scores.ergonomicFlatFoot = Math.max(3, scores.ergonomicFlatFoot - 4); // Tiptoeing required
    }
  }

  // Tall rider cramp check
  if (riderHeight >= 185 && (bike.riderTriangle === 'Sporty Forward' || (bike.seatToFootpegHeight && bike.seatToFootpegHeight < 400))) {
    scores.ergonomicFlatFoot = Math.max(4, scores.ergonomicFlatFoot - 2);
  }

  // 2.2: RIDER WEIGHT vs KERB WEIGHT MATCHING
  if (riderWeight < 58 && bike.kerbWeight >= 185) {
    // Lightweight rider on heavy cruiser (e.g. 52kg rider on 195kg Classic 350)
    scores.riderWeightHandling = Math.max(3, scores.riderWeightHandling - 3);
  } else if (riderWeight < 65 && bike.kerbWeight <= 140) {
    // Lightweight rider on agile lightweight bike (e.g. MT-15, Access)
    scores.riderWeightHandling = 10;
  } else if (riderWeight > 90 && bike.engineCC > 0 && bike.engineCC < 115) {
    // Heavy rider on 100cc commuter
    scores.riderWeightHandling = Math.max(5, scores.riderWeightHandling - 2);
    scores.performanceAcceleration = Math.max(4, scores.performanceAcceleration - 2);
  } else if (riderWeight >= 70 && bike.kerbWeight >= 180) {
    // Solid rider on heavy cruiser: good stability
    scores.riderWeightHandling = Math.min(10, scores.riderWeightHandling + 1);
  }

  // 2.3: PILLION COMFORT
  const pillionFreq = profile.pillionFrequency || 'Occasional';
  if (pillionFreq === 'Daily' || pillionFreq === 'Frequent') {
    if (bike.pillionSeatComfort >= 9) {
      scores.pillionComfort = 10;
    } else if (bike.pillionSeatComfort <= 5) {
      scores.pillionComfort = Math.max(2, scores.pillionComfort - 3);
    }
  }

  // 2.4: UNDERSEAT STORAGE & UTILITY
  const storageNeed = profile.storageRequirement || 'Medium';
  if (storageNeed === 'Heavy' || storageNeed === 'High') {
    if (bike.underseatStorageLitres >= 30) {
      scores.underseatStorage = 10; // Jupiter 125, Ola
    } else if (bike.underseatStorageLitres >= 18) {
      scores.underseatStorage = 8;
    } else {
      scores.underseatStorage = 2; // Motorcycles with 0L storage
    }
  }

  // 2.5: MILEAGE & RUNNING COST
  const dailyKm = profile.dailyKm || 30;
  if (dailyKm >= 45) {
    if (bike.fuelType === 'Electric' || (bike.mileageValue && bike.mileageValue >= 60)) {
      scores.mileageRunningCost = 10;
    } else if (bike.mileageValue && bike.mileageValue <= 38) {
      scores.mileageRunningCost = Math.max(4, scores.mileageRunningCost - 2);
    }
  }

  // 2.6: HIGHWAY vs CITY
  const highwayPct = profile.highwayPercent || 20;
  if (highwayPct >= 50) {
    if (bike.bodyType === 'Cruiser' || bike.kerbWeight >= 150) {
      scores.highwayTouringPoise = Math.min(10, scores.highwayTouringPoise + 1);
    } else if (bike.category === 'Scooter' || bike.engineCC < 120) {
      scores.highwayTouringPoise = Math.max(3, scores.highwayTouringPoise - 2);
    }
  }

  // Normalize scores to [1, 10]
  Object.keys(scores).forEach(k => {
    scores[k] = Math.max(1, Math.min(10, Math.round(scores[k])));
  });

  // ==========================================
  // PHASE 3: WEIGHTED AGGREGATION
  // ==========================================
  let totalWeightedScore = 0;
  let totalWeight = 0;
  const PRIORITY_WEIGHT = 2.8;
  const PHYSICAL_CONSTRAINT_WEIGHT = 1.6; // Flat-foot reach & Rider weight carry high baseline weight
  const STANDARD_WEIGHT = 1.0;

  BIKE_REQUIREMENT_CONFIG.forEach(req => {
    const isTopPriority = mappedPriorities.includes(req.key);
    let weight = STANDARD_WEIGHT;

    if (isTopPriority) weight = PRIORITY_WEIGHT;
    else if (req.key === 'ergonomicFlatFoot' || req.key === 'riderWeightHandling') weight = PHYSICAL_CONSTRAINT_WEIGHT;

    const scoreVal = scores[req.key] || 7;
    totalWeightedScore += scoreVal * weight * 10;
    totalWeight += weight;
  });

  let rawOverallScore = Math.round(totalWeightedScore / totalWeight);

  // Critical Requirement Compromise Check
  const criticalCompromises = [];
  userPriorities.forEach(priorityName => {
    const key = BIKE_PRIORITY_MAP[priorityName];
    if (key && scores[key] <= 4) {
      criticalCompromises.push({
        priority: priorityName,
        score: scores[key],
        reason: `${priorityName} is one of your top priorities, but this 2-wheeler scores only ${scores[key]}/10 for your profile.`
      });
    }
  });

  if (criticalCompromises.length > 0) {
    rawOverallScore = Math.min(rawOverallScore, 68);
  }

  // Budget Analysis (in Lakhs INR)
  const userBudget = profile.budget || 1.8;
  const basePrice = bike.priceFrom;
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

  if (!isEligible) {
    rawOverallScore = Math.min(rawOverallScore, 35);
  }

  let overallStatus = 'Very Suitable';
  if (!isEligible) overallStatus = 'Ineligible / Not Recommended';
  else if (rawOverallScore >= 85) overallStatus = 'Highly Suitable';
  else if (rawOverallScore >= 70) overallStatus = 'Very Suitable';
  else if (rawOverallScore >= 50) overallStatus = 'Consider Carefully';
  else overallStatus = 'Not Recommended';

  // Contextual Strengths and Considerations
  const strengths = [...(bike.inherentStrengths || [])];
  const considerations = [...(bike.inherentConsiderations || [])];

  if (scores.ergonomicFlatFoot === 10) {
    strengths.unshift(`Accessible seat height (${bike.seatHeight}mm) lets you comfortably flat-foot on both sides`);
  }
  if (scores.ergonomicFlatFoot <= 4) {
    considerations.unshift(`Tall seat height (${bike.seatHeight}mm) will require tiptoeing at traffic stops for your ${riderHeight}cm height`);
  }
  if (scores.riderWeightHandling <= 4) {
    considerations.unshift(`Heavy kerb weight (${bike.kerbWeight}kg) requires extra effort for your ${riderWeight}kg body weight in tight parking`);
  }
  if (pillionFreq === 'Daily' && bike.pillionSeatComfort <= 5) {
    considerations.unshift('Small pillion pad offers limited comfort for daily family passengers');
  }

  if (criticalCompromises.length > 0) {
    criticalCompromises.forEach(c => considerations.unshift(c.reason));
  }
  if (filteredOutReasons.length > 0) {
    filteredOutReasons.forEach(r => considerations.unshift(r));
  }

  return {
    overallScore: rawOverallScore,
    overallStatus,
    isEligible,
    filteredOutReasons,
    requirementScores: scores,
    requirementList: BIKE_REQUIREMENT_CONFIG.map(req => ({
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
    topStrengths: [...new Set(strengths)].slice(0, 4),
    considerations: [...new Set(considerations)].slice(0, 4),
  };
}

function getScoreLevel(score) {
  if (score >= 9) return { label: 'Excellent', colorClass: 'text-emerald-500', barBg: 'bg-emerald-500' };
  if (score >= 7) return { label: 'Good', colorClass: 'text-blue-500', barBg: 'bg-blue-500' };
  if (score >= 4) return { label: 'Average', colorClass: 'text-amber-500', barBg: 'bg-amber-500' };
  return { label: 'Poor', colorClass: 'text-rose-500', barBg: 'bg-rose-500' };
}
