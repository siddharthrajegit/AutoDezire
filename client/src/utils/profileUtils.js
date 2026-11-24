/**
 * Profile & Suitability Score Visibility Helpers
 *
 * Ensures suitability scores are never shown to unauthenticated users
 * and never assumed from defaults before a logged-in user fills & submits
 * the questionnaire form.
 */

export const EMPTY_CAR_PROFILE = {
  name: '',
  height: null,
  age: null,
  categoryPreference: 'All',
  yearsExperience: null,
  totalKm: '',
  confidenceLevel: '',
  previousVehicles: '',
  dailyKm: null,
  highwayPercent: null,
  ruralPercent: 10,
  roadConditions: '',
  parkingType: '',
  primaryTerrain: '',
  regularPassengers: '',
  hasChildren: false,
  hasElderly: false,
  luggageRequirement: '',
  budget: null,
  expectedOwnershipYears: '',
  runningCostImportance: '',
  hasHomeCharging: false,
  nearbyFastCharging: false,
  fuelPreference: 'All',
  topPriorities: [],
  _completed: false,
};

export const EMPTY_BIKE_PROFILE = {
  name: '',
  riderHeight: null,
  riderInseam: null,
  riderWeight: null,
  age: null,
  categoryPreference: '',
  yearsExperience: null,
  totalKm: '',
  confidenceLevel: '',
  riderTriangle: '',
  pillionFrequency: '',
  storageRequirement: '',
  dailyKm: null,
  highwayPercent: 20,
  budget: null,
  hasHomeCharging: false,
  nearbyFastCharging: false,
  topPriorities: [],
  _completed: false,
};

export function getUserStorageKey(user) {
  if (!user) return null;
  const raw = user.id || user._id || user.email || user.name;
  return raw ? String(raw).trim().toLowerCase() : null;
}

export function getCarProfileStorageKey(user) {
  const key = getUserStorageKey(user);
  return key ? `autodezire_car_profile_v2_${key}` : null;
}

export function getBikeProfileStorageKey(user) {
  const key = getUserStorageKey(user);
  return key ? `autodezire_bike_profile_v2_${key}` : null;
}

export function isTwoWheelerVehicle(vehicle) {
  if (!vehicle) return false;
  return (
    vehicle.category === 'Motorcycle' ||
    vehicle.category === 'Scooter' ||
    vehicle.category === 'Electric Scooter'
  );
}

export function isCarProfileComplete(user, profile) {
  if (!user || !profile || profile._completed !== true) return false;
  const hasHeight = typeof profile.height === 'number' && profile.height > 0;
  const hasAge = typeof profile.age === 'number' && profile.age > 0;
  const hasExp = typeof profile.yearsExperience === 'number' && profile.yearsExperience >= 0;
  const hasBudget = typeof profile.budget === 'number' && profile.budget > 0;
  const hasPriorities = Array.isArray(profile.topPriorities) && profile.topPriorities.length > 0;
  return hasHeight && hasAge && hasExp && hasBudget && hasPriorities;
}

export function isBikeProfileComplete(user, profile) {
  if (!user || !profile || profile._completed !== true) return false;
  const hasHeight = typeof profile.riderHeight === 'number' && profile.riderHeight > 0;
  const hasWeight = typeof profile.riderWeight === 'number' && profile.riderWeight > 0;
  const hasExp = typeof profile.yearsExperience === 'number' && profile.yearsExperience >= 0;
  const hasBudget = typeof profile.budget === 'number' && profile.budget > 0;
  const hasPriorities = Array.isArray(profile.topPriorities) && profile.topPriorities.length > 0;
  return hasHeight && hasWeight && hasExp && hasBudget && hasPriorities;
}

export function formatBudgetLakh(budget) {
  if (typeof budget !== 'number' || Number.isNaN(budget) || budget <= 0) return 'N/A';
  return budget >= 100
    ? `${budget}L (${(budget / 100).toFixed(2)} Cr)`
    : `${budget}L`;
}
