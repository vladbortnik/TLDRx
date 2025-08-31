import { CommandCard } from './CommandCard.jsx';
import { LoadingState } from './LoadingState.jsx';
import { NoResultsState } from './NoResultsState.jsx';

export function CommandList({ 
  commands, 
  maxVisibleExamples = 2, 
  isLoading = false,
  showNoResults = false,
  searchQuery = '',
  onClearSearch
}) {
  if (isLoading) {
    return <LoadingState />;
  }

  if (showNoResults) {
    return (
      <NoResultsState 
        searchQuery={searchQuery} 
        onClearSearch={onClearSearch}
      />
    );
  }

  if (!commands || commands.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-400 text-lg">Welcome to TL;DR Commands</p>
        <p className="text-slate-500 text-sm mt-2">
          Search for commands or browse by platform to get started
        </p>
      </div>
    );
  }

  return (
    <div 
      className="space-y-6" 
      role="list" 
      aria-label={`${commands.length} command results`}
      aria-live="polite"
    >
      {commands.map((command, index) => (
        <div key={`${command.name}-${index}`} role="listitem">
          <CommandCard
            name={command.name}
            subtitle={command.subtitle}
            description={command.description}
            safety={command.safety}
            platform={command.platform}
            categories={command.categories}
            syntaxPattern={command.syntaxPattern}
            commonFlags={command.commonFlags}
            prerequisites={command.prerequisites}
            notes={command.notes}
            warnings={command.warnings}
            examples={command.examples}
            relatedCommands={command.relatedCommands}
            manPageUrl={command.manPageUrl}
            maxVisibleExamples={maxVisibleExamples}
          />
        </div>
      ))}
    </div>
  );
}