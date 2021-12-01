import { useContext, useState } from "react";
import { AppContext } from "../../context/CreateAppContext";
import { Box, Modal, Button, Grid, FormControl, FormControlLabel, TextField, InputAdornment, Typography } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import DateAdapter from '@mui/lab/AdapterLuxon';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const ReOrderPatchesButton = ({ id, render, reRender, handleReOrder, open, getPatch }) => {
  const { patch, Item } = useContext(AppContext);
  const [name, setName] = useState(null);
  const [date, setDate] = useState(new Date());
  const [number, setNumber] = useState(null);
  const [amount, setAmount] = useState(null);
  const [member, setMember] = useState(null);

  
  const handleSubmit = async () => {
    const url=`/1rops/reorder/${id}`;
    const input = {
        amount_ordered: number,
        associated_member: member,
        expenditures: amount,
        reason: `${name} patch re-order`,
        date_ordered: date
    };
    await patch(url, input);
    setName(null);
    setDate(new Date());
    setNumber(null);
    setAmount(null);
    reRender(render + 1);
    getPatch(id);
    handleReOrder();
  };

  const patchForm = 
    <Item>
      <Typography variant='h5'>
          Re-Order Patches:
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
          label={`Date Re-Ordered: `}
          color='secondary'
          labelPlacement='start'
          control={
            <LocalizationProvider dateAdapter={DateAdapter}>
              <DatePicker
                label="re-order date"
                color='secondary'
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
          color='secondary'
          value={number} 
          labelPlacement='start'
          control={
            <TextField sx={{ m: 1, width: '25ch' }} color='secondary' label='Number' variant="outlined" onChange={(event) => setNumber(event.target.value)}/>
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

    return (
        <Grid item xs={10}>
        <Button color='secondary' variant='outlined' onClick={handleReOrder}>Re-Order Form</Button>
        <Modal
          open={open}
          onClose={handleReOrder}
          aria-labelledby="re-order-modal"
        >
          <Box sx={style}>
            {patchForm}
          </Box>
        </Modal>
      </Grid>
    );
};

export default ReOrderPatchesButton;