import { Box, Paper, Tab, Tabs, IconButton } from '@mui/material';
import FormDialog, { formDialog } from '../../components/dialog/FormDialog';
import TemplateForm from './TemplateForm';
import AddIcon from '@mui/icons-material/Add';
import {useGetAllTemplatesQuery} from "../../api/template/templateApi";
import {TemplateModel} from "../../models/templateModels";
import TemplatesTable from "./TemplatesTable";
import ConfirmDialog from "../../components/dialog/ConfirmDialog";


const TemplateManagement = () => {
    const openTemplateForm = () => {
        formDialog('Template toevoegen', <TemplateForm triggers={data?.rows} />);
    };

    const { data, isLoading } = useGetAllTemplatesQuery();


    return (
            <Paper sx={{ width: '100%' }}>
                <ConfirmDialog />
                <FormDialog />
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs
                        value={0}
                        aria-label='basic tabs example'
                    >
                        <Tab label='TEMPLATES' />
                        <IconButton
                            onClick={openTemplateForm}
                            color='primary'
                            sx={{ padding: 2, marginLeft: 'auto' }}
                        >
                            <AddIcon>Add</AddIcon>
                        </IconButton>
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
