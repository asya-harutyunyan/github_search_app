import { Text } from '@/components/atoms';
import { RepoCard } from '@/components/organisms/RepoCard';
import { UserCard } from '@/components/organisms/UserCard';
import { formatNumber } from '@/utils/format';
import type { CachedResult } from '@/types';
import styles from './index.module.css';

interface ResultsGridProps {
  results: CachedResult;
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function ResultsGrid({ results, page, totalPages, onPageChange }: ResultsGridProps) {
  return (
    <section data-testid="results-grid" className={styles.container}>
      <Text
        data-testid="results-count"
        as="p"
        size="sm"
        variant="secondary"
        className={styles.count}
      >
        {formatNumber(results.totalCount)} results
      </Text>
      <div className={styles.grid}>
        {results.entityType === 'repositories'
          ? results.items.map((repo) => (
              <RepoCard key={repo.id} repo={repo} />
            ))
          : results.items.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
      </div>
      {totalPages > 1 && (
        <div data-testid="pagination" className={styles.pagination}>
          <button
            className={styles.pageButton}
            onClick={() => onPageChange(page - 1)}
            disabled={page <= 1}
          >
            Previous
          </button>
          <Text as="span" size="sm" variant="secondary">
            Page {page} of {formatNumber(totalPages)}
          </Text>
          <button
            className={styles.pageButton}
            onClick={() => onPageChange(page + 1)}
            disabled={page >= totalPages}
          >
            Next
          </button>
        </div>
      )}
    </section>
  );
}
