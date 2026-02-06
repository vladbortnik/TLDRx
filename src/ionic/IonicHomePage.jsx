import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from "@ionic/react";
import { Header } from "../components/Header.jsx";
import { SearchInterface } from "../components/search/SearchInterface.jsx";
import { ResultsCounter } from "../components/search/ResultsCounter.jsx";
import { CommandGrid } from "../components/commands/CommandGrid.jsx";
import { ErrorState } from "../components/ui/ErrorState.jsx";
import { LoadingState } from "../components/ui/LoadingState.jsx";
import { Footer } from "../components/Footer.jsx";
import PWAInstall from "../components/PWAInstall.jsx";
import { searchCommand } from "../logic/search";
import {
  loadCommandsFromModule,
  filterCommandsByPlatformAndCategory,
} from "../logic/commands";

export default function IonicHomePage() {
  const [commands, setCommands] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [submittedSearchQuery, setSubmittedSearchQuery] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadCommands() {
      try {
        setIsLoading(true);
        const enhancedCommands = await loadCommandsFromModule();
        setCommands(enhancedCommands);
        setError(null);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error("Error loading commands in IonicHomePage:", err);
        setError("Failed to load commands. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }

    loadCommands().catch(() => {
      // error already handled above
    });
  }, []);

  const scrollToTopInstantly = useCallback(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({
        top: 0,
        // "instant" is supported by modern browsers and is safe in tests (mocked)
        behavior: "instant",
      });
    }
  }, []);

  const handleSearchSubmit = useCallback(
    (queryOverride) => {
      const queryToSubmit =
        queryOverride !== undefined ? queryOverride : searchQuery;

      scrollToTopInstantly();
      setSubmittedSearchQuery(queryToSubmit);
    },
    [searchQuery, scrollToTopInstantly]
  );

  // Auto-clear search results when user deletes all characters
  useEffect(() => {
    if (searchQuery === "" && submittedSearchQuery !== "") {
      setSubmittedSearchQuery("");
      scrollToTopInstantly();
    }
  }, [searchQuery, submittedSearchQuery, scrollToTopInstantly]);

  const displayCommands = useMemo(() => {
    const filteredCommands = filterCommandsByPlatformAndCategory(
      commands,
      selectedPlatforms,
      selectedCategories
    );

    if (submittedSearchQuery.trim() === "") {
      return filteredCommands.slice();
    }

    const query = submittedSearchQuery.toLowerCase();

    const scoredCommands = filteredCommands.map((command) => ({
      ...command,
      score: searchCommand(query, command),
    }));

    const matched = scoredCommands
      .filter((command) => command.score > 0)
      .sort((a, b) => b.score - a.score);

    const uniqueMatches = {};
    return matched.filter((command) => {
      if (!uniqueMatches[command.name]) {
        uniqueMatches[command.name] = true;
        return true;
      }
      return false;
    });
  }, [commands, submittedSearchQuery, selectedPlatforms, selectedCategories]);

  const handleFilterToggle = useCallback(() => {
    setShowAdvancedFilters((prev) => !prev);
  }, []);

  const handleAdvancedFiltersToggle = useCallback(() => {
    setShowAdvancedFilters((prev) => !prev);
  }, []);

  const handleClearAllFilters = useCallback(() => {
    setSelectedPlatforms([]);
    setSelectedCategories([]);
    setShowAdvancedFilters(false);
  }, []);

  const handleScrollToCommand = useCallback((commandName) => {
    if (!commandName) return;
    const element = document.getElementById(`command-${commandName}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return (
    <IonPage>
      <IonContent fullscreen className="bg-slate-950">
        <div
          className="min-h-screen text-white font-inter relative"
          style={{
            background:
              "linear-gradient(45deg, rgb(15,23,42), rgb(30,41,59), rgb(49,46,129), rgb(15,23,42))",
            zIndex: 0,
          }}
        >
          <div className="container mx-auto max-w-6xl px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8">
            <div data-header style={{ position: "relative" }}>
              <Header />
            </div>

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
              totalCommands={displayCommands.length}
              onSearchSubmit={handleSearchSubmit}
            />

            <ErrorState message={error} />

            {isLoading ? (
              <LoadingState />
            ) : (
              <>
                <ResultsCounter
                  count={displayCommands.length}
                  selectedPlatforms={selectedPlatforms}
                  selectedCategories={selectedCategories}
                />

                <CommandGrid
                  commands={displayCommands}
                  onScrollToCommand={handleScrollToCommand}
                />
              </>
            )}
          </div>

          <Footer />
          <PWAInstall />
        </div>
      </IonContent>
    </IonPage>
  );
}
