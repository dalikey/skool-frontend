import { api } from '../api';
import {TemplateModel} from "../../models/templateModels";

interface getAllTemplatesResponse {
    error?: string;
    message?: string;
    result?: TemplateModel[];
    rows?: Array<string>
}

const extendedApi = api.injectEndpoints({
    endpoints: (build) => ({
        getAllTemplates: build.query<
            getAllTemplatesResponse,
            void
        >({
            query: () => ({
                url: 'templateMessage',
            }),
            providesTags: [{ type: 'Templates', id: 'LIST' }],
        }),
        createTemplate: build.mutation<void, TemplateModel>({
            query: (body) => ({
                url: `templateMessage`,
                method: 'POST',
                body,
            }),
            invalidatesTags: [{ type: 'Templates', id: 'LIST' }],
        }),
        updateTemplate: build.mutation<TemplateModel, TemplateModel>({
            query: (body) => ({
                url: `templateMessage/${body._id}/update`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: [{ type: 'Templates', id: 'LIST' }],
        }),
        deleteTemplate: build.mutation<TemplateModel, TemplateModel>({
            query: (template) => ({
                url: `templateMessage/${template._id}/delete`,
                method: 'DELETE',
            }),
            invalidatesTags: [{ type: 'Templates', id: 'LIST' }],
        }),
    }),
    overrideExisting: false,
});

export const {
    useGetAllTemplatesQuery,
    useCreateTemplateMutation,
    useUpdateTemplateMutation,
    useDeleteTemplateMutation,
} = extendedApi;
