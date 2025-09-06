import React, { useState, useEffect } from "react";
import { CommandCard } from './components/ui/CommandCard';
import PWAInstall from './components/PWAInstall';
import { getPlatformMapping, getCategoryMapping } from "./constants/mappings";
import { Header } from './components/layout/Header';
import { SearchInterface } from './components/search/SearchInterface';
import { FilterBar } from './components/filters/FilterBar';
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
  const [selectedPlatform, setSelectedPlatform] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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

        const module = await import("./data/commands.js");
        const rawCommands = module.commands || module.default;
        // Transform commands for UI requirements (platforms and categories)
        const enhancedCommands = rawCommands.map(command => ({
          ...command,
          platform: command.platform ? command.platform.map(getPlatformMapping) : [getPlatformMapping('linux')],
          categories: command.category ? [getCategoryMapping(command.category)] : [getCategoryMapping('general')],
          manPageUrl: command.manPageUrl || `https://man7.org/linux/man-pages/man1/${command.name}.1.html`
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

    // Exact match gets highest score
    if (target.includes(search)) {
      return 100 - (target.length - search.length);
    }

    // Fuzzy matching: check if all characters from search appear in order in target
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
        return nameScore + 2000; // Very high score for exact substring in name
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
   * Filter and rank commands based on search query and platform selection.
   * Returns filtered commands based on both search and platform criteria.
   */
  let displayCommands;
  let isExactMatch = false;

  // First filter by platform
  let platformFilteredCommands = commands;
  if (selectedPlatform !== "all") {
    platformFilteredCommands = commands.filter(
      (command) =>
        command.platform && command.platform.some(p => 
          typeof p === 'string' ? p === selectedPlatform : p.id === selectedPlatform
        )
    );
  }

  // Then filter by category
  let filteredCommands = platformFilteredCommands;
  if (selectedCategory !== "all") {
    filteredCommands = platformFilteredCommands.filter(
      (command) => {
        // Handle both adapted format (categories array) and original format (category string)
        if (command.categories) {
          return command.categories.some(cat => cat.name.toLowerCase().replace(/\s+/g, '-') === selectedCategory);
        }
        return command.category === selectedCategory;
      }
    );
  }

  // Then apply search filter
  if (searchQuery.trim() === "") {
    displayCommands = filteredCommands.slice();
  } else {
    const query = searchQuery.toLowerCase();

    // Check for exact command name match (Phase 4.1a)
    const exactMatchCommand = filteredCommands.find(
      (command) => command.name.toLowerCase() === query
    );
    isExactMatch = !!exactMatchCommand;

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

  if (import.meta.env.MODE === "development") {
    console.log(
      `Search: "${searchQuery}", Found: ${displayCommands.length} commands`
    );
    console.log(
      "Displaying:",
      displayCommands.map((cmd) => cmd.name)
    );
  }

  // Handle command click for navigation
  const onCommandClick = (commandName) => {
    setSearchQuery(commandName);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <Header />

        <SearchInterface 
          searchQuery={searchQuery} 
          onSearchChange={setSearchQuery}
        />

        <FilterBar
          selectedPlatform={selectedPlatform}
          selectedCategory={selectedCategory}
          onPlatformChange={setSelectedPlatform}
          onCategoryChange={setSelectedCategory}
        />

        <ErrorState message={error} />

        {isLoading ? (
          <LoadingState />
        ) : (
          <div>
            <ResultsCounter 
              count={displayCommands.length}
              selectedPlatform={selectedPlatform}
              selectedCategory={selectedCategory}
            />

            <CommandGrid
              commands={displayCommands}
              allCommands={commands}
              onCommandClick={onCommandClick}
              searchQuery={searchQuery}
            />
          </div>
        )}
      </div>
      <PWAInstall />
    </div>
  );
}

export default App;
