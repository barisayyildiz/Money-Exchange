import React, { useState, useContext } from 'react'
import './style.scss'

import { Table, ButtonGroup, ToggleButton, Button } from 'react-bootstrap'
import { Context } from '../../context';

function CurrencyTable({user}) {

	console.log(user);
	const { monies } = user;

	const radios = [
    { name: 'Active', value: '1' },
    { name: 'Radio', value: '2' },
    { name: 'Radio', value: '3' },
  ];

	// const [checked, setChecked] = useState(false);
  // const [radioValue, setRadioValue] = useState('1');
	const [checkId, setCheckedId] = useState(null);

	const { modalProps, setModalProps } = useContext(Context);
	console.log(modalProps);

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

	const handleSell = ({name, acr}) => {
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
		<div className="currency-table-wrapper">
			<Table bordered hover>
				<thead>
					<tr>
						<th>#</th>
						<th>Acronym</th>
						<th>Name</th>
						<th>Amount</th>
						<th>Operations</th>
					</tr>
				</thead>
				<tbody>
					{
						monies.map((money, index) => {
							return(
								<tr
									className="align-items-center"
								>
									{/* <td><input type="checkbox"></input></td> */}
									<td>
									<ToggleButton
										id={`toggle-check-${index}`}
										type="checkbox"
										variant="outline-primary"
										checked={index == checkId}
										value={index}
										onChange={(e) => checkId == e.currentTarget.value ? setCheckedId(null) : setCheckedId(e.currentTarget.value)}
										className="active-currency-toggle"
									>
										{
											index == checkId ? "X" : ""
										}
									</ToggleButton>

									</td>
									<td>{money.acr}</td>
									<td>{money.name}</td>
									<td>{money.amount}</td>
									<td>
										<Button onClick={() => handleBuy(money)} disabled={index != checkId ? true : false} variant="success" >BUY</Button>
										<Button onClick={() => handleSell(money)} disabled={index != checkId ? true : false} variant="danger" >SELL</Button>
									</td>
								</tr>
							)
						})
					}
				</tbody>
			</Table>			
		</div>
	)
}

export default CurrencyTable
