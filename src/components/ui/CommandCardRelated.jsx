import { ArrowRight, Link } from "lucide-react";
import { Button } from "./button.jsx";

export function CommandCardRelated({ relatedCommands = [], allCommands = [], onCommandClick }) {
  if (!relatedCommands || relatedCommands.length === 0) return null;

  // Handle both string arrays and object arrays with relationship types
  const processedCommands = relatedCommands.map(cmd => {
    if (typeof cmd === 'string') {
      // Look up command info from allCommands
      const foundCommand = allCommands.find(c => c.name === cmd);
      return foundCommand ? {
        name: foundCommand.name,
        description: foundCommand.description || foundCommand.standsFor || `${cmd} command`,
        relationship: 'similar' // default
      } : {
        name: cmd,
        description: `${cmd} command`,
        relationship: 'similar'
      };
    }
    return cmd; // Already an object with relationship info
  });

  const handleCommandClick = (commandName) => {
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

  const getRelationshipStyle = (relationship) => {
    const baseClasses = "relative overflow-hidden transform transition-all duration-300 hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-xl";
    switch (relationship) {
      case 'safer':
        return `${baseClasses} bg-gradient-to-r from-emerald-500/30 via-green-400/20 to-emerald-600/30 text-emerald-200 border border-emerald-400/40 shadow-emerald-500/25 hover:shadow-emerald-400/40`;
      case 'powerful':
        return `${baseClasses} bg-gradient-to-r from-purple-500/30 via-violet-400/20 to-purple-600/30 text-purple-200 border border-purple-400/40 shadow-purple-500/25 hover:shadow-purple-400/40`;
      case 'combo':
        return `${baseClasses} bg-gradient-to-r from-cyan-500/30 via-blue-400/20 to-cyan-600/30 text-cyan-200 border border-cyan-400/40 shadow-cyan-500/25 hover:shadow-cyan-400/40`;
      case 'secure':
        return `${baseClasses} bg-gradient-to-r from-orange-500/30 via-amber-400/20 to-orange-600/30 text-orange-200 border border-orange-400/40 shadow-orange-500/25 hover:shadow-orange-400/40`;
      case 'limited':
        return `${baseClasses} bg-gradient-to-r from-yellow-500/30 via-amber-400/20 to-yellow-600/30 text-yellow-200 border border-yellow-400/40 shadow-yellow-500/25 hover:shadow-yellow-400/40`;
      default: // similar
        return `${baseClasses} bg-gradient-to-r from-blue-500/30 via-indigo-400/20 to-blue-600/30 text-blue-200 border border-blue-400/40 shadow-blue-500/25 hover:shadow-blue-400/40`;
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
        {processedCommands.map((command, index) => (
          <button
            key={index}
            onClick={() => handleCommandClick(command.name)}
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
  );
}
