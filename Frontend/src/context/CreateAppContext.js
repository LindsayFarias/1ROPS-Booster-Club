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

  const dateKey = {
    "01": 'January',
    "02": 'February',
    "03": 'March',
    "04": 'April',
    '05': 'May',
    '06': 'June',
    '07': 'July',
    '08': 'August',
    '09': 'September',
    '10': 'October',
    '11': 'November',
    '12': 'December'
  };

  const hourKey = {
    '00': '20',
    '01': '21',
    '02': '23',
    '03': '24',
    '05': '00',
    '06': '01',
    '07': '02',
    '08': '03',
    '09': '04',
    '10': '05',
    '11': '06',
    '12': '07',
    '13': '08',
    '14': '09',
    '15': '10',
    '16': '11',
    '17': '12',
    '18': '13',
    '19': '14',
    '20': '15',
    '21': '16',
    '22': '17',
    '23': '18',
    '24': '19'
  }

  const dateTimeConverter = (date) => {
    const year = date.slice(0, 4);
    let month = date.slice(5, 7);
    for (let i in dateKey) {
      if (month === i) month = dateKey[i];
    };
    let day = date.slice(8,10);
    let hour = date.slice(11, 13);
    for (let i in hourKey) {
      if (hour === i) hour = hourKey[i];
    };
    const minutes = date.slice(14, 16);

    return(`${month} ${day}, ${year} at ${hour}${minutes}`);
  }

  const valueObj = {
    Item,
    post,
    patch,
    deletion,
    darkTheme,
    dateTimeConverter
  }

  return(
    <AppContext.Provider value={valueObj}>
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider;
