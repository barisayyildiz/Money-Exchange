import React, { useState, useEffect } from 'react'

import axios from 'axios';

import Navbar from '../../components/Navbar'
import SearchBar from '../../components/SearchBar'
import ExchangeModal from '../../components/ExchangeModal'
import CurrencyTable from '../../components/CurrencyTable'

function MainMenu() {

	const apiKey = "0b196ddfbe66cabd2fc96fbe"
	
	const [codes, setCodes] = useState([]);
	const [usdRate, setUsdRate] = useState({})
	
	const getCurrencyCodes = async () => {
		const {data:{supported_codes}} = await axios.get(`https://v6.exchangerate-api.com/v6/${apiKey}/codes`)
		setCodes(supported_codes)
	}
	
	const getUsdRate = async () => {
		const {data:{conversion_rates}} = await axios.get(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`)
		setUsdRate(conversion_rates)
	}

	useEffect(() => {
		getCurrencyCodes()
		getUsdRate()

		const interval = setInterval(() => {
			getUsdRate()
		}, 12000000);
		return () => clearInterval(interval);
	}, []);

	return (
		<div>
			<Navbar></Navbar>
			<SearchBar props={{
				codes
			}}></SearchBar>
			<CurrencyTable props={{
				usdRate
			}}></CurrencyTable>

			<ExchangeModal></ExchangeModal>
		</div>
	)
}

export default MainMenu
