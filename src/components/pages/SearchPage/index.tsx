import { useSearch } from '@/hooks/useSearch';
import { SearchLayout } from '@/components/templates';

export function SearchPage() {
  const {
    query,
    entityType,
    page,
    totalPages,
    status,
    error,
    results,
    isEmpty,
    handleQueryChange,
    handleEntityTypeChange,
    handlePageChange,
  } = useSearch();

  return (
    <SearchLayout
      query={query}
      entityType={entityType}
      page={page}
      totalPages={totalPages}
      status={status}
      error={error}
      results={results}
      isEmpty={isEmpty}
      onQueryChange={handleQueryChange}
      onEntityTypeChange={handleEntityTypeChange}
      onPageChange={handlePageChange}
    />
  );
}
