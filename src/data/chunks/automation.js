/**
 * TL;DRx Commands Database - Automation Category
 *
 * Contains 16 commands related to automation.
 * Generated from the original commands.js file.
 *
 * @fileoverview Automation category commands for TL;DRx
 * @category automation
 * @commands 16
 */

/**
 * Automation category commands
 * @type {Array<Object>}
 */
const automationCommands = [
    {
        "name": "ansible",
        "standsFor": "Configuration management and automation",
        "description": "Agentless automation tool for configuration management, application deployment, and task execution",
        "examples": [
            "ansible all -m ping  # Test connectivity to all hosts",
            "ansible webservers -m shell -a 'uptime'  # Run shell command on webservers group",
            "ansible all -m setup  # Gather facts from all hosts",
            "ansible-playbook site.yml  # Run a playbook",
            "ansible all -m copy -a 'src=file.txt dest=/tmp/'  # Copy file to all hosts",
            "ansible database -m service -a 'name=postgresql state=started'  # Manage services",
            "ansible all -m package -a 'name=vim state=present'  # Install package on all hosts"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "automation",
        "safety": "caution",
        "syntaxPattern": "ansible [pattern] -m [module] -a '[module options]'",
        "prerequisites": [
            "python3",
            "ssh"
        ],
        "commandCombinations": [
            {
                "scenario": "Complete deployment workflow",
                "commands": "ansible all -m ping && ansible-playbook --check deploy.yml && ansible-playbook deploy.yml",
                "explanation": "Tests connectivity, previews changes, then executes deployment",
                "title": "ansible && ansible && ansible"
            },
            {
                "scenario": "Update and restart services",
                "commands": "ansible webservers -m yum -a 'name=httpd state=latest' && ansible webservers -m service -a 'name=httpd state=restarted'",
                "explanation": "Updates Apache package and restarts the service",
                "title": "ansible && ansible"
            }
        ],
        "relatedCommands": [
            {
                "name": "terraform",
                "relationship": "complement",
                "reason": "Terraform provisions infrastructure, Ansible configures it"
            },
            {
                "name": "ssh",
                "relationship": "dependency",
                "reason": "Ansible uses SSH for connecting to managed hosts"
            }
        ],
        "warnings": [
            "Can make system-wide changes across many servers simultaneously",
            "Always test playbooks in staging environment first",
            "Requires proper SSH key management for security",
            "Modules run with privileges of connecting user unless --become used",
            "Failed tasks may leave systems in inconsistent state"
        ],
        "manPageUrl": "https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html",
        "distroNotes": {
            "windows": "Available through WSL, native support in recent versions",
            "linux": "Available in most distribution repositories",
            "macos": "Can be installed via pip or Homebrew"
        }
    },
    {
        "name": "at",
        "standsFor": "At",
        "description": "Schedule one-time tasks to run at specified times",
        "examples": [
            "echo 'backup.sh' | at 2:30  # Run backup.sh at 2:30 AM",
            "at 9:00 tomorrow  # Schedule interactive job for 9:00 AM tomorrow",
            "echo 'rm /tmp/tempfile' | at now + 1 hour  # Delete temporary file in 1 hour",
            "atq  # Display list of pending at jobs",
            "atrm 3  # Remove at job number 3",
            "at 10:00 2025-12-25  # Schedule job for Christmas morning"
        ],
        "platform": [
            "linux",
            "macos"
        ],
        "category": "automation",
        "safety": "dangerous",
        "syntaxPattern": "at [time] or echo 'command' | at [time]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Temporary system maintenance",
                "commands": "echo 'systemctl restart apache2' | at now + 30 minutes && atq",
                "explanation": "Schedule service restart in 30 minutes and check queue",
                "title": "echo | at && atq"
            }
        ],
        "relatedCommands": [
            {
                "name": "cron",
                "relationship": "complementary",
                "reason": "cron handles recurring jobs, at handles one-time jobs"
            },
            {
                "name": "batch",
                "relationship": "similar",
                "reason": "batch runs jobs when system load is low"
            }
        ],
        "warnings": [
            "Jobs run with user's environment at scheduling time",
            "Output is typically emailed unless redirected",
            "Requires atd daemon to be running"
        ],
        "manPageUrl": "https://ss64.com/osx/at.html",
        "distroNotes": {}
    },
    {
        "name": "cron",
        "standsFor": "Chronos",
        "description": "Time-based job scheduler for Unix-like systems",
        "examples": [
            "crontab -e  # Open editor to modify user's cron jobs",
            "crontab -l  # Display current user's cron jobs",
            "crontab -r  # Delete all cron jobs for current user",
            "0 2 * * * /home/user/backup.sh  # Run backup script every day at 2:00 AM",
            "0 * * * * /usr/sbin/logrotate /etc/logrotate.conf  # Run log rotation every hour",
            "0 3 * * 0 /usr/bin/apt update && /usr/bin/apt upgrade -y  # Update system packages every Sunday at 3:00 AM",
            "*/15 * * * * /usr/bin/curl -f http://localhost:8080/health || echo 'Service down' | mail -s 'Alert' admin@example.com  # Monitor service every 15 minutes",
            "crontab -e  # Edit crontab schedule for automated tasks"
        ],
        "platform": [
            "linux",
            "macos"
        ],
        "category": "automation",
        "safety": "safe",
        "syntaxPattern": "crontab [options] or cron job syntax: min hour day month weekday command",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Setup automated maintenance",
                "commands": "crontab -l > cron_backup.txt && echo '0 1 * * * /home/user/cleanup.sh' | crontab -",
                "explanation": "Backup current crontab then add new maintenance job",
                "title": "crontab > cron_backup && echo | crontab"
            }
        ],
        "relatedCommands": [
            {
                "name": "at",
                "relationship": "complementary",
                "reason": "at schedules one-time jobs, cron schedules recurring jobs"
            },
            {
                "name": "systemctl",
                "relationship": "modern-alternative",
                "reason": "systemd timers provide modern scheduling on systemd systems"
            }
        ],
        "warnings": [
            "Cron jobs run with minimal environment variables",
            "Use full paths to commands and files",
            "Output is typically emailed to the user unless redirected"
        ],
        "manPageUrl": "https://man7.org/linux/man-pages/man5/crontab.5.html",
        "distroNotes": {}
    },
    {
        "name": "crontab",
        "standsFor": "Cron Table",
        "description": "Edit and manage user cron jobs for scheduled tasks",
        "examples": [
            "crontab -e  # Open user's cron table for editing",
            "crontab -l  # Display current user's cron jobs",
            "crontab -r  # Delete all cron jobs for current user",
            "sudo crontab -u username -e  # Edit cron jobs for specific user (requires root)",
            "crontab ~/my_cron_jobs  # Replace current crontab with file contents",
            "echo '0 */6 * * * /home/user/sync.sh' | crontab -  # Add cron job from command line",
            "crontab -l | grep -v '#' | sort  # List active cron jobs sorted without comments",
            "crontab -l | wc -l && echo 'jobs configured'  # Count and display number of cron jobs"
        ],
        "platform": [
            "linux",
            "macos"
        ],
        "category": "automation",
        "safety": "caution",
        "syntaxPattern": "crontab [options]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Cron job backup and restore",
                "commands": "crontab -l > ~/cron_backup.txt && crontab ~/new_cron_jobs && crontab -l",
                "explanation": "Backup current crontab, install new one, verify",
                "title": "crontab > && crontab && crontab"
            }
        ],
        "relatedCommands": [
            {
                "name": "at",
                "relationship": "similar",
                "reason": "Schedule one-time tasks"
            },
            {
                "name": "systemctl",
                "relationship": "alternative",
                "reason": "systemd timers as modern alternative"
            }
        ],
        "warnings": [
            "Environment variables may differ from shell",
            "Use absolute paths in cron jobs"
        ],
        "manPageUrl": "https://man7.org/linux/man-pages/man1/crontab.1.html",
        "distroNotes": {}
    },
    {
        "name": "expect",
        "standsFor": "Expect",
        "description": "Automate interactive applications",
        "examples": [
            "expect -c 'spawn ssh user@host; expect \"password:\"; send \"mypass\\r\"; interact'  # Automate SSH login with password",
            "expect script.exp  # Execute expect script file",
            "expect ftp_script.exp  # Automate FTP file transfer session",
            "expect -c 'spawn program; expect \"prompt:\"; send \"response\\r\"; expect eof'  # Automate interactive program responses",
            "expect -c 'set timeout 30; spawn telnet host 23; expect \"login:\"; send \"user\\r\"; interact'  # Automate telnet session with timeout",
            "expect -f install.exp arg1 arg2  # Run expect script with command line arguments",
            "expect -d script.exp  # Run expect script with debug output enabled",
            "expect -c 'spawn ssh admin@production-server.company.com; expect \"Password:\"; send \"$env(PROD_PASSWORD)\\r\"; expect \"$\"; send \"sudo systemctl status critical-service\\r\"; expect \"$\"; send \"uptime && df -h && free -h\\r\"; interact' && echo 'Enterprise automated system monitoring: secure SSH authentication with environment variables, critical service verification, system health metrics collection for production infrastructure management'  # Enterprise production system monitoring automation"
        ],
        "platform": [
            "linux",
            "macos"
        ],
        "category": "automation",
        "safety": "safe",
        "syntaxPattern": "expect [options] [script]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Automated system setup",
                "commands": "expect setup.exp && echo 'System configured successfully'",
                "explanation": "Run automated setup script with success message",
                "title": "expect && echo"
            }
        ],
        "relatedCommands": [
            {
                "name": "ssh",
                "relationship": "commonly-automated",
                "reason": "expect is often used to automate SSH sessions"
            }
        ],
        "warnings": [
            "Powerful but can be complex for beginners",
            "Security risk if passwords are hardcoded",
            "Better alternatives exist for many use cases (SSH keys, etc.)"
        ],
        "manPageUrl": "https://core.tcl-lang.org/expect/index",
        "distroNotes": {}
    },
    {
        "name": "git-hooks-management",
        "standsFor": "Git Hooks Management",
        "description": "Manage and configure Git hooks for automation",
        "examples": [
            "git config core.hooksPath .githooks  # Use custom directory for Git hooks instead of .git/hooks",
            "chmod +x .git/hooks/pre-commit  # Enable pre-commit hook by making it executable",
            "ls -la .git/hooks/  # Show all sample hooks and active hooks in repository",
            "cp .git/hooks/pre-commit.sample .git/hooks/pre-commit  # Activate sample hook by removing .sample extension",
            ".git/hooks/pre-commit  # Manually run hook script to test functionality",
            "git commit --no-verify -m 'Emergency fix'  # Skip all hooks during commit for urgent changes",
            "echo 'Enterprise Git Hooks Automation and Quality Gates' && mkdir -p .githooks && cat > .githooks/pre-commit << 'EOF'\n#!/bin/bash\nset -e\necho 'Enterprise Pre-commit Quality Gates'\n# Run linting\nnpm run lint || { echo 'Linting failed'; exit 1; }\n# Run security scan\nnpm audit --audit-level high || { echo 'Security vulnerabilities found'; exit 1; }\n# Run tests\nnpm test || { echo 'Tests failed'; exit 1; }\n# Check commit message format\nif ! head -1 \"$1\" | grep -qE '^(feat|fix|docs|style|refactor|test|chore)((.+))?:.+'; then\n  echo 'Invalid commit message format'\n  exit 1\nfi\necho 'All quality gates passed'\nEOF\nchmod +x .githooks/pre-commit && git config core.hooksPath .githooks && echo 'Enterprise Git hooks: automated quality gates, security scanning, test execution, commit message validation, and development workflow enforcement for production code quality assurance'  # Enterprise Git hooks and quality automation"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "automation",
        "safety": "caution",
        "syntaxPattern": "git config core.hooksPath [path]",
        "prerequisites": [
            "scripting"
        ],
        "commandCombinations": [
            {
                "scenario": "Set up pre-commit hook for linting",
                "commands": "echo '#!/bin/bash\nnpm run lint' > .git/hooks/pre-commit && chmod +x .git/hooks/pre-commit",
                "explanation": "Create pre-commit hook that runs linter before each commit",
                "title": "echo > && chmod"
            },
            {
                "scenario": "Team-wide hooks setup",
                "commands": "mkdir .githooks && git config core.hooksPath .githooks && git add .githooks",
                "explanation": "Set up shared hooks directory that can be version controlled",
                "title": "mkdir && git && git"
            }
        ],
        "relatedCommands": [],
        "warnings": [
            "Hooks are not version controlled by default",
            "Windows may require different script extensions",
            "Hooks can prevent commits/pushes if they fail"
        ],
        "manPageUrl": "https://git-scm.com/docs/githooks",
        "distroNotes": {}
    },
    {
        "name": "jenkins-cli",
        "standsFor": "Jenkins CLI",
        "description": "Command-line interface for Jenkins automation server",
        "examples": [
            "java -jar jenkins-cli.jar -s http://jenkins:8080 build my-job  # Trigger build of 'my-job' on Jenkins server",
            "java -jar jenkins-cli.jar -s http://jenkins:8080 list-jobs  # Show all jobs configured on Jenkins instance",
            "java -jar jenkins-cli.jar -s http://jenkins:8080 get-job my-job  # Retrieve job configuration XML",
            "java -jar jenkins-cli.jar -s http://jenkins:8080 create-job new-job < job.xml  # Create new Jenkins job from XML configuration",
            "java -jar jenkins-cli.jar -s http://jenkins:8080 install-plugin git  # Install Git plugin on Jenkins server",
            "java -jar jenkins-cli.jar -s http://jenkins:8080 restart  # Restart Jenkins server safely",
            "java -jar jenkins-cli.jar -s http://jenkins:8080 console my-job 123  # View console output for build #123",
            "java -jar jenkins-cli.jar -s https://jenkins:8443 -auth admin:token build my-job -p BRANCH=develop -p ENV=staging  # Trigger secure build with parameters"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "automation",
        "safety": "safe",
        "syntaxPattern": "java -jar jenkins-cli.jar [options] <command>",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Automated deployment pipeline",
                "commands": "java -jar jenkins-cli.jar build deploy-staging -p BRANCH=main",
                "explanation": "Trigger deployment with branch parameter",
                "title": "java"
            },
            {
                "scenario": "Backup job configurations",
                "commands": "jenkins-cli.jar list-jobs | xargs -I {} jenkins-cli.jar get-job {} > {}.xml",
                "explanation": "Export all job configurations to XML files",
                "title": "jenkins | xargs >"
            }
        ],
        "relatedCommands": [
            {
                "name": "curl",
                "relationship": "alternative",
                "reason": "Jenkins REST API can be accessed via curl"
            },
            {
                "name": "git",
                "relationship": "combo",
                "reason": "Jenkins often integrates with Git repositories"
            },
            {
                "name": "docker",
                "relationship": "combo",
                "reason": "Jenkins can build and deploy Docker containers"
            }
        ],
        "warnings": [
            "Requires authentication setup (API token/username)",
            "jenkins-cli.jar must be downloaded from Jenkins server",
            "CSRF protection may need to be disabled for CLI access"
        ],
        "manPageUrl": "",
        "distroNotes": {}
    },
    {
        "name": "node-red",
        "standsFor": "Node-RED",
        "description": "Node-RED flow-based programming for IoT",
        "examples": [
            "node-red  # Starts Node-RED runtime and web editor",
            "node-red --port 1881  # Starts Node-RED web interface on port 1881",
            "node-red --safe  # Starts Node-RED without loading user flows for troubleshooting",
            "node-red-admin install node-red-contrib-modbus  # Installs Modbus nodes for industrial communication"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "automation",
        "safety": "safe",
        "syntaxPattern": "node-red [options]",
        "prerequisites": [
            "nodejs",
            "npm"
        ],
        "commandCombinations": [
            {
                "scenario": "Install and start with custom settings",
                "commands": "npm install -g node-red-contrib-dashboard && node-red --settings /path/to/settings.js",
                "explanation": "Installs dashboard nodes and starts Node-RED with custom settings",
                "title": "npm && node"
            },
            {
                "scenario": "Backup and restore flows",
                "commands": "node-red-admin backup flows.json && node-red-admin restore flows.json",
                "explanation": "Creates backup of flows and restores them",
                "title": "node && node"
            }
        ],
        "relatedCommands": [
            {
                "name": "npm",
                "relationship": "dependency",
                "reason": "Node.js package manager used to install Node-RED and additional nodes"
            },
            {
                "name": "mosquitto",
                "relationship": "complement",
                "reason": "MQTT broker commonly used with Node-RED for IoT messaging"
            }
        ],
        "warnings": [
            "Web editor runs on port 1880 by default",
            "Flows are stored in user directory and may need backup",
            "Some nodes require additional system dependencies",
            "Authentication should be enabled for production deployments"
        ],
        "manPageUrl": "https://nodered.org/docs/getting-started/",
        "distroNotes": {
            "windows": "Requires Node.js installation",
            "linux": "Available through npm or package managers",
            "macos": "Can be installed via npm or Homebrew"
        }
    },
    {
        "name": "openresty",
        "standsFor": "OpenResty",
        "description": "Web platform based on nginx with Lua scripting",
        "examples": [
            "sudo openresty  # Start OpenResty with default configuration",
            "openresty -t  # Test OpenResty configuration syntax",
            "openresty -s reload  # Reload configuration without stopping server",
            "openresty -s quit  # Gracefully shutdown OpenResty server",
            "openresty -c /path/to/nginx.conf  # Start with specific configuration file"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "automation",
        "safety": "caution",
        "syntaxPattern": "openresty [options]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Deploy Lua-based web app",
                "commands": "openresty -t && sudo openresty -s reload",
                "explanation": "Test then reload configuration with Lua code",
                "title": "openresty && sudo"
            }
        ],
        "relatedCommands": [
            {
                "name": "nginx",
                "relationship": "similar",
                "reason": "OpenResty extends nginx with Lua capabilities"
            }
        ],
        "warnings": [
            "Configuration compatible with nginx but adds Lua directives",
            "Lua code executes in nginx worker processes",
            "Performance benefits require understanding of non-blocking I/O"
        ],
        "manPageUrl": "https://openresty.org/en/",
        "distroNotes": {}
    },
    {
        "name": "playwright",
        "standsFor": "Playwright",
        "description": "Cross-browser automation framework for modern web testing",
        "examples": [
            "playwright install  # Install Chromium, Firefox, and Safari browsers",
            "playwright test  # Run all Playwright tests",
            "playwright test --headed  # Run tests with browser UI visible",
            "playwright codegen https://example.com  # Generate test code by recording browser interactions",
            "playwright test login.spec.js  # Run specific test file",
            "playwright test --debug  # Run tests in debug mode with inspector",
            "playwright test --project=chromium --reporter=html  # Run tests on Chromium with HTML report"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "automation",
        "safety": "safe",
        "syntaxPattern": "playwright [command] [options]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Cross-browser testing",
                "commands": "playwright test --project=chromium --project=firefox --project=webkit",
                "explanation": "Run tests across all supported browsers",
                "title": "playwright"
            }
        ],
        "relatedCommands": [
            {
                "name": "cypress",
                "relationship": "alternative",
                "reason": "Another modern E2E testing framework"
            },
            {
                "name": "puppeteer",
                "relationship": "similar",
                "reason": "Chrome-only automation framework"
            }
        ],
        "warnings": [
            "Built-in support for modern web features",
            "Auto-wait functionality reduces flaky tests",
            "Excellent cross-browser support including Safari"
        ],
        "manPageUrl": "https://playwright.dev/",
        "distroNotes": {}
    },
    {
        "name": "puppeteer",
        "standsFor": "Puppeteer",
        "description": "Control headless Chrome or Chromium browsers",
        "examples": [
            "node generate-pdf.js  # Use Puppeteer script to convert webpage to PDF",
            "node screenshot.js  # Capture screenshot of webpage using Puppeteer",
            "node scraper.js  # Extract data from JavaScript-rendered webpage",
            "node performance-test.js  # Measure webpage performance metrics",
            "node -e \"const puppeteer = require('puppeteer'); (async () => { const browser = await puppeteer.launch(); const page = await browser.newPage(); await page.goto(process.env.TARGET_URL); const metrics = await page.metrics(); const screenshot = await page.screenshot({path: 'performance-audit-$(date +%Y%m%d-%H%M%S).png', fullPage: true}); await browser.close(); console.log(JSON.stringify({timestamp: new Date().toISOString(), url: process.env.TARGET_URL, metrics: metrics, screenshot: 'performance-audit-$(date +%Y%m%d-%H%M%S).png'}, null, 2)); })();\" | tee performance-metrics-$(date +%Y%m%d-%H%M%S).json && echo \"Enterprise web performance audit completed: metrics captured, full-page screenshot saved, performance data archived for analysis\"  # Enterprise web performance monitoring with automated metrics collection, visual documentation, and structured data archival"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "automation",
        "safety": "safe",
        "syntaxPattern": "Node.js API - programmatic usage",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Web scraping pipeline",
                "commands": "node scraper.js && node process-data.js && node generate-report.js",
                "explanation": "Complete web scraping and reporting pipeline",
                "title": "node && node && node"
            }
        ],
        "relatedCommands": [
            {
                "name": "playwright",
                "relationship": "multi-browser-alternative",
                "reason": "Playwright supports multiple browsers, Puppeteer focuses on Chrome"
            }
        ],
        "warnings": [
            "Chrome/Chromium only - no Firefox or Safari",
            "Excellent for web scraping and PDF generation",
            "Headless by default but can run in full Chrome"
        ],
        "manPageUrl": "",
        "distroNotes": {}
    },
    {
        "name": "selenium-webdriver",
        "standsFor": "Selenium WebDriver",
        "description": "Web browser automation for testing web applications",
        "examples": [
            "python -m pytest test_selenium.py  # Run Selenium tests written in Python",
            "java -jar selenium-server-4.0.0.jar hub  # Start Selenium Grid hub for distributed testing",
            "java -jar selenium-server-4.0.0.jar node  # Start Selenium Grid node",
            "webdriver-manager update  # Update browser drivers for Selenium (Python)"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "automation",
        "safety": "safe",
        "syntaxPattern": "Various APIs in different languages",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Setup and run Selenium tests",
                "commands": "webdriver-manager update && python -m pytest tests/selenium/",
                "explanation": "Update drivers then run Selenium test suite",
                "title": "webdriver && python"
            }
        ],
        "relatedCommands": [
            {
                "name": "cypress",
                "relationship": "modern-alternative",
                "reason": "Cypress provides better developer experience"
            },
            {
                "name": "playwright",
                "relationship": "modern-alternative",
                "reason": "Playwright offers better cross-browser support"
            }
        ],
        "warnings": [
            "Requires browser drivers to be installed and managed",
            "Can be flaky due to timing issues",
            "Multiple language bindings available"
        ],
        "manPageUrl": "https://selenium-python.readthedocs.io/",
        "distroNotes": {}
    },
    {
        "name": "steamcmd",
        "standsFor": "Steam Command Line",
        "description": "Steam Console Client for Steam Workshop and game server management",
        "examples": [
            "steamcmd +login anonymous +app_update 740 +quit  # Downloads and updates CS:GO dedicated server files",
            "steamcmd +login username password +force_install_dir ./gameserver +app_update 232250 +quit  # Installs TF2 dedicated server to specified directory",
            "steamcmd +login anonymous +workshop_download_item 107410 123456789 +quit  # Downloads specific Workshop item for Arma 3"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "automation",
        "safety": "safe",
        "syntaxPattern": "steamcmd +[commands] +quit",
        "prerequisites": [
            "steam-account-optional"
        ],
        "commandCombinations": [
            {
                "scenario": "Install and configure game server",
                "commands": "steamcmd +login anonymous +force_install_dir ./server +app_update 740 +quit && ./server/srcds_run -game csgo +map de_dust2",
                "explanation": "Downloads CS:GO server files and starts server with de_dust2 map",
                "title": "steamcmd &&"
            },
            {
                "scenario": "Update multiple game servers",
                "commands": "steamcmd +login username password +app_update 740 +app_update 232250 +quit",
                "explanation": "Updates both CS:GO and TF2 servers in single session",
                "title": "steamcmd"
            }
        ],
        "relatedCommands": [],
        "warnings": [
            "Anonymous login has limited access to some content",
            "Steam Guard may interfere with automated logins",
            "Network interruptions can corrupt downloads",
            "Some apps require specific login credentials"
        ],
        "manPageUrl": "https://developer.valvesoftware.com/wiki/SteamCMD",
        "distroNotes": {
            "linux": "Requires 32-bit compatibility libraries on 64-bit systems",
            "windows": "Available as direct download from Valve",
            "macos": "Available but with limited game server support"
        }
    },
    {
        "name": "systemd-timer",
        "standsFor": "systemd Timer",
        "description": "Create and manage systemd timer units for scheduled tasks",
        "examples": [
            "systemctl list-timers  # Show all systemd timers and their next run times",
            "sudo systemctl start backup.timer  # Start the backup timer unit",
            "sudo systemctl enable backup.timer  # Enable backup timer to start automatically at boot",
            "systemctl status backup.timer  # Display detailed status of backup timer",
            "systemctl show backup.timer  # Display all properties of backup timer unit"
        ],
        "platform": [
            "linux"
        ],
        "category": "automation",
        "safety": "caution",
        "syntaxPattern": "systemctl [options] <command> timer-name.timer",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Timer deployment workflow",
                "commands": "sudo systemctl daemon-reload && sudo systemctl enable backup.timer && sudo systemctl start backup.timer && systemctl status backup.timer",
                "explanation": "Reload config, enable timer, start timer, check status",
                "title": "sudo && sudo && sudo && systemctl"
            }
        ],
        "relatedCommands": [
            {
                "name": "systemctl",
                "relationship": "combo",
                "reason": "Manage systemd timer units"
            },
            {
                "name": "crontab",
                "relationship": "alternative",
                "reason": "Traditional cron scheduling"
            }
        ],
        "warnings": [
            "Requires both .timer and .service files",
            "More complex than cron but more powerful"
        ],
        "manPageUrl": "https://www.freedesktop.org/software/systemd/man/systemd.timer.html",
        "distroNotes": {}
    },
    {
        "name": "terraform",
        "standsFor": "Terraform (Advanced)",
        "description": "Infrastructure as Code tool for building, changing, and versioning infrastructure",
        "examples": [
            "terraform init -backend-config='bucket=my-terraform-state' -backend-config='key=prod/terraform.tfstate' -backend-config='region=us-east-1'  # Initialize with S3 backend for state management",
            "terraform workspace new production  # Create separate workspace for environment isolation",
            "terraform plan -var-file='prod.tfvars' -out=tfplan  # Generate execution plan using environment-specific variables",
            "terraform apply tfplan  # Execute previously created plan file",
            "terraform import aws_instance.web i-1234567890abcdef0  # Import existing AWS instance into Terraform state",
            "terraform refresh  # Update state file with real infrastructure",
            "terraform apply -target=aws_instance.web -target=aws_security_group.web  # Apply changes only to specified resources",
            "terraform state list && terraform state show aws_instance.web  # List resources in state and show specific resource details",
            "terraform graph | dot -Tsvg > graph.svg  # Create visual dependency graph of infrastructure",
            "terraform force-unlock 1234-5678-9012  # Remove stuck state lock (use with extreme caution)"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "automation",
        "safety": "safe",
        "syntaxPattern": "terraform [command] [options]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Safe production deployment",
                "commands": "terraform workspace select production && terraform plan -var-file=prod.tfvars -out=prod.tfplan && terraform apply prod.tfplan",
                "explanation": "Switch to production workspace, plan, and apply changes safely",
                "title": "terraform && terraform && terraform"
            },
            {
                "scenario": "Multi-environment workflow",
                "commands": "terraform workspace list && terraform workspace select staging && terraform plan -destroy -var-file=staging.tfvars",
                "explanation": "List workspaces, switch to staging, and plan destruction",
                "title": "terraform && terraform && terraform"
            },
            {
                "scenario": "Complete infrastructure deployment",
                "commands": "terraform init && terraform plan && terraform apply -auto-approve",
                "explanation": "Initializes, plans, and applies infrastructure changes automatically",
                "title": "terraform && terraform && terraform"
            },
            {
                "scenario": "Validate and format configuration",
                "commands": "terraform validate && terraform fmt",
                "explanation": "Validates configuration syntax and formats files",
                "title": "terraform && terraform"
            }
        ],
        "relatedCommands": [
            {
                "name": "aws",
                "relationship": "combo",
                "reason": "Terraform AWS provider uses AWS CLI credentials"
            },
            {
                "name": "ansible",
                "relationship": "complement",
                "reason": "Terraform provisions infrastructure, Ansible configures it"
            },
            {
                "name": "kubectl",
                "relationship": "complement",
                "reason": "Terraform can provision Kubernetes clusters managed by kubectl"
            }
        ],
        "warnings": [
            "State locks prevent concurrent modifications",
            "Provider version constraints prevent incompatibility",
            "Workspace isolation important for multi-environment setups",
            "Import requires exact resource configuration match"
        ],
        "manPageUrl": "https://developer.hashicorp.com/terraform/docs",
        "distroNotes": {
            "linux": "Available as binary download or through package managers",
            "windows": "Available as binary download or through Chocolatey",
            "macos": "Available through Homebrew or binary download"
        }
    },
    {
        "name": "xargs",
        "standsFor": "Extended Arguments",
        "description": "Build and execute command lines from standard input",
        "examples": [
            "find . -name '*.tmp' | xargs rm  # Find and delete temporary files",
            "find . -name '*.txt' | xargs -P 4 gzip  # Compress text files using 4 parallel processes",
            "find . -name '*.pdf' -print0 | xargs -0 cp -t backup/  # Copy PDF files handling spaces in names",
            "find . -name '*.log' | xargs -p rm  # Interactively confirm before deleting each file",
            "echo 'a,b,c' | xargs -d ',' echo  # Process comma-separated values",
            "seq 1 10 | xargs -n 3 echo  # Pass maximum 3 arguments per echo command"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "automation",
        "safety": "dangerous",
        "syntaxPattern": "xargs [options] [command]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Clean old log files",
                "commands": "find /var/log -name '*.log' -mtime +30 | xargs -r gzip",
                "explanation": "Find and compress log files older than 30 days",
                "title": "find | xargs"
            }
        ],
        "relatedCommands": [
            {
                "name": "find",
                "relationship": "combo",
                "reason": "find is commonly piped to xargs for batch operations"
            },
            {
                "name": "parallel",
                "relationship": "parallel-alternative",
                "reason": "parallel provides better parallel processing capabilities"
            }
        ],
        "warnings": [
            "Use -0 with find -print0 for files with spaces",
            "Can run commands in parallel with -P option",
            "Essential for batch processing in Unix pipelines"
        ],
        "manPageUrl": "https://man7.org/linux/man-pages/man1/xargs.1.html",
        "distroNotes": {}
    }
];

export { automationCommands };
export default automationCommands;
