import { ChangeEvent, useCallback } from 'react';
import { Input, Select } from '@/components/atoms';
import type { EntityType } from '@/types';
import styles from './index.module.css';

interface SelectOption {
  value: string;
  label: string;
}

const ENTITY_VALUES: ReadonlySet<string> = new Set<string>([
  'repositories',
  'users',
]);

const DEFAULT_OPTIONS: SelectOption[] = [
  { value: 'repositories', label: 'Repositories' },
  { value: 'users', label: 'Users' },
];

function isEntityType(value: string): value is EntityType {
  return ENTITY_VALUES.has(value);
}

interface SearchBarProps {
  query: string;
  entityType: EntityType;
  placeholder?: string;
  options?: SelectOption[];
  onQueryChange: (value: string) => void;
  onEntityTypeChange: (value: EntityType) => void;
}

export function SearchBar({
  query,
  entityType,
  placeholder = 'Search GitHub...',
  options = DEFAULT_OPTIONS,
  onQueryChange,
  onEntityTypeChange,
}: SearchBarProps) {
  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onQueryChange(e.target.value);
    },
    [onQueryChange],
  );

  const handleSelectChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      const value = e.target.value;
      if (isEntityType(value)) {
        onEntityTypeChange(value);
      }
    },
    [onEntityTypeChange],
  );

  return (
    <div data-testid="search-bar" className={styles.searchBar}>
      <Input
        data-testid="search-input"
        value={query}
        onChange={handleInputChange}
        placeholder={placeholder}
        fullWidth
      />
      <Select
        data-testid="search-select"
        options={options}
        value={entityType}
        onChange={handleSelectChange}
      />
    </div>
  );
}
