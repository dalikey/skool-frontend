import { api } from './../api';
import {RetrievedWorkshopShiftModel, WorkshopShiftModel} from "../../models/workshopShiftModels";
import {NonExistingModel} from "../../models/authModels";

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


const extendedApi = api.injectEndpoints({
    endpoints: (build) => ({
        createShift: build.mutation<createShiftResponse, WorkshopShiftModel | RetrievedWorkshopShiftModel>({
            query: (body) => ({
                url: `workshop/shift`,
                method: 'POST',
                body,
            }),
            invalidatesTags: [{ type: 'Shift', id: 'OBJECT' }],
        }),
        editShift: build.mutation<createShiftResponse, WorkshopShiftModel | RetrievedWorkshopShiftModel>({
            query: (body) => ({
                url: `workshop/shift/${body._id}/update`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: [{ type: 'Shift', id: 'OBJECT' }],
        }),
        deleteShift: build.mutation<void, string>({
            query: (shift_id) => ({
                url: `workshop/shift/${shift_id}/delete`,
                method: 'DELETE',
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
        }),
        signInWorkshop: build.mutation<void, string>({
            query: (id) => ({
                url: `workshop/shift/${id}/enroll`,
                method: 'POST',
            }),
            invalidatesTags: [{type: 'Workshops', id: 'OBJECT'}],
        }),
        signOutWorkshop: build.mutation<void, unEnrollRequestBody>({
            query: ({id, user_id}) => ({
                url: `workshop/shift/${id}/enroll/${user_id}/enroll/delete`,
                method: 'PUT',
            }),
            invalidatesTags: [{type: 'Workshops', id: 'OBJECT'}],
        }),
        confirmEnrollment: build.mutation<void, unEnrollRequestBody>({
            query: ({id, user_id}) => ({
                url: `workshop/shift/${id}/enroll/${user_id}/confirm`,
                method: 'PUT',
            }),
            invalidatesTags: [{type: 'Workshops', id: 'OBJECT'}],
        }),
        rejectEnrollment: build.mutation<void, unEnrollRequestBody>({
            query: ({id, user_id}) => ({
                url: `workshop/shift/${id}/enroll/${user_id}/rejected`,
                method: 'PUT',
            }),
            invalidatesTags: [{type: 'Workshops', id: 'OBJECT'}],
        }),
        cancelParticipation: build.mutation<void, unEnrollRequestBody>({
            query: ({id, user_id}) => ({
                url: `workshop/shift/${id}/enroll/${user_id}/canceled`,
                method: 'PUT',
            }),
            invalidatesTags: [{type: 'Workshops', id: 'OBJECT'}],
        }),
        doneParticipation: build.mutation<void, unEnrollRequestBody>({
            query: ({id, user_id}) => ({
                url: `workshop/shift/${id}/enroll/${user_id}/onDone`,
                method: 'PUT',
            }),
            invalidatesTags: [{type: 'Workshops', id: 'OBJECT'}],
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
    useDoneParticipationMutation
} = extendedApi;
