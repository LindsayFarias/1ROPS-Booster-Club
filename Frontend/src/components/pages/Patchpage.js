import { useEffect, useContext, useState } from "react";
import { AppContext } from "../../context/CreateAppContext";
import { Card, CardContent, CardActions, Typography, Button, Box, Grid, FormControl, FormControlLabel, TextField, InputAdornment } from '@mui/material';
import { Link } from 'react-router-dom';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import DateAdapter from '@mui/lab/AdapterLuxon';


const Patchpage = ({patches, getPatches}) => {
  const { Item, post } = useContext(AppContext);
  const [name, setName] = useState(null);
  const [number, setNumber] = useState(null);
  const [date, setDate] = useState(new Date());
  const [amount, setAmount] = useState(null);
  const [income, setIncome] = useState(null);
  const [sold, setSold] = useState(null);
  const [member, setMember] = useState(null);
  const [render, reRender] = useState(0);

  useEffect(() => {
    getPatches();
  }, []);

  useEffect(() => {
    console.log('Name', name);
  }, [name, number, date, amount, income, sold, member])

  const handleSubmit = async () => {

    const input = {
      patchName: name,
      amount_ordered: number,
      amount_sold: sold,
      income: income,
      reason: `${name} patches`,
      expenditures: amount,
      date_ordered: date,
      associated_member: member
    }

    await post(`/1rops/patches`, input);

    setName(null);
    setAmount(null);
    setIncome(null);
    setDate(new Date());
    setSold(null);
    setMember(null);
    setNumber(null);

    getPatches();
    reRender(render + 1);
  }

  const patchList = patches !== null ?
    patches.map(patch => {
      return(
      <Grid item xs={12} med={6} lg={4}>
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
            <Link to={`/patches/${patch.id}`}><Button color='secondary' variant="outlined" size="small">Details</Button></Link>
          </CardActions>
        </Card>
      </Grid>
    )})
  : <h3>No Patches Available</h3>;
  
  const patchForm = 
    <Item>
      <Typography variant='h6'>
        Create a New Patch Entry
      </Typography>
      <FormControl>
        <FormControlLabel
          label={`Patch Name: `}
          color='secondary'
          value={name} 
          labelPlacement='start'
          control={
            <TextField sx={{ m: 1, width: '25ch' }} color='secondary' label='Name' variant="outlined" onChange={(event) => setName(event.target.value)}/>
        } />
      </FormControl>
      <FormControl>
        <FormControlLabel
          label={`Date Ordered: `}
          labelPlacement='start'
          color='secondary'
          control={
            <LocalizationProvider color='secondary' dateAdapter={DateAdapter}>
              <DatePicker
                label="Date"
                value={date}
                color='secondary'
                onChange={(newValue) => {
                setDate(newValue);
                }}
                renderInput={(params) => <TextField color='secondary' {...params} />}
              />
            </LocalizationProvider>
        } />
      </FormControl>
      <FormControl>
        <FormControlLabel
          label={`Number of Patches Ordered: `}
          value={number} 
          color='secondary'
          labelPlacement='start'
          control={
            <TextField sx={{ m: 1, width: '25ch' }} color='secondary' label='Number' variant="outlined" onChange={(event) => setNumber(event.target.value)}/>
        } />
      </FormControl>
      <FormControl>
        <FormControlLabel
          label={`Number of Patches Sold: `}
          value={sold} 
          labelPlacement='start'
          color='secondary'
          control={
            <TextField sx={{ m: 1, width: '25ch' }} color='secondary' label='Number' variant="outlined" onChange={(event) => setSold(event.target.value)}/>
        } />
      </FormControl>
      <FormControl>
        <FormControlLabel
          label={`Cost of Patches: `}
          labelPlacement='start'
          color='secondary'
          control={
            <TextField 
              sx={{ m: 1, width: '25ch' }}
              value={amount}
              color='secondary'  
              id='amount'
              label='Amount'
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
              }}
              variant="outlined" 
              onChange={(event) => setAmount(event.target.value)}/>
        } />
      </FormControl>
      <FormControl>
        <FormControlLabel
          label={`Money Made: `}
          labelPlacement='start'
          color='secondary'
          control={
            <TextField 
              sx={{ m: 1, width: '25ch' }}
              value={income}
              color='secondary' 
              id='amount'
              label='Amount'
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
              }}
              variant="outlined" 
              onChange={(event) => setIncome(event.target.value)}/>
        } />
      </FormControl>
      <FormControl>
        <FormControlLabel
          label={`POC: `}
          color='secondary'
          value={member} 
          labelPlacement='start'
          control={
            <TextField sx={{ m: 1, width: '30ch' }} color='secondary' label='Name' variant="outlined" onChange={(event) => setMember(event.target.value)}/>
          } />
      </FormControl>
      <Button color='secondary' onClick={() => handleSubmit()} variant='outlined'>Submit</Button>
    </Item>

  return(
    <div>
      <Typography variant='h3'>Patches</Typography> <br/>
      <Box display='flex'>
        <Grid container spacing={1} maxWidth='xlg' style={{width: '70%'}}>
        {patchList}
        </Grid>
        <Grid container spacing={2} maxWidth='xlg' style={{width: '30%'}}>
          {patchForm}
        </Grid>
      </Box>
    </div>
  );
};

export default Patchpage;