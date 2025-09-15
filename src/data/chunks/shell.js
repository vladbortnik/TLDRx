/**
 * == THIS FILE HAS BEEN MODIFIED TO SUPPORT NEW UI ==
 *
 * TL;DRx Commands Database - Shell Category
 *
 * Contains 8 commands related to shell.
 * Generated from the original commands.js file.
 *
 * @fileoverview Shell category commands for TL;DRx
 * @category shell
 * @commands ??
 */

/**
 * Shell category commands
 * @type {Array<Object>}
 */
const shellCommands = [
    {
        "name": "binwalk",
        "standsFor": "Binary Walk",
        "description": "Firmware analysis tool for embedded systems security",
        "keyFeatures": [
            "Binwalk is a sophisticated firmware analysis toolkit that goes far beyond basic file identification, serving as the gold standard for security researchers, IoT device analysts, and digital forensics professionals. Most users only scratch the surface of its capabilities, missing its enterprise-grade reverse engineering features and advanced vulnerability assessment tools. This command transforms how professionals approach embedded system security and firmware dissection.",
            "Deep Signature Analysis: Recognizes over 400 embedded file formats including proprietary bootloaders, custom filesystems, encryption headers, and vendor-specific firmware components that standard tools miss",
            "Mathematical Entropy Visualization: Generates detailed entropy graphs revealing encrypted sections, compression boundaries, random number generators, and hidden data channels within firmware images",
            "Recursive Extraction Engine: Automatically unpacks nested firmware structures including multi-layer archives, encrypted containers, and complex bootloader chains while preserving original metadata and timestamps",
            "Custom Signature Development: Create and deploy proprietary signature databases for identifying organization-specific firmware formats, malware implants, or custom embedded protocols",
            "Memory Layout Reconstruction: Maps firmware memory structures, identifies code segments, data sections, and interrupt vectors critical for reverse engineering and exploit development",
            "Cryptographic Boundary Detection: Locates encryption keys, certificate stores, cryptographic libraries, and secure boot components hidden within firmware images",
            "IoT Device Profiling: Extracts manufacturer certificates, device identifiers, network configurations, and embedded credentials from smart home devices, industrial controllers, and networking equipment",
            "Differential Firmware Analysis: Compare multiple firmware versions to identify security patches, backdoors, feature changes, and potential zero-day vulnerabilities",
            "Plugin Ecosystem Integration: Seamlessly interfaces with IDA Pro, Ghidra, and other professional reverse engineering platforms for comprehensive security analysis workflows",
            "Enterprise Batch Processing: Analyze thousands of firmware samples simultaneously with automated vulnerability scanning, malware detection, and compliance reporting",
            "Forensic Chain of Custody: Maintains detailed audit logs, hash verification, and evidence preservation standards required for legal and regulatory investigations",
            "Advanced Pattern Hunting: Deploy complex regular expressions, YARA rules, and custom byte patterns to identify specific malware signatures, backdoors, or proprietary protocols"
        ],
        "examples": [
            "binwalk firmware.bin  # Identify embedded files and file systems in firmware",
            "binwalk -e firmware.bin  # Extract identified files and file systems",
            "binwalk -E firmware.bin  # Perform entropy analysis to identify encrypted/compressed sections",
            "binwalk -R '\\\\\\\\\\\\x00\\\\\\\\\\\\x01\\\\\\\\\\\\x02\\\\\\\\\\\\x03' firmware.bin  # Search for specific byte patterns in firmware",
            "binwalk -Me firmware.bin  # Extract and analyze embedded file systems from firmware"
        ],
        "platform": [
            "linux",
            "macos"
        ],
        "category": "security",
        "safety": "safe",
        "syntaxPattern": "binwalk [options] <firmware-file>",
        "prerequisites": {
            "foundational_concepts": "Solid understanding of system architecture, advanced command-line concepts, and Unix/Linux system administration",
            "prior_commands": "Proficient with file operations, text processing (grep, awk, sed), and system monitoring commands",
            "risk_awareness": "Low risk: exercise elevated caution due to complex dependencies and potential system-wide effects"
        },
        "commandCombinations": [
            {
                "label": "binwalk && binwalk && binwalk # Complete firmware analysis",
                "commands": "binwalk firmware.bin && binwalk -E firmware.bin && binwalk -e firmware.bin",
                "explanation": "Analyze structure, entropy, and extract components"
            }
        ],
        "relatedCommands": [
            {
                "name": "file",
                "relationship": "combo",
                "reason": "Identify file types found in firmware"
            }
        ],
        "warnings": [
            "May not recognize all firmware formats",
            "Extraction success depends on format recognition",
            "Some firmware may be encrypted or obfuscated"
        ],
        "manPageUrl": "https://github.com/ReFirmLabs/binwalk"
    },
    {
        "name": "bitcoin-cli",
        "standsFor": "Bitcoin Command Line Interface",
        "description": "Bitcoin Core command line interface",
        "keyFeatures": [
            "Bitcoin-cli is a sophisticated Bitcoin Core interface that goes far beyond simple transactions, offering enterprise-grade blockchain operations and development tools. Most users only scratch the surface of its capabilities, unaware of its powerful RPC arsenal for professional blockchain development, comprehensive network analysis, and advanced node management that rivals dedicated blockchain infrastructure platforms.",
            "Raw Transaction Engineering: Craft custom transactions with precise input selection, advanced scripting conditions, and complex multi-signature arrangements for institutional-grade Bitcoin operations",
            "Blockchain Forensics & Analysis: Perform deep chain analysis with block hash lookups, transaction tracing, UTXO set examination, and comprehensive network statistics for blockchain research and compliance",
            "Enterprise Node Management: Monitor node health, manage peer connections, control network policies, and implement custom relay rules for professional Bitcoin infrastructure deployment",
            "Advanced Wallet Architecture: Create hierarchical deterministic wallets, manage multiple wallet instances, implement custom derivation paths, and control precise key management for institutional custody solutions",
            "Development-Grade RPC Interface: Access 100+ JSON-RPC methods for blockchain application development, enabling custom Bitcoin services, payment processors, and DeFi protocol integration",
            "Network Intelligence Gathering: Analyze mempool contents, monitor fee estimation algorithms, track network consensus states, and gather real-time blockchain performance metrics for trading and infrastructure decisions",
            "Professional Testing Infrastructure: Deploy regtest environments, simulate blockchain scenarios, test transaction malleability, and create controlled Bitcoin network conditions for application development",
            "Cryptographic Operations Center: Generate and validate Bitcoin addresses, create custom signature schemes, implement time-locked transactions, and manage advanced Bitcoin Script operations for complex financial instruments",
            "Institutional Security Controls: Implement wallet encryption, backup automation, key import/export procedures, and multi-layered access controls suitable for enterprise cryptocurrency operations",
            "Blockchain Data Mining: Extract historical transaction patterns, analyze address clustering, monitor large value movements, and perform comprehensive blockchain intelligence gathering for research and compliance",
            "Cross-Network Protocol Management: Seamlessly switch between mainnet, testnet, signet, and regtest environments while maintaining consistent development workflows and testing procedures"
        ],
        "examples": [
            "bitcoin-cli getblockchaininfo  # Returns current blockchain statistics and synchronization status",
            "bitcoin-cli getbalance  # Shows current balance of the default wallet",
            "bitcoin-cli getnewaddress  # Creates a new Bitcoin receiving address",
            "bitcoin-cli sendtoaddress 1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2 0.1  # Sends 0.1 BTC to the specified address",
            "bitcoin-cli backupwallet /secure/backup/wallet-$(date +%Y%m%d-%H%M%S).dat  # Create timestamped wallet backup"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "development",
        "safety": "safe",
        "syntaxPattern": "bitcoin-cli [options] [command] [parameters]",
        "prerequisites": {
            "foundational_concepts": "Basic command-line familiarity and understanding of fundamental Unix/Linux file system concepts",
            "prior_commands": "Basic familiarity with ls, cd, pwd, cat, and fundamental file system navigation",
            "risk_awareness": "Low risk: understand command purpose and verify syntax before execution"
        },
        "commandCombinations": [
            {
                "label": "bitcoin && bitcoin # Check node status and wallet balance",
                "commands": "bitcoin-cli getblockchaininfo && bitcoin-cli getbalance",
                "explanation": "Shows blockchain sync status and current wallet balance"
            }
        ],
        "relatedCommands": [],
        "warnings": [
            "Bitcoin daemon must be running and synced",
            "Wallet must be unlocked for sending transactions",
            "Commands may take time to complete during sync",
            "Testnet mode requires different configuration"
        ],
        "manPageUrl": "https://bitcoin.org/en/developer-documentation"
    },
    {
        "name": "blender",
        "standsFor": "Blender 3D",
        "description": "Blender 3D creation suite command line interface",
        "keyFeatures": [
            "Blender is a sophisticated 3D production suite that rivals Maya and 3ds Max, offering enterprise-grade capabilities that most users never discover. Professional animation studios, architectural firms, and VFX houses leverage its command-line interface for automated workflows and headless rendering farms. The CLI unlocks Blender's full potential for large-scale production pipelines and enterprise content creation.",
            "Cycles/EEVEE Rendering Engines: Production-quality ray-tracing and real-time rendering systems comparable to Arnold and V-Ray",
            "Python API Automation: Full programmatic control over modeling, animation, and scene composition through comprehensive Python bindings",
            "Geometry Nodes Procedural System: Node-based procedural modeling and animation framework for non-destructive workflows",
            "Grease Pencil 2D Animation: Complete 2D animation suite within 3D space for mixed-media productions and concept visualization",
            "OpenVDB Volume Processing: Industry-standard volumetric data handling for fluid simulations, smoke, fire, and atmospheric effects",
            "USD Pipeline Integration: Universal Scene Description support for seamless integration with Pixar's production pipeline standard",
            "Multi-GPU Render Farm Support: Distributed rendering across CUDA/OpenCL devices with automatic load balancing",
            "Motion Capture Data Processing: Professional mocap cleanup, retargeting, and animation refinement tools",
            "Architectural Visualization Workflows: Parametric modeling, materials, and lighting systems optimized for archviz production",
            "Video Sequence Editor: Professional video editing, color grading, and compositing tools integrated with 3D workflows",
            "Add-on Ecosystem Integration: Command-line execution of professional add-ons for specialized industries and workflows"
        ],
        "examples": [
            "blender -b scene.blend -a  # Renders entire animation sequence without opening GUI",
            "blender -b scene.blend -P script.py  # Runs Python script in Blender context without GUI",
            "blender -b scene.blend -s 10 -e 50 -a  # Renders frames 10 through 50 of the animation",
            "blender -b input.blend --python export_fbx.py  # Uses Python script to export blend file to FBX format",
            "blender -b scene.blend --python-expr \"import bpy; bpy.ops.export_scene.fbx(filepath='output.fbx')\"  # Export blend file to FBX format using Python script"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "development",
        "safety": "safe",
        "syntaxPattern": "blender [options] [file.blend]",
        "prerequisites": {
            "foundational_concepts": "Basic programming concepts, Python syntax fundamentals, and package management understanding",
            "prior_commands": "Familiar with python command, pip install, and basic Python script execution",
            "risk_awareness": "Low risk: verify script contents, understand package installations, and follow standard precautions"
        },
        "commandCombinations": [
            {
                "label": "for ; do ; done # Batch process multiple blend files",
                "commands": "for file in *.blend; do blender -b \"$file\" -P process_script.py; done",
                "explanation": "Processes all blend files in directory with Python script"
            },
            {
                "label": "blender && ffmpeg # Render and convert to video",
                "commands": "blender -b animation.blend -a && ffmpeg -i /tmp/frame_%04d.png output.mp4",
                "explanation": "Renders animation frames then converts to MP4 using ffmpeg"
            }
        ],
        "relatedCommands": [
            {
                "name": "ffmpeg",
                "relationship": "complement",
                "reason": "Often used to convert Blender rendered frames to video formats"
            },
            {
                "name": "unity",
                "relationship": "complement",
                "reason": "Blender assets are commonly imported into Unity for game development"
            },
            {
                "name": "python3",
                "relationship": "underlying",
                "reason": "Blender scripting and automation uses Python"
            }
        ],
        "warnings": [
            "Background rendering requires properly set output paths",
            "Python scripts must be compatible with Blender's Python version",
            "GPU rendering may not work in headless mode on some systems",
            "Large scenes may require significant RAM for command-line rendering"
        ],
        "manPageUrl": "https://docs.blender.org/manual/en/latest/advanced/command_line/arguments.html"
    },
    {
        "name": "brew",
        "standsFor": "Homebrew",
        "description": "Package manager for macOS and Linux",
        "keyFeatures": [
            "Homebrew is far more than a simple package installer - it's a sophisticated ecosystem that transforms your machine into an enterprise-grade development environment with reproducible infrastructure management. Beyond basic software installation, it provides advanced dependency resolution, service orchestration, and professional workflow automation that most users never discover, making it an indispensable tool for DevOps, system administration, and professional software development.",
            "Enterprise Bundle Management: Create reproducible development environments using Brewfiles that define exact package versions, casks, and configurations for team consistency",
            "Advanced Tap Architecture: Maintain private formula repositories, custom build configurations, and proprietary software distributions for enterprise deployments",
            "Service Orchestration: Launch, manage, and auto-restart background services (databases, web servers, message queues) with brew services integration",
            "Formula Customization: Override default build options, compile with specific flags, and create custom variants of packages for specialized requirements",
            "Multi-Version Management: Install multiple versions of critical tools (Python, Node.js, Java) simultaneously and switch between them per-project using version managers",
            "Dependency Tree Analysis: Deep inspection of package dependencies, conflict resolution, and security vulnerability scanning across entire dependency chains",
            "CI/CD Integration: Automate environment setup in continuous integration pipelines with declarative Brewfile specifications and batch installation scripts",
            "Developer Environment Isolation: Create project-specific toolchains without global system contamination through careful PATH management and version pinning",
            "Performance Optimization: Leverage binary bottles for instant installation, compile from source with custom optimizations, and manage disk space with cleanup automation",
            "Security Auditing: Track package provenance, verify cryptographic signatures, and audit installed software for known vulnerabilities using built-in security tools",
            "Cross-Platform Standardization: Maintain consistent development environments across macOS and Linux systems with platform-specific package resolution",
            "Professional Workflow Automation: Integrate with shell scripting, configuration management tools, and infrastructure-as-code practices for scalable system administration"
        ],
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
        "prerequisites": {
            "foundational_concepts": "Basic command-line familiarity, understanding of file systems, and fundamental Unix/Linux concepts",
            "prior_commands": "Comfortable with basic file navigation (ls, cd, pwd), file viewing (cat, less), and simple text editing",
            "risk_awareness": "Low risk: verify command parameters and understand potential file system or configuration changes"
        },
        "commandCombinations": [
            {
                "label": "brew && brew && brew # System maintenance",
                "commands": "brew update && brew upgrade && brew cleanup",
                "explanation": "Update, upgrade packages, and clean old versions"
            },
            {
                "label": "brew && brew # Development environment setup",
                "commands": "brew install git node python3 && brew install --cask visual-studio-code",
                "explanation": "Install development tools and IDE"
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
        "manPageUrl": "https://docs.brew.sh/"
    },
    {
        "name": "btrfs",
        "standsFor": "B-tree Filesystem",
        "description": "Copy-on-write filesystem with advanced features",
        "keyFeatures": [
            "Btrfs is a sophisticated next-generation filesystem that goes far beyond traditional file storage, offering enterprise-grade data protection, advanced storage management, and professional system administration capabilities. Most users discover only basic features, but btrfs provides powerful snapshot management, native RAID implementation, and enterprise storage workflows that rival dedicated storage appliances. This copy-on-write filesystem transforms how professionals handle data integrity, backup strategies, and storage optimization.",
            "Enterprise Snapshot Architecture: Create atomic, space-efficient snapshots with incremental send/receive for enterprise backup workflows and point-in-time recovery",
            "Native RAID Implementation: Built-in RAID 0, 1, 5, 6, and 10 with automatic load balancing, device failure detection, and hot-swap capabilities without external RAID controllers",
            "Professional Data Integrity: Advanced checksumming of all data and metadata with automatic scrubbing, self-healing corruption repair, and comprehensive integrity verification",
            "Dynamic Storage Scaling: Online filesystem resize, device addition/removal, and automatic space allocation without downtime or pre-partitioning constraints",
            "Advanced Compression Pipeline: Transparent compression using LZO, ZLIB, ZSTD, or LZ4 algorithms with per-file compression settings and storage optimization analytics",
            "Subvolume Management System: Independent subvolumes with separate mount points, quotas, and backup policies for complex multi-tenant storage architectures",
            "Zero-Copy Data Deduplication: Copy-on-write semantics with extent sharing and reference linking to eliminate redundant data across snapshots and files",
            "Enterprise Backup Integration: Incremental send/receive protocol for efficient replication between systems, supporting complex backup hierarchies and disaster recovery",
            "Multi-Device Storage Pools: Span filesystems across heterogeneous storage devices with intelligent data placement, automatic load balancing, and device failure recovery",
            "Live Storage Operations: Perform defragmentation, balance operations, device management, and filesystem maintenance while system remains fully operational",
            "Professional Monitoring Tools: Built-in filesystem usage analytics, performance metrics, device health monitoring, and comprehensive storage reporting capabilities"
        ],
        "examples": [
            "sudo btrfs subvolume create /mnt/mysubvol  # Create new Btrfs subvolume",
            "sudo btrfs subvolume list /  # List all subvolumes on filesystem",
            "sudo btrfs subvolume snapshot /home /home_snapshot  # Create read-only snapshot of /home",
            "sudo btrfs filesystem usage /  # Show filesystem usage statistics",
            "sudo btrfs filesystem balance start /  # Rebalance Btrfs filesystem",
            "sudo btrfs scrub start /  # Start data integrity check",
            "sudo btrfs subvolume snapshot /home /snapshots/home-backup  # Create read-only snapshot of home directory"
        ],
        "platform": [
            "linux"
        ],
        "category": "development",
        "safety": "caution",
        "syntaxPattern": "btrfs [command] [options]",
        "prerequisites": {
            "foundational_concepts": "Basic command-line familiarity, understanding of file systems, and fundamental Unix/Linux concepts",
            "prior_commands": "Comfortable with basic file navigation (ls, cd, pwd), file viewing (cat, less), and simple text editing",
            "risk_awareness": "Low risk: verify command parameters and understand potential file system or configuration changes"
        },
        "commandCombinations": [
            {
                "label": "sudo && sudo && sudo # Btrfs maintenance",
                "commands": "sudo btrfs filesystem usage / && sudo btrfs scrub start / && sudo btrfs filesystem balance start /",
                "explanation": "Check usage, verify integrity, rebalance filesystem"
            }
        ],
        "relatedCommands": [
            {
                "name": "zfs",
                "relationship": "alternative",
                "reason": "Both are advanced copy-on-write filesystems"
            }
        ],
        "warnings": [
            "RAID 5/6 implementations still experimental",
            "Regular maintenance recommended"
        ],
        "manPageUrl": "https://btrfs.wiki.kernel.org/index.php/Main_Page"
    },
    {
        "name": "buildah",
        "standsFor": "Build-ah",
        "description": "Build OCI container images without Docker daemon",
        "keyFeatures": [
            "Buildah is a specialized tool for building OCI-compliant container images without requiring a Docker daemon or root privileges. It provides fine-grained control over container image construction through both Dockerfile-based builds and scriptable imperative commands for advanced customization.",
            "Daemon-free Operation: Build container images without requiring a running Docker daemon or background service",
            "Rootless Builds: Create container images as regular users without requiring root privileges or sudo access",
            "OCI Compliance: Produces Open Container Initiative compliant images compatible with Docker, Podman, and other container runtimes",
            "Dockerfile Support: Build images from standard Dockerfiles with extended syntax and improved caching mechanisms",
            "Imperative Building: Use script-based approach for complex image construction with granular control over each layer",
            "Multi-stage Builds: Efficiently create smaller production images using multi-stage building techniques",
            "Filesystem Isolation: Build images with different filesystem backends including overlay, vfs, and device mapper",
            "Registry Integration: Push and pull images from any OCI-compliant container registry including Docker Hub and private registries",
            "Layer Management: Optimize image layers for size and caching efficiency with advanced layer manipulation capabilities",
            "Security Features: Build images with enhanced security through user namespace isolation and reduced attack surface",
            "Automation Ready: Designed for CI/CD pipelines with scriptable commands and robust error handling"
        ],
        "examples": [
            "buildah build -t myapp .  # Build container image from Dockerfile",
            "buildah from ubuntu  # Create working container from base image",
            "buildah run mycontainer -- apt-get update  # Execute command inside working container",
            "buildah copy mycontainer ./app /opt/app  # Copy local files into container filesystem",
            "buildah config --cmd '/app/start.sh' mycontainer  # Configure default command for container",
            "buildah commit mycontainer myapp:latest  # Save working container as new image"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "development",
        "safety": "caution",
        "syntaxPattern": "buildah [global-options] <command> [options]",
        "prerequisites": {
            "foundational_concepts": "Basic command-line familiarity, understanding of file systems, and fundamental Unix/Linux concepts",
            "prior_commands": "Comfortable with basic file navigation (ls, cd, pwd), file viewing (cat, less), and simple text editing",
            "risk_awareness": "Low risk: verify command parameters and understand potential file system or configuration changes"
        },
        "commandCombinations": [
            {
                "label": "buildah && buildah && buildah # Scriptable image building",
                "commands": "buildah from alpine && buildah run alpine-working-container -- apk add curl && buildah commit alpine-working-container mycustom:latest",
                "explanation": "Create custom image by scripting buildah commands"
            },
            {
                "label": "buildah && buildah && buildah # Multi-stage build alternative",
                "commands": "buildah from golang:1.19 as builder && buildah copy builder . /src && buildah run builder -- go build -o app",
                "explanation": "Use buildah for complex multi-stage builds"
            }
        ],
        "relatedCommands": [
            {
                "name": "podman",
                "relationship": "combo",
                "reason": "Often used together in Red Hat container ecosystem"
            },
            {
                "name": "docker",
                "relationship": "alternative",
                "reason": "Docker build vs buildah for creating images"
            }
        ],
        "warnings": [
            "More verbose than Docker build for simple cases",
            "Powerful for scriptable and customized builds",
            "Requires understanding of OCI image format"
        ],
        "manPageUrl": "https://buildah.io/"
    },
    {
        "name": "bun",
        "standsFor": "Bun",
        "description": "Fast JavaScript runtime and package manager",
        "keyFeatures": [
            "Bun is an incredibly fast all-in-one JavaScript runtime, package manager, and bundler designed to replace Node.js, npm, and webpack with a single tool. Built with Zig and powered by JavaScriptCore, it delivers exceptional performance while maintaining compatibility with existing Node.js applications.",
            "Lightning Performance: Execute JavaScript and TypeScript up to 4x faster than Node.js with native compilation optimizations",
            "Built-in Package Manager: Install npm packages significantly faster than npm or yarn with intelligent caching and parallel downloads",
            "Native TypeScript: Run TypeScript files directly without compilation steps or additional configuration",
            "Integrated Bundler: Bundle JavaScript, TypeScript, and CSS files with built-in tree-shaking and minification",
            "Node.js Compatibility: Drop-in replacement for Node.js with support for most existing npm packages and APIs",
            "Hot Reloading: Automatic file watching and hot module replacement for rapid development cycles",
            "Web APIs: Native support for modern web APIs like fetch, WebSocket, and Streams without polyfills",
            "Test Runner: Built-in test framework with Jest-compatible APIs and fast execution",
            "Plugin System: Extensible architecture supporting custom loaders and transformations",
            "Memory Efficiency: Lower memory usage and garbage collection overhead compared to Node.js",
            "Cross-platform: Consistent performance and behavior across macOS, Linux, and Windows"
        ],
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
        "prerequisites": {
            "foundational_concepts": "Basic command-line familiarity, understanding of file systems, and fundamental Unix/Linux concepts",
            "prior_commands": "Comfortable with basic file navigation (ls, cd, pwd), file viewing (cat, less), and simple text editing",
            "risk_awareness": "Low risk: verify command parameters and understand potential file system or configuration changes"
        },
        "commandCombinations": [
            {
                "label": "bun && bun && bun # Quick project setup",
                "commands": "bun init && bun add express @types/express && bun add -d typescript",
                "explanation": "Initialize project and install Express with TypeScript"
            },
            {
                "label": "bun && bun && bun # Development workflow",
                "commands": "bun install && bun run build && bun run start",
                "explanation": "Install dependencies, build, and start application"
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
        "manPageUrl": "https://bun.sh/docs/"
    },
    {
        "name": "bundler",
        "standsFor": "Bundler",
        "description": "Ruby dependency manager for consistent gem environments",
        "keyFeatures": [
            "Bundler is the standard dependency management tool for Ruby applications, ensuring consistent gem versions across different environments. It resolves complex dependency trees, manages version conflicts, and creates reproducible installations that work identically across development, testing, and production systems.",
            "Dependency Resolution: Automatically resolves complex gem dependencies and version conflicts using advanced constraint solving algorithms",
            "Gemfile Management: Declare project dependencies in human-readable Gemfile format with version constraints and source specifications",
            "Lock File Generation: Creates Gemfile.lock to freeze exact gem versions for reproducible deployments across environments",
            "Environment Isolation: Isolates project dependencies to prevent conflicts between different Ruby applications on the same system",
            "Version Constraints: Supports semantic versioning, pessimistic constraints, and exact version pinning for precise control",
            "Multiple Sources: Install gems from RubyGems.org, private gem servers, Git repositories, and local filesystem paths",
            "Group Management: Organize gems into logical groups (development, test, production) for conditional loading",
            "Bundle Execution: Run commands within the context of bundled gems to ensure correct versions are loaded",
            "Platform Support: Handle platform-specific gems and native extensions automatically across different operating systems",
            "Security Features: Verify gem authenticity and check for known security vulnerabilities in dependencies",
            "Performance Optimization: Parallel gem installation and intelligent caching for faster bundle operations"
        ],
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
        "prerequisites": {
            "foundational_concepts": "Basic command-line familiarity, understanding of file systems, and fundamental Unix/Linux concepts",
            "prior_commands": "Comfortable with basic file navigation (ls, cd, pwd), file viewing (cat, less), and simple text editing",
            "risk_awareness": "Low risk: verify command parameters and understand potential file system or configuration changes"
        },
        "commandCombinations": [
            {
                "label": "rm && bundle # Clean bundle installation",
                "commands": "rm -rf vendor/bundle Gemfile.lock && bundle install",
                "explanation": "Remove existing bundle and reinstall fresh"
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
        "manPageUrl": "https://bundler.io/man/bundle.1.html"
    },
    {
        "name": "burpsuite",
        "standsFor": "Burp Suite",
        "description": "Web application security testing platform",
        "keyFeatures": [
            "The `burpsuite` command launches Burp Suite, the industry-standard platform for web application security testing used by security professionals worldwide. It provides an integrated testing environment with proxy capabilities, automated scanning, and manual testing tools for identifying vulnerabilities like SQL injection, XSS, and authentication bypass. Burp Suite combines automated discovery with sophisticated manual testing tools, making it essential for comprehensive web application security assessments.",
            "Intercepting Proxy: Monitor and modify HTTP/HTTPS traffic between browser and web applications in real-time",
            "Automated Scanning: Comprehensive vulnerability scanner detecting OWASP Top 10 and beyond with intelligent crawling",
            "Manual Testing Tools: Repeater, Intruder, and Sequencer for detailed manual security testing and exploitation",
            "Session Management: Advanced session handling for complex authentication and multi-step application workflows",
            "Extension Platform: Rich marketplace of extensions for specialized testing, integrations, and custom functionality",
            "Professional Reporting: Generate detailed vulnerability reports with evidence, remediation guidance, and risk ratings",
            "API Security Testing: Specialized tools for REST API security testing with automated parameter discovery",
            "Advanced Crawling: Intelligent application mapping with JavaScript execution and modern SPA support",
            "Collaboration Features: Team collaboration capabilities for shared testing projects and findings management",
            "Headless Automation: Command-line execution for CI/CD integration and automated security testing pipelines",
            "Enterprise Integration: SAML SSO, centralized reporting, and enterprise security workflow integration"
        ],
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
        "prerequisites": {
            "foundational_concepts": "Solid understanding of system architecture, advanced command-line concepts, and Unix/Linux system administration",
            "prior_commands": "Proficient with file operations, text processing (grep, awk, sed), and system monitoring commands",
            "risk_awareness": "Low risk: exercise elevated caution due to complex dependencies and potential system-wide effects"
        },
        "commandCombinations": [
            {
                "label": "java # Automated web application testing",
                "commands": "java -jar burpsuite_pro.jar --project-file=scan.burp --config-file=config.json --headless",
                "explanation": "Fully automated web application security scan"
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
        "manPageUrl": "https://portswigger.net/burp/documentation"
    },
    {
        "name": "bzip2",
        "standsFor": "Burrows-Wheeler block-sorting text compression",
        "description": "High-compression file compression utility",
        "keyFeatures": [
            "The `bzip2` command is a high-performance file compression utility that uses the Burrows-Wheeler block-sorting text compression algorithm combined with Huffman coding to achieve superior compression ratios compared to gzip. It's particularly effective on text files and achieves compression ratios typically 10-15% better than gzip, making it ideal for archiving large datasets, log files, and backup operations where storage space is critical.",
            "Superior Compression: Achieves 10-15% better compression ratios than gzip using advanced block-sorting algorithms",
            "Block-Sorting Algorithm: Uses Burrows-Wheeler transform for optimal text compression with excellent redundancy removal",
            "Parallel Processing: Multi-threaded compression and decompression for faster processing on multi-core systems",
            "Integrity Verification: Built-in CRC32 checksums ensure data integrity during compression and decompression",
            "Stream Processing: Process data from stdin/stdout for pipeline integration and memory-efficient operations",
            "Selective Compression: Keep original files during compression or force overwrite with various safety options",
            "Cross-Platform Compatibility: Consistent compression format across Linux, macOS, and Windows systems",
            "Memory Efficient: Configurable block sizes (100k to 900k) to balance compression ratio with memory usage",
            "Error Recovery: Robust error handling with recovery options for partially corrupted compressed files",
            "Archive Integration: Native support in tar (tar.bz2) for creating compressed archives",
            "Command-Line Flexibility: Rich set of options for batch processing, testing, and automated workflows"
        ],
        "examples": [
            "bzip2 file.txt  # Compress file.txt to file.txt.bz2",
            "bzip2 -d file.txt.bz2  # Decompress file.txt.bz2 to file.txt",
            "bzip2 -k file.txt  # Compress file while keeping original",
            "bzip2 -t file.txt.bz2  # Test integrity of compressed file"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "development",
        "safety": "safe",
        "syntaxPattern": "bzip2 [options] [files]",
        "prerequisites": {
            "foundational_concepts": "Basic command-line familiarity, understanding of file systems, and fundamental Unix/Linux concepts",
            "prior_commands": "Comfortable with basic file navigation (ls, cd, pwd), file viewing (cat, less), and simple text editing",
            "risk_awareness": "Low risk: verify command parameters and understand potential file system or configuration changes"
        },
        "commandCombinations": [
            {
                "label": "tar # High compression archive",
                "commands": "tar -cjf archive.tar.bz2 directory/",
                "explanation": "Create bzip2-compressed tar archive"
            }
        ],
        "relatedCommands": [
            {
                "name": "gzip",
                "relationship": "alternative",
                "reason": "Different compression algorithm, gzip is faster"
            }
        ],
        "warnings": [
            "Slower than gzip but better compression ratio",
            "Uses more memory during compression"
        ],
        "manPageUrl": "https://sourceware.org/bzip2/"
    },
    {
        "name": "caddy",
        "standsFor": "Caddy",
        "description": "Modern web server with automatic HTTPS",
        "keyFeatures": [
            "The `caddy` command launches Caddy, a modern web server that automatically handles HTTPS certificate provisioning and renewal through Let's Encrypt integration. Unlike traditional web servers that require complex SSL configuration, Caddy makes secure web hosting effortless by automatically obtaining and managing TLS certificates. It features a simple configuration syntax, powerful reverse proxy capabilities, and built-in support for modern web standards like HTTP/2 and HTTP/3.",
            "Automatic HTTPS: Zero-configuration SSL/TLS with automatic Let's Encrypt certificate provisioning and renewal",
            "HTTP/2 and HTTP/3: Native support for latest HTTP protocols for optimal performance and efficiency",
            "Reverse Proxy: Advanced load balancing, health checks, and failover for backend applications",
            "Simple Configuration: Human-readable Caddyfile syntax that's easier than Apache or Nginx configuration",
            "Static File Serving: High-performance static file serving with compression, caching, and directory browsing",
            "API Integration: RESTful admin API for dynamic configuration changes without restarts",
            "Plugin Architecture: Extensible with plugins for authentication, caching, logging, and specialized functionality",
            "Docker-Friendly: Optimized for containerized deployments with minimal resource usage",
            "Graceful Reloads: Zero-downtime configuration reloads and certificate renewals",
            "Security Headers: Automatic security headers and OCSP stapling for enhanced security",
            "WebSocket Support: Full WebSocket proxying capabilities for real-time applications",
            "Template Engine: Built-in template processing for dynamic content generation"
        ],
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
        "prerequisites": {
            "foundational_concepts": "Basic command-line familiarity, understanding of file systems, and fundamental Unix/Linux concepts",
            "prior_commands": "Comfortable with basic file navigation (ls, cd, pwd), file viewing (cat, less), and simple text editing",
            "risk_awareness": "Low risk: verify command parameters and understand potential file system or configuration changes"
        },
        "commandCombinations": [
            {
                "label": "caddy & # Development server with proxy",
                "commands": "caddy reverse-proxy --from localhost:80 --to localhost:3000 &",
                "explanation": "Start reverse proxy in background for development"
            },
            {
                "label": "caddy && caddy # Deploy configuration changes",
                "commands": "caddy validate && caddy reload",
                "explanation": "Validate then reload configuration"
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
        "manPageUrl": "https://caddyserver.com/docs/"
    },
    {
        "name": "cal",
        "standsFor": "calendar",
        "description": "Display calendar",
        "keyFeatures": [
            "The `cal` command is a simple yet versatile calendar utility that displays formatted calendars in the terminal, providing quick date reference and scheduling assistance for command-line users. It can show single months, multiple months, or entire years with various formatting options, making it useful for date calculations, planning, and quick date lookups without leaving the terminal environment.",
            "Month Display: Show individual months with current date highlighted for quick reference",
            "Year View: Display entire yearly calendars with proper month layout and formatting",
            "Multi-Month View: Show previous, current, and next months simultaneously for planning context",
            "Week Start Options: Configure Monday or Sunday as the first day of the week for regional preferences",
            "Julian Day Numbers: Display Julian day numbers for scientific and astronomical applications",
            "Historical Calendars: Access historical dates going back centuries for research and analysis",
            "Custom Date Ranges: Specify any month and year combination for future or past date reference",
            "Terminal Integration: Lightweight tool perfect for terminal workflows and shell scripting",
            "Cross-Platform Consistency: Available on all Unix-like systems with consistent behavior"
        ],
        "examples": [
            "cal  # Show calendar for current month with today highlighted",
            "cal 12 2023  # Show calendar for December 2023",
            "cal 2023  # Show calendar for entire year 2023",
            "cal -3  # Show previous, current, and next month",
            "cal -m  # Display calendar with Monday as first day of week"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "development",
        "safety": "safe",
        "syntaxPattern": "cal [options] [month] [year]",
        "prerequisites": {
            "foundational_concepts": "Basic command-line familiarity, understanding of file systems, and fundamental Unix/Linux concepts",
            "prior_commands": "Comfortable with basic file navigation (ls, cd, pwd), file viewing (cat, less), and simple text editing",
            "risk_awareness": "Low risk: verify command parameters and understand potential file system or configuration changes"
        },
        "commandCombinations": [
            {
                "label": "cal | grep | # Find day of week for specific date",
                "commands": "cal 1 2023 | grep -E '^|\\b1\\b'",
                "explanation": "Check what day of the week January 1, 2023 fell on"
            },
            {
                "label": "date && cal # Display current date with calendar context",
                "commands": "date && cal",
                "explanation": "Show current date and time followed by month calendar"
            }
        ],
        "relatedCommands": [
            {
                "name": "date",
                "relationship": "combo",
                "reason": "Display current date and time information"
            },
            {
                "name": "at",
                "relationship": "scheduling",
                "reason": "Schedule commands for specific dates shown in calendar"
            }
        ],
        "warnings": [
            "cal uses Julian/Gregorian calendar transition in 1752",
            "Month must be specified before year in cal month year format",
            "Different cal implementations may have varying options"
        ],
        "manPageUrl": "https://man7.org/linux/man-pages/man1/cal.1.html"
    },
    {
        "name": "cargo",
        "standsFor": "Cargo",
        "description": "Rust package manager and build system",
        "keyFeatures": [
            "The `cargo` command is Rust's comprehensive package manager and build system that handles project creation, dependency management, compilation, testing, and publishing of Rust applications and libraries. It provides a complete development workflow from project initialization to deployment, with sophisticated dependency resolution, cross-compilation capabilities, and integration with the Rust ecosystem. Cargo makes Rust development productive by automating complex build processes and managing the entire project lifecycle.",
            "Project Management: Create, build, and manage Rust projects with standardized directory structure and configurations",
            "Dependency Resolution: Intelligent dependency management with semantic versioning and conflict resolution",
            "Build Automation: Compile Rust code with optimizations, target-specific builds, and incremental compilation",
            "Testing Framework: Integrated unit testing, integration testing, and documentation testing capabilities",
            "Cross-Compilation: Build binaries for different target platforms and architectures from single codebase",
            "Package Registry: Publish and download packages from crates.io, the official Rust package registry",
            "Workspace Management: Handle multi-package projects with shared dependencies and coordinated builds",
            "Code Formatting: Automatic code formatting with rustfmt integration for consistent code style",
            "Documentation Generation: Generate comprehensive documentation from code comments with rustdoc",
            "Feature Flags: Conditional compilation with feature gates for optional functionality",
            "Profile Optimization: Multiple build profiles (dev, release, test) with customizable optimization settings",
            "Tool Integration: Seamless integration with IDEs, linters, and other Rust development tools"
        ],
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
        "prerequisites": {
            "foundational_concepts": "Basic command-line familiarity, understanding of file systems, and fundamental Unix/Linux concepts",
            "prior_commands": "Comfortable with basic file navigation (ls, cd, pwd), file viewing (cat, less), and simple text editing",
            "risk_awareness": "Low risk: verify command parameters and understand potential file system or configuration changes"
        },
        "commandCombinations": [
            {
                "label": "cargo && cargo && cargo # Complete development workflow",
                "commands": "cargo check && cargo test && cargo build --release",
                "explanation": "Verify, test, then build optimized version"
            },
            {
                "label": "cargo && cd && cargo # Create and run new project",
                "commands": "cargo new hello_world && cd hello_world && cargo run",
                "explanation": "Initialize project, enter directory, and run"
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
        "manPageUrl": "https://doc.rust-lang.org/cargo/"
    },
    {
        "name": "cat",
        "standsFor": "concatenate",
        "description": "Display file contents or concatenate files",
        "keyFeatures": [
            "The `cat` command is one of the most fundamental Unix utilities, serving dual purposes of displaying file contents and concatenating multiple files together. Despite its simple name, cat is incredibly versatile and forms the backbone of countless shell operations, pipeline workflows, and file manipulation tasks. It can handle text files, binary files, and standard input/output streams, making it essential for everything from quick file viewing to complex data processing pipelines.",
            "File Display: Instantly view contents of text files without opening an editor",
            "File Concatenation: Combine multiple files into a single output stream or file",
            "Line Numbering: Display files with line numbers for debugging and reference purposes",
            "Special Character Visualization: Show tabs, line endings, and non-printing characters for debugging",
            "Standard Input Processing: Read from keyboard input and save to files interactively",
            "Pipeline Integration: Perfect input/output source for pipes and command chaining",
            "Multiple File Handling: Process several files simultaneously with single command",
            "Stream Processing: Handle data streams from other commands or processes",
            "Quick File Creation: Create small files quickly by typing content directly",
            "Binary File Support: Display binary files (though output may not be human-readable)",
            "Cross-Platform Consistency: Available on virtually all Unix-like systems with identical behavior"
        ],
        "examples": [
            "cat README.md  # Display entire file contents in terminal",
            "cat file1.txt file2.txt > combined.txt  # Concatenate files and save to new file",
            "cat -n script.py  # Display file contents with numbered lines",
            "cat -A data.csv  # Show all characters including tabs and line endings",
            "cat > notes.txt  # Type content and press Ctrl+D to save to file",
            "cat /etc/passwd | awk -F: '{print $1","$3","$5}' | head -10  # Display user accounts with UID and description",
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
        "prerequisites": {
            "foundational_concepts": "Basic command-line familiarity, understanding of file systems, and fundamental Unix/Linux concepts",
            "prior_commands": "Comfortable with basic file navigation (ls, cd, pwd), file viewing (cat, less), and simple text editing",
            "risk_awareness": "Low risk: verify command parameters and understand potential file system or configuration changes"
        },
        "commandCombinations": [
            {
                "label": "echo && date && cat # Append timestamp to file content",
                "commands": "echo '--- Log Entry ---' && date && cat error.log",
                "explanation": "Add timestamp before displaying file contents"
            },
            {
                "label": "zcat | cat # View compressed file contents",
                "commands": "zcat file.gz | cat -n",
                "explanation": "Uncompress and display file with line numbers"
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
        "manPageUrl": "https://man7.org/linux/man-pages/man1/cat.1.html"
    },
    {
        "name": "cd",
        "standsFor": "change directory",
        "description": "Change current working directory",
        "keyFeatures": [
            "The `cd` command is the fundamental navigation tool in Unix-like systems, allowing users to change their current working directory and traverse the filesystem hierarchy. As a shell builtin command, cd maintains a directory stack and session history, enabling efficient navigation with shortcuts, tab completion, and directory bookmarking. It's essential for file management, script execution, and maintaining context in command-line workflows.",
            "Directory Navigation: Move anywhere in the filesystem using absolute or relative paths",
            "Home Directory Shortcut: Quick return to user home directory with parameterless cd command",
            "Previous Directory Toggle: Switch between current and previous directory with cd - for rapid navigation",
            "Parent Directory Access: Navigate up directory tree with .. notation for hierarchical movement",
            "Tab Completion: Intelligent directory name completion to reduce typing and prevent errors",
            "Path Resolution: Handle complex paths with symbolic links, environment variables, and wildcards",
            "Directory Stack: Maintain history of visited directories for advanced navigation patterns",
            "Tilde Expansion: Use ~ notation for user home directory and ~user for other users' homes",
            "Error Handling: Clear feedback when directories don't exist or lack proper permissions",
            "Shell Integration: Works seamlessly with other commands that depend on current working directory",
            "Cross-Platform Consistency: Identical behavior across Linux, macOS, and Windows environments"
        ],
        "examples": [
            "cd  # Go to user home directory from anywhere",
            "cd -  # Switch between current and previous directory",
            "cd ..  # Navigate to parent directory",
            "cd /usr/local/bin  # Jump directly to specific directory path",
            "cd Pro[TAB]  # Use tab to autocomplete directory names",
            "cd ~/Documents && pwd  # Change to Documents directory and show current location"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "file-operations",
        "safety": "safe",
        "syntaxPattern": "cd [directory]",
        "prerequisites": {
            "foundational_concepts": "Basic command-line familiarity, understanding of file systems, and fundamental Unix/Linux concepts",
            "prior_commands": "Comfortable with basic file navigation (ls, cd, pwd), file viewing (cat, less), and simple text editing",
            "risk_awareness": "Low risk: verify command parameters and understand potential file system or configuration changes"
        },
        "commandCombinations": [
            {
                "label": "cd && ls # Change directory and list contents",
                "commands": "cd project && ls -la",
                "explanation": "Navigate to directory and immediately see what's inside"
            },
            {
                "label": "cd | head # Find and navigate to directory",
                "commands": "cd $(find . -name 'src' -type d | head -1)",
                "explanation": "Find first 'src' directory and navigate to it"
            }
        ],
        "relatedCommands": [
            {
                "name": "pwd",
                "relationship": "combo",
                "reason": "Shows current directory after cd operations"
            },
            {
                "name": "zoxide",
                "relationship": "alternative",
                "reason": "Smart cd that learns your most-visited directories"
            }
        ],
        "warnings": [
            "cd without arguments goes to home directory",
            "Spaces in directory names require quotes or escaping",
            "cd - only remembers one previous directory"
        ],
        "manPageUrl": "https://man7.org/linux/man-pages/man1/cd.1p.html"
    },
    {
        "name": "cdk",
        "standsFor": "Cloud Development Kit",
        "description": "AWS Cloud Development Kit for infrastructure as code",
        "keyFeatures": [
            "The `cdk` command is AWS's Cloud Development Kit that enables developers to define cloud infrastructure using familiar programming languages like TypeScript, Python, Java, and C#. Instead of writing verbose CloudFormation YAML/JSON templates, CDK allows infrastructure to be expressed as code with loops, conditionals, and reusable constructs, making cloud resource management more intuitive and maintainable for developers.",
            "Infrastructure as Code: Define AWS resources using TypeScript, Python, Java, or C# with full programming capabilities",
            "High-Level Constructs: Use pre-built patterns for common AWS architectures and best practices",
            "Multi-Language Support: Choose from TypeScript, Python, Java, C#, and Go for infrastructure definition",
            "CloudFormation Generation: Automatically synthesize optimized CloudFormation templates from code",
            "Stack Management: Deploy, update, and destroy infrastructure stacks with version control integration",
            "Environment Bootstrapping: Set up CDK deployment infrastructure in AWS accounts and regions",
            "Diff and Preview: Preview changes before deployment with detailed resource comparisons",
            "Watch Mode: Automatically deploy infrastructure changes during development cycles",
            "Custom Constructs: Create reusable infrastructure components and share across teams",
            "Testing Support: Unit test infrastructure code using familiar testing frameworks",
            "CI/CD Integration: Deploy infrastructure through automated pipelines with proper permissions",
            "Multi-Stack Applications: Manage complex applications with multiple interconnected stacks"
        ],
        "examples": [
            "cdk init app --language typescript  # Create new CDK application with TypeScript",
            "cdk bootstrap aws://123456789012/us-east-1  # Prepare AWS environment for CDK deployments",
            "cdk synth MyStack  # Generate CloudFormation template from CDK code",
            "cdk deploy MyStack --require-approval never  # Deploy CDK stack without confirmation prompts",
            "cdk destroy MyStack --force  # Remove CDK stack and all resources",
            "cdk diff MyStack  # Compare deployed stack with local CDK code",
            "cdk list  # Show all stacks in CDK application",
            "cdk watch MyStack  # Automatically deploy on code changes",
            "cdk bootstrap && cdk deploy MyStack --require-approval never  # Bootstrap CDK and deploy stack without manual approval"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "development",
        "safety": "safe",
        "syntaxPattern": "cdk [command] [options]",
        "prerequisites": {
            "foundational_concepts": "Basic command-line familiarity, understanding of file systems, and fundamental Unix/Linux concepts",
            "prior_commands": "Comfortable with basic file navigation (ls, cd, pwd), file viewing (cat, less), and simple text editing",
            "risk_awareness": "Low risk: verify command parameters and understand potential file system or configuration changes"
        },
        "commandCombinations": [
            {
                "label": "cdk && cdk && cdk # Full deployment pipeline",
                "commands": "cdk synth && cdk diff MyStack && cdk deploy MyStack",
                "explanation": "Synthesize, review changes, then deploy stack"
            },
            {
                "label": "cdk # Multi-stack deployment",
                "commands": "cdk deploy --all --require-approval never --concurrency 2",
                "explanation": "Deploy multiple stacks concurrently without approval"
            }
        ],
        "relatedCommands": [
            {
                "name": "npm",
                "relationship": "combo",
                "reason": "CDK uses npm for package management"
            },
            {
                "name": "aws",
                "relationship": "combo",
                "reason": "CDK deploys to AWS CloudFormation"
            }
        ],
        "warnings": [
            "Requires Node.js and npm/yarn installation",
            "Bootstrap required before first deployment",
            "CDK version compatibility with construct libraries important"
        ],
        "manPageUrl": "https://docs.aws.amazon.com/cdk/"
    }
];

export { shellCommands };
export default shellCommands;
