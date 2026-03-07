import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from '..';

describe('Input', () => {
  it('should render with data-testid', () => {
    render(<Input />);
    expect(screen.getByTestId('input')).toBeInTheDocument();
  });

  it('should display placeholder', () => {
    render(<Input placeholder="Type here" />);
    expect(screen.getByTestId('input')).toHaveAttribute(
      'placeholder',
      'Type here',
    );
  });

  it('should call onChange when typing', async () => {
    const onChange = vi.fn();
    render(<Input onChange={onChange} />);
    await userEvent.type(screen.getByTestId('input'), 'a');
    expect(onChange).toHaveBeenCalled();
  });

  it('should accept fullWidth prop', () => {
    render(<Input fullWidth />);
    expect(screen.getByTestId('input')).toBeInTheDocument();
  });

  it('should forward additional props', () => {
    render(<Input disabled />);
    expect(screen.getByTestId('input')).toBeDisabled();
  });
});
