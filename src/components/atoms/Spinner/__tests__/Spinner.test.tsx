import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Spinner } from '..';

describe('Spinner', () => {
  it('should render with data-testid', () => {
    render(<Spinner />);
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('should have status role', () => {
    render(<Spinner />);
    expect(screen.getByTestId('spinner')).toHaveAttribute('role', 'status');
  });

  it('should have loading aria-label', () => {
    render(<Spinner />);
    expect(screen.getByTestId('spinner')).toHaveAttribute(
      'aria-label',
      'Loading',
    );
  });

  it('should render with sm size', () => {
    render(<Spinner size="sm" />);
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });
});
