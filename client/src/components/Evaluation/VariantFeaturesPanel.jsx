import React, { useState, useEffect, useMemo } from 'react';
import {
  ShieldCheck,
  Sparkles,
  Tv,
  Sliders,
  Eye,
  Zap,
  Check,
  Minus,
  Award,
  Info,
  ChevronRight
} from 'lucide-react';
import { TRIM_VARIANTS_DATA } from '../../data/trimVariantsData';

const CATEGORY_META = {
  safety: {
    label: 'Safety & Driver Assistance',
    icon: ShieldCheck,
    color: 'text-emerald-400',
    borderColor: 'border-emerald-500/30'
  },
  comfort: {
    label: 'Comfort & Seating',
    icon: Sparkles,
    color: 'text-sky-400',
    borderColor: 'border-sky-500/30'
  },
  infotainment: {
    label: 'Infotainment & Connectivity',
    icon: Tv,
    color: 'text-purple-400',
    borderColor: 'border-purple-500/30'
  },
  convenience: {
    label: 'Convenience & Controls',
    icon: Sliders,
    color: 'text-amber-400',
    borderColor: 'border-amber-500/30'
  },
  exterior: {
    label: 'Exterior & Lighting',
    icon: Eye,
    color: 'text-pink-400',
    borderColor: 'border-pink-500/30'
  },
  performance: {
    label: 'Powertrain & Performance Tech',
    icon: Zap,
    color: 'text-orange-400',
    borderColor: 'border-orange-500/30'
  }
};

const CATEGORY_KEYS = ['safety', 'comfort', 'infotainment', 'convenience', 'exterior', 'performance'];

export default function VariantFeaturesPanel({ vehicle }) {
  if (!vehicle) return null;

  // Resolve trim variants from vehicle property or fallback to TRIM_VARIANTS_DATA map
  const trimVariants = useMemo(() => {
    if (vehicle.trimVariants && Array.isArray(vehicle.trimVariants) && vehicle.trimVariants.length > 0) {
      return vehicle.trimVariants;
    }
    if (vehicle.model && TRIM_VARIANTS_DATA[vehicle.model]) {
      return TRIM_VARIANTS_DATA[vehicle.model];
    }
    return [];
  }, [vehicle]);

  if (!trimVariants || trimVariants.length === 0) {
    return null;
  }

  // Find top model variant
  const topModel = useMemo(() => {
    return trimVariants.find(v => v.isTopModel) || trimVariants[trimVariants.length - 1];
  }, [trimVariants]);

  // Selected variant state (defaults to top model or first trim)
  const [selectedTrimName, setSelectedTrimName] = useState(() => topModel?.name || trimVariants[0]?.name);

  // Sync selected trim if vehicle changes
  useEffect(() => {
    if (topModel?.name) {
      setSelectedTrimName(topModel.name);
    } else if (trimVariants[0]?.name) {
      setSelectedTrimName(trimVariants[0].name);
    }
  }, [vehicle?.model, topModel, trimVariants]);

  // Active selected variant object
  const activeVariant = useMemo(() => {
    return trimVariants.find(v => v.name === selectedTrimName) || topModel || trimVariants[0];
  }, [trimVariants, selectedTrimName, topModel]);

  // Calculate master features by category from top model
  const masterCategories = useMemo(() => {
    if (!topModel?.features) return {};
    const res = {};
    CATEGORY_KEYS.forEach(key => {
      const list = topModel.features[key];
      if (list && Array.isArray(list) && list.length > 0) {
        res[key] = list;
      }
    });
    return res;
  }, [topModel]);

  // Total feature count calculations
  const totalMasterCount = useMemo(() => {
    return Object.values(masterCategories).reduce((sum, list) => sum + list.length, 0);
  }, [masterCategories]);

  const activeVariantFeatureSet = useMemo(() => {
    const set = new Set();
    if (!activeVariant?.features) return set;
    CATEGORY_KEYS.forEach(key => {
      const list = activeVariant.features[key];
      if (list && Array.isArray(list)) {
        list.forEach(item => set.add(item.toLowerCase().trim()));
      }
    });
    return set;
  }, [activeVariant]);

  const activeIncludedCount = useMemo(() => {
    let count = 0;
    Object.values(masterCategories).forEach(list => {
      list.forEach(feature => {
        if (activeVariantFeatureSet.has(feature.toLowerCase().trim())) {
          count++;
        }
      });
    });
    return count;
  }, [masterCategories, activeVariantFeatureSet]);

  const percentEquipped = totalMasterCount > 0 ? Math.round((activeIncludedCount / totalMasterCount) * 100) : 0;

  return (
    <div className="bg-[#111827] dark:bg-[#111827] border border-gray-800 rounded-2xl p-6 shadow-sm space-y-6 transition-colors duration-200">
      {/* Header Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-gray-800/80">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-wider bg-orange-500/10 text-orange-400 border border-orange-500/20">
              Variant Intelligence
            </span>
            <span className="text-xs text-gray-400">CarWale-style Feature Matrix</span>
          </div>
          <h3 className="text-xl font-bold text-white mt-1">
            {vehicle.brand} {vehicle.model} - Variant-Wise Features
          </h3>
          <p className="text-xs text-gray-400 mt-0.5">
            Select any variant on the left to see which top-model features are included and which are omitted.
          </p>
        </div>

        {/* Feature summary badge */}
        <div className="flex items-center space-x-4 bg-gray-900/80 border border-gray-800 rounded-xl px-4 py-2.5 self-start md:self-auto">
          <div>
            <div className="text-[11px] text-gray-400">Selected Trim Package</div>
            <div className="text-sm font-bold text-white flex items-center space-x-1.5">
              <span>{activeVariant.name}</span>
              {activeVariant.isTopModel && (
                <span className="px-1.5 py-0.2 rounded text-[10px] bg-emerald-500/20 text-emerald-400 font-semibold border border-emerald-500/30">
                  Top Trim
                </span>
              )}
            </div>
          </div>
          <div className="h-7 w-[1px] bg-gray-800" />
          <div>
            <div className="text-[11px] text-gray-400">Feature Match</div>
            <div className="text-sm font-bold text-emerald-400">
              {activeIncludedCount} / {totalMasterCount}{' '}
              <span className="text-xs text-gray-400 font-normal">({percentEquipped}%)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Two-Panel Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT PANEL: Variant Selection (30-35% width on desktop) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Select Variant ({trimVariants.length})
            </span>
            <span className="text-[11px] text-gray-500">Base to Top</span>
          </div>

          {/* Variant Cards List */}
          <div className="space-y-2.5">
            {trimVariants.map((v, index) => {
              const isSelected = v.name === activeVariant.name;
              
              // Count features in this variant
              let count = 0;
              if (v.features) {
                CATEGORY_KEYS.forEach(key => {
                  const arr = v.features[key];
                  if (arr && Array.isArray(arr)) {
                    arr.forEach(f => {
                      if (activeVariantFeatureSet.has(f.toLowerCase().trim())) {
                        count++;
                      }
                    });
                  }
                });
              }

              return (
                <button
                  key={v.name || index}
                  type="button"
                  onClick={() => setSelectedTrimName(v.name)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all duration-200 relative group flex items-center justify-between ${
                    isSelected
                      ? 'bg-orange-500/10 border-orange-500 text-white shadow-md shadow-orange-500/5 ring-1 ring-orange-500/40'
                      : 'bg-gray-900/60 border-gray-800 text-gray-300 hover:border-gray-700 hover:bg-gray-800/60 hover:text-white'
                  }`}
                >
                  <div className="flex items-center space-x-3 min-w-0">
                    {/* Active Indicator Bar */}
                    <div
                      className={`w-1.5 h-10 rounded-full transition-colors ${
                        isSelected ? 'bg-orange-500' : 'bg-gray-800 group-hover:bg-gray-700'
                      }`}
                    />
                    
                    <div className="min-w-0">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-bold text-white truncate">{v.name}</span>
                        {v.isTopModel && (
                          <span className="inline-flex items-center space-x-1 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                            <Award className="w-2.5 h-2.5" />
                            <span>Top Spec</span>
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-gray-400 mt-0.5 truncate">
                        {v.priceApprox ? (
                          <span className="font-semibold text-emerald-400">{v.priceApprox}</span>
                        ) : (
                          <span>Variant {index + 1}</span>
                        )}
                        <span className="text-gray-500 mx-1.5">•</span>
                        <span className="text-[11px] text-gray-400">
                          {v.isTopModel ? 'Full Equipment' : `Tier ${index + 1}`}
                        </span>
                      </div>
                    </div>
                  </div>

                  <ChevronRight
                    className={`w-4 h-4 flex-shrink-0 transition-transform ${
                      isSelected ? 'text-orange-500 translate-x-0.5' : 'text-gray-600 group-hover:text-gray-400'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Quick Informational Tip */}
          <div className="p-3.5 bg-gray-900/50 border border-gray-800/80 rounded-xl text-xs text-gray-400 space-y-1.5">
            <div className="flex items-center space-x-1.5 text-gray-300 font-semibold text-[11px]">
              <Info className="w-3.5 h-3.5 text-orange-400" />
              <span>How This Matrix Works</span>
            </div>
            <p className="text-[11px] leading-relaxed text-gray-400">
              All features from the flagship <span className="text-white font-medium">{topModel.name}</span> are shown on the right. When viewing a lower variant like <span className="text-orange-400 font-medium">{activeVariant.name}</span>, missing features are dimmed out while included ones shine bright.
            </p>
          </div>
        </div>

        {/* RIGHT PANEL: Category-Grouped Feature Matrix (65-70% width on desktop) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Active Variant Legend Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-gray-900/60 border border-gray-800/90 rounded-xl text-xs">
            <div className="flex items-center space-x-2">
              <span className="text-gray-400">Viewing specs for:</span>
              <span className="px-2 py-0.5 rounded-md bg-orange-500 text-white font-bold text-xs">
                {activeVariant.name}
              </span>
              {activeVariant.priceApprox && (
                <span className="text-emerald-400 font-semibold">({activeVariant.priceApprox})</span>
              )}
            </div>

            <div className="flex items-center space-x-4 text-[11px]">
              <div className="flex items-center space-x-1.5 text-gray-200">
                <span className="w-3.5 h-3.5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                  ✓
                </span>
                <span>Included</span>
              </div>
              <div className="flex items-center space-x-1.5 text-gray-500">
                <span className="w-3.5 h-3.5 rounded-full bg-gray-800 text-gray-500 flex items-center justify-center font-bold">
                  –
                </span>
                <span>Missing in this trim</span>
              </div>
            </div>
          </div>

          {/* Categories Loop */}
          <div className="space-y-6">
            {CATEGORY_KEYS.map(catKey => {
              const masterList = masterCategories[catKey];
              if (!masterList || masterList.length === 0) return null;

              const meta = CATEGORY_META[catKey] || {
                label: catKey.toUpperCase(),
                icon: Sparkles,
                color: 'text-gray-300'
              };
              const IconComponent = meta.icon;

              // Calculate count of features in this category present in activeVariant
              const categoryIncludedCount = masterList.filter(f =>
                activeVariantFeatureSet.has(f.toLowerCase().trim())
              ).length;

              return (
                <div
                  key={catKey}
                  className="bg-gray-900/40 border border-gray-800/70 rounded-xl p-4.5 space-y-3"
                >
                  {/* Category Header */}
                  <div className="flex items-center justify-between pb-2 border-b border-gray-800/60">
                    <div className="flex items-center space-x-2">
                      <IconComponent className={`w-4 h-4 ${meta.color}`} />
                      <h4 className="text-xs font-bold text-gray-200 uppercase tracking-wider">
                        {meta.label}
                      </h4>
                    </div>
                    <span className="text-[11px] font-medium text-gray-400">
                      <span className={categoryIncludedCount > 0 ? 'text-emerald-400 font-semibold' : 'text-gray-500'}>
                        {categoryIncludedCount}
                      </span>{' '}
                      / {masterList.length} Features
                    </span>
                  </div>

                  {/* Feature Cards Grid (2 columns on tablet/desktop, 1 column on mobile) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {masterList.map((feature, fIdx) => {
                      const isIncluded = activeVariantFeatureSet.has(feature.toLowerCase().trim());

                      return (
                        <div
                          key={fIdx}
                          className={`flex items-start space-x-2.5 px-3 py-2.5 rounded-lg border text-xs transition-all duration-150 ${
                            isIncluded
                              ? 'bg-gray-800/80 border-gray-700/80 text-gray-100 shadow-sm'
                              : 'bg-gray-950/20 border-dashed border-gray-800/50 text-gray-500 opacity-40 hover:opacity-60'
                          }`}
                        >
                          {/* Status Icon */}
                          <div className="flex-shrink-0 mt-0.5">
                            {isIncluded ? (
                              <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/40">
                                <Check className="w-2.5 h-2.5 stroke-[3]" />
                              </div>
                            ) : (
                              <div className="w-4 h-4 rounded-full bg-gray-800 text-gray-500 flex items-center justify-center border border-gray-700/60">
                                <Minus className="w-2.5 h-2.5 stroke-[2.5]" />
                              </div>
                            )}
                          </div>

                          {/* Feature Name */}
                          <div className="min-w-0 flex-1">
                            <span
                              className={`block leading-snug ${
                                isIncluded ? 'font-medium text-gray-100' : 'font-normal text-gray-500 line-through decoration-gray-600/40'
                              }`}
                            >
                              {feature}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
