import React, { useState, useContext, useEffect } from 'react'
import './style.scss'

import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { Link, useLocation } from 'react-router-dom'

import { Table, ToggleButton, Button, Badge } from 'react-bootstrap'
import { Context } from '../../context';
import { isAuthenticated, updateUser } from '../../utils'

function CurrencyTable({props : {usdRate}}) {

	let { pathname } = useLocation();

	const { money } = isAuthenticated();
	const [userMoney, setUserMoney] = useState(money);
	const [rates, setRates] = useState({})
	const [totalWorth, setTotalWorth] = useState(0);
	const [lastUpdated, setLastUpdated] = useState(String(new Date()))

	useEffect(() => {
		console.log(`total worth : ${totalWorth}`)
	},[totalWorth])

	useEffect(() => {
		setRates(rates)
		let total = 0;
		money.forEach(money => {
			let amount = money.amount;
			let acrn = money.acrn;
			total += amount / usdRate[acrn];
		})
		setTotalWorth(total)
		setLastUpdated(String(new Date()))
		console.log("usd rate has changed")
	}, [usdRate])

	const [checkId, setCheckedId] = useState(null);
	const { handleBuy, handleSell } = useContext(Context);

	const handleStar = (acrn) => {
		const user = isAuthenticated()
		const money = user.money.find(m => m.acrn === acrn)
		money.favourite = !money.favourite
		updateUser(user);
		setUserMoney(money)
	}

	return (
		<div className="currency-table-wrapper">
			{
				pathname === '/favourites' ? (
					<h2 className="currency-table-header">Favourites</h2>
				) : <h2 className="currency-table-header">All Currencies</h2>
			}

			<Table bordered hover style={{textAlign:'center'}}>
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
						money.map((money, index) => {
							if(pathname === '/favourites' && money.favourite === false)	return null;

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
									<td>{money.acrn}</td>
									<td>{money.name}</td>
									<td>{money.amount}</td>
									<td
										className="operation-buttons"
									>
										<Button onClick={() => handleBuy(money)} disabled={index !== checkId ? true : false} variant="success" >BUY</Button>
										<Button onClick={() => handleSell(money)} disabled={index !== checkId ? true : false} variant="danger" >SELL</Button>
										<Button onClick={() => handleStar(money.acrn)} variant="warning">
											{
												money.favourite ? <AiFillStar/> : <AiOutlineStar/>
											}
											</Button>
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

			<div className="currency-table-footer">
				<h3
					className="last-update-badge"
				>
					<Badge>LAST UPDATED {lastUpdated}</Badge>
				</h3>
				
				{
					pathname === '/favourites' ? (
						<Link to="/" style={{ textDecoration: 'none' }}>All Currencies</Link>
					) : <Link to="/favourites" style={{ textDecoration: 'none' }}>Favourites</Link>

				}
			</div>


		</div>
	)
}

export default CurrencyTable
