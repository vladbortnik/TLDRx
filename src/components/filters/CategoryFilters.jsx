import React from 'react';
import { CATEGORIES } from '../../utils/ui-icons';

// Add group properties to imported categories for UI grouping
const CATEGORIES_WITH_GROUPS = CATEGORIES.map(category => ({
  ...category,
  group: category.id === 'system' || category.id === 'security' || category.id === 'shell' ? 'system' :
         category.id === 'file-operations' || category.id === 'text-processing' || category.id === 'data-processing' ? 'data' :
         category.id === 'networking' || category.id === 'development' || category.id === 'package-management' ? 'dev' :
         'automation'
}));

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
        {CATEGORIES_WITH_GROUPS.map((category) => {
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