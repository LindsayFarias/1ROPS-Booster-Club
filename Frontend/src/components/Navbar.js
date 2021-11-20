import { ThemeProvider, AppBar, Button, ButtonGroup } from '@mui/material';
import { useContext } from 'react';
import { AppContext } from '../context/CreateAppContext'
import HouseIcon from '@mui/icons-material/House';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { darkTheme } = useContext(AppContext);
  return(
    <ThemeProvider theme={darkTheme}>
      <AppBar position="static" color="primary">
        <ButtonGroup variant='outlined' color='secondary'>
        <Link to='/'><Button><HouseIcon /></Button></Link>
        <Link to='/patches'><Button>Patches</Button></Link>
        <Link to='/treasury'><Button>Treasury</Button></Link>
        </ButtonGroup>
      </AppBar>
    </ThemeProvider>
  );
}

export default Navbar;