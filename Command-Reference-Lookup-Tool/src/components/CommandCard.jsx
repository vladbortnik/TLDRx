import { CommandCardHeader } from './CommandCardHeader';
import { CommandCardBadges } from './CommandCardBadges';
import { CommandCardSyntax } from './CommandCardSyntax';
import { CommandCardFlags } from './CommandCardFlags';
import { CommandCardInfo } from './CommandCardInfo';
import { CommandCardExamples } from './CommandCardExamples';
import { CommandCardManPage } from './CommandCardManPage';
import { CommandCardRelated } from './CommandCardRelated';

export function CommandCard({ 
  name, 
  subtitle, 
  description, 
  safetyLevel,
  platforms,
  categories,
  syntax,
  flags,
  prerequisites,
  notes,
  warnings,
  examples, 
  relatedCommands,
  manPageUrl,
  maxVisibleExamples = 3 
}) {
  return (
    <div className="bg-slate-800 rounded-lg border border-slate-700 p-6 hover:border-slate-600 transition-colors space-y-4">
      {/* 1. Header - Command name, safety badge, description */}
      <CommandCardHeader 
        name={name}
        subtitle={subtitle}
        description={description}
        safetyLevel={safetyLevel}
      />

      {/* 2. Platform Badges - OS compatibility indicators */}
      <CommandCardBadges 
        platforms={platforms}
        categories={categories}
      />

      {/* 3. Syntax Pattern - Command syntax display */}
      <CommandCardSyntax 
        syntax={syntax}
      />

      {/* 4. Flag Combinations - Expandable common flags section */}
      <CommandCardFlags 
        flags={flags}
      />

      {/* 5. Prerequisites - Required dependencies */}
      <CommandCardInfo 
        prerequisites={prerequisites}
        notes={notes}
        warnings={warnings}
      />

      {/* 6. Examples - Expandable usage examples */}
      <CommandCardExamples 
        examples={examples}
        maxVisible={maxVisibleExamples}
      />

      {/* 7. Related Commands - Command suggestions */}
      <CommandCardRelated 
        relatedCommands={relatedCommands}
      />

      {/* 8. Link to the external 'man page' */}
      <CommandCardManPage 
        url={manPageUrl}
        commandName={name}
      />
    </div>
  );
}