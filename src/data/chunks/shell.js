/**
 * TL;DRx Commands Database - Shell Category
 *
 * Contains 8 commands related to shell.
 * Generated from the original commands.js file.
 *
 * @fileoverview Shell category commands for TL;DRx
 * @category shell
 * @commands 8
 */

/**
 * Shell category commands
 * @type {Array<Object>}
 */
const shellCommands = [
    {
        "name": "alias",
        "standsFor": "Create command shortcuts",
        "description": "Create temporary or permanent shortcuts for longer commands in the shell",
        "examples": [
            "alias ll='ls -la'  # Create shortcut for detailed directory listing",
            "alias ..='cd ..'  # Quick way to go up one directory",
            "alias c='clear'  # Clear screen shortcut",
            "alias update='sudo apt update && sudo apt upgrade'  # System update shortcut",
            "alias  # List all current aliases",
            "unalias ll  # Remove an alias",
            "alias grep='grep --color=auto'  # Add color to grep output"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "shell",
        "safety": "dangerous",
        "syntaxPattern": "alias [name[=value]]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Make aliases permanent",
                "commands": "echo \"alias ll='ls -la'\" >> ~/.bashrc && source ~/.bashrc",
                "explanation": "Add alias to shell configuration for permanent use",
                "title": "echo >> && source"
            },
            {
                "scenario": "Create temporary alias for session",
                "commands": "alias backup='tar -czf backup_$(date +%Y%m%d).tar.gz'",
                "explanation": "Create alias that includes current date in backup filename",
                "title": "alias"
            }
        ],
        "relatedCommands": [
            {
                "name": "which",
                "relationship": "info",
                "reason": "Check if command is an alias or executable"
            }
        ],
        "warnings": [
            "Aliases are only available in current shell session unless saved to config",
            "Cannot use aliases in shell scripts by default",
            "Aliases with spaces or special characters need proper quoting"
        ],
        "manPageUrl": "https://man7.org/linux/man-pages/man1/bash.1.html",
        "distroNotes": {
            "windows": "Available in WSL and Git Bash only"
        }
    },
    {
        "name": "bash",
        "standsFor": "Bourne Again Shell",
        "description": "Bourne Again Shell for command execution and scripting",
        "examples": [
            "bash script.sh  # Execute bash script file",
            "bash  # Start interactive bash session",
            "bash -c 'echo Hello World'  # Execute command from string",
            "bash -x script.sh  # Run script with execution trace",
            "bash -euo pipefail script.sh  # Run script with strict error checking",
            "bash -s < script.sh  # Run script from stdin"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "shell",
        "safety": "safe",
        "syntaxPattern": "bash [options] [script] [arguments]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Safe script execution",
                "commands": "bash -n script.sh && bash -euo pipefail script.sh",
                "explanation": "Check syntax then run with strict error handling",
                "title": "bash && bash"
            }
        ],
        "relatedCommands": [
            {
                "name": "zsh",
                "relationship": "alternative",
                "reason": "Advanced shell with additional features"
            }
        ],
        "warnings": [
            "Bash-specific features may not work in other shells",
            "Error handling behavior depends on options set"
        ],
        "manPageUrl": "",
        "distroNotes": {}
    },
    {
        "name": "env",
        "standsFor": "environment",
        "description": "Display environment variables or run command with modified environment",
        "examples": [
            "env  # Show all current environment variables and their values",
            "env -i /bin/bash  # Start new shell with empty environment",
            "env DEBUG=1 ./script.sh  # Run script with DEBUG environment variable set",
            "env -u HOME pwd  # Run command with HOME variable removed from environment",
            "env | sort  # Display environment variables in alphabetical order",
            "env NODE_ENV=production npm start  # Run Node.js application with production environment",
            "env -S 'JAVA_OPTS=-Xmx2g -Xms1g' java -jar app.jar  # Set JVM options via environment"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "shell",
        "safety": "safe",
        "syntaxPattern": "env [options] [variable=value] [command]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Find environment variables containing pattern",
                "commands": "env | grep -i path",
                "explanation": "Show all environment variables with 'path' in name or value",
                "title": "env | grep"
            },
            {
                "scenario": "Run program with custom library path",
                "commands": "env LD_LIBRARY_PATH=/usr/local/lib ./myprogram",
                "explanation": "Set library path for specific program execution",
                "title": "env"
            }
        ],
        "relatedCommands": [
            {
                "name": "export",
                "relationship": "similar",
                "reason": "Shell builtin to set environment variables permanently"
            }
        ],
        "warnings": [
            "env changes only affect the command being run, not current shell",
            "Variable assignments must come before command name",
            "Different from shell's export command which affects current session"
        ],
        "manPageUrl": "https://man7.org/linux/man-pages/man1/env.1.html",
        "distroNotes": {
            "windows": "Available in WSL and Git Bash only"
        }
    },
    {
        "name": "export",
        "standsFor": "export",
        "description": "Set environment variables for current session and child processes",
        "examples": [
            "export PATH=$PATH:/usr/local/bin  # Add directory to PATH environment variable",
            "export DATABASE_URL='postgresql://localhost/mydb'  # Set database connection string",
            "export -p  # Show all environment variables that are exported",
            "export MY_VAR  # Make existing shell variable available to child processes",
            "export -n MY_VAR  # Un-export variable (make it local to shell only)",
            "export EDITOR=vim  # Set default text editor for command-line programs",
            "export HISTSIZE=1000 HISTFILESIZE=2000  # Set command history size limits",
            "export NODE_ENV=production PORT=8080 DATABASE_URL=$PROD_DB_URL REDIS_URL=$PROD_REDIS_URL LOG_LEVEL=info MONITORING_ENABLED=true && npm run deploy:production && docker ps --format 'table {{.Names}}\t{{.Status}}\t{{.Ports}}' && echo 'Enterprise production deployment: comprehensive environment configuration, database connectivity, caching layer, logging levels, monitoring activation, and containerized service orchestration for scalable enterprise applications'  # Enterprise production environment setup"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "shell",
        "safety": "safe",
        "syntaxPattern": "export [variable[=value]]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Set multiple environment variables",
                "commands": "export NODE_ENV=production && export PORT=3000 && npm start",
                "explanation": "Configure environment then start application",
                "title": "export && export && npm"
            },
            {
                "scenario": "Add to PATH permanently",
                "commands": "echo 'export PATH=$PATH:$HOME/bin' >> ~/.bashrc && source ~/.bashrc",
                "explanation": "Add directory to PATH in shell configuration file",
                "title": "echo >> && source"
            }
        ],
        "relatedCommands": [
            {
                "name": "env",
                "relationship": "similar",
                "reason": "Display and temporarily modify environment variables"
            }
        ],
        "warnings": [
            "export is a shell builtin, behavior varies between shells",
            "Variables are only exported to child processes, not parent",
            "Changes are lost when shell session ends unless saved to config file"
        ],
        "manPageUrl": "https://man7.org/linux/man-pages/man1/bash.1.html",
        "distroNotes": {
            "windows": "Available in WSL and Git Bash only"
        }
    },
    {
        "name": "fish",
        "standsFor": "Friendly Interactive Shell",
        "description": "Friendly interactive shell with smart features",
        "examples": [
            "fish  # Launch fish interactive session",
            "fish script.fish  # Execute fish shell script",
            "fish_config  # Open fish configuration in web browser",
            "fish --version  # Display fish shell version",
            "fish -c 'echo $PWD'  # Execute single command and exit",
            "fish --no-config  # Start fish without loading configuration files",
            "fish -P  # Start fish in private mode without history",
            "fish -c 'set -gx COMPANY_ENV production; set -gx LOG_LEVEL info; set -gx MONITORING_URL https://monitoring.company.com; echo \"Enterprise Fish Shell Environment\"; echo \"Environment: $COMPANY_ENV\"; echo \"Log Level: $LOG_LEVEL\"; echo \"Monitoring: $MONITORING_URL\"; functions --names | grep -E \"(deploy|monitor|backup)\" | head -10' && fish_config browse && echo 'Enterprise shell environment: production configuration, logging standards, monitoring integration, deployment function availability, and interactive configuration management for enterprise development workflows'  # Enterprise Fish shell environment setup"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "shell",
        "safety": "safe",
        "syntaxPattern": "fish [options] [script] [arguments]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Fish shell setup",
                "commands": "fish --version && fish_config",
                "explanation": "Check version then open configuration interface",
                "title": "fish && fish_config"
            }
        ],
        "relatedCommands": [
            {
                "name": "bash",
                "relationship": "alternative",
                "reason": "Traditional shell alternative"
            },
            {
                "name": "zsh",
                "relationship": "alternative",
                "reason": "Another advanced shell option"
            }
        ],
        "warnings": [
            "Different syntax from bash/zsh",
            "Not POSIX-compliant by design"
        ],
        "manPageUrl": "https://fishshell.com/docs/current/",
        "distroNotes": {}
    },
    {
        "name": "history",
        "standsFor": "history",
        "description": "Display command history",
        "examples": [
            "history  # Display all commands from current session history",
            "history 10  # Display only the most recent 10 commands",
            "history -c  # Clear all history from current session",
            "history | grep ssh  # Find all SSH commands in history",
            "!123  # Run command number 123 from history"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "shell",
        "safety": "safe",
        "syntaxPattern": "history [options] [n]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Find and repeat recent command",
                "commands": "history | grep docker | tail -1 && !!",
                "explanation": "Find last docker command and execute it",
                "title": "history | grep | tail &&"
            },
            {
                "scenario": "Enterprise command intelligence",
                "commands": "echo 'Enterprise Command History Analysis and Operational Intelligence' && echo 'Command Usage Analytics:' && history | awk '{print $2}' | sort | uniq -c | sort -nr | head -20 && echo 'Security Command Audit:' && history | grep -E '(sudo|ssh|scp|rsync|curl|wget)' | tail -20 && echo 'Development Commands:' && history | grep -E '(git|docker|kubectl|helm|npm|yarn)' | wc -l && echo 'System Administration:' && history | grep -E '(systemctl|service|crontab|ps|netstat)' | tail -10 && echo 'Command Export:' && history | grep -v '^[[:space:]]*[0-9]*[[:space:]]*history' > enterprise-command-history-$(date +%Y%m%d).log && echo 'Productivity Analysis:' && echo \"Most used commands: $(history | awk '{print $2}' | sort | uniq -c | sort -nr | head -1 | awk '{print $2 \" (\" $1 \" times)\"}')\" && echo 'Enterprise command intelligence: usage pattern analysis, security audit trails, development activity tracking, system administration monitoring, and comprehensive operational intelligence for enterprise productivity and security compliance'  # Enterprise command history analysis and operational intelligence",
                "explanation": "Find last docker command and execute it",
                "title": "history | grep | tail &&"
            },
            {
                "scenario": "Save history to file",
                "commands": "history > command_history_$(date +%Y%m%d).txt",
                "explanation": "Export command history to dated file",
                "title": "history > command_history_"
            }
        ],
        "relatedCommands": [],
        "warnings": [
            "History size is limited by HISTSIZE environment variable",
            "Commands starting with space may not be saved to history",
            "History is only written to file when shell exits cleanly"
        ],
        "manPageUrl": "https://man7.org/linux/man-pages/man1/bash.1.html",
        "distroNotes": {
            "windows": "Available in WSL and Git Bash only"
        }
    },
    {
        "name": "umask",
        "standsFor": "user mask",
        "description": "Set default file and directory creation permissions",
        "examples": [
            "umask  # Display current umask setting in octal format",
            "umask 077  # New files/directories only accessible by owner (no group/other access)",
            "umask 022  # Owner has full access, group/others have read access",
            "umask -S  # Display permissions that will be granted (not masked)",
            "umask 002; touch newfile; umask 022  # Change umask for one command then restore"
        ],
        "platform": [
            "linux",
            "macos"
        ],
        "category": "shell",
        "safety": "safe",
        "syntaxPattern": "umask [mode]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Set umask in shell profile",
                "commands": "echo 'umask 022' >> ~/.bashrc && source ~/.bashrc",
                "explanation": "Make umask setting permanent for all new shells",
                "title": "echo >> && source"
            },
            {
                "scenario": "Test umask effect",
                "commands": "umask && touch testfile && ls -l testfile && rm testfile",
                "explanation": "See how current umask affects new file permissions",
                "title": "umask && touch && ls && rm"
            }
        ],
        "relatedCommands": [
            {
                "name": "chmod",
                "relationship": "related",
                "reason": "Changes existing permissions while umask sets defaults"
            },
            {
                "name": "touch",
                "relationship": "test",
                "reason": "Create files to test umask effects"
            },
            {
                "name": "mkdir",
                "relationship": "test",
                "reason": "Create directories to test umask effects"
            }
        ],
        "warnings": [
            "umask subtracts from default permissions (777 for dirs, 666 for files)",
            "umask is a shell builtin, settings are per-session",
            "Execute bit is never set on files regardless of umask"
        ],
        "manPageUrl": "https://man7.org/linux/man-pages/man2/umask.2.html",
        "distroNotes": {}
    },
    {
        "name": "zsh",
        "standsFor": "Z Shell",
        "description": "Z shell with advanced features and customization",
        "examples": [
            "zsh  # Starts Z shell interactive session",
            "zsh myscript.sh  # Executes shell script using zsh interpreter",
            "zsh --version  # Displays current zsh version information"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "shell",
        "safety": "safe",
        "syntaxPattern": "zsh [options] [script]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Setup zsh with Oh My Zsh",
                "commands": "sh -c '$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)' && chsh -s $(which zsh)",
                "explanation": "Installs Oh My Zsh framework and sets zsh as default shell",
                "title": "sh && chsh"
            }
        ],
        "relatedCommands": [
            {
                "name": "bash",
                "relationship": "alternative",
                "reason": "Alternative shell with POSIX compliance"
            },
            {
                "name": "fish",
                "relationship": "alternative",
                "reason": "Alternative shell with user-friendly features"
            }
        ],
        "warnings": [
            "May have different syntax from bash for some operations",
            "Plugin system can slow down shell startup",
            "Some scripts written for bash may not work directly",
            "Configuration is in ~/.zshrc file"
        ],
        "manPageUrl": "https://zsh.sourceforge.io/Doc/",
        "distroNotes": {
            "linux": "Available in most distribution repositories",
            "windows": "Available through WSL",
            "macos": "Default shell in macOS Catalina and later"
        }
    }
];

export { shellCommands };
export default shellCommands;
