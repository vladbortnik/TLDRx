export function Header() {
  return (
    <header className="mb-12">
      <div className="flex items-start gap-6 justify-center">
        <div className="relative w-20 h-20 bg-gradient-to-br from-green-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-2xl">
          <span className="text-4xl text-white font-bold animate-bounce">
            $
          </span>
          <div className="absolute inset-0 rounded-2xl animate-pulse bg-green-400 opacity-30"></div>
        </div>
        <div className="text-left">
          <h1 className="text-5xl font-bold text-white mb-3 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            TL;DRx
          </h1>
          <p className="text-xl text-slate-400">
            Commands Made Simple
          </p>
        </div>
      </div>
    </header>
  );
}