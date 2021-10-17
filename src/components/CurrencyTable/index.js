import React, { useState, useContext, useEffect } from 'react'
import './style.scss'

import { Table, ToggleButton, Button, Badge } from 'react-bootstrap'
import { Context } from '../../context';
import {
	isAuthenticated,
} from '../../utils'

function CurrencyTable({props : {usdRate}}) {
	const { monies } = isAuthenticated();
	const [rates, setRates] = useState({})
	const [totalWorth, setTotalWorth] = useState(0);
	const [lastUpdated, setLastUpdated] = useState(String(new Date()))

	useEffect(() => {
		console.log(`total worth : ${totalWorth}`)
	},[totalWorth])

	useEffect(() => {
		setRates(rates)
		let total = 0;
		monies.forEach(money => {
			let amount = money.amount;
			let acrn = money.acr;
			total += amount / usdRate[acrn];
		})
		setTotalWorth(total)
		setLastUpdated(String(new Date()))
		console.log("usd rate has changed")
	}, [usdRate])

	const [checkId, setCheckedId] = useState(null);
	const { handleBuy, handleSell } = useContext(Context);

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
									<td>
									<ToggleButton
										id={`toggle-check-${index}`}
										type="checkbox"
										variant="outline-primary"
										checked={index === checkId}
										value={index}
										onChange={(e) => checkId === e.currentTarget.value ? setCheckedId(null) : setCheckedId(Number(e.currentTarget.value))}
										className="active-currency-toggle"
									>
										{
											index === checkId ? "X" : ""
										}
									</ToggleButton>

									</td>
									<td>{money.acr}</td>
									<td>{money.name}</td>
									<td>{money.amount}</td>
									<td>
										<Button onClick={() => handleBuy(money)} disabled={index !== checkId ? true : false} variant="success" >BUY</Button>
										<Button onClick={() => handleSell(money)} disabled={index !== checkId ? true : false} variant="danger" >SELL</Button>
									</td>
								</tr>
							)
						})
					}
					{
						<tr
							className="align-items-center"
						>
							<td></td>
							<td>USD</td>
							<td>Total Worth</td>
							<td>{String(totalWorth)}</td>
							<td></td>
						</tr>
					}
				</tbody>
			</Table>	
				
			<h3
				className="last-update-badge"
			>
				<Badge>LAST UPDATED {lastUpdated}</Badge>
			</h3>

		</div>
	)
}

export default CurrencyTable
