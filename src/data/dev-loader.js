/**
 * Development Data Loader - Optimized for DevTools Performance
 * 
 * This loader provides a subset of commands in development to prevent
 * Chrome DevTools from freezing due to large dataset processing.
 */

// Only load a subset in development to prevent DevTools freezing
const isDevelopment = import.meta.env.MODE === 'development';

export async function loadCommands() {
  if (isDevelopment) {
    // Load only essential commands for development to prevent DevTools freeze
    const module = await import('./chunks/system.js');
    const systemCommands = module.systemCommands || [];
    
    const coreModule = await import('./chunks/shell.js');
    const shellCommands = coreModule.shellCommands || [];
    
    console.log('🚀 Development Mode: Loaded reduced dataset for DevTools performance');
    return [...systemCommands.slice(0, 50), ...shellCommands.slice(0, 50)];
  }
  
  // Production: Load full dataset
  const module = await import('./commands.js');
  return module.commands || module.default;
}
