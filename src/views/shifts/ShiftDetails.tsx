import { Button, Grid, Typography } from "@mui/material";

const ShiftDetails = () => {
  return (
    <Grid container width="50%" p={3}>
      <Grid item xs={12} md={6} p={1}>
        <Typography variant="h5">Titel</Typography>
      </Grid>
      <Grid item xs={12} md={6} p={1}>
        <Typography>24-05-2022 13:00 - 15:00</Typography>
      </Grid>
      <Grid item xs={12} p={1}>
        <Typography>Onderwerp - type</Typography>
      </Grid>
      <Grid item xs={12} p={1}>
        <Typography>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Non dolor
          laborum, voluptates expedita eum ab facere in maxime eveniet
          perferendis deleniti placeat, magnam necessitatibus quas deserunt.
          Distinctio asperiores quo eligendi!Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Non dolor laborum, voluptates expedita
          eum ab facere in maxime eveniet perferendis deleniti placeat, magnam
          necessitatibus quas deserunt. Distinctio asperiores quo eligendi!Lorem
          ipsum dolor sit amet consectetur adipisicing elit. Non dolor laborum,
          voluptates expedita eum ab facere in maxime eveniet perferendis
          deleniti placeat, magnam necessitatibus quas deserunt. Distinctio
          asperiores quo eligendi!
        </Typography>
      </Grid>
      <Grid item xs={12} md={6} p={1}>
        <Typography>GOOGLE MAPS IMPLEMENTATIE</Typography>
      </Grid>
      <Grid item xs={12} md={6} p={1}>
        <Typography variant="h5">Adres</Typography>
        <Typography>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veniam ullam
          reprehenderit rerum, dolor pariatur autem deserunt, vitae voluptatibus
          nam eaque earum quasi cumque praesentium cupiditate aut fugiat saepe
          nobis! Quaerat.
        </Typography>
      </Grid>
      <Grid item xs={12} md={6} p={1}>
        <Button variant="contained">Inschrijven</Button>
      </Grid>
      <Grid item xs={12} md={6} p={1}>
        <Typography variant="h5">Loon: €69,00</Typography>
      </Grid>
    </Grid>
  );
};

export default ShiftDetails;
