import { useState } from 'react';
import { ChevronDown, ChevronRight, Flag } from 'lucide-react';
import { Button } from './ui/button.jsx';

export function CommandCardFlags({ flags = [] }) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!flags || flags.length === 0) return null;

  const visibleFlags = isExpanded ? flags : flags.slice(0, 3);
  const hasMoreFlags = flags.length > 3;

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-sm font-medium text-slate-300 flex items-center gap-2">
          <Flag className="w-4 h-4" />
          Common Flags
        </h4>
        {hasMoreFlags && (
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
                Show All ({flags.length})
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