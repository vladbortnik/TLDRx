/**
 * @fileoverview Main application component for TL;DRx command reference
 * Orchestrates search, filtering, and command display with fuzzy search algorithm
 * Implements virtual scrolling, responsive design, and progressive web app features
 */

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import PWAInstall from "./components/PWAInstall";
import { Header } from "./components/Header";
import { SearchInterface } from "./components/search/SearchInterface";
import { SearchInterfaceMini } from "./components/search/SearchInterfaceMini";
import { ErrorState } from "./components/ui/ErrorState";
import { LoadingState } from "./components/ui/LoadingState";
import { ResultsCounter } from "./components/search/ResultsCounter";
import { CommandGrid } from "./components/commands/CommandGrid";
import "./index.css";

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
  const lowerSearchTerm = searchTerm.toLowerCase();
  const lowerCommandName = command.name.toLowerCase();

  // PRIORITY 1: Exact name match (the highest priority)
  if (lowerCommandName === lowerSearchTerm) {
    return 100000; // Massive score to ensure exact matches always appear first
  }

  // PRIORITY 2: Name starts with the search term (very high priority)
  if (lowerCommandName.startsWith(lowerSearchTerm)) {
    return 50000 + (100 - searchTerm.length); // Boost with a slight preference for shorter matches
  }

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
  const [submittedSearchQuery, setSubmittedSearchQuery] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [showMiniSearch, setShowMiniSearch] = useState(false);

  // Ref for dynamic height calculation of sticky search wrapper
  const stickyWrapperRef = useRef(null);

  // Sentinel element ref for intersection observer
  const sentinelRef = useRef(null);

  // Refs for both search inputs to manage focus
  const fullSearchRef = useRef(null);
  const miniSearchRef = useRef(null);

  /**
   * Get the man page URL for a command
   * @param {Object} command - Command object with manPageUrl field
   * @returns {string} Man page URL from command data
   */
  const getManPageUrl = (command) => {
    return (
      command.manPageUrl ||
      `https://man7.org/linux/man-pages/man1/${command.name}.1.html`
    );
  };

  useEffect(() => {
    /**
     * Asynchronously loads command data from the data module or uses mock data for testing.
     * Handles loading states and error conditions.
     */
    async function loadCommands() {
      try {
        setIsLoading(true);

        if (mockCommands) {
          setCommands(mockCommands);
          setError(null);
          return;
        }

        // TEMP: Force production data for performance testing
        const module = await import("./data/commands.js");
        const rawCommands = module.commands || module.default;

        // Transform commands for UI requirements
        const enhancedCommands = rawCommands.map((command) => ({
          ...command,
          platform: command.platform || ["linux"],
          category: command.category || "general",
          manPageUrl: getManPageUrl(command),
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
          "--total-sticky-height",
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

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Use IntersectionObserver with a sentinel element to prevent flicker
  // Track scroll direction to prevent mini search from disappearing when scrolling up
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    let lastScrollY = window.scrollY;
    let isScrollingDown = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Only check content height at the moment of intersection
        const documentHeight = document.documentElement.scrollHeight;
        const viewportHeight = window.innerHeight;
        const scrollableDistance = documentHeight - viewportHeight;

        // Determine scroll direction
        const currentScrollY = window.scrollY;
        isScrollingDown = currentScrollY > lastScrollY;
        lastScrollY = currentScrollY;

        // If we have enough scrollable content, allow the transition
        if (scrollableDistance > 300) {
          // Only hide full search when scrolling down AND sentinel is not visible
          // Keep mini search visible when scrolling up
          if (!entry.isIntersecting && isScrollingDown) {
            setShowMiniSearch(true);
          } else if (entry.isIntersecting && !isScrollingDown) {
            setShowMiniSearch(false);
          }
        } else {
          // Not enough content - always show full interface
          setShowMiniSearch(false);
        }
      },
      {
        threshold: 0,
        rootMargin: "0px",
      }
    );

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
    };
  }, []);

  /**
   * Maintain focus when switching between full and mini search interfaces
   * This ensures the cursor stays visible after transitions
   */
  useEffect(() => {
    const timeout = setTimeout(() => {
      const activeSearchRef = showMiniSearch ? miniSearchRef : fullSearchRef;
      if (activeSearchRef.current && activeSearchRef.current.focus) {
        activeSearchRef.current.focus();
      }
    }, 350); // Wait for transition to complete (300ms transition + 50ms buffer)

    return () => clearTimeout(timeout);
  }, [showMiniSearch]);

  /**
   * Unified scroll utility - used by ALL triggers that change displayCommands
   * Scrolls to top instantly to prevent Virtuoso rendering issues
   */
  const scrollToTopInstantly = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);

  /**
   * Handle search submission (Enter key or clear button)
   * @param {string} [queryOverride] - Optional explicit query value
   *   Used by clear button to pass empty string and avoid closure issues
   */
  const handleSearchSubmit = useCallback(
    (queryOverride) => {
      // Allow explicit query override (e.g., '' for clear button)
      const queryToSubmit =
        queryOverride !== undefined ? queryOverride : searchQuery;

      // Scroll to top before filtering (prevents Virtuoso from rendering at wrong position)
      scrollToTopInstantly();

      setSubmittedSearchQuery(queryToSubmit);
    },
    [searchQuery, scrollToTopInstantly]
  );

  // Wave animation is now handled by the useWaveAnimation hook

  /**
   * Filter and rank commands based on search query, platform, and category selections.
   * Handles multiple platform and category selections with efficient array operations.
   * Memoized to prevent unnecessary recalculations on unrelated re-renders.
   *
   * @returns {Array<Object>} Filtered and scored commands sorted by relevance
   */
  const displayCommands = useMemo(() => {
    // First filter by platforms (multiple selection support)
    let platformFilteredCommands = commands;
    if (selectedPlatforms.length > 0) {
      platformFilteredCommands = commands.filter(
        (command) =>
          command.platform &&
          selectedPlatforms.some((selectedPlatId) =>
            command.platform.includes(selectedPlatId)
          )
      );
    }

    // Then filter by categories (multiple selection support)
    let filteredCommands = platformFilteredCommands;
    if (selectedCategories.length > 0) {
      filteredCommands = platformFilteredCommands.filter((command) =>
        selectedCategories.includes(command.category)
      );
    }

    // Then apply a search filter using the SUBMITTED query (Enter key or clear)
    if (submittedSearchQuery.trim() === "") {
      return filteredCommands.slice();
    } else {
      const query = submittedSearchQuery.toLowerCase();

      const scoredCommands = filteredCommands.map((command) => ({
        ...command,
        score: searchCommand(query, command),
      }));

      const matched = scoredCommands
        .filter((command) => command.score > 0)
        .sort((a, b) => b.score - a.score);

      const uniqueMatches = {};
      const result = matched.filter((command) => {
        if (!uniqueMatches[command.name]) {
          uniqueMatches[command.name] = true;
          return true;
        }
        return false;
      });

      return result;
    }
  }, [commands, submittedSearchQuery, selectedPlatforms, selectedCategories]);

  /**
   * Handle command click for navigation
   * @param {string} commandName - Name of the command to search for
   */
  const onCommandClick = useCallback((commandName) => {
    setSearchQuery(commandName);
  }, []);

  /**
   * Toggle advanced filters panel visibility
   */
  const handleFilterToggle = useCallback(() => {
    setShowAdvancedFilters((prev) => !prev);
  }, []);

  /**
   * Toggle advanced filters panel (alias for handleFilterToggle)
   */
  const handleAdvancedFiltersToggle = useCallback(() => {
    setShowAdvancedFilters((prev) => !prev);
  }, []);

  /**
   * Clear all platform and category filters and close advanced filters panel
   */
  const handleClearAllFilters = useCallback(() => {
    setSelectedPlatforms([]);
    setSelectedCategories([]);
    setShowAdvancedFilters(false);
  }, []);

  /**
   * Handle related command click - immediately search and filter
   * Related commands should filter results without requiring Enter key
   *
   * @param {string} commandName - Name of command to search for
   */
  const handleScrollToCommand = useCallback(
    (commandName) => {
      // Scroll to top before filtering (prevents Virtuoso bug)
      scrollToTopInstantly();

      // Set display value
      setSearchQuery(commandName);
      // Immediately submit for filtering (no Enter needed)
      setSubmittedSearchQuery(commandName);
    },
    [scrollToTopInstantly]
  );

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

  /**
   * Collapse advanced filters when scrolling with only 1 command visible
   * Improves UX by preventing filters from blocking the single result
   */
  useEffect(() => {
    if (displayCommands.length === 1 && showAdvancedFilters) {
      const handleScroll = () => {
        // Only collapse if filters are still open
        if (showAdvancedFilters) {
          setShowAdvancedFilters(false);
        }
      };

      // Add scroll listener
      window.addEventListener("scroll", handleScroll);

      // Cleanup
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [displayCommands.length, showAdvancedFilters]);

  return (
    <div
      className="min-h-screen text-white font-inter relative"
      style={{
        background:
          "linear-gradient(45deg, rgb(15,23,42), rgb(30,41,59), rgb(49,46,129), rgb(15,23,42))",
        zIndex: 0,
      }}
    >
      <div className="container mx-auto max-w-6xl px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8">
        {/* Header with static visibility (scroll behavior temporarily disabled) */}
        <div data-header style={{ position: "relative" }}>
          <Header />
        </div>

        {/* Sentinel element for intersection observer - invisible trigger */}
        <div
          ref={sentinelRef}
          style={{
            position: "absolute",
            top: "100px", // Adjust this to control when the switch happens
            left: 0,
            width: "1px",
            height: "1px",
            pointerEvents: "none",
            opacity: 0,
          }}
          aria-hidden="true"
        />

        {/* SearchInterface and FilterComponent with CSS sticky positioning */}
        <div
          ref={stickyWrapperRef}
          style={{
            position: "sticky",
            top: "6px",
            zIndex: 20,
            minHeight: showMiniSearch ? "60px" : "auto", // Prevent layout shift
            transition: "min-height 0.3s ease",
          }}
        >
          {/* Full Search Interface - always rendered but with opacity transition */}
          <div
            style={{
              opacity: showMiniSearch ? 0 : 1,
              visibility: showMiniSearch ? "hidden" : "visible",
              transition: "opacity 0.3s ease, visibility 0.3s ease",
              position: showMiniSearch ? "absolute" : "relative",
              width: "100%",
              pointerEvents: showMiniSearch ? "none" : "auto",
            }}
          >
            <SearchInterface
              ref={fullSearchRef}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onSearchSubmit={handleSearchSubmit}
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
              visibility: showMiniSearch ? "visible" : "hidden",
              transition: "opacity 0.3s ease, visibility 0.3s ease",
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              pointerEvents: showMiniSearch ? "auto" : "none",
            }}
          >
            <SearchInterfaceMini
              ref={miniSearchRef}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onSearchSubmit={handleSearchSubmit}
              totalCommands={displayCommands.length}
              activeFiltersCount={
                selectedPlatforms.length + selectedCategories.length
              }
              onClearFilters={handleClearAllFilters}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              onLogoClick={() => {
                // Scroll to top before clearing (prevents Virtuoso bug)
                scrollToTopInstantly();

                // Reset everything and go home
                setSearchQuery("");
                setSubmittedSearchQuery(""); // CRITICAL: Also clear submitted query
                handleClearAllFilters();
              }}
            />
          </div>
        </div>

        {/* Main content area with proper z-index for layering */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
          }}
        >
          <ErrorState message={error} />

          {isLoading ? (
            <LoadingState />
          ) : (
            <div>
              <ResultsCounter
                count={displayCommands.length}
                selectedPlatforms={selectedPlatforms}
                selectedCategories={selectedCategories}
              />

              <CommandGrid
                commands={displayCommands}
                allCommands={commands}
                onCommandClick={onCommandClick}
                onScrollToCommand={handleScrollToCommand}
                searchQuery={searchQuery}
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
