import React, { useState, useEffect } from 'react';
import {
  User,
  Gauge,
  MapPin,
  Users,
  Wallet,
  Star,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Zap,
  Car,
  Bike,
  AlertCircle,
  LogIn
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PRIORITY_OPTIONS } from '../../services/clientSuitabilityEngine';
import { EMPTY_CAR_PROFILE } from '../../utils/profileUtils';
import BikeQuestionnaireView from './BikeQuestionnaireView';
import confetti from 'canvas-confetti';

const STEPS = [
  { id: 1, title: 'Personal', icon: User, desc: 'Height & Category' },
  { id: 2, title: 'Experience', icon: Gauge, desc: 'Driving Confidence' },
  { id: 3, title: 'Usage & Roads', icon: MapPin, desc: 'Commute, Parking & Terrain' },
  { id: 4, title: 'Passengers', icon: Users, desc: 'Family & Luggage' },
  { id: 5, title: 'Budget & EV', icon: Wallet, desc: 'Budget & Charging' },
  { id: 6, title: 'Top 3 Priorities', icon: Star, desc: 'What Matters Most' },
];

function validateCarStep(step, form) {
  switch (step) {
    case 1:
      if (!form.name || !String(form.name).trim()) return 'Please enter your name.';
      if (typeof form.height !== 'number' || form.height < 140 || form.height > 215) {
        return 'Please select your height using the slider or input box (145–205 cm).';
      }
      if (form.age === '' || form.age === null || Number(form.age) < 16 || Number(form.age) > 100) {
        return 'Please enter a valid age (16–100).';
      }
      return '';
    case 2:
      if (
        form.yearsExperience === '' ||
        form.yearsExperience === null ||
        form.yearsExperience === undefined ||
        Number(form.yearsExperience) < 0
      ) {
        return 'Please enter your years of driving experience (enter 0 if beginner).';
      }
      if (!form.totalKm) return 'Please select your approximate total kilometres driven.';
      if (!form.confidenceLevel) return 'Please select your handling & parking confidence level.';
      return '';
    case 3:
      if (typeof form.dailyKm !== 'number' || form.dailyKm <= 0) {
        return 'Please select your average daily commute distance.';
      }
      if (form.highwayPercent === null || form.highwayPercent === '' || form.highwayPercent === undefined) {
        return 'Please select your highway usage percentage.';
      }
      if (!form.roadConditions) return 'Please select your primary road conditions.';
      if (!form.parkingType) return 'Please select your home parking environment.';
      if (!form.primaryTerrain) return 'Please select your primary geographic terrain.';
      return '';
    case 4:
      if (!form.regularPassengers) return 'Please select regular number of passengers.';
      if (!form.luggageRequirement) return 'Please select your luggage / storage need.';
      return '';
    case 5:
      if (typeof form.budget !== 'number' || form.budget <= 0) {
        return 'Please select your maximum comfortable budget.';
      }
      if (!form.expectedOwnershipYears) return 'Please select expected ownership duration.';
      if (!form.runningCostImportance) return 'Please select your running cost sensitivity.';
      return '';
    case 6:
      if (!Array.isArray(form.topPriorities) || form.topPriorities.length === 0) {
        return 'Please select at least 1 priority (up to 3) so suitability weights can be calculated.';
      }
      return '';
    default:
      return '';
  }
}

export default function QuestionnaireView() {
  const {
    selectedVehicleType,
    setSelectedVehicleType,
    userProfile,
    updateProfile,
    setActiveTab,
    currentUser,
    setIsAuthModalOpen
  } = useApp();

  const [currentStep, setCurrentStep] = useState(1);
  const [stepError, setStepError] = useState('');
  const [form, setForm] = useState(() => ({
    ...EMPTY_CAR_PROFILE,
    ...userProfile,
    name: userProfile?.name || currentUser?.name || '',
  }));

  useEffect(() => {
    setForm({
      ...EMPTY_CAR_PROFILE,
      ...userProfile,
      name: userProfile?.name || currentUser?.name || '',
    });
    setStepError('');
  }, [userProfile, currentUser]);

  const handleChange = (field, value) => {
    setStepError('');
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handlePriorityToggle = (priority) => {
    setStepError('');
    const current = form.topPriorities || [];
    if (current.includes(priority)) {
      handleChange('topPriorities', current.filter(p => p !== priority));
    } else {
      if (current.length < 3) {
        handleChange('topPriorities', [...current, priority]);
      }
    }
  };

  const handleNext = () => {
    const err = validateCarStep(currentStep, form);
    if (err) {
      setStepError(err);
      return;
    }

    if (currentStep < STEPS.length) {
      setStepError('');
      setCurrentStep(prev => prev + 1);
      return;
    }

    // Validate all prior steps too in case user jumped using step header pills
    for (let s = 1; s <= STEPS.length; s++) {
      const checkErr = validateCarStep(s, form);
      if (checkErr) {
        setCurrentStep(s);
        setStepError(checkErr);
        return;
      }
    }

    if (!currentUser) {
      setStepError('Please sign in first to save your profile and unlock personalized suitability scores.');
      setIsAuthModalOpen(true);
      return;
    }

    const hPercent = Number(form.highwayPercent) || 0;
    const rPercent = Number(form.ruralPercent) || 10;
    const normalizedForm = {
      ...form,
      name: String(form.name).trim(),
      height: Number(form.height),
      age: Number(form.age),
      yearsExperience: Number(form.yearsExperience),
      totalKm: Number(form.totalKm),
      dailyKm: Number(form.dailyKm),
      highwayPercent: hPercent,
      cityPercent: Math.max(0, 100 - hPercent - rPercent),
      regularPassengers: Number(form.regularPassengers),
      budget: Number(form.budget),
      expectedOwnershipYears: Number(form.expectedOwnershipYears),
    };

    updateProfile(normalizedForm, { markCompleted: true });
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {}
    setActiveTab('recommendations');
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setStepError('');
      setCurrentStep(prev => prev - 1);
    }
  };

  // If 2-Wheeler mode is active, render the specialized Bike Questionnaire Form!
  if (selectedVehicleType === '2-wheeler') {
    return (
      <div className="space-y-6">
        {/* Top Vehicle Type Switcher */}
        <div className="flex items-center justify-center">
          <div className="flex items-center bg-gray-200/80 dark:bg-gray-800/80 p-1.5 rounded-2xl border border-gray-300 dark:border-gray-700 shadow-sm">
            <button
              onClick={() => setSelectedVehicleType('4-wheeler')}
              className="flex items-center space-x-2 px-5 py-2 rounded-xl text-xs font-bold transition-all text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              <Car className="w-4 h-4" />
              <span>4-Wheeler (Cars & SUVs)</span>
            </button>
            <button
              onClick={() => setSelectedVehicleType('2-wheeler')}
              className="flex items-center space-x-2 px-5 py-2 rounded-xl text-xs font-bold transition-all bg-purple-600 text-white shadow-md"
            >
              <Bike className="w-4 h-4" />
              <span>2-Wheeler (Bikes & Scooters)</span>
            </button>
          </div>
        </div>

        <BikeQuestionnaireView />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-16 animate-fadeIn">
      {/* Top Vehicle Type Switcher */}
      <div className="flex items-center justify-center">
        <div className="flex items-center bg-gray-200/80 dark:bg-gray-800/80 p-1.5 rounded-2xl border border-gray-300 dark:border-gray-700 shadow-sm">
          <button
            onClick={() => setSelectedVehicleType('4-wheeler')}
            className="flex items-center space-x-2 px-5 py-2 rounded-xl text-xs font-bold transition-all bg-orange-500 text-white shadow-md"
          >
            <Car className="w-4 h-4" />
            <span>4-Wheeler (Cars & SUVs)</span>
          </button>
          <button
            onClick={() => setSelectedVehicleType('2-wheeler')}
            className="flex items-center space-x-2 px-5 py-2 rounded-xl text-xs font-bold transition-all text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            <Bike className="w-4 h-4" />
            <span>2-Wheeler (Bikes & Scooters)</span>
          </button>
        </div>
      </div>

      {/* Sign In Required Banner when Guest */}
      {!currentUser && (
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start space-x-3">
            <LogIn className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white">
                Sign in required to unlock vehicle scores
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                Scores stay hidden while browsing as a guest. Sign in, then fill & submit this form to compute your personalized match scores.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsAuthModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold shadow-sm flex-shrink-0 transition-all self-start sm:self-auto"
          >
            Sign In
          </button>
        </div>
      )}

      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-black tracking-tight text-gray-900 dark:text-white">
          Personal Car Suitability Profile
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
          Fill in your height, driving experience, charging access, and budget below to unlock your real suitability scores.
        </p>
      </div>

      {/* Step Wizard Progress Bar */}
      <div className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-800 rounded-2xl p-4 shadow-sm">
        <div className="grid grid-cols-6 gap-2">
          {STEPS.map((s) => {
            const isCompleted = currentStep > s.id;
            const isCurrent = currentStep === s.id;
            const Icon = s.icon;

            return (
              <button
                key={s.id}
                type="button"
                onClick={() => {
                  setStepError('');
                  setCurrentStep(s.id);
                }}
                className={`flex flex-col items-center text-center p-2 rounded-xl transition-all ${
                  isCurrent
                    ? 'bg-orange-500/15 border border-orange-500/40 text-orange-500 font-bold'
                    : isCompleted
                    ? 'text-emerald-500 dark:text-emerald-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                    : 'text-gray-400 dark:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 text-xs font-bold ${
                  isCurrent
                    ? 'bg-orange-500 text-white shadow-sm'
                    : isCompleted
                    ? 'bg-emerald-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-400'
                }`}>
                  {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                </div>
                <span className="text-[11px] font-semibold truncate hidden sm:block">
                  {s.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step Content Card */}
      <div className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-800 rounded-3xl p-6 sm:p-8 shadow-sm transition-all duration-300">
        {stepError && (
          <div className="mb-6 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-500 dark:text-rose-400 text-xs font-semibold flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{stepError}</span>
          </div>
        )}

        {/* STEP 1: PERSONAL & HEIGHT */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="border-b border-gray-100 dark:border-gray-800 pb-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Personal & Ergonomic Physical Profile
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                Your height directly determines cabin headroom, seat adjustability, and vehicle roofline comfort.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                  Your Name
                </label>
                <input
                  type="text"
                  value={form.name || ''}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm font-medium text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
                    Height:{' '}
                    {typeof form.height === 'number' && form.height > 0 ? (
                      <>
                        <span className="text-orange-500 font-extrabold">{form.height} cm</span>{' '}
                        ({Math.floor(form.height / 30.48)}' {Math.round((form.height % 30.48) / 2.54)}")
                      </>
                    ) : (
                      <span className="text-amber-500 font-semibold">Not selected</span>
                    )}
                  </label>
                  {typeof form.height === 'number' && form.height >= 183 && (
                    <span className="text-[10px] font-bold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded">
                      Tall (6ft+) Headroom Checks Active
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-3">
                  <input
                    type="range"
                    min="145"
                    max="205"
                    value={typeof form.height === 'number' && form.height > 0 ? form.height : 170}
                    onPointerDown={() => {
                      if (typeof form.height !== 'number') handleChange('height', 170);
                    }}
                    onChange={(e) => handleChange('height', Number(e.target.value))}
                    className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-orange-500"
                  />
                  <input
                    type="number"
                    min="140"
                    max="215"
                    placeholder="cm"
                    value={form.height ?? ''}
                    onChange={(e) => handleChange('height', e.target.value === '' ? null : Number(e.target.value))}
                    className="w-20 px-2.5 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs font-bold text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                  <span>145 cm (4'9")</span>
                  <span>175 cm (5'9")</span>
                  <span>205 cm (6'9")</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                  Age
                </label>
                <input
                  type="number"
                  min="16"
                  max="100"
                  placeholder="e.g. 28"
                  value={form.age ?? ''}
                  onChange={(e) => handleChange('age', e.target.value === '' ? null : Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm font-medium text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                  Car Body Preference
                </label>
                <select
                  value={form.categoryPreference || 'All'}
                  onChange={(e) => handleChange('categoryPreference', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm font-medium text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="All">All Car Types (SUVs, Sedans, Hatchbacks)</option>
                  <option value="SUV">SUVs Only</option>
                  <option value="Sedan">Sedans Only</option>
                  <option value="Hatchback">Hatchbacks Only</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: EXPERIENCE & CONFIDENCE */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="border-b border-gray-100 dark:border-gray-800 pb-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Driving Experience & Confidence
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                Protects beginner drivers from oversized, heavy, or overpowering vehicles (&gt;1500cc / 4WD / heavy kerb weight).
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                  Years of Driving Experience
                </label>
                <input
                  type="number"
                  min="0"
                  max="60"
                  placeholder="e.g. 5 (or 0 for beginner)"
                  value={form.yearsExperience ?? ''}
                  onChange={(e) => handleChange('yearsExperience', e.target.value === '' ? null : Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm font-medium text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                  Approx. Total Kilometres Driven
                </label>
                <select
                  value={form.totalKm || ''}
                  onChange={(e) => handleChange('totalKm', Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm font-medium text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="" disabled>Select approximate distance driven...</option>
                  <option value={3000}>Absolute Beginner (&lt; 5,000 km)</option>
                  <option value={8000}>Beginner (5,000 - 15,000 km)</option>
                  <option value={35000}>Intermediate (15,000 - 50,000 km)</option>
                  <option value={100000}>Experienced (50,000 - 150,000 km)</option>
                  <option value={250000}>Veteran (&gt; 150,000 km)</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                  Handling & Parking Confidence Level
                </label>
                <select
                  value={form.confidenceLevel || ''}
                  onChange={(e) => handleChange('confidenceLevel', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm font-medium text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="" disabled>Select confidence level...</option>
                  <option value="Nervous">Nervous (Prefer very easy, light, compact controls with tight turning radius)</option>
                  <option value="Getting Comfortable">Getting Comfortable (Need beginner-friendly handling, avoid bulky SUVs)</option>
                  <option value="Confident">Confident (Can easily handle standard city and highway vehicles)</option>
                  <option value="Very Confident">Very Confident (Comfortable with large 7-seaters, heavy cruisers & 4x4 offroaders)</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: USAGE, PARKING & TERRAIN */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div className="border-b border-gray-100 dark:border-gray-800 pb-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Daily Commute, Parking & Terrain
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                Ensures the vehicle fits in your parking space and handles your daily inclines and potholes.
              </p>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                  Average Daily Commute:{' '}
                  {typeof form.dailyKm === 'number' && form.dailyKm > 0 ? (
                    <span className="text-orange-500 font-extrabold">{form.dailyKm} km</span>
                  ) : (
                    <span className="text-amber-500 font-semibold">Not selected</span>
                  )}
                </label>
                <div className="flex items-center space-x-3">
                  <input
                    type="range"
                    min="5"
                    max="150"
                    value={typeof form.dailyKm === 'number' && form.dailyKm > 0 ? form.dailyKm : 35}
                    onPointerDown={() => {
                      if (typeof form.dailyKm !== 'number') handleChange('dailyKm', 35);
                    }}
                    onChange={(e) => handleChange('dailyKm', Number(e.target.value))}
                    className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-orange-500"
                  />
                  <input
                    type="number"
                    min="1"
                    max="300"
                    placeholder="km"
                    value={form.dailyKm ?? ''}
                    onChange={(e) => handleChange('dailyKm', e.target.value === '' ? null : Number(e.target.value))}
                    className="w-20 px-2.5 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs font-bold text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                  <span>5 km (Short errands)</span>
                  <span>40 km (Standard commute)</span>
                  <span>150 km (Heavy highway runner)</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                    Highway Usage %{' '}
                    {form.highwayPercent !== null && form.highwayPercent !== '' ? (
                      <span className="text-blue-500 font-extrabold">({form.highwayPercent}%)</span>
                    ) : (
                      <span className="text-amber-500 font-semibold">(Not selected)</span>
                    )}
                  </label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={form.highwayPercent ?? 30}
                      onPointerDown={() => {
                        if (form.highwayPercent === null || form.highwayPercent === '') {
                          handleChange('highwayPercent', 30);
                        }
                      }}
                      onChange={(e) => {
                        const h = Number(e.target.value);
                        handleChange('highwayPercent', h);
                        handleChange('cityPercent', Math.max(0, 100 - h - (form.ruralPercent || 10)));
                      }}
                      className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    />
                    <input
                      type="number"
                      min="0"
                      max="100"
                      placeholder="%"
                      value={form.highwayPercent ?? ''}
                      onChange={(e) => {
                        if (e.target.value === '') {
                          handleChange('highwayPercent', null);
                        } else {
                          const h = Math.min(100, Math.max(0, Number(e.target.value)));
                          handleChange('highwayPercent', h);
                          handleChange('cityPercent', Math.max(0, 100 - h - (form.ruralPercent || 10)));
                        }
                      }}
                      className="w-16 px-2 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs font-bold text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                    Primary Road Conditions
                  </label>
                  <select
                    value={form.roadConditions || ''}
                    onChange={(e) => handleChange('roadConditions', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm font-medium text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="" disabled>Select road conditions...</option>
                    <option value="Smooth Tarmac & Highways">Smooth Tarmac & Highways</option>
                    <option value="Mixed with Potholes">Mixed (City traffic, occasional potholes)</option>
                    <option value="Broken Roads & High Speedbreakers">Broken Roads & High Speedbreakers</option>
                    <option value="Off-road / Rural Unpaved">Off-road / Rural Unpaved</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                    Home Parking Environment
                  </label>
                  <select
                    value={form.parkingType || ''}
                    onChange={(e) => handleChange('parkingType', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm font-medium text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="" disabled>Select parking environment...</option>
                    <option value="Open Driveway">Open Driveway / Spacious Stilt (Any vehicle size)</option>
                    <option value="Narrow Street">Narrow Street (Requires tight turning radius & easy parking)</option>
                    <option value="Apartment Basement">Apartment Basement (Tight pillars, ramps & length limits)</option>
                    <option value="Shared Parking">Shared Street / Open Society Parking</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                    Primary Geographic Terrain
                  </label>
                  <select
                    value={form.primaryTerrain || ''}
                    onChange={(e) => handleChange('primaryTerrain', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm font-medium text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="" disabled>Select primary terrain...</option>
                    <option value="Flat Plains">Flat Plains & Coastal Regions</option>
                    <option value="Moderate Hills">Moderate Hills & Undulations</option>
                    <option value="Steep Ghats / Mountains">Steep Ghats & Mountain Passes (Needs strong torque/AWD)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: PASSENGERS & PRACTICALITY */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div className="border-b border-gray-100 dark:border-gray-800 pb-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Passengers & Practicality
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                Helps calculate cabin space, boot capacity, and suspension firmness.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                  Regular Number of Passengers
                </label>
                <select
                  value={form.regularPassengers || ''}
                  onChange={(e) => handleChange('regularPassengers', Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm font-medium text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="" disabled>Select regular passengers...</option>
                  <option value={1}>Solo Driver / Rider (1)</option>
                  <option value={2}>Couple / 2 Passengers</option>
                  <option value={4}>Small Family (3-4)</option>
                  <option value={5}>Full 5 Seater Load</option>
                  <option value={7}>Large Family (6-7 Seater)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                  Luggage / Storage Need
                </label>
                <select
                  value={form.luggageRequirement || ''}
                  onChange={(e) => handleChange('luggageRequirement', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm font-medium text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="" disabled>Select luggage need...</option>
                  <option value="Light">Light (Daily bags / Groceries)</option>
                  <option value="Medium">Medium (Weekend suitcases)</option>
                  <option value="Heavy">Heavy (Long road trips, airport luggage)</option>
                </select>
              </div>

              <div className="flex items-center space-x-3 p-3.5 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700">
                <input
                  type="checkbox"
                  id="hasChildren"
                  checked={form.hasChildren || false}
                  onChange={(e) => handleChange('hasChildren', e.target.checked)}
                  className="w-4 h-4 rounded text-orange-500 focus:ring-orange-500"
                />
                <label htmlFor="hasChildren" className="text-xs font-semibold text-gray-800 dark:text-gray-200 cursor-pointer">
                  Frequent Child Passengers (ISOFIX safety priority)
                </label>
              </div>

              <div className="flex items-center space-x-3 p-3.5 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700">
                <input
                  type="checkbox"
                  id="hasElderly"
                  checked={form.hasElderly || false}
                  onChange={(e) => handleChange('hasElderly', e.target.checked)}
                  className="w-4 h-4 rounded text-orange-500 focus:ring-orange-500"
                />
                <label htmlFor="hasElderly" className="text-xs font-semibold text-gray-800 dark:text-gray-200 cursor-pointer">
                  Elderly Passengers (Easy entry/exit, soft ride)
                </label>
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: BUDGET & EV CHARGING INFRASTRUCTURE */}
        {currentStep === 5 && (
          <div className="space-y-6">
            <div className="border-b border-gray-100 dark:border-gray-800 pb-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Budget & EV Charging Infrastructure
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                We verify charging feasibility before suggesting Electric Vehicles (EVs).
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex items-baseline justify-between mb-2">
                  <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
                    Maximum Comfortable Budget (Lakhs INR)
                  </label>
                  <span className="text-xl font-black text-emerald-500 dark:text-emerald-400">
                    {typeof form.budget === 'number' && form.budget > 0
                      ? `₹ ${form.budget >= 100 ? `${form.budget} Lakh (₹${(form.budget / 100).toFixed(2)} Cr)` : `${form.budget} Lakh`}`
                      : 'Not selected'}
                  </span>
                </div>

                <div className="flex items-center space-x-3">
                  <input
                    type="range"
                    min="0.8"
                    max="100"
                    step="0.5"
                    value={typeof form.budget === 'number' && form.budget > 0 ? form.budget : 15}
                    onPointerDown={() => {
                      if (typeof form.budget !== 'number') handleChange('budget', 15);
                    }}
                    onChange={(e) => handleChange('budget', Number(e.target.value))}
                    className="flex-1 h-2.5 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                  <input
                    type="number"
                    min="1"
                    max="500"
                    step="0.5"
                    placeholder="Lakhs"
                    value={form.budget ?? ''}
                    onChange={(e) => handleChange('budget', e.target.value === '' ? null : Number(e.target.value))}
                    className="w-24 px-2.5 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs font-bold text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                {/* Quick preset buttons */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {[8, 15, 25, 40, 60, 80, 100].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => handleChange('budget', preset)}
                      className={`px-2.5 py-1 text-xs rounded-lg font-semibold border transition-all ${
                        Number(form.budget) === preset
                          ? 'bg-emerald-500 text-white border-emerald-500 shadow-sm'
                          : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-emerald-500/50'
                      }`}
                    >
                      {preset >= 100 ? '₹1 Cr (100L)' : `₹${preset}L`}
                    </button>
                  ))}
                </div>

                {typeof form.budget === 'number' && form.budget > 0 ? (
                  <div className="mt-3 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400 flex items-center justify-between">
                    <span>Standard Budget: <strong>≤ ₹{form.budget >= 100 ? `${form.budget}L (${(form.budget / 100).toFixed(2)} Cr)` : `${form.budget}L`}</strong></span>
                    <span>15% Consideration Range: <strong>₹{form.budget}L → ₹{(form.budget * 1.15).toFixed(1)}L</strong></span>
                  </div>
                ) : (
                  <div className="mt-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400">
                    Choose a budget preset, drag the slider, or enter your budget in Lakhs above.
                  </div>
                )}
              </div>

              <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 space-y-3">
                <div className="flex items-center space-x-2 text-xs font-bold text-gray-900 dark:text-white">
                  <Zap className="w-4 h-4 text-amber-500" />
                  <span>Electric Car Charging Access</span>
                </div>
                <p className="text-[11px] text-gray-500 dark:text-gray-400">
                  Select your charging access. If neither is available, plug-in EVs will not be recommended.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="flex items-center space-x-3 p-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                    <input
                      type="checkbox"
                      id="hasHomeCharging"
                      checked={form.hasHomeCharging || false}
                      onChange={(e) => handleChange('hasHomeCharging', e.target.checked)}
                      className="w-4 h-4 rounded text-orange-500 focus:ring-orange-500"
                    />
                    <label htmlFor="hasHomeCharging" className="text-xs font-semibold text-gray-800 dark:text-gray-200 cursor-pointer">
                      I have 15A socket / home charging
                    </label>
                  </div>

                  <div className="flex items-center space-x-3 p-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                    <input
                      type="checkbox"
                      id="nearbyFastCharging"
                      checked={form.nearbyFastCharging || false}
                      onChange={(e) => handleChange('nearbyFastCharging', e.target.checked)}
                      className="w-4 h-4 rounded text-orange-500 focus:ring-orange-500"
                    />
                    <label htmlFor="nearbyFastCharging" className="text-xs font-semibold text-gray-800 dark:text-gray-200 cursor-pointer">
                      DC fast charger within 5 km
                    </label>
                  </div>
                </div>
              </div>

              {/* Fuel Powertrain Preference */}
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                  Fuel Powertrain Preference (Optional)
                </label>
                <select
                  value={form.fuelPreference || 'All'}
                  onChange={(e) => handleChange('fuelPreference', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm font-medium text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="All">✨ No Strict Preference (Let AI Recommend Optimal Fuel Type)</option>
                  <option value="Petrol">⛽ Petrol (Refined, Turbo Power & Acceleration)</option>
                  <option value="Diesel">⛽ Diesel (High Highway Mileage & 250+ Nm Pulling Torque)</option>
                  <option value="CNG">⛽ CNG (Lowest City Running Cost ~₹2.8/km)</option>
                  <option value="Electric">⚡ Electric (Zero Emissions, Instant Torque & ₹1/km Cost)</option>
                </select>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1">
                  By default, our engine automatically selects between Petrol, Diesel, CNG, and Electric based on your daily commute, highway %, and priorities.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                    Expected Ownership Duration
                  </label>
                  <select
                    value={form.expectedOwnershipYears || ''}
                    onChange={(e) => handleChange('expectedOwnershipYears', Number(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm font-medium text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="" disabled>Select ownership duration...</option>
                    <option value={3}>3 Years (High resale priority)</option>
                    <option value={5}>5-7 Years (Balanced lifecycle)</option>
                    <option value={10}>10+ Years (Long-term reliability)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                    Running Cost Sensitivity
                  </label>
                  <select
                    value={form.runningCostImportance || ''}
                    onChange={(e) => handleChange('runningCostImportance', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm font-medium text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="" disabled>Select running cost importance...</option>
                    <option value="High">High (Mileage & maintenance are crucial)</option>
                    <option value="Medium">Moderate (Willing to trade for performance)</option>
                    <option value="Low">Low (Performance / Luxury comes first)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 6: TOP 3 PRIORITIES */}
        {currentStep === 6 && (
          <div className="space-y-6">
            <div className="border-b border-gray-100 dark:border-gray-800 pb-4 flex items-start justify-between">
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  What matters most to you?
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  Select <strong className="text-orange-500">up to 3</strong> high priorities. When requirements contradict, your top priorities decide the winner!
                </p>
              </div>

              <div className="px-3 py-1 rounded-full bg-orange-500/15 text-orange-500 text-xs font-black">
                {form.topPriorities?.length || 0} / 3 Selected
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PRIORITY_OPTIONS.map((opt) => {
                const isSelected = form.topPriorities?.includes(opt);
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => handlePriorityToggle(opt)}
                    className={`p-3.5 rounded-xl border text-left flex items-center justify-between transition-all duration-200 ${
                      isSelected
                        ? 'bg-gradient-to-r from-orange-500/20 to-amber-500/20 border-orange-500 text-orange-400 font-bold shadow-sm'
                        : 'bg-gray-50/60 dark:bg-gray-800/40 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <span className="text-xs">{opt}</span>
                    {isSelected && (
                      <CheckCircle2 className="w-4 h-4 text-orange-500 flex-shrink-0 ml-2" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Wizard Footer Navigation Controls */}
        <div className="flex items-center justify-between pt-8 border-t border-gray-100 dark:border-gray-800 mt-8">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentStep === 1}
            className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-semibold border transition-all ${
              currentStep === 1
                ? 'opacity-40 cursor-not-allowed border-gray-200 dark:border-gray-800 text-gray-400'
                : 'border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Previous</span>
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-bold shadow-md hover:shadow-orange-500/30 hover:scale-[1.02] transition-all"
          >
            <span>
              {currentStep === STEPS.length
                ? currentUser
                  ? 'Calculate Car Recommendations'
                  : 'Sign In to Calculate Recommendations'
                : 'Next Step'}
            </span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
