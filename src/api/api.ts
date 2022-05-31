import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL =
    process.env.NODE_ENV === 'production'
        ? 'https://skool-stable.herokuapp.com/api'
        : 'https://skool-development.herokuapp.com/api';

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    endpoints: () => ({}),
});
