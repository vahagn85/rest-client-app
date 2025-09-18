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
