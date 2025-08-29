import React, { useState, useEffect } from 'react';
import { FiChevronDown, FiChevronUp, FiCopy, FiCheck, FiTerminal } from 'react-icons/fi';
import commands from './data/commands';
import './index.css';

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
  const [expandedCommands, setExpandedCommands] = useState(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [copiedExample, setCopiedExample] = useState(null);
  const [expandedSections, setExpandedSections] = useState(new Set());

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
        setCommands(module.commands || module.default);
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
    } else if (descriptionScore > 30) { // Higher threshold for description matches
      return descriptionScore;
    }
    
    return 0; // No match
  };

  /**
   * Filter and rank commands based on search query and platform selection.
   * Returns filtered commands based on both search and platform criteria.
   */
  let displayCommands;

  // First filter by platform
  let platformFilteredCommands = commands;
  if (selectedPlatform !== "all") {
    platformFilteredCommands = commands.filter(command => 
      command.platform && command.platform.includes(selectedPlatform)
    );
  }

  // Then apply search filter
  if (searchQuery.trim() === "") {
    displayCommands = platformFilteredCommands.slice();
  } else {
    const query = searchQuery.toLowerCase();

    const scoredCommands = platformFilteredCommands.map((command) => ({
      ...command,
      score: searchCommand(query, command)
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

  if (import.meta.env.MODE === 'development') {
    console.log(
      `Search: "${searchQuery}", Found: ${displayCommands.length} commands`
    );
    console.log(
      "Displaying:",
      displayCommands.map((cmd) => cmd.name)
    );
  }

  /**
   * Toggles the expanded state of a command's examples section.
   * 
   * @param {string} commandName - Name of the command
   * @param {number} index - Index of the command in the display list
   */
  const toggleExpanded = (commandName, index) => {
    const commandKey = `${commandName}-${index}`;
    const newExpanded = new Set(expandedCommands);
    if (newExpanded.has(commandKey)) {
      newExpanded.delete(commandKey);
    } else {
      newExpanded.add(commandKey);
    }
    setExpandedCommands(newExpanded);
  };

  const copyToClipboard = async (text, exampleId) => {
    try {
      await navigator.clipboard.writeText(text.split(' #')[0].trim()); // Remove comment part
      setCopiedExample(exampleId);
      setTimeout(() => setCopiedExample(null), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const toggleSection = (sectionId) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  const getCategoryStyle = (category) => {
    const styles = {
      'file-system': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
      'package-management': 'bg-orange-500/20 text-orange-300 border-orange-500/30',
      'networking': 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
      'text-processing': 'bg-green-500/20 text-green-300 border-green-500/30',
      'system': 'bg-red-500/20 text-red-300 border-red-500/30',
      'development': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
      'search': 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
    };
    return styles[category] || 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'file-system': '📁',
      'package-management': '📦',
      'networking': '🌐',
      'text-processing': '📝',
      'system': '⚙️',
      'development': '💻',
      'search': '🔍'
    };
    return icons[category] || '🔧';
  };

  const formatCategoryName = (category) => {
    return category.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="container mx-auto max-w-6xl px-4 py-8">
        {/* Header */}
        <header className="mb-12 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="relative w-20 h-20 bg-gradient-to-br from-green-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-2xl">
              <span className="text-4xl text-white font-bold animate-bounce">$</span>
              <div className="absolute inset-0 rounded-2xl animate-pulse bg-green-400 opacity-30"></div>
            </div>
          </div>
          <h1 className="text-5xl font-bold text-white mb-3 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            TL;DR Commands
          </h1>
          <p className="text-xl text-slate-400">Simplified command reference for developers</p>
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
                    <FiTerminal className="text-white text-lg" style={{strokeWidth: 2.5}} />
                  </div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-lg opacity-30 animate-ping"></div>
                </div>
                
                {/* Modern typography */}
                <div className="flex items-center">
                  <span className="text-2xl font-black bg-gradient-to-r from-white via-cyan-200 to-blue-200 bg-clip-text text-transparent">
                    TL
                  </span>
                  <span className="text-cyan-400 text-xl font-light mx-1">;</span>
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
            {[
              { 
                key: 'linux', 
                label: 'Linux',
                icon: (
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.504 0C5.395 0 .456 5.125.456 12.253c0 4.584 2.415 8.611 6.015 10.86.451-.255.451-.679.451-1.02v-4.21c-3.15.686-3.796-1.336-3.796-1.336-.407-.966-.994-1.224-.994-1.224-.815-.555.061-.544.061-.544.9.064 1.375.926 1.375.926.8 1.383 2.103.984 2.616.752.082-.585.314-.984.571-1.211-1.993-.227-4.083-1.002-4.083-4.458 0-.985.35-1.789.925-2.419-.093-.227-.401-1.141.087-2.378 0 0 .754-.243 2.47.924.717-.2 1.485-.3 2.248-.303.762.003 1.532.103 2.25.303 1.715-1.167 2.468-.924 2.468-.924.489 1.237.181 2.151.089 2.378.576.63.924 1.434.924 2.419 0 3.464-2.094 4.227-4.093 4.451.321.278.607.825.607 1.662v2.465c0 .344 0 .771.454 1.021C19.143 20.858 21.544 16.835 21.544 12.253 21.544 5.125 16.608 0 12.504 0z"/>
                  </svg>
                )
              },
              { 
                key: 'mac', 
                label: 'macOS',
                icon: (
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                )
              },
              { 
                key: 'windows', 
                label: 'Windows',
                icon: (
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3 12V6.75l6-1.32v6.48L3 12zm17-9v8.75l-10 .15V5.21L20 3zM3 13l6-.09v6.44l-6-1.35V13zm17 .25V22l-10-1.91V13.1l10 .15z"/>
                  </svg>
                )
              },
              { 
                key: 'bsd', 
                label: 'BSD',
                icon: (
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                )
              }
            ].map((platform) => {
              const isSelected = selectedPlatform === platform.key;
              const colorMap = {
                linux: 'text-green-400 bg-green-500/20 border-green-500/50',
                mac: 'text-slate-300 bg-slate-500/20 border-slate-400/50',
                windows: 'text-cyan-400 bg-cyan-500/20 border-cyan-500/50',
                bsd: 'text-red-400 bg-red-500/20 border-red-500/50'
              };
              const selectedColors = colorMap[platform.key] || 'text-slate-400 bg-slate-500/20 border-slate-500/50';
              
              return (
                <button
                  key={platform.key}
                  onClick={() => setSelectedPlatform(isSelected ? 'all' : platform.key)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 border-2 ${
                    isSelected 
                      ? selectedColors
                      : 'text-slate-500 bg-slate-800/50 border-slate-700 hover:text-slate-400 hover:border-slate-600'
                  }`}
                >
                  {platform.icon}
                  <span className="text-sm font-medium">{platform.label}</span>
                </button>
              );
            })}
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
                {displayCommands.length} command{displayCommands.length !== 1 ? 's' : ''} found
                {selectedPlatform !== "all" && (
                  <span className="ml-2 text-slate-500">
                    • Filtered by {selectedPlatform === "mac" ? "macOS" : selectedPlatform}
                  </span>
                )}
              </p>
            </div>

            {/* Command list - with key to force re-render on search */}
            <div className="space-y-4" key={`search-results-${searchQuery}`}>
              {displayCommands.map((command, index) => {
                const commandKey = `${command.name}-${index}`;
                const isExpanded = expandedCommands.has(commandKey);
                const hasExamples = command.examples && command.examples.length > 0;
                const visibleExamples = hasExamples ? 
                  (isExpanded ? command.examples : command.examples.slice(0, 2)) : [];
                const hasMoreExamples = hasExamples && command.examples.length > 2;
                
                return (
                  <div
                    key={commandKey} className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-slate-600 transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/10"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <h2 className="text-2xl font-bold text-blue-400">
                            {command.name}
                          </h2>
                          {/* Safety Badge */}
                          {command.safety && (
                            <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                              command.safety === 'safe' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                              command.safety === 'caution' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                              'bg-red-500/20 text-red-400 border border-red-500/30'
                            }`}>
                              {command.safety === 'safe' ? '🟢 Safe' :
                               command.safety === 'caution' ? '🟡 Caution' : '🔴 Destructive'}
                            </span>
                          )}
                        </div>
                        {/* Display standsFor if available */}
                        {command.standsFor && (
                          <p className="text-sm text-slate-500 italic mb-2">
                            {command.standsFor}
                          </p>
                        )}
                        {/* Command description */}
                        <p className="text-slate-300 text-sm mt-3 leading-relaxed">{command.description}</p>
                      </div>
                      <div className="flex items-center flex-wrap gap-2 ml-4">
                        {/* Enhanced Platform Badges */}
                        {command.platform &&
                          command.platform.length > 0 &&
                          command.platform.map((platform) => {
                            const platformConfig = {
                              linux: { 
                                icon: (
                                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12.504 0C5.395 0 .456 5.125.456 12.253c0 4.584 2.415 8.611 6.015 10.86.451-.255.451-.679.451-1.02v-4.21c-3.15.686-3.796-1.336-3.796-1.336-.407-.966-.994-1.224-.994-1.224-.815-.555.061-.544.061-.544.9.064 1.375.926 1.375.926.8 1.383 2.103.984 2.616.752.082-.585.314-.984.571-1.211-1.993-.227-4.083-1.002-4.083-4.458 0-.985.35-1.789.925-2.419-.093-.227-.401-1.141.087-2.378 0 0 .754-.243 2.47.924.717-.2 1.485-.3 2.248-.303.762.003 1.532.103 2.25.303 1.715-1.167 2.468-.924 2.468-.924.489 1.237.181 2.151.089 2.378.576.63.924 1.434.924 2.419 0 3.464-2.094 4.227-4.093 4.451.321.278.607.825.607 1.662v2.465c0 .344 0 .771.454 1.021C19.143 20.858 21.544 16.835 21.544 12.253 21.544 5.125 16.608 0 12.504 0z"/>
                                  </svg>
                                ), 
                                color: 'linux', 
                                label: 'Linux' 
                              },
                              mac: { 
                                icon: (
                                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                                  </svg>
                                ), 
                                color: 'mac', 
                                label: 'macOS' 
                              },
                              windows: { 
                                icon: (
                                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M3 12V6.75l6-1.32v6.48L3 12zm17-9v8.75l-10 .15V5.21L20 3zM3 13l6-.09v6.44l-6-1.35V13zm17 .25V22l-10-1.91V13.1l10 .15z"/>
                                  </svg>
                                ), 
                                color: 'windows', 
                                label: 'Windows' 
                              },
                              bsd: { 
                                icon: (
                                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                                  </svg>
                                ), 
                                color: 'bsd', 
                                label: 'BSD' 
                              }
                            };
                            const config = platformConfig[platform] || { icon: '💻', color: 'slate', label: platform };
                            const colorClasses = {
                              linux: 'bg-slate-700/50 text-green-400 border-green-500/30',
                              mac: 'bg-slate-700/50 text-slate-300 border-slate-400/30',
                              windows: 'bg-slate-700/50 text-cyan-400 border-cyan-500/30',
                              bsd: 'bg-slate-700/50 text-red-400 border-red-500/30',
                              slate: 'bg-slate-500/20 text-slate-300 border-slate-500/30'
                            };
                            return (
                              <span
                                key={platform}
                                className={`inline-flex items-center gap-1.5 text-xs px-2 py-1 rounded-md border ${colorClasses[config.color]}`}
                              >
                                {config.icon}
                                {config.label}
                              </span>
                            );
                          })}
                        {/* Enhanced Category Tags */}
                        {command.category && (
                          <span className={`text-xs px-3 py-1 rounded-full border font-medium ${
                            getCategoryStyle(command.category)
                          }`}>
                            {getCategoryIcon(command.category)} {formatCategoryName(command.category)}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Enhanced Information Sections */}
                    <div className="mt-4 space-y-4">
                      {/* Syntax Pattern Section */}
                      {command.syntaxPattern && (
                        <div className="mt-5">
                          <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-600">
                            <h4 className="text-sm font-semibold text-purple-400 mb-2">Syntax:</h4>
                            <code className="text-purple-300 text-sm font-mono">
                              {command.syntaxPattern}
                            </code>
                          </div>
                        </div>
                      )}
                      {/* Common Flag Combinations Section - Expandable */}
                      {command.commonFlagCombinations && command.commonFlagCombinations.length > 0 && (
                        <div className="mt-5">
                          <button
                            onClick={() => toggleSection(`${commandKey}-flagcombos`)}
                            className="flex items-center gap-2 text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
                          >
                            {expandedSections.has(`${commandKey}-flagcombos`) ? (
                              <FiChevronUp className="w-4 h-4" />
                            ) : (
                              <FiChevronDown className="w-4 h-4" />
                            )}
                            Common Flag Combinations ({command.commonFlagCombinations.length})
                          </button>
                          {expandedSections.has(`${commandKey}-flagcombos`) && (
                            <div className="mt-2 space-y-2">
                              {command.commonFlagCombinations.map((combo, comboIndex) => {
                                const comboId = `${commandKey}-flagcombo-${comboIndex}`;
                                const isCopied = copiedExample === comboId;
                                return (
                                  <div key={comboIndex} className="bg-indigo-500/10 rounded-lg p-3 border border-indigo-500/30 group relative">
                                    <div className="flex items-start justify-between gap-3">
                                      <div className="flex-1">
                                        <div className="mb-1">
                                          <code className="text-slate-500 text-sm font-mono">
                                            {command.name}
                                          </code>
                                          <code className="text-indigo-300 text-sm font-mono font-bold ml-1">
                                            {combo.flags}
                                          </code>
                                          {combo.usage.replace(`${command.name} ${combo.flags}`, '').trim() && (
                                            <code className="text-slate-400 text-sm font-mono ml-1">
                                              {combo.usage.replace(`${command.name} ${combo.flags}`, '').trim()}
                                            </code>
                                          )}
                                        </div>
                                        <p className="text-slate-400 text-xs">
                                          {combo.description}
                                        </p>
                                      </div>
                                      <button
                                        onClick={() => copyToClipboard(combo.usage, comboId)}
                                        className={`flex items-center gap-1 px-2 py-1 rounded text-xs transition-all duration-200 ${
                                          isCopied 
                                            ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
                                            : 'bg-slate-600/50 text-slate-300 border border-slate-500/30 hover:bg-slate-600 hover:text-white opacity-0 group-hover:opacity-100'
                                        }`}
                                        title="Copy flag combination"
                                      >
                                        {isCopied ? (
                                          <>
                                            <FiCheck className="w-3 h-3" />
                                            Copied!
                                          </>
                                        ) : (
                                          <>
                                            <FiCopy className="w-3 h-3" />
                                            Copy
                                          </>
                                        )}
                                      </button>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      )}
                      {/* Prerequisites Section - Always Visible */}
                      {command.prerequisites && command.prerequisites.length > 0 && (
                        <div className="mt-5">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-sm font-semibold text-amber-400">Prerequisites:</span>
                            {command.prerequisites.map((prereq, prereqIndex) => (
                              <span 
                                key={prereqIndex}
                                className="bg-amber-500/20 text-amber-300 text-xs px-2 py-1 rounded-full border border-amber-500/30"
                              >
                                {prereq}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Common Flags Section - Expandable */}
                      {command.commonFlags && command.commonFlags.length > 0 && (
                        <div className="mt-5">
                          <button
                            onClick={() => toggleSection(`${commandKey}-flags`)}
                            className="flex items-center gap-2 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors"
                          >
                            {expandedSections.has(`${commandKey}-flags`) ? (
                              <FiChevronUp className="w-4 h-4" />
                            ) : (
                              <FiChevronDown className="w-4 h-4" />
                            )}
                            Common Flags ({command.commonFlags.length})
                          </button>
                          {expandedSections.has(`${commandKey}-flags`) && (
                            <div className="mt-2 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                              <div className="space-y-2">
                                {command.commonFlags.map((flagInfo, flagIndex) => (
                                  <div key={flagIndex} className="flex items-start gap-3">
                                    <code className="bg-slate-700/50 text-cyan-300 text-xs px-2 py-1 rounded font-mono min-w-fit">
                                      {flagInfo.flag}
                                    </code>
                                    <span className="text-slate-300 text-sm">
                                      {flagInfo.description}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Related Commands Section - Expandable */}
                      {command.relatedCommands && command.relatedCommands.length > 0 && (
                        <div className="mt-5">
                          <button
                            onClick={() => toggleSection(`${commandKey}-related`)}
                            className="flex items-center gap-2 text-sm font-semibold text-teal-400 hover:text-teal-300 transition-colors"
                          >
                            {expandedSections.has(`${commandKey}-related`) ? (
                              <FiChevronUp className="w-4 h-4" />
                            ) : (
                              <FiChevronDown className="w-4 h-4" />
                            )}
                            Related Commands ({command.relatedCommands.length})
                          </button>
                          {expandedSections.has(`${commandKey}-related`) && (
                            <div className="mt-2 p-3 bg-teal-500/10 border border-teal-500/30 rounded-lg">
                              <div className="flex flex-wrap gap-2">
                                {command.relatedCommands.map((relatedCmd, relatedIndex) => (
                                  <span 
                                    key={relatedIndex}
                                    className="bg-teal-500/20 text-teal-300 text-xs px-2 py-1 rounded-full border border-teal-500/30 hover:bg-teal-500/30 transition-colors cursor-pointer"
                                    title={`Search for ${relatedCmd}`}
                                  >
                                    {relatedCmd}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Troubleshooting Section - Expandable */}
                      {command.troubleshooting && (
                        <div className="mt-5">
                          <button
                            onClick={() => toggleSection(`${commandKey}-troubleshooting`)}
                            className="flex items-center gap-2 text-sm font-semibold text-orange-400 hover:text-orange-300 transition-colors"
                          >
                            {expandedSections.has(`${commandKey}-troubleshooting`) ? (
                              <FiChevronUp className="w-4 h-4" />
                            ) : (
                              <FiChevronDown className="w-4 h-4" />
                            )}
                            Troubleshooting Tips
                          </button>
                          {expandedSections.has(`${commandKey}-troubleshooting`) && (
                            <div className="mt-2 p-3 bg-orange-500/10 border border-orange-500/30 rounded-lg">
                              <ul className="text-orange-200 text-sm leading-relaxed space-y-1">
                                {Array.isArray(command.troubleshooting) ? (
                                  command.troubleshooting.map((tip, tipIndex) => (
                                    <li key={tipIndex} className="flex items-start gap-2">
                                      <span className="text-orange-400 mt-0.5">💡</span>
                                      <span>{tip}</span>
                                    </li>
                                  ))
                                ) : (
                                  <li className="flex items-start gap-2">
                                    <span className="text-orange-400 mt-0.5">💡</span>
                                    <span>{command.troubleshooting}</span>
                                  </li>
                                )}
                              </ul>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Examples Section */}
                      {hasExamples && (
                        <div className="mt-6">
                          <h4 className="text-sm font-semibold text-emerald-400 mb-2">Examples:</h4>
                          <div className="space-y-2">
                            {visibleExamples.map((example, exampleIndex) => {
                              const exampleId = `${commandKey}-example-${exampleIndex}`;
                              const isCopied = copiedExample === exampleId;
                              const [command, comment] = example.includes(' #') 
                                ? example.split(' #') 
                                : [example, null];
                              
                              return (
                                <div key={exampleIndex} className="bg-slate-700/50 rounded-lg p-3 border border-slate-600 group relative">
                                  <div className="flex items-start justify-between gap-3">
                                    <code className="text-sm font-mono break-all flex-1">
                                      <span className="text-green-300">{command}</span>
                                      {comment && (
                                        <span className="text-slate-400 ml-1">
                                          # {comment.trim()}
                                        </span>
                                      )}
                                    </code>
                                    <button
                                      onClick={() => copyToClipboard(example, exampleId)}
                                      className={`flex items-center gap-1 px-2 py-1 rounded text-xs transition-all duration-200 ${
                                        isCopied 
                                          ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
                                          : 'bg-slate-600/50 text-slate-300 border border-slate-500/30 hover:bg-slate-600 hover:text-white opacity-0 group-hover:opacity-100'
                                      }`}
                                      title="Copy command"
                                    >
                                      {isCopied ? (
                                        <>
                                          <FiCheck className="w-3 h-3" />
                                          Copied!
                                        </>
                                      ) : (
                                        <>
                                          <FiCopy className="w-3 h-3" />
                                          Copy
                                        </>
                                      )}
                                    </button>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                          {hasExamples && command.examples.length > 2 && (
                            <button
                              onClick={() => toggleExpanded(command.name, index)}
                              className="mt-3 flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors text-sm"
                            >
                              {isExpanded ? (
                                <>
                                  <FiChevronUp className="w-4 h-4" />
                                  Show fewer examples
                                </>
                              ) : (
                                <>
                                  <FiChevronDown className="w-4 h-4" />
                                  Show {command.examples.length - 2} more example{command.examples.length - 2 !== 1 ? 's' : ''}
                                </>
                              )}
                            </button>
                          )}
                        </div>
                      )}

                      {/* Man Page Link */}
                      <div className="mt-6 pt-4 border-t border-slate-600">
                        <a
                          href={`https://man7.org/linux/man-pages/man1/${command.name}.1.html`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-blue-400 transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                          View man page for {command.name}
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
