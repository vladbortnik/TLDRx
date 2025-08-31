import { useState } from 'react';
import { ChevronDown, ChevronRight, Terminal } from 'lucide-react';
import { Button } from './ui/button.jsx';
import { CommandExample } from './CommandExample';

export function CommandCardExamples({ examples = [], maxVisible = 3 }) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!examples || examples.length === 0) {
    return null;
  }

  const visibleExamples = isExpanded ? examples : examples.slice(0, maxVisible);
  const hasMoreExamples = examples.length > maxVisible;

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-medium text-slate-300 flex items-center gap-2">
          <Terminal className="w-4 h-4" />
          Usage Examples
        </h4>
        {hasMoreExamples && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
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
                Show All ({examples.length})
              </>
            )}
          </Button>
        )}
      </div>
      
      <div className="space-y-3">
        {visibleExamples.map((example, index) => (
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
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}