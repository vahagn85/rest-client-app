import HTTPSnippet from 'httpsnippet';
import { replaceVariables } from './variables';
import { CodeLanguage, HeaderField } from '@/types/rest.type';

export const LANGUAGES: CodeLanguage[] = [
  { value: 'shell-curl', key: 'shell', label: 'curl', client: 'curl' },
  {
    value: 'javascript-fetch',
    key: 'javascript',
    label: 'JavaScript (Fetch)',
    client: 'fetch',
  },
  {
    value: 'javascript-xhr',
    key: 'javascript',
    label: 'JavaScript (XHR)',
    client: 'xhr',
  },
  {
    value: 'javascript-jquery',
    key: 'javascript',
    label: 'JavaScript (jQuery)',
    client: 'jquery',
  },
  {
    value: 'javascript-axios',
    key: 'javascript',
    label: 'JavaScript (Axios)',
    client: 'axios',
  },
  {
    value: 'node-native',
    key: 'node',
    label: 'NodeJS',
    client: 'native',
  },
  {
    value: 'python-requests',
    key: 'python',
    label: 'Python',
    client: 'requests',
  },
  {
    value: 'java-okhttp',
    key: 'java',
    label: 'Java',
    client: 'okhttp',
  },
  {
    value: 'c-libcurl',
    key: 'c',
    label: 'C#',
    client: 'libcurl',
  },
  { value: 'go-native', key: 'go', label: 'Go', client: 'native' },
  { value: 'php-curl', key: 'php', label: 'PHP', client: 'curl' },
  { value: 'ruby-http', key: 'ruby', label: 'Ruby', client: 'http' },
];

export async function generateCodeSnippet(
  method: string,
  url: string,
  headers: HeaderField[],
  body?: string,
  lang = 'shell',
  client?: string
): Promise<string> {
  const request = {
    method,
    url,
    httpVersion: 'HTTP/1.1',
    headers: headers.map(({ key, value }) => ({
      name: replaceVariables(key),
      value: replaceVariables(value),
    })),
    queryString: [],
    cookies: [],
    postData: body
      ? {
          mimeType: 'application/json',
          text: JSON.stringify(body, null, 2),
        }
      : undefined,
    headersSize: -1,
    bodySize: -1,
  };

  try {
    const snippet = new HTTPSnippet(request);
    return snippet.convert(lang, client) as string;
  } catch {
    return '// Failed to generate snippet';
  }
}
