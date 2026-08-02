import React from 'react';

interface SlantedAProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'display';
}

/**
 * SlantedA Component
 * Recreates the iconic Herb Lubalin ITC Avant Garde Gothic slanted 'A' letterform.
 */
export const SlantedA: React.FC<SlantedAProps> = ({ className = '', size = 'md' }) => {
  return (
    <span
      className={`inline-block transform -skew-x-[16deg] font-black tracking-tighter uppercase text-current transition-transform duration-300 hover:skew-x-[-22deg] ${className}`}
      style={{
        fontFamily: "'League Spartan', 'Outfit', sans-serif",
        display: 'inline-block',
        marginRight: '-0.02em',
        marginLeft: '-0.02em'
      }}
    >
      A
    </span>
  );
};

interface AvantGardeTextProps {
  text: string;
  className?: string;
}

/**
 * AvantGardeText Component
 * Replaces standard 'A' characters in text with the signature Avant Garde Slanted 'A'.
 */
export const AvantGardeText: React.FC<AvantGardeTextProps> = ({ text, className = '' }) => {
  // Split text around 'A' or 'a' to inject SlantedA
  const parts = text.split(/(A|a)/g);

  return (
    <span className={`font-avantgarde tracking-tight ${className}`}>
      {parts.map((part, index) => {
        if (part === 'A' || part === 'a') {
          return <SlantedA key={index} />;
        }
        return <span key={index}>{part}</span>;
      })}
    </span>
  );
};
