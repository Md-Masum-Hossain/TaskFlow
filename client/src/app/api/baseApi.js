import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Mutex } from 'async-mutex';

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  credentials: 'include',
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});
const mutexInstance = new Mutex();

const baseQueryWithReauth = async (args, api, extraOptions) => {
  await mutexInstance.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    if (!mutexInstance.isLocked()) {
      const release = await mutexInstance.acquire();
      try {
        const refreshResult = await baseQuery({ url: '/auth/refresh', method: 'POST' }, api, extraOptions);
        if (refreshResult.data) {
          localStorage.setItem('accessToken', refreshResult.data.accessToken);
          result = await baseQuery(args, api, extraOptions);
        } else {
          localStorage.removeItem('accessToken');
        }
      } finally {
        release();
      }
    } else {
      await mutexInstance.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }
  return result;
};

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Task', 'Auth'],
  endpoints: () => ({})
});
