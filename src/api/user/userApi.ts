import { CredentialsModel } from '../../models/authModels';
import { api } from './../api';
interface loginResponse {
    status: number;
    result?: CredentialsModel;
    error?: string;
}
const extendedApi = api.injectEndpoints({
    endpoints: (build) => ({
        getAllUsers: build.query<loginResponse, void>({
            query: () => ({
                url: 'user',
                token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOTcyYzUwYmU3MzgzODEyZTI1ZTlhZiIsInJvbGUiOiJvd25lciIsImlhdCI6MTY1NDI0OTQ5OSwiZXhwIjoxNjU0MzM1ODk5fQ.LdNCM-eqbk0HoTiFh2YW_BPucnjIm9ziDa_pDRFwBlQ',
            }),
        }),
    }),
    overrideExisting: false,
});

export const { useGetAllUsersQuery } = extendedApi;
