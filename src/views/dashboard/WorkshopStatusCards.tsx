import { Grid, Paper } from "@mui/material";
import { theme } from "../../app/theme";

const WorkshopStatusCards = () => {
    return (
        <>
        <Grid container spacing={3} alignItems="stretch">
            <Grid item xs={4}>
                <Paper sx={{backgroundColor: theme.palette.primary.main, py: 3}}>
                    Openstaand <br/>
                    -
                </Paper>
            </Grid>
            <Grid item xs={4}>
                <Paper sx={{backgroundColor: theme.palette.primary.main, py: 3}}>
                    In afwachting <br/>
                    -
                </Paper >    
            </Grid>
            <Grid item xs={4}>
                <Paper sx={{backgroundColor: theme.palette.primary.main, py: 3}}>
                    Afgerond <br/>
                    -
                </Paper>
            </Grid>
        </Grid>
        </>
    );
};

export default WorkshopStatusCards;