const CATEGORIES = [
  "file-operations",
  "text-processing", 
  "system",
  "networking",
  "shell",
  "development",
  "package-management",
  "security",
  "containers",
  "automation",
  "data-processing"
];

export function CategoryFilter({ selectedCategory, onCategoryChange }) {
  return (
    <div className="mt-4 flex flex-wrap items-center justify-start gap-2">
      <span className="text-sm text-slate-400 mr-2">Category:</span>
      {CATEGORIES.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(selectedCategory === category ? "all" : category)}
          className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
            selectedCategory === category
              ? "bg-purple-600 text-white shadow-lg shadow-purple-500/25"
              : "bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white"
          }`}
        >
          {category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
        </button>
      ))}
    </div>
  );
}