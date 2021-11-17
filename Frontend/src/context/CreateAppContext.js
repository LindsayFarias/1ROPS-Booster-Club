import React, { createContext, useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Paper } from '@mui/material';

export const AppContext = createContext(null);

const AppProvider = ({children}) => {

  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(3),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  const valueObj = {
    Item
  }

  return(
    <AppContext.Provider value={valueObj}>
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider;
