import { ApiError } from '@/types/error/ApiError';

type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';

const BASE_URL = import.meta.env.VITE_API_URL;

const request = async <ResultType>(url: string, method: HttpMethod, body?: unknown): Promise<ResultType> => {
  const payload: RequestInit = {
    method: method,
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    },
    body: body ? JSON.stringify(body) : undefined
  };

  const res = await fetch(BASE_URL + url, payload);

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new ApiError(
      errorData.statusCode,
      errorData.errorCode,
      errorData.message
    );
  }

  return await res.json();
};

export const api = {
  get:    <ResultType>(url: string): Promise<ResultType> => request(url, 'GET'),
  post:   <ResultType>(url: string, body?: unknown): Promise<ResultType> => request(url, 'POST', body),
  put:    <ResultType>(url: string, body?: unknown): Promise<ResultType> => request(url, 'PUT', body),
  patch:  <ResultType>(url: string, body?: unknown): Promise<ResultType> => request(url, 'PATCH', body),
  delete: <ResultType>(url: string, body?: unknown): Promise<ResultType> => request(url, 'DELETE', body),
};
