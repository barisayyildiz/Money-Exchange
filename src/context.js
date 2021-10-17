import React, { useState, createContext } from 'react';

// Create Context
const Context = createContext();

const ContextProvider = (props) => {
  const [authenticated, setAuthenticated] = useState(null)
	const [modalProps, setModalProps] = useState({
		open:false,
		header:"",
		acrnList:[],
		buying:true,
		selectedAcrnIndex:-1,
		rates:[],
		money:{
			acrn:"",
			fullName:""
		}
	})

  return (
    <Context.Provider value={{authenticated, setAuthenticated, modalProps, setModalProps}}>
      {props.children}
    </Context.Provider>
  )
}

export{
	Context,
	ContextProvider
}

