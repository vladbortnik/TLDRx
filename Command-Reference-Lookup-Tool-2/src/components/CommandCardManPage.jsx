import { FiExternalLink, FiBook } from 'react-icons/fi';
import { Button } from './ui/button.jsx';

export function CommandCardManPage({ url, commandName }) {
  if (!url) return null;

  return (
    <div className="mb-4">
      <h4 className="text-sm font-medium text-slate-300 flex items-center gap-2 mb-2">
        <FiBook className="w-4 h-4" />
        Documentation
      </h4>
      <Button
        variant="outline"
        size="sm"
        asChild
        className="text-slate-300 border-slate-600 hover:bg-slate-700 hover:border-slate-500"
      >
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2"
        >
          <FiExternalLink className="w-4 h-4" />
          View {commandName} manual page
        </a>
      </Button>
    </div>
  );
}