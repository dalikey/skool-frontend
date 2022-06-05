import {
    RegistrationModel,
    LoginModel,
    CredentialsModel,
    ForgotPasswordModel,
    EmailModel,
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
        sendEmail: build.mutation<void, EmailModel>({
            query: (body) => ({
                url: 'auth/login/forgot',
                method: 'POST',
                body,
            }),
        }),
        forgotPassword: build.mutation<void, ForgotPasswordModel>({
            query: (body) => ({
                url: 'auth/login/password',
                method: 'PUT',
                body,
            }),
        }),
    }),
    overrideExisting: false,
});

export const {
    useRegisterMutation,
    useLoginMutation,
    useSendEmailMutation,
    useForgotPasswordMutation,
} = extendedApi;
