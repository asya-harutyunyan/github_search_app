import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Select } from '..';

const options = [
  { value: 'a', label: 'Alpha' },
  { value: 'b', label: 'Beta' },
];

describe('Select', () => {
  it('should render with data-testid', () => {
    render(<Select options={options} />);
    expect(screen.getByTestId('select')).toBeInTheDocument();
  });

  it('should render all options', () => {
    render(<Select options={options} />);
    const selectEl = screen.getByTestId('select');
    expect(selectEl.querySelectorAll('option')).toHaveLength(2);
  });

  it('should call onChange when selecting', async () => {
    const onChange = vi.fn();
    render(<Select options={options} onChange={onChange} />);
    await userEvent.selectOptions(screen.getByTestId('select'), 'b');
    expect(onChange).toHaveBeenCalled();
  });
});
