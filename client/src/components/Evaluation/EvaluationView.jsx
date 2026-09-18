import React, { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import VehicleInfoCard from './VehicleInfoCard';
import SemiCircleGauge from './SemiCircleGauge';
import PowertrainIntelligenceCard from './PowertrainIntelligenceCard';
import RiderErgonomicsCard from './RiderErgonomicsCard';
import RequirementGrid from './RequirementGrid';
import StrengthsConsiderations from './StrengthsConsiderations';
import { useApp } from '../../context/AppContext';
import { evaluateSuitability } from '../../services/clientSuitabilityEngine';
import { evaluateBikeSuitability } from '../../services/bikeSuitabilityEngine';
import { Heart, BarChart2, MessageSquare, ArrowLeft } from 'lucide-react';

export default function EvaluationView() {
  const { id } = useParams();
  const {
    vehicles,
    bikes,
    selectedVehicle,
    setSelectedVehicle,
    selectedVehicleType,
    setSelectedVehicleType,
    evaluation,
    userProfile,
    bikeProfile,
    savedVehicles,
    toggleSaveVehicle,
    compareList,
    toggleCompare,
    setActiveTab
  } = useApp();

  // If a URL parameter /evaluation/:id is provided, sync selectedVehicle to it
  useEffect(() => {
    if (id) {
      const decodedId = decodeURIComponent(id).toLowerCase().trim();
      const normalizedId = decodedId.replace(/[-_\s]+/g, '');
      const all = [...(vehicles || []), ...(bikes || [])];

      const match = all.find(v => {
        const vId = String(v.id || v._id || '').toLowerCase();
        const vModel = String(v.model || '').toLowerCase();
        const vBrandModel = `${v.brand || ''} ${v.model || ''}`.toLowerCase();
        return (
          v.id === id ||
          v._id === id ||
          vId === decodedId ||
          vId.replace(/[-_\s]+/g, '') === normalizedId ||
          vModel === decodedId ||
          vModel.replace(/[-_\s]+/g, '') === normalizedId ||
          vBrandModel.replace(/[-_\s]+/g, '') === normalizedId
        );
      });

      if (match) {
        const matchId = match.id || match._id;
        const currentId = selectedVehicle?.id || selectedVehicle?._id;
        if (matchId !== currentId) {
          setSelectedVehicle(match);
          const isBike = match.category === 'Motorcycle' || match.category === 'Scooter' || match.category === 'Electric Scooter';
          if (isBike && selectedVehicleType !== '2-wheeler' && setSelectedVehicleType) {
            setSelectedVehicleType('2-wheeler');
          } else if (!isBike && selectedVehicleType !== '4-wheeler' && setSelectedVehicleType) {
            setSelectedVehicleType('4-wheeler');
          }
        }
      }
    }
  }, [id, vehicles, bikes, selectedVehicle, setSelectedVehicle, selectedVehicleType, setSelectedVehicleType]);

  const isTwoWheeler =
    selectedVehicle?.category === 'Motorcycle' ||
    selectedVehicle?.category === 'Scooter' ||
    selectedVehicle?.category === 'Electric Scooter' ||
    selectedVehicleType === '2-wheeler';

  // Synchronously compute active evaluation to prevent 1-frame rendering lag or profile mismatch
  const activeEvaluation = useMemo(() => {
    if (!selectedVehicle) return evaluation;
    const vehicleIsBike =
      selectedVehicle.category === 'Motorcycle' ||
      selectedVehicle.category === 'Scooter' ||
      selectedVehicle.category === 'Electric Scooter';

    if (vehicleIsBike) {
      return evaluation?.personalizedFit
        ? evaluation
        : evaluateBikeSuitability(selectedVehicle, bikeProfile);
    } else {
      return (evaluation?.fuelRecommendation || !evaluation?.personalizedFit)
        ? evaluation
        : evaluateSuitability(selectedVehicle, userProfile);
    }
  }, [selectedVehicle, evaluation, bikeProfile, userProfile]);

  if (!selectedVehicle || !activeEvaluation) {
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

  const isSaved = savedVehicles?.includes(selectedVehicle.id || selectedVehicle._id);
  const isCompared = compareList?.some(v => (v.id || v._id) === (selectedVehicle.id || selectedVehicle._id));

  return (
    <div className="space-y-6 pb-12 animate-fadeIn max-w-[1400px] mx-auto">
      {/* Quick Action Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <button
          onClick={() => setActiveTab('search')}
          className="flex items-center space-x-2 text-xs font-medium text-gray-400 hover:text-orange-500 transition-colors self-start"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Search & Inventory</span>
        </button>

        <div className="flex flex-wrap items-center gap-2 sm:space-x-3">
          {/* Compare toggle */}
          <button
            onClick={() => toggleCompare(selectedVehicle)}
            className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              isCompared
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-gray-800 text-gray-300 border border-gray-700 hover:border-blue-500 hover:text-white'
            }`}
          >
            <BarChart2 className="w-3.5 h-3.5" />
            <span>{isCompared ? 'In Compare List' : 'Compare Vehicle'}</span>
          </button>

          {/* Garage Save Toggle */}
          <button
            onClick={() => toggleSaveVehicle(selectedVehicle.id || selectedVehicle._id)}
            className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
              isSaved
                ? 'bg-rose-500 text-white border-rose-500 shadow-sm'
                : 'bg-gray-800/80 border-gray-700 text-gray-300 hover:border-gray-600 hover:text-white'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
            <span>{isSaved ? 'Saved in Garage' : 'Save Vehicle'}</span>
          </button>

          {/* Ask AI Context */}
          <button
            onClick={() => setActiveTab('ai-advisor')}
            className="flex items-center space-x-1.5 px-4 py-1.5 rounded-xl text-xs font-bold bg-[#f97316] hover:bg-orange-600 text-white shadow-sm transition-all"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>{isTwoWheeler ? 'Ask AI About This Bike' : 'Ask AI About This Car'}</span>
          </button>
        </div>
      </div>

      {/* Top Section: Vehicle Hero Card & Suitability Gauge */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-8 flex flex-col">
          <VehicleInfoCard vehicle={selectedVehicle} evaluation={activeEvaluation} />
        </div>
        <div className="lg:col-span-4 flex flex-col">
          <SemiCircleGauge
            score={activeEvaluation.overallScore}
            status={activeEvaluation.overallStatus}
          />
        </div>
      </div>

      {/* 2-Wheeler Dedicated Rider Ergonomics & Fit Intelligence vs 4-Wheeler Powertrain Intelligence */}
      {isTwoWheeler ? (
        <RiderErgonomicsCard
          vehicle={selectedVehicle}
          evaluation={activeEvaluation}
          profile={bikeProfile}
        />
      ) : (
        <PowertrainIntelligenceCard
          vehicle={selectedVehicle}
          evaluation={activeEvaluation}
        />
      )}

      {/* Middle Section: Requirement Factor Cards */}
      <RequirementGrid evaluation={activeEvaluation} />

      {/* Bottom Section: Strengths & Considerations */}
      <StrengthsConsiderations
        evaluation={activeEvaluation}
        vehicle={selectedVehicle}
        profile={isTwoWheeler ? bikeProfile : userProfile}
      />
    </div>
  );
}
