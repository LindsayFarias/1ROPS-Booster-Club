import { useEffect, useContext, useState } from 'react';
import { Grid, Container, Button, Box } from '@mui/material';
import { AppContext } from '../../context/CreateAppContext';
import AddNewMemberButton from '../buttons/AddNewMemberButton';
import ChangePositionDropDown from '../buttons/ChangePositionDropDown';

const Memberpage = ({members, setMembers, getMembers}) => {
  const { Item, deletion } = useContext(AppContext);

  const [memberOpener, setMemberOpen] = useState(false);
  const [update, setUpdate] = useState(0);
  
  const memberOpen = () => setMemberOpen(true);
  const memberClose = () => setMemberOpen(false);

  useEffect(() => {
    getMembers();
  }, [] );

  useEffect(() => {
    getMembers();
  }, [update])

  const handleDeletion = (id) => {
    deletion(`/1rops/members/${id}`)
    setUpdate(update + 1)
  }

  console.log(members)

  let memberList;
  memberList = members !== null ?
  <Grid container spacing={1} xs={9}>
    {members.map( member => {
      return (
        <Grid item xs={3}>
          <Item>
            <h2>{member.name}</h2>
            <h2>{member.position}</h2>
            <ChangePositionDropDown setUpdate={setUpdate} update={update} member={member}/> <br/>
            <Button color='secondary' onClick={()=> handleDeletion(member.id)} variant="outlined">Delete</Button>
          </Item>
        </Grid>
      )
    })}
  </Grid>
  : <p>Loading Members</p>

  return(
    <Container maxWidth='xlg'>
      <h1>Members</h1>
      <Box display='flex' style={{mx: '1%'}}>
        {memberList}
        <Grid container xs={3}>
          <AddNewMemberButton setUpdate={setUpdate} update={update} open={memberOpener} setOpen={memberOpen} setClose={memberClose} setMembers={setMembers} variant='outlined'/>
        </Grid>
      </Box>
    </Container>
  );
};

export default Memberpage;