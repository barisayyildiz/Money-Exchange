import React, { useState, useContext, useEffect } from 'react'
import './style.scss'
import axios from 'axios'

import { Button, Modal, Form, Col, Row, Container, Alert } from 'react-bootstrap'
import { Context } from '../../context';

import { isAuthenticated, updateUser } from '../../utils';

function ExchangeModal() {

	const { modalProps, setModalProps } = useContext(Context);
	const [rates, setRates] = useState([])
	const [alertMessage, setAlertMessage] = useState("")
	const [amount, setAmount] = useState(0);

	useEffect(() => {
		
		if(modalProps.open){
			axios.get(`https://v6.exchangerate-api.com/v6/0b196ddfbe66cabd2fc96fbe/latest/${modalProps.money.acrn}`)
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

			if(modalProps.buying){
				const { acrnList, selectedAcrnIndex } = modalProps
				const user = isAuthenticated();
				const acrn = acrnList[selectedAcrnIndex]
				const total = user.monies.find(money => money.acr === acrn).amount

				if(amount > total){
					setAlertMessage("Insufficient Fund")
					event.preventDefault();
 			  	event.stopPropagation();
				}else{
					user.monies[user.monies.findIndex(item => item.acr===acrn)].amount -= amount

					const index = user.monies.findIndex(item => item.acr===modalProps.money.acrn)
					if(index !== -1){
						user.monies[index].amount += rates[modalProps.selectedAcrnIndex] * amount
					}else{
						user.monies.push({
							acr:modalProps.money.acrn,
							amount:rates[modalProps.selectedAcrnIndex] * amount,
							name:modalProps.money.name
						})
					}
					updateUser(user)
				}

			}else{
				const user = isAuthenticated();
				const acrn = modalProps.money.acrn;
				const total = user.monies.find(money => money.acr === acrn).amount

				if(amount > total){
					setAlertMessage("Insufficient Fund")
					event.preventDefault();
 			  	event.stopPropagation();
				}else{
					user.monies[user.monies.findIndex(item => item.acr===acrn)].amount -= amount
					user.monies[user.monies.findIndex(item => item.acr===modalProps.acrnList[modalProps.selectedAcrnIndex])].amount += rates[modalProps.selectedAcrnIndex] * amount
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

					<Form className="exchange-form" onSubmit={handleSubmit}>
						<Form.Group as={Row} className="mb-3" controlId="formPlaintextAmount">
							<Form.Label column sm="2">
								Amount
							</Form.Label>
							<Col sm="10">
								<Form.Control step="0.001" required type="number" onChange={({target:{value}}) => setAmount(Number(value))} />
							</Col>
						</Form.Group>
						<Button variant="primary" type="submit">
							Submit
						</Button>				
					</Form>

					<Alert
						variant="danger"
						show={Boolean(alertMessage)}
					>{alertMessage}</Alert>
				
				</Modal.Body>
			</Modal>			
		</div>
	)
}

export default ExchangeModal
