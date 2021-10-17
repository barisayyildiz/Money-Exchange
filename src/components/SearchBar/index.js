import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios';
import './style.scss'
import { Form, ListGroup } from 'react-bootstrap'
import { Context } from '../../context';

function SearchBar({props : {user, codes}}) {

	const { monies } = user;
	const [options, setOptions] = useState([])
	const { modalProps, setModalProps, handleBuy } = useContext(Context);

	const handleChange = ({target:{value}}) => {
		console.log(codes)
		if(value === ""){
			setOptions([])
		}else{
			console.log(options)
			setOptions( codes.filter(item => item[1].toLowerCase().includes(value.toLowerCase()) ? item : null ) )
		}
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
