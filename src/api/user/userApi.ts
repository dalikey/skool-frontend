import { api } from './../api';

const extendedApi = api.injectEndpoints({
    endpoints: (build) => ({
        getAllUsers: build.query({
            query: (isActive: Record<string, boolean | null>) => ({
                url: 'user',
                params: isActive
            }),
        }),
    }),
    overrideExisting: false,
});

export const { useGetAllUsersQuery } =
    extendedApi;
