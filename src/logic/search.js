/**
 * Shared fuzzy search utilities for TL;DRx.
 * Extracted from App.jsx to be reused by both legacy and Ionic UIs.
 */

/**
 * Enhanced fuzzy search algorithm that matches characters in sequence
 * with bonus scoring for consecutive matches and substring matches.
 *
 * @param {string} searchTerm - The search query to match against
 * @param {string} targetString - The target string to search within
 * @returns {number} Match score (0 for no match, higher numbers for better matches)
 */
export const fuzzySearch = (searchTerm, targetString) => {
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
export const searchCommand = (searchTerm, command) => {
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
