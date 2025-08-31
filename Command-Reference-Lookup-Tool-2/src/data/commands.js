import { PLATFORM_STYLES } from "./platforms.js";

// Platform icon components for command data
const MacOSIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
  </svg>
);

const WindowsIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 12V6.75l6-1.32v6.48L3 12zm17-9v8.75l-10 .15V5.21L20 3zM3 13l6-.09v6.44l-6-1.35V13zm17 .25V22l-10-1.91V13.1l10 .15z" />
  </svg>
);

export const SAMPLE_COMMANDS = [
  {
    name: "alias",
    subtitle: "Command alias management",
    description:
      "Creates shortcuts for commonly used commands, improving efficiency and reducing typing errors",
    safety: "safe",
    platform: [
      {
        id: "linux",
        name: "Linux",
        color: PLATFORM_STYLES.linux,
        icon: "🐧",
      },
      {
        id: "macos",
        name: "macOS",
        color: PLATFORM_STYLES.macos,
        icon: <MacOSIcon />,
      },
      {
        id: "shell",
        name: "Shell",
        color: PLATFORM_STYLES.shell,
        icon: "🔥",
      },
    ],
    categories: [
      { name: "Shell Utilities", icon: "🛠️" },
      { name: "Productivity", icon: "⚡" },
    ],
    syntaxPattern: "alias [name[=value] ...]",
    commonFlags: [
      {
        flag: "-p",
        description: "Print all defined aliases in a reusable format",
        example: "alias -p",
      },
    ],
    prerequisites: [
      "Shell environment (bash, zsh, etc.)",
      "Write access to shell configuration files",
    ],
    notes: [
      "Aliases are session-specific unless added to shell configuration",
      "Alias names cannot contain spaces or special characters",
    ],
    examples: [
      {
        title: "Create a simple alias",
        code: "alias ll='ls -la'",
        description:
          "Create a shortcut for listing files in long format with hidden files",
        output: "# No output - alias is now available",
      },
      {
        title: "List all aliases",
        code: "alias",
        description: "Display all currently defined aliases",
        output: "alias ll='ls -la'\nalias grep='grep --color=auto'",
      },
      {
        title: "Remove an alias",
        code: "unalias ll",
        description: "Remove the previously defined alias",
        output: "# No output - alias is removed",
      },
    ],
    relatedCommands: [
      { name: "unalias", description: "Remove command aliases" },
      { name: "which", description: "Locate commands and aliases" },
      { name: "type", description: "Display command type information" },
    ],
    manPageUrl: "https://man7.org/linux/man-pages/man1/alias.1p.html",
  },
  {
    name: "ls",
    subtitle: "List directory contents",
    description:
      "Display information about files and directories in various formats and with different levels of detail",
    safety: "safe",
    platform: [
      {
        id: "linux",
        name: "Linux",
        color: PLATFORM_STYLES.linux,
        icon: "🐧",
      },
      {
        id: "macos",
        name: "macOS",
        color: PLATFORM_STYLES.macos,
        icon: <MacOSIcon />,
      },
    ],
    categories: [
      { name: "File System", icon: "📁" },
      { name: "Core Utils", icon: "🔧" },
    ],
    syntaxPattern: "ls [OPTION]... [FILE]...",
    commonFlags: [
      {
        flag: "-l",
        description: "Use long listing format showing permissions, size, date",
        example: "ls -l",
      },
      {
        flag: "-a",
        description: "Show hidden files (files starting with .)",
        example: "ls -a",
      },
      {
        flag: "-h",
        description: "Human-readable file sizes (with -l)",
        example: "ls -lh",
      },
      {
        flag: "-R",
        description: "List subdirectories recursively",
        example: "ls -R",
      },
      {
        flag: "-t",
        description: "Sort by modification time, newest first",
        example: "ls -lt",
      },
    ],
    prerequisites: [
      "Unix-like operating system",
      "Read permissions on the directory",
    ],
    notes: [
      "Color output depends on terminal settings and --color option",
      "File sizes are in bytes unless -h flag is used",
    ],
    examples: [
      {
        title: "Basic directory listing",
        code: "ls",
        description: "List files and directories in current directory",
        output: "Documents  Downloads  Pictures  Videos",
      },
      {
        title: "Detailed listing with hidden files",
        code: "ls -la",
        description:
          "Show all files with detailed information including permissions and size",
        output:
          "drwxr-xr-x  5 user user 4096 Jan 15 10:30 .\ndrwxr-xr-x 24 user user 4096 Jan 15 09:15 ..\n-rw-r--r--  1 user user  220 Jan 15 10:30 .bashrc",
      },
      {
        title: "Human-readable file sizes",
        code: "ls -lh",
        description: "List files with sizes in human-readable format (K, M, G)",
        output:
          "-rw-r--r-- 1 user user 1.2K Jan 15 10:30 file.txt\n-rw-r--r-- 1 user user 2.5M Jan 15 09:15 image.jpg",
      },
    ],
    relatedCommands: [
      { name: "dir", description: "Windows equivalent directory listing" },
      { name: "tree", description: "Display directory tree structure" },
      { name: "find", description: "Search for files and directories" },
    ],
    manPageUrl: "https://man7.org/linux/man-pages/man1/ls.1.html",
  },
  {
    name: "git",
    subtitle: "Distributed version control system",
    description:
      "Track changes in files and coordinate work on those files among multiple people",
    safety: "caution",
    platform: [
      {
        id: "linux",
        name: "Linux",
        color: PLATFORM_STYLES.linux,
        icon: "🐧",
      },
      {
        id: "macos",
        name: "macOS",
        color: PLATFORM_STYLES.macos,
        icon: <MacOSIcon />,
      },
      {
        id: "shell",
        name: "Shell",
        color: PLATFORM_STYLES.shell,
        icon: "🔥",
      },
    ],
    categories: [
      { name: "Version Control", icon: "📝" },
      { name: "Development", icon: "💻" },
    ],
    syntaxPattern: "git [--version] [--help] [-C <path>] <command> [<args>]",
    commonFlags: [
      {
        flag: "--version",
        description: "Show the Git version",
        example: "git --version",
      },
      {
        flag: "--help",
        description: "Show help information",
        example: "git --help",
      },
      {
        flag: "-C <path>",
        description: "Run git as if started in <path>",
        example: "git -C /path/to/repo status",
      },
    ],
    prerequisites: [
      "Git installed on system",
      "Repository initialized or cloned",
      "User name and email configured",
    ],
    notes: [
      "Always check git status before committing",
      "Use meaningful commit messages",
      "Pull before pushing to avoid conflicts",
    ],
    warnings: [
      "git reset --hard will permanently delete uncommitted changes",
      "Force pushing (git push --force) can overwrite remote history",
    ],
    examples: [
      {
        title: "Check repository status",
        code: "git status",
        description: "Show the working tree status and staged changes",
        output:
          "On branch main\nYour branch is up to date with 'origin/main'.\n\nnothing to commit, working tree clean",
      },
      {
        title: "Stage and commit changes",
        code: "git add . && git commit -m 'Add new feature'",
        description: "Stage all changes and create a commit with a message",
        output:
          "[main 1a2b3c4] Add new feature\n 2 files changed, 15 insertions(+), 3 deletions(-)",
      },
      {
        title: "Push to remote repository",
        code: "git push origin main",
        description: "Push commits to the main branch on origin remote",
        output:
          "Counting objects: 5, done.\nWriting objects: 100% (5/5), 452 bytes | 452.00 KiB/s, done.\nTo https://github.com/user/repo.git\n   abc123..def456  main -> main",
      },
    ],
    relatedCommands: [
      { name: "gitk", description: "Git repository browser" },
      { name: "tig", description: "Text-mode interface for Git" },
      { name: "gh", description: "GitHub CLI tool" },
    ],
    manPageUrl: "https://git-scm.com/docs/git",
  },
  {
    name: "ansible",
    subtitle: "Ansible automation platform",
    description: "Configuration management and application deployment tool",
    safety: "caution",
    platform: [
      {
        id: "linux",
        name: "Linux",
        color: PLATFORM_STYLES.linux,
        icon: "🐧",
      },
      {
        id: "macos",
        name: "macOS",
        color: PLATFORM_STYLES.macos,
        icon: <MacOSIcon />,
      },
      {
        id: "automation",
        name: "Automation",
        color: PLATFORM_STYLES.automation,
        icon: "⚙️",
      },
    ],
    categories: [
      { name: "DevOps", icon: "⚙️" },
      { name: "Automation", icon: "🤖" },
    ],
    syntaxPattern: "ansible [pattern] -m [module] -a [arguments]",
    commonFlags: [
      {
        flag: "-m",
        description: "Specify the module to use",
        example: "ansible all -m ping",
      },
      {
        flag: "-a",
        description: "Module arguments",
        example: 'ansible all -m shell -a "uptime"',
      },
    ],
    prerequisites: [
      "Ansible installed on control machine",
      "SSH access to target hosts",
      "Inventory file configured",
    ],
    examples: [
      {
        title: "Test connectivity",
        code: "ansible all -m ping",
        description: "Test connectivity to all hosts",
        output: 'host1 | SUCCESS => { "ping": "pong" }',
      },
      {
        title: "Run playbook",
        code: "ansible-playbook site.yml",
        description: "Execute tasks defined in playbook",
        output: "PLAY [Deploy application] ****",
      },
      {
        title: "Create encrypted file",
        code: "ansible-vault create secrets.yml",
        description: "Create new encrypted YAML file",
        output: "New Vault password:",
      },
    ],
    relatedCommands: [
      { name: "ansible-playbook", description: "Run Ansible playbooks" },
      { name: "ansible-vault", description: "Encrypt sensitive data" },
    ],
    manPageUrl: "https://docs.ansible.com/ansible/latest/user_guide/index.html",
  },
  {
    name: "docker",
    subtitle: "Container platform",
    description:
      "Platform for developing, shipping, and running applications in containers",
    safety: "caution",
    platform: [
      {
        id: "linux",
        name: "Linux",
        color: PLATFORM_STYLES.linux,
        icon: "🐧",
      },
      {
        id: "macos",
        name: "macOS",
        color: PLATFORM_STYLES.macos,
        icon: <MacOSIcon />,
      },
      {
        id: "automation",
        name: "Automation",
        color: PLATFORM_STYLES.automation,
        icon: "⚙️",
      },
    ],
    categories: [
      { name: "Containers", icon: "📦" },
      { name: "DevOps", icon: "⚙️" },
    ],
    syntaxPattern: "docker [OPTIONS] COMMAND [ARG...]",
    commonFlags: [
      {
        flag: "-d",
        description: "Run container in detached mode",
        example: "docker run -d nginx",
      },
      {
        flag: "-p",
        description: "Publish container ports to host",
        example: "docker run -p 8080:80 nginx",
      },
    ],
    prerequisites: [
      "Docker installed and running",
      "User added to docker group (Linux)",
      "Docker daemon permissions",
    ],
    examples: [
      {
        title: "List running containers",
        code: "docker ps",
        description: "Show currently running containers",
        output:
          "CONTAINER ID   IMAGE   COMMAND   CREATED   STATUS   PORTS   NAMES",
      },
      {
        title: "Build image",
        code: "docker build -t myapp .",
        description: "Build Docker image from Dockerfile",
        output: "Successfully built 1a2b3c4d5e6f",
      },
      {
        title: "Run container",
        code: "docker run -p 8080:80 myapp",
        description: "Run container with port mapping",
        output: "Container started on port 8080",
      },
      {
        title: "View logs",
        code: "docker logs container_name",
        description: "Display container logs",
        output: "2024-01-15 10:30:00 [INFO] Application started",
      },
    ],
    relatedCommands: [
      {
        name: "docker-compose",
        description: "Multi-container Docker applications",
      },
      { name: "kubectl", description: "Kubernetes cluster management" },
    ],
    manPageUrl: "https://docs.docker.com/reference/cli/docker/",
  },
  {
    name: "rm",
    subtitle: "Remove files and directories",
    description: "Delete files and directories from the filesystem permanently",
    safety: "dangerous",
    platform: [
      {
        id: "linux",
        name: "Linux",
        color: PLATFORM_STYLES.linux,
        icon: "🐧",
      },
      {
        id: "macos",
        name: "macOS",
        color: PLATFORM_STYLES.macos,
        icon: <MacOSIcon />,
      },
    ],
    categories: [
      { name: "File System", icon: "📁" },
      { name: "Destructive", icon: "⚠️" },
    ],
    syntaxPattern: "rm [OPTION]... [FILE]...",
    commonFlags: [
      {
        flag: "-r, -R",
        description: "Remove directories and their contents recursively",
        example: "rm -r directory/",
      },
      {
        flag: "-f",
        description: "Force removal without prompting",
        example: "rm -f file.txt",
      },
      {
        flag: "-i",
        description: "Prompt before every removal",
        example: "rm -i file.txt",
      },
      {
        flag: "-v",
        description: "Verbose output, show what is being removed",
        example: "rm -v file.txt",
      },
    ],
    prerequisites: [
      "Write permissions on the file/directory",
      "Write permissions on the parent directory",
    ],
    warnings: [
      "rm permanently deletes files - there is no undo",
      "rm -rf can delete entire directory trees without confirmation",
      "Always double-check paths before running rm commands",
    ],
    examples: [
      {
        title: "Remove a single file",
        code: "rm file.txt",
        description: "Delete a specific file",
        output: "# No output unless there is an error",
      },
      {
        title: "Remove directory recursively",
        code: "rm -rf old_project/",
        description: "Delete directory and all its contents without prompting",
        output: "# No output - directory and contents are removed",
      },
      {
        title: "Interactive removal",
        code: "rm -i *.log",
        description: "Prompt before removing each log file",
        output:
          "rm: remove regular file 'app.log'? y\nrm: remove regular file 'error.log'? n",
      },
    ],
    relatedCommands: [
      { name: "rmdir", description: "Remove empty directories" },
      { name: "trash", description: "Move files to trash (safer alternative)" },
      { name: "find", description: "Find files before removing them" },
    ],
    manPageUrl: "https://man7.org/linux/man-pages/man1/rm.1.html",
  },
];
