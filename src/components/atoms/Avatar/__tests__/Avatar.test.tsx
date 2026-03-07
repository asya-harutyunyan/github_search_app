import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Avatar } from '..';

describe('Avatar', () => {
  it('should render with data-testid', () => {
    render(<Avatar src="https://example.com/img.png" alt="user" />);
    expect(screen.getByTestId('avatar')).toBeInTheDocument();
  });

  it('should have correct src', () => {
    render(<Avatar src="https://example.com/img.png" alt="user" />);
    expect(screen.getByTestId('avatar')).toHaveAttribute(
      'src',
      'https://example.com/img.png',
    );
  });

  it('should have lazy loading', () => {
    render(<Avatar src="https://example.com/img.png" alt="user" />);
    expect(screen.getByTestId('avatar')).toHaveAttribute('loading', 'lazy');
  });

  it('should have alt text', () => {
    render(<Avatar src="https://example.com/img.png" alt="user" />);
    expect(screen.getByTestId('avatar')).toHaveAttribute('alt', 'user');
  });
});
