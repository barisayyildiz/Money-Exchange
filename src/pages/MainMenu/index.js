import React from 'react'

import Navbar from '../../components/Navbar'
import SearchBar from '../../components/SearchBar'
import CurrencyTable from '../../components/CurrencyTable'

function MainMenu({user}) {
	return (
		<div>
			<Navbar></Navbar>
			<SearchBar user={user}></SearchBar>
			<CurrencyTable user={user}></CurrencyTable>			
		</div>
	)
}

export default MainMenu
