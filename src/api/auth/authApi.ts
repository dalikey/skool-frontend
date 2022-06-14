import {
    RegistrationModel,
    LoginModel,
    CredentialsModel,
} from '../../models/authModels';
import { api } from './../api';

interface loginResponse {
    status: number;
    result?: CredentialsModel;
    error?: string;
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
    }),
    overrideExisting: false,
});

export const { useRegisterMutation, useLoginMutation } = extendedApi;
