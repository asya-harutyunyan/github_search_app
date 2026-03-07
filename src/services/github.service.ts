import { repositorySearchResponseSchema } from '@/schemas/repository.schema';
import { userSearchResponseSchema } from '@/schemas/user.schema';
import type {
  EntityType,
  RepositorySearchResponse,
  UserSearchResponse,
} from '@/types';

const BASE_URL = 'https://api.github.com';

type SearchResponse<T extends EntityType> = T extends 'repositories'
  ? RepositorySearchResponse
  : UserSearchResponse;

class GitHubService {
  private static instance: GitHubService;

  static getInstance(): GitHubService {
    if (!GitHubService.instance) {
      GitHubService.instance = new GitHubService();
    }
    return GitHubService.instance;
  }

  async search<T extends EntityType>(
    entityType: T,
    query: string,
    page: number = 1,
  ): Promise<SearchResponse<T>> {
    const endpoint = `${BASE_URL}/search/${entityType}?q=${encodeURIComponent(query)}&per_page=15&page=${page}`;

    const response = await fetch(endpoint, {
      headers: {
        Accept: 'application/vnd.github.v3+json',
      },
    });

    if (!response.ok) {
      throw new Error(
        `GitHub API error: ${response.status} ${response.statusText}`,
      );
    }

    const data: unknown = await response.json();

    if (entityType === 'repositories') {
      return repositorySearchResponseSchema.parse(data) as SearchResponse<T>;
    }

    return userSearchResponseSchema.parse(data) as SearchResponse<T>;
  }
}

export const githubService = GitHubService.getInstance();
