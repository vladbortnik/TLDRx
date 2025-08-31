import { PlatformBadge } from './PlatformBadge.jsx';

export function CommandCardBadges({ platform, categories = [] }) {
  return (
    <div className="mb-4">
      <div className="flex flex-wrap gap-2">
        {/* Platform Badges */}
        {platform && platform.map((platformItem) => (
          <PlatformBadge key={platformItem.id} platform={platformItem} />
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