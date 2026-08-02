import React, { useState } from 'react';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  fallbackSrc?: string;
  alt: string;
  aspectRatio?: string;
  objectFit?: 'object-cover' | 'object-contain' | 'object-fill' | 'object-none' | 'object-scale-down';
  className?: string;
  containerClassName?: string;
}

export const LazyImage: React.FC<LazyImageProps> = ({
  src,
  fallbackSrc = '/images/avatar.svg',
  alt,
  aspectRatio = 'aspect-video',
  objectFit = 'object-cover',
  className = '',
  containerClassName = '',
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setIsLoaded(true);
    }
  };

  const imageSource = hasError && fallbackSrc ? fallbackSrc : src;

  return (
    <div className={`relative overflow-hidden ${aspectRatio} ${containerClassName}`}>
      {/* Skeleton Loading State */}
      {!isLoaded && (
        <div className="absolute inset-0 animate-pulse bg-zinc-800/80" />
      )}

      {/* Actual Lazy Loaded Image */}
      <img
        src={imageSource}
        alt={alt}
        loading="lazy"
        onLoad={handleLoad}
        onError={handleError}
        className={`w-full h-full ${objectFit} transition-opacity duration-300 ease-out ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
        {...props}
      />
    </div>
  );
};
