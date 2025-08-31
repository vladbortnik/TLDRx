import { Button } from './ui/button.jsx';
import { PlatformIcon } from './PlatformIcon';

export function PlatformFilter({ 
  platform, 
  isSelected, 
  onToggle 
}) {
  const handleClick = () => {
    onToggle(platform.id);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <Button
      variant={isSelected ? "default" : "outline"}
      size="sm"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={`
        ${isSelected 
          ? 'bg-emerald-600 text-white border-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-500/25' 
          : 'bg-transparent text-slate-300 border-slate-600 hover:bg-slate-700 hover:border-slate-500'
        }
        transition-all duration-200 relative
      `}
      aria-pressed={isSelected}
      aria-label={`Filter by ${platform.name}${isSelected ? ' (currently selected)' : ''}`}
    >
      <span className="mr-2">
        <PlatformIcon platform={platform} />
      </span>
      {platform.name}
      
      {/* Visual indicator for selected state */}
      {isSelected && (
        <span className="ml-2 w-2 h-2 bg-emerald-200 rounded-full animate-pulse" aria-hidden="true" />
      )}
    </Button>
  );
}