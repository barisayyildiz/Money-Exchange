import React from 'react'

import Navbar from '../../components/Navbar'
import SearchBar from '../../components/SearchBar'
import ExchangeModal from '../../components/ExchangeModal'
import CurrencyTable from '../../components/CurrencyTable'

function MainMenu({user}) {
	return (
		<div>
			<Navbar></Navbar>
			<SearchBar user={user}></SearchBar>
			<CurrencyTable user={user}></CurrencyTable>

			<ExchangeModal></ExchangeModal>
		</div>
	)
}

export default MainMenu
