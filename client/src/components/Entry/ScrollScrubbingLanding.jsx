import React, { useState, useEffect, useRef } from 'react';
import {
  Car,
  Bike,
  ArrowDown,
  Sparkles,
  ArrowRight,
  RefreshCw,
  X
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 150;

export default function ScrollScrubbingLanding({ onClose }) {
  const {
    entryVehicleType,
    setEntryVehicleType,
    setSelectedVehicleType,
    setShowScrollScrubbing,
    setActiveTab,
    updateProfile
  } = useApp();

  // Mode: 'select' or 'scrub' (if user clicked a category on dashboard, start in scrub immediately)
  const [mode, setMode] = useState(() => entryVehicleType ? 'scrub' : 'select');
  const [selectedType, setSelectedType] = useState(entryVehicleType || '4-wheeler');

  // Refs
  const overlayRef = useRef(null);
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const imagesRef = useRef({});

  // State
  const [scrollPercent, setScrollPercent] = useState(0);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);

  const startJourney = (type) => {
    setSelectedType(type);
    setEntryVehicleType(type);
    updateProfile({ categoryPreference: type === '4-wheeler' ? 'Car' : 'Motorcycle' });
    setMode('scrub');
    setScrollPercent(0);
    setLoadProgress(0);
    setIsReady(false);
  };

  // Preload all 150 WebP Image Frames (Apple's Method A)
  useEffect(() => {
    if (mode !== 'scrub') return;

    const folder = selectedType === '4-wheeler' ? 'car' : 'bike';
    const loadedImages = {};
    let loadedCount = 0;

    const renderCanvasImage = (img) => {
      const canvas = canvasRef.current;
      if (!canvas || !img) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const cWidth = canvas.width;
      const cHeight = canvas.height;
      if (cWidth === 0 || cHeight === 0) return;

      const iWidth = img.naturalWidth || 1280;
      const iHeight = img.naturalHeight || 720;

      const iRatio = iWidth / iHeight;
      const cRatio = cWidth / cHeight;

      let drawWidth = cWidth;
      let drawHeight = cHeight;
      let offsetX = 0;
      let offsetY = 0;

      if (cRatio > iRatio) {
        drawHeight = cWidth / iRatio;
        offsetY = (cHeight - drawHeight) / 2;
      } else {
        drawWidth = cHeight * iRatio;
        offsetX = (cWidth - drawWidth) / 2;
      }

      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, cWidth, cHeight);
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Re-render current frame on resize
      const currentFrameIndex = Math.max(1, Math.min(TOTAL_FRAMES, Math.round((scrollPercent / 100) * TOTAL_FRAMES) || 1));
      const currentImg = loadedImages[currentFrameIndex];
      if (currentImg && currentImg.complete) {
        renderCanvasImage(currentImg);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    // Preload image loop
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const frameNum = String(i).padStart(3, '0');
      const img = new Image();
      img.src = `/frames/${folder}/frame_${frameNum}.webp`;

      img.onload = () => {
        loadedCount++;
        loadedImages[i] = img;
        const progress = Math.round((loadedCount / TOTAL_FRAMES) * 100);
        setLoadProgress(progress);

        // Render frame 1 immediately when it loads
        if (i === 1) {
          renderCanvasImage(img);
        }

        if (loadedCount >= 20 && !isReady) {
          setIsReady(true);
        }
      };

      img.onerror = () => {
        loadedCount++;
      };
    }

    imagesRef.current = loadedImages;

    // GSAP ScrollTrigger timeline binding for 60-120fps buttery-smooth scrubbing
    const scrollContainer = overlayRef.current;
    const container = containerRef.current;
    if (!scrollContainer || !container) return;

    ScrollTrigger.getAll().forEach(t => t.kill());

    const playhead = { frame: 1 };

    const trigger = gsap.to(playhead, {
      frame: TOTAL_FRAMES,
      ease: 'none',
      scrollTrigger: {
        scroller: scrollContainer,
        trigger: container,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.2, // 1.2s smooth momentum deceleration
        onUpdate: (self) => {
          const frameIdx = Math.min(TOTAL_FRAMES, Math.max(1, Math.round(playhead.frame)));
          const img = loadedImages[frameIdx];
          if (img && img.complete) {
            renderCanvasImage(img);
          }
          setScrollPercent(Math.round(self.progress * 100));
        }
      }
    });

    return () => {
      window.removeEventListener('resize', handleResize);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [mode, selectedType]);

  const handleFinish = (targetTab = 'profile') => {
    setSelectedVehicleType(selectedType);
    setShowScrollScrubbing(false);
    setActiveTab(targetTab);
    if (onClose) onClose();
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 overflow-y-auto bg-black text-white selection:bg-orange-500 selection:text-white"
    >
      {/* MODE A: VEHICLE TYPE SELECTION SCREEN */}
      {mode === 'select' && (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 sm:p-12 relative bg-gradient-to-b from-gray-950 via-black to-gray-950">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Close / Skip button */}
          <button
            onClick={() => handleFinish('home')}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-all backdrop-blur-md"
            title="Skip to Dashboard"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="max-w-4xl w-full text-center space-y-8 relative z-10">
            <div className="space-y-3">
              <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 fill-current" />
                <span>Apple-Style 60FPS Frame Scrollytelling</span>
              </div>
              <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight">
                Welcome to <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-red-400 bg-clip-text text-transparent">AutoDezire</span>
              </h1>
              <p className="text-sm sm:text-base text-gray-400 max-w-xl mx-auto font-medium">
                Choose your category to begin the <strong>Buttery-Smooth 60FPS Scroll</strong> journey.
              </p>
            </div>

            {/* Selection Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              {/* Option 1: 4 Wheelers */}
              <div
                onClick={() => startJourney('4-wheeler')}
                className="group relative rounded-3xl overflow-hidden border border-gray-800 bg-gray-900/60 hover:border-orange-500/60 p-8 text-left cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-orange-500/10 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-orange-500/20 text-orange-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Car className="w-7 h-7" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-orange-400 uppercase tracking-widest">
                      Category 01
                    </span>
                    <h3 className="text-2xl font-black text-white mt-1">
                      4 Wheelers
                    </h3>
                    <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                      Cars, SUVs, Sedans & Electric Crossovers. Experience family comfort, NCAP safety, ground clearance, and highway poise.
                    </p>
                  </div>
                </div>

                <div className="mt-8 flex items-center justify-between pt-4 border-t border-gray-800/80">
                  <span className="text-xs font-bold text-gray-300 group-hover:text-orange-400 transition-colors">
                    150 High-Res WebP Frames • 60 FPS
                  </span>
                  <div className="w-9 h-9 rounded-full bg-orange-500 text-white flex items-center justify-center group-hover:translate-x-1 transition-transform">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Option 2: 2 Wheelers */}
              <div
                onClick={() => startJourney('2-wheeler')}
                className="group relative rounded-3xl overflow-hidden border border-gray-800 bg-gray-900/60 hover:border-purple-500/60 p-8 text-left cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/10 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Bike className="w-7 h-7" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-purple-400 uppercase tracking-widest">
                      Category 02
                    </span>
                    <h3 className="text-2xl font-black text-white mt-1">
                      2 Wheelers
                    </h3>
                    <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                      Motorcycles, Scooters & Electric 2-Wheelers. Experience agile city traffic slicing, retro cruiser thump, and instant EV torque.
                    </p>
                  </div>
                </div>

                <div className="mt-8 flex items-center justify-between pt-4 border-t border-gray-800/80">
                  <span className="text-xs font-bold text-gray-300 group-hover:text-purple-400 transition-colors">
                    150 High-Res WebP Frames • 60 FPS
                  </span>
                  <div className="w-9 h-9 rounded-full bg-purple-600 text-white flex items-center justify-center group-hover:translate-x-1 transition-transform">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleFinish('home')}
              className="text-xs font-semibold text-gray-500 hover:text-gray-300 transition-colors pt-4 inline-block"
            >
              Skip video and go directly to Dashboard →
            </button>
          </div>
        </div>
      )}

      {/* MODE B: 60FPS CANVAS IMAGE SEQUENCE JOURNEY (APPLE STYLE) */}
      {mode === 'scrub' && (
        <div ref={containerRef} className="relative min-h-[700vh] bg-black">
          {/* Top Floating Control Bar */}
          <div className="fixed top-0 inset-x-0 z-50 p-4 sm:p-6 bg-gradient-to-b from-black/90 via-black/40 to-transparent backdrop-blur-md flex items-center justify-between pointer-events-auto">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1">
                <span className="text-xl font-black text-white">Auto</span>
                <span className="text-xl font-black bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">Dezire</span>
              </div>

              {/* Category Switcher Pill */}
              <div className="flex items-center bg-gray-900/80 p-1 rounded-full border border-gray-800">
                <button
                  onClick={() => startJourney('4-wheeler')}
                  className={`flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-bold transition-all ${
                    selectedType === '4-wheeler'
                      ? 'bg-orange-500 text-white shadow-sm'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Car className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">4 Wheelers</span>
                </button>
                <button
                  onClick={() => startJourney('2-wheeler')}
                  className={`flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-bold transition-all ${
                    selectedType === '2-wheeler'
                      ? 'bg-purple-600 text-white shadow-sm'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Bike className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">2 Wheelers</span>
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <span className="text-xs font-mono text-orange-400 font-bold hidden sm:inline">
                {scrollPercent}% Scrolled (60 FPS)
              </span>

              <button
                onClick={() => setMode('select')}
                className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-semibold text-gray-200 transition-all"
              >
                Change Category
              </button>

              <button
                onClick={() => handleFinish('home')}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-all"
                title="Exit Experience"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Top Progress Bar */}
            <div className="absolute bottom-0 inset-x-0 h-1 bg-gray-800">
              <div
                className="h-full bg-gradient-to-r from-orange-500 via-amber-400 to-purple-500 transition-all duration-150"
                style={{ width: `${scrollPercent}%` }}
              />
            </div>
          </div>

          {/* Sticky Fullscreen Canvas Renderer */}
          <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-black">
            <canvas
              ref={canvasRef}
              className="w-full h-full object-cover filter brightness-[0.88]"
            />

            {/* Initial Frame Preload Indicator */}
            {loadProgress < 30 && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 text-gray-300 text-xs font-semibold space-y-3 z-10">
                <RefreshCw className="w-6 h-6 animate-spin text-orange-500" />
                <span>Preloading 60FPS Frames: {loadProgress}%...</span>
              </div>
            )}

            {/* Pulse Scroll Indicator Prompt */}
            {scrollPercent < 12 && (
              <div className="absolute bottom-6 right-6 flex flex-col items-end space-y-1.5 pointer-events-none animate-pulse z-30">
                <div className="px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-xs font-bold text-orange-400 flex items-center space-x-1.5">
                  <span>Scroll Down to Scrub Video</span>
                  <ArrowDown className="w-3.5 h-3.5" />
                </div>
              </div>
            )}

            {/* LOWER LEFT Text Overlays with Drop Shadow */}
            <div className="absolute bottom-12 left-6 sm:left-12 max-w-xl text-left pointer-events-none z-20 space-y-4">
              {/* Milestone 1: 0% - 25% */}
              {scrollPercent >= 0 && scrollPercent < 25 && (
                <div className="space-y-2.5 animate-fadeIn pointer-events-auto drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
                  <span className="inline-block px-3 py-1 rounded-full text-[10px] font-black bg-orange-500 text-white uppercase tracking-widest">
                    AutoDezire • {selectedType === '4-wheeler' ? '4 Wheelers' : '2 Wheelers'}
                  </span>
                  <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                    Find the automobile that fits YOU.
                  </h2>
                  <p className="text-xs sm:text-base text-gray-200 font-medium leading-relaxed max-w-md">
                    Scroll down to scrub the video forward. Scroll up to move backward.
                  </p>
                </div>
              )}

              {/* Milestone 2: 25% - 58% */}
              {scrollPercent >= 25 && scrollPercent < 58 && (
                <div className="space-y-2.5 animate-fadeIn pointer-events-auto drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
                  <span className="inline-block px-3 py-1 rounded-full text-[10px] font-black bg-purple-600 text-white uppercase tracking-widest">
                    Personalized Telematics
                  </span>
                  <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                    Not just another spec sheet.
                  </h2>
                  <p className="text-xs sm:text-base text-gray-200 font-medium leading-relaxed max-w-md">
                    We analyze your height, commute routes, road conditions, and top priorities to compute your fit.
                  </p>
                </div>
              )}

              {/* Milestone 3: 58% - 85% */}
              {scrollPercent >= 58 && scrollPercent < 85 && (
                <div className="space-y-2.5 animate-fadeIn pointer-events-auto drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
                  <span className="inline-block px-3 py-1 rounded-full text-[10px] font-black bg-emerald-500 text-white uppercase tracking-widest">
                    10 Requirement Scorecards
                  </span>
                  <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                    Safety, Clearance & Comfort.
                  </h2>
                  <p className="text-xs sm:text-base text-gray-200 font-medium leading-relaxed max-w-md">
                    Transparent 0–100 suitability scores with 10-15% budget margin & critical warning checks.
                  </p>
                </div>
              )}

              {/* Milestone 4: 85% - 100% */}
              {scrollPercent >= 85 && (
                <div className="space-y-4 animate-fadeIn pointer-events-auto drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
                  <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-orange-500 text-white text-[10px] font-black uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 fill-current" />
                    <span>Ready to find your match?</span>
                  </div>
                  <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                    Discover Your Automobile Fit
                  </h2>
                  <p className="text-xs sm:text-base text-gray-200 font-medium leading-relaxed max-w-md">
                    Start your personal suitability profile or explore recommended vehicles.
                  </p>

                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button
                      onClick={() => handleFinish('profile')}
                      className="px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-xs sm:text-sm shadow-lg hover:shadow-orange-500/30 transition-all flex items-center space-x-2"
                    >
                      <span>Start Questionnaire Profile</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => handleFinish('search')}
                      className="px-6 py-3 rounded-xl bg-white/20 hover:bg-white/30 text-white font-semibold text-xs sm:text-sm border border-white/30 backdrop-blur-md transition-all"
                    >
                      Browse Catalog
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
