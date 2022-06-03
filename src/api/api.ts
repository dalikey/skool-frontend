import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL =
    process.env.NODE_ENV === 'production'
        ? 'https://skool-stable.herokuapp.com/api'
        : 'https://skool-development.herokuapp.com/api';

const baseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
        const user = localStorage.getItem('user');

        if (user) {
            headers.set('authorization', `Bearer ${JSON.parse(user).token}`);
        }

        return headers;
    },
});

export const api = createApi({
    reducerPath: 'api',
    baseQuery: baseQuery,
    endpoints: () => ({}),
});
