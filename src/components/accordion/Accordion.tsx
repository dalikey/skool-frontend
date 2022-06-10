import {
    Accordion as MuiAccordion,
    AccordionSummary,
    AccordionDetails,
    Box,
    Typography,
    Stack,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ReactElement } from 'react';

interface AccordionProps {
    title: string;
    icon: ReactElement;
    children: ReactElement;
}

const Accordion = ({ title, children, icon }: AccordionProps) => {
    return (
        <MuiAccordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls='panel-content'
                id='panel-header'
            >
                <Stack>
                    <Box display='flex' alignItems='center'>
                        {icon}
                        <Typography pl={1} fontSize='16px' fontWeight='bold'>{title}</Typography>
                    </Box>
                </Stack>
            </AccordionSummary>
            <AccordionDetails>{children}</AccordionDetails>
        </MuiAccordion>
    );
};

export default Accordion;
