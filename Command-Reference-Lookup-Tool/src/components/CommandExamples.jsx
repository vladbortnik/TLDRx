import { useState } from 'react';
import { Button } from './ui/button.jsx';
import { CommandExample } from './CommandExample';

export function CommandExamples({ examples, maxVisible = 2 }) {
  const [showAll, setShowAll] = useState(false);
  
  if (!examples || examples.length === 0) {
    return null;
  }
  
  const visibleExamples = showAll ? examples : examples.slice(0, maxVisible);
  const remainingCount = examples.length - maxVisible;
  const hasMore = examples.length > maxVisible;

  return (
    <div className="space-y-3">
      <div>
        <p className="text-emerald-400 text-sm font-medium mb-2">Examples:</p>
      </div>
      
      <div className="space-y-2">
        {visibleExamples.map((example, index) => (
          <CommandExample key={index} example={example} />
        ))}
      </div>

      {hasMore && (
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setShowAll(!showAll)}
          className="text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10 p-0 h-auto"
        >
          {showAll 
            ? 'Show fewer examples' 
            : `Show ${remainingCount} more example${remainingCount > 1 ? 's' : ''}`
          }
        </Button>
      )}
    </div>
  );
}