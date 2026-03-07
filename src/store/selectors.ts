import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from './index';

const selectSearchState = (state: RootState) => state.search;

export const selectQuery = (state: RootState) => state.search.query;
export const selectEntityType = (state: RootState) => state.search.entityType;
export const selectPage = (state: RootState) => state.search.page;
export const selectStatus = (state: RootState) => state.search.status;
export const selectError = (state: RootState) => state.search.error;

export const selectCurrentCacheKey = createSelector(
  [selectEntityType, selectQuery, selectPage],
  (entityType, query, page) => `${entityType}:${query.toLowerCase().trim()}:${page}`,
);

export const selectCurrentResults = createSelector(
  [selectSearchState, selectCurrentCacheKey],
  (search, cacheKey) => search.cache[cacheKey] ?? null,
);

export const selectIsLoading = (state: RootState) =>
  state.search.status === 'loading';

export const selectIsEmpty = createSelector(
  [selectCurrentResults, selectStatus],
  (results, status) =>
    status === 'succeeded' && (results === null || results.items.length === 0),
);

export const selectTotalPages = createSelector(
  [selectCurrentResults],
  (results) => {
    if (!results) return 0;
    const maxResults = Math.min(results.totalCount, 1000);
    return Math.ceil(maxResults / 15);
  },
);
