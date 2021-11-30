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
            <Link to={`/patches/${patch.id}`}><Button variant="outlined" size="small">Details</Button></Link>
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
          value={name} 
          labelPlacement='start'
          control={
            <TextField sx={{ m: 1, width: '25ch' }} label='Name' variant="outlined" onChange={(event) => setName(event.target.value)}/>
        } />
      </FormControl>
      <FormControl>
        <FormControlLabel
          label={`Date Ordered: `}
          labelPlacement='start'
          control={
            <LocalizationProvider dateAdapter={DateAdapter}>
              <DatePicker
                label="Basic example"
                value={date}
                onChange={(newValue) => {
                setDate(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
        } />
      </FormControl>
      <FormControl>
        <FormControlLabel
          label={`Number of Patches Ordered: `}
          value={number} 
          labelPlacement='start'
          control={
            <TextField sx={{ m: 1, width: '25ch' }} label='Number' variant="outlined" onChange={(event) => setNumber(event.target.value)}/>
        } />
      </FormControl>
      <FormControl>
        <FormControlLabel
          label={`Number of Patches Sold: `}
          value={sold} 
          labelPlacement='start'
          control={
            <TextField sx={{ m: 1, width: '25ch' }} label='Number' variant="outlined" onChange={(event) => setSold(event.target.value)}/>
        } />
      </FormControl>
      <FormControl>
        <FormControlLabel
          label={`Cost of Patches: `}
          labelPlacement='start'
          control={
            <TextField 
              sx={{ m: 1, width: '25ch' }}
              value={amount}  
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
          control={
            <TextField 
              sx={{ m: 1, width: '25ch' }}
              value={income} 
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
          value={member} 
          labelPlacement='start'
          control={
            <TextField sx={{ m: 1, width: '30ch' }} label='Name' variant="outlined" onChange={(event) => setMember(event.target.value)}/>
          } />
      </FormControl>
      <Button onClick={() => handleSubmit()} variant='outlined'>Submit</Button>
    </Item>

  return(
    <div>
      <h1>Patches</h1>
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