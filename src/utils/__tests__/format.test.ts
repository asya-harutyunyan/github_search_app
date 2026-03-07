import { describe, it, expect } from 'vitest';
import { formatNumber } from '@/utils/format';

describe('formatNumber', () => {
  it('should return plain number below 1000', () => {
    expect(formatNumber(0)).toBe('0');
    expect(formatNumber(999)).toBe('999');
    expect(formatNumber(42)).toBe('42');
  });

  it('should format thousands with "k"', () => {
    expect(formatNumber(1000)).toBe('1k');
    expect(formatNumber(1200)).toBe('1.2k');
    expect(formatNumber(15300)).toBe('15.3k');
    expect(formatNumber(999999)).toBe('1000k');
  });

  it('should format millions with "m"', () => {
    expect(formatNumber(1000000)).toBe('1m');
    expect(formatNumber(3400000)).toBe('3.4m');
    expect(formatNumber(12500000)).toBe('12.5m');
  });

  it('should strip trailing .0', () => {
    expect(formatNumber(2000)).toBe('2k');
    expect(formatNumber(5000000)).toBe('5m');
  });
});
