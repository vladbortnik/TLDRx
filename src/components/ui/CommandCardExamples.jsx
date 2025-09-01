import { ChevronDown, ChevronRight, Terminal, Copy } from "lucide-react";
import { Button } from "./button.jsx";

// Transform use cases from string format to object format
const transformUseCases = (useCases = []) => {
  if (!useCases || useCases.length === 0) return [];

  return useCases.map((useCase) => {
    if (typeof useCase === "string") {
      // Split on ' #' to separate command from scenario
      const [command, scenario] = useCase.includes(" #")
        ? useCase.split(" #")
        : [useCase, ""];

      return {
        scenario: scenario.trim() || "Common usage",
        command: command.trim(),
        explanation: "", // Will be enhanced with real data
      };
    }
    return useCase; // Already in correct format
  });
};

export function CommandCardUseCases({ 
  useCases = [], 
  maxVisible = 3,
  isExpanded = false,
  onToggleExpansion,
  copiedExampleId = null,
  onCopy
}) {
  
  // Transform use cases to the expected format
  const transformedUseCases = transformUseCases(useCases);

  if (!transformedUseCases || transformedUseCases.length === 0) {
    return null;
  }

  const visibleUseCases = isExpanded ? transformedUseCases : [];
  const hasMoreUseCases = transformedUseCases.length > 0;

  return (
    <div className="mb-4 border-l-2 border-emerald-500/30 pl-3">
      <div className="flex items-center justify-between mb-2">
        <button 
          onClick={onToggleExpansion}
          className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-slate-300 transition-colors cursor-pointer"
        >
          <Terminal className="w-4 h-4" />
          <span>Use Cases</span>
        </button>
        {hasMoreUseCases && (
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
                Show All ({transformedUseCases.length})
              </>
            )}
          </Button>
        )}
      </div>
      
      <div className="space-y-1">
        {visibleUseCases.map((useCase, index) => {
          const useCaseId = `usecase-${index}`;
          return (
            <div key={index} className="group relative">
              <div className="flex items-center justify-between p-2 rounded-md bg-gradient-to-r from-slate-900/40 to-slate-800/40 border border-slate-700/30 hover:border-slate-600/50 transition-all duration-200 hover:shadow-sm">
                {/* Single line: command # scenario */}
                <div className="flex-1 min-w-0 font-mono text-sm">
                  <code className="text-emerald-400 font-semibold">
                    {useCase.command}
                  </code>
                  {useCase.scenario && (
                    <span className="text-slate-400 ml-2">
                      # {useCase.scenario}
                    </span>
                  )}
                </div>
                
                {/* Copy button with text */}
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => onCopy(useCase.command, useCaseId)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-slate-500 hover:text-slate-400 h-7 px-2 text-xs flex-shrink-0"
                >
                  <span>copy</span>
                  {copiedExampleId === useCaseId ? (
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