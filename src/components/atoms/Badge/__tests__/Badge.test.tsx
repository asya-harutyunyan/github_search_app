import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Badge } from '..';

describe('Badge', () => {
  it('should render with data-testid', () => {
    render(<Badge>TypeScript</Badge>);
    expect(screen.getByTestId('badge')).toBeInTheDocument();
  });

  it('should render children text', () => {
    render(<Badge>TypeScript</Badge>);
    expect(screen.getByTestId('badge')).toHaveTextContent('TypeScript');
  });

  it('should render with accent variant', () => {
    render(<Badge variant="accent">JS</Badge>);
    expect(screen.getByTestId('badge')).toHaveTextContent('JS');
  });
});
