import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import VehicleInfoCard from './VehicleInfoCard';
import SemiCircleGauge from './SemiCircleGauge';
import RequirementGrid from './RequirementGrid';
import StrengthsConsiderations from './StrengthsConsiderations';
import { useApp } from '../../context/AppContext';
import { Sparkles, Heart, BarChart2, MessageSquare, ArrowLeft } from 'lucide-react';

export default function EvaluationView() {
  const { id } = useParams();
  const {
    vehicles,
    bikes,
    selectedVehicle,
    setSelectedVehicle,
    evaluation,
    savedVehicles,
    toggleSaveVehicle,
    compareList,
    toggleCompare,
    setActiveTab
  } = useApp();

  // If a URL parameter /evaluation/:id is provided, sync selectedVehicle to it
  useEffect(() => {
    if (id) {
      const all = [...vehicles, ...bikes];
      const match = all.find(v => (v.id || v._id) === id);
      if (match && (selectedVehicle?.id !== id && selectedVehicle?._id !== id)) {
        setSelectedVehicle(match);
      }
    }
  }, [id, vehicles, bikes, selectedVehicle, setSelectedVehicle]);

  if (!selectedVehicle || !evaluation) {
    return (
      <div className="p-8 text-center space-y-4">
        <p className="text-gray-400">No vehicle currently selected for evaluation.</p>
        <button
          onClick={() => setActiveTab('search')}
          className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-xs font-bold transition-all shadow-md"
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <button
          onClick={() => setActiveTab('search')}
          className="flex items-center space-x-2 text-xs font-medium text-gray-500 dark:text-gray-400 hover:text-orange-500 transition-colors self-start"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Search & Inventory</span>
        </button>

        <div className="flex flex-wrap items-center gap-2 sm:space-x-3">
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

          {/* Garage Save Toggle */}
          <button
            onClick={() => toggleSaveVehicle(selectedVehicle.id || selectedVehicle._id)}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
              isSaved
                ? 'bg-rose-500 text-white border-rose-500 shadow-sm'
                : 'bg-white dark:bg-gray-800/80 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-rose-500'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
            <span>{isSaved ? 'Saved in Garage' : 'Save to Garage'}</span>
          </button>

          {/* Ask AI Context */}
          <button
            onClick={() => setActiveTab('ai-advisor')}
            className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-sm transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ask AI About This Vehicle</span>
          </button>
        </div>
      </div>

      {/* Top Section: Vehicle Hero Card & Suitability Gauge */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-8 flex flex-col">
          <VehicleInfoCard vehicle={selectedVehicle} evaluation={evaluation} />
        </div>
        <div className="lg:col-span-4 flex flex-col">
          <SemiCircleGauge score={evaluation.overallScore} status={evaluation.overallStatus} />
        </div>
      </div>

      {/* Middle Section: 10/12 Requirement Factor Cards */}
      <RequirementGrid evaluation={evaluation} />

      {/* Bottom Section: Strengths & Considerations */}
      <StrengthsConsiderations evaluation={evaluation} vehicle={selectedVehicle} />
    </div>
  );
}
