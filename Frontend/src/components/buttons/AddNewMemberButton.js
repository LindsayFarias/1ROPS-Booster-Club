import { useContext, useState, useEffect } from 'react';
import { AppContext } from '../../context/CreateAppContext';
import { Grid, Modal, Button, Box, Typography, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

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

const AddNewMemberButton = ({open, setOpen, setClose, members, setMembers, setUpdate, update}) => {
    const { post } = useContext(AppContext);
    const [name, setName] = useState(null);
    const [position, setPosition] = useState(null);

    useEffect(() => {
      console.log(name);
      console.log(position);
    }, [name, position]);
    const handleDropDown = (event) => {
        setPosition(event.target.value)
    };
    const submitPost = () => {
        let input = {name: name, position: position};
        post(`/1rops/members`, input);
        setName(null);
        setPosition(null);
        setClose();
        setUpdate(update + 1);
    };
    
    const positions = ['President', 'Vice President', 'Secretary', 'Treasurer', 'Commoner'];
    const dropDown = 
    <FormControl fullWidth>
      <InputLabel color='secondary' id="demo-simple-select-label">Position</InputLabel>
      <Select
        labelId="positions"
        id="dropDownMembers"
        value={position}
        color='secondary'
        label="Positions"
        onChange={handleDropDown}
      >
        {positions.map(el => {
          return(
            <MenuItem value={el}>{el}</MenuItem>
          );
        })}
      </Select>
    </FormControl>

    return(
      <Grid item xs={12}>
        <Button variant='outlined' color='secondary' onClick={setOpen}>Add New Member</Button>
        <Modal
          open={open}
          onClose={setClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Add a New Member:
            </Typography>
            <form id="modal-modal-description">
            <Typography sx={{p: 1}}>Name:
              <TextField color='secondary' sx={{mx: 2}}required id="outlined-required" variant="outlined" label='name' onChange={(event) => setName(event.target.value)}/> 
            </Typography>
            <Typography sx={{p: 1}}>Associated Member: 
              {dropDown}
            </Typography>
              <Button color='secondary' onClick={()=> submitPost()} style={{float: 'right'}}variant='outlined'>Add</Button>
            </form>
          </Box>
        </Modal>
      </Grid>
      );
};

export default AddNewMemberButton;