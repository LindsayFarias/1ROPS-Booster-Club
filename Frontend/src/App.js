import './App.css';
import Homepage from './components/Homepage.js';
import { useState, useEffect } from 'react'
import { Route, Routes, Link } from 'react-router-dom';

const baseURL = 'http://localhost:3001'
const apiCall = async (url) => {
  let data = await fetch(baseURL + url)
    .then((data) => data.json())
    .then(data => data);
  return data    
}

function App() {
  const [events, setEvents] = useState(null)
  
  useEffect(() => {
    const getEvents = async () => {
    const data = await apiCall('/1rops')
    console.log(data)
    setEvents(data);
    }
    getEvents();
  }, []);

  return (
    <Routes>
      <Route path='/' element={<Homepage events={events}/>}/>
    </Routes>
  );
}

export default App;

