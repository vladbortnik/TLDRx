import { ChevronDown, ChevronRight, Flag, Copy } from "lucide-react";
import { Button } from "./button.jsx";

export function CommandCardFlags({ 
  commonFlags = [],
  isExpanded = false,
  onToggleExpansion,
  copiedFlagId = null,
  onCopy
}) {

  if (!commonFlags || commonFlags.length === 0) return null;

  const visibleFlags = isExpanded ? commonFlags : [];
  const hasMoreFlags = commonFlags.length > 0;

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2">
        <button 
          onClick={onToggleExpansion}
          className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-slate-300 transition-colors cursor-pointer"
        >
          <Flag className="w-4 h-4" />
          <span>Common Flags</span>
        </button>
        {hasMoreFlags && (
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
                Show All ({commonFlags.length})
              </>
            )}
          </Button>
        )}
      </div>
      
      <div className="space-y-1">
        {visibleFlags.map((flag, index) => {
          const flagId = `flag-${index}`;
          return (
            <div key={index} className="group relative">
              <div className="flex items-center justify-between p-2 rounded-md bg-gradient-to-r from-slate-900/40 to-slate-800/40 border border-slate-700/30 hover:border-slate-600/50 transition-all duration-200 hover:shadow-sm">
                {/* Single line: flag + description */}
                <div className="flex-1 min-w-0 font-mono text-sm">
                  <code className="text-blue-400 font-semibold">
                    {flag.flag}
                  </code>
                  <span className="text-slate-400 ml-2">
                    {flag.description}
                  </span>
                </div>
                
                {/* Copy button with text */}
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => onCopy && onCopy(flag.flag, flagId)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-slate-500 hover:text-slate-400 h-7 px-2 text-xs flex-shrink-0"
                >
                  <span>copy</span>
                  {copiedFlagId === flagId ? (
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