import React, { createContext } from 'react';
import { styled } from '@mui/material/styles';
import { Paper, Toolbar, IconButton, Typography, createTheme } from '@mui/material';

export const AppContext = createContext(null);

const baseURL = 'http://localhost:3001'

const AppProvider = ({children}) => {

  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(3),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  const post = (url, input) => {
    fetch(baseURL + url, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(input)
    });
  };

  const patch = (url, input) => {
    fetch(baseURL + url, {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(input)
    });
  };

  const deletion = (url) => {
    fetch(baseURL + url, {
      method: 'DELETE'
    });
  }
  
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#1976d2',
      },
    },
  });

  const valueObj = {
    Item,
    post,
    patch,
    deletion,
    darkTheme
  }

  return(
    <AppContext.Provider value={valueObj}>
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider;
