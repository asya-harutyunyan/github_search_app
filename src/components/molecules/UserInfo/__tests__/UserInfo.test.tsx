import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { UserInfo } from '..';

describe('UserInfo', () => {
  it('should render with data-testid', () => {
    render(
      <UserInfo avatarUrl="https://example.com/img.png" username="octocat" />,
    );
    expect(screen.getByTestId('user-info')).toBeInTheDocument();
  });

  it('should render the avatar', () => {
    render(
      <UserInfo avatarUrl="https://example.com/img.png" username="octocat" />,
    );
    expect(screen.getByTestId('avatar')).toHaveAttribute(
      'src',
      'https://example.com/img.png',
    );
  });

  it('should render the username', () => {
    render(
      <UserInfo avatarUrl="https://example.com/img.png" username="octocat" />,
    );
    expect(screen.getByTestId('user-info')).toHaveTextContent('octocat');
  });
});
