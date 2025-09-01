// Data adapter for Enhanced Command Objects
// Convert current TLDRx data format to Tool-2 Enhanced Command Object format

/**
 * Converts current command data to Tool-2 Enhanced Command Object format
 * @param {Object} currentCommand - Current command data structure
 * @returns {Object} Enhanced Command Object for Tool-2 UI
 */
export const adaptToEnhancedFormat = (currentCommand) => {
  // Convert platform array to expected format
  const platformMapping = {
    'linux': { id: 'linux', name: 'Linux', color: '#FFA500', icon: '🐧' },
    'mac': { id: 'mac', name: 'macOS', color: '#007ACC', icon: '🍎' },
    'windows': { id: 'windows', name: 'Windows', color: '#00BCF2', icon: '🪟' },
    'bsd': { id: 'bsd', name: 'BSD', color: '#CC0000', icon: '👹' }
  };
  
  const platforms = currentCommand.platform ? 
    currentCommand.platform.map(p => platformMapping[p] || { id: p, name: p, color: '#666', icon: '💻' }) :
    [{ id: 'unix', name: 'Unix/Linux', color: '#FFA500', icon: '🐧' }];

  // Convert category to expected format
  const categoryMapping = {
    'file-system': { name: 'File System', icon: '📁' },
    'package-management': { name: 'Package Management', icon: '📦' },
    'networking': { name: 'Networking', icon: '🌐' },
    'text-processing': { name: 'Text Processing', icon: '📝' },
    'system': { name: 'System', icon: '⚙️' },
    'development': { name: 'Development', icon: '💻' },
    'search': { name: 'Search', icon: '🔍' },
    'shell': { name: 'Shell', icon: '🐚' },
    'automation': { name: 'Automation', icon: '🤖' }
  };
  
  const categories = currentCommand.category ? 
    [categoryMapping[currentCommand.category] || { name: currentCommand.category, icon: '🔧' }] :
    [{ name: 'General', icon: '🔧' }];

  return {
    name: currentCommand.name || '',
    subtitle: currentCommand.standsFor || currentCommand.subtitle || '',
    description: currentCommand.description || '',
    safety: currentCommand.safety || 'safe',
    platform: platforms,
    categories: categories,
    syntaxPattern: currentCommand.syntax || currentCommand.syntaxPattern || `${currentCommand.name} [options]`,
    commonFlags: currentCommand.commonFlags || currentCommand.flags || [],
    prerequisites: currentCommand.prerequisites || [],
    notes: currentCommand.notes || [],
    warnings: currentCommand.warnings || [],
    examples: currentCommand.examples || [],
    relatedCommands: currentCommand.relatedCommands || currentCommand.related || [],
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
