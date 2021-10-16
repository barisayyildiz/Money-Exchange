import React, { useState } from 'react'
import './style.scss'

import { Table, ButtonGroup, ToggleButton, Button } from 'react-bootstrap'

function CurrencyTable() {

	const monies = [
		{
			acr:"TRY",
			name:"Turkish Lira",
			amount:45000
		},
		{
			acr:"USD",
			name:"United States Dollar",
			amount:9000
		},
		{
			acr:"AED",
			name:"UAE Dirham",
			amount:600
		}
	]

	const radios = [
    { name: 'Active', value: '1' },
    { name: 'Radio', value: '2' },
    { name: 'Radio', value: '3' },
  ];

	// const [checked, setChecked] = useState(false);
  // const [radioValue, setRadioValue] = useState('1');
	const [checkId, setCheckedId] = useState(null);

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
								<tr>
									{/* <td><input type="checkbox"></input></td> */}
									<td>
									<ToggleButton
										id={`toggle-check-${index}`}
										type="checkbox"
										variant="outline-primary"
										checked={index == checkId}
										value={index}
										onChange={(e) => checkId == e.currentTarget.value ? setCheckedId(null) : setCheckedId(e.currentTarget.value)}
									>
										Checked
									</ToggleButton>

									</td>
									<td>{money.acr}</td>
									<td>{money.name}</td>
									<td>{money.amount}</td>
									<td>
										<Button disabled={index != checkId ? true : false} variant="success" >BUY</Button>
										<Button disabled={index != checkId ? true : false} variant="danger" >SELL</Button>
										{/* <Button disabled variant="success" style={ index != checkId ? {opacity:"0.6"} : {} } >BUY</Button>
										<Button variant="danger" style={ index != checkId ? {opacity:"0.6"} : {} } >SELL</Button> */}
									</td>
								</tr>
							)
						})
					}
					{/* <tr>
						<td><input type="checkbox"></input></td>
						<td>TRY</td>
						<td>Turkish Lira</td>
						<td>₺45,000</td>
						<td>
							<button>BUY</button>
							<button>SELL</button>
						</td>
					</tr>
					<tr>
						<td><input type="checkbox"></input></td>
						<td>USD</td>
						<td>United States Dollar</td>
						<td>$9000</td>
						<td>
							<button>BUY</button>
							<button>SELL</button>
						</td>
					</tr>
					<tr>
						<td><input type="checkbox"></input></td>
						<td>AED</td>
						<td>UAE Dirham</td>
						<td>AED 600</td>
						<td>
							<button>BUY</button>
							<button>SELL</button>
						</td>
					</tr> */}
				</tbody>
			</Table>			
		</div>
	)
}

export default CurrencyTable
