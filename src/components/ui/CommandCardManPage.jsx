import { FileText } from "lucide-react";

export function CommandCardManPage({ url, commandName }) {
  if (!url) return null;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center w-8 h-8 rounded-md bg-slate-800/40 border border-slate-700/50 hover:border-slate-600/60 text-slate-500 hover:text-slate-400 transition-colors duration-200"
      title={`View ${commandName} manual page`}
    >
      <FileText className="w-4 h-4" />
    </a>
  );
}