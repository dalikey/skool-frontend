import { api } from './../api';
import {RetrievedWorkshopShiftModel, WorkshopShiftModel} from "../../models/workshopShiftModels";

interface createShiftResponse {
    error?: string;
    message?: string;
    result?: RetrievedWorkshopShiftModel | RetrievedWorkshopShiftModel[];
}

const extendedApi = api.injectEndpoints({
    endpoints: (build) => ({
        createShift: build.mutation<createShiftResponse, WorkshopShiftModel>({
            query: (body) => ({
                url: `workshop/shift`,
                method: 'POST',
                body,
            }),
            invalidatesTags: [{ type: 'Shift', id: 'OBJECT' }],
        }),
        getAllShifts: build.query<
            createShiftResponse,
            Record<string, boolean | null>
            >({
            query: (isActive) => ({
                url: 'workshop/shift',
                params: isActive,
            }),
            providesTags: [{ type: 'Shift', id: 'LIST' }],
        }),
    }),
    overrideExisting: false,
});

export const {
    useCreateShiftMutation,
    useGetAllShiftsQuery
} = extendedApi;
