/**
 * TL;DRx Commands Database - Development containers Category
 *
 * Contains 31 commands related to development containers.
 * Generated from the original commands.js file.
 *
 * @fileoverview Development containers category commands for TL;DRx
 * @category development-containers
 * @commands 31
 */

/**
 * Development containers category commands
 * @type {Array<Object>}
 */
const development_containersCommands = [
    {
        "name": "act",
        "standsFor": "Act",
        "description": "Run GitHub Actions locally using Docker",
        "examples": [
            "act push  # Execute GitHub Actions workflow for push event",
            "act pull_request  # Simulate pull request workflow locally",
            "act -l  # Show all workflows and jobs that can be run",
            "act -j test  # Execute only the 'test' job from workflow",
            "act -P ubuntu-latest=nektos/act-environments-ubuntu:18.04  # Override default runner image",
            "act --secret-file .secrets  # Load environment secrets from file",
            "act  # Run default push event",
            "act -n  # Dry run mode to see what would execute",
            "act -s GITHUB_TOKEN=token123  # Run with secret",
            "act --var ENVIRONMENT=dev  # Run with variable",
            "act -v  # Enable verbose logging"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "development",
        "safety": "safe",
        "syntaxPattern": "act [event] [options]",
        "prerequisites": [
            "docker"
        ],
        "commandCombinations": [
            {
                "scenario": "Test workflow before push",
                "commands": "act -l && act push --dryrun && act push",
                "explanation": "List workflows, dry run, then execute",
                "title": "act && act && act"
            },
            {
                "scenario": "Debug failing workflow",
                "commands": "act push --verbose --container-architecture linux/amd64",
                "explanation": "Run with verbose logging and specific architecture",
                "title": "act"
            }
        ],
        "relatedCommands": [
            {
                "name": "docker",
                "relationship": "combo",
                "reason": "act requires Docker to run GitHub Actions locally"
            },
            {
                "name": "github-cli",
                "relationship": "combo",
                "reason": "Both tools work with GitHub repositories"
            },
            {
                "name": "git",
                "relationship": "combo",
                "reason": "act runs in Git repositories with GitHub Actions"
            }
        ],
        "warnings": [
            "Requires Docker to be running",
            "Some GitHub-specific features may not work locally",
            "Large runner images can be 17GB in size",
            "Not all GitHub Actions marketplace actions work locally",
            "Secrets are handled differently than in GitHub"
        ],
        "manPageUrl": "https://github.com/nektos/act",
        "distroNotes": {
            "linux": "Install via curl script or package manager",
            "macos": "Available via Homebrew: brew install act",
            "windows": "Available via Chocolatey: choco install act-cli"
        }
    },
    {
        "name": "argocd",
        "standsFor": "Argo CD",
        "description": "GitOps continuous delivery tool for Kubernetes",
        "examples": [
            "argocd login argocd-server.argocd.svc.cluster.local --username admin  # Authenticate with ArgoCD server",
            "argocd app create my-app --repo https://github.com/user/repo --path manifests --dest-server https://kubernetes.default.svc --dest-namespace default  # Create new ArgoCD application from Git repository",
            "argocd app sync my-app  # Synchronize application with Git repository state",
            "argocd app list  # Show all applications managed by ArgoCD",
            "argocd app get my-app  # Display detailed information about specific application",
            "argocd app set my-app --sync-policy automated --auto-prune --self-heal  # Enable automatic synchronization with pruning and self-healing",
            "argocd app delete my-app --cascade  # Delete application and all associated Kubernetes resources",
            "argocd app rollback my-app --revision HEAD-1  # Rollback application to previous Git revision"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "development",
        "safety": "dangerous",
        "syntaxPattern": "argocd [command] [options]",
        "prerequisites": [
            "kubernetes"
        ],
        "commandCombinations": [
            {
                "scenario": "Complete application deployment",
                "commands": "argocd app create my-app --repo https://github.com/user/repo --path k8s --dest-server https://kubernetes.default.svc --dest-namespace production && argocd app sync my-app && argocd app wait my-app",
                "explanation": "Create application, sync with Git, and wait for healthy status",
                "title": "argocd && argocd && argocd"
            },
            {
                "scenario": "Batch application management",
                "commands": "argocd app list -o name | xargs -I {} argocd app sync {}",
                "explanation": "Synchronize all applications managed by ArgoCD",
                "title": "argocd | xargs"
            }
        ],
        "relatedCommands": [
            {
                "name": "kubectl",
                "relationship": "combo",
                "reason": "ArgoCD deploys to Kubernetes clusters"
            },
            {
                "name": "git",
                "relationship": "combo",
                "reason": "ArgoCD synchronizes with Git repositories"
            }
        ],
        "warnings": [
            "Applications must be in same cluster as ArgoCD or configured for remote clusters",
            "Git repository access requires proper credentials configuration",
            "Sync windows can be configured to prevent automatic deployments during specific times",
            "Resource hooks allow custom deployment logic"
        ],
        "manPageUrl": "https://argo-cd.readthedocs.io/en/stable/user-guide/commands/argocd/",
        "distroNotes": {}
    },
    {
        "name": "buildah",
        "standsFor": "Build-ah",
        "description": "Build OCI container images without Docker daemon",
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
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Scriptable image building",
                "commands": "buildah from alpine && buildah run alpine-working-container -- apk add curl && buildah commit alpine-working-container mycustom:latest",
                "explanation": "Create custom image by scripting buildah commands",
                "title": "buildah && buildah && buildah"
            },
            {
                "scenario": "Multi-stage build alternative",
                "commands": "buildah from golang:1.19 as builder && buildah copy builder . /src && buildah run builder -- go build -o app",
                "explanation": "Use buildah for complex multi-stage builds",
                "title": "buildah && buildah && buildah"
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
        "manPageUrl": "https://buildah.io/",
        "distroNotes": {
            "linux": "Native support, part of Red Hat ecosystem",
            "macos": "Limited support, better to use Docker",
            "windows": "Limited support via WSL"
        }
    },
    {
        "name": "container-ci-cd-pipeline",
        "standsFor": "Container CI/CD Pipeline",
        "description": "Container-based CI/CD pipeline automation",
        "examples": [
            "gitlab-runner exec docker build-job --docker-image docker:20.10.16 --docker-volumes /var/run/docker.sock:/var/run/docker.sock  # Execute GitLab CI job locally with Docker-in-Docker capability",
            "docker run -d --name jenkins -p 8080:8080 -v jenkins_home:/var/jenkins_home -v /var/run/docker.sock:/var/run/docker.sock jenkins/jenkins:lts  # Run Jenkins with Docker socket access for container-based builds",
            "docker buildx create --use --platform linux/amd64,linux/arm64 --name multiarch-builder && docker buildx inspect --bootstrap  # Create multi-architecture builder for GitHub Actions workflows",
            "argocd app create webapp --repo https://github.com/user/k8s-configs --path manifests --dest-server https://kubernetes.default.svc --dest-namespace production  # Create ArgoCD application for GitOps-based Kubernetes deployment",
            "tkn pipeline start build-and-deploy --param git-url=https://github.com/user/app --param image-name=myapp:latest --workspace name=shared-data,volumeClaimTemplateFile=workspace-template.yaml  # Start Tekton pipeline with parameters and persistent workspace",
            "docker run -d --name buildkite-agent -e BUILDKITE_AGENT_TOKEN=$BUILDKITE_AGENT_TOKEN -v /var/run/docker.sock:/var/run/docker.sock buildkite/agent:3  # Run Buildkite agent with Docker access for containerized builds",
            "echo --example-usage  # Simplified example for echo command"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "development",
        "safety": "safe",
        "syntaxPattern": "<ci-tool> <pipeline-command> [options]",
        "prerequisites": [
            "ci-cd-system"
        ],
        "commandCombinations": [
            {
                "scenario": "Complete CI/CD pipeline with security",
                "commands": "docker build -t myapp:$BUILD_NUMBER . && trivy image --exit-code 1 myapp:$BUILD_NUMBER && docker tag myapp:$BUILD_NUMBER registry.com/myapp:$BUILD_NUMBER && docker push registry.com/myapp:$BUILD_NUMBER && kubectl set image deployment/myapp app=registry.com/myapp:$BUILD_NUMBER",
                "explanation": "Build image, scan for vulnerabilities, push to registry, and deploy to Kubernetes",
                "title": "docker && trivy && docker && docker && kubectl"
            },
            {
                "scenario": "Multi-stage deployment pipeline",
                "commands": "docker-compose -f docker-compose.test.yml run --rm tests && docker build -t myapp:staging . && kubectl apply -f k8s/staging/ && kubectl rollout status deployment/myapp -n staging",
                "explanation": "Run tests, build staging image, deploy to staging, and wait for rollout",
                "title": "docker && docker && kubectl && kubectl"
            }
        ],
        "relatedCommands": [
            {
                "name": "git",
                "relationship": "combo",
                "reason": "Git triggers and provides source code for CI/CD pipelines"
            },
            {
                "name": "make",
                "relationship": "combo",
                "reason": "Makefiles often orchestrate CI/CD pipeline steps"
            },
            {
                "name": "kubectl",
                "relationship": "combo",
                "reason": "Deploy containers to Kubernetes in CD pipelines"
            }
        ],
        "warnings": [
            "Docker-in-Docker can have security and performance implications",
            "Image layer caching strategies vary between CI/CD systems",
            "Secrets management in CI/CD requires careful security considerations"
        ],
        "manPageUrl": "https://docs.gitlab.com/ee/ci/docker/",
        "distroNotes": {}
    },
    {
        "name": "container-development-workflow",
        "standsFor": "Container Development Workflow",
        "description": "Container-based development workflows and debugging",
        "examples": [
            "docker run -it --rm -v $(pwd):/app -v /app/node_modules -p 3000:3000 -e NODE_ENV=development node:18 npm run dev  # Run development server with source code volume mount and live reload",
            "docker-compose -f docker-compose.yml -f docker-compose.override.yml up --build --force-recreate  # Start development environment with compose overrides and fresh build",
            "docker run -it --rm -v $(pwd):/workspace -v /var/run/docker.sock:/var/run/docker.sock --cap-add SYS_PTRACE mcr.microsoft.com/vscode/devcontainers/base:ubuntu  # Run VS Code dev container with Docker socket access for debugging",
            "docker-compose up -d db && docker-compose exec db psql -U postgres -c 'CREATE DATABASE testdb;' && docker-compose exec db psql -U postgres testdb < fixtures/test-data.sql  # Start database, create test database, and load fixture data",
            "docker stats --format 'table {{.Container}}\t{{.CPUPerc}}\t{{.MemUsage}}\t{{.NetIO}}\t{{.BlockIO}}' && docker exec myapp top -p 1  # Monitor container resource usage and internal process activity",
            "docker run -it --rm -v $(pwd)/src:/app/src -v $(pwd)/package.json:/app/package.json -p 8080:8080 --name dev-server myapp:dev npm run start:dev  # Start development server with selective file mounting for hot reloading",
            "echo --example-usage  # Simplified example for echo command"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "development",
        "safety": "dangerous",
        "syntaxPattern": "<workflow-command> [options]",
        "prerequisites": [
            "docker-compose"
        ],
        "commandCombinations": [
            {
                "scenario": "Full-stack development environment",
                "commands": "docker-compose up -d redis postgres && sleep 10 && docker-compose up --build api && docker-compose up --build frontend",
                "explanation": "Start supporting services, wait for readiness, then start application services",
                "title": "docker && sleep && docker && docker"
            },
            {
                "scenario": "Testing workflow with clean environment",
                "commands": "docker-compose down -v && docker-compose build --no-cache test && docker-compose run --rm test npm run test:integration && docker-compose down",
                "explanation": "Clean environment, rebuild test image, run integration tests, cleanup",
                "title": "docker && docker && docker && docker"
            }
        ],
        "relatedCommands": [
            {
                "name": "make",
                "relationship": "combo",
                "reason": "Makefiles often orchestrate container development workflows"
            }
        ],
        "warnings": [
            "File permissions can differ between host and container",
            "Volume mounts may not work consistently across different platforms",
            "Development containers should not be used in production"
        ],
        "manPageUrl": "https://code.visualstudio.com/docs/remote/containers",
        "distroNotes": {}
    },
    {
        "name": "container-registry-management",
        "standsFor": "Container Registry Management",
        "description": "Container registry operations and image management",
        "examples": [
            "docker buildx build --platform linux/amd64,linux/arm64 --push -t myuser/myapp:latest -t myuser/myapp:v1.0.0 .  # Build and push multi-architecture image with multiple tags",
            "docker login myregistry.com --username myuser && docker tag myapp:latest myregistry.com/myuser/myapp:latest && docker push myregistry.com/myuser/myapp:latest  # Login to private registry and push tagged image",
            "cosign generate-key-pair && cosign sign --key cosign.key myregistry.com/myapp:latest && cosign verify --key cosign.pub myregistry.com/myapp:latest  # Generate key pair, sign image, and verify signature",
            "curl -u admin:password -X POST 'https://harbor.example.com/api/v2.0/projects' -H 'Content-Type: application/json' -d '{\"project_name\":\"myproject\",\"public\":false}'  # Create private project in Harbor registry using API",
            "aws ecr create-repository --repository-name myapp && aws ecr put-lifecycle-policy --repository-name myapp --lifecycle-policy-text file://lifecycle-policy.json  # Create ECR repository and apply lifecycle policy for image cleanup",
            "skopeo copy docker://source-registry.com/myapp:latest docker://dest-registry.com/myapp:latest --dest-creds user:pass  # Copy image between registries without local Docker daemon",
            "echo --example-usage  # Simplified example for echo command"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "development",
        "safety": "caution",
        "syntaxPattern": "<registry-tool> <command> [options]",
        "prerequisites": [
            "docker-cli"
        ],
        "commandCombinations": [
            {
                "scenario": "Secure image promotion pipeline",
                "commands": "trivy image myapp:latest && cosign sign --key cosign.key myapp:latest && docker tag myapp:latest prod-registry.com/myapp:v1.0.0 && docker push prod-registry.com/myapp:v1.0.0",
                "explanation": "Scan image, sign it, retag for production registry, and push",
                "title": "trivy && cosign && docker && docker"
            },
            {
                "scenario": "Multi-registry synchronization",
                "commands": "skopeo sync --src docker --dest docker source-registry.com/myproject dest-registry.com/myproject --dest-creds user:pass && skopeo inspect docker://dest-registry.com/myproject/myapp:latest",
                "explanation": "Synchronize project images between registries and verify",
                "title": "skopeo && skopeo"
            }
        ],
        "relatedCommands": [
            {
                "name": "kubectl",
                "relationship": "combo",
                "reason": "Deploy images from registries to Kubernetes"
            }
        ],
        "warnings": [
            "Registry authentication tokens may expire and need renewal",
            "Multi-architecture builds require buildx or similar tools",
            "Image signing requires proper key management and distribution"
        ],
        "manPageUrl": "https://docs.docker.com/docker-hub/",
        "distroNotes": {}
    },
    {
        "name": "containerd",
        "standsFor": "container daemon",
        "description": "Industry-standard container runtime",
        "examples": [
            "ctr images list  # Show all container images managed by containerd",
            "ctr image pull docker.io/library/nginx:latest  # Download nginx image from Docker Hub",
            "ctr run --rm -t docker.io/library/ubuntu:latest mycontainer  # Start Ubuntu container with terminal",
            "ctr containers list  # Show all containers managed by containerd",
            "ctr images export nginx.tar docker.io/library/nginx:latest  # Export container image to tar file",
            "ctr images import nginx.tar  # Import container image from tar file",
            "echo --example-usage  # Simplified example for echo command"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "development",
        "safety": "dangerous",
        "syntaxPattern": "ctr [global-options] <command> [options]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Image management workflow",
                "commands": "ctr image pull alpine:latest && ctr images list | grep alpine",
                "explanation": "Pull image and verify it's available",
                "title": "ctr && ctr | grep"
            },
            {
                "scenario": "Container lifecycle",
                "commands": "ctr run -d alpine:latest myapp sleep 3600 && ctr containers list",
                "explanation": "Start container in background and list running containers",
                "title": "ctr && ctr"
            }
        ],
        "relatedCommands": [
            {
                "name": "docker",
                "relationship": "alternative",
                "reason": "Docker uses containerd as runtime engine"
            },
            {
                "name": "kubectl",
                "relationship": "combo",
                "reason": "Kubernetes uses containerd as container runtime"
            }
        ],
        "warnings": [
            "Lower-level tool, less user-friendly than Docker",
            "Requires understanding of OCI specifications",
            "Different namespaces for different use cases"
        ],
        "manPageUrl": "https://containerd.io/docs/",
        "distroNotes": {}
    },
    {
        "name": "crictl",
        "standsFor": "CRI control",
        "description": "CLI for CRI-compatible container runtimes (Kubernetes)",
        "examples": [
            "crictl pods  # Show all pods on Kubernetes node",
            "crictl ps  # Display running containers",
            "crictl logs container-id  # Show logs for specific container",
            "crictl exec -it container-id /bin/bash  # Open interactive shell in container",
            "crictl inspect container-id  # Show detailed container information",
            "crictl pull nginx:latest  # Download image to local container runtime",
            "crictl stats  # Display live resource usage statistics for containers"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "development",
        "safety": "safe",
        "syntaxPattern": "crictl [global-options] <command> [options]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Debug Kubernetes pod",
                "commands": "crictl pods | grep failing && crictl ps | grep failing && crictl logs container-id",
                "explanation": "Find failing pod, identify container, view logs",
                "title": "crictl | grep && crictl | grep && crictl"
            },
            {
                "scenario": "Node maintenance",
                "commands": "crictl images | grep '<none>' && crictl rmi $(crictl images -q --filter dangling=true)",
                "explanation": "Find and remove dangling images",
                "title": "crictl | grep < none > && crictl"
            }
        ],
        "relatedCommands": [
            {
                "name": "kubectl",
                "relationship": "similar",
                "reason": "kubectl manages Kubernetes, crictl manages container runtime"
            },
            {
                "name": "docker",
                "relationship": "similar",
                "reason": "Similar commands but for CRI runtime instead of Docker"
            },
            {
                "name": "podman",
                "relationship": "similar",
                "reason": "Different container runtime tools"
            }
        ],
        "warnings": [
            "Primarily for Kubernetes node debugging",
            "Requires CRI-compatible runtime (containerd, CRI-O)",
            "Lower-level than kubectl commands"
        ],
        "manPageUrl": "https://kubernetes.io/docs/tasks/debug-application-cluster/crictl/",
        "distroNotes": {}
    },
    {
        "name": "docker",
        "standsFor": "Docker",
        "description": "Container platform for building, sharing, and running applications",
        "examples": [
            "docker build -t myapp:latest .  # Builds Docker image from Dockerfile in current directory",
            "docker run -d -p 8080:80 myapp:latest  # Runs container in detached mode mapping port 8080 to 80",
            "docker ps  # Shows all currently running containers",
            "docker exec -it container_name bash  # Opens interactive bash shell in running container",
            "docker logs -f container_name  # Shows and follows log output from container",
            "echo --example-usage  # Simplified example for echo command"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "development",
        "safety": "safe",
        "syntaxPattern": "docker <command> [options] [arguments]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Build and run application",
                "commands": "docker build -t myapp . && docker run -d -p 8080:80 myapp",
                "explanation": "Builds image and immediately runs it with port mapping",
                "title": "docker && docker"
            },
            {
                "scenario": "Stop and remove all containers",
                "commands": "docker stop $(docker ps -q) && docker rm $(docker ps -aq)",
                "explanation": "Stops all running containers and removes all containers",
                "title": "docker && docker"
            },
            {
                "scenario": "Clean development environment",
                "commands": "docker stop $(docker ps -q) && docker system prune -f",
                "explanation": "Stop all containers and clean up resources",
                "title": "docker && docker"
            }
        ],
        "relatedCommands": [
            {
                "name": "docker-compose",
                "relationship": "orchestration",
                "reason": "Docker Compose orchestrates multi-container Docker applications"
            },
            {
                "name": "podman",
                "relationship": "alternative",
                "reason": "Podman provides similar container functionality without daemon"
            }
        ],
        "warnings": [
            "Docker daemon must be running to execute commands",
            "Images can become large without proper layer optimization",
            "Port conflicts can occur when multiple containers use same ports",
            "Container data is ephemeral unless volumes are used"
        ],
        "manPageUrl": "https://docs.docker.com/engine/install/",
        "distroNotes": {
            "linux": "Available through distribution repositories or Docker's APT/YUM repos",
            "windows": "Docker Desktop for Windows provides full functionality",
            "macos": "Docker Desktop for Mac provides full functionality"
        }
    },
    {
        "name": "docker-build-multistage",
        "standsFor": "Docker Multi-stage Build",
        "description": "Build Docker images using multi-stage builds for optimization",
        "examples": [
            "docker build --target production --build-arg NODE_ENV=production -t myapp:prod .  # Build specific stage with build arguments",
            "docker build --cache-from myapp:cache --build-arg BUILDKIT_INLINE_CACHE=1 -t myapp:latest .  # Build using cache from previous builds for faster builds",
            "docker build -t myapp https://github.com/user/repo.git#main  # Build image directly from Git repository",
            "docker build -f docker/Dockerfile.prod --target runtime -t myapp:runtime .  # Build using specific Dockerfile and target stage",
            "docker build --platform linux/amd64,linux/arm64 -t myapp:multiarch --push .  # Build multi-architecture image and push to registry",
            "docker build --secret id=api_key,src=./secrets/api.key -t myapp .  # Build with secure handling of secrets during build process",
            "echo --example-usage  # Simplified example for echo command"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "development",
        "safety": "safe",
        "syntaxPattern": "docker build [options] <path>",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Optimized production build pipeline",
                "commands": "docker build --target builder -t myapp:builder . && docker build --cache-from myapp:builder --target production -t myapp:prod .",
                "explanation": "Build and cache builder stage, then use it for optimized production build",
                "title": "docker && docker"
            },
            {
                "scenario": "Development vs production builds",
                "commands": "docker build --target development -t myapp:dev . && docker build --target production -t myapp:prod .",
                "explanation": "Build different targets for development and production environments",
                "title": "docker && docker"
            }
        ],
        "relatedCommands": [],
        "warnings": [
            "Multi-stage builds require Docker 17.05 or higher",
            "Build context size affects build speed and memory usage",
            "Layer caching behavior differs between local and CI environments"
        ],
        "manPageUrl": "https://docs.docker.com/engine/reference/commandline/build/",
        "distroNotes": {}
    },
    {
        "name": "docker-compose",
        "standsFor": "Docker Compose",
        "description": "Define and run multi-container Docker applications",
        "examples": [
            "docker-compose up  # Start all services defined in docker-compose.yml",
            "docker-compose up -d  # Start services in detached mode (background)",
            "docker-compose down  # Stop and remove containers, networks, and volumes",
            "docker-compose logs -f web  # Follow logs for specific service in real-time",
            "docker-compose up --scale web=3  # Run 3 instances of web service",
            "docker-compose up --build  # Rebuild images and start services",
            "docker-compose exec web bash  # Open bash shell in running web service container",
            "echo --example-usage  # Simplified example for echo command"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "development",
        "safety": "safe",
        "syntaxPattern": "docker-compose [options] [command]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Development environment setup",
                "commands": "docker-compose build && docker-compose up -d && docker-compose logs -f",
                "explanation": "Build images, start in background, then follow logs",
                "title": "docker && docker && docker"
            },
            {
                "scenario": "Clean restart with fresh data",
                "commands": "docker-compose down -v && docker-compose up --build",
                "explanation": "Stop and remove volumes, then rebuild and start",
                "title": "docker && docker"
            }
        ],
        "relatedCommands": [
            {
                "name": "docker",
                "relationship": "combo",
                "reason": "Docker Compose orchestrates Docker containers"
            },
            {
                "name": "kubectl",
                "relationship": "similar",
                "reason": "Both orchestrate containerized applications"
            }
        ],
        "warnings": [
            "Requires docker-compose.yml file in current directory",
            "Service names in compose file become network hostnames",
            "Volume mounts can have permission issues on some systems"
        ],
        "manPageUrl": "https://docs.docker.com/compose/",
        "distroNotes": {}
    },
    {
        "name": "docker-compose-production",
        "standsFor": "Docker Compose Production",
        "description": "Docker Compose for production deployments and scaling",
        "examples": [
            "docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d  # Deploy using base config with production overrides",
            "docker-compose up -d --no-deps --scale web=3 --remove-orphans web  # Update web service with 3 replicas without affecting dependencies",
            "docker-compose up -d --wait --wait-timeout 300  # Start services and wait for health checks to pass with timeout",
            "docker-compose up -d --scale web=3 --scale worker=2 --compatibility  # Scale multiple services with Docker Swarm compatibility mode",
            "docker-compose -f docker-compose.yml -f docker-compose.prod.yml config --resolve-image-digests  # Validate and display final configuration with image digests",
            "docker-compose down --timeout 30 --remove-orphans  # Gracefully stop services with 30-second timeout",
            "echo --example-usage  # Simplified example for echo command"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "development",
        "safety": "safe",
        "syntaxPattern": "docker-compose [options] <command>",
        "prerequisites": [
            "docker-compose"
        ],
        "commandCombinations": [
            {
                "scenario": "Blue-green deployment simulation",
                "commands": "docker-compose -p blue up -d && docker-compose -p green -f docker-compose.yml -f docker-compose.green.yml up -d && docker-compose -p blue down",
                "explanation": "Deploy green version, then remove blue version for zero-downtime deployment",
                "title": "docker && docker && docker"
            },
            {
                "scenario": "Database migration workflow",
                "commands": "docker-compose up -d db && docker-compose run --rm migrate && docker-compose up -d web",
                "explanation": "Start database, run migrations, then start web services",
                "title": "docker && docker && docker"
            }
        ],
        "relatedCommands": [],
        "warnings": [
            "Compose v2 has different behavior than v1 in some scenarios",
            "Resource limits in Compose files may not be enforced without Swarm mode",
            "Network isolation differs between Compose and production orchestrators"
        ],
        "manPageUrl": "https://docs.docker.com/compose/",
        "distroNotes": {}
    },
    {
        "name": "docker-network-advanced",
        "standsFor": "Docker Network Management",
        "description": "Advanced Docker networking for container communication",
        "examples": [
            "docker network create --driver bridge --subnet=172.20.0.0/16 --ip-range=172.20.240.0/20 my-network  # Create custom bridge network with specific subnet and IP range",
            "docker network create --driver overlay --attachable --subnet=10.10.0.0/16 swarm-network  # Create overlay network for Docker Swarm with custom subnet",
            "docker network connect --ip=172.20.0.100 my-network my-container  # Connect running container to network with specific IP address",
            "docker network create --driver bridge --opt com.docker.network.bridge.name=custom0 --dns=8.8.8.8 custom-net  # Create network with custom bridge name and DNS settings",
            "docker network inspect --format='{{json .IPAM.Config}}' my-network  # Inspect network IPAM configuration in JSON format",
            "docker network create -d macvlan --subnet=192.168.1.0/24 --gateway=192.168.1.1 -o parent=eth0 pub-net  # Create macvlan network for containers to appear on physical network",
            "echo --example-usage  # Simplified example for echo command"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "development",
        "safety": "dangerous",
        "syntaxPattern": "docker network <command> [options]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Multi-tier application networking",
                "commands": "docker network create frontend && docker network create backend && docker run -d --network frontend --name web nginx && docker run -d --network backend --name db postgres && docker network connect backend web",
                "explanation": "Create separate networks for tiers and connect web server to both",
                "title": "docker && docker && docker && docker && docker"
            },
            {
                "scenario": "Network troubleshooting",
                "commands": "docker network ls && docker network inspect bridge && docker run --rm --network container:web nicolaka/netshoot",
                "explanation": "List networks, inspect default bridge, and run network troubleshooting container",
                "title": "docker && docker && docker"
            }
        ],
        "relatedCommands": [
            {
                "name": "iptables",
                "relationship": "underlying",
                "reason": "Docker networking uses iptables for traffic management"
            }
        ],
        "warnings": [
            "Custom networks provide automatic DNS resolution between containers",
            "Overlay networks require Docker Swarm mode or external key-value store",
            "Network drivers have different capabilities and limitations"
        ],
        "manPageUrl": "https://docs.docker.com/engine/reference/commandline/network/",
        "distroNotes": {}
    },
    {
        "name": "docker-run-advanced",
        "standsFor": "Docker Run with Advanced Options",
        "description": "Run Docker containers with advanced configuration options",
        "examples": [
            "docker run --memory=2g --cpus=1.5 --name myapp nginx  # Start container with 2GB RAM and 1.5 CPU core limits",
            "docker run -d -v /host/data:/app/data -e NODE_ENV=production --restart=unless-stopped node:18  # Run container with persistent volume, environment variable, and restart policy",
            "docker run -d --network=my-network --ip=172.18.0.100 --hostname=web-server nginx  # Run container on custom network with specific IP and hostname",
            "docker run --user=1000:1000 --read-only --security-opt=no-new-privileges alpine  # Run container as non-root user with read-only filesystem and security restrictions",
            "docker run -d --health-cmd='curl -f http://localhost:8080/health' --health-interval=30s nginx  # Run container with custom health check every 30 seconds",
            "docker run -d --tmpfs /tmp:noexec,nosuid,size=100m nginx  # Run container with temporary filesystem mount with restrictions",
            "docker run -it --device=/dev/snd --group-add audio ubuntu  # Run container with access to sound devices and audio group",
            "echo --example-usage  # Simplified example for echo command"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "development",
        "safety": "caution",
        "syntaxPattern": "docker run [options] <image> [command]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Production web application deployment",
                "commands": "docker run -d --name web-app --memory=4g --cpus=2 --restart=always -p 80:8080 -v /var/log/app:/app/logs -e NODE_ENV=production myapp:latest",
                "explanation": "Deploy production container with resource limits, logging, and restart policy",
                "title": "docker"
            },
            {
                "scenario": "Database container with persistence",
                "commands": "docker run -d --name postgres-db --memory=2g -v postgres-data:/var/lib/postgresql/data -e POSTGRES_PASSWORD=secret --restart=unless-stopped postgres:14",
                "explanation": "Run database container with persistent storage and memory limits",
                "title": "docker"
            }
        ],
        "relatedCommands": [],
        "warnings": [
            "Resource limits only work on supported Docker engines",
            "Volume mounts can have permission issues across different host systems",
            "Network settings may conflict with existing Docker networks"
        ],
        "manPageUrl": "https://docs.docker.com/engine/reference/commandline/run/",
        "distroNotes": {}
    },
    {
        "name": "docker-swarm-orchestration",
        "standsFor": "Docker Swarm Orchestration",
        "description": "Docker Swarm cluster orchestration and management",
        "examples": [
            "docker swarm init --advertise-addr 192.168.1.100 --listen-addr 0.0.0.0:2377  # Initialize Swarm manager with specific advertise and listen addresses",
            "docker service create --name web --replicas 3 --update-parallelism 1 --update-delay 10s --restart-condition on-failure nginx  # Create service with rolling update configuration and restart policy",
            "docker stack deploy -c docker-compose.yml --with-registry-auth myapp  # Deploy application stack with registry authentication",
            "docker service scale web=5 api=3 worker=2  # Scale multiple services simultaneously",
            "docker service create --constraint 'node.role==worker' --constraint 'node.labels.zone==us-west' nginx  # Create service with node placement constraints",
            "docker service update --image nginx:1.21 --health-cmd 'curl -f http://localhost/' --health-interval 30s web  # Update service image with health check configuration",
            "echo --example-usage  # Simplified example for echo command"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "development",
        "safety": "caution",
        "syntaxPattern": "docker swarm|service|stack <command> [options]",
        "prerequisites": [
            "docker-engine"
        ],
        "commandCombinations": [
            {
                "scenario": "High availability setup",
                "commands": "docker swarm init --advertise-addr $(hostname -I | cut -d' ' -f1) && docker node update --availability drain $(hostname) && docker service create --replicas 3 --constraint 'node.role==worker' nginx",
                "explanation": "Initialize Swarm, drain manager, and deploy service on workers only",
                "title": "docker | cut && docker && docker"
            },
            {
                "scenario": "Service monitoring and debugging",
                "commands": "docker service ls && docker service ps web --no-trunc && docker service logs -f web",
                "explanation": "List services, inspect service tasks, and follow service logs",
                "title": "docker && docker && docker"
            }
        ],
        "relatedCommands": [
            {
                "name": "kubectl",
                "relationship": "similar",
                "reason": "Kubernetes provides similar orchestration capabilities"
            },
            {
                "name": "docker-compose",
                "relationship": "combo",
                "reason": "Compose files can be deployed as Swarm stacks"
            }
        ],
        "warnings": [
            "Swarm mode changes Docker daemon behavior significantly",
            "Ingress network can cause port conflicts on overlay networks",
            "Rolling updates may cause temporary service unavailability"
        ],
        "manPageUrl": "https://docs.docker.com/engine/swarm/",
        "distroNotes": {}
    },
    {
        "name": "docker-volume-management",
        "standsFor": "Docker Volume Management",
        "description": "Advanced Docker volume and data management",
        "examples": [
            "docker volume create --driver local --opt type=tmpfs --opt device=tmpfs --opt o=size=100m temp-volume  # Create temporary volume in memory with size limit",
            "docker volume create --driver local --opt type=nfs --opt o=addr=192.168.1.100,rw --opt device=:/path/to/dir nfs-volume  # Create volume backed by NFS share",
            "docker run --rm -v postgres-data:/data -v $(pwd):/backup alpine tar czf /backup/postgres-backup.tar.gz -C /data .  # Create compressed backup of volume data",
            "docker run --rm -v postgres-data:/data -v $(pwd):/backup alpine tar xzf /backup/postgres-backup.tar.gz -C /data  # Restore volume data from compressed backup",
            "docker run --rm -v source-volume:/source -v target-volume:/target alpine cp -a /source/. /target/  # Copy all data from source volume to target volume",
            "docker volume inspect --format='{{.Mountpoint}}' my-volume  # Get the host filesystem path of a Docker volume",
            "echo --example-usage  # Simplified example for echo command"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "development",
        "safety": "dangerous",
        "syntaxPattern": "docker volume <command> [options]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Database volume management",
                "commands": "docker volume create postgres-data && docker run -d -v postgres-data:/var/lib/postgresql/data postgres:14 && docker volume inspect postgres-data",
                "explanation": "Create volume, use it with database container, and inspect configuration",
                "title": "docker && docker && docker"
            },
            {
                "scenario": "Volume cleanup and maintenance",
                "commands": "docker volume ls -f dangling=true && docker volume prune -f && docker system df",
                "explanation": "List dangling volumes, remove them, and check disk usage",
                "title": "docker && docker && docker"
            }
        ],
        "relatedCommands": [
            {
                "name": "rsync",
                "relationship": "alternative",
                "reason": "Alternative for syncing data between volumes"
            }
        ],
        "warnings": [
            "Anonymous volumes are created automatically but hard to manage",
            "Volume drivers may have specific requirements and limitations",
            "Volume data persists even after container removal unless explicitly deleted"
        ],
        "manPageUrl": "https://docs.docker.com/engine/reference/commandline/volume/",
        "distroNotes": {}
    },
    {
        "name": "flux",
        "standsFor": "Flux v2",
        "description": "GitOps toolkit for Kubernetes (Flux v2)",
        "examples": [
            "flux bootstrap github --owner=myuser --repository=fleet-infra --branch=main --path=./clusters/my-cluster --personal  # Install Flux and configure Git repository for GitOps",
            "flux check  # Verify Flux installation and component health",
            "flux create source git webapp --url=https://github.com/user/webapp --branch=main --interval=30s  # Create Git source for application manifests",
            "flux create kustomization webapp --target-namespace=default --source=webapp --path='./deploy' --prune=true --interval=5m  # Create Kustomization to deploy application from Git source",
            "flux reconcile source git webapp  # Force immediate reconciliation of Git source",
            "flux get all  # List all Flux resources and their status",
            "flux suspend kustomization webapp  # Temporarily stop automated deployments",
            "flux resume kustomization webapp  # Re-enable automated deployments",
            "flux bootstrap github --owner=enterprise-org --repository=k8s-fleet-management --branch=main --path=clusters/production --personal=false --team=platform-engineering && flux create source git enterprise-apps --url=https://github.com/enterprise-org/applications --branch=main --secret-ref=git-auth && flux create kustomization production-apps --source=enterprise-apps --path='./environments/production' --target-namespace=production --prune=true --interval=5m && kubectl get gitrepository,kustomization -A && echo 'Enterprise GitOps infrastructure: organizational Git integration, team-based access control, multi-environment application deployment, automated reconciliation, and comprehensive cluster management for enterprise Kubernetes operations'  # Enterprise GitOps cluster management"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "development",
        "safety": "safe",
        "syntaxPattern": "flux [command] [options]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Complete GitOps setup",
                "commands": "flux check --pre && flux bootstrap github --owner=myorg --repository=fleet-infra --branch=main --path=clusters/production",
                "explanation": "Check prerequisites and bootstrap Flux with GitHub",
                "title": "flux && flux"
            },
            {
                "scenario": "Application deployment setup",
                "commands": "flux create source git myapp --url=https://github.com/user/myapp --branch=main && flux create kustomization myapp --source=myapp --path='./k8s' --target-namespace=production",
                "explanation": "Create Git source and Kustomization for application deployment",
                "title": "flux && flux"
            }
        ],
        "relatedCommands": [
            {
                "name": "kubectl",
                "relationship": "combo",
                "reason": "Flux v2 extends Kubernetes with custom resources"
            },
            {
                "name": "kustomize",
                "relationship": "combo",
                "reason": "Flux v2 uses Kustomize for manifest transformations"
            }
        ],
        "warnings": [
            "Flux v2 is complete rewrite of Flux v1 with different architecture",
            "Git repository structure important for proper source detection",
            "RBAC permissions required for cross-namespace deployments",
            "Image automation requires separate image reflector and automation controllers"
        ],
        "manPageUrl": "https://fluxcd.io/flux/cmd/",
        "distroNotes": {}
    },
    {
        "name": "fluxctl",
        "standsFor": "Flux Control",
        "description": "GitOps toolkit for continuous delivery to Kubernetes",
        "examples": [
            "fluxctl list-workloads  # Show all workloads managed by Flux",
            "fluxctl sync --k8s-fwd-ns flux-system  # Force synchronization with Git repository",
            "fluxctl list-workloads --k8s-fwd-ns=flux && fluxctl list-images --k8s-fwd-ns=flux | grep -E '(production|staging)' && fluxctl automate --k8s-fwd-ns=flux --workload=production:deployment/web-app && kubectl get pods -n production -o wide && kubectl get events -n production --sort-by='.lastTimestamp' | tail -10 && echo 'Enterprise Flux v1 operations: workload inventory, image tracking across environments, automated deployment policies, production service validation, and event monitoring for legacy GitOps cluster management'  # Enterprise Flux v1 deployment monitoring",
            "fluxctl release --workload=default:deployment/myapp --update-image=myapp:v2.0.0  # Update application to new container image version",
            "fluxctl sync-status  # Display current synchronization status",
            "fluxctl lock --workload=default:deployment/myapp  # Prevent automated updates for specific workload",
            "fluxctl unlock --workload=default:deployment/myapp  # Re-enable automated updates for workload",
            "fluxctl list-images --workload=default:deployment/myapp  # Show available container image versions",
            "fluxctl automate --workload=default:deployment/myapp  # Enable automated deployments for workload"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "development",
        "safety": "safe",
        "syntaxPattern": "fluxctl [command] [options]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Emergency deployment workflow",
                "commands": "fluxctl release --workload=default:deployment/myapp --update-image=myapp:hotfix-v1.2.1 && fluxctl sync",
                "explanation": "Deploy hotfix image and force Git synchronization",
                "title": "fluxctl && fluxctl"
            },
            {
                "scenario": "Maintenance mode",
                "commands": "fluxctl list-workloads | grep myapp | xargs fluxctl lock",
                "explanation": "Lock all workloads matching pattern to prevent updates",
                "title": "fluxctl | grep | xargs"
            }
        ],
        "relatedCommands": [
            {
                "name": "kubectl",
                "relationship": "combo",
                "reason": "Flux operates on Kubernetes using kubectl"
            },
            {
                "name": "git",
                "relationship": "combo",
                "reason": "Flux synchronizes with Git repositories"
            }
        ],
        "warnings": [
            "Flux v2 uses different CLI (flux) than Flux v1 (fluxctl)",
            "Git repository must be accessible from cluster",
            "Automated deployments follow semver policies",
            "Image scanning requires registry access configuration"
        ],
        "manPageUrl": "https://fluxcd.io/legacy/flux/references/fluxctl/",
        "distroNotes": {}
    },
    {
        "name": "k9s",
        "standsFor": "K9s",
        "description": "Terminal-based UI for interacting with Kubernetes clusters",
        "examples": [
            "k9s  # Start interactive Kubernetes cluster dashboard",
            "k9s --context production-cluster  # Launch K9s with specific kubectl context",
            "k9s --namespace kube-system  # Open K9s focused on kube-system namespace",
            "k9s --readonly  # Launch K9s in read-only mode to prevent accidental changes",
            "k9s --config /path/to/config.yml  # Use custom K9s configuration file",
            "k9s --logLevel debug  # Run K9s with debug logging enabled",
            "k9s --headless --command 'pods'  # Run K9s command without interactive UI",
            "k9s --context production-cluster --namespace monitoring --crumbsless --screen-dump-dir /tmp/k9s-dumps  # Professional cluster monitoring with automated screenshots"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "development",
        "safety": "safe",
        "syntaxPattern": "k9s [options]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Multi-cluster monitoring setup",
                "commands": "kubectl config get-contexts && k9s --context cluster1",
                "explanation": "List available contexts then connect to specific cluster",
                "title": "kubectl && k9s"
            },
            {
                "scenario": "Production monitoring",
                "commands": "k9s --context production --namespace monitoring --readonly",
                "explanation": "Safe monitoring of production cluster in read-only mode",
                "title": "k9s"
            }
        ],
        "relatedCommands": [
            {
                "name": "kubectl",
                "relationship": "alternative",
                "reason": "K9s provides UI alternative to kubectl commands"
            }
        ],
        "warnings": [
            "Requires kubeconfig access to clusters",
            "Keyboard shortcuts different from standard terminal applications",
            "Resource deletion operations are permanent",
            "Plugin system allows custom commands and views"
        ],
        "manPageUrl": "https://k9scli.io/",
        "distroNotes": {}
    },
    {
        "name": "kubectl",
        "standsFor": "Kube Control",
        "description": "Kubernetes command-line tool for cluster management",
        "examples": [
            "kubectl cluster-info  # Display cluster endpoints and services",
            "kubectl get pods  # Show pods in default namespace",
            "kubectl describe pod nginx-pod  # Show detailed information about specific pod",
            "kubectl create deployment nginx --image=nginx:latest  # Deploy nginx container to cluster",
            "kubectl scale deployment nginx --replicas=3  # Scale nginx deployment to 3 replicas",
            "kubectl logs nginx-pod -f  # Follow logs from nginx pod",
            "kubectl exec -it nginx-pod -- /bin/bash  # Open interactive shell in running pod",
            "kubectl apply -f deployment.yaml  # Apply YAML configuration to cluster",
            "kubectl port-forward nginx-pod 8080:80  # Forward local port 8080 to pod port 80",
            "kubectl delete deployment nginx  # Remove nginx deployment and associated pods",
            "kubectl create secret generic app-secrets --from-literal=db-user=admin --from-literal=db-password='secure123' --dry-run=client -o yaml | kubectl apply -f -  # Create secrets from literals with YAML preview and application"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "development",
        "safety": "dangerous",
        "syntaxPattern": "kubectl [command] [type] [name] [options]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Application deployment workflow",
                "commands": "kubectl create deployment myapp --image=myapp:v1 && kubectl expose deployment myapp --port=80 --type=LoadBalancer && kubectl get svc",
                "explanation": "Deploy app, expose as service, check service status",
                "title": "kubectl && kubectl && kubectl"
            },
            {
                "scenario": "Troubleshooting pod issues",
                "commands": "kubectl get pods && kubectl describe pod failing-pod && kubectl logs failing-pod --previous",
                "explanation": "List pods, get details, check previous container logs",
                "title": "kubectl && kubectl && kubectl"
            },
            {
                "scenario": "Rollout new version and check status",
                "commands": "kubectl set image deployment/myapp container=myapp:v2 && kubectl rollout status deployment/myapp",
                "explanation": "Updates deployment image and monitors rollout progress",
                "title": "kubectl && kubectl"
            }
        ],
        "relatedCommands": [
            {
                "name": "docker",
                "relationship": "combo",
                "reason": "Kubernetes orchestrates Docker containers"
            },
            {
                "name": "helm",
                "relationship": "combo",
                "reason": "Helm package manager uses kubectl"
            },
            {
                "name": "terraform",
                "relationship": "complement",
                "reason": "Terraform can provision Kubernetes clusters"
            }
        ],
        "warnings": [
            "Requires kubeconfig file for cluster access",
            "Context determines which cluster/namespace",
            "Resource changes can affect running applications",
            "RBAC permissions may restrict certain operations",
            "Resource names must be unique within their namespace",
            "Some operations may take time to propagate across cluster"
        ],
        "manPageUrl": "https://kubernetes.io/docs/reference/kubectl/",
        "distroNotes": {
            "linux": "Available through package managers or direct download",
            "windows": "Available through Chocolatey or direct download",
            "macos": "Available through Homebrew or direct download"
        }
    },
    {
        "name": "kubectl-cluster-management",
        "standsFor": "Kubernetes Control",
        "description": "Kubernetes cluster administration and management",
        "examples": [
            "kubectl cluster-info dump --output-directory=/tmp/cluster-state  # Dump complete cluster state information for debugging",
            "kubectl label nodes worker-1 node-role.kubernetes.io/worker= zone=us-west-1  # Label node with role and zone for workload placement",
            "kubectl create quota dev-quota --hard=cpu=10,memory=20Gi,pods=10 -n development  # Create resource quota for development namespace",
            "kubectl drain worker-1 --ignore-daemonsets --delete-emptydir-data --force --grace-period=300  # Safely drain node for maintenance with extended grace period",
            "kubectl create token admin --duration=8760h --namespace=kube-system  # Create long-lived service account token for admin access",
            "kubectl apply -f crd.yaml && kubectl get crd myresource.example.com -o yaml  # Apply custom resource definition and inspect its configuration",
            "kubectl create clusterrolebinding admin-binding --clusterrole=cluster-admin --serviceaccount=kube-system:admin-user --dry-run=client -o yaml > rbac.yaml  # Generate RBAC configuration for service account with cluster admin privileges"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "development",
        "safety": "dangerous",
        "syntaxPattern": "kubectl [options] <command> [flags]",
        "prerequisites": [
            "kubernetes-cluster"
        ],
        "commandCombinations": [
            {
                "scenario": "Cluster upgrade preparation",
                "commands": "kubectl get nodes -o wide && kubectl drain --all --ignore-daemonsets --delete-emptydir-data && kubectl get pods --all-namespaces | grep -v Running",
                "explanation": "Check node status, drain all nodes, and verify no running pods",
                "title": "kubectl && kubectl && kubectl | grep"
            },
            {
                "scenario": "Troubleshooting cluster issues",
                "commands": "kubectl get events --sort-by='.metadata.creationTimestamp' && kubectl top nodes && kubectl describe nodes | grep -A 5 Conditions",
                "explanation": "Get recent events, check resource usage, and inspect node conditions",
                "title": "kubectl && kubectl && kubectl | grep"
            }
        ],
        "relatedCommands": [
            {
                "name": "helm",
                "relationship": "combo",
                "reason": "Helm uses kubectl for deploying packages to Kubernetes"
            },
            {
                "name": "docker",
                "relationship": "underlying",
                "reason": "Kubernetes orchestrates Docker containers"
            }
        ],
        "warnings": [
            "kubectl context determines which cluster commands affect",
            "Resource deletions may hang if finalizers are not properly handled",
            "Some operations require cluster-admin privileges"
        ],
        "manPageUrl": "https://kubernetes.io/docs/reference/kubectl/",
        "distroNotes": {}
    },
    {
        "name": "kubectl-storage-management",
        "standsFor": "Kubernetes Storage Management",
        "description": "Kubernetes persistent storage and volume management",
        "examples": [
            "kubectl apply -f - <<EOF\napiVersion: v1\nkind: PersistentVolume\nmetadata:\n  name: nfs-pv\nspec:\n  capacity:\n    storage: 10Gi\n  accessModes:\n    - ReadWriteMany\n  nfs:\n    server: nfs-server.example.com\n    path: /data\nEOF  # Create NFS-backed persistent volume with ReadWriteMany access",
            "kubectl apply -f - <<EOF\napiVersion: storage.k8s.io/v1\nkind: StorageClass\nmetadata:\n  name: fast-ssd\nprovisioner: kubernetes.io/aws-ebs\nparameters:\n  type: gp3\n  encrypted: 'true'\nallowVolumeExpansion: true\nvolumeBindingMode: WaitForFirstConsumer\nEOF  # Create storage class for encrypted SSD volumes with delayed binding",
            "kubectl create -f - <<EOF\napiVersion: apps/v1\nkind: StatefulSet\nmetadata:\n  name: web\nspec:\n  serviceName: web\n  replicas: 3\n  template:\n    spec:\n      containers:\n      - name: nginx\n        image: nginx\n        volumeMounts:\n        - name: data\n          mountPath: /usr/share/nginx/html\n  volumeClaimTemplates:\n  - metadata:\n      name: data\n    spec:\n      accessModes: [ReadWriteOnce]\n      storageClassName: fast-ssd\n      resources:\n        requests:\n          storage: 1Gi\nEOF  # Create StatefulSet with persistent volume claim templates",
            "kubectl patch pvc data-web-0 -p '{\"spec\":{\"resources\":{\"requests\":{\"storage\":\"5Gi\"}}}}'  # Expand persistent volume claim from 1Gi to 5Gi",
            "kubectl apply -f - <<EOF\napiVersion: snapshot.storage.k8s.io/v1\nkind: VolumeSnapshot\nmetadata:\n  name: data-snapshot\nspec:\n  volumeSnapshotClassName: csi-snapclass\n  source:\n    persistentVolumeClaimName: data-web-0\nEOF  # Create volume snapshot of persistent volume claim",
            "kubectl describe pv && kubectl describe pvc && kubectl get events --sort-by=.metadata.creationTimestamp | grep -i volume  # Inspect persistent volumes, claims, and related events",
            "kubectl apply -f - <<EOF\napiVersion: apps/v1\nkind: StatefulSet\nmetadata:\n  name: database-cluster\nspec:\n  replicas: 3\n  serviceName: database\n  volumeClaimTemplates:\n  - metadata:\n      name: data\n    spec:\n      accessModes: [ReadWriteOnce]\n      storageClassName: fast-ssd\n      resources:\n        requests:\n          storage: 50Gi\nEOF && kubectl wait --for=condition=ready pod -l app=database-cluster --timeout=300s  # Deploy StatefulSet with persistent storage and wait for readiness"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "development",
        "safety": "safe",
        "syntaxPattern": "kubectl <storage-command> [options]",
        "prerequisites": [
            "kubernetes-cluster"
        ],
        "commandCombinations": [
            {
                "scenario": "Database backup with snapshots",
                "commands": "kubectl exec db-0 -- pg_dump -U postgres mydb > /tmp/backup.sql && kubectl apply -f volume-snapshot.yaml && kubectl wait --for=condition=ReadyToUse volumesnapshot/db-snapshot",
                "explanation": "Create database backup and volume snapshot, wait for completion",
                "title": "kubectl > && kubectl && kubectl"
            },
            {
                "scenario": "Storage migration workflow",
                "commands": "kubectl create pvc new-storage --storageclass=fast-ssd --size=10Gi && kubectl create job migrate-data --image=busybox -- sh -c 'cp -r /old-data/* /new-data/' && kubectl patch deployment app -p '{\"spec\":{\"template\":{\"spec\":{\"volumes\":[{\"name\":\"data\",\"persistentVolumeClaim\":{\"claimName\":\"new-storage\"}}]}}}}'",
                "explanation": "Create new PVC, migrate data, and update deployment to use new storage",
                "title": "kubectl && kubectl && kubectl"
            }
        ],
        "relatedCommands": [
            {
                "name": "lvm",
                "relationship": "underlying",
                "reason": "Some storage providers use LVM for volume management"
            },
            {
                "name": "rsync",
                "relationship": "combo",
                "reason": "Can be used for data migration between volumes"
            }
        ],
        "warnings": [
            "Volume expansion requires storage class to support it",
            "ReadWriteOnce volumes can only be mounted by one node",
            "Persistent volumes have reclaim policies that affect data retention"
        ],
        "manPageUrl": "https://kubernetes.io/docs/concepts/storage/",
        "distroNotes": {}
    },
    {
        "name": "kubectl-workload-management",
        "standsFor": "Kubernetes Workload Management",
        "description": "Kubernetes workload deployment and management",
        "examples": [
            "kubectl create deployment web --image=nginx:1.21 --replicas=3 --port=80 && kubectl annotate deployment web deployment.kubernetes.io/revision=1  # Create deployment with specific configuration and annotations",
            "kubectl patch deployment web -p '{\"spec\":{\"strategy\":{\"rollingUpdate\":{\"maxSurge\":1,\"maxUnavailable\":0}}}}'  # Configure rolling update strategy to maintain availability",
            "kubectl autoscale deployment web --min=2 --max=10 --cpu-percent=70  # Create HPA to scale deployment based on CPU utilization",
            "kubectl create pdb web-pdb --selector=app=web --min-available=2  # Create pod disruption budget to ensure minimum availability",
            "kubectl create job data-migration --image=migrator:latest -- /scripts/migrate.sh && kubectl wait --for=condition=complete job/data-migration --timeout=600s  # Create job and wait for completion with timeout",
            "kubectl create cronjob backup --image=backup-tool --schedule='0 2 * * *' -- /scripts/backup.sh  # Create scheduled job that runs daily at 2 AM",
            "kubectl create deployment webapp --image=nginx:1.21 --replicas=5 && kubectl set resources deployment webapp --requests=cpu=100m,memory=128Mi --limits=cpu=500m,memory=512Mi && kubectl autoscale deployment webapp --min=3 --max=20 --cpu-percent=70 && kubectl create pdb webapp-pdb --selector=app=webapp --max-unavailable=1  # Deploy production workload with resource limits, HPA scaling, and disruption budget"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "development",
        "safety": "safe",
        "syntaxPattern": "kubectl <resource-type> <command> [options]",
        "prerequisites": [
            "kubernetes-cluster"
        ],
        "commandCombinations": [
            {
                "scenario": "Blue-green deployment pattern",
                "commands": "kubectl create deployment blue --image=app:v1 && kubectl create deployment green --image=app:v2 && kubectl patch service web -p '{\"spec\":{\"selector\":{\"version\":\"green\"}}}'",
                "explanation": "Deploy two versions and switch service selector for blue-green deployment",
                "title": "kubectl && kubectl && kubectl"
            },
            {
                "scenario": "Canary deployment with traffic splitting",
                "commands": "kubectl scale deployment web-v1 --replicas=7 && kubectl scale deployment web-v2 --replicas=3 && kubectl get pods -l app=web",
                "explanation": "Scale deployments to achieve 70/30 traffic split for canary testing",
                "title": "kubectl && kubectl && kubectl"
            }
        ],
        "relatedCommands": [
            {
                "name": "helm",
                "relationship": "alternative",
                "reason": "Helm provides templated deployment management"
            },
            {
                "name": "kustomize",
                "relationship": "combo",
                "reason": "Kustomize customizes Kubernetes manifests"
            },
            {
                "name": "docker",
                "relationship": "underlying",
                "reason": "Workloads run containerized applications"
            }
        ],
        "warnings": [
            "Deployment rollbacks only keep limited revision history",
            "Resource requests and limits affect scheduling and QoS",
            "Pod security policies may prevent certain workload configurations"
        ],
        "manPageUrl": "https://kubernetes.io/docs/concepts/workloads/",
        "distroNotes": {}
    },
    {
        "name": "kubernetes-advanced-scheduling",
        "standsFor": "Kubernetes Advanced Scheduling",
        "description": "Advanced Kubernetes scheduling and resource management",
        "examples": [
            "kubectl apply -f - <<EOF\napiVersion: v1\nkind: Pod\nmetadata:\n  name: web-server\nspec:\n  affinity:\n    podAffinity:\n      requiredDuringSchedulingIgnoredDuringExecution:\n      - labelSelector:\n          matchExpressions:\n          - key: app\n            operator: In\n            values:\n            - database\n        topologyKey: kubernetes.io/hostname\n    podAntiAffinity:\n      preferredDuringSchedulingIgnoredDuringExecution:\n      - weight: 100\n        podAffinityTerm:\n          labelSelector:\n            matchExpressions:\n            - key: app\n              operator: In\n              values:\n              - web-server\n          topologyKey: kubernetes.io/hostname\n  containers:\n  - name: web\n    image: nginx\nEOF  # Create pod with affinity to database pods and anti-affinity to other web servers",
            "kubectl taint nodes worker-1 gpu=true:NoSchedule && kubectl label nodes worker-1 hardware=gpu && kubectl apply -f - <<EOF\napiVersion: v1\nkind: Pod\nmetadata:\n  name: gpu-workload\nspec:\n  nodeSelector:\n    hardware: gpu\n  tolerations:\n  - key: gpu\n    operator: Equal\n    value: 'true'\n    effect: NoSchedule\n  containers:\n  - name: ml-training\n    image: tensorflow/tensorflow:latest-gpu\nEOF  # Taint node for GPU workloads, label it, and schedule pod with appropriate tolerations",
            "kubectl apply -f - <<EOF\napiVersion: scheduling.k8s.io/v1\nkind: PriorityClass\nmetadata:\n  name: high-priority\nvalue: 1000000\nglobalDefault: false\ndescription: High priority class for critical workloads\n---\napiVersion: v1\nkind: Pod\nmetadata:\n  name: critical-app\nspec:\n  priorityClassName: high-priority\n  containers:\n  - name: app\n    image: nginx\nEOF  # Create high priority class and schedule pod with priority for preemption",
            "kubectl create namespace resource-limited && kubectl apply -f - <<EOF\napiVersion: v1\nkind: ResourceQuota\nmetadata:\n  name: compute-quota\n  namespace: resource-limited\nspec:\n  hard:\n    requests.cpu: '4'\n    requests.memory: 8Gi\n    limits.cpu: '8'\n    limits.memory: 16Gi\n    persistentvolumeclaims: '10'\n---\napiVersion: v1\nkind: LimitRange\nmetadata:\n  name: mem-limit-range\n  namespace: resource-limited\nspec:\n  limits:\n  - default:\n      memory: 512Mi\n      cpu: 500m\n    defaultRequest:\n      memory: 256Mi\n      cpu: 100m\n    type: Container\nEOF  # Create namespace with resource quota and default container limits",
            "kubectl apply -f - <<EOF\napiVersion: autoscaling.k8s.io/v1\nkind: VerticalPodAutoscaler\nmetadata:\n  name: webapp-vpa\nspec:\n  targetRef:\n    apiVersion: apps/v1\n    kind: Deployment\n    name: webapp\n  updatePolicy:\n    updateMode: 'Auto'\n  resourcePolicy:\n    containerPolicies:\n    - containerName: web\n      maxAllowed:\n        cpu: 2\n        memory: 2Gi\n      minAllowed:\n        cpu: 100m\n        memory: 128Mi\nEOF  # Create VPA to automatically adjust resource requests based on usage",
            "kubectl apply -f - <<EOF\napiVersion: v1\nkind: ConfigMap\nmetadata:\n  name: scheduler-config\n  namespace: kube-system\ndata:\n  config.yaml: |\n    apiVersion: kubescheduler.config.k8s.io/v1beta3\n    kind: KubeSchedulerConfiguration\n    profiles:\n    - schedulerName: custom-scheduler\n      plugins:\n        score:\n          enabled:\n          - name: NodeResourcesFit\n          - name: NodeAffinity\n          disabled:\n          - name: NodeResourcesLeastAllocated\n---\napiVersion: v1\nkind: Pod\nmetadata:\n  name: custom-scheduled-pod\nspec:\n  schedulerName: custom-scheduler\n  containers:\n  - name: app\n    image: nginx\nEOF  # Configure custom scheduler and schedule pod using it"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "development",
        "safety": "safe",
        "syntaxPattern": "kubectl <scheduling-command> [options]",
        "prerequisites": [
            "kubernetes-cluster"
        ],
        "commandCombinations": [
            {
                "scenario": "Multi-zone deployment with affinity",
                "commands": "kubectl label nodes node-1 topology.kubernetes.io/zone=us-west-1a && kubectl label nodes node-2 topology.kubernetes.io/zone=us-west-1b && kubectl apply -f deployment-with-zone-anti-affinity.yaml && kubectl get pods -o wide",
                "explanation": "Label nodes with zones, deploy with zone anti-affinity, and verify distribution",
                "title": "kubectl && kubectl && kubectl && kubectl"
            },
            {
                "scenario": "Resource-constrained environment setup",
                "commands": "kubectl create namespace constrained && kubectl apply -f resource-quota.yaml -n constrained && kubectl apply -f limit-range.yaml -n constrained && kubectl describe namespace constrained",
                "explanation": "Create namespace with resource constraints and inspect final configuration",
                "title": "kubectl && kubectl && kubectl && kubectl"
            }
        ],
        "relatedCommands": [
            {
                "name": "prometheus",
                "relationship": "combo",
                "reason": "Metrics inform VPA and HPA scaling decisions"
            }
        ],
        "warnings": [
            "Pod affinity rules can lead to unschedulable pods if too restrictive",
            "Priority preemption can cause service disruption for lower-priority workloads",
            "VPA recommendations may not account for application-specific requirements"
        ],
        "manPageUrl": "https://kubernetes.io/docs/concepts/scheduling-eviction/",
        "distroNotes": {}
    },
    {
        "name": "kubernetes-monitoring-observability",
        "standsFor": "Kubernetes Monitoring and Observability",
        "description": "Kubernetes monitoring, logging, and observability",
        "examples": [
            "kubectl top nodes --sort-by=cpu && kubectl top pods --all-namespaces --sort-by=memory  # Monitor node CPU usage and pod memory consumption across all namespaces",
            "kubectl get events --sort-by=.metadata.creationTimestamp --field-selector involvedObject.kind=Pod,reason!=Scheduled  # Get recent pod events excluding normal scheduling events",
            "kubectl logs -l app=web --tail=100 --since=1h --prefix=true -f  # Follow logs from all web app pods with timestamps from last hour",
            "kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml && kubectl get apiservice v1beta1.metrics.k8s.io -o yaml  # Deploy metrics server and verify API service registration",
            "helm repo add prometheus-community https://prometheus-community.github.io/helm-charts && helm install prometheus prometheus-community/kube-prometheus-stack --set grafana.adminPassword=admin123  # Install Prometheus operator stack with Grafana for monitoring",
            "kubectl create namespace observability && kubectl create -f https://github.com/jaegertracing/jaeger-operator/releases/latest/download/jaeger-operator.yaml -n observability  # Deploy Jaeger operator for distributed tracing in dedicated namespace"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "development",
        "safety": "safe",
        "syntaxPattern": "kubectl <monitoring-command> [options]",
        "prerequisites": [
            "kubernetes-cluster"
        ],
        "commandCombinations": [
            {
                "scenario": "Complete observability stack deployment",
                "commands": "kubectl create namespace monitoring && helm install prometheus prometheus-community/kube-prometheus-stack -n monitoring && kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/main/deploy/static/provider/cloud/deploy.yaml",
                "explanation": "Deploy monitoring namespace, Prometheus stack, and ingress for external access",
                "title": "kubectl && helm && kubectl"
            },
            {
                "scenario": "Application performance investigation",
                "commands": "kubectl describe pod webapp-123 && kubectl logs webapp-123 --previous && kubectl get events --field-selector involvedObject.name=webapp-123 --sort-by=.metadata.creationTimestamp",
                "explanation": "Investigate pod issues using description, previous logs, and related events",
                "title": "kubectl && kubectl && kubectl"
            }
        ],
        "relatedCommands": [
            {
                "name": "prometheus",
                "relationship": "combo",
                "reason": "Prometheus provides metrics collection for Kubernetes"
            },
            {
                "name": "grafana",
                "relationship": "combo",
                "reason": "Grafana visualizes Kubernetes metrics and logs"
            },
            {
                "name": "jaeger",
                "relationship": "combo",
                "reason": "Jaeger provides distributed tracing for microservices"
            }
        ],
        "warnings": [
            "Metrics server requires proper certificates and network configuration",
            "Log retention policies should be configured to prevent disk space issues",
            "Monitoring overhead can impact cluster performance if not properly configured"
        ],
        "manPageUrl": "https://kubernetes.io/docs/tasks/debug-application-cluster/",
        "distroNotes": {}
    },
    {
        "name": "kustomize",
        "standsFor": "Kustomize",
        "description": "Template-free way to customize Kubernetes YAML configurations",
        "examples": [
            "kustomize build ./overlays/production  # Generate final Kubernetes YAML from Kustomize directory",
            "kustomize create --resources deployment.yaml,service.yaml,configmap.yaml  # Generate kustomization.yaml from existing resources",
            "kustomize edit set image myapp=myapp:v2.0.0  # Update image tag in kustomization file",
            "kustomize edit add resource secret.yaml  # Add new resource to kustomization file",
            "kustomize edit add configmap app-config --from-file=config.properties  # Create ConfigMap generator from file",
            "kustomize edit add secret app-secret --from-literal=username=admin --from-literal=password=secret123  # Create Secret generator from literal values",
            "kustomize edit set namespace production  # Set namespace for all resources",
            "kustomize edit add label app:myapp  # Add common labels to all resources",
            "kustomize edit add transformer ../../transformers/namespace.yaml && kustomize edit set replicas deployment=webapp:5 && kustomize build . | kubectl diff -f - && kustomize build . | kubectl apply -f -  # Add custom transformers, set replicas, preview changes, and apply if acceptable"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "development",
        "safety": "caution",
        "syntaxPattern": "kustomize [command] [options]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Complete overlay setup",
                "commands": "mkdir -p overlays/production && cd overlays/production && kustomize create --resources ../../base && kustomize edit set namespace production && kustomize edit set image myapp=myapp:v1.0.0",
                "explanation": "Create production overlay with namespace and image customization",
                "title": "mkdir && cd && kustomize && kustomize && kustomize"
            },
            {
                "scenario": "Deploy with kubectl",
                "commands": "kustomize build ./overlays/production | kubectl apply -f -",
                "explanation": "Build Kustomize manifests and apply to cluster",
                "title": "kustomize | kubectl"
            }
        ],
        "relatedCommands": [
            {
                "name": "kubectl",
                "relationship": "combo",
                "reason": "kubectl has built-in kustomize support with -k flag"
            },
            {
                "name": "helm",
                "relationship": "alternative",
                "reason": "Alternative templating solution for Kubernetes"
            }
        ],
        "warnings": [
            "Base and overlay structure important for maintainability",
            "Kustomization files must be in same directory as resources",
            "kubectl -k flag provides built-in kustomize functionality",
            "Strategic merge patches can be complex for deeply nested resources"
        ],
        "manPageUrl": "https://kustomize.io/",
        "distroNotes": {}
    },
    {
        "name": "kustomize-configuration",
        "standsFor": "Kustomize Configuration Management",
        "description": "Kubernetes configuration management with Kustomize",
        "examples": [
            "kustomize build overlays/production | kubectl apply -f -  # Build production overlay configuration and apply to cluster",
            "kustomize create --autodetect --recursive && kustomize edit add configmap app-config --from-file=config.properties  # Auto-generate kustomization file and add ConfigMap generator",
            "kustomize edit add patch --kind Deployment --name webapp --patch deployment-patch.yaml  # Add strategic merge patch for deployment configuration",
            "kustomize build overlays/staging --enable-alpha-plugins | kubectl diff -f - && kustomize build overlays/staging | kubectl apply -f -  # Preview staging changes with diff and apply if acceptable",
            "kustomize edit add secret generic app-secrets --from-file=secrets/ --disableNameSuffixHash  # Generate secret from files without name suffix hash",
            "kustomize edit set image myapp=myregistry.com/myapp:v1.2.3 && kustomize build . > deployment.yaml  # Update image tag and generate final deployment manifest",
            "kustomize create --resources base/ --namespace production && kustomize edit add configmap app-config --from-file=config/prod.properties --from-literal=LOG_LEVEL=INFO && kustomize edit add secret app-secrets --from-env-file=secrets/.env.prod --type=Opaque  # Create production overlay with namespace, ConfigMap from file and literals, and Secret from environment file"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "development",
        "safety": "safe",
        "syntaxPattern": "kustomize <command> [options]",
        "prerequisites": [
            "kustomize-cli"
        ],
        "commandCombinations": [
            {
                "scenario": "GitOps workflow with validation",
                "commands": "kustomize build overlays/production > manifests.yaml && kubeval manifests.yaml && kubectl apply --dry-run=server -f manifests.yaml",
                "explanation": "Build manifests, validate with kubeval, and perform server-side dry run",
                "title": "kustomize > manifests && kubeval && kubectl"
            },
            {
                "scenario": "Multi-cluster deployment preparation",
                "commands": "kustomize build overlays/us-west > us-west-manifests.yaml && kustomize build overlays/eu-west > eu-west-manifests.yaml && kubectl apply -f us-west-manifests.yaml --context=us-west",
                "explanation": "Build region-specific manifests and deploy to appropriate clusters",
                "title": "kustomize > us && kustomize > eu && kubectl"
            }
        ],
        "relatedCommands": [
            {
                "name": "kubectl",
                "relationship": "combo",
                "reason": "Kustomize output is applied to Kubernetes with kubectl"
            },
            {
                "name": "helm",
                "relationship": "alternative",
                "reason": "Both provide Kubernetes configuration templating"
            },
            {
                "name": "git",
                "relationship": "combo",
                "reason": "Kustomize configurations are typically version controlled"
            }
        ],
        "warnings": [
            "Kustomization file structure and patching order matter significantly",
            "Resource name transformations can break references between resources",
            "Alpha plugins may not be available in all environments"
        ],
        "manPageUrl": "https://kubectl.docs.kubernetes.io/guides/introduction/kustomize/",
        "distroNotes": {}
    },
    {
        "name": "linkerd",
        "standsFor": "Linkerd",
        "description": "Lightweight service mesh for Kubernetes",
        "examples": [
            "linkerd check --pre  # Verify cluster meets Linkerd requirements",
            "linkerd install | kubectl apply -f -  # Install Linkerd control plane to cluster",
            "linkerd check  # Validate Linkerd installation and health",
            "kubectl get deploy -o yaml | linkerd inject - | kubectl apply -f -  # Add Linkerd proxy to existing deployments",
            "linkerd viz top deploy  # Show real-time traffic for deployments",
            "linkerd viz dashboard  # Launch Linkerd web dashboard",
            "linkerd viz stat deploy  # Display success rates and latencies for deployments",
            "linkerd viz profile --tap deploy/webapp --tap-duration 30s  # Generate service profile from live traffic",
            "linkerd install --config=custom-values.yaml | kubectl apply -f - && linkerd viz install | kubectl apply -f - && linkerd multicluster install | kubectl apply -f - && linkerd check --proxy  # Install Linkerd with custom configuration, visualization dashboard, multi-cluster support, and verify proxy injection"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "development",
        "safety": "safe",
        "syntaxPattern": "linkerd [command] [options]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Complete Linkerd installation",
                "commands": "linkerd check --pre && linkerd install | kubectl apply -f - && linkerd check",
                "explanation": "Verify prerequisites, install Linkerd, and validate installation",
                "title": "linkerd && linkerd | kubectl && linkerd"
            },
            {
                "scenario": "Service mesh injection",
                "commands": "kubectl annotate namespace production linkerd.io/inject=enabled && kubectl rollout restart deployment -n production",
                "explanation": "Enable injection for namespace and restart deployments",
                "title": "kubectl && kubectl"
            }
        ],
        "relatedCommands": [
            {
                "name": "kubectl",
                "relationship": "combo",
                "reason": "Linkerd operates on Kubernetes using kubectl"
            },
            {
                "name": "istioctl",
                "relationship": "alternative",
                "reason": "Alternative service mesh solution"
            }
        ],
        "warnings": [
            "Requires cluster admin permissions for installation",
            "Proxy injection can be enabled per namespace or per workload",
            "Resource consumption lower than Istio but features differ",
            "Custom install needed for production hardening"
        ],
        "manPageUrl": "https://linkerd.io/2/reference/cli/",
        "distroNotes": {}
    },
    {
        "name": "pack",
        "standsFor": "Pack CLI",
        "description": "Tool to transform application source code into container images using Cloud Native Buildpacks",
        "examples": [
            "pack build myapp --builder gcr.io/buildpacks/builder:v1  # Build container image from source code using Google buildpacks",
            "pack inspect myapp  # Display information about buildpack-built image",
            "pack rebase myapp --run-image gcr.io/buildpacks/run:v1  # Update base image without rebuilding application layer",
            "pack builder create mybuilder --config builder.toml  # Create custom builder from configuration file",
            "pack trust-builder gcr.io/buildpacks/builder:v1  # Mark builder as trusted for security purposes",
            "pack builder suggest  # Show recommended builders for different languages",
            "pack build myapp --builder paketobuildpacks/builder:base --env BP_JVM_VERSION=11  # Build Java app with specific JVM version",
            "pack build myapp --builder paketobuildpacks/builder:base --buildpack paketo-buildpacks/java  # Use specific buildpack for building application",
            "pack build production-app --builder gcr.io/buildpacks/builder:v1 --env BP_JVM_VERSION=17 --env BP_MAVEN_BUILD_ARGUMENTS='-Dmaven.test.skip=true -Dspring.profiles.active=production' --cache-image gcr.io/company/buildpack-cache --publish && docker inspect production-app | jq '.[0].Config.Env' && pack rebase production-app --run-image gcr.io/distroless/java17 && echo \"Enterprise containerization completed: Java 17 runtime, production profile, distroless security base, optimized for Kubernetes deployment\"  # Enterprise-grade buildpack deployment with Java 17, production configuration, security hardening, and container optimization"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "development",
        "safety": "safe",
        "syntaxPattern": "pack [command] [options]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Complete build and deploy workflow",
                "commands": "pack build myapp --builder gcr.io/buildpacks/builder:v1 --publish && kubectl set image deployment/myapp myapp=myapp:latest",
                "explanation": "Build and publish image, then update Kubernetes deployment",
                "title": "pack && kubectl"
            },
            {
                "scenario": "Multi-stage build optimization",
                "commands": "pack build myapp --builder paketobuildpacks/builder:base --cache-image myapp-cache && pack rebase myapp --run-image paketobuildpacks/run:base-cnb",
                "explanation": "Build with cache for faster rebuilds and rebase for security updates",
                "title": "pack && pack"
            }
        ],
        "relatedCommands": [
            {
                "name": "docker",
                "relationship": "alternative",
                "reason": "Alternative to Dockerfile-based image building"
            },
            {
                "name": "skaffold",
                "relationship": "combo",
                "reason": "Skaffold can use pack for building images"
            }
        ],
        "warnings": [
            "Requires Docker daemon for building images",
            "Builder trust settings affect which builders can be used",
            "Buildpack detection automatic based on application files",
            "Cache volumes improve build performance significantly"
        ],
        "manPageUrl": "https://buildpacks.io/docs/tools/pack/",
        "distroNotes": {}
    },
    {
        "name": "podman",
        "standsFor": "Pod Manager",
        "description": "Daemonless container engine alternative to Docker",
        "examples": [
            "podman run -it ubuntu bash  # Start interactive Ubuntu container with bash shell",
            "podman ps  # Show currently running containers",
            "podman build -t myapp .  # Build container image with tag 'myapp'",
            "podman run --user 1000:1000 nginx  # Run container as non-root user for security",
            "podman pod create --name mypod -p 8080:80  # Create pod with port mapping",
            "podman generate systemd --new --name webapp  # Create systemd service file for container",
            "podman build --tag myapp:latest . && podman run -d --name myapp myapp:latest  # Build and run container"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "development",
        "safety": "safe",
        "syntaxPattern": "podman [options] <command>",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Rootless container deployment",
                "commands": "podman run -d --name webapp -p 8080:80 nginx && podman generate systemd webapp > webapp.service",
                "explanation": "Run container and generate systemd service file",
                "title": "podman && podman > webapp"
            },
            {
                "scenario": "Pod-based application",
                "commands": "podman pod create --name stack -p 80:80 && podman run -d --pod stack nginx && podman run -d --pod stack redis",
                "explanation": "Create pod and run multiple containers sharing network",
                "title": "podman && podman && podman"
            }
        ],
        "relatedCommands": [
            {
                "name": "docker",
                "relationship": "alternative",
                "reason": "Compatible API but daemonless architecture"
            },
            {
                "name": "buildah",
                "relationship": "combo",
                "reason": "Specialized tool for building OCI images"
            }
        ],
        "warnings": [
            "Rootless containers have some limitations",
            "macOS/Windows require podman machine setup",
            "Slightly different behavior from Docker in some cases"
        ],
        "manPageUrl": "https://docs.podman.io/",
        "distroNotes": {
            "linux": "Native on Linux, preferred on RHEL/Fedora",
            "macos": "Requires podman machine VM",
            "windows": "Requires podman machine VM"
        }
    },
    {
        "name": "skaffold",
        "standsFor": "Skaffold",
        "description": "Command line tool for continuous development on Kubernetes",
        "examples": [
            "skaffold init --compose-file docker-compose.yml  # Generate skaffold.yaml from existing Docker Compose file",
            "skaffold dev --port-forward  # Build, deploy, and watch for changes with port forwarding",
            "skaffold run --tail  # Build and deploy once, then tail application logs",
            "skaffold run --profile production  # Deploy using production configuration profile",
            "skaffold build --file-output artifacts.json  # Build images and output artifact details to file",
            "skaffold deploy --build-artifacts artifacts.json  # Deploy using previously built artifacts",
            "skaffold debug --port-forward  # Deploy with debugging enabled and port forwarding",
            "skaffold delete  # Delete all deployed Kubernetes resources"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "development",
        "safety": "dangerous",
        "syntaxPattern": "skaffold [command] [options]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "CI/CD pipeline",
                "commands": "skaffold build --quiet && skaffold deploy --build-artifacts artifacts.json",
                "explanation": "Build images in CI, then deploy in CD pipeline",
                "title": "skaffold && skaffold"
            },
            {
                "scenario": "Multi-environment workflow",
                "commands": "skaffold build --profile staging && skaffold deploy --profile production --build-artifacts artifacts.json",
                "explanation": "Build with staging profile, deploy with production profile",
                "title": "skaffold && skaffold"
            }
        ],
        "relatedCommands": [
            {
                "name": "docker",
                "relationship": "combo",
                "reason": "Skaffold builds Docker images"
            },
            {
                "name": "kubectl",
                "relationship": "combo",
                "reason": "Skaffold deploys to Kubernetes"
            }
        ],
        "warnings": [
            "Requires Docker daemon for image building",
            "File watching may not work with all filesystem types",
            "Port forwarding conflicts possible with multiple applications",
            "Resource cleanup important to avoid conflicts"
        ],
        "manPageUrl": "https://skaffold.dev/docs/references/cli/",
        "distroNotes": {}
    }
];

export { development_containersCommands };
export default development_containersCommands;
