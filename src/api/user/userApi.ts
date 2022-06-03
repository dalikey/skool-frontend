import { api } from './../api';

const extendedApi = api.injectEndpoints({
    endpoints: (build) => ({
        getAllUsers: build.query<void, void>({
            query: () => ({
                url: 'user',
            }),
        }),
    }),
    overrideExisting: false,
});

export const { useGetAllUsersQuery } =
    extendedApi;
