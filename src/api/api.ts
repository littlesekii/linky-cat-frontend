export const api = {

  baseUrl: import.meta.env.VITE_API_URL,
  request: async function <ResultType, ParamType>(url: string, method: string, body?: ParamType): Promise<ResultType> {
    const payload: RequestInit = {
      method: method,
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    };

    if (body)
      payload.body = JSON.stringify(body);

    const res = await fetch(this.baseUrl + url, payload);

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error : ${res.status}`);
    }

    const data = await res.json();
    return data;
  },
  get: function <ResultType>(url: string): Promise<ResultType> {
    return this.request(url, 'GET');
  },
  post: function <ResultType, ParamType>(url: string, body: ParamType): Promise<ResultType> {
    return this.request(url, 'POST', body);
  },
  put: function <ResultType, ParamType>(url: string, body: ParamType): Promise<ResultType> {
    return this.request(url, 'PUT', body);
  },
  patch: function <ResultType, ParamType>(url: string, body: ParamType): Promise<ResultType> {
    return this.request(url, 'PATCH', body);
  },
  delete: function <ResultType, ParamType>(url: string, body: ParamType): Promise<ResultType> {
    return this.request(url, 'DELETE', body);
  },
};
