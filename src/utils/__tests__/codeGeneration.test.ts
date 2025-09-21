import HTTPSnippet from 'httpsnippet';
import { generateCodeSnippet, LANGUAGES } from '../codeGeneration';
import * as variablesModule from '../variables';

vi.mock('./variables', () => ({
  replaceVariables: vi.fn((x: string) => x),
}));

describe('LANGUAGES array', () => {
  it('contains expected languages with correct keys and clients', () => {
    expect(LANGUAGES).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          value: 'shell-curl',
          key: 'shell',
          client: 'curl',
        }),
        expect.objectContaining({
          value: 'javascript-fetch',
          key: 'javascript',
          client: 'fetch',
        }),
        expect.objectContaining({
          value: 'python-requests',
          key: 'python',
          client: 'requests',
        }),
      ])
    );
  });
});

describe('generateCodeSnippet', () => {
  it('returns a string from HTTPSnippet', async () => {
    const snippet = await generateCodeSnippet('GET', 'https://example.com', [
      { key: 'Authorization', value: 'Bearer token' },
    ]);

    expect(typeof snippet).toBe('string');
    expect(snippet.length).toBeGreaterThan(0);
  });

  it('includes headers in the snippet', async () => {
    const snippet = await generateCodeSnippet('POST', 'https://example.com', [
      { key: 'Content-Type', value: 'application/json' },
    ]);

    expect(snippet).toContain('Content-Type');
  });

  it('handles body correctly', async () => {
    const body = '{ a: 1, b: 2 }';
    const snippet = await generateCodeSnippet(
      'POST',
      'https://example.com',
      [],
      body
    );

    expect(snippet).toContain(JSON.stringify(body, null, 2));
  });

  it('uses replaceVariables for header keys and values', async () => {
    const spy = vi.spyOn(variablesModule, 'replaceVariables');
    spy.mockImplementation((x) => x);

    await generateCodeSnippet('GET', 'https://example.com', [
      { key: 'X-Test', value: '{{VAR}}' },
    ]);

    expect(spy).toHaveBeenCalledWith('X-Test');
    expect(spy).toHaveBeenCalledWith('{{VAR}}');

    spy.mockRestore();
  });

  it('returns fallback string if HTTPSnippet fails', async () => {
    vi.spyOn(HTTPSnippet.prototype, 'convert').mockImplementationOnce(() => {
      throw new Error('fail');
    });

    const snippet = await generateCodeSnippet('GET', 'https://example.com', []);
    expect(snippet).toBe('// Failed to generate snippet');
  });
});
