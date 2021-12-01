import { FormControl, InputLabel, Select, MenuItem, Grid } from '@mui/material';
import { AppContext } from '../../context/CreateAppContext';
import { useContext } from 'react';

const ChangePositionDropDown= ({ member, setUpdate, update}) => {
  const { patch } = useContext(AppContext);

  const handleDropDown = (event) => {
    patch(`/1rops/members/${member.id}`, {position: event.target.value})
    setUpdate(update + 1)
  }

  const positions = ['President', 'Vice President', 'Secretary', 'Treasurer', 'Commoner'];
  const dropDown = 
    <FormControl fullWidth>
      <InputLabel color='secondary' id="positionDropDown">Change Position</InputLabel>
      <Select
        color='secondary'
        labelId="positions"
        id="dropDownMembers"
        value={member.position}
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
    <Grid container xs={12}>
      {dropDown}
    </Grid>
  );
};

export default ChangePositionDropDown;