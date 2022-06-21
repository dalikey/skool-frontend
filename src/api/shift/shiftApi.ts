import { api } from './../api';
import {
    RetrievedWorkshopShiftModel,
    WorkshopShiftModel,
} from '../../models/workshopShiftModels';
import { NonExistingModel } from '../../models/authModels';

interface createShiftResponse {
    error?: string;
    message?: string;
    result?: RetrievedWorkshopShiftModel | RetrievedWorkshopShiftModel[];
}

interface enrollRequestBody {
    id: string;
    body: NonExistingModel;
}

interface unEnrollRequestBody {
    id: string;
    user_id: string;
}

interface getAllShiftsResponse {
    error?: string;
    message?: string;
    result?: RetrievedWorkshopShiftModel[];
}

const extendedApi = api.injectEndpoints({
    endpoints: (build) => ({
        createShift: build.mutation<
            createShiftResponse,
            WorkshopShiftModel | RetrievedWorkshopShiftModel
        >({
            query: (body) => ({
                url: `workshop/shift`,
                method: 'POST',
                body,
            }),
            invalidatesTags: [{ type: 'Shift', id: 'LIST' }],
        }),
        editShift: build.mutation<
            createShiftResponse,
            WorkshopShiftModel | RetrievedWorkshopShiftModel
        >({
            query: (body) => ({
                url: `workshop/shift/${body._id}/update`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: [{ type: 'Shift', id: 'LIST' }],
        }),
        deleteShift: build.mutation<void, string>({
            query: (shift_id) => ({
                url: `workshop/shift/${shift_id}/delete`,
                method: 'DELETE',
            }),
            invalidatesTags: [{ type: 'Shift', id: 'LIST' }],
        }),
        getAllShifts: build.query<
            getAllShiftsResponse,
            Record<string, boolean | null>
        >({
            query: (isActive) => ({
                url: 'workshop/shift',
                params: isActive,
            }),
            providesTags: [{ type: 'Shift', id: 'LIST' }],
        }),
        getAllPersonalShifts: build.query<
            getAllShiftsResponse,
            void
        >({
            query: () => ({
                url: 'workshop/shift/@me',
            }),
            providesTags: [{ type: 'Shift', id: 'LIST' }],
        }),
        getAllShiftsAdmin: build.query<
            createShiftResponse,
            Record<string, boolean | null>
        >({
            query: (isActive) => ({
                url: 'workshop/shift/admin',
                params: isActive,
            }),
            providesTags: [{ type: 'Shift', id: 'LIST' }],
        }),
        addNonExisting: build.mutation<void, enrollRequestBody>({
            query: ({ id, body }) => ({
                url: `workshop/shift/${id}/enroll/invitation`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: [{ type: 'Shift', id: 'LIST' }],
        }),
        signInWorkshop: build.mutation<void, string>({
            query: (id) => ({
                url: `workshop/shift/${id}/enroll`,
                method: 'POST',
            }),
            invalidatesTags: [{ type: 'Shift', id: 'LIST' }],
        }),
        signOutWorkshop: build.mutation<void, unEnrollRequestBody>({
            query: ({ id, user_id }) => ({
                url: `workshop/shift/${id}/enroll/${user_id}/enroll/delete`,
                method: 'PUT',
            }),
            invalidatesTags: [{ type: 'Shift', id: 'LIST' }],
        }),
        confirmEnrollment: build.mutation<void, unEnrollRequestBody>({
            query: ({ id, user_id }) => ({
                url: `workshop/shift/${id}/enroll/${user_id}/confirm`,
                method: 'PUT',
            }),
            invalidatesTags: [{ type: 'Shift', id: 'LIST' }],
        }),
        rejectEnrollment: build.mutation<void, unEnrollRequestBody>({
            query: ({ id, user_id }) => ({
                url: `workshop/shift/${id}/enroll/${user_id}/rejected`,
                method: 'PUT',
            }),
            invalidatesTags: [{ type: 'Shift', id: 'LIST' }],
        }),
        cancelParticipation: build.mutation<void, unEnrollRequestBody>({
            query: ({ id, user_id }) => ({
                url: `workshop/shift/${id}/enroll/${user_id}/canceled`,
                method: 'PUT',
            }),
            invalidatesTags: [{ type: 'Shift', id: 'LIST' }],
        }),
        doneParticipation: build.mutation<void, unEnrollRequestBody>({
            query: ({ id, user_id }) => ({
                url: `workshop/shift/${id}/enroll/${user_id}/onDone`,
                method: 'PUT',
            }),
            invalidatesTags: [{ type: 'Shift', id: 'LIST' }],
        }),
    }),
    overrideExisting: false,
});

export const {
    useGetAllShiftsAdminQuery,
    useCreateShiftMutation,
    useGetAllShiftsQuery,
    useEditShiftMutation,
    useDeleteShiftMutation,
    useSignInWorkshopMutation,
    useSignOutWorkshopMutation,
    useAddNonExistingMutation,
    useCancelParticipationMutation,
    useRejectEnrollmentMutation,
    useConfirmEnrollmentMutation,
    useDoneParticipationMutation,
    useGetAllPersonalShiftsQuery,
} = extendedApi;
