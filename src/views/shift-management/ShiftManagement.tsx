import {Box, Button, Fab, Paper, Tab, Tabs, } from '@mui/material';
import { useState } from 'react';
import { useGetAllUsersQuery } from '../../api/user/userApi';
import ConfirmDialog from '../../components/dialog/ConfirmDialog';
import { UserModel } from '../../models/userModels';
import { useNavigate } from 'react-router-dom';
import {Add} from "@mui/icons-material";
import FormDialog, { formDialog } from '../../components/dialog/FormDialog';
import { AddShiftForm } from '../../views/shift-management/AddShiftForm';


const ShiftManagement = () => {
    const navigate = useNavigate();

    const handleAddShift = () => {
        navigate('shift-aanmaken');
    }
    
    const openShiftForm = () => {
        formDialog('Shift toevoegen', <AddShiftForm/>);
    }
 
    return (
        <>
            <FormDialog />
            <Fab onClick={openShiftForm}><Add></Add></Fab>
        </>
    );
};

export default ShiftManagement;
