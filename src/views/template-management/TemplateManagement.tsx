import { Box, Paper, Tab, Tabs } from '@mui/material';
import FormDialog, { formDialog } from '../../components/dialog/FormDialog';
import TemplateForm from './TemplateForm';
import AddIcon from '@mui/icons-material/Add';
import { useGetAllTemplatesQuery } from '../../api/template/templateApi';
import { TemplateModel } from '../../models/templateModels';
import TemplatesTable from './TemplatesTable';
import ConfirmDialog from '../../components/dialog/ConfirmDialog';

const TemplateManagement = () => {
    const openTemplateForm = () => {
        formDialog(
            'Template toevoegen',
            <TemplateForm triggers={data?.rows} />
        );
    };

    const { data, isLoading } = useGetAllTemplatesQuery();

    return (
        <Paper sx={{ width: '100%' }}>
            <ConfirmDialog />
            <FormDialog />
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={0} aria-label='basic tabs example'>
                    <Tab label='TEMPLATES' />
                    <Tab
                        onClick={() => openTemplateForm()}
                        aria-label='add'
                        sx={{ padding: 2, marginLeft: 'auto' }}
                        icon={<AddIcon color='primary' />}
                    />
                </Tabs>
            </Box>
            <TemplatesTable
                isLoading={isLoading}
                triggers={data?.rows}
                templates={data?.result as TemplateModel[]}
            />
        </Paper>
    );
};

export default TemplateManagement;
