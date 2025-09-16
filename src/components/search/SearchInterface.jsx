import React from 'react';
import { SearchInput } from './SearchInput.jsx';

export function SearchInterface({ searchQuery, onSearchChange, onFilterToggle, isSticky = false }) {
    return (
        <div className={`transition-all duration-300 ${isSticky ? 'mb-2' : 'mb-6'}`}>
            <div className="flex items-center gap-3">
                <SearchInput
                    value={searchQuery}
                    onChange={onSearchChange}
                    placeholder="query"
                    onFilterToggle={onFilterToggle}
                    isSticky={isSticky}
                />
            </div>
        </div>
    );
}
