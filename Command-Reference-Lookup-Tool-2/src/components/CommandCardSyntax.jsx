import { FiCopy, FiCheck } from 'react-icons/fi';
import { useState } from 'react';
import { Button } from './ui/button.jsx';
import { copyToClipboard } from '../utils/copyToClipboard.js';

export function CommandCardSyntax({ syntaxPattern }) {
  const [copied, setCopied] = useState(false);

  if (!syntaxPattern) return null;

  const handleCopy = async () => {
    const success = await copyToClipboard(syntaxPattern);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } else {
      console.error('Failed to copy syntax to clipboard');
      // Still show feedback to indicate the action was attempted
      setCopied(true);
      setTimeout(() => setCopied(false), 1000);
    }
  };

  return (
    <div className="mb-4">
      <h4 className="text-sm font-medium text-slate-300 mb-2">Syntax</h4>
      <div className="relative bg-slate-900 rounded-lg border border-slate-600 p-3">
        <code className="text-sm text-emerald-400 font-mono break-all">
          {syntaxPattern}
        </code>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="absolute top-2 right-2 w-8 h-8 p-0 text-slate-400 hover:text-slate-300"
          aria-label="Copy syntax"
          title="Copy syntax to clipboard"
        >
          {copied ? (
            <FiCheck className="w-4 h-4" />
          ) : (
            <FiCopy className="w-4 h-4" />
          )}
        </Button>
      </div>
    </div>
  );
}