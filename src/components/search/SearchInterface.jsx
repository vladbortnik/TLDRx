/**
 * @fileoverview Full search interface component with filters
 * Primary search UI shown at top of page before scrolling
 */

import React, { forwardRef } from 'react';
import { SearchInput } from './SearchInput.jsx';

/**
 * SearchInterface Component
 * Full-featured search interface with integrated platform/category filters
 *
 * @component
 * @param {Object} props - Component props
 * @param {string} props.searchQuery - Current search query
 * @param {Function} props.onSearchChange - Search input change handler
 * @param {Function} props.onFilterToggle - Filter toggle handler
 * @param {Array<string>} props.selectedPlatforms - Selected platform filters
 * @param {Function} props.onPlatformChange - Platform selection handler
 * @param {Array<string>} props.selectedCategories - Selected category filters
 * @param {Function} props.onCategoryChange - Category selection handler
 * @param {boolean} props.showAdvancedFilters - Advanced filters visibility
 * @param {Function} props.onAdvancedFiltersToggle - Advanced filters toggle
 * @param {Function} props.onClearAllFilters - Clear all filters handler
 * @param {number} props.totalCommands - Total commands count
 * @param {Function} props.onSearchSubmit - Search submit handler
 * @param {React.Ref} ref - Forward ref for focus management
 * @returns {JSX.Element} Full search interface
 */
export const SearchInterface = forwardRef(function SearchInterface({
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
    totalCommands,
    onSearchSubmit
}, ref) {
    return (
        <div className="mb-6 transition-all duration-300">
            <div className="flex items-center gap-3">
                <SearchInput
                    ref={ref}
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
                    onSearchSubmit={onSearchSubmit}
                />
            </div>
        </div>
    );
});
