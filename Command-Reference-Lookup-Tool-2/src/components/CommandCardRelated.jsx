import { FiArrowRight, FiLink } from 'react-icons/fi';
import { Button } from './ui/button.jsx';

export function CommandCardRelated({ relatedCommands = [] }) {
  if (!relatedCommands || relatedCommands.length === 0) return null;

  return (
    <div className="mb-4">
      <h4 className="text-sm font-medium text-slate-300 flex items-center gap-2 mb-3">
        <FiLink className="w-4 h-4" />
        Related Commands
      </h4>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {relatedCommands.map((command, index) => (
          <Button
            key={index}
            variant="ghost"
            size="sm"
            className="justify-start h-auto p-3 text-left bg-slate-900 border border-slate-600 hover:bg-slate-800 hover:border-slate-500 transition-colors"
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex-1 min-w-0">
                <div className="font-mono text-emerald-400 text-sm font-medium">
                  {command.name}
                </div>
                <div className="text-slate-400 text-xs mt-1 truncate">
                  {command.description}
                </div>
              </div>
              <FiArrowRight className="w-3 h-3 text-slate-500 ml-2 flex-shrink-0" />
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
}