import { Grid, Paper, styled } from "@mui/material";
import WorkshopStatusCards from "../../components/dashboard/WorkshopStatusCards";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body1,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  elevation: 3,
}));

const Board = () => {
    return (
      <Grid container spacing={3} alignItems="stretch">
      <Grid item md={6} xs={12}>
        <Item sx={{mb: 1}}>
        rooster <br/>
        rooster <br/>
        rooster <br/>
        rooster <br/>
        rooster <br/>
        </Item>
        <Item sx={{mb: 3}}></Item>
      </Grid>
      <Grid item columnSpacing={3} md={6} xs={12}>
        <Item sx={{mb: 3}}>
          <WorkshopStatusCards/>
        </Item>
      </Grid>
    </Grid>
  )
}

export default Board;