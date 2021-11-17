import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Grid, Paper, Container, Button, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useContext } from 'react';
import { AppContext } from '../context/CreateAppContext';

function Homepage({ getEvents, events, getMembers, members }) {
  
  let eventResult, memberResult;
  const { Item } = useContext(AppContext);

  //api call to get members on the board and current scheduled events
  useEffect(() => {
    getEvents();
    getMembers();
  }, [] )

  //create list of events
  if (events !== null) {
    const resultList = events.map(event => {
      return (
        <Grid item xs={8}>
          <Item>
            {event.title} <br/>
            {event.date} <br/>
            {event.about} <br/>
            <Link to={`/${event.id}`}><Button variant='outlined'>Details</Button></Link>
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
    <Container maxWidth='lg' className='homepage'>
      <h1 style={{fontFamily: "Garamond, serif", textAlign: 'center'}}>1 ROPS Booster Club</h1>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <h3>Booster Club Board:</h3> <br/>
          {memberResult}
        </Grid>
        <Grid item xs={1}>
        </Grid>
        <Grid item xs={8}>
          <h3>Events:</h3> <br/>
          {eventResult}
        </Grid>
      </Grid>
    </Container>
  );
}

export default Homepage;