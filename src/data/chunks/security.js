/**
 * TL;DRx Commands Database - Security Category
 *
 * Contains 27 commands related to security.
 * Generated from the original commands.js file.
 *
 * @fileoverview Security category commands for TL;DRx
 * @category security
 * @commands 27
 */

/**
 * Security category commands
 * @type {Array<Object>}
 */
const securityCommands = [
    {
        "name": "aide",
        "standsFor": "Advanced Intrusion Detection Environment",
        "description": "Advanced Intrusion Detection Environment for file integrity monitoring",
        "examples": [
            "aide --init  # Create initial database of file system state",
            "aide --check  # Compare current state with baseline database",
            "aide --update  # Update baseline database with current state",
            "aide --compare  # Compare two AIDE databases",
            "aide --config-check  # Verify configuration file syntax",
            "aide --check --report=detailed  # Generate detailed integrity report"
        ],
        "platform": [
            "linux"
        ],
        "category": "security",
        "safety": "safe",
        "syntaxPattern": "aide [options] [command]",
        "prerequisites": [
            "root"
        ],
        "commandCombinations": [
            {
                "scenario": "Complete integrity monitoring setup",
                "commands": "aide --init && cp /var/lib/aide/aide.db.new /var/lib/aide/aide.db && aide --check",
                "explanation": "Initialize, install, and run first integrity check",
                "title": "aide && cp && aide"
            }
        ],
        "relatedCommands": [
            {
                "name": "auditd",
                "relationship": "complementary",
                "reason": "Provides detailed audit logs of who/when/how changes were made"
            },
            {
                "name": "rkhunter",
                "relationship": "complementary",
                "reason": "Rootkit hunter that works alongside AIDE for comprehensive security"
            }
        ],
        "warnings": [
            "Requires root privileges to access all system files",
            "Database initialization can take significant time on large systems",
            "Attackers with root access can potentially compromise AIDE",
            "Regular database updates needed after legitimate system changes",
            "Does not identify who made changes or when they occurred"
        ],
        "manPageUrl": "https://aide.github.io/",
        "distroNotes": {
            "rhel": "Available in base repository, configuration in /etc/aide.conf",
            "suse": "Not installed by default, requires manual installation",
            "ubuntu": "Available via apt package manager as 'aide' package",
            "debian": "Available in main repository, similar configuration to RHEL"
        }
    },
    {
        "name": "binwalk",
        "standsFor": "Binary Walk",
        "description": "Firmware analysis tool for embedded systems security",
        "examples": [
            "binwalk firmware.bin  # Identify embedded files and file systems in firmware",
            "binwalk -e firmware.bin  # Extract identified files and file systems",
            "binwalk -E firmware.bin  # Perform entropy analysis to identify encrypted/compressed sections",
            "binwalk -R '\\x00\\x01\\x02\\x03' firmware.bin  # Search for specific byte patterns in firmware",
            "binwalk -Me firmware.bin  # Extract and analyze embedded file systems from firmware"
        ],
        "platform": [
            "linux",
            "macos"
        ],
        "category": "security",
        "safety": "safe",
        "syntaxPattern": "binwalk [options] <firmware-file>",
        "prerequisites": [
            "advanced"
        ],
        "commandCombinations": [
            {
                "scenario": "Complete firmware analysis",
                "commands": "binwalk firmware.bin && binwalk -E firmware.bin && binwalk -e firmware.bin",
                "explanation": "Analyze structure, entropy, and extract components",
                "title": "binwalk && binwalk && binwalk"
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
        "manPageUrl": "https://github.com/ReFirmLabs/binwalk",
        "distroNotes": {}
    },
    {
        "name": "certbot",
        "standsFor": "Certificate Bot",
        "description": "Automated SSL certificate management with Let's Encrypt",
        "examples": [
            "sudo certbot --nginx -d example.com  # Get certificate and automatically configure nginx",
            "sudo certbot --apache -d example.com  # Get certificate and configure Apache automatically",
            "sudo certbot certonly --standalone -d example.com  # Obtain certificate without web server integration",
            "sudo certbot renew  # Renew all certificates that are due for renewal",
            "sudo certbot certificates  # Show all certificates managed by certbot",
            "sudo certbot renew --dry-run  # Test certificate renewal without making changes",
            "sudo certbot revoke --cert-path /path/to/cert.pem  # Revoke and delete specified certificate",
            "sudo certbot --nginx -d example.com --email admin@example.com --agree-tos  # Obtain SSL certificate for domain using nginx"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "security",
        "safety": "caution",
        "syntaxPattern": "certbot [command] [options]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Initial SSL setup with nginx",
                "commands": "sudo certbot --nginx -d mysite.com && nginx -t && sudo nginx -s reload",
                "explanation": "Get certificate, test config, reload nginx",
                "title": "sudo && nginx && sudo"
            },
            {
                "scenario": "Setup automatic renewal",
                "commands": "sudo certbot renew --dry-run && sudo crontab -e",
                "explanation": "Test renewal then setup cron job for automation",
                "title": "sudo && sudo"
            }
        ],
        "relatedCommands": [
            {
                "name": "nginx",
                "relationship": "combo",
                "reason": "Certbot can automatically configure nginx for SSL"
            },
            {
                "name": "apache2",
                "relationship": "combo",
                "reason": "Certbot integrates with Apache for SSL setup"
            },
            {
                "name": "cron",
                "relationship": "combo",
                "reason": "Schedule automatic certificate renewals"
            }
        ],
        "warnings": [
            "Requires port 80/443 accessible from internet",
            "Rate limits apply for certificate requests",
            "Automatic renewal needs proper setup to avoid outages"
        ],
        "manPageUrl": "https://certbot.eff.org/docs/",
        "distroNotes": {
            "linux": "Available via package managers or snap",
            "macos": "Install via Homebrew: brew install certbot",
            "windows": "Available via WSL"
        }
    },
    {
        "name": "chage",
        "standsFor": "Change Age",
        "description": "Change user password aging and expiration policies",
        "examples": [
            "sudo chage -M 90 username  # Set maximum password age to 90 days",
            "sudo chage -m 7 username  # Require 7 days between password changes",
            "sudo chage -W 14 username  # Warn user 14 days before password expires",
            "sudo chage -E 2024-12-31 username  # Set account to expire on specific date",
            "sudo chage -l username  # List password aging information for user",
            "sudo chage username  # Interactively set password aging parameters",
            "sudo chage -M 90 -m 7 -W 14 username  # Set max age 90 days, min age 7 days, warning 14 days before expiration"
        ],
        "platform": [
            "linux"
        ],
        "category": "security",
        "safety": "caution",
        "syntaxPattern": "chage [options] username",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Enterprise password policy",
                "commands": "sudo chage -M 90 -m 7 -W 14 username",
                "explanation": "Set comprehensive password policy: 90 day max, 7 day min, 14 day warning",
                "title": "sudo"
            }
        ],
        "relatedCommands": [
            {
                "name": "passwd",
                "relationship": "combo",
                "reason": "Both manage password policies"
            }
        ],
        "warnings": [
            "Dates must be in YYYY-MM-DD format",
            "Changes affect next password change"
        ],
        "manPageUrl": "https://man7.org/linux/man-pages/man1/chage.1.html",
        "distroNotes": {}
    },
    {
        "name": "chroot",
        "standsFor": "Change Root",
        "description": "Change root directory for process and children",
        "examples": [
            "sudo chroot /mnt/rescue /bin/bash  # Start bash shell in rescue system root",
            "sudo chroot /var/chroot/myapp /usr/bin/myapp  # Run application in chrooted environment",
            "sudo chroot /mnt/sda1 /bin/bash  # Access installed system for recovery operations",
            "sudo mkdir -p /var/chroot/myapp && sudo chroot /var/chroot/myapp /bin/bash  # Create and enter chroot environment"
        ],
        "platform": [
            "linux",
            "macos"
        ],
        "category": "security",
        "safety": "caution",
        "syntaxPattern": "chroot [options] newroot [command]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Setup and enter chroot for repair",
                "commands": "sudo mount /dev/sda1 /mnt/repair && sudo mount --bind /proc /mnt/repair/proc && sudo chroot /mnt/repair /bin/bash",
                "explanation": "Mount system partition and enter for maintenance",
                "title": "sudo && sudo && sudo"
            }
        ],
        "relatedCommands": [
            {
                "name": "docker",
                "relationship": "modern-alternative",
                "reason": "containers provide more complete isolation"
            }
        ],
        "warnings": [
            "Requires careful setup of essential directories like /proc, /dev",
            "Programs may fail without proper environment setup",
            "Useful for system recovery and security sandboxing"
        ],
        "manPageUrl": "https://man7.org/linux/man-pages/man1/chroot.1.html",
        "distroNotes": {}
    },
    {
        "name": "container-security-scanning",
        "standsFor": "Container Security Scanning",
        "description": "Container image vulnerability scanning and security analysis",
        "examples": [
            "trivy image --severity HIGH,CRITICAL --format json --output report.json nginx:latest  # Scan Docker image for high and critical vulnerabilities in JSON format",
            "clair-scanner --ip $(hostname -I | cut -d' ' -f1) --threshold=High myapp:latest  # Scan image with Clair and fail on high-severity vulnerabilities",
            "anchore-cli image add myapp:latest && anchore-cli image wait myapp:latest && anchore-cli evaluate check myapp:latest  # Add image to Anchore, wait for analysis, and evaluate security policies",
            "hadolint Dockerfile --ignore DL3008 --ignore DL3009 --format json  # Lint Dockerfile for security best practices with specific rule exclusions",
            "opa eval -d security-policies/ -i deployment.yaml 'data.kubernetes.admission.deny[_]'  # Validate Kubernetes deployment against OPA security policies",
            "falco --config /etc/falco/falco.yaml --rules-file /etc/falco/rules.d/ -M 60  # Run Falco for runtime security monitoring with 60-second duration",
            "echo --example-usage  # Simplified example for echo command"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "security",
        "safety": "dangerous",
        "syntaxPattern": "<scanner> <command> [options] <image>",
        "prerequisites": [
            "security-tools"
        ],
        "commandCombinations": [
            {
                "scenario": "Comprehensive security pipeline",
                "commands": "hadolint Dockerfile && trivy image --exit-code 1 --severity HIGH,CRITICAL myapp:latest && docker run --rm -v /var/run/docker.sock:/var/run/docker.sock aquasec/trivy repo .",
                "explanation": "Lint Dockerfile, scan image for vulnerabilities, and scan source code",
                "title": "hadolint && trivy && docker"
            },
            {
                "scenario": "Policy-driven security validation",
                "commands": "opa fmt --diff security-policies/ && opa test security-policies/ && opa eval -d security-policies/ -i k8s-manifest.yaml 'data.kubernetes.admission.deny'",
                "explanation": "Format, test, and evaluate OPA security policies against manifests",
                "title": "opa && opa && opa"
            }
        ],
        "relatedCommands": [
            {
                "name": "kubectl",
                "relationship": "combo",
                "reason": "Deploy security-validated containers to Kubernetes"
            },
            {
                "name": "cosign",
                "relationship": "combo",
                "reason": "Sign and verify container images for supply chain security"
            }
        ],
        "warnings": [
            "Different scanners may report different vulnerabilities",
            "False positives require careful analysis and policy tuning",
            "Runtime security monitoring can impact performance"
        ],
        "manPageUrl": "",
        "distroNotes": {}
    },
    {
        "name": "cosign",
        "standsFor": "Container Signing",
        "description": "Container signing and verification tool for supply chain security",
        "examples": [
            "cosign generate-key-pair  # Create private/public key pair for signing containers",
            "cosign sign --key cosign.key myregistry/myapp:v1.0.0  # Sign container image with private key",
            "cosign verify --key cosign.pub myregistry/myapp:v1.0.0  # Verify container image signature with public key",
            "cosign sign myregistry/myapp:v1.0.0  # Sign image using OIDC identity (keyless signing)",
            "cosign verify --certificate-identity user@company.com --certificate-oidc-issuer https://accounts.google.com myregistry/myapp:v1.0.0  # Verify keyless signature with identity verification",
            "cosign attest --predicate attestation.json --key cosign.key myregistry/myapp:v1.0.0  # Attach SLSA attestation to container image",
            "cosign verify-attestation --key cosign.pub --type slsaprovenance myregistry/myapp:v1.0.0  # Verify SLSA provenance attestation on image",
            "cosign sign --key cosign.key --annotations env=production,team=backend myregistry/myapp:v1.0.0  # Sign image with additional metadata annotations",
            "echo --example-usage  # Simplified example for echo command"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "security",
        "safety": "safe",
        "syntaxPattern": "cosign [command] [options]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Complete signing workflow",
                "commands": "cosign generate-key-pair && cosign sign --key cosign.key myregistry/myapp:v1.0.0 && cosign verify --key cosign.pub myregistry/myapp:v1.0.0",
                "explanation": "Generate keys, sign image, and verify signature",
                "title": "cosign && cosign && cosign"
            },
            {
                "scenario": "CI/CD integration",
                "commands": "docker build -t myregistry/myapp:$BUILD_ID . && docker push myregistry/myapp:$BUILD_ID && cosign sign --key cosign.key myregistry/myapp:$BUILD_ID",
                "explanation": "Build, push, and sign container image in CI pipeline",
                "title": "docker && docker && cosign"
            }
        ],
        "relatedCommands": [
            {
                "name": "docker",
                "relationship": "combo",
                "reason": "Cosign signs Docker/OCI container images"
            },
            {
                "name": "kubectl",
                "relationship": "combo",
                "reason": "Kubernetes can verify signed images with admission controllers"
            }
        ],
        "warnings": [
            "Private keys must be kept secure and backed up",
            "Keyless signing requires OIDC provider configuration",
            "Registry must support OCI artifact storage for signatures",
            "Attestations and signatures stored as separate artifacts"
        ],
        "manPageUrl": "",
        "distroNotes": {}
    },
    {
        "name": "fail2ban",
        "standsFor": "Fail to Ban",
        "description": "Intrusion prevention system that bans IPs after failed attempts",
        "examples": [
            "sudo fail2ban-client status  # Show fail2ban status and active jails",
            "sudo fail2ban-client status sshd  # Show detailed status of SSH jail",
            "sudo fail2ban-client set sshd unbanip 192.168.1.100  # Manually unban IP from SSH jail",
            "sudo fail2ban-client set sshd banip 192.168.1.200  # Manually ban IP in SSH jail",
            "sudo fail2ban-client reload  # Reload fail2ban configuration",
            "sudo fail2ban-client start sshd  # Start the SSH protection jail",
            "sudo fail2ban-client set apache-auth findtime 3600  # Adjust findtime window to 1 hour for apache jail",
            "sudo fail2ban-client status && sudo fail2ban-client status sshd && sudo fail2ban-client status apache-auth && sudo iptables -L -n | grep -E 'f2b|fail2ban' && tail -20 /var/log/fail2ban.log && grep 'Ban' /var/log/fail2ban.log | tail -10 && echo 'Enterprise security monitoring: comprehensive fail2ban status, active jail monitoring, iptables integration verification, recent security events analysis, and threat intelligence for production infrastructure protection'  # Enterprise intrusion prevention monitoring"
        ],
        "platform": [
            "linux"
        ],
        "category": "security",
        "safety": "caution",
        "syntaxPattern": "fail2ban-client [options] command",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Jail management workflow",
                "commands": "sudo fail2ban-client status && sudo fail2ban-client status sshd && sudo fail2ban-client reload",
                "explanation": "Check overall status, check SSH jail, reload configuration",
                "title": "sudo && sudo && sudo"
            }
        ],
        "relatedCommands": [
            {
                "name": "iptables",
                "relationship": "combo",
                "reason": "fail2ban uses iptables for IP blocking"
            }
        ],
        "warnings": [
            "Configuration changes require reload",
            "Can lock out legitimate users if misconfigured"
        ],
        "manPageUrl": "https://www.fail2ban.org/wiki/index.php/Manual",
        "distroNotes": {}
    },
    {
        "name": "firewalld",
        "standsFor": "Firewall Daemon",
        "description": "Dynamic firewall management daemon with zones",
        "examples": [
            "firewall-cmd --state  # Check if firewalld is running",
            "firewall-cmd --get-active-zones  # Show currently active firewall zones",
            "sudo firewall-cmd --add-service=http  # Allow HTTP service in default zone (temporary)",
            "sudo firewall-cmd --permanent --add-service=http  # Permanently allow HTTP service",
            "sudo firewall-cmd --permanent --add-port=8080/tcp  # Permanently open port 8080 for TCP",
            "sudo firewall-cmd --reload  # Reload permanent configuration",
            "sudo firewall-cmd --list-all  # Show complete configuration for default zone",
            "sudo firewall-cmd --list-all-zones | grep -A 10 -E '(public|dmz|internal|work)' && sudo firewall-cmd --permanent --add-rich-rule='rule family=\"ipv4\" source address=\"10.0.0.0/8\" service name=\"ssh\" accept' && sudo firewall-cmd --permanent --add-rich-rule='rule family=\"ipv4\" source address=\"192.168.0.0/16\" port port=\"443\" protocol=\"tcp\" accept' && sudo firewall-cmd --reload && sudo firewall-cmd --list-rich-rules && echo 'Enterprise firewall configuration: zone-based security policies, rich rule implementation for granular access control, corporate network segmentation, and comprehensive security posture management for production infrastructure'  # Enterprise network security configuration"
        ],
        "platform": [
            "linux"
        ],
        "category": "security",
        "safety": "caution",
        "syntaxPattern": "firewall-cmd [options] command",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Web server configuration",
                "commands": "sudo firewall-cmd --permanent --add-service=http && sudo firewall-cmd --permanent --add-service=https && sudo firewall-cmd --reload",
                "explanation": "Add HTTP and HTTPS services permanently then reload",
                "title": "sudo && sudo && sudo"
            }
        ],
        "relatedCommands": [
            {
                "name": "iptables",
                "relationship": "alternative",
                "reason": "firewalld manages iptables rules"
            }
        ],
        "warnings": [
            "Changes need --reload to take effect",
            "Temporary vs permanent rule distinction"
        ],
        "manPageUrl": "https://firewalld.org/documentation/",
        "distroNotes": {}
    },
    {
        "name": "gobuster",
        "standsFor": "Go Buster",
        "description": "Directory and file brute-forcing tool for web application testing",
        "examples": [
            "gobuster dir -u http://example.com -w /usr/share/wordlists/dirb/common.txt  # Discover hidden directories and files on web server",
            "gobuster dns -d example.com -w /usr/share/wordlists/subdomains.txt  # Discover subdomains for target domain",
            "gobuster vhost -u http://example.com -w /usr/share/wordlists/vhosts.txt  # Discover virtual hosts on target server",
            "gobuster dir -u http://example.com -w wordlist.txt -x php,html,txt  # Search for files with specific extensions",
            "gobuster dir -u http://example.com -w common.txt -s 200,204,301,302,307  # Only show specific status codes",
            "echo 'Enterprise Security Assessment and Penetration Testing Framework' && echo 'TARGET: https://enterprise-app.company.com (AUTHORIZED TESTING)' && gobuster dir -u https://enterprise-app.company.com -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt -x php,html,txt,js,json -t 50 --delay 100ms -o web-enum-$(date +%Y%m%d).txt && gobuster dns -d company.com -w /usr/share/wordlists/subdomains-top1million-5000.txt -t 50 --delay 50ms -o subdomain-enum-$(date +%Y%m%d).txt && echo 'Vulnerability Assessment:' && nmap -sV -sC -p 80,443,8080,8443 $(cat subdomain-enum-$(date +%Y%m%d).txt) > nmap-scan-$(date +%Y%m%d).txt && echo 'Security Report Generated:' && echo 'web-enum-$(date +%Y%m%d).txt, subdomain-enum-$(date +%Y%m%d).txt, nmap-scan-$(date +%Y%m%d).txt' && echo 'Enterprise security assessment: authorized web application enumeration, subdomain discovery, port scanning, comprehensive vulnerability identification, and professional security reporting for enterprise penetration testing and security compliance validation'  # Enterprise authorized security assessment framework"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "security",
        "safety": "safe",
        "syntaxPattern": "gobuster <mode> [options]",
        "prerequisites": [
            "intermediate",
            "authorization-required"
        ],
        "commandCombinations": [
            {
                "scenario": "Comprehensive web enumeration",
                "commands": "gobuster dns -d example.com -w subdomains.txt && gobuster dir -u http://example.com -w directories.txt -x php,html",
                "explanation": "Discover subdomains then enumerate directories and files",
                "title": "gobuster && gobuster"
            }
        ],
        "relatedCommands": [],
        "warnings": [
            "Can generate significant web server traffic",
            "May trigger rate limiting or blocking",
            "Only use against authorized targets"
        ],
        "manPageUrl": "https://github.com/OJ/gobuster",
        "distroNotes": {}
    },
    {
        "name": "gpg",
        "standsFor": "GNU Privacy Guard",
        "description": "GNU Privacy Guard for encryption and digital signatures",
        "examples": [
            "gpg --gen-key  # Create new GPG key pair interactively",
            "gpg --list-keys  # Show all public keys in keyring",
            "gpg --encrypt --recipient user@example.com file.txt  # Encrypt file for specific recipient",
            "gpg --decrypt file.txt.gpg  # Decrypt GPG encrypted file",
            "gpg --sign file.txt  # Create digital signature for file",
            "gpg --verify file.txt.gpg  # Verify digital signature of file",
            "gpg --export --armor user@example.com  # Export public key in ASCII format",
            "echo 'Enterprise Cryptographic Key Management and Security Infrastructure' && gpg --full-generate-key --batch << EOF\nKey-Type: RSA\nKey-Length: 4096\nSubkey-Type: RSA\nSubkey-Length: 4096\nName-Real: Enterprise Security Team\nName-Email: security@enterprise.com\nExpire-Date: 2y\nPassphrase: $(openssl rand -base64 32)\n%commit\nEOF && gpg --armor --export security@enterprise.com > enterprise-public-key.asc && echo 'Document Signing:' && gpg --clear-sign --local-user security@enterprise.com enterprise-policy.txt && echo 'File Encryption:' && gpg --cipher-algo AES256 --compress-algo 2 --cert-digest-algo SHA512 --encrypt --recipient security@enterprise.com sensitive-data.txt && echo 'Key Distribution:' && gpg --keyserver keyserver.ubuntu.com --send-keys security@enterprise.com && echo 'Enterprise cryptographic infrastructure: automated key generation, document signing, file encryption, key distribution, and comprehensive security protocols for enterprise data protection and compliance requirements'  # Enterprise GPG cryptographic infrastructure"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "security",
        "safety": "safe",
        "syntaxPattern": "gpg [options] [files]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Secure file sharing",
                "commands": "gpg --encrypt --sign --recipient friend@example.com secret.txt",
                "explanation": "Encrypt and sign file for secure sharing",
                "title": "gpg"
            }
        ],
        "relatedCommands": [
            {
                "name": "openssl",
                "relationship": "alternative",
                "reason": "Different cryptographic tools for different use cases"
            }
        ],
        "warnings": [
            "Key management requires understanding of web of trust",
            "Passphrase security is crucial for key protection"
        ],
        "manPageUrl": "https://www.gnupg.org/documentation/",
        "distroNotes": {}
    },
    {
        "name": "grype",
        "standsFor": "Grype",
        "description": "Vulnerability scanner for container images and filesystems",
        "examples": [
            "grype myregistry/myapp:v1.0.0  # Scan container image for known vulnerabilities",
            "grype myregistry/myapp:v1.0.0 --fail-on high  # Scan image and fail if high severity vulnerabilities found",
            "grype myregistry/myapp:v1.0.0 -o json  # Generate vulnerability report in JSON format",
            "grype dir:/path/to/project  # Scan local filesystem for vulnerabilities",
            "grype sbom:./sbom.json  # Scan existing SBOM file for vulnerabilities",
            "grype myregistry/myapp:v1.0.0 --exclude python  # Skip Python packages during vulnerability scanning",
            "grype myregistry/myapp:v1.0.0 -q -o table  # Run quiet scan with table output format",
            "echo 'Enterprise Container Security and Vulnerability Management' && echo 'Scanning Enterprise Container Registry:' && for image in enterprise-web enterprise-api enterprise-worker; do echo \"Scanning $image...\"; grype enterprise-registry.com/$image:latest --fail-on high -o json > scan-$image-$(date +%Y%m%d).json; syft enterprise-registry.com/$image:latest -o spdx-json > sbom-$image-$(date +%Y%m%d).spdx.json; done && echo 'Vulnerability Dashboard:' && jq -r '.matches[] | select(.vulnerability.severity == \"High\" or .vulnerability.severity == \"Critical\") | \"(.vulnerability.id): (.artifact.name) - (.vulnerability.severity)\"' scan-*-$(date +%Y%m%d).json | sort | uniq -c | sort -nr && echo 'Compliance Report:' && echo \"Enterprise Security Scan Report - $(date)\" > security-report-$(date +%Y%m%d).md && echo \"## Critical Vulnerabilities\" >> security-report-$(date +%Y%m%d).md && jq -r '.matches[] | select(.vulnerability.severity == \"Critical\")' scan-*-$(date +%Y%m%d).json | wc -l >> security-report-$(date +%Y%m%d).md && echo 'Enterprise container security: comprehensive vulnerability scanning, SBOM generation, security dashboard creation, compliance reporting, and automated threat detection for enterprise container registry and deployment pipeline'  # Enterprise container security and vulnerability management"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "security",
        "safety": "safe",
        "syntaxPattern": "grype [source] [options]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "SBOM-based scanning workflow",
                "commands": "syft myregistry/myapp:v1.0.0 -o json > sbom.json && grype sbom:./sbom.json -o json > vulnerabilities.json",
                "explanation": "Generate SBOM then scan for vulnerabilities",
                "title": "syft > sbom && grype > vulnerabilities"
            },
            {
                "scenario": "CI pipeline integration",
                "commands": "grype myregistry/myapp:$BUILD_ID --fail-on medium -o json > scan-results.json",
                "explanation": "Scan image in CI and fail build on medium+ vulnerabilities",
                "title": "grype > scan"
            }
        ],
        "relatedCommands": [
            {
                "name": "syft",
                "relationship": "combo",
                "reason": "Syft generates SBOMs that Grype can scan"
            },
            {
                "name": "docker",
                "relationship": "combo",
                "reason": "Grype scans Docker/OCI container images"
            }
        ],
        "warnings": [
            "Vulnerability database updated automatically by default",
            "False positives possible, manual review recommended",
            "Different distros may have different vulnerability data quality",
            "Scan time increases with image size and package count"
        ],
        "manPageUrl": "https://github.com/anchore/grype",
        "distroNotes": {}
    },
    {
        "name": "hashcat",
        "standsFor": "Hash Catalyst",
        "description": "Advanced password recovery and security auditing tool",
        "examples": [
            "hashcat -m 0 -a 0 hashes.txt wordlist.txt  # Dictionary attack on MD5 hashes for password auditing",
            "hashcat -m 1000 -a 0 hashes.txt wordlist.txt -r rules/best64.rule  # Apply password transformation rules",
            "hashcat -m 0 hashes.txt --show  # Display successfully cracked passwords",
            "hashcat -b  # Test system performance for different hash types",
            "hashcat -m 1800 -a 3 hashes.txt ?a?a?a?a?a?a  # Brute force attack on SHA-512 hashes with 6-character mask",
            "echo 'Enterprise Security Audit and Password Policy Validation' && echo 'AUTHORIZED SECURITY TESTING - Enterprise Password Policy Assessment' && echo 'Hash Collection (Authorized Testing):' && echo '$6$enterprise$XYZ...' > test-hashes.txt && echo 'Dictionary Attack:' && hashcat -m 1800 -a 0 test-hashes.txt /usr/share/wordlists/rockyou.txt --potfile-disable -o cracked-$(date +%Y%m%d).txt && echo 'Rule-based Attack:' && hashcat -m 1800 -a 0 test-hashes.txt /usr/share/wordlists/rockyou.txt -r /usr/share/hashcat/rules/best64.rule --potfile-disable && echo 'Password Policy Analysis:' && if [ -s cracked-$(date +%Y%m%d).txt ]; then echo 'WEAK PASSWORDS DETECTED - Policy Update Required'; else echo 'Password Policy Compliant - Strong Hashing Detected'; fi && echo 'Security Report:' && echo \"Enterprise Password Security Assessment - $(date)\" > password-audit-$(date +%Y%m%d).md && echo 'Enterprise security auditing: authorized password strength testing, policy compliance validation, weak credential detection, security reporting, and comprehensive authentication security assessment for enterprise identity management and security compliance'  # Enterprise authorized password security audit"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "security",
        "safety": "safe",
        "syntaxPattern": "hashcat [options] <hash-file> [wordlist]",
        "prerequisites": [
            "advanced",
            "authorization-required"
        ],
        "commandCombinations": [
            {
                "scenario": "Multi-stage password audit",
                "commands": "hashcat -m 1000 hashes.txt rockyou.txt && hashcat -m 1000 hashes.txt rockyou.txt -r best64.rule",
                "explanation": "Progressive password strength testing",
                "title": "hashcat && hashcat"
            }
        ],
        "relatedCommands": [
            {
                "name": "john",
                "relationship": "similar",
                "reason": "Alternative password recovery tool"
            },
            {
                "name": "hydra",
                "relationship": "similar",
                "reason": "Network service password testing"
            }
        ],
        "warnings": [
            "Requires GPU drivers for optimal performance",
            "Only use for legitimate security testing",
            "May consume significant system resources"
        ],
        "manPageUrl": "https://hashcat.net/wiki/",
        "distroNotes": {}
    },
    {
        "name": "hydra",
        "standsFor": "The Hydra",
        "description": "Network service password security testing tool",
        "examples": [
            "hydra -l admin -P passwords.txt ssh://target.com  # Test SSH service password security",
            "hydra -l admin -P passwords.txt target.com http-post-form \"/login:user=^USER^&pass=^PASS^:F=incorrect\"  # Test web application login security",
            "hydra -L users.txt -P passwords.txt ftp://target.com  # Test FTP service with multiple usernames and passwords",
            "hydra -l admin -P passwords.txt mysql://target.com  # Test MySQL database password security",
            "hydra -L users.txt -P passwords.txt -t 4 -f ssh://target.com  # Use 4 parallel tasks and stop on first success",
            "echo 'Enterprise Security Assessment and Password Policy Validation (AUTHORIZED TESTING ONLY)' && echo 'TARGET: enterprise-test.company.com (AUTHORIZED SECURITY AUDIT)' && echo 'Password Policy Testing:' && hydra -L enterprise-users.txt -P weak-passwords.txt -t 10 -f ssh://enterprise-test.company.com && echo 'Web Application Testing:' && hydra -l admin -P common-passwords.txt enterprise-test.company.com http-post-form \"/admin/login:username=^USER^&password=^PASS^:F=Invalid credentials\" && echo 'Database Security:' && hydra -L db-users.txt -P db-passwords.txt mysql://enterprise-test-db.company.com && echo 'Security Report:' && echo \"Enterprise Security Audit Report - $(date)\" > security-audit-$(date +%Y%m%d).md && echo \"SSH, Web, Database security tested\" >> security-audit-$(date +%Y%m%d).md && echo 'Enterprise authorized security testing: password policy validation, multi-service vulnerability assessment, comprehensive authentication security evaluation, and professional security reporting for enterprise compliance and risk management'  # Enterprise authorized security assessment and password policy validation"
        ],
        "platform": [
            "linux",
            "macos"
        ],
        "category": "security",
        "safety": "safe",
        "syntaxPattern": "hydra [options] <target> <service>",
        "prerequisites": [
            "advanced",
            "authorization-required"
        ],
        "commandCombinations": [
            {
                "scenario": "Multi-service security audit",
                "commands": "hydra -L users.txt -P common.txt ssh://target && hydra -L users.txt -P common.txt ftp://target",
                "explanation": "Test multiple services for weak passwords",
                "title": "hydra && hydra"
            }
        ],
        "relatedCommands": [],
        "warnings": [
            "Only use against systems you own or have permission to test",
            "May trigger account lockouts",
            "Can be detected by intrusion detection systems"
        ],
        "manPageUrl": "https://github.com/vanhauser-thc/thc-hydra",
        "distroNotes": {}
    },
    {
        "name": "iptables",
        "standsFor": "IP Tables",
        "description": "Advanced Linux firewall administration and packet filtering",
        "examples": [
            "sudo iptables -L -n -v  # List all iptables rules with verbose output and line numbers",
            "sudo iptables -A INPUT -p tcp --dport 22 -j ACCEPT  # Allow incoming SSH connections on port 22",
            "sudo iptables -A INPUT -s 192.168.1.100 -j DROP  # Block all traffic from IP address 192.168.1.100",
            "sudo iptables -A INPUT -p tcp -m multiport --dports 80,443 -j ACCEPT  # Allow web traffic on ports 80 and 443",
            "sudo iptables-save > /etc/iptables/rules.v4  # Save current iptables rules to file",
            "sudo iptables-restore < /etc/iptables/rules.v4  # Restore iptables rules from saved file",
            "sudo iptables -I INPUT 1 -s 192.168.1.0/24 -j ACCEPT  # Insert rule at position 1 to allow local network traffic"
        ],
        "platform": [
            "linux"
        ],
        "category": "security",
        "safety": "caution",
        "syntaxPattern": "iptables [options] -t table -j target",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Basic web server firewall",
                "commands": "sudo iptables -F && sudo iptables -A INPUT -i lo -j ACCEPT && sudo iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT && sudo iptables -A INPUT -p tcp --dport 22 -j ACCEPT && sudo iptables -A INPUT -p tcp --dport 80 -j ACCEPT && sudo iptables -A INPUT -p tcp --dport 443 -j ACCEPT && sudo iptables -P INPUT DROP",
                "explanation": "Flush rules, allow loopback, established connections, SSH, HTTP, HTTPS, then drop everything else",
                "title": "sudo && sudo && sudo && sudo && sudo && sudo && sudo"
            }
        ],
        "relatedCommands": [
            {
                "name": "ufw",
                "relationship": "alternative",
                "reason": "Uncomplicated firewall - simpler iptables frontend"
            },
            {
                "name": "firewalld",
                "relationship": "alternative",
                "reason": "Dynamic firewall management daemon"
            }
        ],
        "warnings": [
            "Rules are processed in order",
            "Changes are temporary unless saved",
            "Incorrect rules can lock you out"
        ],
        "manPageUrl": "https://man7.org/linux/man-pages/man8/iptables.8.html",
        "distroNotes": {}
    },
    {
        "name": "istioctl",
        "standsFor": "Istio Control",
        "description": "Service mesh management tool for Istio on Kubernetes",
        "examples": [
            "istioctl install --set values.defaultRevision=default  # Install Istio with default configuration",
            "istioctl analyze  # Check cluster for Istio configuration issues",
            "kubectl label namespace production istio-injection=enabled  # Enable automatic sidecar injection for namespace",
            "istioctl proxy-status  # Display status of all Envoy proxies in mesh",
            "istioctl create-remote-secret --name cluster1 > cluster1-secret.yaml  # Create secret for multi-cluster service mesh",
            "istioctl validate -f virtualservice.yaml  # Validate Istio configuration file syntax",
            "istioctl proxy-config cluster productpage-v1-123456789-abcde.default  # Display Envoy cluster configuration for specific pod",
            "istioctl dashboard kiali  # Open Kiali service mesh observability dashboard",
            "istioctl proxy-config listeners productpage-v1-123.default --port 15006 -o json  # Display detailed Envoy listener configuration for debugging traffic routing"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "security",
        "safety": "safe",
        "syntaxPattern": "istioctl [command] [options]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Complete Istio setup",
                "commands": "istioctl install --set values.defaultRevision=default && kubectl label namespace default istio-injection=enabled && istioctl analyze",
                "explanation": "Install Istio, enable injection for default namespace, and validate",
                "title": "istioctl && kubectl && istioctl"
            },
            {
                "scenario": "Troubleshooting workflow",
                "commands": "istioctl proxy-status && istioctl analyze && istioctl proxy-config cluster productpage-v1-123.default",
                "explanation": "Check proxy status, analyze issues, and inspect specific proxy config",
                "title": "istioctl && istioctl && istioctl"
            }
        ],
        "relatedCommands": [
            {
                "name": "kubectl",
                "relationship": "combo",
                "reason": "Istio runs on Kubernetes and uses kubectl for basic operations"
            },
            {
                "name": "helm",
                "relationship": "alternative",
                "reason": "Helm can also be used to install Istio"
            }
        ],
        "warnings": [
            "Requires Kubernetes cluster with sufficient resources",
            "Sidecar injection must be enabled per namespace",
            "CRDs must be installed before Istio components",
            "Version compatibility with Kubernetes important"
        ],
        "manPageUrl": "https://istio.io/latest/docs/reference/commands/istioctl/",
        "distroNotes": {}
    },
    {
        "name": "john",
        "standsFor": "John the Ripper",
        "description": "Password security auditing and recovery tool for legitimate testing",
        "examples": [
            "john --wordlist=/usr/share/wordlists/rockyou.txt hashes.txt  # Test password strength using dictionary attack",
            "john --show hashes.txt  # Display previously cracked passwords",
            "john --rules --wordlist=custom.txt hashes.txt  # Apply password mangling rules during testing",
            "john --incremental hashes.txt  # Brute force attack with character set progression",
            "john --format=sha256crypt hashes.txt  # Crack SHA-256 Unix password hashes",
            "john --wordlist=combined.txt --rules=jumbo --format=NT hashes.txt --session=audit2024  # Professional password audit with custom wordlist and session management"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "security",
        "safety": "safe",
        "syntaxPattern": "john [options] <password-file>",
        "prerequisites": [
            "advanced",
            "authorization-required"
        ],
        "commandCombinations": [
            {
                "scenario": "Comprehensive password audit",
                "commands": "unshadow /etc/passwd /etc/shadow > combined.txt && john combined.txt",
                "explanation": "Audit system password security (with authorization)",
                "title": "unshadow > combined && john"
            }
        ],
        "relatedCommands": [
            {
                "name": "hashcat",
                "relationship": "similar",
                "reason": "GPU-accelerated password recovery tool"
            },
            {
                "name": "hydra",
                "relationship": "similar",
                "reason": "Network password brute-force tool"
            }
        ],
        "warnings": [
            "Only use on systems you own or have explicit permission",
            "Can be resource intensive",
            "Legal and ethical considerations must be observed"
        ],
        "manPageUrl": "https://www.openwall.com/john/",
        "distroNotes": {}
    },
    {
        "name": "kubectl-secrets-config",
        "standsFor": "Kubernetes Secrets and Config",
        "description": "Kubernetes secrets and configuration management",
        "examples": [
            "kubectl create secret generic app-secrets --from-literal=database-password=secretpass --from-literal=api-key=abc123  # Create secret with multiple key-value pairs from command line",
            "kubectl create secret tls web-tls --cert=path/to/cert.crt --key=path/to/cert.key  # Create TLS secret from certificate and private key files",
            "kubectl create secret docker-registry regcred --docker-server=myregistry.io --docker-username=user --docker-password=pass --docker-email=user@example.com  # Create secret for private Docker registry authentication",
            "kubectl create configmap app-config --from-file=config/ --from-literal=log-level=debug --from-env-file=.env  # Create ConfigMap from directory, literal values, and environment file",
            "echo -n secretvalue | kubectl create secret generic mysecret --dry-run=client --from-file=key=/dev/stdin -o yaml | kubeseal -o yaml  # Create sealed secret that can be safely stored in Git",
            "kubectl create secret tls wildcard-cert --cert=wildcard.crt --key=wildcard.key && kubectl patch deployment webapp -p '{\"spec\":{\"template\":{\"spec\":{\"volumes\":[{\"name\":\"tls-certs\",\"secret\":{\"secretName\":\"wildcard-cert\"}}]}}}}' --dry-run=server  # Create TLS secret and prepare deployment patch with server-side validation",
            "kubectl create secret generic app-secrets-v2 --from-literal=password=newpass && kubectl patch deployment app -p '{\"spec\":{\"template\":{\"spec\":{\"volumes\":[{\"name\":\"secrets\",\"secret\":{\"secretName\":\"app-secrets-v2\"}}]}}}}'  # Create new secret version and update deployment to trigger rolling update"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "security",
        "safety": "safe",
        "syntaxPattern": "kubectl <config-command> [options]",
        "prerequisites": [
            "kubernetes-cluster"
        ],
        "commandCombinations": [
            {
                "scenario": "Secure application deployment",
                "commands": "kubectl create namespace secure-app && kubectl create secret generic db-creds --from-literal=username=admin --from-literal=password=secret123 -n secure-app && kubectl create configmap app-config --from-file=config.yaml -n secure-app",
                "explanation": "Create namespace, secrets, and config for secure application deployment",
                "title": "kubectl && kubectl && kubectl"
            },
            {
                "scenario": "Certificate management workflow",
                "commands": "openssl req -new -newkey rsa:4096 -x509 -sha256 -days 365 -nodes -out cert.crt -keyout cert.key && kubectl create secret tls app-tls --cert=cert.crt --key=cert.key && kubectl annotate secret app-tls cert-manager.io/issuer-name=letsencrypt-prod",
                "explanation": "Generate certificate, create TLS secret, and annotate for cert-manager",
                "title": "openssl && kubectl && kubectl"
            }
        ],
        "relatedCommands": [
            {
                "name": "openssl",
                "relationship": "combo",
                "reason": "Generate certificates and keys for TLS secrets"
            }
        ],
        "warnings": [
            "Secrets are only base64 encoded, not encrypted at rest by default",
            "ConfigMaps have size limits and shouldn't contain sensitive data",
            "Updating secrets doesn't automatically restart pods using them"
        ],
        "manPageUrl": "https://kubernetes.io/docs/concepts/configuration/",
        "distroNotes": {}
    },
    {
        "name": "mysql_config_editor",
        "standsFor": "MySQL Configuration Editor",
        "description": "MySQL configuration utility for secure credential storage",
        "examples": [
            "mysql_config_editor set --login-path=client --host=localhost --user=root --password  # Store encrypted MySQL credentials for default client",
            "mysql_config_editor set --login-path=production --host=prod.server.com --user=appuser --password --port=3306  # Store credentials for production database access",
            "mysql_config_editor print --all  # Display all stored login paths (passwords are hidden)",
            "mysql_config_editor remove --login-path=production  # Delete stored login path configuration",
            "mysql_config_editor reset  # Remove all stored login path configurations",
            "mysql_config_editor set --login-path=backup --host=localhost --user=backup_user --password --socket=/tmp/mysql.sock  # Configure credentials for backup operations"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "security",
        "safety": "safe",
        "syntaxPattern": "mysql_config_editor [command] [options]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Multi-environment setup",
                "commands": "mysql_config_editor set --login-path=dev --host=dev.db.com --user=devuser --password && mysql_config_editor set --login-path=staging --host=staging.db.com --user=staginguser --password",
                "explanation": "Configure separate credentials for development and staging",
                "title": "mysql_config_editor && mysql_config_editor"
            }
        ],
        "relatedCommands": [
            {
                "name": "mysql",
                "relationship": "combo",
                "reason": "Uses login paths created by mysql_config_editor"
            },
            {
                "name": "mysqldump",
                "relationship": "combo",
                "reason": "Can use login paths for secure backup operations"
            }
        ],
        "warnings": [
            "Login paths are stored in ~/.mylogin.cnf with encryption",
            "Passwords are encrypted but not salted",
            "File permissions should be restricted to owner only"
        ],
        "manPageUrl": "",
        "distroNotes": {}
    },
    {
        "name": "mysql_secure_installation",
        "standsFor": "MySQL Secure Installation",
        "description": "MySQL security configuration and hardening script",
        "examples": [
            "mysql_secure_installation  # Run interactive security hardening script",
            "mysql_secure_installation --use-default  # Apply security settings with default answers",
            "mysql_secure_installation -h remote.server.com -P 3306  # Secure MySQL server on remote host"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "security",
        "safety": "safe",
        "syntaxPattern": "mysql_secure_installation [options]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Complete MySQL setup",
                "commands": "systemctl start mysql && mysql_secure_installation && systemctl enable mysql",
                "explanation": "Start MySQL, secure it, then enable auto-start",
                "title": "systemctl && mysql_secure_installation && systemctl"
            }
        ],
        "relatedCommands": [
            {
                "name": "mysql",
                "relationship": "combo",
                "reason": "Used after securing to connect to MySQL"
            },
            {
                "name": "mysqladmin",
                "relationship": "combo",
                "reason": "Administrative tasks after security setup"
            }
        ],
        "warnings": [
            "Script modifies root password and removes test databases",
            "Should be run immediately after fresh MySQL installation",
            "Some steps may not apply to all MySQL versions"
        ],
        "manPageUrl": "",
        "distroNotes": {}
    },
    {
        "name": "openssl",
        "standsFor": "OpenSSL",
        "description": "Toolkit for SSL/TLS cryptography and certificate management",
        "examples": [
            "openssl genrsa -out private.key 2048  # Generate 2048-bit RSA private key",
            "openssl req -new -key private.key -out request.csr  # Generate CSR from private key",
            "openssl req -x509 -newkey rsa:2048 -keyout key.pem -out cert.pem -days 365  # Create self-signed certificate valid for 1 year",
            "openssl x509 -in cert.pem -text -noout  # Display certificate information in readable format",
            "openssl s_client -connect google.com:443  # Test SSL/TLS connection to remote server",
            "openssl enc -aes-256-cbc -salt -in file.txt -out file.enc  # Encrypt file using AES-256 encryption",
            "openssl enc -aes-256-cbc -d -in file.enc -out file.txt  # Decrypt previously encrypted file",
            "openssl rand -hex 32  # Generate 32 bytes of random data in hexadecimal",
            "openssl dgst -sha256 file.txt  # Calculate SHA-256 hash of file",
            "openssl req -x509 -newkey rsa:4096 -keyout server.key -out server.crt -days 365 -nodes -subj '/CN=*.example.com/O=Company/C=US' -extensions v3_req -config <(echo '[req]'; echo 'distinguished_name=req'; echo '[v3_req]'; echo 'subjectAltName=DNS:*.example.com,DNS:example.com,IP:10.0.0.100') && openssl pkcs12 -export -out server.p12 -inkey server.key -in server.crt -passout pass: && openssl x509 -in server.crt -noout -text | grep -E '(Subject|DNS|Valid)' && echo \"Enterprise SSL certificate generated: 4096-bit RSA, wildcard domain, SAN extensions, PKCS#12 format ready for load balancers\"  # Production-grade SSL certificate generation with strong encryption, multiple domains, and enterprise deployment formats"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "security",
        "safety": "safe",
        "syntaxPattern": "openssl <command> [options]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Complete certificate creation",
                "commands": "openssl genrsa -out server.key 2048 && openssl req -new -key server.key -out server.csr && openssl x509 -req -days 365 -in server.csr -signkey server.key -out server.crt",
                "explanation": "Generate key, create CSR, then self-sign certificate",
                "title": "openssl && openssl && openssl"
            }
        ],
        "relatedCommands": [
            {
                "name": "gpg",
                "relationship": "alternative",
                "reason": "GPG provides PGP encryption, OpenSSL handles X.509 certificates"
            },
            {
                "name": "ssh-keygen",
                "relationship": "similar",
                "reason": "Both generate cryptographic keys for different purposes"
            }
        ],
        "warnings": [
            "Private keys should be kept secure and never shared",
            "Certificate validity periods are important for security",
            "Different algorithms have different security levels"
        ],
        "manPageUrl": "https://www.openssl.org/docs/",
        "distroNotes": {}
    },
    {
        "name": "passwd",
        "standsFor": "password",
        "description": "Change user password",
        "examples": [
            "passwd  # Change password for current user",
            "sudo passwd username  # Change password for specified user (requires root)",
            "sudo passwd -l username  # Lock user account to prevent login",
            "sudo passwd -u username  # Unlock previously locked user account",
            "sudo passwd -e username  # Expire password to force user to change it",
            "passwd -S username  # Display password aging information",
            "passwd -S username  # Check password status for user"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "security",
        "safety": "caution",
        "syntaxPattern": "passwd [username]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Create user with password",
                "commands": "sudo useradd newuser && sudo passwd newuser",
                "explanation": "Create new user account and set initial password",
                "title": "sudo && sudo"
            },
            {
                "scenario": "Security audit password status",
                "commands": "for user in $(cut -d: -f1 /etc/passwd); do echo -n \"$user: \"; passwd -S $user 2>/dev/null; done",
                "explanation": "Check password status for all system users",
                "title": "for ; do ; passwd > ; done"
            }
        ],
        "relatedCommands": [
            {
                "name": "chage",
                "relationship": "similar",
                "reason": "More detailed password aging and expiration management"
            }
        ],
        "warnings": [
            "Password complexity rules enforced by PAM",
            "Root can change any user's password without knowing current password",
            "Password changes take effect immediately"
        ],
        "manPageUrl": "https://man7.org/linux/man-pages/man1/passwd.1.html",
        "distroNotes": {
            "windows": "Available in WSL; Windows uses net user command"
        }
    },
    {
        "name": "ssh-keygen",
        "standsFor": "SSH key generator",
        "description": "Generate SSH authentication key pairs",
        "examples": [
            "ssh-keygen  # Create RSA key pair with interactive prompts",
            "ssh-keygen -t ed25519 -C 'user@example.com'  # Create modern Ed25519 key with comment",
            "ssh-keygen -t rsa -b 4096 -N '' -f ~/.ssh/id_rsa_nopass  # Create 4096-bit RSA key without password for automation",
            "ssh-keygen -p -f ~/.ssh/id_rsa  # Change passphrase for existing private key",
            "ssh-keygen -lf ~/.ssh/id_rsa.pub  # Display fingerprint of public key",
            "ssh-keygen -e -f ~/.ssh/id_rsa.pub  # Export public key in RFC4716 format"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "security",
        "safety": "safe",
        "syntaxPattern": "ssh-keygen [options]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Generate and deploy key",
                "commands": "ssh-keygen -t ed25519 -f ~/.ssh/server_key && ssh-copy-id -i ~/.ssh/server_key user@server",
                "explanation": "Generate key and install public key on remote server",
                "title": "ssh && ssh"
            },
            {
                "scenario": "Verify key matches",
                "commands": "ssh-keygen -lf ~/.ssh/id_rsa.pub && ssh user@server 'ssh-keygen -lf ~/.ssh/authorized_keys'",
                "explanation": "Compare local and remote key fingerprints",
                "title": "ssh && ssh"
            }
        ],
        "relatedCommands": [
            {
                "name": "ssh",
                "relationship": "combo",
                "reason": "Use keys generated by ssh-keygen for authentication"
            }
        ],
        "warnings": [
            "Default saves to ~/.ssh/id_rsa unless -f specified",
            "Public key (.pub) is safe to share, private key is secret",
            "Ed25519 keys are preferred over RSA for new installations"
        ],
        "manPageUrl": "https://man7.org/linux/man-pages/man1/ssh-keygen.1.html",
        "distroNotes": {
            "windows": "Available in Windows 10+ or WSL"
        }
    },
    {
        "name": "syft",
        "standsFor": "Syft",
        "description": "Generate Software Bill of Materials (SBOM) from container images and filesystems",
        "examples": [
            "syft myregistry/myapp:v1.0.0  # Create software bill of materials for container image",
            "syft myregistry/myapp:v1.0.0 -o spdx-json  # Output SBOM in SPDX JSON format",
            "syft myregistry/myapp:v1.0.0 -o cyclonedx-json  # Output SBOM in CycloneDX JSON format",
            "syft dir:/path/to/project -o json  # Generate SBOM from local filesystem directory",
            "syft docker-archive:image.tar  # Generate SBOM from Docker image tarball",
            "syft myregistry/myapp:v1.0.0 -o spdx-json > sbom.json  # Generate SBOM and save to file",
            "syft myregistry/myapp:v1.0.0 --scope all-layers  # Scan all layers including base image packages",
            "syft myregistry/myapp:v1.0.0 -q -o json  # Generate SBOM with minimal logging output"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "security",
        "safety": "safe",
        "syntaxPattern": "syft [source] [options]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "SBOM generation and signing",
                "commands": "syft myregistry/myapp:v1.0.0 -o spdx-json > sbom.spdx.json && cosign attest --predicate sbom.spdx.json --type spdxjson --key cosign.key myregistry/myapp:v1.0.0",
                "explanation": "Generate SBOM and attach it as attestation to image",
                "title": "syft > sbom && cosign"
            },
            {
                "scenario": "Multi-format SBOM export",
                "commands": "syft myregistry/myapp:v1.0.0 -o spdx-json > sbom.spdx.json && syft myregistry/myapp:v1.0.0 -o cyclonedx-json > sbom.cyclonedx.json",
                "explanation": "Generate SBOMs in multiple standard formats",
                "title": "syft > sbom && syft > sbom"
            }
        ],
        "relatedCommands": [
            {
                "name": "grype",
                "relationship": "combo",
                "reason": "Grype uses Syft SBOMs for vulnerability scanning"
            },
            {
                "name": "cosign",
                "relationship": "combo",
                "reason": "Cosign can attach Syft SBOMs as attestations"
            }
        ],
        "warnings": [
            "Different package managers detected automatically",
            "SBOM accuracy depends on package manager metadata quality",
            "Large images may take significant time to analyze",
            "Some package types require specific analysis configuration"
        ],
        "manPageUrl": "https://github.com/anchore/syft",
        "distroNotes": {}
    },
    {
        "name": "tcpdump",
        "standsFor": "TCP Dump",
        "description": "Advanced network packet capture and analysis tool",
        "examples": [
            "sudo tcpdump -i eth0 tcp port 22  # Capture SSH traffic on eth0 interface",
            "sudo tcpdump -i any -X -s 0 port 80  # Capture HTTP packets with hex and ASCII output",
            "sudo tcpdump -i eth0 -w capture.pcap -C 100 -W 5  # Save to file, rotate at 100MB, keep 5 files",
            "sudo tcpdump -i any -n port 53  # Monitor DNS traffic without hostname resolution",
            "sudo tcpdump -i any host 192.168.1.100 and host 192.168.1.200  # Capture traffic between two specific hosts",
            "sudo tcpdump -i eth0 -l | grep -E '(GET|POST)'  # Monitor HTTP requests in real-time"
        ],
        "platform": [
            "linux",
            "macos"
        ],
        "category": "security",
        "safety": "caution",
        "syntaxPattern": "tcpdump [options] [filter]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Complete network forensics",
                "commands": "sudo tcpdump -i any -w evidence.pcap -s 0 && wireshark evidence.pcap",
                "explanation": "Capture full packets to file then analyze with Wireshark",
                "title": "sudo && wireshark"
            }
        ],
        "relatedCommands": [
            {
                "name": "wireshark",
                "relationship": "combo",
                "reason": "GUI tool for analyzing tcpdump captures"
            }
        ],
        "warnings": [
            "Requires root privileges for most operations",
            "Can capture sensitive data"
        ],
        "manPageUrl": "https://man7.org/linux/man-pages/man1/tcpdump.1.html",
        "distroNotes": {}
    },
    {
        "name": "ufw",
        "standsFor": "Uncomplicated Firewall",
        "description": "Uncomplicated Firewall - simplified iptables management",
        "examples": [
            "sudo ufw enable  # Enable UFW firewall",
            "sudo ufw status verbose  # Show detailed firewall status and rules",
            "sudo ufw allow ssh  # Allow SSH connections (port 22)",
            "sudo ufw allow 8080/tcp  # Allow TCP connections on port 8080",
            "sudo ufw allow from 192.168.1.0/24  # Allow all traffic from specific subnet",
            "sudo ufw delete 3  # Delete firewall rule number 3"
        ],
        "platform": [
            "linux"
        ],
        "category": "security",
        "safety": "dangerous",
        "syntaxPattern": "ufw [options] command",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Web server firewall setup",
                "commands": "sudo ufw reset && sudo ufw default deny incoming && sudo ufw default allow outgoing && sudo ufw allow ssh && sudo ufw allow 'Apache Full' && sudo ufw enable",
                "explanation": "Reset firewall, set defaults, allow SSH and Apache, enable firewall",
                "title": "sudo && sudo && sudo && sudo && sudo && sudo"
            }
        ],
        "relatedCommands": [
            {
                "name": "iptables",
                "relationship": "alternative",
                "reason": "UFW is a frontend for iptables"
            }
        ],
        "warnings": [
            "UFW is a frontend to iptables",
            "Application profiles simplify common configurations"
        ],
        "manPageUrl": "https://man7.org/linux/man-pages/man8/iptables.8.html",
        "distroNotes": {}
    },
    {
        "name": "usermod",
        "standsFor": "User Modify",
        "description": "Modify user account properties and group memberships",
        "examples": [
            "sudo usermod -aG docker username  # Add user to docker group while preserving other groups",
            "sudo usermod -s /bin/zsh username  # Change default shell for user",
            "sudo usermod -L username  # Lock user account by disabling password",
            "sudo usermod -U username  # Unlock previously locked user account",
            "sudo usermod -d /new/home/path -m username  # Move user home directory to new location",
            "sudo usermod -e 2024-12-31 username  # Set account to expire on specific date"
        ],
        "platform": [
            "linux",
            "macos"
        ],
        "category": "security",
        "safety": "caution",
        "syntaxPattern": "usermod [options] username",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Complete user migration",
                "commands": "sudo usermod -d /new/home -m username && sudo usermod -s /bin/bash username",
                "explanation": "Move home directory and change shell",
                "title": "sudo && sudo"
            }
        ],
        "relatedCommands": [
            {
                "name": "groupmod",
                "relationship": "similar",
                "reason": "Modifies group properties"
            }
        ],
        "warnings": [
            "Moving home directory may break applications",
            "User must not be logged in during home directory changes"
        ],
        "manPageUrl": "https://man7.org/linux/man-pages/man8/usermod.8.html",
        "distroNotes": {}
    }
];

export { securityCommands };
export default securityCommands;
