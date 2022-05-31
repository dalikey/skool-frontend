import { RegistrationModel } from '../../models/authModels';
import { api } from './../api';

const extendedApi = api.injectEndpoints({
    endpoints: (build) => ({
        register: build.mutation<void, RegistrationModel>({
            query: (body) => ({
                url: 'auth/register',
                method: 'POST',
                body,
            }),
        }),
    }),
    overrideExisting: false,
});

export const { useRegisterMutation } = extendedApi;
