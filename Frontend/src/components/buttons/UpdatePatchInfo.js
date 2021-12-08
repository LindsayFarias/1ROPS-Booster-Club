import { Grid, Modal, Typography, TextField, InputAdornment, OutlinedInput, InputLabel, FormControl, Button, Box, FormControlLabel  } from '@mui/material';
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

const UpdatePatchInfoButton = ({ handleUpdate, open, id, render, reRender }) => {
  const { patch, post } = useContext(AppContext);
  const [income, setIncome] = useState(null);
  const [number, setNumber] = useState(null);
  const [price, setPrice] = useState(null);
  
  useEffect(() => {
    setIncome(number * price)
  }, [number, price] );

  useEffect(() => {
    console.log(income);
  }, [income] )
  
  const submitPost = async () => {
    let update = {
      amount_sold: number
    };
    let incomeUpdate = {
      income: income
    };
    
    await patch(`/1rops/patches/${id}`, update);
    await post(`/1rops/patches/income/${id}`, incomeUpdate);

    setIncome(null);
    setNumber(null);
    setPrice(null);
    reRender(render + 1);
    handleUpdate();
};

  return(
    <div>
    <Button color='secondary' variant='outlined' onClick={handleUpdate}>Update</Button>
    <Modal
      open={open}
      onClose={handleUpdate}
      aria-labelledby="patch-update-button"
    >
      <Box sx={style}>
        <Typography id="Patch-update-modal" variant="h6" component="h2">
          Update Patches Sold:
        </Typography>
        <form id="UpdatePatches">
            <FormControl >
              <FormControlLabel 
                sx={{ width: '30ch' }} 
                color='secondary'
                variant="outlined"
                value={number}
                label="Patches Sold:"
                labelPlacement='start'
                control={<TextField color='secondary' id="Number-Ordered" label="Number"/>} 
                onChange={(event) => setNumber(event.target.value)}
              />
            </FormControl>
          <Typography sx={{p: 1}}>Price/Patch:
            <FormControl sx={{ m: 1, width: '25ch' }} color='secondary' variant="outlined" value={price}>
              <InputLabel color='secondary' htmlFor="price_patch">Amount</InputLabel> 
                <OutlinedInput color='secondary' id="price_patch" startAdornment={<InputAdornment position="start">$</InputAdornment>} label="Amount" 
                onChange={(event) => setPrice(event.target.value)}/>
            </FormControl>
          </Typography>
          <Button color='secondary' onClick={()=> submitPost()} style={{float: 'right'}}variant='outlined'>Update Income</Button>
        </form>
      </Box>
    </Modal>
  </div>
  );
};

export default UpdatePatchInfoButton;