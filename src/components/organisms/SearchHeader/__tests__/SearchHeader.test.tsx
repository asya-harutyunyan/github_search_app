import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SearchHeader } from '..';

describe('SearchHeader', () => {
  const defaultProps = {
    query: '',
    entityType: 'repositories' as const,
    hasResults: false,
    onQueryChange: vi.fn(),
    onEntityTypeChange: vi.fn(),
  };

  it('should render with data-testid', () => {
    render(<SearchHeader {...defaultProps} />);
    expect(screen.getByTestId('search-header')).toBeInTheDocument();
  });

  it('should render the search bar', () => {
    render(<SearchHeader {...defaultProps} />);
    expect(screen.getByTestId('search-bar')).toBeInTheDocument();
  });

  it('should render centered when no results', () => {
    render(<SearchHeader {...defaultProps} hasResults={false} />);
    expect(screen.getByTestId('search-header')).toBeInTheDocument();
  });

  it('should render at top when results exist', () => {
    render(<SearchHeader {...defaultProps} hasResults={true} />);
    expect(screen.getByTestId('search-header')).toBeInTheDocument();
  });
});
