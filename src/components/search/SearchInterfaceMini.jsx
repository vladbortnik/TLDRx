import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { FaDatabase } from 'react-icons/fa6';
import { VscTerminalBash } from 'react-icons/vsc';
import { Filter, X, Terminal, XCircle } from 'lucide-react';

/**
 * Compact search interface component that appears when scrolling down.
 * Provides essential search functionality with a minimalistic, sleek design.
 *
 * @param {Object} props - Component props
 * @param {string} props.searchQuery - Current search query value
 * @param {Function} props.onSearchChange - Handler for search query changes
 * @param {number} props.totalCommands - Total number of commands available
 * @param {number} props.activeFiltersCount - Number of active filters
 * @param {Function} props.onClearFilters - Handler to clear all active filters
 * @param {Function} props.onClick - Handler for container click (scrolls to top)
 */
export const SearchInterfaceMini = forwardRef(function SearchInterfaceMini({
    searchQuery,
    onSearchChange,
    totalCommands = 0,
    activeFiltersCount = 0,
    onClearFilters,
    onClick,
    onLogoClick,
    onSearchSubmit
}, ref) {
    const [cursor, setCursor] = useState(true);
    const [isFocused, setIsFocused] = useState(false);
    const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
    const inputRef = useRef(null);

    // Expose focus method to parent component
    useImperativeHandle(ref, () => ({
        focus: () => {
            if (inputRef.current) {
                inputRef.current.focus();
            }
        }
    }));

    // Mini status messages - shorter for compact display, all include command count
    const statusMessages = [
        `${totalCommands.toLocaleString()} • Press Enter to search`,
        `${totalCommands.toLocaleString()} • Type + Enter`,
        `${totalCommands.toLocaleString()} • Fuzzy search enabled`,
        `${totalCommands.toLocaleString()} • Commands available`
    ];

    // Cycle through status messages
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentMessageIndex((prev) => (prev + 1) % statusMessages.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [statusMessages.length]);

    // Cursor blinking animation
    useEffect(() => {
        const interval = setInterval(() => setCursor(c => !c), 500);
        return () => clearInterval(interval);
    }, []);

    // Handle container click to focus input or scroll to top
    const handleContainerClick = (e) => {
        // Don't trigger if clicking on buttons or logo
        if (e.target.closest('button') || e.target.closest('[data-logo]')) {
            return;
        }

        // If clicking on the container (not input), trigger the onClick prop to scroll to top
        if (!e.target.closest('input')) {
            onClick && onClick();
        }

        // Focus the input
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    // Dynamic glow effect based on focus state
    const getGlowStyle = () => {
        const isActive = isFocused || searchQuery.length > 0;
        
        if (isActive) {
            return {
                boxShadow: `
                    0 0 0 2px rgba(59, 130, 246, 0.5),
                    0 0 15px rgba(59, 130, 246, 0.4),
                    0 0 30px rgba(59, 130, 246, 0.3),
                    0 0 45px rgba(59, 130, 246, 0.2),
                    inset 0 0 20px rgba(59, 130, 246, 0.1)
                `,
                transition: 'all 0.3s ease'
            };
        }
        return {
            boxShadow: `
                0 0 0 1px rgba(59, 130, 246, 0.3),
                0 0 10px rgba(59, 130, 246, 0.2),
                inset 0 0 10px rgba(59, 130, 246, 0.05)
            `,
            transition: 'all 0.3s ease'
        };
    };

    return (
        <div className="relative w-full animate-in slide-in-from-top duration-300">
            {/* Add top margin/padding for better spacing */}
            <div className="pt-2 pb-2 px-2 sm:px-4">
                <div
                    className="backdrop-blur-xl border border-white/30 rounded-xl overflow-hidden transition-all duration-300 cursor-pointer hover:transform hover:scale-[1.02]"
                    style={{
                        background: 'linear-gradient(135deg, rgba(30,41,59,0.8), rgba(49,46,129,0.7), rgba(30,41,59,0.8))',
                        ...getGlowStyle()
                    }}
                    onClick={handleContainerClick}
                >
                    {/* Compact header bar with gradient background */}
                    <div
                        className="px-2 sm:px-4 py-2 sm:py-2.5 border-b border-white/20"
                        style={{
                            background: 'linear-gradient(90deg, rgba(25,35,80,0.6), rgba(40,45,105,0.5), rgba(25,35,80,0.6))'
                        }}
                    >
                        <div className="flex items-center justify-between">
                            {/* Left side: Logo and search input */}
                            <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                                {/* Logo area - acts as home button */}
                                <div
                                    data-logo
                                    className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onLogoClick && onLogoClick();
                                    }}
                                    title="Reset and go home"
                                >
                                    {/* Matrix Terminal Icon with glow */}
                                    <VscTerminalBash
                                        className="w-4 h-4 animate-pulse flex-shrink-0"
                                        style={{
                                            color: '#00a82d',
                                            filter: 'drop-shadow(0 0 6px rgba(0, 168, 45, 0.8)) saturate(1.8)'
                                        }}
                                    />

                                    {/* Logo with matrix glow animation */}
                                    <span className="text-xs font-semibold tracking-wide animate-logo-glow-matrix hidden sm:inline">
                                        TL;DRx
                                    </span>
                                </div>

                                {/* Divider */}
                                <div className="h-4 w-px bg-white/30 hidden sm:block" />

                                {/* Search Input Area */}
                                <div className="flex items-center gap-1 sm:gap-2 flex-1 min-w-0">
                                    <span className="text-yellow-300 font-mono text-sm font-semibold hidden sm:inline">
                                        search
                                    </span>
                                    <Terminal className="w-4 h-4 text-yellow-300 sm:hidden" />
                                    <span className="text-white/70 font-mono hidden sm:inline">→</span>
                                    
                                    <input
                                        ref={inputRef}
                                        id="search-input-mini"
                                        name="search-mini"
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
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
                                        placeholder="query (press Enter)"
                                        className="bg-transparent text-white font-mono outline-none flex-1 placeholder-white/50 text-xs sm:text-sm min-w-0"
                                        autoComplete="off"
                                        onClick={(e) => e.stopPropagation()}
                                        aria-label="Search commands (mini)"
                                    />
                                </div>
                            </div>
                            
                            {/* Right side: Status, filters, and cursor */}
                            <div className="flex items-center gap-2 sm:gap-3 ml-1 sm:ml-2 flex-shrink-0">
                                {/* Dynamic status message on larger screens */}
                                <div className="hidden md:flex items-center gap-2">
                                    <FaDatabase className="w-3 h-3 text-cyan-400" />
                                    <span 
                                        key={currentMessageIndex}
                                        className="text-xs animate-in fade-in duration-500 animate-hint-gradient whitespace-nowrap"
                                    >
                                        {statusMessages[currentMessageIndex]}
                                    </span>
                                </div>

                                {/* Command count on smaller screens */}
                                <div className="flex md:hidden items-center gap-1">
                                    <FaDatabase className="w-3 h-3 text-cyan-400" />
                                    <span className="bg-gradient-to-r from-sky-400 to-cyan-600 bg-clip-text text-transparent text-xs font-medium">
                                        {totalCommands.toLocaleString()}
                                    </span>
                                </div>

                                {/* Filter indicator with glow effect */}
                                {activeFiltersCount > 0 && (
                                    <>
                                        <div className="flex items-center gap-1.5">
                                            <Filter 
                                                className="w-3.5 h-3.5 text-yellow-400" 
                                                style={{
                                                    filter: 'drop-shadow(0 0 4px rgba(250, 204, 21, 0.6))'
                                                }}
                                            />
                                            <span className="text-yellow-400 text-xs font-medium">
                                                {activeFiltersCount}
                                            </span>
                                        </div>

                                        {/* Clear filters button with hover effect */}
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onClearFilters && onClearFilters();
                                            }}
                                            className="text-white/60 hover:text-white transition-all duration-200 p-1 hover:bg-white/10 rounded"
                                            aria-label="Clear all filters"
                                        >
                                            <X className="w-3.5 h-3.5" />
                                        </button>
                                    </>
                                )}

                                {/* Cursor indicator - yellow blinking cursor when empty, red clear icon when has text */}
                                {searchQuery.length === 0 ? (
                                    // Yellow blinking cursor with glow when empty
                                    <span
                                        className={`w-1.5 h-4 bg-yellow-300 transition-opacity duration-100 pointer-events-none ${
                                            cursor ? 'opacity-100' : 'opacity-0'
                                        }`}
                                        style={{
                                            boxShadow: cursor ? '0 0 8px rgba(250, 204, 21, 0.8)' : 'none'
                                        }}
                                    ></span>
                                ) : (
                                    // Red clear icon when has text
                                    <XCircle
                                        className="w-4 h-4 text-red-500 cursor-pointer hover:scale-110 hover:text-red-400 transition-all duration-200 flex-shrink-0"
                                        style={{
                                            filter: 'drop-shadow(0 0 4px rgba(239, 68, 68, 0.6))'
                                        }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onSearchChange(''); // Clear the search input
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
                    </div>
                    
                    {/* Optional: Subtle hint bar at the bottom */}
                    <div className="h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent" />
                </div>
            </div>
        </div>
    );
});
