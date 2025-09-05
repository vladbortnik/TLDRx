import { PlatformFilter } from './PlatformFilter.jsx';
import { CategoryFilter } from './CategoryFilter.jsx';

export function FilterBar({ 
  selectedPlatform, 
  selectedCategory, 
  onPlatformChange, 
  onCategoryChange 
}) {
  return (
    <div>
      <PlatformFilter
        selectedPlatform={selectedPlatform}
        onPlatformChange={onPlatformChange}
      />
      <CategoryFilter
        selectedCategory={selectedCategory}
        onCategoryChange={onCategoryChange}
      />
    </div>
  );
}