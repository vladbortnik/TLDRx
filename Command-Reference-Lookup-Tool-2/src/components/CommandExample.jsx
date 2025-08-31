import { FiCopy, FiCheck } from 'react-icons/fi';
import { Button } from './ui/button.jsx';

export function CommandExample({
  code,
  description,
  output,
  example,
  onCopy, // External copy handler
  isCopied = false, // External copy state
  exampleId, // Unique identifier
}) {

  // Support both new props and legacy example object
  const commandCode = code || example?.code;
  const commandDescription = description || example?.description;
  const commandOutput = output || example?.output;

  const handleCopy = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onCopy && commandCode) {
      onCopy(commandCode, exampleId);
    }
  };

  return (
    <div className="space-y-2">
      {/* Command */}
      <div className="bg-slate-800 rounded-md border border-slate-600 p-3 group">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <code className="text-emerald-400 text-sm font-mono block break-all">
              {commandCode}
            </code>
          </div>
          
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity w-8 h-8 p-0 text-slate-400 hover:text-slate-300"
            aria-label="Copy command"
            title="Copy to clipboard"
          >
            {isCopied ? (
              <FiCheck className="w-4 h-4" />
            ) : (
              <FiCopy className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Description */}
      {commandDescription && (
        <p className="text-slate-400 text-sm">{commandDescription}</p>
      )}

      {/* Output */}
      {commandOutput && (
        <div className="bg-slate-950 rounded-md border border-slate-700 p-3">
          <div className="text-xs text-slate-500 mb-1">Output:</div>
          <pre className="text-slate-300 text-sm font-mono whitespace-pre-wrap">
            {commandOutput}
          </pre>
        </div>
      )}
    </div>
  );
}