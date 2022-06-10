import { CustomerModel } from '../../models/customerModels';
import { api } from './../api';

interface getAllCustomersResponse {
    error?: string;
    message?: string;
    result?: CustomerModel[];
}

interface getOneCustomerResponse {
    error?: string
    message?: string
    result?: CustomerModel
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
        getOneCustomer: build.query<
            getOneCustomerResponse,
            string
            >({
            query: (clientId) => ({
                url: `customer/${clientId}`,
            }),
            providesTags: [{ type: 'Customers', id: 'LIST' }],
        }),
    }),
    overrideExisting: false,
});

export const {
    useGetAllCustomersQuery,
    useGetOneCustomerQuery
} = extendedApi;