import { FiSearch } from 'react-icons/fi';

export function LoadingState() {
  return (
    <div className="text-center py-12" role="status" aria-label="Loading search results">
      <div className="flex justify-center items-center space-x-2 mb-4">
        <FiSearch className="w-6 h-6 text-emerald-400 animate-pulse" />
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce [animation-delay:0ms]"></div>
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce [animation-delay:150ms]"></div>
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce [animation-delay:300ms]"></div>
        </div>
      </div>
      <p className="text-slate-400">Searching commands...</p>
    </div>
  );
}