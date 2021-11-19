import { FormGroup, FormControlLabel, Checkbox, Grid, Button, Modal, Typography, Box } from '@mui/material'
import { useContext } from 'react';
import { AppContext } from '../context/CreateAppContext';

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

const AddMemberButton = ({ members, setOpen, setClose, open, eventId, details }) => {
  const { post } = useContext(AppContext);

  const submitPost = () => {
    newCommitteeMembers.forEach((member) => {
      let id = parseInt(member, 10);
      let input = {name: id};
      post(`/1rops/committee/${eventId}`, input);
    });
    newCommitteeMembers = [];
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
  if(details !== null && details.committee.length === 0) {
    console.log('members', members)
    for(let i = 0; i < members.length; i++){
      let newMember={name: members[i].name, id: members[i].id}
      memberList.push(newMember);
    }
  } else {
  for(let k = 0; k < members.length; k++) {
    let member = members[k].name;
    for(let j = 0; j < details.committee.length; j++) {
        let committee = details.committee[j].name;
        if(member !== committee) {
            let newCommittee = {
              id: members[k].id,
              name: member
            };
            memberList.push(newCommittee)
        }
    }
  }}

  //create a list of checkboxes with the names beside them
  const memberComponent = 
  <FormGroup>
    {memberList.map( member => {
      return(
        <FormControlLabel value={member.id} control={<Checkbox onClick={(event) => handleCheck(event)} />} label={member.name}/>
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