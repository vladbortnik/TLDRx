import { Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button.jsx';

export function CommandCardSyntax({ syntax }) {
  const [copied, setCopied] = useState(false);

  if (!syntax) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(syntax);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="mb-4">
      <h4 className="text-sm font-medium text-slate-300 mb-2">Syntax</h4>
      <div className="relative bg-slate-900 rounded-lg border border-slate-600 p-3">
        <code className="text-sm text-emerald-400 font-mono break-all">
          {syntax}
        </code>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="absolute top-2 right-2 w-8 h-8 p-0 text-slate-400 hover:text-slate-300"
          aria-label="Copy syntax"
        >
          {copied ? (
            <Check className="w-4 h-4" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </Button>
      </div>
    </div>
  );
}