/**
 * @fileoverview Search input component with integrated filters
 * Terminal-themed search bar with animated cursor and dynamic status messages
 */

import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { Terminal, Filter, XCircle } from 'lucide-react';
import { FaDatabase } from 'react-icons/fa6';
import { VscTerminalBash } from 'react-icons/vsc';
import { FilterBar } from '../filters/FilterBar.jsx';
import { CategoryFilters } from '../filters/CategoryFilters.jsx';

/**
 * SearchInput Component
 * Terminal-styled search input with filters, animated cursor, and rotating status messages
 *
 * @component
 * @param {Object} props - Component props
 * @param {string} props.value - Current search query value
 * @param {Function} props.onChange - Search input change handler
 * @param {string} [props.placeholder] - Input placeholder text
 * @param {Function} props.onFilterToggle - Filter toggle handler
 * @param {Array<string>} props.selectedPlatforms - Selected platform filters
 * @param {Function} props.onPlatformChange - Platform selection handler
 * @param {Array<string>} props.selectedCategories - Selected category filters
 * @param {Function} props.onCategoryChange - Category selection handler
 * @param {boolean} props.showAdvancedFilters - Advanced filters visibility
 * @param {Function} props.onAdvancedFiltersToggle - Advanced filters toggle
 * @param {Function} props.onClearAllFilters - Clear all filters handler
 * @param {number} [props.totalCommands=0] - Total commands count
 * @param {Function} props.onSearchSubmit - Search submit handler
 * @param {React.Ref} ref - Forward ref exposing focus method
 * @returns {JSX.Element} Search input with integrated filters
 */
export const SearchInput = forwardRef(function SearchInput({
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
    totalCommands = 0,
    onSearchSubmit
}, ref) {
    const [isFocused, setIsFocused] = useState(false);
    const [cursor, setCursor] = useState(true);
    const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
    // Remove hardcoded command count - use totalCommands prop instead
    const inputRef = useRef(null);

    // Expose focus method to parent component
    useImperativeHandle(ref, () => ({
        focus: () => {
            if (inputRef.current) {
                inputRef.current.focus();
            }
        }
    }));

    // Dynamic status messages
    const statusMessages = [
        `Press Enter to search ${totalCommands.toLocaleString()} commands...`,
        "Type your query and press Enter to search...",
        "Use filters to narrow results...",
        "Supports fuzzy search for quick results...",
        "Try: 'git', 'docker', 'ssh' + Enter...",
        "Filter by multiple platforms simultaneously...",
        "Combine category filters for precise results...",
        "Press Enter to submit your search...",
        "Case-insensitive command matching...",
        "Find commands by platform or category...",
        "Discover new CLI tools and utilities..."
    ];

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
                <div className="relative transition-all duration-400">

                    <div
                        className="backdrop-blur-xl border border-white/30 rounded-xl overflow-hidden transition-all duration-300 cursor-text"
                        style={{
                            background: 'linear-gradient(135deg, rgba(30,41,59,0.8), rgba(49,46,129,0.7), rgba(30,41,59,0.8))',
                            ...getGlowStyle()
                        }}
                        onClick={handleSearchContainerClick}
                    >

                        {/* Header with 3D cube icon - Click anywhere to focus input */}
                        <div
                            className="border-b border-white/20 px-3 sm:px-5 py-2.5 sm:py-3 flex items-center justify-between pointer-events-none"
                            style={{
                                background: 'linear-gradient(90deg, rgba(25,35,80,0.6), rgba(40,45,105,0.5), rgba(25,35,80,0.6))'
                            }}
                        >
                            <div className="flex items-center gap-3">
                                {/* Matrix Terminal Icon */}
                                <VscTerminalBash className="w-5 h-5 animate-pulse" style={{
                                    color: '#00a82d',
                                    filter: 'drop-shadow(0 0 8px rgba(0, 168, 45, 0.8)) saturate(1.8)'
                                }} />

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
                        <div className="p-3 sm:p-5">
                            <div className="flex items-center gap-2 sm:gap-3 group">
                <span className="text-yellow-300 font-mono text-xs sm:text-sm font-semibold pointer-events-none">
                  search
                </span>
                                <span className="text-white/70 font-mono text-sm sm:text-base pointer-events-none">→</span>
                                <div className="flex-1 flex items-center">
                                    <input
                                        ref={inputRef}
                                        id="search-input"
                                        name="search"
                                        type="text"
                                        value={value}
                                        onChange={(e) => onChange(e.target.value)}
                                        onFocus={() => setIsFocused(true)}
                                        onBlur={() => setIsFocused(false)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault();
                                                onSearchSubmit && onSearchSubmit();
                                                // Maintain focus after search submission
                                                setTimeout(() => {
                                                    if (inputRef.current) {
                                                        inputRef.current.focus();
                                                    }
                                                }, 50);
                                            }
                                        }}
                                        placeholder={placeholder}
                                        className="bg-transparent text-white font-mono outline-none flex-1 placeholder-white/50 text-sm sm:text-base cursor-text pointer-events-auto"
                                        autoComplete="off"
                                        onClick={(e) => e.stopPropagation()}
                                        aria-label="Search commands"
                                    />

                                    {/* Cursor indicator - yellow blinking cursor when empty, red clear icon when has text */}
                                    {value.length === 0 ? (
                                        // Yellow blinking cursor when empty
                                        <span
                                            className={`w-2 h-5 ml-1 bg-yellow-300 transition-opacity duration-100 pointer-events-none ${
                                                cursor ? 'opacity-100' : 'opacity-0'
                                            }`}
                                        ></span>
                                    ) : (
                                        // Red clear icon when has text
                                        <XCircle
                                            className="w-5 h-5 ml-1 text-red-500 cursor-pointer hover:scale-110 hover:text-red-400 transition-all duration-200 flex-shrink-0"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onChange(''); // Clear the search input
                                                onSearchSubmit && onSearchSubmit(''); // Submit empty search
                                                // Restore focus after clearing
                                                setTimeout(() => {
                                                    if (inputRef.current) {
                                                        inputRef.current.focus();
                                                    }
                                                }, 50);
                                            }}
                                            title="Click to clear search"
                                        />
                                    )}
                                </div>
                            </div>

                            {/* Status indicator and filters under search */}
                            <div className="mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-white/80 text-sm">
                                {/* Left side: Dynamic status messages */}
                                <div className="flex flex-col gap-1 min-w-0 flex-shrink">
                                    {/* Gradient wave animation for hint text */}
                                    <div className="flex items-center gap-2 animate-in slide-in-from-left duration-300">
                                        <Terminal className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                                        <span
                                            key={currentMessageIndex}
                                            className="animate-in fade-in duration-500 animate-hint-gradient text-xs sm:text-sm truncate"
                                        >
                                            {statusMessages[currentMessageIndex]}
                                        </span>
                                    </div>
                                </div>

                                {/* Right side: Filter Bar */}
                                <div className="flex-shrink-0">
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
});
