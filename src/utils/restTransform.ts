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

export function getStatusColor(status: number) {
  if (status >= 200 && status < 300)
    return 'bg-green-100 text-green-700 border-green-300';
  if (status >= 300 && status < 400)
    return 'bg-blue-100 text-blue-700 border-blue-300';
  if (status >= 400 && status < 500)
    return 'bg-yellow-100 text-yellow-700 border-yellow-300';
  if (status >= 500) return 'bg-red-100 text-red-700 border-red-300';
  return 'bg-gray-100 text-gray-700 border-gray-300';
}
