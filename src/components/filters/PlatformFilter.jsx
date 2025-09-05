const PLATFORMS = [
  {
    key: "linux",
    label: "Linux",
    icon: (
      <svg
        className="w-5 h-5"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12.504 0C5.395 0 .456 5.125.456 12.253c0 4.584 2.415 8.611 6.015 10.86.451-.255.451-.679.451-1.02v-4.21c-3.15.686-3.796-1.336-3.796-1.336-.407-.966-.994-1.224-.994-1.224-.815-.555.061-.544.061-.544.9.064 1.375.926 1.375.926.8 1.383 2.103.984 2.616.752.082-.585.314-.984.571-1.211-1.993-.227-4.083-1.002-4.083-4.458 0-.985.35-1.789.925-2.419-.093-.227-.401-1.141.087-2.378 0 0 .754-.243 2.47.924.717-.2 1.485-.3 2.248-.303.762.003 1.532.103 2.25.303 1.715-1.167 2.468-.924 2.468-.924.489 1.237.181 2.151.089 2.378.576.63.924 1.434.924 2.419 0 3.464-2.094 4.227-4.093 4.451.321.278.607.825.607 1.662v2.465c0 .344 0 .771.454 1.021C19.143 20.858 21.544 16.835 21.544 12.253 21.544 5.125 16.608 0 12.504 0z" />
      </svg>
    ),
  },
  {
    key: "macos",
    label: "macOS",
    icon: (
      <svg
        className="w-5 h-5"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
      </svg>
    ),
  },
  {
    key: "windows",
    label: "Windows",
    icon: (
      <svg
        className="w-5 h-5"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M3 12V6.75l6-1.32v6.48L3 12zm17-9v8.75l-10 .15V5.21L20 3zM3 13l6-.09v6.44l-6-1.35V13zm17 .25V22l-10-1.91V13.1l10 .15z" />
      </svg>
    ),
  },
];

export function PlatformFilter({ selectedPlatform, onPlatformChange }) {
  return (
    <div className="mt-4 flex items-center justify-start gap-4">
      <span className="text-sm text-slate-400">Platform:</span>
      {PLATFORMS.map(({ key, label, icon }) => (
        <button
          key={key}
          onClick={() => onPlatformChange(selectedPlatform === key ? "all" : key)}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            selectedPlatform === key
              ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25"
              : "bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white"
          }`}
        >
          {icon}
          {label}
        </button>
      ))}
    </div>
  );
}