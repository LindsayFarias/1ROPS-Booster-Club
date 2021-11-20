import { FormGroup, FormControlLabel, Checkbox, Grid, Button, Modal, Typography, Box } from '@mui/material'
import { useContext } from 'react';
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

const AddMemberButton = ({ setUpdate, update, members, setOpen, setClose, open, eventId, details }) => {
  const { post } = useContext(AppContext);

  const submitPost = () => {
    newCommitteeMembers.forEach((member) => {
      let id = parseInt(member, 10);
      let input = {name: id};
      post(`/1rops/committee/${eventId}`, input);
    });
    newCommitteeMembers = [];
    memberList = [];
    setUpdate(update + 1);
    setClose();
  };

  let newCommitteeMembers = [];
  const handleCheck = (event) => {
    if (newCommitteeMembers.includes(event.target.value)) {
      let index = newCommitteeMembers.indexOf(event.target.value);
      newCommitteeMembers.splice(index, 1);
    } else {
      newCommitteeMembers.push(event.target.value);
    }
  };

  //filter through the memberlist and remove those that are already on the committee
  let memberList = [];
  if(details !== null) {
    for(let i = 0; i < members.length; i++){
      let newMember={name: members[i].name, id: members[i].id}
      memberList.push(newMember);
    }
  }
  const decideValue = (name) => {
    for(let i = 0; i < details.committee.length; i++){
      let currentMember = details.committee[i].name;
      if(currentMember === name) {
        return true
      }
    }
    return false;
  }
  //create a list of checkboxes with the names beside them
  const memberComponent = 
  <FormGroup>
    {memberList.map( member => {
      return(
        <FormControlLabel disabled={decideValue(member.name)} value={member.id} control={<Checkbox onClick={(event) => handleCheck(event)} />} label={member.name}/>
      )
    })}
  </FormGroup>

  return(
    <Grid item xs={10}>
      <Button onClick={setOpen}>Add</Button>
      <Modal
        open={open}
        onClose={setClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Members to Committee:
          </Typography>
          <form id="modal-modal-description">
            {memberComponent}
            <Button onClick={()=> submitPost()} style={{float: 'right'}}variant='outlined'>Add</Button>
          </form>
        </Box>
      </Modal>
    </Grid>
    );
};

export default AddMemberButton;