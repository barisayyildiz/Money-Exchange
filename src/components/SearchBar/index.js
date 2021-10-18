import React, { useState, useContext } from 'react'
import './style.scss'
import { Form, ListGroup } from 'react-bootstrap'
import { Context } from '../../context';

function SearchBar({props : {codes}}) {

	const [options, setOptions] = useState([])
	const { handleBuy } = useContext(Context);

	const handleChange = ({target:{value}}) => {
		if(value === ""){
			setOptions([])
		}else{
			setOptions( codes.filter(item => item[1].toLowerCase().includes(value.toLowerCase()) ? item : null ) )
		}
	}

	return (
		<div className="searchbar-wrapper">
			<Form.Control type="text" placeholder="Search" onChange={e => handleChange(e)} />
			<ListGroup className="currency-list">
				{
					options !== [] && (
						options.map(option => {
							const [acrn, name] = option
							return(
									<ListGroup.Item
										onClick={() => handleBuy({acrn, name})}
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
