import './App.css';
import Homepage from './components/pages/Homepage.js';
import Eventspage from './components/pages/Eventspage.js';
import Treasurypage from './components/pages/Treasurypage.js';
import Patchpage from './components/pages/Patchpage.js';
import Memberpage from './components/pages/Memberpage.js';
import Navbar from './components/Navbar.js';
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
  const [funds, setFunds] = useState(null);
  const [receipts, setReceipts] = useState(null);
  const [patches, setPatches] = useState(null);

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

  async function getFunds() {
    let money = await apiCall('/1rops/money')
    setFunds(money);
  }

  async function getReceipts() {
    let receipts = await apiCall('/1rops/receipts')
    setReceipts(receipts);
  }

  async function getPatches() {
    let patches = await apiCall('/1rops/patches')
    setPatches(patches);
  }

  return (
    <div className='App'>
      <Navbar/>
      <Routes>
        <Route exact path='/' element={<Homepage getEvents={eventGetter} events={events} getMembers={getMembers} members={members}/>}/>
        <Route path={`/:eventId`} element={<Eventspage memberGetter={getMembers} members={members} eventGetter={eventDetails} details={details} netIncome={netIncome} netIncomeGetter={eventNetIncome} setMembers={setMembers}/>}/>
        <Route path="/patches" element={<Patchpage getPatches={getPatches} patches={patches} />}/>
        <Route path="/treasury" element={<Treasurypage money={funds} getMoney={getFunds} receipts={receipts} getReceipts={getReceipts}/>}/>
        <Route path="/members" element={<Memberpage members={members} getMembers={getMembers} setMembers={setMembers}/>}/>
      </Routes>
    </div>
  );
}

export default App;

