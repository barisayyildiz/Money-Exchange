import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios';
import './style.scss'

import { Form, ListGroup } from 'react-bootstrap'
import { Context } from '../../context';

function SearchBar({user}) {

	const { monies } = user;

	const [currencies, setCurrencies] = useState([])
	const [options, setOptions] = useState([])

	const apiKey = "0b196ddfbe66cabd2fc96fbe"

	const { modalProps, setModalProps } = useContext(Context);

	useEffect(() => {
		axios.get(`https://v6.exchangerate-api.com/v6/${apiKey}/codes`)
		.then(({data:{supported_codes}}) => setCurrencies(supported_codes))
	}, [])

	const handleChange = ({target:{value}}) => {
		console.log(currencies)
		if(value === ""){
			setOptions([])
		}else{
			console.log(options)
			setOptions( currencies.filter(item => item[1].toLowerCase().includes(value.toLowerCase()) ? item : null ) )
		}
	}

	const handleBuy = ({name, acr}) => {
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

	return (
		<div className="searchbar-wrapper">
			<Form.Control type="text" placeholder="Search" onChange={e => handleChange(e)} />
			<ListGroup className="currency-list">
				{
					options != [] && (
						options.map(option => {
							const [acr, name] = option
							return(
									<ListGroup.Item
										onClick={() => handleBuy({acr, name})}
									>{option.toString().split(",").join(" - ")}</ListGroup.Item>
								)
							}
						)
					)
				}
			</ListGroup>		
		</div>
	)
}

export default SearchBar
