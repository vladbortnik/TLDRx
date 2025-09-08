#!/usr/bin/env node

/**
 * Script to parse and split the massive commands.js file into category-based chunks.
 * This uses Node.js to properly parse the JavaScript file.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import the commands directly
import { commands } from './src/data/commands.js';

console.log(`Successfully loaded ${commands.length} commands`);

// Group commands by category
const categories = {};
for (const cmd of commands) {
    const category = cmd.category || 'uncategorized';
    if (!categories[category]) {
        categories[category] = [];
    }
    categories[category].push(cmd);
}

console.log(`Found ${Object.keys(categories).length} categories:`);
for (const [cat, cmds] of Object.entries(categories)) {
    console.log(`  ${cat}: ${cmds.length} commands`);
}

/**
 * Split large categories into subcategories
 */
function splitLargeCategory(commands, category, maxCommandsPerFile = 100) {
    if (commands.length <= maxCommandsPerFile) {
        return { [category]: commands };
    }
    
    // For development category, split by common patterns
    if (category === "development") {
        const subcategories = {
            "development-web": [],
            "development-database": [],
            "development-containers": [],
            "development-languages": [],
            "development-tools": [],
            "development-git": [],
            "development-build": []
        };
        
        for (const cmd of commands) {
            const name = (cmd.name || '').toLowerCase();
            const description = (cmd.description || '').toLowerCase();
            
            // Categorize by command name and description
            if (['web', 'http', 'api', 'rest', 'server', 'nginx', 'apache'].some(term => name.includes(term) || description.includes(term))) {
                subcategories["development-web"].push(cmd);
            } else if (['sql', 'database', 'db', 'mongo', 'postgres', 'mysql', 'redis'].some(term => name.includes(term) || description.includes(term))) {
                subcategories["development-database"].push(cmd);
            } else if (['docker', 'container', 'kubernetes', 'k8s', 'helm'].some(term => name.includes(term) || description.includes(term))) {
                subcategories["development-containers"].push(cmd);
            } else if (['git', 'github', 'gitlab', 'commit', 'branch'].some(term => name.includes(term) || description.includes(term))) {
                subcategories["development-git"].push(cmd);
            } else if (['build', 'compile', 'maven', 'gradle', 'make', 'cmake', 'ant'].some(term => name.includes(term) || description.includes(term))) {
                subcategories["development-build"].push(cmd);
            } else if (['python', 'node', 'npm', 'php', 'java', 'ruby', 'go'].some(term => name.includes(term) || description.includes(term))) {
                subcategories["development-languages"].push(cmd);
            } else {
                subcategories["development-tools"].push(cmd);
            }
        }
        
        // Remove empty subcategories
        return Object.fromEntries(
            Object.entries(subcategories).filter(([_, cmds]) => cmds.length > 0)
        );
    }
    
    // For other large categories, split numerically
    const chunks = {};
    const chunkSize = maxCommandsPerFile;
    for (let i = 0; i < commands.length; i += chunkSize) {
        const chunkNum = Math.floor(i / chunkSize) + 1;
        const chunkName = `${category}-${chunkNum}`;
        chunks[chunkName] = commands.slice(i, i + chunkSize);
    }
    
    return chunks;
}

/**
 * Write a chunk file
 */
function writeChunkFile(category, categoryCommands, outputDir) {
    // Handle special category names for filenames
    const filename = category.replace(/\s+/g, '-').toLowerCase();
    const filepath = path.join(outputDir, `${filename}.js`);
    
    // Calculate file header
    const header = `/**
 * TL;DRx Commands Database - ${category.replace(/^(\w)/, c => c.toUpperCase()).replace(/-/g, ' ')} Category
 *
 * Contains ${categoryCommands.length} commands related to ${category.replace('-', ' ')}.
 * Generated from the original commands.js file.
 *
 * @fileoverview ${category.replace(/^(\w)/, c => c.toUpperCase()).replace(/-/g, ' ')} category commands for TL;DRx
 * @category ${category}
 * @commands ${categoryCommands.length}
 */

/**
 * ${category.replace(/^(\w)/, c => c.toUpperCase()).replace(/-/g, ' ')} category commands
 * @type {Array<Object>}
 */
const ${filename.replace(/-/g, '_')}Commands = `;
    
    const footer = `;

export const ${filename.replace(/-/g, '_')}Commands = ${filename.replace(/-/g, '_')}Commands;
export default ${filename.replace(/-/g, '_')}Commands;
`;
    
    // Write the file
    const content = header + JSON.stringify(categoryCommands, null, 4) + footer;
    
    fs.writeFileSync(filepath, content, 'utf8');
    console.log(`Created ${filepath} with ${categoryCommands.length} commands`);
}

// Main execution
const outputDir = path.join(__dirname, 'src', 'data', 'chunks');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Split categories and write files
for (const [category, categoryCommands] of Object.entries(categories)) {
    if (categoryCommands.length > 100) {
        // Split large categories
        const subcategories = splitLargeCategory(categoryCommands, category, 100);
        for (const [subcat, subcmds] of Object.entries(subcategories)) {
            writeChunkFile(subcat, subcmds, outputDir);
        }
    } else {
        writeChunkFile(category, categoryCommands, outputDir);
    }
}

// Create an index file that imports all chunks
const chunkFiles = fs.readdirSync(outputDir).filter(file => file.endsWith('.js'));

const indexContent = `/**
 * TL;DRx Commands Database - Index
 * 
 * This file combines all command chunks back into a single export
 * maintaining the same interface as the original commands.js file.
 * 
 * Generated chunks: ${chunkFiles.length}
 * Total commands: ${commands.length}
 */

// Import all chunk files
${chunkFiles.map(file => {
    const varName = path.basename(file, '.js').replace(/-/g, '_') + 'Commands';
    return `import ${varName} from './${file}';`;
}).join('\n')}

// Combine all commands into a single array
const commandsDatabase = [
${chunkFiles.map(file => {
    const varName = path.basename(file, '.js').replace(/-/g, '_') + 'Commands';
    return `    ...${varName}`;
}).join(',\n')}
];

export const commands = commandsDatabase;
export default commandsDatabase;
`;

fs.writeFileSync(path.join(outputDir, 'index.js'), indexContent, 'utf8');
console.log(`Created index.js combining all ${chunkFiles.length} chunk files`);

console.log('\\nSplit completed successfully!');
console.log(`\\nGenerated files:`);
chunkFiles.forEach(file => {
    console.log(`  - chunks/${file}`);
});
console.log(`  - chunks/index.js`);