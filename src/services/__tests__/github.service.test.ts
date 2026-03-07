import { describe, it, expect, vi, beforeEach } from 'vitest';
import { githubService } from '@/services/github.service';

const mockRepoResponse = {
  total_count: 1,
  incomplete_results: false,
  items: [
    {
      id: 1,
      name: 'react',
      full_name: 'facebook/react',
      owner: {
        login: 'facebook',
        avatar_url: 'https://avatars.githubusercontent.com/u/69631?v=4',
        html_url: 'https://github.com/facebook',
      },
      html_url: 'https://github.com/facebook/react',
      description: 'A JavaScript library',
      language: 'JavaScript',
      stargazers_count: 200000,
      forks_count: 40000,
      open_issues_count: 1000,
      updated_at: '2024-01-01T00:00:00Z',
    },
  ],
};

const mockUserResponse = {
  total_count: 1,
  incomplete_results: false,
  items: [
    {
      id: 1,
      login: 'octocat',
      avatar_url: 'https://avatars.githubusercontent.com/u/583231?v=4',
      html_url: 'https://github.com/octocat',
      type: 'User',
      score: 1.0,
    },
  ],
};

describe('GitHubService', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('should search repositories and validate response', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockRepoResponse),
    } as Response);

    const result = await githubService.search('repositories', 'react');
    expect(result.total_count).toBe(1);
    expect(result.items).toHaveLength(1);
  });

  it('should search users and validate response', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockUserResponse),
    } as Response);

    const result = await githubService.search('users', 'octocat');
    expect(result.total_count).toBe(1);
    expect(result.items).toHaveLength(1);
  });

  it('should throw on non-OK response', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: false,
      status: 403,
      statusText: 'Forbidden',
    } as Response);

    await expect(
      githubService.search('repositories', 'react'),
    ).rejects.toThrow('GitHub API error: 403 Forbidden');
  });

  it('should throw on invalid response data', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ invalid: 'data' }),
    } as Response);

    await expect(
      githubService.search('repositories', 'react'),
    ).rejects.toThrow();
  });
});
