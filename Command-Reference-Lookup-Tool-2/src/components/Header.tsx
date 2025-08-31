import { BrandIcon } from './BrandIcon';

export function Header({ 
  title = "TL;DR Commands", 
  subtitle = "Simplified command reference for developers" 
}) {
  return (
    <header className="border-b border-slate-700 bg-slate-800/50 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex items-center justify-center space-x-3 mb-2">
          <BrandIcon size="md" />
          <h1 className="text-2xl font-semibold text-white">{title}</h1>
        </div>
        <p className="text-center text-slate-400 text-sm">
          {subtitle}
        </p>
      </div>
    </header>
  );
}