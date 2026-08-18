import React, { useState } from 'react';
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
  Sparkles,
  Info,
  Shield
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PRIORITY_OPTIONS } from '../../services/clientSuitabilityEngine';
import confetti from 'canvas-confetti';

const STEPS = [
  { id: 1, title: 'Personal', icon: User, desc: 'Height & Profile' },
  { id: 2, title: 'Experience', icon: Gauge, desc: 'Driving Background' },
  { id: 3, title: 'Usage & Roads', icon: MapPin, desc: 'Commute & Conditions' },
  { id: 4, title: 'Passengers', icon: Users, desc: 'Family & Luggage' },
  { id: 5, title: 'Financial', icon: Wallet, desc: 'Budget & Running' },
  { id: 6, title: 'Top 3 Priorities', icon: Star, desc: 'What Matters Most' },
];

export default function QuestionnaireView() {
  const { userProfile, updateProfile, setActiveTab } = useApp();
  const [currentStep, setCurrentStep] = useState(1);
  const [form, setForm] = useState({ ...userProfile });

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
      // Completed all steps!
      updateProfile(form);
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

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-16 animate-fadeIn">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-black tracking-tight text-gray-900 dark:text-white">
          Personal Suitability Profile
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
          AutoDezire understands your lifestyle and habits to recommend vehicles tailored to YOU.
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
                onClick={() => setCurrentStep(s.id)}
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
        {/* STEP 1: PERSONAL */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="border-b border-gray-100 dark:border-gray-800 pb-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Personal & Automobile Preference
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                Helps calculate ergonomic seating, headroom, and category focus.
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
                  placeholder="Aryan"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                  Height: {form.height} cm (Approx {Math.floor(form.height / 30.48)}' {Math.round((form.height % 30.48) / 2.54)}")
                </label>
                <input
                  type="range"
                  min="145"
                  max="205"
                  value={form.height || 175}
                  onChange={(e) => handleChange('height', Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-orange-500"
                />
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
                  value={form.age || 28}
                  onChange={(e) => handleChange('age', Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm font-medium text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                  Automobile Focus
                </label>
                <select
                  value={form.categoryPreference || 'All'}
                  onChange={(e) => handleChange('categoryPreference', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm font-medium text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="All">All (Cars, Motorcycles & Scooters)</option>
                  <option value="Car">Cars Only</option>
                  <option value="Motorcycle">Motorcycles Only</option>
                  <option value="Scooter">Scooters Only</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: EXPERIENCE */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="border-b border-gray-100 dark:border-gray-800 pb-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Driving & Riding Experience
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                Helps determine stability tolerance, power demands, and transmission ease.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                  Years of Experience
                </label>
                <input
                  type="number"
                  value={form.yearsExperience || 5}
                  onChange={(e) => handleChange('yearsExperience', Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm font-medium text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                  Approx. Total Kilometres Driven/Ridden
                </label>
                <select
                  value={form.totalKm || 35000}
                  onChange={(e) => handleChange('totalKm', Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm font-medium text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value={5000}>Beginner (&lt; 10,000 km)</option>
                  <option value={35000}>Intermediate (10,000 - 50,000 km)</option>
                  <option value={100000}>Experienced (50,000 - 150,000 km)</option>
                  <option value={250000}>Veteran (&gt; 150,000 km)</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">
                  Road Types You Frequently Drive On
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  {['City Traffic', 'Highways & Expressways', 'Hilly / Ghats', 'Rough / Unpaved'].map((road) => (
                    <div
                      key={road}
                      className="flex items-center space-x-2 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <span className="font-semibold text-gray-800 dark:text-gray-200">{road}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: USAGE & ROAD CONDITIONS */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div className="border-b border-gray-100 dark:border-gray-800 pb-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Daily Usage & Road Conditions
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                Drives fuel efficiency calculations and ground clearance requirements.
              </p>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                  Average Daily Commute: <span className="text-orange-500 font-extrabold">{form.dailyKm} km</span>
                </label>
                <input
                  type="range"
                  min="5"
                  max="150"
                  value={form.dailyKm || 35}
                  onChange={(e) => handleChange('dailyKm', Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-orange-500"
                />
                <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                  <span>5 km (Short errands)</span>
                  <span>40 km (Standard commute)</span>
                  <span>150 km (Heavy highway runner)</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                    Highway Usage % ({form.highwayPercent}%)
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={form.highwayPercent || 30}
                    onChange={(e) => {
                      const h = Number(e.target.value);
                      handleChange('highwayPercent', h);
                      handleChange('cityPercent', Math.max(0, 100 - h - (form.ruralPercent || 10)));
                    }}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                    Primary Road Conditions
                  </label>
                  <select
                    value={form.roadConditions || 'Mixed with Potholes'}
                    onChange={(e) => handleChange('roadConditions', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm font-medium text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="Smooth Tarmac & Highways">Smooth Tarmac & Highways</option>
                    <option value="Mixed with Potholes">Mixed (City traffic, occasional potholes)</option>
                    <option value="Broken Roads & High Speedbreakers">Broken Roads & High Speedbreakers</option>
                    <option value="Off-road / Rural Unpaved">Off-road / Rural Unpaved</option>
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
                  value={form.regularPassengers || 2}
                  onChange={(e) => handleChange('regularPassengers', Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm font-medium text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
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
                  value={form.luggageRequirement || 'Medium'}
                  onChange={(e) => handleChange('luggageRequirement', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm font-medium text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
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

        {/* STEP 5: FINANCIAL */}
        {currentStep === 5 && (
          <div className="space-y-6">
            <div className="border-b border-gray-100 dark:border-gray-800 pb-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Budget & Ownership Financials
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                AutoDezire evaluates vehicles with a 10-15% tolerance margin so you don't miss great options just slightly above budget.
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex items-baseline justify-between mb-2">
                  <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
                    Maximum Comfortable Budget
                  </label>
                  <span className="text-xl font-black text-emerald-500 dark:text-emerald-400">
                    ₹ {form.budget} Lakh
                  </span>
                </div>

                <input
                  type="range"
                  min="0.8"
                  max="40"
                  step="0.5"
                  value={form.budget || 14}
                  onChange={(e) => handleChange('budget', Number(e.target.value))}
                  className="w-full h-2.5 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />

                {/* 10-15% Consideration Range Callout */}
                <div className="mt-3 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400 flex items-center justify-between">
                  <span>Standard Budget: <strong>≤ ₹{form.budget}L</strong></span>
                  <span>15% Consideration Range: <strong>₹{form.budget}L → ₹{(form.budget * 1.15).toFixed(2)}L</strong></span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                    Expected Ownership Duration
                  </label>
                  <select
                    value={form.expectedOwnershipYears || 5}
                    onChange={(e) => handleChange('expectedOwnershipYears', Number(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm font-medium text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
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
                    value={form.runningCostImportance || 'High'}
                    onChange={(e) => handleChange('runningCostImportance', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm font-medium text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
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
                  Select <strong className="text-orange-500">up to 3</strong> high priorities. All other parameters receive standard weight.
                </p>
              </div>

              <div className="px-3 py-1 rounded-full bg-orange-500/15 text-orange-500 text-xs font-black">
                {form.topPriorities?.length || 0} / 3 Selected
              </div>
            </div>

            {/* Priority Selection Pills Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-3">
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
            <span>{currentStep === STEPS.length ? 'Calculate Recommendations' : 'Next Step'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
