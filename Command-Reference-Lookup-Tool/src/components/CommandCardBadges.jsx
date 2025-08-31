import { PlatformBadge } from './PlatformBadge';

export function CommandCardBadges({ platforms, categories = [] }) {
  return (
    <div className="mb-4">
      <div className="flex flex-wrap gap-2">
        {/* Platform Badges */}
        {platforms.map((platform) => (
          <PlatformBadge key={platform.id} platform={platform} />
        ))}
        
        {/* Category Badges */}
        {categories.map((category, index) => (
          <div
            key={index}
            className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-slate-700/50 text-slate-300 border border-slate-600"
          >
            {category.icon && <span className="mr-1">{category.icon}</span>}
            {category.name}
          </div>
        ))}
      </div>
    </div>
  );
}