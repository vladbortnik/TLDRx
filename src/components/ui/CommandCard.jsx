import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronDown, 
  ChevronUp, 
  ExternalLink,
  Terminal,
  AlertTriangle,
  Shield,
  Zap,
  Copy,
  Play,
  FileText,
  Settings,
  Globe,
  Database,
  Package,
  Code,
  Bot,
  Container,
  Wrench
} from 'lucide-react';
import { FaApple, FaWindows, FaLinux } from 'react-icons/fa6';

// Platform and Category Icon Mappings
const PLATFORM_ICONS = {
  linux: FaLinux,
  macos: FaApple,
  windows: FaWindows
};

const CATEGORY_ICONS = {
  'file-operations': FileText,
  'text-processing': Wrench,
  'system': Settings,
  'networking': Globe,
  'shell': Terminal,
  'development': Code,
  'package-management': Package,
  'security': Shield,
  'containers': Container,
  'automation': Bot,
  'data-processing': Database
};

const SAFETY_COLORS = {
  safe: {
    bg: 'from-emerald-400/20 to-green-500/20',
    border: 'border-emerald-400/40',
    text: 'text-emerald-300',
    glow: '0 0 20px rgba(16, 185, 129, 0.3)'
  },
  caution: {
    bg: 'from-yellow-400/20 to-orange-500/20',
    border: 'border-yellow-400/40',
    text: 'text-yellow-300',
    glow: '0 0 20px rgba(245, 158, 11, 0.3)'
  },
  dangerous: {
    bg: 'from-red-400/20 to-pink-500/20',
    border: 'border-red-400/40',
    text: 'text-red-300',
    glow: '0 0 20px rgba(239, 68, 68, 0.3)'
  }
};

const RELATIONSHIP_COLORS = {
  similar: 'from-blue-400/20 to-cyan-500/20 border-blue-400/40 text-blue-300',
  alternative: 'from-purple-400/20 to-indigo-500/20 border-purple-400/40 text-purple-300',
  complement: 'from-green-400/20 to-emerald-500/20 border-green-400/40 text-green-300'
};

export function CommandCard({ command, wavePhase: externalWavePhase }) {
  // Defensive programming - ensure command exists
  if (!command) {
    return <div className="text-red-400">Error: No command data provided</div>;
  }

  // 🔧 FIX: Use shared wave phase for synchronization
  const wavePhase = externalWavePhase || 0;
  const [expandedSections, setExpandedSections] = useState({
    combinations: false,
    warnings: false
  });
  const [hoveredRelated, setHoveredRelated] = useState(null);
  const [copiedExample, setCopiedExample] = useState(null);
  const cardRef = useRef(null);

  // 🔧 FIX: Wave animation now managed by parent component

  // Terminal-style wave effect for command cards
  const getCardWave = () => {
    const r1 = Math.floor(10 + Math.sin(wavePhase * 0.02) * 10);
    const g1 = Math.floor(20 + Math.cos(wavePhase * 0.025) * 15);
    const b1 = Math.floor(40 + Math.sin(wavePhase * 0.03) * 20);
    
    const r2 = Math.floor(25 + Math.cos(wavePhase * 0.015) * 15);
    const g2 = Math.floor(35 + Math.sin(wavePhase * 0.035) * 10);
    const b2 = Math.floor(75 + Math.cos(wavePhase * 0.02) * 25);

    return {
      background: `linear-gradient(135deg, 
        rgba(${r1},${g1},${b1},0.7), 
        rgba(${r2},${g2},${b2},0.5), 
        rgba(${r1+5},${g1+5},${b1+10},0.7))`,
      transition: 'background 0.3s ease'
    };
  };

  // 3D icon animation
  const get3DIconStyle = (baseRotation = 0) => ({
    transform: `
      perspective(100px) 
      rotateX(${wavePhase * 0.2 + baseRotation}deg) 
      rotateY(${wavePhase * 0.3}deg) 
      rotateZ(${wavePhase * 0.1}deg)
    `,
    filter: `drop-shadow(0 0 8px rgba(59, 130, 246, 0.3))`,
    transition: 'all 0.1s ease',
    transformStyle: 'preserve-3d'
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const copyExample = async (example, index) => {
    try {
      await navigator.clipboard.writeText(example.split(' #')[0].trim());
      setCopiedExample(index);
      setTimeout(() => setCopiedExample(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const formatDisplayName = (str) => {
    return str.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const parseExample = (example) => {
    if (!example || typeof example !== 'string') {
      return { command: '', comment: '' };
    }
    const parts = example.split(' #');
    return {
      command: parts[0]?.trim() || '',
      comment: parts[1]?.trim() || ''
    };
  };

  const parseKeyFeature = (feature) => {
    if (!feature || typeof feature !== 'string') {
      return { title: '', description: '' };
    }
    const colonIndex = feature.indexOf(':');
    if (colonIndex === -1) {
      return { title: feature.trim(), description: '' };
    }
    return {
      title: feature.substring(0, colonIndex).trim(),
      description: feature.substring(colonIndex + 1).trim()
    };
  };

  const safetyConfig = SAFETY_COLORS[command?.safety] || SAFETY_COLORS.safe;
  const CategoryIcon = CATEGORY_ICONS[command?.category] || Terminal;

  // Safe platform rendering function - handles both string and object formats
  const renderPlatformIcon = (platform) => {
    // Normalize platform data
    const platformId = typeof platform === 'string' 
      ? platform 
      : platform?.id || platform?.name || 'unknown';
    
    const platformName = typeof platform === 'string'
      ? platform
      : platform?.name || platform?.id || 'unknown';
    
    const PlatformIcon = PLATFORM_ICONS[platformId];
    
    // Return icon or fallback text
    if (!PlatformIcon) {
      return <span className="text-xs text-white/70">{platformName}</span>;
    }
    
    // Apply unique rotation for each platform icon for visual variety
    const rotationMap = {
      'macos': 45,
      'windows': 90,
      'linux': 0
    };
    
    return (
      <PlatformIcon 
        className="w-4 h-4 text-white/90"
        style={get3DIconStyle(rotationMap[platformId] || 0)}
      />
    );
  };

  return (
    <div 
      ref={cardRef}
      className="relative group"
      style={{
        animation: 'slideInUp 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)'
      }}
    >
      {/* Main Card Container */}
      <div 
        className="relative backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 hover:shadow-[0_0_40px_rgba(59,130,246,0.2)] hover:-translate-y-1"
        style={getCardWave()}
      >
        
        {/* Top Section: Command Name + Safety Badge */}
        <div className="relative p-4 sm:p-6 border-b border-white/10">
          {/* Safety Badge - Top Right Corner */}
          <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
            <div 
              className={`
                px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide
                bg-gradient-to-r ${safetyConfig.bg} ${safetyConfig.border} border
                ${safetyConfig.text} backdrop-blur-sm
              `}
              style={{ boxShadow: safetyConfig.glow }}
            >
              {command?.safety || 'safe'}
            </div>
          </div>

          {/* Command Name + Stands For */}
          <div className="mr-16 sm:mr-20"> {/* Leave space for safety badge */}
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 mb-2 sm:mb-3">
              <h1 className="text-xl sm:text-2xl font-bold font-mono text-white bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
                {command?.name || 'Unknown Command'}
              </h1>
              <span className="text-sm sm:text-lg text-white/70 font-medium">
                {command?.standsFor || ''}
              </span>
            </div>

            {/* Description */}
            <p className="text-white/80 text-sm sm:text-base leading-relaxed">
              {command?.description || 'No description available'}
            </p>
          </div>
        </div>

        {/* Badges Section: Platform + Category */}
        <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-white/10 bg-gradient-to-r from-white/5 to-white/10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            {/* Platform Badges */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-white/60 uppercase tracking-wide font-medium mr-2">
                Platforms:
              </span>
              {(command?.platform || []).map((platform, index) => {
                const platformName = typeof platform === 'string' 
                  ? platform 
                  : platform?.name || platform?.id || 'unknown';
                
                return (
                  <div
                    key={`platform-${platformName}-${index}`}
                    className="relative p-2 rounded-lg bg-gradient-to-br from-white/10 to-white/5 border border-white/20 hover:border-white/30 transition-colors"
                    title={platformName.charAt(0).toUpperCase() + platformName.slice(1)}
                  >
                    {renderPlatformIcon(platform)}
                  </div>
                );
              })}
            </div>

            {/* Category Badge */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-cyan-400/20 to-blue-500/20 border border-cyan-400/30">
              <CategoryIcon 
                className="w-4 h-4 text-cyan-300"
                style={get3DIconStyle(180)}
              />
              <span className="text-xs font-medium text-cyan-300 uppercase tracking-wide">
                {formatDisplayName(command?.category || 'general')}
              </span>
            </div>
          </div>
        </div>

        {/* Key Features Section - Conditional */}
        {command?.keyFeatures && command.keyFeatures.length > 0 && (
          <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-white/10">
            <h3 className="flex items-center gap-2 text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">
              <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" style={get3DIconStyle()} />
              Key Features
            </h3>
            
            {/* Full Description */}
            <p className="text-white/80 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4 italic">
              {command.keyFeatures[0]}
            </p>

            {/* Feature List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3">
              {command.keyFeatures.slice(1).map((feature, index) => {
                const parsed = parseKeyFeature(feature);
                return (
                  <div 
                    key={index}
                    className="p-3 rounded-lg bg-gradient-to-br from-white/5 to-white/10 border border-white/10 hover:border-white/20 transition-all duration-300"
                  >
                    <h4 className="text-cyan-300 font-medium text-sm mb-1">
                      {parsed.title}
                    </h4>
                    <p className="text-white/70 text-xs leading-relaxed">
                      {parsed.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Examples Section - Always Expanded */}
        <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-white/10">
          <h3 className="flex items-center gap-2 text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">
            <Terminal className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" style={get3DIconStyle()} />
            Examples
          </h3>
          <div className="space-y-2 sm:space-y-3">
            {(command?.examples || []).map((example, index) => {
              const parsed = parseExample(example);
              return (
                <div 
                  key={index}
                  className="group/example relative p-3 sm:p-4 rounded-xl bg-gradient-to-r from-slate-900/80 to-slate-800/80 border border-white/10 hover:border-green-400/30 transition-all duration-300"
                >
                  {/* Terminal Prompt */}
                  <div className="flex items-start gap-3">
                    <span className="text-green-400 font-mono text-sm flex-shrink-0 mt-0.5">$</span>
                    <div className="flex-1 min-w-0">
                      <code className="text-white font-mono text-xs sm:text-sm break-all">
                        {parsed.command}
                      </code>
                      {parsed.comment && (
                        <p className="text-green-300/70 text-xs mt-1 italic">
                          {parsed.comment}
                        </p>
                      )}
                    </div>
                    
                    {/* Copy Button */}
                    <button
                      onClick={() => copyExample(example, index)}
                      className="opacity-0 group-hover/example:opacity-100 p-1 sm:p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-300"
                      title="Copy command"
                    >
                      {copiedExample === index ? (
                        <span className="text-green-400 text-xs font-medium">✓</span>
                      ) : (
                        <Copy className="w-3 h-3 text-white/60" />
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Syntax Pattern Section - Always Expanded */}
        <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-white/10">
          <h3 className="flex items-center gap-2 text-base sm:text-lg font-semibold text-white mb-2 sm:mb-3">
            <Code className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" style={get3DIconStyle()} />
            Syntax
          </h3>
          <div className="p-3 sm:p-4 rounded-xl bg-gradient-to-r from-purple-900/30 to-indigo-900/30 border border-purple-400/20 overflow-x-auto">
            <code className="text-purple-300 font-mono text-xs sm:text-sm lg:text-base whitespace-nowrap">
              {command?.syntaxPattern || 'No syntax available'}
            </code>
          </div>
        </div>

        {/* Command Combinations Section - Expandable */}
        {command?.commandCombinations && command.commandCombinations.length > 0 && (
          <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-white/10">
            <button
              onClick={() => toggleSection('combinations')}
              className="flex items-center justify-between w-full text-left group/header"
            >
              <h3 className="flex items-center gap-2 text-base sm:text-lg font-semibold text-white">
                <Play className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400" style={get3DIconStyle()} />
                Command Combinations
              </h3>
              {expandedSections.combinations ? (
                <ChevronUp className="w-5 h-5 text-white/70 group-hover/header:text-orange-400 transition-colors" />
              ) : (
                <ChevronDown className="w-5 h-5 text-white/70 group-hover/header:text-orange-400 transition-colors" />
              )}
            </button>
            
            {expandedSections.combinations && (
              <div className="mt-4 space-y-3 animate-in slide-in-from-top duration-300">
                {(command?.commandCombinations || []).map((combo, index) => (
                  <div 
                    key={index}
                    className="p-4 rounded-xl bg-gradient-to-br from-orange-900/20 to-yellow-900/20 border border-orange-400/20"
                  >
                    <div className="mb-2">
                      <span className="text-orange-300 font-mono text-sm">
                        {combo.label}
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div className="p-3 rounded-lg bg-slate-900/60">
                        <code className="text-white font-mono text-sm">
                          {combo.commands}
                        </code>
                      </div>
                      <p className="text-white/70 text-sm italic">
                        {combo.explanation}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Related Commands Section */}
        {command?.relatedCommands && command.relatedCommands.length > 0 && (
          <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-white/10">
            <h3 className="flex items-center gap-2 text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">
              <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" style={get3DIconStyle()} />
              Related Commands
            </h3>
            <div className="flex flex-wrap gap-3">
              {(command?.relatedCommands || []).map((related, index) => (
                <div
                  key={index}
                  className="relative"
                  onMouseEnter={() => setHoveredRelated(index)}
                  onMouseLeave={() => setHoveredRelated(null)}
                >
                  <button className={`
                    px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl font-mono font-medium text-xs sm:text-sm
                    bg-gradient-to-r ${RELATIONSHIP_COLORS[related.relationship || 'similar']}
                    border transition-all duration-300 hover:scale-105
                  `}>
                    {related.name}
                  </button>
                  
                  {/* Hover Tooltip */}
                  {hoveredRelated === index && (
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-slate-900 text-white text-xs rounded-lg border border-white/20 shadow-xl z-10 whitespace-nowrap">
                      {related.reason}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-900"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Warnings Section - Collapsible */}
        {command?.warnings && command.warnings.length > 0 && (
          <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-white/10">
            <button
              onClick={() => toggleSection('warnings')}
              className="flex items-center justify-between w-full text-left group/header"
            >
              <h3 className="flex items-center gap-2 text-base sm:text-lg font-semibold text-red-300">
                <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" style={get3DIconStyle()} />
                Warnings
              </h3>
              {expandedSections.warnings ? (
                <ChevronUp className="w-5 h-5 text-white/70 group-hover/header:text-red-400 transition-colors" />
              ) : (
                <ChevronDown className="w-5 h-5 text-white/70 group-hover/header:text-red-400 transition-colors" />
              )}
            </button>
            
            {expandedSections.warnings && (
              <div className="mt-4 space-y-2 animate-in slide-in-from-top duration-300">
                {(command?.warnings || []).map((warning, index) => (
                  <div 
                    key={index}
                    className="p-3 rounded-lg bg-gradient-to-r from-red-900/30 to-pink-900/30 border border-red-400/30"
                  >
                    <p className="text-red-200 text-sm flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                      {warning}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Footer: Man Page Link */}
        <div className="px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-white/5 to-white/10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <span className="text-white/60 text-xs sm:text-sm">
              Need more details?
            </span>
            <a
              href={command?.manPageUrl || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-gradient-to-r from-cyan-400/20 to-blue-500/20 border border-cyan-400/30 text-cyan-300 hover:from-cyan-400/30 hover:to-blue-500/30 transition-all duration-300 group"
            >
              <ExternalLink 
                className="w-4 h-4 group-hover:rotate-12 transition-transform" 
                style={get3DIconStyle()} 
              />
              <span className="text-xs sm:text-sm font-medium">Man Page</span>
            </a>
          </div>
        </div>
      </div>

      {/* Floating Shadow Effect */}
      <div 
        className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-400/5 to-blue-500/5 blur-xl -z-10 opacity-50"
        style={{
          transform: 'translateY(8px) scale(0.95)',
        }}
      />

    </div>
  );
}

export default CommandCard;
