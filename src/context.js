import React, { useState, createContext } from 'react';

// Create Context
const Context = createContext();

const ContextProvider = (props) => {
  const [authenticated, setAuthenticated] = useState(null)

  return (
    <Context.Provider value={{authenticated, setAuthenticated}}>
      {props.children}
    </Context.Provider>
  )
}

export{
	Context,
	ContextProvider
}

