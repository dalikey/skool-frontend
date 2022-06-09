import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL =
    process.env.NODE_ENV === 'production'
        ? process.env.REACT_APP_BASE_URL
        : 'https://skool-development.herokuapp.com/api';


const baseQuery = () => {
    const baseQuery = fetchBaseQuery({
        baseUrl: BASE_URL,
        prepareHeaders: (headers) => {
            const user = localStorage.getItem('user');

            if (user) {
                headers.set('authorization', JSON.parse(user).token);
            }

            return headers;
        },
    });
    return async (args, api, extraOptions) => {
        const { error, data } = await baseQuery(args, api, extraOptions);

        if (error) {
            if (error.status === 401) {
                localStorage.clear();
                window.location.href = '/sign-in';
            }
            return { error: { status: error.status, data: error.data }}
        }

        return { data }
    };
};

export const api = createApi({
    reducerPath: 'api',
    baseQuery: baseQuery(),
    tagTypes: ['Users', 'Workshops'],
    endpoints: () => ({}),
});
