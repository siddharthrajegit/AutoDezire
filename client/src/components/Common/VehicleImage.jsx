import React, { useState, useEffect, useRef } from 'react';
import { Car, Bike } from 'lucide-react';

/**
 * Universal Resilient Vehicle Image Component
 * - Bypasses CDN hotlink blockers with referrerPolicy="no-referrer"
 * - Removes CORS restriction (crossOrigin) to allow external image CDN rendering
 * - Synchronously checks cached images on mount so already-loaded images render instantly
 * - Displays an animated skeleton underneath while loading without blocking DOM visibility
 * - Automatically falls back to high-res automotive photos if a URL fails
 */
export default function VehicleImage({
  src,
  alt = 'Vehicle',
  className = '',
  category = 'Car',
  fallbackSrc = null,
  imgClassName = 'object-contain'
}) {
  const defaultCarFallback = 'https://imgd.aeplcdn.com/664x374/n/cw/ec/159099/swift-exterior-right-front-three-quarter.jpeg';
  const defaultBikeFallback = 'https://imgd.aeplcdn.com/900x506/n/cw/ec/195355/s1000rr-left-side-view-6.png?isig=0';
  const defaultScooterFallback = 'https://imgd.aeplcdn.com/664x374/n/cw/ec/1/versions/--standard1782976278426.jpg?q=80';

  const defaultFallback = (category === 'Scooter' || category === 'Electric Scooter')
    ? defaultScooterFallback
    : (category === 'Motorcycle' ? defaultBikeFallback : defaultCarFallback);

  const initialSrc = src || fallbackSrc || defaultFallback;
  const [imgSrc, setImgSrc] = useState(initialSrc);
  const [hasError, setHasError] = useState(!src);
  const [isLoading, setIsLoading] = useState(true);
  const imgRef = useRef(null);

  // Sync state when src prop changes
  useEffect(() => {
    const target = src || fallbackSrc || defaultFallback;
    setImgSrc(target);
    setHasError(!src);
    setIsLoading(true);
  }, [src, fallbackSrc, defaultFallback]);

  // Synchronously detect if image is already cached/complete in memory
  useEffect(() => {
    if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth > 0) {
      setIsLoading(false);
    }
  }, [imgSrc]);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(fallbackSrc || defaultFallback);
    }
    setIsLoading(false);
  };

  const isTwoWheeler = category === 'Motorcycle' || category === 'Scooter' || category === 'Electric Scooter';

  return (
    <div className={`relative overflow-hidden flex items-center justify-center ${className}`}>
      {/* Background Skeleton while loading */}
      {isLoading && (
        <div className="absolute inset-0 bg-slate-800/20 dark:bg-slate-800/50 animate-pulse flex items-center justify-center z-0">
          {isTwoWheeler ? (
            <Bike className="w-8 h-8 text-slate-400/40" />
          ) : (
            <Car className="w-8 h-8 text-slate-400/40" />
          )}
        </div>
      )}

      {/* Primary Vehicle Image */}
      <img
        ref={imgRef}
        src={imgSrc}
        alt={alt}
        referrerPolicy="no-referrer"
        loading="eager"
        decoding="async"
        onLoad={handleLoad}
        onError={handleError}
        className={`w-full h-full ${imgClassName} relative z-10`}
      />
    </div>
  );
}
