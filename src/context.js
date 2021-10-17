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

	const handleBuy = ({name, acrn}) => {
		const { money } = isAuthenticated();
		console.log(money);
		setModalProps({
			...modalProps,
			open: true,
			buying:true,
			acrnList:money.map(money => money.acrn),
			money:{
				acrn:acrn,
				name:name,
				fullName:acrn + " - " + name
			}
		})
	}

	const handleSell = ({name, acrn}) => {
		const { money } = isAuthenticated();
		setModalProps({
			...modalProps,
			open: true,
			buying:false,
			acrnList:money.map(money => money.acrn),
			money:{
				acrn:acrn,
				name:name,
				fullName:acrn + " - " + name
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

