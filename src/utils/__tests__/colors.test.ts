import { mockMethodColors, mockStatusColors } from '@/test-utils/mockData';
import { getMethodColor, getStatusColor } from '../colors';

describe('colors utils', () => {
  it('returns correct method colors', () => {
    mockMethodColors.forEach(([method, expected]) => {
      expect(getMethodColor(method)).toBe(expected);
    });
  });

  it('returns correct status colors', () => {
    mockStatusColors.forEach(([status, expected]) => {
      expect(getStatusColor(status)).toBe(expected);
    });
  });
});
