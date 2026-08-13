import React, { useState, useEffect, useRef } from 'react';
import { getOptimizedImageUrl, getSrcSet } from '../../utils/mediaUrl';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  widthParam?: number;
  className?: string;
  aspectRatio?: 'square' | 'portrait' | 'landscape' | 'wide' | 'auto';
}

export const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  widthParam = 800,
  className = '',
  aspectRatio = 'auto',
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (containerRef.current) observer.unobserve(containerRef.current);
        }
      },
      { rootMargin: '200px 0px' }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const optimizedSrc = getOptimizedImageUrl(src, { width: widthParam });
  const srcSetVal = getSrcSet(src);

  const aspectClasses = {
    square: 'aspect-square',
    portrait: 'aspect-[3/4]',
    landscape: 'aspect-[16/10]',
    wide: 'aspect-[16/9]',
    auto: '',
  }[aspectRatio];

  return (
    <div ref={containerRef} className={`relative overflow-hidden bg-navy-900 ${aspectClasses} ${className}`}>
      {/* Shimmer Skeleton Placeholder */}
      {!isLoaded && !isError && (
        <div className="absolute inset-0 bg-gradient-to-r from-navy-900 via-navy-800 to-navy-900 animate-shimmer bg-[length:200%_100%]" />
      )}

      {/* Actual Image (Loaded only when isVisible is true) */}
      {isVisible && (
        <img
          src={isError ? 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=800&auto=format&fit=crop' : optimizedSrc}
          srcSet={srcSetVal || undefined}
          sizes={srcSetVal ? '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw' : undefined}
          alt={alt}
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          onError={() => {
            setIsLoaded(true);
            setIsError(true);
          }}
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          {...props}
        />
      )}
    </div>
  );
};

