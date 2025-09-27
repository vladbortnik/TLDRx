/**
 * CommandCardHeader Component
 * 
 * The first line of the command card displaying:
 * - Command name (highlighted as main element)
 * - Stands for text
 * - Rolling description on hover
 * - Platform icons
 * - Category badge
 * - Safety badge
 * 
 * Mobile-first responsive design with proper breakpoints
 */

import React from 'react';
import {
  Settings,
  Shield,
  Terminal,
  FileText,
  Globe,
  Database,
  Package,
  Code,
  Bot,
  Container,
  Wrench
} from 'lucide-react';
import { FaApple, FaWindows, FaLinux } from 'react-icons/fa';

// Platform Configuration
const PLATFORM_ICONS = {
  linux: FaLinux,
  macos: FaApple,
  windows: FaWindows
};

const PLATFORM_COLORS = {
  macos: 'rgb(200, 200, 200)',  // Silver/gray
  windows: 'rgb(6, 182, 212)',   // Cyan
  linux: 'rgb(251, 146, 60)'     // Orange
};

// Category Configuration
const CATEGORIES = [
  // System Group (Purple/Violet)
  { id: "system", icon: Settings, color: "from-purple-400 to-violet-600", name: "System" },
  { id: "security", icon: Shield, color: "from-violet-400 to-purple-600", name: "Security" },
  { id: "shell", icon: Terminal, color: "from-indigo-400 to-purple-600", name: "Shell" },

  // File/Data Group (Blue/Cyan)
  { id: "file-operations", icon: FileText, color: "from-blue-400 to-cyan-600", name: "File Operations" },
  { id: "text-processing", icon: Wrench, color: "from-cyan-400 to-blue-600", name: "Text Processing" },
  { id: "data-processing", icon: Database, color: "from-sky-400 to-cyan-600", name: "Data Processing" },

  // Network/Dev Group (Green/Emerald)
  { id: "networking", icon: Globe, color: "from-emerald-400 to-green-600", name: "Networking" },
  { id: "development", icon: Code, color: "from-green-400 to-emerald-600", name: "Development" },
  { id: "package-management", icon: Package, color: "from-teal-400 to-emerald-600", name: "Package Management" },

  // Automation Group (Orange/Yellow)
  { id: "containers", icon: Container, color: "from-orange-400 to-amber-600", name: "Containers" },
  { id: "automation", icon: Bot, color: "from-amber-400 to-orange-600", name: "Automation" }
];

// Safety Configuration - Distinct from category colors
const SAFETY_COLORS = {
  safe: {
    bg: 'from-lime-500 to-lime-700',  // Lime green instead of emerald
    border: 'border-lime-500/60',
    text: 'text-black',
    glow: '0 0 15px rgba(132, 204, 22, 0.5)'
  },
  caution: {
    bg: 'from-yellow-500 to-yellow-600',  // Pure yellow instead of amber
    border: 'border-yellow-500/60',
    text: 'text-black',
    glow: '0 0 15px rgba(234, 179, 8, 0.5)'
  },
  dangerous: {
    bg: 'from-red-500 to-red-700',  // Red instead of purple
    border: 'border-red-500/60',
    text: 'text-white',
    glow: '0 0 15px rgba(239, 68, 68, 0.5)'
  }
};

/**
 * Helper function to get category glow color based on category ID
 * Groups categories by their visual theme colors
 */
const getCategoryGlow = (categoryId) => {
  if (categoryId.includes('system') || categoryId.includes('security') || categoryId.includes('shell')) {
    return '139, 92, 246'; // Purple
  }
  if (categoryId.includes('file') || categoryId.includes('text') || categoryId.includes('data')) {
    return '59, 130, 246'; // Blue
  }
  if (categoryId.includes('network') || categoryId.includes('dev') || categoryId.includes('package')) {
    return '16, 185, 129'; // Green
  }
  return '251, 146, 60'; // Orange (containers, automation)
};

/**
 * Command Name Component
 * Displays the command name with Matrix-style green glow effects
 */
const CommandName = ({ name, screenSize }) => (
  <div className="relative">
    <div className="absolute inset-0 blur-xl opacity-50"
         style={{
           background: 'radial-gradient(ellipse at center, rgba(0, 168, 45, 0.6) 0%, transparent 70%)',
           animation: 'matrix-aura 2s ease-in-out infinite'
         }}
    />
    <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl font-black font-mono relative"
        style={{
          color: '#00a82d',
          textShadow: `
            0 0 20px rgba(0, 168, 45, 1),
            0 0 40px rgba(0, 168, 45, 0.8),
            0 0 60px rgba(0, 168, 45, 0.6),
            0 0 80px rgba(0, 168, 45, 0.4)
          `,
          animation: 'matrix-glow-pulse 1.5s ease-in-out infinite, matrix-float 3s ease-in-out infinite',
          letterSpacing: screenSize === 'mobile' || screenSize === 'tablet' ? '0.05em' : '0.08em',
          fontWeight: 900
        }}>
      <span className="relative">
        {name || 'Unknown'}
        <span className="absolute inset-0 overflow-hidden pointer-events-none">
          <span className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-green-300/50 to-transparent"
                style={{
                  animation: 'matrix-scanline 3s linear infinite',
                  top: '50%'
                }}
          />
        </span>
      </span>
    </h1>
  </div>
);

/**
 * StandsFor Section Component
 * Displays what the command stands for with rolling description animation
 * Description appears on hover over the entire name-standsFor section
 */
const StandsForSection = ({ standsFor, description, showDescription }) => {
  if (!standsFor) return null;
  
  // Debug logging
  // console.log('StandsForSection:', { standsFor, description, showDescription });
  
  /**
   * Calculate responsive max-width for description based on viewport
   * Mobile-first approach with progressive enhancement
   */
  const getDescriptionMaxWidth = () => {
    const width = window.innerWidth;
    
    if (width < 360) return '150px';    // Very small phones
    if (width < 480) return '200px';    // Small phones
    if (width < 640) return '250px';    // Large phones
    if (width < 768) return '300px';    // Tablets
    if (width < 1024) return '400px';   // Small laptops
    if (width < 1440) return '500px';   // Desktop
    return '700px';                      // Wide screens
  };

  return (
    <>
      {/* Vertical Divider between name and standsFor */}
      <div className="h-6 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent self-center" />
      
      <div className="relative flex items-baseline overflow-hidden">
        {/* StandsFor text - hidden when description is shown */}
        <span 
          className="text-xs sm:text-sm text-white/50 font-normal transition-all hover:text-white/70 whitespace-nowrap"
          style={{
            opacity: showDescription ? 0 : 1,
            transform: showDescription ? 'translateX(-20px)' : 'translateX(0)',
            transition: 'opacity 0.8s ease, transform 0.8s ease',
            position: showDescription ? 'absolute' : 'relative'
          }}
        >
          {standsFor}
        </span>
        
        {/* Rolling Description - appears in place */}
        <div 
          className="overflow-hidden pointer-events-none"
          style={{
            maxWidth: showDescription ? getDescriptionMaxWidth() : '0px',
            opacity: showDescription ? 1 : 0,
            transition: 'max-width 2.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.8s ease 0.2s',
            whiteSpace: 'nowrap'
          }}
        >
          <span className="text-xs sm:text-sm text-white/60 font-normal">
            {description || 'No description available'}
          </span>
        </div>
      </div>
    </>
  );
};

/**
 * Platform Icons Component
 * Displays up to 3 platform icons with appropriate colors
 */
const PlatformIcons = ({ platforms }) => {
  if (!platforms || platforms.length === 0) return null;

  return (
    <div className="flex items-center gap-1.5 md:gap-2">
      {platforms.slice(0, 3).map((platform, index) => {
        const platformId = typeof platform === 'string' 
          ? platform 
          : platform?.id || platform?.name || 'unknown';
        const PlatformIcon = PLATFORM_ICONS[platformId];
        const iconColor = PLATFORM_COLORS[platformId] || 'rgb(200, 200, 200)';
        
        if (!PlatformIcon) return null;
        
        return (
          <div
            key={`platform-${platformId}-${index}`}
            className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 rounded-lg flex items-center justify-center bg-black/40 backdrop-blur-sm border border-white/30 transition-transform duration-200 hover:scale-110"
            style={{
              boxShadow: `0 0 10px rgba(${iconColor.match(/\d+/g).join(', ')}, 0.4)`
            }}
            title={platformId.charAt(0).toUpperCase() + platformId.slice(1)}
          >
            <PlatformIcon
              className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4"
              style={{ color: iconColor }}
            />
          </div>
        );
      })}
      
      {/* Show +N indicator if more than 3 platforms */}
      {platforms.length > 3 && (
        <span className="text-[9px] sm:text-[10px] text-white/50 font-medium">
          +{platforms.length - 3}
        </span>
      )}
    </div>
  );
};

/**
 * Category Badge Component
 * Displays the command category with icon and colored background
 */
// Category abbreviations for space-saving
const CATEGORY_ABBREVIATIONS = {
  "file-operations": "Files",
  "text-processing": "Text",
  "data-processing": "Data",
  "package-management": "Packages",
  "system": "System",
  "security": "Security",
  "shell": "Shell",
  "networking": "Network",
  "development": "Dev",
  "containers": "Containers",
  "automation": "Automation"
};

const CategoryBadge = ({ category }) => {
  if (!category) return null;
  
  const categoryConfig = CATEGORIES.find(cat => cat.id === category);
  if (!categoryConfig) return null;
  
  const displayText = CATEGORY_ABBREVIATIONS[category] || categoryConfig.name;
  
  return (
    <div className={`
      px-1.5 sm:px-2 md:px-2.5 
      py-0.5 
      rounded-md 
      text-[8px] sm:text-[9px] md:text-[10px] 
      font-medium
      bg-gradient-to-r ${categoryConfig.color} 
      text-white
      border border-white/30 
      shadow-lg
    `}
    style={{
      boxShadow: `0 0 12px rgba(${getCategoryGlow(categoryConfig.id)}, 0.4)`
    }}>
      <span className="whitespace-nowrap">
        {displayText}
      </span>
    </div>
  );
};

/**
 * Safety Badge Component
 * Color-coded badge indicating command safety level
 */
const SafetyBadge = ({ safety }) => {
  const safetyConfig = SAFETY_COLORS[safety] || SAFETY_COLORS.safe;
  
  return (
    <div className={`
      relative 
      px-1 sm:px-1.5 md:px-2 
      py-0.5 
      rounded-md 
      text-[8px] sm:text-[9px] md:text-[10px] 
      font-bold 
      uppercase 
      tracking-wide
      bg-gradient-to-r ${safetyConfig.bg} 
      ${safetyConfig.border} 
      border
      ${safetyConfig.text} 
      backdrop-blur-sm 
      z-10
    `}
    style={{ boxShadow: safetyConfig.glow }}>
      {safety || 'safe'}
    </div>
  );
};

/**
 * Main CommandCardHeader Component
 * Orchestrates the first line of the command card
 */
export function CommandCardHeader({ 
  command, 
  screenSize,
  showDescription,
  onDescriptionHover
}) {
  return (
    <div className="relative px-2 sm:px-3 md:px-4 py-2 md:py-3 border-b border-white/10">
      <div className="flex items-center justify-between gap-2 md:gap-4">
        
        {/* Left Group: Command Name | Stands For - Hover this entire section for description */}
        <div 
          className="flex items-baseline gap-2 md:gap-3"
          onMouseEnter={() => onDescriptionHover(true)}
          onMouseLeave={() => onDescriptionHover(false)}
        >
          <CommandName name={command?.name} screenSize={screenSize} />
          <StandsForSection 
            standsFor={command?.standsFor}
            description={command?.description}
            showDescription={showDescription}
          />
        </div>

        {/* Right Group: Platform Icons, Category Badge, Safety Badge */}
        <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
          <PlatformIcons platforms={command?.platform} />
          <CategoryBadge category={command?.category} />
          <SafetyBadge safety={command?.safety} />
        </div>
      </div>
    </div>
  );
}

export default CommandCardHeader;
