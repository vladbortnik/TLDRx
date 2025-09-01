import React, { useState, useEffect } from "react";
import {
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
  Terminal,
} from "lucide-react";
import commands from "./data/commands";
import { CommandCard } from "./components/ui/CommandCard.jsx";
import { adaptToEnhancedFormat } from "./utils/dataAdapter";
import "./index.css";

/**
 * Main TL;DR application component that displays a searchable command reference.
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
        // Process commands through adapter to add manPageUrl and other enhancements
        const enhancedCommands = rawCommands.map(command => adaptToEnhancedFormat(command));
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
      (command) => command.category === selectedCategory
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
        {/* Header */}
        <header className="mb-12">
          <div className="flex items-start gap-6 justify-center">
            <div className="relative w-20 h-20 bg-gradient-to-br from-green-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-2xl">
              <span className="text-4xl text-white font-bold animate-bounce">
                $
              </span>
              <div className="absolute inset-0 rounded-2xl animate-pulse bg-green-400 opacity-30"></div>
            </div>
            <div className="text-left">
              <h1 className="text-5xl font-bold text-white mb-3 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                TL;DRx
              </h1>
              <p className="text-xl text-slate-400">
                Commands Made Simple
              </p>
            </div>
          </div>
        </header>

        {/* Search box and logo */}
        <div className="mb-6">
          <div className="flex items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search commands..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-4 text-lg bg-slate-800 border-2 border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              />
              <div className="absolute inset-0 rounded-xl bg-blue-500/10 opacity-0 focus-within:opacity-100 transition-opacity duration-200 pointer-events-none"></div>
            </div>
            {/* TL;DR Logo moved here */}
            <div className="relative overflow-hidden bg-gradient-to-br from-slate-800 via-blue-900 to-purple-900 border-2 border-blue-500/30 rounded-2xl h-16 px-6 shadow-2xl">
              {/* Background glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 animate-pulse"></div>

              {/* Main content */}
              <div className="relative flex items-center gap-4 h-full">
                {/* Enhanced terminal icon */}
                <div className="relative">
                  <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                    <Terminal
                      className="text-white text-lg"
                      strokeWidth={2.5}
                    />
                  </div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-lg opacity-30 animate-ping"></div>
                </div>

                {/* Modern typography */}
                <div className="flex items-center">
                  <span className="text-2xl font-black bg-gradient-to-r from-white via-cyan-200 to-blue-200 bg-clip-text text-transparent">
                    TL
                  </span>
                  <span className="text-cyan-400 text-xl font-light mx-1">
                    ;
                  </span>
                  <span className="text-2xl font-black bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                    DR
                  </span>
                </div>
              </div>

              {/* Subtle animated border */}
              <div className="absolute inset-0 rounded-2xl border border-blue-400/20 animate-pulse"></div>
            </div>
          </div>

          {/* Platform Toggle Icons */}
          <div className="mt-4 flex items-center justify-start gap-4">
            <span className="text-sm text-slate-400">Platform:</span>
            {[
              {
                key: "linux",
                label: "Linux",
                icon: (
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12.504 0C5.395 0 .456 5.125.456 12.253c0 4.584 2.415 8.611 6.015 10.86.451-.255.451-.679.451-1.02v-4.21c-3.15.686-3.796-1.336-3.796-1.336-.407-.966-.994-1.224-.994-1.224-.815-.555.061-.544.061-.544.9.064 1.375.926 1.375.926.8 1.383 2.103.984 2.616.752.082-.585.314-.984.571-1.211-1.993-.227-4.083-1.002-4.083-4.458 0-.985.35-1.789.925-2.419-.093-.227-.401-1.141.087-2.378 0 0 .754-.243 2.47.924.717-.2 1.485-.3 2.248-.303.762.003 1.532.103 2.25.303 1.715-1.167 2.468-.924 2.468-.924.489 1.237.181 2.151.089 2.378.576.63.924 1.434.924 2.419 0 3.464-2.094 4.227-4.093 4.451.321.278.607.825.607 1.662v2.465c0 .344 0 .771.454 1.021C19.143 20.858 21.544 16.835 21.544 12.253 21.544 5.125 16.608 0 12.504 0z" />
                  </svg>
                ),
              },
              {
                key: "mac",
                label: "macOS",
                icon: (
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                ),
              },
              {
                key: "windows",
                label: "Windows",
                icon: (
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M3 12V6.75l6-1.32v6.48L3 12zm17-9v8.75l-10 .15V5.21L20 3zM3 13l6-.09v6.44l-6-1.35V13zm17 .25V22l-10-1.91V13.1l10 .15z" />
                  </svg>
                ),
              },
            ].map(({ key, label, icon }) => (
              <button
                key={key}
                onClick={() => setSelectedPlatform(key)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  selectedPlatform === key
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white"
                }`}
              >
                {icon}
                {label}
              </button>
            ))}
          </div>

          {/* Category Filter Tags */}
          <div className="mt-4 flex flex-wrap items-center justify-start gap-2">
            <span className="text-sm text-slate-400 mr-2">Category:</span>
            {["all", "file-operations", "text-processing", "system", "networking", "shell", "development", "package-management", "security", "containers", "automation", "data-processing"].map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? "bg-purple-600 text-white shadow-lg shadow-purple-500/25"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white"
                }`}
              >
                {category === "all" ? "All" : category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </button>
            ))}
          </div>
        </div>

        {/* Error state */}
        {error && (
          <div className="bg-red-900/20 border-l-4 border-red-500 text-red-300 p-4 mb-6 rounded-r-lg">
            <p>{error}</p>
          </div>
        )}

        {/* Loading state */}
        {isLoading ? (
          <div className="text-center p-8">
            <p className="text-slate-400">Loading commands...</p>
          </div>
        ) : (
          <div>
            {/* Results count */}
            <div className="mb-6">
              <p className="text-sm text-slate-400">
                {displayCommands.length} command
                {displayCommands.length !== 1 ? "s" : ""} found
                {selectedPlatform !== "all" && (
                  <span className="ml-2 text-slate-500">
                    • Filtered by{" "}
                    {selectedPlatform === "mac" ? "macOS" : selectedPlatform}
                  </span>
                )}
              </p>
            </div>

            {/* Command Cards */}
            <div className="space-y-6">
              {displayCommands.map((command) => (
                <CommandCard
                  key={command.name}
                  data-command-name={command.name}
                  name={command.name}
                  subtitle={command.subtitle}
                  description={command.description}
                  safety={command.safety}
                  platform={command.platform}
                  categories={command.categories}
                  prerequisites={command.prerequisites}
                  syntaxPattern={command.syntaxPattern}
                  commonFlags={command.commonFlags}
                  notes={command.notes}
                  warnings={command.warnings}
                  examples={command.examples}
                  relatedCommands={command.relatedCommands}
                  manPageUrl={command.manPageUrl}
                  allCommands={commands}
                  onCommandClick={onCommandClick}
                  searchQuery={searchQuery}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
