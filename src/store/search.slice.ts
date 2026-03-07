import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { githubService } from '@/services/github.service';
import type {
  CachedResult,
  EntityType,
  SearchCacheKey,
  SearchStatus,
} from '@/types';
import type { AppState } from './index';

export interface SearchState {
  query: string;
  entityType: EntityType;
  page: number;
  cache: Record<string, CachedResult>;
  status: SearchStatus;
  error: string | null;
}

const initialState: SearchState = {
  query: '',
  entityType: 'repositories',
  page: 1,
  cache: {},
  status: 'idle',
  error: null,
};

function getCacheKey(entityType: EntityType, query: string, page: number): SearchCacheKey {
  return `${entityType}:${query.toLowerCase().trim()}:${page}`;
}

interface SearchPayload {
  cacheKey: SearchCacheKey;
  data: CachedResult;
}

interface SearchArgs {
  entityType: EntityType;
  query: string;
  page: number;
}

interface ThunkConfig {
  state: AppState;
  rejectValue: string;
}

export const searchGitHub = createAsyncThunk<
  SearchPayload,
  SearchArgs,
  ThunkConfig
>(
  'search/searchGitHub',
  async ({ entityType, query, page }, { rejectWithValue }) => {
    try {
      const cacheKey = getCacheKey(entityType, query, page);

      if (entityType === 'repositories') {
        const result = await githubService.search('repositories', query, page);
        const data: CachedResult = {
          entityType: 'repositories',
          totalCount: result.total_count,
          items: result.items,
          timestamp: Date.now(),
        };
        return { cacheKey, data };
      }

      const result = await githubService.search('users', query, page);
      const data: CachedResult = {
        entityType: 'users',
        totalCount: result.total_count,
        items: result.items,
        timestamp: Date.now(),
      };
      return { cacheKey, data };
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Search failed';
      return rejectWithValue(message);
    }
  },
  {
    condition({ entityType, query, page }, { getState }) {
      const state = getState();
      const cacheKey = getCacheKey(entityType, query, page);
      if (state.search.cache[cacheKey]) {
        return false;
      }
      if (state.search.status === 'loading') {
        return false;
      }
      return true;
    },
  },
);

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
      state.page = 1;
    },
    setEntityType(state, action: PayloadAction<EntityType>) {
      state.entityType = action.payload;
      state.page = 1;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    clearResults(state) {
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchGitHub.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(searchGitHub.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cache[action.payload.cacheKey] = action.payload.data;
      })
      .addCase(searchGitHub.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ?? 'Search failed';
      });
  },
});

export const { setQuery, setEntityType, setPage, clearResults } = searchSlice.actions;
export default searchSlice.reducer;
