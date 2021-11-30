import { Grid, Box, Modal, Button, Typography, FormControl, FormControlLabel, TextField } from '@mui/material';
import { useState, useContext } from 'react';
import { AppContext } from '../../context/CreateAppContext';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 750,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const AddPreOrderButton = ({ handleModal, open, id, getPatch, render, reRender }) => {
    const { post } = useContext(AppContext);

    const [name, setName] = useState(null);
    const [amount, setAmount] = useState(null);
    const [notes, setNote] = useState(null);
    console.log(id)
    const submitPreOrder = async () => {
      const input = {
        picked_up: false,
        name: name,
        amount: amount,
        notes: notes 
      };
      post(`/1rops/preorder/${id}`, input);

      setName(null);
      setAmount(null);
      setNote(null);

      getPatch(id);
      reRender(render + 1);
      handleModal();

    };

    const formItems = 
      <Box sx={style}>
        <Typography variant='h5'>
          Create a New Pre-Order Entry
        </Typography>
        <form>
        <FormControl>
          <FormControlLabel
            label={`Name: `}
            value={name} 
            labelPlacement='start'
            control={
              <TextField sx={{ m: 1, width: '25ch' }} label='Name' variant="outlined" onChange={(event) => setName(event.target.value)}/>
            } />
        </FormControl>
        <FormControl>
          <FormControlLabel
            label={`Number of Patches: `}
            value={amount} 
            labelPlacement='start'
            control={
              <TextField 
                sx={{ m: 1, width: '25ch' }} 
                label='Number' variant="outlined" 
                onChange={(event) => setAmount(event.target.value)}/>
              } />
        </FormControl>
        <FormControl>
          <FormControlLabel
            label={`Notes: `}
            value={notes} 
            labelPlacement='start'
            control={
              <TextField multiline={true} sx={{ m: 1, width: '50ch' }} label='Note' variant="outlined" onChange={(event) => setNote(event.target.value)}/>
            } />
        </FormControl>
        <Button onClick={()=> submitPreOrder()} style={{float: 'right'}}variant='outlined'>Add</Button>
        </form>
      </Box>

    return(
        <Grid item xs={10}>
        <Button variant='outlined' onClick={handleModal}>Add Pre-Order</Button>
        <Modal
          open={open}
          onClose={handleModal}
          aria-labelledby="pre-order-modal"
        >
            {formItems}
        </Modal>
      </Grid>
    );
};

export default AddPreOrderButton;