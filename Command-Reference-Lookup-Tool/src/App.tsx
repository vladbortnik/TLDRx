import { Header } from './components/Header.jsx';
import { SearchSection } from './components/SearchSection.jsx';
import { CommandList } from './components/CommandList';
import { PLATFORMS } from './data/platforms';
import { SAMPLE_COMMANDS } from './data/commands';
import { useSearch } from './hooks/useSearch';

export default function App() {
  const {
    searchQuery,
    setSearchQuery,
    selectedPlatforms,
    togglePlatform,
    filteredCommands,
    resultsCount,
    isLoading,
    showNoResults,
    osPlatforms
  } = useSearch(SAMPLE_COMMANDS, PLATFORMS);

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <Header />
      
      <SearchSection
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedPlatforms={selectedPlatforms}
        onPlatformToggle={togglePlatform}
        platforms={PLATFORMS}
        resultsCount={resultsCount}
        isLoading={isLoading}
        osPlatforms={osPlatforms}
      />

      {/* Main Content Area - Results Section */}
      <main className="max-w-6xl mx-auto px-4 pb-12">
        <CommandList 
          commands={filteredCommands}
          isLoading={isLoading}
          showNoResults={showNoResults}
          searchQuery={searchQuery}
          onClearSearch={handleClearSearch}
        />
      </main>
    </div>
  );
}