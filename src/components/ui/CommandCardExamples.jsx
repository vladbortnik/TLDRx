import { ChevronDown, ChevronUp, Terminal } from "lucide-react";
import { Button } from "./button.jsx";
import { CommandExample } from "./CommandExample.jsx";

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

  const visibleExamples = isExpanded ? transformedExamples : transformedExamples.slice(0, maxVisible);
  const hasMoreExamples = transformedExamples.length > maxVisible;

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-medium text-slate-300 flex items-center gap-2">
          <Terminal className="w-4 h-4" />
          Usage Examples
        </h4>
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
                <ChevronUp className="w-3 h-3 mr-1" />
                Show All ({transformedExamples.length})
              </>
            )}
          </Button>
        )}
      </div>
      
      <div className="space-y-3">
        {visibleExamples.map((example, index) => {
          const exampleId = `example-${index}`;
          return (
            <div key={index} className="bg-slate-900 rounded-md border border-slate-600 overflow-hidden">
              {example.title && (
                <div className="bg-slate-800 px-3 py-2 border-b border-slate-600">
                  <h5 className="text-xs font-medium text-slate-300">{example.title}</h5>
                </div>
              )}
              <div className="p-3">
                <CommandExample
                  code={example.code}
                  description={example.description}
                  output={example.output}
                  exampleId={exampleId}
                  isCopied={copiedExampleId === exampleId}
                  onCopy={onCopy}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}