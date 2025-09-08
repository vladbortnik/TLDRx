import React, { useState, useEffect } from 'react';
import { Search, Terminal, Filter, Code } from 'lucide-react';
import { FaDatabase, FaCircle, FaHexagon, FaDiamond } from 'react-icons/fa6';

// Enhanced Command Terminal Interface with Wave Gradients
const EnhancedCommandTerminal = ({ searchQuery, onSearchChange, count = 523 }) => {
    const [cursor, setCursor] = useState(true);
    const [isFocused, setIsFocused] = useState(false);
    const [showHelpers, setShowHelpers] = useState(false);
    const [iconRotation, setIconRotation] = useState(0);

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

    const isActive = isFocused || searchQuery.length > 0;

    return (
        <div className="w-full max-w-2xl font-['Inter',sans-serif]">
            <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        
        .wave-background {
          background: linear-gradient(-45deg, #1e293b, #0f172a, #1e1b4b, #312e81, #1e293b);
          background-size: 400% 400%;
          animation: waveGradient 8s ease-in-out infinite;
        }
        
        .wave-bar {
          background: linear-gradient(-45deg, rgba(30, 41, 59, 0.8), rgba(15, 23, 42, 0.9), rgba(30, 27, 75, 0.8), rgba(49, 46, 129, 0.7));
          background-size: 400% 400%;
          animation: waveGradient 12s ease-in-out infinite;
        }
        
        .wave-header {
          background: linear-gradient(-45deg, rgba(30, 41, 59, 0.6), rgba(15, 23, 42, 0.7), rgba(30, 27, 75, 0.6), rgba(49, 46, 129, 0.5));
          background-size: 400% 400%;
          animation: waveGradient 10s ease-in-out infinite;
        }
        
        @keyframes waveGradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        
        .glow-around {
          box-shadow: 0 0 0 1px rgba(59, 130, 246, 0.1);
          transition: all 0.3s ease;
        }
        
        .glow-around.active {
          box-shadow: 
            0 0 0 1px rgba(59, 130, 246, 0.3),
            0 0 20px rgba(59, 130, 246, 0.2),
            0 0 40px rgba(59, 130, 246, 0.1);
        }
        
        .diamond-icon {
          transform: rotate(${iconRotation}deg) scale(${1 + Math.sin(iconRotation * 0.05) * 0.2});
          filter: hue-rotate(${iconRotation * 2}deg);
          transition: all 0.1s ease;
        }
      `}</style>

            <div className="space-y-3">
                {/* Main search container with surrounding glow */}
                <div className={`relative transition-all duration-400 ${
                    isFocused ? 'transform -translate-y-1' : ''
                }`}>

                    <div className={`wave-bar backdrop-blur-sm border border-slate-700/50 rounded-xl overflow-hidden transition-all duration-300 glow-around ${
                        isActive ? 'active' : ''
                    }`}>

                        {/* Header with constantly moving icon */}
                        <div className="wave-header border-b border-slate-700/30 px-5 py-3 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                {/* Constantly moving diamond icon */}
                                <div className="relative">
                                    <FaDiamond
                                        className="w-4 h-4 text-blue-400 diamond-icon"
                                    />
                                    <div className="absolute inset-0 w-4 h-4 text-blue-400/30 animate-ping">
                                        <FaCircle className="w-full h-full" />
                                    </div>
                                </div>
                                <span className="text-slate-200 text-sm font-medium tracking-wide">TL;DRx</span>
                            </div>

                            <div className="flex items-center gap-4">
                                {/* Dynamic command count with react-icons */}
                                <div className="flex items-center gap-2">
                                    <FaDatabase className="w-4 h-4 text-slate-400" />
                                    <span className="text-slate-400 text-xs font-medium">
                    {count.toLocaleString()}+ commands
                  </span>
                                </div>

                                {/* Filter icon with dual functionality */}
                                <button className="text-slate-400 hover:text-blue-400 transition-colors duration-200">
                                    <Filter className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Search input area */}
                        <div className="p-5">
                            <div className="flex items-center gap-3 group">
                <span className="text-blue-400 font-mono text-sm font-medium">
                  search
                </span>
                                <span className="text-slate-500 font-mono">→</span>
                                <div className="flex-1 flex items-center">
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => onSearchChange(e.target.value)}
                                        onFocus={() => setIsFocused(true)}
                                        onBlur={() => setIsFocused(false)}
                                        placeholder="query"
                                        className="bg-transparent text-slate-100 font-mono outline-none flex-1 placeholder-slate-500 text-base"
                                        autoComplete="off"
                                    />
                                    <span className={`w-2 h-5 bg-blue-400 ml-1 transition-opacity duration-100 ${
                                        cursor ? 'opacity-100' : 'opacity-0'
                                    }`}></span>
                                </div>
                            </div>

                            {/* Status indicator under search */}
                            {searchQuery && (
                                <div className="mt-3 flex items-center gap-2 text-slate-400 text-sm animate-in slide-in-from-left duration-300">
                                    <Terminal className="w-4 h-4" />
                                    <span>Parsing command database...</span>
                                    <div className="flex gap-1">
                                        <div className="w-1 h-1 bg-blue-400 rounded-full animate-bounce"></div>
                                        <div className="w-1 h-1 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                        <div className="w-1 h-1 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
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
                    <div className="wave-header rounded-lg border border-slate-700/30 px-5 py-3 flex items-center gap-2">
                        <Code className="w-4 h-4 text-slate-400" />
                        <span className="text-slate-400 text-sm">
              Try searching: "file", "git", "network", "system", "docker"
            </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Main component
export default function WaveGradientSearchInterface() {
    const [searchQuery, setSearchQuery] = useState("");
    const [commandCount, setCommandCount] = useState(523);

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

    return (
        <div className="wave-background min-h-screen p-8 transition-all duration-500">
            <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        
        .wave-background {
          background: linear-gradient(-45deg, #0f172a, #1e293b, #1e1b4b, #312e81, #0f172a, #475569);
          background-size: 600% 600%;
          animation: waveGradient 15s ease-in-out infinite;
        }
        
        @keyframes waveGradient {
          0% {
            background-position: 0% 50%;
          }
          25% {
            background-position: 100% 25%;
          }
          50% {
            background-position: 50% 100%;
          }
          75% {
            background-position: 25% 0%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>

            <div className="max-w-4xl mx-auto font-['Inter',sans-serif]">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-slate-200 to-white bg-clip-text text-transparent mb-4 font-semibold">
                        Wave Gradient TL;DRx Interface
                    </h1>
                    <p className="text-slate-300/70 text-lg mb-8 font-light">
                        Slowly shifting gradients with surrounding glow effects
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
                    <div className="wave-bar backdrop-blur-sm border border-slate-700/30 rounded-xl p-8">
                        <h4 className="text-xl font-medium text-slate-200 mb-4 font-semibold">Live Interface Demo</h4>
                        <div className="space-y-3">
                            <div className="wave-header rounded-lg p-4 border border-slate-700/20">
                                <div className="text-sm text-slate-400 mb-1 font-light">Current Search:</div>
                                <code className="text-blue-400 font-mono text-lg font-medium">
                                    "{searchQuery || 'Type to see wave animations...'}"
                                </code>
                            </div>
                            <div className="wave-header rounded-lg p-4 border border-slate-700/20">
                                <div className="text-sm text-slate-400 mb-1 font-light">Command Count:</div>
                                <span className="text-blue-400 font-mono font-medium">
                  {commandCount.toLocaleString()}+ commands
                </span>
                            </div>
                            <div className="wave-header rounded-lg p-4 border border-slate-700/20">
                                <div className="text-sm text-slate-400 mb-1 font-light">Features:</div>
                                <div className="text-slate-300 text-sm font-light">
                                    Wave gradients • Surrounding glow • Moving diamond icon • React Icons
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}