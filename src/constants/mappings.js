/**
 * Platform and Category mapping constants
 * Used to transform string identifiers to UI objects throughout the app
 */

export const PLATFORM_MAPPINGS = {
  'linux': { id: 'linux', name: 'Linux', color: '#FFA500', icon: '🐧' },
  'macos': { id: 'macos', name: 'macOS', color: '#007ACC', icon: '🍎' },
  // 'mac': { id: 'mac', name: 'macOS', color: '#007ACC', icon: '🍎' }, // Handle legacy 'mac'
  'windows': { id: 'windows', name: 'Windows', color: '#00BCF2', icon: '🪟' },
  // 'bsd': { id: 'bsd', name: 'BSD', color: '#CC0000', icon: '👹' }
};

export const CATEGORY_MAPPINGS = {
  'file-operations': { name: 'File Operations', icon: '📁' },
  // 'file-system': { name: 'File System', icon: '📁' }, // Handle alternative naming
  'package-management': { name: 'Package Management', icon: '📦' },
  'networking': { name: 'Networking', icon: '🌐' },
  'text-processing': { name: 'Text Processing', icon: '📝' },
  'system': { name: 'System', icon: '⚙️' },
  'development': { name: 'Development', icon: '💻' },
  // 'search': { name: 'Search', icon: '🔍' },
  'shell': { name: 'Shell', icon: '🐚' },
  'automation': { name: 'Automation', icon: '🤖' },
  'security': { name: 'Security', icon: '🔒' },
  'containers': { name: 'Containers', icon: '📦' },
  'data-processing': { name: 'Data Processing', icon: '📊' }
};

/**
 * Transform a platform string to platform object
 * @param {string} platformId - Platform identifier
 * @returns {Object} Platform object with id, name, color, icon
 */
export const getPlatformMapping = (platformId) => {
  return PLATFORM_MAPPINGS[platformId] || { 
    id: platformId, 
    name: platformId.charAt(0).toUpperCase() + platformId.slice(1), 
    color: '#666', 
    icon: '💻' 
  };
};

/**
 * Transform a category string to category object
 * @param {string} categoryId - Category identifier
 * @returns {Object} Category object with name and icon
 */
export const getCategoryMapping = (categoryId) => {
  return CATEGORY_MAPPINGS[categoryId] || { 
    name: categoryId.charAt(0).toUpperCase() + categoryId.slice(1), 
    icon: '🔧' 
  };
};