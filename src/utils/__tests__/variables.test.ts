import { VARIABLE_STORAGE } from '@/constants/variable';
import { getVariables, replaceVariables } from '../variables';

describe('Variable utils', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('getVariables', () => {
    it('returns an empty object if nothing in localStorage', () => {
      expect(getVariables()).toEqual({});
    });

    it('returns parsed variables from localStorage', () => {
      const vars = [
        { key: 'API_URL', value: 'https://example.com' },
        { key: 'TOKEN', value: 'abc123' },
      ];
      localStorage.setItem(VARIABLE_STORAGE, JSON.stringify(vars));

      expect(getVariables()).toEqual({
        API_URL: 'https://example.com',
        TOKEN: 'abc123',
      });
    });

    it('ignores variables without keys', () => {
      const vars = [
        { key: '', value: 'no-key' },
        { key: 'VALID', value: 'yes' },
      ];
      localStorage.setItem(VARIABLE_STORAGE, JSON.stringify(vars));

      expect(getVariables()).toEqual({ VALID: 'yes' });
    });

    it('returns empty object for invalid JSON', () => {
      localStorage.setItem(VARIABLE_STORAGE, '{invalid json');

      expect(getVariables()).toEqual({});
    });
  });

  describe('replaceVariables', () => {
    it('replaces variables in text', () => {
      const vars = [{ key: 'NAME', value: 'Alice' }];
      localStorage.setItem(VARIABLE_STORAGE, JSON.stringify(vars));

      const result = replaceVariables('Hello {{NAME}}!');
      expect(result).toBe('Hello Alice!');
    });

    it('replaces multiple variables', () => {
      const vars = [
        { key: 'A', value: '1' },
        { key: 'B', value: '2' },
      ];
      localStorage.setItem(VARIABLE_STORAGE, JSON.stringify(vars));

      const result = replaceVariables('Values: {{A}} and {{B}}');
      expect(result).toBe('Values: 1 and 2');
    });

    it('replaces missing variable with empty string', () => {
      const vars = [{ key: 'X', value: 'x' }];
      localStorage.setItem(VARIABLE_STORAGE, JSON.stringify(vars));

      const result = replaceVariables('Missing: {{Y}}');
      expect(result).toBe('Missing: ');
    });

    it('works with no variables in localStorage', () => {
      const result = replaceVariables('Nothing: {{ANY}}');
      expect(result).toBe('Nothing: ');
    });
  });
});
