import React, { useState, useEffect } from 'react'
import axios from 'axios';
import './style.scss'

import { Form, ListGroup } from 'react-bootstrap'

function SearchBar() {

	const [currencies, setCurrencies] = useState([])
	const [options, setOptions] = useState([])

	const apiKey = "0b196ddfbe66cabd2fc96fbe"

	useEffect(() => {
		axios.get(`https://v6.exchangerate-api.com/v6/${apiKey}/codes`)
		.then(({data:{supported_codes}}) => setCurrencies(supported_codes))
	}, [])

	const handleChange = ({target:{value}}) => {
		console.log(currencies)
		if(value === ""){
			setOptions([])
		}else{
			setOptions( currencies.filter(item => item[1].toLowerCase().includes(value.toLowerCase()) ? item : null ) )
		}
	}

	return (
		<div className="searchbar-wrapper">
			<Form.Control type="text" placeholder="Search" onChange={e => handleChange(e)} />
			<ListGroup className="currency-list">
				{
					options != [] && (
						options.map(option => (
							<ListGroup.Item>{option.toString().split(",").join(" - ")}</ListGroup.Item>
						))
					)
				}
			</ListGroup>		
		</div>
	)
}

export default SearchBar
