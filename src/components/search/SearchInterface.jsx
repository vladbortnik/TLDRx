import React from 'react';
import { SearchInput } from './SearchInput.jsx';

export function SearchInterface({
    searchQuery,
    onSearchChange,
    onFilterToggle,
    selectedPlatforms,
    onPlatformChange,
    selectedCategories,
    onCategoryChange,
    showAdvancedFilters,
    onAdvancedFiltersToggle,
    onClearAllFilters,
    totalCommands
}) {
    return (
        <div className="mb-6 transition-all duration-300">
            <div className="flex items-center gap-3">
                <SearchInput
                    value={searchQuery}
                    onChange={onSearchChange}
                    placeholder="query"
                    onFilterToggle={onFilterToggle}
                    selectedPlatforms={selectedPlatforms}
                    onPlatformChange={onPlatformChange}
                    selectedCategories={selectedCategories}
                    onCategoryChange={onCategoryChange}
                    showAdvancedFilters={showAdvancedFilters}
                    onAdvancedFiltersToggle={onAdvancedFiltersToggle}
                    onClearAllFilters={onClearAllFilters}
                    totalCommands={totalCommands}
                />
            </div>
        </div>
    );
}
