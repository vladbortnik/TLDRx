/**
 * TL;DRx Commands Database - Text processing Category
 *
 * Contains 27 commands related to text processing.
 * Generated from the original commands.js file.
 *
 * @fileoverview Text processing category commands for TL;DRx
 * @category text-processing
 * @commands 27
 */

/**
 * Text processing category commands
 * @type {Array<Object>}
 */
const text_processingCommands = [
    {
        "name": "awk",
        "standsFor": "Aho, Weinberger, Kernighan",
        "description": "Pattern scanning and data extraction language",
        "examples": [
            "awk '{print $1, $3}' data.txt  # Print first and third columns from space-separated data",
            "awk '{sum += $2} END {print sum}' numbers.txt  # Add up all values in second column",
            "awk '$3 > 100 {print $0}' sales.csv  # Print lines where third column value is greater than 100",
            "awk '/error/ {count++} END {print count}' log.txt  # Count occurrences of 'error' in log file",
            "awk -F',' '{print $1 \" -> \" $2}' input.csv  # Use comma as field separator and format output"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "text-processing",
        "safety": "safe",
        "syntaxPattern": "awk '[pattern] {action}' [file]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Process log files for monitoring",
                "commands": "tail -f access.log | awk '{print $1, $7}' | sort | uniq -c",
                "explanation": "Monitor web access log, show unique IP and URL combinations",
                "title": "tail | awk | sort | uniq"
            },
            {
                "scenario": "Generate reports from CSV data",
                "commands": "awk -F',' '{if($3>threshold) total+=$3} END {print \"Total:\", total}' threshold=1000 data.csv",
                "explanation": "Sum values in CSV where column 3 exceeds threshold",
                "title": "awk > threshold"
            }
        ],
        "relatedCommands": [
            {
                "name": "sed",
                "relationship": "similar",
                "reason": "Both are stream editors, sed for substitution, awk for field processing"
            },
            {
                "name": "cut",
                "relationship": "similar",
                "reason": "Cut extracts columns, awk processes them with logic"
            },
            {
                "name": "grep",
                "relationship": "combo",
                "reason": "Grep finds lines, awk processes the found data"
            }
        ],
        "warnings": [
            "Field numbering starts at 1, not 0",
            "$0 refers to entire line, $NF to last field",
            "String comparisons need quotes: $1 == \"text\""
        ],
        "manPageUrl": "https://man7.org/linux/man-pages/man1/awk.1p.html",
        "distroNotes": {
            "windows": "Available in WSL or Git Bash"
        }
    },
    {
        "name": "banner",
        "standsFor": "Banner",
        "description": "Print large banner text",
        "examples": [
            "banner 'HELLO'  # Create simple block letter banner",
            "banner 'SYSTEM READY'  # Display system status message",
            "banner 'WARNING'  # Create attention-grabbing warning banner"
        ],
        "platform": [
            "linux",
            "macos"
        ],
        "category": "text-processing",
        "safety": "safe",
        "syntaxPattern": "banner [text]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "System startup message",
                "commands": "banner 'BOOTING' && echo 'System initialization in progress...'",
                "explanation": "Display boot banner with status message",
                "title": "banner && echo"
            }
        ],
        "relatedCommands": [
            {
                "name": "figlet",
                "relationship": "advanced-alternative",
                "reason": "figlet provides more fonts and formatting options"
            }
        ],
        "warnings": [
            "Simpler than figlet but fewer options",
            "May not be available on all systems",
            "Typically uses hash (#) characters for text"
        ],
        "manPageUrl": "",
        "distroNotes": {}
    },
    {
        "name": "basename",
        "standsFor": "base name",
        "description": "Extract filename from path",
        "examples": [
            "basename /path/to/file.txt  # Extract 'file.txt' from full path",
            "basename /path/to/file.txt .txt  # Get filename without extension: 'file'",
            "basename -a /path/file1.txt /other/file2.txt  # Extract basenames from multiple paths",
            "basename /path/to/directory/  # Get 'directory' from path ending with slash"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "text-processing",
        "safety": "safe",
        "syntaxPattern": "basename <path> [suffix]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Rename files with basename",
                "commands": "for file in *.backup; do mv \"$file\" \"$(basename \"$file\" .backup)\"; done",
                "explanation": "Remove .backup extension from all backup files",
                "title": "for ; do ; done"
            },
            {
                "scenario": "Create output filename from input",
                "commands": "INPUT=data.csv && OUTPUT=\"$(basename \"$INPUT\" .csv).json\"",
                "explanation": "Generate output filename with different extension",
                "title": "INPUT && OUTPUT"
            }
        ],
        "relatedCommands": [
            {
                "name": "dirname",
                "relationship": "opposite",
                "reason": "dirname extracts directory path, basename extracts filename"
            },
            {
                "name": "cut",
                "relationship": "alternative",
                "reason": "Can extract path components using delimiters"
            }
        ],
        "warnings": [
            "basename removes trailing slashes from paths",
            "Empty path or just '/' returns specific results",
            "Suffix removal is exact match, not pattern matching"
        ],
        "manPageUrl": "https://man7.org/linux/man-pages/man1/basename.1.html",
        "distroNotes": {
            "windows": "Available in WSL or Git Bash"
        }
    },
    {
        "name": "bat",
        "standsFor": "bat",
        "description": "Cat clone with syntax highlighting and Git integration",
        "examples": [
            "bat script.py  # Display Python file with color syntax highlighting",
            "bat -n config.json  # Display file with line numbers",
            "git diff | bat --language=diff  # Highlight Git diff output with proper colors",
            "bat --paging=always large-file.log  # Force paging for comfortable reading",
            "bat -r 10:20 file.txt  # Display lines 10 through 20 only"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "text-processing",
        "safety": "safe",
        "syntaxPattern": "bat [options] [file]...",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "View multiple files with headers",
                "commands": "bat *.py",
                "explanation": "Show all Python files with filename headers",
                "title": "bat"
            },
            {
                "scenario": "Combine with other tools",
                "commands": "curl -s https://raw.githubusercontent.com/user/repo/main/README.md | bat -l md",
                "explanation": "Download and display markdown with syntax highlighting",
                "title": "curl | bat"
            }
        ],
        "relatedCommands": [
            {
                "name": "cat",
                "relationship": "alternative",
                "reason": "Traditional file viewer, bat adds syntax highlighting"
            },
            {
                "name": "less",
                "relationship": "similar",
                "reason": "Both paginate content, bat adds colors"
            }
        ],
        "warnings": [
            "May not work well in very minimal terminal environments",
            "Large files can be slow to syntax highlight",
            "Theme may need adjustment for terminal color scheme"
        ],
        "manPageUrl": "https://github.com/sharkdp/bat",
        "distroNotes": {}
    },
    {
        "name": "cat",
        "standsFor": "concatenate",
        "description": "Display file contents or concatenate files",
        "examples": [
            "cat README.md  # Display entire file contents in terminal",
            "cat file1.txt file2.txt > combined.txt  # Concatenate files and save to new file",
            "cat -n script.py  # Display file contents with numbered lines",
            "cat -A data.csv  # Show all characters including tabs and line endings",
            "cat > notes.txt  # Type content and press Ctrl+D to save to file",
            "cat /etc/passwd | awk -F: '{print $1\",\"$3\",\"$5}' | head -10  # Display user accounts with UID and description",
            "cat -b file.txt  # Number non-blank lines",
            "cat -s file.txt  # Squeeze multiple blank lines into one"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "text-processing",
        "safety": "safe",
        "syntaxPattern": "cat [options] [file]...",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Append timestamp to file content",
                "commands": "echo '--- Log Entry ---' && date && cat error.log",
                "explanation": "Add timestamp before displaying file contents",
                "title": "echo && date && cat"
            },
            {
                "scenario": "View compressed file contents",
                "commands": "zcat file.gz | cat -n",
                "explanation": "Uncompress and display file with line numbers",
                "title": "zcat | cat"
            }
        ],
        "relatedCommands": [
            {
                "name": "less",
                "relationship": "alternative",
                "reason": "Better for large files - paginated viewing with search"
            },
            {
                "name": "bat",
                "relationship": "alternative",
                "reason": "Modern cat replacement with syntax highlighting"
            },
            {
                "name": "head",
                "relationship": "similar",
                "reason": "View just the beginning of files"
            }
        ],
        "warnings": [
            "cat displays entire file at once - can flood terminal with large files",
            "Use less or more for viewing large files interactively",
            "cat > file overwrites existing content"
        ],
        "manPageUrl": "https://man7.org/linux/man-pages/man1/cat.1.html",
        "distroNotes": {
            "windows": "Available in WSL and Git Bash only"
        }
    },
    {
        "name": "cowsay",
        "standsFor": "Cow Say",
        "description": "Generate ASCII art of cow saying text",
        "examples": [
            "cowsay 'Hello World'  # Make cow say 'Hello World'",
            "cowsay -f dragon 'Roar!'  # Use dragon character instead of cow",
            "cowsay -l  # Show all available character files",
            "cowthink 'What to do today?'  # Make cow think instead of say",
            "echo 'Multiple lines\nof text' | cowsay  # Make cow say multi-line input",
            "cowsay -f tux 'Linux rocks!'  # Use Tux penguin character",
            "ls -la | cowsay -n  # Pipe command output to cowsay without word wrap"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "text-processing",
        "safety": "safe",
        "syntaxPattern": "cowsay [options] [text]",
        "prerequisites": [
            "basic"
        ],
        "commandCombinations": [
            {
                "scenario": "Fortune cow",
                "commands": "fortune | cowsay",
                "explanation": "Combine fortune with cowsay for entertaining quotes",
                "title": "fortune | cowsay"
            }
        ],
        "relatedCommands": [
            {
                "name": "fortune",
                "relationship": "combo",
                "reason": "Often combined to create fortune-telling cow"
            },
            {
                "name": "figlet",
                "relationship": "similar",
                "reason": "Both create ASCII art text displays"
            }
        ],
        "warnings": [
            "Purely for entertainment and fun",
            "Many different character files available",
            "Popular in Unix culture and system administration"
        ],
        "manPageUrl": "",
        "distroNotes": {}
    },
    {
        "name": "cut",
        "standsFor": "cut",
        "description": "Extract specific columns or fields from text",
        "examples": [
            "cut -c 1-10 file.txt  # Extract characters 1 through 10 from each line",
            "cut -d ',' -f 1,3 data.csv  # Extract 1st and 3rd fields from comma-separated file",
            "cut -d ':' -f 1 /etc/passwd  # Extract first field (username) from colon-delimited file",
            "echo 'document.pdf' | cut -d '.' -f 2  # Get file extension by splitting on dot",
            "cut -c 1-5,10-15 file.txt  # Extract characters 1-5 and 10-15 from each line",
            "ps aux | cut -c 1-20,40-60  # Extract specific columns from process list",
            "cut -d' ' -f1 access.log | sort | uniq -c | sort -nr  # Extract and count unique IP addresses from log",
            "cut -d' ' -f1 access.log | sort | uniq -c  # Extract first field and count occurrences"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "text-processing",
        "safety": "safe",
        "syntaxPattern": "cut [options] [file]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Process log files for specific data",
                "commands": "grep ERROR app.log | cut -d ' ' -f 1,4- | head -10",
                "explanation": "Extract timestamp and error message from log entries",
                "title": "grep | cut | head"
            },
            {
                "scenario": "Extract and sort unique values",
                "commands": "cut -d ',' -f 3 data.csv | sort | uniq -c",
                "explanation": "Get frequency count of values in 3rd column",
                "title": "cut | sort | uniq"
            }
        ],
        "relatedCommands": [
            {
                "name": "awk",
                "relationship": "powerful",
                "reason": "More flexible field processing with programming features"
            },
            {
                "name": "sort",
                "relationship": "combo",
                "reason": "Often used together to extract and sort fields"
            },
            {
                "name": "uniq",
                "relationship": "combo",
                "reason": "Remove duplicates from cut output"
            }
        ],
        "warnings": [
            "Cannot extract fields in different order than they appear",
            "Tab is default field delimiter, not space",
            "Character counting is 1-based, not 0-based"
        ],
        "manPageUrl": "https://man7.org/linux/man-pages/man1/cut.1.html",
        "distroNotes": {
            "windows": "Available in WSL and Git Bash only"
        }
    },
    {
        "name": "dirname",
        "standsFor": "directory name",
        "description": "Extract directory path from full path",
        "examples": [
            "dirname /path/to/file.txt  # Extract '/path/to' from full path",
            "dirname /path/to/directory  # Get '/path/to' from directory path",
            "dirname /path/file1 /other/file2  # Extract directory from multiple paths",
            "dirname /  # Returns '/' for root directory"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "text-processing",
        "safety": "safe",
        "syntaxPattern": "dirname <path>...",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Create directory for file",
                "commands": "FILE=/path/to/new/file.txt && mkdir -p \"$(dirname \"$FILE\")\" && touch \"$FILE\"",
                "explanation": "Create parent directories then create file",
                "title": "FILE && mkdir && touch"
            },
            {
                "scenario": "Backup to same directory as original",
                "commands": "cp file.txt \"$(dirname file.txt)/file.txt.backup\"",
                "explanation": "Create backup in same directory as original",
                "title": "cp"
            }
        ],
        "relatedCommands": [
            {
                "name": "basename",
                "relationship": "opposite",
                "reason": "basename extracts filename, dirname extracts directory"
            },
            {
                "name": "mkdir",
                "relationship": "combo",
                "reason": "Create directories extracted by dirname"
            }
        ],
        "warnings": [
            "dirname handles trailing slashes differently than basename",
            "Returns '.' for filenames without directory component",
            "Result doesn't include trailing slash except for root"
        ],
        "manPageUrl": "https://man7.org/linux/man-pages/man1/dirname.1.html",
        "distroNotes": {
            "windows": "Available in WSL or Git Bash"
        }
    },
    {
        "name": "figlet",
        "standsFor": "FIGlet (Frank, Ian & Glenn's Letters)",
        "description": "Generate large ASCII art text banners",
        "examples": [
            "figlet 'Hello'  # Create large ASCII art 'Hello' banner",
            "figlet -f big 'BIG TEXT'  # Use 'big' font for text banner",
            "figlet -c 'Centered'  # Center the banner text",
            "figlet -r 'Right'  # Right-align the banner text",
            "figlet -f list  # Show all available fonts",
            "figlet -w 80 'Wide Text'  # Set output width to 80 characters",
            "echo \"Welcome to $(hostname)\" | figlet -f slant  # Dynamic system banner with slant font",
            "figlet -f big '$(echo $COMPANY_NAME | tr '[:lower:]' '[:upper:]')' && echo '' && figlet -f small 'Production Environment' && echo '' && printf 'Server: %s | Environment: %s | Date: %s\n' \"$(hostname)\" \"$ENVIRONMENT\" \"$(date +'%Y-%m-%d %H:%M:%S')\" && echo 'System Status:' && systemctl is-active --quiet nginx && echo '✓ Web Server: Running' || echo '✗ Web Server: Down' && echo 'Enterprise system welcome banner: corporate branding, environment identification, server details, and critical service status for production system access and monitoring'  # Enterprise system welcome banner with status"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "text-processing",
        "safety": "safe",
        "syntaxPattern": "figlet [options] [text]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Script header",
                "commands": "figlet 'MyScript' && echo 'Version 1.0' && echo ''",
                "explanation": "Create attractive script header with version info",
                "title": "figlet && echo && echo"
            }
        ],
        "relatedCommands": [
            {
                "name": "banner",
                "relationship": "similar",
                "reason": "banner creates simpler text banners"
            }
        ],
        "warnings": [
            "Many font files available for different styles",
            "Useful for script headers and system messages",
            "Output width can be controlled for different terminals"
        ],
        "manPageUrl": "http://www.figlet.org/",
        "distroNotes": {}
    },
    {
        "name": "fortune",
        "standsFor": "Fortune",
        "description": "Display random quotations and sayings",
        "examples": [
            "fortune  # Display random fortune cookie message",
            "fortune -s  # Display only short fortune messages",
            "fortune -l  # Display only long fortune messages",
            "fortune computers  # Display fortune from computer-related quotes",
            "fortune -f  # Show all available fortune files",
            "fortune -n 100  # Display fortunes with at most 100 characters",
            "fortune -a  # Choose from all fortune files including potentially offensive ones",
            "echo '=== Daily Enterprise Motivation ===' && fortune computers | cowsay -f tux && echo '' && echo 'System Status:' && uptime | awk '{print \"Load Average: \" $10 $11 $12}' && free -h | grep Mem | awk '{print \"Memory Usage: \" $3 \"/\" $2}' && df -h / | tail -1 | awk '{print \"Disk Usage: \" $5 \" of \" $2}' && echo 'Enterprise daily briefing: motivational tech wisdom, system performance metrics, and infrastructure health monitoring for productive team engagement'  # Enterprise daily system briefing with motivation"
        ],
        "platform": [
            "linux",
            "macos"
        ],
        "category": "text-processing",
        "safety": "safe",
        "syntaxPattern": "fortune [options] [files]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Daily motivation",
                "commands": "echo '=== Fortune of the Day ===' && fortune && echo ''",
                "explanation": "Display formatted daily fortune message",
                "title": "echo && fortune && echo"
            }
        ],
        "relatedCommands": [
            {
                "name": "cowsay",
                "relationship": "combo",
                "reason": "fortune | cowsay creates speaking cow with fortune"
            }
        ],
        "warnings": [
            "May not be installed by default",
            "Fortune files located in /usr/share/games/fortunes/",
            "Can be added to shell startup for daily quotes"
        ],
        "manPageUrl": "",
        "distroNotes": {}
    },
    {
        "name": "fzf",
        "standsFor": "fuzzy finder",
        "description": "Command-line fuzzy finder for interactive selection",
        "examples": [
            "find . -type f | fzf  # Select file from list with fuzzy search",
            "history | fzf  # Interactively search through command history",
            "vim $(fzf)  # Open fuzzy-selected file in vim",
            "find . -name '*.py' | fzf -m  # Select multiple Python files with Tab key",
            "fzf --preview 'cat {}'  # Show file contents in preview pane",
            "git branch | fzf --height 40% | xargs git checkout  # Interactive Git branch switching",
            "ps aux | fzf --header 'Select process to kill' | awk '{print $2}' | xargs kill  # Interactive process killer",
            "echo 'Enterprise Process Management Dashboard' && ps aux --sort=-%cpu | head -10 | fzf --preview 'echo \"Process Details:\"; ps -p {2} -o pid,ppid,user,comm,cmd,start,time,pcpu,pmem --no-headers; echo; echo \"Open Files:\"; lsof -p {2} 2>/dev/null | head -10; echo; echo \"Network Connections:\"; netstat -p 2>/dev/null | grep {2} | head -5' --header 'Select process for detailed analysis' && echo 'Enterprise interactive process exploration: CPU usage prioritization, comprehensive process metadata, file handle analysis, and network connection mapping for production system optimization and troubleshooting'  # Enterprise interactive process analysis"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "text-processing",
        "safety": "safe",
        "syntaxPattern": "fzf [options]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Kill process interactively",
                "commands": "ps aux | fzf | awk '{print $2}' | xargs kill",
                "explanation": "Select process from list and kill it",
                "title": "ps | fzf | awk | xargs"
            },
            {
                "scenario": "Git branch switching",
                "commands": "git branch | fzf | xargs git checkout",
                "explanation": "Fuzzy select and switch to Git branch",
                "title": "git | fzf | xargs"
            }
        ],
        "relatedCommands": [
            {
                "name": "grep",
                "relationship": "similar",
                "reason": "Both search through text, fzf is interactive"
            },
            {
                "name": "find",
                "relationship": "combo",
                "reason": "Often used together: find generates list, fzf filters it"
            }
        ],
        "warnings": [
            "Requires input on stdin to work",
            "Keyboard shortcuts may conflict with terminal emulator",
            "Preview feature can be slow with large files"
        ],
        "manPageUrl": "https://github.com/junegunn/fzf",
        "distroNotes": {}
    },
    {
        "name": "grep",
        "standsFor": "global regular expression print",
        "description": "Search text patterns within files",
        "examples": [
            "grep 'error' *.log  # Find all occurrences of 'error' in log files",
            "grep -i 'warning' app.log  # Search for 'warning' regardless of case",
            "grep -n 'TODO' *.js  # Display line numbers where TODO comments appear",
            "grep -r 'function' src/  # Search for 'function' in all files within src directory",
            "grep -v '^#' config.txt  # Show all lines that don't start with # (comments)",
            "grep -A 3 -B 2 'error' debug.log  # Show 3 lines after and 2 lines before each match",
            "grep -E '(error|warning|fatal)' *.log  # Search for multiple patterns using extended regex",
            "echo 'Enterprise Log Analysis and Security Monitoring' && find /var/log -name '*.log' -type f -mtime -1 -exec grep -l 'ERROR\\|FATAL\\|CRITICAL' {} ; | while read logfile; do echo \"Analyzing: $logfile\"; grep -E '(authentication failed|access denied|security violation|intrusion detected)' \"$logfile\" | head -10; done && echo 'Application Logs:' && grep -r 'Exception\\|Error\\|Failed' /opt/enterprise/logs/ --include='*.log' | grep -E '$(date +\"%Y-%m-%d\")' | sort | uniq -c | sort -nr | head -20 && echo 'Security Events:' && grep -E '(login failed|unauthorized|forbidden|blocked)' /var/log/auth.log /var/log/secure 2>/dev/null | tail -50 && echo 'Performance Issues:' && grep -E '(timeout|slow query|high load|memory error)' /var/log/syslog | grep \"$(date +\"%Y-%m-%d\")\" && echo 'Enterprise log monitoring: comprehensive error detection, security event analysis, application failure tracking, performance issue identification, and real-time threat detection for enterprise security operations and incident response'  # Enterprise log analysis and security monitoring"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "text-processing",
        "safety": "safe",
        "syntaxPattern": "grep [options] <pattern> [file]...",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Count occurrences of pattern",
                "commands": "grep -c 'error' *.log | sort -nr",
                "explanation": "Count errors per log file and sort by highest count",
                "title": "grep | sort"
            },
            {
                "scenario": "Search output of other commands",
                "commands": "ps aux | grep python",
                "explanation": "Find all running Python processes",
                "title": "ps | grep"
            }
        ],
        "relatedCommands": [
            {
                "name": "rg",
                "relationship": "alternative",
                "reason": "Ripgrep - much faster modern alternative with better defaults"
            },
            {
                "name": "awk",
                "relationship": "powerful",
                "reason": "More complex text processing and pattern matching"
            },
            {
                "name": "sed",
                "relationship": "similar",
                "reason": "Stream editor for find and replace operations"
            }
        ],
        "warnings": [
            "grep uses basic regex by default, use -E for extended regex",
            "Patterns with special characters need escaping",
            "Binary files may produce weird output"
        ],
        "manPageUrl": "https://man7.org/linux/man-pages/man1/grep.1.html",
        "distroNotes": {
            "windows": "Available in WSL and Git Bash only"
        }
    },
    {
        "name": "head",
        "standsFor": "head",
        "description": "Display first lines of files",
        "examples": [
            "head -20 data.csv  # Show first 20 lines to understand file structure",
            "head error.log  # See first 10 lines (default) of log file",
            "head -5 file1.txt file2.txt  # Show first 5 lines of multiple files",
            "head -c 100 binary.dat  # Display first 100 bytes instead of lines",
            "head -n +50 large.txt  # Show from beginning up to line 50",
            "echo 'Enterprise Data Analysis and Log Processing' && echo 'Processing Enterprise Data Files:' && find /enterprise/logs -name '*.log' -type f -mtime -1 | while read logfile; do echo \"Processing: $logfile\"; echo \"=== Top 50 lines from $(basename $logfile) ===\"; head -50 \"$logfile\" | grep -E '(ERROR|WARN|INFO)' | awk '{print $1 \" \" $2 \" \" $4}' | sort | uniq -c | sort -nr; done > daily-log-analysis-$(date +%Y%m%d).txt && echo 'Data Sampling:' && head -1000 /enterprise/data/transactions.csv | cut -d, -f1,2,5,7 | head -20 && echo 'Performance Metrics:' && head -100 /var/log/apache2/access.log | awk '{print $7}' | sort | uniq -c | sort -nr | head -10 && echo 'Enterprise data processing: automated log analysis, transaction data sampling, performance metrics extraction, error pattern detection, and comprehensive data intelligence for enterprise operations and business analytics'  # Enterprise data analysis and log processing"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "text-processing",
        "safety": "safe",
        "syntaxPattern": "head [options] [file]...",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Sample random lines from beginning",
                "commands": "head -100 large.txt | shuf -n 10",
                "explanation": "Take first 100 lines, then randomly sample 10",
                "title": "head | shuf"
            }
        ],
        "relatedCommands": [
            {
                "name": "tail",
                "relationship": "opposite",
                "reason": "Shows end of files instead of beginning"
            },
            {
                "name": "cat",
                "relationship": "similar",
                "reason": "Shows entire file instead of just beginning"
            }
        ],
        "warnings": [
            "Default is 10 lines if no number specified",
            "Use -c for bytes instead of lines"
        ],
        "manPageUrl": "https://man7.org/linux/man-pages/man1/head.1.html",
        "distroNotes": {}
    },
    {
        "name": "jq",
        "standsFor": "JSON Query",
        "description": "Command-line JSON processor",
        "examples": [
            "cat data.json | jq '.'  # Format and colorize JSON output",
            "curl -s api.example.com/user | jq '.name'  # Get 'name' field from API response",
            "jq '.users[] | select(.active == true)' users.json  # Show only active users from array",
            "jq '{name: .full_name, email: .email_address}' input.json  # Create new JSON with renamed fields",
            "jq '.items | length' data.json  # Count number of items in array",
            "jq -s 'map(select(.status == \"active\")) | group_by(.category) | map({category: .[0].category, count: length})' *.json  # Combine multiple JSON files and create category summary statistics"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "text-processing",
        "safety": "caution",
        "syntaxPattern": "jq [options] '<filter>' [file]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "API data analysis",
                "commands": "curl -s api.example.com/stats | jq '.data[] | select(.value > 100) | .name'",
                "explanation": "Fetch API data and filter high-value items",
                "title": "curl | jq | select > 100 |"
            },
            {
                "scenario": "Convert CSV-like JSON to actual CSV",
                "commands": "jq -r '.[] | [.name, .email, .age] | @csv' users.json > users.csv",
                "explanation": "Convert JSON array to CSV format",
                "title": "jq | | > users"
            }
        ],
        "relatedCommands": [
            {
                "name": "curl",
                "relationship": "combo",
                "reason": "Process JSON responses from API calls"
            },
            {
                "name": "grep",
                "relationship": "similar",
                "reason": "Both filter and search through data"
            },
            {
                "name": "awk",
                "relationship": "similar",
                "reason": "Both process structured data with patterns"
            }
        ],
        "warnings": [
            "jq filter syntax can be complex for beginners",
            "String values need to be quoted in filters",
            "Empty results return null, not empty string"
        ],
        "manPageUrl": "https://stedolan.github.io/jq/manual/",
        "distroNotes": {
            "linux": "Usually available in package repos",
            "macos": "Install via Homebrew: brew install jq",
            "windows": "Available in WSL or download binary"
        }
    },
    {
        "name": "less",
        "standsFor": "less is more",
        "description": "View file contents page by page with navigation",
        "examples": [
            "less application.log  # View file with ability to scroll up/down and search",
            "less +/error app.log  # Open file and jump to first occurrence of 'error'",
            "less +F server.log  # Similar to tail -f, shows new content as it's added",
            "ps aux | less  # Pipe command output through less for easy browsing",
            "less +G -S -N /var/log/nginx/access.log  # Open log file at end, disable line wrapping, show line numbers for production log analysis"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "text-processing",
        "safety": "safe",
        "syntaxPattern": "less [options] [file]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Search and navigate large files",
                "commands": "grep -n 'pattern' file.txt | less",
                "explanation": "Find matches with line numbers, browse results in less",
                "title": "grep | less"
            }
        ],
        "relatedCommands": [
            {
                "name": "cat",
                "relationship": "alternative",
                "reason": "Use cat for small files, less for large ones"
            }
        ],
        "warnings": [
            "Press 'q' to quit less",
            "Use '/' to search forward, '?' to search backward"
        ],
        "manPageUrl": "https://man7.org/linux/man-pages/man1/less.1.html",
        "distroNotes": {}
    },
    {
        "name": "nano",
        "standsFor": "nano's another editor",
        "description": "Simple, user-friendly text editor",
        "examples": [
            "nano ~/.bashrc  # Open bash configuration for editing",
            "nano notes.txt  # Create and edit simple text file",
            "nano -l script.py  # Show line numbers while editing",
            "nano file1.txt file2.txt  # Edit multiple files, switch with Alt+> and Alt+<"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "text-processing",
        "safety": "safe",
        "syntaxPattern": "nano [options] [file]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Edit system file safely",
                "commands": "sudo cp /etc/hosts /etc/hosts.backup && sudo nano /etc/hosts",
                "explanation": "Backup system file before editing",
                "title": "sudo && sudo"
            }
        ],
        "relatedCommands": [
            {
                "name": "vim",
                "relationship": "alternative",
                "reason": "More powerful but steeper learning curve"
            },
            {
                "name": "emacs",
                "relationship": "alternative",
                "reason": "Different text editor with more features"
            },
            {
                "name": "cat",
                "relationship": "combo",
                "reason": "View file contents before editing"
            }
        ],
        "warnings": [
            "Ctrl+X to exit, Y to save changes",
            "Some shortcuts displayed at bottom may conflict with terminal",
            "Limited features compared to vim/emacs"
        ],
        "manPageUrl": "https://www.nano-editor.org/docs.php",
        "distroNotes": {
            "windows": "Available in WSL or via package managers"
        }
    },
    {
        "name": "perl",
        "standsFor": "Practical Extraction and Reporting Language",
        "description": "Perl interpreter for text processing and system administration",
        "examples": [
            "perl script.pl  # Execute Perl script file",
            "perl -pe 's/old/new/g' file.txt  # Replace all occurrences of 'old' with 'new' in file",
            "perl -i -pe 's/foo/bar/g' *.txt  # Edit all .txt files in place, replacing 'foo' with 'bar'",
            "perl -lane 'print $F[1]' data.txt  # Extract second field from each line (awk-like behavior)",
            "perl -c script.pl  # Check Perl script for syntax errors",
            "perl -e 'print \"Hello World\\n\"'  # Run Perl code from command line",
            "perl -F, -lane 'print $F[0] if $F[2] > 100' data.csv  # Print first field where third field is greater than 100",
            "perl -pe 's/old/new/g' file.txt > output.txt  # Replace text with regex and save to new file"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "text-processing",
        "safety": "safe",
        "syntaxPattern": "perl [options] <file> [args]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Advanced text processing pipeline",
                "commands": "perl -pe 's/^/> /' input.txt | perl -pe 's/$/;/' > output.txt",
                "explanation": "Add prefix and suffix to each line using Perl pipeline",
                "title": "perl > | perl ; > output"
            },
            {
                "scenario": "Install CPAN module and use",
                "commands": "cpan install JSON && perl -MJSON -e 'print encode_json({hello => \"world\"})'",
                "explanation": "Install JSON module and use it to encode data",
                "title": "cpan && perl >"
            }
        ],
        "relatedCommands": [
            {
                "name": "sed",
                "relationship": "similar",
                "reason": "Both used for text processing, Perl more powerful"
            },
            {
                "name": "awk",
                "relationship": "similar",
                "reason": "Both process structured text, different syntax"
            }
        ],
        "warnings": [
            "Perl one-liners can become cryptic and hard to maintain",
            "Regular expression syntax differs slightly from other tools",
            "Module installation may require compilation tools"
        ],
        "manPageUrl": "https://perldoc.perl.org/",
        "distroNotes": {}
    },
    {
        "name": "rev",
        "standsFor": "Reverse",
        "description": "Reverse characters in each line",
        "examples": [
            "echo 'hello world' | rev  # Reverse characters: 'dlrow olleh'",
            "rev file.txt  # Reverse each line in file",
            "echo 'racecar' | rev  # Check if text is palindrome"
        ],
        "platform": [
            "linux",
            "macos"
        ],
        "category": "text-processing",
        "safety": "safe",
        "syntaxPattern": "rev [files]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Double reverse check",
                "commands": "echo 'test' | rev | rev",
                "explanation": "Reverse twice to get original text back",
                "title": "echo | rev |"
            }
        ],
        "relatedCommands": [],
        "warnings": [
            "Reverses characters within each line",
            "Useful for text games and puzzles",
            "Simple but can be useful in scripts"
        ],
        "manPageUrl": "https://man7.org/linux/man-pages/man1/rev.1.html",
        "distroNotes": {}
    },
    {
        "name": "rg",
        "standsFor": "ripgrep",
        "description": "Ultra-fast grep replacement with better defaults",
        "examples": [
            "rg 'error' .  # Search for 'error' in all files recursively, respecting .gitignore",
            "rg -i 'TODO' src/  # Search for TODO comments ignoring case",
            "rg -t py 'def main'  # Search only in Python files for function definitions",
            "rg -C 3 'function_name'  # Show 3 lines before and after each match",
            "rg 'old_name' --replace 'new_name' --dry-run  # Preview text replacements without making changes",
            "rg -c 'pattern' *.log  # Count occurrences of pattern in log files",
            "rg -i --type log \"ERROR|WARN|FATAL\" /var/log/ --stats --json | jq -r '.data.lines.matches[] | .data.lines.text' | sort | uniq -c | sort -nr | head -20 && rg --files /var/log/ | wc -l && echo \"Enterprise log analysis: critical issues identified, frequency analysis completed, $(rg --files /var/log/ | wc -l) log files scanned for security and performance insights\"  # Enterprise log analysis with comprehensive error pattern detection, frequency analysis, and system-wide log file inventory for operational intelligence"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "text-processing",
        "safety": "safe",
        "syntaxPattern": "rg [options] <pattern> [path]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Find and edit files containing pattern",
                "commands": "rg -l 'FIXME' | xargs vim",
                "explanation": "Find files with FIXME comments and open in editor",
                "title": "rg | xargs"
            },
            {
                "scenario": "Search with stats",
                "commands": "rg 'error' --stats",
                "explanation": "Show search results with performance statistics",
                "title": "rg"
            }
        ],
        "relatedCommands": [
            {
                "name": "grep",
                "relationship": "alternative",
                "reason": "Traditional text search, rg is faster with better defaults"
            },
            {
                "name": "find",
                "relationship": "combo",
                "reason": "Find files then search within them"
            }
        ],
        "warnings": [
            "Respects .gitignore by default (use --no-ignore to override)",
            "Binary files are skipped automatically",
            "Some regex features differ from grep"
        ],
        "manPageUrl": "",
        "distroNotes": {}
    },
    {
        "name": "sed",
        "standsFor": "stream editor",
        "description": "Stream editor for filtering and transforming text",
        "examples": [
            "sed 's/old/new/g' file.txt  # Replace all occurrences of 'old' with 'new'",
            "sed '/pattern/d' file.txt  # Remove all lines containing 'pattern'",
            "sed '3i\\This is inserted text' file.txt  # Insert text before line 3",
            "sed -n '10,20p' file.txt  # Print only lines 10 through 20",
            "sed -i 's/foo/bar/g' *.txt  # Replace 'foo' with 'bar' in all text files"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "text-processing",
        "safety": "safe",
        "syntaxPattern": "sed [options] 'command' [file]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Clean and format configuration files",
                "commands": "sed 's/#.*//; /^$/d' config.txt | sed 's/^[ \\t]*//'",
                "explanation": "Remove comments, empty lines, and leading whitespace",
                "title": "sed ; | sed"
            },
            {
                "scenario": "Extract data between markers",
                "commands": "sed -n '/START/,/END/p' data.txt | sed '1d;$d'",
                "explanation": "Extract text between START and END markers, excluding markers",
                "title": "sed | sed ;"
            }
        ],
        "relatedCommands": [
            {
                "name": "awk",
                "relationship": "similar",
                "reason": "Both process text streams, awk better for field-based data"
            },
            {
                "name": "tr",
                "relationship": "similar",
                "reason": "Simple character replacement and deletion"
            },
            {
                "name": "grep",
                "relationship": "combo",
                "reason": "Grep finds patterns, sed modifies them"
            }
        ],
        "warnings": [
            "sed -i behavior differs between GNU and BSD versions",
            "Regular expressions vary between sed implementations",
            "Always backup files before using -i flag"
        ],
        "manPageUrl": "https://man7.org/linux/man-pages/man1/sed.1.html",
        "distroNotes": {
            "macos": "BSD sed - some syntax differs from GNU sed",
            "windows": "Available in WSL or Git Bash"
        }
    },
    {
        "name": "shuf",
        "standsFor": "Shuffle",
        "description": "Generate random permutations of lines",
        "examples": [
            "shuf file.txt  # Randomize order of lines in file",
            "shuf -n 5 file.txt  # Pick 5 random lines from file",
            "shuf -i 1-100 -n 10  # Generate 10 random numbers between 1 and 100",
            "shuf -r -n 5 file.txt  # Pick 5 random lines with repetition allowed",
            "shuf --random-source=/dev/urandom file.txt  # Use specific random source for shuffling"
        ],
        "platform": [
            "linux",
            "macos"
        ],
        "category": "text-processing",
        "safety": "safe",
        "syntaxPattern": "shuf [options] [files]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Random playlist creation",
                "commands": "find ~/Music -name '*.mp3' | shuf -n 20 > playlist.m3u",
                "explanation": "Create random playlist of 20 songs",
                "title": "find | shuf > playlist"
            }
        ],
        "relatedCommands": [
            {
                "name": "sort",
                "relationship": "opposite",
                "reason": "sort orders lines, shuf randomizes order"
            },
            {
                "name": "seq",
                "relationship": "combo",
                "reason": "seq generates sequences that shuf can randomize"
            }
        ],
        "warnings": [
            "Useful for randomizing data and creating samples",
            "Can generate random numbers within ranges",
            "Good for testing and data analysis"
        ],
        "manPageUrl": "https://man7.org/linux/man-pages/man1/shuf.1.html",
        "distroNotes": {}
    },
    {
        "name": "sort",
        "standsFor": "sort",
        "description": "Sort lines of text files",
        "examples": [
            "sort names.txt  # Sort lines in alphabetical order",
            "sort -n numbers.txt  # Sort numerically instead of lexically",
            "sort -r file.txt  # Sort in descending/reverse order",
            "sort -k2,2 data.txt  # Sort by second column only",
            "sort -t',' -k3,3n sales.csv  # Sort CSV by third column numerically",
            "sort -u file.txt  # Sort and remove duplicate lines"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "text-processing",
        "safety": "safe",
        "syntaxPattern": "sort [options] [file]...",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Find most frequent items",
                "commands": "sort data.txt | uniq -c | sort -nr",
                "explanation": "Sort, count duplicates, then sort by count descending",
                "title": "sort | uniq | sort"
            },
            {
                "scenario": "Sort by file sizes",
                "commands": "ls -la | sort -k5,5n",
                "explanation": "List files sorted by size (5th column)",
                "title": "ls | sort"
            }
        ],
        "relatedCommands": [
            {
                "name": "uniq",
                "relationship": "combo",
                "reason": "Often used together to find unique/duplicate lines"
            },
            {
                "name": "cut",
                "relationship": "combo",
                "reason": "Extract specific columns before sorting"
            },
            {
                "name": "head",
                "relationship": "combo",
                "reason": "Show top N items after sorting"
            }
        ],
        "warnings": [
            "Default sort is lexical, use -n for numeric sorting",
            "Locale settings affect sort order",
            "Memory usage can be high for very large files"
        ],
        "manPageUrl": "https://man7.org/linux/man-pages/man1/sort.1.html",
        "distroNotes": {
            "windows": "Available in WSL or Git Bash"
        }
    },
    {
        "name": "tail",
        "standsFor": "tail",
        "description": "Display last lines of files, often used to monitor logs",
        "examples": [
            "tail -f /var/log/system.log  # Follow log file and show new entries as they appear",
            "tail -50 error.log  # Show last 50 lines to see recent issues",
            "tail -f app.log error.log  # Follow multiple files simultaneously",
            "tail -20 data.txt | cat -n  # Display last 20 lines with line numbers"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "text-processing",
        "safety": "safe",
        "syntaxPattern": "tail [options] [file]...",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Follow logs and filter errors",
                "commands": "tail -f app.log | grep ERROR",
                "explanation": "Monitor log file and only show error lines",
                "title": "tail | grep"
            },
            {
                "scenario": "Rotate through multiple log files",
                "commands": "tail -f *.log",
                "explanation": "Monitor all log files in current directory",
                "title": "tail"
            }
        ],
        "relatedCommands": [
            {
                "name": "head",
                "relationship": "opposite",
                "reason": "Shows beginning of files instead of end"
            },
            {
                "name": "less",
                "relationship": "alternative",
                "reason": "Use less +F for more interactive log following"
            }
        ],
        "warnings": [
            "tail -f keeps running until you press Ctrl+C",
            "Default is 10 lines if no number specified",
            "tail -F recreates file if it's rotated/deleted"
        ],
        "manPageUrl": "https://man7.org/linux/man-pages/man1/tail.1.html",
        "distroNotes": {}
    },
    {
        "name": "tr",
        "standsFor": "translate",
        "description": "Translate or delete characters from input",
        "examples": [
            "echo 'hello world' | tr 'a-z' 'A-Z'  # Translate lowercase letters to uppercase",
            "tr -d '0-9' < file.txt  # Remove all digits from file content",
            "echo 'file name.txt' | tr ' ' '_'  # Replace spaces with underscores for filename",
            "echo 'hello' | tr -s 'l'  # Squeeze consecutive 'l' characters to single 'l'",
            "tr '\\n' ' ' < file.txt  # Replace newlines with spaces to join lines"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "text-processing",
        "safety": "safe",
        "syntaxPattern": "tr [options] <set1> [set2]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Clean up CSV data",
                "commands": "tr -d '\"' < data.csv | tr ',' '\\t'",
                "explanation": "Remove quotes and convert commas to tabs",
                "title": "tr < data | tr"
            },
            {
                "scenario": "Create password from text",
                "commands": "echo 'password123' | tr 'a-zA-Z' 'n-za-mN-ZA-M'",
                "explanation": "Apply ROT13 cipher to text",
                "title": "echo | tr"
            }
        ],
        "relatedCommands": [
            {
                "name": "sed",
                "relationship": "powerful",
                "reason": "More complex text transformations and pattern matching"
            },
            {
                "name": "awk",
                "relationship": "powerful",
                "reason": "Field-based text processing"
            },
            {
                "name": "cut",
                "relationship": "combo",
                "reason": "Extract fields then translate characters"
            }
        ],
        "warnings": [
            "tr only works with stdin, not files directly",
            "Character classes like [:alpha:] are POSIX-specific",
            "Cannot handle multi-byte characters properly"
        ],
        "manPageUrl": "https://man7.org/linux/man-pages/man1/tr.1.html",
        "distroNotes": {
            "windows": "Available in WSL and Git Bash only"
        }
    },
    {
        "name": "uniq",
        "standsFor": "unique",
        "description": "Report or omit repeated lines",
        "examples": [
            "sort file.txt | uniq  # Remove consecutive duplicate lines (requires sorted input)",
            "sort data.txt | uniq -c  # Show count of how many times each line appears",
            "sort file.txt | uniq -d  # Display only lines that appear more than once",
            "sort file.txt | uniq -u  # Display only lines that appear exactly once",
            "sort file.txt | uniq -i  # Treat upper and lower case as the same"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "text-processing",
        "safety": "safe",
        "syntaxPattern": "uniq [options] [file]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Find most common log entries",
                "commands": "sort access.log | uniq -c | sort -nr | head -10",
                "explanation": "Show top 10 most frequent log entries",
                "title": "sort | uniq | sort | head"
            },
            {
                "scenario": "Compare two files for common lines",
                "commands": "cat file1.txt file2.txt | sort | uniq -d",
                "explanation": "Find lines that appear in both files",
                "title": "cat | sort | uniq"
            }
        ],
        "relatedCommands": [
            {
                "name": "sort",
                "relationship": "combo",
                "reason": "uniq requires sorted input to work properly"
            },
            {
                "name": "awk",
                "relationship": "alternative",
                "reason": "Can deduplicate without requiring sorted input"
            }
        ],
        "warnings": [
            "Input must be sorted for uniq to work correctly",
            "Only removes consecutive duplicate lines",
            "Use sort -u as alternative for unsorted input"
        ],
        "manPageUrl": "https://man7.org/linux/man-pages/man1/uniq.1.html",
        "distroNotes": {
            "windows": "Available in WSL or Git Bash"
        }
    },
    {
        "name": "vim",
        "standsFor": "vi improved",
        "description": "Powerful text editor with modal interface",
        "examples": [
            "vim config.txt  # Open file for editing in vim",
            "vim newfile.py  # Create and edit new file",
            "vim +25 script.sh  # Open file and jump to line 25",
            "vim -R important.conf  # Open file in read-only mode to prevent accidental changes",
            "vim file1.txt file2.txt  # Open multiple files, switch with :next and :prev"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "text-processing",
        "safety": "safe",
        "syntaxPattern": "vim [options] [file...]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Quick edit and commit",
                "commands": "vim README.md && git add README.md && git commit -m 'Update README'",
                "explanation": "Edit file then commit changes to git",
                "title": "vim && git && git"
            },
            {
                "scenario": "Edit files found by grep",
                "commands": "grep -l 'TODO' *.py | xargs vim",
                "explanation": "Open all Python files containing TODO comments",
                "title": "grep | xargs"
            }
        ],
        "relatedCommands": [
            {
                "name": "nano",
                "relationship": "alternative",
                "reason": "Simpler editor for beginners"
            },
            {
                "name": "emacs",
                "relationship": "alternative",
                "reason": "Different philosophy text editor"
            }
        ],
        "warnings": [
            "Press 'i' to enter insert mode, 'Esc' to exit",
            "Save with ':w', quit with ':q', force quit ':q!'",
            "Can be overwhelming for new users"
        ],
        "manPageUrl": "https://www.vim.org/docs.php",
        "distroNotes": {}
    },
    {
        "name": "wc",
        "standsFor": "word count",
        "description": "Count lines, words, and characters in files",
        "examples": [
            "wc -l file.txt  # Show only the number of lines",
            "wc -w document.txt  # Show only the word count",
            "wc -c file.txt  # Show byte count of file",
            "wc file.txt  # Show lines, words, and bytes (default output)",
            "wc *.txt  # Show counts for all text files plus totals"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "text-processing",
        "safety": "safe",
        "syntaxPattern": "wc [options] [file]...",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Count unique lines in file",
                "commands": "sort file.txt | uniq | wc -l",
                "explanation": "Count number of unique lines",
                "title": "sort | uniq | wc"
            },
            {
                "scenario": "Monitor log file growth",
                "commands": "watch 'wc -l /var/log/syslog'",
                "explanation": "Watch line count change in real-time",
                "title": "watch"
            }
        ],
        "relatedCommands": [
            {
                "name": "du",
                "relationship": "similar",
                "reason": "Both provide file/directory statistics"
            },
            {
                "name": "grep",
                "relationship": "combo",
                "reason": "Count matches with grep -c or grep | wc -l"
            },
            {
                "name": "find",
                "relationship": "combo",
                "reason": "Count files with find | wc -l"
            }
        ],
        "warnings": [
            "wc -c counts bytes, wc -m counts characters (differs with Unicode)",
            "Empty files show 0 lines but files without trailing newline may surprise",
            "Word definition is whitespace-separated tokens"
        ],
        "manPageUrl": "https://man7.org/linux/man-pages/man1/wc.1.html",
        "distroNotes": {
            "windows": "Available in WSL or Git Bash"
        }
    }
];

export { text_processingCommands };
export default text_processingCommands;
