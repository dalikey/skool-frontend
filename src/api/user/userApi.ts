import { UserModel } from '../../models/userModels';
import { api } from './../api';

interface getAllUsersResponse {
    error?: string;
    message?: string;
    result?: UserModel[];
}

const extendedApi = api.injectEndpoints({
    endpoints: (build) => ({
        getAllUsers: build.query<getAllUsersResponse, Record<string, boolean | null>>({
            query: (isActive) => ({
                url: 'user',
                params: isActive,
            }),
        }),
    }),
    overrideExisting: false,
});

export const { useGetAllUsersQuery } = extendedApi;
