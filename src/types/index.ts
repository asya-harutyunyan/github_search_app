import { z } from 'zod';
import {
  ownerSchema,
  repositorySchema,
  repositorySearchResponseSchema,
} from '@/schemas/repository.schema';
import { userSchema, userSearchResponseSchema } from '@/schemas/user.schema';

export type Owner = z.infer<typeof ownerSchema>;
export type Repository = z.infer<typeof repositorySchema>;
export type RepositorySearchResponse = z.infer<
  typeof repositorySearchResponseSchema
>;

export type User = z.infer<typeof userSchema>;
export type UserSearchResponse = z.infer<typeof userSearchResponseSchema>;

export type EntityType = 'repositories' | 'users';

export type SearchStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

export type CachedResult =
  | {
      entityType: 'repositories';
      totalCount: number;
      items: Repository[];
      timestamp: number;
    }
  | {
      entityType: 'users';
      totalCount: number;
      items: User[];
      timestamp: number;
    };

export type SearchCacheKey = `${EntityType}:${string}:${number}`;
