/**
 * TL;DRx Commands Database - Index
 * 
 * This file combines all command chunks back into a single export
 * maintaining the same interface as the original commands.js file.
 * 
 * Generated chunks: 17
 * Total commands: 500
 */

// Import all chunk files
import automationCommands from './automation.js';
import data_processingCommands from './data-processing.js';
import development_buildCommands from './development-build.js';
import development_containersCommands from './development-containers.js';
import development_databaseCommands from './development-database.js';
import development_gitCommands from './development-git.js';
import development_languagesCommands from './development-languages.js';
import development_toolsCommands from './development-tools.js';
import development_webCommands from './development-web.js';
import file_operationsCommands from './file-operations.js';
import networkingCommands from './networking.js';
import package_managementCommands from './package-management.js';
import securityCommands from './security.js';
import shellCommands from './shell.js';
import systemCommands from './system.js';
import text_processingCommands from './text-processing.js';

// Combine all commands into a single array
const commandsDatabase = [
    ...automationCommands,
    ...data_processingCommands,
    ...development_buildCommands,
    ...development_containersCommands,
    ...development_databaseCommands,
    ...development_gitCommands,
    ...development_languagesCommands,
    ...development_toolsCommands,
    ...development_webCommands,
    ...file_operationsCommands,
    ...networkingCommands,
    ...package_managementCommands,
    ...securityCommands,
    ...shellCommands,
    ...systemCommands,
    ...text_processingCommands
];

export const commands = commandsDatabase;
export default commandsDatabase;
