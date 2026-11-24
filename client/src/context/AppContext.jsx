import React, { createContext, useContext, useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { INITIAL_VEHICLES } from '../data/initialVehicles';
import { BIKES_DATA } from '../data/bikesData';
import { evaluateSuitability } from '../services/clientSuitabilityEngine';
import { evaluateBikeSuitability } from '../services/bikeSuitabilityEngine';
import { fetchVehicles } from '../services/api';
import {
  EMPTY_CAR_PROFILE,
  EMPTY_BIKE_PROFILE,
  getUserStorageKey,
  getCarProfileStorageKey,
  getBikeProfileStorageKey,
  isTwoWheelerVehicle,
  isCarProfileComplete,
  isBikeProfileComplete,
} from '../utils/profileUtils';

const AppContext = createContext();

function readStoredCarProfile(user) {
  if (!user) return { ...EMPTY_CAR_PROFILE };
  try {
    const key = getCarProfileStorageKey(user);
    const saved = key ? localStorage.getItem(key) : null;
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && parsed._completed === true) {
        return { ...EMPTY_CAR_PROFILE, ...parsed };
      }
    }
  } catch (e) {
    console.warn('Error reading stored car profile', e);
  }
  return { ...EMPTY_CAR_PROFILE, name: user.name || '' };
}

function readStoredBikeProfile(user) {
  if (!user) return { ...EMPTY_BIKE_PROFILE };
  try {
    const key = getBikeProfileStorageKey(user);
    const saved = key ? localStorage.getItem(key) : null;
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && parsed._completed === true) {
        return { ...EMPTY_BIKE_PROFILE, ...parsed };
      }
    }
  } catch (e) {
    console.warn('Error reading stored bike profile', e);
  }
  return { ...EMPTY_BIKE_PROFILE, name: user.name || '' };
}

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

  // Auth User (read before profiles so profile state is strictly scoped per user)
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const user = localStorage.getItem('autodezire_user');
      return user ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  });

  // Car User Profile (never pre-populated with assumed scoring defaults)
  const [userProfile, setUserProfile] = useState(() => readStoredCarProfile(currentUser));

  // 2-Wheeler / Bike User Profile (never pre-populated with assumed scoring defaults)
  const [bikeProfile, setBikeProfile] = useState(() => readStoredBikeProfile(currentUser));

  // Profile completion and score visibility gates
  const carProfileCompleted = useMemo(
    () => isCarProfileComplete(currentUser, userProfile),
    [currentUser, userProfile]
  );

  const bikeProfileCompleted = useMemo(
    () => isBikeProfileComplete(currentUser, bikeProfile),
    [currentUser, bikeProfile]
  );

  const canShowCarScore = carProfileCompleted;
  const canShowBikeScore = bikeProfileCompleted;
  const canShowActiveScore =
    selectedVehicleType === '2-wheeler' ? canShowBikeScore : canShowCarScore;

  const canShowScoreForVehicle = useCallback(
    vehicle => (isTwoWheelerVehicle(vehicle) ? canShowBikeScore : canShowCarScore),
    [canShowBikeScore, canShowCarScore]
  );

  // Selected vehicle for Evaluation / AI context
  const [selectedVehicle, setSelectedVehicle] = useState(() => {
    return INITIAL_VEHICLES.find(v => v.model === 'Nexon') || INITIAL_VEHICLES[0];
  });

  // Evaluation calculation (only computed when authenticated and profile form completed)
  const [evaluation, setEvaluation] = useState(() => {
    const defaultVeh = INITIAL_VEHICLES.find(v => v.model === 'Nexon') || INITIAL_VEHICLES[0];
    if (isCarProfileComplete(currentUser, readStoredCarProfile(currentUser))) {
      return evaluateSuitability(defaultVeh, readStoredCarProfile(currentUser));
    }
    return null;
  });

  // Saved vehicles (Garage / Wishlist)
  const [savedVehicles, setSavedVehicles] = useState(() => {
    try {
      const saved = localStorage.getItem('autodezire_saved');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          // Clear legacy hardcoded initial defaults ('nexon' & 'classic_350') so garage starts empty
          if (parsed.length === 2 && parsed.includes('nexon') && parsed.includes('classic_350')) {
            localStorage.setItem('autodezire_saved', JSON.stringify([]));
            return [];
          }
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Error reading autodezire_saved from localStorage', e);
    }
    return [];
  });

  // Compare list (Array of vehicle objects, max 3)
  const [compareList, setCompareList] = useState(() => {
    const nexon = INITIAL_VEHICLES.find(v => v.model === 'Nexon');
    const wagonr = INITIAL_VEHICLES.find(v => v.model === 'WagonR');
    return [nexon, wagonr].filter(Boolean);
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // AI Chat Messages Navigation Memory (persisted across page changes until browser tab closes)
  const [aiChatMessages, setAiChatMessagesState] = useState(() => {
    try {
      const saved = sessionStorage.getItem('autodezire_ai_chat');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  const setAiChatMessages = updater => {
    setAiChatMessagesState(prev => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      try {
        if (next && Array.isArray(next) && next.length > 0) {
          sessionStorage.setItem('autodezire_ai_chat', JSON.stringify(next));
        } else {
          sessionStorage.removeItem('autodezire_ai_chat');
        }
      } catch (e) {}
      return next;
    });
  };

  const clearAiChatMessages = useCallback(() => {
    try {
      sessionStorage.removeItem('autodezire_ai_chat');
    } catch (e) {}
    setAiChatMessagesState(null);
  }, []);

  // Sync per-user profiles on login / logout / account switch without assuming data
  const userKey = getUserStorageKey(currentUser);
  const prevUserKeyRef = useRef(userKey);

  useEffect(() => {
    if (prevUserKeyRef.current !== userKey) {
      prevUserKeyRef.current = userKey;
      setUserProfile(readStoredCarProfile(currentUser));
      setBikeProfile(readStoredBikeProfile(currentUser));
      clearAiChatMessages();
    }
  }, [userKey, currentUser, clearAiChatMessages]);

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
    const isBike = isTwoWheelerVehicle(vehicle);
    if (isBike) {
      if (selectedVehicleType !== '2-wheeler') {
        setSelectedVehicleType('2-wheeler');
      }
      setEvaluation(canShowBikeScore ? evaluateBikeSuitability(vehicle, bikeProfile) : null);
    } else {
      if (selectedVehicleType !== '4-wheeler') {
        setSelectedVehicleType('4-wheeler');
      }
      setEvaluation(canShowCarScore ? evaluateSuitability(vehicle, userProfile) : null);
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
        const carsOnly = data.filter(v => v.category === 'Car' || (v.category !== 'Motorcycle' && v.category !== 'Scooter' && v.category !== 'Electric Scooter'));
        setVehicles(carsOnly);
      }
    }
    load();
  }, []);

  // Recalculate evaluation whenever selectedVehicle, profile, or completion state changes
  useEffect(() => {
    if (!selectedVehicle) {
      setEvaluation(null);
      return;
    }
    const isBike = isTwoWheelerVehicle(selectedVehicle);
    if (isBike) {
      setEvaluation(canShowBikeScore ? evaluateBikeSuitability(selectedVehicle, bikeProfile) : null);
    } else {
      setEvaluation(canShowCarScore ? evaluateSuitability(selectedVehicle, userProfile) : null);
    }
  }, [selectedVehicle, userProfile, bikeProfile, canShowCarScore, canShowBikeScore]);

  // Save profile changes for Cars (only marks completed when explicitly submitted via Questionnaire)
  const updateProfile = (newProfile, options = {}) => {
    const { markCompleted = false } = options;
    setUserProfile(prev => {
      const nextCompleted = markCompleted ? true : Boolean(prev?._completed);
      const updated = { ...prev, ...newProfile, _completed: nextCompleted };
      if (currentUser) {
        const storageKey = getCarProfileStorageKey(currentUser);
        if (storageKey && nextCompleted) {
          localStorage.setItem(storageKey, JSON.stringify(updated));
        }
      }
      return updated;
    });
  };

  // Save profile changes for Bikes (only marks completed when explicitly submitted via Bike Questionnaire)
  const updateBikeProfile = (newProfile, options = {}) => {
    const { markCompleted = false } = options;
    setBikeProfile(prev => {
      const nextCompleted = markCompleted ? true : Boolean(prev?._completed);
      const updated = { ...prev, ...newProfile, _completed: nextCompleted };
      if (currentUser) {
        const storageKey = getBikeProfileStorageKey(currentUser);
        if (storageKey && nextCompleted) {
          localStorage.setItem(storageKey, JSON.stringify(updated));
        }
      }
      return updated;
    });
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

  // Clear All Saved Vehicles
  const clearSavedVehicles = () => {
    setSavedVehicles([]);
    localStorage.setItem('autodezire_saved', JSON.stringify([]));
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
        profileCompleted: carProfileCompleted,
        carProfileCompleted,
        bikeProfileCompleted,
        canShowCarScore,
        canShowBikeScore,
        canShowActiveScore,
        canShowScoreForVehicle,
        selectedVehicle,
        setSelectedVehicle,
        evaluation,
        evaluateVehicle,
        savedVehicles,
        setSavedVehicles,
        toggleSaveVehicle,
        clearSavedVehicles,
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
        aiChatMessages,
        setAiChatMessages,
        clearAiChatMessages,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
