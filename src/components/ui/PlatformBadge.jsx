import { Badge } from "./badge.jsx";
import { PlatformIcon } from "./PlatformIcon.jsx";

export function PlatformBadge({ platform }) {
  // Handle both string and object platform formats
  const platformData = typeof platform === 'string' ? {
    id: platform,
    name: platform === 'mac' ? 'macOS' : platform.charAt(0).toUpperCase() + platform.slice(1),
    color: platform === 'linux' ? 'text-green-400 bg-green-500/20 border-green-500/50' : 
           platform === 'mac' ? 'text-blue-400 bg-blue-500/20 border-blue-500/50' : 
           'text-slate-400 bg-slate-500/20 border-slate-500/50'
  } : platform;

  return (
    <Badge
      variant="secondary"
      className={`${platformData.color} border-opacity-30`}
    >
      <span className="mr-1">
        <PlatformIcon platform={platformData} />
      </span>
      {platformData.name}
    </Badge>
  );
}
