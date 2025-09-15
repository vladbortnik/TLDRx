export function ResultsCounter({ count, selectedPlatforms = [], selectedCategories = [] }) {
  const formatDisplayName = (str) => {
    return str.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const formatPlatformName = (platform) => {
    return platform === "macos" ? "macOS" : platform.charAt(0).toUpperCase() + platform.slice(1);
  };

  return (
    <div className="mb-6">
      <p className="text-sm text-slate-400">
        {count} command{count !== 1 ? "s" : ""} found
        {selectedPlatforms.length > 0 && (
          <span className="ml-2 text-slate-500">
            • Platform{selectedPlatforms.length > 1 ? 's' : ''}: {selectedPlatforms.map(formatPlatformName).join(', ')}
          </span>
        )}
        {selectedCategories.length > 0 && (
          <span className="ml-2 text-slate-500">
            • Categor{selectedCategories.length > 1 ? 'ies' : 'y'}: {selectedCategories.map(formatDisplayName).join(', ')}
          </span>
        )}
      </p>
    </div>
  );
}