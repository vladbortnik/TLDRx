import { useState, useEffect } from "react";
import { CommandCardHeader } from "./CommandCardHeader.jsx";
import { CommandCardBadges } from "./CommandCardBadges.jsx";
import { CommandCardSyntax } from "./CommandCardSyntax.jsx";
import { CommandCardInfo } from "./CommandCardInfo.jsx";
import { CommandCardUseCases } from "./CommandCardExamples.jsx";
import { CommandCardCombinations } from "./CommandCardCombinations.jsx";
import { CommandCardManPage } from "./CommandCardManPage.jsx";
import { CommandCardRelated } from "./CommandCardRelated.jsx";
import { copyToClipboard } from "../../utils/copyToClipboard.js";

export function CommandCard({
  name,
  subtitle,
  description,
  safety,
  platform,
  categories,
  prerequisites,
  syntaxPattern,
  commonFlags,
  notes,
  warnings,
  examples,
  relatedCommands,
  manPageUrl,
  maxVisibleExamples = 3,
  allCommands = [],
  onCommandClick,
  searchQuery = "",
}) {
  const [isExamplesExpanded, setIsExamplesExpanded] = useState(false);

  // Auto-expand Use Cases when user types exact command name
  useEffect(() => {
    const shouldExpand = searchQuery.toLowerCase().trim() === name.toLowerCase();
    setIsExamplesExpanded(shouldExpand);
  }, [searchQuery, name]);
  const [isCombinationsExpanded, setIsCombinationsExpanded] = useState(false);
  const [copiedExampleId, setCopiedExampleId] = useState(null);
  const [copiedCombinationId, setCopiedCombinationId] = useState(null);

  const handleCopy = async (code, exampleId) => {
    const success = await copyToClipboard(code);
    if (success) {
      setCopiedExampleId(exampleId);
      setTimeout(() => setCopiedExampleId(null), 2000);
    } else {
      console.error("Failed to copy text to clipboard");
      // Still show the check briefly to indicate the action was attempted
      setCopiedExampleId(exampleId);
      setTimeout(() => setCopiedExampleId(null), 1000);
    }
  };
  return (
    <div 
      className="bg-slate-800 rounded-lg border border-slate-700 p-6 hover:border-slate-600 transition-colors space-y-4"
      data-command-name={name}
    >
      {/* 1. Header - Command name, safety badge, description */}
      <CommandCardHeader
        name={name}
        subtitle={subtitle}
        description={description}
        safety={safety}
        prerequisites={prerequisites}
      />

      {/* 2. Platform Badges - OS compatibility indicators */}
      <CommandCardBadges platform={platform} categories={categories} />

      {/* 3. Syntax Pattern - Command syntax display */}
      <CommandCardSyntax syntaxPattern={syntaxPattern} />

      {/* 4. Use Cases - Practical scenarios */}
      <CommandCardUseCases
        useCases={examples}
        maxVisible={maxVisibleExamples}
        isExpanded={isExamplesExpanded}
        onToggleExpansion={() => setIsExamplesExpanded(!isExamplesExpanded)}
        copiedExampleId={copiedExampleId}
        onCopy={handleCopy}
      />

      {/* 5. Notes and Warnings */}
      <CommandCardInfo
        notes={notes}
        warnings={warnings}
      />

      {/* 5. Command Combinations - Multi-command workflows */}
      <CommandCardCombinations
        combinations={relatedCommands?.filter(cmd => typeof cmd === 'object' && cmd.commands) || []}
        isExpanded={isCombinationsExpanded}
        onToggleExpansion={() => setIsCombinationsExpanded(!isCombinationsExpanded)}
        copiedCombinationId={copiedCombinationId}
        onCopy={(commands, combinationId) => {
          handleCopy(commands, combinationId);
          setCopiedCombinationId(combinationId);
          setTimeout(() => setCopiedCombinationId(null), 2000);
        }}
      />

      {/* 7. Bottom section: Related Commands (left) and Manual Page link (right) */}
      <div className="flex items-end justify-between">
        <div className="flex-1">
          <CommandCardRelated 
            relatedCommands={relatedCommands} 
            allCommands={allCommands}
            onCommandClick={onCommandClick}
          />
        </div>
        <div className="flex-shrink-0 self-end">
          <CommandCardManPage url={manPageUrl} commandName={name} />
        </div>
      </div>
    </div>
  );
}
