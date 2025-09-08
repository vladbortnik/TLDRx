import React, { useState, useEffect } from 'react';
import { Search, Terminal, Filter, Code } from 'lucide-react';
import { FaDatabase, FaCircle, FaHexagon, FaDiamond } from 'react-icons/fa6';

// Enhanced Command Terminal Interface with Visible Wave Gradients
const SearchInterface = ({ searchQuery, onSearchChange, count = 523 }) => {
    const [cursor, setCursor] = useState(true);
    const [isFocused, setIsFocused] = useState(false);
    const [showHelpers, setShowHelpers] = useState(false);
    const [iconRotation, setIconRotation] = useState(0);
    const [waveOffset, setWaveOffset] = useState(0);

    // Cursor animation
    useEffect(() => {
        const interval = setInterval(() => setCursor(c => !c), 500);
        return () => clearInterval(interval);
    }, []);

    // Show helpers when typing
    useEffect(() => {
        if (searchQuery.length > 0) {
            setShowHelpers(true);
        } else {
            setShowHelpers(false);
        }
    }, [searchQuery]);

    // Constantly moving icon animation
    useEffect(() => {
        const interval = setInterval(() => {
            setIconRotation(prev => (prev + 2) % 360);
        }, 100);
        return () => clearInterval(interval);
    }, []);

    // Wave animation offset
    useEffect(() => {
        const interval = setInterval(() => {
            setWaveOffset(prev => (prev + 1) % 360);
        }, 100);
        return () => clearInterval(interval);
    }, []);

    const isActive = isFocused || searchQuery.length > 0;

    // Generate dynamic wave colors
    const getWaveColor1 = () => {
        const r = Math.floor(15 + Math.sin(waveOffset * 0.02) * 10);
        const g = Math.floor(25 + Math.cos(waveOffset * 0.015) * 15);
        const b = Math.floor(45 + Math.sin(waveOffset * 0.01) * 20);
        return `rgb(${r}, ${g}, ${b})`;
    };

    const getWaveColor2 = () => {
        const r = Math.floor(30 + Math.cos(waveOffset * 0.025) * 15);
        const g = Math.floor(20 + Math.sin(waveOffset * 0.02) * 10);
        const b = Math.floor(75 + Math.cos(waveOffset * 0.015) * 25);
        return `rgb(${r}, ${g}, ${b})`;
    };

    const getWaveColor3 = () => {
        const r = Math.floor(50 + Math.sin(waveOffset * 0.03) * 20);
        const g = Math.floor(40 + Math.cos(waveOffset * 0.025) * 15);
        const b = Math.floor(100 + Math.sin(waveOffset * 0.02) * 30);
        return `rgb(${r}, ${g}, ${b})`;
    };

    const backgroundStyle = {
        background: `linear-gradient(45deg, ${getWaveColor1()}, ${getWaveColor2()}, ${getWaveColor3()}, ${getWaveColor1()})`,
        transition: 'background 0.5s ease'
    };

    const barStyle = {
        background: `linear-gradient(135deg, ${getWaveColor1()}CC, ${getWaveColor2()}DD, ${getWaveColor3()}BB)`,
        transition: 'background 0.3s ease'
    };

    const headerStyle = {
        background: `linear-gradient(90deg, ${getWaveColor1()}99, ${getWaveColor2()}AA, ${getWaveColor3()}88)`,
        transition: 'background 0.4s ease'
    };

    const glowStyle = isActive ? {
        boxShadow: `
      0 0 0 1px rgba(59, 130, 246, 0.4),
      0 0 20px rgba(59, 130, 246, 0.3),
      0 0 40px rgba(59, 130, 246, 0.2),
      0 0 60px rgba(59, 130, 246, 0.1)
    `,
        transition: 'box-shadow 0.3s ease'
    } : {
        boxShadow: '0 0 0 1px rgba(59, 130, 246, 0.1)',
        transition: 'box-shadow 0.3s ease'
    };

    return (
        <div className="w-full max-w-2xl" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
            <div className="space-y-3">
                {/* Main search container with surrounding glow */}
                <div className={`relative transition-all duration-400 ${
                    isFocused ? 'transform -translate-y-1' : ''
                }`}>

                    <div
                        className="backdrop-blur-sm border border-slate-600/50 rounded-xl overflow-hidden transition-all duration-300"
                        style={{ ...barStyle, ...glowStyle }}
                    >

                        {/* Header with constantly moving icon */}
                        <div
                            className="border-b border-slate-600/30 px-5 py-3 flex items-center justify-between"
                            style={headerStyle}
                        >
                            <div className="flex items-center gap-3">
                                {/* Constantly moving diamond icon */}
                                <div className="relative">
                                    <FaDiamond
                                        className="w-4 h-4 text-blue-300"
                                        style={{
                                            transform: `rotate(${iconRotation}deg) scale(${1 + Math.sin(iconRotation * 0.05) * 0.2})`,
                                            filter: `hue-rotate(${iconRotation * 2}deg)`,
                                            transition: 'all 0.1s ease'
                                        }}
                                    />
                                    <div className="absolute inset-0 w-4 h-4">
                                        <FaCircle className="w-full h-full text-blue-300/30 animate-ping" />
                                    </div>
                                </div>
                                <span className="text-slate-100 text-sm font-medium tracking-wide">TL;DRx</span>
                            </div>

                            <div className="flex items-center gap-4">
                                {/* Dynamic command count with react-icons */}
                                <div className="flex items-center gap-2">
                                    <FaDatabase className="w-4 h-4 text-slate-300" />
                                    <span className="text-slate-300 text-xs font-medium">
                    {count.toLocaleString()}+ commands
                  </span>
                                </div>

                                {/* Filter icon with dual functionality */}
                                <button className="text-slate-300 hover:text-blue-300 transition-colors duration-200">
                                    <Filter className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Search input area */}
                        <div className="p-5">
                            <div className="flex items-center gap-3 group">
                <span className="text-blue-300 font-mono text-sm font-medium">
                  search
                </span>
                                <span className="text-slate-400 font-mono">→</span>
                                <div className="flex-1 flex items-center">
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => onSearchChange(e.target.value)}
                                        onFocus={() => setIsFocused(true)}
                                        onBlur={() => setIsFocused(false)}
                                        placeholder="query"
                                        className="bg-transparent text-slate-100 font-mono outline-none flex-1 placeholder-slate-400 text-base"
                                        autoComplete="off"
                                    />
                                    <span className={`w-2 h-5 bg-blue-300 ml-1 transition-opacity duration-100 ${
                                        cursor ? 'opacity-100' : 'opacity-0'
                                    }`}></span>
                                </div>
                            </div>

                            {/* Status indicator under search */}
                            {searchQuery && (
                                <div className="mt-3 flex items-center gap-2 text-slate-300 text-sm animate-in slide-in-from-left duration-300">
                                    <Terminal className="w-4 h-4" />
                                    <span>Parsing command database...</span>
                                    <div className="flex gap-1">
                                        <div className="w-1 h-1 bg-blue-300 rounded-full animate-bounce"></div>
                                        <div className="w-1 h-1 bg-blue-300 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                        <div className="w-1 h-1 bg-blue-300 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
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
                        className="rounded-lg border border-slate-600/30 px-5 py-3 flex items-center gap-2"
                        style={headerStyle}
                    >
                        <Code className="w-4 h-4 text-slate-300" />
                        <span className="text-slate-300 text-sm">
              Try searching: "file", "git", "network", "system", "docker"
            </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Main component
export default function VisibleWaveGradientInterface() {
    const [searchQuery, setSearchQuery] = useState("");
    const [commandCount, setCommandCount] = useState(523);
    const [backgroundWave, setBackgroundWave] = useState(0);

    // Simulate dynamic command count
    useEffect(() => {
        const interval = setInterval(() => {
            setCommandCount(prev => {
                const variation = Math.floor(Math.random() * 10) - 5;
                return Math.max(500, Math.min(600, prev + variation));
            });
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    // Background wave animation
    useEffect(() => {
        const interval = setInterval(() => {
            setBackgroundWave(prev => (prev + 1) % 360);
        }, 150);
        return () => clearInterval(interval);
    }, []);

    const getBackgroundWave = () => {
        const color1 = `rgb(${Math.floor(15 + Math.sin(backgroundWave * 0.01) * 10)}, ${Math.floor(23 + Math.cos(backgroundWave * 0.012) * 12)}, ${Math.floor(42 + Math.sin(backgroundWave * 0.008) * 15)})`;
        const color2 = `rgb(${Math.floor(30 + Math.cos(backgroundWave * 0.015) * 15)}, ${Math.floor(41 + Math.sin(backgroundWave * 0.01) * 12)}, ${Math.floor(59 + Math.cos(backgroundWave * 0.012) * 20)})`;
        const color3 = `rgb(${Math.floor(49 + Math.sin(backgroundWave * 0.02) * 20)}, ${Math.floor(46 + Math.cos(backgroundWave * 0.018) * 15)}, ${Math.floor(129 + Math.sin(backgroundWave * 0.015) * 30)})`;

        return `linear-gradient(135deg, ${color1}, ${color2}, ${color3}, ${color1})`;
    };

    return (
        <div
            className="min-h-screen p-8 transition-all duration-500"
            style={{
                background: getBackgroundWave(),
                fontFamily: 'Inter, system-ui, sans-serif'
            }}
        >
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-slate-200 to-white bg-clip-text text-transparent mb-4 font-semibold">
                        Live Wave Gradient Interface
                    </h1>
                    <p className="text-slate-200/80 text-lg mb-8 font-light">
                        Real-time shifting gradients with dynamic glow effects
                    </p>
                </div>

                <div className="flex justify-center mb-12">
                    <EnhancedCommandTerminal
                        searchQuery={searchQuery}
                        onSearchChange={setSearchQuery}
                        count={commandCount}
                    />
                </div>

                <div className="text-center">
                    <div
                        className="backdrop-blur-sm border border-slate-500/30 rounded-xl p-8"
                        style={{
                            background: `linear-gradient(120deg, rgba(30, 41, 59, 0.4), rgba(15, 23, 42, 0.5), rgba(30, 27, 75, 0.4))`,
                            transition: 'background 0.5s ease'
                        }}
                    >
                        <h4 className="text-xl font-medium text-slate-100 mb-4 font-semibold">Wave Animation Demo</h4>
                        <div className="space-y-3">
                            <div
                                className="rounded-lg p-4 border border-slate-500/20"
                                style={{
                                    background: `linear-gradient(90deg, rgba(59, 130, 246, 0.1), rgba(79, 70, 229, 0.1), rgba(59, 130, 246, 0.1))`,
                                    transition: 'background 0.3s ease'
                                }}
                            >
                                <div className="text-sm text-slate-300 mb-1 font-light">Current Search:</div>
                                <code className="text-blue-300 font-mono text-lg font-medium">
                                    "{searchQuery || 'Type to see live wave effects...'}"
                                </code>
                            </div>
                            <div
                                className="rounded-lg p-4 border border-slate-500/20"
                                style={{
                                    background: `linear-gradient(90deg, rgba(59, 130, 246, 0.1), rgba(79, 70, 229, 0.1), rgba(59, 130, 246, 0.1))`,
                                    transition: 'background 0.3s ease'
                                }}
                            >
                                <div className="text-sm text-slate-300 mb-1 font-light">Features Active:</div>
                                <div className="text-slate-200 text-sm font-light">
                                    ✨ Live wave gradients • 🌟 Surrounding glow • 💎 Rotating diamond • 📊 Lucide Icons
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}