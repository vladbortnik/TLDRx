/**
 * TL;DRx Commands Database - Development git Category
 *
 * Contains 32 commands related to development git.
 * Generated from the original commands.js file.
 *
 * @fileoverview Development git category commands for TL;DRx
 * @category development-git
 * @commands 32
 */

/**
 * Development git category commands
 * @type {Array<Object>}
 */
const development_gitCommands = [
    {
        "name": "git",
        "standsFor": "global information tracker",
        "description": "Version control system for tracking code changes",
        "examples": [
            "git init  # Create new Git repository in current directory",
            "git clone https://github.com/user/repo.git  # Download complete copy of remote repository",
            "git status  # Show modified files, staged changes, and current branch",
            "git add .  # Add all modified files to staging area",
            "git commit -m 'Add new feature'  # Save staged changes with descriptive message",
            "git push origin main  # Upload local commits to remote repository",
            "git pull  # Download and merge remote changes into current branch",
            "git log --oneline  # Show compact list of recent commits",
            "echo 'Enterprise Git Repository Analysis' && git log --oneline -10 && echo '' && echo 'Repository Statistics:' && git shortlog -sn | head -5 && echo '' && echo 'Recent Activity:' && git log --since='1 month ago' --pretty=format:'%ad %an: %s' --date=short | head -10 && echo '' && echo 'Branch Information:' && git branch -vv && echo '' && git status && echo 'Enterprise version control metrics: commit history analysis, contributor statistics, development activity trends, branch synchronization status, and working directory state for project governance and team coordination'  # Enterprise Git repository dashboard"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "development",
        "safety": "caution",
        "syntaxPattern": "git <command> [options]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Quick commit workflow",
                "commands": "git add . && git commit -m 'Fix bug' && git push",
                "explanation": "Stage, commit, and push changes in one line",
                "title": "git && git && git"
            },
            {
                "scenario": "Create feature branch and switch",
                "commands": "git checkout -b feature/new-ui && git push -u origin feature/new-ui",
                "explanation": "Create new branch, switch to it, and set up remote tracking",
                "title": "git && git"
            }
        ],
        "relatedCommands": [
            {
                "name": "ssh",
                "relationship": "combo",
                "reason": "Use SSH keys for secure Git authentication"
            },
            {
                "name": "grep",
                "relationship": "combo",
                "reason": "git grep searches through repository history"
            }
        ],
        "warnings": [
            "Always pull before pushing to avoid conflicts",
            "Don't commit large binary files to repository",
            "Use .gitignore to exclude generated files"
        ],
        "manPageUrl": "https://git-scm.com/docs",
        "distroNotes": {}
    },
    {
        "name": "git-archive-operations",
        "standsFor": "Git Archive Operations",
        "description": "Create archives of repository contents for distribution",
        "examples": [
            "git archive --format=tar.gz --prefix=myproject-1.0/ v1.0 > myproject-1.0.tar.gz  # Create compressed archive of tagged release with prefix",
            "git archive HEAD src/ | tar -x -C /tmp/deploy  # Extract specific directory to deployment location",
            "git archive --format=zip --output=release.zip HEAD  # Create ZIP file of current HEAD state",
            "git archive --format=tar --worktree-attributes HEAD | gzip > dist.tar.gz  # Create archive respecting .gitattributes export settings",
            "git archive --remote=origin --format=tar.gz HEAD > remote-snapshot.tar.gz  # Create archive directly from remote without local checkout",
            "git archive --format=tar.gz HEAD -- . ':!tests' ':!*.log' > clean-archive.tar.gz  # Create archive excluding test files and logs"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "development",
        "safety": "dangerous",
        "syntaxPattern": "git archive [options] <tree-ish> [path...]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Automated release packaging",
                "commands": "git tag v$(date +%Y.%m.%d) && git archive --format=tar.gz --prefix=release-$(date +%Y%m%d)/ HEAD > releases/release-$(date +%Y%m%d).tar.gz",
                "explanation": "Create dated tag and corresponding release archive",
                "title": "git && git > releases"
            },
            {
                "scenario": "Deploy from archive",
                "commands": "git archive --format=tar HEAD | ssh server 'cd /var/www && tar -xf -'",
                "explanation": "Create archive and deploy directly to remote server",
                "title": "git | ssh && tar"
            }
        ],
        "relatedCommands": [
            {
                "name": "tar",
                "relationship": "combo",
                "reason": "Often used together for archive processing"
            }
        ],
        "warnings": [
            "Archives don't include Git history or metadata",
            "Gitattributes export-ignore affects archive contents",
            "Remote archives require server support"
        ],
        "manPageUrl": "https://git-scm.com/docs/git-archive",
        "distroNotes": {}
    },
    {
        "name": "git-bisect",
        "standsFor": "Git bisect",
        "description": "Binary search through commit history to find bugs",
        "examples": [
            "git bisect start  # Initialize binary search for finding problematic commit",
            "git bisect bad  # Tell Git current commit has the bug",
            "git bisect good v1.0  # Tell Git that version 1.0 was working correctly",
            "git bisect run make test  # Automatically run tests to find first failing commit",
            "git bisect skip  # Skip current commit if it can't be tested",
            "git bisect reset  # Return to original branch and end bisect session"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "development",
        "safety": "safe",
        "syntaxPattern": "git bisect <command> [options]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Complete bisect workflow",
                "commands": "git bisect start && git bisect bad && git bisect good HEAD~20",
                "explanation": "Start bisect marking current as bad and 20 commits ago as good",
                "title": "git && git && git"
            },
            {
                "scenario": "Automated bug hunting",
                "commands": "git bisect start HEAD v1.0 && git bisect run ./test_script.sh",
                "explanation": "Automatically find first bad commit between HEAD and v1.0",
                "title": "git && git"
            }
        ],
        "relatedCommands": [
            {
                "name": "git-log",
                "relationship": "combo",
                "reason": "Examine commit history before starting bisect"
            }
        ],
        "warnings": [
            "Requires commits that can be built and tested",
            "Binary search assumes linear bug introduction",
            "Need clear definition of 'good' vs 'bad' behavior"
        ],
        "manPageUrl": "https://git-scm.com/docs/git-bisect",
        "distroNotes": {}
    },
    {
        "name": "git-blame-advanced",
        "standsFor": "Git Blame Advanced",
        "description": "Advanced blame analysis for code attribution and history",
        "examples": [
            "git blame -c --date=short src/main.js  # Show blame with commit hash and short date format",
            "git blame -L 10,20 src/utils.js  # Show blame information only for lines 10-20",
            "git blame -w src/component.jsx  # Skip whitespace-only changes when attributing lines",
            "git blame -e src/config.py  # Show author email addresses instead of names",
            "git blame -M src/renamed-file.js  # Track lines even if file was moved or renamed",
            "git blame --ignore-rev abc1234 src/main.c  # Skip specific commit when attributing changes"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "development",
        "safety": "safe",
        "syntaxPattern": "git blame [options] [file]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Deep blame analysis",
                "commands": "git blame -M -C -w --date=iso src/complex.js | head -20",
                "explanation": "Comprehensive blame with move/copy detection and whitespace ignored",
                "title": "git | head"
            },
            {
                "scenario": "Blame with commit messages",
                "commands": "git blame -c src/file.js | cut -d')' -f1 | xargs -I {} git log -1 --oneline {}",
                "explanation": "Get commit messages for blamed commits",
                "title": "git | cut | xargs"
            }
        ],
        "relatedCommands": [
            {
                "name": "git-log",
                "relationship": "combo",
                "reason": "Often used together to understand code history"
            }
        ],
        "warnings": [
            "Blame follows last commit that touched a line, not original author",
            "Merge commits can obscure original blame information",
            "Large files may take time to process"
        ],
        "manPageUrl": "https://git-scm.com/docs/git-blame",
        "distroNotes": {}
    },
    {
        "name": "git-bundle-operations",
        "standsFor": "Git Bundle Operations",
        "description": "Create and manage Git bundles for offline repository transfer",
        "examples": [
            "git bundle create repo-backup.bundle --all  # Package entire repository with all branches and tags into bundle",
            "git bundle create changes.bundle main ^origin/main  # Bundle only commits not yet pushed to remote",
            "git bundle verify repo-backup.bundle  # Check bundle file for corruption and missing prerequisites",
            "git bundle list-heads repo-backup.bundle  # Show all references contained in bundle file",
            "git clone repo-backup.bundle cloned-repo  # Create new repository from bundle file",
            "git fetch ../changes.bundle main:bundle-main  # Import changes from bundle into existing repository"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "development",
        "safety": "caution",
        "syntaxPattern": "git bundle <command> [options] <bundle-file> <ref>",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Offline repository backup",
                "commands": "git bundle create full-backup-$(date +%Y%m%d).bundle --all && git bundle verify full-backup-$(date +%Y%m%d).bundle",
                "explanation": "Create dated full backup bundle and verify its integrity",
                "title": "git && git"
            },
            {
                "scenario": "Transfer specific feature branch",
                "commands": "git bundle create feature.bundle feature-branch ^main && scp feature.bundle remote-server:",
                "explanation": "Bundle feature branch changes and transfer to remote server",
                "title": "git && scp"
            }
        ],
        "relatedCommands": [],
        "warnings": [
            "Bundles are single files and can become very large",
            "Prerequisites must be satisfied in target repository",
            "Bundle format is Git version dependent"
        ],
        "manPageUrl": "https://git-scm.com/docs/git-bundle",
        "distroNotes": {}
    },
    {
        "name": "git-cherry-pick",
        "standsFor": "Git cherry-pick",
        "description": "Apply specific commits from other branches",
        "examples": [
            "git cherry-pick abc1234  # Apply specific commit to current branch",
            "git cherry-pick abc1234..def5678  # Apply range of commits from one branch to current",
            "git cherry-pick -n abc1234  # Apply changes but don't create commit automatically",
            "git cherry-pick -s abc1234  # Apply commit and add Signed-off-by line",
            "git cherry-pick --continue  # Proceed with cherry-pick after fixing merge conflicts",
            "git cherry-pick --abort  # Cancel cherry-pick and return to previous state"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "development",
        "safety": "safe",
        "syntaxPattern": "git cherry-pick [options] <commit>...",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Selective hotfix deployment",
                "commands": "git checkout release && git cherry-pick abc1234 def5678",
                "explanation": "Apply specific bug fixes to release branch",
                "title": "git && git"
            },
            {
                "scenario": "Backport feature to older branch",
                "commands": "git checkout maintenance && git cherry-pick -x feature-commit",
                "explanation": "Apply feature commit to maintenance branch with reference",
                "title": "git && git"
            }
        ],
        "relatedCommands": [
            {
                "name": "git-rebase",
                "relationship": "similar",
                "reason": "Both reapply commits, rebase moves entire branch"
            }
        ],
        "warnings": [
            "Can create duplicate commits with different hashes",
            "May cause conflicts that need manual resolution",
            "Order matters when cherry-picking multiple commits"
        ],
        "manPageUrl": "https://git-scm.com/docs/git-cherry-pick",
        "distroNotes": {}
    },
    {
        "name": "git-fetch-strategies",
        "standsFor": "Git Fetch Strategies",
        "description": "Advanced fetching strategies for remote repositories",
        "examples": [
            "git fetch --all --prune  # Update all remotes and remove local tracking branches for deleted remote branches",
            "git fetch --depth=50 origin  # Fetch only last 50 commits to save bandwidth and storage",
            "git fetch origin feature-branch:feature-branch  # Fetch specific remote branch to local branch",
            "git fetch --tags origin  # Fetch all tags from remote without fetching branches",
            "git fetch --dry-run origin  # Preview what would be downloaded without actually fetching",
            "git fetch -v origin  # Show detailed information about fetch operation"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "development",
        "safety": "safe",
        "syntaxPattern": "git fetch [options] [remote] [refspec]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Update all branches safely",
                "commands": "git fetch --all --prune && git branch -vv | grep ': gone]' | awk '{print $1}' | xargs -n 1 git branch -d",
                "explanation": "Fetch updates and clean up local branches tracking deleted remotes",
                "title": "git && git | grep | awk | xargs"
            },
            {
                "scenario": "Sync with upstream fork",
                "commands": "git fetch upstream && git checkout main && git merge upstream/main",
                "explanation": "Update fork with changes from upstream repository",
                "title": "git && git && git"
            }
        ],
        "relatedCommands": [],
        "warnings": [
            "Fetch doesn't modify working directory or current branch",
            "Prune can remove tracking branches you might still need",
            "Shallow fetches may cause issues with some Git operations"
        ],
        "manPageUrl": "https://git-scm.com/docs/git-fetch",
        "distroNotes": {}
    },
    {
        "name": "git-filter-branch",
        "standsFor": "Git Filter Branch",
        "description": "Rewrite repository history with powerful filtering capabilities",
        "examples": [
            "git filter-branch --tree-filter 'rm -f passwords.txt' HEAD  # Remove sensitive file from entire repository history",
            "git filter-branch --env-filter 'AUTHOR_NAME=\"New Name\"; AUTHOR_EMAIL=\"new@email.com\"' HEAD  # Update author information for all commits in history",
            "git filter-branch --subdirectory-filter mysubdir HEAD  # Create new repository containing only subdirectory history",
            "git filter-branch --index-filter 'git rm --cached --ignore-unmatch large-file.zip' HEAD  # Remove large file from index in all commits",
            "git filter-branch --msg-filter 'sed \"s/old-ticket/new-ticket/g\"' HEAD  # Replace text in all commit messages",
            "git filter-branch --prune-empty HEAD  # Remove commits that become empty after other filters",
            "echo 'Enterprise Repository Sanitization and Compliance' && git filter-branch --force --env-filter 'if [ \"$GIT_AUTHOR_EMAIL\" = \"deprecated@company.com\" ]; then GIT_AUTHOR_EMAIL=\"compliance@enterprise.com\"; GIT_AUTHOR_NAME=\"Enterprise Compliance\"; fi' --index-filter 'git rm --cached --ignore-unmatch secrets.txt passwords.log *.key *.pem' --msg-filter 'sed \"s/CONFIDENTIAL//g; s/internal-ticket-[0-9]*/PUBLIC-TICKET/g\"' --tag-name-filter cat --prune-empty -- --all && git for-each-ref --format=\"delete %(refname)\" refs/original | git update-ref --stdin && git reflog expire --expire=now --all && git gc --prune=now --aggressive && echo 'Enterprise git history sanitization: author compliance updates, credential removal, message sanitization, tag preservation, reference cleanup, and aggressive optimization for security audit and public repository preparation'  # Enterprise repository sanitization and compliance"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "development",
        "safety": "dangerous",
        "syntaxPattern": "git filter-branch [options] [rev-list options]",
        "prerequisites": [
            "caution",
            "backup-recommended"
        ],
        "commandCombinations": [
            {
                "scenario": "Complete sensitive data removal",
                "commands": "git filter-branch --force --index-filter 'git rm --cached --ignore-unmatch secrets/*' --prune-empty --tag-name-filter cat -- --all",
                "explanation": "Remove sensitive directory from all branches and tags",
                "title": "git"
            },
            {
                "scenario": "Clean repository after filter-branch",
                "commands": "git for-each-ref --format='delete %(refname)' refs/original | git update-ref --stdin && git reflog expire --expire=now --all && git gc --prune=now --aggressive",
                "explanation": "Clean up backup references and optimize repository after filtering",
                "title": "git | git && git && git"
            }
        ],
        "relatedCommands": [
            {
                "name": "git-rebase",
                "relationship": "alternative",
                "reason": "Interactive rebase for smaller history rewrites"
            }
        ],
        "warnings": [
            "Rewrites all commit hashes in filtered range",
            "Can take very long time on large repositories",
            "Makes repository incompatible with existing clones"
        ],
        "manPageUrl": "https://git-scm.com/docs/git-filter-branch",
        "distroNotes": {}
    },
    {
        "name": "git-flow-feature",
        "standsFor": "Git Flow Feature",
        "description": "Manage feature branches in Git Flow workflow",
        "examples": [
            "git flow feature start user-authentication  # Create and switch to new feature branch based on develop",
            "git flow feature finish user-authentication  # Merge feature back to develop and clean up feature branch",
            "git flow feature publish user-authentication  # Push feature branch to remote for collaboration",
            "git flow feature pull origin user-authentication  # Fetch and merge remote changes for feature branch",
            "git flow feature list  # Show all local and remote feature branches",
            "git flow feature delete user-authentication  # Remove local feature branch after completion",
            "echo 'Enterprise Git Flow Feature Management' && git flow init -d && git flow feature start enterprise-sso-$(date +%Y%m%d) && git add -A && git commit -m 'feat: implement enterprise SSO with SAML 2.0, LDAP integration, and multi-factor authentication for enhanced security compliance' && git flow feature publish enterprise-sso-$(date +%Y%m%d) && echo 'PR created: https://github.com/enterprise/platform/compare/develop...feature/enterprise-sso-'$(date +%Y%m%d) && git checkout develop && git pull origin develop && echo 'Enterprise Git Flow workflow: standardized branching model, feature branch creation with enterprise naming conventions, comprehensive commit messages, team collaboration through published branches, and integration with enterprise development lifecycle'  # Enterprise Git Flow feature development workflow"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "development",
        "safety": "dangerous",
        "syntaxPattern": "git flow feature <command> [options] [name]",
        "prerequisites": [
            "git-flow-extension"
        ],
        "commandCombinations": [
            {
                "scenario": "Complete feature workflow",
                "commands": "git flow feature start new-api && git add . && git commit -m 'Implement API' && git flow feature finish new-api",
                "explanation": "Start feature, make changes, and merge back to develop",
                "title": "git && git && git && git"
            },
            {
                "scenario": "Collaborative feature development",
                "commands": "git flow feature start shared-feature && git flow feature publish shared-feature",
                "explanation": "Start feature and immediately make it available for team collaboration",
                "title": "git && git"
            }
        ],
        "relatedCommands": [],
        "warnings": [
            "Feature finish may fail if develop branch has diverged",
            "Requires clean working directory for finish operation",
            "Published features need coordination with team"
        ],
        "manPageUrl": "",
        "distroNotes": {}
    },
    {
        "name": "git-flow-init",
        "standsFor": "Git Flow Initialize",
        "description": "Initialize Git Flow branching model in repository",
        "examples": [
            "git flow init -d  # Set up Git Flow with default branch naming conventions",
            "git flow init  # Configure Git Flow with custom branch prefixes interactively",
            "git flow init -f  # Reinitialize Git Flow configuration, overwriting existing setup",
            "echo 'Enterprise Git Flow Repository Initialization' && git flow init -d && echo 'Configured branches:' && git branch -a && echo 'Git Flow Configuration:' && cat .git/config | grep -A 10 'gitflow' && git config --local commit.template .gitmessage && echo 'feat: description\n\nDetailed explanation\n\nTicket: JIRA-XXX\nReviewed-by: Team Lead\nTested-by: QA Team' > .gitmessage && git add .gitmessage && git commit -m 'chore: configure enterprise Git Flow with commit templates and branch conventions' && echo 'Enterprise Git Flow setup: standardized branch prefixes, commit message templates, development workflow automation, and team collaboration standards for enterprise software development lifecycle'  # Enterprise Git Flow repository setup"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "development",
        "safety": "safe",
        "syntaxPattern": "git flow init [options]",
        "prerequisites": [
            "git-flow-extension"
        ],
        "commandCombinations": [
            {
                "scenario": "Complete project setup with Git Flow",
                "commands": "git init && git flow init -d && git add . && git commit -m 'Initial commit'",
                "explanation": "Initialize repository, set up Git Flow, and create initial commit",
                "title": "git && git && git && git"
            }
        ],
        "relatedCommands": [
            {
                "name": "git-flow-feature",
                "relationship": "combo",
                "reason": "Feature development workflow after initialization"
            }
        ],
        "warnings": [
            "Requires git-flow extension to be installed",
            "Creates specific branch structure that team must follow",
            "May conflict with existing branching strategies"
        ],
        "manPageUrl": "",
        "distroNotes": {}
    },
    {
        "name": "git-gc-maintenance",
        "standsFor": "Git Garbage Collection",
        "description": "Repository maintenance and garbage collection operations",
        "examples": [
            "git gc --aggressive  # Thorough cleanup and optimization of repository storage",
            "git gc --prune=now  # Remove all unreachable objects regardless of age",
            "git fsck --full  # Verify connectivity and validity of repository objects",
            "git reflog expire --expire=90.days.ago --all  # Remove reflog entries older than 90 days from all refs",
            "git count-objects -vH  # Show object count and disk usage in human-readable format",
            "git maintenance run --auto  # Run maintenance tasks if repository needs optimization",
            "echo 'Enterprise Git Repository Health and Maintenance' && git config maintenance.auto true && git config maintenance.strategy incremental && git maintenance start && echo 'Repository Statistics:' && git count-objects -vH && echo 'Storage Analysis:' && du -sh .git && echo 'Integrity Check:' && git fsck --full --strict && echo 'Recent Activity:' && git log --oneline -10 && echo 'Branch Status:' && git branch -vv && echo 'Maintenance Schedule:' && git config --get-regexp maintenance && echo 'Enterprise repository maintenance: automated garbage collection, incremental optimization, background maintenance scheduling, comprehensive integrity verification, and storage efficiency monitoring for production repository health and performance'  # Enterprise Git repository health monitoring and maintenance"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "development",
        "safety": "safe",
        "syntaxPattern": "git gc [options]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Complete repository cleanup",
                "commands": "git reflog expire --expire=30.days.ago --all && git gc --aggressive --prune=now",
                "explanation": "Clean reflog and run aggressive garbage collection",
                "title": "git && git"
            },
            {
                "scenario": "Repository health check",
                "commands": "git fsck --full && git count-objects -vH",
                "explanation": "Check integrity and show storage statistics",
                "title": "git && git"
            }
        ],
        "relatedCommands": [],
        "warnings": [
            "Aggressive GC can take very long time on large repositories",
            "Pruning immediately may lose objects still in use",
            "Some GUI tools may interfere with GC operations"
        ],
        "manPageUrl": "https://git-scm.com/docs/git-gc",
        "distroNotes": {}
    },
    {
        "name": "git-lfs-management",
        "standsFor": "Git Large File Storage",
        "description": "Git Large File Storage for handling large binary files",
        "examples": [
            "git lfs install  # Set up Git LFS hooks and configuration for repository",
            "git lfs track '*.psd' '*.zip' '*.mp4'  # Configure LFS to handle specific file types",
            "git lfs track --lockable '*.blend'  # Track files that should be locked during editing",
            "git lfs track  # List all patterns currently tracked by LFS",
            "git lfs pull origin main  # Download LFS files for specific branch",
            "git lfs ls-files --size  # List LFS files in repository with sizes",
            "echo 'Enterprise Git LFS Asset Management and Optimization' && git lfs install && git lfs track '*.psd' '*.ai' '*.sketch' '*.mp4' '*.mov' '*.zip' '*.tar.gz' '*.deb' '*.rpm' '*.dmg' '*.exe' && git add .gitattributes && git commit -m 'feat: configure Git LFS for enterprise binary assets and media files' && echo 'LFS Storage Analysis:' && git lfs ls-files --size | sort -hr | head -20 && echo 'LFS Bandwidth Usage:' && git lfs env && echo 'Storage Quota Status:' && git lfs status && echo 'Enterprise LFS management: comprehensive binary asset tracking, storage optimization, bandwidth monitoring, quota management, and media workflow integration for enterprise digital asset management'  # Enterprise Git LFS asset management"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "development",
        "safety": "safe",
        "syntaxPattern": "git lfs [command] [options]",
        "prerequisites": [
            "git-lfs-extension"
        ],
        "commandCombinations": [
            {
                "scenario": "Set up new repository with LFS",
                "commands": "git init && git lfs install && git lfs track '*.zip' '*.tar.gz' && git add .gitattributes && git commit -m 'Add LFS tracking'",
                "explanation": "Initialize repository with LFS and track common archive types",
                "title": "git && git && git && git && git"
            },
            {
                "scenario": "Migrate existing large files to LFS",
                "commands": "git lfs migrate import --include='*.mp4,*.mov' --everything",
                "explanation": "Convert existing large files to LFS across all branches",
                "title": "git"
            }
        ],
        "relatedCommands": [],
        "warnings": [
            "Requires LFS server support from Git host",
            "Large files count against LFS storage quotas",
            "Cloning doesn't download LFS files by default"
        ],
        "manPageUrl": "",
        "distroNotes": {}
    },
    {
        "name": "git-log",
        "standsFor": "Git log",
        "description": "Advanced Git commit history viewing and filtering",
        "examples": [
            "git log --oneline --graph --all  # Show compact commit history with branch visualization",
            "git log --author='John Doe' --since='2 weeks ago'  # Filter commits by specific author in last 2 weeks",
            "git log --follow -p -- filename.js  # Show commits that changed file, including renames",
            "git log --grep='fix bug' --oneline  # Find commits with 'fix bug' in commit message",
            "git log --stat --since='1 month ago'  # Display commits with file change statistics for last month",
            "git log --pretty=format:'%h - %an, %ar : %s'  # Custom format showing hash, author, relative date, subject",
            "echo 'Enterprise Git Repository Analytics and Reporting' && echo 'Development Activity Report:' && git log --since='3 months ago' --pretty=format:'%ai,%an,%s' | head -50 | awk -F, '{print $1 \",\" $2 \",\" $3}' > dev-activity-$(date +%Y%m%d).csv && echo 'Contributor Statistics:' && git shortlog -sn --since='6 months ago' | head -10 && echo 'Code Frequency:' && git log --since='1 month ago' --stat --pretty=format:'' | grep -E '^[[:space:]]*[0-9]+' | awk '{add+=$1; del+=$3} END {print \"Lines added: \" add \"\nLines deleted: \" del \"\nNet change: \" add-del}' && echo 'Recent Release Tags:' && git tag -l --sort=-version:refname | head -5 && echo 'Enterprise repository analytics: development activity tracking, contributor metrics, code frequency analysis, release history, and comprehensive reporting for project management and stakeholder communication'  # Enterprise Git repository analytics and reporting"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "development",
        "safety": "dangerous",
        "syntaxPattern": "git log [options] [revision-range] [path]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Generate release notes",
                "commands": "git log --oneline --no-merges v1.0..HEAD > release-notes.txt",
                "explanation": "Extract commits between version tags for release notes",
                "title": "git > release"
            },
            {
                "scenario": "Find when bug was introduced",
                "commands": "git log -S 'buggy_function' --oneline",
                "explanation": "Search for commits that added or removed specific code",
                "title": "git"
            }
        ],
        "relatedCommands": [],
        "warnings": [
            "Large repositories can have slow log operations",
            "--follow only works with single file path",
            "Custom format strings can be complex to remember"
        ],
        "manPageUrl": "https://git-scm.com/docs/git-log",
        "distroNotes": {}
    },
    {
        "name": "git-log-advanced",
        "standsFor": "Git Advanced Logging",
        "description": "Advanced logging and history inspection with custom formats",
        "examples": [
            "git log --pretty=format:'%C(yellow)%h%C(reset) - %C(bold blue)%an%C(reset), %C(green)%cr%C(reset) : %s'  # Colorized log with hash, author, relative date, and subject",
            "git log --since='2024-01-01' --until='2024-12-31' --oneline  # Filter commits within specific date range",
            "git log --stat --patch --since='1 week ago'  # Show file changes and actual diffs for last week",
            "git log -S 'function_name' --oneline --all  # Search for commits that added or removed specific code",
            "git log --oneline --graph --no-merges main..feature  # Show feature branch commits excluding merge commits",
            "git log --pretty=format:'- %s (%an)' --no-merges v1.0..HEAD  # Create changelog between version tag and current state",
            "echo 'Enterprise Release Management and Changelog Generation' && latest_tag=$(git describe --tags --abbrev=0) && echo \"Generating changelog since $latest_tag\" && echo \"# Release Changelog v$(date +%Y.%m.%d)\" > CHANGELOG-$(date +%Y%m%d).md && echo \"\n## New Features\" >> CHANGELOG-$(date +%Y%m%d).md && git log $latest_tag..HEAD --grep='^feat' --pretty=format:'- %s (%an)' --no-merges >> CHANGELOG-$(date +%Y%m%d).md && echo \"\n## Bug Fixes\" >> CHANGELOG-$(date +%Y%m%d).md && git log $latest_tag..HEAD --grep='^fix' --pretty=format:'- %s (%an)' --no-merges >> CHANGELOG-$(date +%Y%m%d).md && echo \"\n## Security Updates\" >> CHANGELOG-$(date +%Y%m%d).md && git log $latest_tag..HEAD --grep='^security' --pretty=format:'- %s (%an)' --no-merges >> CHANGELOG-$(date +%Y%m%d).md && echo \"\n## Performance Improvements\" >> CHANGELOG-$(date +%Y%m%d).md && git log $latest_tag..HEAD --grep='^perf' --pretty=format:'- %s (%an)' --no-merges >> CHANGELOG-$(date +%Y%m%d).md && cat CHANGELOG-$(date +%Y%m%d).md && echo 'Enterprise changelog generation: automated release notes, categorized changes by type, contributor attribution, security update tracking, and comprehensive documentation for stakeholder communication and compliance audit trails'  # Enterprise automated changelog and release documentation"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "development",
        "safety": "dangerous",
        "syntaxPattern": "git log [options] [revision-range] [path]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Release notes generation",
                "commands": "git tag -l | tail -2 | head -1 | xargs -I {} git log --oneline --no-merges {}..HEAD",
                "explanation": "Generate commits list since last tag for release notes",
                "title": "git | tail | head | xargs"
            },
            {
                "scenario": "Find bug introduction with bisect prep",
                "commands": "git log --oneline --grep='bug\\|fix\\|error' --since='3 months ago'",
                "explanation": "Find recent commits mentioning bugs to start bisect investigation",
                "title": "git | fix | error"
            }
        ],
        "relatedCommands": [],
        "warnings": [
            "Complex format strings can be hard to remember",
            "Performance impact on large repositories",
            "Color codes may not work in all terminals"
        ],
        "manPageUrl": "https://git-scm.com/docs/git-log",
        "distroNotes": {}
    },
    {
        "name": "git-merge-strategies",
        "standsFor": "Git Merge Strategies",
        "description": "Advanced merge strategies and conflict resolution techniques",
        "examples": [
            "git merge -s recursive -X ours feature-branch  # Merge preferring current branch changes in conflicts",
            "git merge --no-ff feature-branch  # Create merge commit even if fast-forward is possible",
            "git merge --squash feature-branch  # Combine all feature branch commits into single commit",
            "git merge -s octopus branch1 branch2 branch3  # Merge multiple branches simultaneously",
            "git merge --abort  # Cancel merge and return to pre-merge state",
            "git merge --continue  # Complete merge after manually resolving conflicts",
            "git merge -X ignore-space-change feature-branch  # Ignore whitespace changes during merge",
            "echo 'Enterprise Git Merge Strategy and Integration Management' && git checkout develop && git pull origin develop && echo 'Pre-merge Validation:' && git log develop..feature-enterprise-auth --oneline && npm run test && npm run lint && npm run security-scan && echo 'Integration Tests:' && docker-compose -f docker-compose.test.yml up --build --abort-on-container-exit && git merge --no-ff feature-enterprise-auth -m 'feat: integrate enterprise authentication with comprehensive testing and validation' && git tag integration-$(date +%Y%m%d-%H%M%S) && git push origin develop && git push origin integration-$(date +%Y%m%d-%H%M%S) && echo 'Enterprise merge workflow: pre-integration validation, comprehensive testing, security scanning, containerized integration tests, semantic merge messages, integration tagging, and automated deployment triggers for enterprise software delivery pipeline'  # Enterprise merge and integration workflow"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "development",
        "safety": "safe",
        "syntaxPattern": "git merge [options] <commit>",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Safe merge with verification",
                "commands": "git checkout main && git merge --verify-signatures --no-ff feature && git push origin main",
                "explanation": "Verify signatures, merge with commit, and push to remote",
                "title": "git && git && git"
            },
            {
                "scenario": "Merge with conflict resolution tools",
                "commands": "git merge feature && git mergetool && git commit",
                "explanation": "Start merge, use merge tool for conflicts, then commit",
                "title": "git && git && git"
            }
        ],
        "relatedCommands": [
            {
                "name": "git-rebase",
                "relationship": "alternative",
                "reason": "Different integration strategy maintaining linear history"
            },
            {
                "name": "git-cherry-pick",
                "relationship": "alternative",
                "reason": "Apply specific commits instead of entire branch"
            }
        ],
        "warnings": [
            "Octopus merge fails if there are conflicts",
            "Squash merge loses individual commit history",
            "Merge commits can make history harder to follow"
        ],
        "manPageUrl": "https://git-scm.com/docs/git-merge",
        "distroNotes": {}
    },
    {
        "name": "git-pull-strategies",
        "standsFor": "Git Pull Strategies",
        "description": "Advanced pulling strategies with merge and rebase options",
        "examples": [
            "git pull --rebase origin main  # Fetch and rebase local commits on top of remote changes",
            "git pull --ff-only origin main  # Only pull if it can be fast-forwarded, fail otherwise",
            "git pull --autostash origin main  # Automatically stash local changes, pull, then unstash",
            "git pull -s recursive -X theirs origin main  # Pull using recursive strategy preferring remote changes",
            "git pull --verify-signatures origin main  # Pull and verify GPG signatures on commits",
            "git pull --no-edit origin main  # Pull without opening editor for merge commit message",
            "git pull --depth=1 origin main  # Shallow pull with only latest commit",
            "echo 'Enterprise Git Pull Strategy and Dependency Management' && git config pull.rebase true && git config merge.tool vimdiff && git stash push -u -m 'Backup before enterprise pull' && git fetch --all --prune && git pull --rebase --autostash origin main && git submodule update --remote --recursive && npm install && npm run build && npm test && echo 'Pull Validation:' && git log --oneline -5 && git status --porcelain && echo 'Enterprise pull workflow: rebase-first strategy, comprehensive dependency updates, automated stashing, submodule synchronization, build validation, test execution, and integration verification for enterprise development environments'  # Enterprise pull and integration validation"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "development",
        "safety": "safe",
        "syntaxPattern": "git pull [options] [remote] [branch]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Safe pull with backup",
                "commands": "git branch backup-$(date +%Y%m%d-%H%M%S) && git pull --rebase origin main",
                "explanation": "Create backup branch before pulling with rebase",
                "title": "git && git"
            },
            {
                "scenario": "Pull and update submodules",
                "commands": "git pull origin main && git submodule update --remote --recursive",
                "explanation": "Update main repository and all submodules",
                "title": "git && git"
            }
        ],
        "relatedCommands": [],
        "warnings": [
            "Pull can create unwanted merge commits in history",
            "Rebase pull can fail if there are uncommitted changes",
            "Fast-forward only pull fails if branches have diverged"
        ],
        "manPageUrl": "https://git-scm.com/docs/git-pull",
        "distroNotes": {}
    },
    {
        "name": "git-push-strategies",
        "standsFor": "Git Push Strategies",
        "description": "Advanced push strategies and force push safety",
        "examples": [
            "git push --force-with-lease origin feature-branch  # Force push only if remote hasn't been updated by others",
            "git push -u origin new-feature  # Push branch and configure it to track remote branch",
            "git push --all origin  # Push all local branches to remote repository",
            "git push --follow-tags origin main  # Push commits and any annotated tags reachable from them",
            "git push origin --delete feature-branch  # Remove branch from remote repository",
            "git push origin local-branch:remote-branch  # Push local branch to remote with different name",
            "git push --dry-run origin main  # Preview what would be pushed without actually pushing",
            "echo 'Enterprise Git Push Strategy and Deployment Automation' && git config --local push.autoSetupRemote true && git config --local push.followTags true && echo 'Pre-push Validation:' && npm run lint && npm run test && npm run security-audit && git diff --check && echo 'Branch Protection Check:' && git ls-remote --heads origin | grep -E '(main|master|release)' && git push --force-with-lease --dry-run origin feature-enterprise-$(date +%Y%m%d) && git push --force-with-lease origin feature-enterprise-$(date +%Y%m%d) && echo 'Deployment Pipeline Triggered:' && curl -X POST -H 'Authorization: Bearer $GITHUB_TOKEN' -d '{\"event_type\": \"deploy\", \"client_payload\": {\"branch\": \"feature-enterprise-'$(date +%Y%m%d)'\"}}' https://api.github.com/repos/enterprise/platform/dispatches && echo 'Enterprise push workflow: automated quality gates, security validation, branch protection compliance, safe force-push strategies, deployment pipeline integration, and comprehensive CI/CD triggering for enterprise software delivery'  # Enterprise push and deployment automation"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "development",
        "safety": "dangerous",
        "syntaxPattern": "git push [options] [remote] [refspec]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Safe rebase and push workflow",
                "commands": "git fetch origin main && git rebase origin/main && git push --force-with-lease origin feature",
                "explanation": "Update with latest main, rebase, and safely force push",
                "title": "git && git && git"
            },
            {
                "scenario": "Release with tags",
                "commands": "git tag v1.0.0 && git push origin main && git push origin v1.0.0",
                "explanation": "Create release tag and push both branch and tag",
                "title": "git && git && git"
            }
        ],
        "relatedCommands": [],
        "warnings": [
            "Force push can overwrite others' work",
            "Force-with-lease can still fail in collaborative environments",
            "Pushing to wrong branch can cause deployment issues"
        ],
        "manPageUrl": "https://git-scm.com/docs/git-push",
        "distroNotes": {}
    },
    {
        "name": "git-rebase",
        "standsFor": "Git rebase",
        "description": "Reapply commits on top of another base tip",
        "examples": [
            "git rebase main  # Move current branch commits on top of latest main",
            "git rebase -i HEAD~3  # Interactively edit last 3 commits (squash, reword, etc.)",
            "git rebase --continue  # Continue rebase after resolving merge conflicts",
            "git rebase --abort  # Stop rebase and return to original branch state",
            "git rebase --onto main feature~3 feature  # Move last 3 commits of feature branch onto main",
            "git rebase --skip  # Skip current commit during rebase (use carefully)",
            "git rebase --exec 'make test' HEAD~5  # Run command after each rebased commit",
            "echo 'Enterprise Git Rebase and History Optimization' && git rebase -i --autosquash --exec 'npm run lint && npm run test && npm run security-check' HEAD~10 && git log --oneline --graph -20 && echo 'Commit Quality Metrics:' && git log --pretty=format:'%h %s' --since='1 week ago' | wc -l && git log --pretty=format:'%an' --since='1 week ago' | sort | uniq -c | sort -nr && echo 'Branch Comparison:' && git diff --stat main...HEAD && echo 'Enterprise rebase workflow: interactive history optimization, automated quality gates at each commit, comprehensive testing validation, security verification, commit metrics analysis, and branch comparison for enterprise code quality assurance and development excellence'  # Enterprise rebase with comprehensive quality validation"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "development",
        "safety": "safe",
        "syntaxPattern": "git rebase [options] <upstream> [branch]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Clean up feature branch before merge",
                "commands": "git checkout feature-branch && git rebase -i main && git checkout main && git merge feature-branch",
                "explanation": "Interactive rebase then fast-forward merge for clean history",
                "title": "git && git && git && git"
            },
            {
                "scenario": "Update feature branch with latest main",
                "commands": "git checkout main && git pull && git checkout feature && git rebase main",
                "explanation": "Update main then rebase feature branch on latest changes",
                "title": "git && git && git && git"
            }
        ],
        "relatedCommands": [
            {
                "name": "git-cherry-pick",
                "relationship": "similar",
                "reason": "Apply specific commits to different branch"
            }
        ],
        "warnings": [
            "Never rebase public/shared branches",
            "Can create conflicts that need manual resolution",
            "Changes commit hashes, breaking references"
        ],
        "manPageUrl": "https://git-scm.com/docs/git-rebase",
        "distroNotes": {}
    },
    {
        "name": "git-rebase-interactive",
        "standsFor": "Git Interactive Rebase",
        "description": "Interactively rewrite commit history with advanced options",
        "examples": [
            "git rebase -i HEAD~4  # Combine last 4 commits into single commit for cleaner history",
            "git rebase -i HEAD~5  # Change the order of last 5 commits interactively",
            "git rebase -i HEAD~3  # Modify commit messages for last 3 commits",
            "git rebase -i HEAD~6  # Remove specific commits from history",
            "git rebase -i HEAD~2  # Break one commit into multiple smaller commits",
            "git rebase -i --autosquash HEAD~10  # Automatically arrange squash and fixup commits",
            "git rebase -i --root  # Interactively rebase from the very first commit"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "development",
        "safety": "safe",
        "syntaxPattern": "git rebase -i [options] <upstream>",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Clean up feature branch before merge",
                "commands": "git checkout feature && git rebase -i develop && git checkout develop && git merge --no-ff feature",
                "explanation": "Clean history on feature branch then merge with merge commit",
                "title": "git && git && git && git"
            },
            {
                "scenario": "Prepare commits for code review",
                "commands": "git rebase -i HEAD~8 && git push --force-with-lease origin feature",
                "explanation": "Clean up commits then force push safely to remote",
                "title": "git && git"
            }
        ],
        "relatedCommands": [],
        "warnings": [
            "Never rebase commits that have been pushed to shared branches",
            "Can create conflicts requiring manual resolution",
            "Force push may be needed after rebase"
        ],
        "manPageUrl": "https://git-scm.com/docs/git-rebase",
        "distroNotes": {}
    },
    {
        "name": "git-reflog-recovery",
        "standsFor": "Git Reference Log Recovery",
        "description": "Advanced reflog operations for commit recovery and history tracking",
        "examples": [
            "git reflog --all --graph --date=relative  # Display all reference changes with graph and relative dates",
            "git reflog show --all | grep 'lost-feature'  # Search reflog for commits mentioning specific feature",
            "git branch recovered-branch HEAD@{5}  # Create new branch pointing to commit from reflog entry",
            "git reflog show feature-branch --date=iso  # Display reflog history for specific branch with ISO dates",
            "git reflog expire --expire=30.days.ago --all  # Remove reflog entries older than 30 days from all references",
            "git reset --hard HEAD@{2}  # Reset to commit from 2 moves ago in reflog",
            "git log --walk-reflogs --oneline  # Show reflog as a commit log",
            "echo 'Enterprise Git Repository Recovery and Forensics' && git reflog show --all --date=iso | head -50 && echo 'Recovery Analysis:' && git fsck --unreachable --dangling && echo 'Lost Commits Detection:' && git log --all --full-history --pretty=format:'%H %ai %an %s' | grep -E '(fix|hotfix|urgent|critical)' | head -20 && echo 'Branch Recovery Options:' && git branch -a --contains HEAD@{10} && git stash list && echo 'Repository Integrity:' && git gc --prune=now && git count-objects -v && echo 'Enterprise repository forensics: comprehensive reflog analysis, unreachable object detection, critical commit recovery, branch genealogy tracking, stash inventory, and repository integrity validation for enterprise disaster recovery and audit compliance'  # Enterprise Git repository forensics and recovery"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "development",
        "safety": "safe",
        "syntaxPattern": "git reflog [command] [options] [ref]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Complete disaster recovery",
                "commands": "git reflog --all --oneline && git branch backup-recovery HEAD@{10} && git reset --hard backup-recovery",
                "explanation": "Find lost work, create backup branch, and restore state",
                "title": "git && git && git"
            },
            {
                "scenario": "Find and cherry-pick lost commits",
                "commands": "git reflog --oneline | head -20 && git cherry-pick abc1234",
                "explanation": "Browse recent reflog and recover specific commits",
                "title": "git | head && git"
            }
        ],
        "relatedCommands": [
            {
                "name": "git-log",
                "relationship": "alternative",
                "reason": "Log shows commit history, reflog shows reference history"
            }
        ],
        "warnings": [
            "Reflog is local only and not shared with remotes",
            "Reflog entries expire after configured period",
            "GC operations can remove unreachable reflog entries"
        ],
        "manPageUrl": "https://git-scm.com/docs/git-reflog",
        "distroNotes": {}
    },
    {
        "name": "git-remote-management",
        "standsFor": "Git Remote Management",
        "description": "Advanced remote repository management and configuration",
        "examples": [
            "git remote add upstream https://github.com/original/repo.git  # Add original repository as upstream for fork synchronization",
            "git remote set-url origin git@github.com:user/repo.git  # Switch from HTTPS to SSH for remote authentication",
            "git remote set-url --push origin https://deploy-url.com/repo.git  # Use different URL for pushes while keeping same fetch URL",
            "git remote show origin  # Display detailed information about remote configuration",
            "git remote prune origin  # Remove local tracking branches for deleted remote branches",
            "git remote rename origin upstream  # Change remote name from origin to upstream",
            "git remote get-url origin  # Display the fetch URL for origin remote",
            "echo 'Enterprise Git Remote Management and Multi-Repository Orchestration' && git remote -v && echo 'Remote Configuration Validation:' && git config --get-regexp '^remote\\.' && git remote show origin && echo 'SSH Key Validation:' && ssh -T git@github.com && echo 'Repository Synchronization:' && git fetch --all --prune --tags && git remote update --prune && echo 'Multi-Remote Setup:' && git remote add upstream https://github.com/enterprise-org/upstream-platform.git && git remote set-url --push upstream no-push && echo 'Access Control Verification:' && git ls-remote origin | head -10 && echo 'Enterprise remote management: comprehensive remote validation, SSH authentication verification, multi-repository synchronization, upstream tracking configuration, access control verification, and enterprise Git workflow orchestration for distributed development teams'  # Enterprise Git remote and multi-repository management"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "development",
        "safety": "safe",
        "syntaxPattern": "git remote [command] [options] [name] [url]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Set up fork with upstream",
                "commands": "git clone https://github.com/user/fork.git && cd fork && git remote add upstream https://github.com/original/repo.git && git fetch upstream",
                "explanation": "Clone fork and set up upstream remote for synchronization",
                "title": "git && cd && git && git"
            },
            {
                "scenario": "Switch to SSH and verify",
                "commands": "git remote set-url origin git@github.com:user/repo.git && git remote -v && ssh -T git@github.com",
                "explanation": "Change to SSH URL, verify change, and test SSH connection",
                "title": "git && git && ssh"
            }
        ],
        "relatedCommands": [],
        "warnings": [
            "Changing remote URL affects all team members",
            "Multiple remotes can cause confusion about push destination",
            "SSH keys need to be configured for SSH URLs"
        ],
        "manPageUrl": "https://git-scm.com/docs/git-remote",
        "distroNotes": {}
    },
    {
        "name": "git-sparse-checkout",
        "standsFor": "Git Sparse Checkout",
        "description": "Selectively checkout parts of large repositories",
        "examples": [
            "git sparse-checkout init --cone  # Enable sparse checkout with cone mode for better performance",
            "git sparse-checkout set src/frontend src/shared  # Checkout only specified directories from repository",
            "git sparse-checkout add docs/api  # Include additional directory in sparse checkout",
            "git sparse-checkout list  # Show currently configured sparse checkout patterns",
            "git sparse-checkout disable  # Return to full working tree checkout",
            "git sparse-checkout reapply  # Update working tree to match current sparse patterns",
            "git clone --filter=blob:none --sparse-checkout=src/ repo.git  # Clone with immediate sparse checkout",
            "echo 'Enterprise Large Repository Management and Optimization' && git config core.preloadindex true && git config core.fscache true && git config gc.auto 256 && git clone --filter=blob:limit=10m --sparse https://github.com/enterprise/platform.git && cd platform && git sparse-checkout init --cone && git sparse-checkout set backend/services frontend/admin && git lfs install && git lfs track '*.zip' '*.tar.gz' '*.mp4' && echo 'Repository Metrics:' && du -sh .git && git count-objects -vH && echo 'Sparse Checkout Status:' && git sparse-checkout list && echo 'LFS Status:' && git lfs ls-files | wc -l && echo 'Enterprise large repository optimization: partial clone strategies, blob size filtering, sparse checkout configuration, LFS integration, performance tuning, and selective synchronization for enterprise monorepo and large-scale development environments'  # Enterprise large repository optimization and management"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "development",
        "safety": "safe",
        "syntaxPattern": "git sparse-checkout [command] [options]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Clone with immediate sparse checkout",
                "commands": "git clone --filter=blob:none https://github.com/user/large-repo.git && cd large-repo && git sparse-checkout init --cone && git sparse-checkout set frontend/",
                "explanation": "Clone without downloading all files, then set up sparse checkout",
                "title": "git && cd && git && git"
            },
            {
                "scenario": "Switch sparse checkout focus",
                "commands": "git sparse-checkout set backend/ && git checkout feature-backend",
                "explanation": "Change sparse patterns and switch to relevant branch",
                "title": "git && git"
            }
        ],
        "relatedCommands": [],
        "warnings": [
            "Files outside sparse patterns are not visible in working tree",
            "Some Git operations may behave unexpectedly",
            "IDE tools may not understand sparse checkout"
        ],
        "manPageUrl": "https://git-scm.com/docs/git-sparse-checkout",
        "distroNotes": {}
    },
    {
        "name": "git-stash",
        "standsFor": "Git stash",
        "description": "Temporarily save uncommitted changes",
        "examples": [
            "git stash  # Stash uncommitted changes to work on something else",
            "git stash push -m 'work in progress on login feature'  # Save changes with custom description for easy identification",
            "git stash list  # Show all saved stashes with their descriptions",
            "git stash pop  # Restore most recent stash and remove it from stash list",
            "git stash apply stash@{1}  # Restore specific stash without removing from list",
            "git stash push --keep-index  # Stash changes but keep staged files in index",
            "git stash push -u  # Stash both tracked and untracked files",
            "git stash drop stash@{2}  # Delete specific stash without applying it",
            "echo 'Enterprise Git Stash Management and Work-in-Progress Orchestration' && git stash push -u -m 'WIP: enterprise SSO integration - $(date +\"%Y-%m-%d %H:%M:%S\")' && git stash push -p -m 'Selective changes for hotfix branch' && echo 'Stash Inventory:' && git stash list --format='%gd: %gs (%cr) <%an>' && echo 'Stash Contents Analysis:' && for i in {0..2}; do echo \"Stash @{$i}:\"; git stash show -p stash@{$i} | head -20; done && git checkout -b feature-from-stash && git stash pop && echo 'Branch Integration:' && git add -A && git commit -m 'feat: restore enterprise SSO work from stash with comprehensive testing framework' && echo 'Enterprise stash workflow: timestamped work-in-progress management, selective change stashing, comprehensive stash analysis, branch-based restoration, and integrated development workflow for enterprise multi-feature development environments'  # Enterprise Git stash and work-in-progress management"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "development",
        "safety": "safe",
        "syntaxPattern": "git stash [push|pop|apply|list|drop] [options]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Quick branch switch with work in progress",
                "commands": "git stash && git checkout main && git pull && git checkout - && git stash pop",
                "explanation": "Stash changes, update main branch, return and restore changes",
                "title": "git && git && git && git && git"
            },
            {
                "scenario": "Clean up old stashes",
                "commands": "git stash list && git stash clear",
                "explanation": "Review stashes then remove all of them",
                "title": "git && git"
            }
        ],
        "relatedCommands": [],
        "warnings": [
            "Stashes are local only, not shared with remote",
            "Merge conflicts can occur when applying stash",
            "Stashes can become stale if not applied regularly"
        ],
        "manPageUrl": "https://git-scm.com/docs/git-stash",
        "distroNotes": {}
    },
    {
        "name": "git-stash-advanced",
        "standsFor": "Git Advanced Stash",
        "description": "Advanced stash operations and selective staging",
        "examples": [
            "git stash push -m 'WIP: login' -- src/auth.js src/login.js  # Stash only specific files with descriptive message",
            "git stash push -u -m 'Include new files'  # Include untracked files in stash operation",
            "git stash push -p -m 'Partial changes'  # Interactively choose hunks to stash",
            "git stash push --keep-index -m 'Keep staged'  # Stash working tree but leave staged changes intact",
            "git stash branch new-feature stash@{0}  # Create new branch from stash content and apply stash",
            "git stash show -p stash@{1}  # Display stash content as patch format",
            "git stash create 'Emergency backup'  # Create stash commit but don't add to stash stack",
            "echo 'Enterprise Git Advanced Stash Operations and Disaster Recovery' && stash_commit=$(git stash create 'Emergency backup before production hotfix - '$(date +\"%Y-%m-%d %H:%M:%S\"')) && echo \"Emergency stash commit: $stash_commit\" && git tag emergency-backup-$(date +%Y%m%d-%H%M%S) $stash_commit && git stash push --include-untracked -m 'Production hotfix preparation with full context' && echo 'Disaster Recovery Points:' && git tag -l 'emergency-backup-*' | tail -5 && echo 'Stash Forensics:' && git log --walk-reflogs refs/stash --oneline | head -10 && git stash branch emergency-recovery stash@{0} && echo 'Recovery Validation:' && git status && git log --oneline -3 && echo 'Enterprise advanced stash operations: emergency backup creation, disaster recovery tagging, production hotfix preparation, stash forensics analysis, branch-based recovery, and comprehensive backup strategies for enterprise critical operations and business continuity'  # Enterprise Git advanced stash and disaster recovery"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "development",
        "safety": "safe",
        "syntaxPattern": "git stash [command] [options]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Backup current work before risky operation",
                "commands": "git stash push -u -m 'Backup before rebase' && git rebase main && git stash pop",
                "explanation": "Safely stash all changes, rebase, then restore work",
                "title": "git && git && git"
            },
            {
                "scenario": "Transfer work between branches",
                "commands": "git stash push -m 'Move to feature branch' && git checkout feature && git stash pop",
                "explanation": "Move uncommitted work from one branch to another",
                "title": "git && git && git"
            }
        ],
        "relatedCommands": [],
        "warnings": [
            "Stashes are local only and not shared with remotes",
            "Merge conflicts can occur when applying stash",
            "Stashes can become stale if branch diverges significantly"
        ],
        "manPageUrl": "https://git-scm.com/docs/git-stash",
        "distroNotes": {}
    },
    {
        "name": "git-submodule-advanced",
        "standsFor": "Git Advanced Submodule",
        "description": "Advanced submodule operations and dependency management",
        "examples": [
            "git submodule add -b develop https://github.com/user/repo.git libs/external  # Add submodule tracking specific branch instead of default",
            "git submodule update --remote --recursive  # Pull latest changes from all submodules' remote repositories",
            "git submodule update --init --recursive --remote  # Clone, initialize, and update all submodules including nested ones",
            "git submodule foreach 'git checkout main && git pull'  # Execute git commands in each submodule directory",
            "git submodule status --recursive  # Display current commit and status for all submodules",
            "git submodule deinit libs/external && git rm libs/external  # Unregister submodule and remove from working tree",
            "echo 'Enterprise Git Submodule Lifecycle and Dependency Management' && git submodule add -b main https://github.com/enterprise/shared-components.git shared/components && git submodule add -b stable https://github.com/enterprise/common-utils.git libs/utils && git submodule update --init --recursive --remote && echo 'Submodule Status Dashboard:' && git submodule status --recursive && echo 'Dependency Security Audit:' && git submodule foreach 'git log --oneline -5 && npm audit --audit-level high' && echo 'Version Pinning:' && git submodule foreach 'git checkout $(git describe --tags --abbrev=0)' && git add . && git commit -m 'deps: pin enterprise submodules to latest stable versions with security validation' && echo 'Automated Updates Setup:' && echo '.github/workflows/submodule-update.yml configured for weekly automated updates' && echo 'Enterprise submodule management: centralized component libraries, version pinning strategies, security audit integration, automated dependency updates, and enterprise-grade dependency lifecycle management for distributed development teams'  # Enterprise Git submodule and dependency lifecycle management"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "development",
        "safety": "dangerous",
        "syntaxPattern": "git submodule [command] [options] [path]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Clone repository with all submodules",
                "commands": "git clone --recurse-submodules https://github.com/user/project.git && cd project && git submodule update --remote",
                "explanation": "Clone project and all submodules, then update to latest",
                "title": "git && cd && git"
            },
            {
                "scenario": "Sync submodule URLs after changes",
                "commands": "git submodule sync --recursive && git submodule update --init --recursive",
                "explanation": "Update URLs from .gitmodules and re-initialize submodules",
                "title": "git && git"
            }
        ],
        "relatedCommands": [],
        "warnings": [
            "Submodules point to specific commits, not branches",
            "Updates need to be committed in parent repository",
            "Complex workflow can confuse team members"
        ],
        "manPageUrl": "https://git-scm.com/docs/git-submodule",
        "distroNotes": {}
    },
    {
        "name": "git-subtree-operations",
        "standsFor": "Git Subtree Operations",
        "description": "Subtree operations for embedding and splitting repositories",
        "examples": [
            "git subtree add --prefix=vendor/library https://github.com/user/library.git main --squash  # Add external repository as subtree with squashed history",
            "git subtree pull --prefix=vendor/library https://github.com/user/library.git main --squash  # Update subtree with latest changes from remote repository",
            "git subtree push --prefix=vendor/library origin library-improvements  # Push local subtree changes back to remote repository",
            "git subtree split --prefix=vendor/library -b library-only  # Extract subtree history into new branch",
            "git subtree add --prefix=shared/common ../common-lib main  # Add local repository as subtree",
            "git subtree merge --prefix=vendor/library library-updates --strategy=subtree  # Merge external changes into subtree with specific strategy",
            "echo 'Enterprise Git Subtree Operations and Code Integration Management' && git subtree add --prefix=shared/enterprise-ui https://github.com/enterprise/ui-library.git main --squash && git subtree add --prefix=vendor/security-tools https://github.com/enterprise/security-toolkit.git release --squash && echo 'Subtree Integration Validation:' && git log --oneline --grep='Subtree' -10 && echo 'Bidirectional Sync:' && git subtree pull --prefix=shared/enterprise-ui origin main --squash && git subtree push --prefix=shared/enterprise-ui origin feature/enterprise-enhancements && echo 'Integration Testing:' && npm run test -- --testPathPattern='shared/enterprise-ui' && npm run lint shared/enterprise-ui && echo 'Security Validation:' && npm audit --audit-level high && echo 'Enterprise subtree workflow: centralized library integration, bidirectional synchronization, comprehensive testing validation, security audit integration, and enterprise code sharing strategies for distributed component architecture'  # Enterprise Git subtree integration and management"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "development",
        "safety": "safe",
        "syntaxPattern": "git subtree <command> [options] [repository] [path]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Extract and publish subtree",
                "commands": "git subtree split --prefix=lib/utils -b utils-export && git push origin utils-export",
                "explanation": "Split subtree and push as separate branch for external use",
                "title": "git && git"
            },
            {
                "scenario": "Sync bidirectional subtree",
                "commands": "git subtree pull --prefix=shared/components upstream main --squash && git subtree push --prefix=shared/components upstream feature-branch",
                "explanation": "Pull updates from upstream and push local changes back",
                "title": "git && git"
            }
        ],
        "relatedCommands": [],
        "warnings": [
            "Subtree changes are part of main repository history",
            "Requires careful prefix path management",
            "Can create large repository with full external history"
        ],
        "manPageUrl": "",
        "distroNotes": {}
    },
    {
        "name": "git-tag-management",
        "standsFor": "Git Tag Management",
        "description": "Advanced tag operations for version management and releases",
        "examples": [
            "git tag -s v1.0.0 -m 'Release version 1.0.0'  # Create GPG-signed tag with message for secure releases",
            "git tag -l 'v1.*' --sort=-version:refname  # List tags matching pattern, sorted by version in descending order",
            "git show --show-signature v1.0.0  # Display tag information and verify GPG signature",
            "git tag v1.0.0-rc1 abc1234  # Create lightweight tag pointing to specific commit",
            "git tag -d v1.0.0 && git push origin :refs/tags/v1.0.0  # Remove tag locally and from remote repository",
            "git push --tags origin  # Upload all local tags to remote repository",
            "echo 'Enterprise Git Tag Management and Release Orchestration' && git tag -a v$(date +%Y.%m.%d) -m 'Enterprise Release v'$(date +%Y.%m.%d)' - Production deployment with comprehensive testing and security validation' && git push origin v$(date +%Y.%m.%d) && echo 'Release Validation:' && git show --show-signature v$(date +%Y.%m.%d) && echo 'Tag-based Deployment:' && curl -X POST -H 'Authorization: Bearer $DEPLOY_TOKEN' -d '{\"tag\": \"v'$(date +%Y.%m.%d)'\", \"environment\": \"production\"}' https://deploy.enterprise.com/api/releases && echo 'Semantic Versioning:' && git tag -l --sort=-version:refname | head -10 && echo 'Release Notes Generation:' && git log $(git describe --tags --abbrev=0 HEAD~1)..HEAD --pretty=format:'- %s (%an)' > release-notes-v$(date +%Y.%m.%d).md && echo 'Enterprise release management: semantic version tagging, automated deployment integration, release note generation, security validation, and comprehensive production release orchestration for enterprise software delivery pipeline'  # Enterprise Git tag-based release management and deployment automation"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "development",
        "safety": "safe",
        "syntaxPattern": "git tag [options] [name] [commit]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Complete release tagging workflow",
                "commands": "git checkout main && git pull && git tag -a v1.1.0 -m 'Version 1.1.0 release' && git push origin main --tags",
                "explanation": "Update main, create annotated tag, and push with tags",
                "title": "git && git && git && git"
            },
            {
                "scenario": "Replace existing tag",
                "commands": "git tag -d v1.0.0 && git push origin :refs/tags/v1.0.0 && git tag -a v1.0.0 -m 'Corrected release' && git push origin v1.0.0",
                "explanation": "Delete and recreate tag locally and remotely",
                "title": "git && git && git && git"
            }
        ],
        "relatedCommands": [],
        "warnings": [
            "Tags are not automatically pushed with commits",
            "Lightweight tags don't contain metadata",
            "Moving tags can confuse dependency managers"
        ],
        "manPageUrl": "https://git-scm.com/docs/git-tag",
        "distroNotes": {}
    },
    {
        "name": "git-worktree",
        "standsFor": "Git worktree",
        "description": "Manage multiple working trees from single repository",
        "examples": [
            "git worktree add ../feature-work feature-branch  # Create separate working directory for feature branch",
            "git worktree list  # Show all working trees and their associated branches",
            "git worktree add -b hotfix ../hotfix-dir  # Create new branch and worktree simultaneously",
            "git worktree remove ../feature-work  # Delete working tree and clean up references",
            "git worktree move ../old-path ../new-path  # Relocate existing worktree to different directory",
            "git worktree prune  # Clean up worktree references for deleted directories",
            "git worktree add ../feature-branch feature  # Create new worktree for feature development"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "development",
        "safety": "caution",
        "syntaxPattern": "git worktree <command> [options] [path]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Parallel development workflow",
                "commands": "git worktree add ../main-branch main && git worktree add ../feature-branch feature",
                "explanation": "Set up separate directories for main and feature development",
                "title": "git && git"
            },
            {
                "scenario": "Release preparation",
                "commands": "git worktree add -b release/v2.0 ../release-prep && cd ../release-prep",
                "explanation": "Create dedicated space for release preparation",
                "title": "git && cd"
            }
        ],
        "relatedCommands": [],
        "warnings": [
            "Each worktree can only have one branch checked out",
            "Shared index and config between worktrees",
            "Removing directory doesn't automatically clean up worktree"
        ],
        "manPageUrl": "https://git-scm.com/docs/git-worktree",
        "distroNotes": {}
    },
    {
        "name": "git-worktree-advanced",
        "standsFor": "Git Advanced Worktree",
        "description": "Advanced worktree management for parallel development",
        "examples": [
            "git worktree add --orphan ../docs-site docs  # Create worktree with new branch that has no parent commits",
            "git worktree add --detach ../build-env abc1234  # Create detached HEAD worktree for specific commit",
            "git worktree lock ../production-env  # Prevent accidental removal of critical worktree",
            "git worktree repair  # Fix worktree administrative files after manual moves",
            "git worktree list --porcelain  # Show worktrees in machine-readable format",
            "git worktree remove --force ../old-feature  # Remove worktree even if it has uncommitted changes",
            "echo 'Enterprise Git Advanced Worktree Operations and Environment Management' && git worktree add --detach /enterprise/builds/release-$(date +%Y%m%d) v$(date +%Y.%m.%d) && git worktree add --orphan /enterprise/docs/gh-pages-$(date +%Y%m%d) gh-pages && git worktree lock /enterprise/builds/release-$(date +%Y%m%d) && echo 'Worktree Environment Status:' && git worktree list --porcelain | grep -E '(worktree|HEAD|branch)' && echo 'Build Environment Setup:' && cd /enterprise/builds/release-$(date +%Y%m%d) && npm ci --production && npm run build && docker build -t enterprise-app:v$(date +%Y.%m.%d) . && echo 'Documentation Site:' && cd /enterprise/docs/gh-pages-$(date +%Y%m%d) && echo '# Enterprise Documentation' > README.md && echo 'Enterprise advanced worktree operations: detached HEAD builds, orphan branch documentation sites, worktree locking for critical environments, production build isolation, and comprehensive environment management for enterprise development workflows'  # Enterprise Git advanced worktree and environment management"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "development",
        "safety": "safe",
        "syntaxPattern": "git worktree <command> [options] [path]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Hotfix workflow with worktrees",
                "commands": "git worktree add -b hotfix/urgent ../hotfix main && cd ../hotfix && git commit -am 'Fix critical bug' && git push origin hotfix/urgent",
                "explanation": "Create hotfix branch in separate worktree and push fix",
                "title": "git && cd && git && git"
            },
            {
                "scenario": "Parallel testing environments",
                "commands": "git worktree add ../test-v1 v1.0 && git worktree add ../test-v2 v2.0",
                "explanation": "Set up multiple versions for parallel testing",
                "title": "git && git"
            }
        ],
        "relatedCommands": [],
        "warnings": [
            "Cannot check out same branch in multiple worktrees",
            "Administrative files are shared between worktrees",
            "Removing directory doesn't clean up worktree references"
        ],
        "manPageUrl": "https://git-scm.com/docs/git-worktree",
        "distroNotes": {}
    },
    {
        "name": "github-cli",
        "standsFor": "GitHub CLI",
        "description": "Command-line tool for GitHub operations and workflows",
        "examples": [
            "gh pr create --title 'Fix bug' --body 'Description of fix'  # Create pull request with title and description",
            "gh pr list  # Show all pull requests in current repository",
            "gh repo clone user/repo  # Clone GitHub repository with SSH/HTTPS setup",
            "gh repo create myproject --public  # Create new public repository on GitHub",
            "gh run list  # List GitHub Actions workflow runs",
            "gh issue create --title 'Bug report' --body 'Found a bug'  # Create new issue with title and description",
            "gh auth login  # Login to GitHub account via web browser",
            "gh pr merge 123 --squash  # Merge pull request #123 using squash merge",
            "echo 'Enterprise GitHub CLI Workflow Automation' && gh pr create --title 'feat: enterprise SSO integration' --body 'Implements enterprise single sign-on with SAML 2.0 and multi-factor authentication for enhanced security compliance' --assignee @team-lead --label 'enhancement,security' --milestone 'Q4-Security' && gh pr ready && echo 'PR Checks:' && gh run list --workflow=ci.yml | head -5 && gh pr review --approve --body 'Code review completed: security implementation follows enterprise standards' && gh pr merge --squash --delete-branch && echo 'Release Automation:' && gh release create v$(date +%Y.%m.%d) --generate-notes --latest && echo 'Enterprise GitHub workflow: comprehensive PR automation, security compliance validation, approval workflows, automated branch cleanup, and release management for enterprise software delivery pipeline'  # Enterprise GitHub CLI automation and workflow"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "development",
        "safety": "safe",
        "syntaxPattern": "gh <command> [subcommand] [options]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Feature development workflow",
                "commands": "gh repo fork original/repo && gh pr create --draft && gh pr ready",
                "explanation": "Fork repo, create draft PR, then mark ready",
                "title": "gh && gh && gh"
            },
            {
                "scenario": "Review and merge PR",
                "commands": "gh pr checkout 123 && gh pr review --approve && gh pr merge",
                "explanation": "Checkout PR, approve, then merge",
                "title": "gh && gh && gh"
            }
        ],
        "relatedCommands": [
            {
                "name": "git",
                "relationship": "combo",
                "reason": "gh extends git with GitHub-specific operations"
            },
            {
                "name": "curl",
                "relationship": "alternative",
                "reason": "GitHub API can be accessed directly via curl"
            }
        ],
        "warnings": [
            "Requires GitHub authentication setup",
            "Some commands only work within Git repository",
            "API rate limits apply for extensive usage"
        ],
        "manPageUrl": "https://cli.github.com/manual/",
        "distroNotes": {}
    },
    {
        "name": "nmap",
        "standsFor": "Network Mapper",
        "description": "Network discovery and security auditing for legitimate security assessments",
        "examples": [
            "nmap -sn 192.168.1.0/24  # Discover live hosts on network for asset inventory",
            "nmap -sS -sV -O --script safe target.com  # Comprehensive security scan with service detection and safe scripts",
            "nmap --script vuln target.com  # Run vulnerability detection scripts against target",
            "nmap --script ssl-cert,ssl-enum-ciphers -p 443 target.com  # Analyze SSL certificates and cipher suites",
            "nmap -sS -sV -O --script=default,vuln,discovery --script-args=unsafe=1 -T4 --min-rate=1000 $TARGET -oA security-audit-$(date +%Y%m%d) && nmap --script ssl-cert,ssl-enum-ciphers,ssl-heartbleed,ssl-poodle,ssl-ccs-injection -p 443,8443 $TARGET | tee ssl-security-report.txt && python3 -c \"import xml.etree.ElementTree as ET; tree=ET.parse('security-audit-$(date +%Y%m%d).xml'); [print(f'{host.get(\"addr\")}: {port.get(\"portid\")}/{port.get(\"protocol\")} - {port.find(\"state\").get(\"state\")}') for host in tree.findall('.//host') for port in host.findall('.//port')]\" > open-ports-summary.txt  # Enterprise security assessment with comprehensive vulnerability detection, SSL analysis, and structured reporting"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "development",
        "safety": "safe",
        "syntaxPattern": "nmap [scan-type] [options] <target>",
        "prerequisites": [
            "advanced",
            "authorization-required"
        ],
        "commandCombinations": [
            {
                "scenario": "Complete security assessment",
                "commands": "nmap -sS -sV -O --script default,vuln target.com -oA security_scan",
                "explanation": "Comprehensive scan with multiple output formats",
                "title": "nmap"
            }
        ],
        "relatedCommands": [
            {
                "name": "masscan",
                "relationship": "alternative",
                "reason": "High-speed port scanner for large networks"
            }
        ],
        "warnings": [
            "Only scan networks you own or have explicit permission",
            "Some scans may trigger IDS/IPS systems",
            "Requires proper authorization for security testing"
        ],
        "manPageUrl": "https://nmap.org/book/",
        "distroNotes": {}
    },
    {
        "name": "sleuthkit",
        "standsFor": "The Sleuth Kit",
        "description": "Digital forensics toolkit for file system analysis",
        "examples": [
            "fls -r disk_image.dd  # Recursively list all files in disk image",
            "fls -rd disk_image.dd  # Show deleted files in disk image",
            "icat disk_image.dd 12345 > recovered_file.txt  # Extract file contents using inode number",
            "mactime -b timeline.txt > timeline.csv  # Generate timeline from file system metadata"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "development",
        "safety": "dangerous",
        "syntaxPattern": "<tsk-tool> [options] <disk-image>",
        "prerequisites": [
            "expert"
        ],
        "commandCombinations": [
            {
                "scenario": "Complete forensic file analysis",
                "commands": "mmls disk_image.dd && fls -r disk_image.dd && mactime -b timeline.txt",
                "explanation": "Show partitions, list files, and create timeline",
                "title": "mmls && fls && mactime"
            }
        ],
        "relatedCommands": [
            {
                "name": "dd",
                "relationship": "combo",
                "reason": "Create disk images for analysis"
            }
        ],
        "warnings": [
            "Requires understanding of file system structures",
            "Write-blocking important to preserve evidence",
            "Different tools for different file system types"
        ],
        "manPageUrl": "http://sleuthkit.org/sleuthkit/docs/",
        "distroNotes": {}
    }
];

export { development_gitCommands };
export default development_gitCommands;
