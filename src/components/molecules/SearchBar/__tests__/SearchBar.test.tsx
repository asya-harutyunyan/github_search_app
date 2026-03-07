import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchBar } from '..';

describe('SearchBar', () => {
  const defaultProps = {
    query: '',
    entityType: 'repositories' as const,
    onQueryChange: vi.fn(),
    onEntityTypeChange: vi.fn(),
  };

  it('should render search bar container', () => {
    render(<SearchBar {...defaultProps} />);
    expect(screen.getByTestId('search-bar')).toBeInTheDocument();
  });

  it('should render input and select', () => {
    render(<SearchBar {...defaultProps} />);
    expect(screen.getByTestId('search-input')).toBeInTheDocument();
    expect(screen.getByTestId('search-select')).toBeInTheDocument();
  });

  it('should call onQueryChange when typing', async () => {
    const onQueryChange = vi.fn();
    render(<SearchBar {...defaultProps} onQueryChange={onQueryChange} />);
    await userEvent.type(screen.getByTestId('search-input'), 'react');
    expect(onQueryChange).toHaveBeenCalledTimes(5);
  });

  it('should call onEntityTypeChange when selecting', async () => {
    const onEntityTypeChange = vi.fn();
    render(
      <SearchBar {...defaultProps} onEntityTypeChange={onEntityTypeChange} />,
    );
    await userEvent.selectOptions(screen.getByTestId('search-select'), 'users');
    expect(onEntityTypeChange).toHaveBeenCalledWith('users');
  });

  it('should reflect current query value', () => {
    render(<SearchBar {...defaultProps} query="hello" />);
    expect(screen.getByTestId('search-input')).toHaveValue('hello');
  });
});
