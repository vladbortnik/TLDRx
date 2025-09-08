import React, { useState, useEffect } from 'react';
import { Search, Terminal, Filter, Code, Database, Circle, Diamond } from 'lucide-react';

// Main Search Interface with VISIBLE Wave Effects
export default function SearchInterface() {
  const [searchQuery, setSearchQuery] = useState("");
  const [commandCount, setCommandCount] = useState(523);
  const [isFocused, setIsFocused] = useState(false);
  const [showHelpers, setShowHelpers] = useState(false);
  const [cursor, setCursor] = useState(true);
  const [iconRotation, setIconRotation] = useState(0);
  const [wavePhase, setWavePhase] = useState(0);

  // Cursor blinking
  useEffect(() => {
    const interval = setInterval(() => setCursor(c => !c), 500);
    return () => clearInterval(interval);
  }, []);

  // Icon rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setIconRotation(prev => (prev + 3) % 360);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // Wave animation - MUCH MORE VISIBLE
  useEffect(() => {
    const interval = setInterval(() => {
      setWavePhase(prev => (prev + 5) % 360);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // Show helpers when typing
  useEffect(() => {
    setShowHelpers(searchQuery.length > 0);
  }, [searchQuery]);

  // Dynamic command count
  useEffect(() => {
    const interval = setInterval(() => {
      setCommandCount(prev => {
        const variation = Math.floor(Math.random() * 10) - 5;
        return Math.max(500, Math.min(600, prev + variation));
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const isActive = isFocused || searchQuery.length > 0;

  // MUCH MORE DRAMATIC wave colors
  const getBackgroundColor = () => {
    const r1 = Math.floor(20 + Math.sin(wavePhase * 0.02) * 40);
    const g1 = Math.floor(30 + Math.cos(wavePhase * 0.025) * 50);
    const b1 = Math.floor(60 + Math.sin(wavePhase * 0.015) * 80);
    
    const r2 = Math.floor(40 + Math.cos(wavePhase * 0.03) * 60);
    const g2 = Math.floor(20 + Math.sin(wavePhase * 0.02) * 40);
    const b2 = Math.floor(100 + Math.cos(wavePhase * 0.01) * 100);
    
    const r3 = Math.floor(80 + Math.sin(wavePhase * 0.035) * 80);
    const g3 = Math.floor(60 + Math.cos(wavePhase * 0.04) * 60);
    const b3 = Math.floor(140 + Math.sin(wavePhase * 0.025) * 100);

    return `linear-gradient(45deg, rgb(${r1},${g1},${b1}), rgb(${r2},${g2},${b2}), rgb(${r3},${g3},${b3}), rgb(${r1},${g1},${b1}))`;
  };

  const getBarColor = () => {
    const r1 = Math.floor(30 + Math.sin(wavePhase * 0.03) * 30);
    const g1 = Math.floor(40 + Math.cos(wavePhase * 0.035) * 40);
    const b1 = Math.floor(80 + Math.sin(wavePhase * 0.02) * 60);
    
    const r2 = Math.floor(50 + Math.cos(wavePhase * 0.025) * 40);
    const g2 = Math.floor(30 + Math.sin(wavePhase * 0.04) * 30);
    const b2 = Math.floor(120 + Math.cos(wavePhase * 0.015) * 80);

    return `linear-gradient(135deg, rgba(${r1},${g1},${b1},0.9), rgba(${r2},${g2},${b2},0.8), rgba(${r1},${g1},${b1},0.9))`;
  };

  const getHeaderColor = () => {
    const r = Math.floor(40 + Math.sin(wavePhase * 0.04) * 40);
    const g = Math.floor(50 + Math.cos(wavePhase * 0.03) * 50);
    const b = Math.floor(100 + Math.sin(wavePhase * 0.035) * 70);

    return `linear-gradient(90deg, rgba(${r},${g},${b},0.7), rgba(${r+20},${g+10},${b+30},0.6), rgba(${r},${g},${b},0.7))`;
  };

  return (
    <div 
      className="min-h-screen p-8 transition-all duration-300"
      style={{ 
        background: getBackgroundColor(),
        fontFamily: 'Inter, system-ui, sans-serif'
      }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">
            LIVE WAVE GRADIENTS
          </h1>
          <p className="text-white/90 text-xl">
            Real-time color shifting • Phase: {wavePhase}°
          </p>
        </div>

        {/* Search Interface */}
        <div className="flex justify-center mb-12">
          <div className="w-full max-w-2xl">
            <div className="space-y-3">
              {/* Main search container */}
              <div className={`relative transition-all duration-400 ${
                isFocused ? 'transform -translate-y-2 scale-105' : ''
              }`}>
                
                <div 
                  className="backdrop-blur-sm border border-white/20 rounded-xl overflow-hidden transition-all duration-300"
                  style={{ 
                    background: getBarColor(),
                    boxShadow: isActive ? 
                      `0 0 0 2px rgba(59, 130, 246, 0.5), 0 0 30px rgba(59, 130, 246, 0.4), 0 0 60px rgba(59, 130, 246, 0.3)` :
                      `0 0 0 1px rgba(59, 130, 246, 0.2), 0 0 10px rgba(59, 130, 246, 0.1)`
                  }}
                >
                  
                  {/* Header */}
                  <div 
                    className="border-b border-white/10 px-5 py-3 flex items-center justify-between"
                    style={{ background: getHeaderColor() }}
                  >
                    <div className="flex items-center gap-3">
                      {/* Rotating diamond */}
                      <div className="relative">
                        <Diamond 
                          className="w-5 h-5 text-yellow-300"
                          style={{
                            transform: `rotate(${iconRotation}deg) scale(${1.2 + Math.sin(iconRotation * 0.05) * 0.3})`,
                            filter: `hue-rotate(${iconRotation * 3}deg) brightness(1.2)`,
                            transition: 'all 0.1s ease'
                          }}
                        />
                        <Circle className="absolute inset-0 w-5 h-5 text-blue-300/40 animate-ping" />
                      </div>
                      <span className="text-white text-lg font-bold tracking-wide">TL;DRx</span>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      {/* Command count */}
                      <div className="flex items-center gap-2">
                        <Database className="w-5 h-5 text-white/90" />
                        <span className="text-white/90 text-sm font-medium">
                          {commandCount.toLocaleString()}+ commands
                        </span>
                      </div>
                      
                      {/* Filter */}
                      <button className="text-white/90 hover:text-yellow-300 transition-colors duration-200">
                        <Filter className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Search input */}
                  <div className="p-6">
                    <div className="flex items-center gap-4 group">
                      <span className="text-yellow-300 font-mono text-lg font-bold">
                        search
                      </span>
                      <span className="text-white/70 font-mono text-lg">→</span>
                      <div className="flex-1 flex items-center">
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          onFocus={() => setIsFocused(true)}
                          onBlur={() => setIsFocused(false)}
                          placeholder="type here to see effects..."
                          className="bg-transparent text-white text-xl font-mono outline-none flex-1 placeholder-white/50"
                          autoComplete="off"
                        />
                        <span className={`w-3 h-6 bg-yellow-300 ml-2 transition-opacity duration-100 ${
                          cursor ? 'opacity-100' : 'opacity-0'
                        }`}></span>
                      </div>
                    </div>
                    
                    {/* Status */}
                    {searchQuery && (
                      <div className="mt-4 flex items-center gap-2 text-white/80 text-lg animate-in slide-in-from-left duration-300">
                        <Terminal className="w-5 h-5" />
                        <span>Searching database...</span>
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-yellow-300 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-yellow-300 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-yellow-300 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Helper suggestions */}
              <div className={`transition-all duration-300 overflow-hidden ${
                showHelpers ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <div 
                  className="rounded-lg border border-white/20 px-5 py-4 flex items-center gap-2"
                  style={{ background: getHeaderColor() }}
                >
                  <Code className="w-5 h-5 text-white/90" />
                  <span className="text-white/90 text-lg">
                    Try: "file", "git", "network", "system", "docker"
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Demo Info */}
        <div className="text-center">
          <div 
            className="backdrop-blur-sm border border-white/30 rounded-xl p-8"
            style={{ background: getBarColor() }}
          >
            <h3 className="text-2xl font-bold text-white mb-4">🌊 WAVE EFFECTS ACTIVE 🌊</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-white/70 text-sm mb-1">Search Value:</div>
                <code className="text-yellow-300 text-lg font-bold">
                  "{searchQuery || 'Start typing...'}"
                </code>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-white/70 text-sm mb-1">Wave Phase:</div>
                <span className="text-yellow-300 text-lg font-bold">{wavePhase}°</span>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-white/70 text-sm mb-1">Icon Rotation:</div>
                <span className="text-yellow-300 text-lg font-bold">{iconRotation}°</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
