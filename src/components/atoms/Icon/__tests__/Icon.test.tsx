import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Icon } from '..';

describe('Icon', () => {
  it('should render star icon with data-testid', () => {
    render(<Icon name="star" />);
    expect(screen.getByTestId('icon-star')).toBeInTheDocument();
  });

  it('should render fork icon', () => {
    render(<Icon name="fork" />);
    expect(screen.getByTestId('icon-fork')).toBeInTheDocument();
  });

  it('should render issue icon', () => {
    render(<Icon name="issue" />);
    expect(screen.getByTestId('icon-issue')).toBeInTheDocument();
  });

  it('should render link icon', () => {
    render(<Icon name="link" />);
    expect(screen.getByTestId('icon-link')).toBeInTheDocument();
  });

  it('should set aria-hidden', () => {
    render(<Icon name="star" />);
    expect(screen.getByTestId('icon-star')).toHaveAttribute(
      'aria-hidden',
      'true',
    );
  });

  it('should apply custom size', () => {
    render(<Icon name="star" size={24} />);
    const svg = screen.getByTestId('icon-star');
    expect(svg).toHaveAttribute('width', '24');
    expect(svg).toHaveAttribute('height', '24');
  });
});
