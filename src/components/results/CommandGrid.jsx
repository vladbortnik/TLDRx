import { CommandCard } from '../command/CommandCard.jsx';

export function CommandGrid({ 
  commands, 
  allCommands, 
  onCommandClick, 
  searchQuery,
  wavePhase 
}) {
  if (!commands || commands.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      {commands.map((command, index) => {
        // Ensure we have a valid unique key
        const commandKey = command?.name || `command-${index}`;
        
        return (
          <CommandCard
            key={commandKey}
            data-command-name={command?.name || 'unknown'}
            command={command}
            wavePhase={wavePhase}
          />
        );
      })}
    </div>
  );
}