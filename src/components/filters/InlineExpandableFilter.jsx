import React, { useState, useEffect } from 'react';
import { X, Monitor, Zap, Sparkles, Filter } from 'lucide-react';
import { PlatformFilter } from './PlatformFilter.jsx';
import { CategoryFilter } from './CategoryFilter.jsx';

export function InlineExpandableFilter({ 
  isOpen = false, 
  onToggle = () => {},
  selectedPlatform = "all", 
  selectedCategory = "all",
  onPlatformChange = () => {},
  onCategoryChange = () => {}
}) {
  const [wavePhase, setWavePhase] = useState(0);
  const [hologramShift, setHologramShift] = useState(0);
  const [morphState, setMorphState] = useState(0);
  const [sparkles, setSparkles] = useState([]);
  const [energyPulse, setEnergyPulse] = useState(0);

  // Initialize floating sparkles
  useEffect(() => {
    const newSparkles = Array.from({ length: 6 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      delay: Math.random() * 2000
    }));
    setSparkles(newSparkles);
  }, [isOpen]);

  // Wave animation
  useEffect(() => {
    const interval = setInterval(() => {
      setWavePhase(prev => (prev + 2) % 360);
    }, 60);
    return () => clearInterval(interval);
  }, []);

  // Holographic color shifting
  useEffect(() => {
    const interval = setInterval(() => {
      setHologramShift(prev => (prev + 3) % 360);
    }, 80);
    return () => clearInterval(interval);
  }, []);

  // Morphing animation
  useEffect(() => {
    const interval = setInterval(() => {
      setMorphState(prev => (prev + 1.5) % 360);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // Energy pulse effect
  useEffect(() => {
    const interval = setInterval(() => {
      setEnergyPulse(prev => (prev + 4) % 360);
    }, 120);
    return () => clearInterval(interval);
  }, []);

  // Enhanced liquid gradient
  const getLiquidGradient = () => {
    const t = wavePhase * 0.02;
    const r1 = Math.floor(40 + Math.sin(t * 1.8) * 60);
    const g1 = Math.floor(60 + Math.cos(t * 2.1) * 70);
    const b1 = Math.floor(120 + Math.sin(t * 1.5) * 80);
    const r2 = Math.floor(80 + Math.cos(t * 2.3) * 50);
    const g2 = Math.floor(50 + Math.sin(t * 1.9) * 60);
    const b2 = Math.floor(160 + Math.cos(t * 1.7) * 70);

    return {
      background: `radial-gradient(circle at 30% 70%, rgba(${r1}, ${g1}, ${b1}, 0.8) 0%, transparent 60%), radial-gradient(circle at 70% 30%, rgba(${r2}, ${g2}, ${b2}, 0.7) 0%, transparent 60%), linear-gradient(135deg, rgba(${r1}, ${g1}, ${b1}, 0.3), rgba(${r2}, ${g2}, ${b2}, 0.4))`,
      transition: 'background 0.3s ease'
    };
  };

  // Holographic overlay
  const getHolographicOverlay = () => {
    const hue1 = hologramShift;
    const hue2 = (hologramShift + 120) % 360;
    const hue3 = (hologramShift + 240) % 360;
    
    return {
      background: `linear-gradient(45deg, hsla(${hue1}, 80%, 60%, 0.15), hsla(${hue2}, 85%, 70%, 0.2), hsla(${hue3}, 80%, 65%, 0.15))`,
      transition: 'background 0.2s ease'
    };
  };

  // Morphing border
  const getMorphingBorder = () => {
    const morph1 = Math.sin(morphState * 0.025) * 20 + 30;
    const morph2 = Math.cos(morphState * 0.02) * 20 + 30;
    
    return {
      borderRadius: `${morph1}px ${morph2}px ${morph1 + 5}px ${morph2 + 5}px`
    };
  };

  // Energy glow
  const getEnergyGlow = () => {
    const intensity = 0.4 + Math.sin(energyPulse * 0.04) * 0.3;
    const hue = (hologramShift + energyPulse) % 360;
    
    return {
      boxShadow: `0 0 60px hsla(${hue}, 80%, 60%, ${intensity * 0.8}), 0 0 100px hsla(${(hue + 60) % 360}, 70%, 70%, ${intensity * 0.6}), 0 20px 40px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)`
    };
  };

  if (!isOpen) return null;

  return (
    <div className="w-full mb-6 relative">
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="absolute pointer-events-none z-10"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            animation: `sparkleFloat 4s infinite ease-in-out`,
            animationDelay: `${sparkle.delay}ms`
          }}
        >
          <Sparkles 
            className="text-yellow-300 opacity-60" 
            size={sparkle.size * 8}
            style={{
              filter: 'drop-shadow(0 0 4px currentColor)',
              animation: 'spin 3s infinite linear'
            }}
          />
        </div>
      ))}
      
      <div 
        className="relative backdrop-blur-3xl border border-white/30 overflow-hidden"
        style={{
          ...getLiquidGradient(),
          ...getMorphingBorder(),
          ...getEnergyGlow()
        }}
      >
        <div 
          className="absolute inset-0 pointer-events-none"
          style={getHolographicOverlay()}
        />

        <div 
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            background: `linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.8) ${(wavePhase * 2) % 100}%, transparent ${(wavePhase * 2 + 2) % 100}%)`
          }}
        />

        <div className="relative border-b border-white/40 px-8 py-6 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="relative">
                <div 
                  className="w-10 h-10 rounded-2xl bg-gradient-to-br from-cyan-300 via-purple-400 to-pink-400 shadow-2xl relative overflow-hidden"
                  style={{
                    transform: `perspective(300px) rotateX(${Math.sin(morphState * 0.02) * 12}deg) rotateY(${Math.cos(morphState * 0.015) * 18}deg)`,
                    boxShadow: `0 10px 40px hsla(${hologramShift}, 70%, 60%, 0.6)`
                  }}
                >
                  <div className="absolute inset-1 bg-gradient-to-br from-white/50 to-transparent rounded-xl" />
                  <div 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent rounded-2xl"
                    style={{
                      transform: `translateX(${Math.sin(morphState * 0.04) * 150 - 75}%)`
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Filter className="w-5 h-5 text-white/90 drop-shadow-lg" />
                  </div>
                </div>
                
                {[0, 1, 2, 3].map(i => (
                  <div
                    key={i}
                    className="absolute w-1.5 h-1.5 rounded-full"
                    style={{
                      background: `hsl(${(hologramShift + i * 90) % 360}, 80%, 70%)`,
                      boxShadow: `0 0 8px hsl(${(hologramShift + i * 90) % 360}, 80%, 70%)`,
                      transform: `rotate(${morphState * 3 + i * 90}deg) translateX(30px) rotate(${-morphState * 3 - i * 90}deg)`,
                      top: '50%',
                      left: '50%',
                      marginTop: '-3px',
                      marginLeft: '-3px'
                    }}
                  />
                ))}
              </div>
              
              <div className="relative">
                <h2 
                  className="text-3xl font-bold tracking-wide relative z-10"
                  style={{
                    background: `linear-gradient(135deg, hsl(${hologramShift}, 80%, 85%), hsl(${(hologramShift + 60) % 360}, 90%, 75%), hsl(${(hologramShift + 120) % 360}, 85%, 80%))`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.3))'
                  }}
                >
                  Advanced Filters
                </h2>
                
                <div 
                  className="absolute bottom-0 left-0 h-0.5 rounded-full"
                  style={{
                    width: `${60 + Math.sin(energyPulse * 0.03) * 40}%`,
                    background: `linear-gradient(90deg, hsl(${hologramShift}, 80%, 70%), hsl(${(hologramShift + 60) % 360}, 90%, 80%), hsl(${(hologramShift + 120) % 360}, 80%, 70%))`,
                    boxShadow: `0 0 10px hsl(${hologramShift}, 80%, 70%)`
                  }}
                />
              </div>
            </div>
            
            <button
              onClick={onToggle}
              className="relative p-3 rounded-2xl backdrop-blur-xl border transition-all duration-300 group hover:scale-110 active:scale-95"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                borderColor: 'rgba(255, 255, 255, 0.3)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
              }}
            >
              <X className="w-6 h-6 text-white group-hover:rotate-180 transition-transform duration-500" />
              
              <div 
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(circle, hsla(${hologramShift}, 70%, 60%, 0.3) 0%, transparent 70%)`,
                  boxShadow: `0 0 20px hsla(${hologramShift}, 70%, 60%, 0.4)`
                }}
              />
            </button>
          </div>
        </div>

        <div className="p-8 space-y-10">
          
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div 
                className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600 flex items-center justify-center shadow-xl"
                style={{
                  boxShadow: `0 8px 32px rgba(59, 130, 246, 0.5)`,
                  transform: `rotateY(${Math.sin(morphState * 0.02) * 20}deg)`
                }}
              >
                <Monitor className="w-5 h-5 text-white drop-shadow-lg" />
              </div>
              <h3 className="text-2xl font-bold text-white">Platform Selection</h3>
              <div className="flex-1 h-px bg-gradient-to-r from-blue-400/50 via-transparent to-transparent ml-4" />
            </div>
            
            <div 
              className="transform transition-all duration-500 hover:scale-[1.02] p-4 rounded-2xl backdrop-blur-sm"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}
            >
              <PlatformFilter
                selectedPlatform={selectedPlatform}
                onPlatformChange={onPlatformChange}
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div 
                className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center shadow-xl"
                style={{
                  boxShadow: `0 8px 32px rgba(168, 85, 247, 0.5)`,
                  transform: `rotateX(${Math.cos(morphState * 0.018) * 20}deg)`
                }}
              >
                <Zap className="w-5 h-5 text-white drop-shadow-lg" />
              </div>
              <h3 className="text-2xl font-bold text-white">Category Matrix</h3>
              <div className="flex-1 h-px bg-gradient-to-r from-purple-400/50 via-transparent to-transparent ml-4" />
            </div>
            
            <div 
              className="transform transition-all duration-500 hover:scale-[1.02] p-4 rounded-2xl backdrop-blur-sm"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}
            >
              <CategoryFilter
                selectedCategory={selectedCategory}
                onCategoryChange={onCategoryChange}
              />
            </div>
          </div>

          {(selectedPlatform !== "all" || selectedCategory !== "all") && (
            <div 
              className="border-t border-white/40 pt-8 backdrop-blur-sm rounded-2xl p-6"
              style={{
                background: `linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)`
              }}
            >
              <div className="flex items-center gap-6 text-white">
                <div className="flex items-center gap-3">
                  <Sparkles 
                    className="w-6 h-6 text-yellow-300 animate-spin" 
                    style={{
                      filter: 'drop-shadow(0 0 8px currentColor)'
                    }}
                  />
                  <span className="font-bold text-xl">Active Matrix:</span>
                </div>
                
                <div className="flex items-center gap-4 flex-1">
                  {selectedPlatform !== "all" && (
                    <div 
                      className="px-6 py-3 rounded-2xl backdrop-blur-2xl border transition-all duration-500 hover:scale-110 cursor-pointer"
                      style={{
                        background: `linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(99, 102, 241, 0.3))`,
                        borderColor: 'rgba(59, 130, 246, 0.6)',
                        boxShadow: `0 0 30px rgba(59, 130, 246, 0.4)`
                      }}
                    >
                      <span className="font-semibold text-lg">
                        {selectedPlatform.charAt(0).toUpperCase() + selectedPlatform.slice(1)}
                      </span>
                    </div>
                  )}
                  
                  {selectedCategory !== "all" && (
                    <div 
                      className="px-6 py-3 rounded-2xl backdrop-blur-2xl border transition-all duration-500 hover:scale-110 cursor-pointer"
                      style={{
                        background: `linear-gradient(135deg, rgba(168, 85, 247, 0.3), rgba(219, 39, 119, 0.3))`,
                        borderColor: 'rgba(168, 85, 247, 0.6)',
                        boxShadow: `0 0 30px rgba(168, 85, 247, 0.4)`
                      }}
                    >
                      <span className="font-semibold text-lg">
                        {selectedCategory.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </span>
                    </div>
                  )}
                </div>
                
                <button
                  onClick={() => {
                    onPlatformChange("all");
                    onCategoryChange("all");
                  }}
                  className="px-6 py-3 rounded-2xl border font-semibold text-lg transition-all duration-300 hover:scale-110 active:scale-95 group"
                  style={{
                    background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(236, 72, 153, 0.2))',
                    borderColor: 'rgba(239, 68, 68, 0.4)',
                    color: 'rgb(252, 165, 165)',
                    boxShadow: '0 0 20px rgba(239, 68, 68, 0.3)'
                  }}
                >
                  <span className="group-hover:text-red-200 transition-colors">Reset Matrix</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
