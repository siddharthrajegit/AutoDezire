import React, { useState } from 'react';
import {
  Bike,
  Gauge,
  MapPin,
  Users,
  Wallet,
  Star,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  Zap,
  PersonStanding,
  Weight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { BIKE_PRIORITY_OPTIONS } from '../../services/bikeSuitabilityEngine';
import confetti from 'canvas-confetti';

const STEPS = [
  { id: 1, title: 'Height & Inseam', icon: PersonStanding, desc: 'Flat-Foot Reach' },
  { id: 2, title: 'Rider Weight', icon: Gauge, desc: 'Weight & Balance' },
  { id: 3, title: 'Experience', icon: Gauge, desc: 'Riding Confidence' },
  { id: 4, title: 'Category & Posture', icon: Bike, desc: 'Cruiser, Sport or Scooter' },
  { id: 5, title: 'Pillion & Storage', icon: Users, desc: 'Passengers & Storage' },
  { id: 6, title: 'Budget & EV', icon: Wallet, desc: 'Budget & Charging' },
  { id: 7, title: 'Top 3 Priorities', icon: Star, desc: 'What Matters Most' },
];

export default function BikeQuestionnaireView() {
  const { bikeProfile, updateBikeProfile, setActiveTab } = useApp();
  const [currentStep, setCurrentStep] = useState(1);
  const [form, setForm] = useState({ ...bikeProfile });

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handlePriorityToggle = (priority) => {
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
    if (currentStep < STEPS.length) {
      setCurrentStep(prev => prev + 1);
    } else {
      updateBikeProfile(form);
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {}
      setActiveTab('recommendations');
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const riderHeight = form.riderHeight || 172;
  const riderWeight = form.riderWeight || 68;

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-16 animate-fadeIn">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-400 text-xs font-bold uppercase tracking-wider">
          <Bike className="w-3.5 h-3.5" />
          <span>2-Wheeler Personal Telematics</span>
        </div>
        <h1 className="text-3xl font-black tracking-tight text-gray-900 dark:text-white">
          Motorcycle & Scooter Suitability Profile
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
          We calculate flat-foot ground reach, body weight-to-kerb balance, and pillion ergonomics to find your ideal 2-wheeler.
        </p>
      </div>

      {/* Step Wizard Progress Bar */}
      <div className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-800 rounded-2xl p-4 shadow-sm">
        <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
          {STEPS.map((s) => {
            const isCompleted = currentStep > s.id;
            const isCurrent = currentStep === s.id;
            const Icon = s.icon;

            return (
              <button
                key={s.id}
                onClick={() => setCurrentStep(s.id)}
                className={`flex flex-col items-center text-center p-1.5 sm:p-2 rounded-xl transition-all ${
                  isCurrent
                    ? 'bg-purple-600/15 border border-purple-500/40 text-purple-400 font-bold'
                    : isCompleted
                    ? 'text-emerald-500 dark:text-emerald-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                    : 'text-gray-400 dark:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center mb-1 text-xs font-bold ${
                  isCurrent
                    ? 'bg-purple-600 text-white shadow-sm'
                    : isCompleted
                    ? 'bg-emerald-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-400'
                }`}>
                  {isCompleted ? <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                </div>
                <span className="text-[10px] font-semibold truncate hidden md:block">
                  {s.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step Content Card */}
      <div className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-800 rounded-3xl p-6 sm:p-8 shadow-sm transition-all duration-300">
        {/* STEP 1: RIDER HEIGHT & INSEAM */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="border-b border-gray-100 dark:border-gray-800 pb-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center space-x-2">
                <PersonStanding className="w-5 h-5 text-purple-500" />
                <span>Rider Height & Leg Reach (Flat-Footing)</span>
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                Crucial for two-wheelers. Ensures you can safely place both feet flat on the ground at traffic signals.
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
                    Rider Height: <span className="text-purple-400 font-extrabold">{riderHeight} cm</span> ({Math.floor(riderHeight / 30.48)}' {Math.round((riderHeight % 30.48) / 2.54)}")
                  </label>
                  {riderHeight <= 162 && (
                    <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">
                      Low Seat Height (&le;780mm) Prioritized
                    </span>
                  )}
                  {riderHeight >= 183 && (
                    <span className="text-[10px] font-bold text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded">
                      Tall Rider (&ge;6ft) Leg Room Prioritized
                    </span>
                  )}
                </div>
                <input
                  type="range"
                  min="145"
                  max="205"
                  value={riderHeight}
                  onChange={(e) => {
                    const h = Number(e.target.value);
                    handleChange('riderHeight', h);
                    handleChange('riderInseam', Math.round(h * 0.45));
                  }}
                  className="w-full h-2.5 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-600"
                />
                <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                  <span>145 cm (4'9")</span>
                  <span>172 cm (5'8")</span>
                  <span>205 cm (6'9")</span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
                    Estimated Inseam / Inner Leg Length: <span className="text-teal-400 font-extrabold">{form.riderInseam || Math.round(riderHeight * 0.45)} cm</span>
                  </label>
                  <span className="text-[10px] text-gray-500">
                    Distance from crotch to floor
                  </span>
                </div>
                <input
                  type="range"
                  min="65"
                  max="100"
                  value={form.riderInseam || Math.round(riderHeight * 0.45)}
                  onChange={(e) => handleChange('riderInseam', Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-teal-500"
                />
                <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                  <span>65 cm (Short inseam)</span>
                  <span>77 cm (Average)</span>
                  <span>100 cm (Long inseam)</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: RIDER WEIGHT & BUILD */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="border-b border-gray-100 dark:border-gray-800 pb-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center space-x-2">
                <Gauge className="w-5 h-5 text-rose-500" />
                <span>Rider Body Weight & Balance (Key Factor)</span>
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                Lightweight riders need easy-to-reverse bikes, while heavier riders require robust suspension and 125cc+ torque.
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex items-baseline justify-between mb-2">
                  <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
                    Your Body Weight
                  </label>
                  <span className="text-2xl font-black text-rose-500 dark:text-rose-400">
                    {riderWeight} kg
                  </span>
                </div>

                <input
                  type="range"
                  min="40"
                  max="130"
                  value={riderWeight}
                  onChange={(e) => handleChange('riderWeight', Number(e.target.value))}
                  className="w-full h-2.5 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-rose-500"
                />

                <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                  <span>40 kg (Lightweight)</span>
                  <span>68 kg (Average)</span>
                  <span>130 kg (Heavyweight)</span>
                </div>
              </div>

              {/* Dynamic Weight Match Callout */}
              <div className={`p-4 rounded-2xl border text-xs space-y-1 ${
                riderWeight < 58
                  ? 'bg-amber-500/10 border-amber-500/20 text-amber-400'
                  : riderWeight > 88
                  ? 'bg-blue-500/10 border-blue-500/20 text-blue-400'
                  : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
              }`}>
                <div className="font-bold flex items-center space-x-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>
                    {riderWeight < 58
                      ? 'Lightweight Rider Profile'
                      : riderWeight > 88
                      ? 'Sturdy / Heavyweight Rider Profile'
                      : 'Balanced Weight Profile'}
                  </span>
                </div>
                <p className="text-[11px] opacity-90">
                  {riderWeight < 58
                    ? 'We will prioritize lightweight, agile machines (100–145kg) that are effortless to reverse and balance in tight parking.'
                    : riderWeight > 88
                    ? 'We will prioritize 125cc+ peppy powertrains and sturdy dual rear suspension to ensure strong incline pull and zero bottoming out.'
                    : 'Optimal weight-to-power match across both lightweight scooters and 350cc retro cruisers.'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: EXPERIENCE & CONFIDENCE */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div className="border-b border-gray-100 dark:border-gray-800 pb-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Riding Experience & Heavy Bike Confidence
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                Helps protect novice riders from aggressive power delivery or heavy 195kg metal cruisers.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                  Years of Two-Wheeler Riding
                </label>
                <input
                  type="number"
                  min="0"
                  max="40"
                  value={form.yearsExperience ?? 4}
                  onChange={(e) => handleChange('yearsExperience', Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm font-medium text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                  Total Kilometres Ridden
                </label>
                <select
                  value={form.totalKm || 20000}
                  onChange={(e) => handleChange('totalKm', Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm font-medium text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value={3000}>Novice (&lt; 5,000 km)</option>
                  <option value={15000}>Intermediate (5,000 - 30,000 km)</option>
                  <option value={60000}>Experienced (30,000 - 100,000 km)</option>
                  <option value={150000}>Veteran Rider (&gt; 100,000 km)</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                  Confidence with Heavy Motorcycles (&gt;180kg)
                </label>
                <select
                  value={form.confidenceLevel || 'Confident'}
                  onChange={(e) => handleChange('confidenceLevel', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm font-medium text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="Nervous">Nervous (Prefer lightweight &lt;115kg scooter with twist-and-go automatic)</option>
                  <option value="Getting Comfortable">Getting Comfortable (Comfortable with 125-150cc lightweight motorcycles)</option>
                  <option value="Confident">Confident (Can easily handle standard commuters and streetfighters)</option>
                  <option value="Very Confident">Very Confident (Mastered 195kg heavy cruisers, quick clutch control & wet roads)</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: CATEGORY FOCUS & ERGONOMIC POSTURE */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div className="border-b border-gray-100 dark:border-gray-800 pb-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Category Focus & Ergonomic Posture
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                Choose between motorcycles, automatic family scooters, or high-performance electric 2-wheelers.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                  2-Wheeler Focus
                </label>
                <select
                  value={form.categoryPreference || 'All'}
                  onChange={(e) => handleChange('categoryPreference', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm font-medium text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="All">All 2-Wheelers (Bikes & Scooters)</option>
                  <option value="Motorcycle">Motorcycles Only (Geared)</option>
                  <option value="Scooter">Scooters Only (Automatic / Family)</option>
                  <option value="Electric Scooter">Electric 2-Wheelers Only</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                  Riding Triangle / Posture Preference
                </label>
                <select
                  value={form.riderTriangle || 'Upright Commuter'}
                  onChange={(e) => handleChange('riderTriangle', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm font-medium text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="Upright Commuter">Upright Commuter (Neutral back, relaxed shoulders)</option>
                  <option value="Relaxed Cruiser">Relaxed Cruiser (Forward footpegs, wide handlebars)</option>
                  <option value="Sporty Forward">Sporty Forward (Engaged front-end control, sporty footpegs)</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: PILLION & UNDERSEAT STORAGE */}
        {currentStep === 5 && (
          <div className="space-y-6">
            <div className="border-b border-gray-100 dark:border-gray-800 pb-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Pillion Passenger & Luggage Needs
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                Evaluates pillion cushion size, grab rail comfort, and helmet storage space.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                  Pillion Passenger Frequency
                </label>
                <select
                  value={form.pillionFrequency || 'Occasional'}
                  onChange={(e) => handleChange('pillionFrequency', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm font-medium text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="Solo">Solo Rider Only (Pillion comfort doesn't matter)</option>
                  <option value="Occasional">Occasional Pillion (Weekend friends)</option>
                  <option value="Daily">Daily Pillion (Family member / Spouse daily commute)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                  Underseat Luggage & Storage Need
                </label>
                <select
                  value={form.storageRequirement || 'Medium'}
                  onChange={(e) => handleChange('storageRequirement', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm font-medium text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="Light">Light (Wallet / Documents / Phone)</option>
                  <option value="Medium">Medium (1 Full-Face Helmet / Groceries)</option>
                  <option value="Heavy">Heavy (2 Helmets / Large 30L+ underseat capacity)</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                  Average Daily Commute: <span className="text-purple-400 font-extrabold">{form.dailyKm || 30} km</span>
                </label>
                <input
                  type="range"
                  min="5"
                  max="120"
                  value={form.dailyKm || 30}
                  onChange={(e) => handleChange('dailyKm', Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-600"
                />
                <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                  <span>5 km (Short errands)</span>
                  <span>30 km (Standard commute)</span>
                  <span>120 km (Intercity highway touring)</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 6: BUDGET & EV CHARGING */}
        {currentStep === 6 && (
          <div className="space-y-6">
            <div className="border-b border-gray-100 dark:border-gray-800 pb-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Budget & EV Charging Access
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                Two-wheeler budgets range from ₹60,000 for family commuters up to ₹2.5 Lakh for premium cruisers.
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex items-baseline justify-between mb-2">
                  <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
                    Maximum Comfortable Budget
                  </label>
                  <span className="text-xl font-black text-emerald-500 dark:text-emerald-400">
                    ₹ {form.budget || 1.8} Lakh (₹{Math.round((form.budget || 1.8) * 100000).toLocaleString('en-IN')})
                  </span>
                </div>

                <input
                  type="range"
                  min="0.6"
                  max="4.0"
                  step="0.05"
                  value={form.budget || 1.8}
                  onChange={(e) => handleChange('budget', Number(e.target.value))}
                  className="w-full h-2.5 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />

                <div className="mt-3 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400 flex items-center justify-between">
                  <span>Target Budget: <strong>≤ ₹{form.budget || 1.8}L</strong></span>
                  <span>15% Consideration Range: <strong>₹{form.budget || 1.8}L → ₹{((form.budget || 1.8) * 1.15).toFixed(2)}L</strong></span>
                </div>
              </div>

              {/* EV Charging Checklist */}
              <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 space-y-3">
                <div className="flex items-center space-x-2 text-xs font-bold text-gray-900 dark:text-white">
                  <Zap className="w-4 h-4 text-amber-500" />
                  <span>Electric 2-Wheeler Charging Access</span>
                </div>
                <p className="text-[11px] text-gray-500 dark:text-gray-400">
                  Select your charging setup. If unselected, electric scooters (like Ather / Ola) will not be suggested.
                </p>

                <div className="flex items-center space-x-3 p-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                  <input
                    type="checkbox"
                    id="bikeHomeCharging"
                    checked={form.hasHomeCharging || false}
                    onChange={(e) => handleChange('hasHomeCharging', e.target.checked)}
                    className="w-4 h-4 rounded text-purple-600 focus:ring-purple-600"
                  />
                  <label htmlFor="bikeHomeCharging" className="text-xs font-semibold text-gray-800 dark:text-gray-200 cursor-pointer">
                    I have home 5A/15A socket access in my parking area
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 7: TOP 3 PRIORITIES */}
        {currentStep === 7 && (
          <div className="space-y-6">
            <div className="border-b border-gray-100 dark:border-gray-800 pb-4 flex items-start justify-between">
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  What matters most to you?
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  Select <strong className="text-purple-400">up to 3</strong> high priorities for your 2-wheeler.
                </p>
              </div>

              <div className="px-3 py-1 rounded-full bg-purple-600/15 text-purple-400 text-xs font-black">
                {form.topPriorities?.length || 0} / 3 Selected
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {BIKE_PRIORITY_OPTIONS.map((opt) => {
                const isSelected = form.topPriorities?.includes(opt);
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => handlePriorityToggle(opt)}
                    className={`p-3.5 rounded-xl border text-left flex items-center justify-between transition-all duration-200 ${
                      isSelected
                        ? 'bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-purple-500 text-purple-300 font-bold shadow-sm'
                        : 'bg-gray-50/60 dark:bg-gray-800/40 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <span className="text-xs">{opt}</span>
                    {isSelected && (
                      <CheckCircle2 className="w-4 h-4 text-purple-400 flex-shrink-0 ml-2" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Wizard Footer Navigation */}
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
            className="flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold shadow-md hover:shadow-purple-500/30 hover:scale-[1.02] transition-all"
          >
            <span>{currentStep === STEPS.length ? 'Calculate 2-Wheeler Matches' : 'Next Step'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
