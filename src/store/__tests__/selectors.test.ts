import { describe, it, expect } from 'vitest';
import {
  selectQuery,
  selectEntityType,
  selectStatus,
  selectError,
  selectCurrentCacheKey,
  selectCurrentResults,
  selectIsLoading,
  selectIsEmpty,
} from '@/store/selectors';
import type { RootState } from '@/store';

function makeState(overrides: Record<string, unknown> = {}): RootState {
  return {
    search: {
      query: '',
      entityType: 'repositories',
      page: 1,
      cache: {},
      status: 'idle',
      error: null,
      ...overrides,
    },
  } as RootState;
}

describe('selectors', () => {
  it('selectQuery', () => {
    expect(selectQuery(makeState({ query: 'react' }))).toBe('react');
  });

  it('selectEntityType', () => {
    expect(selectEntityType(makeState({ entityType: 'users' }))).toBe('users');
  });

  it('selectStatus', () => {
    expect(selectStatus(makeState({ status: 'loading' }))).toBe('loading');
  });

  it('selectError', () => {
    expect(selectError(makeState({ error: 'fail' }))).toBe('fail');
  });

  it('selectCurrentCacheKey builds correct key', () => {
    const state = makeState({ entityType: 'users', query: '  React  ' });
    expect(selectCurrentCacheKey(state)).toBe('users:react:1');
  });

  it('selectCurrentResults returns null when no cache', () => {
    expect(selectCurrentResults(makeState())).toBeNull();
  });

  it('selectCurrentResults returns cached data', () => {
    const cached = {
      entityType: 'repositories',
      totalCount: 5,
      items: [{ id: 1 }],
      timestamp: 123,
    };
    const state = makeState({
      query: 'react',
      entityType: 'repositories',
      cache: { 'repositories:react:1': cached },
    });
    expect(selectCurrentResults(state)).toBe(cached);
  });

  it('selectIsLoading', () => {
    expect(selectIsLoading(makeState({ status: 'loading' }))).toBe(true);
    expect(selectIsLoading(makeState({ status: 'idle' }))).toBe(false);
  });

  it('selectIsEmpty when succeeded with no results', () => {
    expect(selectIsEmpty(makeState({ status: 'succeeded' }))).toBe(true);
  });

  it('selectIsEmpty false when idle', () => {
    expect(selectIsEmpty(makeState({ status: 'idle' }))).toBe(false);
  });

  it('selectIsEmpty false when succeeded with results', () => {
    const state = makeState({
      status: 'succeeded',
      query: 'react',
      entityType: 'repositories',
      cache: {
        'repositories:react:1': {
          entityType: 'repositories',
          totalCount: 1,
          items: [{ id: 1 }],
          timestamp: 123,
        },
      },
    });
    expect(selectIsEmpty(state)).toBe(false);
  });
});
