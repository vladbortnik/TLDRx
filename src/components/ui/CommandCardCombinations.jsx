import { ChevronDown, ChevronRight, Zap, Copy } from "lucide-react";
import { Button } from "./button.jsx";

export function CommandCardCombinations({ 
  combinations = [], 
  isExpanded = false,
  onToggleExpansion,
  copiedCombinationId = null,
  onCopy
}) {
  
  if (!combinations || combinations.length === 0) return null;

  const visibleCombinations = isExpanded ? combinations : [];
  const hasMoreCombinations = combinations.length > 0;

  return (
    <div className="mb-4 border-l-2 border-purple-500/30 pl-3">
      <div className="flex items-center justify-between mb-2">
        <button 
          onClick={onToggleExpansion}
          className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-slate-300 transition-colors cursor-pointer"
        >
          <Zap className="w-4 h-4" />
          <span>Command Combinations</span>
        </button>
        {hasMoreCombinations && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onToggleExpansion}
            className="text-xs text-slate-400 hover:text-slate-300 h-6 px-2"
          >
            {isExpanded ? (
              <>
                <ChevronDown className="w-3 h-3 mr-1" />
                Show Less
              </>
            ) : (
              <>
                <ChevronRight className="w-3 h-3 mr-1" />
                Show All ({combinations.length})
              </>
            )}
          </Button>
        )}
      </div>
      
      <div className="space-y-1">
        {visibleCombinations.map((combination, index) => {
          const combinationId = `combination-${index}`;
          return (
            <div key={index} className="group relative">
              <div className="flex items-center justify-between p-2 rounded-md bg-gradient-to-r from-slate-900/40 to-slate-800/40 border border-slate-700/30 hover:border-slate-600/50 transition-all duration-200 hover:shadow-sm">
                {/* Single line: scenario + commands */}
                <div className="flex-1 min-w-0">
                  <div className="text-sm">
                    <span className="text-slate-300 font-medium">{combination.scenario}</span>
                    <code className="text-purple-400 font-mono ml-2">{combination.commands}</code>
                  </div>
                </div>
                
                {/* Copy button with text */}
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => onCopy && onCopy(combination.commands, combinationId)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-slate-500 hover:text-slate-400 h-7 px-2 text-xs flex-shrink-0"
                >
                  <span>copy</span>
                  {copiedCombinationId === combinationId ? (
                    <span className="text-green-400">✓</span>
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
