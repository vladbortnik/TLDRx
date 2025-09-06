import { CommandCard } from '../ui/CommandCard.jsx';

export function CommandGrid({ 
  commands, 
  allCommands, 
  onCommandClick, 
  searchQuery 
}) {
  if (!commands || commands.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      {commands.map((command) => (
        <CommandCard
          key={command.name}
          data-command-name={command.name}
          name={command.name}
          standsFor={command.standsFor}
          description={command.description}
          safety={command.safety}
          platform={command.platform}
          categories={command.categories}
          prerequisites={command.prerequisites}
          syntaxPattern={command.syntaxPattern}
          commonFlags={command.commonFlags}
          notes={command.notes}
          warnings={command.warnings}
          examples={command.examples}
          relatedCommands={command.relatedCommands}
          manPageUrl={command.manPageUrl}
          allCommands={allCommands}
          onCommandClick={onCommandClick}
          searchQuery={searchQuery}
        />
      ))}
    </div>
  );
}