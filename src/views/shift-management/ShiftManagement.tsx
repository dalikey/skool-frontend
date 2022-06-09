import {Box, Button, Fab, Paper, Tab, Tabs, } from '@mui/material';
import { useState } from 'react';
import { useGetAllUsersQuery } from '../../api/user/userApi';
import ConfirmDialog from '../../components/dialog/ConfirmDialog';
import { UserModel } from '../../models/userModels';
import { useNavigate } from 'react-router-dom';
import {Add} from "@mui/icons-material";



const ShiftManagement = () => {
    const navigate = useNavigate();

    const handleAddShift = () => {
        navigate('shift-aanmaken');
    }

    return (
        <Paper sx={{ width: '100%' }}>
            <Fab onClick={handleAddShift} color='primary' aria-label="shift-toevoegen">
                <Add></Add>
                </Fab>
        </Paper>
    );
};

export default ShiftManagement;
