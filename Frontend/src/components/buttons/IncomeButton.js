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

function IncomeButton({ eventId, incomeOpen, open, incomeClose}) {
  const { patch } = useContext(AppContext);
  const [income, setIncome] = useState(null);

  useEffect(() => {
    console.log('income', income);
  }, [income]);


  const submitPost = () => {
    let update = {
      income: income,
    };
    const url = `/1rops/${eventId}`;
    patch(url, update);
    setIncome(null);
    incomeClose();
  };

  return (
    <Grid item xs={10}>
      <Button variant='outlined' onClick={incomeOpen}>Update Income</Button>
      <Modal
        open={open}
        onClose={incomeClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add to the Current Income:
          </Typography>
          <form id="modal-modal-description">
            <Typography sx={{p: 1}}>Income:
              <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel> 
                  <OutlinedInput id="outlined-adornment-amount" startAdornment={<InputAdornment position="start">$</InputAdornment>} label="Amount" 
                  onChange={(event) => setIncome(event.target.value)}/>
              </FormControl>
              </Typography>
            <Button onClick={()=> submitPost()} style={{float: 'right'}}variant='outlined'>Update Income</Button>
          </form>
        </Box>
      </Modal>
    </Grid>
  )
}

export default IncomeButton;