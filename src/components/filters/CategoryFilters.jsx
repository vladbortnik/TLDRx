import React from 'react';
import {
  FileText,
  Wrench,
  Settings,
  Globe,
  Code,
  Package,
  Shield,
  Container,
  Bot,
  Database
} from 'lucide-react';

const CATEGORIES = [
  // System Group (Purple/Violet)
  { id: "system", icon: Settings, color: "from-purple-400 to-violet-600", group: "system", name: "System" },
  { id: "security", icon: Shield, color: "from-violet-400 to-purple-600", group: "system", name: "Security" },
  { id: "shell", icon: Code, color: "from-indigo-400 to-purple-600", group: "system", name: "Shell" },

  // File/Data Group (Blue/Cyan)
  { id: "file-operations", icon: FileText, color: "from-blue-400 to-cyan-600", group: "data", name: "File Operations" },
  { id: "text-processing", icon: Wrench, color: "from-cyan-400 to-blue-600", group: "data", name: "Text Processing" },
  { id: "data-processing", icon: Database, color: "from-sky-400 to-cyan-600", group: "data", name: "Data Processing" },

  // Network/Dev Group (Green/Emerald)
  { id: "networking", icon: Globe, color: "from-emerald-400 to-green-600", group: "dev", name: "Networking" },
  { id: "development", icon: Code, color: "from-green-400 to-emerald-600", group: "dev", name: "Development" },
  { id: "package-management", icon: Package, color: "from-teal-400 to-emerald-600", group: "dev", name: "Package Management" },

  // Automation Group (Orange/Yellow)
  { id: "containers", icon: Container, color: "from-orange-400 to-amber-600", group: "automation", name: "Containers" },
  { id: "automation", icon: Bot, color: "from-amber-400 to-orange-600", group: "automation", name: "Automation" }
];

export function CategoryFilters({
  selectedCategories = [],
  onCategoryChange
}) {
  const handleCategoryToggle = (categoryId) => {
    if (selectedCategories.includes(categoryId)) {
      onCategoryChange(selectedCategories.filter(c => c !== categoryId));
    } else {
      onCategoryChange([...selectedCategories, categoryId]);
    }
  };

  return (
    <div className="mt-3 animate-in slide-in-from-top duration-300">
      <div className="flex flex-wrap gap-2 justify-center">
        {CATEGORIES.map((category) => {
          const isSelected = selectedCategories.includes(category.id);
          const IconComponent = category.icon;

          return (
            <button
              key={category.id}
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                handleCategoryToggle(category.id);
              }}
              className={`
                flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium
                transition-all duration-300 pointer-events-auto
                transform hover:scale-105 active:scale-95
                border border-white/20
                ${isSelected
                  ? `bg-gradient-to-r ${category.color} text-white shadow-lg border-white/40`
                  : `bg-white/5 text-white/80 hover:bg-gradient-to-r hover:${category.color} hover:text-white hover:border-white/30 hover:opacity-60`
                }
              `}
              style={{
                boxShadow: isSelected
                  ? `0 0 20px rgba(${category.group === 'system' ? '139, 92, 246' :
                      category.group === 'data' ? '59, 130, 246' :
                      category.group === 'dev' ? '16, 185, 129' : '251, 146, 60'}, 0.4)`
                  : 'none'
              }}
            >
              <IconComponent className="w-4 h-4" />
              {category.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}