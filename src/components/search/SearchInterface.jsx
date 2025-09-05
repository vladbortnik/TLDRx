import { SearchInput } from './SearchInput.jsx';
import { TLDRLogo } from '../ui/TLDRLogo.jsx';

export function SearchInterface({ searchQuery, onSearchChange }) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-3">
        <SearchInput
          value={searchQuery}
          onChange={onSearchChange}
        />
        <TLDRLogo />
      </div>
    </div>
  );
}