import React, { useState, useEffect, useMemo } from "react";
import {
    Shield,
    AlertTriangle,
    Copy,
    Check,
    ChevronDown,
    ChevronRight,
    Terminal,
    Zap,
    FileText
} from "lucide-react";
import { Badge } from "./badge.jsx";
import { Button } from "./button.jsx";
import { copyToClipboard } from "../../utils/copyToClipboard.js";
import { PlatformIcon } from "./PlatformIcon.jsx"

// // Platform Icon Component Logic (moved outside to prevent recreation)
// const PlatformIcon = React.memo(function PlatformIcon({ platform }) {
//     // Special case for macOS - use Apple logo style
//     if (platform.id === 'macos' || platform.id === 'mac') {
//         return (
//             <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
//                 <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
//             </svg>
//         );
//     }
//
//     // Special case for Windows - use Windows logo style
//     if (platform.id === 'windows') {
//         return (
//             <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 fill-current" viewBox="0 0 48 48">
//                 <path fill="#00b0ff" d="M20 25.026L5.011 25 5.012 37.744 20 39.818zM22 25.03L22 40.095 42.995 43 43 25.066zM20 8.256L5 10.38 5.014 23 20 23zM22 7.973L22 23 42.995 23 42.995 5z"></path>
//             </svg>
//         );
//     }
//
//     // Handle both string emojis and JSX/SVG icons
//     if (typeof platform.icon === 'string') {
//         return <span className="text-base">{platform.icon}</span>;
//     }
//
//     return platform.icon;
// });

// Platform Badge Component Logic (moved outside to prevent recreation)
const PlatformBadge = React.memo(function PlatformBadge({ platform }) {
    // Handle both string and object platform formats
    const platformData = typeof platform === 'string' ? {
        id: platform,
        name: platform === 'mac' ? 'macOS' : platform.charAt(0).toUpperCase() + platform.slice(1),
        color: platform === 'linux' ? 'text-green-400 bg-green-500/20 border-green-500/50' :
            platform === 'mac' ? 'text-blue-400 bg-blue-500/20 border-blue-500/50' :
                'text-slate-400 bg-slate-500/20 border-slate-500/50'
    } : platform;

    return (
        <Badge
            variant="secondary"
            className={`${platformData.color} border-opacity-30`}
        >
      <span className="mr-1">
        <PlatformIcon platform={platformData} />
      </span>
            {platformData.name}
        </Badge>
    );
});

// Transform use cases from string format to object format (moved outside to prevent recreation)
const transformUseCases = (useCases = []) => {
    if (!useCases || useCases.length === 0) return [];

    return useCases.map((useCase) => {
        if (typeof useCase === "string") {
            // Split on ' #' to separate command from scenario
            const [command, scenario] = useCase.includes(" #")
                ? useCase.split(" #")
                : [useCase, ""];

            return {
                scenario: scenario.trim() || "Common usage",
                command: command.trim(),
                explanation: "", // Will be enhanced with real data
            };
        }
        return useCase; // Already in correct format
    });
};

// Consolidated CommandCard Component
export const CommandCard = React.memo(function CommandCard({
                                                               name,
                                                               standsFor,
                                                               description,
                                                               safety,
                                                               platform,
                                                               categories,
                                                               prerequisites,
                                                               syntaxPattern,
                                                               commonFlags,
                                                               notes,
                                                               warnings,
                                                               examples,
                                                               relatedCommands,
                                                               manPageUrl,
                                                               maxVisibleExamples = 3,
                                                               allCommands = [],
                                                               onCommandClick,
                                                               searchQuery = "",
                                                           }) {
    // State management
    const [isExamplesExpanded, setIsExamplesExpanded] = useState(false);
    const [isCombinationsExpanded, setIsCombinationsExpanded] = useState(false);
    const [isNotesExpanded, setIsNotesExpanded] = useState(false);
    const [isWarningsExpanded, setIsWarningsExpanded] = useState(false);
    const [copiedExampleId, setCopiedExampleId] = useState(null);
    const [copiedCombinationId, setCopiedCombinationId] = useState(null);
    const [syntaxCopied, setSyntaxCopied] = useState(false);

    // Auto-expand Use Cases when user types exact command name
    useEffect(() => {
        const shouldExpand = searchQuery.toLowerCase().trim() === name.toLowerCase();
        setIsExamplesExpanded(shouldExpand);
    }, [searchQuery, name]);

    // Copy handlers
    const handleExampleCopy = async (code, exampleId) => {
        const success = await copyToClipboard(code);
        if (success) {
            setCopiedExampleId(exampleId);
            setTimeout(() => setCopiedExampleId(null), 2000);
        } else {
            console.error("Failed to copy text to clipboard");
            setCopiedExampleId(exampleId);
            setTimeout(() => setCopiedExampleId(null), 1000);
        }
    };

    const handleSyntaxCopy = async () => {
        const success = await copyToClipboard(syntaxPattern);
        if (success) {
            setSyntaxCopied(true);
            setTimeout(() => setSyntaxCopied(false), 2000);
        } else {
            console.error("Failed to copy syntax to clipboard");
            setSyntaxCopied(true);
            setTimeout(() => setSyntaxCopied(false), 1000);
        }
    };

    const handleCombinationCopy = async (commands, combinationId) => {
        const success = await copyToClipboard(commands);
        if (success) {
            setCopiedCombinationId(combinationId);
            setTimeout(() => setCopiedCombinationId(null), 2000);
        }
    };

    const handleRelatedCommandClick = (commandName) => {
        if (onCommandClick) {
            onCommandClick(commandName);
        } else {
            // Fallback: scroll to command card
            const element = document.querySelector(`[data-command-name="${commandName}"]`);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    };

    // Safety badge logic
    const getSafetyBadge = () => {
        switch (safety) {
            case "safe":
                return (
                    <Badge
                        variant="secondary"
                        className="bg-green-500/20 text-green-400 border-green-500/30"
                    >
                        <Shield className="w-3 h-3 mr-1" />
                        Safe
                    </Badge>
                );
            case "caution":
                return (
                    <Badge
                        variant="secondary"
                        className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                    >
                        <AlertTriangle className="w-3 h-3 mr-1" />
                        Caution
                    </Badge>
                );
            case "dangerous":
                return (
                    <Badge
                        variant="destructive"
                        className="bg-red-500/20 text-red-400 border-red-500/30"
                    >
                        <Shield className="w-3 h-3 mr-1" />
                        Dangerous
                    </Badge>
                );
            default:
                return null;
        }
    };

    // Process related commands for rendering (memoized for performance)
    const processedRelatedCommands = useMemo(() => {
        return relatedCommands?.map(cmd => {
            if (typeof cmd === 'string') {
                const foundCommand = allCommands.find(c => c.name === cmd);
                return foundCommand ? {
                    name: foundCommand.name,
                    description: foundCommand.description || foundCommand.standsFor || `${cmd} command`,
                    relationship: 'similar'
                } : {
                    name: cmd,
                    description: `${cmd} command`,
                    relationship: 'similar'
                };
            }
            return cmd;
        }) || [];
    }, [relatedCommands, allCommands]);

    const getRelationshipStyle = (relationship) => {
        const baseClasses = "relative overflow-hidden transform transition-all duration-300 hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-xl";
        switch (relationship) {
            case 'alternative':
            case 'modern-alternative':
            case 'simple-alternative':
                return `${baseClasses} bg-gradient-to-r from-emerald-500/30 via-green-400/20 to-emerald-600/30 text-emerald-200 border border-emerald-400/40 shadow-emerald-500/25 hover:shadow-emerald-400/40`;
            case 'powerful':
            case 'utility':
                return `${baseClasses} bg-gradient-to-r from-purple-500/30 via-violet-400/20 to-purple-600/30 text-purple-200 border border-purple-400/40 shadow-purple-500/25 hover:shadow-purple-400/40`;
            case 'combo':
                return `${baseClasses} bg-gradient-to-r from-cyan-500/30 via-blue-400/20 to-cyan-600/30 text-cyan-200 border border-cyan-400/40 shadow-cyan-500/25 hover:shadow-cyan-400/40`;
            case 'complementary':
            case 'integration':
                return `${baseClasses} bg-gradient-to-r from-orange-500/30 via-amber-400/20 to-orange-600/30 text-orange-200 border border-orange-400/40 shadow-orange-500/25 hover:shadow-orange-400/40`;
            case 'dependency':
            case 'installation':
                return `${baseClasses} bg-gradient-to-r from-yellow-500/30 via-amber-400/20 to-yellow-600/30 text-yellow-200 border border-yellow-400/40 shadow-yellow-500/25 hover:shadow-yellow-400/40`;
            case 'opposite':
                return `${baseClasses} bg-gradient-to-r from-red-500/30 via-pink-400/20 to-red-600/30 text-red-200 border border-red-400/40 shadow-red-500/25 hover:shadow-red-400/40`;
            case 'info':
                return `${baseClasses} bg-gradient-to-r from-indigo-500/30 via-violet-400/20 to-indigo-600/30 text-indigo-200 border border-indigo-400/40 shadow-indigo-500/25 hover:shadow-indigo-400/40`;
            case 'safer':
                return `${baseClasses} bg-gradient-to-r from-teal-500/30 via-emerald-400/20 to-teal-600/30 text-teal-200 border border-teal-400/40 shadow-teal-500/25 hover:shadow-teal-400/40`;
            case 'secure':
                return `${baseClasses} bg-gradient-to-r from-amber-500/30 via-yellow-400/20 to-amber-600/30 text-amber-200 border border-amber-400/40 shadow-amber-500/25 hover:shadow-amber-400/40`;
            case 'limited':
                return `${baseClasses} bg-gradient-to-r from-slate-500/30 via-gray-400/20 to-slate-600/30 text-slate-200 border border-slate-400/40 shadow-slate-500/25 hover:shadow-slate-400/40`;
            default: // similar and any other relationships
                return `${baseClasses} bg-gradient-to-r from-blue-500/30 via-indigo-400/20 to-blue-600/30 text-blue-200 border border-blue-400/40 shadow-blue-500/25 hover:shadow-blue-400/40`;
        }
    };

    // Transform examples (memoized for performance)
    const transformedUseCases = useMemo(() => transformUseCases(examples), [examples]);
    const visibleUseCases = isExamplesExpanded ? transformedUseCases : [];
    const hasMoreUseCases = transformedUseCases.length > 0;

    // Filter combinations
    const combinations = relatedCommands?.filter(cmd => typeof cmd === 'object' && cmd.commands) || [];
    const visibleCombinations = isCombinationsExpanded ? combinations : [];
    const hasMoreCombinations = combinations.length > 0;

    return (
        <div
            className="bg-slate-800 rounded-lg border border-slate-700 p-6 hover:border-slate-600 transition-colors space-y-4"
            data-command-name={name}
        >
            {/* 1. Header - Command name, safety badge, description */}
            <div className="mb-4">
                <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                            <h3 className="text-xl font-semibold text-emerald-400">{name}</h3>
                            {description && (
                                <span className="text-slate-400 text-sm">- {description}</span>
                            )}
                            {getSafetyBadge()}
                        </div>
                    </div>
                    {prerequisites?.length > 0 && (
                        <div className="flex flex-wrap gap-1 ml-4">
                            {prerequisites.map((prereq, index) => {
                                const getPrereqColor = () => {
                                    switch (safety) {
                                        case "safe":
                                            return "bg-green-500/20 text-green-300 border-green-500/30";
                                        case "caution":
                                            return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";
                                        case "dangerous":
                                        case "destructive":
                                            return "bg-red-500/20 text-red-300 border-red-500/30";
                                        default:
                                            return "bg-slate-500/20 text-slate-300 border-slate-500/30";
                                    }
                                };
                                return (
                                    <Badge
                                        key={index}
                                        variant="secondary"
                                        className={`${getPrereqColor()} text-xs px-2 py-1`}
                                    >
                                        {prereq}
                                    </Badge>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>

            {/* 2. Platform and Category Badges */}
            <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                    {/* Platform Badges */}
                    {platform && Array.isArray(platform) && platform.map((platformItem, index) => (
                        <PlatformBadge key={`${platformItem}-${index}`} platform={platformItem} />
                    ))}

                    {/* Category Badges */}
                    {categories?.map((category, index) => (
                        <div
                            key={index}
                            className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-slate-700/50 text-slate-300 border border-slate-600"
                        >
                            {category.icon && <span className="mr-1">{category.icon}</span>}
                            {category.name}
                        </div>
                    ))}
                </div>
            </div>

            {/* 3. Syntax Pattern */}
            {syntaxPattern && (
                <div className="mb-4">
                    <h4 className="text-sm font-medium text-slate-300 mb-2">Syntax</h4>
                    <div className="relative bg-slate-900 rounded-lg border border-slate-600 p-3">
                        <code className="text-sm text-emerald-400 font-mono break-all">
                            {syntaxPattern}
                        </code>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleSyntaxCopy}
                            className="absolute top-2 right-2 w-8 h-8 p-0 text-slate-400 hover:text-slate-300"
                            aria-label="Copy syntax"
                            title="Copy syntax to clipboard"
                        >
                            {syntaxCopied ? (
                                <Check className="w-4 h-4" />
                            ) : (
                                <Copy className="w-4 h-4" />
                            )}
                        </Button>
                    </div>
                </div>
            )}

            {/* 4. Use Cases - Practical scenarios */}
            {hasMoreUseCases && (
                <div className="mb-4 border-l-2 border-emerald-500/30 pl-3">
                    <div className="flex items-center justify-between mb-2">
                        <button
                            onClick={() => setIsExamplesExpanded(!isExamplesExpanded)}
                            className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-slate-300 transition-colors cursor-pointer"
                        >
                            <Terminal className="w-4 h-4" />
                            <span>Use Cases</span>
                        </button>
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => setIsExamplesExpanded(!isExamplesExpanded)}
                            className="text-xs text-slate-400 hover:text-slate-300 h-6 px-2"
                        >
                            {isExamplesExpanded ? (
                                <>
                                    <ChevronDown className="w-3 h-3 mr-1" />
                                    Show Less
                                </>
                            ) : (
                                <>
                                    <ChevronRight className="w-3 h-3 mr-1" />
                                    Show All ({transformedUseCases.length})
                                </>
                            )}
                        </Button>
                    </div>

                    <div className="space-y-1">
                        {visibleUseCases.map((useCase, index) => {
                            const useCaseId = `usecase-${index}`;
                            return (
                                <div key={index} className="group relative">
                                    <div className="flex items-center justify-between p-2 rounded-md bg-gradient-to-r from-slate-900/40 to-slate-800/40 border border-slate-700/30 hover:border-slate-600/50 transition-all duration-200 hover:shadow-sm">
                                        <div className="flex-1 min-w-0 font-mono text-sm">
                                            <code className="text-emerald-400 font-semibold">
                                                {useCase.command}
                                            </code>
                                            {useCase.scenario && (
                                                <span className="text-slate-400 ml-2">
                          # {useCase.scenario}
                        </span>
                                            )}
                                        </div>

                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleExampleCopy(useCase.command, useCaseId)}
                                            className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-slate-500 hover:text-slate-400 h-7 px-2 text-xs flex-shrink-0"
                                        >
                                            <span>copy</span>
                                            {copiedExampleId === useCaseId ? (
                                                <span className="text-green-400">✓</span>
                                            ) : (
                                                <Copy className="w-4 h-4" />
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* 5. Notes and Warnings */}
            {(notes?.length > 0 || warnings?.length > 0) && (
                <div className="mb-4 space-y-3">
                    {/* Notes */}
                    {notes?.length > 0 && (
                        <div>
                            <button
                                onClick={() => setIsNotesExpanded(!isNotesExpanded)}
                                className="w-full text-left flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-slate-200 transition-colors duration-200 mb-2"
                            >
                                {isNotesExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                                Notes ({notes.length})
                            </button>
                            {isNotesExpanded && (
                                <div className="bg-blue-500/10 rounded-md border border-blue-500/30 p-3">
                                    <ul className="space-y-1">
                                        {notes.map((note, index) => (
                                            <li key={index} className="text-sm text-blue-300 flex items-start gap-2">
                                                <span className="text-blue-400 mt-1">•</span>
                                                <span>{note}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Warnings */}
                    {warnings?.length > 0 && (
                        <div>
                            <button
                                onClick={() => setIsWarningsExpanded(!isWarningsExpanded)}
                                className="w-full text-left flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-slate-200 transition-colors duration-200 mb-2"
                            >
                                {isWarningsExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                                Warnings ({warnings.length})
                            </button>
                            {isWarningsExpanded && (
                                <div className="bg-yellow-500/10 rounded-md border border-yellow-500/30 p-3">
                                    <ul className="space-y-1">
                                        {warnings.map((warning, index) => (
                                            <li key={index} className="text-sm text-yellow-300 flex items-start gap-2">
                                                <span className="text-yellow-400 mt-1">⚠</span>
                                                <span>{warning}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}

            {/* 6. Command Combinations - Multi-command workflows */}
            {hasMoreCombinations && (
                <div className="mb-4 border-l-2 border-purple-500/30 pl-3">
                    <div className="flex items-center justify-between mb-2">
                        <button
                            onClick={() => setIsCombinationsExpanded(!isCombinationsExpanded)}
                            className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-slate-300 transition-colors cursor-pointer"
                        >
                            <Zap className="w-4 h-4" />
                            <span>Command Combinations</span>
                        </button>
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => setIsCombinationsExpanded(!isCombinationsExpanded)}
                            className="text-xs text-slate-400 hover:text-slate-300 h-6 px-2"
                        >
                            {isCombinationsExpanded ? (
                                <>
                                    <ChevronDown className="w-3 h-3 mr-1" />
                                    Show Less
                                </>
                            ) : (
                                <>
                                    <ChevronRight className="w-3 h-3 mr-1" />
                                    Show All ({combinations.length})
                                </>
                            )}
                        </Button>
                    </div>

                    <div className="space-y-1">
                        {visibleCombinations.map((combination, index) => {
                            const combinationId = `combination-${index}`;
                            return (
                                <div key={index} className="group relative">
                                    <div className="flex items-center justify-between p-2 rounded-md bg-gradient-to-r from-slate-900/40 to-slate-800/40 border border-slate-700/30 hover:border-slate-600/50 transition-all duration-200 hover:shadow-sm">
                                        <div className="flex-1 min-w-0">
                                            <div className="text-sm">
                                                <span className="text-slate-300 font-medium">{combination.scenario}</span>
                                                <code className="text-purple-400 font-mono ml-2">{combination.commands}</code>
                                            </div>
                                        </div>

                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleCombinationCopy(combination.commands, combinationId)}
                                            className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-slate-500 hover:text-slate-400 h-7 px-2 text-xs flex-shrink-0"
                                        >
                                            <span>copy</span>
                                            {copiedCombinationId === combinationId ? (
                                                <span className="text-green-400">✓</span>
                                            ) : (
                                                <Copy className="w-4 h-4" />
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* 7. Bottom section: Related Commands and Manual Page link */}
            <div className="flex items-end justify-between">
                <div className="flex-1">
                    {processedRelatedCommands.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {processedRelatedCommands.map((command, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleRelatedCommandClick(command.name)}
                                    className={`${getRelationshipStyle(command.relationship)} px-3 py-2 rounded-xl text-sm font-medium cursor-pointer group`}
                                >
                                    {/* Animated background glow */}
                                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/5 via-white/10 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                    {/* Content */}
                                    <div className="relative flex items-center gap-2">
                                        <span className="font-mono font-bold tracking-wider">{command.name}</span>
                                        <span className="text-xs px-2 py-0.5 rounded-full bg-black/20 backdrop-blur-sm border border-white/10 font-medium opacity-80">
                      {command.relationship}
                    </span>
                                    </div>

                                    {/* Shine effect */}
                                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out"></div>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
                <div className="flex-shrink-0 self-end">
                    {manPageUrl && (
                        <a
                            href={manPageUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center w-8 h-8 rounded-md bg-slate-800/40 border border-slate-700/50 hover:border-slate-600/60 text-slate-500 hover:text-slate-400 transition-colors duration-200"
                            title="man page"
                        >
                            <FileText className="w-4 h-4" />
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
});