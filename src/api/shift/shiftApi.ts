import { api } from './../api';
import {WorkshopShiftModel} from "../../models/workshopShiftModels";

interface createShiftResponse {
    error?: string;
    message?: string;
    result?: WorkshopShiftModel;
}

const extendedApi = api.injectEndpoints({
    endpoints: (build) => ({
        createShift: build.mutation<createShiftResponse, WorkshopShiftModel>({
            query: (body) => ({
                url: `workshop/shift`,
                method: 'POST',
                body
            }),
            invalidatesTags: [{ type: 'Shift', id: 'OBJECT' }],
        }),
    }),
    overrideExisting: false,
});

export const {
    useCreateShiftMutation,
} = extendedApi;
