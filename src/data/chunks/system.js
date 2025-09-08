/**
 * TL;DRx Commands Database - System Category
 *
 * Contains 43 commands related to system.
 * Generated from the original commands.js file.
 *
 * @fileoverview System category commands for TL;DRx
 * @category system
 * @commands 43
 */

/**
 * System category commands
 * @type {Array<Object>}
 */
const systemCommands = [
    {
        "name": "alert-manager",
        "standsFor": "Prometheus AlertManager",
        "description": "Handles alerts from Prometheus and routes them to notification channels",
        "examples": [
            "alertmanager --config.file=alertmanager.yml  # Start AlertManager with configuration file",
            "alertmanager --web.listen-address=:9093  # Start on custom port",
            "amtool config show  # Show current configuration",
            "amtool alert query alertname=DiskSpaceLow  # Query specific alerts",
            "amtool silence add alertname=DiskSpaceLow  # Create silence for alert",
            "amtool silence expire $(amtool silence query -q)  # Expire all silences",
            "curl -XPOST localhost:9093/-/reload  # Reload configuration"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "system",
        "safety": "safe",
        "syntaxPattern": "alertmanager [flags] / amtool <command> [options]",
        "prerequisites": [
            "prometheus"
        ],
        "commandCombinations": [
            {
                "scenario": "Cluster setup",
                "commands": "alertmanager --config.file=alertmanager.yml --cluster.peer=alertmanager-2:9094",
                "explanation": "Start AlertManager in cluster mode",
                "title": "alertmanager"
            }
        ],
        "relatedCommands": [
            {
                "name": "prometheus",
                "relationship": "dependency",
                "reason": "Prometheus sends alerts to Alertmanager for processing"
            },
            {
                "name": "grafana",
                "relationship": "complementary",
                "reason": "Often used together for monitoring and alerting visualization"
            },
            {
                "name": "curl",
                "relationship": "utility",
                "reason": "Used to interact with Alertmanager HTTP API"
            }
        ],
        "warnings": [
            "Configuration syntax errors prevent service startup",
            "Missing notification channels can cause alert delivery failures",
            "High availability clustering requires proper network configuration",
            "Webhook URLs must be accessible from Alertmanager instance",
            "Rate limiting may affect alert delivery during storms"
        ],
        "manPageUrl": "https://prometheus.io/docs/alerting/latest/alertmanager/",
        "distroNotes": {
            "linux": "Available as Docker container or compiled binary",
            "kubernetes": "Often deployed as StatefulSet with persistent storage",
            "docker": "Official image: quay.io/prometheus/alertmanager"
        }
    },
    {
        "name": "datadog",
        "standsFor": "Datadog CLI",
        "description": "Command-line tools for Datadog monitoring and observability platform",
        "examples": [
            "datadog metric post 'custom.metric' 42 --tags env:production  # Send custom metric to Datadog",
            "datadog monitor create --type metric --query 'avg(last_5m):avg:system.cpu.user{*} > 80'  # Create CPU usage monitor",
            "datadog dashboard list  # List all Datadog dashboards",
            "datadog service check web.response 0 --tags service:web  # Submit service check status",
            "datadog event post 'Deployment completed' --tags deploy:v1.0.0  # Send deployment event to Datadog",
            "datadog synthetics run-tests --public-id abc-123-def  # Trigger synthetic API test run",
            "datadog logs search 'service:web error' --from=-1h  # Search logs from last hour with filters",
            "echo --example-usage  # Simplified example for echo command"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "system",
        "safety": "caution",
        "syntaxPattern": "datadog [command] [options]",
        "prerequisites": [
            "datadog-account"
        ],
        "commandCombinations": [
            {
                "scenario": "Deployment monitoring",
                "commands": "datadog event post 'Deployment started' && deploy_app && datadog event post 'Deployment completed'",
                "explanation": "Track deployment lifecycle events",
                "title": "datadog && deploy_app && datadog"
            }
        ],
        "relatedCommands": [
            {
                "name": "newrelic",
                "relationship": "alternative",
                "reason": "Alternative APM and monitoring platform"
            }
        ],
        "warnings": [
            "Requires API and APP keys",
            "Rate limits apply to API calls",
            "Metric names must follow naming conventions"
        ],
        "manPageUrl": "https://docs.datadoghq.com/api/",
        "distroNotes": {}
    },
    {
        "name": "date",
        "standsFor": "date",
        "description": "Display or set system date and time",
        "examples": [
            "date  # Show current system date and time in default format",
            "date +%Y%m%d_%H%M%S  # Output date in YYYYMMDD_HHMMSS format for timestamps",
            "date --iso-8601  # Show date in ISO 8601 standard format",
            "date +%s  # Display seconds since Unix epoch (January 1, 1970)",
            "TZ='America/New_York' date  # Show current time in New York timezone",
            "date -d 'next friday'  # Show date of next Friday",
            "date -d '@1234567890' +'%Y-%m-%d %H:%M:%S'  # Convert Unix timestamp to readable format",
            "echo --example-usage  # Simplified example for echo command"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "system",
        "safety": "safe",
        "syntaxPattern": "date [options] [+format]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Create timestamped backup",
                "commands": "cp important.txt important_$(date +%Y%m%d).txt.backup",
                "explanation": "Create backup file with current date in filename",
                "title": "cp"
            },
            {
                "scenario": "Log with timestamp",
                "commands": "echo \"$(date): Process completed\" >> logfile.txt",
                "explanation": "Add timestamped entry to log file",
                "title": "echo >> logfile"
            }
        ],
        "relatedCommands": [
            {
                "name": "cal",
                "relationship": "related",
                "reason": "Display calendar for dates"
            }
        ],
        "warnings": [
            "Date format options vary between GNU date (Linux) and BSD date (macOS)",
            "Setting system date usually requires root privileges",
            "Time zone changes affect date output"
        ],
        "manPageUrl": "https://man7.org/linux/man-pages/man1/date.1.html",
        "distroNotes": {}
    },
    {
        "name": "dc",
        "standsFor": "Desk Calculator",
        "description": "Desk calculator using reverse Polish notation",
        "examples": [
            "dc  # Launch dc reverse Polish notation calculator",
            "echo '2 3 + p' | dc  # Add 2 and 3, then print result (5)",
            "echo '2 100 ^ p' | dc  # Calculate 2 to the power of 100",
            "echo '10 k 22 7 / p' | dc  # Set precision to 10, divide 22 by 7",
            "echo '5 d * p' | dc  # Duplicate 5 on stack, multiply (5*5=25)",
            "echo '16 o 255 p' | dc  # Set output base to 16, print 255 in hex (FF)",
            "echo '3.14159 2 k p' | dc  # Set precision to 2 decimal places, print pi",
            "echo --example-usage  # Simplified example for echo command"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "system",
        "safety": "safe",
        "syntaxPattern": "dc [options] [file]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Complex stack calculation",
                "commands": "echo '3 4 5 + * 2 / p' | dc",
                "explanation": "Calculate 3 * (4 + 5) / 2 using RPN",
                "title": "echo | dc"
            },
            {
                "scenario": "Scientific calculation",
                "commands": "echo '10 k 2 v 4 / p' | dc",
                "explanation": "Calculate sqrt(2)/4 with 10 decimal precision",
                "title": "echo | dc"
            }
        ],
        "relatedCommands": [
            {
                "name": "bc",
                "relationship": "similar",
                "reason": "bc provides infix notation calculator"
            },
            {
                "name": "awk",
                "relationship": "alternative",
                "reason": "awk can perform mathematical calculations"
            }
        ],
        "warnings": [
            "Reverse Polish notation takes practice to use",
            "Stack-based operations require understanding of stack",
            "Limited built-in mathematical functions"
        ],
        "manPageUrl": "",
        "distroNotes": {
            "windows": "Available in WSL"
        }
    },
    {
        "name": "dd",
        "standsFor": "Data Definition/Disk Dump",
        "description": "Low-level disk and data manipulation tool",
        "examples": [
            "sudo dd if=/dev/sda of=disk_image.img bs=4M status=progress  # Create complete disk image with progress indicator",
            "sudo dd if=ubuntu.iso of=/dev/sdb bs=4M status=progress && sync  # Write ISO to USB drive and sync filesystem",
            "sudo dd if=/dev/urandom of=/dev/sdb bs=4M status=progress  # Overwrite disk with random data for security",
            "sudo dd if=/dev/sda of=/dev/sdb bs=4M status=progress conv=sync  # Clone entire disk to another disk",
            "sudo dd if=/dev/sda of=mbr_backup.img bs=512 count=1  # Backup first 512 bytes (MBR) of disk",
            "sudo dd if=/dev/zero of=/swapfile bs=1M count=2048  # Create 2GB file filled with zeros for swap",
            "sudo dd if=/dev/sda bs=4M | gzip > disk_backup.gz  # Create compressed disk backup",
            "echo --example-usage  # Simplified example for echo command"
        ],
        "platform": [
            "linux",
            "macos"
        ],
        "category": "system",
        "safety": "dangerous",
        "syntaxPattern": "dd if=source of=destination [options]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Complete disk backup workflow",
                "commands": "sudo dd if=/dev/sda of=backup.img bs=4M status=progress && sha256sum backup.img > backup.sha256 && gzip backup.img",
                "explanation": "Create disk image, generate checksum, compress",
                "title": "sudo && sha256sum > backup && gzip"
            }
        ],
        "relatedCommands": [
            {
                "name": "gzip",
                "relationship": "combo",
                "reason": "Compress large disk images"
            }
        ],
        "warnings": [
            "Wrong of= parameter can destroy data",
            "Always double-check device names",
            "Use appropriate block size for performance"
        ],
        "manPageUrl": "https://man7.org/linux/man-pages/man1/dd.1.html",
        "distroNotes": {}
    },
    {
        "name": "df",
        "standsFor": "disk free",
        "description": "Display filesystem disk space usage",
        "examples": [
            "df -h  # Show disk usage in human-readable format (GB, MB)",
            "df -h /home  # Check disk usage for specific mount point",
            "df -i  # Display inode usage instead of disk space",
            "df -h -l  # Exclude network filesystems from output"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "system",
        "safety": "safe",
        "syntaxPattern": "df [options] [filesystem]...",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Alert when disk space is low",
                "commands": "df -h | awk '$5 > 80 {print $0}'",
                "explanation": "Show filesystems with more than 80% usage",
                "title": "df | awk > 80"
            },
            {
                "scenario": "Monitor disk usage over time",
                "commands": "watch 'df -h'",
                "explanation": "Continuously monitor disk space changes",
                "title": "watch"
            }
        ],
        "relatedCommands": [
            {
                "name": "du",
                "relationship": "combo",
                "reason": "Use du to find what's using disk space after df shows it's full"
            },
            {
                "name": "lsblk",
                "relationship": "similar",
                "reason": "Show block devices and mount points"
            }
        ],
        "warnings": [
            "df shows filesystem-level usage, not directory contents",
            "100% usage can prevent new file creation",
            "Reserved space for root may show >100% for regular users"
        ],
        "manPageUrl": "https://man7.org/linux/man-pages/man1/df.1.html",
        "distroNotes": {
            "windows": "Available in WSL only"
        }
    },
    {
        "name": "dmesg",
        "standsFor": "Display Message",
        "description": "Display kernel ring buffer messages",
        "examples": [
            "dmesg  # Display all messages from kernel ring buffer",
            "dmesg -w  # Watch for new kernel messages in real-time",
            "dmesg -T  # Show messages with human-readable timestamps",
            "dmesg -f kern  # Show only kernel facility messages",
            "dmesg -l err,crit,alert,emerg  # Show only error and above priority messages",
            "sudo dmesg -c  # Display messages and clear the buffer",
            "dmesg | tail -20  # Show last 20 kernel messages"
        ],
        "platform": [
            "linux",
            "macos"
        ],
        "category": "system",
        "safety": "caution",
        "syntaxPattern": "dmesg [options]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Hardware troubleshooting",
                "commands": "dmesg -T | grep -i error && lsusb && lspci",
                "explanation": "Check kernel errors and list USB/PCI devices",
                "title": "dmesg | grep && lsusb && lspci"
            }
        ],
        "relatedCommands": [
            {
                "name": "journalctl",
                "relationship": "modern-alternative",
                "reason": "journalctl -k shows kernel messages on systemd systems"
            }
        ],
        "warnings": [
            "Ring buffer has limited size, old messages are overwritten",
            "Timestamps depend on system configuration",
            "Essential for hardware and driver troubleshooting"
        ],
        "manPageUrl": "https://man7.org/linux/man-pages/man1/dmesg.1.html",
        "distroNotes": {}
    },
    {
        "name": "dstat",
        "standsFor": "Dynamic Statistics",
        "description": "Versatile system resource statistics tool",
        "examples": [
            "dstat  # Show CPU, disk, network, paging, and system statistics",
            "dstat -c  # Display only CPU usage statistics",
            "dstat -n  # Show network send/receive statistics",
            "dstat -m -s  # Display memory usage and swap statistics",
            "dstat 5 12  # Display statistics every 5 seconds for 12 intervals",
            "dstat --top-cpu --top-mem  # Show processes using most CPU and memory",
            "dstat -cdngy --output system-stats.csv  # Export comprehensive stats to CSV file"
        ],
        "platform": [
            "linux"
        ],
        "category": "system",
        "safety": "safe",
        "syntaxPattern": "dstat [options] [interval] [count]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Comprehensive system monitoring",
                "commands": "dstat -cdngy 2 30 > system_stats.txt",
                "explanation": "Monitor CPU, disk, network, paging for 1 minute",
                "title": "dstat > system_stats"
            }
        ],
        "relatedCommands": [
            {
                "name": "vmstat",
                "relationship": "similar",
                "reason": "Both provide system statistics but dstat is more colorful"
            },
            {
                "name": "iostat",
                "relationship": "similar",
                "reason": "Both show I/O statistics with different presentations"
            }
        ],
        "warnings": [
            "Linux-specific tool, deprecated in favor of newer alternatives",
            "Colorful output may not work in all terminals",
            "May not be maintained in recent distributions"
        ],
        "manPageUrl": "",
        "distroNotes": {}
    },
    {
        "name": "du",
        "standsFor": "disk usage",
        "description": "Display directory and file disk usage",
        "examples": [
            "du -h --max-depth=1 | sort -hr  # Show directory sizes at current level, sorted by size",
            "du -sh /var/log  # Show total size of directory in human-readable format",
            "du -ah | grep '[0-9]\\+G'  # Show all files and directories larger than 1GB",
            "du -sh --exclude='*.tmp' project/  # Calculate directory size excluding temporary files",
            "du -sh */ | sort -hr  # Display and sort all subdirectory sizes",
            "du -ck * | tail -1  # Show total disk usage of current directory in KB",
            "find . -size +100M -exec du -h {} \\; | sort -hr  # Find and display files larger than 100MB"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "system",
        "safety": "safe",
        "syntaxPattern": "du [options] [directory]...",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Find and clean up large files",
                "commands": "du -ah | sort -hr | head -20",
                "explanation": "Show 20 largest files and directories",
                "title": "du | sort | head"
            },
            {
                "scenario": "Disk usage report with date",
                "commands": "echo \"Disk usage report - $(date)\" && du -sh */ | sort -hr",
                "explanation": "Generate dated disk usage report",
                "title": "echo && du | sort"
            }
        ],
        "relatedCommands": [
            {
                "name": "df",
                "relationship": "combo",
                "reason": "Use df to see filesystem usage, du to find what's using space"
            },
            {
                "name": "dust",
                "relationship": "alternative",
                "reason": "Modern du replacement with better visualization"
            }
        ],
        "warnings": [
            "du can be slow on directories with many files",
            "Symbolic links are not followed by default",
            "du shows apparent size, which may differ from actual disk usage"
        ],
        "manPageUrl": "https://man7.org/linux/man-pages/man1/du.1.html",
        "distroNotes": {
            "windows": "Available in WSL only"
        }
    },
    {
        "name": "duplicity",
        "standsFor": "Duplicity",
        "description": "Encrypted bandwidth-efficient backup using rsync algorithm",
        "examples": [
            "duplicity full /home/user/ file:///backup/user/  # Create full encrypted backup to local directory",
            "duplicity incr /home/user/ file:///backup/user/  # Create incremental backup of changes since last backup",
            "duplicity /home/user/ s3://mybucket/backup/  # Backup to Amazon S3 bucket",
            "duplicity list-current-files file:///backup/user/  # List files in most recent backup",
            "duplicity restore file:///backup/user/ /restore/location/  # Restore entire backup to specified location",
            "duplicity remove-older-than 6M file:///backup/user/  # Remove backups older than 6 months",
            "duplicity verify file:///backup/user/ /home/user/  # Compare backup with source directory to verify integrity"
        ],
        "platform": [
            "linux"
        ],
        "category": "system",
        "safety": "safe",
        "syntaxPattern": "duplicity [options] source_url target_url",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Automated backup strategy",
                "commands": "duplicity incr /home/user/ file:///backup/user/ && duplicity remove-older-than 3M file:///backup/user/ && duplicity collection-status file:///backup/user/",
                "explanation": "Incremental backup, cleanup old backups, show status",
                "title": "duplicity && duplicity && duplicity"
            }
        ],
        "relatedCommands": [
            {
                "name": "rsync",
                "relationship": "similar",
                "reason": "Both provide incremental backup capabilities"
            },
            {
                "name": "gpg",
                "relationship": "combo",
                "reason": "Duplicity uses GPG for encryption"
            }
        ],
        "warnings": [
            "Requires GPG key setup for encryption",
            "Full backup needed periodically"
        ],
        "manPageUrl": "",
        "distroNotes": {}
    },
    {
        "name": "dust",
        "standsFor": "dust",
        "description": "Intuitive du alternative with visual disk usage display",
        "examples": [
            "dust  # Display disk usage with bar charts and colors",
            "dust -d 2  # Show only 2 levels deep in directory tree",
            "dust -s  # Display file sizes rather than blocks used",
            "dust -r  # Show largest directories first",
            "dust -t 100M  # Only show directories larger than 100MB",
            "dust -b  # Display sizes in bytes instead of human-readable format",
            "dust -f  # Display full path names instead of just directory names"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "system",
        "safety": "safe",
        "syntaxPattern": "dust [options] [path]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Find space hogs in specific directory",
                "commands": "dust -d 3 /var/log | head -20",
                "explanation": "Analyze log directory usage with limited depth",
                "title": "dust | head"
            },
            {
                "scenario": "Compare disk usage across filesystems",
                "commands": "dust /home /var /tmp",
                "explanation": "Compare usage across multiple directories",
                "title": "dust"
            }
        ],
        "relatedCommands": [
            {
                "name": "du",
                "relationship": "alternative",
                "reason": "Traditional disk usage tool, dust has better visualization"
            },
            {
                "name": "df",
                "relationship": "combo",
                "reason": "df shows filesystem usage, dust shows directory usage"
            }
        ],
        "warnings": [
            "Colors may not display correctly in all terminals",
            "Large directories can take time to analyze",
            "Bar chart scale adjusts based on largest directory"
        ],
        "manPageUrl": "https://github.com/bootandy/dust",
        "distroNotes": {}
    },
    {
        "name": "factor",
        "standsFor": "Factor",
        "description": "Print prime factors of numbers",
        "examples": [
            "factor 60  # Show prime factors of 60",
            "factor 12 18 24  # Show prime factors of multiple numbers",
            "echo 100 | factor  # Factor number provided via stdin",
            "seq 10 20 | factor  # Factor all numbers from 10 to 20",
            "factor 1024  # Factor large number to show power of 2",
            "echo '2^31-1' | bc | factor  # Factor result of mathematical expression",
            "for i in {2..50}; do echo -n \"$i: \"; factor $i; done  # Show factors for range with labels",
            "echo 'RSA Key Analysis:' && openssl rsa -in private.key -text -noout | grep 'modulus:' -A 20 | grep -o '[0-9a-f]{2,}' | head -20 | while read hex; do echo \"Prime factors of 0x$hex ($(echo \"ibase=16; $hex\" | bc)):  $(echo \"ibase=16; $hex\" | bc | factor)\"; done && echo 'Enterprise cryptographic analysis: RSA key modulus factorization, prime number verification, and security assessment for enterprise PKI infrastructure validation'  # Enterprise cryptographic security analysis"
        ],
        "platform": [
            "linux",
            "macos"
        ],
        "category": "system",
        "safety": "safe",
        "syntaxPattern": "factor [numbers]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Find prime numbers in range",
                "commands": "seq 2 50 | factor | grep -E ': [0-9]+$'",
                "explanation": "Find prime numbers from 2 to 50",
                "title": "seq | factor | grep"
            }
        ],
        "relatedCommands": [
            {
                "name": "seq",
                "relationship": "combo",
                "reason": "seq generates number sequences for factoring"
            },
            {
                "name": "bc",
                "relationship": "complementary",
                "reason": "bc can verify factor calculations"
            }
        ],
        "warnings": [
            "Useful for cryptography and number theory",
            "Can handle very large numbers",
            "Part of GNU coreutils package"
        ],
        "manPageUrl": "https://man7.org/linux/man-pages/man1/factor.1.html",
        "distroNotes": {}
    },
    {
        "name": "filebeat",
        "standsFor": "Filebeat Log Shipper",
        "description": "Lightweight shipper for forwarding and centralizing log data",
        "examples": [
            "filebeat -e  # Run Filebeat with logging to stderr",
            "filebeat -c filebeat.yml  # Run with custom configuration file",
            "filebeat test config  # Test configuration file validity",
            "filebeat test output  # Test connection to configured outputs",
            "filebeat setup --index-management  # Setup Elasticsearch index template",
            "filebeat modules enable nginx  # Enable built-in Nginx log parsing module",
            "filebeat export config  # Display current configuration for debugging",
            "filebeat test config && filebeat test output && systemctl is-active filebeat && filebeat export config | jq '.filebeat.inputs[] | {type: .type, paths: .paths, multiline: .multiline}' && tail -20 /var/log/filebeat/filebeat && echo 'Enterprise log monitoring validation: configuration verification, output connectivity testing, service health check, input source analysis, and recent log shipping verification for production observability infrastructure'  # Enterprise Filebeat monitoring and validation"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "system",
        "safety": "safe",
        "syntaxPattern": "filebeat [command] [flags]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Full Elasticsearch setup",
                "commands": "filebeat setup && filebeat -e",
                "explanation": "Setup dashboards and templates, then run Filebeat",
                "title": "filebeat && filebeat"
            }
        ],
        "relatedCommands": [
            {
                "name": "elasticsearch",
                "relationship": "combo",
                "reason": "Filebeat commonly ships logs to Elasticsearch"
            },
            {
                "name": "logstash",
                "relationship": "alternative",
                "reason": "Both handle log processing, Filebeat is lighter"
            }
        ],
        "warnings": [
            "Requires write permissions to log files",
            "Registry file tracks reading positions",
            "Modules must be enabled separately"
        ],
        "manPageUrl": "https://www.elastic.co/guide/en/beats/filebeat/",
        "distroNotes": {}
    },
    {
        "name": "fluentd",
        "standsFor": "Fluent Daemon",
        "description": "Unified logging layer for collecting and routing log data",
        "examples": [
            "fluentd -c fluent.conf  # Run Fluentd with specific configuration",
            "fluentd -c fluent.conf -v  # Run with verbose logging for debugging",
            "fluentd -c fluent.conf --dry-run  # Test configuration without actually running",
            "fluentd -c fluent.conf -d /var/run/fluentd.pid  # Run as daemon with PID file",
            "fluentd -c fluent.conf --suppress-repeated-stacktrace  # Run with cleaner error output",
            "fluentd --setup /etc/fluent  # Create initial configuration directory",
            "fluentd -p /usr/local/lib/fluentd/plugins  # Run with custom plugin directory",
            "fluentd -c /etc/fluentd/production.conf --suppress-repeated-stacktrace -o /var/log/fluentd/fluentd.log && sleep 5 && curl -s http://localhost:24220/api/plugins.json | jq '.plugins[] | {type: .type, plugin_id: .plugin_id, output_plugin: .output_plugin}' && tail -20 /var/log/fluentd/fluentd.log && ps aux | grep fluentd && echo 'Enterprise log aggregation: production configuration deployment, plugin status verification, health monitoring, process validation, and comprehensive logging infrastructure for enterprise observability and compliance'  # Enterprise Fluentd production monitoring"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "system",
        "safety": "safe",
        "syntaxPattern": "fluentd [options]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Production setup with logging",
                "commands": "fluentd -c fluent.conf -o /var/log/fluentd.log -d /var/run/fluentd.pid",
                "explanation": "Production daemon with log file and PID",
                "title": "fluentd"
            }
        ],
        "relatedCommands": [],
        "warnings": [
            "Ruby-based, requires Ruby runtime",
            "Plugin system can be complex",
            "Memory usage can grow with buffer sizes"
        ],
        "manPageUrl": "https://docs.fluentd.org/",
        "distroNotes": {}
    },
    {
        "name": "free",
        "standsFor": "free memory",
        "description": "Display memory usage information",
        "examples": [
            "free -h  # Show memory usage in KB, MB, GB units",
            "free -h -s 2  # Update memory display every 2 seconds",
            "free -m  # Display all memory values in megabytes",
            "free -t  # Add total line showing sum of physical and swap memory",
            "free -h -c 5  # Display memory usage 5 times then exit",
            "free -w  # Show wide output with separate buffers and cache columns",
            "watch -n 1 'free -h'  # Continuously monitor memory usage every second",
            "while true; do clear; echo '=== Enterprise Memory Monitoring Dashboard ===' && echo \"Timestamp: $(date)\" && free -h && echo '' && echo 'Memory Alert Thresholds:' && free | awk 'NR==2 {total=$2; avail=$7; used_pct=(total-avail)/total*100; if(used_pct>85) print \"🔴 CRITICAL: Memory usage at \" used_pct \"%\"; else if(used_pct>75) print \"🟡 WARNING: Memory usage at \" used_pct \"%\"; else print \"🟢 NORMAL: Memory usage at \" used_pct \"%\"}' && echo '' && ps aux --sort=-%mem | head -6 && sleep 30; done  # Enterprise memory monitoring with alerting and top processes"
        ],
        "platform": [
            "linux"
        ],
        "category": "system",
        "safety": "safe",
        "syntaxPattern": "free [options]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Check for memory leaks",
                "commands": "while true; do free -h | grep Mem | awk '{print strftime(\"%Y-%m-%d %H:%M:%S\"), \"Used:\", $3, \"Available:\", $7}'; sleep 60; done",
                "explanation": "Monitor memory usage every minute with timestamps",
                "title": "while ; do | grep | awk ; sleep ; done"
            },
            {
                "scenario": "Alert on low memory",
                "commands": "free | awk 'NR==2{if($7<1000000) print \"Warning: Available memory below 1GB\"}'",
                "explanation": "Check if available memory is below threshold",
                "title": "free | awk < 1000000"
            }
        ],
        "relatedCommands": [
            {
                "name": "vmstat",
                "relationship": "comprehensive",
                "reason": "Shows memory stats along with CPU and I/O"
            },
            {
                "name": "top",
                "relationship": "interactive",
                "reason": "Interactive memory monitoring with process details"
            }
        ],
        "warnings": [
            "Linux-specific command, not available on macOS",
            "Available memory is more important than free memory on modern systems",
            "Cache and buffers are counted as used but are reclaimable"
        ],
        "manPageUrl": "https://man7.org/linux/man-pages/man1/free.1.html",
        "distroNotes": {}
    },
    {
        "name": "fsck",
        "standsFor": "File System Check",
        "description": "Check and repair filesystem consistency",
        "examples": [
            "sudo fsck /dev/sdb1  # Check filesystem on device for errors",
            "sudo fsck -y /dev/sdb1  # Automatically fix minor filesystem errors",
            "sudo fsck -A  # Check all filesystems listed in /etc/fstab",
            "sudo fsck -f /dev/sdb1  # Force check even if filesystem appears clean",
            "fsck -n /dev/sdb1  # Check filesystem read-only without making repairs",
            "sudo fsck -v /dev/sdb1  # Check with verbose output showing progress",
            "echo 'Enterprise Filesystem Health Check' && for device in $(lsblk -ndo NAME,FSTYPE | grep -E 'ext[234]|xfs' | awk '{print \"/dev/\" $1}'); do echo \"Checking $device...\"; sudo fsck -n \"$device\" 2>&1 | grep -E '(error|clean|corrupt)' && echo \"$device: $(tune2fs -l \"$device\" 2>/dev/null | grep 'Last checked' | cut -d: -f2-)\"; done && echo 'RAID Status:' && cat /proc/mdstat 2>/dev/null | grep -E 'active|failed' && echo 'Enterprise storage infrastructure validation: automated filesystem integrity verification, metadata analysis, and RAID health monitoring for data protection and system reliability'  # Enterprise storage health monitoring"
        ],
        "platform": [
            "linux",
            "macos"
        ],
        "category": "system",
        "safety": "caution",
        "syntaxPattern": "fsck [options] device",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Safe filesystem repair",
                "commands": "sudo umount /dev/sdb1 && sudo fsck -y /dev/sdb1 && sudo mount /dev/sdb1 /mnt/data",
                "explanation": "Unmount, check and repair, then remount filesystem",
                "title": "sudo && sudo && sudo"
            }
        ],
        "relatedCommands": [],
        "warnings": [
            "Never run fsck on mounted filesystem (can cause corruption)",
            "Always unmount filesystem before checking",
            "Backup important data before running repair operations"
        ],
        "manPageUrl": "https://man7.org/linux/man-pages/man8/fsck.8.html",
        "distroNotes": {}
    },
    {
        "name": "fuser",
        "standsFor": "File User",
        "description": "Identify processes using files or sockets",
        "examples": [
            "fuser /path/to/file  # Display processes currently using specific file",
            "fuser -v /path/to/file  # Show detailed information about processes using file",
            "fuser -k /path/to/file  # Terminate all processes using the file",
            "fuser -m /mnt/usb  # Show processes using files in mounted filesystem",
            "fuser -n tcp 80  # Show processes using TCP port 80",
            "fuser -ki /path/to/file  # Interactively kill processes using file",
            "fuser -s /path/to/file  # Silent mode, only return exit status",
            "echo 'Enterprise Process File Usage Analysis' && for critical_file in /var/log/application.log /etc/nginx/nginx.conf /opt/app/config.yml; do if [ -f \"$critical_file\" ]; then echo \"Analyzing: $critical_file\"; fuser -v \"$critical_file\" 2>/dev/null | grep -v COMMAND | while read user pid access comm; do ps -p $pid -o pid,ppid,user,comm,cmd --no-headers; done | head -5; fi; done && echo 'Active Mount Points:' && lsof +D /mnt 2>/dev/null | head -10 && echo 'Enterprise file usage diagnostics: critical file access monitoring, process dependency mapping, and mount point utilization for system troubleshooting and capacity planning'  # Enterprise file usage monitoring"
        ],
        "platform": [
            "linux",
            "macos"
        ],
        "category": "system",
        "safety": "safe",
        "syntaxPattern": "fuser [options] files",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Safe unmount",
                "commands": "fuser -m /mnt/disk && umount /mnt/disk || fuser -km /mnt/disk && umount /mnt/disk",
                "explanation": "Check for processes using mount, kill if necessary, then unmount",
                "title": "fuser && umount || fuser && umount"
            }
        ],
        "relatedCommands": [
            {
                "name": "lsof",
                "relationship": "similar",
                "reason": "lsof provides more detailed output but similar functionality"
            }
        ],
        "warnings": [
            "Can kill processes with -k option - use with caution",
            "Useful for troubleshooting 'device busy' errors",
            "Different output format compared to lsof"
        ],
        "manPageUrl": "https://man7.org/linux/man-pages/man1/fuser.1.html",
        "distroNotes": {}
    },
    {
        "name": "groupmod",
        "standsFor": "Group Modify",
        "description": "Modify group account properties and memberships",
        "examples": [
            "sudo groupmod -n newname oldname  # Change group name from oldname to newname",
            "sudo groupmod -g 2000 groupname  # Change group ID to 2000",
            "sudo gpasswd -a username groupname  # Add user to group using gpasswd",
            "sudo gpasswd -d username groupname  # Remove user from group",
            "echo 'Enterprise Group Management and Access Control' && echo 'Current Groups:' && getent group | grep -E '(admin|sudo|developers|security)' && echo 'Creating Enterprise Groups:' && sudo groupadd --gid 3000 enterprise-admins && sudo groupadd --gid 3001 enterprise-developers && sudo groupadd --gid 3002 enterprise-security && echo 'User Assignment:' && sudo usermod -aG enterprise-developers,docker,sudo $USER && echo 'Access Control Validation:' && groups $USER && echo 'Permission Audit:' && find /opt/enterprise -type d -exec ls -ld {} ; | head -10 && echo 'Enterprise group management: role-based access control, security group assignment, permission validation, directory access auditing, and comprehensive user privilege management for enterprise security and compliance'  # Enterprise group management and access control",
            "sudo usermod -aG groupname username  # Add user to group (alternative method)"
        ],
        "platform": [
            "linux",
            "macos"
        ],
        "category": "system",
        "safety": "caution",
        "syntaxPattern": "groupmod [options] groupname",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Group management workflow",
                "commands": "sudo groupmod -g 3000 developers && sudo gpasswd -a newuser developers",
                "explanation": "Change group ID then add new user",
                "title": "sudo && sudo"
            }
        ],
        "relatedCommands": [
            {
                "name": "usermod",
                "relationship": "combo",
                "reason": "Often used together for user/group management"
            }
        ],
        "warnings": [
            "Changing GID may affect file permissions",
            "Files owned by old GID become orphaned"
        ],
        "manPageUrl": "https://man7.org/linux/man-pages/man8/groupmod.8.html",
        "distroNotes": {}
    },
    {
        "name": "htop",
        "standsFor": "H Top",
        "description": "Interactive process viewer and system monitor with better interface",
        "examples": [
            "htop  # Launch interactive system monitor with colorful display",
            "htop -s PERCENT_CPU  # Start htop sorted by CPU usage",
            "htop -s PERCENT_MEM  # Start htop sorted by memory usage",
            "htop -t  # Display processes in tree format showing relationships",
            "htop -u username  # Show only processes owned by specific user",
            "htop -C  # Disable colors for terminal compatibility",
            "echo 'Enterprise System Monitoring and Performance Analysis' && echo 'System Health Dashboard:' && htop -d 5 & HTOP_PID=$! && sleep 10 && kill $HTOP_PID && echo 'Process Analysis:' && ps aux --sort=-%cpu | head -20 | awk '{printf \"%-15s %5s %5s %s\\n\", $1, $3, $4, $11}' && echo 'Memory Utilization:' && free -h && echo 'Disk I/O:' && iostat -x 1 3 && echo 'Network Connections:' && ss -tuln | wc -l && echo 'Load Average Trend:' && uptime && echo 'Enterprise Performance Report:' && echo \"System Performance Report - $(date)\" > perf-report-$(date +%Y%m%d).txt && echo \"CPU Usage: $(top -bn1 | grep \"Cpu(s)\" | awk '{print $2}')\" >> perf-report-$(date +%Y%m%d).txt && echo \"Memory Usage: $(free | grep Mem | awk '{printf \"%.1f%%\", $3/$2 * 100.0}')\" >> perf-report-$(date +%Y%m%d).txt && echo 'Enterprise system monitoring: real-time performance analysis, process utilization tracking, memory optimization, I/O performance metrics, network connectivity monitoring, and comprehensive system health reporting for enterprise infrastructure management'  # Enterprise system monitoring and performance analysis"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "system",
        "safety": "safe",
        "syntaxPattern": "htop [options]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "System health monitoring",
                "commands": "htop & sleep 5 && pkill htop && free -h && df -h",
                "explanation": "Quick system overview with memory and disk usage",
                "title": "htop & sleep && pkill && free && df"
            }
        ],
        "relatedCommands": [
            {
                "name": "top",
                "relationship": "improvement",
                "reason": "htop is an improved version of top with better interface"
            }
        ],
        "warnings": [
            "Interactive keys: F1=Help, F9=Kill, F10=Quit",
            "May not be installed by default on all systems",
            "Color scheme depends on terminal capabilities"
        ],
        "manPageUrl": "https://htop.dev/",
        "distroNotes": {}
    },
    {
        "name": "ionice",
        "standsFor": "I/O Nice",
        "description": "Set or get I/O scheduling class and priority for processes",
        "examples": [
            "ionice -c 3 rsync -av /source/ /dest/  # Run rsync with idle I/O class (only uses idle I/O)",
            "ionice -c 2 -n 7 backup_script.sh  # Run backup with best-effort class, lowest priority (7)",
            "ionice -p 1234  # Show I/O scheduling info for process 1234",
            "sudo ionice -c 3 -p 1234  # Change running process to idle I/O class",
            "ionice -c 1 -n 4 database_import.py  # Run critical task with real-time I/O class"
        ],
        "platform": [
            "linux"
        ],
        "category": "system",
        "safety": "caution",
        "syntaxPattern": "ionice [options] command",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "System-friendly intensive task",
                "commands": "nice -n 19 ionice -c 3 find / -name '*.log' -delete",
                "explanation": "Delete log files with low CPU and I/O priority",
                "title": "nice"
            }
        ],
        "relatedCommands": [
            {
                "name": "nice",
                "relationship": "combo",
                "reason": "Set CPU scheduling priority"
            }
        ],
        "warnings": [
            "Only available on Linux systems",
            "Idle class may cause very slow execution"
        ],
        "manPageUrl": "https://man7.org/linux/man-pages/man1/ionice.1.html",
        "distroNotes": {}
    },
    {
        "name": "iostat",
        "standsFor": "I/O Statistics",
        "description": "Report system I/O and CPU statistics",
        "examples": [
            "iostat  # Show current CPU and I/O statistics",
            "iostat -x  # Display extended disk I/O statistics",
            "iostat 2 10  # Display statistics every 2 seconds for 10 iterations",
            "iostat -h  # Show statistics in human-readable format",
            "iostat -c  # Display only CPU statistics",
            "iostat -d sda  # Show statistics for specific device",
            "iostat -m  # Display statistics in megabytes per second"
        ],
        "platform": [
            "linux",
            "macos"
        ],
        "category": "system",
        "safety": "safe",
        "syntaxPattern": "iostat [options] [interval] [count]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "System performance baseline",
                "commands": "iostat -x 1 60 > io_baseline.txt && vmstat 1 60 > cpu_baseline.txt",
                "explanation": "Collect 1-minute baseline of I/O and CPU performance",
                "title": "iostat > io_baseline && vmstat > cpu_baseline"
            }
        ],
        "relatedCommands": [
            {
                "name": "vmstat",
                "relationship": "complementary",
                "reason": "vmstat provides memory and CPU statistics"
            },
            {
                "name": "iotop",
                "relationship": "complementary",
                "reason": "iotop shows per-process I/O activity"
            }
        ],
        "warnings": [
            "Part of sysstat package on most Linux distributions",
            "First report shows averages since boot",
            "Subsequent reports show interval averages"
        ],
        "manPageUrl": "https://man7.org/linux/man-pages/man1/iostat.1.html",
        "distroNotes": {}
    },
    {
        "name": "iotop",
        "standsFor": "I/O Top",
        "description": "Monitor I/O usage by processes in real-time",
        "examples": [
            "sudo iotop  # Show real-time I/O usage by processes",
            "sudo iotop -a  # Display accumulated I/O instead of bandwidth",
            "sudo iotop -o  # Show only processes currently doing I/O",
            "sudo iotop -b -n 3  # Batch mode with 3 iterations for scripting",
            "sudo iotop -p 1234  # Monitor I/O for specific process ID",
            "sudo iotop -k  # Use kilobytes instead of human-readable units"
        ],
        "platform": [
            "linux"
        ],
        "category": "system",
        "safety": "caution",
        "syntaxPattern": "iotop [options]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "I/O performance analysis",
                "commands": "sudo iotop -ao && iostat 1 5",
                "explanation": "Show accumulated I/O activity and system I/O stats",
                "title": "sudo && iostat"
            }
        ],
        "relatedCommands": [
            {
                "name": "iostat",
                "relationship": "complementary",
                "reason": "iostat shows system-wide I/O statistics"
            },
            {
                "name": "pidstat",
                "relationship": "similar",
                "reason": "pidstat can also monitor per-process I/O"
            }
        ],
        "warnings": [
            "Requires root privileges to access process I/O information",
            "Linux-specific tool, not available on other platforms",
            "May impact system performance during monitoring"
        ],
        "manPageUrl": "https://man7.org/linux/man-pages/man8/iotop.8.html",
        "distroNotes": {}
    },
    {
        "name": "jobs",
        "standsFor": "Jobs",
        "description": "Display active jobs in current shell session",
        "examples": [
            "jobs  # Show all background and suspended jobs",
            "jobs -p  # Display process IDs of job processes",
            "jobs -r  # Show only running background jobs",
            "jobs -s  # Show only suspended/stopped jobs",
            "jobs -l  # Display job information including process group IDs for advanced job control"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "system",
        "safety": "safe",
        "syntaxPattern": "jobs [options]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Background job management",
                "commands": "long_command & jobs && fg %1",
                "explanation": "Start job in background, list jobs, bring first job to foreground",
                "title": "long_command & jobs && fg"
            }
        ],
        "relatedCommands": [],
        "warnings": [
            "Jobs are specific to current shell session",
            "Job numbers are assigned sequentially"
        ],
        "manPageUrl": "https://ss64.com/osx/jobs.html",
        "distroNotes": {}
    },
    {
        "name": "journalctl",
        "standsFor": "Journal Control",
        "description": "Query and display systemd journal logs",
        "examples": [
            "journalctl  # Display all journal entries (oldest first)",
            "journalctl -f  # Follow new log entries as they appear",
            "journalctl -u nginx  # Show logs only for nginx service",
            "journalctl --since '2025-09-01 10:00:00'  # Show logs from specific date and time",
            "journalctl --since today  # Display logs from today only",
            "journalctl -k  # Show only kernel messages",
            "journalctl -p err  # Show only error level messages and above",
            "journalctl -r  # Display logs in reverse chronological order",
            "journalctl -u apache2 --since 'yesterday' --until 'now' -o json-pretty --no-pager > apache_debug.json  # Export recent Apache logs in formatted JSON for analysis"
        ],
        "platform": [
            "linux"
        ],
        "category": "system",
        "safety": "safe",
        "syntaxPattern": "journalctl [options]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Service troubleshooting",
                "commands": "systemctl status nginx && journalctl -u nginx --since '10 minutes ago'",
                "explanation": "Check service status and recent logs",
                "title": "systemctl && journalctl"
            }
        ],
        "relatedCommands": [
            {
                "name": "systemctl",
                "relationship": "combo",
                "reason": "systemctl manages services, journalctl shows their logs"
            },
            {
                "name": "dmesg",
                "relationship": "similar",
                "reason": "dmesg shows kernel messages, journalctl -k does similar"
            }
        ],
        "warnings": [
            "systemd-only, not available on non-systemd systems",
            "Logs are stored in binary format, not plain text",
            "Can consume significant disk space over time"
        ],
        "manPageUrl": "https://man7.org/linux/man-pages/man1/journalctl.1.html",
        "distroNotes": {}
    },
    {
        "name": "kill",
        "standsFor": "kill",
        "description": "Terminate processes by sending signals",
        "examples": [
            "kill 1234  # Send TERM signal to process ID 1234 for clean shutdown",
            "kill -9 1234  # Send KILL signal to immediately terminate process",
            "killall firefox  # Terminate all processes named firefox",
            "kill -HUP 1234  # Send hangup signal to reload process configuration",
            "kill 0  # Terminate all processes in current process group",
            "kill -CONT $(pgrep -f 'my_suspended_app')  # Resume suspended process by sending CONT signal to matching process name"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "system",
        "safety": "dangerous",
        "syntaxPattern": "kill [options] <pid>...",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Find and kill process in one command",
                "commands": "ps aux | grep 'node server' | grep -v grep | awk '{print $2}' | xargs kill",
                "explanation": "Find Node.js server process and terminate it",
                "title": "ps | grep | grep | awk | xargs"
            },
            {
                "scenario": "Kill processes using specific port",
                "commands": "lsof -ti:8080 | xargs kill -9",
                "explanation": "Force kill all processes using port 8080",
                "title": "lsof | xargs"
            }
        ],
        "relatedCommands": [
            {
                "name": "ps",
                "relationship": "combo",
                "reason": "Use ps to find process ID before killing"
            },
            {
                "name": "killall",
                "relationship": "alternative",
                "reason": "Kill processes by name instead of PID"
            },
            {
                "name": "pkill",
                "relationship": "alternative",
                "reason": "Kill processes using pattern matching"
            }
        ],
        "warnings": [
            "kill -9 should be last resort - doesn't allow clean shutdown",
            "Cannot kill init process (PID 1)",
            "May need sudo to kill processes owned by other users"
        ],
        "manPageUrl": "https://man7.org/linux/man-pages/man1/kill.1.html",
        "distroNotes": {
            "windows": "Available in WSL only"
        }
    },
    {
        "name": "killall",
        "standsFor": "kill all",
        "description": "Kill processes by name",
        "examples": [
            "killall firefox  # Terminate all Firefox processes by name",
            "killall -HUP nginx  # Send hangup signal to nginx for configuration reload",
            "killall -i chrome  # Prompt before killing each Chrome process",
            "killall -e python3.9  # Kill only processes with exact name match",
            "killall -w myapp  # Wait until all myapp processes have actually terminated",
            "killall -9 stuck_process  # Force kill all instances of stuck_process",
            "killall -u username -TERM  # Gracefully terminate all processes owned by specific user for session cleanup"
        ],
        "platform": [
            "linux",
            "macos"
        ],
        "category": "system",
        "safety": "safe",
        "syntaxPattern": "killall [options] <name>",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Restart service gracefully",
                "commands": "killall -TERM apache2 && sleep 2 && systemctl start apache2",
                "explanation": "Gracefully stop Apache then restart it",
                "title": "killall && sleep && systemctl"
            },
            {
                "scenario": "Force kill stuck processes",
                "commands": "killall myapp || killall -9 myapp",
                "explanation": "Try normal kill first, then force kill if needed",
                "title": "killall || killall"
            }
        ],
        "relatedCommands": [
            {
                "name": "pkill",
                "relationship": "similar",
                "reason": "More flexible pattern matching for killing processes"
            },
            {
                "name": "kill",
                "relationship": "basic",
                "reason": "Kill specific processes by PID"
            },
            {
                "name": "pgrep",
                "relationship": "find",
                "reason": "Find process IDs before using kill"
            }
        ],
        "warnings": [
            "killall kills ALL processes with matching name",
            "Process name must match exactly (use -e for strict matching)",
            "On some systems, killall without arguments kills ALL processes"
        ],
        "manPageUrl": "https://man7.org/linux/man-pages/man1/killall.1.html",
        "distroNotes": {}
    },
    {
        "name": "lsblk",
        "standsFor": "list block devices",
        "description": "List block devices in tree format",
        "examples": [
            "lsblk  # Display all block devices in tree format with mount points",
            "lsblk -f  # Include filesystem type, labels, and UUIDs",
            "lsblk -h  # Show sizes in KB, MB, GB instead of bytes",
            "lsblk /dev/sda  # Show partition layout for specific disk",
            "lsblk -J  # Machine-readable JSON output for scripts",
            "lsblk -o NAME,SIZE,TYPE,MOUNTPOINT,FSTYPE,UUID | grep -E 'part|disk' | awk '$3==\"part\" && $4==\"\" {print $1, $2, $5, $6}' | column -t  # Display unmounted partitions with filesystem type and UUID for mounting or maintenance planning"
        ],
        "platform": [
            "linux"
        ],
        "category": "system",
        "safety": "safe",
        "syntaxPattern": "lsblk [options] [device]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Find unmounted filesystems",
                "commands": "lsblk -f | grep -v '/$\\|\\[SWAP\\]' | awk '$4 == \"\" {print $1}'",
                "explanation": "Identify block devices that are not currently mounted",
                "title": "lsblk | grep | | awk"
            },
            {
                "scenario": "Check disk usage with partition info",
                "commands": "lsblk && echo '---' && df -h",
                "explanation": "Show block device layout followed by filesystem usage",
                "title": "lsblk && echo && df"
            }
        ],
        "relatedCommands": [
            {
                "name": "df",
                "relationship": "combo",
                "reason": "Shows filesystem usage for mounted devices"
            },
            {
                "name": "mount",
                "relationship": "combo",
                "reason": "Mount/unmount block devices shown by lsblk"
            }
        ],
        "warnings": [
            "Linux-specific command, not available on other systems",
            "Some information requires root privileges",
            "Tree format may be confusing for complex disk layouts"
        ],
        "manPageUrl": "https://man7.org/linux/man-pages/man8/lsblk.8.html",
        "distroNotes": {}
    },
    {
        "name": "lscpu",
        "standsFor": "list CPU",
        "description": "Display detailed CPU architecture information",
        "examples": [
            "lscpu  # Show detailed CPU architecture, cores, threads, and cache info",
            "lscpu | grep -i vuln  # Display CPU security vulnerability mitigations",
            "lscpu -p  # Display CPU topology in parseable format",
            "lscpu -J  # Generate machine-readable JSON output",
            "lscpu | awk '/^CPU(s):|^Thread(s):|^CPU MHz:|^Model name:/ {print}' && cat /proc/meminfo | awk '/MemTotal|MemAvailable/ {print}' && echo \"Performance Scaling:\" && cat /sys/devices/system/cpu/cpu0/cpufreq/scaling_governor 2>/dev/null || echo 'Not available'  # Create comprehensive system profile for performance tuning including CPU specs, memory, and power management"
        ],
        "platform": [
            "linux"
        ],
        "category": "system",
        "safety": "safe",
        "syntaxPattern": "lscpu [options]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "CPU info for system inventory",
                "commands": "echo 'CPU Info:' && lscpu | grep -E 'Model name|CPU\\(s\\)|Thread'",
                "explanation": "Extract key CPU details for documentation",
                "title": "echo && lscpu | grep | CPU | Thread"
            },
            {
                "scenario": "Check if hyperthreading is enabled",
                "commands": "lscpu | awk '/^CPU\\(s\\):/ {cpu=$2} /^Thread/ {thread=$4} END {if(cpu/thread > 1) print \"Hyperthreading: Enabled\"; else print \"Hyperthreading: Disabled\"}'",
                "explanation": "Determine hyperthreading status from CPU topology",
                "title": "lscpu | awk > 1 ; else"
            }
        ],
        "relatedCommands": [],
        "warnings": [
            "Linux-specific command, not available on macOS",
            "Some fields may require root privileges to display",
            "Output format may vary between different Linux distributions"
        ],
        "manPageUrl": "https://man7.org/linux/man-pages/man1/lscpu.1.html",
        "distroNotes": {}
    },
    {
        "name": "lsof",
        "standsFor": "List Open Files",
        "description": "List open files and network connections",
        "examples": [
            "lsof -p 1234  # Show all files opened by process ID 1234",
            "lsof /var/log/syslog  # Show which processes have syslog file open",
            "lsof -i  # Show all network connections",
            "lsof -i :80  # Show which process is using port 80",
            "lsof -u username  # Show all files opened by specific user",
            "lsof +D /var/www/  # Show processes accessing files in directory recursively",
            "lsof -i -P -n | grep -E '(LISTEN|ESTABLISHED)' | sort -k1,1 -k9,9 | awk '{print $1, $3, $8, $9}' | column -t  # Show detailed network connections by process with numeric ports, sorted and formatted for security analysis"
        ],
        "platform": [
            "linux",
            "macos"
        ],
        "category": "system",
        "safety": "safe",
        "syntaxPattern": "lsof [options] [files]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Web server troubleshooting",
                "commands": "lsof -i :80 && lsof -i :443 && lsof -u www-data",
                "explanation": "Check HTTP/HTTPS port usage and web server user files",
                "title": "lsof && lsof && lsof"
            }
        ],
        "relatedCommands": [
            {
                "name": "netstat",
                "relationship": "similar",
                "reason": "Both show network connections"
            },
            {
                "name": "fuser",
                "relationship": "similar",
                "reason": "Show processes using files"
            }
        ],
        "warnings": [
            "Output can be very verbose",
            "Some information requires root privileges"
        ],
        "manPageUrl": "https://man7.org/linux/man-pages/man8/lsof.8.html",
        "distroNotes": {}
    },
    {
        "name": "mount",
        "standsFor": "Mount",
        "description": "Mount filesystems to directory tree",
        "examples": [
            "sudo mount /dev/sdb1 /mnt/usb  # Mount USB device to /mnt/usb directory",
            "sudo mount -t ext4 /dev/sdc1 /mnt/data  # Mount device specifying ext4 filesystem type",
            "sudo mount -o ro /dev/sdb1 /mnt/readonly  # Mount filesystem in read-only mode",
            "mount  # Display all currently mounted filesystems",
            "sudo mount -o loop disk.iso /mnt/iso  # Mount ISO file as loopback device",
            "sudo mount -o remount,rw /dev/sdb1  # Remount filesystem with read-write permissions"
        ],
        "platform": [
            "linux",
            "macos"
        ],
        "category": "system",
        "safety": "caution",
        "syntaxPattern": "mount [options] device mountpoint",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Safe USB mount",
                "commands": "sudo mkdir -p /mnt/usb && sudo mount /dev/sdb1 /mnt/usb && ls /mnt/usb",
                "explanation": "Create mount point, mount USB, and list contents",
                "title": "sudo && sudo && ls"
            }
        ],
        "relatedCommands": [
            {
                "name": "umount",
                "relationship": "combo",
                "reason": "umount unmounts filesystems mounted by mount"
            },
            {
                "name": "lsblk",
                "relationship": "complementary",
                "reason": "lsblk helps identify devices to mount"
            }
        ],
        "warnings": [
            "Requires root privileges for most operations",
            "Mount point directory must exist before mounting",
            "Always umount before physically disconnecting devices"
        ],
        "manPageUrl": "https://man7.org/linux/man-pages/man8/mount.8.html",
        "distroNotes": {}
    },
    {
        "name": "nmon",
        "standsFor": "Nigel's Monitor",
        "description": "System performance monitor for AIX and Linux",
        "examples": [
            "nmon  # Start nmon with interactive dashboard",
            "nmon -f -s 30 -c 120  # Collect data every 30 seconds for 120 snapshots",
            "nmon -c 10 -s 5 -f -d  # Collect disk data every 5 seconds for 10 snapshots",
            "nmon -fT -s 60 -c 1440  # Generate 24-hour performance report with timestamps"
        ],
        "platform": [
            "linux"
        ],
        "category": "system",
        "safety": "safe",
        "syntaxPattern": "nmon [options]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Long-term monitoring with analysis",
                "commands": "nmon -fT -s 300 -c 288 && ls *.nmon",
                "explanation": "Collect 24 hours of data every 5 minutes, list output files",
                "title": "nmon && ls"
            }
        ],
        "relatedCommands": [
            {
                "name": "htop",
                "relationship": "alternative",
                "reason": "Both provide interactive system monitoring"
            },
            {
                "name": "sar",
                "relationship": "similar",
                "reason": "Both collect comprehensive system performance data"
            },
            {
                "name": "top",
                "relationship": "alternative",
                "reason": "Traditional process monitor vs nmon's comprehensive view"
            }
        ],
        "warnings": [
            "Interactive mode has specific key commands (c=CPU, d=disk, etc.)",
            "Data files (.nmon) need separate tools for analysis",
            "May not be available in standard repositories"
        ],
        "manPageUrl": "http://nmon.sourceforge.net/pmwiki.php",
        "distroNotes": {
            "linux": "Install via package manager or download from IBM"
        }
    },
    {
        "name": "nohup",
        "standsFor": "no hangup",
        "description": "Run commands immune to hangups, with output to non-tty",
        "examples": [
            "nohup ./long-running-script.sh &  # Run script that continues after terminal closes",
            "nohup python data-processor.py > processing.log 2>&1 &  # Redirect both stdout and stderr to custom log file",
            "nohup ./server --port 8080 &  # Start server that survives SSH session disconnect",
            "nohup make -j4 > build.log 2>&1 &  # Start compilation that continues even if you log out"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "system",
        "safety": "safe",
        "syntaxPattern": "nohup <command> [arguments] &",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Monitor nohup process",
                "commands": "nohup ./monitor.sh & echo $! > monitor.pid && tail -f nohup.out",
                "explanation": "Start background process, save PID, and monitor output",
                "title": "nohup & echo > monitor && tail"
            },
            {
                "scenario": "Start multiple background jobs",
                "commands": "for i in {1..3}; do nohup ./worker$i.sh > worker$i.log 2>&1 & done",
                "explanation": "Start multiple worker processes with separate log files",
                "title": "for ; do > worker >& 1 & done"
            }
        ],
        "relatedCommands": [
            {
                "name": "screen",
                "relationship": "alternative",
                "reason": "Terminal multiplexer that can detach/reattach sessions"
            },
            {
                "name": "tmux",
                "relationship": "alternative",
                "reason": "Modern terminal multiplexer with session management"
            }
        ],
        "warnings": [
            "Output goes to nohup.out by default if not redirected",
            "Process continues even after shell exits",
            "Need to track process ID to kill background job later"
        ],
        "manPageUrl": "https://man7.org/linux/man-pages/man1/nohup.1.html",
        "distroNotes": {
            "windows": "Available in WSL and Git Bash only"
        }
    },
    {
        "name": "osquery",
        "standsFor": "Operating System Query",
        "description": "SQL-based framework for system monitoring and forensic analysis",
        "examples": [
            "osqueryi  # Start interactive osquery shell for system querying",
            "osqueryi --line \"SELECT pid, name, cmdline FROM processes;\"  # List all running processes with command lines",
            "osqueryi --line \"SELECT * FROM process_open_sockets WHERE family=2;\"  # Show IPv4 network connections by processes",
            "osqueryi --line \"SELECT * FROM users WHERE uid >= 1000;\"  # List non-system users",
            "osqueryi --json \"SELECT p.pid, p.name, p.cmdline, p.uid, u.username, f.path FROM processes p JOIN users u ON p.uid=u.uid LEFT JOIN file_events f ON p.pid=f.pid WHERE p.name IN ('bash','sh','python','node','java') AND p.start_time > (strftime('%s','now')-3600);\" | jq '[.[] | {process: .name, user: .username, command: .cmdline, recent_files: .path}]' > security-audit-$(date +%Y%m%d-%H%M).json && osqueryi --json \"SELECT * FROM process_open_sockets WHERE family=2 AND local_port < 1024\" | jq '[.[] | select(.remote_address != \"0.0.0.0\" and .remote_address != \"127.0.0.1\")]' > privileged-network-connections.json  # Advanced security forensics: correlate processes, users, file access, and network connections with JSON reporting for SIEM integration"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "system",
        "safety": "safe",
        "syntaxPattern": "osqueryi [options] or osquery [sql-query]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Security incident investigation",
                "commands": "osqueryi --line \"SELECT * FROM processes WHERE parent != (SELECT pid FROM processes WHERE processes.pid = processes.parent);\" > suspicious_processes.txt",
                "explanation": "Find processes without valid parents (potential indicators)",
                "title": "osqueryi ; > suspicious_processes"
            }
        ],
        "relatedCommands": [
            {
                "name": "lsof",
                "relationship": "similar",
                "reason": "System information querying capabilities"
            },
            {
                "name": "netstat",
                "relationship": "similar",
                "reason": "Network connection monitoring"
            }
        ],
        "warnings": [
            "SQL syntax specific to osquery tables",
            "Performance impact on system resources",
            "Learning curve for effective query writing"
        ],
        "manPageUrl": "https://osquery.readthedocs.io/",
        "distroNotes": {}
    },
    {
        "name": "ps",
        "standsFor": "process status",
        "description": "Display information about running processes",
        "examples": [
            "ps aux  # Show all processes with detailed information",
            "ps aux | grep python  # List all Python processes currently running",
            "ps auxf  # Display processes in tree format showing parent-child relationships",
            "ps aux --sort=-%cpu | head -10  # Show top 10 processes consuming most CPU",
            "ps ux  # Show only processes owned by current user",
            "ps auxww --sort=-%cpu | head -20 && ps auxww --sort=-%mem | head -20 && ps -eo pid,ppid,cmd,%mem,%cpu --sort=-%cpu | grep -E '(apache2|nginx|mysql|postgres|java|python)' | head -20 && echo \"Enterprise process monitoring: top CPU consumers, memory usage leaders, critical services identified, system resource utilization analyzed\"  # Enterprise system process analysis with comprehensive resource monitoring, service identification, and performance insight generation"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "system",
        "safety": "safe",
        "syntaxPattern": "ps [options]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Kill processes by name",
                "commands": "ps aux | grep defunct | awk '{print $2}' | xargs kill",
                "explanation": "Find and kill zombie processes",
                "title": "ps | grep | awk | xargs"
            },
            {
                "scenario": "Monitor resource usage over time",
                "commands": "watch 'ps aux --sort=-%cpu | head -20'",
                "explanation": "Continuously monitor top CPU-consuming processes",
                "title": "watch | head"
            }
        ],
        "relatedCommands": [
            {
                "name": "top",
                "relationship": "alternative",
                "reason": "Interactive process viewer with real-time updates"
            },
            {
                "name": "htop",
                "relationship": "alternative",
                "reason": "Enhanced interactive process viewer with better interface"
            },
            {
                "name": "kill",
                "relationship": "combo",
                "reason": "Use ps to find process ID, then kill to terminate"
            }
        ],
        "warnings": [
            "ps output format varies between systems (BSD vs GNU)",
            "Process IDs (PIDs) change each time process starts",
            "Some processes may not be visible to regular users"
        ],
        "manPageUrl": "https://man7.org/linux/man-pages/man1/ps.1.html",
        "distroNotes": {
            "windows": "Available in WSL only"
        }
    },
    {
        "name": "sar",
        "standsFor": "System Activity Reporter",
        "description": "System Activity Reporter for collecting and reporting system statistics",
        "examples": [
            "sar -u 1 10  # Display CPU utilization every second for 10 intervals",
            "sar -r 5 6  # Show memory utilization every 5 seconds for 6 intervals",
            "sar -b 2 5  # Display I/O and transfer statistics",
            "sar -n DEV 1 5  # Show network device statistics",
            "sar -q 3 4  # Display load average and run queue length",
            "sar -u -f /var/log/sysstat/sa01  # Display historical CPU data from system logs"
        ],
        "platform": [
            "linux",
            "macos"
        ],
        "category": "system",
        "safety": "safe",
        "syntaxPattern": "sar [options] [interval] [count]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Daily system report",
                "commands": "sar -u -r -b -q 1 60 > daily_report.txt",
                "explanation": "Generate comprehensive hourly system report",
                "title": "sar > daily_report"
            }
        ],
        "relatedCommands": [
            {
                "name": "iostat",
                "relationship": "related",
                "reason": "Both are part of sysstat package and complement each other"
            },
            {
                "name": "vmstat",
                "relationship": "similar",
                "reason": "Both provide system performance statistics"
            }
        ],
        "warnings": [
            "Part of sysstat package",
            "Can read historical data from system logs",
            "Rich set of options for different statistics"
        ],
        "manPageUrl": "https://man7.org/linux/man-pages/man1/sar.1.html",
        "distroNotes": {}
    },
    {
        "name": "systemctl",
        "standsFor": "System Control",
        "description": "Control systemd services and system state",
        "examples": [
            "sudo systemctl start nginx  # Start the nginx service",
            "sudo systemctl stop nginx  # Stop the nginx service",
            "sudo systemctl restart nginx  # Restart the nginx service (stop then start)",
            "systemctl status nginx  # Show detailed status of nginx service",
            "sudo systemctl enable nginx  # Configure nginx to start automatically at boot",
            "sudo systemctl disable nginx  # Prevent nginx from starting automatically at boot",
            "systemctl list-units --type=service  # Show all systemd services and their status",
            "sudo systemctl reload nginx  # Reload service configuration without restarting"
        ],
        "platform": [
            "linux"
        ],
        "category": "system",
        "safety": "caution",
        "syntaxPattern": "systemctl [command] [service]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Service deployment workflow",
                "commands": "sudo systemctl stop myapp && sudo systemctl start myapp && systemctl status myapp",
                "explanation": "Stop, start, and check status of custom application",
                "title": "sudo && sudo && systemctl"
            }
        ],
        "relatedCommands": [
            {
                "name": "journalctl",
                "relationship": "combo",
                "reason": "journalctl shows logs for systemd services"
            }
        ],
        "warnings": [
            "systemd-only, not available on non-systemd systems",
            "Enable vs start: enable affects boot behavior, start affects current state",
            "Some commands require root privileges"
        ],
        "manPageUrl": "https://man7.org/linux/man-pages/man1/systemctl.1.html",
        "distroNotes": {}
    },
    {
        "name": "top",
        "standsFor": "table of processes",
        "description": "Display and update running processes in real-time",
        "examples": [
            "top  # Real-time view of CPU, memory usage and running processes",
            "top -o %MEM  # Display processes ordered by memory consumption",
            "top -u username  # Show only processes owned by specific user",
            "top -d 1  # Refresh every 1 second instead of default 3 seconds"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "system",
        "safety": "safe",
        "syntaxPattern": "top [options]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Log top output to file",
                "commands": "top -b -n 1 > system_snapshot.txt",
                "explanation": "Take single snapshot of system state and save to file",
                "title": "top > system_snapshot"
            }
        ],
        "relatedCommands": [
            {
                "name": "htop",
                "relationship": "alternative",
                "reason": "More user-friendly with colors and better navigation"
            },
            {
                "name": "ps",
                "relationship": "alternative",
                "reason": "Static process snapshot instead of real-time monitoring"
            },
            {
                "name": "uptime",
                "relationship": "similar",
                "reason": "Shows system load averages"
            }
        ],
        "warnings": [
            "Press 'q' to quit top",
            "Press 'k' to kill process from within top",
            "High update frequency can consume CPU"
        ],
        "manPageUrl": "https://man7.org/linux/man-pages/man1/top.1.html",
        "distroNotes": {
            "windows": "Available in WSL only"
        }
    },
    {
        "name": "umount",
        "standsFor": "Unmount",
        "description": "Unmount mounted filesystems",
        "examples": [
            "sudo umount /mnt/usb  # Unmount filesystem mounted at /mnt/usb",
            "sudo umount /dev/sdb1  # Unmount filesystem on device /dev/sdb1",
            "sudo umount -f /mnt/usb  # Force unmount even if filesystem is busy",
            "sudo umount -l /mnt/usb  # Detach filesystem immediately, cleanup when not busy",
            "sudo umount -a  # Unmount all filesystems listed in /etc/mtab"
        ],
        "platform": [
            "linux",
            "macos"
        ],
        "category": "system",
        "safety": "caution",
        "syntaxPattern": "umount [options] device|mountpoint",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Safe USB removal",
                "commands": "sync && sudo umount /mnt/usb && sudo eject /dev/sdb",
                "explanation": "Sync data, unmount, and eject USB device safely",
                "title": "sync && sudo && sudo"
            }
        ],
        "relatedCommands": [
            {
                "name": "mount",
                "relationship": "combo",
                "reason": "mount and umount are complementary operations"
            },
            {
                "name": "sync",
                "relationship": "recommended",
                "reason": "sync ensures data is written before unmounting"
            }
        ],
        "warnings": [
            "'Device or resource busy' error means files are still open",
            "lsof or fuser can help identify processes using the filesystem",
            "Always sync before unmounting to ensure data integrity"
        ],
        "manPageUrl": "https://man7.org/linux/man-pages/man8/umount.8.html",
        "distroNotes": {}
    },
    {
        "name": "uname",
        "standsFor": "Unix name",
        "description": "Display system information",
        "examples": [
            "uname -a  # Display kernel name, version, architecture, and more",
            "uname -r  # Show just the kernel release version",
            "uname -m  # Display machine hardware architecture (x86_64, arm64, etc.)",
            "uname -s  # Display kernel name (Linux, Darwin, etc.)"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "system",
        "safety": "safe",
        "syntaxPattern": "uname [options]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "System identification for scripts",
                "commands": "echo \"Running on $(uname -s) $(uname -r) ($(uname -m))\"",
                "explanation": "Create system identification string",
                "title": "echo"
            },
            {
                "scenario": "Check compatibility before install",
                "commands": "uname -m | grep -q 'x86_64' && echo 'Compatible' || echo 'Not compatible'",
                "explanation": "Verify system architecture compatibility",
                "title": "uname | grep && echo || echo"
            }
        ],
        "relatedCommands": [
            {
                "name": "lscpu",
                "relationship": "combo",
                "reason": "Detailed CPU information"
            }
        ],
        "warnings": [
            "uname -a may expose sensitive system information",
            "Output format varies slightly between operating systems",
            "Some options may not be available on all systems"
        ],
        "manPageUrl": "https://man7.org/linux/man-pages/man1/uname.1.html",
        "distroNotes": {
            "windows": "Available in WSL"
        }
    },
    {
        "name": "uptime",
        "standsFor": "uptime",
        "description": "Show system uptime and load averages",
        "examples": [
            "uptime  # Show how long system has been running and load averages",
            "uptime -p  # Display uptime in human-readable format",
            "uptime -s  # Display when system was last booted"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "system",
        "safety": "safe",
        "syntaxPattern": "uptime [options]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "System status summary",
                "commands": "uptime && free -h && df -h",
                "explanation": "Quick system overview: uptime, memory, and disk usage",
                "title": "uptime && free && df"
            },
            {
                "scenario": "Monitor load over time",
                "commands": "watch -n 10 uptime",
                "explanation": "Monitor load averages every 10 seconds",
                "title": "watch"
            }
        ],
        "relatedCommands": [
            {
                "name": "top",
                "relationship": "similar",
                "reason": "Shows load averages along with process information"
            },
            {
                "name": "vmstat",
                "relationship": "combo",
                "reason": "More detailed system performance statistics"
            }
        ],
        "warnings": [
            "Load average > CPU cores usually indicates high system load",
            "Load averages are for 1, 5, and 15 minute periods",
            "High load doesn't always mean CPU bottleneck"
        ],
        "manPageUrl": "https://man7.org/linux/man-pages/man1/uptime.1.html",
        "distroNotes": {
            "windows": "Available in WSL or PowerShell equivalent"
        }
    },
    {
        "name": "watch",
        "standsFor": "watch",
        "description": "Execute command repeatedly and display output",
        "examples": [
            "watch 'ps aux | head -20'  # Update process list every 2 seconds (default interval)",
            "watch -n 1 'ls -la /tmp'  # Monitor directory contents every 1 second",
            "watch df -h  # Track filesystem usage in real-time",
            "watch -d 'netstat -tuln'  # Show network connections and highlight changes",
            "watch 'wc -l /var/log/syslog'  # Watch line count increase in system log",
            "watch -e 'ping -c 1 google.com'  # Stop watching when ping command fails"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "system",
        "safety": "safe",
        "syntaxPattern": "watch [options] <command>",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Monitor service status",
                "commands": "watch -n 5 'systemctl status nginx && echo \"---\" && tail -5 /var/log/nginx/error.log'",
                "explanation": "Check nginx status and recent errors every 5 seconds",
                "title": "watch && echo && tail"
            },
            {
                "scenario": "Track build progress",
                "commands": "watch -n 2 'ls -la build/ | wc -l && du -sh build/'",
                "explanation": "Monitor build directory file count and size",
                "title": "watch | wc && du"
            }
        ],
        "relatedCommands": [
            {
                "name": "tail",
                "relationship": "similar",
                "reason": "tail -f watches file changes, watch monitors any command"
            },
            {
                "name": "top",
                "relationship": "alternative",
                "reason": "top continuously updates, watch runs any command repeatedly"
            }
        ],
        "warnings": [
            "Command output truncated to terminal size",
            "Complex commands need proper shell quoting",
            "High frequency updates can consume CPU"
        ],
        "manPageUrl": "https://man7.org/linux/man-pages/man1/watch.1.html",
        "distroNotes": {
            "macos": "Install via Homebrew: brew install watch",
            "windows": "Available in WSL"
        }
    },
    {
        "name": "which",
        "standsFor": "which",
        "description": "Locate command in PATH",
        "examples": [
            "which python  # Show full path to python executable",
            "which nonexistent-cmd  # Returns exit code 1 if command not found",
            "which -a python  # Show all python executables in PATH"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "system",
        "safety": "safe",
        "syntaxPattern": "which <command>",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Conditional script execution",
                "commands": "which docker >/dev/null && docker --version || echo 'Docker not installed'",
                "explanation": "Check if docker exists before using it",
                "title": "which > && docker || echo"
            },
            {
                "scenario": "Compare command locations",
                "commands": "echo \"Python: $(which python)\" && echo \"Python3: $(which python3)\"",
                "explanation": "Show locations of different Python versions",
                "title": "echo && echo"
            }
        ],
        "relatedCommands": [],
        "warnings": [
            "which doesn't find shell builtins or functions",
            "May not work with aliases in some shells",
            "Results depend on current PATH environment"
        ],
        "manPageUrl": "https://ss64.com/osx/which.html",
        "distroNotes": {
            "windows": "Available in WSL; Windows has where command"
        }
    },
    {
        "name": "whoami",
        "standsFor": "who am I",
        "description": "Display current username",
        "examples": [
            "whoami  # Show the username of current user"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "system",
        "safety": "safe",
        "syntaxPattern": "whoami",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "User context in scripts",
                "commands": "echo \"Running as user: $(whoami)\" && id",
                "explanation": "Show current user and their group memberships",
                "title": "echo && id"
            },
            {
                "scenario": "Conditional execution based on user",
                "commands": "if [ $(whoami) = 'root' ]; then echo 'Running as root'; fi",
                "explanation": "Check if running as root user",
                "title": "if ; then ; fi"
            }
        ],
        "relatedCommands": [],
        "warnings": [
            "Shows effective user, not necessarily login user",
            "May show different results when using sudo",
            "Simple command with no options needed"
        ],
        "manPageUrl": "https://man7.org/linux/man-pages/man1/whoami.1.html",
        "distroNotes": {
            "windows": "Available in PowerShell and WSL"
        }
    }
];

export { systemCommands };
export default systemCommands;
