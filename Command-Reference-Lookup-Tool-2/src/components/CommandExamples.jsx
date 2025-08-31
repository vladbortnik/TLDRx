import { Button } from './ui/button.jsx';
import { CommandExample } from './CommandExample.jsx';

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

export function CommandExamples({ 
  examples, 
  maxVisible = 2,
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
  const remainingCount = transformedExamples.length - maxVisible;
  const hasMore = transformedExamples.length > maxVisible;

  return (
    <div className="space-y-3">
      <div>
        <p className="text-emerald-400 text-sm font-medium mb-2">Examples:</p>
      </div>
      
      <div className="space-y-2">
        {visibleExamples.map((example, index) => {
          const exampleId = `example-${index}`;
          return (
            <CommandExample 
              key={index} 
              example={example} 
              exampleId={exampleId}
              isCopied={copiedExampleId === exampleId}
              onCopy={onCopy}
            />
          );
        })}
      </div>

      {hasMore && (
        <Button 
          type="button"
          variant="ghost" 
          size="sm" 
          onClick={onToggleExpansion}
          className="text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10 p-0 h-auto"
        >
          {isExpanded 
            ? 'Show fewer examples' 
            : `Show ${remainingCount} more example${remainingCount > 1 ? 's' : ''}`
          }
        </Button>
      )}
    </div>
  );
}