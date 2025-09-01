import { useState } from 'react';
import { CommandCardHeader } from './CommandCardHeader.jsx';
import { CommandCardBadges } from './CommandCardBadges.jsx';
import { CommandCardSyntax } from './CommandCardSyntax.jsx';
import { CommandCardFlags } from './CommandCardFlags.jsx';
import { CommandCardInfo } from './CommandCardInfo.jsx';
import { CommandCardExamples } from './CommandCardExamples.jsx';
import { CommandCardManPage } from './CommandCardManPage.jsx';
import { CommandCardRelated } from './CommandCardRelated.jsx';
import { copyToClipboard } from '../utils/copyToClipboard.js';

export function CommandCard({ 
  name, 
  subtitle, 
  description, 
  safety,
  platform,
  categories,
  syntaxPattern,
  commonFlags,
  prerequisites,
  notes,
  warnings,
  examples, 
  relatedCommands,
  manPageUrl,
  maxVisibleExamples = 3 
}) {
  const [isExamplesExpanded, setIsExamplesExpanded] = useState(false);
  const [isFlagsExpanded, setIsFlagsExpanded] = useState(false);
  const [copiedExampleId, setCopiedExampleId] = useState(null);

  const handleCopy = async (code, exampleId) => {
    const success = await copyToClipboard(code);
    if (success) {
      setCopiedExampleId(exampleId);
      setTimeout(() => setCopiedExampleId(null), 2000);
    } else {
      console.error('Failed to copy text to clipboard');
      // Still show the check briefly to indicate the action was attempted
      setCopiedExampleId(exampleId);
      setTimeout(() => setCopiedExampleId(null), 1000);
    }
  };
  return (
    <div className="bg-slate-800 rounded-lg border border-slate-700 p-6 hover:border-slate-600 transition-colors space-y-4">
      {/* 1. Header - Command name, safety badge, description */}
      <CommandCardHeader 
        name={name}
        subtitle={subtitle}
        description={description}
        safety={safety}
      />

      {/* 2. Platform Badges - OS compatibility indicators */}
      <CommandCardBadges 
        platform={platform}
        categories={categories}
      />

      {/* 3. Syntax Pattern - Command syntax display */}
      <CommandCardSyntax 
        syntaxPattern={syntaxPattern}
      />

      {/* 4. Flag Combinations - Expandable common flags section */}
      <CommandCardFlags 
        commonFlags={commonFlags}
        isExpanded={isFlagsExpanded}
        onToggleExpansion={() => setIsFlagsExpanded(!isFlagsExpanded)}
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
        isExpanded={isExamplesExpanded}
        onToggleExpansion={() => setIsExamplesExpanded(!isExamplesExpanded)}
        copiedExampleId={copiedExampleId}
        onCopy={handleCopy}
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