import { UserProfileModel } from './../../models/userModels';
import { RegistrationModel, UserModel } from '../../models/userModels';
import { api } from './../api';

interface getAllUsersResponse {
    error?: string;
    message?: string;
    result?: RegistrationModel[] | UserModel[];
}

interface getUserProfileResponse {
    result?: UserProfileModel;
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
        getPersonalProfile: build.query<getUserProfileResponse, void>({
            query: () => ({
                url: `user/@me`,
            }),
            providesTags: [{ type: 'Users', id: 'PROFILE' }],
        }),
        getUserProfile: build.query<getUserProfileResponse, string>({
            query: (id) => ({
                url: `user/${id}`,
            }),
            providesTags: [{ type: 'Users', id: 'PROFILE' }],
        }),
        updateUserProfile: build.mutation<void, UserProfileModel>({
            query: (userProfile) => ({
                url: `user/${userProfile._id}`,
                method: 'PUT',
                body: userProfile,
            }),
            invalidatesTags: [
                { type: 'Users', id: 'PROFILE' },
                { type: 'Users', id: 'LIST' },
            ],
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
    useGetPersonalProfileQuery,
    useActivateUserMutation,
    useDeactivateUserMutation,
    useUpdateUserProfileMutation,
    useGetUserProfileQuery,
} = extendedApi;
