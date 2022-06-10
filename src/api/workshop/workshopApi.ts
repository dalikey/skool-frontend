import { WorkshopModel } from './../../models/workshopModels';
import { api } from './../api';

interface getAllWorkshopsResponse {
    message?: string;
    result?: WorkshopModel[];
}

const extendedApi = api.injectEndpoints({
    endpoints: (build) => ({
        getWorkshops: build.query<getAllWorkshopsResponse, void>({
            query: () => ({
                url: 'workshop',
            }),
        }),
    }),
    overrideExisting: false,
});

export const { useGetWorkshopsQuery } = extendedApi;
