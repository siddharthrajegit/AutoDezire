import React, { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import VehicleInfoCard from './VehicleInfoCard';
import SemiCircleGauge from './SemiCircleGauge';
import PowertrainIntelligenceCard from './PowertrainIntelligenceCard';
import RiderErgonomicsCard from './RiderErgonomicsCard';
import RequirementGrid from './RequirementGrid';
import StrengthsConsiderations from './StrengthsConsiderations';
import VariantFeaturesPanel from './VariantFeaturesPanel';
import { useApp } from '../../context/AppContext';
import { evaluateSuitability } from '../../services/clientSuitabilityEngine';
import { evaluateBikeSuitability } from '../../services/bikeSuitabilityEngine';
import { isTwoWheelerVehicle } from '../../utils/profileUtils';
import { Heart, BarChart2, MessageSquare, ArrowLeft, Lock, LogIn, SlidersHorizontal } from 'lucide-react';

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
    setActiveTab,
    currentUser,
    setIsAuthModalOpen,
    canShowCarScore,
    canShowBikeScore
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
    isTwoWheelerVehicle(selectedVehicle) ||
    (!selectedVehicle && selectedVehicleType === '2-wheeler');

  const canShowScore = isTwoWheelerVehicle(selectedVehicle)
    ? canShowBikeScore
    : canShowCarScore;

  // Synchronously compute active evaluation ONLY when user is logged in & form is completed
  const activeEvaluation = useMemo(() => {
    if (!selectedVehicle || !canShowScore) return null;
    const vehicleIsBike = isTwoWheelerVehicle(selectedVehicle);

    if (vehicleIsBike) {
      return evaluation?.personalizedFit
        ? evaluation
        : evaluateBikeSuitability(selectedVehicle, bikeProfile);
    } else {
      return evaluation && (evaluation.fuelRecommendation || !evaluation.personalizedFit)
        ? evaluation
        : evaluateSuitability(selectedVehicle, userProfile);
    }
  }, [selectedVehicle, evaluation, bikeProfile, userProfile, canShowScore]);

  if (!selectedVehicle) {
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
          className="flex items-center space-x-2 text-xs font-medium text-gray-500 dark:text-gray-400 hover:text-orange-500 transition-colors self-start"
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
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-blue-500 hover:text-blue-600 dark:hover:text-white shadow-sm'
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
                : 'bg-white dark:bg-gray-800/80 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600 hover:text-gray-900 dark:hover:text-white shadow-sm'
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

      {/* 1st Row: Vehicle Hero Card & Suitability Gauge (or Lock CTA) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-8 flex flex-col">
          <VehicleInfoCard vehicle={selectedVehicle} evaluation={canShowScore ? activeEvaluation : null} />
        </div>
        <div className="lg:col-span-4 flex flex-col">
          {canShowScore && activeEvaluation ? (
            <SemiCircleGauge
              score={activeEvaluation.overallScore}
              status={activeEvaluation.overallStatus}
            />
          ) : (
            <div className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-800/90 rounded-2xl p-6 shadow-sm flex flex-col items-center justify-center text-center h-full space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-orange-500/10 text-orange-500 flex items-center justify-center">
                <Lock className="w-7 h-7" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-base font-bold text-gray-900 dark:text-white">
                  Suitability Score Locked
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed max-w-xs mx-auto">
                  {!currentUser
                    ? 'Scores are not shown until you log in and fill your profile questionnaire.'
                    : `We do not assume your profile inputs. Complete your ${isTwoWheeler ? '2-Wheeler' : 'Car'} questionnaire first to view your suitability score.`}
                </p>
              </div>
              <button
                onClick={() => (!currentUser ? setIsAuthModalOpen(true) : setActiveTab('profile'))}
                className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-white text-xs font-bold shadow-md transition-all ${
                  isTwoWheeler
                    ? 'bg-purple-600 hover:bg-purple-700'
                    : 'bg-orange-500 hover:bg-orange-600'
                }`}
              >
                {!currentUser ? <LogIn className="w-4 h-4" /> : <SlidersHorizontal className="w-4 h-4" />}
                <span>
                  {!currentUser ? 'Sign In to Unlock Score' : `Complete ${isTwoWheeler ? 'Bike' : 'Car'} Form`}
                </span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 2nd Row: Requirement-wise Scores (12 Dimensions — only shown after login & form completion) */}
      {canShowScore && activeEvaluation && (
        <RequirementGrid evaluation={activeEvaluation} />
      )}

      {/* 3rd Row: Powertrain & Fuel Variant Intelligence (or Rider Ergonomics when unlocked) */}
      {isTwoWheeler ? (
        canShowScore && activeEvaluation && (
          <RiderErgonomicsCard
            vehicle={selectedVehicle}
            evaluation={activeEvaluation}
            profile={bikeProfile}
          />
        )
      ) : (
        <PowertrainIntelligenceCard
          vehicle={selectedVehicle}
          evaluation={canShowScore ? activeEvaluation : null}
        />
      )}

      {/* 4th Row: Variant-Wise Features (CarWale-style matrix for cars) */}
      {!isTwoWheeler && (
        <VariantFeaturesPanel vehicle={selectedVehicle} />
      )}

      {/* 5th Row: Top Strengths and Tradeoffs (Objective vehicle traits before scoring; personalized after) */}
      <StrengthsConsiderations
        evaluation={canShowScore ? activeEvaluation : null}
        vehicle={selectedVehicle}
        profile={canShowScore ? (isTwoWheeler ? bikeProfile : userProfile) : {}}
      />
    </div>
  );
}
