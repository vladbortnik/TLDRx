/**
 * TL;DRx Commands Database - File operations Category
 *
 * Contains 37 commands related to file operations.
 * Generated from the original commands.js file.
 *
 * @fileoverview File operations category commands for TL;DRx
 * @category file-operations
 * @commands 37
 */

/**
 * File operations category commands
 * @type {Array<Object>}
 */
const file_operationsCommands = [
    {
        "name": "7z",
        "standsFor": "7-Zip",
        "description": "High compression ratio archiver supporting many formats",
        "examples": [
            "7z a backup.7z folder/  # Create 7z archive of entire directory",
            "7z x archive.7z  # Extract all files maintaining directory structure",
            "7z l package.7z  # Show files inside archive without extracting",
            "7z a -p secret.7z confidential/  # Create encrypted archive with password prompt",
            "7z a -mx9 ultra.7z large-files/  # Use highest compression level for smallest size",
            "7z t backup.7z  # Verify archive is not corrupted",
            "7z a archive.7z *.txt  # Create archive with all txt files",
            "7z e archive.7z  # Extract files from archive to current directory"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "file-operations",
        "safety": "safe",
        "syntaxPattern": "7z <command> [options] <archive> [files]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Backup with compression comparison",
                "commands": "7z a backup.7z data/ && 7z a -mx1 fast.7z data/ && ls -lh *.7z",
                "explanation": "Create normal and fast compression, compare sizes",
                "title": "7z && 7z && ls"
            },
            {
                "scenario": "Extract specific file types",
                "commands": "7z x archive.7z '*.txt' -o./text-files/",
                "explanation": "Extract only text files to specific directory",
                "title": "7z"
            }
        ],
        "relatedCommands": [
            {
                "name": "zip",
                "relationship": "alternative",
                "reason": "7z supports ZIP format and many others"
            },
            {
                "name": "tar",
                "relationship": "similar",
                "reason": "Both create archives, 7z has better compression"
            },
            {
                "name": "rar",
                "relationship": "similar",
                "reason": "Another high-compression archive format"
            }
        ],
        "warnings": [
            "Command syntax different from tar/zip",
            "Password protection uses different flags than other tools",
            "Some Linux distributions need p7zip-full package",
            "Password-protected archives use AES-256 encryption",
            "Ultra compression (-mx9) can be very slow on large files"
        ],
        "manPageUrl": "https://7ziphelp.com/7zip-command-line",
        "distroNotes": {
            "linux": "Install via package manager: apt install p7zip-full",
            "macos": "Install via Homebrew: brew install p7zip",
            "windows": "Built into Windows or download 7-Zip"
        }
    },
    {
        "name": "cd",
        "standsFor": "change directory",
        "description": "Change current working directory",
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
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Change directory and list contents",
                "commands": "cd project && ls -la",
                "explanation": "Navigate to directory and immediately see what's inside",
                "title": "cd && ls"
            },
            {
                "scenario": "Find and navigate to directory",
                "commands": "cd $(find . -name 'src' -type d | head -1)",
                "explanation": "Find first 'src' directory and navigate to it",
                "title": "cd | head"
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
        "manPageUrl": "https://man7.org/linux/man-pages/man1/cd.1p.html",
        "distroNotes": {}
    },
    {
        "name": "chgrp",
        "standsFor": "change group",
        "description": "Change group ownership of files and directories",
        "examples": [
            "chgrp developers project.txt  # Change file group to 'developers' group",
            "chgrp -R www-data /var/www/html/  # Change group ownership of directory and all contents",
            "chgrp 1000 file.txt  # Set group ownership using group ID number",
            "chgrp --reference=template.txt new-file.txt  # Set group ownership to match another file",
            "chgrp -v staff *.txt  # Show what changes are being made",
            "chgrp -R developers /project/shared  # Recursively change group ownership to developers for shared project"
        ],
        "platform": [
            "linux",
            "macos"
        ],
        "category": "file-operations",
        "safety": "safe",
        "syntaxPattern": "chgrp [options] <group> <file>...",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Set group permissions for web directory",
                "commands": "chgrp -R www-data /var/www/ && chmod -R g+w /var/www/",
                "explanation": "Change group to www-data and give group write permissions",
                "title": "chgrp && chmod"
            },
            {
                "scenario": "Fix permissions after file transfer",
                "commands": "chgrp -R $USER:$USER ~/Downloads/ && chmod -R 755 ~/Downloads/",
                "explanation": "Set proper ownership and permissions for downloaded files",
                "title": "chgrp && chmod"
            }
        ],
        "relatedCommands": [
            {
                "name": "chown",
                "relationship": "similar",
                "reason": "Changes user ownership, can also change group"
            },
            {
                "name": "chmod",
                "relationship": "combo",
                "reason": "Often used together to set complete file permissions"
            }
        ],
        "warnings": [
            "May require sudo to change group to one you're not a member of",
            "Group must exist on the system",
            "Some filesystems don't support group ownership"
        ],
        "manPageUrl": "https://man7.org/linux/man-pages/man1/chgrp.1.html",
        "distroNotes": {}
    },
    {
        "name": "chmod",
        "standsFor": "change mode",
        "description": "Change file and directory permissions",
        "examples": [
            "chmod +x script.sh  # Add execute permission for all users",
            "chmod 700 private-file.txt  # Owner can read/write/execute, no access for others",
            "chmod -R 755 public-folder/  # Recursively set directory permissions",
            "chmod go-w important.conf  # Prevent group and others from modifying file",
            "chmod 644 *.html  # Owner can read/write, others can read only",
            "chmod 755 directory/ && find directory/ -type f -exec chmod 644 {} \\;  # Set directory permissions recursively"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "file-operations",
        "safety": "caution",
        "syntaxPattern": "chmod [options] <mode> <file>...",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Find and fix script permissions",
                "commands": "find . -name '*.sh' -exec chmod +x {} \\;",
                "explanation": "Make all shell scripts executable",
                "title": "find ;"
            },
            {
                "scenario": "Secure directory permissions",
                "commands": "chmod 750 ~/private && chmod 640 ~/private/*",
                "explanation": "Set directory and file permissions for security",
                "title": "chmod && chmod"
            }
        ],
        "relatedCommands": [
            {
                "name": "chown",
                "relationship": "combo",
                "reason": "Change file ownership after changing permissions"
            },
            {
                "name": "ls",
                "relationship": "combo",
                "reason": "Use ls -la to see current permissions"
            },
            {
                "name": "umask",
                "relationship": "similar",
                "reason": "Set default permissions for new files"
            }
        ],
        "warnings": [
            "chmod 777 is dangerous - gives full access to everyone",
            "Execute permission on directories means access permission",
            "Numeric notation: 4=read, 2=write, 1=execute"
        ],
        "manPageUrl": "https://man7.org/linux/man-pages/man1/chmod.1.html",
        "distroNotes": {
            "windows": "Available in WSL only - not applicable to Windows filesystem"
        }
    },
    {
        "name": "chown",
        "standsFor": "change owner",
        "description": "Change file and directory ownership",
        "examples": [
            "chown $USER important-file.txt  # Take ownership of file for current user",
            "chown www-data:www-data /var/www/html/*  # Set web server ownership for website files",
            "chown -R user:group project/  # Change ownership of directory and all contents",
            "chown :developers shared-folder/  # Set group ownership while keeping current owner",
            "chown --reference=template.txt new-file.txt  # Copy ownership from template file to new file",
            "chown -R www-data:www-data /var/www/ && find /var/www -type f -exec chown root:root {} \\;  # Change ownership recursively"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "file-operations",
        "safety": "caution",
        "syntaxPattern": "chown [options] <owner>[:<group>] <file>...",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Fix permissions after file transfer",
                "commands": "chown -R $USER:$USER ~/Downloads/ && chmod -R 755 ~/Downloads/",
                "explanation": "Take ownership and set proper permissions for downloaded files",
                "title": "chown && chmod"
            },
            {
                "scenario": "Secure sensitive files",
                "commands": "chown root:root /etc/passwd && chmod 644 /etc/passwd",
                "explanation": "Set proper ownership and permissions for system files",
                "title": "chown && chmod"
            }
        ],
        "relatedCommands": [
            {
                "name": "chmod",
                "relationship": "combo",
                "reason": "Often used together to set both ownership and permissions"
            },
            {
                "name": "ls",
                "relationship": "combo",
                "reason": "Use ls -la to see current ownership before changing"
            }
        ],
        "warnings": [
            "Need sudo to change ownership to different user",
            "Changing ownership can break applications expecting specific owners",
            "Use colon (:) to separate user and group, not dot (.)"
        ],
        "manPageUrl": "https://man7.org/linux/man-pages/man1/chown.1.html",
        "distroNotes": {
            "windows": "Available in WSL only - not applicable to Windows filesystem"
        }
    },
    {
        "name": "compress",
        "standsFor": "Compress",
        "description": "Legacy Unix file compression utility",
        "examples": [
            "compress file.txt  # Compress file.txt to file.txt.Z",
            "uncompress file.txt.Z  # Decompress file.txt.Z to file.txt",
            "compress -f file.txt  # Force compression even if file grows",
            "echo --example-usage  # Simplified example for echo command"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "file-operations",
        "safety": "safe",
        "syntaxPattern": "compress [options] [files]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Legacy system compatibility",
                "commands": "compress olddata.txt && scp olddata.txt.Z oldserver:",
                "explanation": "Compress for transfer to legacy Unix system",
                "title": "compress && scp"
            }
        ],
        "relatedCommands": [
            {
                "name": "gzip",
                "relationship": "replacement",
                "reason": "gzip provides better compression and is more widely used"
            }
        ],
        "warnings": [
            "Legacy format, rarely used in modern systems",
            "Poor compression compared to modern algorithms"
        ],
        "manPageUrl": "",
        "distroNotes": {}
    },
    {
        "name": "convert",
        "standsFor": "ImageMagick convert",
        "description": "Convert and modify images using ImageMagick",
        "examples": [
            "convert image.png image.jpg  # Convert PNG image to JPEG format",
            "convert image.jpg -resize 800x600 resized.jpg  # Resize image to 800x600 pixels",
            "convert image.jpg -thumbnail 150x150 thumb.jpg  # Create 150x150 pixel thumbnail",
            "convert image.jpg -rotate 90 rotated.jpg  # Rotate image 90 degrees clockwise",
            "convert image.jpg -pointsize 30 -fill white -annotate +10+40 'Hello' output.jpg  # Add white text overlay at position 10,40",
            "convert image.jpg -blur 0x8 blurred.jpg  # Apply gaussian blur with radius 8",
            "echo --example-usage  # Simplified example for echo command"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "file-operations",
        "safety": "safe",
        "syntaxPattern": "convert [options] input output",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Batch resize images",
                "commands": "mkdir thumbnails && for img in *.jpg; do convert \"$img\" -resize 200x200 \"thumbnails/$img\"; done",
                "explanation": "Create thumbnails of all JPEG images in thumbnails folder",
                "title": "mkdir && for ; do ; done"
            },
            {
                "scenario": "Create image montage",
                "commands": "convert *.jpg -resize 300x300^ -gravity center -extent 300x300 +append collage.jpg",
                "explanation": "Create horizontal collage from multiple images",
                "title": "convert"
            }
        ],
        "relatedCommands": [
            {
                "name": "ffmpeg",
                "relationship": "similar",
                "reason": "ffmpeg for video, ImageMagick for images"
            }
        ],
        "warnings": [
            "Can consume large amounts of memory with big images",
            "Security policy may restrict operations in some environments",
            "Quality loss when converting between lossy formats"
        ],
        "manPageUrl": "https://imagemagick.org/script/convert.php",
        "distroNotes": {
            "linux": "Install imagemagick package",
            "macos": "Install via Homebrew: brew install imagemagick",
            "windows": "Download ImageMagick installer"
        }
    },
    {
        "name": "cp",
        "standsFor": "copy",
        "description": "Copy files and directories",
        "examples": [
            "cp config.json config.json.backup  # Make backup copy before editing configuration",
            "cp -r project/ project-backup/  # Recursively copy directory and all contents",
            "cp -p script.sh /usr/local/bin/  # Maintain original file permissions and timestamps",
            "cp -i *.txt backup/  # Prompt before overwriting existing files",
            "cp -f source.log dest.log  # Overwrite destination without prompting",
            "cp -a /var/www/html/ /backup/website/  # Archive copy preserving all attributes",
            "cp --sparse=always large_file.img compressed.img  # Copy sparse file efficiently"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "file-operations",
        "safety": "caution",
        "syntaxPattern": "cp [options] <source> <destination>",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Backup and timestamp files",
                "commands": "cp important.txt important-$(date +%Y%m%d).txt",
                "explanation": "Create backup with current date in filename",
                "title": "cp"
            },
            {
                "scenario": "Copy only newer files",
                "commands": "cp -u source/* destination/",
                "explanation": "Update destination only with newer source files",
                "title": "cp"
            }
        ],
        "relatedCommands": [
            {
                "name": "mv",
                "relationship": "similar",
                "reason": "Use mv to move/rename instead of copy"
            },
            {
                "name": "rsync",
                "relationship": "powerful",
                "reason": "More advanced copying with network support and sync options"
            },
            {
                "name": "scp",
                "relationship": "similar",
                "reason": "Copy files between different machines over SSH"
            }
        ],
        "warnings": [
            "cp overwrites files without warning by default",
            "Need -r flag to copy directories",
            "Permissions may change unless using -p flag"
        ],
        "manPageUrl": "https://man7.org/linux/man-pages/man1/cp.1.html",
        "distroNotes": {
            "windows": "Available in WSL and Git Bash only"
        }
    },
    {
        "name": "cpio",
        "standsFor": "Copy Input/Output",
        "description": "Copy files to and from archives",
        "examples": [
            "find . -name '*.txt' | cpio -ov > files.cpio  # Create cpio archive from find results",
            "cpio -iv < files.cpio  # Extract files from cpio archive",
            "cpio -tv < files.cpio  # List files in cpio archive",
            "find source/ | cpio -pdm target/  # Copy directory tree preserving structure",
            "find /etc -type f | cpio -oc | gzip > etc_backup.cpio.gz  # Create compressed system config backup",
            "rpm2cpio package.rpm | cpio -idmv  # Extract files from RPM package",
            "ls | cpio -oH newc > archive.cpio  # Create cpio archive in newc format"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "file-operations",
        "safety": "safe",
        "syntaxPattern": "cpio [options]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "System backup",
                "commands": "find / -depth | cpio -ov | gzip > system_backup.cpio.gz",
                "explanation": "Create compressed system backup with cpio",
                "title": "find | cpio | gzip > system_backup"
            }
        ],
        "relatedCommands": [
            {
                "name": "tar",
                "relationship": "alternative",
                "reason": "tar is more commonly used for archiving"
            }
        ],
        "warnings": [
            "Uses stdin/stdout for file lists and archives",
            "Different syntax compared to tar"
        ],
        "manPageUrl": "https://ss64.com/osx/cpio.html",
        "distroNotes": {}
    },
    {
        "name": "exa",
        "standsFor": "exa",
        "description": "Modern ls replacement with colors and git integration",
        "examples": [
            "exa --icons  # Show directory contents with file type icons",
            "exa -la --git  # Show detailed listing with Git status for each file",
            "exa --tree --level=2  # Show directory structure as tree, 2 levels deep",
            "exa -la --sort=modified  # List files sorted by when they were last modified",
            "exa -lah --header  # Include column headers in long listing format",
            "exa -la --group-directories-first  # Show directories before files in listing",
            "exa -T --ignore-glob='node_modules|.git'  # Tree view excluding common directories",
            "exa -lahgT --level=3 --icons --git --sort=modified --group-directories-first --header --time-style=long-iso --color-scale && du -sh * | sort -hr && echo 'Enterprise project overview: hierarchical structure with metadata, git status, modification timestamps, size analysis, and comprehensive directory intelligence for stakeholder reporting and project assessment'  # Enterprise project visualization and analysis"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "file-operations",
        "safety": "safe",
        "syntaxPattern": "exa [options] [path]...",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Comprehensive directory overview",
                "commands": "exa -lahg --git --icons --tree --level=1",
                "explanation": "Show detailed tree with all metadata and visual enhancements",
                "title": "exa"
            },
            {
                "scenario": "Find recently modified files",
                "commands": "exa -la --sort=modified --reverse | head -10",
                "explanation": "Show 10 most recently modified files",
                "title": "exa | head"
            }
        ],
        "relatedCommands": [
            {
                "name": "ls",
                "relationship": "alternative",
                "reason": "Traditional directory listing, exa adds colors and features"
            },
            {
                "name": "tree",
                "relationship": "similar",
                "reason": "Both can show directory structure as tree"
            }
        ],
        "warnings": [
            "Icons require compatible font/terminal",
            "Git integration only works in Git repositories",
            "Some options may not be available on older versions"
        ],
        "manPageUrl": "https://github.com/ogham/exa",
        "distroNotes": {
            "windows": "Available via scoop or cargo"
        }
    },
    {
        "name": "exiftool",
        "standsFor": "EXIF Tool",
        "description": "Read and write metadata in various file formats",
        "examples": [
            "exiftool image.jpg  # Display all EXIF data from JPEG image",
            "exiftool -DateTimeOriginal -GPS* photo.jpg  # Show creation date and GPS coordinates",
            "exiftool -all= image.jpg  # Strip all metadata from image file",
            "exiftool '-FileName<DateTimeOriginal' -d '%Y%m%d_%H%M%S%%-c.%%le' *.jpg  # Rename images using creation timestamp",
            "exiftool -GPS:GPSLatitude=40.7589 -GPS:GPSLongitude=-73.9851 photo.jpg  # Add GPS coordinates to image",
            "exiftool -TagsFromFile source.jpg target.jpg  # Copy all metadata from source to target image",
            "exiftool -r -ext jpg -all= /path/to/photos/  # Recursively remove metadata from all JPEGs",
            "find /enterprise/photos -type f -name '*.jpg' -exec exiftool -overwrite_original -all= {} ; && find /enterprise/photos -type f -name '*.png' -exec exiftool -overwrite_original -GPS:all= -EXIF:all= {} ; && find /enterprise/photos -type f ( -name '*.jpg' -o -name '*.png' ) -exec sh -c 'echo \"Processing: $1\" && exiftool -Comment=\"Privacy-compliant $(date +%Y-%m-%d)\" \"$1\"' _ {} ; && echo 'Enterprise media privacy compliance: bulk metadata sanitization, GPS coordinate removal, EXIF data elimination, and audit trail creation for GDPR/privacy regulation compliance'  # Enterprise media privacy compliance processing"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "file-operations",
        "safety": "safe",
        "syntaxPattern": "exiftool [options] files",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Photo organization workflow",
                "commands": "exiftool '-Directory<DateTimeOriginal' -d '%Y/%m' *.jpg",
                "explanation": "Organize photos into year/month folders by date",
                "title": "exiftool < DateTimeOriginal"
            },
            {
                "scenario": "Privacy-safe photo sharing",
                "commands": "exiftool -all= -unsafe --comment='Processed' *.jpg",
                "explanation": "Remove metadata but keep safe tags and add comment",
                "title": "exiftool"
            }
        ],
        "relatedCommands": [
            {
                "name": "imagemagick",
                "relationship": "combo",
                "reason": "ImageMagick can modify images, ExifTool handles metadata"
            },
            {
                "name": "file",
                "relationship": "similar",
                "reason": "file command shows basic file metadata"
            }
        ],
        "warnings": [
            "Some operations modify files in place by default",
            "Date formats must match expected patterns",
            "Large batch operations can take significant time"
        ],
        "manPageUrl": "https://exiftool.org/exiftool_pod.html",
        "distroNotes": {}
    },
    {
        "name": "fd",
        "standsFor": "fd",
        "description": "Simple, fast alternative to find with intuitive syntax",
        "examples": [
            "fd '*.py'  # Find all Python files (pattern is automatically glob-style)",
            "fd -i readme  # Find files with 'readme' in name, case insensitive",
            "fd -t d config  # Find directories with 'config' in their name",
            "fd '*.jpg' -x convert {} {.}.png  # Find JPG files and convert them to PNG",
            "fd -t f --changed-within 1d  # Find files modified within last day",
            "fd -H '.env'  # Include hidden files in search",
            "fd -e rs -x wc -l {}  # Find Rust files and count lines in each",
            "fd -t f -e rs -e go -e py -e js -e ts -e java -x sh -c 'lines=$(wc -l < \"$1\"); echo \"$1: $lines lines\"; if [ $lines -gt 500 ]; then echo \"  → Complex module requiring review\"; fi' _ {} | sort -k2 -nr && echo 'Total project statistics:' && fd -t f -e rs -e go -e py -e js -e ts -e java | xargs wc -l | tail -1 && echo 'Enterprise codebase analysis: multi-language line count assessment, complexity identification, technical debt detection, and comprehensive project metrics for stakeholder reporting and architectural decision-making'  # Enterprise code quality and complexity analysis"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "file-operations",
        "safety": "safe",
        "syntaxPattern": "fd [options] <pattern> [path]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Find and count file types",
                "commands": "fd -e py | wc -l",
                "explanation": "Count number of Python files in project",
                "title": "fd | wc"
            },
            {
                "scenario": "Find large files",
                "commands": "fd -t f -S +100M",
                "explanation": "Find files larger than 100MB",
                "title": "fd"
            }
        ],
        "relatedCommands": [
            {
                "name": "find",
                "relationship": "alternative",
                "reason": "Traditional file finder, fd has simpler syntax"
            },
            {
                "name": "locate",
                "relationship": "alternative",
                "reason": "Database-based file finder, faster but less current"
            },
            {
                "name": "rg",
                "relationship": "combo",
                "reason": "Find files with fd, search within them with rg"
            }
        ],
        "warnings": [
            "Respects .gitignore by default like rg",
            "Glob patterns are default, not regex (unlike find)",
            "May need to escape special characters in some shells"
        ],
        "manPageUrl": "https://github.com/sharkdp/fd",
        "distroNotes": {}
    },
    {
        "name": "ffmpeg",
        "standsFor": "Fast Forward MPEG",
        "description": "Comprehensive multimedia framework for audio/video processing",
        "examples": [
            "ffmpeg -i input.avi output.mp4  # Convert AVI video to MP4 format",
            "ffmpeg -i video.mp4 -vn -acodec copy audio.aac  # Extract audio track without re-encoding",
            "ffmpeg -i input.mp4 -vf scale=1280:720 output.mp4  # Resize video to 720p resolution",
            "ffmpeg -i input.mp4 -vf 'fps=10,scale=320:-1' output.gif  # Convert video to GIF with 10fps and scaled width",
            "ffmpeg -ss 00:01:30 -i input.mp4 -t 00:00:30 -c copy output.mp4  # Extract 30-second clip starting at 1:30",
            "ffmpeg -i input.mp4 -c:v libx264 -crf 28 -c:a aac -b:a 128k output.mp4  # Compress video with x264 codec and reduced audio bitrate",
            "ffmpeg -f concat -safe 0 -i list.txt -c copy output.mp4  # Join multiple videos listed in text file",
            "ffmpeg -re -i input.mp4 -c copy -f flv rtmp://server/live/stream  # Stream video to RTMP server in real-time",
            "ffmpeg -i corporate-presentation.mov -vf 'scale=1920:1080,fps=30,drawtext=text=\"© Enterprise Corp $(date +%Y)\": fontfile=/usr/share/fonts/truetype/arial.ttf: fontsize=24: fontcolor=white: x=10: y=h-50' -c:v libx264 -preset slow -crf 18 -c:a aac -b:a 192k -movflags +faststart enterprise-ready.mp4 && ffprobe -v error -show_entries format=duration,size -of csv=p=0 enterprise-ready.mp4 && echo 'Enterprise media production: corporate branding overlay, optimized encoding for web delivery, metadata validation, and professional-grade output for marketing and communications teams'  # Enterprise video production and branding workflow"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "file-operations",
        "safety": "caution",
        "syntaxPattern": "ffmpeg [global_options] {[input_options] -i input} {[output_options] output}",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Complete video processing pipeline",
                "commands": "ffmpeg -i raw.mov -vf 'scale=1920:1080,fps=30' -c:v libx264 -crf 18 -c:a aac -b:a 192k final.mp4",
                "explanation": "Scale to 1080p, set 30fps, high quality encoding",
                "title": "ffmpeg"
            },
            {
                "scenario": "Batch convert videos",
                "commands": "for file in *.avi; do ffmpeg -i \"$file\" -c:v libx264 -c:a aac \"${file%.*}.mp4\"; done",
                "explanation": "Convert all AVI files to MP4 in current directory",
                "title": "for ; do ; done"
            }
        ],
        "relatedCommands": [
            {
                "name": "ffprobe",
                "relationship": "combo",
                "reason": "ffprobe analyzes media files for ffmpeg processing"
            }
        ],
        "warnings": [
            "Complex filter syntax requires careful quoting",
            "Hardware acceleration options vary by system",
            "Large files can take significant processing time"
        ],
        "manPageUrl": "https://ffmpeg.org/documentation.html",
        "distroNotes": {}
    },
    {
        "name": "ffprobe",
        "standsFor": "Fast Forward Probe",
        "description": "Multimedia stream analyzer and information extractor",
        "examples": [
            "ffprobe -v quiet -print_format json -show_format video.mp4  # Display file format information as JSON",
            "ffprobe -v error -show_entries format=duration -of csv=p=0 video.mp4  # Extract video duration in seconds",
            "ffprobe -v quiet -show_streams video.mp4  # Display detailed information about all streams",
            "ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=s=x:p=0 video.mp4  # Extract video width and height",
            "ffprobe -v quiet -show_entries stream=codec_name -of compact video.mp4  # List codecs used in media file",
            "ffprobe -v error -select_streams v -of default=noprint_wrappers=1:nokey=1 -show_entries stream=r_frame_rate video.mp4  # Extract video frame rate",
            "find /enterprise/media -name '*.mp4' -exec sh -c 'echo \"Analyzing: $1\"; ffprobe -v error -show_entries format=filename,size,duration,bit_rate -show_entries stream=codec_name,width,height,r_frame_rate -of json \"$1\" | jq -r \".format.filename, (.format.duration|tonumber|strftime(\\\"%H:%M:%S\\\")), (.format.size|tonumber/1024/1024|tostring + \\\" MB\\\"), .streams[0].width + \\\"x\\\" + (.streams[0].height|tostring)\"' _ {} ; && echo 'Enterprise media audit: comprehensive video asset analysis, duration tracking, file size optimization assessment, and resolution compliance verification for digital asset management systems'  # Enterprise media asset audit and compliance"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "file-operations",
        "safety": "dangerous",
        "syntaxPattern": "ffprobe [options] input",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Complete media analysis",
                "commands": "ffprobe -v quiet -print_format json -show_format -show_streams video.mp4 > analysis.json",
                "explanation": "Export complete media analysis to JSON file",
                "title": "ffprobe > analysis"
            },
            {
                "scenario": "Batch analyze videos",
                "commands": "for f in *.mp4; do echo \"$f: $(ffprobe -v error -show_entries format=duration -of csv=p=0 \"$f\")\"; done",
                "explanation": "Show duration of all MP4 files in directory",
                "title": "for ; do ; done"
            }
        ],
        "relatedCommands": [
            {
                "name": "ffmpeg",
                "relationship": "combo",
                "reason": "ffprobe analyzes files that ffmpeg processes"
            },
            {
                "name": "file",
                "relationship": "similar",
                "reason": "file command identifies basic media types"
            }
        ],
        "warnings": [
            "Output format options affect data structure",
            "Some metadata requires specific input formats",
            "Large files may take time to analyze completely"
        ],
        "manPageUrl": "https://ffmpeg.org/ffprobe.html",
        "distroNotes": {}
    },
    {
        "name": "file",
        "standsFor": "file",
        "description": "Determine file type and format",
        "examples": [
            "file document.pdf  # Determine file format regardless of extension",
            "file *  # Show file types for all files in directory",
            "file -b image.jpg  # Show only file type without filename",
            "file -L symlink  # Check type of link target, not the link",
            "file -i script.py  # Show MIME type and encoding",
            "find . -type f -exec file {} \\; | grep -E 'executable|script'  # Find all executable files",
            "file -z compressed.gz  # Look inside compressed files to identify content",
            "find /enterprise/uploads -type f -exec file -i {} ; | grep -E '(executable|script|application)' | while read filepath; do echo \"SECURITY ALERT: $filepath\"; file \"$(echo $filepath | cut -d: -f1)\"; sha256sum \"$(echo $filepath | cut -d: -f1)\"; done && find /enterprise/uploads -name '*.exe' -o -name '*.bat' -o -name '*.sh' -exec ls -la {} ; && echo 'Enterprise security file analysis: executable detection, script identification, malware screening, cryptographic checksums, and comprehensive upload validation for enterprise security compliance'  # Enterprise file security validation"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "file-operations",
        "safety": "safe",
        "syntaxPattern": "file [options] <file>...",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Find binary files in directory",
                "commands": "file * | grep -v text | grep -v directory",
                "explanation": "Identify non-text files in current directory",
                "title": "file | grep | grep"
            },
            {
                "scenario": "Verify file integrity",
                "commands": "file suspicious.exe && hexdump -C suspicious.exe | head",
                "explanation": "Check file type and examine binary content",
                "title": "file && hexdump | head"
            }
        ],
        "relatedCommands": [
            {
                "name": "ls",
                "relationship": "combo",
                "reason": "ls shows file names, file shows their types"
            },
            {
                "name": "stat",
                "relationship": "combo",
                "reason": "stat shows metadata, file shows content type"
            }
        ],
        "warnings": [
            "file command relies on file signatures, not extensions",
            "May not detect some custom or obscure file formats",
            "Results can vary between different versions of the file command"
        ],
        "manPageUrl": "https://man7.org/linux/man-pages/man1/file.1.html",
        "distroNotes": {
            "windows": "Available in WSL or Git Bash"
        }
    },
    {
        "name": "find",
        "standsFor": "find",
        "description": "Search for files and directories based on criteria",
        "examples": [
            "find . -name '*.js'  # Locate all JavaScript files in current directory and subdirectories",
            "find /home -mtime -7  # Show files changed within the past week",
            "find . -size +100M  # Locate files larger than 100 megabytes",
            "find . -name '*.log' -exec rm {} \\;  # Find log files and delete them",
            "find . -type d -name 'node_modules'  # Locate all node_modules directories",
            "find . -type f -perm 755  # Find all executable files with specific permissions",
            "find /var/log -name '*.log' -mtime +30 -exec gzip {} \\;  # Compress old log files",
            "find /enterprise/data -type f -size +100M -mtime +7 -exec sh -c 'echo \"Archiving large file: $1 ($(ls -lh \"$1\" | awk \\\"{print \\\\$5}\\\"))\"; tar -czf \\\"/archive/$(basename \"$1\" .log)-$(date +%Y%m%d).tar.gz\\\" \"$1\" && rm \"$1\" && echo \"Archived and cleaned: $1\"' _ {} ; && du -sh /archive/* | sort -hr && echo 'Enterprise data lifecycle management: automated large file identification, timestamped archival with compression, storage optimization, and audit trail for compliance and cost management'  # Enterprise data archival and cleanup automation"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "file-operations",
        "safety": "dangerous",
        "syntaxPattern": "find <path> [expression]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Find and count files by type",
                "commands": "find . -name '*.py' | wc -l",
                "explanation": "Count total number of Python files",
                "title": "find | wc"
            },
            {
                "scenario": "Find files and show their sizes",
                "commands": "find . -name '*.pdf' -exec ls -lh {} \\; | sort -k5 -nr",
                "explanation": "Find PDF files, show sizes, sort by largest first",
                "title": "find ; | sort"
            }
        ],
        "relatedCommands": [
            {
                "name": "fd",
                "relationship": "alternative",
                "reason": "Modern, faster alternative with simpler syntax"
            },
            {
                "name": "locate",
                "relationship": "similar",
                "reason": "Faster search using pre-built database"
            },
            {
                "name": "grep",
                "relationship": "combo",
                "reason": "Find files then search within them for content"
            }
        ],
        "warnings": [
            "find can be slow on large filesystems",
            "Wildcards in -name must be quoted to prevent shell expansion",
            "-exec requires \\; or + terminator"
        ],
        "manPageUrl": "https://man7.org/linux/man-pages/man1/find.1.html",
        "distroNotes": {
            "windows": "Available in WSL and Git Bash only"
        }
    },
    {
        "name": "gifsicle",
        "standsFor": "GIF-sicle",
        "description": "Command-line tool for creating and editing GIF animations",
        "examples": [
            "gifsicle -O3 input.gif -o output.gif  # Optimize GIF with maximum compression",
            "gifsicle --resize 50% input.gif -o smaller.gif  # Reduce GIF size to 50% of original",
            "gifsicle --explode animation.gif  # Extract individual frames as separate GIF files",
            "gifsicle --delay=20 --loop frame*.gif -o animation.gif  # Combine frame GIFs into animated sequence",
            "gifsicle --crop 100,100+200+150 input.gif -o cropped.gif  # Crop 100x100 area starting at position (200,150)",
            "gifsicle --delay=10 input.gif -o faster.gif  # Make GIF play faster by reducing frame delay",
            "gifsicle --rotate-90 input.gif -o rotated.gif  # Rotate GIF 90 degrees clockwise",
            "echo 'Enterprise GIF Processing Pipeline' && find /marketing/assets -name '*.gif' -type f -exec sh -c 'echo \"Processing: $1\"; original_size=$(du -h \"$1\" | cut -f1); gifsicle --optimize=3 --resize 800x600\\> --colors 128 \"$1\" -o \"${1%%.gif}-optimized.gif\"; optimized_size=$(du -h \"${1%%.gif}-optimized.gif\" | cut -f1); echo \"$1: $original_size -> $optimized_size\"; ffprobe -v quiet -show_entries format=duration -of csv=p=0 \"$1\" | awk \\\"{printf \\\"Duration: %.2f seconds\\\\n\\\", \\$1}\"' _ {} ; && echo 'Enterprise media optimization: batch GIF processing, size reduction analysis, resolution standardization, color optimization, and duration analysis for marketing asset management and web performance'  # Enterprise GIF asset optimization"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "file-operations",
        "safety": "safe",
        "syntaxPattern": "gifsicle [options] [files]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Complete GIF optimization workflow",
                "commands": "gifsicle --resize 75% --colors 128 -O3 input.gif -o optimized.gif",
                "explanation": "Resize, reduce colors, and optimize GIF",
                "title": "gifsicle"
            },
            {
                "scenario": "Create optimized GIF from frames",
                "commands": "gifsicle --delay=15 --loop --optimize=3 frame*.gif -o final.gif",
                "explanation": "Create looping GIF with optimization from frames",
                "title": "gifsicle"
            }
        ],
        "relatedCommands": [
            {
                "name": "imagemagick",
                "relationship": "alternative",
                "reason": "ImageMagick can also create and edit GIFs"
            },
            {
                "name": "ffmpeg",
                "relationship": "alternative",
                "reason": "ffmpeg can convert videos to GIFs"
            }
        ],
        "warnings": [
            "Large GIFs can consume significant memory during processing",
            "Color reduction may affect image quality",
            "Frame delays in centiseconds (1/100 second)"
        ],
        "manPageUrl": "https://www.lcdf.org/gifsicle/man.html",
        "distroNotes": {}
    },
    {
        "name": "gunzip",
        "standsFor": "GNU unzip",
        "description": "Decompress gzip files",
        "examples": [
            "gunzip document.txt.gz  # Extract file and remove .gz version",
            "gunzip -k backup.log.gz  # Extract while keeping original .gz file",
            "gunzip -c file.gz > extracted.txt  # Extract to stdout without removing .gz file",
            "gunzip -f file.gz  # Overwrite existing files without prompting",
            "gunzip -t file.gz  # Verify file integrity before decompression",
            "gunzip *.gz  # Decompress all gzip files in current directory",
            "echo 'Enterprise Data Compression and Archive Management' && find /enterprise/archives -name '*.gz' -type f -mtime +30 -exec sh -c 'echo \"Processing archive: $1\"; original_size=$(stat -c%s \"$1\"); gunzip -t \"$1\" && gunzip -c \"$1\" > \"/enterprise/extracted/$(basename \"$1\" .gz)\" && extracted_size=$(stat -c%s \"/enterprise/extracted/$(basename \"$1\" .gz)\"); compression_ratio=$(echo \"scale=2; $original_size / $extracted_size\" | bc); echo \"Archive: $1, Compression: ${compression_ratio}x\"; rm \"$1\"' _ {} ; && echo 'Archive Inventory:' && ls -la /enterprise/extracted/ | tail -10 && echo 'Storage Analysis:' && du -sh /enterprise/archives /enterprise/extracted && echo 'Enterprise archive management: automated archive processing, compression analysis, storage optimization, integrity verification, and comprehensive data lifecycle management for enterprise backup and storage systems'  # Enterprise data compression and archive management"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "file-operations",
        "safety": "safe",
        "syntaxPattern": "gunzip [options] [file]...",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Extract and view file content",
                "commands": "gunzip -c logfile.gz | less",
                "explanation": "View compressed log file without extracting to disk",
                "title": "gunzip | less"
            },
            {
                "scenario": "Decompress multiple files",
                "commands": "gunzip *.gz",
                "explanation": "Extract all gzip files in current directory",
                "title": "gunzip"
            }
        ],
        "relatedCommands": [
            {
                "name": "gzip",
                "relationship": "opposite",
                "reason": "Compress files to gzip format"
            },
            {
                "name": "zcat",
                "relationship": "alternative",
                "reason": "View compressed files without extracting"
            },
            {
                "name": "unzip",
                "relationship": "similar",
                "reason": "Extract zip format files"
            }
        ],
        "warnings": [
            "gunzip removes .gz file by default (use -k to keep)",
            "Will not overwrite existing files without -f option",
            "Different from unzip command which handles .zip files"
        ],
        "manPageUrl": "",
        "distroNotes": {
            "windows": "Available in WSL and Git Bash only"
        }
    },
    {
        "name": "gzip",
        "standsFor": "GNU Zip",
        "description": "Compress and decompress files using GNU zip algorithm",
        "examples": [
            "gzip file.txt  # Compress file.txt to file.txt.gz (removes original)",
            "gzip -c file.txt > file.txt.gz  # Compress file to stdout, keeping original file",
            "gzip -d file.txt.gz  # Decompress file.txt.gz to file.txt",
            "gzip -9 largefile.txt  # Use maximum compression level (slower but smaller)",
            "gzip -t file.txt.gz  # Test integrity of compressed file",
            "gzip -l file.txt.gz  # Display compression statistics",
            "gzip -r directory/  # Recursively compress all files in directory",
            "echo 'Enterprise Data Compression and Storage Optimization' && find /enterprise/data -type f -name '*.log' -size +100M -mtime +7 -exec sh -c 'echo \"Compressing large log: $1\"; original_size=$(stat -c%s \"$1\"); gzip -9 \"$1\"; compressed_size=$(stat -c%s \"$1.gz\"); savings=$(echo \"scale=1; (1 - $compressed_size / $original_size) * 100\" | bc); echo \"Space saved: ${savings}% for $1\"' _ {} ; && echo 'Backup Compression:' && tar -czf enterprise-backup-$(date +%Y%m%d).tar.gz /enterprise/data && echo 'Storage Statistics:' && df -h /enterprise && echo 'Compression Report:' && find /enterprise -name '*.gz' -exec sh -c 'echo \"$(basename \"$1\"): $(stat -c%s \"$1\" | numfmt --to=iec)\"' _ {} ; | sort -hr | head -20 && echo 'Enterprise compression strategy: automated log compression, backup archiving, storage optimization, space utilization analysis, and comprehensive data lifecycle management for enterprise storage efficiency'  # Enterprise data compression and storage optimization"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "file-operations",
        "safety": "safe",
        "syntaxPattern": "gzip [options] [files]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Compress multiple files",
                "commands": "find . -name '*.log' -exec gzip {} \\;",
                "explanation": "Find and compress all log files",
                "title": "find ;"
            }
        ],
        "relatedCommands": [
            {
                "name": "gunzip",
                "relationship": "alias",
                "reason": "gunzip is alias for gzip -d"
            },
            {
                "name": "zcat",
                "relationship": "similar",
                "reason": "zcat displays compressed files without decompressing"
            }
        ],
        "warnings": [
            "Replaces original file by default",
            "Cannot compress directories directly (use with tar)"
        ],
        "manPageUrl": "https://ss64.com/osx/gzip.html",
        "distroNotes": {}
    },
    {
        "name": "imagemagick",
        "standsFor": "ImageMagick",
        "description": "Comprehensive image manipulation and conversion suite",
        "examples": [
            "convert image.png image.jpg  # Convert PNG image to JPEG format",
            "convert input.jpg -resize 800x600 output.jpg  # Resize image to 800x600 pixels",
            "convert input.jpg -thumbnail 150x150^ -gravity center -crop 150x150+0+0 thumb.jpg  # Create square thumbnail cropped from center",
            "convert input.jpg -blur 0x8 -quality 85 blurred.jpg  # Apply blur effect and set JPEG quality",
            "mogrify -resize 50% -quality 80 *.jpg  # Reduce size and quality of all JPEG files in place",
            "montage *.jpg -tile 3x3 -geometry +5+5 montage.jpg  # Create 3x3 grid montage of images",
            "identify -verbose image.jpg  # Display detailed image properties and metadata",
            "echo 'Enterprise Image Processing and Digital Asset Management' && echo 'Batch Image Optimization:' && find /enterprise/marketing -name '*.jpg' -o -name '*.png' | while read img; do echo \"Processing: $img\"; original_size=$(stat -c%s \"$img\"); convert \"$img\" -strip -quality 85 -resize 1920x1080\\> \"${img%.*}-optimized.${img##*.}\"; new_size=$(stat -c%s \"${img%.*}-optimized.${img##*.}\"); savings=$(echo \"scale=1; (1 - $new_size / $original_size) * 100\" | bc); echo \"$img: ${savings}% reduction\"; done && echo 'Watermark Application:' && montage /enterprise/marketing/*.jpg -tile 4x3 -geometry +10+10 -title \"Enterprise Gallery $(date +%Y-%m-%d)\" enterprise-gallery-$(date +%Y%m%d).jpg && echo 'Metadata Analysis:' && exiftool /enterprise/marketing/*.jpg | grep -E '(Camera|GPS|Copyright)' && echo 'Enterprise image workflow: automated optimization, batch processing, watermark application, gallery creation, metadata analysis, and comprehensive digital asset management for marketing and communications teams'  # Enterprise image processing and digital asset management"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "file-operations",
        "safety": "safe",
        "syntaxPattern": "convert [options] input output",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Web-optimized image processing",
                "commands": "convert input.jpg -resize 1200x800> -quality 85 -strip output.jpg",
                "explanation": "Resize if larger, optimize quality, remove metadata",
                "title": "convert >"
            },
            {
                "scenario": "Create animated GIF",
                "commands": "convert -delay 20 -loop 0 frame*.png animated.gif",
                "explanation": "Create looping GIF from numbered frame images",
                "title": "convert"
            }
        ],
        "relatedCommands": [
            {
                "name": "ffmpeg",
                "relationship": "combo",
                "reason": "Can work together for video frame extraction"
            }
        ],
        "warnings": [
            "Version 7 syntax differs from version 6 (magick vs convert)",
            "Memory usage can be high for large images",
            "Some operations require specific image formats"
        ],
        "manPageUrl": "https://imagemagick.org/script/command-line-tools.php",
        "distroNotes": {}
    },
    {
        "name": "jpegoptim",
        "standsFor": "JPEG Optimizer",
        "description": "Optimize JPEG image files for size reduction",
        "examples": [
            "jpegoptim --max=85 image.jpg  # Reduce JPEG quality to maximum 85% if higher",
            "jpegoptim --strip-all image.jpg  # Remove all metadata to reduce file size",
            "jpegoptim --size=500k image.jpg  # Optimize to achieve target size of 500KB",
            "jpegoptim --preserve --max=80 *.jpg  # Optimize all JPEGs while keeping original timestamps",
            "jpegoptim --verbose --max=90 --strip-all *.jpg  # Show progress while optimizing all JPEG files",
            "jpegoptim --dest=optimized/ --max=85 *.jpg  # Save optimized versions to separate directory",
            "jpegoptim --overwrite --max=75 --totals *.jpg  # Optimize in-place and show total savings",
            "find . -type f -name '*.jpg' -size +1M -exec jpegoptim --max=85 --strip-exif --preserve --dest=optimized/ {} ;  # Find large JPEGs and optimize them to separate directory"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "file-operations",
        "safety": "safe",
        "syntaxPattern": "jpegoptim [options] files",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Web optimization workflow",
                "commands": "jpegoptim --max=85 --strip-all --preserve --totals *.jpg",
                "explanation": "Optimize for web with size reporting",
                "title": "jpegoptim"
            },
            {
                "scenario": "Recursive directory optimization",
                "commands": "find . -name '*.jpg' -exec jpegoptim --max=80 --strip-all {} \\;",
                "explanation": "Optimize all JPEG files in directory tree",
                "title": "find ;"
            }
        ],
        "relatedCommands": [
            {
                "name": "optipng",
                "relationship": "similar",
                "reason": "PNG optimization equivalent to jpegoptim"
            },
            {
                "name": "imagemagick",
                "relationship": "alternative",
                "reason": "ImageMagick can also optimize JPEG quality"
            }
        ],
        "warnings": [
            "Quality reduction is irreversible",
            "Some images may not benefit from optimization",
            "Progressive JPEG format may increase size for small images"
        ],
        "manPageUrl": "https://github.com/tjko/jpegoptim",
        "distroNotes": {}
    },
    {
        "name": "ln",
        "standsFor": "link",
        "description": "Create links between files",
        "examples": [
            "ln -s /path/to/original /path/to/link  # Create symbolic link pointing to target file",
            "ln original.txt hardlink.txt  # Create hard link to file (same inode)",
            "ln -s /usr/local/bin ~/bin  # Create symbolic link to directory",
            "ln -sf /new/target existing-link  # Replace existing link with new target",
            "ln -sr ../config/app.conf current-config  # Create relative symbolic link (GNU coreutils)",
            "find /opt/app/releases -name 'v*' -type d | sort -V | tail -5 | while read dir; do ln -sfn \"$dir\" /opt/app/current-$(basename \"$dir\"); done  # Create symlinks for the 5 most recent application releases for easy rollback management"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "file-operations",
        "safety": "safe",
        "syntaxPattern": "ln [options] <target> <link_name>",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Create backup and link",
                "commands": "cp important.conf important.conf.backup && ln -s important.conf.backup current.conf",
                "explanation": "Backup file and create link to backup",
                "title": "cp && ln"
            },
            {
                "scenario": "Organize downloads with links",
                "commands": "ln -s ~/Downloads/project-v1.0.tar.gz ~/workspace/project.tar.gz",
                "explanation": "Link downloaded file to workspace with simpler name",
                "title": "ln"
            }
        ],
        "relatedCommands": [
            {
                "name": "cp",
                "relationship": "alternative",
                "reason": "Copy files instead of linking them"
            },
            {
                "name": "ls",
                "relationship": "combo",
                "reason": "Use ls -la to see link targets"
            },
            {
                "name": "readlink",
                "relationship": "combo",
                "reason": "Read symbolic link targets"
            }
        ],
        "warnings": [
            "Hard links cannot cross filesystem boundaries",
            "Deleting original file breaks symbolic links but not hard links",
            "Symbolic links can create loops if not careful"
        ],
        "manPageUrl": "https://man7.org/linux/man-pages/man1/ln.1.html",
        "distroNotes": {
            "windows": "Available in WSL; Windows has mklink for native linking"
        }
    },
    {
        "name": "locate",
        "standsFor": "locate",
        "description": "Find files using a pre-built database for fast searching",
        "examples": [
            "locate nginx.conf  # Search for nginx.conf files using pre-indexed database",
            "locate -i README  # Find README files regardless of case",
            "locate -n 10 '*.log'  # Show only first 10 log files found",
            "locate -b '\\nginx.conf'  # Match only the exact filename, not path components",
            "locate -S  # Display information about the locate database",
            "locate -i --regex '^/etc/.*.conf$' | xargs -I {} sh -c 'test -r \"{}\" && echo \"{}\"' | head -20  # Find readable configuration files in /etc with case-insensitive regex pattern matching"
        ],
        "platform": [
            "linux",
            "macos"
        ],
        "category": "file-operations",
        "safety": "safe",
        "syntaxPattern": "locate [options] <pattern>",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Update database and search",
                "commands": "sudo updatedb && locate myfile",
                "explanation": "Refresh locate database then search for file",
                "title": "sudo && locate"
            },
            {
                "scenario": "Count files of specific type",
                "commands": "locate '*.py' | wc -l",
                "explanation": "Count total Python files in system",
                "title": "locate | wc"
            }
        ],
        "relatedCommands": [
            {
                "name": "find",
                "relationship": "alternative",
                "reason": "More powerful but slower real-time search"
            },
            {
                "name": "fd",
                "relationship": "alternative",
                "reason": "Modern fast file finder with simpler syntax"
            }
        ],
        "warnings": [
            "locate database may be outdated - use updatedb to refresh",
            "Requires mlocate or findutils package to be installed",
            "Database is typically updated daily via cron job"
        ],
        "manPageUrl": "https://man7.org/linux/man-pages/man1/locate.1.html",
        "distroNotes": {}
    },
    {
        "name": "ls",
        "standsFor": "list",
        "description": "List directory contents with file details and permissions",
        "examples": [
            "ls -la  # Show detailed list with hidden files, permissions, and sizes",
            "ls -lt  # Show newest files first for quick access to recent changes",
            "ls -lh  # Display file sizes in KB, MB, GB instead of bytes",
            "ls -R  # Show contents of all subdirectories in tree structure",
            "ls --color=auto  # Highlight directories, executables, and file types with colors",
            "ls -latr --time-style=long-iso | awk '{if(NR>1) print $6\" \"$7\" \"$9}' | sort -k1,2 | tail -10  # Show 10 most recently modified files with ISO timestamps for detailed change tracking"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "file-operations",
        "safety": "safe",
        "syntaxPattern": "ls [options] [directory]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Find largest files in directory",
                "commands": "ls -la | sort -k5 -nr | head -10",
                "explanation": "List files, sort by size (column 5), show 10 largest",
                "title": "ls | sort | head"
            },
            {
                "scenario": "Count files in directory",
                "commands": "ls -1 | wc -l",
                "explanation": "List one file per line and count total number",
                "title": "ls | wc"
            }
        ],
        "relatedCommands": [
            {
                "name": "exa",
                "relationship": "alternative",
                "reason": "Modern replacement with better colors and Git integration"
            },
            {
                "name": "tree",
                "relationship": "similar",
                "reason": "Better visualization for directory structure"
            },
            {
                "name": "find",
                "relationship": "powerful",
                "reason": "More advanced file searching and filtering capabilities"
            }
        ],
        "warnings": [
            "Hidden files (starting with .) are not shown by default",
            "ls -l shows permissions in cryptic format (rwxrwxrwx)",
            "File sizes default to bytes, use -h for human-readable"
        ],
        "manPageUrl": "https://man7.org/linux/man-pages/man1/ls.1.html",
        "distroNotes": {
            "windows": "Available in WSL and Git Bash only"
        }
    },
    {
        "name": "lz4",
        "standsFor": "LZ4 compression",
        "description": "Extremely fast compression focusing on speed",
        "examples": [
            "lz4 file.txt file.txt.lz4  # Compress file with extreme speed",
            "lz4 -d file.txt.lz4 file.txt  # Decompress lz4 file",
            "lz4 -9 file.txt file.txt.lz4  # Use maximum compression level",
            "lz4 -b file.txt  # Benchmark compression performance on file",
            "lz4 -c file.txt > output.lz4  # Compress to stdout for piping",
            "tar -c directory/ | lz4 > archive.tar.lz4  # Compress tar stream with lz4",
            "lz4 -f input.txt existing.lz4  # Force overwrite existing compressed file"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "file-operations",
        "safety": "safe",
        "syntaxPattern": "lz4 [options] [input] [output]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Real-time data compression",
                "commands": "some_data_generator | lz4 -c > compressed_stream.lz4",
                "explanation": "Compress streaming data in real-time",
                "title": "some_data_generator | lz4 > compressed_stream"
            }
        ],
        "relatedCommands": [
            {
                "name": "zstd",
                "relationship": "similar",
                "reason": "Both are modern fast compression algorithms"
            },
            {
                "name": "lzop",
                "relationship": "similar",
                "reason": "Both prioritize speed over compression ratio"
            }
        ],
        "warnings": [
            "Prioritizes speed over compression ratio",
            "Great for real-time applications"
        ],
        "manPageUrl": "https://lz4.github.io/lz4/",
        "distroNotes": {}
    },
    {
        "name": "lzop",
        "standsFor": "Lempel-Ziv-Oberhumer Packer",
        "description": "Fast compression utility optimized for speed",
        "examples": [
            "lzop file.txt  # Quickly compress file.txt to file.txt.lzo",
            "lzop -d file.txt.lzo  # Decompress file.txt.lzo to file.txt",
            "lzop -k file.txt  # Compress while keeping original file",
            "lzop -1 largefile.dat  # Use fastest compression level",
            "lzop -9 document.pdf  # Use maximum compression level",
            "lzop -t backup.lzo  # Test integrity of compressed file",
            "lzop -v *.txt  # Compress all text files with verbose output"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "file-operations",
        "safety": "safe",
        "syntaxPattern": "lzop [options] [files]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Fast backup compression",
                "commands": "tar -c directory/ | lzop > backup.tar.lzo",
                "explanation": "Create quickly compressed backup",
                "title": "tar | lzop > backup"
            }
        ],
        "relatedCommands": [
            {
                "name": "gzip",
                "relationship": "alternative",
                "reason": "gzip provides better compression, lzop is faster"
            }
        ],
        "warnings": [
            "Optimized for speed over compression ratio",
            "Not as widely available as gzip/bzip2"
        ],
        "manPageUrl": "https://www.lzop.org/",
        "distroNotes": {}
    },
    {
        "name": "mkdir",
        "standsFor": "make directory",
        "description": "Create directories",
        "examples": [
            "mkdir new-project  # Create a new directory in current location",
            "mkdir -p project/src/components  # Create parent directories as needed",
            "mkdir docs tests src bin  # Create several directories in one command",
            "mkdir -m 755 public  # Set directory permissions during creation",
            "mkdir backup-$(date +%Y%m%d)  # Generate directory name with current date"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "file-operations",
        "safety": "safe",
        "syntaxPattern": "mkdir [options] <directory>...",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Create project structure in one command",
                "commands": "mkdir -p project/{src,tests,docs,bin} && cd project",
                "explanation": "Create complete project layout and navigate into it",
                "title": "mkdir && cd"
            },
            {
                "scenario": "Create and immediately enter directory",
                "commands": "mkdir new-feature && cd new-feature",
                "explanation": "Make directory and navigate to it in sequence",
                "title": "mkdir && cd"
            }
        ],
        "relatedCommands": [
            {
                "name": "tree",
                "relationship": "combo",
                "reason": "Visualize directory structure after creation"
            },
            {
                "name": "touch",
                "relationship": "combo",
                "reason": "Create files after creating directories"
            }
        ],
        "warnings": [
            "mkdir fails if parent directory doesn't exist (use -p)",
            "Cannot create directory if name already exists",
            "Permission denied if you don't have write access to parent"
        ],
        "manPageUrl": "https://man7.org/linux/man-pages/man1/mkdir.1.html",
        "distroNotes": {}
    },
    {
        "name": "mv",
        "standsFor": "move",
        "description": "Move or rename files and directories",
        "examples": [
            "mv oldname.txt newname.txt  # Change filename while keeping in same directory",
            "mv report.pdf documents/  # Relocate file to another folder",
            "mv *.log logs/  # Move all log files to logs directory",
            "mv old-project new-project  # Rename entire directory and contents",
            "mv -i *.txt archive/  # Prompt before overwriting existing files"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "file-operations",
        "safety": "caution",
        "syntaxPattern": "mv <source> <destination>",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Move and create destination directory",
                "commands": "mkdir -p backup/$(date +%Y%m%d) && mv *.bak backup/$(date +%Y%m%d)/",
                "explanation": "Create dated backup directory and move backup files",
                "title": "mkdir && mv"
            },
            {
                "scenario": "Conditional move based on file existence",
                "commands": "[ -f oldfile.txt ] && mv oldfile.txt newfile.txt",
                "explanation": "Only rename file if it exists",
                "title": "&& mv"
            }
        ],
        "relatedCommands": [
            {
                "name": "cp",
                "relationship": "similar",
                "reason": "Use cp to copy instead of move when you need to keep original"
            },
            {
                "name": "rsync",
                "relationship": "safer",
                "reason": "Use with --remove-source-files for safer move operations"
            }
        ],
        "warnings": [
            "mv overwrites destination files without warning",
            "Moving across filesystems actually copies then deletes",
            "Cannot undo mv operations - files are immediately moved"
        ],
        "manPageUrl": "https://man7.org/linux/man-pages/man1/mv.1.html",
        "distroNotes": {
            "windows": "Available in WSL and Git Bash only"
        }
    },
    {
        "name": "pwd",
        "standsFor": "print working directory",
        "description": "Print current working directory path",
        "examples": [
            "pwd  # Show full path of current directory",
            "pwd | pbcopy  # Get current path for use in scripts or commands (macOS)",
            "CURRENT_DIR=$(pwd)  # Store current directory in variable for later use",
            "PROJECT_ROOT=$(pwd) && echo \"Project: $(basename $PROJECT_ROOT)\" && echo \"Path: $PROJECT_ROOT\" && echo \"Files: $(find . -type f | wc -l)\" && echo \"Size: $(du -sh . | cut -f1)\" && git rev-parse --git-dir >/dev/null 2>&1 && echo \"Git: $(git branch --show-current) ($(git rev-parse --short HEAD))\" || echo \"Git: Not a git repository\" && echo \"Environment: $(echo $PATH | tr ':' '\\n' | wc -l) PATH entries\" | tee project-context-$(date +%Y%m%d-%H%M%S).log && echo \"Enterprise project context captured: directory structure, git status, environment details documented for development workflow\"  # Enterprise project context analysis with comprehensive directory information, git status, file statistics, and environment documentation"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "file-operations",
        "safety": "safe",
        "syntaxPattern": "pwd",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Navigate and confirm location",
                "commands": "cd /some/path && pwd",
                "explanation": "Change directory and verify you're in the right place",
                "title": "cd && pwd"
            },
            {
                "scenario": "Create file with current path in name",
                "commands": "touch \"backup-$(pwd | sed 's/\\//-/g').txt\"",
                "explanation": "Generate filename incorporating current directory path",
                "title": "touch | sed"
            }
        ],
        "relatedCommands": [
            {
                "name": "cd",
                "relationship": "combo",
                "reason": "Often used together to navigate and confirm location"
            },
            {
                "name": "ls",
                "relationship": "combo",
                "reason": "Check location then see what's in current directory"
            }
        ],
        "warnings": [
            "pwd shows absolute path, not relative",
            "Symbolic links may show different paths with -P option"
        ],
        "manPageUrl": "https://man7.org/linux/man-pages/man1/pwd.1.html",
        "distroNotes": {}
    },
    {
        "name": "readlink",
        "standsFor": "read link",
        "description": "Display symbolic link target",
        "examples": [
            "readlink symlink  # Display what symbolic link points to",
            "readlink -f symlink  # Resolve all symbolic links to get final target",
            "readlink -f /path/../file.txt  # Resolve .. and . components to absolute path",
            "readlink file.txt && echo 'Is a link' || echo 'Not a link'  # Test if file is a symbolic link",
            "find /usr/local/bin -type l | while read link; do target=$(readlink -f \"$link\"); if [ ! -e \"$target\" ]; then echo \"BROKEN: $link -> $target\"; else echo \"OK: $link -> $target\"; fi; done | tee symlink-audit-$(date +%Y%m%d-%H%M%S).log && echo \"Enterprise symlink integrity audit: $(grep -c BROKEN symlink-audit-$(date +%Y%m%d-%H%M%S).log) broken links identified, $(grep -c OK symlink-audit-$(date +%Y%m%d-%H%M%S).log) valid links verified\"  # Enterprise symbolic link integrity verification with comprehensive audit trail, broken link detection, and system maintenance reporting"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "file-operations",
        "safety": "safe",
        "syntaxPattern": "readlink [options] <link>",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Find broken symbolic links",
                "commands": "find . -type l -exec readlink -f {} \\; -exec test -e {} \\; -print",
                "explanation": "Find symbolic links and check if targets exist",
                "title": "find ; ;"
            },
            {
                "scenario": "Get real location of script",
                "commands": "SCRIPT_DIR=$(dirname $(readlink -f $0))",
                "explanation": "Get directory containing script even if called via symlink",
                "title": "SCRIPT_DIR"
            }
        ],
        "relatedCommands": [
            {
                "name": "ls",
                "relationship": "combo",
                "reason": "ls -la shows link targets but readlink gives more detail"
            },
            {
                "name": "ln",
                "relationship": "opposite",
                "reason": "ln creates links, readlink reads them"
            }
        ],
        "warnings": [
            "readlink only works on symbolic links, not hard links",
            "May fail if intermediate directories don't exist",
            "Different options available between GNU and BSD versions"
        ],
        "manPageUrl": "https://man7.org/linux/man-pages/man1/readlink.1.html",
        "distroNotes": {
            "windows": "Available in WSL"
        }
    },
    {
        "name": "rm",
        "standsFor": "remove",
        "description": "Remove files and directories permanently",
        "examples": [
            "rm *.log  # Remove all log files in current directory",
            "rm -rf folder/  # Force delete directory recursively (cannot be undone)",
            "rm -i important_*  # Prompt before deleting each file matching pattern",
            "rm -f *.tmp *.cache  # Force delete temporary files without confirmation",
            "rm -f broken_link  # Delete symlink even if target doesn't exist",
            "find /tmp -type f -mtime +7 -name \"*.tmp\" -o -name \"*.cache\" | tee cleanup-candidates-$(date +%Y%m%d-%H%M%S).log && echo \"Found $(wc -l < cleanup-candidates-$(date +%Y%m%d-%H%M%S).log) files for cleanup ($(du -sh /tmp | cut -f1) total)\" && read -p \"Proceed with cleanup? (y/N) \" confirm && [[ $confirm == [yY] ]] && xargs rm -f < cleanup-candidates-$(date +%Y%m%d-%H%M%S).log && echo \"Enterprise cleanup completed: temporary files removed, disk space reclaimed\"  # Enterprise safe cleanup workflow with confirmation, logging, space analysis, and user approval for temporary file removal"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "file-operations",
        "safety": "dangerous",
        "syntaxPattern": "rm [options] <file>...",
        "prerequisites": [
            "destructive"
        ],
        "commandCombinations": [
            {
                "scenario": "Find and delete old files by date",
                "commands": "find . -mtime +30 -name '*.log' | xargs rm",
                "explanation": "Chain find with rm to delete log files older than 30 days",
                "title": "find | xargs"
            },
            {
                "scenario": "Safe cleanup with confirmation",
                "commands": "find . -name '*.tmp' -print | head -10 && read -p 'Delete these? ' && find . -name '*.tmp' -delete",
                "explanation": "Preview files to delete, ask for confirmation, then remove",
                "title": "find | head && read && find"
            }
        ],
        "relatedCommands": [
            {
                "name": "mv",
                "relationship": "similar",
                "reason": "Use 'mv file /tmp' as safer alternative for temporary removal"
            }
        ],
        "warnings": [
            "rm is permanent - no undo or trash recovery",
            "rm -rf can destroy entire system if used incorrectly",
            "Always double-check paths, especially with wildcards"
        ],
        "manPageUrl": "https://ss64.com/osx/rm.html",
        "distroNotes": {
            "alpine": "Uses BusyBox rm by default - limited options",
            "windows": "Available in WSL and Git Bash only"
        }
    },
    {
        "name": "stat",
        "standsFor": "status/statistics",
        "description": "Display detailed file system information",
        "examples": [
            "stat file.txt  # Display size, permissions, timestamps, and inode info",
            "stat -f .  # Display filesystem statistics for current directory",
            "stat -c '%n %s %y' *.txt  # Show filename, size, and modification time",
            "stat -L symlink  # Show information about link target, not the link itself",
            "stat -t file.txt  # Terse format suitable for parsing by scripts"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "file-operations",
        "safety": "safe",
        "syntaxPattern": "stat [options] <file>...",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Compare file timestamps",
                "commands": "stat -c '%Y' file1.txt file2.txt | sort -n",
                "explanation": "Compare modification timestamps of files",
                "title": "stat | sort"
            },
            {
                "scenario": "Find files by inode",
                "commands": "INODE=$(stat -c %i file.txt) && find . -inum $INODE",
                "explanation": "Find all hard links to a file using its inode",
                "title": "INODE && find"
            }
        ],
        "relatedCommands": [
            {
                "name": "ls",
                "relationship": "similar",
                "reason": "ls shows basic file info, stat shows detailed info"
            },
            {
                "name": "file",
                "relationship": "combo",
                "reason": "file shows type, stat shows metadata"
            },
            {
                "name": "find",
                "relationship": "combo",
                "reason": "Use stat info for find criteria"
            }
        ],
        "warnings": [
            "Format options differ between GNU and BSD stat",
            "Timestamps shown in different formats on different systems",
            "Some information requires elevated privileges"
        ],
        "manPageUrl": "https://man7.org/linux/man-pages/man1/stat.1.html",
        "distroNotes": {
            "macos": "BSD stat - different options than GNU stat",
            "windows": "Available in WSL"
        }
    },
    {
        "name": "tar",
        "standsFor": "tape archive",
        "description": "Archive and compress files and directories",
        "examples": [
            "tar -czf backup.tar.gz project/  # Create gzip-compressed archive of directory",
            "tar -xzf backup.tar.gz  # Extract gzip-compressed archive to current directory",
            "tar -tzf backup.tar.gz  # Show files in archive without extracting",
            "tar -xzf archive.tar.gz -C /opt/  # Extract archive to specified directory",
            "tar -czf backup.tar.gz --exclude='*.log' project/  # Archive directory but skip log files",
            "tar -rf existing.tar newfile.txt  # Append file to existing uncompressed archive"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "file-operations",
        "safety": "safe",
        "syntaxPattern": "tar [options] <archive> [files...]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Backup with date in filename",
                "commands": "tar -czf backup-$(date +%Y%m%d).tar.gz ~/important/",
                "explanation": "Create dated backup archive",
                "title": "tar"
            },
            {
                "scenario": "Extract and show progress",
                "commands": "tar -xzf large-archive.tar.gz --verbose",
                "explanation": "Extract archive with detailed progress output",
                "title": "tar"
            }
        ],
        "relatedCommands": [
            {
                "name": "zip",
                "relationship": "alternative",
                "reason": "More common on Windows, better cross-platform compatibility"
            },
            {
                "name": "gzip",
                "relationship": "combo",
                "reason": "tar often uses gzip for compression"
            },
            {
                "name": "find",
                "relationship": "combo",
                "reason": "Find files to include in archives"
            }
        ],
        "warnings": [
            "Order of options matters: -czf not -fcz",
            "Archives don't preserve absolute paths by default",
            "Be careful with -P flag (preserves absolute paths)"
        ],
        "manPageUrl": "https://man7.org/linux/man-pages/man1/tar.1.html",
        "distroNotes": {
            "windows": "Available in WSL or Git Bash"
        }
    },
    {
        "name": "touch",
        "standsFor": "touch",
        "description": "Create empty files or update file timestamps",
        "examples": [
            "touch newfile.txt  # Create empty file or update timestamp if exists",
            "touch file1.txt file2.txt file3.txt  # Create several empty files at once",
            "touch existing-file.txt  # Update access and modification timestamps to current time",
            "touch -t 202312251200 file.txt  # Set timestamp to specific date/time (YYYYMMDDhhmm)",
            "touch -r reference.txt target.txt  # Set target file timestamp to match reference file"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "file-operations",
        "safety": "safe",
        "syntaxPattern": "touch [options] <file>...",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Create files with sequence",
                "commands": "touch file{1..10}.txt",
                "explanation": "Create numbered files file1.txt through file10.txt",
                "title": "touch"
            },
            {
                "scenario": "Create and immediately edit",
                "commands": "touch script.sh && chmod +x script.sh && vim script.sh",
                "explanation": "Create file, make executable, and edit",
                "title": "touch && chmod && vim"
            }
        ],
        "relatedCommands": [
            {
                "name": "mkdir",
                "relationship": "similar",
                "reason": "Creates directories while touch creates files"
            },
            {
                "name": "ls",
                "relationship": "combo",
                "reason": "Check if files were created with touch"
            },
            {
                "name": "stat",
                "relationship": "combo",
                "reason": "View detailed file timestamps after touching"
            }
        ],
        "warnings": [
            "touch creates files even if parent directory doesn't exist may fail",
            "Touching read-only files may fail without proper permissions",
            "Timestamp format varies between systems"
        ],
        "manPageUrl": "https://man7.org/linux/man-pages/man1/touch.1.html",
        "distroNotes": {
            "windows": "Available in WSL or Git Bash"
        }
    },
    {
        "name": "tree",
        "standsFor": "tree",
        "description": "Display directory structure in tree format",
        "examples": [
            "tree  # Display tree view of current directory and subdirectories",
            "tree -L 2  # Show only 2 levels deep in directory tree",
            "tree -a  # Include hidden files and directories in tree output",
            "tree -d  # Display directory structure without files",
            "tree -h  # Display file sizes in human-readable format",
            "tree -o structure.txt  # Save directory tree to text file"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "file-operations",
        "safety": "safe",
        "syntaxPattern": "tree [options] [directory]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Project documentation",
                "commands": "tree -I 'node_modules|.git' -o project_structure.md",
                "explanation": "Generate project structure excluding common directories",
                "title": "tree |"
            },
            {
                "scenario": "Find large directory hierarchies",
                "commands": "tree -d -L 3 / | grep -E '^.{50,}'",
                "explanation": "Show deep directory paths longer than 50 characters",
                "title": "tree | grep"
            }
        ],
        "relatedCommands": [
            {
                "name": "ls",
                "relationship": "alternative",
                "reason": "ls -R shows recursive listing, tree shows hierarchical view"
            },
            {
                "name": "find",
                "relationship": "similar",
                "reason": "find can show directory structure but tree is more visual"
            },
            {
                "name": "du",
                "relationship": "combo",
                "reason": "Combine tree structure with du for size information"
            }
        ],
        "warnings": [
            "Can produce very long output on deep directory structures",
            "May not be installed by default on all systems",
            "Pattern matching options vary between versions"
        ],
        "manPageUrl": "",
        "distroNotes": {
            "linux": "Usually available in package repositories",
            "macos": "Install via Homebrew: brew install tree",
            "windows": "Available in some Git installations or WSL"
        }
    },
    {
        "name": "zip",
        "standsFor": "zip",
        "description": "Create and manipulate ZIP archives",
        "examples": [
            "zip -r project.zip project/  # Create ZIP file containing entire directory",
            "zip archive.zip newfile.txt  # Add single file to existing ZIP archive",
            "zip -e secure.zip sensitive-data.txt  # Create encrypted ZIP file with password prompt",
            "zip -r backup.zip project/ -x '*.log' '*.tmp'  # Archive directory while excluding log and temporary files",
            "unzip archive.zip  # Extract all files from ZIP archive to current directory",
            "unzip -l archive.zip  # Show files in ZIP archive without extracting"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "file-operations",
        "safety": "safe",
        "syntaxPattern": "zip [options] <archive.zip> [files...]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Backup and email archive",
                "commands": "zip -r backup-$(date +%Y%m%d).zip ~/documents && echo 'Backup complete' | mail -s 'Daily Backup' -A backup-*.zip admin@company.com",
                "explanation": "Create dated backup and email as attachment",
                "title": "zip && echo | mail"
            },
            {
                "scenario": "Selective extraction",
                "commands": "unzip -l archive.zip | grep '.pdf' && unzip archive.zip '*.pdf'",
                "explanation": "List PDF files in archive then extract only those",
                "title": "unzip | grep && unzip"
            }
        ],
        "relatedCommands": [
            {
                "name": "tar",
                "relationship": "alternative",
                "reason": "Better compression and more features, standard on Unix"
            },
            {
                "name": "7z",
                "relationship": "alternative",
                "reason": "Better compression ratios, more archive formats"
            },
            {
                "name": "gzip",
                "relationship": "similar",
                "reason": "Single file compression vs multi-file archives"
            }
        ],
        "warnings": [
            "ZIP doesn't preserve Unix permissions by default",
            "Windows and Unix line endings can cause issues",
            "Large files may hit ZIP format limitations"
        ],
        "manPageUrl": "https://ss64.com/osx/zip.html",
        "distroNotes": {}
    },
    {
        "name": "zoxide",
        "standsFor": "zoxide",
        "description": "Smart cd command that learns your habits",
        "examples": [
            "z project  # Jump to most frequent/recent directory matching 'project'",
            "zi  # Open interactive menu to select from directory history",
            "zoxide add /path/to/dir  # Manually add directory to zoxide database",
            "zoxide remove /path/to/dir  # Remove directory from zoxide tracking",
            "zoxide query --list  # Show all tracked directories with their scores"
        ],
        "platform": [
            "linux",
            "macos",
            "windows"
        ],
        "category": "file-operations",
        "safety": "safe",
        "syntaxPattern": "z [query]",
        "prerequisites": [
            "intermediate"
        ],
        "commandCombinations": [
            {
                "scenario": "Setup zoxide in shell",
                "commands": "eval \"$(zoxide init bash)\"",
                "explanation": "Initialize zoxide for current shell session",
                "title": "eval"
            },
            {
                "scenario": "Backup directory database",
                "commands": "zoxide query --list > ~/.zoxide_backup",
                "explanation": "Export directory list for backup",
                "title": "zoxide >"
            }
        ],
        "relatedCommands": [
            {
                "name": "cd",
                "relationship": "alternative",
                "reason": "Traditional directory change, zoxide is smarter"
            }
        ],
        "warnings": [
            "Needs to be initialized in shell config file",
            "Requires building up usage history before becoming useful",
            "Query matching can be surprising until you learn the algorithm"
        ],
        "manPageUrl": "https://github.com/ajeetdsouza/zoxide",
        "distroNotes": {}
    }
];

export { file_operationsCommands };
export default file_operationsCommands;
