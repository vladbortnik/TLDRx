import { PlatformBadge } from './PlatformBadge';
import { CommandExamples } from './CommandExamples';
import { ManPageLink } from './ManPageLink';

export function CommandCard({ 
  name, 
  subtitle, 
  description, 
  platforms, 
  examples, 
  manPageUrl,
  maxVisibleExamples = 2 
}) {
  return (
    <div className="bg-slate-800 rounded-lg border border-slate-700 p-6 hover:border-slate-600 transition-colors">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-medium text-emerald-400 mb-1">{name}</h3>
          <p className="text-slate-300 text-sm">{subtitle}</p>
          <p className="text-slate-400 text-sm mt-1">{description}</p>
        </div>
        
        {/* Platform Badges */}
        <div className="flex gap-2 flex-wrap">
          {platforms.map((platform) => (
            <PlatformBadge key={platform.id} platform={platform} />
          ))}
        </div>
      </div>

      {/* Examples Section */}
      <CommandExamples 
        examples={examples} 
        maxVisible={maxVisibleExamples} 
      />

      {/* Man Page Link */}
      <ManPageLink url={manPageUrl} commandName={name} />
    </div>
  );
}