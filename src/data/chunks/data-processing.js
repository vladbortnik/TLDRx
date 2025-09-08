/**
 * TL;DRx Commands Database - Data processing Category
 *
 * Contains 10 commands related to data processing.
 * Generated from the original commands.js file.
 *
 * @fileoverview Data processing category commands for TL;DRx
 * @category data-processing
 * @commands 10
 */

/**
 * Data processing category commands
 * @type {Array<Object>}
 */
const data_processingCommands = [
    {
        "name": "cqlsh",
        "standsFor": "Cassandra Query Language Shell",
        "description": "Apache Cassandra interactive command-line interface",
        "examples": [
            "cqlsh  # Connect to Cassandra on localhost:9042",
            "cqlsh cassandra.example.com 9042  # Connect to Cassandra on remote host",
            "cqlsh -f schema.cql  # Execute CQL commands from file",
            "cqlsh -e 'DESCRIBE keyspaces;'  # Run single CQL command and exit",
            "cqlsh -u username -p password cassandra.example.com  # Connect with username and password",
            "cqlsh --debug  # Connect with detailed debug output",
            "cqlsh --request-timeout=30  # Set 30-second timeout for requests"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "data-processing",
        "safety": "safe",
        "syntaxPattern": "cqlsh [options] [host] [port]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Database exploration workflow",
                "commands": "cqlsh -e 'DESCRIBE keyspaces;' && cqlsh -e 'DESCRIBE tables;' && cqlsh -e 'SELECT * FROM system.local;'",
                "explanation": "List keyspaces, tables, and show local node info",
                "title": "cqlsh ; && cqlsh ; && cqlsh ;"
            }
        ],
        "relatedCommands": [
            {
                "name": "nodetool",
                "relationship": "combo",
                "reason": "Cassandra cluster management tool"
            }
        ],
        "warnings": [
            "CQL syntax differs from standard SQL in many ways",
            "Requires Python 2.7 or 3.x depending on version",
            "Connection may timeout on slow networks"
        ],
        "manPageUrl": "",
        "distroNotes": {}
    },
    {
        "name": "csvkit",
        "standsFor": "CSV toolkit",
        "description": "Suite of command-line tools for working with CSV files",
        "examples": [
            "csvstat data.csv  # Show summary statistics for all columns in CSV",
            "csvsql --query 'SELECT name, age FROM data WHERE age > 25' data.csv  # Use SQL to filter and query CSV data",
            "in2csv data.xlsx > data.csv  # Convert Excel file to CSV format",
            "csvlook data.csv  # Display CSV in formatted table view",
            "csvcut -c name,email data.csv  # Extract only name and email columns",
            "csvgrep -c name -m 'John' data.csv  # Find all rows where name column contains 'John'",
            "csvjoin -c id customer_data.csv order_data.csv  # Join two CSV files on ID column",
            "csvstat data.csv && csvlook data.csv | head -10  # Show data statistics and preview"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "data-processing",
        "safety": "safe",
        "syntaxPattern": "csvtool [options] file.csv",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Process and analyze CSV data",
                "commands": "csvclean data.csv && csvstat data_out.csv && csvlook data_out.csv | head -20",
                "explanation": "Clean CSV, show statistics, then preview first 20 rows",
                "title": "csvclean && csvstat && csvlook | head"
            },
            {
                "scenario": "Convert and query Excel data",
                "commands": "in2csv data.xlsx | csvsql --query 'SELECT * FROM stdin WHERE sales > 1000'",
                "explanation": "Convert Excel to CSV and query high-value sales",
                "title": "in2csv | csvsql > 1000"
            }
        ],
        "relatedCommands": [
            {
                "name": "awk",
                "relationship": "alternative",
                "reason": "awk can process CSV but csvkit is more specialized"
            },
            {
                "name": "sqlite3",
                "relationship": "combo",
                "reason": "csvkit can import CSV to SQLite for complex queries"
            }
        ],
        "warnings": [
            "Requires Python and pip installation",
            "Large CSV files can consume significant memory",
            "CSV dialect detection may fail with unusual formats"
        ],
        "manPageUrl": "https://csvkit.readthedocs.io/",
        "distroNotes": {
            "linux": "Install via pip: pip install csvkit",
            "macos": "Install via pip: pip install csvkit",
            "windows": "Install via pip: pip install csvkit"
        }
    },
    {
        "name": "grafana",
        "standsFor": "Grafana Dashboard",
        "description": "Multi-platform analytics and interactive visualization web application",
        "examples": [
            "grafana-server  # Start Grafana server with default settings",
            "grafana-server --config=/etc/grafana/custom.ini  # Start with custom configuration file",
            "grafana-server --homepath=/usr/share/grafana  # Start with custom home directory",
            "grafana-server cfg:default.server.enable_gzip=true  # Start with specific configuration overrides",
            "grafana-cli admin reset-admin-password newpassword  # Reset admin password",
            "echo 'Enterprise Grafana Monitoring Infrastructure Setup' && grafana-server --config=/etc/grafana/enterprise.ini --pidfile=/var/run/grafana-enterprise.pid --homepath=/usr/share/grafana && sleep 10 && echo 'Enterprise Dashboards:' && curl -X POST -H 'Content-Type: application/json' -d '{\"dashboard\":{\"title\":\"Enterprise Infrastructure Monitoring\",\"panels\":[{\"title\":\"System Metrics\",\"type\":\"graph\"}]},\"overwrite\":true}' http://admin:admin@localhost:3000/api/dashboards/db && echo 'Data Source Configuration:' && curl -X POST -H 'Content-Type: application/json' -d '{\"name\":\"Enterprise Prometheus\",\"type\":\"prometheus\",\"url\":\"http://prometheus:9090\",\"access\":\"proxy\",\"isDefault\":true}' http://admin:admin@localhost:3000/api/datasources && echo 'Alert Configuration:' && curl -X POST -H 'Content-Type: application/json' -d '{\"name\":\"High CPU Alert\",\"message\":\"Enterprise system CPU usage critical\",\"frequency\":\"10s\"}' http://admin:admin@localhost:3000/api/alerts && echo 'Enterprise Grafana infrastructure: automated dashboard provisioning, data source configuration, alert management, and comprehensive monitoring setup for enterprise observability and operations management'  # Enterprise Grafana monitoring infrastructure"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "data-processing",
        "safety": "safe",
        "syntaxPattern": "grafana-server [options]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Production deployment",
                "commands": "grafana-server --config=/etc/grafana/grafana.ini --pidfile=/var/run/grafana.pid",
                "explanation": "Production Grafana with PID file",
                "title": "grafana"
            }
        ],
        "relatedCommands": [
            {
                "name": "prometheus",
                "relationship": "combo",
                "reason": "Common data source for Grafana dashboards"
            },
            {
                "name": "influxdb",
                "relationship": "combo",
                "reason": "Another common data source"
            }
        ],
        "warnings": [
            "Default port is 3000",
            "Admin user is admin:admin by default",
            "Data sources need to be configured separately"
        ],
        "manPageUrl": "https://grafana.com/docs/",
        "distroNotes": {}
    },
    {
        "name": "influxdb",
        "standsFor": "InfluxDB Time Series Database",
        "description": "High-performance time-series database for metrics and events",
        "examples": [
            "influxd  # Start InfluxDB daemon with default configuration",
            "influxd --config /etc/influxdb/influxdb.conf  # Start with custom configuration file",
            "influx  # Start InfluxDB CLI client",
            "influx -execute 'SHOW DATABASES'  # Execute query directly from command line",
            "influx -import -path=data.txt  # Import line protocol data from file",
            "influx -precision s -execute 'SELECT * FROM cpu WHERE time > now() - 1h'  # Query with second precision",
            "echo 'Enterprise Time-Series Database Operations and Monitoring' && influxd --config /etc/influxdb/enterprise.conf & sleep 10 && echo 'Database Health Check:' && influx -execute 'SHOW DATABASES' && echo 'Performance Metrics:' && influx -execute 'SELECT mean(cpu_usage), max(memory_usage) FROM system_metrics WHERE time > now() - 1h GROUP BY time(5m)' && echo 'Data Retention Policy:' && influx -execute 'SHOW RETENTION POLICIES ON enterprise_metrics' && echo 'Real-time Monitoring:' && influx -execute 'SELECT * FROM enterprise_app WHERE time > now() - 5m ORDER BY time DESC LIMIT 10' && echo 'Backup Status:' && influxd backup -database enterprise_metrics /backup/influxdb/$(date +%Y%m%d) && echo 'Enterprise InfluxDB operations: database health monitoring, performance metrics analysis, retention policy management, real-time data querying, and automated backup strategies for enterprise time-series data infrastructure'  # Enterprise InfluxDB operations and monitoring"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "data-processing",
        "safety": "safe",
        "syntaxPattern": "influxd [command] [flags]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Production setup with authentication",
                "commands": "influxd --config /etc/influxdb/influxdb.conf && influx -username admin -password secret",
                "explanation": "Start server and connect with authentication",
                "title": "influxd && influx"
            }
        ],
        "relatedCommands": [
            {
                "name": "telegraf",
                "relationship": "combo",
                "reason": "Telegraf collects metrics and sends to InfluxDB"
            }
        ],
        "warnings": [
            "Default port is 8086",
            "Authentication disabled by default",
            "Line protocol is whitespace sensitive"
        ],
        "manPageUrl": "https://docs.influxdata.com/",
        "distroNotes": {}
    },
    {
        "name": "jaeger",
        "standsFor": "Jaeger Tracing",
        "description": "End-to-end distributed tracing system for monitoring microservices",
        "examples": [
            "jaeger-all-in-one  # Start Jaeger with all components in single process",
            "jaeger-all-in-one --memory.max-traces=10000  # Start with custom trace retention limit",
            "jaeger-collector  # Start only the Jaeger collector component",
            "jaeger-query  # Start only the Jaeger query/UI service",
            "jaeger-agent --reporter.grpc.host-port=localhost:14250  # Start agent with custom collector endpoint",
            "jaeger-all-in-one --query.max-clock-skew-adjustment=2s --collector.grpc-tls.enabled=true  # Start with clock skew tolerance and TLS encryption for production tracing"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "data-processing",
        "safety": "safe",
        "syntaxPattern": "jaeger [component] [options]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Development environment",
                "commands": "jaeger-all-in-one --collector.zipkin.host-port=:9411",
                "explanation": "Start Jaeger with Zipkin compatibility",
                "title": "jaeger"
            }
        ],
        "relatedCommands": [
            {
                "name": "zipkin",
                "relationship": "alternative",
                "reason": "Both provide distributed tracing capabilities"
            }
        ],
        "warnings": [
            "Default UI port is 16686",
            "Memory storage is not persistent",
            "Requires instrumentation in application code"
        ],
        "manPageUrl": "https://www.jaegertracing.io/docs/",
        "distroNotes": {}
    },
    {
        "name": "kafka-console-consumer",
        "standsFor": "Kafka Console Consumer",
        "description": "Kafka console consumer for reading messages",
        "examples": [
            "kafka-console-consumer --bootstrap-server localhost:9092 --topic test-topic --from-beginning  # Reads all messages in topic from the earliest offset",
            "kafka-console-consumer --bootstrap-server localhost:9092 --topic orders --property print.key=true --property key.separator=:  # Displays both message keys and values",
            "kafka-console-consumer --bootstrap-server localhost:9092 --topic events --group my-consumer-group  # Joins specified consumer group for load balancing",
            "kafka-console-consumer --bootstrap-server localhost:9092 --topic logs --max-messages 100  # Consume only first 100 messages then exit",
            "kafka-console-consumer --bootstrap-server localhost:9092 --topic transactions --group analytics-team --auto-offset-reset latest --partition 0,1,2  # Consume from specific partitions with consumer group for production analytics"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "data-processing",
        "safety": "safe",
        "syntaxPattern": "kafka-console-consumer --bootstrap-server [server] --topic [topic] [options]",
        "prerequisites": [
            "kafka",
            "java"
        ],
        "commandCombinations": [
            {
                "scenario": "Consume and save to file",
                "commands": "kafka-console-consumer --bootstrap-server localhost:9092 --topic logs --from-beginning > kafka-logs.txt",
                "explanation": "Consumes all log messages and saves them to a file",
                "title": "kafka > kafka"
            },
            {
                "scenario": "Monitor multiple topics",
                "commands": "kafka-console-consumer --bootstrap-server localhost:9092 --whitelist 'events|orders|logs' --from-beginning",
                "explanation": "Consumes from multiple topics matching the pattern",
                "title": "kafka | orders | logs"
            }
        ],
        "relatedCommands": [
            {
                "name": "kafka-console-producer",
                "relationship": "complement",
                "reason": "Producer counterpart for sending messages to Kafka topics"
            }
        ],
        "warnings": [
            "Without --from-beginning, only shows new messages",
            "Consumer will run indefinitely until stopped with Ctrl+C",
            "Consumer group membership affects message delivery",
            "Key printing must be enabled explicitly to see message keys"
        ],
        "manPageUrl": "https://kafka.apache.org/documentation/#quickstart_consume",
        "distroNotes": {
            "windows": "Requires Kafka installation and proper PATH configuration",
            "linux": "Available through Kafka binary distribution or package managers",
            "macos": "Can be installed via Homebrew or Kafka binary distribution"
        }
    },
    {
        "name": "kafka-console-producer",
        "standsFor": "Kafka Console Producer",
        "description": "Kafka console producer for sending messages",
        "examples": [
            "kafka-console-producer --bootstrap-server localhost:9092 --topic test-topic  # Opens interactive console to send messages to specified topic",
            "kafka-console-producer --bootstrap-server localhost:9092 --topic orders --property parse.key=true --property key.separator=:  # Produces messages with keys separated by colon",
            "echo 'Hello Kafka' | kafka-console-producer --bootstrap-server localhost:9092 --topic greetings  # Sends one message to topic using echo and pipe",
            "cat messages.txt | kafka-console-producer --bootstrap-server localhost:9092 --topic events  # Send all lines from file as separate messages",
            "kafka-console-producer --bootstrap-server localhost:9092 --topic orders --property compression.type=snappy --property batch.size=16384 --property linger.ms=5  # High-performance producer with compression and batching optimizations"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "data-processing",
        "safety": "safe",
        "syntaxPattern": "kafka-console-producer --bootstrap-server [server] --topic [topic] [options]",
        "prerequisites": [
            "kafka",
            "java"
        ],
        "commandCombinations": [
            {
                "scenario": "Produce messages from file with keys",
                "commands": "cat messages.txt | kafka-console-producer --bootstrap-server localhost:9092 --topic events --property parse.key=true",
                "explanation": "Reads messages from file and produces them with key parsing enabled",
                "title": "cat | kafka"
            },
            {
                "scenario": "Create topic and start producing",
                "commands": "kafka-topics --create --topic new-topic --bootstrap-server localhost:9092 --partitions 3 --replication-factor 1 && kafka-console-producer --bootstrap-server localhost:9092 --topic new-topic",
                "explanation": "Creates a new topic and immediately starts producing messages to it",
                "title": "kafka && kafka"
            }
        ],
        "relatedCommands": [
            {
                "name": "kafka-console-consumer",
                "relationship": "complement",
                "reason": "Consumer counterpart for reading messages from Kafka topics"
            }
        ],
        "warnings": [
            "Bootstrap server must be accessible and Kafka cluster must be running",
            "Topic must exist unless auto-creation is enabled",
            "Key-value separator must be specified when using key parsing",
            "Interactive mode blocks until Ctrl+C is pressed"
        ],
        "manPageUrl": "https://kafka.apache.org/documentation/#quickstart_send",
        "distroNotes": {
            "windows": "Requires Kafka installation and proper PATH configuration",
            "linux": "Available through Kafka binary distribution or package managers",
            "macos": "Can be installed via Homebrew or Kafka binary distribution"
        }
    },
    {
        "name": "kibana",
        "standsFor": "Kibana Analytics Platform",
        "description": "Data visualization and exploration tool for Elasticsearch",
        "examples": [
            "kibana  # Start Kibana server with default settings",
            "kibana --config /path/to/kibana.yml  # Start with custom configuration file",
            "kibana --elasticsearch.hosts=http://localhost:9200  # Connect to custom Elasticsearch instance",
            "kibana --server.port=5601 --server.host=0.0.0.0  # Start Kibana accessible on all interfaces",
            "kibana --elasticsearch.hosts=['http://es1:9200','http://es2:9200','http://es3:9200'] --logging.level=debug --server.ssl.enabled=true  # Production Kibana with Elasticsearch cluster and SSL"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "data-processing",
        "safety": "safe",
        "syntaxPattern": "kibana [options]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Development setup",
                "commands": "kibana --server.host=0.0.0.0 --server.port=5601",
                "explanation": "Start Kibana accessible from network",
                "title": "kibana"
            }
        ],
        "relatedCommands": [
            {
                "name": "elasticsearch",
                "relationship": "depends-on",
                "reason": "Kibana requires Elasticsearch as data source"
            },
            {
                "name": "logstash",
                "relationship": "combo",
                "reason": "Part of ELK stack for log analysis"
            }
        ],
        "warnings": [
            "Default port is 5601",
            "Requires Elasticsearch to be running",
            "Index patterns must be configured"
        ],
        "manPageUrl": "https://www.elastic.co/guide/en/kibana/",
        "distroNotes": {}
    },
    {
        "name": "miller",
        "standsFor": "Miller",
        "description": "Process structured data like CSV, JSON, and more",
        "examples": [
            "mlr --icsv --opprint cat data.csv  # Convert CSV to aligned table format for viewing",
            "mlr --csv filter '$age > 25' data.csv  # Show only rows where age is greater than 25",
            "mlr --csv stats1 -a mean,sum,count -f salary data.csv  # Calculate mean, sum, and count for salary column",
            "mlr --icsv --ojson cat data.csv  # Convert CSV input to JSON output format",
            "mlr --csv sort -f department,salary data.csv  # Sort by department then by salary within each department",
            "mlr --csv put '$bonus = $salary * 0.1' data.csv  # Add bonus column calculated as 10% of salary"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "data-processing",
        "safety": "safe",
        "syntaxPattern": "mlr [options] verb [parameters] file",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Complex data transformation",
                "commands": "mlr --csv filter '$department == \"Sales\"' then stats1 -a mean -f salary then put '$avg_salary = $salary_mean' data.csv",
                "explanation": "Filter sales dept, calculate average salary, add as new column",
                "title": "mlr"
            },
            {
                "scenario": "Multi-format data pipeline",
                "commands": "mlr --ijson --ocsv flatten --fs . data.json | mlr --csv sort -f name",
                "explanation": "Convert nested JSON to flat CSV and sort by name",
                "title": "mlr | mlr"
            }
        ],
        "relatedCommands": [
            {
                "name": "jq",
                "relationship": "similar",
                "reason": "jq for JSON processing, miller handles multiple formats"
            },
            {
                "name": "csvkit",
                "relationship": "alternative",
                "reason": "Both process structured data, different feature sets"
            },
            {
                "name": "awk",
                "relationship": "alternative",
                "reason": "awk for text processing, miller for structured data"
            }
        ],
        "warnings": [
            "Complex syntax with many verb options",
            "Format specifiers (--icsv, --ojson) required for input/output",
            "Field names with spaces need special handling"
        ],
        "manPageUrl": "https://miller.readthedocs.io/",
        "distroNotes": {
            "linux": "Available in most package managers",
            "macos": "Install via Homebrew: brew install miller",
            "windows": "Download from GitHub releases"
        }
    },
    {
        "name": "parallel",
        "standsFor": "GNU parallel",
        "description": "Execute jobs in parallel using multiple CPU cores",
        "examples": [
            "parallel gzip ::: *.txt  # Compress all text files using all available CPU cores",
            "parallel -j 4 wget ::: url1 url2 url3 url4  # Download 4 URLs simultaneously with 4 parallel jobs",
            "cat urls.txt | parallel curl -O  # Download all URLs from file in parallel",
            "parallel echo 'Processing {}' ::: file1.txt file2.txt file3.txt  # Execute echo command for each file argument",
            "parallel -j 2 convert {} {.}.thumb.jpg ::: *.jpg  # Convert images to thumbnails with max 2 concurrent jobs",
            "parallel --bar gzip ::: *.log  # Compress log files with progress indicator",
            "find /var/log -name '*.log' -mtime +1 -size +10M | parallel -j $(nproc) --eta --bar 'gzip -9 {} && echo \"Compressed: {} -> {}.gz ($(stat -c%s {}.gz) bytes)\"' && find /var/log -name '*.gz' -mtime +30 | parallel --bar 'rm {} && echo \"Archived log removed: {}\"' && echo \"Log management completed: large logs compressed with maximum ratio, old archives purged, storage optimized\"  # Enterprise log management with parallel compression, size tracking, automated archival, and storage optimization"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "data-processing",
        "safety": "caution",
        "syntaxPattern": "parallel [options] command ::: arguments",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Parallel data processing pipeline",
                "commands": "find . -name '*.csv' | parallel 'csvstat {} > {}.stats'",
                "explanation": "Generate statistics for all CSV files in parallel",
                "title": "find | parallel >"
            },
            {
                "scenario": "Backup files with parallel compression",
                "commands": "find /data -name '*.sql' | parallel 'tar -czf {}.tar.gz {}'",
                "explanation": "Create compressed backup of each SQL file",
                "title": "find | parallel"
            }
        ],
        "relatedCommands": [
            {
                "name": "xargs",
                "relationship": "alternative",
                "reason": "xargs has basic parallel features, parallel is more advanced"
            },
            {
                "name": "make",
                "relationship": "similar",
                "reason": "make -j provides parallel build processing"
            },
            {
                "name": "find",
                "relationship": "combo",
                "reason": "find generates file lists for parallel processing"
            }
        ],
        "warnings": [
            "Default uses all CPU cores which can overload system",
            "Output from parallel jobs may interleave",
            "Error handling different from sequential execution"
        ],
        "manPageUrl": "",
        "distroNotes": {
            "linux": "Install parallel package",
            "macos": "Install via Homebrew: brew install parallel",
            "windows": "Available in WSL"
        }
    }
];

export { data_processingCommands };
export default data_processingCommands;
