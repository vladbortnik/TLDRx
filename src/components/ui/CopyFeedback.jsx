import { useState, useEffect } from "react";
import { Check, X, Info } from "lucide-react";

export function CopyFeedback({ isVisible, isSuccess, onClose, message }) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 right-4 z-50 max-w-sm">
      <div className={`
        flex items-center gap-3 px-4 py-3 rounded-lg border shadow-lg
        ${isSuccess 
          ? 'bg-emerald-900/90 border-emerald-600 text-emerald-200' 
          : 'bg-yellow-900/90 border-yellow-600 text-yellow-200'
        }
        backdrop-blur-sm animate-in slide-in-from-right duration-300
      `}>
        {isSuccess ? (
          <Check className="w-5 h-5 flex-shrink-0" />
        ) : (
          <Info className="w-5 h-5 flex-shrink-0" />
        )}
        <p className="text-sm flex-1">
          {message || (isSuccess ? 'Copied to clipboard!' : 'Copy functionality not available in this environment')}
        </p>
        <button
          type="button"
          onClick={onClose}
          className="text-current hover:opacity-70 transition-opacity"
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}