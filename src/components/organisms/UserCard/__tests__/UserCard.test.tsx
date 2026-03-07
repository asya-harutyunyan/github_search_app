import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { UserCard } from '..';
import type { User } from '@/types';

const mockUser: User = {
  id: 1,
  login: 'octocat',
  avatar_url: 'https://avatars.githubusercontent.com/u/583231?v=4',
  html_url: 'https://github.com/octocat',
  type: 'User',
  score: 42.5,
};

describe('UserCard', () => {
  it('should render with data-testid', () => {
    render(<UserCard user={mockUser} />);
    expect(screen.getByTestId('user-card')).toBeInTheDocument();
  });

  it('should render user login in link', () => {
    render(<UserCard user={mockUser} />);
    const link = screen.getByTestId('user-card-link');
    expect(link).toHaveAttribute('href', 'https://github.com/octocat');
    expect(link).toHaveTextContent('octocat');
  });

  it('should render avatar', () => {
    render(<UserCard user={mockUser} />);
    expect(screen.getByTestId('avatar')).toHaveAttribute(
      'src',
      'https://avatars.githubusercontent.com/u/583231?v=4',
    );
  });

  it('should render type badge', () => {
    render(<UserCard user={mockUser} />);
    const badges = screen.getAllByTestId('badge');
    const typeBadge = badges.find((b) => b.textContent === 'User');
    expect(typeBadge).toBeDefined();
  });

  it('should render score', () => {
    render(<UserCard user={mockUser} />);
    expect(screen.getByTestId('user-card-score')).toHaveTextContent(
      'Score: 42.5',
    );
  });

  it('should render profile link', () => {
    render(<UserCard user={mockUser} />);
    const profileLink = screen.getByTestId('user-card-profile');
    expect(profileLink).toHaveAttribute(
      'href',
      'https://github.com/octocat',
    );
    expect(profileLink).toHaveTextContent('Profile');
  });
});
