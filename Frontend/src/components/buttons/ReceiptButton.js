import { FormControlLabel, Grid, Modal, Typography, TextField, InputAdornment, OutlinedInput, InputLabel, FormControl, Button, Box  } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/CreateAppContext';
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

function ReceiptButton({ eventId, receiptOpen, open, receiptClose}) {
  const { post } = useContext(AppContext);
  const [reason, setReason ] = useState(null);
  const [name, setName ] = useState(null);
  const [expenditure, setExpenditure ] = useState(null);
  const [date, setDate] = useState(new Date())

  useEffect((reasonInput) => {
    console.log('reason', reason);
    console.log('name', name);
    console.log('expenditure', expenditure);
  }, [reason, name, expenditure]);


  const submitPost = () => {
    let receipt = {
      reason: reason,
      expenditures: expenditure,
      associated_member: name,
      date: date
    };
    const url = `/1rops/${eventId}`;
    post(url, receipt);
    setReason(null);
    setName(null);
    setExpenditure(null);
    setDate(new Date());
    receiptClose();
  };

  return (
    <Grid item xs={10}>
      <Button color='secondary' variant='outlined' onClick={receiptOpen}>Add Receipt</Button>
      <Modal
        open={open}
        onClose={receiptClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add New Receipt
          </Typography>
          <form id="modal-modal-description">
            <Typography sx={{p: 1}}>Reason:
              <TextField color='secondary' sx={{mx: 2}}required id="outlined-required" variant="outlined" label='Reason' onChange={(event) => setReason(event.target.value)}/> 
            </Typography>
            <Typography sx={{p: 1}}>Expenditure:
              <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                <InputLabel color='secondary' htmlFor="outlined-adornment-amount">Amount</InputLabel> 
                  <OutlinedInput color='secondary' id="outlined-adornment-amount" startAdornment={<InputAdornment position="start">$</InputAdornment>} label="Amount" 
                  onChange={(event) => setExpenditure(event.target.value)}/>
              </FormControl>
            </Typography>
            <FormControl>
            <FormControlLabel
              label={`Date: `}
              color='secondary'
              labelPlacement='start'
              control={
                <LocalizationProvider dateAdapter={DateAdapter}>
                  <DatePicker
                    label="Date"
                    value={date}
                    onChange={(newValue) => {
                      setDate(newValue);
                    }}
                    renderInput={(params) => <TextField color='secondary' {...params} />}
                  />
                </LocalizationProvider>
              } />
            </FormControl>
            <Typography sx={{p: 1}}>Associated Member: 
              <TextField color='secondary' sx={{mx: 1}} required id="outlined-required" variant="outlined" label='Name' onChange={(event) => setName(event.target.value)}/>
            </Typography>
            <Button color='secondary' onClick={()=> submitPost()} style={{float: 'right'}}variant='outlined'>Submit Receipt</Button>
          </form>
        </Box>
      </Modal>
    </Grid>
  )
}

export default ReceiptButton;