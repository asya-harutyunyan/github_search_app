import { SearchHeader, ResultsGrid } from '@/components/organisms';
import { Spinner, Text } from '@/components/atoms';
import type { CachedResult, EntityType, SearchStatus } from '@/types';
import styles from './index.module.css';

interface SearchLayoutProps {
  query: string;
  entityType: EntityType;
  page: number;
  totalPages: number;
  status: SearchStatus;
  error: string | null;
  results: CachedResult | null;
  isEmpty: boolean;
  onQueryChange: (value: string) => void;
  onEntityTypeChange: (value: EntityType) => void;
  onPageChange: (page: number) => void;
}

export function SearchLayout({
  query,
  entityType,
  page,
  totalPages,
  status,
  error,
  results,
  isEmpty,
  onQueryChange,
  onEntityTypeChange,
  onPageChange,
}: SearchLayoutProps) {
  const hasResults = results !== null && results.items.length > 0;

  return (
    <div data-testid="search-layout" className={styles.layout}>
      <SearchHeader
        query={query}
        entityType={entityType}
        hasResults={hasResults}
        onQueryChange={onQueryChange}
        onEntityTypeChange={onEntityTypeChange}
      />

      <main data-testid="search-content" className={styles.content}>
        {status === 'loading' && (
          <div data-testid="loading-state" className={styles.center}>
            <Spinner />
          </div>
        )}

        {error && (
          <div data-testid="error-state" className={styles.center}>
            <Text variant="secondary">{error}</Text>
          </div>
        )}

        {isEmpty && (
          <div data-testid="empty-state" className={styles.center}>
            <Text variant="secondary">No results found</Text>
          </div>
        )}

        {hasResults && (
          <ResultsGrid
            results={results}
            page={page}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        )}
      </main>
    </div>
  );
}
