import './App.css';
import Homepage from './components/Homepage.js';
import Eventspage from './components/Eventspage.js';
import { useState, useEffect } from 'react'
import { Route, Routes, Link } from 'react-router-dom';

const baseURL = 'http://localhost:3001'
const apiCall = async (url) => {
  let data = await fetch(baseURL + url)
    .then((data) => data.json())
    .then(data => data);
  console.log(data)
  return data    
}

function App() {
  const [events, setEvents] = useState(null);
  const [members, setMembers] = useState(null);
  const [details, setDetails] = useState(null);
  const [netIncome, setNetIncome] = useState(null);

  const eventGetter = async () => {
  const data = await apiCall('/1rops')
  console.log(data)
  setEvents(data);
  }

  const getMembers = async () => {
    const data = await apiCall('/1rops/members')
    setMembers(data);
  }

  async function eventDetails(id) {
    let eventId = '/1rops/' + id;
    let data = await apiCall(eventId);
    console.log(data)
    setDetails(data);
  }

  async function eventNetIncome(id) {
    let eventId = '/1rops/event/' + id;
    let data = await apiCall(eventId);
    setNetIncome(data);
  }

  return (
    <Routes>
      <Route exact path='/' element={<Homepage getEvents={eventGetter} events={events} getMembers={getMembers} members={members}/>}/>
      <Route path={`/:eventId`} element={<Eventspage memberGetter={getMembers} members={members} eventGetter={eventDetails} details={details} netIncome={netIncome} netIncomeGetter={eventNetIncome}/>}/>
    </Routes>
  );
}

export default App;

