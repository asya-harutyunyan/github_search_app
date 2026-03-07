import { SearchBar } from '@/components/molecules';
import type { EntityType } from '@/types';
import styles from './index.module.css';

interface SearchHeaderProps {
  query: string;
  entityType: EntityType;
  hasResults: boolean;
  onQueryChange: (value: string) => void;
  onEntityTypeChange: (value: EntityType) => void;
}

export function SearchHeader({
  query,
  entityType,
  hasResults,
  onQueryChange,
  onEntityTypeChange,
}: SearchHeaderProps) {
  return (
    <header
      data-testid="search-header"
      className={`${styles.header} ${hasResults ? styles.top : styles.centered}`}
    >
      <SearchBar
        query={query}
        entityType={entityType}
        onQueryChange={onQueryChange}
        onEntityTypeChange={onEntityTypeChange}
      />
    </header>
  );
}
