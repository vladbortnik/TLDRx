/**
 * TL;DRx Commands Database - Networking Category
 *
 * Contains 29 commands related to networking.
 * Generated from the original commands.js file.
 *
 * @fileoverview Networking category commands for TL;DRx
 * @category networking
 * @commands 29
 */

/**
 * Networking category commands
 * @type {Array<Object>}
 */
const networkingCommands = [
    {
        "name": "ab",
        "standsFor": "Apache Bench",
        "description": "Apache HTTP server benchmarking tool",
        "examples": [
            "ab -n 1000 -c 10 http://example.com/  # Send 1000 requests with concurrency of 10",
            "ab -n 1000 -c 10 -k http://example.com/  # Use HTTP keep-alive connections for testing",
            "ab -n 100 -c 5 -p data.json -T 'application/json' http://api.example.com/endpoint  # Test POST endpoint with JSON data",
            "ab -n 500 -c 5 -A username:password http://example.com/protected/  # Test protected endpoint with basic auth",
            "ab -n 100 -c 5 -H 'Accept: application/json' http://api.example.com/  # Include custom HTTP headers in requests",
            "ab -n 100 -c 10 http://example.com/  # 100 requests with 10 concurrent connections",
            "ab -t 30 -c 10 http://example.com/  # Run for 30 seconds with 10 concurrent connections",
            "ab -n 500 -c 25 -g results.gnuplot http://example.com/  # Output results for gnuplot"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "networking",
        "safety": "caution",
        "syntaxPattern": "ab [options] [http[s]://]hostname[:port]/path",
        "prerequisites": [
            "networking"
        ],
        "commandCombinations": [
            {
                "scenario": "Comprehensive API load test",
                "commands": "ab -n 1000 -c 20 -g results.tsv http://api.example.com/ && gnuplot plot-results.plt",
                "explanation": "Run load test and generate performance graphs",
                "title": "ab && gnuplot"
            }
        ],
        "relatedCommands": [
            {
                "name": "wrk",
                "relationship": "modern-alternative",
                "reason": "wrk provides more advanced load testing capabilities"
            },
            {
                "name": "curl",
                "relationship": "simple-alternative",
                "reason": "curl can test individual requests"
            }
        ],
        "warnings": [
            "Don't run against production servers without permission",
            "High concurrency can overwhelm target servers",
            "Only supports HTTP 1.0 protocol",
            "Single-threaded regardless of concurrency level",
            "Always test from different machine than target server"
        ],
        "manPageUrl": "https://httpd.apache.org/docs/2.4/programs/ab.html",
        "distroNotes": {
            "linux": "Part of apache2-utils package",
            "macos": "Pre-installed with system",
            "windows": "Available with Apache HTTP Server installation"
        }
    },
    {
        "name": "apache2",
        "standsFor": "Apache HTTP Server",
        "description": "Apache HTTP Server for web hosting and applications",
        "examples": [
            "apache2ctl start  # Start Apache web server",
            "apache2ctl stop  # Stop Apache web server",
            "apache2ctl restart  # Restart Apache server",
            "apache2ctl configtest  # Test configuration file syntax",
            "apache2ctl graceful  # Graceful restart without dropping connections",
            "apache2 -t  # Test configuration syntax",
            "apache2 -S  # Show virtual host configuration",
            "apache2ctl status  # Show server status information"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "networking",
        "safety": "caution",
        "syntaxPattern": "apache2ctl <command> / apache2 [options]",
        "prerequisites": [
            "root"
        ],
        "commandCombinations": [
            {
                "scenario": "Deploy new site configuration",
                "commands": "sudo a2ensite mysite.conf && apache2ctl configtest && sudo apache2ctl reload",
                "explanation": "Enable site, test config, then reload Apache",
                "title": "sudo && apache2ctl && sudo"
            },
            {
                "scenario": "Enable SSL for site",
                "commands": "sudo a2enmod ssl && sudo a2ensite mysite-ssl.conf && sudo apache2ctl graceful",
                "explanation": "Enable SSL module, enable SSL site, graceful restart",
                "title": "sudo && sudo && sudo"
            }
        ],
        "relatedCommands": [
            {
                "name": "nginx",
                "relationship": "alternative",
                "reason": "Alternative web server with different architecture"
            },
            {
                "name": "systemctl",
                "relationship": "combo",
                "reason": "Manage Apache as systemd service"
            },
            {
                "name": "certbot",
                "relationship": "combo",
                "reason": "Automate SSL certificate management"
            }
        ],
        "warnings": [
            "Module and site management commands vary by distribution",
            "Configuration syntax different from nginx",
            "Performance tuning requires understanding of MPM modules"
        ],
        "manPageUrl": "https://httpd.apache.org/docs/2.4/",
        "distroNotes": {
            "linux": "Package name varies: apache2 (Debian/Ubuntu), httpd (RHEL/CentOS)",
            "macos": "Pre-installed or via Homebrew",
            "windows": "Download from Apache Lounge or use XAMPP"
        }
    },
    {
        "name": "arp",
        "standsFor": "Address Resolution Protocol",
        "description": "Display and manipulate Address Resolution Protocol cache",
        "examples": [
            "arp -a  # Display all entries in ARP cache",
            "arp 192.168.1.1  # Show ARP entry for specific IP address",
            "arp -s 192.168.1.100 aa:bb:cc:dd:ee:ff  # Add static ARP mapping (requires root)",
            "arp -d 192.168.1.100  # Remove ARP entry from cache",
            "arp -n  # Display IP addresses instead of hostnames"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "networking",
        "safety": "dangerous",
        "syntaxPattern": "arp [options] [hostname]",
        "prerequisites": [
            "networking"
        ],
        "commandCombinations": [
            {
                "scenario": "Network device discovery",
                "commands": "ping -c 1 192.168.1.{1..254} 2>/dev/null & arp -a | grep -v incomplete",
                "explanation": "Ping network range then show discovered devices",
                "title": "ping > & arp | grep"
            }
        ],
        "relatedCommands": [
            {
                "name": "ip",
                "relationship": "modern-alternative",
                "reason": "ip neigh provides similar functionality with more features"
            }
        ],
        "warnings": [
            "ARP entries expire automatically",
            "May require root privileges for modifications",
            "Limited to local network segment"
        ],
        "manPageUrl": "https://man7.org/linux/man-pages/man8/arp.8.html",
        "distroNotes": {}
    },
    {
        "name": "curl",
        "standsFor": "client URL",
        "description": "Transfer data to/from servers using various protocols",
        "examples": [
            "curl -O https://example.com/file.zip  # Download file and save with original filename",
            "curl https://api.example.com/users  # Fetch data from REST API endpoint",
            "curl -X POST -H 'Content-Type: application/json' -d '{\"name\":\"John\"}' https://api.example.com/users  # Send JSON payload to API endpoint",
            "curl -L https://short.url/redirect  # Follow HTTP redirects to final destination",
            "curl -I https://example.com  # Show HTTP headers without downloading body",
            "curl -H 'Authorization: Bearer token123' https://api.example.com/protected  # Include authentication header in request",
            "curl -X PUT -T upload.txt ftp://user:pass@ftp.example.com/  # Upload file via FTP protocol",
            "echo --example-usage  # Simplified example for echo command"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "networking",
        "safety": "caution",
        "syntaxPattern": "curl [options] <URL>",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Monitor API response time",
                "commands": "curl -w '%{time_total}\\n' -o /dev/null -s https://api.example.com",
                "explanation": "Measure total time for API request",
                "title": "curl"
            },
            {
                "scenario": "Download and pipe to processing",
                "commands": "curl -s https://api.example.com/data.json | jq '.'",
                "explanation": "Fetch JSON data and format it with jq",
                "title": "curl | jq"
            }
        ],
        "relatedCommands": [
            {
                "name": "wget",
                "relationship": "alternative",
                "reason": "Alternative tool for downloading files"
            },
            {
                "name": "jq",
                "relationship": "combo",
                "reason": "Process JSON responses from curl"
            }
        ],
        "warnings": [
            "curl doesn't follow redirects by default (use -L)",
            "Large downloads may timeout without progress indicator",
            "SSL certificate errors can be bypassed with -k (insecure)"
        ],
        "manPageUrl": "https://man7.org/linux/man-pages/man1/curl.1.html",
        "distroNotes": {
            "linux": "Pre-installed on most distributions",
            "windows": "Available in Windows 10+ or via package managers",
            "macos": "Pre-installed"
        }
    },
    {
        "name": "dig",
        "standsFor": "Domain Information Groper",
        "description": "Flexible DNS lookup tool with detailed output",
        "examples": [
            "dig google.com  # Look up A records for google.com",
            "dig google.com MX  # Look up mail exchange records",
            "dig +short google.com  # Show only the IP address result",
            "dig -x 8.8.8.8  # Reverse lookup for IP address",
            "dig @8.8.8.8 google.com  # Query using specific DNS server",
            "dig +trace google.com  # Show complete DNS resolution path",
            "dig google.com ANY  # Attempt to retrieve all DNS records"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "networking",
        "safety": "safe",
        "syntaxPattern": "dig [options] [name] [type]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "DNS troubleshooting",
                "commands": "dig google.com && dig @8.8.8.8 google.com && dig @1.1.1.1 google.com",
                "explanation": "Compare results from different DNS servers",
                "title": "dig && dig && dig"
            }
        ],
        "relatedCommands": [
            {
                "name": "nslookup",
                "relationship": "alternative",
                "reason": "Traditional DNS lookup tool with different interface"
            }
        ],
        "warnings": [
            "Output can be verbose without +short option",
            "ANY queries may not return all record types on some servers",
            "Requires bind-utils package on some distributions"
        ],
        "manPageUrl": "https://ss64.com/osx/dig.html",
        "distroNotes": {}
    },
    {
        "name": "ethtool",
        "standsFor": "Ethernet Tool",
        "description": "Display and modify network interface settings",
        "examples": [
            "ethtool eth0  # Display network interface settings and capabilities",
            "ethtool -S eth0  # Display detailed network interface statistics",
            "ethtool eth0 | grep 'Link detected'  # Check if network cable is connected",
            "ethtool -s eth0 speed 1000 duplex full  # Set interface to 1Gbps full-duplex",
            "ethtool -i eth0  # Display network driver information",
            "ethtool -t eth0  # Run self-test on network interface",
            "ethtool -g eth0  # Display receive/transmit ring buffer settings",
            "ethtool eth0 && ethtool -S eth0 | grep -E '(rx_errors|tx_errors|rx_dropped|tx_dropped|collisions)' && ethtool -i eth0 && ethtool -k eth0 | grep -E '(tcp|udp|gso|tso)' && ifconfig eth0 | grep -E '(UP|RUNNING|packets|errors)' && echo 'Enterprise network diagnostics: interface status, error statistics, driver information, hardware offloading capabilities, and comprehensive connectivity analysis for production network troubleshooting'  # Enterprise network interface diagnostic suite"
        ],
        "platform": [
            "linux"
        ],
        "category": "networking",
        "safety": "safe",
        "syntaxPattern": "ethtool [options] interface",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Network interface diagnosis",
                "commands": "ethtool eth0 && ethtool -S eth0 | head -20 && ethtool -i eth0",
                "explanation": "Comprehensive network interface information",
                "title": "ethtool && ethtool | head && ethtool"
            }
        ],
        "relatedCommands": [
            {
                "name": "ip",
                "relationship": "complementary",
                "reason": "ip manages interface addresses, ethtool manages hardware settings"
            }
        ],
        "warnings": [
            "Linux-specific tool, not available on other platforms",
            "Requires root privileges for modifications",
            "Can disrupt network connectivity if misconfigured"
        ],
        "manPageUrl": "https://man7.org/linux/man-pages/man8/ethtool.8.html",
        "distroNotes": {}
    },
    {
        "name": "haproxy",
        "standsFor": "High Availability Proxy",
        "description": "High availability load balancer and proxy server",
        "examples": [
            "sudo haproxy -f /etc/haproxy/haproxy.cfg  # Start HAProxy with configuration file",
            "haproxy -c -f /etc/haproxy/haproxy.cfg  # Validate HAProxy configuration file",
            "sudo haproxy -D -f /etc/haproxy/haproxy.cfg  # Start HAProxy as background daemon",
            "haproxy -v  # Display HAProxy version and build info",
            "sudo haproxy -f haproxy.cfg -sf $(cat /var/run/haproxy.pid)  # Gracefully reload configuration without dropping connections",
            "haproxy -db -f /etc/haproxy/haproxy.cfg  # Start in debug mode with detailed logging",
            "echo 'Enterprise Load Balancer and High Availability Infrastructure' && echo 'HAProxy Configuration Validation:' && haproxy -c -f /etc/haproxy/enterprise.cfg && echo 'Backend Health Check:' && for backend in web-01 web-02 web-03 api-01 api-02; do echo \"Checking $backend...\"; curl -f -s -o /dev/null http://$backend.enterprise.local:8080/health && echo \"$backend: UP\" || echo \"$backend: DOWN\"; done && echo 'Load Balancer Deployment:' && sudo haproxy -f /etc/haproxy/enterprise.cfg -sf $(cat /var/run/haproxy.pid) && sleep 5 && echo 'Traffic Distribution Test:' && for i in {1..10}; do curl -s http://load-balancer.enterprise.com/api/status | jq -r '.server'; done | sort | uniq -c && echo 'SSL Certificate Validation:' && openssl s_client -connect load-balancer.enterprise.com:443 -servername load-balancer.enterprise.com < /dev/null 2>/dev/null | openssl x509 -noout -dates && echo 'Enterprise load balancing: configuration validation, backend health monitoring, zero-downtime deployment, traffic distribution testing, SSL certificate management, and high availability infrastructure for enterprise web services'  # Enterprise load balancer and high availability infrastructure"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "networking",
        "safety": "caution",
        "syntaxPattern": "haproxy [options]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Deploy configuration changes",
                "commands": "haproxy -c -f haproxy.cfg && sudo haproxy -f haproxy.cfg -sf $(cat /var/run/haproxy.pid)",
                "explanation": "Test config then gracefully reload",
                "title": "haproxy && sudo"
            }
        ],
        "relatedCommands": [
            {
                "name": "nginx",
                "relationship": "alternative",
                "reason": "nginx can also function as load balancer"
            },
            {
                "name": "systemctl",
                "relationship": "combo",
                "reason": "Manage haproxy as systemd service"
            },
            {
                "name": "curl",
                "relationship": "combo",
                "reason": "Test load balancing and health checks"
            }
        ],
        "warnings": [
            "Configuration changes require careful testing",
            "Statistics page needs proper access controls",
            "SSL termination configuration can be complex"
        ],
        "manPageUrl": "http://www.haproxy.org/download/2.4/doc/management.txt",
        "distroNotes": {}
    },
    {
        "name": "httpd",
        "standsFor": "HTTP daemon",
        "description": "Apache HTTP Server daemon (RHEL/CentOS naming)",
        "examples": [
            "httpd -t  # Check Apache configuration files for syntax errors",
            "httpd -D FOREGROUND  # Start Apache in foreground for debugging",
            "httpd -l  # List compiled-in modules",
            "httpd -M  # List loaded modules including dynamic ones",
            "httpd -v  # Display Apache version information",
            "httpd -S  # Show parsed virtual host and server settings",
            "httpd -k graceful  # Gracefully restart Apache without dropping connections",
            "echo 'Enterprise Apache HTTP Server Management and Operations' && httpd -t && echo 'Configuration Status: OK' && httpd -S | grep -E '(VirtualHost|NameVirtualHost)' && echo 'SSL Certificate Validation:' && for cert in /etc/httpd/ssl/*.crt; do echo \"Checking $cert\"; openssl x509 -in \"$cert\" -noout -dates -subject; done && echo 'Performance Monitoring:' && httpd -M | grep -E '(mod_status|mod_info|mod_ssl)' && curl -s http://localhost/server-status?auto | head -10 && echo 'Log Analysis:' && tail -20 /var/log/httpd/access_log | awk '{print $1}' | sort | uniq -c | sort -nr && echo 'Enterprise Apache management: configuration validation, virtual host verification, SSL certificate monitoring, performance module checking, real-time status monitoring, and access log analysis for enterprise web server operations'  # Enterprise Apache HTTP Server management and monitoring"
        ],
        "platform": [
            "linux"
        ],
        "category": "networking",
        "safety": "safe",
        "syntaxPattern": "httpd [options]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Diagnose configuration issues",
                "commands": "httpd -t && httpd -S",
                "explanation": "Test config syntax then show parsed configuration",
                "title": "httpd && httpd"
            },
            {
                "scenario": "Debug module loading",
                "commands": "httpd -l && httpd -M",
                "explanation": "Show compiled modules then loaded modules",
                "title": "httpd && httpd"
            }
        ],
        "relatedCommands": [
            {
                "name": "apache2",
                "relationship": "similar",
                "reason": "Same software, different package naming on Debian/Ubuntu"
            },
            {
                "name": "systemctl",
                "relationship": "combo",
                "reason": "Manage httpd service with systemctl"
            }
        ],
        "warnings": [
            "Configuration paths differ from Debian-based systems",
            "Module management done differently than a2enmod",
            "SELinux policies may affect httpd on RHEL systems"
        ],
        "manPageUrl": "https://httpd.apache.org/docs/2.4/programs/httpd.html",
        "distroNotes": {
            "linux": "Red Hat, CentOS, Fedora use httpd instead of apache2"
        }
    },
    {
        "name": "iftop",
        "standsFor": "Interface Top",
        "description": "Display bandwidth usage on network interfaces",
        "examples": [
            "sudo iftop  # Show real-time network bandwidth usage",
            "sudo iftop -i eth0  # Monitor traffic only on eth0 interface",
            "sudo iftop -P  # Display port numbers instead of service names",
            "sudo iftop -n  # Show IP addresses without DNS lookups",
            "sudo iftop -B  # Display bandwidth rates in bytes per second instead of bits",
            "echo 'Enterprise Network Monitoring and Bandwidth Analysis' && echo 'Network Interface Status:' && ip link show | grep -E '(UP|DOWN)' && echo 'Real-time Bandwidth Monitoring:' && timeout 30s sudo iftop -i eth0 -P -n -B -t | head -50 > network-analysis-$(date +%Y%m%d-%H%M%S).txt && echo 'Top Bandwidth Consumers:' && netstat -i && echo 'Network Security Monitoring:' && ss -tuln | grep -E '(LISTEN|ESTABLISHED)' | wc -l && echo 'Firewall Status:' && sudo iptables -L INPUT | grep -E '(ACCEPT|DROP|REJECT)' | wc -l && echo 'Enterprise Monitoring Summary:' && echo \"Network: $(ip route | grep default | awk '{print $5}')\" && echo \"Active Connections: $(ss -tuln | wc -l)\" && echo 'Enterprise network monitoring: real-time bandwidth analysis, security connection tracking, firewall validation, and comprehensive network infrastructure monitoring for enterprise operations and security compliance'  # Enterprise network monitoring and security analysis"
        ],
        "platform": [
            "linux",
            "macos"
        ],
        "category": "networking",
        "safety": "caution",
        "syntaxPattern": "iftop [options]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Detailed network analysis",
                "commands": "sudo iftop -P -n -i eth0",
                "explanation": "Monitor eth0 with ports and IPs, no DNS resolution",
                "title": "sudo"
            }
        ],
        "relatedCommands": [
            {
                "name": "netstat",
                "relationship": "similar",
                "reason": "Both show network connection information"
            },
            {
                "name": "ss",
                "relationship": "similar",
                "reason": "Modern alternative for network socket statistics"
            }
        ],
        "warnings": [
            "Requires root privileges for most functionality",
            "High CPU usage on busy networks"
        ],
        "manPageUrl": "",
        "distroNotes": {}
    },
    {
        "name": "ip",
        "standsFor": "IP",
        "description": "Show and manipulate routing, devices, policy routing and tunnels",
        "examples": [
            "ip addr show  # Display IP addresses assigned to all interfaces",
            "ip route show  # Display kernel routing table",
            "sudo ip addr add 192.168.1.100/24 dev eth0  # Assign IP address to ethernet interface",
            "sudo ip link set eth0 up  # Enable network interface",
            "ip -s link show  # Display network interface statistics",
            "sudo ip route add default via 192.168.1.1  # Set default gateway for routing"
        ],
        "platform": [
            "linux"
        ],
        "category": "networking",
        "safety": "caution",
        "syntaxPattern": "ip [options] object command",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Network interface configuration",
                "commands": "sudo ip link set eth0 up && sudo ip addr add 192.168.1.100/24 dev eth0 && sudo ip route add default via 192.168.1.1",
                "explanation": "Enable interface, assign IP, set default route",
                "title": "sudo && sudo && sudo"
            }
        ],
        "relatedCommands": [
            {
                "name": "route",
                "relationship": "alternative",
                "reason": "Legacy routing table manipulation command"
            }
        ],
        "warnings": [
            "Modern replacement for ifconfig and route commands",
            "Changes are not persistent across reboots without configuration"
        ],
        "manPageUrl": "https://man7.org/linux/man-pages/man8/ip.8.html",
        "distroNotes": {}
    },
    {
        "name": "iperf3",
        "standsFor": "Internet Performance 3",
        "description": "Network bandwidth testing tool",
        "examples": [
            "iperf3 -s  # Run iperf3 in server mode listening on port 5201",
            "iperf3 -c server-ip  # Test network performance to iperf3 server",
            "iperf3 -c server-ip -u -b 100M  # Test UDP bandwidth at 100Mbps",
            "iperf3 -c server-ip --bidir  # Test bandwidth in both directions simultaneously",
            "iperf3 -c server-ip -t 60  # Run test for 60 seconds",
            "iperf3 -c server-ip -P 4  # Use 4 parallel streams for testing",
            "iperf3 -c server-ip -R  # Test reverse direction (server to client)",
            "iperf3 -c server-ip -t 60 -i 5 -J > results.json  # Run 60-second test with 5-second intervals, output JSON format for analysis"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "networking",
        "safety": "safe",
        "syntaxPattern": "iperf3 [options]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Comprehensive network test",
                "commands": "iperf3 -c server -t 30 && iperf3 -c server -u -b 50M -t 30",
                "explanation": "Test both TCP and UDP performance",
                "title": "iperf3 && iperf3"
            }
        ],
        "relatedCommands": [],
        "warnings": [
            "Requires server running on target host",
            "Results depend on network conditions during test",
            "May not reflect real application performance"
        ],
        "manPageUrl": "",
        "distroNotes": {}
    },
    {
        "name": "istio-service-mesh",
        "standsFor": "Istio Service Mesh",
        "description": "Istio service mesh configuration and management",
        "examples": [
            "istioctl install --set values.pilot.env.EXTERNAL_ISTIOD=true --set values.global.meshID=mesh1 --set values.global.network=network1  # Install Istio with external control plane and multi-network configuration",
            "kubectl label namespace production istio-injection=enabled && kubectl get namespace production --show-labels  # Enable automatic sidecar injection for production namespace",
            "kubectl apply -f - <<EOF\napiVersion: networking.istio.io/v1alpha3\nkind: VirtualService\nmetadata:\n  name: reviews\nspec:\n  http:\n  - match:\n    - headers:\n        end-user:\n          exact: jason\n    route:\n    - destination:\n        host: reviews\n        subset: v2\n  - route:\n    - destination:\n        host: reviews\n        subset: v1\nEOF  # Create virtual service for header-based routing and canary deployments",
            "kubectl apply -f - <<EOF\napiVersion: security.istio.io/v1beta1\nkind: PeerAuthentication\nmetadata:\n  name: default\n  namespace: production\nspec:\n  mtls:\n    mode: STRICT\nEOF  # Enable strict mutual TLS for all services in production namespace",
            "istioctl dashboard jaeger && kubectl port-forward -n istio-system service/tracing 16686:80  # Open Jaeger dashboard for distributed tracing analysis",
            "kubectl apply -f - <<EOF\napiVersion: networking.istio.io/v1alpha3\nkind: DestinationRule\nmetadata:\n  name: httpbin\nspec:\n  host: httpbin\n  trafficPolicy:\n    outlierDetection:\n      consecutiveErrors: 3\n      interval: 30s\n      baseEjectionTime: 30s\n      maxEjectionPercent: 50\nEOF  # Configure circuit breaker with outlier detection for service resilience"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "networking",
        "safety": "caution",
        "syntaxPattern": "istioctl <command> [options]",
        "prerequisites": [
            "istio-cli",
            "kubernetes-cluster"
        ],
        "commandCombinations": [
            {
                "scenario": "Complete service mesh deployment",
                "commands": "istioctl install --set values.pilot.traceSampling=1.0 && kubectl label namespace default istio-injection=enabled && kubectl apply -f samples/bookinfo/platform/kube/bookinfo.yaml && kubectl apply -f samples/bookinfo/networking/bookinfo-gateway.yaml",
                "explanation": "Install Istio with full tracing, enable injection, and deploy sample application",
                "title": "istioctl && kubectl && kubectl && kubectl"
            },
            {
                "scenario": "Security hardening with authorization policies",
                "commands": "kubectl apply -f peer-authentication-strict.yaml && kubectl apply -f authorization-policy-deny-all.yaml && kubectl apply -f authorization-policy-allow-specific.yaml",
                "explanation": "Enable strict mTLS, deny all traffic by default, then allow specific services",
                "title": "kubectl && kubectl && kubectl"
            }
        ],
        "relatedCommands": [
            {
                "name": "kubectl",
                "relationship": "underlying",
                "reason": "Istio uses Kubernetes APIs and custom resources"
            },
            {
                "name": "prometheus",
                "relationship": "combo",
                "reason": "Istio integrates with Prometheus for metrics collection"
            }
        ],
        "warnings": [
            "Sidecar injection requires proper namespace labeling or pod annotations",
            "mTLS policies can break services that don't support it properly",
            "Gateway and VirtualService configurations must match for proper routing"
        ],
        "manPageUrl": "https://istio.io/latest/docs/",
        "distroNotes": {}
    },
    {
        "name": "iw",
        "standsFor": "Interface Wireless",
        "description": "Modern wireless configuration and monitoring tool",
        "examples": [
            "iw dev  # Show all wireless network interfaces",
            "iw dev wlan0 scan | grep SSID  # Scan for available wireless networks",
            "iw dev wlan0 info  # Display detailed wireless interface information",
            "iw dev wlan0 connect OpenNetwork  # Connect to open wireless network",
            "iw dev wlan0 set type monitor  # Set wireless interface to monitor mode",
            "iw dev wlan0 link  # Show current wireless connection status",
            "iw dev wlan0 set power_save off  # Disable power saving for better performance",
            "iw dev wlan0 scan ssid MyWiFi freq 2437 passive  # Scan for specific SSID on 2.4GHz channel 6 without active probing"
        ],
        "platform": [
            "linux"
        ],
        "category": "networking",
        "safety": "safe",
        "syntaxPattern": "iw [options] command",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Wireless network analysis",
                "commands": "iw dev wlan0 scan | grep -E '(SSID|signal|freq)' | head -20",
                "explanation": "Show nearby networks with signal strength and frequency",
                "title": "iw | grep | signal | freq | head"
            }
        ],
        "relatedCommands": [
            {
                "name": "iwconfig",
                "relationship": "predecessor",
                "reason": "iw is the modern replacement for iwconfig"
            },
            {
                "name": "ip",
                "relationship": "complementary",
                "reason": "ip manages interface addresses after wireless connection"
            }
        ],
        "warnings": [
            "Requires root privileges for most operations",
            "Linux-specific tool, part of nl80211 framework",
            "May need additional tools for WPA/WPA2"
        ],
        "manPageUrl": "https://wireless.wiki.kernel.org/en/users/documentation/iw",
        "distroNotes": {}
    },
    {
        "name": "iwconfig",
        "standsFor": "Interface Wireless Config",
        "description": "Configure wireless network interface",
        "examples": [
            "iwconfig  # Display all wireless network interfaces and their status",
            "iwconfig wlan0 essid 'MyNetwork'  # Connect to wireless network by SSID",
            "iwconfig wlan0 key 1234567890  # Set WEP encryption key for wireless interface",
            "iwconfig wlan0 mode managed  # Set wireless interface to managed mode",
            "iwconfig wlan0 txpower 20dBm  # Set wireless transmission power",
            "iwconfig wlan0 rate 54M  # Set wireless data rate to 54Mbps",
            "iwconfig wlan0 sens -70  # Set signal sensitivity threshold to -70dBm for connection quality"
        ],
        "platform": [
            "linux"
        ],
        "category": "networking",
        "safety": "safe",
        "syntaxPattern": "iwconfig [interface] [options]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Wireless network setup",
                "commands": "iwconfig wlan0 essid 'MyWiFi' && iwconfig wlan0 key s:mypassword && dhclient wlan0",
                "explanation": "Connect to WEP-protected network and get IP address",
                "title": "iwconfig && iwconfig && dhclient"
            }
        ],
        "relatedCommands": [
            {
                "name": "iw",
                "relationship": "modern-alternative",
                "reason": "iw is the newer wireless configuration tool"
            }
        ],
        "warnings": [
            "Deprecated in favor of iw command",
            "Limited WPA support, mainly for WEP networks",
            "Linux-specific tool"
        ],
        "manPageUrl": "https://wireless.wiki.kernel.org/en/users/documentation/iw",
        "distroNotes": {}
    },
    {
        "name": "kubectl-networking-services",
        "standsFor": "Kubernetes Networking",
        "description": "Kubernetes networking and service management",
        "examples": [
            "kubectl expose deployment web --type=LoadBalancer --port=80 --target-port=8080 --load-balancer-ip=203.0.113.100  # Expose deployment as LoadBalancer service with specific external IP",
            "kubectl create service clusterip mysql --tcp=3306:3306 --clusterip=None  # Create headless service for StatefulSet pod discovery",
            "kubectl create ingress web --class=nginx --rule='example.com/*=web:80,tls=web-tls'  # Create Ingress with TLS termination and specific ingress class",
            "kubectl apply -f - <<EOF\napiVersion: networking.k8s.io/v1\nkind: NetworkPolicy\nmetadata:\n  name: deny-all\nspec:\n  podSelector: {}\n  policyTypes:\n  - Ingress\n  - Egress\nEOF  # Create network policy to deny all ingress and egress traffic by default",
            "kubectl get endpoints web -o yaml && kubectl get endpointslices -l kubernetes.io/service-name=web  # Inspect service endpoints and endpoint slices for debugging",
            "kubectl port-forward service/web 8080:80 --address=0.0.0.0  # Forward local port to service, accessible from all interfaces",
            "kubectl patch service web -p '{\"spec\":{\"type\":\"NodePort\",\"ports\":[{\"port\":80,\"targetPort\":8080,\"nodePort\":30080}]}}' && kubectl get nodes -o wide  # Convert service to NodePort and show node IPs for external access"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "networking",
        "safety": "caution",
        "syntaxPattern": "kubectl <service-command> [options]",
        "prerequisites": [
            "kubernetes-cluster"
        ],
        "commandCombinations": [
            {
                "scenario": "Service discovery troubleshooting",
                "commands": "kubectl get services -o wide && kubectl get endpoints && kubectl run test-pod --rm -it --image=busybox -- nslookup web.default.svc.cluster.local",
                "explanation": "Check services, endpoints, and DNS resolution from within cluster",
                "title": "kubectl && kubectl && kubectl"
            },
            {
                "scenario": "Ingress traffic debugging",
                "commands": "kubectl describe ingress web && kubectl get ingress web -o yaml && kubectl logs -l app=ingress-nginx",
                "explanation": "Inspect Ingress configuration and check ingress controller logs",
                "title": "kubectl && kubectl && kubectl"
            }
        ],
        "relatedCommands": [
            {
                "name": "dig",
                "relationship": "combo",
                "reason": "DNS troubleshooting for Kubernetes services"
            },
            {
                "name": "curl",
                "relationship": "combo",
                "reason": "Testing service connectivity and endpoints"
            }
        ],
        "warnings": [
            "Service ClusterIP is only accessible from within the cluster",
            "Ingress requires an ingress controller to function",
            "Network policies require a CNI plugin that supports them"
        ],
        "manPageUrl": "https://kubernetes.io/docs/concepts/services-networking/",
        "distroNotes": {}
    },
    {
        "name": "netcat",
        "standsFor": "Network Cat",
        "description": "Versatile networking utility for debugging and investigation",
        "examples": [
            "nc -zv google.com 80  # Test if port 80 is open on google.com",
            "nc -l 1234  # Listen on port 1234 for incoming connections",
            "nc localhost 1234  # Connect to server listening on localhost:1234",
            "nc -zv 192.168.1.100 1-100  # Scan ports 1-100 on target host",
            "nc -l 1234 < file.txt  # Serve file.txt on port 1234",
            "nc 192.168.1.100 1234 > received_file.txt  # Receive file from server and save locally",
            "nc -u -l 1234  # Listen for UDP connections on port 1234",
            "mkfifo backpipe && nc -l 9999 0<backpipe | nc target.com 22 1>backpipe  # Create SSH tunnel proxy for secure remote access"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "networking",
        "safety": "safe",
        "syntaxPattern": "nc [options] [hostname] [port]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Quick file transfer",
                "commands": "nc -l 9999 < important.zip & nc target_host 9999 > important.zip",
                "explanation": "Transfer file between hosts using netcat",
                "title": "nc < important & nc > important"
            }
        ],
        "relatedCommands": [
            {
                "name": "socat",
                "relationship": "alternative",
                "reason": "More advanced networking swiss army knife"
            }
        ],
        "warnings": [
            "Some versions have different command-line options",
            "Be careful with listening servers on public interfaces",
            "No encryption - all data sent in plain text"
        ],
        "manPageUrl": "",
        "distroNotes": {}
    },
    {
        "name": "netplan",
        "standsFor": "Network Plan",
        "description": "Network configuration abstraction renderer for Ubuntu",
        "examples": [
            "sudo netplan apply  # Apply network configuration from YAML files",
            "sudo netplan try  # Try configuration with automatic rollback",
            "sudo netplan generate  # Generate backend configuration files",
            "netplan info  # Show available features and backends"
        ],
        "platform": [
            "linux"
        ],
        "category": "networking",
        "safety": "caution",
        "syntaxPattern": "netplan [command] [options]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Safe configuration deployment",
                "commands": "sudo netplan generate && sudo netplan try && sudo netplan apply",
                "explanation": "Generate config, test safely, then apply permanently",
                "title": "sudo && sudo && sudo"
            }
        ],
        "relatedCommands": [
            {
                "name": "nmcli",
                "relationship": "alternative",
                "reason": "Different network configuration approach"
            }
        ],
        "warnings": [
            "YAML syntax must be precise",
            "Ubuntu-specific tool"
        ],
        "manPageUrl": "https://netplan.io/reference",
        "distroNotes": {}
    },
    {
        "name": "netstat",
        "standsFor": "network statistics",
        "description": "Display network connections, routing tables, and network statistics",
        "examples": [
            "netstat -tulpn  # Display all TCP/UDP listening ports with process info",
            "netstat -tulpn | grep :8080  # Identify which process is listening on port 8080",
            "netstat -rn  # Show kernel routing table with numeric addresses",
            "netstat -i  # Display packet statistics for all network interfaces",
            "netstat -t  # Show only TCP protocol connections"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "networking",
        "safety": "safe",
        "syntaxPattern": "netstat [options]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Monitor active connections continuously",
                "commands": "watch 'netstat -tulpn | head -20'",
                "explanation": "Continuously monitor network connections",
                "title": "watch | head"
            },
            {
                "scenario": "Find all processes listening on network",
                "commands": "netstat -tulpn | awk '/LISTEN/ {print $7}' | sort -u",
                "explanation": "List unique processes that have network listeners",
                "title": "netstat | awk | sort"
            }
        ],
        "relatedCommands": [
            {
                "name": "ss",
                "relationship": "alternative",
                "reason": "Modern replacement for netstat with better performance"
            },
            {
                "name": "lsof",
                "relationship": "similar",
                "reason": "Can also show network connections and listening ports"
            },
            {
                "name": "nmap",
                "relationship": "powerful",
                "reason": "Advanced network scanning and port detection"
            }
        ],
        "warnings": [
            "netstat is deprecated in favor of ss on modern Linux systems",
            "Process names require root privileges to display",
            "Output format varies between operating systems"
        ],
        "manPageUrl": "https://man7.org/linux/man-pages/man8/netstat.8.html",
        "distroNotes": {}
    },
    {
        "name": "nmcli",
        "standsFor": "NetworkManager CLI",
        "description": "Command-line tool for NetworkManager configuration",
        "examples": [
            "nmcli connection show  # Display all network connections",
            "nmcli device wifi connect SSID password PASSWORD  # Connect to WiFi network with password",
            "nmcli device status  # Display status of all network devices",
            "nmcli connection add type ethernet con-name static-eth ifname eth0 ip4 192.168.1.100/24 gw4 192.168.1.1  # Create ethernet connection with static IP",
            "nmcli connection modify static-eth ipv4.dns 8.8.8.8  # Set DNS server for connection",
            "nmcli connection up static-eth  # Activate the static ethernet connection"
        ],
        "platform": [
            "linux"
        ],
        "category": "networking",
        "safety": "safe",
        "syntaxPattern": "nmcli [options] object command",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Complete network configuration",
                "commands": "nmcli connection add type ethernet con-name office ifname eth0 ip4 192.168.1.50/24 gw4 192.168.1.1 && nmcli connection modify office ipv4.dns 8.8.8.8,8.8.4.4 && nmcli connection up office",
                "explanation": "Create, configure, and activate office network connection",
                "title": "nmcli && nmcli && nmcli"
            }
        ],
        "relatedCommands": [
            {
                "name": "ip",
                "relationship": "alternative",
                "reason": "Lower-level network configuration"
            },
            {
                "name": "iwconfig",
                "relationship": "alternative",
                "reason": "Legacy wireless configuration tool"
            }
        ],
        "warnings": [
            "NetworkManager must be running",
            "May conflict with manual network configuration"
        ],
        "manPageUrl": "",
        "distroNotes": {}
    },
    {
        "name": "nslookup",
        "standsFor": "Name Server Lookup",
        "description": "DNS lookup utility for querying domain name system",
        "examples": [
            "nslookup google.com  # Look up IP address for google.com",
            "nslookup 8.8.8.8  # Look up hostname for IP address",
            "nslookup google.com 8.8.8.8  # Query google.com using Google's DNS server",
            "nslookup -type=mx google.com  # Look up mail exchange records",
            "nslookup -type=ns google.com  # Look up name server records",
            "nslookup  # Start interactive nslookup session"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "networking",
        "safety": "safe",
        "syntaxPattern": "nslookup [options] [name] [server]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Domain information gathering",
                "commands": "nslookup -type=ns domain.com && nslookup -type=mx domain.com",
                "explanation": "Get nameserver and mail server information",
                "title": "nslookup && nslookup"
            }
        ],
        "relatedCommands": [
            {
                "name": "dig",
                "relationship": "alternative",
                "reason": "dig provides more detailed and flexible DNS queries"
            }
        ],
        "warnings": [
            "Interactive mode can be confusing for beginners",
            "Output format less parseable than dig",
            "May not be available on some minimal installations"
        ],
        "manPageUrl": "https://docs.microsoft.com/en-us/windows-server/administration/windows-commands/nslookup",
        "distroNotes": {}
    },
    {
        "name": "ping",
        "standsFor": "Packet Internet Groper",
        "description": "Network diagnostic tool for measuring connectivity and latency",
        "examples": [
            "ping google.com  # Test basic connectivity to Google",
            "ping -c 4 google.com  # Send only 4 ping packets",
            "ping -i 2 google.com  # Send pings every 2 seconds",
            "ping -D google.com  # Include timestamp in ping output",
            "sudo ping -f google.com  # Send pings as fast as possible"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "networking",
        "safety": "caution",
        "syntaxPattern": "ping [options] <hostname|IP>",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Network latency monitoring",
                "commands": "ping -c 100 -i 0.5 google.com | tail -1",
                "explanation": "Measure network latency with statistics",
                "title": "ping | tail"
            }
        ],
        "relatedCommands": [
            {
                "name": "traceroute",
                "relationship": "combo",
                "reason": "Traces network path while ping tests connectivity"
            },
            {
                "name": "mtr",
                "relationship": "enhancement",
                "reason": "Combines ping and traceroute functionality"
            }
        ],
        "warnings": [
            "Some networks block ICMP packets",
            "Flood ping requires root privileges",
            "Windows ping syntax differs slightly"
        ],
        "manPageUrl": "https://man7.org/linux/man-pages/man8/ping.8.html",
        "distroNotes": {}
    },
    {
        "name": "route",
        "standsFor": "Route",
        "description": "Display and manipulate IP routing table",
        "examples": [
            "route -n  # Display routing table with numeric addresses",
            "route add default gw 192.168.1.1  # Add default route through gateway",
            "route add -net 10.0.0.0/8 gw 192.168.1.1  # Add route to network via gateway",
            "route del -net 10.0.0.0/8  # Remove network route from table",
            "route -K  # Display kernel routing information",
            "ip route show table all && ss -tuln | grep -E ':(22|80|443|3306|5432|6379)\\b' && iptables -L -n --line-numbers | grep -E '(ACCEPT|DROP|REJECT)' && echo \"Enterprise network audit: routing tables analyzed, critical service ports monitored, firewall rules validated for security compliance\"  # Enterprise network security audit with comprehensive routing analysis, critical service monitoring, and firewall rule validation"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "networking",
        "safety": "dangerous",
        "syntaxPattern": "route [options] [command]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Route troubleshooting",
                "commands": "route -n && netstat -rn && ip route show",
                "explanation": "Show routing information using different tools",
                "title": "route && netstat && ip"
            }
        ],
        "relatedCommands": [
            {
                "name": "ip",
                "relationship": "modern-alternative",
                "reason": "ip route provides more features and is preferred"
            },
            {
                "name": "netstat",
                "relationship": "similar",
                "reason": "netstat -r also shows routing table"
            }
        ],
        "warnings": [
            "Deprecated in favor of ip command",
            "Requires root privileges for modifications",
            "Syntax varies between operating systems"
        ],
        "manPageUrl": "https://man7.org/linux/man-pages/man8/route.8.html",
        "distroNotes": {}
    },
    {
        "name": "rsync",
        "standsFor": "Remote Sync",
        "description": "Efficient file synchronization and transfer tool",
        "examples": [
            "rsync -av source/ destination/  # Synchronize directories with archive mode and verbose output",
            "rsync -av local/ user@remote:/path/  # Sync local directory to remote server via SSH",
            "rsync -av --progress source/ destination/  # Show progress during file transfer",
            "rsync -av --delete source/ destination/  # Remove files in destination that don't exist in source",
            "rsync -avn source/ destination/  # Show what would be transferred without actually doing it",
            "rsync -av --exclude='*.log' source/ destination/  # Sync while excluding log files",
            "rsync -av --bwlimit=1000 source/ destination/  # Limit bandwidth to 1000 KB/s during transfer",
            "rsync -avz --progress --stats --log-file=sync-$(date +%Y%m%d-%H%M%S).log --exclude-from=.rsync-exclude --dry-run /data/ user@backup-server:/backups/$(hostname)/ && read -p \"Proceed with sync? (y/N) \" confirm && [[ $confirm == [yY] ]] && rsync -avz --progress --stats --log-file=sync-$(date +%Y%m%d-%H%M%S).log --exclude-from=.rsync-exclude /data/ user@backup-server:/backups/$(hostname)/ && echo \"Enterprise backup sync: $(grep 'files transferred' sync-$(date +%Y%m%d-%H%M%S).log | tail -1), $(grep 'total size' sync-$(date +%Y%m%d-%H%M%S).log | tail -1)\"  # Enterprise backup synchronization with comprehensive logging, exclusion filters, dry-run validation, progress monitoring, and detailed transfer statistics"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "networking",
        "safety": "dangerous",
        "syntaxPattern": "rsync [options] source destination",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Backup with rotation",
                "commands": "rsync -av --delete --backup --backup-dir=../backup-$(date +%Y%m%d) source/ destination/",
                "explanation": "Sync with dated backup of changed files",
                "title": "rsync"
            }
        ],
        "relatedCommands": [
            {
                "name": "scp",
                "relationship": "alternative",
                "reason": "scp is simpler but less efficient than rsync"
            },
            {
                "name": "cp",
                "relationship": "local-alternative",
                "reason": "cp copies files locally, rsync can sync locally or remotely"
            }
        ],
        "warnings": [
            "Trailing slash on source affects behavior significantly",
            "Very efficient - only transfers differences between files",
            "Can resume interrupted transfers"
        ],
        "manPageUrl": "https://man7.org/linux/man-pages/man1/rsync.1.html",
        "distroNotes": {}
    },
    {
        "name": "scp",
        "standsFor": "secure copy protocol",
        "description": "Secure copy files over SSH",
        "examples": [
            "scp file.txt user@server:/home/user/  # Upload local file to remote server directory",
            "scp user@server:/path/file.txt .  # Download file from remote server to current directory",
            "scp -r project/ user@server:/opt/  # Upload entire directory structure to remote server",
            "scp -P 2222 file.txt user@server:~/  # Transfer file using non-standard SSH port",
            "scp -p script.sh user@server:~/bin/  # Copy file while maintaining original timestamps and permissions"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "networking",
        "safety": "safe",
        "syntaxPattern": "scp [options] <source> <destination>",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Backup files to remote server",
                "commands": "tar -czf backup.tar.gz ~/important && scp backup.tar.gz user@backup-server:~/backups/",
                "explanation": "Create archive and upload to backup server",
                "title": "tar && scp"
            },
            {
                "scenario": "Deploy application files",
                "commands": "scp -r dist/ user@production:/var/www/app/ && ssh user@production 'sudo systemctl restart nginx'",
                "explanation": "Deploy files and restart web server",
                "title": "scp && ssh"
            }
        ],
        "relatedCommands": [
            {
                "name": "rsync",
                "relationship": "alternative",
                "reason": "More efficient for large transfers and syncing"
            },
            {
                "name": "ssh",
                "relationship": "combo",
                "reason": "Uses SSH protocol for secure transfer"
            }
        ],
        "warnings": [
            "Use -P (capital P) for port, not -p like SSH",
            "Recursive copy requires -r flag",
            "Overwrites destination files without warning"
        ],
        "manPageUrl": "https://man7.org/linux/man-pages/man1/scp.1.html",
        "distroNotes": {}
    },
    {
        "name": "socat",
        "standsFor": "Socket Cat",
        "description": "Advanced multipurpose relay tool for network connections",
        "examples": [
            "socat TCP-LISTEN:8080,fork TCP:remote-host:80  # Forward local port 8080 to remote host port 80",
            "socat TCP-LISTEN:8443,fork OPENSSL:secure-server:443  # Create SSL proxy to secure server",
            "socat UNIX-LISTEN:/tmp/socket TCP:localhost:8080  # Bridge Unix socket to TCP connection",
            "socat TCP-LISTEN:2001 /dev/ttyS0,raw  # Bridge serial port to TCP connection",
            "socat TCP-LISTEN:3128,fork TCP:proxy-server:8080  # Create HTTP proxy forwarder"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "networking",
        "safety": "safe",
        "syntaxPattern": "socat [options] address1 address2",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Secure tunnel setup",
                "commands": "socat OPENSSL-LISTEN:4443,cert=server.crt,key=server.key,fork TCP:localhost:22",
                "explanation": "Create SSL tunnel for SSH connection",
                "title": "socat"
            }
        ],
        "relatedCommands": [
            {
                "name": "netcat",
                "relationship": "simpler-alternative",
                "reason": "netcat is simpler but less powerful"
            },
            {
                "name": "ssh",
                "relationship": "alternative",
                "reason": "SSH can also create tunnels with better security"
            }
        ],
        "warnings": [
            "Complex syntax with many address types",
            "Powerful but can be security risk if misconfigured",
            "May not be installed by default"
        ],
        "manPageUrl": "https://man7.org/linux/man-pages/man1/socat.1.html",
        "distroNotes": {}
    },
    {
        "name": "ss",
        "standsFor": "Socket Statistics",
        "description": "Modern utility to investigate sockets and network connections",
        "examples": [
            "ss -tuln  # Show all TCP and UDP listening ports with numbers",
            "ss -t state established  # Show only established TCP connections",
            "ss -tulnp  # Show listening ports with process information",
            "ss -tuln sport = :80  # Show connections on port 80",
            "ss -m  # Display socket memory usage information",
            "ss -s  # Display socket usage summary"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "networking",
        "safety": "safe",
        "syntaxPattern": "ss [options] [filter]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Network service audit",
                "commands": "ss -tulnp | grep LISTEN | sort -k5",
                "explanation": "Show all listening services sorted by port",
                "title": "ss | grep | sort"
            }
        ],
        "relatedCommands": [
            {
                "name": "netstat",
                "relationship": "modern-replacement",
                "reason": "ss is faster and more detailed replacement for netstat"
            },
            {
                "name": "lsof",
                "relationship": "similar",
                "reason": "lsof can also show network connections"
            }
        ],
        "warnings": [
            "Filter syntax differs from netstat",
            "More detailed output than netstat",
            "May not be available on older systems"
        ],
        "manPageUrl": "https://man7.org/linux/man-pages/man8/ss.8.html",
        "distroNotes": {}
    },
    {
        "name": "ssh",
        "standsFor": "secure shell",
        "description": "Secure Shell for remote server access and file transfer",
        "examples": [
            "ssh user@192.168.1.100  # Login to remote server with username and IP",
            "ssh -i ~/.ssh/private_key user@server.com  # Authenticate using specific private key file",
            "ssh user@server 'df -h'  # Run command on remote server and see output locally",
            "ssh -L 8080:localhost:3000 user@server  # Access remote service locally via port forwarding",
            "ssh -p 2222 user@server.com  # Connect to SSH server running on non-standard port"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "networking",
        "safety": "safe",
        "syntaxPattern": "ssh [options] <user@host>",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Generate and deploy SSH key",
                "commands": "ssh-keygen -t rsa -b 4096 && ssh-copy-id user@server",
                "explanation": "Create new SSH key pair and install public key on server",
                "title": "ssh && ssh"
            },
            {
                "scenario": "Persistent connection with tmux",
                "commands": "ssh user@server -t 'tmux attach || tmux new-session'",
                "explanation": "Connect and attach to persistent terminal session",
                "title": "ssh || tmux"
            }
        ],
        "relatedCommands": [
            {
                "name": "scp",
                "relationship": "similar",
                "reason": "Copy files over SSH connection"
            },
            {
                "name": "rsync",
                "relationship": "similar",
                "reason": "Sync files/directories over SSH"
            },
            {
                "name": "ssh-keygen",
                "relationship": "combo",
                "reason": "Generate SSH keys for authentication"
            }
        ],
        "warnings": [
            "SSH keys are more secure than passwords",
            "Default port 22 may be blocked by firewalls",
            "Connection can timeout if idle too long"
        ],
        "manPageUrl": "https://man7.org/linux/man-pages/man1/ssh.1.html",
        "distroNotes": {
            "windows": "Built into Windows 10+ or available via OpenSSH"
        }
    },
    {
        "name": "traceroute",
        "standsFor": "trace route",
        "description": "Trace the route packets take to reach a destination",
        "examples": [
            "traceroute google.com  # Show all hops between your computer and Google's servers",
            "traceroute -I example.com  # Trace route using ICMP packets (like ping)",
            "traceroute -m 15 192.168.1.1  # Limit trace to maximum 15 hops",
            "traceroute -n server.com  # Skip DNS resolution for faster results",
            "traceroute -i eth0 destination.com  # Trace from specific network interface"
        ],
        "platform": [
            "linux",
            "macos"
        ],
        "category": "networking",
        "safety": "safe",
        "syntaxPattern": "traceroute [options] <host>",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Compare routes to multiple destinations",
                "commands": "for host in google.com github.com stackoverflow.com; do echo \"Route to $host:\"; traceroute -n $host; echo; done",
                "explanation": "Trace routes to multiple destinations for comparison",
                "title": "for ; do ; traceroute ; echo ; done"
            },
            {
                "scenario": "Save traceroute results with timestamp",
                "commands": "echo \"$(date): traceroute to $1\" && traceroute -n $1 | tee traceroute_$(date +%Y%m%d_%H%M%S).log",
                "explanation": "Log traceroute results with timestamp for analysis",
                "title": "echo && traceroute | tee"
            }
        ],
        "relatedCommands": [
            {
                "name": "ping",
                "relationship": "combo",
                "reason": "Use ping to test connectivity after traceroute"
            },
            {
                "name": "mtr",
                "relationship": "alternative",
                "reason": "Combines ping and traceroute with continuous monitoring"
            },
            {
                "name": "nslookup",
                "relationship": "combo",
                "reason": "Resolve hostnames found in traceroute path"
            }
        ],
        "warnings": [
            "May require root privileges depending on packet type",
            "Some firewalls block traceroute packets",
            "Results can vary due to load balancing and routing changes"
        ],
        "manPageUrl": "https://man7.org/linux/man-pages/man8/traceroute.8.html",
        "distroNotes": {}
    },
    {
        "name": "wget",
        "standsFor": "web get",
        "description": "Download files from web servers",
        "examples": [
            "wget https://example.com/file.pdf  # Download file to current directory",
            "wget -O report.pdf https://example.com/document.pdf  # Save downloaded file with specified name",
            "wget -c https://example.com/largefile.zip  # Continue previous download from where it stopped",
            "wget -r -np -k https://example.com/  # Recursively download website for offline viewing",
            "wget --limit-rate=100k https://example.com/file.iso  # Limit download speed to avoid bandwidth issues",
            "wget -i urls.txt  # Download all URLs listed in text file"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "networking",
        "safety": "caution",
        "syntaxPattern": "wget [options] <URL>",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Mirror website with timestamps",
                "commands": "wget -m -np -N https://example.com/docs/",
                "explanation": "Mirror website, only download newer files",
                "title": "wget"
            },
            {
                "scenario": "Download and verify integrity",
                "commands": "wget https://example.com/file.tar.gz && sha256sum file.tar.gz",
                "explanation": "Download file and check its checksum",
                "title": "wget && sha256sum"
            }
        ],
        "relatedCommands": [
            {
                "name": "curl",
                "relationship": "alternative",
                "reason": "More versatile HTTP client with API support"
            },
            {
                "name": "rsync",
                "relationship": "similar",
                "reason": "Better for syncing large directories"
            }
        ],
        "warnings": [
            "wget follows redirects by default (unlike curl)",
            "Can accidentally download entire websites if not careful with -r",
            "May be blocked by websites that detect automated downloading"
        ],
        "manPageUrl": "https://man7.org/linux/man-pages/man1/wget.1.html",
        "distroNotes": {
            "macos": "Install via Homebrew: brew install wget",
            "windows": "Available in WSL or via package managers"
        }
    }
];

export { networkingCommands };
export default networkingCommands;
