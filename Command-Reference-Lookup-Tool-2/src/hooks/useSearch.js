import { useState, useMemo, useEffect } from 'react';

export function useSearch(commands, platforms) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Get OS platforms for exclusive selection behavior
  const osPlatforms = useMemo(() => 
    platforms.filter(p => p.category === 'os').map(p => p.id),
    [platforms]
  );

  const changePlatform = (platformId) => {
    // For single platform selection, toggle between selected and null
    // If the same platform is clicked, deselect it; otherwise select the new one
    setSelectedPlatform(prev => prev === platformId ? null : platformId);
  };

  // Simulate loading state when search changes
  useEffect(() => {
    if (searchQuery) {
      setIsLoading(true);
      const timeout = setTimeout(() => {
        setIsLoading(false);
      }, 300);
      return () => clearTimeout(timeout);
    } else {
      setIsLoading(false);
    }
  }, [searchQuery]);

  const filteredCommands = useMemo(() => {
    if (isLoading) return [];
    
    return commands.filter(command => {
      // Filter by search query
      const matchesSearch = !searchQuery || 
        command.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        command.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        command.subtitle.toLowerCase().includes(searchQuery.toLowerCase());

      // Filter by selected platform
      const matchesPlatform = !selectedPlatform ||
        command.platform.some(platform => 
          platform.id === selectedPlatform
        );

      return matchesSearch && matchesPlatform;
    });
  }, [commands, searchQuery, selectedPlatform, isLoading]);

  const hasSearched = searchQuery.trim().length > 0;
  const hasResults = filteredCommands.length > 0;
  const showNoResults = hasSearched && !isLoading && !hasResults;

  return {
    searchQuery,
    setSearchQuery,
    selectedPlatform,
    changePlatform,
    filteredCommands,
    resultsCount: filteredCommands.length,
    isLoading,
    hasSearched,
    showNoResults,
    osPlatforms
  };
}