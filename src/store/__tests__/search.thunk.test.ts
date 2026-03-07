import { describe, it, expect, vi, beforeEach } from 'vitest';
import { configureStore, ThunkDispatch, UnknownAction } from '@reduxjs/toolkit';
import searchReducer, { searchGitHub } from '@/store/search.slice';
import type { SearchState } from '@/store/search.slice';
import { githubService } from '@/services/github.service';

function makeStore(preloadedSearch: Partial<SearchState> = {}) {
  return configureStore({
    reducer: { search: searchReducer },
    preloadedState: {
      search: {
        query: '',
        entityType: 'repositories' as const,
        page: 1,
        cache: {},
        status: 'idle' as const,
        error: null,
        ...preloadedSearch,
      },
    },
  });
}

type TestState = ReturnType<ReturnType<typeof makeStore>['getState']>;
type TestDispatch = ThunkDispatch<TestState, unknown, UnknownAction>;

describe('searchGitHub thunk', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('should fetch and cache results on success', async () => {
    vi.spyOn(githubService, 'search').mockResolvedValueOnce({
      total_count: 1,
      incomplete_results: false,
      items: [
        {
          id: 1,
          name: 'react',
          full_name: 'facebook/react',
          owner: {
            login: 'facebook',
            avatar_url: 'https://example.com/avatar.png',
            html_url: 'https://github.com/facebook',
          },
          html_url: 'https://github.com/facebook/react',
          description: 'A lib',
          language: 'JavaScript',
          stargazers_count: 100,
          forks_count: 50,
          open_issues_count: 10,
          updated_at: '2024-01-01T00:00:00Z',
        },
      ],
    });

    const store = makeStore();
    const dispatch = store.dispatch as TestDispatch;
    await dispatch(
      searchGitHub({ entityType: 'repositories', query: 'react', page: 1 }),
    );

    const state = store.getState().search;
    expect(state.status).toBe('succeeded');
    expect(state.cache['repositories:react:1']).toBeDefined();
    expect(state.cache['repositories:react:1']?.totalCount).toBe(1);
  });

  it('should set error on failure', async () => {
    vi.spyOn(githubService, 'search').mockRejectedValueOnce(
      new Error('API down'),
    );

    const store = makeStore();
    const dispatch = store.dispatch as TestDispatch;
    await dispatch(
      searchGitHub({ entityType: 'repositories', query: 'fail', page: 1 }),
    );

    const state = store.getState().search;
    expect(state.status).toBe('failed');
    expect(state.error).toBe('API down');
  });

  it('should not fetch when result is cached', async () => {
    const spy = vi.spyOn(githubService, 'search');
    const store = makeStore({
      cache: {
        'repositories:react:1': {
          entityType: 'repositories',
          totalCount: 1,
          items: [],
          timestamp: Date.now(),
        },
      },
    });

    const dispatch = store.dispatch as TestDispatch;
    await dispatch(
      searchGitHub({ entityType: 'repositories', query: 'react', page: 1 }),
    );

    expect(spy).not.toHaveBeenCalled();
  });

  it('should not fetch when already loading', async () => {
    const spy = vi.spyOn(githubService, 'search');
    const store = makeStore({ status: 'loading' });

    const dispatch = store.dispatch as TestDispatch;
    await dispatch(
      searchGitHub({ entityType: 'repositories', query: 'react', page: 1 }),
    );

    expect(spy).not.toHaveBeenCalled();
  });

  it('should handle non-Error rejection', async () => {
    vi.spyOn(githubService, 'search').mockRejectedValueOnce('string error');

    const store = makeStore();
    const dispatch = store.dispatch as TestDispatch;
    await dispatch(
      searchGitHub({ entityType: 'users', query: 'fail', page: 1 }),
    );

    const state = store.getState().search;
    expect(state.status).toBe('failed');
    expect(state.error).toBe('Search failed');
  });
});
