import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ResultsGrid } from '..';
import type { CachedResult, Repository, User } from '@/types';

const mockRepoResults: CachedResult = {
  entityType: 'repositories',
  totalCount: 2,
  items: [
    {
      id: 1,
      name: 'react',
      full_name: 'facebook/react',
      owner: {
        login: 'facebook',
        avatar_url: 'https://example.com/fb.png',
        html_url: 'https://github.com/facebook',
      },
      html_url: 'https://github.com/facebook/react',
      description: 'A lib',
      language: 'JavaScript',
      stargazers_count: 200000,
      forks_count: 40000,
      open_issues_count: 1000,
      updated_at: '2024-01-01T00:00:00Z',
    },
    {
      id: 2,
      name: 'vue',
      full_name: 'vuejs/core',
      owner: {
        login: 'vuejs',
        avatar_url: 'https://example.com/vue.png',
        html_url: 'https://github.com/vuejs',
      },
      html_url: 'https://github.com/vuejs/core',
      description: 'Vue.js',
      language: 'TypeScript',
      stargazers_count: 40000,
      forks_count: 7000,
      open_issues_count: 500,
      updated_at: '2024-01-01T00:00:00Z',
    },
  ] satisfies Repository[],
  timestamp: Date.now(),
};

const mockUserResults: CachedResult = {
  entityType: 'users',
  totalCount: 1,
  items: [
    {
      id: 1,
      login: 'octocat',
      avatar_url: 'https://example.com/octo.png',
      html_url: 'https://github.com/octocat',
      type: 'User',
      score: 10.0,
    },
  ] satisfies User[],
  timestamp: Date.now(),
};

describe('ResultsGrid', () => {
  it('should render with data-testid', () => {
    render(<ResultsGrid page={1} totalPages={1} onPageChange={() => {}} results={mockRepoResults} />);
    expect(screen.getByTestId('results-grid')).toBeInTheDocument();
  });

  it('should display result count', () => {
    render(<ResultsGrid page={1} totalPages={1} onPageChange={() => {}} results={mockRepoResults} />);
    expect(screen.getByTestId('results-count')).toHaveTextContent('2 results');
  });

  it('should render repo cards for repositories', () => {
    render(<ResultsGrid page={1} totalPages={1} onPageChange={() => {}} results={mockRepoResults} />);
    expect(screen.getAllByTestId('repo-card')).toHaveLength(2);
  });

  it('should render user cards for users', () => {
    render(<ResultsGrid page={1} totalPages={1} onPageChange={() => {}} results={mockUserResults} />);
    expect(screen.getAllByTestId('user-card')).toHaveLength(1);
  });

  it('should format large count', () => {
    const bigResults: CachedResult = {
      ...mockRepoResults,
      totalCount: 15000,
    };
    render(<ResultsGrid page={1} totalPages={1} onPageChange={() => {}} results={bigResults} />);
    expect(screen.getByTestId('results-count')).toHaveTextContent(
      '15k results',
    );
  });
});
