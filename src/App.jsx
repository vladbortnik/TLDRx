import React, { useState, useEffect, useRef } from "react";
import PWAInstall from './components/PWAInstall';
import { getPlatformMapping, getCategoryMapping } from "./constants/mappings";
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
    const scrollThreshold = 100; // Pixels to scroll before switching to mini

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
                // Transform commands for UI requirements (platforms and categories)
                const enhancedCommands = rawCommands.map(command => ({
                    ...command,
                    platform: command.platform ? command.platform.map(getPlatformMapping) : [getPlatformMapping('linux')],
                    categories: command.category ? [getCategoryMapping(command.category)] : [getCategoryMapping('general')],
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

    // Handle scroll to switch between full and mini search interface
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            setShowMiniSearch(scrollTop > scrollThreshold);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
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
                    command.platform.some(p =>
                        typeof p === 'string' ? p === selectedPlatId : p.id === selectedPlatId
                    )
                )
        );
    }

    // Then filter by categories (multiple selection support)
    let filteredCommands = platformFilteredCommands;
    if (selectedCategories.length > 0) {
        filteredCommands = platformFilteredCommands.filter(
            (command) => {
                // Handle both adapted format (categories array) and original format (category string)
                if (command.categories) {
                    return selectedCategories.some(selectedCatId =>
                        command.categories.some(cat => cat.name.toLowerCase().replace(/\s+/g, '-') === selectedCatId)
                    );
                }
                return selectedCategories.includes(command.category);
            }
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

                {/* SearchInterface and FilterComponent with CSS sticky positioning */}
                <div
                    ref={stickyWrapperRef}
                    style={{
                        position: 'sticky',
                        top: showMiniSearch ? '0px' : '6px',
                        zIndex: 20,
                        transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    }}
                >
                    {/* Mini Search Interface - shown when scrolled */}
                    {showMiniSearch ? (
                        <SearchInterfaceMini
                            searchQuery={searchQuery}
                            totalCommands={commands.length}
                            selectedPlatforms={selectedPlatforms}
                            selectedCategories={selectedCategories}
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        />
                    ) : (
                        /* Full Search Interface - shown at top */
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
                            totalCommands={commands.length}
                        />
                    )}
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
