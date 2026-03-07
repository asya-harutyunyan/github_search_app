import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RepoCard } from '..';
import type { Repository } from '@/types';

const mockRepo: Repository = {
  id: 1,
  name: 'react',
  full_name: 'facebook/react',
  owner: {
    login: 'facebook',
    avatar_url: 'https://avatars.githubusercontent.com/u/69631?v=4',
    html_url: 'https://github.com/facebook',
  },
  html_url: 'https://github.com/facebook/react',
  description: 'A declarative, efficient, and flexible JavaScript library',
  language: 'JavaScript',
  stargazers_count: 200000,
  forks_count: 40000,
  open_issues_count: 1500,
  updated_at: '2024-01-01T00:00:00Z',
};

describe('RepoCard', () => {
  it('should render with data-testid', () => {
    render(<RepoCard repo={mockRepo} />);
    expect(screen.getByTestId('repo-card')).toBeInTheDocument();
  });

  it('should render repo name in link', () => {
    render(<RepoCard repo={mockRepo} />);
    const link = screen.getByTestId('repo-card-link');
    expect(link).toHaveAttribute(
      'href',
      'https://github.com/facebook/react',
    );
    expect(link).toHaveTextContent('react');
  });

  it('should render owner info', () => {
    render(<RepoCard repo={mockRepo} />);
    expect(screen.getByTestId('user-info')).toHaveTextContent('facebook');
  });

  it('should render description', () => {
    render(<RepoCard repo={mockRepo} />);
    expect(screen.getByTestId('repo-card-description')).toHaveTextContent(
      'A declarative, efficient, and flexible JavaScript library',
    );
  });

  it('should render formatted stats', () => {
    render(<RepoCard repo={mockRepo} />);
    expect(screen.getByTestId('stat-star')).toHaveTextContent('200k');
    expect(screen.getByTestId('stat-fork')).toHaveTextContent('40k');
    expect(screen.getByTestId('stat-issue')).toHaveTextContent('1.5k');
  });

  it('should render language badge', () => {
    render(<RepoCard repo={mockRepo} />);
    const badges = screen.getAllByTestId('badge');
    const languageBadge = badges.find(
      (b) => b.textContent === 'JavaScript',
    );
    expect(languageBadge).toBeDefined();
  });

  it('should render external link', () => {
    render(<RepoCard repo={mockRepo} />);
    expect(screen.getByTestId('repo-card-external')).toHaveAttribute(
      'href',
      'https://github.com/facebook/react',
    );
  });

  it('should not render description when null', () => {
    render(<RepoCard repo={{ ...mockRepo, description: null }} />);
    expect(
      screen.queryByTestId('repo-card-description'),
    ).not.toBeInTheDocument();
  });
});
