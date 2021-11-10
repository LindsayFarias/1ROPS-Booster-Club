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
