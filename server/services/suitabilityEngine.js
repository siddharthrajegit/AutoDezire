/**
 * AutoDezire Backend Core Suitability Engine v2
 * Matches client engine with:
 * - Driver/Rider Height Ergonomics
 * - Experience & Handleability Checks
 * - EV Charging Infrastructure Gating
 * - Priority Conflict Resolution
 */

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
  'Ergonomic Fit (Height & Headroom)': 'ergonomicFit',
  'Ergonomic Fit': 'ergonomicFit',
  'Handleability (Easy Driving & Parking)': 'handleability',
  'Handleability': 'handleability',
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
  { key: 'ergonomicFit', name: 'Ergonomic Fit', icon: 'PersonStanding', color: 'teal' },
  { key: 'handleability', name: 'Handleability', icon: 'Gauge', color: 'rose' },
];

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
    ergonomicFit: 8,
    handleability: 8,
  };

  const scores = { ...base };
  const userPriorities = profile.topPriorities || ['Safety', 'Comfort', 'Mileage / Running Cost'];
  const mappedPriorities = userPriorities.map(p => PRIORITY_MAP[p] || p);

  // PHASE 1: HARD GATES
  const filteredOutReasons = [];
  let isEligible = true;

  if (vehicle.chargingRequired === true) {
    const hasCharging = profile.hasHomeCharging === true || profile.nearbyFastCharging === true;
    if (!hasCharging) {
      isEligible = false;
      filteredOutReasons.push('Requires home socket (15A) or nearby DC fast charging access');
    }
  }

  const isBeginner = (profile.yearsExperience ?? 5) <= 1 || profile.confidenceLevel === 'Nervous';
  if (isBeginner) {
    if (vehicle.category === 'Car') {
      if (vehicle.engineCC > 1600 && (vehicle.driveType === '4WD' || vehicle.driveType === 'AWD' || vehicle.driveType === 'RWD')) {
        isEligible = false;
        filteredOutReasons.push(`High-power (${vehicle.engineCC}cc) ${vehicle.driveType} configuration is demanding for a novice driver`);
      } else if (vehicle.easeOfDriving === 'Demanding') {
        isEligible = false;
        filteredOutReasons.push('Demanding handling dynamics require seasoned driving experience');
      }
    } else if (vehicle.category === 'Motorcycle') {
      if (vehicle.engineCC > 350 || vehicle.kerbWeight > 190 || vehicle.beginnerFriendly === false) {
        isEligible = false;
        filteredOutReasons.push(`Heavy weight (${vehicle.kerbWeight}kg) and aggressive power require experienced motorcycle balance`);
      }
    }
  }

  const userHeight = profile.height || 175;
  if (vehicle.idealHeightMax && userHeight > (vehicle.idealHeightMax + 12)) {
    isEligible = false;
    filteredOutReasons.push(`Cabin headroom/legroom is physically restrictive for driver height of ${userHeight} cm`);
  } else if (vehicle.idealHeightMin && userHeight < (vehicle.idealHeightMin - 10)) {
    isEligible = false;
    filteredOutReasons.push(`Seat height and control reach are physically difficult for height below ${vehicle.idealHeightMin} cm`);
  }

  // PHASE 2: SOFT SCORING
  if (profile.hasChildren || profile.hasElderly || (profile.highwayPercent || 30) > 50) {
    if (vehicle.safetyRating >= 5) scores.safety = Math.min(10, scores.safety + 1);
    else if (vehicle.safetyRating <= 2) scores.safety = Math.max(2, scores.safety - 2);
  }

  const roadCondition = profile.roadConditions || 'Mixed with Potholes';
  if (roadCondition.includes('Bad') || roadCondition.includes('Potholes') || roadCondition.includes('Broken') || (profile.ruralPercent || 10) > 25) {
    if (vehicle.groundClearance >= 200) scores.groundClearance = Math.min(10, scores.groundClearance + 1);
    else if (vehicle.groundClearance < 170) scores.groundClearance = Math.max(3, scores.groundClearance - 2);
  }

  const passengers = profile.regularPassengers || 2;
  if (passengers >= 5 && vehicle.seatingCapacity < 5) {
    scores.spacePracticality = Math.max(2, scores.spacePracticality - 3);
  }
  if (profile.luggageRequirement === 'Heavy' && (vehicle.bootSpace || 300) > 420) {
    scores.spacePracticality = Math.min(10, scores.spacePracticality + 1);
  } else if (profile.luggageRequirement === 'Heavy' && (vehicle.bootSpace || 300) < 220) {
    scores.spacePracticality = Math.max(2, scores.spacePracticality - 2);
  }

  const dailyKm = profile.dailyKm || 35;
  if (dailyKm >= 50) {
    if (vehicle.fuelType === 'Electric' || (vehicle.mileageValue && vehicle.mileageValue >= 23)) {
      scores.mileageRunningCost = 10;
    } else if (vehicle.mileageValue && vehicle.mileageValue <= 13) {
      scores.mileageRunningCost = Math.max(2, scores.mileageRunningCost - 2);
    }
  }

  const highwayPct = profile.highwayPercent || 30;
  const cityPct = profile.cityPercent || 60;

  if (highwayPct >= 55) {
    if (vehicle.bodyType === 'Sedan' || (vehicle.wheelbase >= 2600 && vehicle.kerbWeight > 1200)) {
      scores.highwayStability = Math.min(10, scores.highwayStability + 1);
    }
    if (vehicle.category === 'Scooter' || (vehicle.bodyType === 'SUV' && vehicle.groundClearance > 220)) {
      scores.highwayStability = Math.max(3, scores.highwayStability - 1);
    }
  }

  if (cityPct >= 65) {
    if (vehicle.length <= 3900 || vehicle.category === 'Scooter') {
      scores.cityDriveSuitability = Math.min(10, scores.cityDriveSuitability + 1);
    } else if (vehicle.length > 4600) {
      scores.cityDriveSuitability = Math.max(4, scores.cityDriveSuitability - 2);
    }
  }

  // Ergonomic Fit
  if (vehicle.category === 'Car') {
    if (userHeight >= 183) {
      if (vehicle.cabinHeadroom >= 1020 || vehicle.roofHeight >= 1660) {
        scores.ergonomicFit = 10;
      } else if (vehicle.roofHeight <= 1500 || vehicle.cabinHeadroom <= 930) {
        scores.ergonomicFit = Math.max(3, scores.ergonomicFit - 3);
      }
    } else if (userHeight <= 158) {
      if (vehicle.groundClearance > 220) {
        scores.ergonomicFit = Math.max(3, scores.ergonomicFit - 2);
      }
    }
  } else if (vehicle.category === 'Motorcycle' || vehicle.category === 'Scooter') {
    if (userHeight <= 162 && vehicle.seatHeight >= 800) {
      scores.ergonomicFit = Math.max(3, scores.ergonomicFit - 3);
    } else if (userHeight >= 183 && vehicle.riderTriangle === 'Sporty Forward') {
      scores.ergonomicFit = Math.max(4, scores.ergonomicFit - 2);
    }
  }

  // Handleability
  const userConfidence = profile.confidenceLevel || 'Confident';
  const yearsExp = profile.yearsExperience ?? 5;

  if (yearsExp <= 2 || userConfidence === 'Nervous' || userConfidence === 'Getting Comfortable') {
    if (vehicle.easeOfDriving === 'Very Easy' && (vehicle.turningRadius || 5.0) <= 4.8) {
      scores.handleability = 10;
    } else if (vehicle.easeOfDriving === 'Demanding' || (vehicle.turningRadius || 5.0) > 5.6) {
      scores.handleability = Math.max(2, scores.handleability - 3);
    } else if (vehicle.parkingDifficulty === 'Difficult' || (vehicle.length || 4000) > 4500) {
      scores.handleability = Math.max(3, scores.handleability - 2);
    }
  }

  if (profile.parkingType === 'Narrow Street') {
    if ((vehicle.turningRadius || 5.0) <= 4.8) scores.handleability = Math.min(10, scores.handleability + 1);
    else if ((vehicle.width || 1700) > 1820) scores.handleability = Math.max(3, scores.handleability - 2);
  }

  if (profile.primaryTerrain === 'Steep Ghats / Mountains') {
    if (vehicle.driveType === '4WD' || vehicle.driveType === 'AWD') scores.performance = Math.min(10, scores.performance + 1);
    else if (vehicle.engineCC > 0 && vehicle.engineCC < 1050 && vehicle.category === 'Car') scores.performance = Math.max(3, scores.performance - 2);
  }

  // PHASE 3: CONFLICT RESOLUTION
  if (userHeight >= 183 && vehicle.bodyType === 'Sedan') {
    if (mappedPriorities.includes('comfort') || mappedPriorities.includes('ergonomicFit')) {
      scores.comfort = Math.max(4, scores.comfort - 2);
      scores.ergonomicFit = Math.max(4, scores.ergonomicFit - 2);
    } else if (!mappedPriorities.includes('highwayStability')) {
      scores.comfort = Math.max(5, scores.comfort - 1);
      scores.ergonomicFit = Math.max(5, scores.ergonomicFit - 1);
    }
  }

  if (profile.hasElderly && vehicle.category === 'Car' && vehicle.groundClearance > 215) {
    if (mappedPriorities.includes('comfort')) {
      scores.comfort = Math.max(3, scores.comfort - 2);
    }
  }

  // Normalize scores
  Object.keys(scores).forEach(k => {
    scores[k] = Math.max(1, Math.min(10, Math.round(scores[k])));
  });

  // PHASE 4: AGGREGATION
  let totalWeightedScore = 0;
  let totalWeight = 0;
  const PRIORITY_WEIGHT = 2.8;
  const PHYSICAL_CONSTRAINT_WEIGHT = 1.5;
  const STANDARD_WEIGHT = 1.0;

  REQUIREMENT_KEYS.forEach(req => {
    const isTopPriority = mappedPriorities.includes(req.key);
    let weight = STANDARD_WEIGHT;

    if (isTopPriority) weight = PRIORITY_WEIGHT;
    else if (req.key === 'ergonomicFit' || req.key === 'handleability') weight = PHYSICAL_CONSTRAINT_WEIGHT;

    const scoreVal = scores[req.key] || 7;
    totalWeightedScore += scoreVal * weight * 10;
    totalWeight += weight;
  });

  let rawOverallScore = Math.round(totalWeightedScore / totalWeight);

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
    rawOverallScore = Math.min(rawOverallScore, 68);
  }

  const userBudget = profile.budget || 14;
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

  if (!isEligible) {
    rawOverallScore = Math.min(rawOverallScore, 35);
  }

  let overallStatus = 'Very Suitable';
  if (!isEligible) overallStatus = 'Ineligible / Not Recommended';
  else if (rawOverallScore >= 85) overallStatus = 'Highly Suitable';
  else if (rawOverallScore >= 70) overallStatus = 'Very Suitable';
  else if (rawOverallScore >= 50) overallStatus = 'Consider Carefully';
  else overallStatus = 'Not Recommended';

  const strengths = [...(vehicle.inherentStrengths || [])];
  const considerations = [...(vehicle.inherentConsiderations || [])];

  if (userHeight >= 183 && scores.ergonomicFit >= 9 && vehicle.category === 'Car') {
    strengths.unshift(`Generous cabin headroom (${vehicle.cabinHeadroom || 1000}mm) and high roofline comfortably accommodate your 6ft+ height`);
  }
  if (userHeight >= 183 && scores.ergonomicFit <= 5 && vehicle.category === 'Car') {
    considerations.unshift(`Low roofline and cabin headroom may feel restrictive for your ${userHeight} cm (6ft+) height`);
  }
  if (isBeginner && scores.handleability >= 9) {
    strengths.unshift('Lightweight steering, compact turning radius, and predictable controls make it exceptionally confidence-inspiring for new drivers');
  }
  if (isBeginner && scores.handleability <= 5) {
    considerations.unshift('Heavy dimensions and high engine power demand seasoned driving experience in crowded traffic');
  }

  if (criticalCompromises.length > 0) {
    criticalCompromises.forEach(c => considerations.unshift(c.reason));
  }
  if (filteredOutReasons.length > 0) {
    filteredOutReasons.forEach(r => considerations.unshift(r));
  }

  return {
    vehicleId: vehicle._id || vehicle.id,
    brand: vehicle.brand,
    model: vehicle.model,
    category: vehicle.category,
    bodyType: vehicle.bodyType,
    overallScore: rawOverallScore,
    overallStatus,
    isEligible,
    filteredOutReasons,
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
    topStrengths: [...new Set(strengths)].slice(0, 4),
    considerations: [...new Set(considerations)].slice(0, 4),
  };
}

function getScoreLevel(score) {
  if (score >= 9) return { label: 'Excellent', color: 'text-emerald-500 bg-emerald-500/10' };
  if (score >= 7) return { label: 'Good', color: 'text-blue-500 bg-blue-500/10' };
  if (score >= 4) return { label: 'Average', color: 'text-amber-500 bg-amber-500/10' };
  return { label: 'Poor', color: 'text-rose-500 bg-rose-500/10' };
}

module.exports = {
  evaluateVehicleSuitability,
  REQUIREMENT_KEYS,
  PRIORITY_MAP
};
