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
        activateWorkshop: build.mutation<void, string>({
            query: (id) => ({
                url: `workshop/${id}/activate`,
                method: 'POST',
            }),
            invalidatesTags: [{ type: 'Workshops', id: 'LIST' }],
        }),
        deactivateWorkshop: build.mutation<void, string>({
            query: (id) => ({
                url: `workshop/${id}/deactivate`,
                method: 'POST',
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
    }),
    overrideExisting: false,
});

export const {
    useGetAllWorkshopsQuery,
    useActivateWorkshopMutation,
    useDeactivateWorkshopMutation,
    useCreateWorkshopMutation,
} = extendedApi;
