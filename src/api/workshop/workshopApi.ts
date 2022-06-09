import { WorkshopShiftModel } from '../../models/workshopShiftModels';
import { api } from './../api';

interface getAllShiftsResponse {
    error?: string;
    message?: string;
    result?: WorkshopShiftModel[] ;
}

const extendedApi = api.injectEndpoints({
    endpoints: (build) => ({
        getAllShifts: build.query<
            getAllShiftsResponse,
            Record<string, boolean | null>
        >({
            query: (isActive) => ({
                url: 'workshop/shift',
            }),
            providesTags: [{ type: 'Users', id: 'LIST' }],
        }),
        createShift: build.mutation<void, string>({
            query: (id) => ({
                url: `workshop/shift`,
                method: 'POST',
            }),
            invalidatesTags: [{ type: 'Users', id: 'LIST' }],
        }),
    }),
    overrideExisting: false,
});

export const {
    useGetAllShiftsQuery,
    useCreateShiftMutation,
} = extendedApi;
