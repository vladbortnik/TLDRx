// Single source of truth for all UI icon definitions
import { FaApple, FaWindows, FaLinux } from 'react-icons/fa';
import {
  Settings,
  Shield,
  Terminal,
  FileText,
  Globe,
  Database,
  Package,
  Brackets,  // unique icon for Development category
  Bot,
  Container,
  Wrench
} from 'lucide-react';

// Platform Configuration
export const PLATFORM_ICONS = {
  linux: FaLinux,
  macos: FaApple,
  windows: FaWindows
};

export const PLATFORM_COLORS = {
  macos: 'rgb(200, 200, 200)',  // Silver/gray
  windows: 'rgb(6, 182, 212)',   // Cyan
  linux: 'rgb(251, 146, 60)'     // Orange
};

// Category Configuration - Single definition
export const CATEGORIES = [
  // System Group (Purple/Violet)
  { id: "system", icon: Settings, color: "from-purple-400 to-violet-600", name: "System" },
  { id: "security", icon: Shield, color: "from-violet-400 to-purple-600", name: "Security" },
  { id: "shell", icon: Terminal, color: "from-indigo-400 to-purple-600", name: "Shell" },

  // File/Data Group (Blue/Cyan)
  { id: "file-operations", icon: FileText, color: "from-blue-400 to-cyan-600", name: "File Operations" },
  { id: "text-processing", icon: Wrench, color: "from-cyan-400 to-blue-600", name: "Text Processing" },
  { id: "data-processing", icon: Database, color: "from-sky-400 to-cyan-600", name: "Data Processing" },

  // Network/Dev Group (Green/Emerald)
  { id: "networking", icon: Globe, color: "from-emerald-400 to-green-600", name: "Networking" },
  { id: "development", icon: Brackets, color: "from-green-400 to-emerald-600", name: "Development" },
  { id: "package-management", icon: Package, color: "from-teal-400 to-emerald-600", name: "Package Management" },

  // Automation Group (Orange/Yellow)
  { id: "containers", icon: Container, color: "from-orange-400 to-amber-600", name: "Containers" },
  { id: "automation", icon: Bot, color: "from-amber-400 to-orange-600", name: "Automation" }
];

// Category abbreviations for space-saving
export const CATEGORY_ABBREVIATIONS = {
  "file-operations": "Files",
  "text-processing": "Text",
  "data-processing": "Data",
  "package-management": "Packages",
  "system": "System",
  "security": "Security",
  "shell": "Shell",
  "networking": "Network",
  "development": "Dev",
  "containers": "Containers",
  "automation": "Automation"
};