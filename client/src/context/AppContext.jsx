import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { INITIAL_VEHICLES } from '../data/initialVehicles';
import { BIKES_DATA } from '../data/bikesData';
import { evaluateSuitability } from '../services/clientSuitabilityEngine';
import { evaluateBikeSuitability } from '../services/bikeSuitabilityEngine';
import { fetchVehicles } from '../services/api';

const AppContext = createContext();

const DEFAULT_PROFILE = {
  name: 'Aryan',
  height: 178, // cm
  age: 27,
  categoryPreference: 'All', // All, Car, Motorcycle, Scooter
  
  // Experience
  yearsExperience: 5,
  totalKm: 35000,
  confidenceLevel: 'Confident', // 'Nervous' | 'Getting Comfortable' | 'Confident' | 'Very Confident'
  previousVehicles: 'Hatchback',
  cityExperience: 8,
  highwayExperience: 7,
  ruralExperience: 5,
  hillsExperience: 5,
  roughRoadExperience: 6,
  
  // Usage
  dailyKm: 35,
  monthlyKm: 1100,
  cityPercent: 60,
  highwayPercent: 30,
  ruralPercent: 10,
  journeyDurationMinutes: 45,
  longDistanceFrequency: 'Monthly',
  roadConditions: 'Mixed with Potholes',
  parkingType: 'Open Driveway', // 'Open Driveway' | 'Narrow Street' | 'Apartment Basement' | 'Shared Parking'
  primaryTerrain: 'Flat Plains', // 'Flat Plains' | 'Moderate Hills' | 'Steep Ghats / Mountains'
  
  // Passenger / Practicality
  regularPassengers: 2,
  maxPassengers: 5,
  hasChildren: false,
  hasElderly: false,
  luggageRequirement: 'Medium',
  pillionFrequency: 'Occasional',
  storageRequirement: 'Medium',
  
  // Financial & Infrastructure
  budget: 14, // Lakhs
  expectedOwnershipYears: 5,
  runningCostImportance: 'High',
  hasHomeCharging: false,
  nearbyFastCharging: false,
  
  // Top 3 Priorities (Max 3)
  topPriorities: ['Safety', 'Ground Clearance', 'Comfort'],
};

const DEFAULT_BIKE_PROFILE = {
  name: 'Aryan',
  riderHeight: 172, // in cm
  riderInseam: 77, // in cm (flat-foot threshold)
  riderWeight: 68, // in kg (key factor)
  age: 27,
  categoryPreference: 'All', // 'All' | 'Motorcycle' | 'Scooter' | 'Electric Scooter'
  
  // Experience
  yearsExperience: 4,
  totalKm: 20000,
  confidenceLevel: 'Confident', // 'Nervous' | 'Getting Comfortable' | 'Confident' | 'Very Confident'
  riderTriangle: 'Upright Commuter', // 'Upright Commuter' | 'Relaxed Cruiser' | 'Sporty Forward'
  
  // Usage & Passengers
  pillionFrequency: 'Occasional', // 'Solo' | 'Occasional' | 'Daily'
  storageRequirement: 'Medium', // 'Light' | 'Medium' | 'Heavy'
  dailyKm: 30,
  highwayPercent: 20,
  
  // Budget & Charging
  budget: 1.8, // in Lakhs INR (e.g. ₹1.80 Lakh)
  hasHomeCharging: false,
  nearbyFastCharging: false,
  
  // Top 3 Priorities
  topPriorities: ['Mileage / Running Cost', 'Ergonomic Flat-Foot Reach', 'City Traffic Agility'],
};

export function AppProvider({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('autodezire_theme') || 'dark';
  });

  const [vehicles, setVehicles] = useState(INITIAL_VEHICLES);
  const [bikes, setBikes] = useState(BIKES_DATA);

  // Active Vehicle Mode ('4-wheeler' for Cars, '2-wheeler' for Bikes/Scooters)
  const [selectedVehicleType, setSelectedVehicleType] = useState(() => {
    return localStorage.getItem('autodezire_vehicle_type') || '4-wheeler';
  });

  // Car User Profile
  const [userProfile, setUserProfile] = useState(() => {
    const saved = localStorage.getItem('autodezire_profile');
    return saved ? JSON.parse(saved) : DEFAULT_PROFILE;
  });

  // 2-Wheeler / Bike User Profile
  const [bikeProfile, setBikeProfile] = useState(() => {
    const saved = localStorage.getItem('autodezire_bike_profile');
    return saved ? JSON.parse(saved) : DEFAULT_BIKE_PROFILE;
  });

  // Selected vehicle for Evaluation / AI context
  const [selectedVehicle, setSelectedVehicle] = useState(() => {
    return INITIAL_VEHICLES.find(v => v.model === 'Nexon') || INITIAL_VEHICLES[0];
  });

  // Evaluation calculation
  const [evaluation, setEvaluation] = useState(() => {
    const defaultVeh = INITIAL_VEHICLES.find(v => v.model === 'Nexon') || INITIAL_VEHICLES[0];
    return evaluateSuitability(defaultVeh, DEFAULT_PROFILE);
  });

  // Saved vehicles (Garage / Wishlist)
  const [savedVehicles, setSavedVehicles] = useState(() => {
    const saved = localStorage.getItem('autodezire_saved');
    return saved ? JSON.parse(saved) : ['nexon', 'classic_350'];
  });

  // Compare list (Array of vehicle objects, max 3)
  const [compareList, setCompareList] = useState(() => {
    const nexon = INITIAL_VEHICLES.find(v => v.model === 'Nexon');
    const wagonr = INITIAL_VEHICLES.find(v => v.model === 'WagonR');
    return [nexon, wagonr].filter(Boolean);
  });

  // Auth User
  const [currentUser, setCurrentUser] = useState(() => {
    const user = localStorage.getItem('autodezire_user');
    return user ? JSON.parse(user) : { name: 'Aryan', role: 'user', email: 'aryan@example.com' };
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Scroll-Scrubbed Video Entry state
  const [entryVehicleType, setEntryVehicleType] = useState('4-wheeler'); // '4-wheeler' or '2-wheeler'
  const [showScrollScrubbing, setShowScrollScrubbing] = useState(false);

  // Synchronize activeTab reactively from current URL pathname
  const getTabFromPath = pathname => {
    const clean = pathname.replace(/^\//, '') || 'home';
    if (clean.startsWith('evaluation')) return 'evaluation';
    if (clean.startsWith('ai-advisor')) return 'ai-advisor';
    return clean;
  };

  const activeTab = getTabFromPath(location.pathname);

  const setActiveTab = tab => {
    if (tab === 'home' || tab === '') {
      navigate('/');
    } else {
      navigate(`/${tab}`);
    }
  };

  const evaluateVehicle = vehicle => {
    setSelectedVehicle(vehicle);
    const isBike = vehicle.category === 'Motorcycle' || vehicle.category === 'Scooter' || vehicle.category === 'Electric Scooter';
    if (isBike && selectedVehicleType !== '2-wheeler') {
      setSelectedVehicleType('2-wheeler');
    } else if (!isBike && selectedVehicleType !== '4-wheeler') {
      setSelectedVehicleType('4-wheeler');
    }
    const vId = vehicle.id || vehicle._id;
    if (vId) {
      navigate(`/evaluation/${vId}`);
    } else {
      navigate('/evaluation');
    }
  };

  // Sync theme with DOM classList
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('autodezire_theme', theme);
  }, [theme]);

  // Load latest vehicles from server if available
  useEffect(() => {
    async function load() {
      const data = await fetchVehicles();
      if (data && data.length > 0) {
        setVehicles(data);
      }
    }
    load();
  }, []);

  // Recalculate evaluation whenever selectedVehicle, userProfile, or bikeProfile changes
  useEffect(() => {
    if (selectedVehicle) {
      const isBike = selectedVehicle.category === 'Motorcycle' || selectedVehicle.category === 'Scooter' || selectedVehicle.category === 'Electric Scooter';
      if (isBike) {
        const evalResult = evaluateBikeSuitability(selectedVehicle, bikeProfile);
        setEvaluation(evalResult);
      } else {
        const evalResult = evaluateSuitability(selectedVehicle, userProfile);
        setEvaluation(evalResult);
      }
    }
  }, [selectedVehicle, userProfile, bikeProfile]);

  // Save profile changes for Cars
  const updateProfile = newProfile => {
    const updated = { ...userProfile, ...newProfile };
    setUserProfile(updated);
    localStorage.setItem('autodezire_profile', JSON.stringify(updated));
  };

  // Save profile changes for Bikes
  const updateBikeProfile = newProfile => {
    const updated = { ...bikeProfile, ...newProfile };
    setBikeProfile(updated);
    localStorage.setItem('autodezire_bike_profile', JSON.stringify(updated));
  };

  // Set vehicle mode and persist
  const setVehicleMode = type => {
    setSelectedVehicleType(type);
    setEntryVehicleType(type);
    localStorage.setItem('autodezire_vehicle_type', type);
  };

  // Toggle Saved Vehicle
  const toggleSaveVehicle = vehicleId => {
    setSavedVehicles(prev => {
      const next = prev.includes(vehicleId)
        ? prev.filter(id => id !== vehicleId)
        : [...prev, vehicleId];
      localStorage.setItem('autodezire_saved', JSON.stringify(next));
      return next;
    });
  };

  // Toggle Compare Vehicle
  const toggleCompare = vehicle => {
    setCompareList(prev => {
      const exists = prev.some(v => (v.id || v._id) === (vehicle.id || vehicle._id));
      if (exists) {
        return prev.filter(v => (v.id || v._id) !== (vehicle.id || vehicle._id));
      }
      if (prev.length >= 3) {
        return [prev[1], prev[2], vehicle]; // slide window of 3
      }
      return [...prev, vehicle];
    });
  };

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        activeTab,
        setActiveTab,
        vehicles,
        setVehicles,
        bikes,
        setBikes,
        selectedVehicleType,
        setSelectedVehicleType: setVehicleMode,
        userProfile,
        updateProfile,
        bikeProfile,
        updateBikeProfile,
        selectedVehicle,
        setSelectedVehicle,
        evaluation,
        evaluateVehicle,
        savedVehicles,
        toggleSaveVehicle,
        compareList,
        setCompareList,
        toggleCompare,
        currentUser,
        setCurrentUser,
        isAuthModalOpen,
        setIsAuthModalOpen,
        isAiModalOpen,
        setIsAiModalOpen,
        isMobileMenuOpen,
        setIsMobileMenuOpen,
        entryVehicleType,
        setEntryVehicleType,
        showScrollScrubbing,
        setShowScrollScrubbing,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
