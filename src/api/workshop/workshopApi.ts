import { Workshop } from './../../models/workshopModels';
import { api } from './../api';

const extendedApi = api.injectEndpoints({
    endpoints: (build) => ({
        createWorkshop: build.mutation<void, Workshop>({
            query: (body) => ({
                url: `workshop/add`,
                method: 'POST',
                body
            }),
            invalidatesTags: [{ type: 'Workshops', id: 'LIST' }],
        }),
    }),
    overrideExisting: false,
});

export const {
    useCreateWorkshopMutation
} = extendedApi;
