import { Header } from './components/Header.jsx';
import { SearchSection } from './components/SearchSection.jsx';
import { CommandList } from './components/CommandList.jsx';
import { CopyFeedback } from './components/CopyFeedback.jsx';
import { PLATFORMS } from './data/platforms.js';
import { SAMPLE_COMMANDS } from './data/commands.js';
import { useSearch } from './hooks/useSearch.js';
import { useCopyWithFeedback } from './hooks/useCopyWithFeedback.js';

export default function App() {
  const {
    searchQuery,
    setSearchQuery,
    selectedPlatform,
    changePlatform,
    filteredCommands,
    resultsCount,
    isLoading,
    showNoResults,
    osPlatforms
  } = useSearch(SAMPLE_COMMANDS, PLATFORMS);

  const { copyState, copy, closeFeedback } = useCopyWithFeedback();

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-300">
      <Header />
      
      <SearchSection
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedPlatform={selectedPlatform}
        onPlatformChange={changePlatform}
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

      {/* Global Copy Feedback */}
      <CopyFeedback
        isVisible={copyState.isVisible}
        isSuccess={copyState.isSuccess}
        message={copyState.message}
        onClose={closeFeedback}
      />
    </div>
  );
}