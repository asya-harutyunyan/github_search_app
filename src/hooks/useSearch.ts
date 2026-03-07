import { useCallback, useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  setQuery,
  setEntityType,
  setPage,
  clearResults,
  searchGitHub,
} from '@/store/search.slice';
import {
  selectQuery,
  selectEntityType,
  selectPage,
  selectStatus,
  selectError,
  selectCurrentResults,
  selectIsLoading,
  selectIsEmpty,
  selectTotalPages,
} from '@/store/selectors';
import { useDebounce } from './useDebounce';
import type { CachedResult, EntityType, SearchStatus } from '@/types';

interface UseSearchReturn {
  query: string;
  entityType: EntityType;
  page: number;
  totalPages: number;
  status: SearchStatus;
  error: string | null;
  results: CachedResult | null;
  isLoading: boolean;
  isEmpty: boolean;
  handleQueryChange: (value: string) => void;
  handleEntityTypeChange: (value: EntityType) => void;
  handlePageChange: (page: number) => void;
}

export function useSearch(): UseSearchReturn {
  const dispatch = useAppDispatch();
  const query = useAppSelector(selectQuery);
  const entityType = useAppSelector(selectEntityType);
  const page = useAppSelector(selectPage);
  const totalPages = useAppSelector(selectTotalPages);
  const status = useAppSelector(selectStatus);
  const error = useAppSelector(selectError);
  const results = useAppSelector(selectCurrentResults);
  const isLoading = useAppSelector(selectIsLoading);
  const isEmpty = useAppSelector(selectIsEmpty);

  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    const trimmed = debouncedQuery.trim();
    if (trimmed.length >= 3) {
      dispatch(searchGitHub({ entityType, query: trimmed, page }));
    } else {
      dispatch(clearResults());
    }
  }, [debouncedQuery, entityType, page, dispatch]);

  const handleQueryChange = useCallback(
    (value: string) => {
      dispatch(setQuery(value));
    },
    [dispatch],
  );

  const handleEntityTypeChange = useCallback(
    (value: EntityType) => {
      dispatch(setEntityType(value));
    },
    [dispatch],
  );

  const handlePageChange = useCallback(
    (newPage: number) => {
      dispatch(setPage(newPage));
    },
    [dispatch],
  );

  return useMemo(
    () => ({
      query,
      entityType,
      page,
      totalPages,
      status,
      error,
      results,
      isLoading,
      isEmpty,
      handleQueryChange,
      handleEntityTypeChange,
      handlePageChange,
    }),
    [
      query,
      entityType,
      page,
      totalPages,
      status,
      error,
      results,
      isLoading,
      isEmpty,
      handleQueryChange,
      handleEntityTypeChange,
      handlePageChange,
    ],
  );
}
