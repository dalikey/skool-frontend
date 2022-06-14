import { WorkshopModel } from '../../models/workshopModels';
import { api } from './../api';

interface getAllWorkshopsResponse {
    error?: string;
    message?: string;
    result?: WorkshopModel[];
}

const extendedApi = api.injectEndpoints({
    endpoints: (build) => ({
        getAllWorkshops: build.query<
            getAllWorkshopsResponse,
            Record<string, boolean | null>
        >({
            query: (isActive) => ({
                url: 'workshop',
                params: isActive,
            }),
            providesTags: [{ type: 'Workshops', id: 'LIST' }],
        }),
        updateWorkshop: build.mutation<void, WorkshopModel>({
            query: (workshop) => ({
                url: `workshop/${workshop._id}/update`,
                method: 'PUT',
                body: workshop,
            }),
            invalidatesTags: [{ type: 'Workshops', id: 'LIST' }],
        }),
        createWorkshop: build.mutation<void, WorkshopModel>({
            query: (body) => ({
                url: `workshop/add`,
                method: 'POST',
                body,
            }),
            invalidatesTags: [{ type: 'Workshops', id: 'LIST' }],
        }),
        deleteWorkshop: build.mutation<void, string>({
            query: (id) => ({
                url: `workshop/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: [{ type: 'Workshops', id: 'LIST' }],
        }),
        signInWorkshop: build.mutation<void, string>({
            query: (id) => ({
                url: `workshop/shift/${id}/enroll`,
                method: 'POST',
            }),
            invalidatesTags: [{type: 'Workshops', id: 'OBJECT'}],
        }),
        signOutWorkshop: build.mutation<void, string>({
            query: (id) => ({
                url: `workshop/shift/${id}/enroll`,
                method: 'POST',
            }),
            invalidatesTags: [{type: 'Workshops', id: 'OBJECT'}],
        }),
    }),
    overrideExisting: false,
});

export const {
    useGetAllWorkshopsQuery,
    useUpdateWorkshopMutation,
    useCreateWorkshopMutation,
    useDeleteWorkshopMutation,
    useSignInWorkshopMutation,
    useSignOutWorkshopMutation
} = extendedApi;
