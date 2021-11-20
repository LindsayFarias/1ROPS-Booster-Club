import { useContext, useState, useEffect } from 'react';
import { AppContext } from '../../context/CreateAppContext';
import { Modal, Grid, Typography, TextField, FormControl, InputLabel, OutlinedInput, Box, Button, InputAdornment } from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/lab';
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

const AddEventButton = ({ setOpen, setClose, open, setUpdate, update, }) => {

    const { post } = useContext(AppContext);
    const [title, setTitle] = useState(null);
    const [date, setDate ] = useState(new Date());
    const [about, setAbout] = useState(null);
    const [income, setIncome] = useState(null);
  
    useEffect((reasonInput) => {
      console.log('title', title);
      console.log('date', date);
      console.log('about', about);
      console.log('income', income);
    }, [title, date, about, income]);
  
    const handleChange = (newValue) => {
        setDate(newValue);
    }
    const submitPost = () => {
      let event = {
        title: title,
        date: date,
        about: about,
        income: income
      };
      const url = `/1rops`;
      post(url, event);
      setTitle(null);
      setDate(null);
      setIncome(null);
      setAbout(null);
      setUpdate(update + 1);
      setClose();
    };
  
    return (
      <Grid item xs={10}>
        <Button variant="outlined" onClick={setOpen}>Add New Event</Button>
        <Modal
          open={open}
          onClose={setClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Add New Event
            </Typography>
            <form id="newEventForm">
              <Typography sx={{p: 1}}>Title:
                <TextField sx={{mx: 2}}required id="outlined-required" variant="outlined" label='Title' onChange={(event) => setTitle(event.target.value)}/> 
              </Typography>
              <Typography sx={{p: 1}}>Date: 
                <LocalizationProvider dateAdapter={DateAdapter}>
                  <DateTimePicker
                    label="DateTime picker"
                    value={date}
                    onChange={handleChange}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Typography>
              <Typography sx={{p: 1}}>About:
                <TextField sx={{mx: 2}}required id="outlined-required" variant="outlined" label='About' onChange={(event) => setAbout(event.target.value)}/> 
              </Typography>
              <Typography sx={{p: 1}}>Income:
                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel> 
                    <OutlinedInput id="outlined-adornment-amount" startAdornment={<InputAdornment position="start">$</InputAdornment>} label="Amount" 
                    onChange={(event) => setIncome(event.target.value)}/>
                </FormControl>
                </Typography>
              <Button onClick={()=> submitPost()} style={{float: 'right'}}variant='outlined'>Create Event</Button>
            </form>
          </Box>
        </Modal>
      </Grid>
    )
};

export default AddEventButton;