import { Typography, Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const AppointmentHeader = ({ appointmentData, toggleVisibilty }) => {
    return (
        <Box
            display='flex'
            justifyContent='space-between'
            alignItems='center'
            px={2}
            pt={2}
        >
            <Typography variant='h6'>Workshopdocent Graffiti - {appointmentData.workshop.level}</Typography>
            <IconButton onClick={toggleVisibilty}>
                <CloseIcon />
            </IconButton>
        </Box>
    );
};

export default AppointmentHeader;
