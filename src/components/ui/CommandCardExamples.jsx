import { ChevronDown, ChevronRight, Terminal, Copy } from "lucide-react";
import { Button } from "./button.jsx";

// Transform examples from string format to object format
const transformExamples = (examples = []) => {
  if (!examples || examples.length === 0) return [];

  return examples.map((example) => {
    if (typeof example === "string") {
      // Split on ' #' to separate command from comment
      const [command, comment] = example.includes(" #")
        ? example.split(" #")
        : [example, ""];

      return {
        code: command.trim(),
        description: comment.trim() || "",
        output: "", // App doesn't provide output
      };
    }
    return example; // Already in correct format
  });
};

export function CommandCardExamples({ 
  examples = [], 
  maxVisible = 3,
  isExpanded = false,
  onToggleExpansion,
  copiedExampleId = null,
  onCopy
}) {
  
  // Transform examples to the expected format
  const transformedExamples = transformExamples(examples);

  if (!transformedExamples || transformedExamples.length === 0) {
    return null;
  }

  const visibleExamples = isExpanded ? transformedExamples : [];
  const hasMoreExamples = transformedExamples.length > 0;

  return (
    <div className="mb-4 border-l-2 border-emerald-500/30 pl-3">
      <div className="flex items-center justify-between mb-2">
        <button 
          onClick={onToggleExpansion}
          className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-slate-300 transition-colors cursor-pointer"
        >
          <Terminal className="w-4 h-4" />
          <span>Usage Examples</span>
        </button>
        {hasMoreExamples && (
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
                Show All ({transformedExamples.length})
              </>
            )}
          </Button>
        )}
      </div>
      
      <div className="space-y-1">
        {visibleExamples.map((example, index) => {
          const exampleId = `example-${index}`;
          return (
            <div key={index} className="group relative">
              <div className="flex items-center justify-between p-2 rounded-md bg-gradient-to-r from-slate-900/40 to-slate-800/40 border border-slate-700/30 hover:border-slate-600/50 transition-all duration-200 hover:shadow-sm">
                {/* Single line: command + description */}
                <div className="flex-1 min-w-0 font-mono text-sm">
                  <code className="text-emerald-400 font-semibold">
                    {example.code}
                  </code>
                  {example.description && (
                    <span className="text-slate-400 ml-2">
                      # {example.description}
                    </span>
                  )}
                </div>
                
                {/* Copy button with text */}
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => onCopy(example.code, exampleId)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-slate-500 hover:text-slate-400 h-7 px-2 text-xs flex-shrink-0"
                >
                  <span>copy</span>
                  {copiedExampleId === exampleId ? (
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