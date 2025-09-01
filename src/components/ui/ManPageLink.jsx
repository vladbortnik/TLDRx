import { Button } from "./button.jsx";

export function ManPageLink({ url, commandName }) {
  if (!url) return null;

  const handleClick = () => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="mt-4 pt-4 border-t border-slate-700">
      <Button 
        variant="ghost" 
        size="sm" 
        className="text-slate-400 hover:text-slate-300 hover:bg-slate-700 p-0 h-auto"
        onClick={handleClick}
      >
        📄 View man page for {commandName}
      </Button>
    </div>
  );
}