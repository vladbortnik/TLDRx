import React, { useState, useEffect } from 'react';
import { Search, Terminal, Filter, Zap, Activity, Cpu, Settings, Code, GitBranch } from 'lucide-react';

// Color themes for the app
const themes = {
    ocean: {
        name: 'Ocean Blue',
        primary: 'from-blue-950 via-blue-900 to-slate-900',
        searchBg: 'bg-blue-950/50',
        headerBg: 'bg-blue-900/30',
        border: 'border-blue-800/40',
        borderFocus: 'border-blue-400/60',
        text: 'text-blue-300/80',
        textMuted: 'text-blue-400/60',
        accent: 'text-blue-400',
        glow: 'shadow-blue-400/25',
        glowFocus: 'shadow-blue-400/40'
    },
    emerald: {
        name: 'Emerald Forest',
        primary: 'from-emerald-950 via-emerald-900 to-slate-900',
        searchBg: 'bg-emerald-950/50',
        headerBg: 'bg-emerald-900/30',
        border: 'border-emerald-800/40',
        borderFocus: 'border-emerald-400/60',
        text: 'text-emerald-300/80',
        textMuted: 'text-emerald-400/60',
        accent: 'text-emerald-400',
        glow: 'shadow-emerald-400/25',
        glowFocus: 'shadow-emerald-400/40'
    },
    purple: {
        name: 'Purple Cosmos',
        primary: 'from-purple-950 via-purple-900 to-slate-900',
        searchBg: 'bg-purple-950/50',
        headerBg: 'bg-purple-900/30',
        border: 'border-purple-800/40',
        borderFocus: 'border-purple-400/60',
        text: 'text-purple-300/80',
        textMuted: 'text-purple-400/60',
        accent: 'text-purple-400',
        glow: 'shadow-purple-400/25',
        glowFocus: 'shadow-purple-400/40'
    }
};

// Enhanced Command Terminal Interface
const EnhancedCommandTerminal = ({ searchQuery, onSearchChange, count = 523, theme }) => {
    const [cursor, setCursor] = useState(true);
    const [isFocused, setIsFocused] = useState(false);
    const [showHelpers, setShowHelpers] = useState(false);
    const [iconRotation, setIconRotation] = useState(0);

    // Cursor animation
    useEffect(() => {
        const interval = setInterval(() => setCursor(c => !c), 500);
        return () => clearInterval(interval);
    }, []);

    // Show helpers when typing
    useEffect(() => {
        if (searchQuery.length > 0) {
            setShowHelpers(true);
        } else {
            setShowHelpers(false);
        }
    }, [searchQuery]);

    // Constantly moving icon animation
    useEffect(() => {
        const interval = setInterval(() => {
            setIconRotation(prev => (prev + 1) % 360);
        }, 50);
        return () => clearInterval(interval);
    }, []);

    const currentTheme = themes[theme];

    return (
        <div className="w-full max-w-2xl">
            <div className="space-y-3">
                {/* Main search container with glow effect */}
                <div className={`relative transition-all duration-400 ${
                    isFocused ? 'transform -translate-y-1' : ''
                }`}>
                    {/* Background glow effect */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${currentTheme.primary.replace('from-', 'from-').replace('via-', 'via-').replace('to-', 'to-')} rounded-xl transition-all duration-700 ${
                        isFocused ? `opacity-100 scale-105 blur-lg ${currentTheme.glowFocus}` : `opacity-0 scale-95 ${currentTheme.glow}`
                    }`}></div>

                    <div className={`${currentTheme.searchBg} backdrop-blur-sm border ${
                        isFocused ? currentTheme.borderFocus : currentTheme.border
                    } rounded-xl overflow-hidden transition-all duration-300 ${
                        isFocused ? `shadow-2xl ${currentTheme.glowFocus}` : `shadow-xl ${currentTheme.glow}`
                    }`}>

                        {/* Header with constantly moving icon */}
                        <div className={`flex items-center justify-between px-5 py-3 ${currentTheme.headerBg} border-b ${currentTheme.border}`}>
                            <div className="flex items-center gap-3">
                                {/* Constantly moving icon */}
                                <div className="relative">
                                    <Activity
                                        className={`w-4 h-4 ${currentTheme.accent} transition-all duration-75`}
                                        style={{
                                            transform: `rotate(${iconRotation}deg) scale(${1 + Math.sin(iconRotation * 0.05) * 0.1})`,
                                            filter: `hue-rotate(${iconRotation}deg)`
                                        }}
                                    />
                                    <div className={`absolute inset-0 w-4 h-4 ${currentTheme.accent} opacity-30 animate-ping`}></div>
                                </div>
                                <span className={`${currentTheme.text} text-sm font-medium`}>TL;DRx</span>
                            </div>

                            <div className="flex items-center gap-4">
                                {/* Dynamic command count */}
                                <div className="flex items-center gap-2">
                                    <Cpu className={`w-4 h-4 ${currentTheme.textMuted}`} />
                                    <span className={`${currentTheme.textMuted} text-xs`}>
                    {count.toLocaleString()}+ commands
                  </span>
                                </div>

                                {/* Filter icon with dual functionality */}
                                <button className={`${currentTheme.textMuted} hover:${currentTheme.accent} transition-colors duration-200`}>
                                    <Filter className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Search input area */}
                        <div className="p-5">
                            <div className="flex items-center gap-3 group">
                <span className={`${currentTheme.accent} font-mono text-sm`}>
                  search
                </span>
                                <span className={`${currentTheme.textMuted} font-mono`}>→</span>
                                <div className="flex-1 flex items-center">
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => onSearchChange(e.target.value)}
                                        onFocus={() => setIsFocused(true)}
                                        onBlur={() => setIsFocused(false)}
                                        placeholder="query"
                                        className={`bg-transparent text-slate-100 font-mono outline-none flex-1 placeholder-${currentTheme.textMuted.split('-')[1]}-300/40`}
                                        autoComplete="off"
                                    />
                                    <span className={`w-2 h-5 ${currentTheme.accent.replace('text-', 'bg-')} ml-1 transition-opacity duration-100 ${
                                        cursor ? 'opacity-100' : 'opacity-0'
                                    }`}></span>
                                </div>
                            </div>

                            {/* Status indicator under search */}
                            {searchQuery && (
                                <div className={`mt-3 flex items-center gap-2 ${currentTheme.textMuted} text-sm animate-in slide-in-from-left duration-300`}>
                                    <Terminal className="w-4 h-4" />
                                    <span>Parsing command database...</span>
                                    <div className="flex gap-1">
                                        <div className={`w-1 h-1 ${currentTheme.accent.replace('text-', 'bg-')} rounded-full animate-bounce`}></div>
                                        <div className={`w-1 h-1 ${currentTheme.accent.replace('text-', 'bg-')} rounded-full animate-bounce`} style={{ animationDelay: '0.1s' }}></div>
                                        <div className={`w-1 h-1 ${currentTheme.accent.replace('text-', 'bg-')} rounded-full animate-bounce`} style={{ animationDelay: '0.2s' }}></div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Helper suggestions from #2 - Progressive Disclosure */}
                <div className={`transition-all duration-300 overflow-hidden ${
                    showHelpers ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                    <div className={`flex items-center gap-2 px-5 py-3 ${currentTheme.headerBg} rounded-lg border ${currentTheme.border}`}>
                        <Code className={`w-4 h-4 ${currentTheme.textMuted}`} />
                        <span className={`${currentTheme.textMuted} text-sm`}>
              Try searching: "file", "git", "network", "system", "docker"
            </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Theme selector component
const ThemeSelector = ({ currentTheme, onThemeChange }) => {
    return (
        <div className="flex items-center gap-3 mb-8">
            <span className="text-slate-300 text-sm font-medium">Theme:</span>
            <div className="flex gap-2">
                {Object.entries(themes).map(([key, theme]) => (
                    <button
                        key={key}
                        onClick={() => onThemeChange(key)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                            currentTheme === key
                                ? 'bg-white/20 text-white border border-white/30'
                                : 'bg-white/5 text-white/70 border border-white/10 hover:bg-white/10'
                        }`}
                    >
                        {theme.name}
                    </button>
                ))}
            </div>
        </div>
    );
};

// Main component
export default function FinalSearchInterface() {
    const [searchQuery, setSearchQuery] = useState("");
    const [currentTheme, setCurrentTheme] = useState('ocean');
    const [commandCount, setCommandCount] = useState(523);

    // Simulate dynamic command count
    useEffect(() => {
        const interval = setInterval(() => {
            setCommandCount(prev => {
                const variation = Math.floor(Math.random() * 10) - 5;
                return Math.max(500, Math.min(600, prev + variation));
            });
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const currentThemeConfig = themes[currentTheme];

    return (
        <div className={`min-h-screen bg-gradient-to-br ${currentThemeConfig.primary} p-8 transition-all duration-500`}>
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-slate-200 to-white bg-clip-text text-transparent mb-4">
                        Enhanced TL;DRx Search Interface
                    </h1>
                    <p className="text-slate-300/70 text-lg mb-8">
                        Command Terminal with Progressive Disclosure & Morphing Effects
                    </p>

                    <ThemeSelector currentTheme={currentTheme} onThemeChange={setCurrentTheme} />
                </div>

                <div className="flex justify-center mb-12">
                    <EnhancedCommandTerminal
                        searchQuery={searchQuery}
                        onSearchChange={setSearchQuery}
                        count={commandCount}
                        theme={currentTheme}
                    />
                </div>

                <div className="text-center">
                    <div className={`${currentThemeConfig.searchBg} border ${currentThemeConfig.border} rounded-xl p-8 backdrop-blur-sm`}>
                        <h4 className="text-xl font-medium text-slate-200 mb-4">Live Search & Theme Demo</h4>
                        <div className="space-y-3">
                            <div className={`${currentThemeConfig.headerBg} rounded-lg p-4 border ${currentThemeConfig.border}`}>
                                <div className="text-sm text-slate-400 mb-1">Current Search:</div>
                                <code className={`${currentThemeConfig.accent} font-mono text-lg`}>
                                    "{searchQuery || 'Type to see animations...'}"
                                </code>
                            </div>
                            <div className={`${currentThemeConfig.headerBg} rounded-lg p-4 border ${currentThemeConfig.border}`}>
                                <div className="text-sm text-slate-400 mb-1">Active Theme:</div>
                                <span className={`${currentThemeConfig.accent} font-medium`}>
                  {currentThemeConfig.name}
                </span>
                            </div>
                            <div className={`${currentThemeConfig.headerBg} rounded-lg p-4 border ${currentThemeConfig.border}`}>
                                <div className="text-sm text-slate-400 mb-1">Command Count:</div>
                                <span className={`${currentThemeConfig.accent} font-mono`}>
                  {commandCount.toLocaleString()}+ commands
                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// export default FinalSearchInterface;