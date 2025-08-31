import { Package, Info, AlertCircle } from 'lucide-react';

export function CommandCardInfo({ prerequisites = [], notes = [], warnings = [] }) {
  if (!prerequisites.length && !notes.length && !warnings.length) return null;

  return (
    <div className="mb-4 space-y-3">
      {/* Prerequisites */}
      {prerequisites.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-slate-300 flex items-center gap-2 mb-2">
            <Package className="w-4 h-4" />
            Prerequisites
          </h4>
          <div className="bg-slate-900 rounded-md border border-slate-600 p-3">
            <ul className="space-y-1">
              {prerequisites.map((prereq, index) => (
                <li key={index} className="text-sm text-slate-400 flex items-start gap-2">
                  <span className="text-emerald-400 mt-1">•</span>
                  <span>{prereq}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Notes */}
      {notes.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-slate-300 flex items-center gap-2 mb-2">
            <Info className="w-4 h-4" />
            Notes
          </h4>
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
        </div>
      )}

      {/* Warnings */}
      {warnings.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-slate-300 flex items-center gap-2 mb-2">
            <AlertCircle className="w-4 h-4" />
            Warnings
          </h4>
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
        </div>
      )}
    </div>
  );
}