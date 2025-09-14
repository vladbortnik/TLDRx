import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Filter, Code } from 'lucide-react';
import { FaDatabase, FaDiamond, FaCircle, FaCube } from 'react-icons/fa6';

export function SearchInput({ value, onChange, placeholder = "Search commands...", onFilterToggle }) {
    const [isFocused, setIsFocused] = useState(false);
    const [showHelpers, setShowHelpers] = useState(false);
    const [cursor, setCursor] = useState(true);
    const [iconRotation, setIconRotation] = useState(0);
    const [wavePhase, setWavePhase] = useState(0);
    const [icon3DRotation, setIcon3DRotation] = useState({ x: 0, y: 0, z: 0 });
    const [commandCount] = useState(523);
    const inputRef = useRef(null);

    // Cursor blinking animation
    useEffect(() => {
        const interval = setInterval(() => setCursor(c => !c), 500);
        return () => clearInterval(interval);
    }, []);

    // Constantly moving icon animation (2D - commented out)
    useEffect(() => {
        const interval = setInterval(() => {
            setIconRotation(prev => (prev + 2) % 360);
        }, 100);
        return () => clearInterval(interval);
    }, []);

    // 3D icon animation - rotates in 3D space with perspective
    useEffect(() => {
        const interval = setInterval(() => {
            setIcon3DRotation(prev => ({
                x: (prev.x + 1.5) % 360,
                y: (prev.y + 2) % 360,
                z: (prev.z + 0.8) % 360
            }));
        }, 50);
        return () => clearInterval(interval);
    }, []);

    // Wave phase animation for dynamic colors
    useEffect(() => {
        const interval = setInterval(() => {
            setWavePhase(prev => (prev + 1) % 360);
        }, 100);
        return () => clearInterval(interval);
    }, []);

    // Show helper suggestions when typing
    useEffect(() => {
        setShowHelpers(value.length > 0);
    }, [value]);

    const isActive = isFocused || value.length > 0;

    // Dynamic wave colors
    const getBarWave = () => {
        const r1 = Math.floor(30 + Math.sin(wavePhase * 0.03) * 25);
        const g1 = Math.floor(41 + Math.cos(wavePhase * 0.035) * 30);
        const b1 = Math.floor(59 + Math.sin(wavePhase * 0.02) * 40);

        const r2 = Math.floor(49 + Math.cos(wavePhase * 0.025) * 35);
        const g2 = Math.floor(46 + Math.sin(wavePhase * 0.04) * 25);
        const b2 = Math.floor(129 + Math.cos(wavePhase * 0.015) * 50);

        return {
            background: `linear-gradient(135deg, rgba(${r1},${g1},${b1},0.8), rgba(${r2},${g2},${b2},0.7), rgba(${r1},${g1},${b1},0.8))`,
            transition: 'background 0.2s ease'
        };
    };

    const getHeaderWave = () => {
        const r = Math.floor(25 + Math.sin(wavePhase * 0.04) * 30);
        const g = Math.floor(35 + Math.cos(wavePhase * 0.03) * 35);
        const b = Math.floor(80 + Math.sin(wavePhase * 0.035) * 45);

        return {
            background: `linear-gradient(90deg, rgba(${r},${g},${b},0.6), rgba(${r+15},${g+10},${b+25},0.5), rgba(${r},${g},${b},0.6))`,
            transition: 'background 0.25s ease'
        };
    };

    const getGlowStyle = () => {
        if (isActive) {
            return {
                boxShadow: `
          0 0 0 2px rgba(59, 130, 246, 0.5),
          0 0 20px rgba(59, 130, 246, 0.4),
          0 0 40px rgba(59, 130, 246, 0.3),
          0 0 60px rgba(59, 130, 246, 0.2)
        `,
                transition: 'box-shadow 0.3s ease'
            };
        }
        return {
            boxShadow: '0 0 0 1px rgba(59, 130, 246, 0.2)',
            transition: 'box-shadow 0.3s ease'
        };
    };

    // Handle search container click to focus input
    const handleSearchContainerClick = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    return (
        <div className="relative flex-1">
            <div className="space-y-3">
                {/* Main search container with surrounding glow */}
                <div className={`relative transition-all duration-400 ${
                    isFocused ? 'transform -translate-y-1 scale-105' : ''
                }`}>

                    <div
                        className="backdrop-blur-xl border border-white/30 rounded-xl overflow-hidden transition-all duration-300 cursor-text"
                        style={{
                            ...getBarWave(),
                            ...getGlowStyle()
                        }}
                        onClick={handleSearchContainerClick}
                    >

                        {/* Header with 3D cube icon - Click anywhere to focus input */}
                        <div
                            className="border-b border-white/20 px-5 py-3 flex items-center justify-between pointer-events-none"
                            style={getHeaderWave()}
                        >
                            <div className="flex items-center gap-3">
                                {/* 3D Animated Cube Icon - constantly rotating in 3D space */}
                                <div className="relative perspective-1000">
                                    <div
                                        className="w-5 h-5 relative"
                                        style={{
                                            transform: `perspective(100px) rotateX(${icon3DRotation.x}deg) rotateY(${icon3DRotation.y}deg) rotateZ(${icon3DRotation.z}deg)`,
                                            transformStyle: 'preserve-3d',
                                            filter: `hue-rotate(${icon3DRotation.y}deg) brightness(1.4)`,
                                            transition: 'all 0.05s ease'
                                        }}
                                    >
                                        <FaCube
                                            className="w-5 h-5 text-cyan-300"
                                            style={{
                                                transform: 'translateZ(2px)',
                                                filter: 'drop-shadow(0 0 8px rgba(34, 211, 238, 0.6))'
                                            }}
                                        />
                                        {/* Additional 3D layers for depth */}
                                        <FaCube
                                            className="absolute inset-0 w-5 h-5 text-blue-400/60"
                                            style={{
                                                transform: 'translateZ(-2px) scale(1.1)',
                                            }}
                                        />
                                    </div>
                                    <div className="absolute inset-0 w-5 h-5">
                                        <FaCircle className="w-full h-full text-cyan-300/30 animate-pulse" />
                                    </div>
                                </div>

                                {/* COMMENTED OUT: 2D Diamond Icon - Constantly moving diamond with rotation, scaling, and hue shifts
                <div className="relative">
                  <FaDiamond 
                    className="w-4 h-4 text-yellow-300"
                    style={{
                      transform: `rotate(${iconRotation}deg) scale(${1.2 + Math.sin(iconRotation * 0.05) * 0.3})`,
                      filter: `hue-rotate(${iconRotation * 2}deg) brightness(1.3)`,
                      transition: 'all 0.1s ease'
                    }}
                  />
                  <div className="absolute inset-0 w-4 h-4">
                    <FaCircle className="w-full h-full text-blue-300/40 animate-ping" />
                  </div>
                </div>
                */}

                                <span className="text-white text-sm font-semibold tracking-wide">
                  TL;DRx
                </span>
                            </div>

                            <div className="flex items-center gap-4">
                                {/* Dynamic command count with React Icons */}
                                <div className="flex items-center gap-2">
                                    <FaDatabase className="w-4 h-4 text-white/90" />
                                    <span className="text-white/90 text-xs font-medium">
                    {commandCount.toLocaleString()}+ commands
                  </span>
                                </div>

                                {/* Filter icon for OS and Category functionality */}
                                <button
                                    className="text-white/90 hover:text-yellow-300 transition-colors duration-200 group pointer-events-auto"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onFilterToggle && onFilterToggle();
                                    }}
                                >
                                    <Filter className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                                </button>
                            </div>
                        </div>

                        {/* Search Input Area - Click handled by parent container */}
                        <div className="p-5">
                            <div className="flex items-center gap-3 group">
                <span className="text-yellow-300 font-mono text-sm font-semibold pointer-events-none">
                  search
                </span>
                                <span className="text-white/70 font-mono pointer-events-none">→</span>
                                <div className="flex-1 flex items-center">
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        value={value}
                                        onChange={(e) => onChange(e.target.value)}
                                        onFocus={() => setIsFocused(true)}
                                        onBlur={() => setIsFocused(false)}
                                        placeholder={placeholder}
                                        className="bg-transparent text-white font-mono outline-none flex-1 placeholder-white/50 text-base cursor-text pointer-events-auto"
                                        autoComplete="off"
                                        onClick={(e) => e.stopPropagation()}
                                    />
                                    <span className={`w-2 h-5 bg-yellow-300 ml-1 transition-opacity duration-100 pointer-events-none ${
                                        cursor ? 'opacity-100' : 'opacity-0'
                                    }`}></span>
                                </div>
                            </div>

                            {/* Status indicator under search */}
                            {value && (
                                <div className="mt-3 flex items-center gap-2 text-white/80 text-sm animate-in slide-in-from-left duration-300">
                                    <Terminal className="w-4 h-4" />
                                    <span>Parsing command database...</span>
                                    <div className="flex gap-1">
                                        <div className="w-1 h-1 bg-yellow-300 rounded-full animate-bounce"></div>
                                        <div className="w-1 h-1 bg-yellow-300 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                        <div className="w-1 h-1 bg-yellow-300 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Helper suggestions from Progressive Disclosure */}
                <div className={`transition-all duration-300 overflow-hidden ${
                    showHelpers ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                    <div
                        className="rounded-lg border border-white/20 px-5 py-3 flex items-center gap-2"
                        style={getHeaderWave()}
                    >
                        <Code className="w-4 h-4 text-white/90" />
                        <span className="text-white/90 text-sm">
              Try searching: "file", "git", "network", "system", "docker"
            </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
