export function ResultsCounter({ count, selectedPlatforms = [], selectedCategories = [] }) {
  return (
    <div className="mb-4 mt-2">
      <p className="text-sm text-slate-400 font-medium pl-3">
        {count} command{count !== 1 ? "s" : ""} found
      </p>
    </div>
  );
}