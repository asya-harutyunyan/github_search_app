import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SearchLayout } from '..';
import type { CachedResult, Repository } from '@/types';

const noop = vi.fn();

const mockResults: CachedResult = {
  entityType: 'repositories',
  totalCount: 1,
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
      language: 'JS',
      stargazers_count: 100,
      forks_count: 50,
      open_issues_count: 10,
      updated_at: '2024-01-01T00:00:00Z',
    },
  ] satisfies Repository[],
  timestamp: Date.now(),
};

const defaultProps = {
  query: '',
  entityType: 'repositories' as const,
  status: 'idle' as const,
  error: null,
  results: null,
  isEmpty: false,
  page: 1,
  totalPages: 0,
  onQueryChange: noop,
  onEntityTypeChange: noop,
  onPageChange: noop,
};

describe('SearchLayout', () => {
  it('should render layout container', () => {
    render(<SearchLayout {...defaultProps} />);
    expect(screen.getByTestId('search-layout')).toBeInTheDocument();
  });

  it('should render search header', () => {
    render(<SearchLayout {...defaultProps} />);
    expect(screen.getByTestId('search-header')).toBeInTheDocument();
  });

  it('should render content area', () => {
    render(<SearchLayout {...defaultProps} />);
    expect(screen.getByTestId('search-content')).toBeInTheDocument();
  });

  it('should show spinner when loading', () => {
    render(<SearchLayout {...defaultProps} status="loading" />);
    expect(screen.getByTestId('loading-state')).toBeInTheDocument();
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('should show error message', () => {
    render(
      <SearchLayout {...defaultProps} status="failed" error="API error" />,
    );
    expect(screen.getByTestId('error-state')).toBeInTheDocument();
    expect(screen.getByTestId('error-state')).toHaveTextContent('API error');
  });

  it('should show empty state', () => {
    render(
      <SearchLayout {...defaultProps} status="succeeded" isEmpty={true} />,
    );
    expect(screen.getByTestId('empty-state')).toBeInTheDocument();
    expect(screen.getByTestId('empty-state')).toHaveTextContent(
      'No results found',
    );
  });

  it('should show results grid when results exist', () => {
    render(
      <SearchLayout
        {...defaultProps}
        status="succeeded"
        results={mockResults}
      />,
    );
    expect(screen.getByTestId('results-grid')).toBeInTheDocument();
  });

  it('should not show results when results is null', () => {
    render(<SearchLayout {...defaultProps} status="idle" />);
    expect(screen.queryByTestId('results-grid')).not.toBeInTheDocument();
  });

  it('should not show loading when idle', () => {
    render(<SearchLayout {...defaultProps} />);
    expect(screen.queryByTestId('loading-state')).not.toBeInTheDocument();
  });
});
