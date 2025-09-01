import { ChevronDown, ChevronUp, Flag } from "lucide-react";
import { Button } from "./button.jsx";

export function CommandCardFlags({ 
  commonFlags = [],
  isExpanded = false,
  onToggleExpansion
}) {

  if (!commonFlags || commonFlags.length === 0) return null;

  const visibleFlags = isExpanded ? commonFlags : commonFlags.slice(0, 3);
  const hasMoreFlags = commonFlags.length > 3;

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-sm font-medium text-slate-300 flex items-center gap-2">
          <Flag className="w-4 h-4" />
          Common Flags
        </h4>
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
                <ChevronUp className="w-3 h-3 mr-1" />
                Show All ({commonFlags.length})
              </>
            )}
          </Button>
        )}
      </div>
      
      <div className="space-y-2">
        {visibleFlags.map((flag, index) => (
          <div key={index} className="bg-slate-900 rounded-md border border-slate-600 p-3">
            <div className="flex items-start gap-3">
              <code className="text-emerald-400 font-mono text-sm font-medium min-w-fit">
                {flag.flag}
              </code>
              <div className="flex-1">
                <p className="text-slate-300 text-sm">{flag.description}</p>
                {flag.example && (
                  <code className="text-slate-400 text-xs font-mono mt-1 block">
                    {flag.example}
                  </code>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}