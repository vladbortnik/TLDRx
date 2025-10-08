import React from 'react';
import { PLATFORM_ICONS, PLATFORM_COLORS } from '../../utils/ui-icons';

export const PlatformFilterButton = React.memo(function PlatformFilterButton({ platform, isSelected, onClick }) {
  const IconComponent = PLATFORM_ICONS[platform];
  const iconColor = PLATFORM_COLORS[platform];

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        onClick(platform);
      }}
      className={`
        relative w-8 h-8 sm:w-10 sm:h-10 rounded-lg transition-all duration-300
        flex items-center justify-center pointer-events-auto
        border-2 flex-shrink-0
        ${isSelected
          ? 'border-white bg-white/5 shadow-lg'
          : 'border-white/20 bg-white/5 hover:border-white/40 hover:bg-white/10'
        }
        transform hover:scale-105 active:scale-95
      `}
      style={{
        borderColor: isSelected ? iconColor : '',
        boxShadow: isSelected
          ? (() => {
              const rgb = iconColor.match(/\d+/g);
              return `0 0 15px rgba(${rgb.join(', ')}, 0.6), 0 0 30px rgba(${rgb.join(', ')}, 0.4), 0 0 45px rgba(${rgb.join(', ')}, 0.2), inset 0 0 10px rgba(${rgb.join(', ')}, 0.2)`;
            })()
          : 'none'
      }}
    >
      <IconComponent
        className="w-4 h-4 sm:w-5 sm:h-5"
        style={{ color: iconColor }}
      />

      {/* Removed the blue circle indicator - using enhanced glow instead */}
    </button>
  );
});