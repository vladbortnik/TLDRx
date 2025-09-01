import { Search } from 'lucide-react';
import { Button } from './ui/button.jsx';

export function NoResultsState({ searchQuery, onClearSearch }) {
  return (
    <div className="text-center py-12" role="status" aria-label="No search results found">
      <div className="flex justify-center mb-4">
        <div className="p-4 bg-slate-800 rounded-full border border-slate-700">
          <Search className="w-8 h-8 text-slate-400" />
        </div>
      </div>
      
      <h3 className="text-lg font-medium text-slate-300 mb-2">
        No commands found
      </h3>
      
      <p className="text-slate-400 text-sm mb-6 max-w-md mx-auto">
        No commands match your search for "{searchQuery}". Try adjusting your search query or platform filters.
      </p>

      <div className="space-y-3">
        <Button 
          type="button"
          variant="outline" 
          onClick={onClearSearch}
          className="text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/10 hover:border-emerald-500"
        >
          Clear search
        </Button>
        
        <div className="text-xs text-slate-500">
          <p>Try searching for:</p>
          <p className="mt-1 space-x-2">
            <span className="bg-slate-800 px-2 py-1 rounded">ls</span>
            <span className="bg-slate-800 px-2 py-1 rounded">git</span>
            <span className="bg-slate-800 px-2 py-1 rounded">docker</span>
          </p>
        </div>
      </div>
    </div>
  );
}