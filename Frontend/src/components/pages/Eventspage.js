import { List, ListItem, ListItemText, Paper, Button, Grid, Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useEffect, useContext, useState } from 'react';
import { AppContext } from '../../context/CreateAppContext';
import ReceiptButton from '../buttons/ReceiptButton';
import IncomeButton from '../buttons/IncomeButton';
import DateButton from '../buttons/DateButton';
import AddMemberButton from '../buttons/AddMemberButton';

function Eventspage( { setMembers, members, eventGetter, details, netIncome, netIncomeGetter, memberGetter } ) {
  const { Item, deletion } = useContext(AppContext);
  let committee, event, receipts;
  const params = useParams();
  const eventId = params.eventId;

  const [receiptOpener, setReceiptOpen] = useState(false);
  const [incomeOpener, setIncomeOpen] = useState(false);
  const [dateOpener, setDateOpen] = useState(false);
  const [addOpener, setAddOpen] = useState(false);
  const [update, setUpdate] = useState(0);

  const receiptOpen = () => setReceiptOpen(true);
  const receiptClose = () => setReceiptOpen(false);
  const incomeOpen = () => setIncomeOpen(true);
  const incomeClose = () => setIncomeOpen(false);
  const dateOpen = () => setDateOpen(true);
  const dateClose = () => setDateOpen(false);
  const addOpen = () => setAddOpen(true);
  const addClose = () => setAddOpen(false);

  useEffect( () => {
    eventGetter(eventId);
    netIncomeGetter(eventId);
    memberGetter();
  }, []);

  useEffect(() => {
    eventGetter(eventId);
    netIncomeGetter(eventId);
    memberGetter();
  }, [receiptOpener, incomeOpener, dateOpener, addOpener, update])
  
  const handleDeletion = (id) => {
    deletion(`/1rops/committee/${eventId}/${id}`)
    setUpdate(update + 1)
  };

  //organize contents of page: event details, committee, and current receipts
  if (details !== null && netIncome !== null && members !== null) {
    committee = <List sx={{ bgcolor: 'background.paper' }}>
        <h3>Committee: </h3>
        {details.committee.map(member => {
            return (
                <ListItem>
                    <ListItemText primary={member.name}/>
                    <Button onClick={()=> handleDeletion(member.id)} variant="outlined">Delete</Button>
                </ListItem>
            )
        })}
        <ListItem>
            <AddMemberButton update={update} setUpdate={setUpdate} details={details} eventId={eventId} members={members} setOpen={addOpen} setClose={addClose} open={addOpener} variant='outlined'>Add</AddMemberButton>
        </ListItem>
    </List>

    let expenditure = 0;
    details.receipts.forEach(receipt => expenditure += receipt.expenditures)
    
    event = <Paper elevation={3} style={{textAlign: 'center', padding: 3}}>
        <h3>{details.event[0].title}</h3>
        <p>{details.event[0].about}</p>
        <p>Date of Event: {details.event[0].date}</p>
        <p>Income: ${details.event[0].income}</p>
        <p>Expenditures: ${expenditure}</p>
        <p>Net Income: ${netIncome.total}</p>
        <Box display='flex'>
          <IncomeButton eventId={eventId} open={incomeOpener} incomeOpen={incomeOpen} incomeClose={incomeClose} />
          <DateButton eventId={eventId} open={dateOpener} dateOpen={dateOpen} dateClose={dateClose} currentDate={details.event[0].date} />
        </Box>
    </Paper>

    receipts = details.receipts.length > 0 ? 
      details.receipts.map(receipt => {
        return (
          <Grid item xs={12} med={6} lg={3.5}>
            <Item>
              <h4>{receipt.reason}</h4>
              <h5>Date: {receipt.date}</h5>
              <h5>Expenditure: ${receipt.expenditures}</h5>
              <h5>Associated Member: {receipt.associated_member}</h5>
          </Item>
        </Grid>
        )})
      : <h3>No Receipts</h3>
  }

  return(
    <Box display="flex" flexDirection="row" padding={1}>
      <Grid container component='span' spacing={2} sx={{p: 1}} style={{width: '60%'}}>
        <Grid item xs={12}>
          {event}
        </Grid>
        <Grid item xs={2}><h3>Receipts:</h3></Grid>
        <ReceiptButton eventId={eventId} receiptOpen={receiptOpen} receiptClose={receiptClose} open={receiptOpener} />
        {receipts}
      </Grid>
      <Grid container style={{width: '40%'}}>
        <Grid item xs={12}>
          {committee}
        </Grid>
      </Grid>
    </Box>
  )
};

export default Eventspage;