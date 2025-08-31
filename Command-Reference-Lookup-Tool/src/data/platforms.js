// Platform icon components
const MacOSIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
  </svg>
);

const WindowsIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 12V6.75l6-1.32v6.48L3 12zm17-9v8.75l-10 .15V5.21L20 3zM3 13l6-.09v6.44l-6-1.35V13zm17 .25V22l-10-1.91V13.1l10 .15z"/>
  </svg>
);

// Platform definitions
export const PLATFORMS = [
  { 
    id: 'linux', 
    name: 'Linux', 
    icon: '🐧',
    category: 'os'
  },
  { 
    id: 'macos', 
    name: 'macOS', 
    icon: <MacOSIcon />,
    category: 'os'
  },
  { 
    id: 'windows', 
    name: 'Windows', 
    icon: <WindowsIcon />,
    category: 'os'
  },
  { 
    id: 'bsd', 
    name: 'BSD', 
    icon: '👹',
    category: 'os'
  },
  {
    id: 'shell',
    name: 'Shell',
    icon: '🔥',
    category: 'environment'
  },
  {
    id: 'automation',
    name: 'Automation',
    icon: '⚙️',
    category: 'tool'
  }
];

// Platform styles for badges
export const PLATFORM_STYLES = {
  linux: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  macos: 'bg-slate-500/20 text-slate-300 border-slate-500/30',
  windows: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  bsd: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  shell: 'bg-green-500/20 text-green-400 border-green-500/30',
  automation: 'bg-purple-500/20 text-purple-400 border-purple-500/30'
};