/**
 * TL;DRx Commands Database - Development web Category
 *
 * Contains 31 commands related to development web.
 * Generated from the original commands.js file.
 *
 * @fileoverview Development web category commands for TL;DRx
 * @category development-web
 * @commands 31
 */

/**
 * Development web category commands
 * @type {Array<Object>}
 */
const development_webCommands = [
    {
        "name": "aws-cli",
        "standsFor": "AWS Command Line Interface",
        "description": "Command-line interface for Amazon Web Services CloudWatch",
        "examples": [
            "aws cloudwatch list-metrics  # List all available CloudWatch metrics",
            "aws cloudwatch get-metric-statistics --namespace AWS/EC2 --metric-name CPUUtilization  # Get EC2 CPU utilization statistics",
            "aws cloudwatch put-metric-alarm --alarm-name cpu-alarm --metric-name CPUUtilization  # Create CloudWatch alarm for CPU utilization",
            "aws logs get-log-events --log-group-name /aws/lambda/function-name  # Retrieve log events from CloudWatch Logs",
            "aws logs create-log-group --log-group-name my-log-group  # Create new CloudWatch log group"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "development",
        "safety": "safe",
        "syntaxPattern": "aws [service] [operation] [parameters]",
        "prerequisites": [
            "aws-credentials"
        ],
        "commandCombinations": [
            {
                "scenario": "Monitor EC2 instance",
                "commands": "aws cloudwatch get-metric-statistics --namespace AWS/EC2 --metric-name CPUUtilization --dimensions Name=InstanceId,Value=i-1234567890abcdef0 --start-time 2023-01-01T00:00:00Z --end-time 2023-01-01T23:59:59Z --period 3600 --statistics Average",
                "explanation": "Get hourly average CPU utilization for specific EC2 instance",
                "title": "aws"
            }
        ],
        "relatedCommands": [
            {
                "name": "az",
                "relationship": "alternative",
                "reason": "Azure CLI for Azure Monitor"
            },
            {
                "name": "gcloud",
                "relationship": "alternative",
                "reason": "Google Cloud CLI for GCP monitoring"
            }
        ],
        "warnings": [
            "Requires AWS credentials configuration",
            "Rate limiting applies to CloudWatch APIs",
            "Metric retention periods vary by resolution"
        ],
        "manPageUrl": "https://docs.aws.amazon.com/cli/",
        "distroNotes": {}
    },
    {
        "name": "burpsuite",
        "standsFor": "Burp Suite",
        "description": "Web application security testing platform",
        "examples": [
            "java -jar burpsuite_community.jar  # Launch Burp Suite Community Edition",
            "java -jar burpsuite_pro.jar --project-file=project.burp --unpause-spider-and-scanner  # Run automated scan from command line (Pro version)",
            "java -jar burpsuite.jar --config-file=burp_config.json  # Start with specific configuration for automated testing",
            "java -jar burpsuite_pro.jar --project-file=test.burp --headless  # Run in headless mode for automation"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "development",
        "safety": "safe",
        "syntaxPattern": "java -jar burpsuite.jar or burpsuite",
        "prerequisites": [
            "advanced",
            "authorization-required"
        ],
        "commandCombinations": [
            {
                "scenario": "Automated web application testing",
                "commands": "java -jar burpsuite_pro.jar --project-file=scan.burp --config-file=config.json --headless",
                "explanation": "Fully automated web application security scan",
                "title": "java"
            }
        ],
        "relatedCommands": [
            {
                "name": "owasp-zap",
                "relationship": "similar",
                "reason": "Alternative web application security testing tool"
            },
            {
                "name": "sqlmap",
                "relationship": "combo",
                "reason": "Specialized SQL injection testing"
            }
        ],
        "warnings": [
            "Professional features require paid license",
            "Can generate significant traffic during scans",
            "Only test applications you own or have authorization"
        ],
        "manPageUrl": "https://portswigger.net/burp/documentation",
        "distroNotes": {}
    },
    {
        "name": "caddy",
        "standsFor": "Caddy",
        "description": "Modern web server with automatic HTTPS",
        "examples": [
            "caddy file-server  # Serve files from current directory with automatic HTTPS",
            "caddy run  # Start Caddy using Caddyfile configuration",
            "caddy validate  # Check Caddyfile syntax and configuration",
            "caddy reload  # Reload Caddyfile without stopping server",
            "caddy reverse-proxy --from :80 --to localhost:3000  # Proxy requests from port 80 to application on port 3000",
            "caddy fmt --overwrite  # Format and standardize Caddyfile syntax",
            "caddy version  # Display Caddy version and build information"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "development",
        "safety": "safe",
        "syntaxPattern": "caddy <command> [options]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Development server with proxy",
                "commands": "caddy reverse-proxy --from localhost:80 --to localhost:3000 &",
                "explanation": "Start reverse proxy in background for development",
                "title": "caddy &"
            },
            {
                "scenario": "Deploy configuration changes",
                "commands": "caddy validate && caddy reload",
                "explanation": "Validate then reload configuration",
                "title": "caddy && caddy"
            }
        ],
        "relatedCommands": [
            {
                "name": "nginx",
                "relationship": "alternative",
                "reason": "Traditional web server requiring manual SSL setup"
            },
            {
                "name": "certbot",
                "relationship": "alternative",
                "reason": "Caddy handles SSL automatically vs manual certbot"
            },
            {
                "name": "curl",
                "relationship": "combo",
                "reason": "Test Caddy server responses and configuration"
            }
        ],
        "warnings": [
            "Automatic HTTPS requires valid domain and port 80/443 access",
            "Configuration syntax different from traditional web servers",
            "Binary includes many plugins by default"
        ],
        "manPageUrl": "https://caddyserver.com/docs/",
        "distroNotes": {
            "linux": "Install from official repository or binary releases",
            "macos": "Install via Homebrew: brew install caddy",
            "windows": "Download from GitHub releases"
        }
    },
    {
        "name": "cypress",
        "standsFor": "Cypress",
        "description": "End-to-end testing framework for web applications",
        "examples": [
            "cypress open  # Launch interactive Cypress test runner",
            "cypress run  # Run all tests in headless mode",
            "cypress run --spec 'cypress/e2e/login.cy.js'  # Run specific test specification",
            "cypress run --browser chrome  # Run tests using Chrome browser",
            "cypress run --record --key=abc123  # Record test run to Cypress Dashboard",
            "cypress run --env NODE_ENV=staging  # Run tests with custom environment variables",
            "cypress run --config video=false,screenshotOnRunFailure=false  # Run without video/screenshot capture",
            "echo --example-usage  # Simplified example for echo command"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "development",
        "safety": "safe",
        "syntaxPattern": "cypress [command] [options]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "CI pipeline testing",
                "commands": "cypress run --browser chrome --headless --spec 'cypress/e2e/**/*.cy.js'",
                "explanation": "Run all E2E tests in Chrome for continuous integration",
                "title": "cypress"
            }
        ],
        "relatedCommands": [
            {
                "name": "playwright",
                "relationship": "alternative",
                "reason": "Modern cross-browser automation framework"
            }
        ],
        "warnings": [
            "Excellent debugging capabilities with time-travel",
            "Built-in network stubbing and mocking",
            "Automatic waiting for elements eliminates flaky tests"
        ],
        "manPageUrl": "https://docs.cypress.io/",
        "distroNotes": {}
    },
    {
        "name": "git-daemon-server",
        "standsFor": "Git Daemon Server",
        "description": "Set up Git daemon for serving repositories over Git protocol",
        "examples": [
            "git daemon --reuseaddr --base-path=/opt/git/ --export-all --verbose --enable=receive-pack  # Start Git daemon allowing push and pull operations",
            "git daemon --base-path=/var/git --export-all /var/git/repo1 /var/git/repo2  # Serve only specified repositories from base path",
            "git daemon --base-path=/git --user=gitdaemon --group=gitdaemon --strict-paths  # Run daemon as specific user with strict path checking",
            "touch /path/to/repo.git/git-daemon-export-ok  # Mark repository as exportable by Git daemon",
            "git daemon --port=9418 --base-path=/opt/git --export-all  # Start daemon on custom port (default is 9418)",
            "git daemon --syslog --base-path=/opt/git --export-all  # Start daemon with system logging enabled"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "development",
        "safety": "safe",
        "syntaxPattern": "git daemon [options] [directory...]",
        "prerequisites": [
            "system-admin"
        ],
        "commandCombinations": [
            {
                "scenario": "Production daemon setup",
                "commands": "sudo useradd git && sudo mkdir -p /opt/git && sudo chown git:git /opt/git && sudo -u git git daemon --detach --syslog --base-path=/opt/git --user=git --group=git",
                "explanation": "Create git user and start production daemon",
                "title": "sudo && sudo && sudo && sudo"
            },
            {
                "scenario": "Development server with push enabled",
                "commands": "git daemon --reuseaddr --base-path=. --export-all --enable=receive-pack &",
                "explanation": "Start background daemon for local development with push support",
                "title": "git &"
            }
        ],
        "relatedCommands": [
            {
                "name": "ssh",
                "relationship": "alternative",
                "reason": "SSH is more secure alternative to Git protocol"
            }
        ],
        "warnings": [
            "Git protocol has no authentication or encryption",
            "Requires git-daemon-export-ok file in repository",
            "Push operations need special enabling"
        ],
        "manPageUrl": "https://git-scm.com/docs/git-daemon",
        "distroNotes": {}
    },
    {
        "name": "libvirt",
        "standsFor": "Library Virtualization",
        "description": "Virtualization API and management tools",
        "examples": [
            "virsh list --all  # Show all virtual machines (running and stopped)",
            "virsh start vm-name  # Start specified virtual machine",
            "virsh define vm-config.xml  # Define new VM from XML configuration file",
            "virsh console vm-name  # Connect to virtual machine serial console",
            "virsh snapshot-create-as vm-name snapshot-name  # Create named snapshot of virtual machine",
            "virt-clone --original vm-original --name vm-clone --auto-clone  # Clone existing VM with automatic storage allocation",
            "virsh vol-create-as --pool default --name vm-data.qcow2 --capacity 20G --format qcow2 && virsh attach-disk vm-web /var/lib/libvirt/images/vm-data.qcow2 --target vdb --persistent && virsh reboot vm-web  # Create additional storage volume, attach to running VM, and reboot to recognize new disk"
        ],
        "platform": [
            "linux"
        ],
        "category": "development",
        "safety": "safe",
        "syntaxPattern": "virsh [options] command [domain]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "VM deployment workflow",
                "commands": "virsh define new-vm.xml && virsh start new-vm && virsh autostart new-vm && virsh dominfo new-vm",
                "explanation": "Define VM, start it, enable autostart, show info",
                "title": "virsh && virsh && virsh && virsh"
            }
        ],
        "relatedCommands": [
            {
                "name": "qemu",
                "relationship": "alternative",
                "reason": "Direct QEMU command-line interface"
            }
        ],
        "warnings": [
            "Requires proper libvirtd configuration",
            "User permissions needed for VM management"
        ],
        "manPageUrl": "https://libvirt.org/manpages/virsh.html",
        "distroNotes": {}
    },
    {
        "name": "lighttpd",
        "standsFor": "Lighty",
        "description": "Lightweight web server optimized for speed and low memory usage",
        "examples": [
            "sudo lighttpd -f /etc/lighttpd/lighttpd.conf  # Start lighttpd with configuration file",
            "lighttpd -t -f /etc/lighttpd/lighttpd.conf  # Test configuration file syntax",
            "lighttpd -D -f /etc/lighttpd/lighttpd.conf  # Start in foreground for debugging",
            "lighttpd -v  # Display version and compile-time options",
            "lighttpd -p -f /etc/lighttpd/lighttpd.conf  # Print final configuration after processing",
            "lighttpd -f /etc/lighttpd/lighttpd.conf -m /usr/lib/lighttpd && echo 'server.bind = \"0.0.0.0\"\nserver.port = 8080\nserver.modules = (\"mod_fastcgi\", \"mod_rewrite\")' >> custom.conf  # Start with module path and create custom production configuration for high-traffic deployment"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "development",
        "safety": "caution",
        "syntaxPattern": "lighttpd [options]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Validate and start server",
                "commands": "lighttpd -t -f lighttpd.conf && sudo lighttpd -f lighttpd.conf",
                "explanation": "Test configuration then start server",
                "title": "lighttpd && sudo"
            }
        ],
        "relatedCommands": [
            {
                "name": "nginx",
                "relationship": "similar",
                "reason": "Both lightweight, high-performance web servers"
            },
            {
                "name": "apache2",
                "relationship": "alternative",
                "reason": "Traditional web server with different resource usage"
            },
            {
                "name": "systemctl",
                "relationship": "combo",
                "reason": "Manage lighttpd as system service"
            }
        ],
        "warnings": [
            "Less popular than nginx/apache, fewer online resources",
            "Configuration syntax unique to lighttpd",
            "Module system different from Apache"
        ],
        "manPageUrl": "https://redmine.lighttpd.net/projects/lighttpd/wiki",
        "distroNotes": {
            "linux": "Available in most package repositories",
            "macos": "Install via Homebrew: brew install lighttpd",
            "windows": "Available but less common"
        }
    },
    {
        "name": "locust",
        "standsFor": "Locust",
        "description": "Python-based load testing tool with web UI",
        "examples": [
            "locust -f locustfile.py  # Start Locust with web interface for interactive testing",
            "locust -f locustfile.py --headless -u 100 -r 10 -t 60s  # Run headless test with 100 users, spawn rate 10/sec, for 60 seconds",
            "locust -f locustfile.py --master  # Start master node for distributed load testing",
            "locust -f locustfile.py --worker --master-host=master-ip  # Start worker node connecting to master",
            "locust -f locustfile.py --host=https://example.com  # Override host specified in locustfile",
            "locust -f api_loadtest.py --master --master-bind-host=0.0.0.0 --master-bind-port=5557 --web-port=8089 && locust -f api_loadtest.py --worker --master-host=load-master.internal --processes=4  # Set up distributed load testing with master accepting workers on all interfaces and multiple worker processes"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "development",
        "safety": "safe",
        "syntaxPattern": "locust [options]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Automated load test",
                "commands": "locust -f api_test.py --headless -u 50 -r 5 -t 300s --html report.html",
                "explanation": "Run 5-minute load test and generate HTML report",
                "title": "locust"
            }
        ],
        "relatedCommands": [
            {
                "name": "jmeter",
                "relationship": "alternative",
                "reason": "JMeter provides GUI-based test creation"
            },
            {
                "name": "k6",
                "relationship": "alternative",
                "reason": "k6 uses JavaScript instead of Python"
            }
        ],
        "warnings": [
            "Python-based test scenarios are very flexible",
            "Web UI provides real-time monitoring during tests",
            "Easy to distribute across multiple machines"
        ],
        "manPageUrl": "https://docs.locust.io/",
        "distroNotes": {}
    },
    {
        "name": "mongorestore",
        "standsFor": "MongoDB Restore",
        "description": "MongoDB database restore utility",
        "examples": [
            "mongorestore --db myapp /backup/myapp/  # Restore database from BSON backup directory",
            "mongorestore --db myapp --collection users /backup/myapp/users.bson  # Restore single collection from backup",
            "mongorestore --db newapp /backup/myapp/  # Restore backup to database with different name",
            "mongorestore --archive=backup.archive --gzip  # Restore from compressed archive file",
            "mongorestore --drop --db myapp /backup/myapp/  # Drop existing collections before restoring",
            "mongorestore --host mongodb://server:27017 --db myapp /backup/myapp/  # Restore backup to remote MongoDB server",
            "mongorestore --numParallelCollections=4 --db myapp /backup/myapp/  # Use multiple threads for faster restore",
            "mongorestore --username restore_user --password --authenticationDatabase admin --db myapp /backup/myapp/  # Restore with username/password authentication"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "development",
        "safety": "safe",
        "syntaxPattern": "mongorestore [options] [directory/file]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Database migration workflow",
                "commands": "mongodump --host old_server --db myapp --archive | mongorestore --host new_server --archive",
                "explanation": "Stream backup directly to restore on different server",
                "title": "mongodump | mongorestore"
            }
        ],
        "relatedCommands": [
            {
                "name": "mongodump",
                "relationship": "combo",
                "reason": "Creates backups that mongorestore can restore"
            },
            {
                "name": "mongoimport",
                "relationship": "alternative",
                "reason": "Imports JSON/CSV data instead of BSON"
            }
        ],
        "warnings": [
            "Index creation can be slow during restore",
            "--drop option removes existing data permanently",
            "Sharded collections may require specific restore procedures"
        ],
        "manPageUrl": "https://www.mongodb.com/docs/database-tools/mongorestore/",
        "distroNotes": {}
    },
    {
        "name": "mysqladmin",
        "standsFor": "MySQL Admin",
        "description": "MySQL server administration utility",
        "examples": [
            "mysqladmin -u root -p status  # Display MySQL server status information",
            "mysqladmin -u root -p processlist  # List active MySQL connections and queries",
            "mysqladmin -u root -p flush-privileges  # Reload grant tables after user changes",
            "mysqladmin -u root -p create newdatabase  # Create new MySQL database",
            "mysqladmin -u root -p drop olddatabase  # Delete MySQL database (with confirmation)",
            "mysqladmin -u root -p password 'newpassword'  # Change MySQL root user password",
            "mysqladmin -u root -p shutdown  # Gracefully shutdown MySQL server",
            "mysqladmin -u root -p kill 123  # Terminate specific MySQL process by ID"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "development",
        "safety": "dangerous",
        "syntaxPattern": "mysqladmin [options] command [command-options]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Database maintenance routine",
                "commands": "mysqladmin -u root -p flush-logs && mysqladmin -u root -p flush-tables && mysqladmin -u root -p status",
                "explanation": "Flush logs and tables, then check status",
                "title": "mysqladmin && mysqladmin && mysqladmin"
            }
        ],
        "relatedCommands": [
            {
                "name": "mysql",
                "relationship": "combo",
                "reason": "Provides interactive access to MySQL"
            },
            {
                "name": "mysqldump",
                "relationship": "combo",
                "reason": "Often used together for backup operations"
            }
        ],
        "warnings": [
            "Some commands require SUPER privilege",
            "Drop database command asks for confirmation",
            "Process IDs change frequently, check processlist first"
        ],
        "manPageUrl": "https://dev.mysql.com/doc/refman/8.0/en/mysqladmin.html",
        "distroNotes": {}
    },
    {
        "name": "mysqladmin extended-status",
        "standsFor": "MySQL Admin Extended Status",
        "description": "MySQL server status and performance monitoring command",
        "examples": [
            "mysqladmin -u root -p extended-status  # Display all MySQL server status variables",
            "mysqladmin -u root -p extended-status | grep -i innodb  # Show only InnoDB-related status variables",
            "mysqladmin -u root -p extended-status | grep -E 'Connections|Queries|Slow_queries|Uptime'  # Show key performance indicators",
            "mysqladmin -u root -p extended-status -i 5 -c 10  # Show status every 5 seconds for 10 iterations",
            "mysqladmin -u root -p extended-status | grep -i qcache  # Show query cache performance metrics",
            "mysqladmin -u root -p extended-status | grep -E 'Threads_|Max_used_connections'  # Monitor connection and thread usage"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "development",
        "safety": "safe",
        "syntaxPattern": "mysqladmin [options] extended-status",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Performance monitoring dashboard",
                "commands": "mysqladmin -u root -p extended-status | grep -E 'Queries|Slow_queries|Connections|Threads_running' && mysqladmin -u root -p processlist",
                "explanation": "Show key metrics and active processes",
                "title": "mysqladmin | grep | Slow_queries | Connections | Threads_running && mysqladmin"
            }
        ],
        "relatedCommands": [
            {
                "name": "mysql",
                "relationship": "combo",
                "reason": "Can query INFORMATION_SCHEMA for similar data"
            }
        ],
        "warnings": [
            "Status variables are cumulative since server startup",
            "Some variables reset when server restarts",
            "Large numbers may indicate performance issues or high load"
        ],
        "manPageUrl": "",
        "distroNotes": {}
    },
    {
        "name": "next",
        "standsFor": "Next.js CLI",
        "description": "Next.js React framework CLI for full-stack web applications",
        "examples": [
            "npx create-next-app@latest my-app  # Create new Next.js application with latest version",
            "next dev  # Start development server with hot reloading",
            "next build  # Create optimized production build",
            "next start  # Start production server after build",
            "next export  # Export app as static HTML files",
            "NODE_ENV=production next build && next export && npx serve out -l 8080 & sleep 5 && npx lighthouse http://localhost:8080 --output=json --output-path=./lighthouse-report.json --chrome-flags='--headless --no-sandbox' && kill %1 && cat lighthouse-report.json | jq '.categories.performance.score * 100'  # Production build with performance audit and automated Lighthouse scoring for deployment quality gates",
            "next lint  # Run ESLint on project files"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "development",
        "safety": "safe",
        "syntaxPattern": "npx next <command> [options]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Build and start production",
                "commands": "next build && next start",
                "explanation": "Build optimized version and start production server",
                "title": "next && next"
            }
        ],
        "relatedCommands": [],
        "warnings": [
            "Pages directory structure determines routing",
            "API routes run on server-side only",
            "Image optimization requires proper configuration"
        ],
        "manPageUrl": "https://nextjs.org/docs/api-reference/cli",
        "distroNotes": {}
    },
    {
        "name": "nginx",
        "standsFor": "engine x",
        "description": "High-performance web server and reverse proxy",
        "examples": [
            "sudo nginx  # Start nginx with default configuration",
            "nginx -t  # Check nginx configuration files for syntax errors",
            "nginx -s reload  # Reload configuration without stopping server",
            "nginx -s quit  # Gracefully shutdown nginx server",
            "nginx -s stop  # Immediately stop nginx server",
            "nginx -c /path/to/nginx.conf  # Start nginx with specific configuration file",
            "nginx -v  # Display nginx version information",
            "nginx -t && sudo nginx -s reload && sleep 2 && for i in {1..5}; do curl -H 'Host: app$i.example.com' http://localhost/health -s -o /dev/null -w 'app$i: %{http_code} %{time_total}s\\n'; done && nginx -T | grep -E '(upstream|server_name)' | head -10  # Zero-downtime configuration reload with multi-domain health checks and upstream validation for production load balancing"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "development",
        "safety": "caution",
        "syntaxPattern": "nginx [options]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Deploy configuration changes",
                "commands": "nginx -t && sudo nginx -s reload",
                "explanation": "Test config then reload if valid",
                "title": "nginx && sudo"
            },
            {
                "scenario": "Restart nginx service",
                "commands": "sudo nginx -s quit && sudo nginx",
                "explanation": "Stop then start nginx to apply major changes",
                "title": "sudo && sudo"
            }
        ],
        "relatedCommands": [
            {
                "name": "apache2",
                "relationship": "alternative",
                "reason": "Apache HTTP Server alternative web server"
            },
            {
                "name": "systemctl",
                "relationship": "combo",
                "reason": "Manage nginx as systemd service"
            },
            {
                "name": "curl",
                "relationship": "combo",
                "reason": "Test nginx configuration and responses"
            }
        ],
        "warnings": [
            "Configuration changes require reload to take effect",
            "Root permissions needed for binding to ports < 1024",
            "Log files can grow large without proper rotation"
        ],
        "manPageUrl": "http://nginx.org/en/docs/",
        "distroNotes": {
            "linux": "Available in all major package repositories",
            "macos": "Install via Homebrew: brew install nginx",
            "windows": "Download from nginx.org or use WSL"
        }
    },
    {
        "name": "nikto",
        "standsFor": "Nikto",
        "description": "Web server vulnerability scanner for security assessment",
        "examples": [
            "nikto -h http://example.com  # Scan web server for common vulnerabilities",
            "nikto -h https://example.com -ssl  # Scan HTTPS site with SSL support",
            "nikto -h example.com -p 8080,8443  # Scan specific ports for web services",
            "nikto -h example.com -o nikto_report.txt  # Save scan results to text file",
            "nikto -h $TARGET -Plugins '+tests(report_csv)' -o nikto-$(date +%Y%m%d).csv && nikto -h $TARGET -ssl -Port 443,8443 -output nikto-ssl.xml -Format xml && python3 -c \"import csv, json; data=[dict(row) for row in csv.DictReader(open('nikto-$(date +%Y%m%d).csv'))]; print(json.dumps([item for item in data if 'OSVDB' in str(item)], indent=2))\" > critical-vulnerabilities.json  # Comprehensive security assessment with structured reporting and critical vulnerability extraction for security teams"
        ],
        "platform": [
            "linux",
            "macos"
        ],
        "category": "development",
        "safety": "safe",
        "syntaxPattern": "nikto [options] -h <target>",
        "prerequisites": [
            "intermediate",
            "authorization-required"
        ],
        "commandCombinations": [
            {
                "scenario": "Comprehensive web security assessment",
                "commands": "nikto -h $TARGET -o nikto.txt && nmap --script http-enum $TARGET",
                "explanation": "Combine Nikto scan with nmap web enumeration",
                "title": "nikto && nmap"
            }
        ],
        "relatedCommands": [
            {
                "name": "owasp-zap",
                "relationship": "similar",
                "reason": "More comprehensive web application security testing"
            }
        ],
        "warnings": [
            "Can be noisy and easily detected by security systems",
            "May generate false positives",
            "Requires authorization to scan target systems"
        ],
        "manPageUrl": "https://cirt.net/Nikto2",
        "distroNotes": {}
    },
    {
        "name": "node",
        "standsFor": "Node.js",
        "description": "Node.js JavaScript runtime for server-side development",
        "examples": [
            "node app.js  # Execute JavaScript file with Node.js runtime",
            "node  # Launch Node.js interactive shell for testing code",
            "node -e \"console.log('Hello World')\"  # Run JavaScript code from command line",
            "node --version  # Display Node.js runtime version",
            "node --inspect app.js  # Start application with debugging port enabled",
            "node --max-old-space-size=4096 app.js  # Run with increased memory limit (4GB)",
            "node -r dotenv/config app.js  # Preload dotenv module to read .env file",
            "NODE_ENV=production node --max-old-space-size=4096 --inspect=0.0.0.0:9229 --trace-warnings --unhandled-rejections=strict --enable-source-maps app.js 2>&1 | tee logs/app-$(date +%Y%m%d-%H%M%S).log & echo $! > app.pid && sleep 5 && curl -f http://localhost:3000/health && echo \"Production Node.js service started: PID $(cat app.pid), health check passed, remote debugging enabled, comprehensive logging active\"  # Production-grade Node.js deployment with monitoring, debugging, error handling, and health verification"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "development",
        "safety": "safe",
        "syntaxPattern": "node [options] <file> [args]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Development server with monitoring",
                "commands": "npm install nodemon && npx nodemon app.js",
                "explanation": "Install and run with auto-restart on file changes",
                "title": "npm && npx"
            },
            {
                "scenario": "Production deployment",
                "commands": "NODE_ENV=production node --max-old-space-size=2048 app.js",
                "explanation": "Run in production mode with optimized memory settings",
                "title": "NODE_ENV"
            }
        ],
        "relatedCommands": [
            {
                "name": "npm",
                "relationship": "combo",
                "reason": "npm manages Node.js packages and dependencies"
            },
            {
                "name": "yarn",
                "relationship": "alternative",
                "reason": "Alternative package manager for Node.js"
            },
            {
                "name": "npx",
                "relationship": "combo",
                "reason": "npx executes Node.js packages directly"
            }
        ],
        "warnings": [
            "Different Node.js versions can have compatibility issues",
            "Memory leaks can occur with long-running processes",
            "Asynchronous nature requires proper error handling"
        ],
        "manPageUrl": "https://nodejs.org/api/cli.html",
        "distroNotes": {}
    },
    {
        "name": "nodetool",
        "standsFor": "Node Tool",
        "description": "Apache Cassandra cluster management and monitoring utility",
        "examples": [
            "nodetool status  # Display status of all nodes in cluster",
            "nodetool info  # Show detailed information about local node",
            "nodetool compact mykeyspace mytable  # Force compaction of specific table",
            "nodetool flush  # Flush all memtables to SSTables",
            "nodetool repair mykeyspace  # Run repair on specific keyspace",
            "nodetool snapshot -t backup-20231201 mykeyspace  # Create named snapshot of keyspace",
            "nodetool ring  # Show token ring and node ownership",
            "nodetool drain  # Prepare node for shutdown by flushing and stopping writes"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "development",
        "safety": "safe",
        "syntaxPattern": "nodetool [options] command [command-options]",
        "prerequisites": [
            "advanced"
        ],
        "commandCombinations": [
            {
                "scenario": "Maintenance workflow",
                "commands": "nodetool flush && nodetool compact && nodetool repair && nodetool cleanup",
                "explanation": "Complete maintenance routine: flush, compact, repair, cleanup",
                "title": "nodetool && nodetool && nodetool && nodetool"
            }
        ],
        "relatedCommands": [
            {
                "name": "cqlsh",
                "relationship": "combo",
                "reason": "CQL interface for Cassandra data operations"
            }
        ],
        "warnings": [
            "Some operations like repair can be very resource intensive",
            "Snapshots consume disk space until manually cleared",
            "Compaction may temporarily double disk usage"
        ],
        "manPageUrl": "",
        "distroNotes": {}
    },
    {
        "name": "owasp-zap",
        "standsFor": "OWASP Zed Attack Proxy",
        "description": "Web application security testing proxy for vulnerability assessment",
        "examples": [
            "zap-baseline.py -t http://example.com  # Quick passive scan of web application",
            "zap-full-scan.py -t http://example.com  # Comprehensive active vulnerability scan",
            "zap-api-scan.py -t http://api.example.com/openapi.json  # Security test API using OpenAPI specification",
            "zap-baseline.py -t http://example.com -c config.conf  # Scan with authentication configuration",
            "zap-full-scan.py -t $TARGET_URL -J zap-security-report.json -r zap-detailed-report.html -x zap-summary.xml && python3 -c \"import json; data=json.load(open('zap-security-report.json')); critical=[alert for alert in data['site'][0]['alerts'] if alert['riskdesc'] in ['High', 'Critical']]; print(f'Security Assessment: {len(critical)} critical vulnerabilities found'); [print(f'- {alert[\"name\"]}: {alert[\"desc\"]}') for alert in critical[:5]]\" && echo \"Full security report: $(wc -l < zap-detailed-report.html) lines generated\"  # Enterprise security assessment with multiple report formats, critical vulnerability extraction, and automated risk analysis"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "development",
        "safety": "safe",
        "syntaxPattern": "zap.sh [options] or zap-baseline.py [options]",
        "prerequisites": [
            "advanced",
            "authorization-required"
        ],
        "commandCombinations": [
            {
                "scenario": "CI/CD security testing",
                "commands": "zap-baseline.py -t $TARGET_URL -J zap-report.json -r zap-report.html",
                "explanation": "Generate both JSON and HTML reports for CI/CD pipeline",
                "title": "zap"
            }
        ],
        "relatedCommands": [
            {
                "name": "burpsuite",
                "relationship": "similar",
                "reason": "Alternative web application security testing tool"
            },
            {
                "name": "nikto",
                "relationship": "similar",
                "reason": "Web vulnerability scanner"
            }
        ],
        "warnings": [
            "Active scans may affect application performance",
            "Requires proper authorization for testing",
            "May generate false positives requiring manual verification"
        ],
        "manPageUrl": "https://www.zaproxy.org/docs/",
        "distroNotes": {}
    },
    {
        "name": "parcel",
        "standsFor": "Parcel",
        "description": "Zero-configuration web application bundler",
        "examples": [
            "parcel index.html  # Start dev server with hot reloading",
            "parcel build index.html  # Create optimized production bundle",
            "parcel build index.html --dist-dir build  # Build and output to 'build' directory",
            "parcel index.html --port 3000  # Start development server on port 3000",
            "parcel build index.html --no-source-maps  # Build without generating source maps",
            "parcel watch index.html  # Watch for changes and rebuild automatically",
            "parcel build src/index.html --dist-dir dist --public-url ./  # Production build with optimizations"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "development",
        "safety": "safe",
        "syntaxPattern": "parcel [command] [options] [...entries]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Development workflow",
                "commands": "parcel index.html --open --port 1234",
                "explanation": "Start dev server and open browser automatically",
                "title": "parcel"
            },
            {
                "scenario": "Production deployment",
                "commands": "parcel build index.html --dist-dir dist --public-url ./",
                "explanation": "Build for production with relative URLs",
                "title": "parcel"
            }
        ],
        "relatedCommands": [
            {
                "name": "webpack",
                "relationship": "alternative",
                "reason": "More configurable bundler alternative"
            },
            {
                "name": "vite",
                "relationship": "similar",
                "reason": "Modern zero-config build tool"
            },
            {
                "name": "rollup",
                "relationship": "alternative",
                "reason": "Module bundler for libraries"
            }
        ],
        "warnings": [
            "Less configuration control than Webpack",
            "Plugin ecosystem smaller than alternatives",
            "Caching can sometimes cause issues in development"
        ],
        "manPageUrl": "https://parceljs.org/",
        "distroNotes": {}
    },
    {
        "name": "pg_restore",
        "standsFor": "PostgreSQL Restore",
        "description": "PostgreSQL database restore utility for custom format backups",
        "examples": [
            "pg_restore -h localhost -U postgres -d newdb backup.dump  # Restore database from custom format backup",
            "pg_restore -j 4 -h localhost -U postgres -d newdb backup.dump  # Restore using 4 parallel worker processes",
            "pg_restore -t users -h localhost -U postgres -d mydb backup.dump  # Restore only specific table from backup",
            "pg_restore -c -h localhost -U postgres -d mydb backup.dump  # Drop existing objects before restoring",
            "pg_restore -C -h localhost -U postgres -d postgres backup.dump  # Create target database and restore data",
            "pg_restore -l backup.dump  # Show contents of backup file without restoring",
            "pg_restore -v -h localhost -U postgres -d mydb backup.dump  # Show detailed progress during restore"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "development",
        "safety": "safe",
        "syntaxPattern": "pg_restore [options] [filename]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Selective restore workflow",
                "commands": "pg_restore -l backup.dump > restore_list.txt && pg_restore -L restore_list.txt -h localhost -U postgres -d mydb backup.dump",
                "explanation": "Create restore list, edit it, then restore selectively",
                "title": "pg_restore > restore_list && pg_restore"
            }
        ],
        "relatedCommands": [
            {
                "name": "pg_dump",
                "relationship": "combo",
                "reason": "Creates backups that pg_restore can restore"
            }
        ],
        "warnings": [
            "Only works with custom format (-Fc), directory (-Fd), or tar (-Ft) backups",
            "Target database must exist unless using -C option",
            "Parallel restore may not preserve exact ordering of operations"
        ],
        "manPageUrl": "https://www.postgresql.org/docs/current/app-pgrestore.html",
        "distroNotes": {}
    },
    {
        "name": "php",
        "standsFor": "PHP: Hypertext Preprocessor",
        "description": "PHP interpreter for web development and scripting",
        "examples": [
            "php script.php  # Run PHP script from command line",
            "php -S localhost:8000  # Start development web server on port 8000",
            "php -l script.php  # Lint PHP file for syntax errors without execution",
            "php -a  # Start interactive PHP command line shell",
            "php -r \"echo date('Y-m-d H:i:s');\"  # Run PHP code from command line without file",
            "php --ini  # Display PHP configuration files locations",
            "php composer.phar install  # Use PHP to run Composer dependency manager"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "development",
        "safety": "safe",
        "syntaxPattern": "php [options] <file> [args]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Development workflow",
                "commands": "php -l index.php && php -S localhost:8000",
                "explanation": "Check syntax then start development server",
                "title": "php && php"
            },
            {
                "scenario": "Run tests with PHPUnit",
                "commands": "php vendor/bin/phpunit tests/",
                "explanation": "Execute PHP unit tests using PHPUnit",
                "title": "php"
            }
        ],
        "relatedCommands": [
            {
                "name": "composer",
                "relationship": "combo",
                "reason": "Composer manages PHP dependencies and autoloading"
            },
            {
                "name": "apache2",
                "relationship": "combo",
                "reason": "Apache web server commonly runs PHP applications"
            },
            {
                "name": "mysql",
                "relationship": "combo",
                "reason": "MySQL often used as database for PHP applications"
            }
        ],
        "warnings": [
            "PHP configuration differs between CLI and web server",
            "Memory limits and execution time limits apply",
            "Extension availability varies between installations"
        ],
        "manPageUrl": "https://www.php.net/manual/en/features.commandline.php",
        "distroNotes": {}
    },
    {
        "name": "postman",
        "standsFor": "Postman",
        "description": "API testing and development platform",
        "examples": [
            "newman run collection.json  # Run Postman collection from command line",
            "newman run collection.json -e environment.json  # Run collection with specific environment variables",
            "newman run collection.json -r html  # Run tests and generate HTML report",
            "newman run collection.json -d data.csv  # Run collection with external data for iterations",
            "newman run production-api-tests.json -e production.json -d test-data.csv --timeout-request 30000 --timeout-script 10000 -r htmlextra,junit,json --reporter-htmlextra-export api-test-report.html && python3 -c \"import json; report=json.load(open('newman-run-report.json')); print(f'API Test Results: {len(report[\"run\"][\"executions\"])} requests, {len([e for e in report[\"run\"][\"executions\"] if len(e.get(\"assertions\", [])) > 0])} assertions, {len(report[\"run\"][\"failures\"])} failures')\" && echo \"Enterprise API testing completed: comprehensive test suite, multiple data sets, detailed reporting, performance metrics captured\"  # Enterprise API testing pipeline with comprehensive validation, performance monitoring, detailed reporting, and automated analysis"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "development",
        "safety": "safe",
        "syntaxPattern": "postman [options] or newman [options]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "API test automation",
                "commands": "newman run api-tests.json -e prod.json -r html,junit --reporter-html-export report.html",
                "explanation": "Run API tests with production environment and generate reports",
                "title": "newman"
            }
        ],
        "relatedCommands": [
            {
                "name": "curl",
                "relationship": "simple-alternative",
                "reason": "curl can test APIs but Postman/Newman provides more features"
            }
        ],
        "warnings": [
            "Newman is command-line version of Postman",
            "Great for API testing in CI/CD pipelines",
            "Supports pre/post request scripts in JavaScript"
        ],
        "manPageUrl": "https://learning.postman.com/docs/running-collections/using-newman-cli/command-line-integration-with-newman/",
        "distroNotes": {}
    },
    {
        "name": "rails",
        "standsFor": "Ruby on Rails",
        "description": "Ruby on Rails web application framework CLI",
        "examples": [
            "rails new my_app  # Generate new Rails application with default configuration",
            "rails server  # Start Rails development server on port 3000",
            "rails generate model User name:string email:string  # Create User model with name and email attributes",
            "rails db:migrate  # Apply pending database migrations",
            "rails console  # Start interactive Ruby console with Rails environment loaded",
            "rails test  # Execute all tests in the Rails application"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "development",
        "safety": "safe",
        "syntaxPattern": "rails <command> [options]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Setup new application",
                "commands": "rails new blog && cd blog && rails generate scaffold Post title:string content:text && rails db:migrate",
                "explanation": "Create new app, generate scaffold, and setup database",
                "title": "rails && cd && rails && rails"
            }
        ],
        "relatedCommands": [
            {
                "name": "bundler",
                "relationship": "combo",
                "reason": "Manages Rails and its dependencies"
            },
            {
                "name": "rake",
                "relationship": "combo",
                "reason": "Rails uses Rake for many tasks"
            }
        ],
        "warnings": [
            "Database must be configured and running for migrations",
            "Different Rails versions have different generator syntax",
            "Asset pipeline configuration varies by Rails version"
        ],
        "manPageUrl": "https://guides.rubyonrails.org/command_line.html",
        "distroNotes": {}
    },
    {
        "name": "ruby",
        "standsFor": "Ruby",
        "description": "Ruby interpreter for dynamic programming and web development",
        "examples": [
            "ruby script.rb  # Execute Ruby script file",
            "ruby -e \"puts 'Hello World'\"  # Execute Ruby code directly from command line",
            "ruby -c script.rb  # Check Ruby file for syntax errors without execution",
            "ruby -w script.rb  # Execute with verbose warnings enabled",
            "ruby -r json -e \"puts JSON.generate({hello: 'world'})\"  # Require library and execute inline code",
            "ruby --version  # Display Ruby interpreter version",
            "ruby -pe 'gsub(/old/, \"new\")' file.txt  # Process file line by line replacing 'old' with 'new'"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "development",
        "safety": "safe",
        "syntaxPattern": "ruby [options] <file> [args]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Install gems and run Rails",
                "commands": "gem install rails && rails new myapp && cd myapp && rails server",
                "explanation": "Install Rails framework, create app, and start server",
                "title": "gem && rails && cd && rails"
            },
            {
                "scenario": "Run tests with RSpec",
                "commands": "gem install rspec && rspec spec/",
                "explanation": "Install testing framework and run tests",
                "title": "gem && rspec"
            }
        ],
        "relatedCommands": [
            {
                "name": "gem",
                "relationship": "combo",
                "reason": "gem manages Ruby packages and dependencies"
            },
            {
                "name": "bundler",
                "relationship": "combo",
                "reason": "bundler manages Ruby application dependencies"
            }
        ],
        "warnings": [
            "Ruby version management can be complex with rbenv/rvm",
            "Gem conflicts can occur without proper dependency management",
            "Global vs local gem installation affects script execution"
        ],
        "manPageUrl": "https://ruby-doc.org/core/",
        "distroNotes": {}
    },
    {
        "name": "sam",
        "standsFor": "Serverless Application Model",
        "description": "AWS Serverless Application Model for serverless development",
        "examples": [
            "sam init --runtime python3.9 --name my-serverless-app --app-template hello-world  # Create new serverless application from template",
            "sam build --use-container  # Build application using Docker containers for consistent environment",
            "sam deploy --guided --stack-name my-serverless-stack  # Deploy application with guided configuration setup",
            "sam local start-api --port 8080  # Start local API Gateway for testing Lambda functions",
            "sam local invoke HelloWorldFunction --event events/event.json  # Test Lambda function locally with sample event data",
            "sam local generate-event s3 put --bucket my-bucket --key my-key  # Generate sample S3 event for local testing",
            "sam validate --template template.yaml  # Check SAM template for syntax and logical errors",
            "sam package --s3-bucket my-deployment-bucket --output-template-file packaged-template.yaml  # Package and upload application artifacts to S3"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "development",
        "safety": "safe",
        "syntaxPattern": "sam [command] [options]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Complete development workflow",
                "commands": "sam build && sam local start-api --port 3000 &",
                "explanation": "Build application and start local development server",
                "title": "sam && sam &"
            },
            {
                "scenario": "Production deployment",
                "commands": "sam build --use-container && sam deploy --stack-name prod-app --parameter-overrides Environment=production",
                "explanation": "Build with containers and deploy to production environment",
                "title": "sam && sam"
            }
        ],
        "relatedCommands": [
            {
                "name": "aws",
                "relationship": "combo",
                "reason": "SAM deploys to AWS using CloudFormation"
            },
            {
                "name": "docker",
                "relationship": "combo",
                "reason": "SAM uses Docker for local development"
            }
        ],
        "warnings": [
            "Requires Docker for local development features",
            "SAM templates are CloudFormation extensions",
            "Local testing may not match AWS Lambda environment exactly"
        ],
        "manPageUrl": "https://docs.aws.amazon.com/serverless-application-model/",
        "distroNotes": {}
    },
    {
        "name": "sqlmap",
        "standsFor": "SQL Map",
        "description": "SQL injection detection and exploitation tool for web application security testing",
        "examples": [
            "sqlmap -u 'http://example.com/page.php?id=1'  # Test GET parameter for SQL injection vulnerabilities",
            "sqlmap -u 'http://example.com/login.php' --data='user=admin&pass=test'  # Test POST parameters for SQL injection",
            "sqlmap -u 'http://example.com/page.php?id=1' --dbs  # Enumerate available databases after confirming injection",
            "sqlmap -u 'http://example.com/page.php' --cookie='sessionid=abc123'  # Test cookie parameters for SQL injection"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "development",
        "safety": "safe",
        "syntaxPattern": "sqlmap [options] -u <URL>",
        "prerequisites": [
            "advanced",
            "authorization-required"
        ],
        "commandCombinations": [
            {
                "scenario": "Comprehensive web app SQL testing",
                "commands": "sqlmap -u 'http://target.com/app.php?id=1' --batch --risk=2 --level=3",
                "explanation": "Automated testing with increased risk and thoroughness",
                "title": "sqlmap"
            }
        ],
        "relatedCommands": [
            {
                "name": "owasp-zap",
                "relationship": "combo",
                "reason": "Comprehensive web application security testing"
            },
            {
                "name": "burpsuite",
                "relationship": "combo",
                "reason": "Web application security testing platform"
            }
        ],
        "warnings": [
            "Only use against applications you own or have permission to test",
            "Can cause database damage or data corruption",
            "May be detected by web application firewalls"
        ],
        "manPageUrl": "https://sqlmap.org/",
        "distroNotes": {}
    },
    {
        "name": "swagger-codegen",
        "standsFor": "Swagger Code Generator",
        "description": "Swagger Codegen for generating client libraries and server stubs",
        "examples": [
            "swagger-codegen generate -i api.yaml -l javascript -o ./client  # Generates JavaScript client library from OpenAPI specification",
            "swagger-codegen generate -i api.yaml -l python-flask -o ./server  # Creates Python Flask server stub from API specification"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "development",
        "safety": "safe",
        "syntaxPattern": "swagger-codegen generate [options]",
        "prerequisites": [
            "java"
        ],
        "commandCombinations": [],
        "relatedCommands": [],
        "warnings": [
            "Requires valid OpenAPI/Swagger specification file",
            "Generated code may need customization",
            "Different languages have different feature support",
            "Output directory must exist or be creatable"
        ],
        "manPageUrl": "https://swagger.io/tools/swagger-codegen/",
        "distroNotes": {
            "linux": "Requires Java, available through package managers or direct download",
            "windows": "Requires Java, available through direct download",
            "macos": "Available through Homebrew or direct download"
        }
    },
    {
        "name": "vite",
        "standsFor": "Vite (French for 'quick')",
        "description": "Fast build tool for modern web development",
        "examples": [
            "vite  # Start fast development server with HMR",
            "vite build  # Create optimized production bundle",
            "vite preview  # Serve production build locally for testing",
            "vite optimize  # Pre-bundle dependencies for faster startup",
            "vite --config vite.config.ts  # Use specific configuration file",
            "vite --port 3000  # Start development server on port 3000"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "development",
        "safety": "safe",
        "syntaxPattern": "vite [command] [options]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Complete development workflow",
                "commands": "vite --open --port 3000 && vite build && vite preview",
                "explanation": "Develop, build, and preview application",
                "title": "vite && vite && vite"
            },
            {
                "scenario": "Production deployment pipeline",
                "commands": "vite build --mode production && vite preview --port 4173",
                "explanation": "Build for production and preview on specific port",
                "title": "vite && vite"
            }
        ],
        "relatedCommands": [
            {
                "name": "webpack",
                "relationship": "alternative",
                "reason": "Traditional bundler with more configuration"
            },
            {
                "name": "parcel",
                "relationship": "similar",
                "reason": "Zero-config bundler alternative"
            },
            {
                "name": "rollup",
                "relationship": "combo",
                "reason": "Vite uses Rollup for production builds"
            }
        ],
        "warnings": [
            "ES modules in development vs bundled production",
            "Plugin compatibility differs from Webpack",
            "Some legacy dependencies may not work in dev mode"
        ],
        "manPageUrl": "https://vitejs.dev/",
        "distroNotes": {}
    },
    {
        "name": "webpack",
        "standsFor": "Web Package",
        "description": "Module bundler for JavaScript applications",
        "examples": [
            "webpack  # Bundle application using webpack.config.js",
            "webpack --mode production  # Create optimized production bundle",
            "webpack serve --mode development  # Start development server with hot reloading",
            "webpack --watch  # Rebuild automatically when files change",
            "webpack-bundle-analyzer dist/main.js  # Visualize bundle size and composition",
            "webpack --config webpack.prod.js  # Build using custom configuration file"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "development",
        "safety": "safe",
        "syntaxPattern": "webpack [options]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Development workflow",
                "commands": "webpack serve --mode development --open",
                "explanation": "Start dev server and open browser automatically",
                "title": "webpack"
            },
            {
                "scenario": "Production build with analysis",
                "commands": "webpack --mode production && webpack-bundle-analyzer dist/main.js",
                "explanation": "Build for production then analyze bundle",
                "title": "webpack && webpack"
            }
        ],
        "relatedCommands": [
            {
                "name": "rollup",
                "relationship": "alternative",
                "reason": "Alternative module bundler focused on ES modules"
            },
            {
                "name": "vite",
                "relationship": "alternative",
                "reason": "Modern build tool with faster development server"
            }
        ],
        "warnings": [
            "Configuration can become complex quickly",
            "Dev server and production builds may behave differently",
            "Plugin ecosystem requires careful version management"
        ],
        "manPageUrl": "https://webpack.js.org/",
        "distroNotes": {}
    },
    {
        "name": "wkhtmltopdf",
        "standsFor": "WebKit HTML to PDF",
        "description": "Render HTML to PDF using WebKit engine",
        "examples": [
            "wkhtmltopdf https://example.com document.pdf  # Convert web page to PDF document",
            "wkhtmltopdf document.html document.pdf  # Convert local HTML file to PDF",
            "wkhtmltopdf --page-size A4 --orientation Portrait input.html output.pdf  # Create A4 portrait PDF from HTML",
            "wkhtmltopdf --header-center 'Document Title' --footer-right '[page]' input.html output.pdf  # Add custom header and page numbers",
            "wkhtmltopdf --margin-top 20mm --margin-bottom 20mm input.html output.pdf  # Set custom page margins",
            "wkhtmltopdf --disable-javascript input.html output.pdf  # Convert HTML without executing JavaScript"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "development",
        "safety": "safe",
        "syntaxPattern": "wkhtmltopdf [options] <input> <output>",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Professional document conversion",
                "commands": "wkhtmltopdf --page-size A4 --margin-top 20mm --header-center 'Company Report' --footer-right '[page]/[topage]' report.html report.pdf",
                "explanation": "Create professional PDF with headers and page numbers",
                "title": "wkhtmltopdf"
            },
            {
                "scenario": "Batch convert HTML files",
                "commands": "for file in *.html; do wkhtmltopdf \"$file\" \"${file%.html}.pdf\"; done",
                "explanation": "Convert all HTML files in directory to PDF",
                "title": "for ; do ; done"
            }
        ],
        "relatedCommands": [
            {
                "name": "pandoc",
                "relationship": "alternative",
                "reason": "Pandoc can also convert HTML to PDF"
            },
            {
                "name": "puppeteer",
                "relationship": "alternative",
                "reason": "Node.js library for PDF generation from HTML"
            }
        ],
        "warnings": [
            "JavaScript execution can affect rendering",
            "CSS print styles may behave differently",
            "Large pages may take significant processing time"
        ],
        "manPageUrl": "https://wkhtmltopdf.org/usage/wkhtmltopdf.txt",
        "distroNotes": {}
    },
    {
        "name": "wrk",
        "standsFor": "Work",
        "description": "Modern HTTP benchmarking tool with scriptable load generation",
        "examples": [
            "wrk -t12 -c400 -d30s http://example.com/  # Run 30-second test with 12 threads and 400 connections",
            "wrk -t4 -c100 -d10s -s script.lua http://example.com/  # Use Lua script to customize request behavior",
            "wrk -t1 -c1 -d10s -R 10 http://example.com/  # Limit to 10 requests per second",
            "wrk -t4 -c50 -d30s -s post.lua http://api.example.com/  # Use script for POST requests with custom payloads"
        ],
        "platform": [
            "linux",
            "macos"
        ],
        "category": "development",
        "safety": "safe",
        "syntaxPattern": "wrk [options] URL",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Progressive load testing",
                "commands": "wrk -t1 -c1 -d10s -R 1 http://example.com/ && wrk -t4 -c50 -d30s http://example.com/",
                "explanation": "Test with light load first, then increase",
                "title": "wrk && wrk"
            }
        ],
        "relatedCommands": [
            {
                "name": "ab",
                "relationship": "traditional-alternative",
                "reason": "Apache Bench is simpler but less flexible"
            }
        ],
        "warnings": [
            "Lua scripting enables complex test scenarios",
            "Very efficient - can generate significant load",
            "Not available on Windows natively"
        ],
        "manPageUrl": "https://github.com/wg/wrk",
        "distroNotes": {}
    },
    {
        "name": "zabbix",
        "standsFor": "Zabbix Monitoring",
        "description": "Enterprise monitoring solution for networks, servers and applications",
        "examples": [
            "zabbix_server -c /etc/zabbix/zabbix_server.conf  # Start Zabbix server with configuration file",
            "zabbix_agentd -c /etc/zabbix/zabbix_agentd.conf  # Start Zabbix agent daemon",
            "zabbix_agentd -t system.cpu.load[all,avg1]  # Test specific agent item",
            "zabbix_agentd -p  # Print list of supported agent items"
        ],
        "platform": [
            "linux",
            "windows"
        ],
        "category": "development",
        "safety": "safe",
        "syntaxPattern": "zabbix_server [options]",
        "prerequisites": [
            "advanced"
        ],
        "commandCombinations": [
            {
                "scenario": "Start server and agent",
                "commands": "zabbix_server -c /etc/zabbix/zabbix_server.conf && zabbix_agentd -c /etc/zabbix/zabbix_agentd.conf",
                "explanation": "Start both server and agent components",
                "title": "zabbix_server && zabbix_agentd"
            }
        ],
        "relatedCommands": [
            {
                "name": "nagios",
                "relationship": "alternative",
                "reason": "Both provide enterprise monitoring solutions"
            }
        ],
        "warnings": [
            "Requires database setup (MySQL/PostgreSQL)",
            "Web interface needs PHP and web server",
            "Complex installation and configuration"
        ],
        "manPageUrl": "https://www.zabbix.com/documentation/",
        "distroNotes": {}
    }
];

export { development_webCommands };
export default development_webCommands;
