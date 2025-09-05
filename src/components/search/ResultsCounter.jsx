export function ResultsCounter({ count, selectedPlatform, selectedCategory }) {
  return (
    <div className="mb-6">
      <p className="text-sm text-slate-400">
        {count} command{count !== 1 ? "s" : ""} found
        {selectedPlatform !== "all" && (
          <span className="ml-2 text-slate-500">
            • Filtered by {selectedPlatform === "mac" ? "macOS" : selectedPlatform}
          </span>
        )}
        {selectedCategory !== "all" && (
          <span className="ml-2 text-slate-500">
            • Category: {selectedCategory.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
          </span>
        )}
      </p>
    </div>
  );
}