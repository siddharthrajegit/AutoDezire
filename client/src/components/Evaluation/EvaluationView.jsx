import React from 'react';
import VehicleInfoCard from './VehicleInfoCard';
import SemiCircleGauge from './SemiCircleGauge';
import RequirementGrid from './RequirementGrid';
import StrengthsConsiderations from './StrengthsConsiderations';
import { useApp } from '../../context/AppContext';
import { Sparkles, Heart, BarChart2, MessageSquare, ArrowLeft } from 'lucide-react';

export default function EvaluationView() {
  const {
    selectedVehicle,
    evaluation,
    savedVehicles,
    toggleSaveVehicle,
    compareList,
    toggleCompare,
    setActiveTab
  } = useApp();

  if (!selectedVehicle || !evaluation) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-400">No vehicle currently selected for evaluation.</p>
        <button
          onClick={() => setActiveTab('search')}
          className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-xl text-xs font-bold"
        >
          Search Automobiles
        </button>
      </div>
    );
  }

  const isSaved = savedVehicles.includes(selectedVehicle.id || selectedVehicle._id);
  const isCompared = compareList.some(v => (v.id || v._id) === (selectedVehicle.id || selectedVehicle._id));

  return (
    <div className="space-y-6 pb-12 animate-fadeIn max-w-[1400px] mx-auto">
      {/* Quick Action Toolbar */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setActiveTab('search')}
          className="flex items-center space-x-2 text-xs font-medium text-gray-500 dark:text-gray-400 hover:text-orange-500 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Search & Inventory</span>
        </button>

        <div className="flex items-center space-x-3">
          {/* Compare toggle */}
          <button
            onClick={() => toggleCompare(selectedVehicle)}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
              isCompared
                ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                : 'bg-white dark:bg-gray-800/80 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-blue-500'
            }`}
          >
            <BarChart2 className="w-3.5 h-3.5" />
            <span>{isCompared ? 'In Compare List' : 'Add to Compare'}</span>
          </button>

          {/* Save toggle */}
          <button
            onClick={() => toggleSaveVehicle(selectedVehicle.id || selectedVehicle._id)}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
              isSaved
                ? 'bg-rose-600 text-white border-rose-600 shadow-sm'
                : 'bg-white dark:bg-gray-800/80 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-rose-500'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
            <span>{isSaved ? 'Saved in Garage' : 'Save Vehicle'}</span>
          </button>

          {/* Ask AI about this car */}
          <button
            onClick={() => setActiveTab('ai-advisor')}
            className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-sm hover:shadow-orange-500/30 transition-all"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Ask AI About This Car</span>
          </button>
        </div>
      </div>

      {/* TOP SECTION: Vehicle Info Card (Left) + Overall Suitability Score Gauge (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-8 flex flex-col">
          <VehicleInfoCard vehicle={selectedVehicle} />
        </div>
        <div className="lg:col-span-4 flex flex-col">
          <SemiCircleGauge
            score={evaluation.overallScore}
            status={evaluation.overallStatus}
          />
        </div>
      </div>

      {/* MIDDLE SECTION: Requirement-wise Scores (Exact 5x2 Grid with 10 Cards) */}
      <RequirementGrid requirementList={evaluation.requirementList} />

      {/* BOTTOM SECTION: Top Strengths & Considerations */}
      <StrengthsConsiderations
        strengths={evaluation.topStrengths}
        considerations={evaluation.considerations}
        safetyRating={selectedVehicle.safetyRating}
        safetyAgency={selectedVehicle.safetyAgency}
        criticalCompromises={evaluation.criticalCompromises}
      />
    </div>
  );
}
