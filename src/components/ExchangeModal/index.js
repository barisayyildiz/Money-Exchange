import React, { useState } from 'react'
import './style.scss'

import { Button, Modal, Form, Col, Row, Container } from 'react-bootstrap'

function ExchangeModal() {

	const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

	return (
		<div className="modal-wrapper">
			<Button variant="primary" onClick={handleShow}>
				Launch demo modal
			</Button>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Exchange Money</Modal.Title>
				</Modal.Header>
				<Modal.Body>

					<Container className="form-exchange-header">
						<Row className="currency-row">
							<Col md="auto" className="currency from">
								TRY
							</Col>
							<Col md="auto" className="currency to">
								USD
							</Col>
						</Row>
						<Row>
							<Col>AED – UAE Dirham to TRY</Col>
						</Row>
						<Row>
							<Col>Rate: 0.4134</Col>
						</Row>
					</Container>
					
					<Form className="exchange-form">
						<Form.Group as={Row} className="mb-3" controlId="formPlaintextAmount">
							<Form.Label column sm="2">
								Amount
							</Form.Label>
							<Col sm="10">
								<Form.Control type="number" />
							</Col>
						</Form.Group>
						<Button variant="primary" type="submit">
							Submit
						</Button>				
					</Form>
				
				</Modal.Body>
			</Modal>			
		</div>
	)
}

export default ExchangeModal
