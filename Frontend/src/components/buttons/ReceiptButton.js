import { Grid, Modal, Typography, TextField, InputAdornment, OutlinedInput, InputLabel, FormControl, Button, Box  } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/CreateAppContext';

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

  useEffect((reasonInput) => {
    console.log('reason', reason);
    console.log('name', name);
    console.log('expenditure', expenditure);
  }, [reason, name, expenditure]);


  const submitPost = () => {
    let receipt = {
      reason: reason,
      expenditures: expenditure,
      associated_member: name
    };
    const url = `/1rops/${eventId}`;
    post(url, receipt);
    setReason(null);
    setName(null);
    setExpenditure(null);
    receiptClose();
  };

  return (
    <Grid item xs={10}>
      <Button variant='outlined' onClick={receiptOpen}>Add Receipt</Button>
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
              <TextField sx={{mx: 2}}required id="outlined-required" variant="outlined" label='Reason' onChange={(event) => setReason(event.target.value)}/> 
            </Typography>
            <Typography sx={{p: 1}}>Expenditure:
              <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel> 
                  <OutlinedInput id="outlined-adornment-amount" startAdornment={<InputAdornment position="start">$</InputAdornment>} label="Amount" 
                  onChange={(event) => setExpenditure(event.target.value)}/>
              </FormControl>
            </Typography>
            <Typography sx={{p: 1}}>Associated Member: 
              <TextField sx={{mx: 1}} required id="outlined-required" variant="outlined" label='Name' onChange={(event) => setName(event.target.value)}/>
            </Typography>
            <Button onClick={()=> submitPost()} style={{float: 'right'}}variant='outlined'>Submit Receipt</Button>
          </form>
        </Box>
      </Modal>
    </Grid>
  )
}

export default ReceiptButton;