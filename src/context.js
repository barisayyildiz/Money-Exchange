import React, { useState, createContext } from 'react';

import { isAuthenticated } from './utils';

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

	const handleBuy = ({name, acr}) => {
		const { monies } = isAuthenticated();
		setModalProps({
			...modalProps,
			open: true,
			buying:true,
			acrnList:monies.map(money => money.acr),
			money:{
				acrn:acr,
				name:name,
				fullName:acr + " - " + name
			}
		})
	}

	const handleSell = ({name, acr}) => {
		const { monies } = isAuthenticated();
		setModalProps({
			...modalProps,
			open: true,
			buying:false,
			acrnList:monies.map(money => money.acr),
			money:{
				acrn:acr,
				name:name,
				fullName:acr + " - " + name
			}
		})
	}

  return (
    <Context.Provider value={{authenticated, setAuthenticated, modalProps, setModalProps, handleBuy, handleSell}}>
      {props.children}
    </Context.Provider>
  )
}

export{
	Context,
	ContextProvider
}

