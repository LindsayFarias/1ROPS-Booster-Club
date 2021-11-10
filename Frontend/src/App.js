import './App.css';
import Homepage from './components/Homepage.js';
import { Route, Routes } from 'react-router-dom';

function App() {

  return (
    <Routes>
      <Route path='/' element={<Homepage />} />
    </Routes>
  );
}

export default App;

//Navbar with Patches, Treasury, and a Home button.
//HomePage featuring upcoming events, current booster club chair members, and booster club yearly/monthly todos
//Events page that will show the details of events should:
  //should show the title, date of event and purpose
  //have a text box to increase the income
  //have an option to change the date of event
  //have the option to add members to the committee
  //have the option to view the current committee
  //have the option to view receipts of previous transactions
//Patches route in Navbar should:
  //take you to a page with all of the current patches which in themselves are clickable links
  //have an option to create new patch order
//Individual Patches page
  //show profits from patch, name, and img of patch, and pre-orders
  //give the option to add members to pre-order
  //give the option to add re-order information
  //give the option to update sales information
//Treasury Navbar link should:
  //give a balance
  //show income from patches and events
  //show receipts

