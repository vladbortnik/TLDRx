// Data adapter for Enhanced Command Objects
// Convert current TLDRx data format to Tool-2 Enhanced Command Object format

/**
 * Converts current command data to Tool-2 Enhanced Command Object format
 * @param {Object} currentCommand - Current command data structure
 * @returns {Object} Enhanced Command Object for Tool-2 UI
 */
export const adaptToEnhancedFormat = (currentCommand) => {
  return {
    name: currentCommand.name || '',
    subtitle: currentCommand.standsFor || currentCommand.subtitle || '',
    description: currentCommand.description || '',
    safety: currentCommand.safety || 'safe',
    platform: currentCommand.platforms || [
      { id: 'unix', name: 'Unix/Linux', color: '#FFA500', icon: '🐧' }
    ],
    categories: currentCommand.categories || [
      { name: 'General', icon: '🔧' }
    ],
    syntaxPattern: currentCommand.syntax || currentCommand.syntaxPattern || `${currentCommand.name} [options]`,
    commonFlags: currentCommand.flags || currentCommand.commonFlags || [],
    prerequisites: currentCommand.prerequisites || [],
    notes: currentCommand.notes || [],
    warnings: currentCommand.warnings || [],
    examples: currentCommand.examples || [],
    relatedCommands: currentCommand.related || currentCommand.relatedCommands || [],
    manPageUrl: currentCommand.manPageUrl || `https://man7.org/linux/man-pages/man1/${currentCommand.name}.1.html`
  };
};

/**
 * Converts Tool-2 Enhanced Command Object back to current format for compatibility
 * @param {Object} enhancedCommand - Tool-2 Enhanced Command Object
 * @returns {Object} Current TLDRx command format
 */
export const adaptFromEnhancedFormat = (enhancedCommand) => {
  return {
    name: enhancedCommand.name,
    standsFor: enhancedCommand.subtitle,
    description: enhancedCommand.description,
    safety: enhancedCommand.safety,
    platforms: enhancedCommand.platform,
    categories: enhancedCommand.categories,
    syntax: enhancedCommand.syntaxPattern,
    flags: enhancedCommand.commonFlags,
    examples: enhancedCommand.examples,
    related: enhancedCommand.relatedCommands
  };
};

/**
 * Validates Enhanced Command Object structure
 * @param {Object} command - Command object to validate
 * @returns {boolean} True if valid Enhanced Command Object
 */
export const validateEnhancedFormat = (command) => {
  const requiredFields = ['name', 'description', 'safety', 'platform'];
  return requiredFields.every(field => command.hasOwnProperty(field));
};
