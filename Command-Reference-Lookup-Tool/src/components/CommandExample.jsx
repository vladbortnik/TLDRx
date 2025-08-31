import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { Button } from './ui/button.jsx';

export function CommandExample({ code, description, output, example }) {
  const [copied, setCopied] = useState(false);

  // Support both new props and legacy example object
  const commandCode = code || example?.code;
  const commandDescription = description || example?.description;
  const commandOutput = output || example?.output;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(commandCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
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
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity w-8 h-8 p-0 text-slate-400 hover:text-slate-300"
            aria-label="Copy command"
          >
            {copied ? (
              <Check className="w-4 h-4" />
            ) : (
              <Copy className="w-4 h-4" />
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