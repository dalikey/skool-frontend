import {IconButton, TableCell} from '@mui/material';
import Row from '../../components/table/Row';
import Table from '../../components/table/Table';
import FormDialog, { formDialog } from '../../components/dialog/FormDialog';
import ConfirmDialog, {
    confirmDialog,
} from '../../components/dialog/ConfirmDialog';
import {TemplateModel} from "../../models/templateModels";
import CollapsibleRow from "../../components/table/CollapsibleRow";
import {Delete, Edit} from "@mui/icons-material";
import {useDeleteTemplateMutation} from "../../api/template/templateApi";
import TemplateForm from "./TemplateForm";

interface TemplatesTableProps {
    isLoading: boolean;
    templates?: TemplateModel[];
    triggers?: string[]
}



const TemplatesTable = ({ isLoading, templates, triggers }: TemplatesTableProps) => {

    const [deleteTemplate] = useDeleteTemplateMutation();

    const handleClickDelete = (template) => {
        confirmDialog('Template verwijderen', `Weet u zeker dat u template ${template.title} wilt verwijderen?`,
            () => {deleteTemplate(template);})

    }

    const openEditTemplateForm = (template) => {
        formDialog('Template bewerken', <TemplateForm triggers={triggers} template={template}/>);
    }

    return (
        <>
            <FormDialog />
            <ConfirmDialog />
            <Table
                columns={['Naam', 'Trigger', 'Acties']}
                isLoading={isLoading}
            >
                {templates &&
                    templates.map((template) => (
                        <CollapsibleRow innerContent={<div dangerouslySetInnerHTML={{__html: template.content}}></div>} key={template._id}>
                            <TableCell>{template.title}</TableCell>
                            <TableCell>{template.trigger}</TableCell>
                            <TableCell>
                                <IconButton
                                        aria-label='edit'
                                        color='secondary'
                                        onClick={() => openEditTemplateForm(template)}
                                >
                                        <Edit />
                                    </IconButton>
                                <IconButton
                                    aria-label='delete'
                                    color='secondary'
                                    onClick={() => handleClickDelete(template)}
                                >
                                    <Delete />
                                </IconButton>
                            </TableCell>
                        </CollapsibleRow>
                    ))}
                {templates?.length === 0 && (
                    <Row>
                        <TableCell>
                            Er zijn geen templates beschikbaar.
                        </TableCell>
                    </Row>
                )}
            </Table>
        </>
    );
};

export default TemplatesTable;
