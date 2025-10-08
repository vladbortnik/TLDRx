import React, { useRef, forwardRef, useImperativeHandle } from 'react';
import { Virtuoso } from 'react-virtuoso';
import { CommandCard } from './CommandCard.jsx';

/**
 * CommandGrid Component
 *
 * Virtualizes the command list to render only visible cards for performance
 * Uses React Virtuoso with window scrolling to maintain existing scroll behavior
 *
 * @param {Object} props
 * @param {Array} props.commands - Filtered array of commands to display
 * @param {Array} props.allCommands - Full array of all commands
 * @param {Function} props.onCommandClick - Click handler for command interaction
 * @param {Function} props.onScrollToCommand - Callback to scroll to specific command
 * @param {string} props.searchQuery - Current search query
 * @param {ref} ref - Forward ref to expose scrollToIndex method
 */
export const CommandGrid = forwardRef(function CommandGrid({
  commands,
  allCommands,
  onCommandClick,
  onScrollToCommand,
  searchQuery
}, ref) {
  const virtuosoRef = useRef(null);

  // Expose scrollToIndex method to parent component
  useImperativeHandle(ref, () => ({
    scrollToIndex: (index, options) => {
      virtuosoRef.current?.scrollToIndex({
        index,
        align: options?.align || 'start',
        behavior: options?.behavior || 'smooth'
      });
    }
  }));

  if (!commands || commands.length === 0) {
    return null;
  }

  return (
    <Virtuoso
      ref={virtuosoRef}
      useWindowScroll={true}
      data={commands}
      overscan={800}
      itemContent={(index, command) => {
        // Ensure we have a valid unique key
        const commandKey = command?.name || `command-${index}`;

        return (
          <CommandCard
            key={commandKey}
            data-command-name={command?.name || 'unknown'}
            command={command}
            onScrollToCommand={onScrollToCommand}
          />
        );
      }}
      components={{
        Item: (props) => <div {...props} className="mb-4 sm:mb-6" />
      }}
    />
  );
});
