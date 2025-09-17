import React from 'react';
import { FaApple, FaWindows, FaLinux } from 'react-icons/fa';

const platformIcons = {
  macos: FaApple,
  windows: FaWindows,
  linux: FaLinux
};

const platformColors = {
  macos: 'rgb(200, 200, 200)',  // Changed from pure white to silver/gray
  windows: 'rgb(6, 182, 212)',  // Changed to cyan to match "Text Processing" category
  linux: 'rgb(251, 146, 60)'    // Changed to orange to match "Containers" category
};

export function PlatformFilterButton({ platform, isSelected, onClick }) {
  const IconComponent = platformIcons[platform];
  const iconColor = platformColors[platform];

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        onClick(platform);
      }}
      className={`
        relative w-10 h-10 rounded-lg transition-all duration-300
        flex items-center justify-center pointer-events-auto
        border-2
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
        className="w-5 h-5"
        style={{ color: iconColor }}
      />

      {/* Removed blue circle indicator - using enhanced glow instead */}
    </button>
  );
}