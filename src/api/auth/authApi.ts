import {
    RegistrationModel,
    LoginModel,
    CredentialsModel,
    NonExistingModel,
} from '../../models/authModels';
import { api } from './../api';

interface loginResponse {
    status: number;
    result?: CredentialsModel;
    error?: string;
}

interface enrollRequestBody {
    id: number;
    body: NonExistingModel;
}

const extendedApi = api.injectEndpoints({
    endpoints: (build) => ({
        register: build.mutation<void, RegistrationModel>({
            query: (body) => ({
                url: 'auth/register',
                method: 'POST',
                body,
            }),
        }),
        login: build.mutation<loginResponse, LoginModel>({
            query: (body) => ({
                url: 'auth/login',
                method: 'POST',
                body,
            }),
        }),
        addNonExisting: build.mutation<void, enrollRequestBody>({
            query: ({ id, body }) => ({
                url: `workshop/shift/${id}/enroll/unknownUser`,
                method: 'POST',
                body,
            }),
        }),
    }),
    overrideExisting: false,
});

export const {
    useRegisterMutation,
    useLoginMutation,
    useAddNonExistingMutation,
} = extendedApi;
