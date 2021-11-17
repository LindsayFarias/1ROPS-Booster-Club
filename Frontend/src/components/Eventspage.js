import { List, ListItem, ListItemText, Paper, Button, Grid } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useEffect, useContext } from 'react';
import { AppContext } from '../context/CreateAppContext';

function Eventspage( { eventGetter, details } ) {
  const { Item } = useContext(AppContext);
  let committee, event, receipts;
  const params = useParams();
  const eventId = params.eventId;

  useEffect( () => {
    eventGetter(eventId);
  }, []);

  if (details !== null) {
    committee = <List sx={{ bgcolor: 'background.paper' }}>
        <h3>Committee: </h3>
        {details.committee.map(member => {
            return (
                <ListItem>
                    <ListItemText primary={member.name}/>
                    <Button variant='outlined'>Remove</Button>
                </ListItem>
            )
        })}
        <ListItem>
            <Button variant='outlined'>Add</Button>
        </ListItem>
    </List>

    event = <Paper elevation={3} style={{textAlign: 'center'}}>
        <h3>{details.event[0].title}</h3>
        <p>{details.event[0].about}</p>
        <h4>Income: ${details.event[0].income}</h4>
    </Paper>

    receipts = details.receipts.length > 0 ? 
      <Item>
        <h4>{details.receipts[0].reason}</h4>
        <h5>Date: {details.receipts[0].date}</h5>
        <h5>Expenditure: ${details.receipts[0].expenditures}</h5>
        <h5>Associated Member: {details.receipts[0].associated_member}</h5>
      </Item> 
      : <h3>No Receipts</h3>
  }

  return(
    <Grid container component='span' sx={{p: 2}}>
      <Grid item xs={8}>
      {event}
      </Grid>
      <Grid item xs={3}>
        {committee}
      </Grid>
      <Grid item xs={4}>
      </Grid>
      <Grid item xs={4}>
        {receipts}
      </Grid>
    </Grid>
  )
};

export default Eventspage;