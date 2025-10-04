import { VscTerminalBash } from 'react-icons/vsc';

export function Header() {
  return (
    <header className="mb-12">
      <div className="flex items-start gap-6 justify-center">
        <VscTerminalBash className="w-24 h-24 animate-pulse" style={{
          color: '#00a82d',
          filter: 'drop-shadow(0 0 8px rgba(0, 168, 45, 0.8)) saturate(1.8)'
        }} />
        <div className="text-left">
          <h1 className="text-5xl font-bold mb-3 animate-logo-glow-matrix">
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