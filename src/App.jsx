import React, { useState, useEffect, useRef } from "react";
import PWAInstall from './components/PWAInstall';
import { Header } from './components/layout/Header';
import { SearchInterface } from './components/search/SearchInterface';
import { SearchInterfaceMini } from './components/search/SearchInterfaceMini';
import { useWaveAnimation } from './hooks/useWaveAnimation';
import { useScrollBehavior } from './hooks/useScrollBehavior';

import { ErrorState } from './components/ui/ErrorState';
import { LoadingState } from './components/ui/LoadingState';
import { ResultsCounter } from './components/search/ResultsCounter';
import { CommandGrid } from './components/results/CommandGrid';
import "./index.css";

/**
 * Main TL;DRx application component that displays a searchable command reference.
 * Features fuzzy search, expandable examples, and responsive design.
 *
 * @param {Object} props - Component props
 * @param {Array<Object>} [props.mockCommands] - Optional mock commands for testing
 * @returns {JSX.Element} The main application component
 */
function App({ mockCommands }) {
    const [commands, setCommands] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedPlatforms, setSelectedPlatforms] = useState([]); // 🔧 UPDATED: Array for multiple selection
    const [selectedCategories, setSelectedCategories] = useState([]); // 🔧 UPDATED: Array for multiple selection
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
    const [showMiniSearch, setShowMiniSearch] = useState(false);

    // Enhanced Wave Animation System
    const { getBackgroundWave, wavePhase } = useWaveAnimation(1000);

    // Scroll behavior for sticky header
    const {
        getHeaderStyles
    } = useScrollBehavior();

    // Ref for dynamic height calculation
    const stickyWrapperRef = useRef(null);
    
    // Sentinel element ref for intersection observer
    const sentinelRef = useRef(null);

    /**
     * Get the man page URL for a command
     * @param {Object} command - Command object with manPageUrl field
     * @returns {string} Man page URL from command data
     */
    const getManPageUrl = (command) => {
        return command.manPageUrl || `https://man7.org/linux/man-pages/man1/${command.name}.1.html`;
    };

    useEffect(() => {
        /**
         * Asynchronously loads command data from the data module or uses mock data for testing.
         * Handles loading states and error conditions.
         */
        async function loadCommands() {
            try {
                const isDevelopment = import.meta.env.MODE === 'development';
                setIsLoading(true);

                if (mockCommands) {
                    setCommands(mockCommands);
                    setError(null);
                    return;
                }

                // Use development-optimized data loader to prevent DevTools freezing
                const module = isDevelopment
                    ? await import("./data/dev-loader.js")
                    : await import("./data/commands.js");

                const rawCommands = isDevelopment
                    ? await module.loadCommands()
                    : (module.commands || module.default);

                // Development performance optimization
                if (isDevelopment) {
                    console.log(`🚀 Dev Mode: Loaded ${rawCommands.length} commands for optimal DevTools performance`);
                }
                // Transform commands for UI requirements
                const enhancedCommands = rawCommands.map(command => ({
                    ...command,
                    platform: command.platform || ['linux'],
                    category: command.category || 'general',
                    manPageUrl: getManPageUrl(command)
                }));
                setCommands(enhancedCommands);
                setError(null);
            } catch (err) {
                console.error("Error loading commands:", err);
                setError("Failed to load commands. Please try again later.");
            } finally {
                setIsLoading(false);
            }
        }

        loadCommands().catch(console.error);
    }, [mockCommands]);

    // Dynamic sticky height calculation for CSS scroll-padding-top
    useEffect(() => {
        const updateStickyHeight = () => {
            if (stickyWrapperRef.current) {
                const stickyHeight = stickyWrapperRef.current.offsetHeight;
                const totalHeight = stickyHeight + 6; // Add 6px offset

                // Update CSS custom property
                document.documentElement.style.setProperty(
                    '--total-sticky-height',
                    `${totalHeight}px`
                );
            }
        };

        // Update on mount and when filter visibility changes
        updateStickyHeight();

        // Update on window resize for responsive design
        const handleResize = () => {
            updateStickyHeight();
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isFilterOpen]);

    // Use IntersectionObserver with sentinel element to prevent flicker
    useEffect(() => {
        const sentinel = sentinelRef.current;
        if (!sentinel) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                // Only check content height at the moment of intersection
                const documentHeight = document.documentElement.scrollHeight;
                const viewportHeight = window.innerHeight;
                const scrollableDistance = documentHeight - viewportHeight;
                
                // If we have enough scrollable content, allow the transition
                if (scrollableDistance > 300) {
                    setShowMiniSearch(!entry.isIntersecting);
                } else {
                    // Not enough content - always show full interface
                    setShowMiniSearch(false);
                }
            },
            {
                threshold: 0,
                rootMargin: '0px'
            }
        );

        observer.observe(sentinel);

        return () => {
            observer.disconnect();
        };
    }, []);

    // Wave animation is now handled by the useWaveAnimation hook


    /**
     * Enhanced fuzzy search algorithm that matches characters in sequence
     * with bonus scoring for consecutive matches and substring matches.
     *
     * @param {string} searchTerm - The search query to match against
     * @param {string} targetString - The target string to search within
     * @returns {number} Match score (0 for no match, higher numbers for better matches)
     */
    const fuzzySearch = (searchTerm, targetString) => {
        const search = searchTerm.toLowerCase();
        const target = targetString.toLowerCase();

        // Exact match gets the highest score
        if (target.includes(search)) {
            return 100 - (target.length - search.length);
        }

        // Fuzzy matching: check if all characters from the search appear in order in target
        let searchIndex = 0;
        let score = 0;
        let consecutiveMatches = 0;

        for (let i = 0; i < target.length && searchIndex < search.length; i++) {
            if (target[i] === search[searchIndex]) {
                searchIndex++;
                consecutiveMatches++;
                score += consecutiveMatches * 2; // Bonus for consecutive matches
            } else {
                consecutiveMatches = 0;
            }
        }

        // If we matched all search characters, return a score based on match quality
        if (searchIndex === search.length) {
            const matchRatio = search.length / target.length;
            return Math.floor(score * matchRatio * 10);
        }

        return 0; // No match
    };

    /**
     * Searches a command by both name and description, with improved logic for short queries.
     *
     * @param {string} searchTerm - The search query
     * @param {Object} command - Command object with name and description properties
     * @returns {number} Combined search score with name matches getting priority
     */
    const searchCommand = (searchTerm, command) => {
        const nameScore = fuzzySearch(searchTerm, command.name);
        const descriptionScore = fuzzySearch(searchTerm, command.description);

        // For short queries (1-2 characters), prioritize exact name matches heavily
        if (searchTerm.length <= 2) {
            if (command.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                return nameScore + 2000; // Very high score for an exact substring in name
            }
            // For short queries, only allow high-scoring fuzzy matches in descriptions
            if (descriptionScore > 50) {
                return descriptionScore;
            }
            return 0;
        }

        // For longer queries, use the original logic but be more selective
        if (nameScore > 0) {
            return nameScore + 1000; // Boost name matches significantly
        } else if (descriptionScore > 30) {
            // Higher threshold for description matches
            return descriptionScore;
        }

        return 0; // No match
    };

    /**
     * Filter and rank commands based on search query, platform, and category selections.
     * 🔧 UPDATED: Now handles multiple platform and category selections (arrays)
     * Returns filtered commands based on search, platform, and category criteria.
     */
    let displayCommands;

    // First filter by platforms (multiple selection support)
    let platformFilteredCommands = commands;
    if (selectedPlatforms.length > 0) {
        platformFilteredCommands = commands.filter(
            (command) =>
                command.platform && selectedPlatforms.some(selectedPlatId =>
                    command.platform.includes(selectedPlatId)
                )
        );
    }

    // Then filter by categories (multiple selection support)
    let filteredCommands = platformFilteredCommands;
    if (selectedCategories.length > 0) {
        filteredCommands = platformFilteredCommands.filter(
            (command) => selectedCategories.includes(command.category)
        );
    }

    // Then apply a search filter
    if (searchQuery.trim() === "") {
        displayCommands = filteredCommands.slice();
    } else {
        const query = searchQuery.toLowerCase();

        const scoredCommands = filteredCommands.map((command) => ({
            ...command,
            score: searchCommand(query, command),
        }));

        const matched = scoredCommands
            .filter((command) => command.score > 0)
            .sort((a, b) => b.score - a.score);

        const uniqueMatches = {};
        displayCommands = matched.filter((command) => {
            if (!uniqueMatches[command.name]) {
                uniqueMatches[command.name] = true;
                return true;
            }
            return false;
        });
    }

    // if (import.meta.env.MODE === "development") {
    //     console.log(
    //         `Search: "${searchQuery}", Found: ${displayCommands.length} commands`
    //     );
    //     console.log(
    //         "Displaying:",
    //         displayCommands.map((cmd) => cmd.name)
    //     );
    // }

    // Handle command click for navigation
    const onCommandClick = (commandName) => {
        setSearchQuery(commandName);
    };

    // Handle filter toggle (for both search icon and advanced filters button)
    const handleFilterToggle = () => {
        setShowAdvancedFilters(prev => !prev);
    };

    // Handle advanced filters toggle (same as filter toggle)
    const handleAdvancedFiltersToggle = () => {
        setShowAdvancedFilters(prev => !prev);
    };

    // Handle clearing all filters
    const handleClearAllFilters = () => {
        setSelectedPlatforms([]);
        setSelectedCategories([]);
        setShowAdvancedFilters(false);
    };

    // Re-check scrollability when filtered commands change
    useEffect(() => {
        // Small delay to let DOM update
        const timeoutId = setTimeout(() => {
            const documentHeight = document.documentElement.scrollHeight;
            const viewportHeight = window.innerHeight;
            const scrollableDistance = documentHeight - viewportHeight;
            
            // If not enough content, ensure mini search is hidden
            if (scrollableDistance < 300) {
                setShowMiniSearch(false);
            }
        }, 100);
        
        return () => clearTimeout(timeoutId);
    }, [displayCommands.length]);

    // Collapse advanced filters when scrolling with only 1 command
    useEffect(() => {
        if (displayCommands.length === 1 && showAdvancedFilters) {
            const handleScroll = () => {
                // Only collapse if filters are still open
                if (showAdvancedFilters) {
                    setShowAdvancedFilters(false);
                }
            };
            
            // Add scroll listener
            window.addEventListener('scroll', handleScroll);
            
            // Cleanup
            return () => window.removeEventListener('scroll', handleScroll);
        }
    }, [displayCommands.length, showAdvancedFilters]);

    // Wave background is now handled by the useWaveAnimation hook

    return (
        <div
            className="min-h-screen text-white font-inter relative"
            style={{
                ...getBackgroundWave(),
                zIndex: 0
            }}
        >
            <div className="container mx-auto max-w-6xl px-4 py-8">
                {/* Header with scroll-based visibility */}
                <div data-header style={getHeaderStyles()}>
                    <Header />
                </div>

                {/* Sentinel element for intersection observer - invisible trigger */}
                <div 
                    ref={sentinelRef}
                    style={{
                        position: 'absolute',
                        top: '100px', // Adjust this to control when the switch happens
                        left: 0,
                        width: '1px',
                        height: '1px',
                        pointerEvents: 'none',
                        opacity: 0
                    }}
                    aria-hidden="true"
                />

                {/* SearchInterface and FilterComponent with CSS sticky positioning */}
                <div
                    ref={stickyWrapperRef}
                    style={{
                        position: 'sticky',
                        top: '6px',
                        zIndex: 20,
                        minHeight: showMiniSearch ? '60px' : 'auto', // Prevent layout shift
                        transition: 'min-height 0.3s ease',
                    }}
                >
                    {/* Full Search Interface - always rendered but with opacity transition */}
                    <div
                        style={{
                            opacity: showMiniSearch ? 0 : 1,
                            visibility: showMiniSearch ? 'hidden' : 'visible',
                            transition: 'opacity 0.3s ease, visibility 0.3s ease',
                            position: showMiniSearch ? 'absolute' : 'relative',
                            width: '100%',
                            pointerEvents: showMiniSearch ? 'none' : 'auto'
                        }}
                    >
                        <SearchInterface
                            searchQuery={searchQuery}
                            onSearchChange={setSearchQuery}
                            onFilterToggle={handleFilterToggle}
                            selectedPlatforms={selectedPlatforms}
                            onPlatformChange={setSelectedPlatforms}
                            selectedCategories={selectedCategories}
                            onCategoryChange={setSelectedCategories}
                            showAdvancedFilters={showAdvancedFilters}
                            onAdvancedFiltersToggle={handleAdvancedFiltersToggle}
                            onClearAllFilters={handleClearAllFilters}
                            totalCommands={displayCommands.length}
                        />
                    </div>

                    {/* Mini Search Interface - always rendered but with opacity transition */}
                    <div
                        style={{
                            opacity: showMiniSearch ? 1 : 0,
                            visibility: showMiniSearch ? 'visible' : 'hidden',
                            transition: 'opacity 0.3s ease, visibility 0.3s ease',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            pointerEvents: showMiniSearch ? 'auto' : 'none'
                        }}
                    >
                        <SearchInterfaceMini
                            searchQuery={searchQuery}
                            onSearchChange={setSearchQuery}
                            totalCommands={displayCommands.length}
                            activeFiltersCount={selectedPlatforms.length + selectedCategories.length}
                            onClearFilters={handleClearAllFilters}
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        />
                    </div>
                </div>



                {/* Main content area with proper z-index for layering */}
                <div style={{
                    position: 'relative',
                    zIndex: 10
                }}>
                    <ErrorState message={error} />

                    {isLoading ? (
                        <LoadingState />
                    ) : (
                        <div>
                            <ResultsCounter
                                count={displayCommands.length}
                                selectedPlatforms={selectedPlatforms} // 🔧 UPDATED: Array instead of single platform
                                selectedCategories={selectedCategories} // 🔧 UPDATED: Array instead of single category
                            />

                            <CommandGrid
                                commands={displayCommands}
                                allCommands={commands}
                                onCommandClick={onCommandClick}
                                searchQuery={searchQuery}
                                wavePhase={wavePhase}
                            />
                        </div>
                    )}
                </div>
            </div>
            <PWAInstall />
        </div>
    );
}

export default App;
