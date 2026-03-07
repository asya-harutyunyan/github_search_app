import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Text } from '..';

describe('Text', () => {
  it('should render with data-testid', () => {
    render(<Text>Hello</Text>);
    expect(screen.getByTestId('text')).toBeInTheDocument();
  });

  it('should render as span by default', () => {
    render(<Text>Hello</Text>);
    expect(screen.getByTestId('text').tagName).toBe('SPAN');
  });

  it('should render as h1 when specified', () => {
    render(<Text as="h1">Title</Text>);
    expect(screen.getByTestId('text').tagName).toBe('H1');
  });

  it('should render as p when specified', () => {
    render(<Text as="p">Paragraph</Text>);
    expect(screen.getByTestId('text').tagName).toBe('P');
  });

  it('should render children', () => {
    render(<Text>Hello World</Text>);
    expect(screen.getByTestId('text')).toHaveTextContent('Hello World');
  });

  it('should accept custom className', () => {
    render(<Text className="custom">Text</Text>);
    expect(screen.getByTestId('text').className).toContain('custom');
  });
});
