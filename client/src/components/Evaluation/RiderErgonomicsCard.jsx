import React from 'react';
import {
  Briefcase,
  Gauge,
  Users,
  CheckCircle2,
  AlertTriangle,
  Footprints,
  Sliders
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function RiderErgonomicsCard({ vehicle, evaluation, profile = {} }) {
  const navigate = useNavigate();
  if (!vehicle) return null;

  const isTwoWheeler = vehicle.category === 'Motorcycle' || vehicle.category === 'Scooter' || vehicle.category === 'Electric Scooter';
  if (!isTwoWheeler) return null;

  const riderHeight = profile.riderHeight || profile.height || 172;
  const riderWeight = profile.riderWeight || 68;
  const riderInseam = profile.riderInseam || Math.round(riderHeight * 0.455);
  const storageNeed = profile.storageRequirement || 'Medium';
  const pillionFreq = profile.pillionFrequency || 'Occasional';

  const fit = evaluation?.personalizedFit || {};
  const flatFoot = fit.flatFoot || {};
  const weightBalance = fit.weightBalance || {};
  const storage = fit.storage || {};
  const pillion = fit.pillion || {};

  const pros = evaluation?.personalizedPros || [];
  const cons = evaluation?.personalizedCons || [];

  // Flat-foot styling helper
  const getFlatFootStyle = (status) => {
    switch (status) {
      case 'comfortable':
        return {
          badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
          title: 'Confident Dual Flat-Foot',
          iconColor: 'text-emerald-400',
          bgRing: 'ring-emerald-500/20'
        };
      case 'manageable':
        return {
          badge: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
          title: 'Moderate Reach (Balls of Feet)',
          iconColor: 'text-blue-400',
          bgRing: 'ring-blue-500/20'
        };
      case 'tiptoe':
        return {
          badge: 'bg-amber-500/15 text-amber-400 border-amber-500/40',
          title: 'Tiptoe Reach (Flat-Foot Problem)',
          iconColor: 'text-amber-400',
          bgRing: 'ring-amber-500/30'
        };
      case 'severe_hazard':
      default:
        return {
          badge: 'bg-rose-500/15 text-rose-400 border-rose-500/40',
          title: 'Severe Tip-Over Hazard',
          iconColor: 'text-rose-400',
          bgRing: 'ring-rose-500/30'
        };
    }
  };

  const ffStyle = getFlatFootStyle(flatFoot.status);

  // Storage styling helper
  const storageLitres = vehicle.underseatStorageLitres || 0;
  const isStorageProblem = storage.isMismatched || (storageNeed !== 'Light' && storageLitres === 0);

  return (
    <div className="bg-[#111827] dark:bg-[#111827] border border-gray-800 rounded-2xl p-6 shadow-sm space-y-6 transition-colors duration-200">
      {/* Header & Rider Profile Context Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-gray-800">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <Footprints className="w-5 h-5 text-orange-500" />
            <h3 className="text-lg font-bold text-white tracking-tight">
              Personalized Rider Fit & Ergonomics
            </h3>
            <span className="px-2.5 py-0.5 rounded-lg text-[11px] font-bold bg-orange-500/10 text-orange-400 border border-orange-500/30">
              Personalized Profile Analysis
            </span>
          </div>
          <p className="text-xs text-gray-400">
            Real-world ergonomic reach, luggage practicality, and low-speed balance evaluated against your personal physical measurements.
          </p>
        </div>

        {/* Profile Pill & Edit Button */}
        <div className="flex items-center space-x-3 bg-gray-900/80 px-3.5 py-2 rounded-xl border border-gray-800 text-xs self-start md:self-auto">
          <div className="flex items-center space-x-2">
            <span className="text-gray-400 font-medium">Your Stature:</span>
            <span className="text-white font-bold">{riderHeight} cm</span>
            <span className="text-gray-500">/</span>
            <span className="text-white font-bold">{riderWeight} kg</span>
            <span className="text-gray-500">•</span>
            <span className="text-gray-400">Storage:</span>
            <span className="text-purple-400 font-bold">{storageNeed}</span>
          </div>
          <button
            onClick={() => navigate('/profile')}
            className="text-orange-400 hover:text-orange-300 font-bold flex items-center space-x-1 pl-2 border-l border-gray-700 transition-colors"
            title="Edit Rider Questionnaire"
          >
            <Sliders className="w-3 h-3" />
            <span>Edit</span>
          </button>
        </div>
      </div>

      {/* 4 Ergonomic Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. Flat-Foot Reach */}
        <div className={`bg-gray-900/90 rounded-xl p-4 border border-gray-800 flex flex-col justify-between space-y-3 relative ring-1 ${ffStyle.bgRing}`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-400 flex items-center space-x-1.5">
              <Footprints className="w-4 h-4 text-gray-400" />
              <span>Flat-Foot Reach</span>
            </span>
            <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${ffStyle.badge}`}>
              {vehicle.seatHeight || 790} mm Seat
            </span>
          </div>

          <div>
            <h4 className={`text-sm font-extrabold ${ffStyle.iconColor}`}>
              {ffStyle.title}
            </h4>
            <p className="text-[11px] text-gray-300 mt-1 leading-relaxed line-clamp-3">
              {flatFoot.detail || `Seat height of ${vehicle.seatHeight}mm evaluated for your ${riderHeight}cm height.`}
            </p>
          </div>

          <div className="pt-2 border-t border-gray-800 text-[10px] text-gray-400 flex justify-between">
            <span>Inseam: ~{riderInseam} cm</span>
            <span>Saddle: {vehicle.seatWidth || 'Medium'}</span>
          </div>
        </div>

        {/* 2. Underseat Boot Storage */}
        <div className={`bg-gray-900/90 rounded-xl p-4 border border-gray-800 flex flex-col justify-between space-y-3 relative ring-1 ${isStorageProblem ? 'ring-amber-500/30' : 'ring-emerald-500/20'}`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-400 flex items-center space-x-1.5">
              <Briefcase className="w-4 h-4 text-gray-400" />
              <span>Underseat Storage</span>
            </span>
            <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${
              storageLitres >= 26
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                : storageLitres > 0
                ? 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                : 'bg-rose-500/15 text-rose-400 border-rose-500/30'
            }`}>
              {storageLitres} Litres
            </span>
          </div>

          <div>
            <h4 className={`text-sm font-extrabold ${isStorageProblem ? 'text-amber-400' : 'text-emerald-400'}`}>
              {storageLitres >= 30
                ? 'Large Boot (2 Helmets)'
                : storageLitres >= 18
                ? 'Standard Boot (1 Helmet)'
                : storageLitres > 0
                ? 'Compact Pocket Space'
                : 'Zero Underseat Boot (0L)'}
            </h4>
            <p className="text-[11px] text-gray-300 mt-1 leading-relaxed line-clamp-3">
              {storage.detail || (storageLitres === 0 ? 'No underseat storage space; external luggage carrier required.' : `${storageLitres}L underseat capacity.`)}
            </p>
          </div>

          <div className="pt-2 border-t border-gray-800 text-[10px] text-gray-400 flex justify-between">
            <span>Required: {storageNeed}</span>
            <span className={isStorageProblem ? 'text-amber-400 font-bold' : 'text-emerald-400 font-bold'}>
              {isStorageProblem ? 'Storage Mismatch' : 'Matches Need'}
            </span>
          </div>
        </div>

        {/* 3. Weight to Rider Ratio */}
        <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-400 flex items-center space-x-1.5">
              <Gauge className="w-4 h-4 text-gray-400" />
              <span>Weight & Balance</span>
            </span>
            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-gray-800 text-gray-300 border border-gray-700">
              {vehicle.kerbWeight || 150} kg Kerb
            </span>
          </div>

          <div>
            <h4 className="text-sm font-extrabold text-white">
              {vehicle.kerbWeight <= 125
                ? 'Featherweight Handler'
                : vehicle.kerbWeight <= 165
                ? 'Balanced City Weight'
                : 'Heavy Cruiser Build'}
            </h4>
            <p className="text-[11px] text-gray-300 mt-1 leading-relaxed line-clamp-3">
              {weightBalance.detail || `${vehicle.kerbWeight}kg kerb weight vs your ${riderWeight}kg body mass.`}
            </p>
          </div>

          <div className="pt-2 border-t border-gray-800 text-[10px] text-gray-400 flex justify-between">
            <span>Ratio: {(vehicle.kerbWeight && riderWeight ? (vehicle.kerbWeight / riderWeight).toFixed(1) : 2.5)}x body mass</span>
            <span className="text-gray-300 font-medium">
              {vehicle.kerbWeight <= 150 ? 'Easy Reverse' : 'Requires Effort'}
            </span>
          </div>
        </div>

        {/* 4. Riding Posture & Pillion */}
        <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-400 flex items-center space-x-1.5">
              <Users className="w-4 h-4 text-gray-400" />
              <span>Posture & Pillion</span>
            </span>
            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-purple-500/10 text-purple-400 border border-purple-500/30">
              {vehicle.riderTriangle || 'Upright Commuter'}
            </span>
          </div>

          <div>
            <h4 className="text-sm font-extrabold text-white">
              {pillion.comfortScore >= 8 ? 'Plush Pillion Pad' : 'Standard Pillion'}
            </h4>
            <p className="text-[11px] text-gray-300 mt-1 leading-relaxed line-clamp-3">
              {pillion.detail || `Rated ${vehicle.pillionSeatComfort || 7}/10 for ${pillionFreq} passenger comfort.`}
            </p>
          </div>

          <div className="pt-2 border-t border-gray-800 text-[10px] text-gray-400 flex justify-between">
            <span>Passenger: {pillionFreq}</span>
            <span>Ground Clr: {vehicle.groundClearance || 165} mm</span>
          </div>
        </div>
      </div>

      {/* Personalized Pros and Cons Section */}
      <div className="pt-2 space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">
          Personalized Pros & Cons Checklist for {profile.name || 'Your Profile'}
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Personalized Pros */}
          <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-xl p-4 space-y-3">
            <div className="flex items-center space-x-2 text-emerald-400 font-extrabold text-xs uppercase tracking-wide">
              <CheckCircle2 className="w-4 h-4" />
              <span>Personalized Advantages (Pros)</span>
            </div>

            {pros.length > 0 ? (
              <div className="space-y-2.5">
                {pros.map((p, idx) => (
                  <div key={idx} className="flex items-start space-x-2 text-xs">
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex-shrink-0 mt-0.5">
                      {p.tag}
                    </span>
                    <p className="text-gray-200 leading-snug">
                      <strong className="text-emerald-300">{p.title}:</strong> {p.description}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-gray-400 italic">
                Standard capability across regular city criteria.
              </p>
            )}
          </div>

          {/* Personalized Cons & Trade-Offs */}
          <div className="bg-amber-950/20 border border-amber-500/30 rounded-xl p-4 space-y-3">
            <div className="flex items-center space-x-2 text-amber-400 font-extrabold text-xs uppercase tracking-wide">
              <AlertTriangle className="w-4 h-4" />
              <span>Personalized Limitations & Hazards (Cons)</span>
            </div>

            {cons.length > 0 ? (
              <div className="space-y-2.5">
                {cons.map((c, idx) => (
                  <div key={idx} className="flex items-start space-x-2 text-xs">
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold border flex-shrink-0 mt-0.5 ${
                      c.severity === 'danger'
                        ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                        : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    }`}>
                      {c.tag}
                    </span>
                    <p className="text-gray-200 leading-snug">
                      <strong className={c.severity === 'danger' ? 'text-rose-300' : 'text-amber-300'}>
                        {c.title}:
                      </strong>{' '}
                      {c.description}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-gray-400 italic">
                No notable physical constraints or ergonomic conflicts found for your profile.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
