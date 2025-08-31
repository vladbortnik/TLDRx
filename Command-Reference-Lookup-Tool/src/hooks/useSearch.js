import { useState, useMemo, useEffect } from 'react';

export function useSearch(commands, platforms) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState(['linux']);
  const [isLoading, setIsLoading] = useState(false);

  // Get OS platforms for exclusive selection behavior
  const osPlatforms = useMemo(() => 
    platforms.filter(p => p.category === 'os').map(p => p.id),
    [platforms]
  );

  const togglePlatform = (platformId) => {
    const platform = platforms.find(p => p.id === platformId);
    
    if (platform?.category === 'os') {
      // Exclusive selection for OS platforms
      setSelectedPlatforms(prev => 
        prev.includes(platformId) 
          ? prev.filter(p => !osPlatforms.includes(p)) // Remove all OS platforms
          : [...prev.filter(p => !osPlatforms.includes(p)), platformId] // Remove other OS, add this one
      );
    } else {
      // Multi-selection for non-OS platforms
      setSelectedPlatforms(prev => 
        prev.includes(platformId) 
          ? prev.filter(p => p !== platformId)
          : [...prev, platformId]
      );
    }
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

      // Filter by selected platforms
      const matchesPlatform = selectedPlatforms.length === 0 ||
        command.platforms.some(platform => 
          selectedPlatforms.includes(platform.id)
        );

      return matchesSearch && matchesPlatform;
    });
  }, [commands, searchQuery, selectedPlatforms, isLoading]);

  const hasSearched = searchQuery.trim().length > 0;
  const hasResults = filteredCommands.length > 0;
  const showNoResults = hasSearched && !isLoading && !hasResults;

  return {
    searchQuery,
    setSearchQuery,
    selectedPlatforms,
    togglePlatform,
    filteredCommands,
    resultsCount: filteredCommands.length,
    isLoading,
    hasSearched,
    showNoResults,
    osPlatforms
  };
}