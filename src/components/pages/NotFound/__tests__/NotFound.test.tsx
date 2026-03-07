import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { NotFound } from '..';

function renderNotFound() {
  return render(
    <MemoryRouter>
      <NotFound />
    </MemoryRouter>,
  );
}

describe('NotFound', () => {
  it('should render with data-testid', () => {
    renderNotFound();
    expect(screen.getByTestId('not-found')).toBeInTheDocument();
  });

  it('should display 404', () => {
    renderNotFound();
    expect(screen.getByTestId('not-found')).toHaveTextContent('404');
  });

  it('should display page not found message', () => {
    renderNotFound();
    expect(screen.getByTestId('not-found')).toHaveTextContent(
      'Page not found',
    );
  });

  it('should have link back to search', () => {
    renderNotFound();
    const link = screen.getByTestId('not-found-link');
    expect(link).toHaveAttribute('href', '/');
  });
});
