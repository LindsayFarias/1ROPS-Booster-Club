import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Grid, Container, Button, Typography } from '@mui/material';
import { useContext } from 'react';
import { AppContext } from '../../context/CreateAppContext';
import AddEventButton from '../buttons/AddEventButton';


function Homepage({ getEvents, events, getMembers, members }) {
  
  let eventResult, memberResult;
  const { Item, deletion } = useContext(AppContext);

  const [eventOpener, setEventOpen] = useState(null);
  const [update, setUpdate] = useState(0);

  const eventOpen = () => setEventOpen(true);
  const eventClose = () => setEventOpen(false);

  //api call to get members on the board and current scheduled events
  useEffect(() => {
    getEvents();
    getMembers();
  }, [] )

  useEffect(() => {
    getEvents();
    getMembers();
  }, [update] )

  const handleDeletion = (id) => {
    let eventId = parseInt(id, 10);
    console.log(`/1rops/${eventId}`)
    deletion(`/1rops/${eventId}`)
    setUpdate(update + 1);
  };

  //create list of events
  if (events !== null) {
    const resultList = events.map((event) => {
      return (
        <Grid style={{padding: 1}} key={event.id} item xs={12}>
          <Item data-testid='eventCard'>
            <h3>{event.title}</h3> <br/>
            <h4>{event.date}</h4> <br/>
            <h4>{event.about}</h4> <br/>
            <Grid container xs={12}>
              <Grid item xs={4}></Grid>
              <Grid item xs={2}>
                <Link to={`/${event.id}`}><Button color="secondary" variant='outlined'>Details</Button></Link>
              </Grid>
              <Grid item xs={2}>
                <Button color='secondary' variant="outlined" onClick={() => handleDeletion(event.id)} >Delete</Button>
              </Grid>
              <Grid item xs={4}></Grid>
            </Grid>
          </Item>
        </Grid>
      )
    })
    eventResult = <Grid container spacing={2}>{resultList}</Grid>
  } else { eventResult = <h4>No Events Scheduled</h4> }

  //create list of members 
  if (members !== null) {
    let president = members.filter(member => member.position === 'President');
    president = president.length > 0 ? `President: ${president[0].name}`: 'President: vacant'
    let vicePresident = members.filter(member => member.position === 'Vice President');
    vicePresident = vicePresident.length > 0 ? `Vice President: ${vicePresident[0].name}`: 'Vice President: vacant'
    let secretary = members.filter(member => member.position === 'Secretary');
    secretary = secretary.length > 0 ? `Secretary: ${secretary[0].name}`: 'Secretary: vacant'
    let treasurer = members.filter(member => member.position === 'Treasurer');
    treasurer = treasurer.length > 0 ? `Treasurer: ${treasurer[0].name}`: 'Treasurer: vacant'

    memberResult = 
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Item>
            {president}
          </Item>
        </Grid>
        <Grid item xs={12}>
          <Item>
            {vicePresident}
          </Item>
        </Grid>
        <Grid item xs={12}>
          <Item>
            {secretary}
          </Item>
        </Grid>
        <Grid item xs={12}>
          <Item>
            {treasurer}
          </Item>
        </Grid>
      </Grid>
  }
  
  return(
    <Container maxWidth='xlg' className='homepage'>
      <Typography variant='h3' style={{textAlign: 'center'}}>1 ROPS Booster Club</Typography>
      <Grid container spacing={2}>
        <Grid item style={{textAlign: 'left', justifyContent: 'center'}} xs={3}>
          <Typography variant='h5'>Booster Club Board:</Typography> <br/>
          {memberResult} <br/>
          <Link to="/members"><Button color='secondary' variant="outlined">Add</Button></Link>
        </Grid>
        <Grid item style={{textAlign: 'left'}} xs={6}>
          <Typography variant='h5'>Events:</Typography> <br/>
          {eventResult} <br/>
            <AddEventButton setOpen={eventOpen} setClose={eventClose} open={eventOpener} setUpdate={setUpdate} update={update} />
        </Grid>
        <Grid item style={{textAlign: 'left'}} xs={3}>
          <Typography variant='h5'>ToDos:</Typography> <br/>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Homepage;