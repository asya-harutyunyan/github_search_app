import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StatBadge } from '..';

describe('StatBadge', () => {
  it('should render with data-testid containing icon name', () => {
    render(<StatBadge icon="star" value="1.2k" />);
    expect(screen.getByTestId('stat-star')).toBeInTheDocument();
  });

  it('should render the value', () => {
    render(<StatBadge icon="star" value="1.2k" />);
    expect(screen.getByTestId('stat-star')).toHaveTextContent('1.2k');
  });

  it('should set title from label', () => {
    render(<StatBadge icon="fork" value="500" label="Forks" />);
    expect(screen.getByTestId('stat-fork')).toHaveAttribute('title', 'Forks');
  });

  it('should render the icon', () => {
    render(<StatBadge icon="issue" value="10" />);
    expect(screen.getByTestId('icon-issue')).toBeInTheDocument();
  });
});
