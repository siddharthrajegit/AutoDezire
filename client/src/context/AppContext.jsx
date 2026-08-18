import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_VEHICLES } from '../data/initialVehicles';
import { evaluateSuitability } from '../services/clientSuitabilityEngine';
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
  
  // Passenger / Practicality
  regularPassengers: 2,
  maxPassengers: 5,
  hasChildren: false,
  hasElderly: false,
  luggageRequirement: 'Medium',
  pillionFrequency: 'Occasional',
  storageRequirement: 'Medium',
  
  // Financial
  budget: 14, // Lakhs
  expectedOwnershipYears: 5,
  runningCostImportance: 'High',
  
  // Top 3 Priorities (Max 3)
  topPriorities: ['Safety', 'Ground Clearance', 'Comfort'],
};

export function AppProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('autodezire_theme') || 'dark';
  });

  const [activeTab, setActiveTab] = useState('evaluation'); // default to evaluation to showcase reference UI immediately
  const [vehicles, setVehicles] = useState(INITIAL_VEHICLES);
  const [userProfile, setUserProfile] = useState(() => {
    const saved = localStorage.getItem('autodezire_profile');
    return saved ? JSON.parse(saved) : DEFAULT_PROFILE;
  });

  // Selected vehicle for Evaluation / AI context (Default: Tata Nexon matching screenshot)
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
    return saved ? JSON.parse(saved) : ['nexon', 'creta'];
  });

  // Compare list (Array of vehicle objects, max 3)
  const [compareList, setCompareList] = useState(() => {
    const nexon = INITIAL_VEHICLES.find(v => v.model === 'Nexon');
    const thar = INITIAL_VEHICLES.find(v => v.model === 'Thar');
    return [nexon, thar].filter(Boolean);
  });

  // Auth User
  const [currentUser, setCurrentUser] = useState(() => {
    const user = localStorage.getItem('autodezire_user');
    return user ? JSON.parse(user) : { name: 'Aryan', role: 'user', email: 'aryan@example.com' };
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);

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

  // Recalculate evaluation whenever selectedVehicle or userProfile changes
  useEffect(() => {
    if (selectedVehicle) {
      const evalResult = evaluateSuitability(selectedVehicle, userProfile);
      setEvaluation(evalResult);
    }
  }, [selectedVehicle, userProfile]);

  // Save profile changes
  const updateProfile = newProfile => {
    const updated = { ...userProfile, ...newProfile };
    setUserProfile(updated);
    localStorage.setItem('autodezire_profile', JSON.stringify(updated));
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
      const exists = prev.some(v => v.id === vehicle.id || v._id === vehicle._id);
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

  const evaluateVehicle = vehicle => {
    setSelectedVehicle(vehicle);
    setActiveTab('evaluation');
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
        userProfile,
        updateProfile,
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
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
