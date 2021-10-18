import React, { useState, useContext, useEffect } from 'react'
import './style.scss'
import axios from 'axios'

import { Button, Modal, Form, Col, Row, Container, Alert } from 'react-bootstrap'
import { Context } from '../../context';
import { isAuthenticated, updateUser } from '../../utils';
import apiKey from '../../key'

function ExchangeModal() {

	const { modalProps, setModalProps } = useContext(Context);
	const [rates, setRates] = useState([])
	const [alertMessage, setAlertMessage] = useState("")
	const [amount, setAmount] = useState(0);

	useEffect(() => {
		
		if(modalProps.open){
			axios.get(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${modalProps.money.acrn}`)
			.then(({data:{conversion_rates}}) => {
				const arr = modalProps.acrnList.map(acrn => modalProps.buying ? 1/conversion_rates[acrn] : conversion_rates[acrn])
				setRates(arr)
			})
		}
		
	}, [modalProps.open])

	const handleSubmit = (event) => {
		if(modalProps.selectedAcrnIndex === -1 || amount <= 0){
			setAlertMessage("Select an acronym and enter an amount greater than 0")
			event.preventDefault();
      event.stopPropagation();
		}else{
			const user = isAuthenticated();
			const { buying, acrnList, selectedAcrnIndex, money } = modalProps
			
			if(buying){
				const acrn = acrnList[selectedAcrnIndex]
				const total = user.money.find(money => money.acrn === acrn).amount

				if(amount > total){
					setAlertMessage("Insufficient Fund")
					event.preventDefault();
 			  	event.stopPropagation();
				}else{
					user.money[user.money.findIndex(item => item.acrn===acrn)].amount -= amount
					const index = user.money.findIndex(item => item.acrn===money.acrn)
					if(index !== -1){
						user.money[index].amount += rates[selectedAcrnIndex] * amount
					}else{
						user.money.push({
							acrn:money.acrn,
							amount:rates[selectedAcrnIndex] * amount,
							name:money.name
						})
					}
					updateUser(user)
				}

			}else{
				const acrn = money.acrn;
				const total = user.money.find(money => money.acrn === acrn).amount

				if(amount > total){
					setAlertMessage("Insufficient Fund")
					event.preventDefault();
 			  	event.stopPropagation();
				}else{
					user.money[user.money.findIndex(item => item.acrn===acrn)].amount -= amount
					user.money[user.money.findIndex(item => item.acrn===acrnList[selectedAcrnIndex])].amount += rates[selectedAcrnIndex] * amount
					updateUser(user)
				}
			}
		}
	}

	return (
		<div className="modal-wrapper">
			<Modal show={modalProps.open} onHide={() => {
				setModalProps({
					...modalProps,
					open:false
				})
			}}>
				<Modal.Header closeButton>
					<Modal.Title>{ modalProps.buying ? "Buying " : "Selling " } {modalProps.money.acrn}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Container className="form-exchange-header">
						<Row className="currency-row">

							{
								modalProps.acrnList.map((acrn, index) => (
									<Col md="auto" className="currency">
										<Button variant={ index === modalProps.selectedAcrnIndex ? "success" : "light" } onClick={() => setModalProps({...modalProps, selectedAcrnIndex:index})}>
											{acrn}
										</Button>
									</Col>
								))
							}
						</Row>
						<Row>
							{
								modalProps.buying ? (
									<Col> {modalProps.money.fullName} to {modalProps.acrnList[modalProps.selectedAcrnIndex]} </Col>
								) : (
									<Col> {modalProps.acrnList[modalProps.selectedAcrnIndex]} to {modalProps.money.fullName} </Col>
								)
							}
						</Row>
						<Row>
							<Col>Rate: {rates[modalProps.selectedAcrnIndex]}</Col>
						</Row>
					</Container>

					<Form noValidate className="exchange-form" onSubmit={handleSubmit}>
						<Form.Group as={Row} className="mb-3" controlId="formPlaintextAmount">
							<Form.Label column sm="2">
								Amount
							</Form.Label>
							<Col sm="10">
								<Form.Control required type="number" onChange={({target:{value}}) => setAmount(Number(value))} />
							</Col>
						</Form.Group>
						<Button variant="primary" type="submit">
							Submit
						</Button>
					</Form>

					<Alert
						variant="danger"
						className="mt-2"
						show={Boolean(alertMessage)}
					>{alertMessage}</Alert>
				
				</Modal.Body>
			</Modal>			
		</div>
	)
}

export default ExchangeModal
