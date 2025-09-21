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
