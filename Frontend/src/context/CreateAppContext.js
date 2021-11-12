import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext(null);

const AppProvider = ({children}) => {
  const func = () => {
    console.log('Hello')
  };

  const valueObj = {
    func
  }

  return(
    <AppContext.Provider value={valueObj}>
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider;
