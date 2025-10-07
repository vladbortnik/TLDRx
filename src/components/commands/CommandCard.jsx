/**
 * CommandCard Component
 * 
 * Main card component for displaying command information
 * Includes header (name, standsFor, description, badges) and collapsible sections
 * Features wave animation synchronized across all cards
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  ChevronDown, 
  ChevronUp, 
  ExternalLink,
  AlertTriangle,
  Zap,
  Copy,
  Play
} from 'lucide-react';
import { CommandCardHeader } from './CommandCardHeader';

/**
 * Color configuration for related commands based on relationship type
 */
const RELATIONSHIP_COLORS = {
  similar: 'from-blue-400/20 to-cyan-500/20 border-blue-400/40 text-blue-300',
  alternative: 'from-purple-400/20 to-indigo-500/20 border-purple-400/40 text-purple-300',
  complement: 'from-green-400/20 to-emerald-500/20 border-green-400/40 text-green-300'
};

/**
 * Main CommandCard Component
 * Displays complete command information with expandable sections
 */
export const CommandCard = React.memo(function CommandCard({ command, onScrollToCommand }) {
  // ===== ALL HOOKS MUST COME FIRST (React Rules of Hooks) =====

  // State for expandable sections (collapsed by default)
  const [expandedSections, setExpandedSections] = useState({
    keyFeatures: false,
    combinations: false,
    warnings: false
  });

  // UI interaction states
  const [hoveredRelated, setHoveredRelated] = useState(null);
  const [copiedExample, setCopiedExample] = useState(null);
  const [showDescription, setShowDescription] = useState(false);
  const [screenSize, setScreenSize] = useState('desktop');
  const [isHighlighted, setIsHighlighted] = useState(false);

  // Refs for DOM and timing
  const cardRef = useRef(null);
  const descriptionTimeoutRef = useRef(null);
  const descriptionShowTimeRef = useRef(null);
  const isHoveringRef = useRef(false);
  const highlightTimeoutRef = useRef(null);
  const lastScreenSizeRef = useRef('desktop'); // Track last size to prevent unnecessary updates

  /**
   * Responsive screen size detection
   * Updates screenSize state for responsive styling
   * FIXED: Uses ref to track previous value and prevent infinite loop
   */
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      let newSize;
      if (width < 640) newSize = 'mobile';
      else if (width < 768) newSize = 'tablet';
      else if (width < 1024) newSize = 'laptop';
      else if (width < 1440) newSize = 'desktop';
      else newSize = 'wide';

      // Only update if value changed - check against ref, not state
      if (lastScreenSizeRef.current !== newSize) {
        lastScreenSizeRef.current = newSize;
        setScreenSize(newSize);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  /**
   * Cleanup timeouts on unmounting
   */
  useEffect(() => {
    return () => {
      if (descriptionTimeoutRef.current) {
        clearTimeout(descriptionTimeoutRef.current);
      }
    };
  }, []);

  /**
   * Handle description hover with minimum 10-second display
   * Description stays visible while hovering, but has minimum 10s display time
   */
  const handleDescriptionHover = useCallback((hovering) => {
    isHoveringRef.current = hovering;

    if (hovering) {
      // Show description and record the time
      setShowDescription(true);
      descriptionShowTimeRef.current = Date.now();

      // Clear any existing hide timeout
      if (descriptionTimeoutRef.current) {
        clearTimeout(descriptionTimeoutRef.current);
        descriptionTimeoutRef.current = null;
      }
    } else {
      // Mouse left - check if 10 seconds have passed
      if (descriptionShowTimeRef.current) {
        const elapsed = Date.now() - descriptionShowTimeRef.current;
        const remaining = Math.max(0, 15000 - elapsed);

        if (remaining > 0) {
          // Haven't reached minimum time, schedule hides after remaining time
          descriptionTimeoutRef.current = setTimeout(() => {
            // Only hide if still not hovering
            if (!isHoveringRef.current) {
              setShowDescription(false);
              descriptionShowTimeRef.current = null;
            }
            descriptionTimeoutRef.current = null;
          }, remaining);
        } else {
          // Already passed minimum time, hide immediately
          setShowDescription(false);
          descriptionShowTimeRef.current = null;
        }
      }
    }
  }, []); // Empty deps: uses refs and setState (which are stable)

  /**
   * Toggle expanded state for collapsible sections
   */
  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  /**
   * Copy command example to clipboard
   * Shows confirmation feedback for 2 seconds
   */
  const copyExample = async (example, index) => {
    try {
      await navigator.clipboard.writeText(example.split(' #')[0].trim());
      setCopiedExample(index);
      setTimeout(() => setCopiedExample(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  /**
   * Parse an example string into command and comment parts
   * Split on '#' to separate command from explanation
   */
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

  /**
   * Parse key feature string into title and description
   * First feature is full description, rest are title:description format
   */
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

  /**
   * Handle related command click - scroll to and highlight target command
   * Uses callback provided by parent to work with a virtualized list
   */
  const handleRelatedCommandClick = (commandName) => {
    if (onScrollToCommand) {
      onScrollToCommand(commandName);
    }
  };

  /**
   * Listen for highlight events and trigger highlight animation
   */
  useEffect(() => {
    const handleHighlight = (event) => {
      if (event.detail.commandName === command?.name) {
        setIsHighlighted(true);

        // Clear any existing timeout
        if (highlightTimeoutRef.current) {
          clearTimeout(highlightTimeoutRef.current);
        }

        // Remove highlight after 3 seconds
        highlightTimeoutRef.current = setTimeout(() => {
          setIsHighlighted(false);
        }, 3000);
      }
    };

    window.addEventListener('highlightCommand', handleHighlight);

    return () => {
      window.removeEventListener('highlightCommand', handleHighlight);
      if (highlightTimeoutRef.current) {
        clearTimeout(highlightTimeoutRef.current);
      }
    };
  }, [command?.name]);

  // ===== DEFENSIVE CHECK (AFTER ALL HOOKS) =====
  // Hooks must be called in the same order every render
  // so this check comes AFTER all hooks, not before
  if (!command) {
    return <div className="text-red-400">Error: No command data provided</div>;
  }

  return (
    <div
      ref={cardRef}
      id={`command-${command?.name}`}
      className="relative group"
    >
      {/* Main Card Container */}
      <div
        className={`relative backdrop-blur-xl border rounded-2xl overflow-hidden shadow-2xl transition-all duration-700 hover:-translate-y-1 ${
          isHighlighted
            ? 'border-cyan-400 shadow-[0_0_60px_rgba(34,211,238,0.6)] ring-4 ring-cyan-400/50'
            : 'border-white/20 hover:shadow-[0_0_40px_rgba(59,130,246,0.2)]'
        }`}
        style={{
          background: 'linear-gradient(135deg, rgba(15,25,45,0.7), rgba(30,40,80,0.5), rgba(20,30,55,0.7))'
        }}
      >
        
        {/* Header Section: Command Name + Stands For + Description + Badges */}
        <CommandCardHeader 
          command={command}
          screenSize={screenSize}
          showDescription={showDescription}
          onDescriptionHover={handleDescriptionHover}
        />

        {/* Syntax Pattern - More prominent with better color */}
        <div className="px-4 py-3 border-b border-white/10 bg-gradient-to-r from-indigo-900/20 to-blue-900/20">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-normal text-indigo-300/50 uppercase tracking-wider">Syntax</span>
          </div>
          <code className="text-cyan-300 font-mono text-base font-medium whitespace-nowrap block overflow-x-auto"
                style={{ fontFamily: "'Courier New', Courier, monospace" }}>
            {command?.syntaxPattern || 'No syntax available'}
          </code>
        </div>

        {/* Key Features Section - Collapsible */}
        {command?.keyFeatures && command.keyFeatures.length > 0 && (
          <div className="px-4 py-2.5 border-b border-white/10">
            <button
              onClick={() => toggleSection('keyFeatures')}
              className="flex items-center justify-between w-full text-left group/header hover:bg-white/5 -mx-2 px-2 py-1 rounded-lg transition-all duration-200"
            >
              <div className="flex items-center gap-2">
                {/* Chevron on the left as primary expandable indicator */}
                {expandedSections.keyFeatures ? (
                  <ChevronUp className="w-4 h-4 text-yellow-300/80 transition-transform duration-200" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-white/50 group-hover/header:text-yellow-300/80 transition-all duration-200" />
                )}
                <h3 className="flex items-center gap-1.5 text-xs font-semibold text-yellow-200/80">
                  <Zap className="w-3.5 h-3.5 text-yellow-300/80" />
                  Key Features
                </h3>
              </div>
              <span className="text-[10px] text-white/40">Click to {expandedSections.keyFeatures ? 'collapse' : 'expand'}</span>
            </button>
            
            {expandedSections.keyFeatures && (
              <div className="mt-2 animate-in slide-in-from-top duration-300">
                {/* Full Description - First item in array */}
                <p className="text-white/80 text-xs leading-relaxed mb-2">
                  {command.keyFeatures[0]}
                </p>

                {/* Feature List - Remaining items */}
                {command.keyFeatures.length > 1 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
                    {command.keyFeatures.slice(1).map((feature, index) => {
                      const parsed = parseKeyFeature(feature);
                      return (
                        <div 
                          key={index}
                          className="p-2 rounded-md bg-gradient-to-br from-white/5 to-white/10 border border-white/10 hover:border-white/20 transition-all duration-300"
                        >
                          <h4 className="text-cyan-300 font-medium text-xs mb-0.5">
                            {parsed.title}
                          </h4>
                          <p className="text-white/60 text-[10px] leading-relaxed">
                            {parsed.description}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Examples Section - Always Expanded */}
        <div className="px-4 py-2.5 border-b border-white/10">
          <div className="space-y-1.5">
            {(command?.examples || []).map((example, index) => {
              const parsed = parseExample(example);
              return (
                <div 
                  key={index}
                  className="group/example relative p-2.5 rounded-lg bg-gradient-to-r from-slate-900/80 to-slate-800/80 border border-white/10 hover:border-green-400/30 transition-all duration-300 cursor-pointer"
                  onClick={() => copyExample(example, index)}
                >
                  {/* Terminal Prompt - Single Line */}
                  <div className="flex items-center gap-3">
                    <span className="text-green-400 font-mono text-sm flex-shrink-0">$</span>
                    <div className="flex-1 min-w-0 flex items-baseline gap-2">
                      <code className="text-green-400 font-mono text-sm font-medium"
                            style={{ fontFamily: "'Courier New', Courier, monospace" }}>
                        {parsed.command}
                      </code>
                      {parsed.comment && (
                        <span className="text-gray-400 text-xs">
                          # {parsed.comment}
                        </span>
                      )}
                    </div>
                    
                    {/* Copy Button - Minimal, no background */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        copyExample(example, index);
                      }}
                      className="p-1.5 hover:bg-white/10 rounded-md transition-all duration-300 flex-shrink-0"
                      title="Copy command"
                    >
                      {copiedExample === index ? (
                        <span className="text-green-400 text-xs font-medium">✓</span>
                      ) : (
                        <Copy className="w-3.5 h-3.5 text-white/40 hover:text-white/70" />
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Command Combinations Section - Hidden per requirements */}
        {/* Keeping code for future use but not displaying */}
        {/*{command?.commandCombinations && command.commandCombinations.length > 0 && (*/}
        {/*  <div className="px-4 py-2.5 border-b border-white/10">*/}
        {/*    <button*/}
        {/*      onClick={() => toggleSection('combinations')}*/}
        {/*      className="flex items-center justify-between w-full text-left group/header"*/}
        {/*    >*/}
        {/*      <h3 className="flex items-center gap-1.5 text-xs font-semibold text-white">*/}
        {/*        <Play className="w-3.5 h-3.5 text-orange-400" />*/}
        {/*        Command Combinations*/}
        {/*      </h3>*/}
        {/*      {expandedSections.combinations ? (*/}
        {/*        <ChevronUp className="w-4 h-4 text-white/70 group-hover/header:text-orange-400 transition-colors" />*/}
        {/*      ) : (*/}
        {/*        <ChevronDown className="w-4 h-4 text-white/70 group-hover/header:text-orange-400 transition-colors" />*/}
        {/*      )}*/}
        {/*    </button>*/}
        {/*    */}
        {/*    {expandedSections.combinations && (*/}
        {/*      <div className="mt-2 space-y-1.5 animate-in slide-in-from-top duration-300">*/}
        {/*        {(command?.commandCombinations || []).map((combo, index) => (*/}
        {/*          <div */}
        {/*            key={index}*/}
        {/*            className="p-2.5 rounded-lg bg-gradient-to-br from-orange-900/20 to-yellow-900/20 border border-orange-400/20"*/}
        {/*          >*/}
        {/*            <div className="mb-1">*/}
        {/*              <span className="text-orange-300 font-mono text-xs">*/}
        {/*                {combo.label}*/}
        {/*              </span>*/}
        {/*            </div>*/}
        {/*            <div className="space-y-1">*/}
        {/*              <div className="p-2 rounded-md bg-slate-900/60">*/}
        {/*                <code className="text-white font-mono text-xs">*/}
        {/*                  {combo.commands}*/}
        {/*                </code>*/}
        {/*              </div>*/}
        {/*              <p className="text-white/60 text-xs italic">*/}
        {/*                {combo.explanation}*/}
        {/*              </p>*/}
        {/*            </div>*/}
        {/*          </div>*/}
        {/*        ))}*/}
        {/*      </div>*/}
        {/*    )}*/}
        {/*  </div>*/}
        {/*)}*/}

        {/* Warnings Section - Collapsible, initially collapsed */}
        {command?.warnings && command.warnings.length > 0 && (
          <div className="px-4 py-2.5 border-b border-white/10">
            <button
              onClick={() => toggleSection('warnings')}
              className="flex items-center justify-between w-full text-left group/header hover:bg-white/5 -mx-2 px-2 py-1 rounded-lg transition-all duration-200"
            >
              <div className="flex items-center gap-2">
                {/* Chevron on the left as primary expandable indicator */}
                {expandedSections.warnings ? (
                  <ChevronUp className="w-4 h-4 text-red-400 transition-transform duration-200" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-white/50 group-hover/header:text-red-400 transition-all duration-200" />
                )}
                <h3 className="flex items-center gap-1.5 text-xs font-semibold text-red-300">
                  <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                  Warnings
                </h3>
              </div>
              <span className="text-[10px] text-white/40">Click to {expandedSections.warnings ? 'collapse' : 'expand'}</span>
            </button>
            
            {expandedSections.warnings && (
              <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2 animate-in slide-in-from-top duration-300">
                {(command?.warnings || []).map((warning, index) => (
                  <div 
                    key={index}
                    className="p-2 rounded-md bg-gradient-to-r from-red-900/30 to-pink-900/30 border border-red-400/30"
                  >
                    <p className="text-red-200 text-xs flex items-start gap-1.5">
                      <AlertTriangle className="w-3 h-3 text-red-400 flex-shrink-0 mt-0.5" />
                      {warning}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Footer: Related Commands and Man Page Link */}
        <div className="px-4 py-2 bg-gradient-to-r from-white/5 to-white/10">
          <div className="flex items-center justify-between gap-2">
            {/* Related Commands - Left side */}
            {command?.relatedCommands && command.relatedCommands.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {(command?.relatedCommands || []).map((related, index) => (
                  <div
                    key={index}
                    className="relative"
                    onMouseEnter={() => setHoveredRelated(index)}
                    onMouseLeave={() => setHoveredRelated(null)}
                  >
                    <button
                      className={`
                        px-2.5 py-1 rounded-lg font-mono font-medium text-xs
                        bg-gradient-to-r ${RELATIONSHIP_COLORS[related.relationship || 'similar']}
                        border transition-all duration-300 hover:scale-105 cursor-pointer
                      `}
                      style={{ fontFamily: "'Courier New', Courier, monospace" }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRelatedCommandClick(related.name);
                      }}
                    >
                      {related.name}
                    </button>
                    
                    {/* Hover Tooltip - Above button, left-aligned */}
                    {hoveredRelated === index && (
                      <div className="absolute bottom-full left-0 mb-1 px-2 py-1 bg-slate-900 text-white text-xs rounded border border-white/20 shadow-xl z-50 whitespace-nowrap">
                        {related.reason}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div></div>
            )}
            
            {/* Man Page Link - Right side */}
            <a
              href={command?.manPageUrl || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-gradient-to-r from-cyan-400/20 to-blue-500/20 border border-cyan-400/30 text-cyan-300 hover:from-cyan-400/30 hover:to-blue-500/30 transition-all duration-300 group flex-shrink-0"
            >
              <ExternalLink 
                className="w-3 h-3 group-hover:rotate-12 transition-transform" 
              />
              <span className="text-[10px] font-medium">Man Page</span>
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
});

export default CommandCard;
