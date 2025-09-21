import { RequestRest } from '@/types/rest.type';

type ResponseRest = RequestRest & { id: string };
export const mockDataResponse: ResponseRest[] = [
  {
    id: '1',
    user_id: '1',
    request_method: 'GET',
    route: '/Ageglgj1',
    endpoint_url: 'https://jsonplaceholder.typicode.com/posts/1',
    response_status: 200,
    request_duration: 123,
    request_size: 456,
    response_size: 789,
    error_details: '',
    created_at: '2025-09-21T10:00:00.000Z',
  },
  {
    id: '2',
    user_id: '1',
    request_method: 'POST',
    route: '/Bdehr',
    endpoint_url: 'https://jsonplaceholder.typicode.com/posts',
    response_status: 500,
    request_duration: 321,
    request_size: 654,
    response_size: 987,
    error_details: 'Internal Server Error',
    created_at: '2025-09-21T11:00:00.000Z',
  },
];

export const mockMethodColors: [string, string][] = [
  ['GET', 'bg-blue-100 text-blue-700 border-blue-300'],
  ['POST', 'bg-green-100 text-green-700 border-green-300'],
  ['PUT', 'bg-yellow-100 text-yellow-700 border-yellow-300'],
  ['DELETE', 'bg-red-100 text-red-700 border-red-300'],
  ['PATCH', 'bg-purple-100 text-purple-700 border-purple-300'],
  ['FOO', 'bg-gray-100 text-gray-700 border-gray-300'],
  ['get', 'bg-blue-100 text-blue-700 border-blue-300'],
];

export const mockStatusColors: [number, string][] = [
  [200, 'bg-green-100 text-green-700 border-green-300'],
  [250, 'bg-green-100 text-green-700 border-green-300'],
  [300, 'bg-blue-100 text-blue-700 border-blue-300'],
  [399, 'bg-blue-100 text-blue-700 border-blue-300'],
  [400, 'bg-yellow-100 text-yellow-700 border-yellow-300'],
  [499, 'bg-yellow-100 text-yellow-700 border-yellow-300'],
  [500, 'bg-red-100 text-red-700 border-red-300'],
  [599, 'bg-red-100 text-red-700 border-red-300'],
  [0, 'bg-gray-100 text-gray-700 border-gray-300'],
  [-1, 'bg-gray-100 text-gray-700 border-gray-300'],
];
