import { HeaderField, RestForm } from '@/types/rest.type';
import { replaceVariables } from './variables';

export function encodeToBase64(value: string): string {
  const encodedUriComponent = encodeURIComponent(value);
  return btoa(encodedUriComponent);
}

export function encodeHeaders(headers: HeaderField[]): string {
  const params = new URLSearchParams();
  headers.forEach(({ key, value }) => {
    const replaceKey = replaceVariables(key);
    const replaceValue = replaceVariables(value);

    if (replaceKey && replaceValue) {
      params.append(replaceKey, replaceValue);
    }
  });
  return params.toString();
}

export function createRouteFromData(data: RestForm) {
  const { method, url, body, headers = [] } = data;

  const replaceUrl = replaceVariables(url);

  const encodeUrl = encodeToBase64(replaceUrl);

  let encodeBody: string | null = null;
  if (body) {
    const bodyStr = replaceVariables(JSON.stringify(body));
    encodeBody = encodeToBase64(bodyStr);
  }

  const query = encodeHeaders(headers);

  let route = `/${method}/${encodeUrl}`;
  if (encodeBody) route += `/${encodeBody}`;
  if (query) route += `?${query}`;

  return route;
}

export function decodeFromBase64(value: string): string {
  try {
    const decodedURIComponent = decodeURIComponent(value);
    const decodedBase64 = atob(decodedURIComponent);
    return decodeURIComponent(decodedBase64);
  } catch {
    return value;
  }
}

export function decodeHeaders(query: string): HeaderField[] {
  const headers: HeaderField[] = [];
  const params = new URLSearchParams(query);
  params.forEach((value, key) => {
    headers.push({ key, value: decodeURIComponent(value) });
  });
  return headers;
}

export function parseRouteToData(
  method: string,
  encodedUrl: string,
  encodedBody?: string | null,
  query?: string | null
): RestForm {
  const url = encodedUrl ? decodeFromBase64(encodedUrl) : '';
  let body: string = '';

  if (encodedBody) {
    const bodyStr = decodeFromBase64(encodedBody);
    try {
      body = JSON.parse(bodyStr);
    } catch {
      body = bodyStr;
    }
  }

  const headers = query ? decodeHeaders(query) : [];

  return {
    method: method || 'GET',
    url,
    body,
    headers,
  };
}

export function replaceData(data: RestForm) {
  const { method, url, body, headers = [] } = data;
  const replaceUrl = replaceVariables(url);

  const replaceBody = body ? replaceVariables(JSON.stringify(body)) : undefined;
  const replaceHeaders = headers.map(({ key, value }) => ({
    key: replaceVariables(key),
    value: replaceVariables(value),
  }));

  return {
    method,
    url: replaceUrl,
    body: replaceBody ? JSON.parse(replaceBody) : undefined,
    headers: replaceHeaders,
  };
}

export function hasProtocol(url: string): boolean {
  const replacedUrl = replaceVariables(url);
  return !/^https?:\/\//i.test(replacedUrl);
}
