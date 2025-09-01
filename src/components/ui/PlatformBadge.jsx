import { Badge } from "./badge.jsx";
import { PlatformIcon } from "./PlatformIcon.jsx";

export function PlatformBadge({ platform }) {
  return (
    <Badge
      variant="secondary"
      className={`${platform.color} border-opacity-30`}
    >
      <span className="mr-1">
        <PlatformIcon platform={platform} />
      </span>
      {platform.name}
    </Badge>
  );
}
