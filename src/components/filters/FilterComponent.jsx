import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronUp, X, Zap, Settings, Database, Shield, Code, Globe, Package, FileText, Wrench, Container, Bot, Filter as FilterIcon } from 'lucide-react';
import { FaCube, FaApple, FaWindows, FaLinux } from 'react-icons/fa6';

// 🔧 UPDATED: Aligned with Real Project's category mappings
const CATEGORIES = [
  { id: "file-operations", icon: FileText, color: "from-blue-400 to-blue-600", glow: "blue" },
  { id: "text-processing", icon: Wrench, color: "from-green-400 to-green-600", glow: "green" }, 
  { id: "system", icon: Settings, color: "from-purple-400 to-purple-600", glow: "purple" },
  { id: "networking", icon: Globe, color: "from-cyan-400 to-cyan-600", glow: "cyan" },
  { id: "shell", icon: Code, color: "from-orange-400 to-orange-600", glow: "orange" },
  { id: "development", icon: Code, color: "from-pink-400 to-pink-600", glow: "pink" },
  { id: "package-management", icon: Package, color: "from-indigo-400 to-indigo-600", glow: "indigo" },
  { id: "security", icon: Shield, color: "from-red-400 to-red-600", glow: "red" },
  { id: "containers", icon: Container, color: "from-teal-400 to-teal-600", glow: "teal" },
  { id: "automation", icon: Bot, color: "from-yellow-400 to-yellow-600", glow: "yellow" },
  { id: "data-processing", icon: Database, color: "from-emerald-400 to-emerald-600", glow: "emerald" }
];

// 🔧 UPDATED: Aligned with Real Project's platform mappings
const PLATFORMS = [
  { id: "linux", icon: FaLinux, color: "from-orange-400 to-orange-600", glow: "orange" },
  { id: "macos", icon: FaApple, color: "from-gray-400 to-gray-600", glow: "gray" }, 
  { id: "windows", icon: FaWindows, color: "from-blue-400 to-blue-600", glow: "blue" }
];

export function FilterComponent({ 
  selectedCategories = [], 
  selectedPlatforms = [], 
  onCategoryChange, 
  onPlatformChange,
  isVisible,
  wavePhase = 0
}) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredItem, setHoveredItem] = useState(null);
  const [clickAnimation, setClickAnimation] = useState(null);
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    platforms: true
  });
  const filterRef = useRef(null);

  // Mouse tracking for dynamic effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (filterRef.current) {
        const rect = filterRef.current.getBoundingClientRect();
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100
        });
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Dynamic gradient based on wave phase and mouse position
  const getDynamicGradient = () => {
    const r1 = Math.floor(15 + Math.sin(wavePhase * 0.02) * 15);
    const g1 = Math.floor(25 + Math.cos(wavePhase * 0.025) * 20);
    const b1 = Math.floor(45 + Math.sin(wavePhase * 0.03) * 25);
    
    const r2 = Math.floor(35 + Math.cos(wavePhase * 0.015) * 25);
    const g2 = Math.floor(30 + Math.sin(wavePhase * 0.035) * 15);
    const b2 = Math.floor(95 + Math.cos(wavePhase * 0.02) * 35);

    return {
      background: `
        radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
          rgba(59, 130, 246, 0.1) 0%, 
          transparent 50%),
        linear-gradient(135deg, 
          rgba(${r1},${g1},${b1},0.85), 
          rgba(${r2},${g2},${b2},0.75), 
          rgba(${r1+10},${g1+5},${b1+15},0.85))
      `,
      transition: 'background 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
    };
  };

  // Progressive blur header effect
  const getHeaderGradient = () => {
    const r = Math.floor(20 + Math.sin(wavePhase * 0.04) * 20);
    const g = Math.floor(30 + Math.cos(wavePhase * 0.03) * 25);
    const b = Math.floor(70 + Math.sin(wavePhase * 0.035) * 30);

    return {
      background: `
        linear-gradient(110deg, 
          rgba(${r},${g},${b},0.6), 
          rgba(${r+20},${g+15},${b+30},0.4), 
          rgba(${r+10},${g+5},${b+20},0.6))
      `,
      backdropFilter: 'blur(12px) brightness(1.1)',
      transition: 'all 0.3s ease'
    };
  };

  // 3D icon animation styles - ENHANCED for visibility
  const get3DIconStyle = (isSelected, isHovered, glowColor) => {
    const baseRotation = wavePhase * 1.0; // Increased from 0.5 for more visible rotation
    const hoverRotation = isHovered ? 25 : 0; // Increased from 15
    const selectedScale = isSelected ? 1.2 : 1; // Increased from 1.1
    const hoverScale = isHovered ? 1.1 : 1; // Increased from 1.05
    
    return {
      transform: `
        perspective(200px) 
        rotateX(${baseRotation + hoverRotation}deg) 
        rotateY(${baseRotation * 1.5}deg) 
        rotateZ(${baseRotation * 0.5}deg)
        scale(${selectedScale * hoverScale})
      `,
      filter: `
        drop-shadow(0 0 ${isSelected ? '25px' : isHovered ? '20px' : '12px'} 
        rgba(${getGlowColor(glowColor)}, ${isSelected ? '0.8' : isHovered ? '0.6' : '0.4'}))
        brightness(${isSelected ? '1.4' : isHovered ? '1.3' : '1.1'})
      `,
      transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
      transformStyle: 'preserve-3d'
    };
  };

  // Color mapping for glow effects
  const getGlowColor = (color) => {
    const colors = {
      blue: '59, 130, 246',
      green: '34, 197, 94',
      purple: '147, 51, 234',
      cyan: '6, 182, 212',
      orange: '249, 115, 22',
      pink: '236, 72, 153',
      indigo: '99, 102, 241',
      red: '239, 68, 68',
      teal: '20, 184, 166',
      yellow: '234, 179, 8',
      emerald: '16, 185, 129',
      gray: '107, 114, 128'
    };
    return colors[color] || '59, 130, 246';
  };

  // Handle selections with click animation
  const handleCategoryToggle = (category) => {
    setClickAnimation(`category-${category}`);
    setTimeout(() => setClickAnimation(null), 300);
    
    if (selectedCategories.includes(category)) {
      onCategoryChange(selectedCategories.filter(c => c !== category));
    } else {
      onCategoryChange([...selectedCategories, category]);
    }
  };

  const handlePlatformToggle = (platform) => {
    setClickAnimation(`platform-${platform}`);
    setTimeout(() => setClickAnimation(null), 300);
    
    if (selectedPlatforms.includes(platform)) {
      onPlatformChange(selectedPlatforms.filter(p => p !== platform));
    } else {
      onPlatformChange([...selectedPlatforms, platform]);
    }
  };

  const clearAllFilters = () => {
    setClickAnimation('clear-all');
    setTimeout(() => setClickAnimation(null), 300);
    onCategoryChange([]);
    onPlatformChange([]);
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const formatDisplayName = (str) => {
    return str.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  if (!isVisible) return null;

  const totalSelected = selectedCategories.length + selectedPlatforms.length;

  return (
    <div 
      ref={filterRef}
      className={`mt-3 transition-all duration-500 ease-out ${
        isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-2'
      }`}
      style={{
        animation: isVisible ? 'slideInUp 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)' : ''
      }}
    >
      <div 
        className="backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden shadow-2xl"
        style={getDynamicGradient()}
      >
        {/* Advanced Header with 3D Icon */}
        <div 
          className="border-b border-white/10 px-6 py-4 flex items-center justify-between relative"
          style={getHeaderGradient()}
        >
          <div className="flex items-center gap-4">
            {/* 3D Animated Filter Icon */}
            <div className="relative">
              <FilterIcon 
                className="w-5 h-5 text-cyan-300"
                style={{
                  transform: `
                    perspective(200px) 
                    rotateX(${wavePhase * 0.8}deg) 
                    rotateY(${wavePhase * 1.0}deg)
                  `,
                  filter: `drop-shadow(0 0 15px rgba(6, 182, 212, 0.6))`,
                  transition: 'all 0.1s ease',
                  transformStyle: 'preserve-3d'
                }}
              />
              <div className="absolute inset-0 animate-ping">
                <FaCube className="w-5 h-5 text-cyan-300/30" />
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="text-white text-lg font-bold tracking-wide bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
                Advanced Filters
              </span>
              {totalSelected > 0 && (
                <div className={`
                  bg-gradient-to-r from-cyan-400 to-blue-500 text-white text-xs px-3 py-1 
                  rounded-full font-bold shadow-lg transform transition-all duration-300
                  ${clickAnimation === 'selection-badge' ? 'animate-bounce' : ''}
                `}>
                  {totalSelected} active
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-pulse opacity-50"></div>
                </div>
              )}
            </div>
          </div>
          
          {totalSelected > 0 && (
            <button
              onClick={clearAllFilters}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium
                bg-gradient-to-r from-red-500/20 to-pink-500/20 text-red-300 
                border border-red-400/30 backdrop-blur-sm
                hover:from-red-500/30 hover:to-pink-500/30 hover:text-red-200
                transition-all duration-300 transform hover:scale-105
                ${clickAnimation === 'clear-all' ? 'animate-pulse scale-110' : ''}
              `}
              style={{
                boxShadow: '0 0 20px rgba(239, 68, 68, 0.2)'
              }}
            >
              <X className="w-4 h-4" />
              Clear All
            </button>
          )}
        </div>

        {/* Bento Grid Layout for Filters */}
        <div className="p-6 space-y-6">
          
          {/* Categories Section - Bento Grid */}
          <div className="space-y-4">
            <button
              onClick={() => toggleSection('categories')}
              className="flex items-center justify-between w-full text-left group"
            >
              <span className="text-white/90 text-lg font-semibold flex items-center gap-3">
                <Zap className="w-5 h-5 text-yellow-400" />
                Categories
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-white/60 font-medium">
                  {selectedCategories.length} selected
                </span>
                {expandedSections.categories ? (
                  <ChevronUp className="w-5 h-5 text-white/70 group-hover:text-yellow-400 transition-colors" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-white/70 group-hover:text-yellow-400 transition-colors" />
                )}
              </div>
            </button>
            
            {expandedSections.categories && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {CATEGORIES.map((category) => {
                  const isSelected = selectedCategories.includes(category.id);
                  const isHovered = hoveredItem === `category-${category.id}`;
                  const IconComponent = category.icon;
                  
                  return (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryToggle(category.id)}
                      onMouseEnter={() => setHoveredItem(`category-${category.id}`)}
                      onMouseLeave={() => setHoveredItem(null)}
                      className={`
                        relative group p-4 rounded-2xl transition-all duration-300 
                        transform hover:scale-105 hover:-translate-y-1
                        ${isSelected 
                          ? 'bg-gradient-to-br from-white/20 to-white/5 shadow-2xl' 
                          : 'bg-gradient-to-br from-white/10 to-white/5 hover:from-white/15 hover:to-white/10'
                        }
                        ${clickAnimation === `category-${category.id}` ? 'animate-pulse scale-110' : ''}
                      `}
                      style={{
                        border: isSelected 
                          ? `1px solid rgba(${getGlowColor(category.glow)}, 0.5)` 
                          : '1px solid rgba(255, 255, 255, 0.1)',
                        boxShadow: isSelected 
                          ? `0 0 30px rgba(${getGlowColor(category.glow)}, 0.3), inset 0 0 20px rgba(${getGlowColor(category.glow)}, 0.1)` 
                          : isHovered 
                            ? `0 0 20px rgba(${getGlowColor(category.glow)}, 0.2)` 
                            : '0 4px 20px rgba(0, 0, 0, 0.3)'
                      }}
                    >
                      {/* 3D Icon */}
                      <div className="flex flex-col items-center gap-3">
                        <div className="relative">
                          <IconComponent 
                            className="w-8 h-8 text-white"
                            style={get3DIconStyle(isSelected, isHovered, category.glow)}
                          />
                          {/* Background glow */}
                          <div 
                            className="absolute inset-0 rounded-full blur-xl"
                            style={{
                              background: `radial-gradient(circle, rgba(${getGlowColor(category.glow)}, ${isSelected ? '0.3' : '0.1'}) 0%, transparent 70%)`,
                              transform: 'scale(2)'
                            }}
                          />
                        </div>
                        
                        <span className={`
                          text-sm font-medium text-center transition-all duration-300
                          ${isSelected ? 'text-white' : 'text-white/80 group-hover:text-white'}
                        `}>
                          {formatDisplayName(category.id)}
                        </span>
                      </div>

                      {/* Selection indicator */}
                      {isSelected && (
                        <div className="absolute -top-1 -right-1">
                          <div className={`
                            w-6 h-6 rounded-full bg-gradient-to-r ${category.color} 
                            flex items-center justify-center shadow-lg animate-pulse
                          `}>
                            <Zap className="w-3 h-3 text-white" />
                          </div>
                        </div>
                      )}

                      {/* Hover effects */}
                      <div className={`
                        absolute inset-0 rounded-2xl transition-opacity duration-300
                        ${isHovered ? 'opacity-100' : 'opacity-0'}
                      `}>
                        <div 
                          className="absolute inset-0 rounded-2xl"
                          style={{
                            background: `linear-gradient(135deg, rgba(${getGlowColor(category.glow)}, 0.1), transparent)`
                          }}
                        />
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Platforms Section - Enhanced Layout */}
          <div className="space-y-4">
            <button
              onClick={() => toggleSection('platforms')}
              className="flex items-center justify-between w-full text-left group"
            >
              <span className="text-white/90 text-lg font-semibold flex items-center gap-3">
                <Settings className="w-5 h-5 text-cyan-400" />
                Platforms
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-white/60 font-medium">
                  {selectedPlatforms.length} selected
                </span>
                {expandedSections.platforms ? (
                  <ChevronUp className="w-5 h-5 text-white/70 group-hover:text-cyan-400 transition-colors" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-white/70 group-hover:text-cyan-400 transition-colors" />
                )}
              </div>
            </button>
            
            {expandedSections.platforms && (
              <div className="grid grid-cols-3 gap-4">
                {PLATFORMS.map((platform) => {
                  const isSelected = selectedPlatforms.includes(platform.id);
                  const isHovered = hoveredItem === `platform-${platform.id}`;
                  const IconComponent = platform.icon;
                  
                  return (
                    <button
                      key={platform.id}
                      onClick={() => handlePlatformToggle(platform.id)}
                      onMouseEnter={() => setHoveredItem(`platform-${platform.id}`)}
                      onMouseLeave={() => setHoveredItem(null)}
                      className={`
                        relative group p-6 rounded-2xl transition-all duration-300 
                        transform hover:scale-105 hover:-translate-y-1
                        ${isSelected 
                          ? 'bg-gradient-to-br from-white/25 to-white/10 shadow-2xl' 
                          : 'bg-gradient-to-br from-white/10 to-white/5 hover:from-white/20 hover:to-white/10'
                        }
                        ${clickAnimation === `platform-${platform.id}` ? 'animate-pulse scale-110' : ''}
                      `}
                      style={{
                        border: isSelected 
                          ? `2px solid rgba(${getGlowColor(platform.glow)}, 0.6)` 
                          : '1px solid rgba(255, 255, 255, 0.1)',
                        boxShadow: isSelected 
                          ? `0 0 40px rgba(${getGlowColor(platform.glow)}, 0.4), inset 0 0 30px rgba(${getGlowColor(platform.glow)}, 0.1)` 
                          : isHovered 
                            ? `0 0 25px rgba(${getGlowColor(platform.glow)}, 0.2)` 
                            : '0 6px 25px rgba(0, 0, 0, 0.3)'
                      }}
                    >
                      <div className="flex flex-col items-center gap-4">
                        {/* 3D Platform Icon */}
                        <div className="relative">
                          <IconComponent 
                            className="w-12 h-12 text-white"
                            style={get3DIconStyle(isSelected, isHovered, platform.glow)}
                          />
                          {/* Stronger glow for platforms */}
                          <div 
                            className="absolute inset-0 rounded-full blur-2xl"
                            style={{
                              background: `radial-gradient(circle, rgba(${getGlowColor(platform.glow)}, ${isSelected ? '0.4' : '0.2'}) 0%, transparent 70%)`,
                              transform: 'scale(2.5)'
                            }}
                          />
                        </div>
                        
                        <span className={`
                          text-base font-bold capitalize transition-all duration-300
                          ${isSelected ? 'text-white' : 'text-white/80 group-hover:text-white'}
                        `}>
                          {platform.id}
                        </span>
                      </div>

                      {/* Enhanced selection indicator */}
                      {isSelected && (
                        <div className="absolute -top-2 -right-2">
                          <div className={`
                            w-8 h-8 rounded-full bg-gradient-to-r ${platform.color} 
                            flex items-center justify-center shadow-xl animate-bounce
                          `}>
                            <Settings className="w-4 h-4 text-white" />
                          </div>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Enhanced Summary Footer */}
        {totalSelected > 0 && (
          <div 
            className="border-t border-white/10 px-6 py-4"
            style={getHeaderGradient()}
          >
            <div className="flex items-center justify-between">
              <div className="text-sm">
                <span className="text-white/70">Active filters: </span>
                {selectedCategories.length > 0 && (
                  <span className="text-cyan-300 font-semibold">
                    {selectedCategories.length} category{selectedCategories.length !== 1 ? 'ies' : ''}
                  </span>
                )}
                {selectedCategories.length > 0 && selectedPlatforms.length > 0 && (
                  <span className="text-white/50 mx-2">•</span>
                )}
                {selectedPlatforms.length > 0 && (
                  <span className="text-yellow-300 font-semibold">
                    {selectedPlatforms.length} platform{selectedPlatforms.length !== 1 ? 's' : ''}
                  </span>
                )}
              </div>
              
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-300 font-medium">Ready to filter</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Custom CSS for additional animations */}
      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
}
