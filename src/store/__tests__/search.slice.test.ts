import { describe, it, expect } from 'vitest';
import searchReducer, {
  setQuery,
  setEntityType,
  clearResults,
} from '@/store/search.slice';
import type { SearchState } from '@/store/search.slice';

const initialState: SearchState = {
  query: '',
  entityType: 'repositories',
  page: 1,
  cache: {},
  status: 'idle',
  error: null,
};

describe('search slice', () => {
  it('should return the initial state', () => {
    expect(searchReducer(undefined, { type: 'unknown' })).toEqual(
      initialState,
    );
  });

  it('should handle setQuery', () => {
    const state = searchReducer(initialState, setQuery('react'));
    expect(state.query).toBe('react');
  });

  it('should handle setEntityType', () => {
    const state = searchReducer(initialState, setEntityType('users'));
    expect(state.entityType).toBe('users');
  });

  it('should handle clearResults', () => {
    const state = searchReducer(
      { ...initialState, status: 'succeeded', error: 'some error' },
      clearResults(),
    );
    expect(state.status).toBe('idle');
    expect(state.error).toBeNull();
  });

  it('should preserve cache on clearResults', () => {
    const stateWithCache: SearchState = {
      ...initialState,
      cache: {
        'repositories:react:1': {
          entityType: 'repositories',
          totalCount: 100,
          items: [],
          timestamp: Date.now(),
        },
      },
    };
    const state = searchReducer(stateWithCache, clearResults());
    expect(Object.keys(state.cache)).toHaveLength(1);
  });
});
