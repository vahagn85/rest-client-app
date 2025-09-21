import {
  encodeToBase64,
  decodeFromBase64,
  encodeHeaders,
  decodeHeaders,
  createRouteFromData,
  parseRouteToData,
  replaceData,
  hasProtocol,
} from '../restTransform';
import { replaceVariables } from '../variables';

vi.mock('../variables', () => ({
  replaceVariables: vi.fn((x: string) => x),
}));

describe('Rest Helpers', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('encodeToBase64 and decodeFromBase64 work correctly', () => {
    const text = 'Hello World! 123';
    const encoded = encodeToBase64(text);
    const decoded = decodeFromBase64(encoded);

    expect(decoded).toBe(text);
  });

  it('encodeHeaders and decodeHeaders work correctly', () => {
    const headers = [
      { key: 'X-Test', value: 'Value1' },
      { key: 'Content-Type', value: 'application/json' },
    ];

    const encoded = encodeHeaders(headers);
    const decoded = decodeHeaders(encoded);

    expect(decoded).toEqual(headers);
  });

  it('createRouteFromData encodes URL, body, and headers', () => {
    const data = {
      method: 'POST',
      url: 'https://example.com/api',
      body: '{ a: 1 }',
      headers: [{ key: 'X-Test', value: '123' }],
    };

    const route = createRouteFromData(data);

    expect(route).toMatch(/^\/POST\//);
    expect(route).toContain('X-Test=123');
    expect(route).toContain(encodeToBase64(JSON.stringify(data.body)));
  });

  it('parseRouteToData decodes route correctly', () => {
    const body = { a: 1 };
    const url = 'https://example.com/api';
    const headers = [{ key: 'X-Test', value: '123' }];
    const encodedUrl = encodeToBase64(url);
    const encodedBody = encodeToBase64(JSON.stringify(body));
    const query = 'X-Test=123';

    const parsed = parseRouteToData('POST', encodedUrl, encodedBody, query);

    expect(parsed).toEqual({
      method: 'POST',
      url,
      body,
      headers,
    });
  });

  it('replaceData applies replaceVariables to url, body, and headers', () => {
    const data = {
      method: 'POST',
      url: 'https://example.com/{{VAR}}',
      body: '{ key: "{{VAL}}" }',
      headers: [{ key: 'X-{{H}}', value: '{{V}}' }],
    };

    const result = replaceData(data);

    expect(result.url).toBe('https://example.com/{{VAR}}');
    expect(result.body).toEqual('{ key: "{{VAL}}" }');
    expect(result.headers).toEqual([{ key: 'X-{{H}}', value: '{{V}}' }]);
    expect(replaceVariables).toHaveBeenCalled();
  });

  it('hasProtocol returns false for URLs starting with http or https', () => {
    expect(hasProtocol('http://example.com')).toBe(false);
    expect(hasProtocol('https://example.com')).toBe(false);
    expect(hasProtocol('ftp://example.com')).toBe(true);
    expect(hasProtocol('example.com')).toBe(true);
  });
});
