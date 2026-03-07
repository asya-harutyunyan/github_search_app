import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '@/test/test-utils';
import { SearchPage } from '..';

describe('SearchPage', () => {
  it('should render the search layout', () => {
    renderWithProviders(<SearchPage />);
    expect(screen.getByTestId('search-layout')).toBeInTheDocument();
  });

  it('should render the search header', () => {
    renderWithProviders(<SearchPage />);
    expect(screen.getByTestId('search-header')).toBeInTheDocument();
  });

  it('should render search input', () => {
    renderWithProviders(<SearchPage />);
    expect(screen.getByTestId('search-input')).toBeInTheDocument();
  });

  it('should render search select', () => {
    renderWithProviders(<SearchPage />);
    expect(screen.getByTestId('search-select')).toBeInTheDocument();
  });

  it('should not show results on initial render', () => {
    renderWithProviders(<SearchPage />);
    expect(screen.queryByTestId('results-grid')).not.toBeInTheDocument();
  });
});
