import { Terminal } from "lucide-react";

export function TLDRLogo() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-slate-800 via-blue-900 to-purple-900 border-2 border-blue-500/30 rounded-2xl h-16 px-6 shadow-2xl">
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 animate-pulse"></div>

      {/* Main content */}
      <div className="relative flex items-center gap-4 h-full">
        {/* Enhanced terminal icon */}
        <div className="relative">
          <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
            <Terminal
              className="text-white text-lg"
              strokeWidth={2.5}
            />
          </div>
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-lg opacity-30 animate-ping"></div>
        </div>

        {/* Modern typography */}
        <div className="flex items-center">
          <span className="text-2xl font-black bg-gradient-to-r from-white via-cyan-200 to-blue-200 bg-clip-text text-transparent">
            TL
          </span>
          <span className="text-cyan-400 text-xl font-light mx-1">
            ;
          </span>
          <span className="text-2xl font-black bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            DR
          </span>
        </div>
      </div>

      {/* Subtle animated border */}
      <div className="absolute inset-0 rounded-2xl border border-blue-400/20 animate-pulse"></div>
    </div>
  );
}