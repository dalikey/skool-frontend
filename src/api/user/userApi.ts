import { RegistrationModel, UserModel } from '../../models/userModels';
import { api } from './../api';

interface getAllUsersResponse {
    error?: string;
    message?: string;
    result?: RegistrationModel[] | UserModel[];
}

const extendedApi = api.injectEndpoints({
    endpoints: (build) => ({
        getAllUsers: build.query<
            getAllUsersResponse,
            Record<string, boolean | null>
        >({
            query: (isActive) => ({
                url: 'user',
                params: isActive,
            }),
            providesTags: [{ type: 'Users', id: 'LIST' }],
        }),
        getUserProfile: build.query<void, void>({
            query: () => ({
                url: `user/@me`,
            }),
        }),
        activateUser: build.mutation<void, string>({
            query: (id) => ({
                url: `user/${id}/activate`,
                method: 'POST',
            }),
            invalidatesTags: [{ type: 'Users', id: 'LIST' }],
        }),
        deactivateUser: build.mutation<void, string>({
            query: (id) => ({
                url: `user/${id}/deactivate`,
                method: 'POST',
            }),
            invalidatesTags: [{ type: 'Users', id: 'LIST' }],
        }),
    }),
    overrideExisting: false,
});

export const {
    useGetAllUsersQuery,
    useGetUserProfileQuery,
    useActivateUserMutation,
    useDeactivateUserMutation,
} = extendedApi;
