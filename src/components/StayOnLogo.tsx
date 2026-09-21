import React from 'react';

interface StayOnIconProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

const sizeMap = {
  xs: 'w-6 h-6',
  sm: 'w-7 h-7',
  md: 'w-9 h-9',
  lg: 'w-11 h-11',
  xl: 'w-14 h-14',
};

/**
 * StayOn Icon: The signature mint squircle with the green continuity pulse glyph.
 */
export const StayOnIcon: React.FC<StayOnIconProps> = ({ className, size = 'md' }) => {
  const dimensionClass = className || sizeMap[size];

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 rounded-[26%] bg-[#EAFDF3] border border-[#A7F3D0]/80 shadow-xs select-none ${dimensionClass}`}
      title="StayOn"
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-[68%] h-[68%]"
      >
        <path
          d="M 18 47 H 32 C 37 47 40.5 49.5 43.5 55 L 47.8 63.8 C 48.9 66 51.1 66 52.2 63.8 L 56.5 55 C 59.5 49.5 63 47 68 47 H 82"
          stroke="#059669"
          strokeWidth="8.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

interface StayOnLogoProps {
  className?: string;
  iconSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  subtitle?: string;
  showBadge?: boolean;
  badgeText?: string;
  isDark?: boolean;
}

/**
 * Full StayOn Logo: Icon + "StayOn" Wordmark + Optional ecosystem badge.
 */
export const StayOnLogo: React.FC<StayOnLogoProps> = ({
  className = '',
  iconSize = 'md',
  showSubtitle = true,
  subtitle = 'Continuous Learning & Daily Commitment',
  showBadge = true,
  badgeText = 'HelloPM Ecosystem',
  isDark = true,
}) => {
  const textSizes = {
    xs: 'text-sm',
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-xl',
    xl: 'text-2xl',
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <StayOnIcon size={iconSize} />
      <div>
        <div className="flex items-center gap-2">
          <span
            className={`font-black tracking-tight leading-none ${textSizes[iconSize]} ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            StayOn
          </span>
          {showBadge && (
            <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 hidden sm:inline leading-tight">
              {badgeText}
            </span>
          )}
        </div>
        {showSubtitle && (
          <p className="text-[11px] text-slate-400 -mt-0.5 hidden sm:block">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};

export default StayOnLogo;
