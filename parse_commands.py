#!/usr/bin/env python3
"""
Script to parse and split the massive commands.js file into category-based chunks.
"""

import re
import json
import os
from typing import Dict, List, Any

def extract_js_array_objects(file_path: str) -> List[Dict[str, Any]]:
    """Extract JavaScript objects from the commands array."""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find the array start
    array_start = content.find('const commandsDatabase = [')
    if array_start == -1:
        raise ValueError("Could not find commandsDatabase array")
    
    # Find the array end - looking for "];\n\nexport"
    array_end = content.find('];\n\nexport const commands')
    if array_end == -1:
        raise ValueError("Could not find end of commandsDatabase array")
    
    # Extract the array content
    array_content = content[array_start:array_end + 1]
    
    # Remove the const declaration part
    array_content = array_content.replace('const commandsDatabase = [', '[')
    
    # Parse as JSON (with some JavaScript-specific fixes)
    # Replace single quotes with double quotes (if any)
    # Note: This is a simplified approach - for production use a proper JS parser
    
    commands = []
    
    # Split by objects - look for pattern "}, {"
    object_pattern = r'\{\s*"name":[^}]+?\}(?=\s*,\s*\{|\s*\])'
    matches = re.findall(object_pattern, array_content, re.DOTALL)
    
    if not matches:
        # Try a different approach - find individual command objects
        # Look for complete object patterns
        pattern = r'\{\s*"name":\s*"[^"]+",.*?\}'
        matches = re.findall(pattern, array_content, re.DOTALL)
    
    print(f"Found {len(matches)} command objects using regex")
    
    # If regex didn't work well, let's use a different approach
    # Let's manually parse the bracket structure
    if len(matches) < 400:  # We expect 500 commands
        commands = parse_js_objects_manually(array_content)
    else:
        # Process the regex matches
        for match in matches:
            try:
                # Clean up the match and convert to valid JSON
                cleaned = clean_js_object(match)
                cmd = json.loads(cleaned)
                commands.append(cmd)
            except json.JSONDecodeError as e:
                print(f"Failed to parse command object: {e}")
                print(f"Object: {match[:200]}...")
                continue
    
    return commands

def parse_js_objects_manually(array_content: str) -> List[Dict[str, Any]]:
    """Manually parse JavaScript objects by counting brackets."""
    commands = []
    
    # Remove the outer array brackets
    content = array_content.strip()
    if content.startswith('['):
        content = content[1:]
    if content.endswith('];'):
        content = content[:-2]
    elif content.endswith(']'):
        content = content[:-1]
    
    i = 0
    while i < len(content):
        # Skip whitespace
        while i < len(content) and content[i].isspace():
            i += 1
        
        if i >= len(content):
            break
        
        # Expect a '{'
        if content[i] != '{':
            i += 1
            continue
        
        # Find the matching '}'
        bracket_count = 0
        start = i
        
        while i < len(content):
            if content[i] == '{':
                bracket_count += 1
            elif content[i] == '}':
                bracket_count -= 1
                if bracket_count == 0:
                    # Found the end of this object
                    obj_str = content[start:i+1]
                    try:
                        cleaned = clean_js_object(obj_str)
                        cmd = json.loads(cleaned)
                        commands.append(cmd)
                    except json.JSONDecodeError as e:
                        print(f"Failed to parse object: {e}")
                        print(f"Object start: {obj_str[:100]}...")
                    break
            i += 1
        
        # Skip the comma if present
        i += 1
        while i < len(content) and content[i] in ', \n\t':
            i += 1
    
    return commands

def clean_js_object(obj_str: str) -> str:
    """Clean JavaScript object string to make it valid JSON."""
    # This is a simplified cleaner - for production, use a proper JS-to-JSON parser
    
    # Remove trailing commas
    obj_str = re.sub(r',(\s*[}\]])', r'\1', obj_str)
    
    # Ensure all keys are quoted
    obj_str = re.sub(r'([{,]\s*)([a-zA-Z_][a-zA-Z0-9_]*)\s*:', r'\1"\2":', obj_str)
    
    return obj_str

def write_chunk_file(category: str, commands: List[Dict[str, Any]], output_dir: str):
    """Write commands for a category to a chunk file."""
    # Handle special category names for filenames
    filename = category.replace('-', '-').replace(' ', '-').lower()
    filepath = os.path.join(output_dir, f"{filename}.js")
    
    # Calculate file header
    header = f'''/**
 * TL;DRx Commands Database - {category.title().replace('-', ' ')} Category
 *
 * Contains {len(commands)} commands related to {category.replace('-', ' ')}.
 * Generated from the original commands.js file.
 *
 * @fileoverview {category.title().replace('-', ' ')} category commands for TL;DRx
 * @category {category}
 * @commands {len(commands)}
 */

/**
 * {category.title().replace('-', ' ')} category commands
 * @type {{Array<Object>}}
 */
const {filename.replace('-', '_')}Commands = '''
    
    footer = f''';

export const {filename.replace('-', '_')}Commands = {filename.replace('-', '_')}Commands;
export default {filename.replace('-', '_')}Commands;
'''
    
    # Write the file
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(header)
        f.write('[\n')
        
        for i, cmd in enumerate(commands):
            f.write('    ')
            json.dump(cmd, f, indent=4, separators=(',', ': '), ensure_ascii=False)
            if i < len(commands) - 1:
                f.write(',')
            f.write('\n')
        
        f.write(']')
        f.write(footer)
    
    print(f"Created {filepath} with {len(commands)} commands")

def split_large_category(commands: List[Dict[str, Any]], category: str, max_commands_per_file: int = 100) -> Dict[str, List[Dict[str, Any]]]:
    """Split a large category into multiple subcategories."""
    if len(commands) <= max_commands_per_file:
        return {category: commands}
    
    # For development category, split by common patterns
    if category == "development":
        subcategories = {
            "development-web": [],
            "development-database": [],
            "development-containers": [],
            "development-languages": [],
            "development-tools": [],
            "development-git": [],
            "development-build": []
        }
        
        for cmd in commands:
            name = cmd.get('name', '').lower()
            description = cmd.get('description', '').lower()
            
            # Categorize by command name and description
            if any(term in name or term in description for term in ['web', 'http', 'api', 'rest', 'server', 'nginx', 'apache']):
                subcategories["development-web"].append(cmd)
            elif any(term in name or term in description for term in ['sql', 'database', 'db', 'mongo', 'postgres', 'mysql', 'redis']):
                subcategories["development-database"].append(cmd)
            elif any(term in name or term in description for term in ['docker', 'container', 'kubernetes', 'k8s', 'helm']):
                subcategories["development-containers"].append(cmd)
            elif any(term in name or term in description for term in ['git', 'github', 'gitlab', 'commit', 'branch']):
                subcategories["development-git"].append(cmd)
            elif any(term in name or term in description for term in ['build', 'compile', 'maven', 'gradle', 'make', 'cmake', 'ant']):
                subcategories["development-build"].append(cmd)
            elif any(term in name or term in description for term in ['python', 'node', 'npm', 'php', 'java', 'ruby', 'go']):
                subcategories["development-languages"].append(cmd)
            else:
                subcategories["development-tools"].append(cmd)
        
        # Remove empty subcategories
        return {k: v for k, v in subcategories.items() if v}
    
    # For other large categories, split numerically
    chunks = {}
    chunk_size = max_commands_per_file
    for i in range(0, len(commands), chunk_size):
        chunk_num = i // chunk_size + 1
        chunk_name = f"{category}-{chunk_num}"
        chunks[chunk_name] = commands[i:i + chunk_size]
    
    return chunks

def main():
    input_file = "/Users/vladbortnik/Development/TLDRx-generic/refactor-app-jsx/src/data/commands.js"
    output_dir = "/Users/vladbortnik/Development/TLDRx-generic/refactor-app-jsx/src/data/chunks"
    
    print("Parsing commands.js file...")
    commands = extract_js_array_objects(input_file)
    print(f"Successfully extracted {len(commands)} commands")
    
    # Group commands by category
    categories = {}
    for cmd in commands:
        category = cmd.get('category', 'uncategorized')
        if category not in categories:
            categories[category] = []
        categories[category].append(cmd)
    
    print(f"Found {len(categories)} categories:")
    for cat, cmds in categories.items():
        print(f"  {cat}: {len(cmds)} commands")
    
    # Split categories and write files
    for category, category_commands in categories.items():
        if len(category_commands) > 100:
            # Split large categories
            subcategories = split_large_category(category_commands, category, 100)
            for subcat, subcmds in subcategories.items():
                write_chunk_file(subcat, subcmds, output_dir)
        else:
            write_chunk_file(category, category_commands, output_dir)
    
    print("Split completed successfully!")

if __name__ == "__main__":
    main()