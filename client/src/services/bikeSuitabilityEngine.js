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

  // ==========================================
  // PHASE 2: SOFT SCORING & ERGONOMIC FIT
  // ==========================================

  const seatH = bike.seatHeight || 790;
  const isWideSaddle = bike.seatWidth === 'Wide Sprung' || bike.seatWidth === 'Wide';
  const effectiveSeatH = isWideSaddle ? seatH + 15 : seatH;

  // 2.1: ERGONOMIC FLAT-FOOT REACH CALCULATION
  let flatFootStatus = 'comfortable'; // 'comfortable' | 'manageable' | 'tiptoe' | 'severe_hazard'
  let flatFootDetail = '';
  let flatFootPenalty = 0;

  if (effectiveSeatH <= 770) {
    scores.ergonomicFlatFoot = 10;
    flatFootStatus = 'comfortable';
    flatFootDetail = `Low ${seatH}mm seat allows your ${riderHeight}cm stature to plant both feet completely flat on the ground with relaxed knees for effortless balance at stops.`;
  } else if (effectiveSeatH <= 795) {
    if (riderHeight >= 168) {
      scores.ergonomicFlatFoot = 9;
      flatFootStatus = 'comfortable';
      flatFootDetail = `Moderate ${seatH}mm seat height gives your ${riderHeight}cm stature easy dual flat-foot contact and relaxed low-speed paddling.`;
    } else if (riderHeight >= 160) {
      scores.ergonomicFlatFoot = 7;
      flatFootStatus = 'manageable';
      flatFootDetail = `At ${seatH}mm seat height, you can touch with the balls of both feet; planting one foot flat at red lights is manageable.`;
    } else {
      scores.ergonomicFlatFoot = 4;
      flatFootStatus = 'tiptoe';
      flatFootPenalty = 14;
      flatFootDetail = `${seatH}mm seat height forces you onto your tiptoes at standstill for your ${riderHeight}cm height, causing instability on uneven road camber.`;
    }
  } else if (effectiveSeatH <= 820) {
    if (riderHeight >= 178) {
      scores.ergonomicFlatFoot = 10;
      flatFootStatus = 'comfortable';
      flatFootDetail = `Tall ${seatH}mm saddle perfectly accommodates your ${riderHeight}cm height for full dual flat-footing without leg cramping.`;
    } else if (riderHeight >= 172) {
      scores.ergonomicFlatFoot = 7;
      flatFootStatus = 'manageable';
      flatFootDetail = `At ${seatH}mm seat height${isWideSaddle ? ' with wide saddle arch' : ''}, you will touch with the balls of both feet; comfortable with a slight lean at red lights.`;
    } else if (riderHeight >= 165) {
      scores.ergonomicFlatFoot = 3;
      flatFootStatus = 'tiptoe';
      flatFootPenalty = 18;
      flatFootDetail = `Tall ${seatH}mm seat height${isWideSaddle ? ' combined with wide saddle' : ''} prevents flat-footing for your ${riderHeight}cm height (estimated inseam ${riderInseam}cm). You must balance on tiptoes.`;
    } else {
      scores.ergonomicFlatFoot = 2;
      flatFootStatus = 'severe_hazard';
      flatFootPenalty = 28;
      flatFootDetail = `Saddle height of ${seatH}mm is dangerously tall for your ${riderHeight}cm stature, creating extreme tip-over hazard at sudden stops or on gravel roads.`;
    }
  } else {
    // Seat height > 820mm (Adventure Tourers, tall Supersports, Panigale, Tiger, etc.)
    if (riderHeight >= 183) {
      scores.ergonomicFlatFoot = 9;
      flatFootStatus = 'comfortable';
      flatFootDetail = `High-clearance ${seatH}mm seat height is well-suited to your tall ${riderHeight}cm frame, offering commanding road vision.`;
    } else if (riderHeight >= 176) {
      scores.ergonomicFlatFoot = 6;
      flatFootStatus = 'manageable';
      flatFootDetail = `Tall ${seatH}mm adventure/sports seat allows single-foot flat down or balls of both feet for your ${riderHeight}cm height.`;
    } else if (riderHeight >= 168) {
      scores.ergonomicFlatFoot = 3;
      flatFootStatus = 'tiptoe';
      flatFootPenalty = 22;
      flatFootDetail = `Very tall ${seatH}mm seat height leaves your ${riderHeight}cm stature on steep tiptoes, making slow U-turns and traffic stops precarious.`;
    } else {
      scores.ergonomicFlatFoot = 1;
      flatFootStatus = 'severe_hazard';
      flatFootPenalty = 32;
      flatFootDetail = `Saddle height of ${seatH}mm is unmanageable for your ${riderHeight}cm height without lowering links; high tip-over risk at standstill.`;
    }
  }

  // Tall rider cramp check
  let isCramped = false;
  if (riderHeight >= 185 && (seatH <= 775 || bike.riderTriangle === 'Sporty Forward' || (bike.seatToFootpegHeight && bike.seatToFootpegHeight < 400))) {
    scores.ergonomicFlatFoot = Math.max(3, scores.ergonomicFlatFoot - 3);
    isCramped = true;
  }

  // 2.2: RIDER WEIGHT vs KERB WEIGHT MATCHING
  let weightHandlingPenalty = 0;
  let weightDetail = '';
  let isWeightMismatched = false;

  if (riderWeight < 58 && bike.kerbWeight >= 180) {
    scores.riderWeightHandling = Math.max(2, (scores.riderWeightHandling || 6) - 4);
    weightHandlingPenalty = 15;
    isWeightMismatched = true;
    weightDetail = `Heavyweight Kerb Mismatch: At ${bike.kerbWeight}kg, this bike is ${((bike.kerbWeight / riderWeight)).toFixed(1)}x your body weight. Reversing out of parking or holding the bike when stalled requires heavy physical exertion.`;
  } else if (riderWeight < 65 && bike.kerbWeight <= 140) {
    scores.riderWeightHandling = 10;
    weightDetail = `Featherweight Agility: Lightweight ${bike.kerbWeight}kg build is exceptionally easy to paddle backwards and balance in slow traffic for your ${riderWeight}kg build.`;
  } else if (riderWeight > 90 && bike.engineCC > 0 && bike.engineCC < 115) {
    scores.riderWeightHandling = Math.max(4, (scores.riderWeightHandling || 6) - 3);
    scores.performanceAcceleration = Math.max(3, (scores.performanceAcceleration || 6) - 3);
    weightHandlingPenalty = 12;
    isWeightMismatched = true;
    weightDetail = `Engine & Suspension Load: Small ${bike.engineCC}cc motor will experience sluggish acceleration and suspension sag carrying your ${riderWeight}kg weight on inclines.`;
  } else if (riderWeight >= 70 && bike.kerbWeight >= 180) {
    scores.riderWeightHandling = Math.min(10, (scores.riderWeightHandling || 7) + 2);
    weightDetail = `Solid High-Speed Poise: Your ${riderWeight}kg build provides good physical authority over this sturdy ${bike.kerbWeight}kg motorcycle.`;
  } else {
    scores.riderWeightHandling = 8;
    weightDetail = `Balanced weight ratio (${bike.kerbWeight}kg kerb weight vs ${riderWeight}kg rider) provides predictable low-speed stability.`;
  }

  // 2.3: PILLION COMFORT
  const pillionFreq = profile.pillionFrequency || 'Occasional';
  let pillionDetail = '';
  if (pillionFreq === 'Daily' || pillionFreq === 'Frequent') {
    if (bike.pillionSeatComfort >= 8) {
      scores.pillionComfort = 10;
      pillionDetail = 'Generous, cushioned rear seat with grab rails ensures relaxed daily commutes for your passenger.';
    } else if (bike.pillionSeatComfort <= 5) {
      scores.pillionComfort = Math.max(2, (scores.pillionComfort || 5) - 4);
      pillionDetail = 'Inadequate Pillion Pad: Narrow or stepped rear seat lacks sufficient cushion and back support for daily passenger usage.';
    } else {
      scores.pillionComfort = 7;
      pillionDetail = 'Moderate pillion comfort adequate for regular city trips.';
    }
  } else {
    pillionDetail = 'Adequate pillion capability for occasional solo or weekend passenger rides.';
  }

  // 2.4: UNDERSEAT STORAGE & UTILITY EVALUATION
  const storageNeed = profile.storageRequirement || 'Medium';
  const storageL = bike.underseatStorageLitres || 0;
  let storagePenalty = 0;
  let storageDetail = '';
  let isStorageMismatched = false;

  if (storageNeed === 'Heavy' || storageNeed === 'High') {
    // User explicitly needs 30L+ (2 helmets / extensive shopping)
    if (storageL >= 30) {
      scores.underseatStorage = 10;
      storageDetail = `Class-Leading Boot (${storageL} Litres): Easily accommodates 2 full helmets or large shopping bags, perfectly satisfying your Heavy storage requirement.`;
    } else if (storageL >= 20) {
      scores.underseatStorage = 6;
      storagePenalty = 8;
      storageDetail = `Moderate Storage (${storageL} Litres): Fits 1 helmet with light accessories, but falls short of your 30L+ two-helmet requirement.`;
    } else if (storageL >= 12) {
      scores.underseatStorage = 4;
      storagePenalty = 15;
      isStorageMismatched = true;
      storageDetail = `Limited Underseat Boot (${storageL}L): Inadequate for your Heavy storage requirement; external luggage or top box required.`;
    } else {
      scores.underseatStorage = 1;
      storagePenalty = 24; // Massive direct deduction for 0L motorcycle when Heavy storage needed!
      isStorageMismatched = true;
      storageDetail = `Zero Underseat Boot (0 Litres): Completely fails your Heavy 30L+ cargo requirement. Carrying helmets or groceries will require aftermarket carrier racks.`;
    }
  } else if (storageNeed === 'Medium') {
    // User needs 1 full-face helmet / daily grocery capacity
    if (storageL >= 26) {
      scores.underseatStorage = 10;
      storageDetail = `Spacious Boot Space (${storageL} Litres): Comfortably swallows 1 full-face helmet plus daily groceries, matching your Medium storage need.`;
    } else if (storageL >= 18) {
      scores.underseatStorage = 9;
      storageDetail = `Standard Boot Space (${storageL} Litres): Holds 1 full-face helmet or standard grocery bag with ease.`;
    } else if (storageL >= 10) {
      scores.underseatStorage = 6;
      storagePenalty = 6;
      storageDetail = `Compact Storage (${storageL} Litres): Can fit half-face helmet or rain coat, but tight for large grocery shopping.`;
    } else {
      scores.underseatStorage = 2;
      storagePenalty = 16; // Significant direct deduction for 0L motorcycle when Medium storage needed!
      isStorageMismatched = true;
      storageDetail = `Zero Underseat Boot (0 Litres): Lacks any lockable storage for a helmet or grocery bags, conflicting with your Medium utility requirement.`;
    }
  } else {
    // storageNeed === 'Light' (wallet, phone, documents)
    if (storageL >= 15) {
      scores.underseatStorage = 9;
      storageDetail = `Convenient ${storageL}L underseat compartment provides abundant room for your everyday essentials.`;
    } else if (storageL > 0) {
      scores.underseatStorage = 8;
      storageDetail = `Handy ${storageL}L boot space easily stores documents, wallet, and charger.`;
    } else {
      scores.underseatStorage = 7;
      storageDetail = `Zero underseat boot (0L), but adequate for light personal travel since essentials fit in rider pockets or a light sling.`;
    }
  }

  // 2.5: MILEAGE & RUNNING COST
  const dailyKm = profile.dailyKm || 30;
  let runningCostDetail = '';
  if (dailyKm >= 45) {
    if (bike.fuelType === 'Electric' || (bike.mileageValue && bike.mileageValue >= 60)) {
      scores.mileageRunningCost = 10;
      runningCostDetail = `High-Mileage Economy: Running on ${bike.fuelType === 'Electric' ? 'EV power (~₹0.25/km)' : `${bike.mileage} efficiency`} delivers substantial monthly savings on your ${dailyKm}km commute.`;
    } else if (bike.mileageValue && bike.mileageValue <= 35) {
      scores.mileageRunningCost = Math.max(3, (scores.mileageRunningCost || 6) - 3);
      runningCostDetail = `Heavy Fuel Expense: Low ${bike.mileage} efficiency will lead to significant monthly petrol bills on your ${dailyKm}km daily commute.`;
    }
  }

  // 2.6: HIGHWAY vs CITY & TOURING ERGONOMICS
  const highwayPct = profile.highwayPercent || 20;
  const dailyKmDist = profile.dailyKm || 30;
  let highwayFatiguePenalty = 0;

  if (highwayPct >= 50 || dailyKmDist >= 50) {
    if (bike.bodyType === 'Cruiser' || (bike.riderTriangle === 'Relaxed Cruiser' && bike.kerbWeight >= 150)) {
      scores.highwayTouringPoise = Math.min(10, (scores.highwayTouringPoise || 7) + 2);
    } else if (bike.category === 'Scooter' || bike.engineCC < 120) {
      scores.highwayTouringPoise = Math.max(2, (scores.highwayTouringPoise || 6) - 4);
    }

    // Aggressive Track Supersport Penalty on Long Highway / Daily Commute (e.g. R15)
    if (bike.riderTriangle === 'Sporty Forward' || bike.clipOnHandlebars === true || bike.bodyType === 'Track Supersport' || bike.bodyType === 'Supersport') {
      scores.highwayTouringPoise = Math.max(1, (scores.highwayTouringPoise || 4) - 5);
      highwayFatiguePenalty = 30;
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
  const PRIORITY_WEIGHT = 3.0;
  const PHYSICAL_CONSTRAINT_WEIGHT = 1.8; // Flat-foot reach & Rider weight carry high baseline weight
  const STANDARD_WEIGHT = 1.0;

  BIKE_REQUIREMENT_CONFIG.forEach(req => {
    const isTopPriority = mappedPriorities.includes(req.key);
    let weight = STANDARD_WEIGHT;

    if (isTopPriority) weight = PRIORITY_WEIGHT;
    else if (req.key === 'ergonomicFlatFoot' || req.key === 'riderWeightHandling') weight = PHYSICAL_CONSTRAINT_WEIGHT;
    else if (req.key === 'underseatStorage' && (storageNeed === 'Heavy' || storageNeed === 'Medium')) weight = 1.8;

    const scoreVal = scores[req.key] || 7;
    totalWeightedScore += scoreVal * weight * 10;
    totalWeight += weight;
  });

  let rawOverallScore = Math.round(totalWeightedScore / totalWeight);

  // ==========================================
  // DIRECT OPPOSING FEATURE DEDUCTIONS
  // ==========================================
  let opposingDeductions = 0;
  const opposingReasons = [];

  // Flat-foot Reach Deduction
  if (flatFootPenalty > 0) {
    opposingDeductions += flatFootPenalty;
    opposingReasons.push(flatFootDetail);
  }

  // Underseat Storage Deduction
  if (storagePenalty > 0) {
    opposingDeductions += storagePenalty;
    opposingReasons.push(storageDetail);
  }

  // Rider Weight Mismatch Deduction
  if (weightHandlingPenalty > 0) {
    opposingDeductions += weightHandlingPenalty;
    opposingReasons.push(weightDetail);
  }

  // Track Supersport on Highway/Daily Commute
  if (highwayFatiguePenalty > 0) {
    opposingDeductions += highwayFatiguePenalty;
    opposingReasons.push('Aggressive track ergonomics and low clip-on handlebars induce acute wrist, shoulder, and cervical spine fatigue on extended commutes.');
  }

  // Small Scooter on Fast Highway
  if (highwayPct >= 60 && (bike.category === 'Scooter' || (bike.engineCC > 0 && bike.engineCC <= 110))) {
    opposingDeductions += 25;
    opposingReasons.push('Small wheels and light kerb build make high-speed highway cruising and wind cross-drafts hazardous.');
  }

  // Deduct opposing penalties
  rawOverallScore = Math.max(10, rawOverallScore - opposingDeductions);

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

  // HARD CAPS: Do not hesitate to give low scores for severe mismatches!
  if (opposingDeductions >= 45 || criticalCompromises.length >= 2) {
    rawOverallScore = Math.min(rawOverallScore, 18);
  } else if (opposingDeductions >= 28 || criticalCompromises.length === 1) {
    rawOverallScore = Math.min(rawOverallScore, 35);
  } else if (criticalCompromises.length > 0) {
    rawOverallScore = Math.min(rawOverallScore, 48);
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

  // ==========================================
  // STRUCTURED PERSONALIZED PROS & CONS
  // ==========================================
  const personalizedPros = [];
  const personalizedCons = [];

  // 1. Flat-Foot Reach
  if (flatFootStatus === 'comfortable') {
    personalizedPros.push({
      tag: 'Flat-Foot Reach',
      title: 'Confident Dual Flat-Foot Reach',
      description: flatFootDetail
    });
  } else if (flatFootStatus === 'tiptoe') {
    personalizedCons.push({
      tag: 'Flat-Foot Problem',
      severity: 'warning',
      title: 'Tiptoe Reach Challenge',
      description: flatFootDetail
    });
  } else if (flatFootStatus === 'severe_hazard') {
    personalizedCons.push({
      tag: 'Flat-Foot Problem',
      severity: 'danger',
      title: 'Severe Tip-Over Hazard',
      description: flatFootDetail
    });
  }

  // 2. Storage Fit
  if (storageL >= 26) {
    personalizedPros.push({
      tag: 'Boot Storage',
      title: 'Spacious Underseat Storage',
      description: storageDetail
    });
  } else if (isStorageMismatched) {
    personalizedCons.push({
      tag: 'Storage Deficit',
      severity: storageNeed === 'Heavy' ? 'danger' : 'warning',
      title: storageL === 0 ? 'Zero Underseat Boot Space' : 'Inadequate Boot Capacity',
      description: storageDetail
    });
  }

  // 3. Weight & Handling Fit
  if (scores.riderWeightHandling === 10) {
    personalizedPros.push({
      tag: 'Weight Balance',
      title: 'Featherweight Agile Handling',
      description: weightDetail
    });
  } else if (isWeightMismatched) {
    personalizedCons.push({
      tag: 'Weight Balance',
      severity: 'warning',
      title: 'Weight & Physical Strain',
      description: weightDetail
    });
  }

  // 4. Running Cost
  if (scores.mileageRunningCost === 10 && dailyKm >= 35) {
    personalizedPros.push({
      tag: 'Running Cost',
      title: 'Ultra-Low Daily Running Cost',
      description: runningCostDetail || `Outstanding efficiency saves substantial fuel expenses on your ${dailyKm}km commute.`
    });
  } else if (scores.mileageRunningCost <= 4 && dailyKm >= 45) {
    personalizedCons.push({
      tag: 'Fuel Cost',
      severity: 'warning',
      title: 'High Monthly Fuel Expense',
      description: runningCostDetail || `Low fuel economy incurs heavy petrol expenditure across your ${dailyKm}km daily rides.`
    });
  }

  // 5. Pillion Fit
  if (pillionFreq === 'Daily' && scores.pillionComfort === 10) {
    personalizedPros.push({
      tag: 'Pillion Comfort',
      title: 'Excellent Daily Passenger Comfort',
      description: pillionDetail
    });
  } else if (pillionFreq === 'Daily' && scores.pillionComfort <= 4) {
    personalizedCons.push({
      tag: 'Pillion Discomfort',
      severity: 'warning',
      title: 'Unsuitable for Daily Passenger',
      description: pillionDetail
    });
  }

  // 6. Highway / Ergonomic Posture
  if (highwayFatiguePenalty > 0) {
    personalizedCons.push({
      tag: 'Rider Posture',
      severity: 'danger',
      title: 'Severe Highway Wrist/Neck Fatigue',
      description: 'Aggressive forward-crouch track ergonomics and clip-on low handlebars induce acute wrist, shoulder, and cervical spine fatigue on extended rides.'
    });
  } else if (isCramped) {
    personalizedCons.push({
      tag: 'Legroom',
      severity: 'warning',
      title: 'Cramped Knee & Hip Angles',
      description: `Low ${seatH}mm seat causes tight knee bending and leg cramping for your tall ${riderHeight}cm frame on long journeys.`
    });
  }

  // Contextual Strengths and Considerations lists (for backward compatibility & views)
  const strengths = [
    ...personalizedPros.map(p => `[${p.tag}] ${p.description}`),
    ...(bike.inherentStrengths || [])
  ];

  const considerations = [
    ...personalizedCons.map(c => `[${c.tag}] ${c.description}`),
    ...criticalCompromises.map(c => c.reason),
    ...filteredOutReasons,
    ...(bike.inherentConsiderations || [])
  ];

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
    personalizedPros,
    personalizedCons,
    personalizedFit: {
      flatFoot: {
        status: flatFootStatus,
        seatHeight: seatH,
        effectiveSeatHeight: effectiveSeatH,
        riderHeight,
        riderInseam,
        detail: flatFootDetail
      },
      weightBalance: {
        kerbWeight: bike.kerbWeight,
        riderWeight,
        ratio: bike.kerbWeight && riderWeight ? (bike.kerbWeight / riderWeight).toFixed(1) : '2.5',
        detail: weightDetail
      },
      storage: {
        storageLitres: storageL,
        storageRequirement: storageNeed,
        isMismatched: isStorageMismatched,
        detail: storageDetail
      },
      pillion: {
        frequency: pillionFreq,
        comfortScore: scores.pillionComfort,
        detail: pillionDetail
      }
    },
    topStrengths: [...new Set(strengths)].slice(0, 6),
    considerations: [...new Set(considerations)].slice(0, 6),
  };
}

function getScoreLevel(score) {
  if (score >= 9) return { label: 'Excellent', colorClass: 'text-emerald-500', barBg: 'bg-emerald-500' };
  if (score >= 7) return { label: 'Good', colorClass: 'text-blue-500', barBg: 'bg-blue-500' };
  if (score >= 4) return { label: 'Average', colorClass: 'text-amber-500', barBg: 'bg-amber-500' };
  return { label: 'Poor', colorClass: 'text-rose-500', barBg: 'bg-rose-500' };
}
