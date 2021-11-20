import { useEffect } from "react";
import { Card, CardContent, CardActions, Typography, Button, Box, Grid } from '@mui/material';


const Patchpage = ({patches, getPatches}) => {

  useEffect(() => {
    getPatches();
  }, []);

  const patchList = patches !== null ?
    patches.map(patch => {
      return(
      <Grid item xs={3}>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              {patch.patchName}
            </Typography>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Remaining: {patch.amount_ordered - patch.amount_sold} patches
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Details</Button>
          </CardActions>
        </Card>
      </Grid>
    )})
  : <h3>No Patches Available</h3>;

  return(
    <div>
      <h1>Patches</h1>
      <Box display='flex'>
        <Grid container spacing={2} maxWidth='xlg'>
        {patchList}
        </Grid>
      </Box>
    </div>
  );
};

export default Patchpage;