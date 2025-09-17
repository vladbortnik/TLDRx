import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Filter, Code2, Binary, Cpu, Server, Database, GitBranch } from 'lucide-react';
import { FaDatabase, FaDiamond, FaCircle, FaCube } from 'react-icons/fa6';
import { FiTerminal, FiCode, FiCpu } from 'react-icons/fi';
import { BiChip, BiCodeBlock } from 'react-icons/bi';
import { GiProcessor } from 'react-icons/gi';
import { SiMatrix } from 'react-icons/si';
import { TbBrandMatrix, TbTerminal2 } from 'react-icons/tb';
import { VscTerminalBash } from 'react-icons/vsc';
import { useWaveAnimation } from '../../hooks/useWaveAnimation';
import { FilterBar } from '../filters/FilterBar.jsx';
import { CategoryFilters } from '../filters/CategoryFilters.jsx';

export function SearchInput({
    value,
    onChange,
    placeholder = "Search commands...",
    onFilterToggle,
    selectedPlatforms,
    onPlatformChange,
    selectedCategories,
    onCategoryChange,
    showAdvancedFilters,
    onAdvancedFiltersToggle,
    onClearAllFilters,
    totalCommands = 0
}) {
    const [isFocused, setIsFocused] = useState(false);
    const [cursor, setCursor] = useState(true);
    const [icon3DRotation, setIcon3DRotation] = useState({ x: 0, y: 0, z: 0 });
    const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
    // Remove hardcoded command count - use totalCommands prop instead
    const inputRef = useRef(null);

    // Dynamic status messages
    const statusMessages = [
        `Type to search ${totalCommands.toLocaleString()} commands...`,
        "Use filters to narrow results...",
        "Supports fuzzy search for quick results...",
        "Try: 'git', 'docker', 'ssh'...",
        "Filter by multiple platforms simultaneously...",
        "Combine category filters for precise results...",
        "Real-time search as you type...",
        "Case-insensitive command matching...",
        "Find commands by platform or category...",
        "Discover new CLI tools and utilities..."
    ];

    // Enhanced Wave Animation System
    const { getPrimaryWave, getSecondaryWave } = useWaveAnimation(1000);

    // Cycle through status messages
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentMessageIndex((prev) => (prev + 1) % statusMessages.length);
        }, 7000); // Change message every 7 seconds

        return () => clearInterval(interval);
    }, [statusMessages.length]);

    // Cursor blinking animation
    useEffect(() => {
        const interval = setInterval(() => setCursor(c => !c), 500);
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
        }, 200);
        return () => clearInterval(interval);
    }, []);

    // Wave phase animation is now handled by the useWaveAnimation hook


    const isActive = isFocused || value.length > 0;

    // Wave functions are now provided by the useWaveAnimation hook

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
    const handleSearchContainerClick = (e) => {
        // Don't focus input if clicking on interactive elements
        if (e.target.closest('button') || e.target.closest('input')) {
            return;
        }

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
                            ...getPrimaryWave(),
                            ...getGlowStyle()
                        }}
                        onClick={handleSearchContainerClick}
                    >

                        {/* Header with 3D cube icon - Click anywhere to focus input */}
                        <div
                            className="border-b border-white/20 px-5 py-3 flex items-center justify-between pointer-events-none"
                            style={getSecondaryWave()}
                        >
                            <div className="flex items-center gap-3">
                                {/* Matrix Terminal Icon */}
                                <VscTerminalBash className="w-5 h-5 animate-pulse" style={{
                                    color: '#00d435',
                                    filter: 'drop-shadow(0 0 8px rgba(0, 212, 53, 0.8)) saturate(1.8)'
                                }} />

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

                                {/* Matrix Logo */}
                                <span className="text-sm font-semibold tracking-wide animate-logo-glow-matrix">
                                    TL;DRx
                                </span>
                            </div>

                            <div className="flex items-center gap-4">
                                {/* Dynamic command count with React Icons */}
                                <div className="flex items-center gap-2">
                                    <FaDatabase className="w-4 h-4 text-cyan-400" />
                                    <span className="bg-gradient-to-r from-sky-400 to-cyan-600 bg-clip-text text-transparent text-xs font-medium">
                    {totalCommands.toLocaleString()} commands
                  </span>
                                </div>

                                {/* Filter icon for OS and Category functionality */}
                                <div className="flex items-center gap-2">
                                    <button
                                        className="text-yellow-400 hover:text-yellow-300 transition-colors duration-200 group pointer-events-auto"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onFilterToggle && onFilterToggle();
                                        }}
                                    >
                                        <Filter className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                                    </button>
                                    {/* Active filters text indicator */}
                                    {(selectedPlatforms.length > 0 || selectedCategories.length > 0) && (
                                        <span className="text-yellow-400 text-xs font-medium">
                                            {selectedPlatforms.length + selectedCategories.length} filter{(selectedPlatforms.length + selectedCategories.length) > 1 ? 's' : ''}
                                        </span>
                                    )}
                                </div>
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

                            {/* Status indicator and filters under search */}
                            <div className="mt-3 flex items-center justify-between text-white/80 text-sm">
                                {/* Left side: Dynamic status messages */}
                                <div className="flex flex-col gap-1">
                                    {/* Gradient wave animation for hint text */}
                                    <div className="flex items-center gap-2 animate-in slide-in-from-left duration-300">
                                        <Terminal className="w-4 h-4" />
                                        <span
                                            key={currentMessageIndex}
                                            className="animate-in fade-in duration-500 animate-hint-gradient"
                                        >
                                            {statusMessages[currentMessageIndex]}
                                        </span>
                                    </div>
                                    {/* Particles progress indicator */}
                                    <div className="w-full h-0.5 relative">
                                        <div className="absolute w-0.5 h-0.5 bg-cyan-400 rounded-full animate-particles-1" style={{ left: '10%' }}></div>
                                        <div className="absolute w-0.5 h-0.5 bg-blue-400 rounded-full animate-particles-2" style={{ left: '30%' }}></div>
                                        <div className="absolute w-0.5 h-0.5 bg-cyan-300 rounded-full animate-particles-3" style={{ left: '50%' }}></div>
                                        <div className="absolute w-0.5 h-0.5 bg-blue-300 rounded-full animate-particles-4" style={{ left: '70%' }}></div>
                                        <div className="absolute w-0.5 h-0.5 bg-cyan-400 rounded-full animate-particles-5" style={{ left: '90%' }}></div>
                                    </div>
                                </div>

                                {/* Right side: Filter Bar */}
                                <FilterBar
                                    selectedPlatforms={selectedPlatforms}
                                    selectedCategories={selectedCategories}
                                    onPlatformChange={onPlatformChange}
                                    onAdvancedFiltersToggle={onAdvancedFiltersToggle}
                                    onClearAll={onClearAllFilters}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Category Filters - shown when advanced filters are toggled */}
                <div className={`transition-all duration-300 overflow-hidden ${
                    showAdvancedFilters ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                    <div className="px-5 py-3">
                        <CategoryFilters
                            selectedCategories={selectedCategories}
                            onCategoryChange={onCategoryChange}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
