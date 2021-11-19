import { Grid, Modal, Typography, Button, Box, TextField  } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/CreateAppContext';
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

function DateButton({ eventId, dateOpen, open, dateClose, currentDate}) {
  const { patch } = useContext(AppContext);
  const [value, setValue] = useState(currentDate);

  useEffect(() => {
    console.log('date', value);
  }, [value]);

  const handleChange = (newValue) => {
    setValue(newValue)
  }

  const submitPost = () => {
    let update = {
      date: value,
    };
    const url = `/1rops/${eventId}`;
    patch(url, update);
    setValue(value);
    dateClose();
  };

  return (
    <Grid item xs={10}>
      <Button onClick={dateOpen}>Update Date</Button>
      <Modal
        open={open}
        onClose={dateClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Update Event Date:
          </Typography>
          <form id="modal-modal-description">
            <LocalizationProvider dateAdapter={DateAdapter}>
              <DateTimePicker
                label="DateTime picker"
                value={value}
                onChange={handleChange}
                renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
            <Button onClick={()=> submitPost()} style={{float: 'right'}}variant='outlined'>Update Date</Button>
          </form>
        </Box>
      </Modal>
    </Grid>
  )
}

export default DateButton;