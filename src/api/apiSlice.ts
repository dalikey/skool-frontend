import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import 'dotenv/config';

export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: process.env.BASE_URL }),
    endpoints: () => ({}),
});

console.log(apiSlice);