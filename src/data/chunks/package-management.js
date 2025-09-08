/**
 * TL;DRx Commands Database - Package management Category
 *
 * Contains 23 commands related to package management.
 * Generated from the original commands.js file.
 *
 * @fileoverview Package management category commands for TL;DRx
 * @category package-management
 * @commands 23
 */

/**
 * Package management category commands
 * @type {Array<Object>}
 */
const package_managementCommands = [
    {
        "name": "apt",
        "standsFor": "Advanced Package Tool",
        "description": "Advanced Package Tool for Debian/Ubuntu package management",
        "examples": [
            "sudo apt update  # Refresh list of available packages and versions",
            "sudo apt upgrade  # Install newer versions of all installed packages",
            "sudo apt install nginx  # Download and install nginx web server",
            "sudo apt remove package-name  # Uninstall package but keep configuration files",
            "apt search python3  # Find packages related to python3",
            "apt show firefox  # Display detailed information about firefox package",
            "sudo apt autoremove && sudo apt autoclean  # Remove unused packages and clean download cache"
        ],
        "platform": [
            "linux"
        ],
        "category": "package-management",
        "safety": "caution",
        "syntaxPattern": "apt [options] <command> [package]",
        "prerequisites": [
            "root"
        ],
        "commandCombinations": [
            {
                "scenario": "Full system update",
                "commands": "sudo apt update && sudo apt upgrade && sudo apt autoremove",
                "explanation": "Update database, upgrade packages, clean unused dependencies",
                "title": "sudo && sudo && sudo"
            },
            {
                "scenario": "Install development environment",
                "commands": "sudo apt update && sudo apt install -y git curl vim build-essential",
                "explanation": "Install essential development tools in one command",
                "title": "sudo && sudo"
            }
        ],
        "relatedCommands": [
            {
                "name": "snap",
                "relationship": "alternative",
                "reason": "Universal package manager on Ubuntu"
            }
        ],
        "warnings": [
            "Always run 'apt update' before installing packages",
            "Requires sudo for most operations",
            "Package names may differ from upstream project names"
        ],
        "manPageUrl": "https://ubuntu.com/server/docs/package-management",
        "distroNotes": {
            "linux": "Debian, Ubuntu, and derivatives only"
        }
    },
    {
        "name": "brew",
        "standsFor": "Homebrew",
        "description": "Package manager for macOS and Linux",
        "examples": [
            "brew install wget  # Install wget command-line tool",
            "brew update  # Update Homebrew formulae and Homebrew itself",
            "brew upgrade  # Update all installed packages to latest versions",
            "brew search python  # Find packages related to python",
            "brew info node  # Display information about node package",
            "brew list  # Show all installed Homebrew packages",
            "brew uninstall package-name  # Remove installed package",
            "brew install --cask firefox  # Install GUI applications like Firefox",
            "brew bundle dump --file=Brewfile && brew bundle check --file=Brewfile  # Create and verify dependency manifest"
        ],
        "platform": [
            "macos",
            "linux"
        ],
        "category": "package-management",
        "safety": "caution",
        "syntaxPattern": "brew <command> [package]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "System maintenance",
                "commands": "brew update && brew upgrade && brew cleanup",
                "explanation": "Update, upgrade packages, and clean old versions",
                "title": "brew && brew && brew"
            },
            {
                "scenario": "Development environment setup",
                "commands": "brew install git node python3 && brew install --cask visual-studio-code",
                "explanation": "Install development tools and IDE",
                "title": "brew && brew"
            }
        ],
        "relatedCommands": [
            {
                "name": "apt",
                "relationship": "similar",
                "reason": "Package manager for different platforms"
            }
        ],
        "warnings": [
            "Installs packages in /usr/local by default on Intel Macs",
            "M1 Macs use /opt/homebrew location",
            "Cask formulae for GUI applications separate from CLI tools"
        ],
        "manPageUrl": "https://docs.brew.sh/",
        "distroNotes": {}
    },
    {
        "name": "bun",
        "standsFor": "Bun",
        "description": "Fast JavaScript runtime and package manager",
        "examples": [
            "bun run app.js  # Execute JavaScript file with Bun runtime",
            "bun install  # Install packages from package.json",
            "bun add express  # Install Express.js as dependency",
            "bun init  # Initialize new project with package.json",
            "bun dev  # Run development script from package.json",
            "bun build ./app.ts --outdir ./dist  # Bundle TypeScript for production",
            "bun upgrade  # Update Bun to latest version"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "package-management",
        "safety": "safe",
        "syntaxPattern": "bun <command> [options]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Quick project setup",
                "commands": "bun init && bun add express @types/express && bun add -d typescript",
                "explanation": "Initialize project and install Express with TypeScript",
                "title": "bun && bun && bun"
            },
            {
                "scenario": "Development workflow",
                "commands": "bun install && bun run build && bun run start",
                "explanation": "Install dependencies, build, and start application",
                "title": "bun && bun && bun"
            }
        ],
        "relatedCommands": [
            {
                "name": "node",
                "relationship": "alternative",
                "reason": "Alternative JavaScript runtime"
            },
            {
                "name": "npm",
                "relationship": "alternative",
                "reason": "Bun can replace npm for package management"
            },
            {
                "name": "deno",
                "relationship": "similar",
                "reason": "Modern JavaScript runtime with built-in features"
            }
        ],
        "warnings": [
            "Still in active development, some features unstable",
            "Not all npm packages are fully compatible",
            "Different from Node.js in some runtime behaviors"
        ],
        "manPageUrl": "https://bun.sh/docs/",
        "distroNotes": {}
    },
    {
        "name": "bundler",
        "standsFor": "Bundler",
        "description": "Ruby dependency manager for consistent gem environments",
        "examples": [
            "bundle install  # Install all gems listed in Gemfile",
            "bundle add rails  # Add rails gem to Gemfile and install",
            "bundle exec rails server  # Run Rails server with correct gem versions",
            "bundle update  # Update all gems to latest compatible versions",
            "bundle outdated  # List gems that have newer versions available",
            "bundle binstubs rails  # Create executable wrappers for gem binaries"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "package-management",
        "safety": "safe",
        "syntaxPattern": "bundle <command> [options]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Clean bundle installation",
                "commands": "rm -rf vendor/bundle Gemfile.lock && bundle install",
                "explanation": "Remove existing bundle and reinstall fresh",
                "title": "rm && bundle"
            }
        ],
        "relatedCommands": [
            {
                "name": "gem",
                "relationship": "combo",
                "reason": "Uses gem command for package installation"
            },
            {
                "name": "ruby",
                "relationship": "combo",
                "reason": "Manages gems for Ruby applications"
            }
        ],
        "warnings": [
            "Always use bundle exec for consistent gem versions",
            "Gemfile.lock should be committed to version control",
            "Bundle path configuration affects where gems are installed"
        ],
        "manPageUrl": "https://bundler.io/man/bundle.1.html",
        "distroNotes": {}
    },
    {
        "name": "cargo",
        "standsFor": "Cargo",
        "description": "Rust package manager and build system",
        "examples": [
            "cargo new myproject  # Initialize new Rust binary project with basic structure",
            "cargo build  # Compile project and dependencies in debug mode",
            "cargo run  # Build and execute project in one command",
            "cargo test  # Execute all unit and integration tests",
            "cargo build --release  # Compile with optimizations for production deployment",
            "cargo add serde  # Add serde crate as dependency to project",
            "cargo check  # Verify code compiles without producing binary",
            "cargo fmt  # Format Rust code according to style guidelines",
            "cargo build --release --target x86_64-unknown-linux-gnu  # Cross-compile for Linux target platform",
            "cargo clippy -- -D warnings  # Run Rust linter with warnings as errors"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "package-management",
        "safety": "safe",
        "syntaxPattern": "cargo <command> [options]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Complete development workflow",
                "commands": "cargo check && cargo test && cargo build --release",
                "explanation": "Verify, test, then build optimized version",
                "title": "cargo && cargo && cargo"
            },
            {
                "scenario": "Create and run new project",
                "commands": "cargo new hello_world && cd hello_world && cargo run",
                "explanation": "Initialize project, enter directory, and run",
                "title": "cargo && cd && cargo"
            }
        ],
        "relatedCommands": [
            {
                "name": "rustc",
                "relationship": "combo",
                "reason": "Cargo orchestrates rustc for building projects"
            },
            {
                "name": "npm",
                "relationship": "similar",
                "reason": "Both are package managers for their respective languages"
            },
            {
                "name": "make",
                "relationship": "alternative",
                "reason": "Build system alternative for C/C++ projects"
            }
        ],
        "warnings": [
            "cargo build vs cargo build --release have different performance",
            "Dependencies downloaded on first build can be slow",
            "Cargo.lock should be committed for applications"
        ],
        "manPageUrl": "https://doc.rust-lang.org/cargo/",
        "distroNotes": {}
    },
    {
        "name": "composer",
        "standsFor": "Composer",
        "description": "Dependency manager for PHP",
        "examples": [
            "composer init  # Create composer.json file interactively",
            "composer install  # Install packages from composer.lock or composer.json",
            "composer require monolog/monolog  # Add Monolog logging library to project",
            "composer require --dev phpunit/phpunit  # Add PHPUnit testing framework as dev dependency",
            "composer update  # Update all packages to latest compatible versions",
            "composer validate  # Check composer.json for errors and completeness",
            "echo --example-usage  # Simplified example for echo command"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "package-management",
        "safety": "safe",
        "syntaxPattern": "composer <command> [options] [arguments]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Clean install with autoloader optimization",
                "commands": "composer install --no-dev --optimize-autoloader",
                "explanation": "Production installation with optimized class loading",
                "title": "composer"
            }
        ],
        "relatedCommands": [
            {
                "name": "php",
                "relationship": "combo",
                "reason": "Composer manages PHP packages"
            },
            {
                "name": "artisan",
                "relationship": "combo",
                "reason": "Laravel's command-line tool often used with Composer"
            }
        ],
        "warnings": [
            "composer.lock should be committed for reproducible installs",
            "Memory limit may need increasing for large projects",
            "Platform requirements can block package installation"
        ],
        "manPageUrl": "https://getcomposer.org/doc/03-cli.md",
        "distroNotes": {}
    },
    {
        "name": "conda",
        "standsFor": "Conda",
        "description": "Package and environment management system for data science",
        "examples": [
            "conda create -n myenv python=3.9 pandas numpy  # Creates new conda environment with Python 3.9 and data packages",
            "conda activate myenv  # Switches to the specified conda environment",
            "conda install scikit-learn matplotlib jupyter  # Installs machine learning and visualization packages",
            "conda env list  # Shows all available conda environments",
            "conda env export > environment.yml  # Creates environment file for sharing or backup",
            "echo --example-usage  # Simplified example for echo command"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "package-management",
        "safety": "safe",
        "syntaxPattern": "conda <command> [options]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Complete ML environment setup",
                "commands": "conda create -n mlenv python=3.9 && conda activate mlenv && conda install pandas numpy scikit-learn matplotlib jupyter",
                "explanation": "Creates and sets up complete machine learning environment",
                "title": "conda && conda && conda"
            },
            {
                "scenario": "Clone and modify environment",
                "commands": "conda create --name newenv --clone oldenv && conda activate newenv && conda install tensorflow",
                "explanation": "Clones existing environment and adds TensorFlow",
                "title": "conda && conda && conda"
            }
        ],
        "relatedCommands": [
            {
                "name": "python3",
                "relationship": "manages",
                "reason": "Conda manages Python interpreters and packages"
            },
            {
                "name": "pip",
                "relationship": "complement",
                "reason": "Can be used alongside conda for packages not available in conda"
            }
        ],
        "warnings": [
            "Mixing conda and pip can cause dependency conflicts",
            "Channel priority affects package versions installed",
            "Environment activation required before using packages",
            "Large environments can consume significant disk space"
        ],
        "manPageUrl": "https://docs.conda.io/en/latest/",
        "distroNotes": {
            "linux": "Available through Miniconda or Anaconda installers",
            "windows": "Available through Anaconda installer or command-line tools",
            "macos": "Available through Anaconda installer or Homebrew"
        }
    },
    {
        "name": "dnf",
        "standsFor": "Dandified YUM",
        "description": "Modern package manager for Red Hat-based distributions",
        "examples": [
            "sudo dnf check-update  # Check for available package updates",
            "sudo dnf install vim  # Install vim text editor",
            "sudo dnf upgrade  # Upgrade all installed packages",
            "sudo dnf remove package-name  # Uninstall package and dependencies",
            "dnf search docker  # Find packages related to docker",
            "dnf history  # Display transaction history",
            "sudo dnf group install 'Development Tools'  # Install entire package group"
        ],
        "platform": [
            "linux"
        ],
        "category": "package-management",
        "safety": "caution",
        "syntaxPattern": "dnf [options] <command> [package]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Full system update",
                "commands": "sudo dnf upgrade && sudo dnf autoremove",
                "explanation": "Update packages and remove orphaned dependencies",
                "title": "sudo && sudo"
            },
            {
                "scenario": "Install multimedia codecs",
                "commands": "sudo dnf install https://download1.rpmfusion.org/free/fedora/rpmfusion-free-release-$(rpm -E %fedora).noarch.rpm && sudo dnf install ffmpeg",
                "explanation": "Add RPM Fusion repo and install multimedia tools",
                "title": "sudo && sudo"
            }
        ],
        "relatedCommands": [
            {
                "name": "yum",
                "relationship": "alternative",
                "reason": "Older package manager that dnf replaces"
            }
        ],
        "warnings": [
            "Replacement for yum with better dependency resolution",
            "Transaction history can be used to rollback changes",
            "Module streams allow multiple versions of software"
        ],
        "manPageUrl": "https://man7.org/linux/man-pages/man8/dnf.8.html",
        "distroNotes": {
            "linux": "Fedora, RHEL 8+, CentOS Stream"
        }
    },
    {
        "name": "gem",
        "standsFor": "RubyGems",
        "description": "RubyGems package manager for Ruby libraries",
        "examples": [
            "gem install rails  # Install Rails framework gem",
            "gem install nokogiri -v 1.12.5  # Install specific version of Nokogiri gem",
            "gem list  # Show all installed gems and versions",
            "gem uninstall rails  # Remove Rails gem from system",
            "gem update  # Update all installed gems to latest versions",
            "gem build my_gem.gemspec  # Build gem package from specification file",
            "gem environment  # Display RubyGems environment information including paths",
            "echo 'Enterprise Ruby Environment Analysis' && ruby --version && gem --version && bundle --version && echo 'Gem Environment:' && gem environment | grep -E 'GEM PATHS|GEM CONFIGURATION' -A 5 && echo 'Installed Production Gems:' && gem list | grep -E '(rails|sidekiq|redis|pg|unicorn)' && echo 'Bundle Status:' && if [ -f Gemfile.lock ]; then bundle check && bundle outdated | head -10; else echo 'No Gemfile.lock found'; fi && echo 'Enterprise Ruby diagnostics: version validation, environment configuration, production gem inventory, and dependency health for Ruby application deployment readiness'  # Enterprise Ruby environment audit"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "package-management",
        "safety": "safe",
        "syntaxPattern": "gem <command> [options] [args]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Install gem without documentation",
                "commands": "gem install rails --no-document",
                "explanation": "Install gem but skip documentation generation for speed",
                "title": "gem"
            }
        ],
        "relatedCommands": [
            {
                "name": "bundler",
                "relationship": "combo",
                "reason": "Manages gem dependencies for Ruby projects"
            },
            {
                "name": "ruby",
                "relationship": "combo",
                "reason": "Ruby interpreter that uses installed gems"
            }
        ],
        "warnings": [
            "May require sudo on some systems for global installation",
            "Gem versions can conflict between projects",
            "Native extensions may fail to compile on some systems"
        ],
        "manPageUrl": "https://guides.rubygems.org/command-reference/",
        "distroNotes": {}
    },
    {
        "name": "helm",
        "standsFor": "Helm",
        "description": "Package manager for Kubernetes applications",
        "examples": [
            "helm repo add stable https://charts.helm.sh/stable  # Add Helm chart repository",
            "helm search repo nginx  # Search for nginx charts in configured repos",
            "helm install my-nginx stable/nginx-ingress  # Install nginx-ingress chart as 'my-nginx' release",
            "helm list  # Show all Helm releases in current namespace",
            "helm upgrade my-nginx stable/nginx-ingress --version 1.2.3  # Upgrade release to specific chart version",
            "helm uninstall my-nginx  # Remove Helm release and associated resources",
            "helm status my-nginx  # Display status of installed release",
            "helm create mychart  # Generate new Helm chart template",
            "echo 'Enterprise Helm Chart Management and Kubernetes Deployment' && helm repo add enterprise-charts https://charts.enterprise.com && helm repo add bitnami https://charts.bitnami.com/bitnami && helm repo update && echo 'Enterprise Application Deployment:' && helm install enterprise-web enterprise-charts/webapp --version 2.1.0 --namespace production --create-namespace --values production-values.yaml --wait --timeout=600s && helm install enterprise-db bitnami/postgresql --version 11.6.12 --namespace production --set auth.postgresPassword=$DB_PASSWORD --set primary.persistence.size=100Gi && echo 'Deployment Validation:' && helm list --namespace production && kubectl get pods -n production && echo 'Health Checks:' && kubectl wait --for=condition=ready pod --all -n production --timeout=300s && echo 'Service Monitoring:' && kubectl get services -n production -o wide && echo 'Enterprise Helm orchestration: chart repository management, multi-component application deployment, persistent storage configuration, deployment validation, health monitoring, and comprehensive Kubernetes application lifecycle management for enterprise container orchestration'  # Enterprise Helm chart management and Kubernetes deployment"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "package-management",
        "safety": "safe",
        "syntaxPattern": "helm [command] [options]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Complete application deployment",
                "commands": "helm repo update && helm install myapp ./mychart --values production.yaml && helm status myapp",
                "explanation": "Update repos, install chart with custom values, check status",
                "title": "helm && helm && helm"
            }
        ],
        "relatedCommands": [
            {
                "name": "kubectl",
                "relationship": "combo",
                "reason": "Helm uses kubectl to deploy to Kubernetes"
            },
            {
                "name": "docker",
                "relationship": "combo",
                "reason": "Helm charts often deploy Docker images"
            }
        ],
        "warnings": [
            "Helm 3 removed Tiller server requirement",
            "Chart dependencies must be updated before install",
            "Values files override default chart configurations"
        ],
        "manPageUrl": "https://helm.sh/docs/",
        "distroNotes": {}
    },
    {
        "name": "helm-package-management",
        "standsFor": "Helm Package Manager",
        "description": "Helm package manager for Kubernetes applications",
        "examples": [
            "helm install webapp stable/nginx-ingress --values custom-values.yaml --set controller.service.type=LoadBalancer --namespace ingress-system --create-namespace  # Install Helm chart with custom values file and command-line overrides",
            "helm upgrade webapp stable/webapp --reuse-values --reset-values=false --force --wait --timeout=600s  # Upgrade release while preserving existing values with extended timeout",
            "helm template webapp ./mychart --values values-prod.yaml --debug --dry-run  # Render templates locally for debugging without installation",
            "helm create myapp && helm lint myapp && helm package myapp && helm test myapp  # Create, validate, package, and test a new Helm chart",
            "helm repo add bitnami https://charts.bitnami.com/bitnami && helm repo update && helm search repo bitnami/postgres  # Add repository, update index, and search for available charts",
            "helm history webapp --max=10 && helm rollback webapp 2 --wait  # View release history and rollback to specific revision",
            "echo 'Enterprise Helm Release Management and Deployment Orchestration' && echo 'Production Release Pipeline:' && helm template enterprise-app ./charts/enterprise-app --values values-prod.yaml --debug > deployment-preview-$(date +%Y%m%d).yaml && helm diff upgrade enterprise-app ./charts/enterprise-app --values values-prod.yaml && helm upgrade enterprise-app ./charts/enterprise-app --values values-prod.yaml --atomic --wait --timeout=900s --history-max=10 && echo 'Release Validation:' && helm test enterprise-app --timeout=300s && kubectl rollout status deployment/enterprise-app -n production && echo 'Monitoring Setup:' && helm install enterprise-monitoring prometheus-community/kube-prometheus-stack --namespace monitoring --create-namespace && echo 'Backup Strategy:' && helm get values enterprise-app > backup-values-$(date +%Y%m%d).yaml && kubectl get all -n production -o yaml > backup-resources-$(date +%Y%m%d).yaml && echo 'Enterprise Helm release orchestration: template validation, deployment preview, atomic upgrades, release testing, monitoring integration, backup strategies, and comprehensive production deployment management for enterprise Kubernetes environments'  # Enterprise Helm release management and deployment orchestration"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "package-management",
        "safety": "caution",
        "syntaxPattern": "helm <command> [options]",
        "prerequisites": [
            "helm-cli",
            "kubernetes-cluster"
        ],
        "commandCombinations": [
            {
                "scenario": "Production deployment pipeline",
                "commands": "helm repo update && helm diff upgrade webapp stable/webapp --values prod-values.yaml && helm upgrade webapp stable/webapp --values prod-values.yaml --atomic --wait",
                "explanation": "Update repos, preview changes, and perform atomic upgrade",
                "title": "helm && helm && helm"
            },
            {
                "scenario": "Multi-environment management",
                "commands": "helm install webapp-dev ./chart --values values-dev.yaml -n development && helm install webapp-prod ./chart --values values-prod.yaml -n production",
                "explanation": "Deploy same chart to different environments with environment-specific values",
                "title": "helm && helm"
            }
        ],
        "relatedCommands": [
            {
                "name": "kubectl",
                "relationship": "underlying",
                "reason": "Helm uses kubectl to deploy resources to Kubernetes"
            },
            {
                "name": "git",
                "relationship": "combo",
                "reason": "Helm charts are often stored in Git repositories"
            },
            {
                "name": "docker",
                "relationship": "combo",
                "reason": "Helm charts deploy containerized applications"
            }
        ],
        "warnings": [
            "Helm 3 doesn't use Tiller but Helm 2 required it",
            "Chart dependencies must be updated before installation",
            "Release names must be unique within a namespace"
        ],
        "manPageUrl": "https://helm.sh/docs/",
        "distroNotes": {}
    },
    {
        "name": "npm",
        "standsFor": "Node Package Manager",
        "description": "Node Package Manager for JavaScript package management",
        "examples": [
            "npm init -y  # Create package.json with default values",
            "npm install express  # Install Express.js as production dependency",
            "npm install --save-dev eslint  # Install ESLint as development-only dependency",
            "npm install -g nodemon  # Install nodemon globally for all projects",
            "npm update  # Update all packages to latest compatible versions",
            "npm audit  # Check for known security vulnerabilities",
            "npm audit fix  # Automatically fix security vulnerabilities",
            "npm list --depth=0  # Show top-level installed packages",
            "npm run build  # Execute 'build' script defined in package.json",
            "npm publish  # Publish package to npm registry",
            "npm audit fix --force && npm run test && npm run build && npm run lint && npm version patch && npm publish --dry-run && npm publish --access public && npm pack && tar -tzf $(npm pack) | head -20 && npm view $(npm whoami)/$(node -p 'require(\"./package.json\").name') versions --json | jq '.[-5:]'  # Complete package publication pipeline with security fixes, testing, versioning, and publication verification with recent version history"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "package-management",
        "safety": "caution",
        "syntaxPattern": "npm <command> [args]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Complete project setup",
                "commands": "npm init -y && npm install express cors && npm install --save-dev nodemon eslint",
                "explanation": "Initialize project, install prod and dev dependencies",
                "title": "npm && npm && npm"
            },
            {
                "scenario": "Security maintenance",
                "commands": "npm audit && npm audit fix && npm update",
                "explanation": "Audit, fix vulnerabilities, and update packages",
                "title": "npm && npm && npm"
            }
        ],
        "relatedCommands": [
            {
                "name": "yarn",
                "relationship": "alternative",
                "reason": "Alternative package manager with similar functionality"
            },
            {
                "name": "pnpm",
                "relationship": "alternative",
                "reason": "Fast, disk space efficient package manager"
            },
            {
                "name": "node",
                "relationship": "combo",
                "reason": "npm manages packages for Node.js runtime"
            }
        ],
        "warnings": [
            "package-lock.json should be committed to version control",
            "Global packages may conflict between projects",
            "npm scripts run in different shell environments"
        ],
        "manPageUrl": "https://docs.npmjs.com/",
        "distroNotes": {}
    },
    {
        "name": "npx",
        "standsFor": "Node Package Execute",
        "description": "Execute npm packages without installing globally",
        "examples": [
            "npx create-react-app my-app  # Create React app without global installation",
            "npx eslint src/  # Run locally installed ESLint",
            "npx webpack@4.0.0  # Execute specific version of webpack",
            "npx --yes cowsay 'Hello World'  # Auto-install and run cowsay package",
            "npx github:user/repo  # Execute package directly from GitHub",
            "npx --no-install eslint --version  # Run eslint only if already installed",
            "npx --yes @storybook/cli@latest sb init && npx chromatic --project-token=$CHROMATIC_TOKEN --exit-zero-on-changes && npx semantic-release --dry-run && npm run test:coverage && npx codecov && echo \"Enterprise frontend toolchain deployed: Storybook visual testing, Chromatic CI, semantic versioning, full test coverage, automated deployment ready\"  # Complete enterprise frontend development pipeline with visual testing, automated versioning, and coverage reporting"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "package-management",
        "safety": "safe",
        "syntaxPattern": "npx [options] <command>",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Quick project scaffolding",
                "commands": "npx create-next-app@latest my-app && cd my-app && npx next dev",
                "explanation": "Create Next.js app and start development server",
                "title": "npx && cd && npx"
            },
            {
                "scenario": "One-off package execution",
                "commands": "npx --yes json-server --watch db.json --port 3001",
                "explanation": "Install and run JSON server temporarily",
                "title": "npx"
            }
        ],
        "relatedCommands": [
            {
                "name": "npm",
                "relationship": "combo",
                "reason": "npx is part of npm package"
            },
            {
                "name": "yarn",
                "relationship": "alternative",
                "reason": "yarn dlx provides similar functionality"
            },
            {
                "name": "pnpm",
                "relationship": "alternative",
                "reason": "pnpm dlx provides similar functionality"
            }
        ],
        "warnings": [
            "Downloads and caches packages temporarily",
            "May have different behavior than globally installed version",
            "Can automatically install packages if not found"
        ],
        "manPageUrl": "https://www.npmjs.com/package/npx",
        "distroNotes": {}
    },
    {
        "name": "npx react-native",
        "standsFor": "Node Package Execute React Native",
        "description": "Run React Native commands without global installation",
        "examples": [
            "npx react-native@latest init MyApp  # Uses npx to run the latest version of React Native CLI to create a new project",
            "npx react-native upgrade  # Upgrades React Native version and updates project files accordingly",
            "npx react-native doctor  # Runs diagnostics to check if the development environment is properly configured"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "package-management",
        "safety": "safe",
        "syntaxPattern": "npx react-native [command] [options]",
        "prerequisites": [
            "node",
            "npm"
        ],
        "commandCombinations": [
            {
                "scenario": "Create and initialize new project with latest version",
                "commands": "npx react-native@latest init MyApp && cd MyApp && npx react-native start",
                "explanation": "Creates project with latest React Native, navigates into it, and starts development server",
                "title": "npx && cd && npx"
            }
        ],
        "relatedCommands": [
            {
                "name": "react-native",
                "relationship": "global",
                "reason": "Global installation alternative of React Native CLI"
            },
            {
                "name": "npm",
                "relationship": "dependency",
                "reason": "Package manager that provides npx functionality"
            }
        ],
        "warnings": [
            "May be slower than global installation for frequent use",
            "Requires internet connection for first-time package download",
            "Version conflicts may occur if global version is also installed"
        ],
        "manPageUrl": "https://reactnative.dev/docs/environment-setup",
        "distroNotes": {
            "windows": "Requires Node.js and npm installed"
        }
    },
    {
        "name": "pacman",
        "standsFor": "package manager",
        "description": "Package manager for Arch Linux and derivatives",
        "examples": [
            "sudo pacman -Sy  # Synchronize package databases",
            "sudo pacman -Syu  # Update package database and upgrade all packages",
            "sudo pacman -S firefox  # Install Firefox web browser",
            "sudo pacman -R package-name  # Remove package but keep dependencies",
            "sudo pacman -Rs package-name  # Remove package and unused dependencies",
            "pacman -Ss keyword  # Search for packages containing keyword",
            "pacman -Q  # Query all installed packages",
            "sudo pacman -Sc  # Remove old packages from cache",
            "sudo pacman -Syu --noconfirm && pacman -Qdt | sudo pacman -Rns - --noconfirm && sudo pacman -Sc --noconfirm && journalctl -p 3 -xb | grep -i pacman && echo \"System maintenance completed: $(pacman -Q | wc -l) packages installed, $(pacman -Qdt | wc -l) orphans removed, cache cleaned, error log reviewed\" && paccache -rk2 && echo \"Package cache optimized: keeping 2 most recent versions\"  # Complete Arch Linux system maintenance with updates, orphan removal, cache cleanup, error checking, and cache optimization"
        ],
        "platform": [
            "linux"
        ],
        "category": "package-management",
        "safety": "caution",
        "syntaxPattern": "pacman [options] [packages]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Full system maintenance",
                "commands": "sudo pacman -Syu && sudo pacman -Sc",
                "explanation": "Update system and clean package cache",
                "title": "sudo && sudo"
            },
            {
                "scenario": "Find orphaned packages",
                "commands": "pacman -Qdt",
                "explanation": "List packages installed as dependencies but no longer needed",
                "title": "pacman"
            }
        ],
        "relatedCommands": [],
        "warnings": [
            "Always use -Syu together, never -Sy alone",
            "Rolling release means frequent updates required",
            "AUR packages require separate tools like yay"
        ],
        "manPageUrl": "https://wiki.archlinux.org/title/Pacman",
        "distroNotes": {
            "linux": "Arch Linux, Manjaro, EndeavourOS"
        }
    },
    {
        "name": "pip",
        "standsFor": "Pip Installs Packages",
        "description": "Python package installer",
        "examples": [
            "pip install requests  # Install requests library for HTTP operations",
            "pip install django==3.2  # Install specific version of Django framework",
            "pip install -r requirements.txt  # Install all packages listed in requirements file",
            "pip install --upgrade numpy  # Update numpy to latest available version",
            "pip show pandas  # Display information about installed pandas package",
            "pip list  # Show all installed Python packages"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "package-management",
        "safety": "caution",
        "syntaxPattern": "pip <command> [options]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Create requirements file",
                "commands": "pip freeze > requirements.txt",
                "explanation": "Export current environment packages to requirements file",
                "title": "pip > requirements"
            },
            {
                "scenario": "Upgrade all packages",
                "commands": "pip list --outdated --format=freeze | grep -v '^-e' | cut -d = -f 1 | xargs -n1 pip install -U",
                "explanation": "Upgrade all outdated packages (Linux/macOS)",
                "title": "pip | grep | cut | xargs"
            }
        ],
        "relatedCommands": [
            {
                "name": "python",
                "relationship": "combo",
                "reason": "pip installs packages for Python interpreter"
            },
            {
                "name": "conda",
                "relationship": "alternative",
                "reason": "Alternative package manager with broader ecosystem"
            }
        ],
        "warnings": [
            "Use pip3 explicitly on systems with both Python 2 and 3",
            "Global installs may require sudo or cause conflicts",
            "Always use virtual environments for projects"
        ],
        "manPageUrl": "https://pip.pypa.io/en/stable/",
        "distroNotes": {}
    },
    {
        "name": "pipenv",
        "standsFor": "Pip Environment",
        "description": "Python development workflow tool combining pip and virtualenv",
        "examples": [
            "pipenv install requests  # Add requests to Pipfile and install in virtual environment",
            "pipenv install pytest --dev  # Install pytest as development dependency",
            "pipenv shell  # Spawn shell with project virtual environment activated",
            "pipenv run python app.py  # Execute Python script in project virtual environment",
            "pipenv requirements > requirements.txt  # Export Pipfile.lock to requirements.txt format"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "package-management",
        "safety": "safe",
        "syntaxPattern": "pipenv <command> [options]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Fresh environment setup",
                "commands": "pipenv --rm && pipenv install && pipenv install --dev",
                "explanation": "Remove old environment and reinstall all dependencies",
                "title": "pipenv && pipenv && pipenv"
            }
        ],
        "relatedCommands": [
            {
                "name": "pip",
                "relationship": "combo",
                "reason": "Pipenv uses pip under the hood"
            },
            {
                "name": "poetry",
                "relationship": "alternative",
                "reason": "More modern Python dependency manager"
            }
        ],
        "warnings": [
            "Pipfile.lock should be committed for production",
            "Can be slower than other package managers",
            "Virtual environment location varies by system"
        ],
        "manPageUrl": "https://pipenv.pypa.io/en/latest/commands.html",
        "distroNotes": {}
    },
    {
        "name": "pnpm",
        "standsFor": "Performant NPM",
        "description": "Fast, disk space efficient package manager",
        "examples": [
            "pnpm init  # Create package.json for new project",
            "pnpm install  # Install all dependencies from package.json",
            "pnpm add express  # Install Express.js as dependency",
            "pnpm add -D jest  # Install Jest as development dependency",
            "pnpm add -g typescript  # Install TypeScript globally",
            "pnpm update  # Update all dependencies to latest versions",
            "pnpm run test  # Execute test script from package.json",
            "pnpm store status  # Display pnpm store statistics",
            "pnpm install --frozen-lockfile --prefer-offline  # Install dependencies from lock file offline-first"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "package-management",
        "safety": "safe",
        "syntaxPattern": "pnpm <command> [args]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Project setup with TypeScript",
                "commands": "pnpm init && pnpm add -D typescript @types/node && pnpm add express",
                "explanation": "Initialize project with TypeScript and Express",
                "title": "pnpm && pnpm && pnpm"
            },
            {
                "scenario": "Monorepo workspace setup",
                "commands": "pnpm init && echo 'packages:\\n  - \"packages/*\"' > pnpm-workspace.yaml",
                "explanation": "Initialize monorepo with workspace configuration",
                "title": "pnpm && echo > pnpm"
            }
        ],
        "relatedCommands": [
            {
                "name": "npm",
                "relationship": "alternative",
                "reason": "Compatible replacement for npm"
            },
            {
                "name": "yarn",
                "relationship": "similar",
                "reason": "Alternative fast package manager"
            },
            {
                "name": "node",
                "relationship": "combo",
                "reason": "pnpm manages Node.js packages"
            }
        ],
        "warnings": [
            "Uses hard links and symlinks for efficiency",
            "May have compatibility issues with some packages",
            "Different store structure than npm/yarn"
        ],
        "manPageUrl": "https://pnpm.io/",
        "distroNotes": {}
    },
    {
        "name": "poetry",
        "standsFor": "Poetry",
        "description": "Python dependency management and packaging tool",
        "examples": [
            "poetry new my-project  # Create new Python project with Poetry structure",
            "poetry add requests  # Add requests library to project dependencies",
            "poetry add --group dev pytest  # Add pytest to development dependencies group",
            "poetry install  # Install all dependencies from pyproject.toml",
            "poetry run python app.py  # Execute Python script within Poetry's virtual environment",
            "poetry build  # Build wheel and source distribution",
            "poetry install --no-dev && poetry run pytest  # Install production dependencies and run tests"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "package-management",
        "safety": "safe",
        "syntaxPattern": "poetry <command> [options]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Complete project setup",
                "commands": "poetry new myapp && cd myapp && poetry add fastapi uvicorn && poetry add --group dev pytest",
                "explanation": "Create project, add web framework and testing tools",
                "title": "poetry && cd && poetry && poetry"
            },
            {
                "scenario": "Update and export requirements",
                "commands": "poetry update && poetry export --without-hashes > requirements.txt",
                "explanation": "Update dependencies and create requirements.txt for deployment",
                "title": "poetry && poetry > requirements"
            }
        ],
        "relatedCommands": [
            {
                "name": "pip",
                "relationship": "alternative",
                "reason": "Traditional Python package installer"
            },
            {
                "name": "pipenv",
                "relationship": "alternative",
                "reason": "Another Python dependency manager"
            }
        ],
        "warnings": [
            "pyproject.toml format different from requirements.txt",
            "Virtual environment location controlled by Poetry",
            "Lock file should be committed for reproducible builds"
        ],
        "manPageUrl": "https://python-poetry.org/docs/cli/",
        "distroNotes": {}
    },
    {
        "name": "snap",
        "standsFor": "Snappy package manager",
        "description": "Universal package manager for Linux applications",
        "examples": [
            "sudo snap install code --classic  # Install Visual Studio Code with classic confinement",
            "snap list  # Show all installed snap packages",
            "sudo snap refresh  # Update all snap packages to latest versions",
            "snap find discord  # Search snap store for Discord packages",
            "snap info firefox  # Display information about Firefox snap",
            "sudo snap remove package-name  # Uninstall snap package",
            "sudo snap install nextcloud --channel=edge  # Install from edge channel (development version)"
        ],
        "platform": [
            "linux"
        ],
        "category": "package-management",
        "safety": "caution",
        "syntaxPattern": "snap <command> [package]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Developer tools installation",
                "commands": "sudo snap install code --classic && sudo snap install discord",
                "explanation": "Install development environment apps via snap",
                "title": "sudo && sudo"
            },
            {
                "scenario": "System maintenance",
                "commands": "sudo snap refresh && snap list --all",
                "explanation": "Update all snaps and show version history",
                "title": "sudo && snap"
            }
        ],
        "relatedCommands": [
            {
                "name": "apt",
                "relationship": "combo",
                "reason": "Often used alongside traditional package managers"
            }
        ],
        "warnings": [
            "Classic confinement required for some applications",
            "Automatic updates can't be disabled easily",
            "Larger size compared to traditional packages"
        ],
        "manPageUrl": "https://snapcraft.io/docs",
        "distroNotes": {}
    },
    {
        "name": "yarn",
        "standsFor": "Yet Another Resource Negotiator",
        "description": "Fast, reliable package manager alternative to npm",
        "examples": [
            "yarn init -y  # Create package.json with default configuration",
            "yarn install  # Install all dependencies from package.json",
            "yarn add react  # Install React as production dependency",
            "yarn add --dev webpack  # Install Webpack as development dependency",
            "yarn global add create-react-app  # Install create-react-app globally",
            "yarn upgrade  # Upgrade all dependencies to latest versions",
            "yarn remove lodash  # Uninstall lodash from project",
            "yarn start  # Execute 'start' script from package.json",
            "yarn outdated  # List packages with available updates"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "package-management",
        "safety": "safe",
        "syntaxPattern": "yarn [command] [args]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "React project setup",
                "commands": "yarn init -y && yarn add react react-dom && yarn add --dev @babel/core webpack",
                "explanation": "Initialize React project with build tools",
                "title": "yarn && yarn && yarn"
            },
            {
                "scenario": "Package maintenance",
                "commands": "yarn outdated && yarn upgrade && yarn audit",
                "explanation": "Check outdated packages, upgrade, and audit security",
                "title": "yarn && yarn && yarn"
            }
        ],
        "relatedCommands": [
            {
                "name": "npm",
                "relationship": "alternative",
                "reason": "Original Node.js package manager"
            },
            {
                "name": "pnpm",
                "relationship": "similar",
                "reason": "Another fast package manager alternative"
            },
            {
                "name": "node",
                "relationship": "combo",
                "reason": "Yarn manages packages for Node.js projects"
            }
        ],
        "warnings": [
            "yarn.lock file should be committed for consistent installs",
            "Different lockfile format than npm",
            "Some npm-specific features may not be available"
        ],
        "manPageUrl": "https://classic.yarnpkg.com/en/docs",
        "distroNotes": {}
    },
    {
        "name": "yum",
        "standsFor": "Yellowdog Updater Modified",
        "description": "Package manager for Red Hat-based Linux distributions",
        "examples": [
            "sudo yum check-update  # Check for available package updates",
            "sudo yum install httpd  # Install Apache HTTP server",
            "sudo yum update  # Upgrade all installed packages to latest versions",
            "sudo yum remove package-name  # Uninstall specified package",
            "yum search keyword  # Find packages containing keyword in name or description",
            "yum info package-name  # Display detailed package information",
            "yum list installed  # Show all currently installed packages"
        ],
        "platform": [
            "linux"
        ],
        "category": "package-management",
        "safety": "caution",
        "syntaxPattern": "yum [options] <command> [package]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "System maintenance",
                "commands": "sudo yum update && sudo yum clean all",
                "explanation": "Update system and clean package cache",
                "title": "sudo && sudo"
            },
            {
                "scenario": "Install group of packages",
                "commands": "sudo yum groupinstall 'Development Tools'",
                "explanation": "Install entire group of development packages",
                "title": "sudo"
            }
        ],
        "relatedCommands": [
            {
                "name": "dnf",
                "relationship": "alternative",
                "reason": "Modern replacement for yum in newer Fedora/RHEL"
            },
            {
                "name": "apt",
                "relationship": "similar",
                "reason": "Package manager for Debian-based systems"
            }
        ],
        "warnings": [
            "Replaced by dnf in newer Red Hat distributions",
            "Requires EPEL repository for additional packages",
            "May conflict with manual RPM installations"
        ],
        "manPageUrl": "https://man7.org/linux/man-pages/man8/yum.8.html",
        "distroNotes": {
            "linux": "RHEL, CentOS, Fedora (older versions)"
        }
    },
    {
        "name": "zypper",
        "standsFor": "Zipper",
        "description": "Command-line package manager for openSUSE and SUSE Linux",
        "examples": [
            "zypper search nginx  # Search for packages containing nginx",
            "sudo zypper install nginx  # Install nginx package",
            "sudo zypper update  # Update all installed packages",
            "zypper repos  # Show configured repositories",
            "sudo zypper install -t pattern lamp_server  # Install LAMP server pattern",
            "sudo zypper addlock nginx  # Prevent nginx from being updated"
        ],
        "platform": [
            "linux"
        ],
        "category": "package-management",
        "safety": "caution",
        "syntaxPattern": "zypper [options] <command> [arguments]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "System update workflow",
                "commands": "sudo zypper refresh && zypper list-updates && sudo zypper update",
                "explanation": "Refresh repos, check updates, apply updates",
                "title": "sudo && zypper && sudo"
            }
        ],
        "relatedCommands": [],
        "warnings": [
            "Uses patterns for software collections",
            "Different syntax from other package managers"
        ],
        "manPageUrl": "https://doc.opensuse.org/documentation/leap/reference/html/book-reference/cha-sw-cl.html",
        "distroNotes": {}
    }
];

export { package_managementCommands };
export default package_managementCommands;
