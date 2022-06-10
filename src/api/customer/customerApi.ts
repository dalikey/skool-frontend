import { CustomerModel } from '../../models/customerModels';
import { api } from './../api';

interface getAllCustomersResponse {
    error?: string;
    message?: string;
    result?: CustomerModel[];
}

const extendedApi = api.injectEndpoints({
    endpoints: (build) => ({
        getAllCustomers: build.query<
            getAllCustomersResponse,
            void
        >({
            query: () => ({
                url: 'customer',
            }),
            providesTags: [{ type: 'Customers', id: 'LIST' }],
        }),
        createCustomer: build.mutation<void, CustomerModel>({
            query: (body) => ({
                url: 'customer',
                method: 'POST',
                body,
            }),
        }),
    }),
    overrideExisting: false,
});

export const {
    useGetAllCustomersQuery,
    useCreateCustomerMutation,
} = extendedApi;