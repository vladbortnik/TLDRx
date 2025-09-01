import { useState } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';

export function CommandCardInfo({ notes = [], warnings = [] }) {
  const [isNotesExpanded, setIsNotesExpanded] = useState(false);
  const [isWarningsExpanded, setIsWarningsExpanded] = useState(false);
  
  if (!notes.length && !warnings.length) return null;

  return (
    <div className="mb-4 space-y-3">

      {/* Notes */}
      {notes.length > 0 && (
        <div>
          <button
            onClick={() => setIsNotesExpanded(!isNotesExpanded)}
            className="w-full text-left flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-slate-200 transition-colors duration-200 mb-2"
          >
            {isNotesExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            Notes ({notes.length})
          </button>
          {isNotesExpanded && (
            <div className="bg-blue-500/10 rounded-md border border-blue-500/30 p-3">
              <ul className="space-y-1">
                {notes.map((note, index) => (
                  <li key={index} className="text-sm text-blue-300 flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Warnings */}
      {warnings.length > 0 && (
        <div>
          <button
            onClick={() => setIsWarningsExpanded(!isWarningsExpanded)}
            className="w-full text-left flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-slate-200 transition-colors duration-200 mb-2"
          >
            {isWarningsExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            Warnings ({warnings.length})
          </button>
          {isWarningsExpanded && (
            <div className="bg-yellow-500/10 rounded-md border border-yellow-500/30 p-3">
              <ul className="space-y-1">
                {warnings.map((warning, index) => (
                  <li key={index} className="text-sm text-yellow-300 flex items-start gap-2">
                    <span className="text-yellow-400 mt-1">⚠</span>
                    <span>{warning}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}